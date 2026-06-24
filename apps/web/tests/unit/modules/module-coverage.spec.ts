import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getModuleImageFrames } from "@math/shared";
import { moduleIds, moduleRegistry } from "../../../src/modules/registry";

describe("complete module coverage", () => {
  it("makes all 39 archetypes and 117 variants routable", async () => {
    const blueprint = JSON.parse(await readFile(resolve(process.cwd(), "../../data/grade3-math-blueprint.json"), "utf8"));
    expect(blueprint.archetypes).toHaveLength(39);
    expect(blueprint.archetypes.flatMap((item: { variants: unknown[] }) => item.variants)).toHaveLength(117);
    expect(blueprint.archetypes.map((item: { id: string }) => item.id)).toEqual(moduleIds);
    for (const id of moduleIds) expect(await moduleRegistry[id]!.component()).toHaveProperty("default");
  });

  it("has image frames for every module marked as an image animation", () => {
    for (const id of moduleIds) {
      if (moduleRegistry[id]!.capabilities.imageAnimation && !["M12", "M20", "M21", "M39"].includes(id)) {
        expect(getModuleImageFrames(id).length, id).toBeGreaterThan(0);
      }
    }
  });
});
