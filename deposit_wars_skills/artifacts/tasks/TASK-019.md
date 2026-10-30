# TASK-019：当前 G2 项目备份到 GitHub

status: DONE（Quality Gate ACCEPT；私有仓库远端已推送）
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

- [x] 待提交 222 文件约 130.38 MiB，最大 15.15 MiB；检查路径与文本，未纳入依赖、临时测试输出或凭据。
- [x] TASK-018 的 Demo、九关数据与美术、策划 Skill 和项目记录已提交。
- [x] `KYiz/Deposit-Wars` 私有仓库已创建；`main` 已推送，远端文件核验见 Quality Gate。
- [x] 最终提交与工作树状态核验记录于 Quality Gate；仓库链接 `https://github.com/KYiz/Deposit-Wars`。游戏未上线。
