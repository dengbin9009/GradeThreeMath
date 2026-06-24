import { expect, test } from "@playwright/test";

const sampleModules = [
  { id: "M01", path: "/learn/M01/M01-V1", action: '[data-order="combine-last"]', expected: "重新排队" },
  { id: "M02", path: "/learn/M02/M02-V1", action: '[data-step="send-root"]', expected: "先加工" },
  { id: "M03", path: "/learn/M03/M03-V1", action: '[data-action="carry"]', expected: "进位小车" },
  { id: "M31", path: "/learn/M31/M31-V2", action: '[data-method="split"]', expected: "整块好算" }
];

test.describe("second-stage sample module paths", () => {
  for (const module of sampleModules) {
    test(`${module.id} renders its upgraded sample stage and primary interaction`, async ({ page }) => {
      await page.goto(module.path);
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
      await page.locator(module.action).click();
      await expect(page.locator("[data-playful-feedback]").filter({ hasText: module.expected })).toBeVisible();
      await page.getByRole("button", { name: "复位动画" }).click();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
    });
  }
});
