import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M12",
  version: 1,
  styleGuide: "火车桥梁大场景，保留现有火车过桥关键帧，后续 image2 拆分火车、桥、量尺和反馈牌。",
  prompts: [
    {
      id: "m12-adopt-existing",
      useCase: "scientific-educational",
      prompt: "Adopt existing train bridge frames as transitional assets for a grade-three math crossing scene.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or text.",
      outputIntent: "baseline fallback and future layered train scene",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "bridge-background",
      role: "background",
      path: "assets/train-bridge/train-bridge-00-before-bridge.png",
      promptId: "m12-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "train-actor",
      role: "actor",
      path: "assets/train-bridge/train-bridge-01-head-on-bridge.png",
      promptId: "m12-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "tail-measure-frame",
      role: "measure-prop",
      path: "assets/train-bridge/train-bridge-03-tail-off-bridge.png",
      promptId: "m12-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "crossing-feedback-frame",
      role: "feedback-prop",
      path: "assets/train-bridge/train-bridge-02-whole-train-on-bridge.png",
      promptId: "m12-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "fallback",
      role: "fallback-still",
      path: "assets/train-bridge/train-bridge-00-before-bridge.png",
      promptId: "m12-adopt-existing",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1024, height: 768 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "assets/train-bridge/train-bridge-00-before-bridge.png",
  rejectedAssets: [
    {
      path: "assets/train-bridge/train-bridge-crossing-sprite.png",
      reason: "整张 sprite 只作为来源参考，accepted 动态舞台不得依赖整图替代对象状态。"
    }
  ]
} satisfies Image2AssetManifest;
