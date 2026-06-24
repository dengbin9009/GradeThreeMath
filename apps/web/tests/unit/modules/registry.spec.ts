import { describe, expect, it } from "vitest";
import { moduleIds, moduleRegistry } from "../../../src/modules/registry";

describe("module registry", () => {
  it("contains every M01-M39 module exactly once", () => {
    const expected = Array.from({ length: 39 }, (_, index) => `M${String(index + 1).padStart(2, "0")}`);
    expect(moduleIds).toEqual(expected);
    expect(Object.keys(moduleRegistry)).toEqual(expected);
  });

  it("declares required learning capabilities", () => {
    for (const definition of Object.values(moduleRegistry)) {
      expect(definition.capabilities.interactive).toBe(true);
      expect(definition.capabilities.resettable).toBe(true);
      expect(definition.steps.length).toBeGreaterThanOrEqual(2);
    }
  });
});
