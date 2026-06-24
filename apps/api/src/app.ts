import { createHash } from "node:crypto";
import { Hono } from "hono";
import { validateBlueprint } from "@math/shared";
import { evaluateSessionAccess, type ResolvedSession } from "./auth/account-policy";
import type { AdminUsersPort } from "./admin/users.service";

interface ApiAppOptions {
  blueprint?: unknown;
  resolveSession?: (request: Request) => Promise<ResolvedSession | null>;
  databaseReady?: () => Promise<boolean>;
  now?: () => Date;
  adminService?: AdminUsersPort;
}

const errorBody = (code: string, message: string) => ({ error: { code, message } });

export function createApiApp(options: ApiAppOptions = {}) {
  const app = new Hono();
  const resolveSession = options.resolveSession ?? (async () => null);
  const databaseReady = options.databaseReady ?? (async () => true);
  const now = options.now ?? (() => new Date());
  const adminService = options.adminService;
  const blueprint = options.blueprint === undefined ? null : validateBlueprint(options.blueprint);
  const serializedBlueprint = blueprint ? JSON.stringify(blueprint) : "";
  const etag = blueprint ? `"${createHash("sha256").update(serializedBlueprint).digest("base64url")}"` : null;

  app.get("/api/health/live", (c) => c.json({ status: "live" }));
  app.get("/api/health/ready", async (c) => {
    try {
      return await databaseReady() ? c.json({ status: "ready" }) : c.json({ status: "not-ready" }, 503);
    } catch {
      return c.json({ status: "not-ready" }, 503);
    }
  });

  app.get("/api/blueprint", async (c) => {
    const resolved = await resolveSession(c.req.raw);
    const access = evaluateSessionAccess(resolved, now());
    if (!access.allowed) {
      c.header("Cache-Control", "no-store");
      return c.json(errorBody("AUTH_REQUIRED", "需要登录后使用。"), 401);
    }
    if (resolved?.user.mustChangePassword) {
      c.header("Cache-Control", "no-store");
      return c.json(errorBody("AUTH_PASSWORD_CHANGE_REQUIRED", "请先修改临时密码。"), 403);
    }
    if (!blueprint || !etag) return c.json(errorBody("CONTENT_UNAVAILABLE", "学习内容暂时不可用。"), 503);
    if (c.req.header("if-none-match") === etag) return c.body(null, 304);
    c.header("ETag", etag);
    c.header("Cache-Control", "private, max-age=0, must-revalidate");
    return c.body(serializedBlueprint, 200, { "Content-Type": "application/json; charset=UTF-8" });
  });

  const requireAdmin = async (request: Request) => {
    const resolved = await resolveSession(request);
    const access = evaluateSessionAccess(resolved, now());
    if (!access.allowed) return { error: "unauthorized" as const, resolved };
    if (resolved?.user.role !== "admin") return { error: "forbidden" as const, resolved };
    return { error: null, resolved };
  };

  app.get("/api/admin/users", async (c) => {
    const auth = await requireAdmin(c.req.raw);
    if (auth.error === "unauthorized") return c.json(errorBody("AUTH_REQUIRED", "需要登录后使用。"), 401);
    if (auth.error === "forbidden") return c.json(errorBody("AUTH_FORBIDDEN", "没有管理权限。"), 403);
    if (!adminService) return c.json(errorBody("ADMIN_UNAVAILABLE", "管理服务暂时不可用。"), 503);
    const items = await adminService.listUsers();
    return c.json({ items, nextCursor: null });
  });

  app.post("/api/admin/users", async (c) => {
    const auth = await requireAdmin(c.req.raw);
    if (auth.error === "unauthorized") return c.json(errorBody("AUTH_REQUIRED", "需要登录后使用。"), 401);
    if (auth.error === "forbidden") return c.json(errorBody("AUTH_FORBIDDEN", "没有管理权限。"), 403);
    if (!adminService || !auth.resolved) return c.json(errorBody("ADMIN_UNAVAILABLE", "管理服务暂时不可用。"), 503);
    try {
      const body = await c.req.json<Record<string, unknown>>();
      const user = await adminService.createUser(auth.resolved.user.id, {
        username: String(body.username ?? ""),
        displayName: String(body.displayName ?? ""),
        temporaryPassword: String(body.temporaryPassword ?? ""),
        validFrom: new Date(String(body.validFrom)),
        validUntil: body.validUntil === null ? null : new Date(String(body.validUntil))
      });
      return c.json(user, 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : "ADMIN_OPERATION_FAILED";
      const status = message.includes("USERNAME_CONFLICT") ? 409 : 400;
      return c.json(errorBody(message, "无法创建用户，请检查输入。"), status);
    }
  });

  app.patch("/api/admin/users/:userId", async (c) => {
    const auth = await requireAdmin(c.req.raw);
    if (auth.error === "unauthorized") return c.json(errorBody("AUTH_REQUIRED", "需要登录后使用。"), 401);
    if (auth.error === "forbidden") return c.json(errorBody("AUTH_FORBIDDEN", "没有管理权限。"), 403);
    if (!adminService || !auth.resolved) return c.json(errorBody("ADMIN_UNAVAILABLE", "管理服务暂时不可用。"), 503);
    try {
      const body = await c.req.json<Record<string, unknown>>();
      const updated = await adminService.updateUser(auth.resolved.user.id, c.req.param("userId"), {
        ...(body.displayName === undefined ? {} : { displayName: String(body.displayName) }),
        ...(body.isActive === undefined ? {} : { isActive: Boolean(body.isActive) }),
        ...(body.validFrom === undefined ? {} : { validFrom: new Date(String(body.validFrom)) }),
        ...(body.validUntil === undefined ? {} : { validUntil: body.validUntil === null ? null : new Date(String(body.validUntil)) }),
        version: Number(body.version)
      });
      return c.json(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : "ADMIN_OPERATION_FAILED";
      const status = message.includes("VERSION_CONFLICT") ? 409 : message.includes("NOT_FOUND") ? 404 : message.includes("rolled back") ? 503 : 400;
      return c.json(errorBody(message, status === 409 ? "用户信息已被更新，请刷新后重试。" : "无法更新用户。"), status);
    }
  });

  app.post("/api/admin/users/:userId/reset-password", async (c) => {
    const auth = await requireAdmin(c.req.raw);
    if (auth.error === "unauthorized") return c.json(errorBody("AUTH_REQUIRED", "需要登录后使用。"), 401);
    if (auth.error === "forbidden") return c.json(errorBody("AUTH_FORBIDDEN", "没有管理权限。"), 403);
    if (!adminService || !auth.resolved) return c.json(errorBody("ADMIN_UNAVAILABLE", "管理服务暂时不可用。"), 503);
    try {
      const body = await c.req.json<{ temporaryPassword?: string; version?: number }>();
      const updated = await adminService.resetPassword(auth.resolved.user.id, c.req.param("userId"), body.temporaryPassword ?? "", Number(body.version));
      return c.json(updated);
    } catch (error) {
      const code = error instanceof Error ? error.message : "ADMIN_OPERATION_FAILED";
      return c.json(errorBody(code, code.includes("VERSION_CONFLICT") ? "用户信息已更新，请刷新后重试。" : "无法重置密码。"), code.includes("VERSION_CONFLICT") ? 409 : 400);
    }
  });

  app.post("/api/admin/users/:userId/revoke-sessions", async (c) => {
    const auth = await requireAdmin(c.req.raw);
    if (auth.error === "unauthorized") return c.json(errorBody("AUTH_REQUIRED", "需要登录后使用。"), 401);
    if (auth.error === "forbidden") return c.json(errorBody("AUTH_FORBIDDEN", "没有管理权限。"), 403);
    if (!adminService || !auth.resolved) return c.json(errorBody("ADMIN_UNAVAILABLE", "管理服务暂时不可用。"), 503);
    try {
      await adminService.revokeSessions(auth.resolved.user.id, c.req.param("userId"));
      return c.json({ status: true });
    } catch (error) {
      const code = error instanceof Error ? error.message : "ADMIN_OPERATION_FAILED";
      return c.json(errorBody(code, "无法撤销会话。"), code.includes("NOT_FOUND") ? 404 : 400);
    }
  });

  app.get("/api/admin/users/:userId/audit-events", async (c) => {
    const auth = await requireAdmin(c.req.raw);
    if (auth.error === "unauthorized") return c.json(errorBody("AUTH_REQUIRED", "需要登录后使用。"), 401);
    if (auth.error === "forbidden") return c.json(errorBody("AUTH_FORBIDDEN", "没有管理权限。"), 403);
    if (!adminService) return c.json(errorBody("ADMIN_UNAVAILABLE", "管理服务暂时不可用。"), 503);
    try {
      const items = await adminService.listAuditEvents(c.req.param("userId"));
      c.header("Cache-Control", "no-store");
      return c.json({ items, nextCursor: null });
    } catch {
      return c.json(errorBody("USER_NOT_FOUND", "用户不存在。"), 404);
    }
  });

  return app;
}
