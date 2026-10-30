# TASK-014：把案例策划转为可拖动的双视角首关
status: DONE / Quality Gate ACCEPT（G2 本地 Demo）
stage: G2 本地 Demo 迭代；G3 未批准
DRI: 游戏策划
support: 程序员（实现）、美术（视觉一致性）、QA（可玩性核验）、项目经理（Skill 维护与交接）
priority: P0
date: 2026-10-28

## 目标
依据既有租房案例与首关规则，设计并实现可拖动物件的五处房间谜题，使租客和房东都在主界面确立的案卷插画风格中完成取证与结算。

## 输入
- CEO 当前反馈和主界面截图；`artifacts/design/LEVEL_001.md`、`artifacts/research/rental_cases.csv`
- `game/perspective-demo.html`、`game/src/perspective-demo.ts`、`game/src/model.ts`

## 范围
在单房间五处现有线索中加入可见物品拖动、分步揭露和触控/键盘替代；保留 Phone 取证、双视角、五项核对及结算。新增案例到玩法的专项策划 Skill 与案例映射。只更新本地 Demo，不扩关、上线或进入 G3。

## 交付
- `artifacts/design/TASK-014_DRAG_PUZZLES.md`
- `specialist-skills/rental-puzzle-designer/SKILL.md`、必要索引及变更记录
- `game/src/perspective-demo.ts`、相关 CSS、测试和 `game/offline-demo.html`
- `artifacts/management/QUALITY_GATE_TASK-014.md`、`artifacts/handoffs/TASK-014.md`

## 验收
- [x] 五处谜题各有可见线索、拖动物件、分步图像反馈；未完成动作无法取证。
- [x] 鼠标拖动、手机触控、键盘替代均可完成；错误拖放可恢复且无扣款。
- [x] 两视角共享案卷插画风格并可完成五证据、五项匹配和 $500 虚构结算。
- [x] 案例来源与虚构改编逐项映射；Skill 前置/路径/manifest 经静态检查，不改既有岗位/审批规则。官方 quick_validate 因缺 PyYAML NOT_RUN。
- [x] TypeScript、模型测试、浏览器端到端及离线构建/打开验证。

## CEO 审批
当前反馈明确授权本地 Demo 玩法迭代与策划 Skill；G3 真人试玩、正式风格冻结、扩关和发布仍待单独批准。
