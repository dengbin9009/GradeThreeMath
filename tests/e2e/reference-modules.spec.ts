import { expect, test } from "@playwright/test";

const referenceModules = [
  { id: "M09", selector: "#place-number", stage: true, expected: "零也占位" },
  { id: "M12", selector: '[data-step="tail-off-bridge"]', stage: true, expected: "车尾离桥" },
  { id: "M20", selector: '[data-action="lift"]', stage: true, expected: "一对一收走" },
  { id: "M21", selector: '[data-action="split"]', stage: true, expected: "每人差" },
  { id: "M39", selector: '[data-step="undo-borrow"]', stage: false, expected: "13 - 12 + 22 = 23" }
];

test.describe("reference module core paths", () => {
  for (const module of referenceModules) {
    test(`${module.id} supports its primary interaction and reset`, async ({ page }) => {
      await page.goto(`/learn/${module.id}/${module.id}-V1`);
      const stage = page.locator("[data-animation-stage]");
      await expect(stage).toBeVisible();
      if (module.stage) {
        await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
      }
      await page.locator(module.selector).click();
      await expect(page.locator("[data-playful-feedback], [data-tool-feedback], .equation").filter({ hasText: module.expected }).first()).toBeVisible();
      await expect(page.getByRole("button", { name: "复位动画" })).toBeVisible();
      await page.getByRole("button", { name: "复位动画" }).click();
      await expect(stage).toBeVisible();
    });
  }
});
