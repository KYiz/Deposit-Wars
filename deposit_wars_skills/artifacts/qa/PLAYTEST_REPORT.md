# TASK-004 G2 原型验证报告

版本 1.0｜2026-10-22｜性质：工程/QA 自动化验证，**不是 8–12 人玩家试玩**

## 实际执行

- 本机 Node.js `v24.19.0`、pnpm `11.25.0`；依赖为 Phaser `3.90.0`、TypeScript `5.9.3`、Vite `7.3.1`、Playwright `1.64.1`，锁文件已生成。
- `tsc --noEmit`：PASS。
- `node --experimental-strip-types --test tests/*.test.mjs`：4/4 PASS（D1 闭环、五项满额、误配与部分结算恢复、提示/刷新新会话）。
- `vite build`：PASS，11 模块；生成本地 `dist/`。构建提示主 JS 约 1.23 MB、gzip 约 340 KB，大包优化待后续测量。
- `node tests/browser.mjs`：本地 Chrome 和 Edge headless 桌面，以及各自 390×844 触屏模拟；五项完整取证与反击、误配、部分结算补救、页面刷新重开、本地事件、提示和音效开关。通过时无页面异常。开始/胜利页截图写入 `game/test-output/`（Git 忽略）。
- 使用 `pnpm install --offline --frozen-lockfile`（批准 esbuild 本地构建脚本后）：PASS；可复现依赖安装。

早期浏览器回归曾发现点击穿透、初始化和横滚命中问题，修复见 `BUG_REPORT.md`；早期失败日志没有被当成通过结果。最后改动后 Chrome 与 Edge 两套完整脚本均再次通过，详见 `../management/QUALITY_GATE_TASK-004.md`。

## 未执行与限制

未在物理 iOS/Android 手机、Safari/Firefox 或 CrazyGames/Poki 容器测试；未采集真实玩家时长、70/30 比例或笑点反馈；未作低端设备加载和声音设备矩阵。触屏模拟证明了浏览器事件路径和布局可用性，不能替代实机。G3 如获批准，按 `../analytics/LEVEL_001_PLAYTEST_PLAN.md` 组织 8–12 人探索性试玩，先补真实设备与文案理解验证。
