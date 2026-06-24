import { describe, expect, it } from "vitest";
import { betterAuthRateLimitConfig } from "../../src/auth/auth";

describe("better-auth rate limit configuration", () => {
  it("does not rate limit session reads or duplicate the custom username login limiter", () => {
    expect(betterAuthRateLimitConfig.customRules["/get-session"]).toBe(false);
    expect(betterAuthRateLimitConfig.customRules["/sign-in/username"]).toBe(false);
  });
});
