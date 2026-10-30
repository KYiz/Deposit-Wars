# TASK-016 Quality Gate

日期：2026-10-28　判定：**ACCEPT（内容规划与 Skill 规格）**　返工：0/3

| 任务卡验收项 | 判定与证据 |
|---|---|
| 数量与配额 | PASS：`TASK-016_LEVEL_ROADMAP.md` 推荐 6 关 × 两视角 × 每关 3 事件 = 36；Python CSV 检查得到 36 个唯一 ID、每关每视角恰 3 个。处于既有 6–8 房间、30–40 事件目标内。 |
| 难度、引导与补救 | PASS：路线图逐关列新认知/操作、引导、复位与通关；从单件拖开逐步到多物件对照和责任反转，无编号热点、没有强制计时。预计时长是目标，非实测。 |
| 逐事件可拖规格 | PASS：CSV 36 行均有拖前线索、可拖物件、具体手势、可见结果、证据/反制、步数、来源边界；源 URL、类型、核实状态和查询日从 `rental_cases.csv` 对齐。进一步制作前仍需位置坐标、状态帧及手势阈值的单关实现卡。 |
| 房东路线独立性 | PASS：18 个房东视角事件涉及钥匙、改漆、宠物、家具、公共卫生、损坏、事故误判；并非租客路线换台词。RC-012/017 等室友素材改租客已明确虚构，RC-025 是第三方事故而非恶意租客。 |
| Skill 治理 | PASS：`rental-puzzle-designer/SKILL.md` 只增关卡/物件规范，manifest 1.4.0、14 Skill；旧版 SHA256 备份在 `skill-backups/`，变更日志可回滚。岗位职责、G3、发布权限原文保持。 |
| 当前 Demo 范围 | PASS：路线图明说当前只是一间可玩房，后续关卡未实现、未测试；本任务没有改游戏代码或启动 G3。 |

## 实际验证

- Python 静态脚本解析 manifest、Skill frontmatter、CSV 和来源表：`PASS: manifest 14 skills, frontmatter and protected gate text, 36 unique events, 6x3x2 allocation, source metadata, all event IDs in roadmap`。
- PowerShell 人工抽查 CSV 36 行的物件/手势/改编边界，并修正 E22 的物件/动作命名不一致。
- 后续关卡浏览器试玩、真实触屏、剧情趣味性、时间目标：**NOT_RUN**，因为尚未制作；不得将规划验收写成可玩性验收。官方 Skill quick validator 未运行，既有环境缺 PyYAML；已完成针对性静态检查。

风险：不少房东路线原型来自争议或室友自述，不能宣传成 18 条真实“恶意租客”案例。内容制作前产品经理需复查来源，数据分析师复核质量。此 ACCEPT 不替代 CEO 对扩关生产、G3 或发布的批准。

下一步：交 CEO 审阅 6 关/36 事件的方向与单关具体玩法；若批准后续关卡制作，再为关卡 2 另建生产任务卡。
