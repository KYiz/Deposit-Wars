# TASK-006：Sunny Side Studio 三风格戏剧化视觉复评
status: DONE / Quality Gate ACCEPT；CEO 最终画风待选
stage: G2 后美术探索；G3 未批准
DRI: 美术设计师
support: 程序员（只核对现有渲染/替换边界）
priority: P0
date: 2026-10-22

## 目标
用同一间 Sunny Side Studio 和相同的三种戏剧状态，对比欧美夸张漫画、精致手绘漫画、动画美剧三套原创画风，交 CEO 选择。

## 已核输入
- `../design/GDD.md`、`../design/LEVEL_001.md` 与 `../../../game/src/room.ts`、`style.css`；TASK-005 审核图与素材盘点。
- CEO 本轮指令与附图编号 1/2/7；附图仅供高层风格参考，不复制角色、布局、素材或其中的文字。

## 范围
只做概念图、规范、成本与可替换性评估。保留同一固定斜视剖面房间、原五缺陷 D1–D5、唯一 Inspection Phone。不得更动既有玩法代码、增加事件、覆盖 TASK-005 图或正式素材，不确定最终美术、不进入 G3。

## 交付
- `../art/TASK-006_STYLE_COMPARISON.md`：当前流程/可替换范围、三风格规范、网页可读性/制作/动画成本/辨识度对比、建议。
- `../art/task-006/`：A/B/C 各三张相同画幅概念图，分别表示正常检查、揭露 D1、证据反击 D1。每张保留同一房间及五个既定线索区、角色与 Inspection Phone；均明确标为 AI 概念而非游戏实机。
- `../management/QUALITY_GATE_TASK-006.md`、`../handoffs/TASK-006.md`、状态/决策日志。

## 验收
- [ ] 现有 Phaser/CSS 美术结构及替换边界已核对；无游戏玩法源码修改。
- [ ] A/B/C 每套有三张可打开的原创概念图：正常、揭露、反击；九图画幅一致，房间分区、五缺陷映射、Inspection Phone 与角色设定一致。
- [ ] 三套分别规定线条、配色、光影、角色比例、环境细节、UI 及反馈语言；引用附图不构成复制 IP。
- [ ] 比较桌面/手机可读性、场景资产/事件状态/角色动画成本与视觉辨识度，注明估算及未验证项。
- [ ] 专业推荐与 CEO 最终选择清晰分离；保存 Quality Gate 与恢复 Checkpoint。

## CEO 审批
本任务结束后请 CEO 选择 A/B/C，未获确认不冻结视觉规范、不生产正式资产或扩展房间。

## 增量 Checkpoint（2026-10-22）
CEO 追加提供三张单独风格参考。`../art/task-006/A-01-inspect-ref.png`、`B-01-inspect-ref.png`、`C-01-inspect-ref.png` 已分别按参考 1/2/7 的高层美术语言重绘并人工查看；此前无 `-ref` 的图是探索草稿，不作为最终对比。下一原子步骤：以这三张 `-ref` 正常场景各制作 D1 揭露与证据反击图；随后完成报告与 Quality Gate。游戏源码未更动。

## 最终 Checkpoint（2026-10-22）
9 张 `-ref` 候选图、`../art/task-006/comparison.html`、`../art/TASK-006_STYLE_COMPARISON.md` 已完成。九图尺寸均 1672×941，房间/五母题/Phone/角色经人工核对；旧稿已移入 `drafts/`。`../management/QUALITY_GATE_TASK-006.md` 对材料 ACCEPT；CEO 尚未选择 A/B/C，G3/扩关/正式资源制作均未授权。恢复路径：`../handoffs/TASK-006.md`。
