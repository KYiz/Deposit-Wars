# TASK-017 Quality Gate

日期：2026-10-28　判定：**ACCEPT（PNG 美术草案与首关图层接入）**　返工：0/3

| TASK-017 验收项 | 判定与证据 |
|---|---|
| 36 事件逐关资产表 | PASS：`TASK-017_PROP_ASSET_MAP.csv` 36 个唯一事件、83 张逐事件道具 PNG，逐行列 Case ID、主/后续 PNG、房间、预览锚点、拖前/拖中/拖后状态文字及来源边界；所有路径存在。当前 Demo 专用道具另有 8 张。 |
| 六关不同房间与道具 | PASS：`game/public/levels/level-01` 至 `level-06` 六套房间图与各关独立物件 PNG；`game/level-art-preview.html` 可按关和身份浏览、拖动。91 张独立物件 PNG 左上角透明 alpha 检查失败数 0。绘图与坐标仍为草案，尚未逐关校准。 |
| 首关真实 PNG 图层拖动 | PASS：`game/perspective-demo.html` 的九个场景操作节点含独立 PNG；TS 删除整图裁片模拟；首关揭露底图新建、旧素材未覆盖。`pnpm build:offline` PASS；`pnpm test:offline` PASS；`node tests/task017-art.mjs` 以 Chrome `file://` 完成租客鼠标 5/5、房东键盘 5/5、390px 触控拖帘与键盘检查、六关两身份各 3 件图加载。 |
| 来源、权利、状态 | PASS：`TASK-017_CASE_PROP_ART.md` 区分原案例、虚构插画与美术草案；原项目参考图和图集保留；未称后五关已可玩。PNG 未做正式权利/平台提交审核。 |
| Skill 最小变更 | PASS：美术岗位 Skill 只增独立道具/状态/逐关差异条款；manifest 1.5.0、14 Skill；旧版 SHA256 备份、变更日志和权限文字静态核对通过。 |

## 实际验证

- `pnpm build:offline`：TypeScript 检查、Vite 构建、离线 HTML 生成均成功；输出约 15.9 MB。
- `pnpm test:offline`：本地 Chrome `file://` 加载/身份/首处拖动 PASS。
- `node tests/task017-art.mjs`：首关双身份鼠标/触控/键盘路径、六关 36 件主道具图加载 PASS。
- `pnpm test`：旧 `GameSession` 4 项模型测试 PASS。
- 静态检查：36 个事件映射 83 PNG、6 房间、91 独立 PNG 透明角、manifest/frontmatter/权限文字 PASS。
- `pnpm test:perspective`：**NOT_RUN 成功路径**。原测试依赖 localhost，在当前沙箱尝试时 Chrome 返回 `ERR_NETWORK_ACCESS_DENIED`；以 `file://` 的离线交互测试覆盖本任务改动。未把 localhost 失败写成通过。

## 风险与边界

六关预览是美术与拖动样板，第 2–6 关的揭露帧、碰撞/状态逻辑、取证、结算和完整操作坐标未制作。人物趣味性、真实手机、首屏加载速度及美术统一性需后续验证。现有艺术草案不等于 CEO 正式画风冻结或 G3 批准。

下一步：CEO 浏览六关美术预览并试玩首关 PNG 拖动；确定方向后，为下一关的正式多步交互另建制作任务。
