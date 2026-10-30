# Skills 变更日志

## v1.6.0 — 2026-10-28，TASK-018，CEO 改为九关与物品栏/标注

- 审计结论：`OUTDATED / SKILL_GAP`。游戏策划 Skill 仍把旧 G2 首房间五缺陷当通用配额，美术 Skill 写死六关；两者未描述固定物品栏、逐关开放卡槽和现场标注。CEO 本轮明确将 V1 方向改为九种住房，并指定机制与画风。
- 最小修改：游戏策划 Skill 保留旧原型规则但限定其历史范围，新增九关两视角物品栏/标注状态；美术 Skill 将六关约束改为九关统一首关画风与不同建筑构图。manifest `1.5.0 → 1.6.0`，仍为 14 Skill；岗位职责、审批与阶段门未改。
- 修改前备份：`skill-backups/TASK-018-game-designer-v1.5.md` SHA256 `55642B588D8919012CF48E34CC99C23651DE3EDB007039EA70A91CDE94E5E267`；`skill-backups/TASK-018-artist-v1.5.md` SHA256 `D2437AF767BD3A9947B577995717F43A908505755EC15232F3BE3DB112879F7F`。回滚可恢复两文件和 manifest 版本 1.5.0，保留任务与 CEO 新方向记录。
- 交付与静态验证见 `artifacts/management/QUALITY_GATE_TASK-018.md`。

## v1.5.0 — 2026-10-28，TASK-017，CEO 要求案例物件独立 PNG 与逐关美术差异

- 审计结论：`SKILL_GAP`。旧美术岗位 Skill 仅泛列“交互热点、切图/图集”，没有规定案例物件与独立透明 PNG、拖前/拖中/拖后状态和各关独有美术；此前 Demo 用底图裁片模拟拖动，CEO 明确纠正。
- 最小修改：仅在 `roles/06-artist/SKILL.md` 核心职责增一条案例物件导出与逐关差异要求；`manifest.json` 版本 `1.4.0 → 1.5.0`，14 个 Skill 数量不变。职责、审批、阶段门和其他岗位 Skill 未改。
- 修改前备份：`artifacts/management/skill-backups/TASK-017-artist-v1.4.md`，SHA256 `47FF3B05F5F1F6461849CE8E4B87327BD16DC5C699B759297FCD93CCDE3C7CE6`。回滚用备份恢复该岗位 Skill，并将 manifest 版本复原至 1.4.0；任务美术工件与决策记录保留。
- 结果：六关独立房间、逐事件 PNG 资产映射与首关真实图层拖动见 `artifacts/art/TASK-017_CASE_PROP_ART.md`。验证见 `artifacts/management/QUALITY_GATE_TASK-017.md`。

## v1.4.0 — 2026-10-28，TASK-016，CEO 要求逐关玩法与拖动规格

- 审计结论：`SKILL_GAP`。旧 Rental Puzzle Designer 只要求单房间谜题卡，没有关卡总量、双路线事件配额、难度阶梯和逐物件输入/状态规格；CEO 本轮明确要求这些设计。
- 最小修改：仅更新 `specialist-skills/rental-puzzle-designer/SKILL.md` 的说明、关卡规划步骤和谜题卡字段；`manifest.json` 版本 `1.3.0 → 1.4.0`，14 个 Skill 数量不变。原 8 岗位、4 管理、1 案例研究 Skill 以及审批、阶段门均未改。
- 修改前备份：`artifacts/management/skill-backups/TASK-016-rental-puzzle-designer-v1.3.md`，SHA256 `4C70DC34131F65A357AFDEA4859FBACB9DAC3D6AD0BAFCF6CB38E80250617CD4`。回滚时用此文件恢复专业 Skill，并将 manifest 版本复原为 1.3.0；保留本任务规划与决策记录。
- 变更后效果：每个后续关卡先定事件配额与梯度，再指定画内可拖物件、手势、命中条件、状态变化、复位、证据和来源边界。新增条款不批准 G3、量产或发布。
- 验证与完整交接见 `artifacts/management/QUALITY_GATE_TASK-016.md`、`artifacts/handoffs/TASK-016.md`。

## v1.3.0 — 2026-10-28，TASK-014，CEO 指定案例进入玩法

- 新增 `specialist-skills/rental-puzzle-designer/SKILL.md`：由游戏策划按需调用，把已有租房案例转译为可见线索、拖动物件、揭露、取证和双视角反馈；并非新增常驻 Agent。
- `manifest.json` 登记新 Skill：`specialist_skill_count: 1 → 2`、`total_skill_count: 13 → 14`；原 8 岗位、4 管理、1 案例研究 Skill 和审批/阶段门规则均未修改。
- 证据：CEO 指出旧 Demo 的纯点击玩法不够好，并要求把既有留学生/房东奇葩案例做成策划 Skill 且进入实际玩法；TASK-014 五处可拖动谜题与案例来源映射见 `artifacts/design/TASK-014_DRAG_PUZZLES.md`。
- 验证：前置/路径/manifest 可静态核对；官方 `quick_validate.py` 因环境缺 PyYAML 未能运行，记录为 NOT_RUN，不为此安装依赖。回滚可删除新 Skill 并恢复 manifest 此次两处增量；保留任务与策划工件。

## v1.2.0 — 2026-10-22，TASK-002，CEO 显式授权
- **新增** `specialist-skills/rental-case-researcher/SKILL.md`：产品经理按需调用的公开租房案例研究能力；不新增常驻 Agent、不改变 8 岗位和 4 管理 Skill 的职责。
- **索引衔接差异**：`manifest.json` 版本 `1.1.0 → 1.2.0`，`total_skill_count: 12 → 13`，新增 `specialist_skills` 一项；`README.md` 增加 v1.2 入口；项目根 `AGENTS.md` 增加 TASK-002 路由。`shared/WORKFLOW.md`、`DECISION_RIGHTS.md` 和原 12 个 `SKILL.md` 均未修改。
- **理由**：CEO 指定先做 TASK-002 并新增研究 Skill；原产品经理 Skill 负责市场判断，但没有针对公开案例的来源核实、去重和可玩性记录方法。新 Skill 补此空白，不改核心审批。
- **验证**：manifest JSON 可解析；新 Skill `name`/`description` frontmatter 存在，旧 12 个 Skill 路径仍在；CSV 与研究成果由 Quality Gate 核验。通用 `quick_validate.py` 因 Python 环境缺 PyYAML 无法完成，已记录为 NOT_RUN，不安装依赖。
- **回滚**：删除本次新增专业 Skill 并将 manifest/README/根 AGENTS 的上述增量恢复至 v1.1/先前文本；TASK-002 研究工件和 CEO 决策记录保留。当前工作区无 Git 仓库，差异以本条和文件版本记录；未删除原文件。

## v1.1.0 — 2026-10-21
- 新增 `system-skills/skill-maintainer/SKILL.md`，支持按需审计、最小改动提案、审批、版本与回滚。
- 更新 `manifest.json`、`README.md`、`AGENTS.example.md` 以登记并说明新增 Skill。
- 原有 8 个岗位 Skills、3 个管理 Skills 及其他原文件均无内容更改。
- 本版本只提供规则和交接机制；实际自动运行需由 Codex/运行环境配置。
