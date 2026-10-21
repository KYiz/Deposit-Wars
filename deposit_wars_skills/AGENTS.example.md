# Deposit Wars Agent 指令（放置到项目根目录并改名 AGENTS.md）

默认使用 `ai-team/shared/PROJECT_STATE.md` 为事实源，执行遵循 `ai-team/shared/WORKFLOW.md`、`ai-team/shared/DECISION_RIGHTS.md` 和 `ai-team/shared/TOKEN_POLICY.md`。

在收到任务时：
1. 根据任务卡 `DRI` 只读取对应 `ai-team/roles/*/SKILL.md`，勿一次性加载全部角色。
2. 未给任务卡先让项目经理/调度官建卡；重大决策上报 CEO。
3. 工件写入任务卡指定目录，完成后附交接卡；状态只在满足验收时标为 DONE。
4. 不要虚构已经运行测试/调研/上线；涉及联网数据要附可核验来源和日期。
5. V1 聚焦 2D 网页端，不引入 3D、账号体系、后端、外部付费服务，除非 CEO 明确批准。

技能维护：遇到重复的规则性失败、Skills 冲突、阶段转换或 CEO 明确要求时，按需读取 `ai-team/system-skills/skill-maintainer/SKILL.md`。无证据则 NO_CHANGE；禁止未经 CEO 批准修改职责、审批权限、阶段门或自我限制；保留 diff 与变更日志。
