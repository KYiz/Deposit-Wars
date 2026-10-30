import { DEFECTS, DEFECT_BY_ID, type DefectId } from './content.ts';
import { GameSession, type GameEvent } from './model.ts';
import './perspective-demo.css';
import './investigation.css';
import './full-game.css';
import './scene-play.css';

type Role = 'tenant' | 'landlord';
type LocalDefect = {
  short: string; title: string; hook: string; steps: string[]; reveals: string[];
  listing: string; reality: string; evidence: string; charge: string; excuse: string;
  locationHint: string; actionHint: string; visual: string;
};

// The five approved G1 defects use the G2 model. These are localized display strings only.
const content: Record<DefectId, LocalDefect> = {
  D1: { short: '帘子', title: '“独立”卫浴', hook: '帘子挂在餐桌旁。这里真能算独立卫浴吗？', steps: ['拉开帘子'], reveals: ['帘后马桶与餐桌、微波炉几乎连成一排。'], listing: '独立卫浴', reality: '卫浴紧贴厨房与餐桌', evidence: '卫浴与餐桌同框', charge: '卫浴使用不当', excuse: '这是早餐水疗区！', locationHint: '先看餐桌旁那道帘子。', actionHint: '拉开帘子，看它后面是什么。', visual: '局部检查：帘子与厨房' },
  D2: { short: '墙画', title: '淋浴角的小花园', hook: '装饰画旁的水痕延伸到墙面；漏水像是旧问题。', steps: ['移开挡板', '沿水痕检查'], reveals: ['滴水处冒出三朵滑稽的小蘑菇。', '水痕从墙里延伸出来，入住前就已存在。'], listing: '入住时淋浴角干净无损', reality: '旧渗水与蘑菇', evidence: '旧漏水现场记录', charge: '新增墙面损坏', excuse: '你把这里种成花园了？', locationHint: '看看墙画附近不规则的水痕。', actionHint: '移开遮挡，再沿水痕检查。', visual: '局部检查：墙面与旧水痕' },
  D3: { short: '橱柜', title: '“整间”出租屋', hook: '柜子旁多出一双鞋，屋里还有第二套生活用品。', steps: ['打开橱柜'], reveals: ['柜中弹出折叠床和“房东的小角落”纸牌。'], listing: '整间房只供你使用', reality: '柜中藏有房东休息角', evidence: '隐藏的房东角落', charge: '额外访客', excuse: '这叫免费室友！', locationHint: '橱柜旁的鞋是谁的？', actionHint: '打开橱柜看看。', visual: '局部检查：橱柜与鞋' },
  D4: { short: '门锁', title: '有时间表的出口', hook: '入口门锁上有奇怪的计时装置。', steps: ['中午测试门锁', '翻开门牌'], reveals: ['时钟转了，门却没开。', '门牌写着“9:00–17:00 不可出入”。'], listing: '随时出入', reality: '白天有时段门禁', evidence: '门禁时段牌', charge: '门锁使用不当', excuse: '把你的生活排进时间表就好！', locationHint: '看右侧入口的门锁。', actionHint: '试门锁，再翻开门牌。', visual: '局部检查：入口门锁' },
  D5: { short: '茶几', title: '幽灵火灾', hook: '茶几上的小蜡烛旁，贴着夸张的“火灾损坏”标签。', steps: ['拿开玻璃罩', '检查烛芯', '检查墙面和桌面'], reveals: ['蜡烛完整地放在罩子里。', '烛芯干净，从未点燃。', '桌面和墙面都没有烟痕或烧痕。'], listing: '火灾损坏扣款', reality: '蜡烛未点燃，也无损坏', evidence: '完整烛芯与无痕桌面', charge: '火灾损坏', excuse: '火焰在精神上存在过！', locationHint: '看看茶几上那张夸张的标签。', actionHint: '拿开罩子，检查烛芯和桌面。', visual: '局部检查：茶几与蜡烛' }
};

