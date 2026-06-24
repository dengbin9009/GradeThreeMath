# Vue Migration Status

旧静态应用已清理，Vue 工作台已成为当前实现入口。后续重点从迁移收尾转入交互动画精修、生产恢复演练和部署环境长期运维。

| Batch | Modules | Status |
|---|---|---|
| Foundation | Workspace, contracts, registry | Complete |
| Authentication | Better Auth, validity, first password change | Complete on local PostgreSQL |
| Administration | User lifecycle, reset, revoke, audit | Complete on local PostgreSQL |
| Reference | M09, M12, M20, M21, M39 | Complete |
| Operations | M01-M08, M10-M19 | Complete through shared large-stage renderer |
| Time and fractions | M22-M27 | Complete through shared large-stage renderer |
| Geometry and statistics | M28-M38 | Complete through shared large-stage renderer |
| Animation delight upgrade | M01-M39 | Planned; roadmap documented |

## Current Gates

- 39 个母题和 117 个变式均已注册、可按需加载。
- 图片动画标签覆盖所有有帧资源的母题，M27、M39 已补齐标记。
- 题目参数由 Schema 和控件统一限制为整数。
- 单元、组件、领域、API、TypeScript、Lint 与生产构建通过。
- 本机 PostgreSQL、Better Auth 登录、管理员用户管理和 117 个变式审计已通过；生产环境恢复演练仍按部署环境定期执行。

## Animation Delight Upgrade

新一轮优化不改变知识图谱和鉴权主线，重点是把母题动画从“可用的大图演示”升级为“可操作、精致、有趣、轻松好笑的数学小剧场”。

- 资产策略：后续图片统一按 `image2` 生成可拆分图层包，包括背景、可动对象、状态帧、数学道具和反馈道具。
- 基准模块：M09、M12、M20、M21、M39 保留现有方向，只做精修和质量门统一。
- 新样板模块：M01、M02、M03、M31 优先验证运算顺序、括号优先、位值进位和组合面积的分层交互。
- 全量路线：逐批覆盖 M01-M39，详见 [交互动画精修路线图](animation-upgrade-roadmap.md)。
- 升级验收：每个模块必须具备大舞台、动态对象、整数参数、数学状态反馈、减少动态可用和三视口无溢出。
