import { describe, expect, it } from "vitest";
import { SlidingWindowRateLimiter } from "../../src/auth/rate-limit";

describe("authentication rate limits", () => {
  it("limits a normalized username and IP after five failures in fifteen minutes", () => {
    const limiter = new SlidingWindowRateLimiter();
    const start = new Date("2026-06-22T12:00:00.000Z");
    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(limiter.consume("login-identity-ip", "Student01|127.0.0.1", 5, 15 * 60_000, start).allowed).toBe(true);
    }
    expect(limiter.consume("login-identity-ip", "student01|127.0.0.1", 5, 15 * 60_000, start)).toMatchObject({ allowed: false });
  });

  it("automatically recovers after the window", () => {
    const limiter = new SlidingWindowRateLimiter();
    const start = new Date("2026-06-22T12:00:00.000Z");
    for (let attempt = 0; attempt < 5; attempt += 1) limiter.consume("login-identity-ip", "user|ip", 5, 900_000, start);
    expect(limiter.consume("login-identity-ip", "user|ip", 5, 900_000, new Date(start.getTime() + 900_001)).allowed).toBe(true);
  });
});
