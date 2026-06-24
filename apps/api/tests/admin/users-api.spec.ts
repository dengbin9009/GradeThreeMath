import { describe, expect, it } from "vitest";
import { createApiApp } from "../../src/app";
import { AdminUserService, InMemoryAdminRepository } from "../../src/admin/users.service";
import { makeUser } from "../helpers/auth-fixtures";

const now = new Date("2026-06-22T12:00:00.000Z");

const createService = () => new AdminUserService(new InMemoryAdminRepository(), () => now);

describe("admin users API", () => {
  it("allows an admin to create a normal user with validity", async () => {
    const app = createApiApp({
      adminService: createService(),
      now: () => now,
      resolveSession: async () => ({ user: makeUser({ id: "admin_1", role: "admin" }), session: { id: "s", expiresAt: new Date(now.getTime() + 10_000) } })
    });
    const response = await app.request("/api/admin/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: "student01", displayName: "小明", temporaryPassword: "four-word-temporary-passphrase", validFrom: now.toISOString(), validUntil: null })
    });
    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ username: "student01", role: "user", mustChangePassword: true, version: 1 });
  });

  it("denies a normal user without revealing target data", async () => {
    const app = createApiApp({
      adminService: createService(),
      now: () => now,
      resolveSession: async () => ({ user: makeUser({ role: "user" }), session: { id: "s", expiresAt: new Date(now.getTime() + 10_000) } })
    });
    const response = await app.request("/api/admin/users");
    expect(response.status).toBe(403);
    expect(await response.text()).not.toContain("student01");
  });

  it("resets a password and revokes every target session atomically", async () => {
    const repository = new InMemoryAdminRepository();
    const service = new AdminUserService(repository, () => now);
    const created = await service.createUser("admin_1", { username: "student02", displayName: "小华", temporaryPassword: "four-word-temporary-passphrase", validFrom: now, validUntil: null });
    repository.sessionUserIds.set("session-a", created.id);
    repository.sessionUserIds.set("session-b", created.id);
    const app = createApiApp({
      adminService: service,
      now: () => now,
      resolveSession: async () => ({ user: makeUser({ id: "admin_1", role: "admin" }), session: { id: "s", expiresAt: new Date(now.getTime() + 10_000) } })
    });

    const response = await app.request(`/api/admin/users/${created.id}/reset-password`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ temporaryPassword: "another-long-temporary-passphrase", version: 1 })
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ mustChangePassword: true, version: 2 });
    expect(repository.sessionUserIds.size).toBe(0);
    expect(repository.auditEvents.at(-1)?.action).toBe("RESET_PASSWORD");
  });

  it("supports an explicit session revocation action", async () => {
    const repository = new InMemoryAdminRepository();
    const service = new AdminUserService(repository, () => now);
    const created = await service.createUser("admin_1", { username: "student03", displayName: "小李", temporaryPassword: "four-word-temporary-passphrase", validFrom: now, validUntil: null });
    repository.sessionUserIds.set("session-a", created.id);
    const app = createApiApp({ adminService: service, now: () => now, resolveSession: async () => ({ user: makeUser({ id: "admin_1", role: "admin" }), session: { id: "s", expiresAt: new Date(now.getTime() + 10_000) } }) });
    const response = await app.request(`/api/admin/users/${created.id}/revoke-sessions`, { method: "POST" });
    expect(response.status).toBe(200);
    expect(repository.sessionUserIds.size).toBe(0);
    expect(repository.auditEvents.at(-1)?.action).toBe("REVOKE_SESSIONS");
  });

  it("lets only an admin read non-sensitive audit history", async () => {
    const service = createService();
    const created = await service.createUser("admin_1", { username: "student04", displayName: "小吴", temporaryPassword: "four-word-temporary-passphrase", validFrom: now, validUntil: null });
    const app = createApiApp({ adminService: service, now: () => now, resolveSession: async () => ({ user: makeUser({ id: "admin_1", role: "admin" }), session: { id: "s", expiresAt: new Date(now.getTime() + 10_000) } }) });
    const response = await app.request(`/api/admin/users/${created.id}/audit-events`);
    expect(response.status).toBe(200);
    const payload = await response.json() as { items: Array<{ action: string; summary: unknown }> };
    expect(payload.items[0]?.action).toBe("CREATE_USER");
    expect(JSON.stringify(payload)).not.toMatch(/password|token/i);
  });
});
