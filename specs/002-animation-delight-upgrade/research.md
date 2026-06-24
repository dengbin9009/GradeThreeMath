# Research: 交互动画精修与 image2 分层资产升级

## Decision 1: 独立 SpecKit Feature

**Decision**: 创建 `002-animation-delight-upgrade`，不继续把本需求塞进 `001-vue-learning-workbench`。

**Rationale**: 001 已经完成 Vue 重构、鉴权和模块迁移主线。动画精修是后续可独立验收的产品升级，具有新的 FR、SC、任务批次和验收门。

**Alternatives considered**:

- 继续修改 001：会让已完成的迁移任务和未来精修任务混在一起，状态不清。
- 只写普通 docs：缺少 SpecKit 的 FR/SC 追踪，后续 implement 容易发散。

## Decision 2: image2 分层资产优先

**Decision**: image2 产物按背景、可动对象、状态帧、数学道具、反馈道具和 fallback 规划。

**Rationale**: 用户明确指出静态整图会和交互割裂。只有图层可拆，才能让数量、步骤和拖动由程序动态驱动。

**Alternatives considered**:

- 每题生成一张完整插画：画面可能更快成型，但无法表达数量变化。
- 全部用 CSS/SVG 画：可控但不够生动，且用户明确希望使用 image2。

## Decision 3: 不在图片中写答案和可变数字

**Decision**: image2 图片不得包含题干、公式、答案和可变数字。

**Rationale**: 三年级题目参数会变，图片中文字一旦写死，会产生错误答案、截断和本地化问题。文字和数字应由 Vue 渲染。

## Decision 4: 保留五个基准模块方向

**Decision**: M09、M12、M20、M21、M39 不推倒重写，只接入统一质量门并补强体验。

**Rationale**: 用户已经认可这些模块方向。它们分别覆盖工具联动、拖动距离、关键帧角色、筹码调整和动态书本，是很好的交互基准。

## Decision 5: M01/M02/M03/M31 作为第二阶段样板

**Decision**: 第二阶段先做 M01、M02、M03、M31。

**Rationale**: 这四题覆盖抽象运算、括号优先、位值进位和几何切补，能验证大部分共享舞台能力。它们通过后，再批量推广到其余模块更稳。

## Decision 6: Vue DOM 舞台优先，不全量 Canvas

**Decision**: 继续使用 Vue DOM、CSS transform、transition 和 Web Animations API 组合动画。

**Rationale**: 当前动画需要可访问文本、按钮、焦点、量线和图片对象。DOM 更容易支持无障碍和响应式。Canvas 只适合少数复杂绘图，不适合作为默认架构。

**Alternatives considered**:

- 全量 Canvas：性能可控，但文本、焦点、响应式和测试成本高。
- 引入 GSAP：能力强，但当前需求还不足以证明全局依赖。

## Decision 7: 轻幽默反馈是质量门，不是装饰层

**Decision**: 每个精修模块至少有一个绑定数学状态的轻幽默反馈。

**Rationale**: 用户希望更有趣、更搞笑。把幽默变成质量门，可以避免“贴几个可爱图标”式的无关装饰。

## Decision 8: 精修状态保存在仓库，不入数据库

**Decision**: AnimationUpgradeRecord 和 Image2AssetManifest 首先作为源码文件和文档保存。

**Rationale**: 精修状态是开发和验收元数据，不是运行时用户数据。入库会增加迁移、权限和运维复杂度。

## Decision 9: 声音不进入第一阶段

**Decision**: 第一阶段不做音效。

**Rationale**: 家庭学习环境中声音可能打扰，且声音验收和静音策略会增加一套新复杂度。先把视觉和交互做好。

## Open Questions Resolved By Assumption

- 是否所有图片都必须立刻重画？否，按批次推进。
- 是否要改变账号系统？否，本特性不扩大鉴权范围。
- 是否允许临时保留现有泛用 renderer？允许，未精修模块保持可用，不阻塞样板推进。
