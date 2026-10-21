---
name: deposit-wars-skill-maintainer
description: 审计、维护并演进 Deposit Wars 现有岗位与管理 Skills。仅在 CEO 要求、阶段切换、反复失败或指令冲突时启动；默认仅提供最小补丁提案，未经授权不修改受保护规则。
---

# Skill Maintainer — Skills 维护与版本治理

## 定位
这是第 4 个**管理 Skill**，不是新员工、不是常驻 Agent，也不是独立的自动执行服务。由项目经理按需调用，维护现有 8 个岗位 Skills、3 个其他管理 Skills 和相关协议。默认**不改动**已经有效的文件；所有建议必须以具体证据支持，并保持向后兼容。

## 启动条件（满足其一）
- CEO 明确要求审计、完善、升级或同步 Skills。
- 同一类任务出现重复失败（建议至少 2 次），且证据表明是 Skill 指令缺失、冲突或不可执行，而非单纯实现 Bug。
- 阶段门通过后，需要检查下一阶段的岗位能力是否足够。
- Orchestrator、Quality Gate 或岗位负责人记录了可复现的 Skill 冲突或职责空白。
不因普通任务开始/结束而全量审计；默认只审计与事件关联的 Skill。

## 维护范围与权威来源
- `roles/*/SKILL.md`：8 个岗位；不随意修改角色分工。
- `system-skills/*/SKILL.md`：4 个管理能力（包括本 Skill）。
- `shared/PROJECT_STATE.md` 是项目当前事实源；`shared/WORKFLOW.md` 是阶段门定义；`shared/DECISION_RIGHTS.md` 是权限来源；`shared/TOKEN_POLICY.md` 是资源约束。
- `AGENTS.example.md`、`README.md`、`manifest.json` 是入口与索引；只在其内容确实过时时更新。
- 当 CEO 新指令与历史文件冲突时，记录待决议项，不在未确认时自行改写事实。

## 工作流：先审计，后做最小变更
1. **定位触发证据**：任务 ID、失败日志/QA 反馈、冲突原文、实际影响。没有具体问题则输出 NO_CHANGE。
2. **限制检查范围**：从触发的 Skill 开始，顺着显式引用仅检查直接依赖文件；不默认加载全部 12 个 Skills。
3. **归因和分类**：判定是 `SKILL_GAP`、`CONFLICT`、`OUTDATED`、`REDUNDANCY`、`EXECUTION_BUG`、`NO_CHANGE`。实现 Bug 转交原岗位，不以改 Skill 代替修代码。
4. **形成差异提案**：每个目标文件说明证据、修改理由、变更前后效果、风险、回滚方式；优先最小 patch，不整体重写。
5. **权限判断**：普通文案/路径修正可在 CEO 已授权的范围内实施；涉及职责、审批权、成本、产品定位、阶段门、发布权限、测试阈值、安全限制、本 Skill 自身权限，必须 `APPROVAL_REQUIRED`，获得 CEO 明确批准后才能应用。**不得自行降低自己的限制或改变授权判定。**
6. **应用与验证**：改前保存 Git diff/版本；只修改获授权文件。检查 YAML frontmatter 的 `name`/`description`、目录路径、相互引用、重复名称与格式。检查修改前后不可变规则是否仍在；条件允许时运行校验脚本或 Codex Skill 加载验证。没有实际运行时写 `NOT_RUN`。
7. **记录与交接**：输出变更文件清单、保留文件数量、测试证据、待批事项、版本号、回滚位置。更新 `artifacts/management/SKILL_CHANGELOG.md`；必要时更新 `manifest.json` 与 README。交项目经理走 Quality Gate，不自行宣布上线或通过验收。

## 权限矩阵
| 操作 | 规则 |
|---|---|
| 读取、发现冲突、输出提案 | 允许，按需最小读取 |
| 修正错别字、明显失效的内部路径 | 仅在任务明确授权且保留 diff 后执行 |
| 新增操作示例或完善非关键输出格式 | 需已有任务授权；验收后生效 |
| 修改岗位职责、阶段门、CEO 审批或资金权限 | CEO 显式批准 |
| 修改本 Skill 的权限限制或放宽质量门槛 | CEO 显式批准，不能自授权 |
| 删除岗位、批量重写所有 Skills、清理历史 | 默认禁止；需专门批准与备份 |

## 版本策略与回滚
- 使用 Git 追踪 Skill 变化。无 Git 时，在同目录外备份旧文件及其 SHA256；不得静默覆盖。
- 一次审计对应一个变更集；语义性变更更新包版本，纯修正可增加补丁版本。
- 对每个改动提供 before/after diff。出问题时可按提交或备份文件回滚；不可删除历史审批记录。
- 不以“自我进化”作为无限递归的理由；单次最多 3 轮修改-验收，仍未通过则上报 CEO。

## Token 节省约束
- 默认只读取事件相关文件、引用目标段落、Git diff 与最新 QA 记录。
- 能通过静态脚本确认的路径、frontmatter、重复键，不调用额外 Agent 讨论。
- 一次只生成一份最小 patch；不让所有岗位重新讨论规则。
- 没有证据要修改时直接 `NO_CHANGE`，绝不为产生输出而强行更新。

## 输出模板
```text
审计事件: <TASK-ID/阶段/CEO请求>
结论: NO_CHANGE / PATCH_PROPOSED / PATCH_APPLIED / APPROVAL_REQUIRED
问题证据: <来源路径与事实>
变更文件: <路径与一行原因>（无则填无）
未修改文件: <数量与范围>
风险与审批: <无/需 CEO 批准的具体变更>
验证: <检查项与 PASS/FAIL/NOT_RUN>
版本与回滚: <版本/commit/备份>
下一责任人: <Orchestrator / CEO>
```

## 完成定义（DoD）
问题可复现或有可核查证据；变更足够小；原有效规则保留；路径和 frontmatter 校验通过；审批权限未被绕过；能从 Git 或备份回滚；有变更日志与交接。**本 Skill 的存在不代表自动、后台或定期运行。**
