# TASK-009 Quality Gate

date: 2026-10-26 | stage: G2 本地 Demo 迭代 | verdict: **ACCEPT** | rework: 0/3

| DoD | 判定 | 证据 |
|---|---|---|
| 初次打开为独立 CASE FILE，无调查 HUD | PASS | `game/perspective-demo.html` 的 `#case-screen`/隐藏的 `#investigation-screen`；桌面与手机截图人工核对 |
| 同等角色选择，选中态和未选禁入 | PASS | 两个 `data-case-role` 按钮、`aria-pressed` 与 `#case-enter:disabled`；浏览器断言 |
| 选身份后进入对应游戏，可返回 | PASS | `game/src/perspective-demo.ts` 的 `selectCaseRole`、`chooseRole`、`showCase`；两视角端到端浏览器测试 |
| 桌面/窄屏可读、可点、键盘可操作 | PASS（基础） | 原生按钮、焦点样式、390px 触屏模拟通关首题；键盘机制源码核对。屏幕阅读器实测未做 |
| 构建与两线回归 | PASS | `pnpm build` exit 0、`pnpm test:perspective` exit 0，2026-10-26 本地 Chrome |

执行过的验证：构建、Chrome 桌面两身份完整通关、手机触控/提示、未选禁入及返回换身份；截图 `game/test-output/perspective-case-desktop.png`、`perspective-mobile-start.png` 人工查看。未执行：G3 真人试玩、实体手机、其他浏览器、正式素材权利审核。

风险：桌面首屏使用用户提供的图像，文本和可点区与图像比例对齐；将来若换图需重核热点。附图只用于本地评审，未判断正式商用权利。

下一步：CEO 试玩并评价 CASE FILE 首屏是否符合方向；正式 V1 UI 冻结仍需另行确认。
