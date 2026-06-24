import { describe, expect, it } from "vitest";
import { timeFractionsImage2Manifests } from "../../../src/modules/shared/assets/timeFractionsImage2Manifests";
import { validateImage2AssetManifests } from "../../../src/modules/shared/assets/image2Manifest";
import { getAnimationUpgradeRecord } from "../../../src/modules/shared/upgrade/upgradeRecords";

const ids = ["M22", "M23", "M24", "M25", "M26", "M27"] as const;

describe("time and fraction image2 manifests", () => {
  it("exposes M22-M27 through one stable entrypoint", () => {
    expect(timeFractionsImage2Manifests.map((manifest) => manifest.moduleId)).toEqual(ids);
  });

  it("validates layered assets and upgrade records", () => {
    expect(validateImage2AssetManifests(timeFractionsImage2Manifests)).toHaveLength(ids.length);
    for (const manifest of timeFractionsImage2Manifests) {
      expect(manifest.assets.map((asset) => asset.role)).toEqual(expect.arrayContaining(["background", "actor", "measure-prop", "feedback-prop", "fallback-still"]));
      expect(manifest.prompts[0]?.prompt).toContain("grade-three");
      expect(manifest.rejectedAssets.length, manifest.moduleId).toBeGreaterThan(0);
      expect(getAnimationUpgradeRecord(manifest.moduleId)).toMatchObject({
        batch: "time-fractions",
        status: "in-progress",
        assetManifestPath: `apps/web/src/modules/${manifest.moduleId.toLowerCase()}/image2-manifest.ts`
      });
    }
  });
});
