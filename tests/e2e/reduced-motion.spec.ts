import { expect, test } from "@playwright/test";

test("reduced motion still shows the animation stage", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/learn/M09/M09-V1");
  await expect(page.locator("[data-animation-stage]")).toBeVisible();
  const motion = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  expect(motion).toBe(true);
  const transitionDuration = await page.locator("button").first().evaluate((element) => getComputedStyle(element).transitionDuration);
  const durationMs = transitionDuration.endsWith("ms") ? Number.parseFloat(transitionDuration) : Number.parseFloat(transitionDuration) * 1000;
  expect(durationMs).toBeLessThanOrEqual(0.001);
});
