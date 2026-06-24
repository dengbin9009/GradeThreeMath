import { getTableColumns } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { account, rateLimit, session, user, verification } from "../../src/db/schema/auth";

describe("authentication database schema", () => {
  it("contains Better Auth identity fields and application validity fields", () => {
    expect(Object.keys(getTableColumns(user))).toEqual(expect.arrayContaining([
      "id", "name", "email", "username", "displayUsername", "role", "isActive", "validFrom", "validUntil",
      "mustChangePassword", "version", "createdAt", "updatedAt"
    ]));
  });

  it("stores revocable sessions and credential accounts", () => {
    expect(Object.keys(getTableColumns(session))).toEqual(expect.arrayContaining(["id", "token", "userId", "expiresAt", "updatedAt", "ipAddress", "userAgent"]));
    expect(Object.keys(getTableColumns(account))).toEqual(expect.arrayContaining(["id", "accountId", "providerId", "userId", "password"]));
    expect(Object.keys(getTableColumns(verification))).toEqual(expect.arrayContaining(["id", "identifier", "value", "expiresAt"]));
  });

  it("persists exact rate-limit windows", () => {
    expect(Object.keys(getTableColumns(rateLimit))).toEqual(["id", "key", "bucket", "count", "lastRequest", "windowStartedAt", "expiresAt"]);
  });
});