type DragStep = { object: string; icon: string; target: string; targetIcon: string; scene: string; find: string };
// Fictional, illustrated interactions adapted from the five documented case motifs.
const dragPuzzles: Record<DefectId, DragStep[]> = {
  D1: [{ object: '帘子', icon: '▥', target: '拉到一旁', targetIcon: '⇢', scene: '厨房旁的帘子挡住了视线', find: '🚽　帘后马桶与厨房同框！' }],
  D2: [
    { object: '装饰画', icon: '▣', target: '移开画框', targetIcon: '⇢', scene: '画框下沿有旧水痕', find: '🍄　画后有三朵小蘑菇！' },
    { object: '水痕放大镜', icon: '⌕', target: '沿水痕检查', targetIcon: '≋', scene: '水珠一路延伸到墙角', find: '💧　旧水线从墙内延伸出来。' }
  ],
  D3: [{ object: '柜门', icon: '▤', target: '打开柜子', targetIcon: '⇢', scene: '一只不属于租客的拖鞋露在柜外', find: '🛏　柜里竟藏着折叠床和房东角落牌！' }],
  D4: [
    { object: '时钟门把', icon: '◷', target: '试着开门', targetIcon: '▯', scene: '门把手像一只倒走的时钟', find: '🔒　中午试门，门却纹丝不动。' },
    { object: '门牌', icon: '▧', target: '翻过门牌', targetIcon: '⇢', scene: '门牌的背面似乎写了什么', find: '🕘　门牌写着 9:00–17:00 不可出入！' }
  ],
  D5: [
    { object: '玻璃罩', icon: '◠', target: '移开罩子', targetIcon: '⇢', scene: '一枚小蜡烛被夸张标为“火灾损坏”', find: '🕯　罩下的蜡烛完好无损。' },
    { object: '放大镜', icon: '⌕', target: '查看烛芯', targetIcon: '🕯', scene: '烛芯上似乎没有灰', find: '✨　烛芯干净，根本没点过。' },
    { object: '检查卡', icon: '▧', target: '核对桌面', targetIcon: '▤', scene: '桌面和墙面看起来都很完整', find: '✓　桌面和墙面都没有烟痕。' }
  ]
};

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => document.getElementById(id) as T;
const ids = DEFECTS.map(defect => defect.id);
let role: Role | null = null;
let selectedRole: Role | null = null;
let session: GameSession | null = null;
let selectedCharge: DefectId = 'D1';
let lastFocus: HTMLElement | null = null;
let soundOn = true;
let audio: AudioContext | null = null;
let idleHinted = false;
const sessionId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `local-${Date.now()}`;

function logEvent(event: GameEvent): void {
  try {
    const key = 'deposit-wars-dual-view-events';
    const events = JSON.parse(localStorage.getItem(key) || '[]') as unknown[];
    events.push({ sessionId, role, ...event });
    localStorage.setItem(key, JSON.stringify(events.slice(-300)));
  } catch { /* Private browsing may block storage. */ }
}

function beep(success = true): void {
  if (!soundOn) return;
  try {
    audio ??= new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = success ? 'sine' : 'triangle';
    oscillator.frequency.setValueAtTime(success ? 560 : 190, audio.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(success ? 850 : 130, audio.currentTime + .11);
    gain.gain.setValueAtTime(.045, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .15);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(); oscillator.stop(audio.currentTime + .16);
  } catch { /* Sound is optional. */ }
}

function openModal(kicker: string, html: string): void {
  lastFocus = document.activeElement as HTMLElement;
  $('modal-kicker').textContent = kicker;
  $('modal-content').innerHTML = html;
  const heading = $('modal-content').querySelector('h2');
  if (heading) heading.id = 'modal-title';
  $('modal').classList.remove('hidden');
  $('modal').setAttribute('aria-hidden', 'false');
  $<HTMLButtonElement>('modal-close').focus();
}

function closeModal(): void {
  $('modal').classList.add('hidden');
  $('modal').setAttribute('aria-hidden', 'true');
  session?.touch();
  lastFocus?.focus();
}

function update(message?: string): void {
  const count = session?.evidenceCount || 0;
  const returned = session?.returned || 0;
  $('progress-text').textContent = `${count}/5`;
  $('deposit-text').textContent = `$${returned} / $500`;
  $('phone-count').textContent = String(count);
  if (message) $('scene-status').textContent = message;
  renderScene();
  const face = $<HTMLButtonElement>('face-button');
  face.textContent = '$';
  face.setAttribute('aria-label', session?.phase === 'inspect' ? role === 'landlord' ? '核对五项问题' : '与房东核对扣款' : '继续核对或查看结算');
  face.title = face.getAttribute('aria-label') || '';
}

function renderScene(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-scene-object]').forEach(object => {
    const id = object.dataset.sceneObject as DefectId;
    object.hidden = !session || session.phase !== 'inspect' || session.states[id].step !== Number(object.dataset.step);
    object.classList.toggle('hinted', !!session && session.states[id].hintLevel > 0 && !session.states[id].evidence);
  });
  document.querySelectorAll<HTMLElement>('[data-scene-reveal]').forEach(reveal => {
    const id = reveal.dataset.sceneReveal as DefectId;
    reveal.hidden = !session || session.states[id].step < Number(reveal.dataset.stage);
  });
}

