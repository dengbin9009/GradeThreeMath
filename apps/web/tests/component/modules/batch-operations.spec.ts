import { describe, expect, it } from "vitest";
import { getModuleDefinition } from "../../../src/modules/registry";

const ids = ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08"] as const;

describe("operation module batch", () => {
  it("has per-module definitions with integer normalization and image assets", async () => {
    for (const id of ids) {
      const definition = getModuleDefinition(id);
      expect(definition.id).toBe(id);
      expect(definition.capabilities.imageAnimation).toBe(true);
      expect(definition.assets.length, id).toBeGreaterThan(0);
      expect(definition.normalize({ step: 1.7 }).step).toBe(2);
      expect(await definition.component()).toHaveProperty("default");
    }
  });
});
