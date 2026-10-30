# Deposit Wars｜押金保卫战

租客与房东双视角的 2D 租房找茬解谜原型。当前是 G2 本地 Demo，尚未正式发布。

## 直接试玩

克隆或下载**整个仓库**后，用浏览器打开 `game/nine-level-demo.html`。九种住房场景包含固定尺寸物品栏、逐关开放卡槽、拾取道具和问题标注；租客与房东都可选择。

`game/offline-demo.html` 是旧单房间完整循环原型，含拖动检查、Inspection Phone、证据核对和虚构押金结算。两份 Demo 的功能目前尚未整合。

## 项目文件

- `game/`：网页原型、九关场景与独立 PNG 道具；构建和测试命令见 `game/README.md`。
- `deposit_wars_skills/shared/PROJECT_STATE.md`：当前项目状态与已确认范围。
- `deposit_wars_skills/artifacts/design/TASK-018_NINE_LEVEL_SYSTEM.md`：九关玩法、案例和卡槽设计。
- `deposit_wars_skills/artifacts/art/TASK-018_NINE_HOMES_ART.md`：九种住房的美术说明。

九关页面是机制与场景草案；逐案例揭露帧、Phone/结算接入九关、真实玩家试玩和性能验证仍待后续工作。
