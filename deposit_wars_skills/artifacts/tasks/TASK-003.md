# TASK-003：基于真实案例数据库的首关玩法设计

status: DONE — Quality Gate ACCEPT（G1 静态设计验收）
stage: G1 核心玩法设计（CEO 已批准进入）
DRI: 游戏策划
support: Rental Case Researcher（仅来源解释）；美术设计师（视觉可行性）；程序员（交互与工作量）；数据分析师（试玩指标）
priority: P0
date: 2026-10-22
rework_count: 0/3

## 目标
基于去重案例库设计一个英语优先的 2D 出租屋首关，约 70% 搞笑找茬、30% 证据反击；形成可评审、可估工期的 G1 设计规格，不开发代码。

## 输入与依赖
TASK-001、TASK-002 均为 DONE；`shared/PROJECT_STATE.md`、`artifacts/research/rental_cases.csv` 中选定行、`artifacts/research/TOP_10.md`、CEO 本轮 G1 产品决策。选用案例要保留 Case ID、URL 和核实状态。

## 交付
`artifacts/design/GDD.md`、`LEVEL_001.md`、`CONTENT_SCHEMA.md`、`FLOW_AND_WIREFRAME.md`；`artifacts/art/LEVEL_001_VISUAL_OPTIONS.md`；`artifacts/engineering/LEVEL_001_FEASIBILITY.md`；`artifacts/analytics/LEVEL_001_PLAYTEST_PLAN.md`；`artifacts/handoffs/TASK-003.md`；Quality Gate 记录。

## 验收
- [x] 五个缺陷均有来源 ID、可见线索、操作、隐藏信息、正确证据、房东反应与押金反馈；素材已虚构化且不含个人识别信息。
- [x] 单房间完整流程可按状态表走通，含新手引导、成功、失败、提示、补救；无不可逆死局。
- [x] 目标 3–5 分钟、尽早首次互动；70/30 权重有操作时间与流程依据，待试玩验证。
- [x] 评估三种候选工具，保留的工具有明确乐趣增量且可被工程实现。
- [x] 至少两种 2D 画面方案比较成本、辨识度、手机适配；有低保真布局与热点范围。
- [x] 工程给出依赖、难点、工作量区间和 G2 最小范围；分析师给试玩事件、指标、判定及样本局限。
- [x] Quality Gate 逐项验收设计完整性、可玩性、来源、技术可行性、范围控制；最多返工 3 次。

## 结果

见 `../management/QUALITY_GATE_TASK-003.md`：ACCEPT，返工 0/3。G1 设计任务已完成，仍等待 CEO 单独批准 G2。

## 边界与审批
不写游戏代码、不制作正式资产、不引入 3D、账号、后端或广告 SDK。TASK-003 DONE 后停在 G1，G2 可玩原型须 CEO 再批准。
