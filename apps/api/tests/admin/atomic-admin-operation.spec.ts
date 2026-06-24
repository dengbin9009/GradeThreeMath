import { describe, expect, it } from "vitest";
import { AdminUserService, InMemoryAdminRepository } from "../../src/admin/users.service";

const now = new Date("2026-06-22T12:00:00.000Z");

describe("atomic admin operations", () => {
  it("rolls back a user update when audit insertion fails", async () => {
    const repository = new InMemoryAdminRepository();
    const service = new AdminUserService(repository, () => now);
    const created = await service.createUser("admin_1", {
      username: "student01",
      displayName: "小明",
      temporaryPassword: "four-word-temporary-passphrase",
      validFrom: now,
      validUntil: null
    });
    repository.failNextAudit();
    await expect(service.updateUser("admin_1", created.id, { isActive: false, version: 1 })).rejects.toThrow(/rolled back/i);
    expect((await service.getUser(created.id)).isActive).toBe(true);
    expect(repository.auditEvents).toHaveLength(1);
  });
});
