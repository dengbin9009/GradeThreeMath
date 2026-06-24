import { expect, test } from "@playwright/test";

const operationModules = [
  { id: "M04", selector: '[data-action="merge"]', expected: "部分积" },
  { id: "M05", selector: '[data-action="regroup"]', expected: "换成小单位" },
  { id: "M06", selector: "[data-trial-slider]", expected: "太大" },
  { id: "M07", selector: '[data-cover="factor-b"]', expected: "遮住谁" },
  { id: "M08", selector: '[data-action="snap"]', expected: "磁铁" }
] as const;

test.describe("operations batch upgraded scenes", () => {
  for (const module of operationModules) {
    test(`${module.id} renders a full-size image2 stage`, async ({ page }) => {
      await page.goto(`/learn/${module.id}/${module.id}-V1`);

      await expect(page.locator("[data-animation-stage]")).toBeVisible();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
      await expect(page.locator(`[data-operation-module="${module.id}"]`)).toBeVisible();

      const control = page.locator(module.selector).first();
      if (module.id === "M06") {
        await control.evaluate((element) => {
          const input = element as HTMLInputElement;
          input.value = "6";
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        });
      } else {
        await control.click();
      }

      await expect(page.locator("[data-playful-feedback]").filter({ hasText: module.expected })).toBeVisible();
      await page.getByRole("button", { name: "复位动画" }).click();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
    });
  }
});
