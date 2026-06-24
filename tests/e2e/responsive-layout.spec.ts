import { expect, test } from "@playwright/test";

test("core learning pages do not overflow horizontally", async ({ page }) => {
  await page.goto("/learn/M20/M20-V1");
  const size = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(size.scrollWidth).toBeLessThanOrEqual(size.width);
  await expect(page.locator("[data-animation-stage]")).toBeVisible();
});
