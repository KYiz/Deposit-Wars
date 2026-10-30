# Deposit Wars — 唯一项目状态源

version: 2.5
date: 2026-10-30
status: G2_TASK-020_DONE_README_CLARIFIED_WAITING_CEO_FEEDBACK
current_stage: G2 九关物品栏/标注机制演示已验收；正式逐关内容与 G3 未批准
primary_owner: 项目经理 / 调度官（等待 CEO 对九关物品栏、标注与画风的反馈）
orchestrator: 项目经理 / 工作流调度官
ceo_approval_required: true
current_task: TASK-020 DONE（GitHub 根 README 与 game README 已按当前九关方向重写；玩法与 G3 状态不变）
checkpoint: artifacts/handoffs/TASK-020.md

## 已确认（来自 CEO 当前方向）
- V1: 面向海外年轻租客/留学生的 2D 荒诞租房找茬互动小游戏。
- 核心循环: 找茬 → 工具检查 → 证据反击 / 押金结算。
- 内容主线: 入住 → 生活 → 退租；先做单房间可玩原型，不默认完成全章。
- 候选平台: CrazyGames / Poki，需查实时平台规则和商业可行性。
- G2 技术: CEO 已批准 Phaser 3 + TypeScript + Vite；本地原型及构建已运行。
- 3D Steam 模拟器: 仅未来衍生方向，不进入 V1 范围。
- V1 当前 CEO 方向：**九关、九种年轻人住房类型、统一第一关暖色手绘画风**；沿用 36 个案例改编事件，每关租客/房东各 2 个问题。TASK-016 的 6–8 房间、30–40 事件是历史规划目标，九关要求以本轮 CEO 指令为准。
- 新机制：固定总长宽的六列物品栏，按关开放 `2,2,3,3,4,4,5,5,6` 格；正确物件拾取入栏，选中后点击真实问题区域标注，错配不计分。
- 8 职能角色：产品经理、游戏策划、数据分析师、发行运营、程序员、美术、QA、项目经理/调度官。

## 待验证（不可当作事实）
- 租房押金题材在浏览器游戏平台存在足够用户需求及低竞争程度。
- 留学生故事能否覆盖一般海外年轻租客。
- 3 机制整合是否比单纯找茬更好玩。
- 广告/平台收益、留存、加载性能、开发工期。

