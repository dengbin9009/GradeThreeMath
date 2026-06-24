import { describe, expect, it } from "vitest";
import { applicationsImage2Manifests } from "../../../src/modules/shared/assets/applicationsImage2Manifests";
import { validateImage2AssetManifests } from "../../../src/modules/shared/assets/image2Manifest";
import { getAnimationUpgradeRecord } from "../../../src/modules/shared/upgrade/upgradeRecords";

const ids = ["M10", "M11", "M13", "M14", "M15", "M16", "M17", "M18", "M19"] as const;

describe("application batch image2 manifests", () => {
  it("exposes M10-M19 application modules through one stable entrypoint", () => {
    expect(applicationsImage2Manifests.map((manifest) => manifest.moduleId)).toEqual(ids);
  });

  it("validates image2 layers and upgrade records", () => {
    expect(validateImage2AssetManifests(applicationsImage2Manifests)).toHaveLength(ids.length);
    for (const manifest of applicationsImage2Manifests) {
      expect(manifest.assets.map((asset) => asset.role)).toEqual(expect.arrayContaining(["background", "actor", "measure-prop", "feedback-prop", "fallback-still"]));
      expect(manifest.prompts[0]?.prompt).toContain("grade-three");
      expect(manifest.rejectedAssets.length, manifest.moduleId).toBeGreaterThan(0);
      expect(getAnimationUpgradeRecord(manifest.moduleId)).toMatchObject({
        batch: "applications",
        status: "in-progress",
        assetManifestPath: `apps/web/src/modules/${manifest.moduleId.toLowerCase()}/image2-manifest.ts`
      });
    }
  });
});
