# 游戏原型：入口与开发说明

项目首页见 [README](../README.md)。本目录同时保存**当前九关玩法 Demo**和**较早的单房间完整循环原型**；它们还没有合并成同一款九关游戏。

## 试玩入口

| 文件 | 用途 | 依赖 |
| --- | --- | --- |
| [`nine-level-demo.html`](nine-level-demo.html) | 当前主 Demo：九种住房、租客/房东、物件拾取入栏、选择线索后标注问题 | 保留 `src/`、`nine-level-data.js` 和 `public/` 的相对位置 |
| [`offline-demo.html`](offline-demo.html) | 旧单房间原型：五处场景检查、Inspection Phone、扣款与证据匹配、虚构押金结算 | 图片与代码已内联，单个 HTML 可打开 |
| [`perspective-demo.html`](perspective-demo.html) | 旧单房间版本的 Vite 开发入口 | 先运行开发服务器 |

从 GitHub 下载 ZIP 并解压整个仓库，或克隆仓库；随后用浏览器打开上述本地 HTML 文件。`level-art-preview.html` 是指向九关 Demo 的旧地址，`level-art-preview-v1.html` 是旧六关美术预览档案。

## 当前九关的操作

选择关卡和租客/房东视角。在房间中拖动、点击或键盘选取物件；正确线索进入物品栏，干扰物不会。选中栏内线索，再点击对应的问题区域；某个问题所需物件收齐且线索匹配时才标注成功。每关每视角标出两处问题即可前进。页面允许自由选关，便于审核关卡草案。

九关数据由 `scripts/build-nine-level-data.py` 生成到 `nine-level-data.js`。场景图在 `public/nine-homes/`，独立案例道具 PNG 在 `public/levels/`。详细案例与房型映射见 [`TASK-018_NINE_LEVEL_SYSTEM.md`](../deposit_wars_skills/artifacts/design/TASK-018_NINE_LEVEL_SYSTEM.md)。

九关目前是**机制和房间美术演示**：逐案例揭露状态、Phone、押金结算尚未接入。旧单房间原型有这些完整流程，不能据此推断九关也已完成。

## 修改源码与验证

开发环境需要 Node.js 24+、pnpm 11+；从本目录执行：

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Vite 会显示本地地址。需要调试旧单房间源码时打开该地址下的 `/perspective-demo.html`；当前九关也可直接通过本地 `file://` 打开。

```powershell
pnpm typecheck
pnpm test
pnpm build
node tests/task018-nine-level.mjs
pnpm build:offline
pnpm test:offline
```

`pnpm build:offline` 需要 Python，并重新生成 `offline-demo.html`。浏览器测试需要本机 Chrome 或 Edge；测试截图写入已忽略的 `test-output/`。上述命令是可用的验证入口，具体通过记录见各任务 Quality Gate；物理手机、Safari/Firefox、真人试玩和正式加载性能尚未验证。
