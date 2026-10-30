# TASK-011 Quality Gate

date: 2026-10-26 | stage: G2 本地 Demo 迭代 | verdict: **ACCEPT（界面交付）** | rework: 0/3

| DoD | 判定 | 证据 |
|---|---|---|
| 无右栏；动态视角/房间/进度/目标和全幅房间 | PASS | `game/perspective-demo.html`、`game/src/investigation.css`；桌面截图 `perspective-investigation-desktop.png` |
| 01–03、提示/切换可点和键盘访问、破解状态 | PASS | 原生按钮、CSS 焦点/已解状态、`perspective-demo.ts` 进度圆点；Chrome 浏览器两路线脚本 |
| 双身份题目/结局、返回 CASE FILE 重置 | PASS | `pnpm test:perspective` 两身份完整通关与返回断言 |
| 桌面/窄屏不裁门锁，离线文件可打开 | PASS | 390px 截图 `perspective-investigation-mobile.png` 人工核对；`pnpm build:offline` 与 `pnpm test:offline` exit 0 |
| TypeScript/构建 | PASS | `pnpm build:offline` 包含 TypeScript 检查和 Vite 构建，exit 0 |

测试过程：首次浏览器测试因测试脚本仍点已在手机布局隐藏的桌面提示按钮而失败；更新测试目标为可见的手机提示按钮后，同一功能测试通过。该问题属于测试定位变更，游戏功能未因此返工。

边界：提供的是 CEO 所示调查 UI 和可玩的既有题目。附图未绘出三处谜题所需的全部隐藏证据；正式“看图公平性”仍未验收，需在玩法内容精修任务中补局部揭露画面。无真人试玩、实体手机或正式商用素材许可结论。

下一步：CEO 刷新 `game/offline-demo.html` 评价调查页；若采用视觉方向，再安排三处谜题视觉证据与文案校准。
