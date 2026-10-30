# TASK-018：九种住房关卡、固定物品栏与问题标注
status: DONE（Quality Gate ACCEPT：九关机制与美术草案；正式内容/结算待制作）
stage: CEO 新批准的 V1 九关方向 / G2 本地玩法演示；G3 与发布未启动
DRI: 游戏策划
support: 美术设计师（统一画风和九房型）、游戏程序员（物品栏与标注状态机）、QA（离线试玩核证）、项目经理（状态与交接）
date: 2026-10-28

## 目标
将 CEO 新要求落实为九种年轻人常见住房类型的逐关演示：统一第一关暖色手绘画风，固定总尺寸但按关开放不同数量卡槽的物品栏，拿对案例物件后入栏，选物件再点击真实问题区域标注并计分；支持租客和房东。

## 输入
CEO 当前指令；`shared/PROJECT_STATE.md`；`artifacts/design/TASK-016_LEVEL_ROADMAP.md`、`TASK-016_DRAG_OBJECT_CATALOG.csv`；`artifacts/art/TASK-017_CASE_PROP_ART.md`、`TASK-017_PROP_ASSET_MAP.csv`；现有本地 Demo。

## 交付
- `artifacts/design/TASK-018_NINE_LEVEL_SYSTEM.md`：九种房型、关卡梯度、两视角、卡槽规则与标注状态机、案例映射。
- `artifacts/art/TASK-018_NINE_HOMES_ART.md` 与九张统一风格场景图；游戏可拖物件复用/新增映射与状态。
- `game/level-art-preview.html` 更新为本地九关可操作演示；原首关 `game/offline-demo.html` 保留并提供新入口。
- 相关测试、Quality Gate、HANDOFF、PROJECT_STATE；必要的 Skill 最小修正与变更日志。

## 验收
- [x] 九关各一种住房类型、各一个不同房间；统一以第一关画风为标准，不只是旧底图换色；案例与身份映射可追溯。
- [x] 物品栏外框长宽在九关不变；卡槽同尺寸，早期开放少、后期递增；正确物品才入栏，容量受限并有状态反馈。
- [x] 拖动独立 PNG 物件可拾取；选中栏内物件后点击问题区域可标注，错误物件/区域不能算对；正确标注计入进度并有画面标记。
- [x] 租客和房东均可玩，关卡切换/重试/键盘触控可用；不得用编号热点代替观察。
- [x] 离线文件可打开；静态资产和浏览器操作有实际验证；后续完整剧情、结算和玩家实测范围如未实现须明确。
