import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M03",
  version: 1,
  styleGuide: "位值积木工坊，百十个位积木、倍数器、进位小车和估算检查灯分层，图片内不写可变数字。",
  prompts: [
    {
      id: "m03-image2-place-value-blocks",
      useCase: "scientific-educational",
      prompt: "Create a grade-three math place-value block workshop with reusable hundred flats, ten rods, one cubes, a multiplier machine, a carry cart, and an estimate check lamp, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered place-value multiplication assets for partial products and carrying",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "workshop-background",
      role: "background",
      path: "apps/web/src/assets/module-frames/m03/image2/background-workshop-v1.webp",
      promptId: "m03-image2-place-value-blocks",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "place-block-actor",
      role: "actor",
      path: "apps/web/src/assets/module-frames/m03/image2/actor-place-block-v1.png",
      promptId: "m03-image2-place-value-blocks",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 240, height: 240 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "carry-cart-state",
      role: "state-frame",
      path: "apps/web/src/assets/module-frames/m03/image2/state-carry-cart-v1.png",
      promptId: "m03-image2-place-value-blocks",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 380, height: 260 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "partial-product-prop",
      role: "measure-prop",
      path: "apps/web/src/assets/module-frames/m03/image2/prop-partial-product-tray-v1.png",
      promptId: "m03-image2-place-value-blocks",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 520, height: 260 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "estimate-feedback-prop",
      role: "feedback-prop",
      path: "apps/web/src/assets/module-frames/m03/image2/feedback-estimate-lamp-v1.png",
      promptId: "m03-image2-place-value-blocks",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 240, height: 240 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "fallback",
      role: "fallback-still",
      path: "apps/web/src/assets/module-frames/m03/image2/fallback-still-v1.webp",
      promptId: "m03-image2-place-value-blocks",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m03/image2/fallback-still-v1.webp",
  rejectedAssets: [
    {
      path: "apps/web/src/assets/module-frames/m03/image2/static-vertical-algorithm-v0.webp",
      reason: "静态竖式不能表达位值拆分和进位动作，部分积和进位需由组件动态计算。"
    }
  ]
} satisfies Image2AssetManifest;
