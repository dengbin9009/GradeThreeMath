import type { Locator, Page } from "@playwright/test";

import type { AcceptedAuditModule } from "../../apps/web/src/modules/shared/upgrade/acceptedAuditModules";

export async function runPrimaryAuditAction(page: Page, module: AcceptedAuditModule) {
  const target = page.locator(module.primaryAction.selector).first();

  if (module.primaryAction.kind === "range") {
    await target.evaluate(
      (element, value) => {
        const input = element as HTMLInputElement;
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      },
      module.primaryAction.value ?? "1",
    );
    return;
  }

  await target.click();
}

export function moduleFeedbackLocator(page: Page, module: AcceptedAuditModule): Locator {
  return page
    .locator('[data-playful-feedback], [data-tool-feedback], [data-feedback], .equation, [data-animation-stage]')
    .filter({ hasText: module.feedbackText })
    .first();
}

export async function assertStageImagesLoaded(stage: Locator): Promise<string[]> {
  return stage.locator("img").evaluateAll((images) =>
    images
      .map((image) => {
        const element = image as HTMLImageElement;
        return element.complete && element.naturalWidth > 0 ? "" : element.currentSrc || element.src || "missing-src";
      })
      .filter(Boolean),
  );
}
