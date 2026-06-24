import { expect, test } from "@playwright/test";

const referenceModules = [
  { id: "M09", title: /数字工具|算筹|算盘|计算器/, actionSelector: "#place-number" },
  { id: "M12", title: /火车过桥|过桥/, actionSelector: '[data-step="head-on-bridge"]' },
  { id: "M20", title: /鸡兔同笼|鸡兔/, actionSelector: '[data-action="lift"]' },
  { id: "M21", title: /盈亏调整|盈亏/, actionSelector: '[data-action="split"]' },
  { id: "M39", title: /借还还原|借还/, actionSelector: '[data-step="undo-return"]' }
];

test.describe("reference module visuals", () => {
  for (const module of referenceModules) {
    test(`${module.id} renders a large non-empty interactive stage`, async ({ page }) => {
      await page.goto(`/learn/${module.id}/${module.id}-V1`);
      await expect(page.getByRole("heading", { name: module.title })).toBeVisible();
      const stage = page.locator("[data-animation-stage]");
      await expect(stage).toBeVisible();
      const box = await stage.boundingBox();
      const viewport = page.viewportSize() ?? { width: 1440, height: 900 };
      expect(box?.width ?? 0).toBeGreaterThan(Math.min(640, viewport.width * 0.9));
      expect(box?.height ?? 0).toBeGreaterThan(Math.min(360, viewport.height * 0.4));
      const action = page.locator(module.actionSelector);
      await expect(action).toBeVisible();
      await action.click();
      const screenshot = await stage.screenshot();
      expect(screenshot.byteLength).toBeGreaterThan(20_000);
    });
  }
});
