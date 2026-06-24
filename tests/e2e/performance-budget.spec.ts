import { expect, test } from "@playwright/test";
import budget from "../../apps/web/performance-budget.json" assert { type: "json" };

test("learning workbench stays inside local performance budget", async ({ page }) => {
  await page.goto("/learn", { waitUntil: "domcontentloaded" });
  const firstInteractiveMs = await page.evaluate(async () => {
    const start = performance.now();
    await new Promise<void>((resolve) => {
      const tick = () => document.querySelector("h1")?.textContent?.includes("三年级数学母题库") ? resolve() : requestAnimationFrame(tick);
      tick();
    });
    return performance.now() - start;
  });
  await expect(page.getByRole("heading", { name: "三年级数学母题库" })).toBeVisible();
  expect(firstInteractiveMs).toBeLessThanOrEqual(budget.firstInteractiveMs);

  await page.goto("/learn/M09/M09-V1", { waitUntil: "domcontentloaded" });
  const moduleStructureMs = await page.evaluate(async () => {
    const start = performance.now();
    await new Promise<void>((resolve) => {
      const tick = () => document.querySelector("h1")?.textContent?.includes("算筹") ? resolve() : requestAnimationFrame(tick);
      tick();
    });
    return performance.now() - start;
  });
  await expect(page.getByRole("heading", { name: /算筹/ })).toBeVisible();
  expect(moduleStructureMs).toBeLessThanOrEqual(budget.moduleStructureMs);
});
