import { describe, expect, it } from "vitest";
import { parseEnvironment } from "../../src/config/env";
import { resolveStaticAsset } from "../../src/serve-web";

const valid = {
  DATABASE_URL: "postgres://math:math@127.0.0.1:5432/math",
  BETTER_AUTH_SECRET: "0123456789abcdef0123456789abcdef",
  APP_ORIGIN: "http://127.0.0.1:4173",
  WEB_DIST_DIR: "/tmp/math-web-dist"
};

describe("production startup config", () => {
  it("rejects missing database, weak secret and non-origin app URLs", () => {
    expect(() => parseEnvironment({ ...valid, DATABASE_URL: "" })).toThrow(/DATABASE_URL/);
    expect(() => parseEnvironment({ ...valid, BETTER_AUTH_SECRET: "short" })).toThrow(/BETTER_AUTH_SECRET/);
    expect(() => parseEnvironment({ ...valid, APP_ORIGIN: "http://127.0.0.1:4173/learn" })).toThrow(/APP_ORIGIN/);
  });

  it("serves SPA fallback without allowing path traversal", () => {
    expect(resolveStaticAsset("/learn/M39/M39-V1", valid.WEB_DIST_DIR)).toEqual({ path: "/tmp/math-web-dist/index.html", contentType: "text/html; charset=utf-8" });
    expect(resolveStaticAsset("/assets/app.js", valid.WEB_DIST_DIR)).toEqual({ path: "/tmp/math-web-dist/assets/app.js", contentType: "text/javascript; charset=utf-8" });
    expect(resolveStaticAsset("/../.env", valid.WEB_DIST_DIR)).toBeNull();
  });
});
