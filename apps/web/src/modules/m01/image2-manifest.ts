import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M01",
  version: 1,
  styleGuide: "运算传送带，明亮教具感，数字箱、乘除机器、合并框和排队牌分层，图片内不出现可变数字。",
  prompts: [
    {
      id: "m01-image2-conveyor",
      useCase: "scientific-educational",
      prompt: "Create a grade-three math operation conveyor scene with a clean conveyor belt, reusable number boxes, multiplication and division machine props, grouping frame, and queue sign, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered conveyor stage assets for interactive multiplication and division order",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "conveyor-background",
      role: "background",
      path: "apps/web/src/assets/module-frames/m01/image2/background-conveyor-v1.webp",
      promptId: "m01-image2-conveyor",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "number-box-actor",
      role: "actor",
      path: "apps/web/src/assets/module-frames/m01/image2/actor-number-box-v1.png",
      promptId: "m01-image2-conveyor",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 280, height: 220 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "machine-state-frame",
      role: "state-frame",
      path: "apps/web/src/assets/module-frames/m01/image2/state-machine-active-v1.png",
      promptId: "m01-image2-conveyor",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 420, height: 320 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "grouping-frame-prop",
      role: "measure-prop",
      path: "apps/web/src/assets/module-frames/m01/image2/prop-grouping-frame-v1.png",
      promptId: "m01-image2-conveyor",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 520, height: 260 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "queue-feedback-prop",
      role: "feedback-prop",
      path: "apps/web/src/assets/module-frames/m01/image2/feedback-queue-sign-v1.png",
      promptId: "m01-image2-conveyor",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 260, height: 220 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "fallback",
      role: "fallback-still",
      path: "apps/web/src/assets/module-frames/m01/image2/fallback-still-v1.webp",
      promptId: "m01-image2-conveyor",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m01/image2/fallback-still-v1.webp",
  rejectedAssets: [
    {
      path: "apps/web/src/assets/module-frames/m01/image2/full-conveyor-with-answers-v0.webp",
      reason: "整图带固定算式会和交互参数割裂，数字和关系式必须由 Vue 实时渲染。"
    }
  ]
} satisfies Image2AssetManifest;
