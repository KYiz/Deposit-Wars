# TASK-004 G2 原型架构

版本 1.0｜2026-10-22｜状态：已实现

- `../../../game/src/content.ts`：G1 五缺陷的固定内容及 Case ID；各自检查步骤、广告承诺、证据、扣款和房东台词。不引入第六项或第二工具。
- `../../../game/src/model.ts`：与画面解耦的会话状态机。每缺陷独立 `opened/step/evidence/resolved/wrongMatches/hintLevel`；匹配仅同 ID 正确，误配不扣款；部分结算可回房保留状态。
- `../../../game/src/room.ts`：Phaser 3 固定斜视剖面场景；程序绘制可替换占位物件，按状态换可见细节。
- `../../../game/src/main.ts`：DOM 控件与 Phaser 视图连接、Inspection Phone、对话层、房东回合、提示、音效、匿名本地事件。透明 DOM 热点随画布横向滚动，解决触屏滚动后画布坐标命中不稳；Phaser 专职渲染。
- `../../../game/src/style.css`：桌面与窄屏布局；窄屏保留 720px 可横滚房间，首屏显示 D1。按钮和证据卡有触屏尺寸。
- `../../../game/tests/model.test.mjs`、`browser.mjs`：纯状态单测与真实浏览器自动回归。

Vite/TypeScript/Phaser 版本锁定于 `game/package.json` 与 `pnpm-lock.yaml`。无后端、广告 SDK、付费资产或外部分析服务。刷新创建新 `GameSession`；匿名事件保存在浏览器 `localStorage` 最多 300 条，用户主动下载 JSON，未上传。这里的 300 条是原型防膨胀限制，G3 研究前需与分析师确认保留/清除策略。

已知工程风险：主 JS 约 1.23 MB（gzip 约 340 KB，Vite 大包警告）；实际加载时长未测。手机实机触控与 Safari/Firefox 未测，当前只有桌面 Chrome/Edge 及浏览器触屏模拟结果。
