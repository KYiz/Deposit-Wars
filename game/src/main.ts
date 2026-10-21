import Phaser from 'phaser';
import { DEFECTS, DEFECT_BY_ID, type DefectId } from './content.ts';
import { GameSession, type GameEvent } from './model.ts';
import { RoomScene } from './room.ts';
import './style.css';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const body = $<HTMLDivElement>('dialog-body');
const backdrop = $<HTMLDivElement>('dialog-backdrop');
const title = $<HTMLElement>('dialog-title');
const kicker = $<HTMLElement>('dialog-kicker');
const status = $<HTMLElement>('status');
const viewport = $<HTMLDivElement>('game-viewport');
const scene = new RoomScene();
let soundOn = true;
let audio: AudioContext | null = null;
let selectedCharge: DefectId = 'D1';
let idlePrompted = false;
const sessionId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `local-${Date.now().toString(36)}`;

function storeEvent(event: GameEvent): void {
  try {
    const key = 'deposit-wars-local-playtest';
    const items = JSON.parse(localStorage.getItem(key) || '[]') as unknown[];
    items.push({ sessionId, ...event });
    localStorage.setItem(key, JSON.stringify(items.slice(-300)));
  } catch { /* Private browsing may deny storage. Gameplay continues. */ }
}

let session = new GameSession(() => Date.now(), storeEvent);

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'game',
  backgroundColor: '#173049',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [scene],
  render: { antialias: true }
});
void game;
scene.bind(session);

function beep(success = true): void {
  if (!soundOn) return;
  try {
    audio ??= new AudioContext();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = success ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(success ? 590 : 210, audio.currentTime);
    osc.frequency.exponentialRampToValueAtTime(success ? 880 : 150, audio.currentTime + 0.11);
    gain.gain.setValueAtTime(0.055, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.15);
    osc.connect(gain).connect(audio.destination);
    osc.start(); osc.stop(audio.currentTime + 0.16);
  } catch { /* Audio is optional. */ }
}

function openDialog(mode: string, heading: string, html: string): void {
  kicker.textContent = mode;
  title.textContent = heading;
  body.innerHTML = html;
  backdrop.classList.remove('hidden');
  backdrop.setAttribute('aria-hidden', 'false');
  $<HTMLButtonElement>('close-dialog').focus();
}

function closeDialog(): void {
  backdrop.classList.add('hidden');
  backdrop.setAttribute('aria-hidden', 'true');
  session.touch();
}

function refresh(): void {
  $('deposit').textContent = `$${session.returned} / $500`;
  $('evidence-count').textContent = `${session.evidenceCount} / 5 evidence`;
  $('phone-badge').textContent = String(session.evidenceCount);
  const face = $<HTMLButtonElement>('face-button');
  face.textContent = session.phase === 'inspect' ? 'Face landlord →' : session.phase === 'rebuttal' ? 'Resume rebuttal →' : 'View settlement →';
  scene.redraw();
}

function inspect(id: DefectId): void {
  if (session.phase !== 'inspect') { status.textContent = 'Finish the rebuttal, or return to inspect.'; return; }
  session.open(id);
  idlePrompted = false;
  viewport.classList.remove('idle');
  beep();
  renderDetail(id);
}

function renderDetail(id: DefectId, reaction = ''): void {
  const d = DEFECT_BY_ID[id];
  const s = session.states[id];
  const done = s.step === d.steps.length;
  const next = d.steps[s.step];
  const progress = s.evidence ? 'EVIDENCE SECURED · $100 CAN BE DEFENDED' : done ? 'READY TO RECORD' : `CHECK ${s.step + 1} / ${d.steps.length}`;
  openDialog(`INSPECTION ${d.icon}`, d.title, `
    <div class="tagline">${progress}</div>
    <div class="observation"><span class="obs-icon">${d.icon}</span><p>${reaction || (s.step ? d.steps[s.step - 1].reveal : d.hook)}</p></div>
    ${!done ? `<button class="wide primary" id="do-step" type="button">${next.verb} →</button>` : s.evidence ? '<div class="success-strip">✓ Evidence saved in the Inspection Phone.</div>' : '<button class="wide primary" id="do-record" type="button">Open Inspection Phone →</button>'}
    <p class="small">${done ? 'Compare what was promised with what you found.' : 'A closer look can turn a funny detail into evidence.'}</p>
  `);
  $('do-step')?.addEventListener('click', () => {
    const result = session.act(id);
    beep(); refresh(); renderDetail(id, result.text);
    status.textContent = result.done ? `${d.title}: reveal confirmed. Compare it in your phone.` : result.text;
  });
  $('do-record')?.addEventListener('click', () => renderPhone(id));
}

