# Tasks: Vue 数学母题学习工作台重构

**Input**: Design documents from `/specs/001-vue-learning-workbench/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts](./contracts)

**Tests**: 本项目宪章要求测试先行。每个用户故事的测试任务应先执行并确认失败，再进行实现。

**Format**: `[ID] [P?] [Story?] Description (FR-xxx, SC-xxx)`；无用户故事标签的 Setup、Foundational 与发布任务仍必须保留 FR/SC 追踪标记。

## Phase 1: Setup

**Purpose**: 在当前仓库内建立 Vue TypeScript 工程和质量工具，不删除现有实现。

- [x] T001 将根 `package.json` 更新为 `apps/web`、`apps/api`、`packages/shared` npm workspaces 及统一脚本 (FR-024, SC-008)
- [x] T002 创建根 `tsconfig.json` 以及三个 workspace 的 TypeScript 配置 (FR-019, SC-008)
- [x] T003 [P] 创建 `apps/web/src/main.ts` 和最小 `apps/web/src/app/App.vue` 挂载入口 (FR-001, SC-008)
- [x] T004 [P] 创建 Web、API、Shared 的 Vitest 配置和测试 setup (FR-025, SC-008)
- [x] T005 [P] 创建 `playwright.config.ts` 与 `tests/e2e/.gitkeep` (FR-022, SC-008)
- [x] T006 [P] 配置 `eslint.config.js`、`.editorconfig` 和类型检查脚本 (FR-019, SC-008)
- [x] T007 将现有静态入口保留为迁移对照，并创建 `docs/vue-migration-status.md` 记录模块批次 (FR-025, SC-008)

**Checkpoint**: Vue 空壳可以启动、测试和构建，旧应用文件仍可用于结果对照。

---

## Phase 2: Foundational

**Purpose**: 建立所有用户故事依赖的数据、领域、路由、状态和设计系统。

- [x] T008 [P] 在 `packages/shared/src/content/blueprint.types.ts` 定义 KnowledgeNode、Archetype、Variant、AnimationSpec 类型 (FR-018, SC-004)
- [x] T009 [P] 在 `packages/shared/tests/content/blueprint.repository.spec.ts` 先编写总数、ID 引用、Schema 和查询失败测试 (FR-018, FR-019, SC-004, SC-008)
- [x] T010 [P] 在 `packages/shared/src/content/blueprint.schema.ts` 实现构建时 Schema 与整数约束校验 (FR-012, FR-019, SC-004, SC-005)
- [x] T011 在 `packages/shared/src/content/blueprint.repository.ts` 实现加载、索引、搜索和关系查询 (FR-006, FR-018, SC-001, SC-004)
- [x] T012 [P] 在 `packages/shared/tests/domain/` 先迁移现有 `test/core.test.js` 领域结果测试 (FR-025, SC-008)
- [x] T013 在 `packages/shared/src/domain/` 按领域迁移 `src/core.js` 的纯计算函数并保持兼容结果 (FR-025, SC-008)
- [x] T014 [P] 在 `packages/shared/tests/domain/integer.spec.ts` 先编写所有母题无小数属性测试 (FR-012, SC-005)
- [x] T015 [P] 在 `packages/shared/src/domain/shared/integer.ts` 实现整数断言、整除参数和范围规范化工具 (FR-012, FR-013, SC-005)
- [x] T016 [P] 在 `apps/web/tests/unit/modules/registry.spec.ts` 先编写蓝图与注册表一一对应测试 (FR-018, FR-019, FR-024, SC-004, SC-008)
- [x] T017 在 `apps/web/src/modules/module.types.ts` 实现 [module-contract.md](./contracts/module-contract.md) 类型 (FR-009, FR-024, SC-005, SC-008)
- [x] T018 在 `apps/web/src/modules/registry.ts` 创建 39 个 M 编号的类型安全注册表骨架和缺失检测 (FR-018, FR-024, SC-004, SC-008)
- [x] T019 在 `apps/web/src/app/router.ts` 实现 `/learn`、母题、子题路由和非法 ID 回退 (FR-002, FR-007, FR-020, FR-042, SC-001, SC-009)
- [x] T020 [P] 在 `apps/web/src/app/stores/filter.store.ts` 实现可序列化筛选状态 (FR-005, FR-007, FR-008, SC-001)
- [x] T021 [P] 在 `apps/web/src/app/stores/learning.store.ts` 实现侧栏、陪练抽屉和当前会话摘要 (FR-016, FR-017, SC-005, SC-007)
- [x] T022 [P] 在 `apps/web/src/styles/tokens.css`、`apps/web/src/styles/base.css`、`apps/web/src/styles/motion.css` 建立颜色、排版、尺寸和减少动态效果规则 (FR-004, FR-021, FR-022, SC-002, SC-003)
- [x] T023 在 `apps/web/src/app/App.vue` 组合 Router、Pinia、全局错误边界和应用壳 (FR-001, FR-021, FR-042, SC-002, SC-009)

**Checkpoint**: 蓝图、领域函数、路由、store、模块注册表和视觉 tokens 可独立测试，阻塞项解除。

---

## Phase 3: User Story 1 - 通过有效账号进入系统 (Priority: P1)

**Goal**: 建立安全登录、服务端会话、账号有效期、首次改密和退出流程。

**Independent Test**: 有效、未生效、已到期、已暂停和错误密码账号分别登录，只有有效账号可完成首次改密后进入学习页。

### Tests

- [x] T024 [P] [US1] 在 `apps/api/tests/auth/auth-schema.spec.ts` 编写用户附加字段和迁移约束测试 (FR-030, FR-031, FR-043, FR-044, SC-009, SC-010)
- [x] T025 [P] [US1] 在 `apps/api/tests/auth/account-policy.spec.ts` 编写启用、生效、到期和首次改密策略测试 (FR-030, FR-031, FR-038, SC-009, SC-010)
- [x] T026 [P] [US1] 在 `apps/api/tests/auth/session-middleware.spec.ts` 编写未登录、无效账号和会话撤销测试 (FR-028, FR-034, FR-035, FR-043, SC-009, SC-010)
- [x] T027 [P] [US1] 在 `apps/web/tests/component/auth/LoginForm.spec.ts` 编写登录错误、提交和无障碍测试 (FR-027, FR-037, SC-009)
- [x] T028 [P] [US1] 在 `apps/web/tests/unit/auth/route-guards.spec.ts` 编写 redirect、首次改密和角色守卫测试 (FR-029, FR-038, FR-042, SC-009)
- [x] T029 [US1] 在 `tests/e2e/authentication.spec.ts` 编写登录、首次改密、退出和有效期完整流程 (FR-027, FR-031, FR-038, FR-043, SC-009, SC-010)
- [x] T030 [P] [US1] 在 `apps/api/tests/content/blueprint-api.spec.ts` 编写鉴权、ETag 和未授权无 payload 测试 (FR-028, FR-050, SC-004, SC-009)
- [x] T031 [P] [US1] 在 `apps/api/tests/health/health.spec.ts` 编写 liveness、readiness、数据库不可用降级和信息最小化测试 (FR-049, SC-008, SC-013)
- [x] T032 [P] [US1] 在 `apps/api/tests/auth/rate-limit.spec.ts` 编写登录与管理限流窗口测试 (FR-037, FR-044, SC-009, SC-010)

### Implementation

- [x] T033 [P] [US1] 在 `apps/api/src/db/schema/auth.ts` 定义 Better Auth/Drizzle 用户、账号、会话和限流表 (FR-030, FR-043, FR-044, SC-009, SC-010)
- [x] T034 [US1] 在 `apps/api/drizzle/` 生成首个数据库迁移并创建 `apps/api/src/db/client.ts` (FR-030, FR-048, SC-008, SC-013)
- [x] T035 [US1] 在 `apps/api/src/config/env.ts` 和 `apps/api/.env.example` 实现启动配置校验与 Secret 最小长度 (FR-049, SC-008, SC-013)
- [x] T036 [US1] 在 `apps/api/src/auth/auth.ts` 配置 Better Auth Email/Password、Username、Admin plugins 和安全 Cookie (FR-026, FR-028, FR-029, FR-036, FR-043, SC-009, SC-010)
- [x] T037 [P] [US1] 在 `apps/api/src/auth/internal-email.ts` 实现登录名到内部不可投递邮箱的稳定映射 (FR-027, FR-046, SC-009)
- [x] T038 [US1] 在 `apps/api/src/auth/account-policy.ts` 实现账号状态、有效期和首次改密判定 (FR-030, FR-031, FR-038, SC-009, SC-010)
- [x] T039 [US1] 在 `apps/api/src/middleware/session.ts` 实现 Hono Session 与账号策略中间件 (FR-028, FR-035, FR-043, SC-009, SC-010)
- [x] T040 [US1] 在 `apps/api/src/content/blueprint.routes.ts` 实现受保护 Blueprint API 与 ETag (FR-028, FR-050, SC-003, SC-004, SC-009)
- [x] T041 [P] [US1] 在 `apps/api/src/health/health.routes.ts` 实现最小化 liveness 与 readiness (FR-049, SC-008, SC-013)
- [x] T042 [US1] 在 `apps/api/src/server.ts` 挂载 Better Auth handler、trusted origins、精确限流、健康检查和受保护路由 (FR-028, FR-037, FR-042, FR-044, FR-049, SC-009, SC-010, SC-013)
- [x] T043 [US1] 在 `apps/api/src/auth/seed-admin.ts` 实现幂等且受控的初始管理员命令 (FR-026, FR-029, FR-040, SC-008, SC-011)
- [x] T044 [P] [US1] 在 `apps/web/src/auth/auth-client.ts` 与 `apps/web/src/app/stores/auth.store.ts` 创建安全 Session 客户端状态 (FR-028, FR-036, FR-043, SC-009)
- [x] T045 [US1] 创建 `apps/web/src/views/LoginView.vue`、`ChangePasswordView.vue` 和 Router 鉴权守卫 (FR-027, FR-038, FR-042, SC-009, SC-010)

**Checkpoint**: 登录是学习系统的唯一入口，有效期和角色由 API 强制，凭证不进入 Web Storage。

---

## Phase 4: User Story 2 - 管理员管理用户和有效期 (Priority: P1)

**Goal**: 管理员可创建普通用户、管理有效期和状态、重置密码、撤销会话并查看审计。

**Independent Test**: 管理员创建未来生效用户，改为立即生效，随后暂停并强制下线；普通用户无法调用管理 API。

### Tests

- [x] T046 [P] [US2] 在 `apps/api/tests/admin/users-api.spec.ts` 编写角色、创建、有效期、并发版本和最后管理员保护测试 (FR-029, FR-032, FR-040, FR-041, FR-046, SC-011, SC-012)
- [x] T047 [P] [US2] 在 `apps/api/tests/admin/audit.spec.ts` 编写审计完整性和敏感字段排除测试 (FR-039, FR-047, SC-011, SC-012)
- [x] T048 [P] [US2] 在 `apps/api/tests/admin/atomic-admin-operation.spec.ts` 编写审计或 Session 撤销失败时的整体回滚测试 (FR-045, SC-010, SC-011)
- [x] T049 [P] [US2] 在 `apps/api/tests/admin/retention.spec.ts` 编写审计与 Session 网络元数据保留测试 (FR-047, SC-011, SC-013)
- [x] T050 [P] [US2] 在 `apps/web/tests/component/admin/AdminUsersView.spec.ts` 编写表格、筛选、创建和有效期表单测试 (FR-032, FR-041, FR-046, SC-011, SC-012)
- [x] T051 [US2] 在 `tests/e2e/admin-user-lifecycle.spec.ts` 编写两分钟内创建账号、首次登录、暂停、恢复和延长期限流程 (FR-032, FR-033, FR-034, SC-011, SC-012)

### Implementation

- [x] T052 [P] [US2] 在 `apps/api/src/db/schema/audit.ts` 和 `apps/api/src/audit/audit.repository.ts` 实现审计存储 (FR-039, FR-047, SC-011)
- [x] T053 [P] [US2] 在 `apps/api/src/audit/retention.job.ts` 实现 365 天审计和 30 天 Session 网络元数据清理 (FR-047, SC-011, SC-013)
- [x] T054 [US2] 在 `apps/api/src/admin/users.service.ts` 实现用户创建、更新、重置密码和会话撤销事务 (FR-032, FR-033, FR-034, FR-041, FR-045, FR-046, SC-010, SC-011, SC-012)
- [x] T055 [US2] 在 `apps/api/src/admin/users.routes.ts` 实现 [auth-api.md](./contracts/auth-api.md) 管理接口 (FR-029, FR-032, FR-037, FR-041, FR-045, SC-011, SC-012)
- [x] T056 [P] [US2] 在 `apps/web/src/admin/users.api.ts` 创建类型安全管理 API 客户端 (FR-032, FR-041, SC-011, SC-012)
- [x] T057 [US2] 创建 `apps/web/src/views/AdminUsersView.vue`、`apps/web/src/components/admin/UserTable.vue` 和移动用户列表 (FR-032, SC-011, SC-012)
- [x] T058 [P] [US2] 创建 `apps/web/src/components/admin/CreateUserDrawer.vue` (FR-026, FR-032, FR-046, SC-011)
- [x] T059 [P] [US2] 创建 `apps/web/src/components/admin/EditValidityDrawer.vue` (FR-032, FR-034, FR-041, SC-011, SC-012)
- [x] T060 [P] [US2] 创建 `apps/web/src/components/admin/UserActionsMenu.vue` (FR-033, FR-034, SC-011, SC-012)
- [x] T061 [P] [US2] 创建 `apps/web/src/components/app-shell/AccountMenu.vue` 并接入管理员入口与账号到期提示 (FR-032, FR-042, SC-009, SC-011)

**Checkpoint**: 用户生命周期可由管理员完整管理，普通用户没有管理权限，所有敏感操作可审计。

---

## Phase 5: User Story 3 - 孩子专注完成一个母题 (Priority: P1) MVP

**Goal**: 提供以题目和大动画舞台为中心的可用学习页，并完成 M39 基准迁移。

**Independent Test**: 直接访问 M39，完成参数调整、四步回放、检查和复位。

### Tests

- [x] T062 [P] [US3] 在 `apps/web/tests/component/learning/ProblemHeader.spec.ts` 编写题干与已知/待求展示测试 (FR-003, FR-013, SC-005)
- [x] T063 [P] [US3] 在 `apps/web/tests/component/learning/AnimationStageShell.spec.ts` 编写加载、错误、反馈和复位测试 (FR-009, FR-015, FR-020, SC-005)
- [x] T064 [P] [US3] 在 `apps/web/tests/component/modules/M39BorrowReturn.spec.ts` 编写四步动态书本数量测试 (FR-011, FR-013, SC-005, SC-006)
- [x] T065 [US3] 在 `tests/e2e/m39-learning-loop.spec.ts` 编写 M39 完整学习闭环测试 (FR-009, FR-013, SC-005)

### Implementation

- [x] T066 [P] [US3] 创建 `apps/web/src/components/learning/ProblemHeader.vue` (FR-003, SC-005)
- [x] T067 [P] [US3] 创建 `apps/web/src/components/learning/KnownUnknownStrip.vue` (FR-003, FR-013, SC-005)
- [x] T068 [P] [US3] 创建 `apps/web/src/components/learning/ModuleControlBar.vue` 和整数参数控件 (FR-009, FR-012, SC-005)
- [x] T069 [P] [US3] 创建 `apps/web/src/components/learning/StepTrack.vue`、`LearningFeedback.vue`、`ResetButton.vue` (FR-009, FR-014, FR-015, SC-005)
- [x] T070 [US3] 创建 `apps/web/src/components/learning/AnimationStageShell.vue` 并实现异步模块加载 (FR-009, FR-020, FR-024, SC-005)
- [x] T071 [US3] 创建 `apps/web/src/views/LessonView.vue` 组合题目、舞台和控制栏 (FR-003, FR-004, FR-009, SC-005)
- [x] T072 [US3] 将 M39 领域模型迁移到 `apps/web/src/modules/m39/m39.domain.ts` (FR-012, FR-013, FR-025, SC-005)
- [x] T073 [US3] 将独立书本对象舞台迁移到 `apps/web/src/modules/m39/M39BorrowReturn.vue` (FR-010, FR-011, FR-013, SC-005, SC-006)
- [x] T074 [US3] 在 `apps/web/src/modules/m39/m39.definition.ts` 注册默认状态、步骤、能力和资产 (FR-009, FR-024, SC-004, SC-005)
- [x] T075 [US3] 更新 `apps/web/src/modules/registry.ts` 接入 M39 并通过组件与 E2E 测试 (FR-018, FR-024, SC-004, SC-005)

**Checkpoint**: M39 在 Vue 学习页上独立可用，且不依赖旧 `app.js` DOM 渲染。

---

## Phase 6: User Story 4 - 快速找到适合的母题 (Priority: P1)

**Goal**: 提供可搜索、可组合、URL 可恢复的母题总览和响应式筛选。

**Independent Test**: 10 秒内通过搜索或筛选找到并打开 M20，返回后保留筛选。

### Tests

- [x] T076 [P] [US4] 在 `apps/web/tests/unit/navigation/filter-query.spec.ts` 编写 query 解析与稳定序列化测试 (FR-007, FR-008, SC-001)
- [x] T077 [P] [US4] 在 `apps/web/tests/component/filters/FilterSidebar.spec.ts` 编写多条件与清除测试 (FR-005, FR-008, SC-001)
- [x] T078 [P] [US4] 在 `apps/web/tests/component/filters/MobileFilterDrawer.spec.ts` 编写焦点恢复测试 (FR-021, FR-022, SC-001, SC-002)
- [x] T079 [US4] 在 `tests/e2e/find-module.spec.ts` 编写搜索 M20 和筛选图片动画流程 (FR-005, FR-006, SC-001)

### Implementation

- [x] T080 [P] [US4] 创建 `apps/web/src/components/app-shell/AppTopbar.vue` 与 `GlobalSearch.vue` (FR-006, FR-021, SC-001)
- [x] T081 [P] [US4] 创建 `apps/web/src/components/filters/KnowledgeSidebar.vue` 和领域/知识点折叠导航 (FR-005, FR-021, SC-001)
- [x] T082 [P] [US4] 创建 `apps/web/src/components/filters/QuickFilters.vue`、`MoreFiltersPopover.vue` (FR-005, FR-008, SC-001)
- [x] T083 [P] [US4] 创建 `apps/web/src/components/filters/MobileFilterDrawer.vue` 和 `ActiveFilterTags.vue` (FR-005, FR-008, FR-021, FR-022, SC-001, SC-002)
- [x] T084 [US4] 在 `apps/web/src/app/stores/filter.store.ts` 完成 Router query 双向同步 (FR-007, SC-001)
- [x] T085 [P] [US4] 创建 `apps/web/src/components/learning/ArchetypeResultRow.vue` 紧凑结果项 (FR-003, FR-008, SC-001)
- [x] T086 [US4] 创建 `apps/web/src/views/LibraryView.vue` 组合结果数、空状态和母题列表 (FR-005, FR-008, FR-020, SC-001)
- [x] T087 [US4] 在 `apps/web/src/app/App.vue` 接入桌面侧栏、平板抽屉和手机底部抽屉 (FR-004, FR-021, SC-001, SC-002)

**Checkpoint**: 导航和筛选可以独立部署，并能进入已迁移的 M39。

---

## Phase 7: User Story 5 - 动画反馈与基准模块 (Priority: P1)

**Goal**: 完成统一反馈机制和五个高质量基准模块，为其余迁移建立质量标杆。

**Independent Test**: M09、M12、M20、M21、M39 均能完成错误提示、正确反馈、步骤和复位。

### Tests

- [x] T088 [P] [US5] 在 `apps/web/tests/component/learning/LearningFeedback.spec.ts` 编写 idle/hint/correct/adjust 测试 (FR-015, SC-005)
- [x] T089 [P] [US5] 在 `apps/web/tests/component/modules/` 编写 M09、M12、M20、M21 默认与交互测试 (FR-009, FR-010, FR-013, SC-005, SC-006)
- [x] T090 [US5] 在 `tests/e2e/reference-modules.spec.ts` 编写五个基准模块核心路径 (FR-009, FR-010, FR-011, SC-005, SC-006)
- [x] T091 [P] [US5] 在 `tests/visual/reference-modules.spec.ts` 编写三视口截图和舞台像素非空检查 (FR-004, FR-011, SC-002, SC-006)

### Implementation

- [x] T092 [P] [US5] 创建 `apps/web/src/modules/shared/useModuleSession.ts` 管理 normalize、feedback、revision 和复位 (FR-009, FR-013, FR-015, SC-005)
- [x] T093 [P] [US5] 创建 `apps/web/src/modules/shared/DraggableObject.vue`、`IntegerStepper.vue`、`SceneStatus.vue` (FR-009, FR-022, SC-005, SC-006)
- [x] T094 [US5] 迁移 M09 到 `apps/web/src/modules/m09/`，保留算筹、算盘、计算器联动大舞台 (FR-010, FR-011, SC-005, SC-006)
- [x] T095 [US5] 迁移 M12 到 `apps/web/src/modules/m12/`，使用分层火车、桥梁与距离线 (FR-010, FR-011, SC-005, SC-006)
- [x] T096 [US5] 迁移 M20 到 `apps/web/src/modules/m20/`，使用独立鸡兔角色和抬腿步骤 (FR-010, FR-011, SC-005, SC-006)
- [x] T097 [US5] 迁移 M21 到 `apps/web/src/modules/m21/`，保留筹码调整和多种交互 (FR-010, FR-011, SC-005, SC-006)
- [x] T098 [US5] 在 `apps/web/src/modules/registry.ts` 完成五个基准模块注册并删除对应旧 UI 分派 (FR-018, FR-024, SC-004, SC-006)

**Checkpoint**: 五个基准模块通过数学、组件、E2E 和视觉验收。

---

## Phase 8: User Story 6 - 家长陪练与子题切换 (Priority: P2)

**Goal**: 在不遮挡和不重置动画的情况下提供子题与陪练信息。

**Independent Test**: 打开抽屉、切换标签和子题、关闭抽屉，动画状态按契约保持或重置。

### Tests

- [x] T099 [P] [US6] 在 `apps/web/tests/component/coach/CoachDrawer.spec.ts` 编写焦点和状态保持测试 (FR-016, FR-022, SC-005, SC-007)
- [x] T100 [P] [US6] 在 `apps/web/tests/component/coach/VariantList.spec.ts` 编写子题初始化测试 (FR-017, SC-005, SC-007)
- [x] T101 [US6] 在 `tests/e2e/parent-coach.spec.ts` 编写陪练抽屉完整路径 (FR-016, FR-017, SC-005, SC-007)

### Implementation

- [x] T102 [P] [US6] 创建 `apps/web/src/components/coach/CoachDrawer.vue` 与 Reka UI 焦点管理 (FR-016, FR-022, SC-005, SC-007)
- [x] T103 [P] [US6] 创建 `apps/web/src/components/coach/VariantList.vue`、`ParentTalkTrack.vue`、`SolutionSteps.vue` (FR-016, FR-017, SC-005, SC-007)
- [x] T104 [US6] 在 `apps/web/src/app/stores/learning.store.ts` 实现子题切换和抽屉状态 (FR-017, SC-005, SC-007)
- [x] T105 [US6] 在 `apps/web/src/views/LessonView.vue` 接入桌面右侧与手机底部陪练抽屉 (FR-004, FR-016, SC-005, SC-007)

**Checkpoint**: 家长功能不干扰孩子主舞台，子题与动画状态规则明确。

---

## Phase 9: User Story 7 - 响应式、键盘与减少动态 (Priority: P2)

**Goal**: 在三种目标视口和键盘路径中提供完整功能。

**Independent Test**: 不使用鼠标，在手机和桌面完成筛选、打开母题、调整、切步和关闭抽屉。

### Tests

- [x] T106 [P] [US7] 在 `tests/e2e/responsive-layout.spec.ts` 编写三视口溢出和舞台尺寸检查 (FR-004, FR-021, SC-002, SC-003)
- [x] T107 [P] [US7] 在 `tests/e2e/keyboard-navigation.spec.ts` 编写焦点顺序与抽屉返回测试 (FR-022, SC-002)
- [x] T108 [P] [US7] 在 `tests/e2e/reduced-motion.spec.ts` 编写减少动态效果测试 (FR-022, SC-002, SC-006)
- [x] T109 [P] [US7] 在 `tests/e2e/performance-budget.spec.ts` 编写登录、蓝图、管理员写操作、首屏、母题结构和五个基准动画帧率预算测试 (FR-004, FR-024, FR-028, FR-032, SC-003, SC-006)

### Implementation

- [x] T110 [US7] 在 `apps/web/src/styles/base.css` 完成桌面、平板、手机响应式应用壳 (FR-004, FR-021, SC-002, SC-003)
- [x] T111 [US7] 在 `apps/web/src/styles/motion.css` 完成统一时长、取消旧动画和减少动态规则 (FR-022, SC-002, SC-006)
- [x] T112 [P] [US7] 在 `apps/web/src/components/ui/` 补齐 Tooltip、IconButton、VisuallyHidden 等项目封装 (FR-022, SC-002)
- [x] T113 [US7] 修复所有学习和筛选组件的 accessible name、焦点与 `aria-live` (FR-022, SC-002)
- [x] T114 [US7] 在 `apps/web/performance-budget.json` 固化 API p95 1秒、首屏 2秒、题目结构 300ms 和动画 55fps 性能门并接入测试脚本 (FR-004, FR-024, FR-028, FR-032, SC-003, SC-006)

**Checkpoint**: 三种视口和键盘路径全部通过，无横向滚动或遮挡。

---

## Phase 10: Complete Module Migration

**Purpose**: 使用已验证的架构迁移其余 34 个母题。

- [x] T115 [P] [US3] 在 `apps/web/tests/component/modules/batch-operations.spec.ts` 先编写 M01-M08 组件契约与领域对照测试 (FR-009, FR-018, FR-025, SC-004, SC-005)
- [x] T116 [P] [US5] 在 `apps/web/tests/component/modules/batch-applications.spec.ts` 先编写 M10-M19 组件契约与领域对照测试 (FR-009, FR-018, FR-025, SC-004, SC-005)
- [x] T117 [P] [US3] 在 `apps/web/tests/component/modules/batch-time-fractions.spec.ts` 先编写 M22-M27 组件契约与领域对照测试 (FR-009, FR-018, FR-025, SC-004, SC-005)
- [x] T118 [P] [US5] 在 `apps/web/tests/component/modules/batch-geometry.spec.ts` 先编写 M28-M38 组件契约与领域对照测试 (FR-009, FR-018, FR-025, SC-004, SC-005)
- [x] T119 [P] [US3] 迁移 M01-M08 到 `apps/web/src/modules/m01/` 至 `apps/web/src/modules/m08/` (FR-009, FR-018, FR-024, FR-025, SC-004, SC-005)
- [x] T120 [P] [US5] 迁移 M10-M19 到 `apps/web/src/modules/m10/` 至 `apps/web/src/modules/m19/` (FR-009, FR-018, FR-024, FR-025, SC-004, SC-005)
- [x] T121 [P] [US3] 迁移 M22-M27 到 `apps/web/src/modules/m22/` 至 `apps/web/src/modules/m27/` (FR-009, FR-018, FR-024, FR-025, SC-004, SC-005)
- [x] T122 [P] [US5] 迁移 M28-M38 到 `apps/web/src/modules/m28/` 至 `apps/web/src/modules/m38/` (FR-009, FR-018, FR-024, FR-025, SC-004, SC-005)
- [x] T123 在 `tests/e2e/all-modules-smoke.spec.ts` 遍历 39 个母题的加载、参数、步骤和复位 (FR-009, FR-018, FR-020, SC-004, SC-006)
- [x] T124 在 `apps/web/tests/unit/modules/module-coverage.spec.ts` 验证 39 个注册、117 个子题和所有资产引用 (FR-018, FR-019, FR-023, FR-024, SC-004, SC-006)

**Checkpoint**: 所有母题均由 Vue 组件提供，旧 UI 不再承担生产功能。

---

## Phase 11: Cleanup And Release Gates

- [x] T125 [P] 在 `apps/api/tests/ops/backup-restore.spec.ts` 先编写备份保留、恢复一致性和 RPO/RTO 验收测试 (FR-048, SC-008, SC-013)
- [x] T126 [P] 在 `apps/api/tests/ops/config-startup.spec.ts` 先编写缺失环境变量、弱 Secret 和健康检查启动测试 (FR-049, SC-008, SC-013)
- [x] T127 在 `apps/api/scripts/backup.sh`、`restore.sh` 和 `docs/operations/recovery.md` 实现每日备份、30 天保留及季度恢复流程 (FR-048, SC-008, SC-013)
- [x] T128 在 `apps/api/src/serve-web.ts` 和 `docs/operations/deployment.md` 实现同源 Web/API 服务、迁移前备份和回退步骤 (FR-042, FR-048, FR-049, SC-008, SC-013)
- [x] T129 删除旧 `src/app.js`、旧 DOM 入口和不再使用的 CSS 规则 (FR-024, FR-025, SC-004, SC-008)
- [x] T130 将仍使用的 `src/core.js` 逻辑完全迁移后删除旧文件 (FR-025, SC-008)
- [x] T131 [P] 清理未引用动画整图和重复资产，保留独立对象与必要帧；已审计 `assets/` 源帧均为运行或 manifest 保留资产，未发现可安全删除的源级重复整图 (FR-011, FR-023, SC-004, SC-006)
- [x] T132 [P] 更新 `docs/grade3-math-blueprint.md` 和 `docs/vue-migration-status.md` (FR-018, FR-025, SC-004, SC-008)
- [x] T133 执行 [quickstart.md](./quickstart.md) 全部 smoke tests；本机 PostgreSQL 已可用，`db:migrate` 与 `seed:admin` 均通过 (FR-019, FR-025, FR-048, FR-049, SC-008, SC-013)
- [x] T134 运行数据库迁移、鉴权安全测试、Schema、typecheck、unit、component、E2E、visual 和 production build 全部质量门；`npm run typecheck`、`npm run test`、`npm run test:e2e` 516 条、`npm run build` 均通过 (FR-019, FR-025, FR-037, FR-048, FR-049, SC-008, SC-013)
- [x] T135 使用浏览器检查 M09、M12、M20、M21、M39 三视口，并将验收结果记录到 `docs/acceptance/reference-module-visual.md` (FR-004, FR-010, FR-011, FR-021, SC-002, SC-005, SC-006)

---

## Phase 12: Animation Delight Upgrade

**Purpose**: 逐个把 M01-M39 从“可用交互演示”升级为“精致、有趣、轻松好笑的大舞台数学动画”，统一使用 `image2` 规划可拆分图片资产。

- [x] T136 [P] 更新 `docs/animation-upgrade-roadmap.md`、UI/UX 规范、蓝图、验收文档和本任务清单，定义动画精修标准 (FR-010, FR-011, FR-018, FR-051, FR-052, SC-005, SC-006, SC-014)
- [x] T137 [P] 在 `apps/web/src/modules/shared/` 建立分层舞台资产契约、整数控制守卫和 image2 asset manifest (FR-010, FR-011, FR-019, FR-024, FR-051, SC-004, SC-006, SC-014)
- [x] T138 [P] 在 `apps/web/src/modules/shared/` 抽取 `SceneStage`、`SceneLayer`、`MeasureOverlay`、`PlayfulFeedbackBubble`、`StepRail` 等舞台 primitives (FR-004, FR-010, FR-011, FR-021, FR-052, SC-002, SC-006, SC-014)
- [x] T139 精修基准模块 M09、M12、M20、M21、M39，保持既有方向并接入统一质量门 (FR-010, FR-011, FR-018, FR-051, FR-052, SC-005, SC-006, SC-014)
- [x] T140 [P] 使用 image2 生成并接入 M01-M08 运算批图层资产与互动舞台 (FR-010, FR-011, FR-018, FR-023, FR-051, FR-052, SC-004, SC-006, SC-014)
- [x] T141 [P] 使用 image2 生成并接入 M10-M19 应用模型批图层资产与互动舞台 (FR-010, FR-011, FR-018, FR-023, FR-051, FR-052, SC-004, SC-006, SC-014)
- [x] T142 [P] 使用 image2 生成并接入 M22-M27 时间分数批图层资产与互动舞台 (FR-010, FR-011, FR-018, FR-023, FR-051, FR-052, SC-004, SC-006, SC-014)
- [x] T143 [P] 使用 image2 生成并接入 M28-M38 图形测量统计批图层资产与互动舞台 (FR-010, FR-011, FR-018, FR-023, FR-051, FR-052, SC-004, SC-006, SC-014)
- [x] T144 在组件和 E2E 测试中补齐大舞台、图层资产、动态对象、轻幽默反馈、整数约束、减少动态和三视口验收 (FR-004, FR-010, FR-011, FR-021, FR-022, FR-051, FR-052, SC-002, SC-006, SC-014)
- [x] T145 更新 `docs/acceptance/reference-module-visual.md`，记录每批精修后的浏览器截图与质量门结果 (FR-010, FR-011, FR-019, FR-051, FR-052, SC-005, SC-006, SC-014)

**Checkpoint**: 每个母题的主体验都发生在大舞台内，image2 图片资产可拆、可动、可验收，幽默反馈服务数学关系而不是装饰。

## Dependencies & Execution Order

- Phase 1 → Phase 2：工程基础必须先完成。
- Phase 2 → Phase 3：认证依赖共享契约和工程基础。
- Phase 3 鉴权阻塞所有学习和管理用户故事。
- Phase 4 管理员功能依赖 Phase 3；US3 和 US4 可在 Phase 3 后并行。
- US5 依赖 US3 的舞台外壳；US6 依赖 LessonView；US7 可在各组件形成后持续执行。
- 完整模块迁移依赖五个基准模块通过质量门。
- 清理旧实现必须最后执行。

## Parallel Opportunities

- 数据类型、设计 tokens、测试配置可并行。
- 鉴权 API 测试、Web 登录组件测试和数据库 Schema 可在契约确定后并行。
- 领域函数可按算术、应用、时间分数、图形测量分组并行迁移。
- US3 与 US4 主要写入不同目录，可并行推进。
- 五个基准模块在共享组件稳定后可并行迁移。
- 最终四个母题批次目录互不重叠，可并行迁移，但 `registry.ts` 由单一任务统一集成。
- 动画精修批次可在共享舞台 primitives 完成后分领域并行推进，image2 资产生成与组件接入必须按模块验收。

## Implementation Strategy

1. 先建立数据库、鉴权、首次改密和管理员用户生命周期。
2. 在受保护应用中交付 Vue + M39 的最小学习闭环。
3. 加入筛选和路由，使最小版本可找到、可分享。
4. 用五个基准模块稳定共享契约和 UI 质量。
5. 增加陪练、响应式和无障碍。
6. 按领域并行迁移其余模块。
7. 全量测试通过后删除旧实现。
8. 按动画精修路线图逐题升级舞台、image2 图层和轻幽默反馈。
