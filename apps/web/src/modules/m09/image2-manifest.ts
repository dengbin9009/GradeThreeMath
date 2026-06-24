import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M09",
  version: 1,
  styleGuide: "数字工具实验台，明亮、干净、立体教具感，工具对象清楚分层。",
  prompts: [
    {
      id: "m09-planned-image2-lab",
      useCase: "scientific-educational",
      prompt: "Create a bright grade-three math tool lab background with place-value rods, abacus, and calculator areas, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "future layered background and tool props",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "planned-background",
      role: "background",
      path: "apps/web/src/assets/module-frames/m09/image2/background-v1.webp",
      promptId: "m09-planned-image2-lab",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "planned-tool-counter",
      role: "actor",
      path: "apps/web/src/assets/module-frames/m09/image2/actor-tool-counter-v1.png",
      promptId: "m09-planned-image2-lab",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 256, height: 256 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "planned-place-ruler",
      role: "measure-prop",
      path: "apps/web/src/assets/module-frames/m09/image2/prop-place-ruler-v1.png",
      promptId: "m09-planned-image2-lab",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 640, height: 160 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "planned-feedback-lamp",
      role: "feedback-prop",
      path: "apps/web/src/assets/module-frames/m09/image2/feedback-check-lamp-v1.png",
      promptId: "m09-planned-image2-lab",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 240, height: 240 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "planned-fallback",
      role: "fallback-still",
      path: "apps/web/src/assets/module-frames/m09/image2/fallback-still-v1.webp",
      promptId: "m09-planned-image2-lab",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m09/image2/fallback-still-v1.webp",
  rejectedAssets: [
    {
      path: "apps/web/src/modules/m09/M09PlaceValueLab.vue",
      reason: "当前 M09 使用 CSS/DOM 绘制工具舞台，方向保留；后续 image2 精修时替换为可拆图片图层。"
    }
  ]
} satisfies Image2AssetManifest;
