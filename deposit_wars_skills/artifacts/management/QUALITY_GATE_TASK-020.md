# TASK-020 Quality Gate

日期：2026-10-30｜判定：**ACCEPT（README 内容与入口修正）**｜返工：0/3

| 验收项 | 证据 |
| --- | --- |
| 首次访问可读 | 根 README 首屏说明游戏定位和 G2 状态，提供九关主 Demo、旧单房间原型对照表、无安装打开步骤、四步操作和当前缺口。九房型预览图放在入口之前。 |
| 与实际页面一致 | 对照 `game/nine-level-demo.html` 和 `game/src/nine-level.js`：两身份、自由选关、拖动/点击/键盘拾取、正确线索入栏、收齐物件后正确区域标注、每视角每关两处问题、下一关门槛均一致。 |
| 链接与命令 | PowerShell 对两个 README 中所有本地 Markdown 链接执行 `Test-Path`：全部存在。`game/package.json` 核对文档列出的 `typecheck`、`test`、`build`、`build:offline`、`test:offline` 脚本均存在；`git diff --check` 无空白错误。 |
| 范围真实 | 九关页面仅描述已实现的物品栏/标注，明确逐案例揭露、Phone、结算尚未整合；旧单房间完整循环独立说明。未声称 G3、真人试玩或正式发布。 |
| 远端同步 | README 与 TASK-020 文件提交并推送至私有 `KYiz/Deposit-Wars` 的 `main`；最终远端 SHA 与工作树状态以推送后 Git 核验记录为准。 |

文档修正没有改动游戏代码或资产，因此未重跑玩法测试。旧版玩法测试证据仍见 `QUALITY_GATE_TASK-018.md`。
