import { describe, expect, it } from "vitest";
import { getModuleDefinition } from "../../../src/modules/registry";

const ids = ["M28", "M29", "M30", "M31", "M32", "M33", "M34", "M35", "M36", "M37", "M38"] as const;

describe("geometry and statistics module batch", () => {
  it("has per-module definitions with declared drag capability where needed", async () => {
    for (const id of ids) {
      const definition = getModuleDefinition(id);
      expect(definition.id).toBe(id);
      expect(definition.assets.length, id).toBeGreaterThan(0);
      if (["M30", "M31", "M37"].includes(id)) expect(definition.capabilities.draggable).toBe(true);
      expect(await definition.component()).toHaveProperty("default");
    }
  });
});
