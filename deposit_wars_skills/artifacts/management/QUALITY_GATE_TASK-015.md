# Quality Gate — TASK-015

日期：2026-10-28｜阶段：G2 本地 Demo｜判定：**ACCEPT（任务卡范围）**｜返工：1/3（揭露图片最初被 CSS 提前显示，已修复并新增断言）

| 验收 | 结果 | 核验证据 |
|---|---|---|
| 无编号、房间里直接拖动 | PASS | 清理后的 `game/public/investigation-clean.png` 与 `game/test-output/scene-play-tenant-before.png` 人工检视；浏览器断言 `.spot` 数量为 0，单点 D1 进度仍 0/5 |
| 场景揭露、步骤门槛、错误复位 | PASS | `game/src/perspective-demo.ts` 调用 `GameSession.act/record`；端到端验证短拖动未取证、D1 揭露前所有揭露层隐藏、揭露后仅 D1 出现；D1–D5 所有步骤完成 |
| 轻量 UI 与双视角 | PASS | 桌面/390px 手机截图已检视；两身份同一房间操作与五证据、五项扣款匹配、虚构 $500 结算通过 |
| 鼠标、触控、键盘、离线 | PASS | Chrome 桌面鼠标拖动，390px CDP 真实触控事件拖动、Enter 替代；`pnpm typecheck`、`pnpm test` 4/4、`pnpm test:perspective`、`pnpm build:offline`、`pnpm test:offline` 实际执行通过 |

原参考图未覆盖。内置 imagegen 编辑的项目素材在 `game/public/investigation-clean.png` 和 `investigation-d1/d2/d3/d4/d5-reveal.png`；提示词与来源见 `artifacts/design/TASK-015_SCENE_INTERACTION.md`。

**限制**：揭露使用局部编辑图片叠加和拖动残影，尚非完整逐帧动画。真实玩家是否自然发现物件和觉得玩法有趣未经 G3 测试；未据此冻结 V1 画风或批准扩关/发布。
