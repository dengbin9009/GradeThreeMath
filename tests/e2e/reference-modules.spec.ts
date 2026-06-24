import { expect, test } from "@playwright/test";

const referenceModules = [
  { id: "M09", selector: "#place-number" },
  { id: "M12", selector: '[data-step="tail-off-bridge"]' },
  { id: "M20", selector: '[data-action="lift"]' },
  { id: "M21", selector: '[data-action="split"]' },
  { id: "M39", selector: '[data-step="undo-borrow"]' }
];

test.describe("reference module core paths", () => {
  for (const module of referenceModules) {
    test(`${module.id} supports its primary interaction and reset`, async ({ page }) => {
      await page.goto(`/learn/${module.id}/${module.id}-V1`);
      const stage = page.locator("[data-animation-stage]");
      await expect(stage).toBeVisible();
      await page.locator(module.selector).click();
      await expect(page.getByRole("button", { name: "复位动画" })).toBeVisible();
      await page.getByRole("button", { name: "复位动画" }).click();
      await expect(stage).toBeVisible();
    });
  }
});
