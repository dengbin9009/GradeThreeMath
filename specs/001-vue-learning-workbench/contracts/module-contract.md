# Contract: Interactive Math Module

## Purpose

定义 39 个母题 Vue 组件与学习工作台之间的统一边界。外壳负责导航、题目内容、通用控制和陪练信息；模块负责场景、参数合法化、数学状态与题目特有交互。

## Registration Contract

```ts
type ArchetypeId = `M${number}`

interface MathModuleDefinition<TState extends IntegerState> {
  id: ArchetypeId
  component: () => Promise<Component>
  capabilities: {
    interactive: true
    imageAnimation: boolean
    draggable: boolean
    steppedReveal: boolean
    answerCheck: boolean
    resettable: true
  }
  createState(variant: Variant): TState
  normalize(state: TState, changedKey?: keyof TState): TState
  validate(state: TState): ValidationResult
  assets: AssetManifest
}

type IntegerState = Record<string, number | string | boolean>

interface ValidationResult {
  valid: boolean
  feedbackKey?: string
  focusParameter?: string
}
```

## Component Props

```ts
interface MathModuleProps<TState extends IntegerState> {
  archetype: Archetype
  variant: Variant
  modelValue: TState
  stepId: string
  reducedMotion: boolean
}
```

## Component Events

```ts
interface MathModuleEmits<TState extends IntegerState> {
  'update:modelValue': [state: TState]
  'update:stepId': [stepId: string]
  feedback: [feedback: FeedbackEvent]
  ready: []
  assetError: [asset: string]
}
```

模块不得直接修改 Router、全局筛选或家长抽屉状态。

## Exposed Operations

```ts
interface MathModuleHandle {
  reset(): void
  check(): FeedbackEvent
  requestHint(): FeedbackEvent
  focusPrimaryControl(): void
}
```

## Scene Contract

每个模块根节点必须包含：

- `data-module-id="Mxx"`
- `data-step-id="..."`
- 稳定尺寸的 `.math-scene`
- 描述当前关键量的 `aria-live="polite"` 状态区
- 图片对象加载失败时的可用 fallback

图片重复对象必须满足：

1. 数量由状态生成，不能只更换整张场景图。
2. 单个重复图片设为装饰，容器提供总数语义。
3. 当前可见数量必须与计算值严格一致。
4. 快速更新后只保留最新状态对应的动画。

## Shared Control Contract

外壳根据模块 capabilities 渲染：

- 参数区：整数输入、步进器、滑块或模式分段控件。
- 步骤区：上一步、步骤轨道、下一步。
- 命令区：提示、检查、复位。
- 反馈区：当前关系、提示或需调整信息。

模块可提供自定义 control slot，但必须保持 44px 目标尺寸、键盘等价操作和统一命令语义。

## Integer Contract

- 所有 number 参数必须满足 `Number.isInteger`。
- `normalize` 不得输出 `NaN`、`Infinity` 或小数。
- 可能产生小数的参数组合必须被限制为合法整数集合。
- UI 格式化不得通过隐藏小数点掩盖领域结果。

## Error Contract

| Error | Required Behavior |
|---|---|
| Invalid parameters | normalize 到最近合法整数并给出 adjust 反馈 |
| Missing asset | 触发 `assetError`，使用程序化 fallback，计算仍可用 |
| Unknown step | 回退到第一步 |
| Domain exception | 显示可复位错误区并保留题干 |
| Component load failure | 提供重试并记录模块 ID |

## Definition Of Done Per Module

- 默认题可完成学习闭环。
- 至少一个参数变化、一个步骤变化和复位测试通过。
- 数学结果与旧实现对照一致。
- 桌面、平板、手机无溢出和重叠。
- 键盘可完成主要操作。
- 减少动态效果下信息完整。
- 图片对象数量与状态一致且资源加载成功。
