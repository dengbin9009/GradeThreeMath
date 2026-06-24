# Requirements Quality Checklist: 交互动画精修与 image2 分层资产升级

**Purpose**: 检查 002 规格是否完整、明确、可测试，并满足进入实现阶段的条件。

**Created**: 2026-06-24

**Feature**: [spec.md](../spec.md)

## Specification Completeness

- [x] CHK001 用户故事按 P1/P2 排序并可独立验收。
- [x] CHK002 每个用户故事包含优先级理由、独立测试和 Given/When/Then 场景。
- [x] CHK003 功能需求使用稳定编号 FR-001 至 FR-032。
- [x] CHK004 成功标准 SC-001 至 SC-010 可量化。
- [x] CHK005 假设和不在范围内的内容已记录。
- [x] CHK006 数据实体、关系、状态和验证约束已定义。

## Animation And UX Clarity

- [x] CHK007 大舞台优先级明确高于题干旁缩略图。
- [x] CHK008 动态对象必须由程序状态驱动的规则明确。
- [x] CHK009 轻幽默反馈的允许和禁止边界明确。
- [x] CHK010 减少动态要求可测试。
- [x] CHK011 三视口验收尺寸明确。
- [x] CHK012 复位、快速操作和状态同步要求明确。

## image2 Asset Quality

- [x] CHK013 image2 资产分层角色完整。
- [x] CHK014 图片内禁止可变数字、题干、公式和答案。
- [x] CHK015 资产 manifest 记录路径、提示词、用途和透明度。
- [x] CHK016 图片失败 fallback 已定义。
- [x] CHK017 整图不能替代动态数量的要求明确。
- [x] CHK017A image2 最终资产必须进入仓库路径，禁止临时目录和本机绝对路径。

## Mathematics And Content Integrity

- [x] CHK018 38 个知识点、39 个母题、117 个子题保留要求明确。
- [x] CHK019 所有题目、参数、中间值和答案为整数的约束明确。
- [x] CHK020 M09、M12、M20、M21、M39 基准保留方向明确。
- [x] CHK021 M01、M02、M03、M31 第二阶段样板明确。
- [x] CHK022 批次推广顺序明确。

## Technical Feasibility

- [x] CHK023 不新增数据库表的边界明确。
- [x] CHK024 不引入全局重型动画引擎的默认策略明确。
- [x] CHK025 共享 primitives、manifest、module scene 的依赖方向明确。
- [x] CHK026 单元、组件、E2E、视觉和构建质量门完整。
- [x] CHK027 每个任务包含 FR/SC 追踪标记。

## Ambiguity Review

- [x] CHK028 无 TBD、TODO 或待澄清占位项。
- [x] CHK029 “有趣”和“搞笑”已转化为可验收的反馈规则。
- [x] CHK030 “使用 image2”已转化为资产契约和拒收规则。
- [x] CHK031 clarify 已明确透明资产格式、manifest 位置、accepted 状态展示边界和首批实现顺序。

## Notes

- 本清单只验证需求文档，不代表代码已经实现。
- 实现阶段如发现 image2 工具能力与本契约不完全一致，应先更新 spec 和 contract，再改代码。
