# LEVEL-001 内容与状态字段（G1 设计）

版本 1.0｜仅供 G2 估算及审阅，不是代码或数据文件。

## 关卡记录

`level_id`、`display_name_en`、`starting_deposit=500`、`target_duration_s=180–300`、`listing_claims[4]`、`defects[5]`、`hint_policy`、`success_copy_en`、`partial_copy_en`。货币符号仅为游戏内视觉简写；若英语地区适配测试认为误导，可改成统一虚构代币。

## 每处缺陷必填

| 字段 | 含义 |
|---|---|
| `defect_id` / `source_case_id` / `source_url` / `source_status` | D1–D5 与研究库可追溯链接；来源状态区分报道可核、受访者自述、机构案例。来源元数据不进入玩家界面。|
| `visual_hook` / `hit_area` / `inspect_action` | 主画面第一眼线索、扩大点击区、鼠标/触屏等价动作。|
| `revealed_fact` / `fictional_claim_id` | 玩家操作后看到的事实、关内虚构广告/入住记录承诺。|
| `evidence_label_en` / `evidence_art` | 卡片短英文及原创图像草案。|
| `charge_label_en` / `landlord_line_en` / `deposit_amount` | 一一对应的扣款卡、滑稽气泡、单项 100。|
| `hint_location_en` / `hint_action_en` | 最多两级提示；句子短。|
| `privacy_review` / `adaptation_note` | 确认人物、场景、原文和素材已虚构化；记录与母题的距离。|

## 会话状态与判定

每个 D 有 `seen=false`、`revealed=false`、`evidence_collected=false`、`charge_resolved=false`；教程有 `tutorial_seen`，提示有 `hint_level`。`revealed` 只由正确的物件操作触发；`evidence_collected` 要 `revealed=true` 且完成 phone 对照/记录；`charge_resolved` 要该证据与对应扣款匹配。反击顺序不依赖检查顺序。已解决扣款总额为 `100 × resolved_count`，未解决为 `500 - returned`。错误匹配不改变金额。

## 质量和变更约束

G2 若更换源案例或现实母题，须更新 Case ID、URL、核实状态和改编备注并复核内容。任何“房东违法”“应获赔偿”等法律判词不得从案例报道直接迁入英文台词。可玩性调整优先改画面和动作，不增加长文本。
