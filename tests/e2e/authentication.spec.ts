import { expect, test } from "@playwright/test";

async function startAnonymous(page: import("@playwright/test").Page) {
  await page.context().addCookies([
    { name: "e2e-auth-mode", value: "anonymous", domain: "127.0.0.1", path: "/" }
  ]);
}

test("logs in, completes first password change, learns, and signs out", async ({ page }) => {
  await startAnonymous(page);
  await page.goto("/login?redirect=/learn");

  await page.getByLabel("登录名").fill("first-login");
  await page.getByLabel("密码").fill("temporary-passphrase-001");
  await page.getByRole("button", { name: "进入学习工作台" }).click();

  await expect(page.getByRole("heading", { name: "先设置自己的密码" })).toBeVisible();
  await page.getByLabel("临时密码").fill("temporary-passphrase-001");
  await page.getByLabel("新密码").fill("new-private-passphrase-2026");
  await page.getByRole("button", { name: "保存并开始学习" }).click();

  await expect(page.getByRole("heading", { name: "三年级数学母题库" })).toBeVisible();
  await page.getByTitle("退出登录").click();
  await expect(page.getByRole("heading", { name: "数学母题学习工作台" })).toBeVisible();
});

test("keeps unavailable accounts out with a generic error", async ({ page }) => {
  await startAnonymous(page);
  await page.goto("/login");

  await page.getByLabel("登录名").fill("expired-user");
  await page.getByLabel("密码").fill("temporary-passphrase-001");
  await page.getByRole("button", { name: "进入学习工作台" }).click();

  await expect(page.getByRole("alert")).toHaveText("登录名、密码或账号状态不可用。");
});
