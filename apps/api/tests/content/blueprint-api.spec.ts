import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createApiApp } from "../../src/app";
import { makeUser } from "../helpers/auth-fixtures";

const blueprint = JSON.parse(readFileSync(new URL("../../../../data/grade3-math-blueprint.json", import.meta.url), "utf8"));

describe("protected blueprint API", () => {
  it("returns no private payload or ETag without a session", async () => {
    const app = createApiApp({ blueprint, resolveSession: async () => null });
    const response = await app.request("/api/blueprint");
    expect(response.status).toBe(401);
    expect(response.headers.get("etag")).toBeNull();
    expect(await response.text()).not.toContain("knowledgeNodes");
  });

  it("returns validated content with ETag and supports 304", async () => {
    const now = new Date("2026-06-22T12:00:00.000Z");
    const app = createApiApp({
      blueprint,
      now: () => now,
      resolveSession: async () => ({ user: makeUser(), session: { id: "ses_1", expiresAt: new Date("2026-06-22T20:00:00.000Z") } })
    });
    const first = await app.request("/api/blueprint");
    expect(first.status).toBe(200);
    expect((await first.json()).archetypes).toHaveLength(39);
    const etag = first.headers.get("etag");
    expect(etag).toBeTruthy();
    const cached = await app.request("/api/blueprint", { headers: { "if-none-match": etag! } });
    expect(cached.status).toBe(304);
  });
});
