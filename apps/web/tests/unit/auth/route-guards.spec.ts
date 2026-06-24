import { describe, expect, it } from "vitest";
import { resolveRouteAccess } from "../../../src/auth/route-guards";

const user = { role: "user" as const, mustChangePassword: false };

describe("route access", () => {
  it("sends anonymous users to login with a safe redirect", () => {
    expect(resolveRouteAccess({ path: "/learn/M20", public: false, requiresAdmin: false }, null)).toEqual({
      name: "login",
      query: { redirect: "/learn/M20" }
    });
  });

  it("restricts first-login sessions to password change", () => {
    expect(resolveRouteAccess({ path: "/learn", public: false, requiresAdmin: false }, { ...user, mustChangePassword: true })).toEqual({ name: "change-password" });
  });

  it("denies admin routes to normal users", () => {
    expect(resolveRouteAccess({ path: "/admin/users", public: false, requiresAdmin: true }, user)).toEqual({ name: "library" });
    expect(resolveRouteAccess({ path: "/admin/users", public: false, requiresAdmin: true }, { role: "admin", mustChangePassword: false })).toBe(true);
  });
});
