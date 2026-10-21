# Quality Gate — TASK-004 / G2

日期：2026-10-22｜判定：**M1 ACCEPT、M2 ACCEPT、M3 ACCEPT**｜返工计数：M1 1/3、M2 0/3、M3 1/3｜G3 未获授权

这里的返工指 Quality Gate 发现的工程问题并修复后复检：M1 修复 Phaser 场景初始化异常；M3 修复弹层点击穿透与窄屏横滚命中。验收使用最终源码和最终构建复核各里程碑的 DoD；不声称三份不同日期构建已分别发布。

## M1 核心循环

| DoD | 结果 | 证据 |
|---|---|---|
| Phaser + TypeScript + Vite 项目可启动/构建 | PASS | `game/package.json`、锁文件；`pnpm run typecheck` 和 `pnpm run build` 退出 0；浏览器套件启动本地 Vite 并加载画布。 |
| 固定单房间与基础交互 | PASS | `room.ts`、`index.html`；浏览器实际点击 D1 帘子。 |
| D1 找茬→检查→Phone 证据→反击→结算 | PASS | `model.test.mjs` M1 案例；浏览器完整路径含 D1。 |

## M2 完整首关

| DoD | 结果 | 证据 |
|---|---|---|
| 五项不同互动、Phone 对照与五张证据 | PASS | `content.ts` 的步骤数 1/2/1/2/3；模型测试和浏览器桌面/触屏各走完五项。 |
| 房东反应、押金与结算 | PASS | `main.ts` 的五张扣款卡、台词、误配恢复、满额/部分结算；浏览器 `500/500` 断言。 |
| 基础音效、动画、UI 占位反馈 | PASS | WebAudio 点击短音、Phaser 物件揭露变化和 CSS 反馈；声效开关通过浏览器检查。素材为程序绘制原创占位，无外部素材。 |

## M3 试玩版本

| DoD | 结果 | 证据与界限 |
|---|---|---|
| 鼠标与触屏、提示、失败补救、刷新重开 | PASS | Chrome 155、Edge 155 headless 桌面和各自 390×844 触屏模拟，五项端到端；部分结算回房、误配、刷新、提示、键盘 1/Esc 均断言。物理手机仍 NOT_RUN。 |
| 匿名本地事件 | PASS | `EVENT_SPEC.md`；浏览器检验 localStorage 事件数，模型检查关键事件；无网络上传。 |
| 操作说明、测试报告、构建 | PASS | `game/README.md`、`qa/TEST_CASES.md`、`BUG_REPORT.md`、`PLAYTEST_REPORT.md`；TypeScript/单测/构建及浏览器脚本退出 0。 |
| 严重流程阻塞 | PASS（覆盖范围内） | 两浏览器自动完整通关；已发现的 P1 修复并回归。真实设备/未测浏览器未知，不能表述为全平台无 Bug。 |

## 精确命令与最后结果

在 `game/`：`pnpm run typecheck` PASS；`pnpm run test` 4/4 PASS；`pnpm run build` PASS；`pnpm run test:browser` 在本机 Chrome PASS；设 `BROWSER_PATH` 为本机 Edge 后同一脚本 PASS。`pnpm install --offline --frozen-lockfile` 在批准 esbuild 本地构建脚本后 PASS。截图在 `game/test-output/`，Git 忽略。主 JS 约 1.23 MB 原始/340 KB gzip 有 Vite 大包警告。

## 未执行及后续边界

无真实玩家数据；未测物理 iOS/Android、Safari/Firefox、低端设备加载或平台容器。G2 原型仅完成本地可玩与自动化验证。G3 的 8–12 人探索性试玩、正式美术/发布/商业化均需 CEO 后续决议。
