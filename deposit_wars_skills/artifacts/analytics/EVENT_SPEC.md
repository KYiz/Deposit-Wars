# TASK-004 本地匿名试玩事件

版本 1.0｜2026-10-22｜状态：已实现，尚未收集真实玩家数据

本地键 `deposit-wars-local-playtest` 存 JSON 数组。每次加载生成随机 `sessionId`，事件带 `type`、`elapsedMs`，可选 `defectId`、`value`。仅保留最近 300 条；不发送到服务器、不读取身份、IP 或房屋信息。用户可按页脚按钮主动导出。浏览器禁用 localStorage 时游戏仍可玩，但不会持久保留日志。

| 事件 | 触发及字段 | 指标用途 |
|---|---|---|
| `level_start` | 创建会话 | 分母、起点 |
| `first_hotspot_open` | 各缺陷首次打开，`defectId` | 首次互动与地点发现时间 |
| `defect_revealed` | 完成该项所有操作 | 检查完成率 |
| `evidence_collected` | Phone 首次记录，重复查看不再发 | 取证率 |
| `hint_shown` | 主动或超时提示，`value` 为 1/2 | 提示依赖 |
| `face_landlord` | 开始反击，`value` 为已有证据数 | 找茬/反击分段时长 |
| `evidence_match` | 每次配对，`value` 为 true/false | 理解度与误配 |
| `return_to_room` | 部分结算或反击返回 | 补救路径 |
| `level_finish` | 全部或部分结算，`value` 为已返金额 | 通关和时长 |

按 `sessionId` 去重；一场可有多次 `level_finish`（部分结算后补查），分析完整通关时取首次达到 500 的时间。自动化测试产生的本地日志不是玩家数据。G3 若获批准，以 `LEVEL_001_PLAYTEST_PLAN.md` 的 8–12 人探索性阈值为准，并补充知情同意及数据清理步骤。
