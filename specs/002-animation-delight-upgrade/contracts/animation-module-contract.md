# Contract: 精修动画模块

## Purpose

定义一个母题从“普通大图演示”升级到“已精修动画”的最低接口和验收口径。

## Upgrade Record

```ts
export type UpgradeStatus =
  | 'not-started'
  | 'planned'
  | 'in-progress'
  | 'accepted'
  | 'blocked';

export interface AnimationUpgradeRecord {
  moduleId: `M${string}`;
  status: UpgradeStatus;
  batch:
    | 'baseline'
    | 'sample'
    | 'operations'
    | 'applications'
    | 'time-fractions'
    | 'geometry-statistics'
    | 'final';
  qualityLevel: 1 | 2 | 3;
  stageTheme: string;
  primaryInteraction: string;
  playfulFeedbackIds: string[];
  assetManifestPath: string;
  acceptancePath: string;
  notes: string[];
}
```

## Scene Stage Spec

```ts
export interface SceneStageSpec {
  moduleId: `M${string}`;
  aspectRatio: string;
  minHeights: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  layers: Array<{
    id: string;
    kind: 'background' | 'actors' | 'overlay' | 'feedback';
    zIndex: number;
  }>;
  integerControls: IntegerControlSpec[];
  computedLabels: Array<{
    id: string;
    label: string;
    valueExpression: string;
    attachTo?: string;
  }>;
  resetBehavior: string;
}

export interface IntegerControlSpec {
  id: string;
  label: string;
  kind: 'stepper' | 'slider' | 'drag-handle' | 'segmented';
  min: number;
  max: number;
  step: number;
  normalizer: string;
}
```

## Playful Feedback Spec

```ts
export interface PlayfulFeedbackSpec {
  id: string;
  trigger: string;
  message: string;
  targetObject: string;
  motion: 'none' | 'highlight' | 'nudge' | 'slide' | 'bounce-once';
  durationMs: number;
  blocksInput: false;
}
```

## Accepted Module Rules

一个模块只有同时满足以下规则，才能标为 `accepted`：

1. `qualityLevel` 为 3。
2. `assetManifestPath` 指向存在文件。
3. `acceptancePath` 指向存在记录。
4. 至少有一个可操作整数控件。
5. 至少有一个 `PlayfulFeedbackSpec`。
6. 复位行为清除临时反馈。
7. 三视口无横向溢出。
8. 减少动态模式不丢失信息。
9. 题干、参数、过程量和答案不出现小数。
10. 对象状态由程序驱动，而不是替换静态答案图。

## Testing Hooks

精修模块应暴露或可被测试查询：

```text
data-module-id
data-upgrade-status
data-stage-layer
data-actor-count
data-computed-label
data-feedback-id
data-reduced-motion-state
```

这些 hook 只用于测试和验收，不应改变儿童 UI 文案。
