import { expect, test } from "@playwright/test";

test("admin creates, pauses, restores and extends a user lifecycle", async ({ page }, testInfo) => {
  const username = `student-${testInfo.project.name.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  const targetRow = page.getByRole("row", { name: new RegExp(`生命周期学生 ${username}`) });

  await page.goto("/admin/users");

  await expect(page.getByRole("heading", { name: "用户与有效期" })).toBeVisible();
  await page.getByRole("button", { name: "添加用户" }).click();
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="displayName"]').fill("生命周期学生");
  await page.locator('input[name="temporaryPassword"]').fill("temporary-passphrase-2026");
  await page.locator('input[name="validFrom"]').fill("2026-06-24T08:00");
  await page.locator('input[name="validUntil"]').fill("2026-06-30T18:00");
  await page.getByRole("button", { name: "创建用户" }).click();

  await expect(targetRow).toBeVisible();

  await targetRow.getByRole("button", { name: `编辑 ${username}` }).click();
  await page.locator('input[name="isActive"]').setChecked(false);
  await page.getByRole("button", { name: "保存更改" }).click();
  await expect(targetRow.getByText("已暂停")).toBeVisible();

  await targetRow.getByRole("button", { name: `编辑 ${username}` }).click();
  await page.locator('input[name="isActive"]').setChecked(true);
  await page.locator('input[name="validUntil"]').fill("2026-07-31T18:00");
  await page.getByRole("button", { name: "保存更改" }).click();

  await expect(targetRow.getByText("可使用")).toBeVisible();
  await expect(targetRow.getByText("2026/7/31")).toBeVisible();
});
