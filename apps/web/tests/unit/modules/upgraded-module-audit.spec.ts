import { describe, expect, it } from "vitest";
import { moduleIds } from "../../../src/modules/registry";
import {
  acceptedAuditModules,
  allUpgradedImage2Manifests,
  auditModuleIds,
  validateAcceptedAuditModules
} from "../../../src/modules/shared/upgrade/acceptedAuditModules";
import { validateImage2AssetManifests } from "../../../src/modules/shared/assets/image2Manifest";

describe("accepted upgraded module audit registry", () => {
  it("covers all M01-M39 modules in route order", () => {
    expect(auditModuleIds).toEqual(moduleIds);
    expect(acceptedAuditModules.map((module) => module.id)).toEqual(moduleIds);
  });

  it("aggregates one valid image2 manifest for every module", () => {
    expect(allUpgradedImage2Manifests.map((manifest) => manifest.moduleId)).toEqual(moduleIds);
    expect(validateImage2AssetManifests(allUpgradedImage2Manifests)).toHaveLength(39);
  });

  it("requires every audited module to expose primary action, feedback and integer-safe selectors", () => {
    expect(validateAcceptedAuditModules(acceptedAuditModules)).toHaveLength(moduleIds.length);
    for (const module of acceptedAuditModules) {
      expect(module.path).toBe(`/learn/${module.id}/${module.variantId}`);
      expect(module.primaryAction.selector.length, module.id).toBeGreaterThan(0);
      expect(module.feedbackText.length, module.id).toBeGreaterThan(0);
      expect(module.stageSelector.length, module.id).toBeGreaterThan(0);
      expect(module.integerTextSelector.length, module.id).toBeGreaterThan(0);
    }
  });
});
