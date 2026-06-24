import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M31",
  version: 1,
  styleGuide: "拼补图形工作台，组合图、切割线、可移动补块、长宽标注和整块好算反馈分层。",
  prompts: [
    {
      id: "m31-image2-composite-area",
      useCase: "scientific-educational",
      prompt: "Create a grade-three math composite area workbench with an L-shaped region, draggable cutting line, removable missing rectangle block, grid surface, and clean measurement props, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered composite area assets for split and fill methods",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "workbench-background",
      role: "background",
      path: "apps/web/src/assets/module-frames/m31/image2/background-workbench-v1.webp",
      promptId: "m31-image2-composite-area",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "shape-block-actor",
      role: "actor",
      path: "apps/web/src/assets/module-frames/m31/image2/actor-shape-block-v1.png",
      promptId: "m31-image2-composite-area",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 520, height: 360 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "fill-method-state",
      role: "state-frame",
      path: "apps/web/src/assets/module-frames/m31/image2/state-fill-method-v1.png",
      promptId: "m31-image2-composite-area",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 620, height: 420 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "measurement-ruler-prop",
      role: "measure-prop",
      path: "apps/web/src/assets/module-frames/m31/image2/prop-measurement-rulers-v1.png",
      promptId: "m31-image2-composite-area",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 640, height: 260 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "whole-shape-feedback-prop",
      role: "feedback-prop",
      path: "apps/web/src/assets/module-frames/m31/image2/feedback-whole-shape-v1.png",
      promptId: "m31-image2-composite-area",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 280, height: 240 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "fallback",
      role: "fallback-still",
      path: "apps/web/src/assets/module-frames/m31/image2/fallback-still-v1.webp",
      promptId: "m31-image2-composite-area",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m31/image2/fallback-still-v1.webp",
  rejectedAssets: [
    {
      path: "apps/web/src/assets/module-frames/m31/image2/static-composite-answer-v0.webp",
      reason: "静态答案图不能支持分割法和添补法切换，长宽和面积式必须实时渲染。"
    }
  ]
} satisfies Image2AssetManifest;