function completeSceneStep(object: HTMLButtonElement): void {
  if (!session || session.phase !== 'inspect') return;
  const id = object.dataset.sceneObject as DefectId;
  if (session.states[id].step !== Number(object.dataset.step)) return;
  session.open(id);
  const result = session.act(id);
  if (result.done) session.record(id);
  beep();
  update(result.done ? `发现：${content[id].reality}。证据已存入 Phone。` : content[id].reveals[session.states[id].step - 1]);
}

function attachSceneDrag(object: HTMLButtonElement): void {
  object.addEventListener('pointerdown', event => {
    if (!session || session.phase !== 'inspect' || event.button !== 0) return;
    event.preventDefault();
    object.setPointerCapture(event.pointerId);
    const startX = event.clientX, startY = event.clientY;
    const reveal = document.querySelector<HTMLElement>(`[data-scene-reveal="${object.dataset.sceneObject}"][data-stage="${Number(object.dataset.step) + 1}"]`);
    if (reveal) reveal.hidden = false;
    object.classList.add('dragging');
    const move = (next: PointerEvent) => {
      object.style.transform = `translate(${next.clientX - startX}px, ${next.clientY - startY}px) rotate(-4deg)`;
    };
    const clear = () => {
      object.removeEventListener('pointermove', move);
      object.removeEventListener('pointerup', end);
      object.removeEventListener('pointercancel', cancel);
      object.classList.remove('dragging');
      object.style.transform = '';
    };
    const end = (next: PointerEvent) => {
      const dx = next.clientX - startX, dy = next.clientY - startY;
      const threshold = Math.max(18, $('scene').clientWidth * .035);
      const success = Math.hypot(dx, dy) > threshold;
      clear();
      if (success) completeSceneStep(object);
      else { if (reveal) reveal.hidden = true; beep(false); update('再试试：拖动物件，观察它后面的房间。'); }
    };
    const cancel = () => { clear(); if (reveal) reveal.hidden = true; };
    object.addEventListener('pointermove', move);
    object.addEventListener('pointerup', end);
    object.addEventListener('pointercancel', cancel);
  });
  object.addEventListener('click', event => {
    if (event.detail === 0) completeSceneStep(object); // Keyboard and assistive input.
  });
}

