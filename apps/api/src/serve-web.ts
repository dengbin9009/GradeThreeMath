import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, normalize, resolve, sep } from "node:path";
import { eq, sql as drizzleSql } from "drizzle-orm";
import { AuditRepository } from "./audit/audit.repository";
import type { ResolvedSession } from "./auth/account-policy";
import { evaluateAccountAccess } from "./auth/account-policy";
import { createMathAuth } from "./auth/auth";
import { internalEmailForUsername, normalizeUsername } from "./auth/internal-email";
import { SlidingWindowRateLimiter } from "./auth/rate-limit";
import { DrizzleAdminUserService } from "./admin/drizzle-users.service";
import { createApiApp } from "./app";
import { parseEnvironment } from "./config/env";
import { createDatabase } from "./db/client";
import { user } from "./db/schema/auth";

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};

export interface StaticAsset {
  path: string;
  contentType: string;
}

export function resolveStaticAsset(urlPath: string, webDistDir: string): StaticAsset | null {
  if (urlPath.includes("..")) return null;
  const root = resolve(webDistDir);
  const cleanPath = normalize(decodeURIComponent(urlPath.split("?")[0] || "/")).replace(/^\/+/, "");
  const candidate = cleanPath && extname(cleanPath) ? resolve(root, cleanPath) : resolve(root, "index.html");
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;
  return { path: candidate, contentType: contentTypes[extname(candidate)] ?? "application/octet-stream" };
}

export function createSameOriginApp(options: Parameters<typeof createApiApp>[0] & { webDistDir: string }) {
  const app = createApiApp(options);

  app.get("*", async (c, next) => {
    if (c.req.path.startsWith("/api/")) return next();
    const asset = resolveStaticAsset(c.req.path, options.webDistDir);
    if (!asset) return c.text("Not found", 404);
    const fallback = resolve(options.webDistDir, "index.html");
    const path = existsSync(asset.path) && statSync(asset.path).isFile() ? asset.path : fallback;
    c.header("Content-Type", asset.contentType);
    c.header("Cache-Control", path.endsWith("index.html") ? "no-cache" : "public, max-age=31536000, immutable");
    return c.body(createReadStream(path) as never);
  });

  return app;
}

export async function startSameOriginServer(input: Record<string, unknown> = process.env) {
  const environment = parseEnvironment(input);
  const { db, sql } = createDatabase(environment.DATABASE_URL);
  const auth = createMathAuth(db, environment);
  const blueprint = JSON.parse(await readFile(new URL("../../../data/grade3-math-blueprint.json", import.meta.url), "utf8"));
  const loginLimiter = new SlidingWindowRateLimiter();
  const app = createSameOriginApp({
    blueprint,
    webDistDir: environment.WEB_DIST_DIR,
    adminService: new DrizzleAdminUserService(db),
    databaseReady: async () => {
      await sql`select 1`;
      return true;
    },
    resolveSession: async (request): Promise<ResolvedSession | null> => {
      const resolved = await auth.api.getSession({ headers: request.headers });
      if (!resolved) return null;
      const rawUser = resolved.user as typeof resolved.user & {
        username?: string | null;
        role?: "admin" | "user" | null;
        isActive: boolean;
        validFrom: Date;
        validUntil?: Date | null;
        mustChangePassword: boolean;
        version: number;
      };
      return {
        user: {
          id: rawUser.id,
          username: rawUser.username ?? "",
          displayName: rawUser.name,
          role: rawUser.role === "admin" ? "admin" : "user",
          isActive: rawUser.isActive,
          validFrom: new Date(rawUser.validFrom),
          validUntil: rawUser.validUntil ? new Date(rawUser.validUntil) : null,
          mustChangePassword: rawUser.mustChangePassword,
          version: rawUser.version
        },
        session: {
          id: resolved.session.id,
          expiresAt: new Date(resolved.session.expiresAt),
          updatedAt: new Date(resolved.session.updatedAt)
        }
      };
    }
  });

  app.post("/api/auth/sign-in/username", async (c) => {
    const body = await c.req.raw.clone().json().catch(() => ({})) as { username?: string };
    const ip = c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    let normalized = "invalid";
    try {
      normalized = normalizeUsername(body.username ?? "");
    } catch {
      // Keep the public response generic.
    }
    const identityLimit = loginLimiter.consume("login-identity-ip", `${normalized}|${ip}`, 5, 15 * 60_000);
    const ipLimit = loginLimiter.consume("login-ip", ip, 30, 15 * 60_000);
    if (!identityLimit.allowed || !ipLimit.allowed) {
      return c.json({ error: { code: "AUTH_RATE_LIMITED", message: "尝试次数过多，请稍后再试。" } }, 429);
    }
    const [candidate] = await db.select().from(user).where(eq(user.username, normalized)).limit(1);
    const email = normalized === "invalid" ? "" : internalEmailForUsername(normalized);
    if (!candidate || !evaluateAccountAccess({
      id: candidate.id,
      username: candidate.username ?? "",
      displayName: candidate.name,
      role: candidate.role,
      isActive: candidate.isActive,
      validFrom: candidate.validFrom,
      validUntil: candidate.validUntil,
      mustChangePassword: candidate.mustChangePassword,
      version: candidate.version
    }).allowed || email !== candidate.email) {
      return c.json({ error: { code: "AUTH_INVALID", message: "登录名、密码或账号状态不可用。" } }, 401);
    }
    return auth.handler(c.req.raw);
  });

  app.post("/api/account/change-password", async (c) => {
    const current = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!current) return c.json({ error: { code: "AUTH_REQUIRED", message: "需要登录后使用。" } }, 401);
    const body = await c.req.json<{ currentPassword?: string; newPassword?: string }>();
    try {
      await auth.api.changePassword({
        headers: c.req.raw.headers,
        body: { currentPassword: body.currentPassword ?? "", newPassword: body.newPassword ?? "", revokeOtherSessions: true }
      });
      await db.transaction(async (tx) => {
        await tx.update(user).set({ mustChangePassword: false, version: drizzleSql`${user.version} + 1`, updatedAt: new Date() }).where(eq(user.id, current.user.id));
        await new AuditRepository(tx).record({
          actorUserId: current.user.id,
          targetUserId: current.user.id,
          action: "CHANGE_PASSWORD",
          summary: { otherSessionsRevoked: true }
        });
      });
      return c.json({ status: true });
    } catch {
      return c.json({ error: { code: "PASSWORD_CHANGE_FAILED", message: "当前密码不正确或新密码不符合要求。" } }, 400);
    }
  });
  app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

  const { serve } = await import("@hono/node-server");
  const server = serve({ fetch: app.fetch, port: environment.PORT, hostname: "127.0.0.1" }, (info) => {
    console.log(`Math same-origin app listening on http://127.0.0.1:${info.port}`);
  });

  const shutdown = async () => {
    server.close();
    await sql.end();
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  return { app, server, shutdown };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  await startSameOriginServer();
}
