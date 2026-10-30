# TASK-010：修复 Demo 预览链接打不开
status: DONE / Quality Gate ACCEPT
stage: G2 本地 Demo 交付修复；G3 未批准
DRI: 程序员
support: 无
priority: P0
date: 2026-10-26

## 目标
提供不依赖本地 Vite 服务的单文件试玩入口，解决跨回合 localhost 预览失效。

## 输入
- CEO 反馈：“打不开”。
- `../../../game/perspective-demo.html` 与现有 Vite 构建。

## 范围 / 不做
离线打包现有 Demo，保持游戏内容与交互；不部署、不发布、不改阶段门。

## 交付
- `../../../game/offline-demo.html`
- `../../../game/scripts/build-offline-demo.py`
- `../../../game/tests/offline-demo.mjs`
- `../handoffs/TASK-010.md`、`../management/QUALITY_GATE_TASK-010.md`

## 验收
- [x] 单文件包含样式、脚本和首屏图片，不需 localhost 或其他网络资源。
- [x] Chrome 以 `file://` 直接打开，首屏图、角色选择和第一题可运行。
- [x] 保留可复现的离线构建命令和浏览器测试。

## CEO 审批
无需额外批准；仅修复已授权本地 Demo 的打开方式。
