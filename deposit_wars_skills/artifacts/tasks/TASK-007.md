# TASK-007：双视角抽象找茬网页 Demo
status: DONE / Quality Gate ACCEPT；CEO 是否采纳本方向待定
stage: G2 方向迭代；本地 Demo，G3 玩家试玩未启动
DRI: 程序员
support: 游戏策划（玩法验收）
priority: P0
date: 2026-10-26

## 目标
交付一间可本地体验的 2D 抽象画风找茬解谜房间，玩家可选择租客或房东视角，各有不同目标与结局。

## 输入
- CEO 2026-10-26 指令：脑洞在线找茬/看图解谜、闯关找瑕疵、租客或房东视角、抽象画风、看 Demo。
- `../../../game/` 既有 G2 网页技术基线；`../../shared/PROJECT_STATE.md`。

## 范围
- 单房间、三个可点击瑕疵、两套视角文案和判断题、提示/反馈/结算/重玩；本地运行。
- 本次明确批准产品方向演示及本地 Demo 制作；正式画风冻结、扩关、G3 玩家测试及发布需后续决策。

## 交付
- `../../../game/perspective-demo.html`、`../../../game/src/perspective-demo.ts`、`../../../game/src/perspective-demo.css`
- 本卡、`../handoffs/TASK-007.md`、`../management/QUALITY_GATE_TASK-007.md`、`../../shared/PROJECT_STATE.md`

## 验收
- [ ] 页面可在本地打开，画面是原创抽象 2D 房间，有三个视觉可辨的瑕疵。
- [ ] 开始前可选租客/房东；两视角有不同目标、每处独立选择题、即时反馈与结局。
- [ ] 错误选择可重试，无死局；提示、重玩、键盘与窄屏基础操作可用。
- [ ] TypeScript 检查及 Vite 构建通过；浏览器至少完成两种视角完整流程。

## 依赖与阻塞
TASK-004 G2 原型已 DONE。此卡对应 CEO 本轮明确的新 Demo 指令，不宣称 G3 已批准。

## CEO 审批
本轮指令覆盖本地 Demo；是否采用本方向为 V1 定稿、是否进入 G3 玩家测试仍待 CEO 看过 Demo 后决定。

## 最终 Checkpoint（2026-10-26）
双视角单房间 Demo、三处看图谜点及两套结局已完成。`pnpm build` 与 `pnpm test:perspective` 通过；后者用本地 Chrome 完成两视角通关、错误重试、手机触控/提示。桌面与手机截图在 `../../../game/test-output/`（Git 忽略）。Quality Gate 见 `../management/QUALITY_GATE_TASK-007.md`。
