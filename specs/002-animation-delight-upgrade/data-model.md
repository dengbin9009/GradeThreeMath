# Data Model: 交互动画精修与 image2 分层资产升级

## AnimationUpgradeRecord

| Field | Type | Rules |
|---|---|---|
| `moduleId` | `ArchetypeId` | `M01`-`M39`，唯一 |
| `status` | `UpgradeStatus` | `not-started`、`planned`、`in-progress`、`accepted`、`blocked` |
| `batch` | `UpgradeBatch` | `baseline`、`sample`、`operations`、`applications`、`time-fractions`、`geometry-statistics`、`final` |
| `qualityLevel` | `1 \| 2 \| 3` | 1=现有大舞台，2=分层图像，3=完整精修小剧场 |
| `stageTheme` | `string` | 一句话描述舞台主题 |
| `primaryInteraction` | `string` | 主要操作，例如拖动、分配、切割、试商 |
| `playfulFeedbackIds` | `string[]` | 引用 PlayfulFeedbackSpec |
| `assetManifestPath` | `string` | 仓库内相对路径 |
| `acceptancePath` | `string` | 验收记录路径 |
| `notes` | `string[]` | 风险、返工或特殊约束 |

## Image2AssetManifest

| Field | Type | Rules |
|---|---|---|
| `moduleId` | `ArchetypeId` | 必须存在 |
| `version` | `number` | 每次替换采用资产递增 |
| `styleGuide` | `string` | 简短描述该模块的视觉风格 |
| `prompts` | `Image2Prompt[]` | 至少 1 条 |
| `assets` | `Image2LayerAsset[]` | 至少包含必需角色 |
| `fallbackStill` | `string` | 图片失败或减少动态时使用 |
| `rejectedAssets` | `RejectedAsset[]` | 可为空，记录废弃原因 |

## Image2Prompt

| Field | Type | Rules |
|---|---|---|
| `id` | `string` | 模块内唯一 |
| `useCase` | `scientific-educational \| illustration-story \| stylized-concept` | 默认 `scientific-educational` |
| `prompt` | `string` | 最终使用的 image2 提示词 |
| `negativePrompt` | `string` | 必须包含“不写公式、答案、可变数字” |
| `outputIntent` | `string` | 背景、角色、状态帧或道具 |
| `createdAt` | `string` | ISO 日期 |

## Image2LayerAsset

| Field | Type | Rules |
|---|---|---|
| `id` | `string` | 模块内唯一 |
| `role` | `AssetRole` | `background`、`actor`、`state-frame`、`measure-prop`、`feedback-prop`、`fallback-still` |
| `path` | `string` | 仓库内相对路径 |
| `promptId` | `string` | 引用 Image2Prompt |
| `transparent` | `boolean` | 可动对象优先 true |
| `repeatable` | `boolean` | 是否可按数量重复渲染 |
| `intrinsicSize` | `{ width: number; height: number }` | 正整数 |
| `altPolicy` | `decorative \| container-labeled \| meaningful` | 重复对象通常为 `decorative` |
| `mustNotContainText` | `boolean` | 默认 true |

## SceneStageSpec

| Field | Type | Rules |
|---|---|---|
| `moduleId` | `ArchetypeId` | 必须存在 |
| `aspectRatio` | `string` | 例如 `16 / 9`、`4 / 3` |
| `minHeights` | `{ desktop: number; tablet: number; mobile: number }` | 正整数像素 |
| `layers` | `SceneLayerSpec[]` | 背景、对象、overlay、feedback 分层 |
| `integerControls` | `IntegerControlSpec[]` | 至少 1 个 |
| `computedLabels` | `ComputedLabelSpec[]` | 至少 1 个关键量 |
| `resetBehavior` | `string` | 明确复位内容 |

## PlayfulFeedbackSpec

| Field | Type | Rules |
|---|---|---|
| `id` | `string` | 模块内唯一 |
| `trigger` | `string` | 触发的数学状态 |
| `message` | `string` | 简短中文，不嘲笑孩子 |
| `targetObject` | `string` | 贴近哪个对象出现 |
| `motion` | `none \| highlight \| nudge \| slide \| bounce-once` | 减少动态时降级为 `none` 或 `highlight` |
| `durationMs` | `number` | 建议 800-1800 |
| `blocksInput` | `boolean` | 必须为 false |

## IntegerControlSpec

| Field | Type | Rules |
|---|---|---|
| `id` | `string` | 模块内唯一 |
| `label` | `string` | 中文短标签 |
| `kind` | `stepper \| slider \| drag-handle \| segmented` | 控件类型 |
| `min` | `number` | 整数 |
| `max` | `number` | 整数且大于 min |
| `step` | `number` | 正整数 |
| `normalizer` | `string` | 描述如何校正到合法整数 |

## VisualAcceptanceRecord

| Field | Type | Rules |
|---|---|---|
| `moduleId` | `ArchetypeId` | 必须存在 |
| `date` | `string` | ISO 日期 |
| `viewports` | `ViewportResult[]` | 必含 desktop、tablet、mobile |
| `imageLoadPass` | `boolean` | 所有图片加载成功 |
| `integerPass` | `boolean` | 无小数 |
| `objectStatePass` | `boolean` | 对象状态断言通过 |
| `reducedMotionPass` | `boolean` | 减少动态路径可用 |
| `feedbackPass` | `boolean` | 幽默反馈不遮挡关键量 |
| `issues` | `string[]` | 可为空 |

## State Transitions

```text
not-started -> planned -> in-progress -> accepted
                         -> blocked -> in-progress
accepted -> in-progress  // 仅在验收标准提高或发现回归时允许
```

## Validation Rules

- `accepted` 状态必须有 asset manifest 和 visual acceptance record。
- `accepted` 状态必须至少有一个 `PlayfulFeedbackSpec`。
- `accepted` 状态必须引用存在的 image2 资产路径。
- 所有 `IntegerControlSpec` 的 `min`、`max`、`step` 必须为整数。
- 图片角色为 `actor` 且用于计数时，`repeatable` 必须为 true。
