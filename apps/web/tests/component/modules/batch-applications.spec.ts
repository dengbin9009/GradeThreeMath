import { describe, expect, it } from "vitest";
import { getModuleDefinition } from "../../../src/modules/registry";

const ids = ["M10", "M11", "M13", "M14", "M15", "M16", "M17", "M18", "M19"] as const;

describe("application module batch", () => {
  it("has per-module definitions with stepped image stages", async () => {
    for (const id of ids) {
      const definition = getModuleDefinition(id);
      expect(definition.id).toBe(id);
      expect(definition.steps).toHaveLength(4);
      expect(definition.assets.length, id).toBeGreaterThan(0);
      expect(await definition.component()).toHaveProperty("default");
    }
  });
});
