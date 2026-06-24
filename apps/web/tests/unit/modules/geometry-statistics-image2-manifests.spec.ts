import { describe, expect, it } from "vitest";
import { geometryStatisticsImage2Manifests } from "../../../src/modules/shared/assets/geometryStatisticsImage2Manifests";
import { validateImage2AssetManifests } from "../../../src/modules/shared/assets/image2Manifest";
import { getAnimationUpgradeRecord } from "../../../src/modules/shared/upgrade/upgradeRecords";

const ids = ["M28", "M29", "M30", "M31", "M32", "M33", "M34", "M35", "M36", "M37", "M38"] as const;

describe("geometry and statistics image2 manifests", () => {
  it("exposes M28-M38 through one stable entrypoint", () => {
    expect(geometryStatisticsImage2Manifests.map((manifest) => manifest.moduleId)).toEqual(ids);
  });

  it("validates layered assets and upgrade records", () => {
    expect(validateImage2AssetManifests(geometryStatisticsImage2Manifests)).toHaveLength(ids.length);
    for (const manifest of geometryStatisticsImage2Manifests) {
      expect(manifest.assets.map((asset) => asset.role)).toEqual(expect.arrayContaining(["background", "actor", "measure-prop", "feedback-prop", "fallback-still"]));
      expect(manifest.prompts[0]?.prompt).toContain("grade-three");
      expect(manifest.rejectedAssets.length, manifest.moduleId).toBeGreaterThan(0);

      const record = getAnimationUpgradeRecord(manifest.moduleId);
      if (manifest.moduleId === "M31") {
        expect(record).toMatchObject({ batch: "sample", assetManifestPath: "apps/web/src/modules/m31/image2-manifest.ts" });
      } else {
        expect(record).toMatchObject({
          batch: "geometry-statistics",
          status: "in-progress",
          assetManifestPath: `apps/web/src/modules/${manifest.moduleId.toLowerCase()}/image2-manifest.ts`
        });
      }
    }
  });
});
