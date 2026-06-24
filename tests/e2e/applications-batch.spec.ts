import { expect, test } from "@playwright/test";

const applicationModules = [
  { id: "M10", selector: '[data-action="checkout"]', expected: "收银条" },
  { id: "M11", selector: '[data-action="drive"]', expected: "路程条" },
  { id: "M13", selector: '[data-action="split-units"]', expected: "同样的一份" },
  { id: "M14", selector: '[data-action="copy-unit"]', expected: "复制机" },
  { id: "M15", selector: '[data-action="plant-points"]', expected: "点和段" },
  { id: "M16", selector: '[data-action="locate-remainder"]', expected: "余数块" },
  { id: "M17", selector: '[data-action="reverse-flow"]', expected: "倒车" },
  { id: "M18", selector: '[data-action="make-cards"]', expected: "不重不漏" },
  { id: "M19", selector: '[data-action="list-ways"]', expected: "列表" }
] as const;

test.describe("application batch upgraded scenes", () => {
  for (const module of applicationModules) {
    test(`${module.id} renders a full-size image2 application stage`, async ({ page }) => {
      await page.goto(`/learn/${module.id}/${module.id}-V1`);

      await expect(page.locator("[data-animation-stage]")).toBeVisible();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
      await expect(page.locator(`[data-application-module="${module.id}"]`)).toBeVisible();

      await page.locator(module.selector).first().click();

      await expect(page.locator("[data-playful-feedback]").filter({ hasText: module.expected })).toBeVisible();
      await page.getByRole("button", { name: "复位动画" }).click();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
    });
  }
});
