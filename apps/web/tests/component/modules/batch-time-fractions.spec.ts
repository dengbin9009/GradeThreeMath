import { describe, expect, it } from "vitest";
import { getModuleDefinition } from "../../../src/modules/registry";

const ids = ["M22", "M23", "M24", "M25", "M26", "M27"] as const;

describe("time and fraction module batch", () => {
  it("has per-module definitions and integer-safe state", async () => {
    for (const id of ids) {
      const definition = getModuleDefinition(id);
      expect(definition.id).toBe(id);
      expect(definition.assets.length, id).toBeGreaterThan(0);
      expect(definition.normalize({ step: 2.2, numerator: 3.8 }).step).toBe(2);
      expect(await definition.component()).toHaveProperty("default");
    }
  });
});
