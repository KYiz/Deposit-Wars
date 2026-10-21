# TASK-001 平台预检

版本 1.0｜2026-10-22｜状态：公开资料预检，未提交平台审核

| 平台 | 已核实的公开要求 | 对 V1 的影响 |
|---|---|---|
| CrazyGames | [发布阶段](https://docs.crazygames.com/requirements/intro/)：Basic Launch 可先发布但无广告分成；入选 Full Launch 才需完整 SDK 并可谈广告变现。[技术要求](https://docs.crazygames.com/requirements/technical/)：初始下载 ≤50MB，移动端首页资格 ≤20MB，鼠标/触控兼容。[广告要求](https://docs.crazygames.com/requirements/ads/)：只允许平台 SDK 广告，不能打断玩法或把奖励广告当必需进度。 | 网页 2D 可设计适配，但是否入选 Full Launch 和收益均未知；不在原型期集成广告。 |
| Poki | [质量要求](https://developers.poki.com/guide/requirements-quality)：桌面、手机、平板；16:9 自适应；隐身模式可玩；默认阻断外部请求；仅 Poki 广告，不设强制广告墙；需正确 SDK 事件。[上传说明](https://developers.poki.com/guide/adding-your-game) 允许较早期版本申请试玩但经过内容审核。 | 资源须随包提供，存档失败也能玩；短文案与触控设计重要。被收录并不保证。 |
| Poki 合作条款 | [官方合作说明](https://developers.poki.com/guide/revenue-deal-types)：偏好网页独占；非独占可能一次性许可费且无广告分成。实际期限/分成以协议为准。 | 同一游戏双平台同时靠广告分成不可预设。签约/发布前须 CEO 决策。 |

商业判断：免费游玩 + 平台允许广告在机制上可行；无本作真实用户、平台协议或广告后台数据，不能做收入估算。G1 仅设计自然关卡间隔的广告位置，不实施 SDK。平台要求可能变化，正式提交前重新核验。查询日期：2026-10-22。
