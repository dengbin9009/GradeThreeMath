import { describe, expect, it } from "vitest";
import { evaluateSessionAccess } from "../../src/auth/account-policy";
import { makeUser } from "../helpers/auth-fixtures";

const now = new Date("2026-06-22T12:00:00.000Z");

describe("session access", () => {
  it("rejects missing, expired and idle sessions", () => {
    expect(evaluateSessionAccess(null, now).code).toBe("AUTH_REQUIRED");
    expect(evaluateSessionAccess({ user: makeUser(), session: { id: "s", expiresAt: now } }, now).code).toBe("AUTH_SESSION_EXPIRED");
    expect(evaluateSessionAccess({
      user: makeUser(),
      session: { id: "s", expiresAt: new Date(now.getTime() + 1_000), updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000) }
    }, now).code).toBe("AUTH_SESSION_IDLE");
  });

  it("caps access at the account validity boundary", () => {
    expect(evaluateSessionAccess({
      user: makeUser({ validUntil: now }),
      session: { id: "s", expiresAt: new Date(now.getTime() + 12 * 60 * 60 * 1000) }
    }, now).code).toBe("AUTH_ACCOUNT_UNAVAILABLE");
  });
});
