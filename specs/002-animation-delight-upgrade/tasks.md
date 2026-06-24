# Tasks: 交互动画精修与 image2 分层资产升级

**Input**: Design documents from `/specs/002-animation-delight-upgrade/`

**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/animation-module-contract.md](./contracts/animation-module-contract.md), [contracts/image2-asset-contract.md](./contracts/image2-asset-contract.md)

## Format: `[ID] [P?] [Story] Description (FR-xxx, SC-xxx)`

- **[P]**: Can run in parallel after prerequisites.
- **Story**: US1 大舞台、US2 image2 资产、US3 轻幽默反馈、US4 批次验收.

## Phase 1: Spec And Contract Baseline

- [x] T001 [P] [US4] 创建 `specs/002-animation-delight-upgrade/spec.md`，定义用户故事、FR-001 至 FR-032 和 SC-001 至 SC-010 (FR-001, FR-030, FR-031, FR-032, SC-010)
- [x] T002 [P] [US4] 创建 `specs/002-animation-delight-upgrade/plan.md`，定义架构、批次、测试策略和风险 (FR-018, FR-024, SC-010)
- [x] T003 [P] [US2] 创建 `specs/002-animation-delight-upgrade/data-model.md`，定义 AnimationUpgradeRecord、Image2AssetManifest 等实体 (FR-001, FR-014, FR-030, SC-009)
- [x] T004 [P] [US2] 创建 `contracts/image2-asset-contract.md`，定义 image2 资产角色、提示词、拒收规则和验证规则 (FR-011, FR-012, FR-014, SC-004)
- [x] T005 [P] [US1] 创建 `contracts/animation-module-contract.md`，定义精修动画模块契约、测试 hook 和 accepted 规则 (FR-002, FR-003, FR-022, SC-005)
- [x] T006 [P] [US3] 创建 `ui-ux-spec.md`，定义大舞台、轻幽默反馈、响应式和减少动态 UX 规则 (FR-008, FR-009, FR-020, SC-003, SC-008)
- [x] T007 [P] [US4] 创建 `quickstart.md`，定义本地启动和六条 smoke test 路径 (FR-019, FR-030, SC-010)
- [x] T008 [P] [US4] 创建 checklist，确认本规格清晰、可验收、可追踪 (FR-030, SC-010)
- [x] T008A [P] [US4] 执行 clarify，补充 image2 路径、透明资产、accepted 状态和实现首刀顺序 (FR-031, FR-032, SC-010)

**Checkpoint**: 002 SpecKit 文档包完整，可进入实现计划评审。

---

## Phase 2: Shared Metadata And Validation

- [x] T009 [P] [US4] 在 `apps/web/src/modules/shared/upgrade/` 新建升级状态类型和 39 个模块初始状态 (FR-001, FR-016, FR-018, SC-009)
- [x] T010 [P] [US2] 在 `apps/web/src/modules/shared/assets/` 新建 image2 manifest 类型和 schema 校验函数 (FR-011, FR-014, FR-030, FR-031, SC-004)
- [x] T011 [P] [US2] 为 manifest 校验写 Vitest，覆盖必需角色、路径存在、不可写可变文字和禁止本机绝对路径规则 (FR-011, FR-012, FR-030, FR-031, SC-004)
- [x] T012 [US4] 将 manifest 和 upgrade status 校验接入现有构建或测试脚本 (FR-021, FR-030, SC-010)
- [x] T012A [US2] 为每个 accepted 模块校验 fallbackStill 存在且图片失败时仍保留题干、控件、关系式和整数计算 (FR-015, SC-004, SC-010)
- [x] T012B [US4] 编写内容完整性审计，确认 38 个知识点、39 个母题、117 个子题及 K/M 关系未被动画精修改动破坏 (FR-026, SC-009, SC-010)
- [x] T012C [US4] 编写鉴权边界回归检查，确认动画精修不新增公开蓝图数据、不改变账号、管理员或受保护 API 范围 (FR-025, SC-010)

---

## Phase 3: Shared Stage Primitives

- [x] T013 [P] [US1] 创建 `SceneStage.vue`，提供稳定 aspect ratio、图层槽位和 reduced motion class (FR-002, FR-007, FR-020, SC-003)
- [x] T014 [P] [US1] 创建 `SceneLayer.vue`，统一背景、actors、overlay、feedback 的 z-index 和测试 hook (FR-002, FR-013, FR-022, SC-005)
- [x] T015 [P] [US1] 创建 `MeasureOverlay.vue`，渲染量线、标签和关系式 (FR-004, FR-020, SC-006)
- [x] T016 [P] [US3] 创建 `PlayfulFeedbackBubble.vue`，支持触发、自动消失、减少动态和不阻塞输入 (FR-008, FR-009, FR-010, SC-008)
- [x] T017 [P] [US1] 创建整数 stepper/slider/drag normalizer，阻止小数状态进入模块 (FR-005, FR-023, SC-006)
- [x] T018 [US1] 为共享 primitives 写组件测试，覆盖复位、快速操作、减少动态和测试 hook (FR-006, FR-007, FR-023, SC-007)

---

## Phase 4: Baseline Preservation Modules

