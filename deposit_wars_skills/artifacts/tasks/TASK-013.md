# TASK-013：将 G1/G2 完整首关玩法接入双视角 Demo
status: DONE / Quality Gate ACCEPT（玩法逻辑）；正式视觉证据待制作
stage: G2 本地 Demo 玩法整合；G3 未批准
DRI: 程序员
support: 游戏策划（规则核对）、QA（浏览器验收）
priority: P0
date: 2026-10-26

## 目标
在现有 CASE FILE 与共用房间画风中接入已验收的 Sunny Side Studio 首关完整核心循环，并让租客/房东两路线均可完成。

## 输入
- CEO 本轮指令：“我们之前设计的玩法全部更新到玩法里”。
- `../design/GDD.md`、`../design/LEVEL_001.md`、`../design/CONTENT_SCHEMA.md`
- `../../../game/src/content.ts`、`../../../game/src/model.ts`、TASK-011/012 界面

## 范围 / 不做
接入 D1–D5、逐步检查、Inspection Phone 对照取证、证据/扣款匹配、虚构 $500 结算、错误无惩罚、部分结算回房、两级提示与本地匿名事件；房东路线用同一套检查看见问题、核对记录并整改的叙事。保留共用房间画风。不进入 G3 真人试玩、不扩至第二房、不加入账号/后端/广告 SDK。

## 交付
- `../../../game/perspective-demo.html`、`../../../game/src/perspective-demo.ts`、相关 CSS/测试、`../../../game/offline-demo.html`
- `../engineering/TASK-013_INTEGRATION.md`、`../management/QUALITY_GATE_TASK-013.md`、`../handoffs/TASK-013.md`

## 验收
- [x] 两路线各可检查五处；每处按既定步骤揭露后，才能通过 Phone 记录证据。
- [x] 至少一证据可提前进入反击/整改；五卡匹配、错误无扣款、回房补查、全额 $500 结算可复现。
- [x] 两级提示、键盘/触控、重玩与本地事件记录可用；角色切换重置该局。
- [x] 两路线完整浏览器通关、部分结算补救、构建及离线文件验证通过。
- [x] 参考图与五缺陷的可见证据差异明确记录，不虚构已完成正式美术。

## CEO 审批
本轮指令授权既有首关玩法接入本地 Demo；正式美术冻结、G3 玩家试玩及扩关仍待另行批准。
