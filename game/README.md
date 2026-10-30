# Deposit Wars — Sunny Side Studio playable prototype

## 新版双视角找茬 Demo

运行 `pnpm dev` 后打开 `http://localhost:5173/perspective-demo.html`。先在 CASE FILE 首屏选租客或房东，再点“进入现场”。房间没有编号入口：直接拖开粉色帘子、移走墙画、拉开柜门、试右侧门锁、检查茶几物件。部分异常需连续检查；发现会在房间里显现并自动存入 Inspection Phone，最后核对扣款。手机可手指拖动并左右滑动查看房间；键盘可按 1–5 聚焦对应物件，再按 Enter 完成等效动作。拖错复位，扣款错配可重试，未取满证据可回房补查。可用 `pnpm test:perspective` 执行两视角的本地 Chrome 测试。此单房间演示是 TASK-015 的本地玩法迭代，未做玩家测试或正式发布。

**稳定离线入口：** 直接用浏览器打开同目录的 `offline-demo.html`，无需启动服务。源码更新后运行 `pnpm build:offline` 重新生成，再运行 `pnpm test:offline` 验证 `file://` 打开和基本交互。`level-art-preview.html` 现在进入 `nine-level-demo.html`：九种住房、固定尺寸物品栏、随关卡递增的开放卡槽、正确物件拾取和现场问题标注；36 个案例事件分配到九关。原六关美术预览备份为 `level-art-preview-v1.html`。九关页面是玩法演示，完整剧情与押金结算尚未整合。

进入身份后的调查页使用 `public/levels/level-01/room-underlayer.png` 作为线索揭露层；进度、Phone、提示与切换视角缩到画面角落。首关现有九步交互的帘子、墙画、检查镜、柜门、门把、门牌、玻璃罩、蜡烛、擦拭布是独立透明 PNG，拖动时仅物件本身移动。原参考图和上一版干净底图保留在 `public/`，未覆盖。

首关有 **五处场景内拖动谜题**：观察物件 → 直接拖动并揭露 → Phone 查看现场证据 → 五项扣款与证据匹配 → 虚构 `$500 / $500` 结算。至少拿到一张证据即可提前核对；错配不扣钱，部分结算可以回房补查。租客与房东共用房间和状态规则，房东线以自查与纠正扣款叙事。揭露图是本地原型素材；动画过渡和真实玩家理解度仍未验证。

G2 / TASK-004. English first. This is one fictional room with five case-inspired defects. It is a local prototype, not a published game or legal guide.

## Start

Requires Node.js 24+ for the bundled TypeScript test command, and pnpm 11+. From this `game` directory:

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Open the local address printed by Vite (normally `http://localhost:5173/`). For a production build, run `pnpm build` then `pnpm preview`. Refresh the page to start a new run.

## Play

1. Tap the highlighted curtain beside the microwave. On a narrow phone, swipe the room sideways to see the closet and exit.
2. Inspect each suspicious item. D2, D4 and D5 have more than one inspection step.
3. Open the **Inspection Phone** to compare the fictional listing with the room, then record evidence. The phone is the only tool.
4. Select **Face landlord**. Choose a charge and its matching evidence card. Wrong matches have no deposit penalty.
5. If you finish with unresolved charges, select **Back to inspect** and continue. Five correct rebuttals return `$500 / $500` in this fictional scoring system.

**Controls:** mouse click or touch; on keyboards press `1`–`5` to open room spots, `Esc` to close dialogs, and `Tab` to reach labeled buttons. **Hint** and sound toggle are under the room. The local playtest log export is in the footer. No events are sent to a server.

## Verify

```powershell
pnpm typecheck
pnpm test
pnpm build
pnpm test:browser
```

`test:browser` launches local Chrome or Edge. Set `BROWSER_PATH` to another Chromium executable if neither is at the common Windows path. It generates screenshots in ignored `test-output/`. The browser suite covers full desktop and emulated 390×844 touch playthrough, partial settlement recovery, refresh reset, and local event logging. Physical phones, Safari, Firefox, actual platform SDKs, and advertising are outside this G2 check.

## Scope and provenance

Design baseline: `../deposit_wars_skills/artifacts/design/LEVEL_001.md` and `GDD.md`. Source IDs RC-038/039/040/042/037 are traceability metadata; no source images, identities, addresses, or original text are shipped. The visual scene is programmatic placeholder art in Phaser and may be replaced later. G3 requires a separate CEO decision.
