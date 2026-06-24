import { expect, test } from "@playwright/test";

test("keyboard can reach search, open a module and close coach", async ({ page }) => {
  await page.goto("/learn");
  await page.getByPlaceholder("搜索 M20、鸡兔、抬腿…").focus();
  await page.keyboard.type("M39");
  await expect(page).toHaveURL(/q=M39/);
  await page.locator('[data-module-id="M39"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: /借还还原/ })).toBeVisible();
  await page.locator('button[aria-label="打开家长辅导"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "怎么陪孩子想" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "怎么陪孩子想" })).toHaveCount(0);
});
