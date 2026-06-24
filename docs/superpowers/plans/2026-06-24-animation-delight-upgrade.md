# Animation Delight Upgrade Implementation Plan

日期：2026-06-24

## Objective

逐个优化 M01-M39 的交互动画，让每个母题都具备大舞台、可拆 image2 图层、动态对象、数学状态反馈和轻幽默交互。M09、M12、M20、M21、M39 作为基准模块，只做统一质量门和精修，不推倒重写。

## Constraints

- Vue 仍是前端实现方向。
- 所有题目参数保持整数。
- 图片由 `image2` 生成，但项目内引用的资产必须保存到仓库目录，不能只留在临时目录。
- 图片内不写可变数字、题干、公式和答案。
- 移动端不能把主舞台缩成题干旁的小图。

## Phase A. Shared Contract And Asset Pipeline

1. 在 `apps/web/src/modules/shared/` 下补充动画升级类型：
   - `LayeredSceneAsset`
   - `PlayfulFeedback`
   - `IntegerControlSpec`
   - `SceneStateSnapshot`
2. 增加统一 image2 asset manifest，记录每个模块的背景、对象、状态帧和 fallback。
3. 增加图片加载校验，确保每个 manifest 路径 `naturalWidth > 0`。
4. 增加整数参数守卫，防止滑杆、输入框或计算派生出小数。

## Phase B. Shared Large Stage Primitives

1. 抽取通用舞台容器：
   - `SceneStage.vue`
   - `SceneLayer.vue`
   - `MeasureOverlay.vue`
   - `PlayfulFeedbackBubble.vue`
   - `StepRail.vue`
2. 抽取通用控件：
   - 整数步进器
   - 分段模式选择
   - 拖动手柄
   - 复位按钮和 tooltip
3. 为减少动态模式提供静态状态分支。

## Phase C. Baseline Module Polish

1. M09：保留数字工具实验台，统一舞台容器、反馈节奏和 reduced motion。
2. M12：补强火车、桥、车尾、量尺和状态提示，让“车尾离桥”更直观。
3. M20：保留抬腿法，统一用“抬腿观察”表达，不在儿童 UI 使用粗暴说法。
4. M21：保留筹码差额互动，补强拖动发现性和差额条反馈。
5. M39：保留单一整体舞台，继续动态更新书架、借出篮、还回篮数量。

## Phase D. Batch Upgrade

1. 运算批：M01-M08
   - 重点：位值、顺序、试商、验算。
   - 资产：传送带、运算树、积木、阵列、托盘、升降台。
2. 应用模型批：M10-M19
   - 重点：三量关系、线段图、周期、枚举、分配。
   - 资产：商店、时间轴、线段、生产线、栅栏、循环带、流程机器、矩阵、盒子。
3. 时间分数批：M22-M27
   - 重点：日历、经过时间、单位 1、等分、取份。
   - 资产：日历、时钟、时间轨、整体垫、切分块、透明叠片。
4. 图形测量批：M28-M38
   - 重点：单位换算、面积、周长、对称、三角形、统计图。
   - 资产：尺带、方格砖、围栏绳、镜面、三角架、柱图。

## Phase E. Testing And Acceptance

每个模块精修完成后运行：

```bash
npm run test --workspace apps/web
npm run test:e2e -- --project=chromium
npm run build
```

并补充或更新以下检查：

- 单元测试：参数整数、派生值整数、步骤状态稳定。
- 组件测试：舞台对象数量、反馈出现时机、复位行为。
- E2E：桌面、平板、手机三视口无横向滚动。
- 视觉验收：截图检查大舞台、无断图、无重叠。
- 减少动态：对象状态变化仍可读。

## Phase F. Documentation Updates Per Batch

每完成一批，更新：

- `docs/animation-upgrade-roadmap.md`：标记模块状态和资产路径。
- `docs/acceptance/reference-module-visual.md`：记录截图验收结果。
- `docs/vue-migration-status.md`：更新批次状态。
- `specs/001-vue-learning-workbench/tasks.md`：勾选对应任务。

## First Implementation Slice

建议第一刀从 M01、M02、M03 开始，因为它们代表三类基础抽象：

1. M01 验证“运算顺序变成对象运动”。
2. M02 验证“括号优先级变成舞台聚光灯”。
3. M03 验证“位值和进位变成可移动积木”。

这三题完成后，再把同一套舞台 primitives 推给后续批次。
