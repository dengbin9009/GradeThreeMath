import { expect, test } from "@playwright/test";

const geometryModules = [
  { id: "M28", selector: '[data-action="zoom-ruler"]', expected: "尺带" },
  { id: "M29", selector: '[data-action="tile-area"]', expected: "铺砖" },
  { id: "M30", selector: '[data-action="drag-size"]', expected: "行列" },
  { id: "M32", selector: '[data-action="count-grid"]', expected: "半格" },
  { id: "M33", selector: '[data-action="trace-boundary"]', expected: "边界" },
  { id: "M34", selector: '[data-action="wrap-fence"]', expected: "四条边" },
  { id: "M35", selector: '[data-action="reshape-rope"]', expected: "面积榜" },
  { id: "M36", selector: '[data-action="mirror-shape"]', expected: "镜面" },
  { id: "M37", selector: '[data-action="classify-triangle"]', expected: "分类牌" },
  { id: "M38", selector: '[data-action="raise-bars"]', expected: "刻度" }
] as const;

test.describe("geometry and statistics upgraded scenes", () => {
  for (const module of geometryModules) {
    test(`${module.id} renders a full-size image2 geometry stage`, async ({ page }) => {
      await page.goto(`/learn/${module.id}/${module.id}-V1`);

      await expect(page.locator("[data-animation-stage]")).toBeVisible();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
      await expect(page.locator(`[data-geometry-module="${module.id}"]`)).toBeVisible();

      await page.locator(module.selector).first().click();

      await expect(page.locator("[data-playful-feedback]").filter({ hasText: module.expected })).toBeVisible();
      await page.getByRole("button", { name: "复位动画" }).click();
      await expect(page.locator(`[data-upgrade-stage="scene"][data-module-id="${module.id}"]`)).toBeVisible();
    });
  }
});
