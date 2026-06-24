import { describe, expect, it } from "vitest";
import { parseEnvironment } from "../../src/config/env";

const valid = {
  DATABASE_URL: "postgres://math:math@127.0.0.1:5432/math",
  BETTER_AUTH_SECRET: "0123456789abcdef0123456789abcdef",
  APP_ORIGIN: "http://127.0.0.1:4173"
};

describe("API environment", () => {
  it("accepts the required production boundary", () => {
    expect(parseEnvironment(valid).APP_ORIGIN).toBe(valid.APP_ORIGIN);
  });

  it("rejects missing variables, weak secrets and origins with paths", () => {
    expect(() => parseEnvironment({ ...valid, DATABASE_URL: "" })).toThrow(/DATABASE_URL/);
    expect(() => parseEnvironment({ ...valid, BETTER_AUTH_SECRET: "short" })).toThrow(/BETTER_AUTH_SECRET/);
    expect(() => parseEnvironment({ ...valid, APP_ORIGIN: "http://127.0.0.1:4173/learn" })).toThrow(/APP_ORIGIN/);
  });
});
