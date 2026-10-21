# Skills 变更日志

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
