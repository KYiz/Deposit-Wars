# TASK_QUEUE — G2 与视觉审核

2026-10-22｜TASK-004 DRI：程序员；TASK-005/006 DRI：美术设计师；调度：项目经理

| 顺序 | 状态 | 依赖 | 下一输出 |
|---|---|---|---|
| TASK-004/M1 核心循环 | DONE / ACCEPT（返工 1/3） | TASK-003 DONE | `../handoffs/TASK-004-M1.md` |
| TASK-004/M2 完整首关 | DONE / ACCEPT（返工 0/3） | M1 ACCEPT | `../handoffs/TASK-004-M2.md` |
| TASK-004/M3 试玩版本 | DONE / ACCEPT（返工 1/3） | M2 ACCEPT | `../handoffs/TASK-004-M3.md` |
| TASK-005 Sunny Side Studio 美术审核 | DONE / ACCEPT（返工 0/3，CEO 画风待选） | TASK-004 DONE + CEO V1 规模决议 | `../handoffs/TASK-005.md` |
| TASK-006 三风格戏剧化视觉复评 | DONE / ACCEPT（CEO 最终画风待选） | TASK-005 DONE + CEO 新指令 | `../handoffs/TASK-006.md` |
| TASK-007 双视角抽象找茬 Demo | DONE / ACCEPT（CEO 方向反馈待定） | TASK-004 DONE + CEO 2026-10-26 Demo 指令 | `../handoffs/TASK-007.md` |
| TASK-008 双视角 Demo UI Markdown | DONE / ACCEPT（CEO 方向反馈待定） | TASK-007 DONE + CEO 询问 UI MD | `../handoffs/TASK-008.md` |
| TASK-009 CASE FILE 独立选身份首屏 | DONE / ACCEPT（CEO 方向反馈待定） | TASK-007 DONE + CEO 附图/设计提案 | `../handoffs/TASK-009.md` |
| TASK-010 离线 Demo 链接修复 | DONE / ACCEPT（CEO 体验待定） | TASK-009 DONE + CEO 反馈打不开 | `../handoffs/TASK-010.md` |
| TASK-011 全幅房间调查页 | DONE / ACCEPT（界面；CEO 视觉反馈待定） | TASK-009/010 DONE + CEO 调查页附图 | `../handoffs/TASK-011.md` |
| TASK-012 双身份共用调查画风 | DONE / ACCEPT（当前 Demo；正式 V1 未冻结） | TASK-011 DONE + CEO 共享画风/名称澄清 | `../handoffs/TASK-012.md` |
| TASK-013 旧 G1/G2 首关玩法接入双视角 Demo | DONE / ACCEPT（玩法逻辑；正式揭露图待做） | TASK-004/012 DONE + CEO 玩法整合指令 | `../handoffs/TASK-013.md` |
| TASK-014 案例策划 Skill 与五处拖动谜题 | DONE / ACCEPT（G2 本地 Demo；正式逐帧插画待做） | TASK-013 DONE + CEO 玩法反馈 | `../handoffs/TASK-014.md` |
| TASK-015 去编号的场景内拖动找茬 | DONE / ACCEPT（G2 本地 Demo；玩家发现率待验证） | TASK-014 DONE + CEO 最新交互反馈 | `../handoffs/TASK-015.md` |
| TASK-016 六关双视角路线与拖动物件目录 | DONE / ACCEPT（内容规划；扩关未批准） | TASK-015 DONE + CEO 关卡与策划 Skill 指令 | `../handoffs/TASK-016.md` |
| TASK-017 六关案例道具 PNG 与首关真实图层拖动 | DONE / ACCEPT（美术草案；后五关玩法未制作） | TASK-016 DONE + CEO 逐物件美术反馈 | `../handoffs/TASK-017.md` |
| TASK-018 九种住房与物品栏/问题标注 | DONE / ACCEPT（九关机制演示；完整剧情/结算待做） | TASK-017 DONE + CEO 九关/卡槽/标注指令 | `../handoffs/TASK-018.md` |
| TASK-019 当前 G2 项目上传 GitHub | DONE / ACCEPT（私有仓库备份；非游戏发布） | TASK-018 DONE + CEO 上传指令 | `../handoffs/TASK-019.md` |
| TASK-020 GitHub README 清晰化 | DONE / ACCEPT（主 Demo、旧原型及未完成范围分明） | TASK-019 DONE + CEO README 反馈 | `../handoffs/TASK-020.md` |

G2 首关保持不变；TASK-006 交付按 CEO 单独参考图 1/2/7 校准的三套视觉方案，每套正常/揭露/反击三幕。V1 规划目标为首发 6–8 房间、30–40 事件，但尚未获准扩展策划或量产。G3 8–12 人探索性试玩仍须 CEO 决议。

2026-10-26：TASK-007 为独立本地 Demo 页面，保留旧 G2 原型作为对照；等待 CEO 试玩反馈，不据此自动启动 G3 或批量制作。
