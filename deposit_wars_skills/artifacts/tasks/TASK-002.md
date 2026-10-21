# TASK-002：全球奇葩租房案例研究与数据库建设

status: DONE
stage: G0 延伸研究（CEO 已授权；正式 G1 玩法设计暂缓）
DRI: 产品经理；按需调用 Rental Case Researcher
support: 数据分析师（去重、分类、质量）；游戏策划（仅可玩性评估）
priority: P0
date: 2026-10-22
rework_count: 0/3

## 目标
建立首批目标 50 个去重、可溯源的公开租房故事，优先找可转成 2D 找茬、检查、取证与反击的案例。若不足，报告实际有效数量与平台缺口。

## 输入
CEO 本轮指令、`shared/PROJECT_STATE.md`、Rental Case Researcher Skill；TASK-001 的方向结论。

## 交付
`artifacts/research/rental_cases.csv`、`CASE_RESEARCH_REPORT.md`、`TOP_10.md`、`SOURCE_GAPS.md`、批次 `checkpoints/`；管理交接及 Quality Gate 记录。

## 验收
- [x] 每条有效案例有可核查的具体页面 URL、查询日期、简要事件，不以猜测代替故事。
- [x] 去重后 56 条，平台/国家/主题覆盖及缺口如实说明。
- [x] 来源性质、核实状态明确；不含私人识别信息，不绕过访问限制。
- [x] 分类、荒诞/视觉/互动评分有一致规则，数据分析师复核。
- [x] Top 10 有视觉线索、操作及证据反击建议；游戏策划只评可玩性。
- [x] Quality Gate 核查真实性表述、可追溯性、分类及改编潜力；返工 0/3。

## 权限与停止条件
本任务获 CEO 授权。完成后停在 G0 等待正式玩法设计批准；不写关卡、代码，不执行平台发布。
