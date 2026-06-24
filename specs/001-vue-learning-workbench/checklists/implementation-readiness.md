# Implementation Readiness Requirements Checklist: Vue 数学母题学习工作台重构

**Purpose**: 在进入实现前，检查账号安全生命周期、数学内容迁移、交互动画和运行保障需求是否完整、明确、一致且可追踪。

**Created**: 2026-06-22

**Feature**: [spec.md](../spec.md)

**Audience**: PR reviewer

**Depth**: Standard pre-implementation gate

## Authentication And Account Lifecycle

- [x] CHK001 是否完整定义登录、首次改密、退出、会话轮换和受保护资源访问的需求边界？ [Completeness, Spec §FR-027, §FR-028, §FR-038, §FR-043]
- [x] CHK002 是否明确区分账号有效期、Session 绝对有效期、空闲超时及三者同时存在时的优先级？ [Clarity, Spec §FR-031, §FR-043]
- [x] CHK003 是否为未生效、已到期、已停用、错误凭证和限流五类失败状态规定一致且防枚举的公开反馈？ [Consistency, Spec §User Story 1.3, §FR-037, §FR-044]
- [x] CHK004 是否穷举停用、到期、密码重置、角色变化和有效期收紧时的 Session 撤销要求？ [Coverage, Spec §FR-034, §FR-035]
- [x] CHK005 是否明确普通管理员 UI、受控运维流程和最后管理员保护之间的权限边界？ [Clarity, Spec §FR-029, §FR-040, Out Of Scope]
- [x] CHK006 是否为用户名、显示名、内部认证邮箱、角色和有效期字段分别定义可变性与操作者权限？ [Completeness, Spec §FR-032, §FR-046]

## Administration, Audit And Failure Recovery

- [x] CHK007 是否完整定义创建、搜索、分页、暂停、恢复、改期、重置密码和强制下线的管理需求？ [Completeness, Spec §FR-032, §FR-033, §FR-034]
- [x] CHK008 是否明确并发版本冲突的检测条件、错误结果及安全恢复方式？ [Coverage, Spec §FR-041]
- [x] CHK009 是否规定用户写入、审计事件和必要 Session 撤销必须原子提交，并定义任一环节失败后的结果？ [Recovery, Spec §FR-045]
- [x] CHK010 是否完整列出必须审计的安全敏感动作及每条记录允许保存的非敏感字段？ [Completeness, Spec §FR-039, §FR-047]
- [x] CHK011 是否明确审计记录与 Session 网络元数据的读取权限、保留期限和到期处理方式？ [Clarity, Spec §FR-047]
- [x] CHK012 是否量化登录与敏感管理操作的限流主体、窗口、阈值及窗口结束后的恢复行为？ [Measurability, Spec §FR-044]

## Protected Content And Operational Boundaries

- [x] CHK013 是否穷举公开页面、公开健康检查、公开静态资源和必须鉴权的页面/API？ [Completeness, Spec §FR-028, §FR-042, §FR-049, §FR-050]
- [x] CHK014 是否明确静态应用壳不得内嵌蓝图、用户或管理数据，并规定未授权蓝图请求不得泄露 payload 或私有缓存标识？ [Security, Spec §FR-042, §FR-050]
- [x] CHK015 是否为 liveness、readiness、数据库不可用和受保护 API 降级分别定义非敏感响应边界？ [Coverage, Spec §FR-049]
- [x] CHK016 是否明确生产启动必需配置、Secret 最低强度和允许 Origin 的校验要求？ [Clarity, Spec §FR-049]
- [x] CHK017 是否定义数据库备份频率、保留时间、恢复演练频率、迁移回退及可量化 RPO/RTO？ [Measurability, Spec §FR-048, §SC-013]

## Mathematics And Content Migration

- [x] CHK018 是否将 38 个知识点、39 个母题、117 个子题及稳定 K/M 关系定义为不可丢失的迁移基线？ [Completeness, Spec §FR-018, §SC-004]
- [x] CHK019 是否为生成参数、中间结果、答案和非法参数组合统一规定整数约束？ [Consistency, Spec §FR-012, §FR-013]
- [x] CHK020 是否要求蓝图 Schema、ID 引用、动画注册、资产引用和整数约束在构建时统一校验？ [Coverage, Spec §FR-019]
- [x] CHK021 是否明确旧领域函数与新 TypeScript 领域函数的结果对照和删除旧实现的前置条件？ [Clarity, Spec §FR-025, Constitution §VI]
- [x] CHK022 是否将领域测试和四批模块契约测试明确安排在对应实现任务之前？ [Traceability, Tasks §Phase 2, §Phase 10]

## Learning Interaction And Visual Quality

- [x] CHK023 是否完整规定每个互动母题必须具备参数、步骤、提示、检查、反馈和复位能力？ [Completeness, Spec §FR-009, §FR-014, §FR-015]
- [x] CHK024 是否明确题干、图片对象、关键数量、计算值和答案规则必须共享同一状态来源？ [Consistency, Spec §FR-011, §FR-013]
- [x] CHK025 是否明确禁止把动态数量退化为静态整图或通用小卡片，并定义图片缺失时的需求边界？ [Clarity, Spec §FR-010, §FR-011, §FR-020]
- [x] CHK026 是否为桌面、平板和手机分别定义筛选表面、动画舞台最小尺寸和不可覆盖区域？ [Coverage, Spec §FR-004, §FR-021, §SC-002]
- [x] CHK027 是否覆盖拖动、数值控件、抽屉、菜单、步骤控制的键盘等价操作、焦点返回和减少动态效果？ [Accessibility, Spec §FR-022]
- [x] CHK028 是否明确切换子题时保留的母题导航状态与必须重置的动画状态？ [Clarity, Spec §FR-017]
- [x] CHK029 是否为加载、空结果、缺图、非法参数、未知路由和异步模块失败定义可恢复状态？ [Coverage, Spec §FR-020]

## Acceptance And Traceability

- [x] CHK030 是否分别量化登录、蓝图响应、管理员写操作、首屏、母题结构和动画帧率性能目标？ [Measurability, Spec §SC-003]
- [x] CHK031 是否将五个基准模块质量门和 39 个母题全量 smoke gate 映射到明确任务？ [Traceability, Spec §SC-005, §SC-006, Tasks §Phase 7, §Phase 10]
- [x] CHK032 是否保证每个实现、测试和运维任务都具有有效 FR 与 SC 引用，且不存在未覆盖需求？ [Traceability, Tasks §Format]

## Notes

- 本清单只验证需求文档的可实施性，不表示任何代码或部署工作已经完成。
- `[Gap]`、`[Ambiguity]` 或 `[Conflict]` 标记仅在发现对应文档问题时使用；本清单当前不预设未解决缺口。
