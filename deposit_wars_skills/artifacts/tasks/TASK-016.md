# TASK-016：双视角关卡路线、事件总量与拖动物件规格
status: DONE（Quality Gate ACCEPT；内容规划，不代表扩关生产批准）
stage: G2 之后的 G1 内容规划；不启动 G3 或批量生产
DRI: 游戏策划
support: 产品经理（案例边界）、程序员（输入可实现性）、美术（物件/状态资源）、QA（可测性）、项目经理（Skill 维护与交接）
priority: P0
date: 2026-10-28

## 目标
根据 CEO 最新关卡方向，把 V1 的关卡数量、房东/租客两条路线、事件数量、难度阶梯和每关可拖动物件/操作方式写成可实施方案，并更新案例玩法策划 Skill 的必填产物。

## 输入
- CEO 当前指令；`shared/PROJECT_STATE.md`；`artifacts/research/rental_cases.csv`、`TOP_10.md`；`artifacts/design/LEVEL_001.md`；TASK-015 Demo

## 范围
完成一个 6–8 房间、30–40 事件目标内的推荐规划；逐关列出两视角的对抗母题、操作难度和可拖动对象。案例只作母题，虚构改编与来源核实状态分开。更新 `rental-puzzle-designer` Skill，使其对关卡梯度、操作规格、可玩性/资源约束负责；不生产后续关卡资产或代码，不声称已批准扩关/G3。

## 交付
- `artifacts/design/TASK-016_LEVEL_ROADMAP.md`、`TASK-016_DRAG_OBJECT_CATALOG.csv`
- `specialist-skills/rental-puzzle-designer/SKILL.md`、`artifacts/management/SKILL_CHANGELOG.md`、`manifest.json`
- `artifacts/management/QUALITY_GATE_TASK-016.md`、`artifacts/handoffs/TASK-016.md`、`shared/PROJECT_STATE.md`

## 验收
- [x] 明确推荐关卡数、独立事件数及两路线分配，并与既有 V1 规模目标一致。
- [x] 每关有递增的思考/操作难点、新机制、失败补救和引导节奏；不只堆线索数量。
- [x] 每个规划事件有可见异常、具体可拖动物件、输入手势、拖后画面/状态、证据或反制、来源/虚构边界。
- [x] 房东路线有租客侧行为、争议与误判的独立目标，不只是把租客题目换台词；“访客”仍称“租客”。
- [x] Skill 变更最小、可追溯、可静态校验；不改岗位职责/审批/阶段门。
- [x] 明确这是后续内容规划，当前可玩 Demo 仍只有首间房；不虚构后续关卡测试。

## CEO 审批
CEO 当前指令授权方案设计与 Skill 改进；后续关卡量产、G3 试玩、正式发布需另行决策。
