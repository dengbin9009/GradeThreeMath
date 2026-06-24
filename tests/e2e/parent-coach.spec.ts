import { expect, test } from "@playwright/test";

test("opens and closes the parent coach without losing the stage", async ({ page }) => {
  await page.goto("/learn/M12/M12-V1");
  await page.getByRole("button", { name: "打开家长辅导" }).click();
  await expect(page.getByRole("dialog", { name: "怎么陪孩子想" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "留意这个误区" })).toBeVisible();
  await page.getByRole("button", { name: "关闭家长辅导" }).click();
  await expect(page.locator("[data-animation-stage]")).toBeVisible();
});