- [x] T019 [US1] 精修 M09，保留算筹/算盘/计算器联动并接入 `SceneStage` 和 upgrade status (FR-016, SC-001)
- [x] T020 [US1] 精修 M12，保留火车拖动并补强车尾离桥、量尺和反馈 (FR-016, SC-001)
- [x] T021 [US3] 精修 M20，保留抬腿观察并补充腿数计数与温和反馈 (FR-008, FR-010, FR-016, SC-001, SC-008)
- [x] T022 [US3] 精修 M21，保留筹码差额舞台并补强拖动发现性和差额反馈 (FR-008, FR-016, SC-001, SC-008)
- [x] T023 [US2] 精修 M39，保留独立书本和单一书架舞台，补齐 image2 manifest (FR-013, FR-016, SC-001)
- [x] T024 [US4] 为 M09/M12/M20/M21/M39 更新验收记录和截图结果 (FR-019, SC-001)
- [x] T024A [US4] 为 M09/M12/M20/M21/M39 补充家长可读的一句话动画讲解和常见错因提示 (FR-027, SC-001, SC-008)

---

## Phase 5: Second-Stage Sample Modules

- [x] T025 [US2] 使用 image2 为 M01 生成传送带、数字箱、乘除机器和排队牌图层 (FR-011, FR-012, FR-017, SC-002)
- [x] T026 [US1] 实现 M01 运算传送带大舞台，顺序调整驱动中间结果 (FR-003, FR-004, FR-017, SC-002)
- [x] T027 [US2] 使用 image2 为 M02 生成运算树、括号聚光灯和运算牌图层 (FR-011, FR-017, SC-002)
- [x] T028 [US1] 实现 M02 括号四则大舞台，括号优先级可视化 (FR-003, FR-004, FR-017, SC-002)
- [x] T029 [US2] 使用 image2 为 M03 生成位值积木、位值柱和进位小车图层 (FR-011, FR-017, SC-002)
- [x] T030 [US1] 实现 M03 位值积木大舞台，位乘和进位同步显示 (FR-003, FR-004, FR-017, SC-002)
- [x] T031 [US2] 使用 image2 为 M31 生成组合图、切割块和补块轨道图层 (FR-011, FR-017, SC-002)
- [x] T032 [US1] 实现 M31 拼补图形大舞台，支持切割、平移、添补两条路径 (FR-003, FR-004, FR-017, SC-002)
- [x] T033 [US3] 为四个样板各补一条数学状态轻幽默反馈 (FR-008, FR-009, FR-010, SC-008)
- [x] T034 [US4] 为四个样板补齐组件测试、E2E 和验收记录 (FR-021, FR-022, FR-030, SC-002, SC-005)
- [x] T034A [US4] 为四个样板记录 image2 生成批次、最终采用资产和废弃资产原因 (FR-028, SC-002, SC-004)

---

## Phase 6: Batch Rollout

- [x] T035 [P] [US2] 使用 image2 生成并接入 M04-M08 运算批分层资产 (FR-011, FR-018, SC-004)
- [x] T036 [P] [US1] 精修 M04-M08 运算批大舞台交互 (FR-002, FR-003, FR-018, SC-005)
- [x] T037 [P] [US2] 使用 image2 生成并接入 M10-M19 应用模型批分层资产 (FR-011, FR-018, SC-004)
- [x] T038 [P] [US1] 精修 M10-M19 应用模型批大舞台交互 (FR-002, FR-003, FR-018, SC-005)
- [ ] T039 [P] [US2] 使用 image2 生成并接入 M22-M27 时间分数批分层资产 (FR-011, FR-018, SC-004)
- [ ] T040 [P] [US1] 精修 M22-M27 时间分数批大舞台交互 (FR-002, FR-003, FR-018, SC-005)
- [ ] T041 [P] [US2] 使用 image2 生成并接入 M28-M38 图形测量统计批分层资产 (FR-011, FR-018, SC-004)
- [ ] T042 [P] [US1] 精修 M28-M38 图形测量统计批大舞台交互 (FR-002, FR-003, FR-018, SC-005)

---

## Phase 7: Full Acceptance And Documentation

- [ ] T043 [US4] 编写全量 Playwright 审计，遍历 accepted 模块的断图、三视口、对象状态和儿童 UI 不暴露内部状态 (FR-020, FR-021, FR-022, FR-032, SC-003, SC-004, SC-005)
- [ ] T044 [US4] 编写整数审计，确认所有 accepted 模块不显示小数 (FR-005, SC-006)
- [ ] T045 [US4] 编写减少动态审计，确认 accepted 模块核心路径可用 (FR-007, SC-007)
- [ ] T046 [US4] 更新 `docs/acceptance/reference-module-visual.md` 和 `docs/animation-upgrade-roadmap.md` 的最终状态，并覆盖 fallback、家长讲解、废弃资产和内容完整性结果 (FR-015, FR-019, FR-027, FR-028, FR-029, SC-009)
- [ ] T047 [US4] 执行 `npm run typecheck`、`npm run test`、`npm run test:e2e`、`npm run build` 并记录结果 (FR-030, SC-010)

## Dependencies & Execution Order

- Phase 1 必须先完成。
- Phase 2 和 Phase 3 可并行，但 Phase 4 依赖它们的契约。
- Phase 5 依赖 Phase 3 primitives 和 Phase 4 的基准经验。
- Phase 6 依赖 Phase 5 样板通过。
- Phase 7 最后执行。

## Parallel Opportunities

- image2 资产生成可按模块并行。
- M04-M08、M10-M19、M22-M27、M28-M38 四个批次可在样板通过后并行。
- 断图、整数、减少动态和三视口测试可并行编写。

## Implementation Strategy

1. 先建立契约和测试工具。
2. 保住五个已认可的基准模块。
3. 用四个样板证明新体验方向。
4. 按领域批量推广。
5. 最后做全量验收和文档同步。
