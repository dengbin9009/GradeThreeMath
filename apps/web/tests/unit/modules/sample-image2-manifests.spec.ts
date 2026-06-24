import { describe, expect, it } from "vitest";
import { sampleImage2Manifests } from "../../../src/modules/shared/assets/sampleImage2Manifests";
import { validateImage2AssetManifests } from "../../../src/modules/shared/assets/image2Manifest";
import { getAnimationUpgradeRecord } from "../../../src/modules/shared/upgrade/upgradeRecords";

describe("second-stage sample image2 manifests", () => {
  it("exposes M01, M02, M03 and M31 through one stable entrypoint", () => {
    expect(sampleImage2Manifests.map((manifest) => manifest.moduleId)).toEqual(["M01", "M02", "M03", "M31"]);
  });

  it("validates required image2 layers and records a decision trail", () => {
    expect(validateImage2AssetManifests(sampleImage2Manifests)).toHaveLength(4);

    for (const manifest of sampleImage2Manifests) {
      const roles = manifest.assets.map((asset) => asset.role);
      expect(roles).toEqual(expect.arrayContaining(["background", "actor", "measure-prop", "feedback-prop", "fallback-still"]));
      expect(manifest.rejectedAssets.length, manifest.moduleId).toBeGreaterThan(0);
      expect(manifest.prompts[0]?.prompt).toContain("grade-three");
    }
  });

  it("keeps sample modules planned until visual acceptance is complete", () => {
    for (const manifest of sampleImage2Manifests) {
      const record = getAnimationUpgradeRecord(manifest.moduleId);
      expect(record.status).toBe("planned");
      expect(record.assetManifestPath).toBe(`apps/web/src/modules/${manifest.moduleId.toLowerCase()}/image2-manifest.ts`);
    }
  });
});
