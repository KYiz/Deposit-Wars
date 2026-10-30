# TASK-011：按 CEO 参考图重做进入身份后的调查界面
status: DONE / Quality Gate ACCEPT；CEO 是否采纳待定
stage: G2 本地 Demo 迭代；G3 未批准
DRI: 程序员
support: 美术设计师 / UI
priority: P0
date: 2026-10-26

## 目标
玩家从 CASE FILE 选择身份后进入与 CEO 新附图一致的全幅房间调查页，并保留双视角解谜交互。

## 输入
- CEO 2026-10-26 附图 `codex-clipboard-38b161d5-18f5-48d8-8c31-c89aca3f0a8d.png`
- CEO 附件 `perspective-demo-investigation-screen-skill.md`（设计参考，非新增阶段门授权）
- TASK-009/010 Demo 与现有离线打包流程

## 范围 / 不做
移除调查页右侧档案栏，新增顶部动态状态栏、全幅房间、三个热点、底部提示/切换入口；保留现有题目与结局，重建离线文件。不冻结正式 V1 美术，不进入 G3。

## 交付
- `../../../game/perspective-demo.html`、`../../../game/src/perspective-demo.css`、`../../../game/src/perspective-demo.ts`
- `../../../game/public/investigation-reference.png`、`../../../game/offline-demo.html`
- `../art/TASK-011_INVESTIGATION_UI.md`、`../handoffs/TASK-011.md`、`../management/QUALITY_GATE_TASK-011.md`

## 验收
- [ ] 进入身份后无右侧栏；房间与顶部视角/房间/进度/目标占据主界面。
- [ ] 三热点和提示/切换入口在参考图对应位置，可点、可用键盘，破解状态可见。
- [ ] 两身份的目标、题目、结局仍正确；切换身份进度重置并回到 CASE FILE。
- [ ] 桌面与窄屏画面可用，不裁掉右侧门锁；离线文件重建可打开。
- [ ] TypeScript/构建、浏览器双路线与离线验证通过，截图核对布局。

## CEO 审批
本轮按 CEO 附图制作本地 Demo；是否采纳为 V1 正式调查界面仍待评价。
