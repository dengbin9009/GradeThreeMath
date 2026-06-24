import { describe, expect, it } from "vitest";
import { operationsImage2Manifests } from "../../../src/modules/shared/assets/operationsImage2Manifests";
import { validateImage2AssetManifests } from "../../../src/modules/shared/assets/image2Manifest";
import { getAnimationUpgradeRecord } from "../../../src/modules/shared/upgrade/upgradeRecords";

describe("operations batch image2 manifests", () => {
  it("exposes M04-M08 through one stable entrypoint", () => {
    expect(operationsImage2Manifests.map((manifest) => manifest.moduleId)).toEqual(["M04", "M05", "M06", "M07", "M08"]);
  });

  it("validates required image2 layers and decision records", () => {
    expect(validateImage2AssetManifests(operationsImage2Manifests)).toHaveLength(5);
    for (const manifest of operationsImage2Manifests) {
      expect(manifest.assets.map((asset) => asset.role)).toEqual(expect.arrayContaining(["background", "actor", "measure-prop", "feedback-prop", "fallback-still"]));
      expect(manifest.prompts[0]?.prompt).toContain("grade-three");
      expect(manifest.rejectedAssets.length, manifest.moduleId).toBeGreaterThan(0);
      expect(getAnimationUpgradeRecord(manifest.moduleId)).toMatchObject({
        batch: "operations",
        status: "in-progress",
        assetManifestPath: `apps/web/src/modules/${manifest.moduleId.toLowerCase()}/image2-manifest.ts`
      });
    }
  });
});