function renderPhone(id: DefectId | null = session.active): void {
  const d = id ? DEFECT_BY_ID[id] : null;
  const ready = !!d && session.phase === 'inspect' && session.states[d.id].step === d.steps.length;
  const claims = DEFECTS.map((item) => `<div class="phone-list-row"><span>${item.icon}</span><strong>${item.listing}</strong><em>${session.states[item.id].evidence ? '✓' : '○'}</em></div>`).join('');
  openDialog('INSPECTION PHONE', d ? `Compare: ${d.title}` : 'The listing', `
    <div class="phone-frame">
      <div class="phone-header">SUNNY SIDE · ORIGINAL LISTING</div>
      ${d ? `<div class="compare"><div><small>PROMISED</small><strong>${d.listing}</strong></div><div><small>FOUND</small><strong>${session.states[d.id].step ? d.reality : 'Inspect the room first'}</strong></div></div>` : claims}
      ${d ? `<p class="phone-foot">${d.hook}</p>` : '<p class="phone-foot">Find a detail in the room, then open this phone to record the mismatch.</p>'}
    </div>
    ${ready && !session.states[d!.id].evidence ? '<button id="record-evidence" class="wide primary" type="button">Record evidence →</button>' : ''}
    ${d && session.states[d.id].evidence ? '<div class="success-strip">✓ Saved. $100 can be defended.</div>' : ''}
  `);
  $('record-evidence')?.addEventListener('click', () => {
    if (!id || !session.record(id)) return;
    beep(); refresh();
    status.textContent = `${DEFECT_BY_ID[id].evidence} saved. $100 can be defended.`;
    renderPhone(id);
  });
}

function startRebuttal(): void {
  if (session.phase === 'settlement') { renderSettlement(); return; }
  if (session.phase === 'rebuttal') { renderRebuttal(); return; }
  if (!session.evidenceCount) { status.textContent = 'Collect at least one evidence card first. Try the curtain.'; beep(false); return; }
  if (session.evidenceCount < 5) {
    openDialog('BEFORE THE REBUTTAL', `${5 - session.evidenceCount} spots still unchecked`, `
      <p>You can defend what you found now, or inspect the remaining spots first.</p>
      <div class="button-row"><button id="stay-room" type="button">Keep inspecting</button><button id="go-anyway" class="primary" type="button">Face landlord anyway →</button></div>
    `);
    $('stay-room').addEventListener('click', closeDialog);
    $('go-anyway').addEventListener('click', () => { session.faceLandlord(); selectedCharge = session.unresolved[0]; refresh(); renderRebuttal(); });
    return;
  }
  session.faceLandlord(); selectedCharge = session.unresolved[0]; refresh(); renderRebuttal();
}

function renderRebuttal(note = ''): void {
  if (session.isComplete) { renderSettlement(); return; }
  if (session.states[selectedCharge].resolved) selectedCharge = session.unresolved[0];
  const current = DEFECT_BY_ID[selectedCharge];
  const wrong = session.states[selectedCharge].wrongMatches;
  const charges = DEFECTS.map((d) => `<button class="charge ${selectedCharge === d.id ? 'selected' : ''}" data-charge="${d.id}" type="button" ${session.states[d.id].resolved ? 'disabled' : ''}><span>${d.charge}</span><strong>${session.states[d.id].resolved ? 'RETURNED' : '−$100'}</strong></button>`).join('');
  const cards = DEFECTS.filter((d) => session.states[d.id].evidence).map((d) => `<button class="evidence-card" data-evidence="${d.id}" type="button"><span>PHOTO ${d.icon}</span><strong>${d.evidence}</strong></button>`).join('');
  openDialog('LANDLORD REBUTTAL', `$${session.returned} returned so far`, `
    <p class="small">Choose a charge, then tap the evidence that defeats it. Wrong matches cost nothing.</p>
    <div class="charge-list">${charges}</div>
    <div class="landlord-line"><span class="avatar">LL</span><div><small>LANDLORD</small><strong>“${current.landlord}”</strong></div></div>
    <div class="card-label">YOUR EVIDENCE</div><div class="evidence-grid">${cards}</div>
    ${note ? `<div class="${note.startsWith('✓') ? 'success-strip' : 'warning-strip'}">${note}</div>` : ''}
    ${wrong >= 2 ? `<p class="small">Hint: Look for photo ${current.icon}.</p>` : ''}
    <div class="button-row"><button id="back-to-room" type="button">Back to inspect</button><button id="partial-finish" type="button">Finish for now</button></div>
  `);
  body.querySelectorAll<HTMLButtonElement>('[data-charge]').forEach((button) => button.addEventListener('click', () => { selectedCharge = button.dataset.charge as DefectId; renderRebuttal(); }));
  body.querySelectorAll<HTMLButtonElement>('[data-evidence]').forEach((button) => button.addEventListener('click', () => {
    const evidenceId = button.dataset.evidence as DefectId;
    const target = selectedCharge;
    const right = session.match(target, evidenceId);
    beep(right); refresh();
    status.textContent = right ? `${DEFECT_BY_ID[target].landlord} $100 returned!` : 'That evidence fits another charge. Try again.';
    if (session.isComplete) renderSettlement(); else renderRebuttal(right ? `✓ ${DEFECT_BY_ID[target].landlord} $100 returned!` : 'Not a match. No money lost.');
  }));
  $('back-to-room').addEventListener('click', () => { session.backToRoom(); closeDialog(); refresh(); status.textContent = 'Back in the room. Your evidence is still safe.'; });
  $('partial-finish').addEventListener('click', () => { session.finish(); refresh(); renderSettlement(); });
}