function selectRole(next: Role): void {
  selectedRole = next;
  document.querySelectorAll<HTMLButtonElement>('[data-case-role]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.caseRole === next)));
  $<HTMLButtonElement>('case-enter').disabled = false;
}

function enterRoom(next: Role): void {
  closeModal();
  role = next;
  session = new GameSession(() => Date.now(), logEvent);
  selectedCharge = 'D1';
  idleHinted = false;
  $('case-screen').classList.add('hidden');
  $('investigation-screen').classList.remove('hidden');
  document.body.classList.add('in-investigation');
  $('role-tag').textContent = next === 'tenant' ? '租客' : '房东';
  $('role-description').textContent = next === 'tenant' ? '找出五处矛盾，Phone 取证并反驳扣款。' : '找出五处问题，Phone 记录并核对整改。';
  $('case-progress').classList.toggle('landlord', next === 'landlord');
  update(window.matchMedia('(max-width:700px)').matches ? '拖开帘子 · 左右滑动查看整间房。' : '看看房间里哪里不对劲。试着拖开帘子。');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function returnToCase(preselect: Role | null = null): void {
  closeModal();
  role = null;
  session = null;
  $('investigation-screen').classList.add('hidden');
  $('case-screen').classList.remove('hidden');
  document.body.classList.remove('in-investigation');
  selectedRole = null;
  document.querySelectorAll<HTMLButtonElement>('[data-case-role]').forEach(button => button.setAttribute('aria-pressed', 'false'));
  $<HTMLButtonElement>('case-enter').disabled = true;
  if (preselect) selectRole(preselect);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function inspect(id: DefectId): void {
  if (!session || session.phase !== 'inspect') { update('请先结束核对，或返回房间继续调查。'); return; }
  session.open(id);
  idleHinted = false;
  document.querySelectorAll('.spot.hinted').forEach(spot => spot.classList.remove('hinted'));
  beep();
  renderInspect(id);
}

function renderInspect(id: DefectId, note = ''): void {
  if (!session) return;
  const d = content[id];
  const state = session.states[id];
  const total = DEFECT_BY_ID[id].steps.length;
  const done = state.step >= total;
  const puzzle = dragPuzzles[id][Math.min(state.step, total - 1)];
  const revealed = state.step > 0 ? `<div class="puzzle-found" aria-live="polite">${dragPuzzles[id][state.step - 1].find}</div>` : '';
  openModal(`现场检查 / ${id}`, `
    <h2>${d.title}</h2><div class="modal-meta">${state.evidence ? '证据已记录' : done ? '线索已揭露 · 打开 Phone 对照' : `检查 ${state.step + 1} / ${total}`}</div>
    <div class="puzzle-stage" data-puzzle="${id}" data-step="${state.step}">
      <div class="puzzle-scene"><span class="puzzle-index">海景公寓 · 301 / ${id}</span><span class="puzzle-scene-icon" aria-hidden="true">${puzzle.icon}</span><strong>${puzzle.scene}</strong></div>
      ${revealed}
      ${!done ? `<div class="puzzle-drag-row"><button type="button" class="puzzle-object" id="drag-object" aria-label="拖动${puzzle.object}到${puzzle.target}"><span aria-hidden="true">${puzzle.icon}</span><strong>${puzzle.object}</strong><small>按住并拖动</small></button><div class="puzzle-trail" aria-hidden="true">···➜</div><div class="puzzle-target" id="drag-target" role="img" aria-label="目标：${puzzle.target}"><span aria-hidden="true">${puzzle.targetIcon}</span><strong>${puzzle.target}</strong></div></div>` : '<div class="puzzle-complete">✓　现场动作已完成，可取证</div>'}
    </div>
    <p>${note || (state.step ? d.reveals[state.step - 1] : d.hook)}</p>
    ${!done ? `<button class="puzzle-keyboard" id="do-step" type="button">无法拖动？点此完成“${d.steps[state.step]}”</button>` : `<button class="step-button" id="open-phone-detail" type="button">打开 Inspection Phone 对照 →</button>`}
    <p class="modal-note">${state.evidence ? '这张证据已安全记录，可用于后续核对。' : '只有完成现场检查后，才能在 Phone 中记录证据。'}</p>
  `);
  const completeStep = () => {
    const result = session!.act(id);
    beep(); update(result.done ? `${d.short}：线索已揭露。请打开 Phone 对照。` : result.text);
    renderInspect(id, d.reveals[session!.states[id].step - 1]);
  };
  $('do-step')?.addEventListener('click', completeStep);
  const object = $('drag-object');
  const target = $('drag-target');
  object?.addEventListener('pointerdown', event => {
    if (!target || event.button !== 0) return;
    event.preventDefault();
    object.setPointerCapture(event.pointerId);
    object.classList.add('dragging');
    const startX = event.clientX, startY = event.clientY;
    const move = (next: PointerEvent) => {
      object.style.transform = `translate(${next.clientX - startX}px, ${next.clientY - startY}px) rotate(-5deg)`;
      const bounds = target.getBoundingClientRect();
      target.classList.toggle('ready', next.clientX >= bounds.left && next.clientX <= bounds.right && next.clientY >= bounds.top && next.clientY <= bounds.bottom);
    };
    const end = (next: PointerEvent) => {
      object.removeEventListener('pointermove', move);
      object.removeEventListener('pointerup', end);
      object.removeEventListener('pointercancel', cancel);
      const bounds = target.getBoundingClientRect();
      const landed = next.clientX >= bounds.left && next.clientX <= bounds.right && next.clientY >= bounds.top && next.clientY <= bounds.bottom;
      object.style.transform = '';
      object.classList.remove('dragging');
      target.classList.remove('ready');
      if (landed) completeStep();
      else { beep(false); update('没有放到目标上，可以再试一次。'); }
    };
    const cancel = () => { object.style.transform = ''; object.classList.remove('dragging'); target.classList.remove('ready'); object.removeEventListener('pointermove', move); object.removeEventListener('pointerup', end); object.removeEventListener('pointercancel', cancel); };
    object.addEventListener('pointermove', move);
    object.addEventListener('pointerup', end);
    object.addEventListener('pointercancel', cancel);
  });
  const phoneButton = $('open-phone-detail');
  phoneButton?.addEventListener('click', () => renderPhone(id));
  // Some Chromium touch sequences suppress the first synthesized click after a captured drag.
  phoneButton?.addEventListener('pointerup', event => {
    if (event.pointerType !== 'touch') return;
    event.preventDefault();
    renderPhone(id);
  });
}

function renderPhone(id: DefectId | null = session?.active || null): void {
  if (!session) return;
  const d = id ? content[id] : null;
  const state = id ? session.states[id] : null;
  const ready = !!id && !!state && session.phase === 'inspect' && state.step === DEFECT_BY_ID[id].steps.length;
  const rows = ids.map(item => `<button type="button" data-phone-id="${item}" ${session!.states[item].opened ? '' : 'disabled'}><span>${item}　${content[item].listing}</span><strong>${session!.states[item].evidence ? '✓ 已记录' : session!.states[item].opened ? '查看' : '未检查'}</strong></button>`).join('');
  openModal('INSPECTION PHONE', `
    <h2>${d ? `对照：${d.short}` : '宣传与现场'}</h2>
    <div class="phone-panel"><div class="phone-top">海景公寓 · 原始广告与检查记录</div>
    ${d ? `<div class="phone-compare"><div><small>原本承诺 / 扣款</small><strong>${d.listing}</strong></div><div><small>现场看到</small><strong>${state!.step ? d.reality : '先调查房间'}</strong></div></div>` : `<div class="phone-list">${rows}</div>`}
    </div>
    ${ready && !state!.evidence ? '<button class="step-button" id="record-evidence" type="button">记录这张证据 →</button>' : ''}
    ${state?.evidence ? `<div class="feedback-strip">✓ 已保存：${d!.evidence}。核对对应扣款后可返还虚构 $100。</div>` : ''}
    <p class="modal-note">${d ? '检查现场，再与游戏内广告或扣款卡对照。' : '点击已检查的条目查看详情；未检查的条目暂不可记录。'}</p>
  `);
  document.querySelectorAll<HTMLButtonElement>('[data-phone-id]').forEach(button => button.addEventListener('click', () => renderPhone(button.dataset.phoneId as DefectId)));
  $('record-evidence')?.addEventListener('click', () => {
    if (!id || !session?.record(id)) return;
    beep(); update(`${content[id].evidence} 已记录。`); renderPhone(id);
  });
}

function beginRebuttal(): void {
  if (!session) return;
  if (session.phase === 'settlement') { renderSettlement(); return; }
  if (session.phase === 'rebuttal') { renderRebuttal(); return; }
  if (!session.evidenceCount) {
    beep(false);
    openModal('尚无证据', '<h2>先检查一处线索</h2><p>完成现场动作，用 Inspection Phone 对照并记录证据后，才能开始核对扣款。</p><button class="modal-link" id="stay-room" type="button">返回房间 →</button>');
    $('stay-room').addEventListener('click', closeModal);
    return;
  }
  const proceed = () => { session!.faceLandlord(); selectedCharge = session!.unresolved[0]; update(); renderRebuttal(); };
  if (session.evidenceCount < 5) {
    openModal('提前核对', `<h2>还有 ${5 - session.evidenceCount} 处未取证</h2><p>现在也可以开始；未解决的扣款随时能回房补查。</p><div class="modal-button-row"><button id="stay-room" type="button">继续检查</button><button id="go-anyway" class="primary" type="button">现在核对 →</button></div>`);
    $('stay-room').addEventListener('click', closeModal);
    $('go-anyway').addEventListener('click', proceed);
  } else proceed();
}

function renderRebuttal(note = ''): void {
  if (!session) return;
  if (session.isComplete) { renderSettlement(); return; }
  if (session.states[selectedCharge].resolved) selectedCharge = session.unresolved[0];
  const current = content[selectedCharge];
  const wrong = session.states[selectedCharge].wrongMatches;
  const charges = ids.map(id => `<button type="button" data-charge="${id}" class="${selectedCharge === id ? 'active' : ''}" ${session!.states[id].resolved ? 'disabled' : ''}><span>${content[id].charge}</span><strong>${session!.states[id].resolved ? '已返还' : '−$100'}</strong></button>`).join('');
  const cards = ids.filter(id => session!.states[id].evidence).map(id => `<button type="button" data-evidence="${id}">${id}　${content[id].evidence}</button>`).join('');
  openModal(role === 'landlord' ? '房东自查 / 扣款核对' : '房东扣款 / 证据反击', `
    <h2>已返还 $${session.returned} / $500</h2>
    <p class="modal-note">先点一张扣款卡，再选择对应的证据。配错不会损失押金。</p>
    <div class="charge-grid">${charges}</div>
    <div class="feedback-strip warn">${role === 'landlord' ? '原先的借口' : '房东说'}：“${current.excuse}”</div>
    <div class="modal-meta">${role === 'landlord' ? '检查记录 / 应纠正的扣款' : '你的证据卡'}</div><div class="evidence-grid">${cards}</div>
    ${note ? `<div class="feedback-strip ${note.startsWith('✓') ? '' : 'warn'}">${note}</div>` : ''}
    ${wrong >= 2 ? `<p class="modal-note">提示：这项扣款对应 ${selectedCharge} 的现场记录。</p>` : ''}
    <div class="modal-button-row"><button type="button" id="back-to-room">回房补查</button><button type="button" id="partial-finish">暂时结算</button></div>
  `);
  document.querySelectorAll<HTMLButtonElement>('[data-charge]').forEach(button => button.addEventListener('click', () => { selectedCharge = button.dataset.charge as DefectId; renderRebuttal(); }));
  document.querySelectorAll<HTMLButtonElement>('[data-evidence]').forEach(button => button.addEventListener('click', () => {
    const target = selectedCharge;
    const correct = session!.match(target, button.dataset.evidence as DefectId);
    beep(correct); update(correct ? `${content[target].charge}：$100 已返还。` : '证据与扣款不对应，可重试。');
    if (session!.isComplete) renderSettlement();
    else renderRebuttal(correct ? `✓ ${content[target].charge} 已纠正，返还 $100。` : '这张证据对应另一项扣款，没有金额损失。');
  }));
  $('back-to-room').addEventListener('click', () => { session!.backToRoom(); closeModal(); update('回到房间；已取得的证据与返还金额保留。'); });
  $('partial-finish').addEventListener('click', () => { session!.finish(); update(); renderSettlement(); });
}

function renderSettlement(): void {
  if (!session || !role) return;
  const complete = session.isComplete;
  openModal(complete ? '完整结算' : '部分结算', `
    <h2>${complete ? role === 'landlord' ? '五项问题已核对' : '押金全部拿回来了！' : '还有扣款未解决'}</h2>
    <div class="settlement"><small>虚构押金已返还</small><strong>$${session.returned} / $500</strong><span>${complete ? '五张证据与扣款全部对应。' : `还有 $${500 - session.returned} 可以继续补证。`}</span></div>
    <p>${complete ? role === 'landlord' ? '把问题说清并纠正扣款，房东也能赢得一局。' : '荒唐借口都被现场证据击破。' : '返回房间，已取得的证据与返还金额都会保留。'}</p>
    <div class="modal-button-row">${complete ? '<button type="button" id="replay" class="primary">同身份重玩</button><button type="button" id="flip-role">换个视角</button>' : '<button type="button" id="back-to-room" class="primary">回房补查</button>'}</div>
  `);
  $('replay')?.addEventListener('click', () => enterRoom(role!));
  $('flip-role')?.addEventListener('click', () => returnToCase(role === 'tenant' ? 'landlord' : 'tenant'));
  $('back-to-room')?.addEventListener('click', () => { session!.backToRoom(); closeModal(); update('找出剩余证据后，再核对未解决扣款。'); });
}

function showHint(): void {
  if (!session || session.phase !== 'inspect') { update('核对阶段请选择扣款和相应的证据卡。'); return; }
  const id = session.active && !session.states[session.active].evidence ? session.active : ids.find(item => !session!.states[item].evidence);
  if (!id) { update('五张证据已齐，可以开始核对。'); return; }
  session.hint(id);
  const message = session.states[id].hintLevel === 1 ? content[id].locationHint : content[id].actionHint;
  update(message);
  const object = document.querySelector<HTMLElement>(`[data-scene-object="${id}"][data-step="${session.states[id].step}"]`);
  object?.classList.add('hinted');
  window.setTimeout(() => object?.classList.remove('hinted'), 4000);
  beep();
}

document.querySelectorAll<HTMLButtonElement>('[data-case-role]').forEach(button => button.addEventListener('click', () => selectRole(button.dataset.caseRole as Role)));
$('case-enter').addEventListener('click', () => { if (selectedRole) enterRoom(selectedRole); });
document.querySelectorAll<HTMLButtonElement>('[data-scene-object]').forEach(attachSceneDrag);
$('hint-button').addEventListener('click', showHint);
$('switch-role').addEventListener('click', () => returnToCase());
$('phone-button').addEventListener('click', () => renderPhone(null));
$('face-button').addEventListener('click', beginRebuttal);
$('sound-button').addEventListener('click', () => { soundOn = !soundOn; $('sound-button').textContent = soundOn ? '♪ 声音开' : '♪ 声音关'; $('sound-button').setAttribute('aria-pressed', String(soundOn)); if (soundOn) beep(); });
$('export-events').addEventListener('click', () => {
  let data = '[]';
  try { data = localStorage.getItem('deposit-wars-dual-view-events') || '[]'; } catch { /* No storage permission. */ }
  const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = 'deposit-wars-dual-view-events.json'; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('modal-close').addEventListener('click', closeModal);
$('modal').addEventListener('click', event => { if (event.target === $('modal')) closeModal(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('modal').classList.contains('hidden')) { closeModal(); return; }
  if ($('modal').classList.contains('hidden') && session?.phase === 'inspect' && /^[1-5]$/.test(event.key)) {
    const id = `D${event.key}` as DefectId;
    document.querySelector<HTMLButtonElement>(`[data-scene-object="${id}"]:not([hidden])`)?.focus();
  }
  if (event.key === 'Tab' && !$('modal').classList.contains('hidden')) {
    const focusable = Array.from($('modal').querySelectorAll<HTMLButtonElement>('button:not([disabled])'));
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
window.setInterval(() => {
  if (!session || session.phase !== 'inspect' || !$('modal').classList.contains('hidden')) return;
  const idle = Date.now() - session.lastActivityAt;
  const next = ids.find(id => !session!.states[id].evidence);
  if (!next) return;
  if (idle > 20000) document.querySelector(`[data-scene-object="${next}"]:not([hidden])`)?.classList.add('hinted');
  if (idle > 40000 && !idleHinted) { idleHinted = true; update(`位置提示：${content[next].locationHint}`); }
}, 5000);
update();
