import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M20",
  version: 1,
  styleGuide: "鸡兔同笼抬腿观察台，保留独立鸡兔角色帧，后续补充温和反馈和腿数计数道具。",
  prompts: [
    {
      id: "m20-adopt-existing",
      useCase: "scientific-educational",
      prompt: "Adopt existing chicken and rabbit leg-lift frames as transitional grade-three math actor assets.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or text.",
      outputIntent: "baseline actor frames and future leg counter props",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "stage-background",
      role: "background",
      path: "assets/chicken-rabbit/chicken-rabbit-leg-lift-sprite.png",
      promptId: "m20-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 1024 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "chicken-actor",
      role: "actor",
      path: "assets/chicken-rabbit/chicken-00-standing.png",
      promptId: "m20-adopt-existing",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 1024, height: 1024 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "rabbit-state-frame",
      role: "state-frame",
      path: "assets/chicken-rabbit/rabbit-02-lift-two-legs.png",
      promptId: "m20-adopt-existing",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 1024, height: 1024 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "leg-counter-prop",
      role: "measure-prop",
      path: "assets/chicken-rabbit/rabbit-03-hold-result.png",
      promptId: "m20-adopt-existing",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 1024 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "lift-feedback-prop",
      role: "feedback-prop",
      path: "assets/chicken-rabbit/chicken-02-lift-two-legs.png",
      promptId: "m20-adopt-existing",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 1024 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "fallback",
      role: "fallback-still",
      path: "assets/chicken-rabbit/chicken-rabbit-leg-lift-sprite.png",
      promptId: "m20-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 1024 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "assets/chicken-rabbit/chicken-rabbit-leg-lift-sprite.png",
  rejectedAssets: [
    {
      path: "assets/chicken-rabbit/chicken-rabbit-leg-lift-sprite-chroma.png",
      reason: "chroma 源图只用于抠图参考，运行时采用独立角色帧。"
    }
  ]
} satisfies Image2AssetManifest;
