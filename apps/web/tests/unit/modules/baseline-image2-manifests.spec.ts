import { describe, expect, it } from "vitest";
import { baselineImage2Manifests } from "../../../src/modules/shared/assets/baselineImage2Manifests";
import {
  validateImage2AssetManifest,
  validateImage2AssetManifests
} from "../../../src/modules/shared/assets/image2Manifest";
import {
  baselineCoachNotes,
  getBaselineCoachNote,
  validateBaselineCoachNotes
} from "../../../src/modules/shared/upgrade/baselineCoachNotes";
import { getAnimationUpgradeRecord } from "../../../src/modules/shared/upgrade/upgradeRecords";

describe("baseline module image2 manifests", () => {
  const manifests = baselineImage2Manifests;

  it("exposes the accepted baseline manifests through one stable entrypoint", () => {
    expect(manifests.map((manifest) => manifest.moduleId)).toEqual(["M09", "M12", "M20", "M21", "M39"]);
  });

  it("validates all five reference module manifests", () => {
    expect(validateImage2AssetManifests(manifests)).toHaveLength(5);
  });

  it("matches accepted upgrade records", () => {
    for (const manifest of manifests) {
      const record = getAnimationUpgradeRecord(manifest.moduleId);
      expect(record.status).toBe("accepted");
      expect(record.assetManifestPath).toBe(`apps/web/src/modules/${manifest.moduleId.toLowerCase()}/image2-manifest.ts`);
      expect(() => validateImage2AssetManifest(manifest)).not.toThrow();
    }
  });

  it("records at least one rejected or adopted image2 decision per baseline module", () => {
    for (const manifest of manifests) {
      expect(manifest.prompts.length + manifest.rejectedAssets.length).toBeGreaterThan(0);
      expect(manifest.assets.some((asset) => asset.role === "fallback-still")).toBe(true);
    }
  });

  it("keeps one parent-facing explanation and mistake cue for each accepted baseline module", () => {
    expect(validateBaselineCoachNotes(baselineCoachNotes)).toHaveLength(5);

    for (const manifest of manifests) {
      const note = getBaselineCoachNote(manifest.moduleId);
      expect(note.oneSentenceCoach.length).toBeGreaterThan(10);
      expect(note.commonMistakeCue.length).toBeGreaterThan(10);
      expect(note.childPrompt.length).toBeGreaterThan(6);
      expect(note.oneSentenceCoach).not.toMatch(/\d+\.\d/);
    }
  });
});
