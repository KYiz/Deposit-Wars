# TASK-004：G2 单房间可玩原型

status: DONE — M1/M2/M3 Quality Gate ACCEPT
stage: G2（CEO 2026-10-22 已批准）
DRI: 程序员
support: 美术设计师（占位视觉）；QA（测试）；数据分析师（匿名埋点）
dependencies: TASK-001/002/003 DONE
rework_count: M1 1/3；M2 0/3；M3 1/3

## 范围与基线

以 `artifacts/design/GDD.md`、`LEVEL_001.md`、`CONTENT_SCHEMA.md`、`FLOW_AND_WIREFRAME.md` 为不可替换内容基线。Sunny Side Studio；D1–D5 和对应证据/扣款；固定斜视剖面；仅 Inspection Phone；英文；Phaser + TypeScript + Vite；桌面和移动浏览器。禁止 G3、发布、付费素材/服务、后端和广告 SDK。

## 阶段内拆分和依赖

| 里程碑 | 依赖 | 交付及可验证 DoD | Quality Gate |
|---|---|---|---|
| M1 核心循环 | 本卡与 G1 设计 | Phaser/Vite 项目可启动；单房间画面；D1 从检查到证据、反击、结算；核心状态单测与构建通过 | 逐项检查运行、D1 闭环、命令记录；未过返工最多 3 次 |
| M2 完整首关 | M1 ACCEPT | D1–D5 各自互动、phone 对照、5 证据与扣款、房东反应、押金、基础音效/动画/UI；对应逻辑测试和构建通过 | 五路线及全通关状态测试、构建、可视检查 |
| M3 试玩版本 | M2 ACCEPT | 鼠标/触屏、引导、提示、误配/缺证补救、匿名本地事件、刷新重开、启动说明；QA 功能/兼容/回归报告 | 自动检查、浏览器实际试玩；无设备项目标 NOT_RUN，不得虚报通过 |

## 总体验收

五项均能发现→验证→取证→反击；端到端结算无严重软锁；鼠标正常且手机可操作；刷新可重新开始；代码构建和现有测试通过；原型、操作说明、测试记录和每里程碑 Checkpoint 可复核。Quality Gate 每项以真实命令/记录判定。

## Git 与中断

工作区起初无 Git 仓库；G2 已初始化本地仓库并保存原型/验收的版本记录，保留已验收文档。中断时先读 `shared/PROJECT_STATE.md`、本卡、`artifacts/management/TASK_QUEUE.md` 和最新 Checkpoint，不重复已验收里程碑。

## 最终结果

M1/M2/M3 均通过 `../management/QUALITY_GATE_TASK-004.md`；Checkpoint 分别为 `../handoffs/TASK-004-M1.md`、`TASK-004-M2.md`、`TASK-004-M3.md`。G2 已完成，G3 等待 CEO 单独批准。
