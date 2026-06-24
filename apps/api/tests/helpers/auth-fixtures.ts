import type { AppUser } from "../../src/auth/account-policy";

export function makeUser(overrides: Partial<AppUser> = {}): AppUser {
  return {
    id: "usr_test",
    username: "student01",
    displayName: "小明",
    role: "user",
    isActive: true,
    validFrom: new Date("2026-06-01T00:00:00.000Z"),
    validUntil: new Date("2026-09-01T00:00:00.000Z"),
    mustChangePassword: false,
    version: 1,
    ...overrides
  };
}
