import { expect, test } from "@playwright/test";

test("M39 updates shelf, returned basket and borrowed basket through replay", async ({ page }) => {
  await page.goto("/learn/M39/M39-V1");
  await expect(page.locator('[data-zone="shelf"] [data-book]')).toHaveCount(13);
  await page.getByRole("button", { name: "撤销还回" }).click();
  await expect(page.locator('[data-zone="shelf"] [data-book]')).toHaveCount(1);
  await expect(page.locator('[data-zone="returned"] [data-book]')).toHaveCount(12);
  await page.getByRole("button", { name: "撤销借出" }).click();
  await expect(page.locator('[data-zone="shelf"] [data-book]')).toHaveCount(23);
  await expect(page.locator('[data-zone="borrowed"] [data-book]')).toHaveCount(22);
  await page.getByRole("button", { name: "复位动画" }).click();
  await expect(page.locator('[data-zone="shelf"] [data-book]')).toHaveCount(13);
});
