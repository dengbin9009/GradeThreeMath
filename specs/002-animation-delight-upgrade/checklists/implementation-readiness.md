# Implementation Readiness Checklist: 交互动画精修与 image2 分层资产升级

**Purpose**: 在进入实现前，检查动画精修、image2 资产、数学正确性和验收任务是否完整、明确、一致且可追踪。

**Created**: 2026-06-24

**Feature**: [spec.md](../spec.md)

**Audience**: PR reviewer

## Scope And Branch

- [x] CHK001 独立分支 `002-animation-delight-upgrade` 已创建。
- [x] CHK002 002 规格与已完成的 001 Vue 重构主线分离。
- [x] CHK003 本阶段只更新文档，不开始实现代码。

## Contract Readiness

- [x] CHK004 动画模块 accepted 状态的规则完整。
- [x] CHK005 image2 资产 manifest 的必需角色完整。
- [x] CHK006 PlayfulFeedbackSpec 对触发、文案、位置、动效和时长有约束。
- [x] CHK007 IntegerControlSpec 对整数控制有约束。
- [x] CHK008 VisualAcceptanceRecord 可记录三视口、断图、整数、对象状态和减少动态结果。
- [x] CHK008A image2 资产路径和 manifest 位置已明确，不依赖临时目录。

## Testability

- [x] CHK009 每个成功标准都能映射到任务或验收路径。
- [x] CHK010 断图检查有 `naturalWidth > 0` 的明确口径。
- [x] CHK011 对象状态断言有测试 hook 建议。
- [x] CHK012 减少动态和三视口测试路径明确。
- [x] CHK013 整数约束覆盖题干、参数、过程量和答案。

## Rollout Readiness

- [x] CHK014 五个基准模块保留方向明确，不会推倒重写。
- [x] CHK015 四个第二阶段样板覆盖足够多的交互模式。
- [x] CHK016 后续批次可并行推进，但依赖样板通过。
- [x] CHK017 每批完成后有文档同步任务。
- [x] CHK017A 第一刀实现顺序已明确为共享契约、舞台 primitives、五个基准、四个样板。

## Risk Review

- [x] CHK018 图片资产过多导致性能压力的缓解方式已记录。
- [x] CHK019 幽默反馈过量或遮挡的拒收规则已记录。
- [x] CHK020 图片误写文字、数字或答案的拒收规则已记录。
- [x] CHK021 未精修模块保持现有可用体验，不阻塞样板推进。

## Notes

- 本清单表示文档已具备进入实现评审的条件。
- 实现前仍应确认 image2 的实际生成路径和资产保存方式。
