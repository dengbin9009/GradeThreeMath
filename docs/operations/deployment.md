# 部署说明

1. 配置 `DATABASE_URL`、至少 32 字符的 `BETTER_AUTH_SECRET`、不含路径的精确 `APP_ORIGIN` 和 `WEB_DIST_DIR`。
2. 迁移前执行 `apps/api/scripts/backup.sh`，确认备份文件生成并可读取，再运行 `npm run db:migrate`。
3. 首次部署运行 `npm run seed:admin`，随后撤除 seed 密码环境变量。
4. 运行 `npm run build`，再用 `npm run serve:web -w @math/api` 同源发布 Web 与 API；`/api/*` 由 API 处理，其余路径回退到 `apps/web/dist/index.html`。
5. 只把 `/api/health/live` 和 `/api/health/ready` 暴露给探针；健康响应不得包含配置或数据库详情。
6. 发布后检查登录、首次改密、蓝图、用户暂停与强制下线，并安排每日备份和保留任务。

数据库不可用时 readiness 返回 `503`；代理或 CDN 不得回退到缓存的私有蓝图或管理响应。若迁移后检查失败，立即停止新进程，使用最近一次迁移前备份执行 `apps/api/scripts/restore.sh`，恢复后重新运行 `/api/health/ready`、登录和管理员用户列表检查。
