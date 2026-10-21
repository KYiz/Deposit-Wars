# 初始化与工作流自检

日期：2026-10-22｜状态：PASS（本地文档与模拟状态转换）｜执行者：项目经理

## Skills 审计

- `manifest.json` 声明 8 个岗位和 4 个管理 Skill；实际 12 个 `SKILL.md` 均存在、可读，frontmatter 的 `name` 唯一，职责与 `WORKFLOW.md` 的 G0–G5 主责对应。
- 岗位关系：产品经理负责 G0 市场结论；发行运营仅核平台规则；数据分析师仅给验证设计。项目经理唯一调度；Workflow Controller 控制状态；Quality Gate 验收任务；QA 员工承担游戏测试。管理 Skill 不作为第 9–12 名员工。未见需改核心职责或审批权的冲突。
- 发现一处路径偏差：`AGENTS.example.md` 假设包复制到 `ai-team/`，实际为 `deposit_wars_skills/`。已在项目根 `AGENTS.md` 映射；Skills 包原文件保持原样。当前工作区无 Git 仓库，无法使用 Git diff；没有改动任何现有 Skill。
- `README.md`、manifest、共享协议、模板、12 个 Skill 与既有任务示例均保留。无重复 `SKILL.md` 名称或重复角色；任务示例为模板，正式任务卡另存于 `artifacts/tasks/TASK-001.md`，用途不同。

## 工作流模拟

| 检查 | 输入与操作 | 结果 |
|---|---|---|
| 岗位调度 | G0 + TASK-001 → 产品经理 DRI；发行运营仅核平台，分析师仅设计测试 | PASS：单一 DRI，无全员启动 |
| 任务交接 | DRI 工件 → `artifacts/handoffs/TASK-001.md` → 项目经理 | PASS：路径、摘要、证据、待批事项明确 |
| Quality Gate | 对 TASK-001 原始 DoD 逐项检查；FAIL 返回 DRI，计数 1–3；第 3 次仍失败则 BLOCKED/ESCALATED | PASS：状态机可表达有限返工，不越过 CEO Gate |
| 状态保存与恢复 | 状态源写入 TASK-001、工件路径、审批和下一步；重新从磁盘读取 | PASS：可从文件恢复，不依赖聊天记录；未模拟真实额度中断 |
| Token/重复 | 只加载当前 DRI、必要协作者及 4 个相关管理能力；交接只发摘要和路径 | PASS：没有 8 岗全文循环或重复竞品调查 |

## 边界与下一动作

此自检验证本地规则、文件路径和一次模拟流转，不代表后台 Agent 自动运行或平台审核。TASK-001 完成后仍停在 G0，等待 CEO 对进入 G1 作决定。恢复口令“继续项目”先读 `shared/PROJECT_STATE.md`、当前任务卡、最新交接卡。
