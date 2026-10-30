# Deposit Wars — 8 岗位 + 4 管理 + 1 按需专业 Skill v1.2

## v1.2 增量（2026-10-22）
新增 `specialist-skills/rental-case-researcher/SKILL.md`，由产品经理在 TASK-002 按需调用；不是第 9 个岗位或第 5 个管理 Skill。原 12 个 Skill 保持原样。当前包路径为 `deposit_wars_skills/`，根目录 `AGENTS.md` 已连接实际路径。市场研究 TASK-001 完成；CEO 已要求先做 TASK-002 租房案例库，暂缓正式 G1 首关设计。

项目：2D 海外租房荒诞找茬、检查取证、押金反击网页小游戏。3D Steam 仅未来衍生。

## 目录
- `roles/01...08.../SKILL.md`：原版八个独立岗位（本次未修改）。
- `system-skills/`：Workflow Controller、Quality Gate、Context Optimizer（原版未修改），以及新增 Skill Maintainer。
- `artifacts/management/SKILL_CHANGELOG.md`：Skills 维护变更日志。
- `shared/PROJECT_STATE.md`：唯一当前事实源。
- `shared/WORKFLOW.md`：G0–G5 阶段门与调度策略。
- `shared/DECISION_RIGHTS.md`：CEO/调度官/专业岗位权限。
- `shared/TOKEN_POLICY.md`：输入压缩与模型分层。
- `templates/`：任务卡、交接卡、CEO 汇报。
- `examples/TASK-001.md`：立项阶段首个任务。

## 使用方式
**手动 ChatGPT / Work：** 先加载 `PROJECT_STATE.md` + `WORKFLOW.md` + 本轮岗位 `SKILL.md` + 对应任务卡。让该岗位把交付物保存到指定路径。之后将交接卡交给 Orchestrator。

**Codex：** 将本包复制进 repo 的 `ai-team/`。若需 Codex 可发现的原生 Skills，再将每个 `roles/*` 目录按 Codex 当前约定部署到 skills 搜索路径；不要仅因为存在 SKILL.md 就假定已被自动发现。将 `AGENTS.md` 范例放到 repo 根并按项目实际路径调整。

**Work：** 更适合跨网页调研、读写文件和协作任务；具体可用性取决于当前环境/连接器。自动调度、定时/后台执行均需要实际工具和运行器，不由本包凭空实现。

## 起手调度
1. Orchestrator 读取 `shared/PROJECT_STATE.md`、`shared/WORKFLOW.md`。
2. 选择 `examples/TASK-001.md`，分配产品经理为 DRI。
3. 产品经理需要外部资料时实际联网查证，并在工件保留来源日期。
4. 运营与分析师仅完成分配的子任务，不重复竞品研究。
5. Orchestrator 验收工件，生成 CEO 简报；CEO 选择是否进入 G1。

## 不包含
没有实际竞品研究、代码、美术或真实平台审核；这是可落地的组织和工作协议，不是已运行的自动 Agent 系统。

## Skill 更新规则（v1.1）
按需使用 `system-skills/skill-maintainer/SKILL.md`：只有证据证明需要更改才修改；默认输出最小补丁提案，涉及职责、审批权和阶段门等必须 CEO 批准。原 8 岗位与原 3 管理 Skills 在本版本均原样保留。
# v1.3 策划专项 Skill

`specialist-skills/rental-puzzle-designer/SKILL.md` 供游戏策划按需使用，把已核查的海外租房案例改编为房间中的可观察、可拖动、可取证谜题。首关实例见 `artifacts/design/TASK-014_DRAG_PUZZLES.md`；项目当前事实仍以 `shared/PROJECT_STATE.md` 为准。

