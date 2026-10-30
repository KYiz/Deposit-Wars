# TASK-019：当前 G2 项目备份到 GitHub

status: IN_PROGRESS
stage: G2；仅源码与策划工件入库，不发布游戏
DRI: 游戏程序员
support: 项目经理（任务与状态）、QA（提交及远端核验）
date: 2026-10-30

## 目标

依据 CEO“当前工作上传到 GitHub”的指令，将 TASK-018 截止的本地项目提交并推送到 CEO 的 GitHub 仓库。无既有远端时建立私有项目仓库。

## 输入

`shared/PROJECT_STATE.md`、`shared/WORKFLOW.md`、`shared/DECISION_RIGHTS.md`、当前 Git 工作树与忽略规则。

## 交付

- Git 提交和 GitHub 私有仓库远端；忽略依赖、构建与临时输出。
- `artifacts/management/QUALITY_GATE_TASK-019.md`、`artifacts/handoffs/TASK-019.md`、`shared/PROJECT_STATE.md` 与任务队列更新。

## 验收

- [ ] 待提交文件与体积、敏感信息经过检查；没有依赖目录、临时测试输出或凭据。
- [ ] TASK-018 的 Demo、九关数据与美术、策划 Skill 和项目记录均纳入 Git 提交。
- [ ] GitHub 私有仓库创建成功，远端分支指向本地提交；远端文件可核验。
- [ ] 工作树干净，记录提交 SHA 和仓库链接；不声称游戏已上线。
