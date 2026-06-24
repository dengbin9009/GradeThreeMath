import { describe, expect, it } from "vitest";
import { AdminUserService, InMemoryAdminRepository } from "../../src/admin/users.service";

describe("admin audit", () => {
  it("never persists passwords or session tokens in summaries", async () => {
    const repository = new InMemoryAdminRepository();
    const service = new AdminUserService(repository);
    await service.createUser("admin_1", {
      username: "student01",
      displayName: "小明",
      temporaryPassword: "four-word-temporary-passphrase",
      validFrom: new Date(),
      validUntil: null
    });
    const serialized = JSON.stringify(repository.auditEvents);
    expect(serialized).not.toContain("four-word-temporary-passphrase");
    expect(serialized).not.toMatch(/token/i);
  });
});
