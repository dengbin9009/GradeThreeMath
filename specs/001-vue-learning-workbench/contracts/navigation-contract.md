# Contract: Navigation And Filtering

## Route Contract

| Route | Valid State | Invalid State Behavior |
|---|---|---|
| `/login` | 无有效会话 | 已登录则回到原目标或 `/learn` |
| `/learn` | 母题总览 | N/A |
| `/learn/:archetypeId` | M 编号存在 | 回到 `/learn` 并显示“未找到母题”提示 |
| `/learn/:archetypeId/:variantId` | Variant 属于该 M 编号 | 回到母题默认 Variant 并替换 URL |
| `/account/password` | 有效会话；首次改密用户只允许此页 | 无会话回到登录页 |
| `/admin/users` | 有效 admin 会话 | user 显示无权限并回到 `/learn` |
| `/admin/users/:userId` | 有效 admin 会话且用户存在 | 404 返回用户列表并提示 |

## Authentication Guard Contract

- 未登录访问受保护路由时跳转 `/login?redirect=<safe internal path>`。
- 登录成功后只允许返回站内已验证路径，禁止开放重定向。
- `mustChangePassword=true` 时任何学习或管理路由重定向 `/account/password`。
- 前端守卫只改善体验；API 仍独立检查 Session、有效期和角色。
- 收到 API `401` 时清理安全的前端 Session profile 并回到登录页。
- 收到 API `403` 时保留登录状态并显示无权限，不伪装成网络错误。

## Query Contract

```text
q=<encoded text>
domain=<comma-separated domain keys>
term=up|down|cross
layer=classroom|curriculum|extension
difficulty=basic|improve|challenge
interactive=1
image=1
```

- 未知值忽略，不抛出页面错误。
- 默认值不写入 URL。
- 多值按固定顺序序列化，保证相同筛选产生相同 URL。
- 搜索输入使用短防抖后替换当前历史项；用户提交搜索或打开母题时创建历史项。

## Filter Semantics

- 同一筛选组内为 OR，例如上册或下册。
- 不同筛选组之间为 AND，例如拔高且图片动画。
- `interactive=1` 只返回有交互模块的母题。
- `image=1` 返回使用图片对象或图片帧且具有真实交互的母题。
- 搜索同时匹配 K/M 编号、标题、模型、知识点名称和配置关键词。

## Responsive Contract

| Viewport | Filter Surface | Behavior |
|---|---|---|
| `>=1200px` | 固定左侧栏 + 顶部快捷筛选 | 左侧栏可折叠，中央舞台保持最小宽度 |
| `768-1199px` | 折叠侧栏 + 顶部筛选按钮 | 侧栏覆盖出现，不挤压舞台 |
| `<768px` | 底部筛选抽屉 | 应用后关闭，触发按钮显示条件数量 |

## Accessibility Contract

- 搜索有可见标签或明确 accessible name。
- 筛选组使用语义化 group、checkbox、radio 或 toggle group。
- 结果更新在 `aria-live="polite"` 中播报“找到 N 个母题”。
- 抽屉关闭后焦点返回触发按钮。
- 清除筛选后焦点留在清除按钮或结果标题，不跳回页面顶部。

## Result Contract

每条母题结果最多显示：编号与标题、模型摘要、层级、难度、子题数、互动/图片状态。不得在列表重复展示完整动画说明、家长话术或所有知识点。

选择结果后：

1. 路由进入母题学习页。
2. 标题获得程序化焦点。
3. 当前筛选保留在 query 中，返回总览后仍生效。
4. 不自动播放有明显位移的动画，等待用户操作。
