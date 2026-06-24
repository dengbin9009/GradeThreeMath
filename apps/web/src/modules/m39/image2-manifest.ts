import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M39",
  version: 1,
  styleGuide: "动态书架还原台，书本必须独立可重复渲染，借出篮和还回篮数量随步骤变化。",
  prompts: [
    {
      id: "m39-adopt-existing",
      useCase: "scientific-educational",
      prompt: "Adopt existing independent book token as transitional asset for a dynamic bookshelf restore scene.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or text.",
      outputIntent: "baseline book actor and future bookshelf layered props",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "planned-bookshelf-background",
      role: "background",
      path: "apps/web/src/assets/module-frames/m39/image2/background-bookshelf-v1.webp",
      promptId: "m39-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "book-actor",
      role: "actor",
      path: "assets/module-frames/m39-borrow-return/book-token.svg",
      promptId: "m39-adopt-existing",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 128, height: 160 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "planned-basket-prop",
      role: "measure-prop",
      path: "apps/web/src/assets/module-frames/m39/image2/prop-borrow-return-baskets-v1.png",
      promptId: "m39-adopt-existing",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 640, height: 280 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "planned-feedback-stamp",
      role: "feedback-prop",
      path: "apps/web/src/assets/module-frames/m39/image2/feedback-book-queue-v1.png",
      promptId: "m39-adopt-existing",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 320, height: 220 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "planned-fallback",
      role: "fallback-still",
      path: "apps/web/src/assets/module-frames/m39/image2/fallback-still-v1.webp",
      promptId: "m39-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m39/image2/fallback-still-v1.webp",
  rejectedAssets: [
    {
      path: "apps/web/src/assets/module-frames/m39/image2/whole-bookshelf-static-v0.webp",
      reason: "整张静态书架会让书本数量和交互割裂，M39 必须继续使用独立书本对象。"
    }
  ]
} satisfies Image2AssetManifest;
