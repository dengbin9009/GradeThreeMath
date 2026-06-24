# Quickstart And Acceptance: Vue 数学母题学习工作台

## Purpose

本文件描述实现阶段的启动方式和最小验收路径。当前阶段只产出规格，命令将在 Vue 工程初始化后生效。

## Expected Commands

```bash
npm install
npm run db:migrate
npm run seed:admin
npm run dev
npm run typecheck
npm run test
npm run test:e2e
npm run build
npm run preview
```

`npm run build` 必须串行或并行执行蓝图校验、共享/API TypeScript、`vue-tsc --noEmit` 和 Vite 生产构建。

## Environment

- 使用满足当前 Vite 官方要求的 Node.js 版本。
- 使用 PostgreSQL；本地测试可通过项目提供的容器启动。
- `.env` 至少包含 `DATABASE_URL`、`BETTER_AUTH_SECRET`、`APP_ORIGIN`，生产值不得提交仓库。
- 蓝图和图片资产由同源应用提供，蓝图数据需要有效会话。
- 首次启动执行受控 `seed:admin` 命令创建初始管理员，命令必须防止重复创建。

## Smoke Test 0: Authentication And Validity

1. 未登录打开 `/learn`，确认跳转 `/login` 并保留安全 redirect。
2. 使用有效普通用户登录，首次登录进入修改临时密码。
3. 修改密码后进入 `/learn`。
4. 分别尝试未生效、已到期、已暂停和错误密码账号。
5. 退出并使用浏览器后退。

**Pass**: 只有有效账号可进入；首次改密完成前不能访问学习页；退出后受保护内容不可继续使用；认证凭证不出现在 Web Storage。

## Smoke Test 0A: Admin User Lifecycle

1. 管理员进入 `/admin/users`。
2. 创建一个明天生效、30 天后到期的普通用户。
3. 将生效时间改为当前时间并保存。
4. 用户登录并修改临时密码。
5. 管理员暂停该用户，用户下一次请求被退出。
6. 管理员恢复并延长有效期，用户重新登录。
7. 检查创建、改期、暂停、恢复审计事件。

**Pass**: 权限、有效期、会话撤销和审计全部符合 [auth-api.md](./contracts/auth-api.md)。

## Smoke Test 0B: Session, Limits And Atomic Failure

1. 创建 12 小时绝对 Session 并模拟 2 小时无活动。
2. 将账号到期时间设为早于 Session 原到期时间。
3. 在 15 分钟窗口内触发登录失败阈值并等待窗口恢复。
4. 注入 AuditEvent 或 Session 撤销失败，提交一次管理员停用操作。

**Pass**: Session 按最早边界失效；限流不永久锁号；原子操作失败时用户状态、Session 和审计均保持原状态。

## Smoke Test 0C: Operations And Recovery

1. 缺少每个必填环境变量分别启动 API。
2. 调用 liveness 与 readiness，并模拟数据库不可用。
3. 从每日备份恢复到独立数据库，运行 Schema 与账号状态一致性检查。
4. 执行一次迁移回退或备份恢复演练。

**Pass**: 配置错误启动失败且不泄露 Secret；健康检查只返回状态；恢复达到 RPO 24 小时、RTO 4 小时。

## Smoke Test 1: Find And Open A Module

1. 打开 `/learn`。
2. 搜索 `M20`。
3. 确认结果只保留鸡兔同笼相关项。
4. 打开 M20。
5. 确认首屏优先显示题干和大动画舞台。

**Pass**: 10 秒内完成；筛选保留在 URL；无控制台错误。

## Smoke Test 2: M39 Dynamic Objects

1. 打开 `/learn/M39/M39-V1`。
2. 默认步骤检查书架 13 本、借出篮 0、还回篮 0。
3. 切换撤销还回，检查书架 1、还回篮 12。
4. 切换撤销借出，检查书架 23、借出篮显示动作数量。
5. 切换正向验算，检查算式 `23 - 22 + 12 = 13`。
6. 点击复位。

**Pass**: 同一舞台内对象数量与算式同步，未使用整张静态图替换步骤。

## Smoke Test 3: Filtering

1. 选择层级“拔高”。
2. 选择“图片动画”。
3. 确认结果数变化并显示两个已选标签。
4. 删除“拔高”标签。
5. 点击清除全部。

**Pass**: URL、筛选控件、结果列表和数量始终一致。

## Smoke Test 4: Parent Coach

1. 在任意母题调整参数并进入第二步。
2. 打开家长陪练抽屉。
3. 查看常见错因，切换到子题标签。
4. 关闭抽屉。

**Pass**: 动画参数和步骤未被重置，焦点回到抽屉触发按钮。

## Smoke Test 5: Responsive And Keyboard

对 `1440x900`、`1024x768`、`390x844` 重复以下操作：

1. 打开筛选。
2. 选择一个条件并打开母题。
3. 调整数值。
4. 使用上一步/下一步。
5. 打开并关闭陪练抽屉。

**Pass**: 无横向滚动、重叠、截断或不可达按钮；键盘路径完整；舞台不是缩略图。

## Smoke Test 6: Integer Guard

1. 遍历所有 Variant 默认参数。
2. 对可调参数取最小值、中间值和最大值。
3. 运行 normalize、求解和格式化。

**Pass**: 参数、中间结果和答案均满足 `Number.isInteger`，页面文本不包含小数结果。

## Smoke Test 7: Performance Budget

1. 使用 Chromium 桌面基准视口和冷缓存打开登录后的 `/learn`。
2. 记录首屏可交互时间。
3. 在蓝图响应完成后打开任一母题并记录题目结构显示时间。
4. 对 M09、M12、M20、M21、M39 各连续操作 5 秒并记录平均帧率。

**Pass**: 首屏不超过 2 秒；母题结构不超过 300ms；五个基准动画平均不低于 55fps。

## Build Gate

完成一次迁移批次前必须满足：

- 蓝图 Schema 校验通过。
- 数据库迁移可以从空库完整执行，初始管理员 seed 可重复安全运行。
- TypeScript 类型检查通过。
- 所有领域和组件测试通过。
- 鉴权、角色、有效期、并发更新和审计 API 集成测试通过。
- Session 时长、限流、原子回滚、健康检查和性能预算通过。
- 最近一次季度恢复演练满足 RPO/RTO，或开发阶段的自动恢复演练通过。
- 关键 Playwright 路径通过。
- 五个基准模块截图无视觉回归。
- 生产构建成功，未引用的旧动画资产已清理。
