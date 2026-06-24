import { readFile } from "node:fs/promises";
import { serve } from "@hono/node-server";
import type { ResolvedSession } from "./auth/account-policy";
import { createMathAuth } from "./auth/auth";
import { DrizzleAdminUserService } from "./admin/drizzle-users.service";
import { createApiApp } from "./app";
import { evaluateAccountAccess } from "./auth/account-policy";
import { SlidingWindowRateLimiter } from "./auth/rate-limit";
import { normalizeUsername } from "./auth/internal-email";
import { parseEnvironment } from "./config/env";
import { createDatabase } from "./db/client";
import { user } from "./db/schema/auth";
import { eq, sql as drizzleSql } from "drizzle-orm";
import { auditEvent } from "./db/schema/audit";
import { randomUUID } from "node:crypto";

const environment = parseEnvironment(process.env);
const { db, sql } = createDatabase(environment.DATABASE_URL);
const auth = createMathAuth(db, environment);
const blueprint = JSON.parse(await readFile(new URL("../../../data/grade3-math-blueprint.json", import.meta.url), "utf8"));
const adminService = new DrizzleAdminUserService(db);
const loginLimiter = new SlidingWindowRateLimiter();

const app = createApiApp({
  blueprint,
  adminService,
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
  }).allowed) {
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
      await tx.insert(auditEvent).values({
        id: `aud_${randomUUID()}`,
        actorUserId: current.user.id,
        targetUserId: current.user.id,
        action: "CHANGE_PASSWORD",
        summary: { otherSessionsRevoked: true },
        requestId: `req_${randomUUID()}`,
        createdAt: new Date()
      });
    });
    return c.json({ status: true });
  } catch {
    return c.json({ error: { code: "PASSWORD_CHANGE_FAILED", message: "当前密码不正确或新密码不符合要求。" } }, 400);
  }
});
app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const server = serve({ fetch: app.fetch, port: environment.PORT, hostname: "127.0.0.1" }, (info) => {
  console.log(`Math API listening on http://127.0.0.1:${info.port}`);
});

const shutdown = async () => {
  server.close();
  await sql.end();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export type ApiApp = typeof app;
