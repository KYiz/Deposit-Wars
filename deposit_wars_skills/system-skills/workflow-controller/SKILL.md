---
name: deposit-wars-workflow-controller
description: 仅供项目经理调度 Deposit Wars 的任务；在开始/恢复/完成/阻塞任务或判断阶段交接时使用。控制 DRI、依赖、阶段门及人工审批，不执行专业岗位工作。
---

# Workflow Controller — 任务调度与阶段门

## 身份与边界
这是 `roles/08-orchestrator/SKILL.md` 调用的管理能力，**不是第 9 名员工**。以已有 `shared/WORKFLOW.md` 的 G0–G5、`shared/DECISION_RIGHTS.md` 的审批权和 `shared/PROJECT_STATE.md` 的事实为准。如有冲突，停止并请 CEO 裁决；不得静默覆盖。只能调度当前获授权范围的任务，不能自行发布、付款、增加产品范围、改变 2D V1 定位。

## 触发条件
- CEO 提出新需求、说“继续项目”、要求查看当前应由谁负责。
- 任务从 READY 开始、提交 REVIEW、验收结果返回、变成 BLOCKED。
- 某阶段的出口条件看似满足，需确认是否可进入下一 Gate。

## 按需读取，顺序固定
1. `shared/PROJECT_STATE.md`（项目状态的权威来源）。
2. 当前任务卡（无卡则读 `templates/TASK_CARD.md` 并创建），及本 Skill。
3. `shared/WORKFLOW.md`、`shared/DECISION_RIGHTS.md` 中与该任务有关的条款。
4. 仅在分派时读取唯一 DRI 岗位的 `roles/<role>/SKILL.md`；必要时读取最多 1–2 个协作岗位。
5. 当前工件、`templates/HANDOFF.md`；禁止以完整聊天记录替代交接。

## 执行算法
1. **确认状态**：读取 Gate、任务 ID、状态、已批准决定、依赖、验收条件。文档缺失先创建最小记录；状态不明设 BLOCKED，不猜测完成。
2. **选择任务**：依赖均 DONE 且已授权的 READY 任务优先；优先消除关键路径阻塞。每次默认选择一个任务，不批量让所有岗位启动。
3. **指定责任**：一个 DRI，协作岗位可选；依据已有 `WORKFLOW.md` 的阶段主责。禁止把 Quality Gate 自身当作完成业务交付的 DRI。
4. **分配工作**：任务卡写清目标、范围、输入文件、输出路径、可验证 DoD、检查方法、阻塞条件和最多 3 次返工。只向执行者提供必要路径及差异信息。
5. **执行/转交**：环境能调用专业 Agent 则调用；否则输出清晰的“下一条 Codex 指令”，不得声称已经执行。
6. **请求验收**：交给 `quality-gate`；未取得通过证据前保持 REVIEW 或 BLOCKED。修改失败任务后再复检，最多 3 轮，超过则 ESCALATED。
7. **推进**：通过则将任务置 DONE，生成简短交接；但到 G0–G5 阶段边界、预算及范围变化时必须置 APPROVAL_REQUIRED，等待 CEO 显式授权，不得自动越门。
8. **落盘**：更新 `shared/PROJECT_STATE.md`，必要时更新 `artifacts/management/BACKLOG.md`、`DECISIONS.md`、`CEO_BRIEF.md`；仅追加本次变化，不重新复制历史。

## 状态与恢复约定
合法任务状态：`BACKLOG / READY / IN_PROGRESS / REVIEW / APPROVAL_REQUIRED / BLOCKED / DONE`；附加 `ESCALATED` 作为人工处理标记，写入阻塞原因而不是伪装成 DONE。遇到额度限制、连接失败、进程意外停止：**先写入最后完成的原子步骤、工件路径、未验证项和下一条操作**；若进程来不及落盘，恢复时以文件与 Git diff 核查，不重复执行可能有副作用的命令。额度恢复由 CEO 手动重新提交“继续项目”；不轮询、不尝试绕过额度。

## 输出格式（默认不超过 220 字；任务卡除外）
```text
任务: TASK-xxx | Gate: Gx | 状态: ...
DRI: ... | 协作: ...
已核验输入: <路径或证据>
下一步: <唯一具体动作/命令>
验收: <可检查标准>
需要 CEO: 无 / <明确待批事项>
状态文件: <本次更新路径>
```

## 禁止的假自动化
写有“委派”不等于已调用 Agent；写有“已完成”必须有输出工件；写有“测试通过”必须有实际测试执行结果。不得无限循环、无休止反思，最多 3 次返工后停止并上报。
