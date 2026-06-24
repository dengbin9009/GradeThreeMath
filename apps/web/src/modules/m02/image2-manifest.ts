import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export default {
  moduleId: "M02",
  version: 1,
  styleGuide: "运算树剧场，括号子树、数字叶子、运算节点和聚光灯分层，图片内不写公式或答案。",
  prompts: [
    {
      id: "m02-image2-operation-tree",
      useCase: "scientific-educational",
      prompt: "Create a grade-three math operation tree theater with reusable blank number leaves, operation nodes, a bracket spotlight frame, and a pause sign for lower-priority nodes, no text or numbers.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
      outputIntent: "layered operation tree assets for bracket priority visualization",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "tree-background",
      role: "background",
      path: "apps/web/src/assets/module-frames/m02/image2/background-tree-v1.webp",
      promptId: "m02-image2-operation-tree",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "number-leaf-actor",
      role: "actor",
      path: "apps/web/src/assets/module-frames/m02/image2/actor-number-leaf-v1.png",
      promptId: "m02-image2-operation-tree",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 260, height: 220 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "bracket-spotlight-state",
      role: "state-frame",
      path: "apps/web/src/assets/module-frames/m02/image2/state-bracket-spotlight-v1.png",
      promptId: "m02-image2-operation-tree",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 560, height: 280 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "subtree-result-prop",
      role: "measure-prop",
      path: "apps/web/src/assets/module-frames/m02/image2/prop-subtree-result-tray-v1.png",
      promptId: "m02-image2-operation-tree",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 420, height: 220 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "priority-feedback-prop",
      role: "feedback-prop",
      path: "apps/web/src/assets/module-frames/m02/image2/feedback-priority-lamp-v1.png",
      promptId: "m02-image2-operation-tree",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 240, height: 240 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "fallback",
      role: "fallback-still",
      path: "apps/web/src/assets/module-frames/m02/image2/fallback-still-v1.webp",
      promptId: "m02-image2-operation-tree",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m02/image2/fallback-still-v1.webp",
  rejectedAssets: [
    {
      path: "apps/web/src/assets/module-frames/m02/image2/static-tree-with-equation-v0.webp",
      reason: "静态运算树无法表达括号框移动和子树优先级，公式必须由界面实时绘制。"
    }
  ]
} satisfies Image2AssetManifest;
