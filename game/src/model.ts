import { DEFECTS, DEFECT_BY_ID, type DefectId } from './content.ts';

export type Phase = 'inspect' | 'rebuttal' | 'settlement';
export type DefectState = { opened: boolean; step: number; evidence: boolean; resolved: boolean; wrongMatches: number; hintLevel: number };
export type GameEvent = { type: string; elapsedMs: number; defectId?: DefectId; value?: string | number | boolean };

export class GameSession {
  private readonly now: () => number;
  private readonly emit?: (event: GameEvent) => void;
  readonly startedAt: number;
  readonly states: Record<DefectId, DefectState>;
  readonly events: GameEvent[] = [];
  phase: Phase = 'inspect';
  active: DefectId | null = null;
  firstOpenAt: number | null = null;
  lastActivityAt: number;

  constructor(now: () => number = () => Date.now(), emit?: (event: GameEvent) => void) {
    this.now = now;
    this.emit = emit;
    this.startedAt = this.now();
    this.lastActivityAt = this.startedAt;
    this.states = Object.fromEntries(DEFECTS.map((d) => [d.id, { opened: false, step: 0, evidence: false, resolved: false, wrongMatches: 0, hintLevel: 0 }])) as Record<DefectId, DefectState>;
    this.log('level_start');
  }

  private log(type: string, defectId?: DefectId, value?: string | number | boolean): void {
    const event = { type, elapsedMs: Math.max(0, this.now() - this.startedAt), ...(defectId ? { defectId } : {}), ...(value !== undefined ? { value } : {}) };
    this.events.push(event);
    this.emit?.(event);
  }

  touch(): void { this.lastActivityAt = this.now(); }
  get evidenceCount(): number { return DEFECTS.filter((d) => this.states[d.id].evidence).length; }
  get resolvedCount(): number { return DEFECTS.filter((d) => this.states[d.id].resolved).length; }
  get returned(): number { return this.resolvedCount * 100; }
  get isComplete(): boolean { return this.resolvedCount === DEFECTS.length; }
  get unresolved(): DefectId[] { return DEFECTS.map((d) => d.id).filter((id) => !this.states[id].resolved); }

  open(id: DefectId): DefectState {
    if (this.phase !== 'inspect') throw new Error('Return to room before inspecting.');
    this.active = id;
    const state = this.states[id];
    if (!state.opened) {
      state.opened = true;
      this.log('first_hotspot_open', id);
      if (this.firstOpenAt === null) this.firstOpenAt = this.now();
    }
    this.touch();
    return state;
  }

  act(id: DefectId): { done: boolean; text: string } {
    if (this.phase !== 'inspect' || this.active !== id) throw new Error('Inspect this spot first.');
    const state = this.states[id];
    const steps = DEFECT_BY_ID[id].steps;
    if (state.step >= steps.length) return { done: true, text: steps.at(-1)!.reveal };
    const result = steps[state.step];
    state.step++;
    this.touch();
    if (state.step === steps.length) this.log('defect_revealed', id);
    return { done: state.step === steps.length, text: result.reveal };
  }

  record(id: DefectId): boolean {
    if (this.phase !== 'inspect' || this.active !== id || this.states[id].step < DEFECT_BY_ID[id].steps.length) return false;
    const state = this.states[id];
    if (!state.evidence) {
      state.evidence = true;
      this.log('evidence_collected', id);
    }
    this.touch();
    return true;
  }

  hint(id: DefectId): string {
    const state = this.states[id];
    state.hintLevel = Math.min(2, state.hintLevel + 1);
    this.log('hint_shown', id, state.hintLevel);
    this.touch();
    return state.hintLevel === 1 ? DEFECT_BY_ID[id].locationHint : DEFECT_BY_ID[id].actionHint;
  }

  faceLandlord(): boolean {
    if (this.phase !== 'inspect' || this.evidenceCount === 0) return false;
    this.phase = 'rebuttal';
    this.active = null;
    this.log('face_landlord', undefined, this.evidenceCount);
    this.touch();
    return true;
  }

  match(chargeId: DefectId, evidenceId: DefectId): boolean {
    if (this.phase !== 'rebuttal' || this.states[chargeId].resolved || !this.states[evidenceId].evidence) return false;
    const correct = chargeId === evidenceId;
    this.log('evidence_match', chargeId, correct);
    this.touch();
    if (correct) {
      this.states[chargeId].resolved = true;
      if (this.isComplete) this.finish();
    } else {
      this.states[chargeId].wrongMatches++;
    }
    return correct;
  }

  finish(): void {
    this.phase = 'settlement';
    this.log('level_finish', undefined, this.returned);
    this.touch();
  }

  backToRoom(): void {
    this.phase = 'inspect';
    this.active = null;
    this.log('return_to_room');
    this.touch();
  }
}
