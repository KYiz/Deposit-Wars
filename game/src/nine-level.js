(() => {
  'use strict';
  const levels = window.NINE_LEVELS;
  if (!Array.isArray(levels) || levels.length !== 9) throw new Error('Nine-level data is missing.');
  const $ = id => document.getElementById(id);
  const stateByRoute = new Map();
  let levelIndex = 0;
  let role = 'tenant';
  const roleName = { tenant: '租客', landlord: '房东' };
  const tabs = [];

  function currentLevel() { return levels[levelIndex]; }
  function currentRoute() { return currentLevel().roles[role]; }
  function stateKey() { return `${levelIndex}-${role}`; }
  function currentState() {
    const key = stateKey();
    if (!stateByRoute.has(key)) stateByRoute.set(key, { collected: [], marked: [], selected: null });
    return stateByRoute.get(key);
  }
  function allItems() {
    return currentRoute().cases.flatMap(problem => problem.items.map(item => ({ ...item, problem })));
  }
  function itemById(id) { return allItems().find(item => item.id === id); }
  function tell(message) { $('room-toast').textContent = message; }

  function drawTabs() {
    tabs.forEach((button, index) => {
      button.setAttribute('aria-current', String(index === levelIndex));
      const saved = stateByRoute.get(`${index}-${role}`);
      button.classList.toggle('done', !!saved && saved.marked.length === 2);
    });
  }
  function drawStatus() {
    const level = currentLevel(), state = currentState();
    $('room-title').textContent = `第 ${level.number} 关 · ${level.home}`;
    $('room-type').textContent = level.room;
    $('room-art').src = level.background;
    $('room-art').alt = `${level.home}的${level.room}插画`;
    $('mark-progress').textContent = `标注 ${state.marked.length} / 2`;
    $('inventory-count').textContent = `${state.collected.length} / ${level.capacity}`;
    $('tenant-role').setAttribute('aria-pressed', String(role === 'tenant'));
    $('landlord-role').setAttribute('aria-pressed', String(role === 'landlord'));
    $('next-level').disabled = state.marked.length !== 2 || levelIndex === levels.length - 1;
    $('next-level').textContent = levelIndex === levels.length - 1 ? '九关终点 ✓' : '下一关 →';
    $('room-stage').classList.toggle('mark-mode', !!state.selected);
    drawTabs();
  }
  function drawInventory() {
    const level = currentLevel(), state = currentState(), container = $('inventory-slots');
    container.replaceChildren();
    for (let index = 0; index < 6; index++) {
      const slot = document.createElement('button');
      slot.type = 'button';
      slot.className = 'inventory-slot';
      if (index >= level.capacity) {
        slot.classList.add('locked'); slot.disabled = true;
        slot.setAttribute('aria-label', '本关未开放的物品卡槽');
      } else if (index >= state.collected.length) {
        slot.classList.add('empty'); slot.disabled = true;
        slot.setAttribute('aria-label', '空物品卡槽');
      } else {
        const item = itemById(state.collected[index]);
        const picture = document.createElement('img');
        picture.src = item.src; picture.alt = '';
        slot.append(picture);
        slot.dataset.itemId = item.id;
        slot.dataset.caseId = item.problem.id;
        slot.title = item.problem.title;
        slot.setAttribute('aria-label', `选择线索：${item.problem.title}`);
        slot.classList.toggle('selected', state.selected === item.id);
        slot.classList.toggle('used', state.marked.includes(item.problem.id));
        slot.addEventListener('click', () => {
          state.selected = state.selected === item.id ? null : item.id;
          drawInventory(); drawStatus();
          tell(state.selected ? '已选中线索。点击房间里有问题的位置进行标注。' : '已取消选择。');
        });
      }
      container.append(slot);
    }
  }
  function pickup(item, isDecoy) {
    const state = currentState();
    if (isDecoy) { tell('这件物品与当前视角的问题无关，继续观察房间。'); return; }
    if (state.collected.includes(item.id)) return;
    if (state.collected.length >= currentLevel().capacity) { tell('物品栏已满。先标注已发现的问题。'); return; }
    state.collected.push(item.id);
    drawInventory(); drawStatus(); drawScene();
    tell(`找到线索：${item.problem.cue}。已收入物品栏。`);
  }
  function makePickup(item, isDecoy, position) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'pickup';
    button.dataset.itemId = item.id;
    if (!isDecoy) button.dataset.caseId = item.problem.id;
    if (isDecoy) button.classList.add('decoy');
    button.style.left = `${position[0]}%`;
    button.style.top = `${position[1]}%`;
    button.style.width = `${position[2]}%`;
    button.style.height = `${position[3]}%`;
    button.setAttribute('aria-label', isDecoy ? '检查房间物品' : `拿起线索物件：${item.problem.cue}`);
    const img = document.createElement('img'); img.src = item.src; img.alt = ''; img.draggable = false;
    button.append(img);
    let start = null;
    button.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      event.preventDefault();
      button.setPointerCapture(event.pointerId);
      start = { x: event.clientX, y: event.clientY };
      button.classList.add('dragging');
    });
    button.addEventListener('pointermove', event => {
      if (!start) return;
      button.style.transform = `translate(${event.clientX - start.x}px,${event.clientY - start.y}px) rotate(-5deg)`;
    });
    button.addEventListener('pointerup', () => {
      if (!start) return;
      start = null;
      button.classList.remove('dragging');
      button.style.transform = '';
      pickup(item, isDecoy);
    });
    button.addEventListener('pointercancel', () => { start = null; button.classList.remove('dragging'); button.style.transform = ''; });
    button.addEventListener('click', event => { if (event.detail === 0) pickup(item, isDecoy); });
    return button;
  }
  function itemPosition(problem, caseIndex, itemIndex) {
    const [x, y, w, h] = problem.zone;
    if (itemIndex === 0) return [x, y, Math.min(w, 17), Math.min(h, 28)];
    if (itemIndex === 1) return [Math.min(85, x + (caseIndex === 0 ? 12 : -10)), Math.min(76, y + 23), 12, 19];
    return [Math.max(3, x + (caseIndex === 0 ? -4 : -15)), Math.min(77, y + 37), 11, 17];
  }
  function mark(problem) {
    const state = currentState();
    if (state.marked.includes(problem.id)) { tell('这里已经标注过了。'); return; }
    if (!state.selected) { tell('先从物品栏选一件线索，再点击问题位置。'); return; }
    const item = itemById(state.selected);
    if (!item || item.problem.id !== problem.id) {
      state.selected = null; drawInventory(); drawStatus();
      tell('线索和这个区域不对应；标注没有计分。请重新选一件线索。'); return;
    }
    if (!problem.items.every(part => state.collected.includes(part.id))) {
      tell('这个问题还缺另一件物品，请继续找。'); return;
    }
    state.marked.push(problem.id); state.selected = null;
    drawInventory(); drawStatus(); drawScene();
    tell(`标注正确：${problem.truth}${state.marked.length === 2 ? ' 本关完成！' : ''}`);
  }
  function drawScene() {
    const route = currentRoute(), state = currentState();
    const problems = $('problem-layer'), items = $('item-layer');
    problems.replaceChildren(); items.replaceChildren();
    route.cases.forEach((problem, caseIndex) => {
      const target = document.createElement('button');
      target.type = 'button'; target.className = 'problem-zone';
      target.dataset.caseId = problem.id;
      const [x, y, w, h] = problem.zone;
      target.style.left = `${x}%`; target.style.top = `${y}%`; target.style.width = `${w}%`; target.style.height = `${h}%`;
      target.setAttribute('aria-label', `标注可疑位置：${problem.cue}`);
      target.classList.toggle('marked', state.marked.includes(problem.id));
      target.addEventListener('click', event => { event.stopPropagation(); mark(problem); });
      problems.append(target);
      problem.items.forEach((item, itemIndex) => {
        if (!state.collected.includes(item.id)) items.append(makePickup({ ...item, problem }, false, itemPosition(problem, caseIndex, itemIndex)));
      });
    });
    const decoy = route.decoy;
    const opposite = currentLevel().roles[role === 'tenant' ? 'landlord' : 'tenant'].cases[0];
    items.append(makePickup({ ...decoy, problem: { cue: '普通摆设' } }, true, itemPosition(opposite, 0, 0)));
  }
  function render(message) {
    drawStatus(); drawInventory(); drawScene();
    tell(message || `第 ${currentLevel().number} 关：拖动可疑物件，正确线索进入物品栏。`);
  }

  levels.forEach((level, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = `${String(level.number).padStart(2, '0')} ${level.home}`;
    button.addEventListener('click', () => { levelIndex = index; render(); });
    $('level-nav').append(button); tabs.push(button);
  });
  $('tenant-role').addEventListener('click', () => { role = 'tenant'; render(); });
  $('landlord-role').addEventListener('click', () => { role = 'landlord'; render(); });
  $('retry-level').addEventListener('click', () => { stateByRoute.delete(stateKey()); render('本关已重置，可以重新寻找和标注。'); });
  $('next-level').addEventListener('click', () => { if (currentState().marked.length !== 2 || levelIndex === 8) return; levelIndex++; render(); });
  $('room-stage').addEventListener('click', event => {
    if (event.target.closest('.pickup,.problem-zone')) return;
    if (currentState().selected) tell('这里没有与所选线索对应的问题；换个位置试试。');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && currentState().selected) {
      currentState().selected = null; drawInventory(); drawStatus(); tell('已取消选择。');
    }
  });
  render();
})();
