import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M05",
  version: 1,
  styleGuide: "分物托盘，百十个方块、托盘、剩余台和换位拆分道具分层。",
  prompts: [
    {
      id: "m05-image2-sharing-trays",
      useCase: "scientific-educational",
      prompt: "Create a grade-three division sharing table with reusable base-ten blocks, equal sharing trays, a remainder platform, and regrouping props, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered division tray assets for quotient and remainder",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    { id: "tray-background", role: "background", path: "apps/web/src/assets/module-frames/m05/image2/background-trays-v1.webp", promptId: "m05-image2-sharing-trays", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "base-ten-actor", role: "actor", path: "apps/web/src/assets/module-frames/m05/image2/actor-base-ten-block-v1.png", promptId: "m05-image2-sharing-trays", transparent: true, repeatable: true, intrinsicSize: { width: 220, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "regroup-state", role: "state-frame", path: "apps/web/src/assets/module-frames/m05/image2/state-regroup-v1.png", promptId: "m05-image2-sharing-trays", transparent: true, repeatable: false, intrinsicSize: { width: 520, height: 320 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "quotient-tray-prop", role: "measure-prop", path: "apps/web/src/assets/module-frames/m05/image2/prop-quotient-trays-v1.png", promptId: "m05-image2-sharing-trays", transparent: true, repeatable: false, intrinsicSize: { width: 640, height: 260 }, altPolicy: "meaningful", mustNotContainText: true },
    { id: "remainder-feedback", role: "feedback-prop", path: "apps/web/src/assets/module-frames/m05/image2/feedback-remainder-seat-v1.png", promptId: "m05-image2-sharing-trays", transparent: true, repeatable: false, intrinsicSize: { width: 260, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
    { id: "fallback", role: "fallback-still", path: "apps/web/src/assets/module-frames/m05/image2/fallback-still-v1.webp", promptId: "m05-image2-sharing-trays", transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "meaningful", mustNotContainText: true }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m05/image2/fallback-still-v1.webp",
  rejectedAssets: [{ path: "apps/web/src/assets/module-frames/m05/image2/static-long-division-v0.webp", reason: "静态除法竖式无法表达平均分和换位拆分过程，商和余数需动态呈现。" }]
} satisfies Image2AssetManifest;
