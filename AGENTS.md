# Deposit Wars 项目指令

本项目的 Skills 包位于 `deposit_wars_skills/`。原范例中的 `ai-team/` 均映射到 `deposit_wars_skills/`；无需复制包或修改已正确的 Skill。

默认以 `deposit_wars_skills/shared/PROJECT_STATE.md` 为唯一当前事实源，遵循同目录的 `WORKFLOW.md`、`DECISION_RIGHTS.md`、`TOKEN_POLICY.md`。

1. 项目经理是任务调度唯一入口。没有任务卡时先建卡；根据当前 Gate 指定唯一 DRI、必要协作、交付路径和可核验验收标准。只读取当前任务需要的岗位 Skill 和管理 Skill，不一次启动全部岗位。
2. 交付物存入任务卡指定路径，并按 `deposit_wars_skills/templates/HANDOFF.md` 交接。Quality Gate 逐项核证；未通过最多返工 3 次，之后记录 BLOCKED/ESCALATED。任务验收通过才标 DONE。
3. 每项任务完成或受阻时更新 `PROJECT_STATE.md` 和简短 Checkpoint。收到“继续项目”时先核对磁盘状态、任务卡和交接记录，从未完成处继续。
4. 不虚构测试、市场数据、平台批准或上线结果。外部事实附可核验来源和查询日期；推断和假设单独标注。
5. CEO 批准产品方向、范围、预算、阶段门、商业化及发布行为。V1 聚焦 2D 网页端；V2 Steam 3D 仅未来选项。未经 CEO 批准不引入后端、账号体系、外部付费服务、广告 SDK 或正式发布。
6. Skills 维护按 `deposit_wars_skills/system-skills/skill-maintainer/SKILL.md`：已有规则有效则 NO_CHANGE。职责、审批权、阶段门等受保护规则的修改须先取得 CEO 明确批准；保留差异和变更记录。
7. TASK-002 的公开租房案例研究由产品经理按需调用 `deposit_wars_skills/specialist-skills/rental-case-researcher/SKILL.md`；它不是独立 Agent。数据分析师复核案例质量。CEO 已批准进入 G1/G2，TASK-003/004 由 Quality Gate 验收；G3 探索性试玩仍待 CEO 单独批准。

本文件保留并落实 `deposit_wars_skills/AGENTS.example.md` 的有效规则，仅将路径接到当前工作区并加入本轮 CEO 要求。若未来目录迁移，应先更新本文件中的路径。
