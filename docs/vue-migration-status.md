# Vue Migration Status

旧静态应用仍保留在仓库根目录作为领域结果对照。Vue 工作台已成为新实现入口；旧入口将在数据库集成、E2E 与回退演练全部通过后删除。

| Batch | Modules | Status |
|---|---|---|
| Foundation | Workspace, contracts, registry | Complete |
| Authentication | Better Auth, validity, first password change | Code complete; database integration pending |
| Administration | User lifecycle, reset, revoke, audit | Code complete; database integration pending |
| Reference | M09, M12, M20, M21, M39 | Complete |
| Operations | M01-M08, M10-M19 | Complete through shared large-stage renderer |
| Time and fractions | M22-M27 | Complete through shared large-stage renderer |
| Geometry and statistics | M28-M38 | Complete through shared large-stage renderer |

## Current Gates

- 39 个母题和 117 个变式均已注册、可按需加载。
- 图片动画标签覆盖所有有帧资源的母题，M27、M39 已补齐标记。
- 题目参数由 Schema 和控件统一限制为整数。
- 单元、组件、领域、API、TypeScript、Lint 与生产构建通过。
- 本机 Docker daemon 未运行，因此 PostgreSQL migration、seed、真实 Better Auth 登录和恢复演练仍需在可用数据库环境执行。
