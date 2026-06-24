import { expect, test } from "@playwright/test";

import { acceptedAuditModules } from "../../apps/web/src/modules/shared/upgrade/acceptedAuditModules";
import { assertStageImagesLoaded, moduleFeedbackLocator, runPrimaryAuditAction } from "./audit-helpers";

const internalStatusPattern =
  /image2|fallback-still|assetManifest|not-started|in-progress|accepted|blocked|基准动画/i;

test.describe("full accepted animation audit", () => {
  for (const module of acceptedAuditModules) {
    test(`${module.id} renders a large interactive stage and child-facing feedback`, async ({ page }) => {
      await page.goto(module.path);

      const shell = page.locator("[data-animation-stage]").first();
      await expect(shell).toBeVisible();

      const box = await shell.boundingBox();
      expect(box?.width ?? 0, `${module.id} stage should be a large interaction surface`).toBeGreaterThan(320);
      expect(box?.height ?? 0, `${module.id} stage should be a large interaction surface`).toBeGreaterThan(280);

      await expect(page.locator(module.stageSelector).first()).toBeVisible();

      const brokenImages = await assertStageImagesLoaded(shell);
      expect(brokenImages, `${module.id} should not show broken image assets`).toEqual([]);

      await runPrimaryAuditAction(page, module);
      await expect(moduleFeedbackLocator(page, module)).toBeVisible();

      const stageText = await shell.innerText();
      expect(stageText, `${module.id} should not expose implementation status text`).not.toMatch(internalStatusPattern);
    });
  }
});
