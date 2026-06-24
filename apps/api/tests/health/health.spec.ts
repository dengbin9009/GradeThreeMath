import { describe, expect, it } from "vitest";
import { createApiApp } from "../../src/app";

describe("health endpoints", () => {
  it("returns minimal liveness and readiness data", async () => {
    const app = createApiApp({ databaseReady: async () => true });
    expect(await (await app.request("/api/health/live")).json()).toEqual({ status: "live" });
    expect(await (await app.request("/api/health/ready")).json()).toEqual({ status: "ready" });
  });

  it("reports only not-ready when the database is unavailable", async () => {
    const app = createApiApp({ databaseReady: async () => false });
    const response = await app.request("/api/health/ready");
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "not-ready" });
  });
});
