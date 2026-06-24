import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M08",
  version: 1,
  styleGuide: "数轴望远镜，数字点、整十整百刻度、缩放镜头和估算磁铁分层。",
  prompts: [
    {
      id: "m08-image2-numberline-zoom",
      useCase: "scientific-educational",
      prompt: "Create a grade-three number line zoom telescope with a movable number point, tens and hundreds tick marks, zoom lens, and estimation magnet, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered estimation number line assets for rounding and approximation",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    { id: "numberline-background", role: "background", path: "apps/web/src/assets/module-frames/m08/image2/background-numberline-v1.webp", promptId: "m08-image2-numberline-zoom", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "number-point-actor", role: "actor", path: "apps/web/src/assets/module-frames/m08/image2/actor-number-point-v1.png", promptId: "m08-image2-numberline-zoom", transparent: true, repeatable: false, intrinsicSize: { width: 220, height: 220 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "zoom-state", role: "state-frame", path: "apps/web/src/assets/module-frames/m08/image2/state-zoom-lens-v1.png", promptId: "m08-image2-numberline-zoom", transparent: true, repeatable: false, intrinsicSize: { width: 520, height: 320 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "tick-prop", role: "measure-prop", path: "apps/web/src/assets/module-frames/m08/image2/prop-tick-marks-v1.png", promptId: "m08-image2-numberline-zoom", transparent: true, repeatable: false, intrinsicSize: { width: 860, height: 220 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "magnet-feedback", role: "feedback-prop", path: "apps/web/src/assets/module-frames/m08/image2/feedback-estimation-magnet-v1.png", promptId: "m08-image2-numberline-zoom", transparent: true, repeatable: false, intrinsicSize: { width: 260, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "fallback", role: "fallback-still", path: "apps/web/src/assets/module-frames/m08/image2/fallback-still-v1.webp", promptId: "m08-image2-numberline-zoom", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "meaningful", mustNotContainText: true }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m08/image2/fallback-still-v1.webp",
  rejectedAssets: [{ path: "apps/web/src/assets/module-frames/m08/image2/static-rounded-number-v0.webp", reason: "静态近似数图不能表达数字点到左右刻度的距离，数轴位置必须实时计算。" }]
} satisfies Image2AssetManifest;
