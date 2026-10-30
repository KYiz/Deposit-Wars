# TASK-020：重写 GitHub README，明确当前 Demo 与玩法范围

status: DONE（Quality Gate ACCEPT；README 已同步 GitHub）
stage: G2 文档修正；不改变产品范围或发布状态
DRI: 产品经理
support: 程序员（入口/命令核对）、QA（事实与链接核对）、项目经理（状态和交接）
date: 2026-10-30

## 目标

回应 CEO“README 的内容完全不清晰”，使首次访问 GitHub 的读者能快速分辨项目定位、九关 Demo、旧单房间结算原型、试玩方法、当前完成程度及文件入口。

## 交付

- 根目录 `README.md`：可扫读的项目首页和明确试玩步骤。
- `game/README.md`：与当前九关入口一致的开发说明，旧内容仅按实际可用功能保留。
- Quality Gate、HANDOFF、PROJECT_STATE 与任务队列更新；推送到 GitHub。

## 验收

- [x] 首页开头直接说明游戏和当前交付状态；九关与旧单房间两条路线清晰区分。
- [x] 不装依赖的本地试玩步骤与实际文件、玩法操作相符；说明 GitHub 代码预览不能直接游玩。
- [x] 图片/文档本地链接核验通过；九关未完成项目明确标注。
- [x] 开发命令与 `game/package.json` 核对；删除旧版英文玩法和过时主入口说明。
- [x] README 更新提交并推送；最终远端 SHA 与干净工作树由推送后命令核验。
