# Contract: image2 分层资产

## Purpose

定义 image2 生成图片如何进入项目，避免图片变成和交互割裂的静态整图。

## Directory Convention

建议路径：

```text
apps/web/src/assets/module-frames/
  m01/
    image2-manifest.ts
    background-v1.webp
    actor-number-box-v1.png
    prop-conveyor-v1.png
    feedback-queue-sign-v1.png
    fallback-still-v1.webp
```

未精修模块可以继续使用现有资产，但不能标记为 `accepted`。

## Required Manifest Shape

```ts
export type Image2AssetRole =
  | 'background'
  | 'actor'
  | 'state-frame'
  | 'measure-prop'
  | 'feedback-prop'
  | 'fallback-still';

export interface Image2LayerAsset {
  id: string;
  role: Image2AssetRole;
  path: string;
  promptId: string;
  transparent: boolean;
  repeatable: boolean;
  intrinsicSize: { width: number; height: number };
  altPolicy: 'decorative' | 'container-labeled' | 'meaningful';
  mustNotContainText: boolean;
}

export interface Image2PromptRecord {
  id: string;
  useCase: 'scientific-educational' | 'illustration-story' | 'stylized-concept';
  prompt: string;
  negativePrompt: string;
  outputIntent: string;
  createdAt: string;
}

export interface Image2AssetManifest {
  moduleId: `M${string}`;
  version: number;
  styleGuide: string;
  prompts: Image2PromptRecord[];
  assets: Image2LayerAsset[];
  fallbackStill: string;
  rejectedAssets: Array<{
    path: string;
    reason: string;
  }>;
}
```

## Required Asset Roles

| Role | Required | Notes |
|---|---|---|
| `background` | Yes | 不带题干、答案、公式、可变数字 |
| `actor` | Yes | 可移动或可重复渲染对象 |
| `measure-prop` | Yes | 尺、括号、量线、格子、篮子等 |
| `feedback-prop` | Yes | 提示牌、检查灯、排队牌等 |
| `state-frame` | When needed | 抬腿、翻页、通过、试错等动作帧 |
| `fallback-still` | Yes | 断图或减少动态时使用 |

## Prompt Rules

每条 image2 提示词必须包含：

- 面向小学三年级数学学习。
- 明亮、干净、立体教具感。
- 主体边缘清楚，留足移动空间。
- 不写题干、公式、答案、可变数字。
- 不出现水印、品牌、复杂背景噪声。
- 同一模块内保持相同镜头、光照、材质和比例。

## Rejection Rules

生成图片出现以下情况必须废弃或返工：

- 图片内出现公式、答案或会随参数变化的数字。
- 可动对象与背景粘连，无法干净分层。
- 角色比例在同一模块内明显不一致。
- 主体被裁切，不能移动或重复摆放。
- 颜色、阴影或纹理导致量线和数字标签难以阅读。

## Validation

每个 accepted 模块必须通过：

```text
1. manifest JSON/TypeScript shape valid
2. all referenced paths exist
3. all images load with naturalWidth > 0
4. required roles present
5. no accepted asset is documented as rejected
```
