# TASK-012：双身份共用调查画风确认
status: DONE / Quality Gate ACCEPT
stage: G2 本地 Demo 方向确认；G3 未批准
DRI: 美术设计师 / UI
support: 程序员（运行画面核对）
priority: P1
date: 2026-10-26

## 目标
确认 CEO 指定的全幅房间调查画风在现有两条可玩身份路线中共用，并记录动态 HUD 的差异。

## 输入
- CEO 本轮指令：“房东和访客都可以用这个画风的界面”；随后明确“访客”即既有“租客”，名称仍叫租客。
- `../art/TASK-011_INVESTIGATION_UI.md`、`../../../game/src/perspective-demo.ts`。

## 范围 / 不做
核对既有双身份共用场景，不新增关卡或第三身份；保持“租客”名称。

## 交付
- `../art/TASK-012_SHARED_STYLE.md`、`../handoffs/TASK-012.md`、`../management/QUALITY_GATE_TASK-012.md`、`../../shared/PROJECT_STATE.md`

## 验收
- [x] 同一房间素材在两身份路线复用，画面无身份专属图像冲突。
- [x] 身份、目标、题目与结局根据所选路线切换；两种身份截图已查看。
- [x] 文档明确 CEO 认可的共用画风范围和“访客”即租客，不扩为第三身份或冻结 V1。

## CEO 审批
CEO 已确认双身份可共用此画风；“访客”指租客，名称保持租客。是否作为正式 V1 视觉冻结仍待另行确认。