function renderSettlement(): void {
  const complete = session.isComplete;
  openDialog(complete ? 'VICTORY' : 'PARTIAL SETTLEMENT', complete ? 'Full deposit back!' : 'Still disputed', `
    <div class="total-card"><small>DEPOSIT RETURNED</small><strong>$${session.returned} / $500</strong><span>${complete ? 'Every silly claim answered.' : `$${500 - session.returned} can still be defended.`}</span></div>
    <p>${complete ? 'The landlord ran out of excuses. Nicely inspected.' : 'No evidence is lost. Return to the room, inspect more, and try again.'}</p>
    <div class="button-row">${complete ? '<button id="play-again" class="primary" type="button">Play again →</button>' : '<button id="back-to-room" class="primary" type="button">Back to inspect →</button>'}</div>
  `);
  $('play-again')?.addEventListener('click', () => location.reload());
  $('back-to-room')?.addEventListener('click', () => { session.backToRoom(); closeDialog(); refresh(); status.textContent = 'Find the remaining evidence.'; });
}

function showHint(): void {
  if (session.phase !== 'inspect') { status.textContent = 'Choose a charge and its matching evidence.'; return; }
  const id = session.active && !session.states[session.active].evidence ? session.active : DEFECTS.find((d) => !session.states[d.id].evidence)?.id;
  if (!id) { status.textContent = 'All evidence found. Face the landlord!'; return; }
  const message = session.hint(id);
  status.textContent = `Hint ${DEFECT_BY_ID[id].icon}: ${message}`;
  idlePrompted = false;
  viewport.classList.remove('idle');
  beep();
}

$('phone-button').addEventListener('click', () => renderPhone());
document.querySelectorAll<HTMLButtonElement>('[data-spot]').forEach((button) => button.addEventListener('click', () => inspect(button.dataset.spot as DefectId)));
$('face-button').addEventListener('click', startRebuttal);
$('hint-button').addEventListener('click', showHint);
$('sound-button').addEventListener('click', () => {
  soundOn = !soundOn;
  $('sound-button').textContent = soundOn ? '♪ Sound on' : '♪ Sound off';
  $('sound-button').setAttribute('aria-pressed', String(soundOn));
  if (soundOn) beep();
});
$('close-dialog').addEventListener('click', closeDialog);
backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeDialog(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeDialog(); return; }
  if (backdrop.classList.contains('hidden') && session.phase === 'inspect' && /^[1-5]$/.test(event.key)) inspect(`D${event.key}` as DefectId);
});
$('export-events').addEventListener('click', () => {
  let data = '[]';
  try { data = localStorage.getItem('deposit-wars-local-playtest') || '[]'; } catch { /* No storage permission. */ }
  const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'deposit-wars-local-playtest.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

setInterval(() => {
  if (session.phase !== 'inspect' || !backdrop.classList.contains('hidden')) return;
  const idle = Date.now() - session.lastActivityAt;
  if (idle > 20000) viewport.classList.add('idle');
  if (idle > 40000 && !idlePrompted) { idlePrompted = true; showHint(); }
}, 5000);

refresh();
