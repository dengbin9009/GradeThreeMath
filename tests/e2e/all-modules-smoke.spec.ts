import { expect, test } from "@playwright/test";

const moduleIds = Array.from({ length: 39 }, (_, index) => `M${String(index + 1).padStart(2, "0")}`);

test.describe("all module smoke", () => {
  test("loads every module route with a large animation stage", async ({ page }) => {
    for (const id of moduleIds) {
      await page.goto(`/learn/${id}/${id}-V1`);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(id === "M39" ? "借还还原" : /./);
      const stage = page.locator("[data-animation-stage]");
      await expect(stage).toBeVisible();
      const box = await stage.boundingBox();
      expect(box?.width ?? 0, id).toBeGreaterThan(300);
      expect(box?.height ?? 0, id).toBeGreaterThan(300);
      await expect(page.getByRole("button", { name: "复位动画" })).toBeVisible();
    }
  });
});
