import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M04",
  version: 1,
  styleGuide: "面积阵列地毯，长宽可拆成整十和个位区域，部分积区域和合并框分层。",
  prompts: [
    {
      id: "m04-image2-area-array",
      useCase: "scientific-educational",
      prompt: "Create a grade-three multiplication area array carpet with split tens and ones regions, movable partition boards, partial-product tiles, and a merge tray, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered area array assets for two-digit multiplication",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    { id: "array-background", role: "background", path: "apps/web/src/assets/module-frames/m04/image2/background-array-v1.webp", promptId: "m04-image2-area-array", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "partial-tile-actor", role: "actor", path: "apps/web/src/assets/module-frames/m04/image2/actor-partial-tile-v1.png", promptId: "m04-image2-area-array", transparent: true, repeatable: true, intrinsicSize: { width: 280, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "partition-state", role: "state-frame", path: "apps/web/src/assets/module-frames/m04/image2/state-partition-v1.png", promptId: "m04-image2-area-array", transparent: true, repeatable: false, intrinsicSize: { width: 620, height: 420 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "partial-area-prop", role: "measure-prop", path: "apps/web/src/assets/module-frames/m04/image2/prop-partial-area-labels-v1.png", promptId: "m04-image2-area-array", transparent: true, repeatable: false, intrinsicSize: { width: 640, height: 260 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "merge-feedback", role: "feedback-prop", path: "apps/web/src/assets/module-frames/m04/image2/feedback-missing-area-v1.png", promptId: "m04-image2-area-array", transparent: true, repeatable: false, intrinsicSize: { width: 260, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "fallback", role: "fallback-still", path: "apps/web/src/assets/module-frames/m04/image2/fallback-still-v1.webp", promptId: "m04-image2-area-array", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "meaningful", mustNotContainText: true }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m04/image2/fallback-still-v1.webp",
  rejectedAssets: [{ path: "apps/web/src/assets/module-frames/m04/image2/static-array-answer-v0.webp", reason: "静态阵列答案无法表达整十和个位拆分，部分积必须由组件实时计算。" }]
} satisfies Image2AssetManifest;
