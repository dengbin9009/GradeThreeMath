import { expect, test } from "@playwright/test";

import { acceptedAuditModules } from "../../apps/web/src/modules/shared/upgrade/acceptedAuditModules";
import { runPrimaryAuditAction } from "./audit-helpers";

const decimalPattern = /\d+\.\d+/;

test.describe("integer-only animation audit", () => {
  for (const module of acceptedAuditModules) {
    test(`${module.id} keeps all visible numbers as integers`, async ({ page }) => {
      await page.goto(module.path);
      await runPrimaryAuditAction(page, module);

      const visibleText = await page.locator(module.integerTextSelector).first().innerText();
      expect(visibleText, `${module.id} should not render decimal numbers`).not.toMatch(decimalPattern);
    });
  }
});
