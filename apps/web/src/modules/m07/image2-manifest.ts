import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M07",
  version: 1,
  styleGuide: "关系三角柜，三个数量角、遮挡片、乘除锁和验算印章分层。",
  prompts: [
    {
      id: "m07-image2-relation-triangle",
      useCase: "scientific-educational",
      prompt: "Create a grade-three multiplication division relationship triangle cabinet with three blank quantity corners, a cover card, inverse operation lock, and verification stamp, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered inverse relationship assets for multiplication and division checking",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    { id: "triangle-background", role: "background", path: "apps/web/src/assets/module-frames/m07/image2/background-triangle-v1.webp", promptId: "m07-image2-relation-triangle", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "quantity-corner-actor", role: "actor", path: "apps/web/src/assets/module-frames/m07/image2/actor-quantity-corner-v1.png", promptId: "m07-image2-relation-triangle", transparent: true, repeatable: true, intrinsicSize: { width: 260, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "cover-state", role: "state-frame", path: "apps/web/src/assets/module-frames/m07/image2/state-cover-card-v1.png", promptId: "m07-image2-relation-triangle", transparent: true, repeatable: false, intrinsicSize: { width: 360, height: 260 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "inverse-lock-prop", role: "measure-prop", path: "apps/web/src/assets/module-frames/m07/image2/prop-inverse-lock-v1.png", promptId: "m07-image2-relation-triangle", transparent: true, repeatable: false, intrinsicSize: { width: 420, height: 240 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "verify-feedback", role: "feedback-prop", path: "apps/web/src/assets/module-frames/m07/image2/feedback-verify-stamp-v1.png", promptId: "m07-image2-relation-triangle", transparent: true, repeatable: false, intrinsicSize: { width: 260, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "fallback", role: "fallback-still", path: "apps/web/src/assets/module-frames/m07/image2/fallback-still-v1.webp", promptId: "m07-image2-relation-triangle", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "meaningful", mustNotContainText: true }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m07/image2/fallback-still-v1.webp",
  rejectedAssets: [{ path: "apps/web/src/assets/module-frames/m07/image2/static-relation-card-v0.webp", reason: "静态关系卡不能支持遮住任意未知量，遮挡片和验算式需由组件驱动。" }]
} satisfies Image2AssetManifest;
