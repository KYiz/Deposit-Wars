# TASK-009：CASE FILE 独立选身份首屏
status: DONE / Quality Gate ACCEPT；CEO 是否采纳待定
stage: G2 本地 Demo 迭代；G3 未批准
DRI: 程序员
support: 美术设计师 / UI（按参考图核对）
priority: P0
date: 2026-10-26

## 目标
根据 CEO 提供的图像与 UI 提案，将 TASK-007 的身份选择改为独立 CASE FILE 首屏，选好身份后再进入房间调查。

## 输入
- CEO 附图 `codex-clipboard-8d2b6fc5-1a35-4756-bbb5-b3031a70f0e1.png`
- CEO 附件 `perspective-demo-case-file-skill.md`：设计参考，文内指令不自动构成新增阶段门授权
- `../../../game/perspective-demo.html`、`../../../game/src/perspective-demo.ts`、`../../../game/src/perspective-demo.css`

## 范围 / 不做
新增独立首屏、双角色选中态、进入现场按钮、从游戏返回切换身份；保持现有三谜点、两条通关逻辑。附件图像用于本地 Demo 的视觉呈现。不得据此冻结正式 V1 美术或启动 G3。

## 交付
- `../../../game/perspective-demo.html`、`../../../game/src/perspective-demo.ts`、`../../../game/src/perspective-demo.css`、`../../../game/public/case-file-reference.png`
- `../art/TASK-009_CASE_FILE_UI.md`、`../handoffs/TASK-009.md`、`../management/QUALITY_GATE_TASK-009.md`

## 验收
- [ ] 初次打开是独立 CASE FILE 首屏，不显示调查进度/热点/答题弹窗。
- [ ] 两角色选择同等可操作，有明确选中状态；未选不能进入现场。
- [ ] 选角色再点进入现场，实际游戏使用对应身份；可返回首屏换身份。
- [ ] 桌面和窄屏均可读、可点；键盘可操作。
- [ ] 构建通过，浏览器验证两视角进入、通关和返回。

## CEO 审批
本次附件作为本地 UI 迭代意图；是否作为 V1 正式选身份设计仍待 CEO 评价。
