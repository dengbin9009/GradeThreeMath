# Research: Vue 数学母题学习工作台重构

## Decision 1: Vue 3 + TypeScript + Vite

**Decision**: 使用 Vue 3 单文件组件、`<script setup lang="ts">` 和 Vite Vue TypeScript 模板。

**Rationale**: 当前应用由大段 DOM 字符串和事件绑定组成，Vue 的声明式组件和类型化 props/emits 能直接降低状态同步风险。Vite 官方提供 Vue/TypeScript 模板、Vue SFC HMR 和前端构建流程，符合 Web 客户端需求。

**Alternatives considered**:

- 保持原生 JS：无法解决 39 个模块继续膨胀后的可维护性和状态一致性问题。
- Nuxt：当前无 SSR、服务端数据和账号需求，增加不必要运行时和约定。
- React：技术上可行，但用户已明确要求 Vue。

**Primary references**:

- [Vue TypeScript 与组合式 API](https://cn.vuejs.org/guide/typescript/composition-api)
- [Vite Getting Started](https://vite.dev/guide/)
- [Vite Features](https://vite.dev/guide/features.html)

## Decision 2: Reka UI As Accessible Primitives

**Decision**: 使用 Reka UI 提供 Dialog、Drawer、Tabs、Accordion、Tooltip、Toggle Group、Slider 等无样式基础组件；视觉由项目 CSS tokens 和组件样式控制。

**Rationale**: 数学动画需要题目专属场景，完整企业 UI 组件库容易把页面推向后台管理风格。Reka UI 官方定位是无样式、可定制且提供键盘导航、焦点管理和 WAI-ARIA 能力，适合建立自己的儿童学习界面。

**Alternatives considered**:

- Element Plus：组件齐全，但默认视觉和密度更适合企业后台，主题改造成本高。
- PrimeVue：功能丰富但同样会引入较强组件视觉和较大能力面。
- 全部手写：视觉最自由，但抽屉、菜单、焦点管理等无障碍细节重复且风险高。

**Primary reference**: [Reka UI Introduction](https://reka-ui.com/docs/overview/introduction)

## Decision 3: Pinia Only For Cross-Page State

**Decision**: Pinia 只管理筛选、抽屉、当前学习会话摘要和可持久 UI 偏好；单个母题动画状态保留在组件或 composable 内。

**Rationale**: 筛选与路由、陪练抽屉等状态跨组件共享，使用显式 store 更易测试。把 39 个动画的瞬时状态全部放入全局 store 会造成耦合和无意义持久化。

**Alternatives considered**:

- 仅使用 provide/inject：小范围可行，但跨路由恢复和调试较弱。
- 每个状态都放 Pinia：会形成巨型全局状态并增加模块间干扰。

**Primary reference**: [Pinia State](https://pinia.vuejs.org/core-concepts/state.html)

## Decision 4: Router Is The Shareable Navigation State

**Decision**: 母题、子题和筛选使用 Vue Router path/query；参数拖动和动画中间步骤不进入 URL。

**Rationale**: 用户需要刷新、前进后退和分享后恢复查找上下文。动画瞬时状态变化频繁，写入 URL 会制造历史噪音和无效分享链接。

**Alternatives considered**:

- 所有状态只在 Pinia：刷新后丢失母题和筛选上下文。
- 所有状态都进 URL：拖动一次产生大量路由变化，体验和可维护性差。

## Decision 5: Typed Content Repository Around Existing JSON

**Decision**: 保留现有蓝图 JSON，以构建时 Schema 校验和 TypeScript repository 包装；不把 4500 行内容手工拆进 Vue 文件。

**Rationale**: 蓝图已经是完整内容源。保留 JSON 能减少迁移风险，并让 UI、测试、打印和未来题库继续共享同一份数据。

**Alternatives considered**:

- 每个模块导出自己的题目对象：内容分散，关联查询和全局校验困难。
- 引入数据库：第一版没有服务端和编辑后台需求。

## Decision 6: Explicit Module Registry Instead Of Conditional Dispatch

**Decision**: 创建 `ModuleDefinition` 注册表，按 M 编号映射动态组件、默认状态、能力和资产；删除 39 个 `if (module.id === ...)`。

**Rationale**: 注册表让路由、筛选、缺失模块检测和按需加载都能基于同一契约。每个母题仍可保留专属场景，不强迫所有动画进入一个万能渲染器。

**Alternatives considered**:

- 继续条件分派：新增或迁移模块容易遗漏，无法静态检查完整性。
- JSON 驱动通用动画 DSL：当前 39 个题型差异大，第一版会过度抽象。

## Decision 7: Browser-Native Motion First

**Decision**: 使用 Vue transition、CSS transform/transition 和 Web Animations API；不在基础重构中引入 GSAP。

**Rationale**: 当前动画以对象移动、数量变化、步骤显隐为主，浏览器原生能力足够且更容易支持减少动态效果。只有在某个模块出现复杂时间线且原生实现明显不可维护时，才单独记录新增动画依赖。

**Alternatives considered**:

- GSAP 全局使用：能力强，但当前需求不足以证明额外依赖和 API 面。
- Canvas 重写全部场景：文本、无障碍和响应式成本高，也不利于复用现有图片 DOM。

## Decision 8: Test Pyramid With Visual Gates

**Decision**: Vitest 覆盖领域和组件，Playwright 覆盖关键路径与视口，五个基准模块增加视觉截图和动态对象数量断言。

**Rationale**: 数学正确性、DOM 交互和视觉布局是三类独立风险，仅靠一种测试无法覆盖。图片动画必须断言对象数量和加载状态，避免“图片存在但交互割裂”再次出现。

## Decision 9: Incremental Migration With Reference Modules First

**Decision**: 先迁移 M09、M12、M20、M21、M39，再按领域迁移其余模块。

**Rationale**: 这五个模块代表工具联动、拖动距离、关键帧角色、复杂调整和动态对象计数，能尽早暴露共享舞台契约的问题。通过后，其余模块可使用稳定基础继续迁移。

## General Assumptions

- 包管理器默认使用 npm；不把包管理器写入产品契约。
- 第一版不保存长期学习进度，只保存界面偏好和当前会话。
- 现有图片风格作为迁移基线，不在 Vue 重构中同时重画全部资产。
- 语言只做简体中文，不在本次引入国际化框架。
- 生产环境 Web 与 API 同源部署并使用 HTTPS。
- 初始管理员由受控命令创建，普通管理员 UI 不创建新的管理员。
- 系统用户规模适合单一 PostgreSQL 实例和游标分页，不引入目录服务或多租户组织模型。

## Decision 10: Better Auth With Admin And Username Plugins

**Decision**: 使用 Better Auth 的 Email/Password、Username 与 Admin plugins，不手写密码认证、会话或角色基础能力。

**Rationale**: Admin plugin 已提供创建用户、设置密码、角色和撤销会话；Username plugin 提供登录名登录。项目在此基础上增加账号有效期策略和审计，而不是重写高风险认证基础设施。

**Alternatives considered**:

- 自行实现密码哈希和 Session：安全风险高，测试与维护成本不合理。
- 纯 JWT 存入前端：难以及时撤销，且不适合管理员改变有效期后立即失效的需求。
- 第三方社交登录：学生不应被要求拥有个人社交账号或邮箱。

**Primary references**:

- [Better Auth Admin plugin](https://better-auth.com/docs/plugins/admin)
- [Better Auth Username plugin](https://better-auth.com/docs/plugins/username)

## Decision 11: Hono API And Same-Origin Deployment

**Decision**: 使用 Hono 提供认证、管理、内容和健康检查 API；生产环境由同一 origin 提供前端与 `/api`，开发环境使用 Vite proxy。

**Rationale**: Better Auth 官方提供 Hono handler 与 session middleware 集成。保持同源可简化 Cookie、CORS 和 CSRF 边界，避免跨域凭证配置成为默认复杂度。

**Alternative considered**: 独立前端域名与 API 域名。当前没有独立扩容或多客户端需求，跨域 Cookie 不值得。

**Primary reference**: [Better Auth Hono Integration](https://better-auth.com/docs/integrations/hono)

## Decision 12: Database Sessions And Server-Side Validity Policy

**Decision**: 会话存入 PostgreSQL；绝对时长 12 小时、空闲时长 2 小时，并受账号 `validUntil` 上限约束。每个受保护请求在读取 Session 后再次检查 `isActive`、`validFrom`、`validUntil`、`mustChangePassword` 和角色。

**Rationale**: 账号到期或被管理员停用后必须立即阻止使用。只在登录时检查或把角色写入长期 JWT 无法满足及时失效。有效期使用 PostgreSQL `timestamp with time zone` 并以 UTC 比较，界面转换为亚洲/上海时间。

**Alternatives considered**:

- 只依赖 Session 到期：管理员修改有效期后旧会话仍可继续使用。
- 只靠前端路由守卫：可以直接调用 API 绕过。

**Primary references**:

- [Better Auth Session options](https://better-auth.com/docs/reference/options)
- [PostgreSQL Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html)

## Decision 13: HttpOnly Cookie, No Tokens In Web Storage

**Decision**: 会话使用 host-only HttpOnly Cookie；生产环境启用 Secure，SameSite 至少为 Lax。认证令牌不写入 localStorage 或 sessionStorage。

**Rationale**: OWASP 明确不建议将 Session ID、JWT 或 Refresh Token 存入 Web Storage，并建议使用安全 Cookie。Better Auth 保持来源与 CSRF 检查开启，只允许显式 trusted origins。

**Primary references**:

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [Better Auth Security](https://better-auth.com/docs/reference/security)

## Decision 14: Admin-Assigned Login Name And Internal Auth Email

**Decision**: 管理员界面只要求登录名、显示名和临时密码。服务端为 Better Auth 生成不可投递的内部邮箱标识；不收集学生个人邮箱，不开放注册。

**Rationale**: Better Auth 的凭证模型要求 email 字段，而学生使用场景更适合管理员分配的登录名。内部邮箱只作为认证表约束，不用于通信或显示。

**Alternative considered**: 要求每位学生提供真实邮箱。会增加隐私和使用门槛，与小学家庭场景不匹配。

## Decision 15: Temporary Passphrase And Forced Change

**Decision**: 管理员创建或重置账号时生成/设置至少 15 个字符的临时口令，允许粘贴和密码管理器；用户首次登录必须修改。修改密码或管理员重置时撤销其他会话。

**Rationale**: 系统第一版不使用 MFA，采用较长口令并避免周期性强制改密。敏感操作需要当前有效会话并记录审计。

**Primary references**:

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

## Decision 16: PostgreSQL + Drizzle ORM

**Decision**: PostgreSQL 保存认证数据与审计，Drizzle 管理应用自定义表和迁移；Better Auth 生成所需认证 Schema 后纳入同一迁移流程。

**Rationale**: 有效期、并发版本、会话撤销和审计需要事务与可靠时间类型。SQLite 可用于单机原型，但不作为正式多用户部署基线。

## Decision 17: Atomic Administration And Retention

**Decision**: 用户管理写入、对应审计和必要的 Session 撤销使用同一 PostgreSQL 事务；审计保留 365 天，Session 网络元数据在 Session 结束后最多保留 30 天。

**Rationale**: 不能出现“用户已停用但会话仍有效”或“管理变更成功但没有审计”的部分成功状态。有限保留网络元数据兼顾安全排查与学生隐私。

## Decision 18: Backup And Operational Health

**Decision**: PostgreSQL 每日备份、保留 30 天，每季度恢复演练；API 分离 liveness 与 readiness，启动时强制校验数据库、认证 Secret 和站点 Origin。

**Rationale**: 引入账号和有效期后，系统不再是可随时重新生成的静态站点；恢复能力和配置失败前置检测属于上线基础条件。
