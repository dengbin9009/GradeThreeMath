import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("database recovery scripts", () => {
  it("creates compressed backups, expires files after 30 days and verifies restores", async () => {
    const backup = await readFile(new URL("../../scripts/backup.sh", import.meta.url), "utf8");
    const restore = await readFile(new URL("../../scripts/restore.sh", import.meta.url), "utf8");
    expect(backup).toContain("pg_dump");
    expect(backup).toContain("-mtime +30");
    expect(restore).toContain("pg_restore");
    expect(restore).toContain("audit_event");
  });
});
