# 数据库备份与恢复

## 每日备份

生产调度器每天执行 `apps/api/scripts/backup.sh`。脚本使用 PostgreSQL custom 格式，默认保存到 `./backups`，自动删除超过 30 天的备份。备份目录应挂载到独立加密存储。

```bash
DATABASE_URL="$DATABASE_URL" BACKUP_DIR=/srv/math-backups apps/api/scripts/backup.sh
```

## 恢复演练

每季度在隔离数据库执行一次恢复，不得直接覆盖生产库：

```bash
RESTORE_DATABASE_URL="postgres://.../math_restore" apps/api/scripts/restore.sh /srv/math-backups/math-YYYYMMDD.dump
```

记录备份时间、开始/结束时间、用户数、会话数和审计数。验收目标为 RPO 不超过 24 小时、RTO 不超过 4 小时，并抽查账号有效期、会话撤销状态与审计链。

## 迁移回退

生产迁移前先生成并校验备份。若迁移没有可逆 SQL，停止写流量后从迁移前备份恢复；恢复通过校验后再切回应用流量。