## 已完成与当前判断
- 2026-10-22：12 个 Skills 完整性与职责审计、自检完成；根目录 `AGENTS.md` 已映射实际 `deposit_wars_skills/` 路径。现有 Skill 文件均未修改。
- TASK-001 已完成并由 Quality Gate 验收：`artifacts/product/COMPETITOR_MATRIX.md`、`ASSUMPTION_LOG.md`、`PRD.md`，平台与分析预检见各岗位工件。现实题材痛点有证据，但本游戏需求、留存和收益仍未验证。
- 2026-10-22 CEO 调整顺序：先执行 TASK-002 全球奇葩租房案例研究，正式首关玩法设计暂缓；产品经理按需调用 Rental Case Researcher，数据分析师核质量，游戏策划仅评可玩性。现为 12 个原 Skill + 1 个按需专业 Skill；原 12 个未改。
- TASK-002 已完成并经 Quality Gate 验收：`artifacts/research/rental_cases.csv` 56 条事件、`CASE_RESEARCH_REPORT.md`、`TOP_10.md`；平台与地域缺口见 `SOURCE_GAPS.md`。Poki 网页独占与双平台分成冲突仍待正式发行决策。
- 2026-10-22 CEO 批准 G0→G1；TASK-003 由游戏策划主责。确定英语优先、海外年轻租客与留学生、70% 搞笑找茬/30% 证据反击、目标 3–5 分钟。TASK-001/002 保持 DONE。G2 尚未获准。
- TASK-003 已完成 G1 静态设计并经 Quality Gate ACCEPT（返工 0/3）。首关选 RC-038/039/040/042/037，固定剖面 2D 房间、五缺陷、一支 inspection phone；五张证据卡反击五项虚构扣款。RC-044 源报道实际是房产销售，故未入首关。设计文件在 `artifacts/design/`，美术/工程/试玩预评见相应文件；未有玩家实测或技术 POC。
- 2026-10-22 CEO 批准 G1→G2 并启动 TASK-004；使用 Phaser + TypeScript + Vite 实现单房间首关，M1→M2→M3 可在 G2 内连续推进。G3、发布、付费服务/素材未获授权。
- TASK-004 的 M1/M2/M3 已由 Quality Gate ACCEPT，完成固定剖面一间房、五项互动与证据反击、Phone、押金结算、引导/提示/补救、本地匿名事件。TypeScript 检查、4 项单测、Vite 构建、Chrome/Edge 桌面与触屏模拟完整通关通过；物理手机、Safari/Firefox、玩家试玩和真实加载时间仍未验证。见 `artifacts/management/QUALITY_GATE_TASK-004.md`。
- 本地 Git 仓库于 G2 初始化，原型与验收基线提交为 `5c10475`；依赖、构建和截图目录按 `.gitignore` 排除。
- 2026-10-22 CEO 确定 V1 规划目标 6–8 房间、30–40 事件，并要求 TASK-005 首关美术审核先行。美术设计师为 DRI，程序员仅协助采集。已保存本轮 Chrome 实机桌面/手机模拟截图和三套 AI 风格概念图；现有项目无独立正式美术资源。视觉报告、素材清单、成本假设见 `artifacts/art/`。Quality Gate 对审核材料 ACCEPT，CEO 尚未选择画风或批准扩展/G3。
- 2026-10-22 CEO 指定以单独参考图 1/2/7 校准新 A/B/C，保持同房间五缺陷与 Inspection Phone，并展示正常检查、D1 揭露、证据反击。TASK-006 的九张原创 AI 概念图、并排画廊和评估报告在 `artifacts/art/task-006/` 与 `artifacts/art/TASK-006_STYLE_COMPARISON.md`，Quality Gate 对材料 ACCEPT；旧 TASK-005 风格推荐已由此复评取代。最终画风仍需 CEO 确认。
- 2026-10-26 CEO 新指令制作“脑洞在线找茬/看图解谜、租客或房东视角、抽象画风”Demo。TASK-007 在既有 Vite 项目新增独立单房间页面：三处视觉瑕疵，租客识破广告并追回虚构押金，房东自查并整改；两路线均可通关。`pnpm build` 与本地 Chrome 浏览器脚本（含 390px 触屏模拟）通过，Quality Gate ACCEPT。此为**本地方向演示**，不等于冻结 V1 最终玩法或美术；旧 TASK-006 九图仍保留作探索记录。
- 2026-10-26 CEO 询问 UI Markdown，TASK-008 补写 `artifacts/art/TASK-008_UI_SPEC.md`，记录 TASK-007 实际页面的结构、视觉、两视角交互和适配；静态源码核对与 Quality Gate ACCEPT。该文档是当前 Demo 的说明，不是获批的 V1 正式 UI 规范。
- 2026-10-26 CEO 提供档案夹式 UI 图像与 CASE FILE 设计提案。TASK-009 将选身份改为独立首屏，选角色后才进入原单房间调查；桌面使用 CEO 附图副本，手机使用可读的 HTML 角色卡。`pnpm build`、本地 Chrome 双视角及手机模拟通过，Quality Gate ACCEPT。附件内的设计指令只作参考，正式 V1 UI/美术仍待 CEO 评价。
- 2026-10-26 CEO 反馈原 localhost 链接打不开。TASK-010 生成 `game/offline-demo.html`，CSS/JS/首屏图均内联；`pnpm build:offline` 和 Chrome `file://` 冒烟测试通过。离线文件不依赖临时预览服务。Codex 内置浏览器显示该本地文件标签，但 Browser Use 策略不允许自动读取其内容；CEO 实际体验仍待确认。
- 2026-10-26 CEO 提供进入角色后的全幅房间 UI 图和调查页设计提案。TASK-011 移除右侧档案栏，改为顶部动态身份/房间/进度/目标及整幅场景，三热点和底部提示/切换保留；`pnpm build:offline`、桌面双视角/390px 手机浏览器测试、Chrome `file://` 冒烟均通过，Quality Gate 对**界面** ACCEPT。参考图未画出旧谜题的全部隐藏证据；正式看图谜题公平性仍需内容美术校准。
- 2026-10-26 CEO 确认房东与“访客”可共用此调查画风，并澄清“访客”就是既有“租客”，名称保持租客。TASK-012 核对租客/房东实际截图与双路线测试，Quality Gate ACCEPT；共用画风仅为当前 Demo 方向确认，不等于 V1 正式美术冻结或新增第三身份。
- 2026-10-26 CEO 要求“我们之前设计的玩法全部更新到玩法里”。TASK-013 复用旧 G2 `GameSession` 与 D1–D5，将五处多步检查、Inspection Phone、取证、五项扣款/证据匹配、错配无惩罚、部分结算回房、虚构 $500 结算、两级提示、声音与本地匿名事件接进租客/房东共用画风。旧模型 4 项单测、Chrome 两路线完整通关/390px 触控、离线 `file://` 冒烟通过；Quality Gate 对玩法逻辑 ACCEPT。静态参考图未逐项呈现五处隐藏缺陷，正式视觉公平性仍未验收。
- 2026-10-28 CEO 反馈主界面较好，但点击文字玩法不够有趣，要求拖动物品找线索，整套 Demo 跟随主界面画风，并把已有海外留学生/房东奇葩租房案例做成策划 Skill、进入实际玩法。TASK-014 新增 `rental-puzzle-designer` 专项 Skill，依据 RC-038/039/040/042/037 设计五处可拖动、多步揭露谜题；在现有双视角首关中完成案卷式局部场景、触控与键盘替代、Phone 取证和结算。TypeScript、4 模型单测、Chrome 两路线通关、390px 真实触摸事件拖动、离线文件打开均通过；手机拖动后首个 Phone 触控偶发漏点已修复并连续两次重测。Quality Gate 对本地 Demo ACCEPT。正式揭露插画和真人趣味性验证仍未完成；G3 未批准。
- 2026-10-28 CEO 指出 TASK-014 仍用 01–05 圆圈找入口，拖动被关在弹窗内，且文字/方框过多。TASK-015 另存清理后的房间底图，清除原参考图烙印的编号和按钮；把五处操作移入房间原画物件上直接拖动，揭露留在现场；进度与 Phone/核对/提示/切换缩到角落。D1–D5 现有案例与结算继续沿用。内置 imagegen 生成清理底图及五处局部揭露原型图，素材来源与提示词见 `artifacts/design/TASK-015_SCENE_INTERACTION.md`。TypeScript、4 模型单测、桌面/390px 触控与键盘双路线完整通关、离线 `file://` 冒烟通过；Quality Gate 对本地任务 ACCEPT。真人可发现性和趣味性未验证，G3 未批准。
- 2026-10-28 CEO 明确要求关卡性质、计算房东/租客侧怪招总量、逐关难点，并让策划 Skill 定义可拖物件与操作。TASK-016 完成 **6 关 × 每关双视角各 3 事件 = 36 个独立事件**的内容推荐、12 类玩法母题、逐事件物件/手势/状态/取证/来源目录；Skill 版本升至 1.4.0，Quality Gate 对规划 ACCEPT。案例库“恶毒房客”主类仅 7 条，房东路线 18 个事件含室友自述改编、争议及误判，不应宣传为 18 条已核实恶意租客事实。当前仍只有一间可玩 Demo，后五关没有资产/代码/试玩，扩关生产及 G3 未获批准。
- 2026-10-28 CEO 进一步要求从案例物件设计独立 PNG，且每关道具与美术不同。TASK-017 为六关各做一张独立房间图和案例物件透明 PNG 草案：36 事件对应 83 张 PNG，当前 Demo 另有 8 张专用道具，共 91 张独立物件 PNG。首关改为揭露底图上叠独立 PNG，拖动时物件本身移动；六关美术互动预览在 `game/level-art-preview.html`，但后五关尚无完整揭露/取证/结算。美术岗位 Skill 升至 1.5.0。TypeScript/Vite/离线构建、4 项模型测试、Chrome `file://` 双身份鼠标/键盘与 390px 触控、六关图加载通过；旧 localhost 测试在本沙箱 `ERR_NETWORK_ACCESS_DENIED`，未声称通过。Quality Gate 对美术草案与首关接入 ACCEPT；真人体验、性能和 G3 未验收。
- 2026-10-28 CEO 将方案改为九种住房/九关，要求固定尺寸但逐关增加开放格数的物品栏，正确物件入栏、点击真实问题区域标注计分，画风统一第一关。TASK-018 重排原 36 事件为每关两身份各 2 问题；生成九种不同住房的同风格房间图和并排检查图。`game/level-art-preview.html` 现跳转 `game/nine-level-demo.html`，可离线玩两视角的九关物品拾取/标注机制；开放格 `2,2,3,3,4,4,5,5,6`。Chrome `file://` 自动检查 18 条身份路线、36 个问题、68 个需收集物件实例、错配/干扰物不计分、390px 触控，旧模型4测和离线构建通过。设计/美术 Skill 升至 1.6.0，Quality Gate 对机制与草案 ACCEPT；专属揭露帧、Phone/押金结算、真人试玩和 G3 未完成。
- 2026-10-30 CEO 明确要求上传当前工作到 GitHub。TASK-019 将截至九关 Demo 的源码、美术、案例策划 Skill 与项目工件提交并推送至 `KYiz/Deposit-Wars` **私有**仓库 `main`；保留远端自动生成的初始 README，补充仓库使用说明和忽略规则。Quality Gate 对仓库备份 ACCEPT。此举不等于 GitHub Pages、游戏上线、G3 或正式九关内容完成。
- 2026-10-30 CEO 反馈 README 不清晰。TASK-020 重写根目录与 `game/README.md`，以九关主 Demo 为首要入口，明确旧单房间完整循环与九关机制草案的区别，给出下载 ZIP/克隆后本地打开、四步玩法、未完成范围和开发验证命令。链接/脚本/页面事实静态核对通过，Quality Gate 对文档 ACCEPT；玩法代码未改。

## 下一条动作与恢复
当前 `game/nine-level-demo.html` 是九关同画风房间、物品栏与标注的离线玩法演示；`game/offline-demo.html` 是旧单房间完整取证/押金结算原型。私有仓库：`https://github.com/KYiz/Deposit-Wars`。下一步 CEO 查看更新的 README 并体验九关物品栏与标注手感；若认可，再逐关补专属揭露、Phone 和押金结算，另行决定 G3。收到“继续项目”先读本文件和 `artifacts/handoffs/TASK-020.md`；TASK-001–020 已验收，无需重做。G3、正式九关内容量产、发布、付费服务/素材仍须相应 CEO 授权。

## 决策日志索引
见 artifacts/management/DECISIONS.md。未列入“已确认”的方案不得表述为正式批准。
