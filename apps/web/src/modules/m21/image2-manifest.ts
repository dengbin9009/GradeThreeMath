import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M21",
  version: 1,
  styleGuide: "盈亏调整筹码差额台，保留筹码大舞台，后续 image2 拆出筹码、差额尺和分配篮。",
  prompts: [
    {
      id: "m21-adopt-existing",
      useCase: "scientific-educational",
      prompt: "Adopt existing profit-loss chip frames as transitional assets for a grade-three math difference scene.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or text.",
      outputIntent: "baseline chip stage and future layered props",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "stage-background",
      role: "background",
      path: "assets/module-frames/m21-profit-loss/m21-profit-loss-00-surplus-plan.png",
      promptId: "m21-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "chip-actor",
      role: "actor",
      path: "assets/module-frames/m21-profit-loss/m21-profit-loss-02-compare-gap.png",
      promptId: "m21-adopt-existing",
      transparent: false,
      repeatable: true,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "gap-ruler",
      role: "measure-prop",
      path: "assets/module-frames/m21-profit-loss/m21-profit-loss-03-split-gap.png",
      promptId: "m21-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "shortage-feedback",
      role: "feedback-prop",
      path: "assets/module-frames/m21-profit-loss/m21-profit-loss-01-shortage-plan.png",
      promptId: "m21-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "fallback",
      role: "fallback-still",
      path: "assets/module-frames/m21-profit-loss/m21-profit-loss-00-surplus-plan.png",
      promptId: "m21-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "assets/module-frames/m21-profit-loss/m21-profit-loss-00-surplus-plan.png",
  rejectedAssets: [
    {
      path: "assets/module-frames/m21-profit-loss/m21-profit-loss-sprite.png",
      reason: "整张 sprite 只保留为来源参考，后续 image2 精修需拆出独立筹码和差额道具。"
    }
  ]
} satisfies Image2AssetManifest;
