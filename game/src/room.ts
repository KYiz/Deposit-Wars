import Phaser from 'phaser';
import type { DefectId } from './content.ts';
import type { GameSession } from './model.ts';

type Spot = { id: DefectId; x: number; y: number; w: number; h: number };
const SPOTS: Spot[] = [
  { id: 'D1', x: 127, y: 209, w: 130, h: 174 },
  { id: 'D2', x: 34, y: 348, w: 144, h: 100 },
  { id: 'D3', x: 615, y: 204, w: 129, h: 208 },
  { id: 'D4', x: 788, y: 204, w: 126, h: 214 },
  { id: 'D5', x: 415, y: 277, w: 164, h: 125 }
];

export class RoomScene extends Phaser.Scene {
  private session!: GameSession;

  constructor() { super('room'); }

  bind(session: GameSession): void {
    this.session = session;
    if (this.children && this.sys.isActive()) this.redraw();
  }

  create(): void { this.input.enabled = false; this.redraw(); }

  redraw(): void {
    if (!this.session || !this.children) return;
    this.children.removeAll(true);
    const g = this.add.graphics();
    const fill = (x: number, y: number, w: number, h: number, color: number, radius = 0, alpha = 1) => {
      g.fillStyle(color, alpha);
      if (radius) g.fillRoundedRect(x, y, w, h, radius); else g.fillRect(x, y, w, h);
    };
    const line = (x1: number, y1: number, x2: number, y2: number, color: number, width = 3) => {
      g.lineStyle(width, color); g.lineBetween(x1, y1, x2, y2);
    };
    const text = (x: number, y: number, value: string, size = 18, color = '#15344a', weight = 'bold') =>
      this.add.text(x, y, value, { fontFamily: 'Arial, sans-serif', fontSize: `${size}px`, color, fontStyle: weight }).setDepth(2);

    // Fixed cutaway studio: all art is programmatic and replaceable.
    fill(0, 0, 960, 540, 0x173049);
    fill(0, 0, 960, 90, 0x1f4059);
    fill(0, 87, 960, 319, 0xf5e8cb);
    fill(0, 404, 960, 136, 0xb77460);
    fill(0, 405, 960, 12, 0x8d5048);
    for (let x = 0; x < 960; x += 95) line(x, 416, x + 45, 540, 0xa76555, 2);
    text(27, 20, 'SUNNY SIDE STUDIO', 27, '#ffda83');
    text(28, 56, 'Reality inspection • five tiny surprises', 13, '#bbd5d9', 'normal');
    fill(20, 111, 270, 286, 0xe9dbc0, 12);
    fill(305, 111, 449, 286, 0xf9edcf, 12);
    fill(768, 111, 172, 286, 0xe9dbc0, 12);
    line(297, 102, 297, 405, 0xc89573, 8);
    line(761, 102, 761, 405, 0xc89573, 8);

    // Kitchen and its absurd adjacent bathroom.
    fill(28, 196, 92, 148, 0x6fa7a2, 8);
    fill(32, 193, 83, 15, 0x375c67, 4);
    fill(35, 239, 76, 15, 0x293f4a, 4);
    fill(41, 261, 62, 50, 0xd9c9a6, 5);
    text(45, 274, 'MICRO', 15);
    fill(22, 350, 124, 78, 0xa9d9d2, 10);
    fill(29, 376, 108, 18, 0x487e85, 9);
    g.fillStyle(0xf5ce65); g.fillCircle(106, 365, 17);
    g.fillStyle(0x213b53); g.fillCircle(113, 361, 3);
    text(55, 399, this.session.states.D2.step >= 1 ? 'mushrooms!' : 'drip... drip...', 13, '#204653');
    fill(140, 197, 128, 198, this.session.states.D1.step ? 0xd6f0df : 0xf4bd89, 8);
    for (let x = 145; x < 265; x += 20) line(x, 198, x, 388, 0xd98f73, 3);
    if (this.session.states.D1.step) {
      fill(165, 304, 76, 61, 0xffffff, 27);
      fill(184, 283, 38, 44, 0xffffff, 9);
      fill(178, 363, 52, 10, 0x9fb6b2, 4);
      text(151, 208, 'HELLO!', 16, '#2e6974');
    } else {
      text(148, 225, 'PRIVATE', 17, '#673f45');
      text(164, 247, 'BATH', 17, '#673f45');
      text(177, 293, '?', 62, '#e9e1bd');
    }

    // Window, living corner and two toothbrushes.
    fill(323, 151, 224, 94, 0x8dbdc0, 12);
    fill(331, 159, 208, 78, 0xb7d6c9, 8);
    fill(416, 159, 38, 78, 0xffd68b, 16);
    line(434, 150, 434, 247, 0x5c8e98, 6);
    line(322, 201, 548, 201, 0x5c8e98, 6);
    fill(315, 334, 102, 60, 0x486f82, 9);
    fill(324, 317, 84, 26, 0x80a59b, 9);
    fill(353, 272, 18, 61, 0xe8bd8e, 6);
    fill(380, 273, 18, 61, 0xe8bd8e, 6);
    fill(362, 262, 7, 12, 0x6eacb6, 2);
    fill(389, 262, 7, 12, 0xe88573, 2);

    // Desk and comically oversized fire warning.
    fill(424, 346, 171, 20, 0x704e4b, 5);
    fill(438, 366, 15, 53, 0x704e4b);
    fill(563, 366, 15, 53, 0x704e4b);
    fill(493, 298, 7, 45, 0xffe2a2, 2);
    fill(481, 328, 32, 12, 0xffffff, 5);
    fill(456, 283, 82, 61, 0xc3e7de, 30, 0.55);
    fill(457, 264, 103, 25, 0xf5ce65, 5);
    text(467, 268, 'FIRE?', 17, '#70443e');
    if (this.session.states.D5.step > 0) text(487, 308, 'NO', 15, '#2b7771');

    // Closet and door: decorative second shoe points to hidden bed.
    fill(614, 193, 135, 220, 0x73909a, 6);
    fill(624, 203, 115, 199, this.session.states.D3.step ? 0xe3bd8f : 0x8dafaa, 5);
    line(682, 204, 682, 400, 0x466b76, 4);
    g.fillStyle(0xfbd289); g.fillCircle(670, 302, 5); g.fillCircle(694, 302, 5);
    fill(607, 390, 57, 18, 0x9e5e61, 9);
    if (this.session.states.D3.step) { fill(630, 310, 91, 48, 0x416878, 7); text(627, 229, "OWNER'S", 15); text(643, 248, 'NOOK', 15); }
    fill(786, 198, 131, 214, 0x4c7e88, 7);
    fill(797, 209, 109, 193, 0x77a8a5, 5);
    g.fillStyle(0xf2d47e); g.fillCircle(868, 309, 11);
    g.fillStyle(0xf6dfaa); g.fillCircle(850, 237, 30);
    line(850, 237, 850, 216, 0x734c52, 4);
    line(850, 237, 868, 237, 0x734c52, 4);
    if (this.session.states.D4.step > 0) text(795, 350, 'CLOSED', 14, '#f9dfa4');

    // Front lip and room section labels.
    fill(0, 418, 960, 8, 0x233e50);
    text(35, 445, 'KITCHEN + ?', 16, '#ffe6aa');
    text(365, 445, 'LIVING / DESK', 16, '#ffe6aa');
    text(667, 445, 'CLOSET', 16, '#ffe6aa');
    text(825, 445, 'EXIT', 16, '#ffe6aa');
    text(36, 495, 'Tap suspicious objects to investigate', 16, '#d2e7e5', 'normal');

    for (const spot of SPOTS) {
      const state = this.session.states[spot.id];
      g.lineStyle(3, state.evidence ? 0x60d4a5 : 0xffd777, state.evidence ? 0.7 : 0.9);
      g.strokeRoundedRect(spot.x, spot.y, spot.w, spot.h, 12);
      fill(spot.x + 4, spot.y + 3, 30, 26, state.evidence ? 0x2c9777 : 0xe8a85a, 8);
      text(spot.x + 10, spot.y + 6, state.evidence ? '✓' : spot.id.slice(1), 15, '#173049');
    }
  }
}
