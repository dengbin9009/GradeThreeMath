import { expect, test } from "@playwright/test";

test("finds M20 through search and image filter", async ({ page }) => {
  await page.goto("/learn");
  await page.getByPlaceholder("搜索 M20、鸡兔、抬腿…").fill("M20");
  await expect(page.locator('[data-module-id="M20"]')).toBeVisible();
  await expect(page.locator('[data-module-id="M19"]')).toHaveCount(0);
  await expect(page).toHaveURL(/q=M20/);
  await page.locator('[data-module-id="M20"]').click();
  await expect(page.getByRole("heading", { name: /鸡兔同笼/ })).toBeVisible();
  await expect(page.locator("[data-animation-stage]")).toBeVisible();
});
