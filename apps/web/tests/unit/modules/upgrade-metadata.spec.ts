import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { moduleIds } from "../../../src/modules/registry";
import {
  getAnimationUpgradeRecord,
  upgradeRecords,
  validateUpgradeRecords
} from "../../../src/modules/shared/upgrade/upgradeRecords";

describe("animation upgrade records", () => {
  it("tracks every M01-M39 module exactly once", () => {
    const ids = upgradeRecords.map((record) => record.moduleId);
    expect(ids).toEqual(moduleIds);
    expect(new Set(ids).size).toBe(39);
  });

  it("marks the five accepted reference modules as baseline quality level 3", () => {
    for (const id of ["M09", "M12", "M20", "M21", "M39"] as const) {
      expect(getAnimationUpgradeRecord(id)).toMatchObject({
        moduleId: id,
        status: "accepted",
        batch: "baseline",
        qualityLevel: 3
      });
    }
  });

  it("plans M01, M02, M03 and M31 as second-stage samples", () => {
    for (const id of ["M01", "M02", "M03", "M31"] as const) {
      expect(getAnimationUpgradeRecord(id)).toMatchObject({
        moduleId: id,
        status: "planned",
        batch: "sample"
      });
    }
  });

  it("does not lose the blueprint content baseline while adding upgrade metadata", () => {
    const blueprint = JSON.parse(readFileSync(resolve(process.cwd(), "../../data/grade3-math-blueprint.json"), "utf8"));
    expect(blueprint.knowledgeNodes).toHaveLength(38);
    expect(blueprint.archetypes).toHaveLength(39);
    expect(blueprint.archetypes.flatMap((item: { variants: unknown[] }) => item.variants)).toHaveLength(117);
  });

  it("rejects duplicate or incomplete upgrade records", () => {
    const invalid = [
      upgradeRecords[0]!,
      { ...upgradeRecords[0]!, status: "accepted" as const, assetManifestPath: "" }
    ];
    expect(() => validateUpgradeRecords(invalid)).toThrow(/duplicate|asset manifest/i);
  });
});
