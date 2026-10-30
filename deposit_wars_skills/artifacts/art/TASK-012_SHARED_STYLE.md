# 调查页共用画风记录

2026-10-26｜TASK-012｜**本地 Demo 方向确认，非 V1 正式美术冻结**。

CEO 确认房东与租客可使用同一画风的调查界面；本轮所说的“访客”就是既有租客，名称保持“租客”。现有 Demo 已让**房东、租客**两条路线共用 `game/public/investigation-reference.png` 作为房间画面：场景、三个热点位置、提示/切换按钮与整体暖色漫画插画保持一致。状态栏的身份色与目标、题目反馈和结局随路线切换。

2026-10-26 本地 Chrome 截图核对：`game/test-output/perspective-investigation-desktop.png`（租客）与 `game/test-output/perspective-investigation-landlord.png`（房东）。`pnpm test:perspective` 两条路线完整通关通过。

角色维持两种：租客、房东；不新增第三身份。共用画风仅确认当前 Demo 的视觉方向，正式 V1 美术规范尚未冻结。

此共用画风决定不补足三处谜题的隐藏证据画面；该限制见 [`TASK-011_INVESTIGATION_UI.md`](TASK-011_INVESTIGATION_UI.md)。
