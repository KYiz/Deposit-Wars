# Deposit Wars — 唯一项目状态源

version: 0.7
date: 2026-10-22
status: G2_TASK-004_DONE_WAITING_CEO_G3
current_stage: G2 单房间可玩原型（CEO 已批准）
primary_owner: 项目经理 / 调度官（等待 CEO 决议）
orchestrator: 项目经理 / 工作流调度官
ceo_approval_required: true
current_task: TASK-004 DONE (M1/M2/M3 Quality Gate ACCEPT)
checkpoint: artifacts/handoffs/TASK-004-M3.md

## 已确认（来自 CEO 当前方向）
- V1: 面向海外年轻租客/留学生的 2D 荒诞租房找茬互动小游戏。
- 核心循环: 找茬 → 工具检查 → 证据反击 / 押金结算。
- 内容主线: 入住 → 生活 → 退租；先做单房间可玩原型，不默认完成全章。
- 候选平台: CrazyGames / Poki，需查实时平台规则和商业可行性。
- G2 技术: CEO 已批准 Phaser 3 + TypeScript + Vite；本地原型及构建已运行。
- 3D Steam 模拟器: 仅未来衍生方向，不进入 V1 范围。
- 8 职能角色：产品经理、游戏策划、数据分析师、发行运营、程序员、美术、QA、项目经理/调度官。

## 待验证（不可当作事实）
- 租房押金题材在浏览器游戏平台存在足够用户需求及低竞争程度。
- 留学生故事能否覆盖一般海外年轻租客。
- 3 机制整合是否比单纯找茬更好玩。
- 广告/平台收益、留存、加载性能、开发工期。

## 已完成与当前判断
- 2026-10-22：12 个 Skills 完整性与职责审计、自检完成；根目录 `AGENTS.md` 已映射实际 `deposit_wars_skills/` 路径。现有 Skill 文件均未修改。
- TASK-001 已完成并由 Quality Gate 验收：`artifacts/product/COMPETITOR_MATRIX.md`、`ASSUMPTION_LOG.md`、`PRD.md`，平台与分析预检见各岗位工件。现实题材痛点有证据，但本游戏需求、留存和收益仍未验证。
- 2026-10-22 CEO 调整顺序：先执行 TASK-002 全球奇葩租房案例研究，正式首关玩法设计暂缓；产品经理按需调用 Rental Case Researcher，数据分析师核质量，游戏策划仅评可玩性。现为 12 个原 Skill + 1 个按需专业 Skill；原 12 个未改。
- TASK-002 已完成并经 Quality Gate 验收：`artifacts/research/rental_cases.csv` 56 条事件、`CASE_RESEARCH_REPORT.md`、`TOP_10.md`；平台与地域缺口见 `SOURCE_GAPS.md`。Poki 网页独占与双平台分成冲突仍待正式发行决策。
- 2026-10-22 CEO 批准 G0→G1；TASK-003 由游戏策划主责。确定英语优先、海外年轻租客与留学生、70% 搞笑找茬/30% 证据反击、目标 3–5 分钟。TASK-001/002 保持 DONE。G2 尚未获准。
- TASK-003 已完成 G1 静态设计并经 Quality Gate ACCEPT（返工 0/3）。首关选 RC-038/039/040/042/037，固定剖面 2D 房间、五缺陷、一支 inspection phone；五张证据卡反击五项虚构扣款。RC-044 源报道实际是房产销售，故未入首关。设计文件在 `artifacts/design/`，美术/工程/试玩预评见相应文件；未有玩家实测或技术 POC。
- 2026-10-22 CEO 批准 G1→G2 并启动 TASK-004；使用 Phaser + TypeScript + Vite 实现单房间首关，M1→M2→M3 可在 G2 内连续推进。G3、发布、付费服务/素材未获授权。
- TASK-004 的 M1/M2/M3 已由 Quality Gate ACCEPT，完成固定剖面一间房、五项互动与证据反击、Phone、押金结算、引导/提示/补救、本地匿名事件。TypeScript 检查、4 项单测、Vite 构建、Chrome/Edge 桌面与触屏模拟完整通关通过；物理手机、Safari/Firefox、玩家试玩和真实加载时间仍未验证。见 `artifacts/management/QUALITY_GATE_TASK-004.md`。

## 下一条动作与恢复
当前停在 G2，等待 CEO 决定是否进入 G3 探索性试玩。收到“继续项目”先读本文件、`artifacts/handoffs/TASK-004-M3.md`、`artifacts/management/CEO_BRIEF.md`；TASK-001/002/003/004 已验收，无需重做。G3、正式发布、付费服务/素材须相应 CEO 授权。

## 决策日志索引
见 artifacts/management/DECISIONS.md。未列入“已确认”的方案不得表述为正式批准。
