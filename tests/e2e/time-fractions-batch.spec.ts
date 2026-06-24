import { expect, test } from "@playwright/test";

const timeFractionModules = [
  { id: "M22", selector: '[data-action="flip-calendar"]', expected: "月份牌" },
  { id: "M23", selector: '[data-action="stretch-time"]', expected: "时间条" },
  { id: "M24", selector: '[data-action="choose-whole"]', expected: "单位1" },
  { id: "M25", selector: '[data-action="shade-parts"]', expected: "涂色" },
  { id: "M26", selector: '[data-action="compare-fractions"]', expected: "同一个整体" },
  { id: "M27", selector: '[data-action="share-items"]', expected: "先分再取" }
] as const;

test.describe("time and fraction upgraded scenes", () => {
  for (const module of timeFractionModules) {
    test(`${module.id} renders a full-size image2 time-fraction stage`, async ({ page }) => {
      await page.goto(`/learn/${module.id}/${module.id}-V1`);

      await expect(page.locator("[data-animation-stage]")).toBeVisible();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
      await expect(page.locator(`[data-time-fraction-module="${module.id}"]`)).toBeVisible();

      await page.locator(module.selector).first().click();

      await expect(page.locator("[data-playful-feedback]").filter({ hasText: module.expected })).toBeVisible();
      await page.getByRole("button", { name: "复位动画" }).click();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
    });
  }
});
