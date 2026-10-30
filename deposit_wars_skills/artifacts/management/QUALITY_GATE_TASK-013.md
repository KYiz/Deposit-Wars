# TASK-013 Quality Gate

date: 2026-10-26 | stage: G2 本地 Demo 整合 | verdict: **ACCEPT（玩法逻辑与可玩交付）** | rework: 1/3

| DoD | 判定 | 证据 |
|---|---|---|
| 双路线 D1–D5 多步检查，Phone 前置 | PASS | `GameSession` 复用；浏览器两路线逐项检查与取证；D1 未揭露前无记录按钮 |
| 提前核对、错配无损、部分结算补查、全额结算 | PASS | `pnpm test:perspective` 租客完整走上述分支；旧模型单测 4/4 |
| 提示、触屏、键盘、重玩、本地事件 | PASS（基础） | 代码审查键盘 1–5/Esc/Tab 与重玩；浏览器实测手机触控/提示/声音开关与本地 `evidence_match`/`level_finish` 记录；两级提示旧模型单测 |
| 两路线浏览器通关、构建、离线文件 | PASS | `pnpm typecheck`、`pnpm test`、`pnpm test:perspective`、`pnpm build:offline`、`pnpm test:offline` 均 exit 0 |
| 视觉差异如实记录 | PASS | `artifacts/engineering/TASK-013_INTEGRATION.md` 列出五项未补的正式揭露画面 |

返工 1/3：首次 `pnpm build:offline` 因双入口构建将共享 `model` 拆为独立 JS chunk，单文件打包脚本拒绝残留 import；新增单入口 `vite.offline.config.ts` 后重建并通过 `file://` 测试。没有把失败尝试写成通过。

**限制**：当前房间参考图与五项隐藏缺陷尚未逐帧对齐。局部检查用图像裁切与文字反馈，正式“看图找瑕疵”的视觉公平性 **NOT_RUN**，不属于本卡的代码逻辑 ACCEPT。实体设备、Safari/Firefox、真人 G3 试玩及正式发布时间未验证/未授权。

下一步：CEO 试玩离线 Demo 的完整循环；若认同机制，再对五处分别制作可见的检查前/后状态并交视觉 Quality Gate。
