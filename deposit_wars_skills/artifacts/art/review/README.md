# TASK-005 图像索引

## 实际运行截图（未修图）

- `actual-desktop-page.png`：Chrome，1280×900 CSS 视口，完整游戏页面。
- `actual-desktop-room-left.png`：同次运行的完整 Sunny Side Studio 房间。
- `actual-mobile-page.png`：Chrome 390×844 CSS 触屏模拟，左端完整页面。
- `actual-mobile-room-left.png` / `actual-mobile-room-right.png`：同一房间两端截图，均非物理手机实拍。

上述由 `game/tests/visual-review.mjs` 通过本地 Vite 服务和 Playwright 截取；运行命令与结果在 `../TASK-005_SCENE_PREVIEW.md`。无生成式修饰或拼贴。

## AI 视觉概念图（不是游戏截图）

- `concept-A-polished-cartoon-v2.png`：精致斜视卡通最终审核候选；无烟痕。
- `concept-B-handdrawn-absurd-v2.png`：夸张手绘沙雕风最终审核候选；补足蜡烛透明罩。
- `concept-C-indie-pixel.png`：独立游戏像素风审核候选。
- 不带 `v2` 的 A/B 图片为生成过程草稿，保留追溯；不用于 CEO 对比。

概念图以本地原型画面作布局参考，由内置 imagegen 生成。三图有构图/前后状态的模型偏差；正式资产必须重新按 `artifacts/design/LEVEL_001.md` 绘制，并做权利和可读性审查。
