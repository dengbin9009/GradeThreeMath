import { describe, expect, it } from "vitest";
import { evaluateAccountAccess, getAccountStatus } from "../../src/auth/account-policy";
import { makeUser } from "../helpers/auth-fixtures";

const now = new Date("2026-06-22T12:00:00.000Z");

describe("account validity policy", () => {
  it("treats the validFrom boundary as active", () => {
    const user = makeUser({ validFrom: now, validUntil: new Date("2026-07-01T00:00:00.000Z") });
    expect(getAccountStatus(user, now)).toBe("active");
    expect(evaluateAccountAccess(user, now)).toEqual({ allowed: true, status: "active" });
  });

  it("treats the validUntil boundary as expired", () => {
    const user = makeUser({ validUntil: now });
    expect(getAccountStatus(user, now)).toBe("expired");
    expect(evaluateAccountAccess(user, now).allowed).toBe(false);
  });

  it("prioritizes suspension and supports long-term accounts", () => {
    expect(getAccountStatus(makeUser({ isActive: false, validUntil: null }), now)).toBe("suspended");
    expect(getAccountStatus(makeUser({ validUntil: null }), now)).toBe("active");
  });

  it("marks accounts expiring within seven days without denying access", () => {
    const user = makeUser({ validUntil: new Date("2026-06-25T12:00:00.000Z") });
    expect(evaluateAccountAccess(user, now)).toEqual({ allowed: true, status: "expiring-soon" });
  });
});
