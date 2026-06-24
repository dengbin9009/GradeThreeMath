import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M06",
  version: 1,
  styleGuide: "试商升降台，试商滑杆、乘积条、被除数条、天花板线和余数道具分层。",
  prompts: [
    {
      id: "m06-image2-trial-quotient",
      useCase: "scientific-educational",
      prompt: "Create a grade-three trial quotient platform with a quotient slider, product bar, dividend comparison bar, ceiling line, and remainder token, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered trial division assets for quotient adjustment",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    { id: "platform-background", role: "background", path: "apps/web/src/assets/module-frames/m06/image2/background-platform-v1.webp", promptId: "m06-image2-trial-quotient", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "quotient-slider-actor", role: "actor", path: "apps/web/src/assets/module-frames/m06/image2/actor-quotient-slider-v1.png", promptId: "m06-image2-trial-quotient", transparent: true, repeatable: false, intrinsicSize: { width: 520, height: 180 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "product-bar-state", role: "state-frame", path: "apps/web/src/assets/module-frames/m06/image2/state-product-bar-v1.png", promptId: "m06-image2-trial-quotient", transparent: true, repeatable: false, intrinsicSize: { width: 820, height: 240 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "remainder-prop", role: "measure-prop", path: "apps/web/src/assets/module-frames/m06/image2/prop-remainder-token-v1.png", promptId: "m06-image2-trial-quotient", transparent: true, repeatable: false, intrinsicSize: { width: 260, height: 220 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "too-large-feedback", role: "feedback-prop", path: "apps/web/src/assets/module-frames/m06/image2/feedback-ceiling-warning-v1.png", promptId: "m06-image2-trial-quotient", transparent: true, repeatable: false, intrinsicSize: { width: 260, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "fallback", role: "fallback-still", path: "apps/web/src/assets/module-frames/m06/image2/fallback-still-v1.webp", promptId: "m06-image2-trial-quotient", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "meaningful", mustNotContainText: true }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m06/image2/fallback-still-v1.webp",
  rejectedAssets: [{ path: "apps/web/src/assets/module-frames/m06/image2/static-trial-quotient-v0.webp", reason: "静态试商图不能体现商过大或过小的调整过程，乘积条必须跟随滑杆变化。" }]
} satisfies Image2AssetManifest;
