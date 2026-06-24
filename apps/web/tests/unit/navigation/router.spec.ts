import { describe, expect, it } from "vitest";
import { createAppRouter } from "../../../src/app/router";

describe("application routes", () => {
  it("resolves library, lesson and admin routes", () => {
    const router = createAppRouter("memory");
    expect(router.resolve("/learn").name).toBe("library");
    expect(router.resolve("/learn/M20/M20-V1").params).toEqual({ archetypeId: "M20", variantId: "M20-V1" });
    expect(router.resolve("/admin/users").meta.requiresAdmin).toBe(true);
  });

  it("redirects malformed module ids to the library", async () => {
    const router = createAppRouter("memory");
    await router.push("/learn/M99");
    await router.isReady();
    expect(router.currentRoute.value.path).toBe("/learn");
  });
});
