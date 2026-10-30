# TASK-015：去编号的场景内拖动找茬与轻量 UI
status: DONE / Quality Gate ACCEPT（G2 本地 Demo）
stage: G2 本地 Demo 迭代；G3 未批准
DRI: 游戏策划
support: 程序员（场景交互）、美术（视觉校准）、QA（浏览器验收）
priority: P0
date: 2026-10-28

## 目标
按 CEO 反馈，让玩家在房间画面上直接观察并拖动物件找出异常，删除 01–05 圆圈和大块说明/方框，保留双视角、证据与结算闭环。

## 输入
- CEO 当前截图和反馈；TASK-014 交接；`game/perspective-demo.html`、`game/src/perspective-demo.ts`、`game/src/model.ts`

## 范围
单房间五处可见物件，场景内直接拖动、局部视觉揭露、错误拖动复位、轻量 HUD、按需提示；按既有 GameSession 完成逐步检查与取证。保留角色选择、Phone 和扣款结算。仍是 G2 本地 Demo，不扩关、不进入 G3。

## 交付
- `game/perspective-demo.html`、`game/src/perspective-demo.ts`、场景 CSS、浏览器/离线测试、`game/offline-demo.html`
- `artifacts/design/TASK-015_SCENE_INTERACTION.md`、`artifacts/management/QUALITY_GATE_TASK-015.md`、`artifacts/handoffs/TASK-015.md`

## 验收
- [x] 主场景没有可见 01–05 圆圈；玩家直接拖动帘子、画框、柜门、门锁/门牌、茶几物件。
- [x] 拖动在主场景内产生可见变化；全部检查步骤结束才可记录证据；短拖动复位。
- [x] HUD 仅保留必要进度/操作，提示按需出现；租客和房东共享画风与交互。
- [x] 桌面鼠标和手机触控可操作；键盘替代可达；两路线五证据与结算可通关。
- [x] TypeScript、模型测试、构建及离线文件打开通过；正式逐帧动画与真人乐趣仍明确标为未验证。

## CEO 审批
本轮反馈授权本地界面与交互修正；G3、正式美术冻结、扩关及发布仍未获批准。
