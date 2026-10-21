# LEVEL-001：Sunny Side Studio

版本 1.0｜TASK-003｜来源核读：2026-10-22｜单一虚构出租屋。下述 `$100` 是游戏分数卡，不是现实索赔判断。

## 案例选取与事实边界

| 母题 | Case ID 与可核来源 | 核实状态与改编边界 |
|---|---|---|
| 厨房旁厕所 | RC-038 [ABC 报道](https://www.abc.net.au/news/2022-06-28/south-australian-building-codes-apartment-with-loo-in-kitchen/101190682) | 招租房设施有报道；不引用其建筑合规争议结论。|
| 浴室蘑菇 | RC-039 [ABC 采访](https://www.abc.net.au/news/2017-02-21/australians-share-their-rental-horror-stories/8277394) | 报道可核，事件细节是受访者自述；不复制家庭经历。|
| 房主仍在屋里 | RC-040 [ABC 同篇采访](https://www.abc.net.au/news/2017-02-21/australians-share-their-rental-horror-stories/8277394) | 报道可核，细节是另一位受访者自述；与 RC-039 不是同一事件。|
| 限制时段的入口 | RC-042 [ABC 核对招租广告](https://www.abc.net.au/news/2024-09-19/sydney-rental-rules-tenant-has-no-access-during-day/104364382) | 招租条件经报道；游戏中的儿童活动室与门禁时刻均虚构。|
| 未点燃蜡烛扣款 | RC-037 [Tenancy Deposit Scheme 案例](https://www.tenancydepositscheme.com/app/uploads/2025/04/Case_Study_The_Candle_clause_April_2025_v1.pdf) | 机构裁决摘要；游戏只取“有蜡烛却无损失”的视觉反差，不输出制度结论。|

除 RC-039 外，其余四项均在 `TOP_10.md`；RC-039 的单场景可视性高。RC-044 曾作为宣传照片候选，源文实际是**房产销售**而非出租争议，因此未进入五个缺陷；案例库中的分类偏差已记录，待后续研究维护。所有图、词、人物、地名和物件重新创作。

## 场景设定

虚构海滨城市的一间微型二楼 studio。左边为厨房和帘后卫生间，中间为客厅/桌椅，右边是折叠柜及门，前景为浴室角落。门外只出现无品牌、无真实地址的彩色儿童活动室剪影。房东以手机聊天气泡出现，不做可玩角色。入场广告卡写 `Private bath · Entire studio · Anytime access · Spotless & safe`，这些均是**游戏内虚构承诺**。在退租前一刻，房东预扣五项各 `$100`；玩家进入核对。

## 五个缺陷玩法表

| ID / 来源 | 可见荒诞线索 | 玩家操作与隐藏信息 | 正确证据 | 房东反应 / 押金反馈 |
|---|---|---|---|---|
| D1 / RC-038 | 帘子上写 `PRIVATE BATH`，马桶轮廓却贴着微波炉，第一眼可点。 | 点击/拉开帘子，厕所与灶台同框；再点 phone 的 `Private bath` 卡完成对照。 | `Bathroom beside kitchen` 现场卡 + 虚构广告承诺；无真实现场照片。 | `It's a breakfast spa!`；取证提示可保住 `$100`，反击 `Bathroom claim` 后返还 `$100`。 |
| D2 / RC-039 | 浴室小黄鸭不断被滴水弹起，墙角绿伞形影子。 | 点黄鸭/掀开排水挡板，水珠和三只卡通蘑菇弹出；再点开裂缝看到旧滴水线。 | `Leaking shower corner`，带游戏内“入场已存在”标签。 | `You started a garden?`；对应 `New damage` 扣款，正确反击返 `$100`。 |
| D3 / RC-040 | 柜门缝伸出一只花色不合的拖鞋，桌上有两支牙刷。 | 打开柜门，发现折叠床和写 `OWNER'S NOOK` 的虚构纸牌；查看 phone 的 `Entire studio`。 | `Hidden occupant nook` + 游戏内独享广告卡。 | `A free roommate!`；对应 `Extra guest` 扣款，反击返 `$100`。不塑造真实人物。 |
| D4 / RC-042 | 入口门把手是夸张的时钟，门外画满蜡笔太阳。 | 点门把，时钟跳到白天；门牌翻出 `EXIT CLOSED 9–5`。对照 phone 的 `Anytime access`。 | `Timed entrance sign` + 游戏内承诺。 | `Just schedule your life better!`；对应 `Door misuse` 扣款，反击返 `$100`。门禁为玩具化动画，非现实安全建议。 |
| D5 / RC-037 | 桌上巨大透明罩只罩一支小小的未点燃生日蜡烛，房东预贴 `FIRE DAMAGE!`。 | 点罩，转动蜡烛看完整烛芯；再点桌面和墙面，均无烟痕；phone 记录一张成组检查卡。 | `Unlit candle · No marks` 两个可见事实组成一张卡；不让玩家靠法律文字答题。 | `The flame was... potential!`；对应 `Fire damage` 扣款，反击返 `$100`。 |

每处的“隐藏信息”通过动作露出，不靠读长段合同；每张证据卡与一张扣款卡一一对应。房东表情/押金数字在匹配成功的同一瞬间反馈。

## 关卡脚本与分支

1. **入场**：房东气泡 `Five charges. Your deposit: $500.`；镜头已展示 D1 帘子，手形图标微动。引导 `Pull to inspect`，玩家点帘后获得 D1 的第一条线索；phone 自动展开广告短句，提示点 `Compare`，产出首张证据。
2. **自由检查**：其余四处不限顺序。发现时物件放大并播放 1–2 秒滑稽反应，随后给出 `Compare / Record`。已检查地点留下小勾；未检查保持轮廓暗示。
3. **结案入口**：取得至少一张证据即可按 `Face landlord`。未取满时弹 `You can still inspect 4 spots`，可继续或进入部分结算。
4. **反击**：每轮房东出一张扣款卡；玩家从已得证据卡里选择匹配。正确则 `$100 returned`，房东变脸。错误卡弹回并给轻提示 `Look for the matching place`，不失钱、不消耗证据。卡片在本关中可重复查看。
5. **成功**：五项全反击成功，显示 `Full deposit back! $500 / $500`，可重玩并看到虚构卡通剧照。
6. **暂时失败/补救**：若证据不足或主动跳过，显示 `Still disputed: $X`；按钮 `Back to inspect` 返回原房间，状态保留，补证后继续。无永久失败、计时惩罚或锁死。退出再进是否持久化由 G2 原型测试决定；本关运行内必须保留。

## 提示阶梯

对同一未解缺陷 20 秒无操作：热点轻摆；再 20 秒显示一句位置提示（`That curtain looks suspicious`）；再次请求才给动作提示（`Try pulling it`）。反击错误两次后证据与目标卡出现同图标边框。提示可关闭，使用与否计入试玩数据。玩家随时可按 `Show me a hint`，不会减少押金。

## 内容容量与修剪顺序

首关固定五处，不加第六个。若 5 分钟过长，先删 D5 的“转动蜡烛”一步（保留烛芯与无痕同屏），其次缩短五轮房东动画；保留五个缺陷和证据反击闭环。若首轮找茬太简单，改画面提示强度，不增加文字或工具。
