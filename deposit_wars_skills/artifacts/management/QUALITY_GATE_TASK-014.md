# Quality Gate — TASK-014

日期：2026-10-28｜阶段：G2 本地 Demo｜判定：**ACCEPT（当前任务卡范围）**｜返工：1/3（手机拖动后 Phone 首次触控偶发漏点，已修复并重测）

| 验收条款 | 结果 | 证据 |
|---|---|---|
| 五处拖动、分步揭露、取证门槛 | PASS | `game/src/perspective-demo.ts`、`game/tests/perspective-demo.mjs`：D1–D5 全部拖动并记录；D1 揭露前无记录按钮 |
| 输入与补救 | PASS | 桌面 dragTo、390px 手机 CDP touch drag、键盘 Enter 替代通过；失败拖放复位实现已核源码；错配不扣款、部分回房由端到端脚本覆盖 |
| 双视角、统一画风、完整结算 | PASS | `game/test-output/drag-puzzle-d1.png` 与双路线截图已人工检视；两路线各五证据及 `$500 / $500` 通关通过 |
| 案例 Skill 与可追溯改编 | PASS / 部分工具 NOT_RUN | `artifacts/design/TASK-014_DRAG_PUZZLES.md` 映射 RC-038/039/040/042/037；新增专项 Skill、manifest JSON 与前置静态检查 PASS；`quick_validate.py` 因缺 PyYAML 未运行，不称官方验证通过 |
| 代码与离线文件 | PASS | `pnpm typecheck`、`pnpm test`（4/4）、`pnpm test:perspective`（修复后连续两次通过）、`pnpm build:offline`、`pnpm test:offline` 均实际执行通过 |

**已知限制**：局部揭露是抽象符号、CSS 与房间图裁切，并非五处正式逐帧插画；玩家是否觉得更有趣、线索是否足够公平仍未经真实玩家验证。G3、正式美术冻结、批量扩关和发布均不在本次 ACCEPT 内。
