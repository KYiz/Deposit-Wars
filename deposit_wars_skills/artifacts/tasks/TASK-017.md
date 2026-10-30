# TASK-017：逐关案例物件 PNG 美术与真实图层拖动
status: DONE（Quality Gate ACCEPT：PNG 美术草案与首关图层接入；后五关完整玩法未制作）
stage: G2 美术/交互方向修正；不启动 G3 或发布
DRI: 美术设计师
support: 游戏策划（事件物件映射）、程序员（PNG 图层/拖动接入）、QA（静态与交互核证）、项目经理（调度/交接）
date: 2026-10-28

## 目标
落实 CEO 最新反馈：按案例的具体物件设计独立透明 PNG，不再依赖整张房间图的裁片假装物体移动；六关各有独立房间与道具视觉语言，关卡内拖动物件和揭露状态一致。

## 输入
`shared/PROJECT_STATE.md`、`artifacts/design/TASK-016_LEVEL_ROADMAP.md`、`TASK-016_DRAG_OBJECT_CATALOG.csv`、`artifacts/design/TASK-015_SCENE_INTERACTION.md`、当前 `game/` Demo。

## 交付与验收
- [x] 36 个事件逐关列出案例物件、PNG 文件名、拖前/拖中/拖后图层、锚点及独有房间风格；同物件跨关不能只换颜色。
- [x] 交付每关独有的房间与主要可拖道具 PNG 草案，透明通道和命名可核对；明确草案与正式美术状态。
- [x] 当前单房间 Demo 至少把现有五处关键拖动物件换成真实独立 PNG 图层，并验证鼠标/触控/键盘仍可完成原循环。
- [x] 美术岗位 Skill 补充案例物件 PNG、锚点/状态与逐关差异规范；保留原岗位及阶段权限。
- [x] 不覆盖原参考图或旧 Demo 资产；来源、生成方式、权利与未验证项清楚记录。
- [x] Quality Gate 核证、HANDOFF、PROJECT_STATE 更新；不将新关卡美术草案说成六关已可玩或 G3 已批准。
