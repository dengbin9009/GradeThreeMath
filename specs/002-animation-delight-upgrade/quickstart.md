# Quickstart And Acceptance: 交互动画精修

## Purpose

本文件描述本特性实现后的本地启动、模块验收和批次验收方式。当前阶段只更新 SpecKit 文档，命令沿用现有项目脚本。

## Expected Commands

```bash
npm install
npm run dev
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

如本特性新增 manifest 校验脚本，后续应接入：

```bash
npm run test --workspace apps/web
npm run test:e2e -- --project=chromium
npm run build
```

## Smoke Test 1: Baseline Modules Still Work

1. 打开 M09，切换算筹、算盘、计算器。
2. 打开 M12，拖动火车通过桥。
3. 打开 M20，切换抬腿观察步骤。
4. 打开 M21，调整筹码差额。
5. 打开 M39，检查书架、借出篮、还回篮动态变化。

**Pass**: 五个模块保留原有核心交互，并通过新的大舞台、整数和断图检查。

## Smoke Test 2: image2 Asset Manifest

任选一个已精修模块：

1. 打开该模块 asset manifest。
2. 确认存在背景、可动对象、数学道具、反馈道具和 fallback。
3. 确认图片路径存在且能加载。
4. 确认图片内没有可变数字、公式、答案。

**Pass**: manifest 完整，所有图片 `naturalWidth > 0`。

## Smoke Test 3: Sample Module Interaction

以 M01、M02、M03、M31 为样板：

1. 打开模块。
2. 调整数值或拖动对象。
3. 切换步骤。
4. 触发一次边界或错误反馈。
5. 点击复位。

**Pass**: 舞台对象、量线、关系式和反馈同步变化，复位恢复默认状态。

## Smoke Test 4: Responsive

对 `1280x720`、`834x1112`、`390x844` 重复：

1. 打开已精修模块。
2. 调整参数。
3. 切换步骤。
4. 打开家长陪练。

**Pass**: 无横向滚动、文字重叠、按钮遮挡和断图。

## Smoke Test 5: Reduced Motion

1. 启用 `prefers-reduced-motion`。
2. 打开已精修模块。
3. 切换步骤并触发反馈。

**Pass**: 对象状态直接更新，反馈变为静态高亮或文字，学习信息完整。

## Smoke Test 6: Integer Guard

1. 调整所有数值控件到边界。
2. 尝试产生不能整除或会出现小数的组合。
3. 检查题干、舞台标签、关系式和答案。

**Pass**: 系统自动校正或阻止非法状态，界面不显示小数。
