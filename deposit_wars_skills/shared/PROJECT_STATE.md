# Deposit Wars — 唯一项目状态源

version: 1.1
date: 2026-10-22
status: G2_TASK-006_DONE_WAITING_CEO_STYLE
current_stage: G2 已验收；按 CEO 单独参考图完成三风格视觉复评（G3 未批准）
primary_owner: 项目经理 / 调度官（等待 CEO 最终画风）
orchestrator: 项目经理 / 工作流调度官
ceo_approval_required: true
current_task: TASK-006 DONE (九张概念图与评估材料 Quality Gate ACCEPT；CEO 最终画风待选)
checkpoint: artifacts/handoffs/TASK-006.md

## 已确认（来自 CEO 当前方向）
- V1: 面向海外年轻租客/留学生的 2D 荒诞租房找茬互动小游戏。
- 核心循环: 找茬 → 工具检查 → 证据反击 / 押金结算。
- 内容主线: 入住 → 生活 → 退租；先做单房间可玩原型，不默认完成全章。
- 候选平台: CrazyGames / Poki，需查实时平台规则和商业可行性。
- G2 技术: CEO 已批准 Phaser 3 + TypeScript + Vite；本地原型及构建已运行。
- 3D Steam 模拟器: 仅未来衍生方向，不进入 V1 范围。
- V1 首发内容规划目标：6–8 个房间、30–40 个不同可玩事件，含 G2 Sunny Side Studio；首关美术与玩法经 CEO 审核后才制定完整扩展计划，本轮不批量制作。
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
- 本地 Git 仓库于 G2 初始化，原型与验收基线提交为 `5c10475`；依赖、构建和截图目录按 `.gitignore` 排除。
- 2026-10-22 CEO 确定 V1 规划目标 6–8 房间、30–40 事件，并要求 TASK-005 首关美术审核先行。美术设计师为 DRI，程序员仅协助采集。已保存本轮 Chrome 实机桌面/手机模拟截图和三套 AI 风格概念图；现有项目无独立正式美术资源。视觉报告、素材清单、成本假设见 `artifacts/art/`。Quality Gate 对审核材料 ACCEPT，CEO 尚未选择画风或批准扩展/G3。
- 2026-10-22 CEO 指定以单独参考图 1/2/7 校准新 A/B/C，保持同房间五缺陷与 Inspection Phone，并展示正常检查、D1 揭露、证据反击。TASK-006 的九张原创 AI 概念图、并排画廊和评估报告在 `artifacts/art/task-006/` 与 `artifacts/art/TASK-006_STYLE_COMPARISON.md`，Quality Gate 对材料 ACCEPT；旧 TASK-005 风格推荐已由此复评取代。最终画风仍需 CEO 确认。

## 下一条动作与恢复
当前停在 G2 后视觉审核，等待 CEO 在新 A/B/C 中选择最终画风并评价首关玩法；然后才可按 CEO 指令制定 V1 扩展计划。收到“继续项目”先读本文件、`artifacts/handoffs/TASK-006.md` 和 `artifacts/art/TASK-006_STYLE_COMPARISON.md`；TASK-001–006 已验收，无需重做。G3、批量资源制作、正式发布、付费服务/素材须相应 CEO 授权。

## 决策日志索引
见 artifacts/management/DECISIONS.md。未列入“已确认”的方案不得表述为正式批准。
