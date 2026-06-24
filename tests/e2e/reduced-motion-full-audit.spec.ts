import { expect, test } from "@playwright/test";

import { acceptedAuditModules } from "../../apps/web/src/modules/shared/upgrade/acceptedAuditModules";
import { moduleFeedbackLocator, runPrimaryAuditAction } from "./audit-helpers";

test.describe("reduced-motion full animation audit", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const module of acceptedAuditModules) {
    test(`${module.id} remains usable with reduced motion`, async ({ page }) => {
      await page.goto(module.path);

      const prefersReducedMotion = await page.evaluate(() =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
      expect(prefersReducedMotion).toBe(true);

      await expect(page.locator("[data-animation-stage]").first()).toBeVisible();
      await expect(page.locator(module.stageSelector).first()).toBeVisible();

      await runPrimaryAuditAction(page, module);
      await expect(moduleFeedbackLocator(page, module)).toBeVisible();
    });
  }
});
