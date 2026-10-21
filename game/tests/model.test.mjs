import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFECTS } from '../src/content.ts';
import { GameSession } from '../src/model.ts';

test('M1: D1 completes the full inspect → evidence → rebuttal → settlement loop', () => {
  let clock = 0;
  const game = new GameSession(() => clock);
  assert.equal(game.faceLandlord(), false);
  clock = 500;
  game.open('D1');
  assert.equal(game.firstOpenAt, 500);
  assert.equal(game.record('D1'), false);
  assert.equal(game.act('D1').done, true);
  assert.equal(game.record('D1'), true);
  assert.equal(game.evidenceCount, 1);
  assert.equal(game.faceLandlord(), true);
  assert.equal(game.match('D1', 'D1'), true);
  assert.equal(game.returned, 100);
  game.finish();
  assert.equal(game.phase, 'settlement');
  assert.equal(game.events.at(-1).type, 'level_finish');
});

test('M2: five approved defects each need their own interaction count and can return full deposit', () => {
  const game = new GameSession();
  for (const defect of DEFECTS) {
    game.open(defect.id);
    for (let i = 0; i < defect.steps.length; i++) {
      assert.equal(game.act(defect.id).done, i === defect.steps.length - 1, defect.id);
    }
    assert.equal(game.record(defect.id), true, defect.id);
  }
  assert.equal(game.evidenceCount, 5);
  game.faceLandlord();
  for (const defect of DEFECTS) assert.equal(game.match(defect.id, defect.id), true);
  assert.equal(game.returned, 500);
  assert.equal(game.phase, 'settlement');
  assert.equal(game.isComplete, true);
  assert.equal(game.events.filter((e) => e.type === 'evidence_collected').length, 5);
  assert.equal(game.events.filter((e) => e.type === 'evidence_match' && e.value === true).length, 5);
});

test('M3: wrong evidence costs nothing; return to room preserves progress and permits recovery', () => {
  const game = new GameSession();
  game.open('D1'); game.act('D1'); game.record('D1');
  game.open('D3'); game.act('D3'); game.record('D3');
  game.faceLandlord();
  assert.equal(game.match('D1', 'D3'), false);
  assert.equal(game.returned, 0);
  assert.equal(game.states.D1.wrongMatches, 1);
  assert.equal(game.match('D1', 'D1'), true);
  game.finish();
  assert.equal(game.returned, 100);
  game.backToRoom();
  assert.equal(game.states.D1.resolved, true);
  assert.equal(game.states.D3.evidence, true);
  for (const id of ['D2', 'D4', 'D5']) {
    const defect = DEFECTS.find((d) => d.id === id);
    game.open(id);
    for (const _ of defect.steps) game.act(id);
    game.record(id);
  }
  game.faceLandlord();
  for (const id of ['D2', 'D3', 'D4', 'D5']) game.match(id, id);
  assert.equal(game.returned, 500);
});

test('M3: hints advance at most two levels and a new session starts clean', () => {
  const first = new GameSession();
  assert.equal(first.hint('D1'), 'That curtain looks suspicious.');
  assert.equal(first.hint('D1'), 'Try pulling the curtain.');
  assert.equal(first.hint('D1'), 'Try pulling the curtain.');
  first.open('D1'); first.act('D1'); first.record('D1');
  const second = new GameSession();
  assert.equal(second.evidenceCount, 0);
  assert.equal(second.returned, 0);
  assert.equal(second.phase, 'inspect');
});
