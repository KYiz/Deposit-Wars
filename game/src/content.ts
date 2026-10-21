export type DefectId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5';

export type Defect = {
  id: DefectId;
  caseId: string;
  title: string;
  icon: string;
  hook: string;
  steps: { verb: string; reveal: string }[];
  listing: string;
  reality: string;
  evidence: string;
  charge: string;
  landlord: string;
  locationHint: string;
  actionHint: string;
};

// Fictional writing and graphics. Source IDs are traceability metadata, not in-game claims.
export const DEFECTS: readonly Defect[] = [
  {
    id: 'D1', caseId: 'RC-038', title: 'The “private” bathroom', icon: '01',
    hook: 'A PRIVATE BATH curtain hangs beside the microwave.',
    steps: [{ verb: 'Pull the curtain', reveal: 'The toilet is practically sharing breakfast with the microwave.' }],
    listing: 'Private bath', reality: 'Bathroom beside kitchen', evidence: 'Bathroom beside kitchen',
    charge: 'Bathroom claim', landlord: "It's a breakfast spa!",
    locationHint: 'That curtain looks suspicious.', actionHint: 'Try pulling the curtain.'
  },
  {
    id: 'D2', caseId: 'RC-039', title: 'The shower garden', icon: '02',
    hook: 'A rubber duck keeps bouncing under a steady drip.',
    steps: [
      { verb: 'Lift the rubber duck', reveal: 'Three tiny mushrooms wave from the shower corner.' },
      { verb: 'Trace the old drip line', reveal: 'A long water stain runs behind the drain flap.' }
    ],
    listing: 'Spotless shower at move-in', reality: 'Old leak and mushrooms', evidence: 'Leaking shower corner',
    charge: 'New damage', landlord: 'You started a garden?',
    locationHint: 'The duck is getting a shower.', actionHint: 'Lift the duck, then trace the drip.'
  },
  {
    id: 'D3', caseId: 'RC-040', title: 'The “entire” studio', icon: '03',
    hook: 'A second toothbrush and a stray slipper point to the closet.',
    steps: [{ verb: 'Open the closet', reveal: "A fold-out bed pops out beneath an OWNER'S NOOK card." }],
    listing: 'Entire studio to yourself', reality: "Hidden owner's nook", evidence: 'Hidden occupant nook',
    charge: 'Extra guest', landlord: 'A free roommate!',
    locationHint: 'Who owns the second slipper?', actionHint: 'Open the closet.'
  },
  {
    id: 'D4', caseId: 'RC-042', title: 'The clockwork exit', icon: '04',
    hook: 'The entrance handle looks like a giant clock.',
    steps: [
      { verb: 'Test the door at noon', reveal: 'The clock spins, but the door stays shut.' },
      { verb: 'Flip the door sign', reveal: 'The sign says EXIT CLOSED 9–5.' }
    ],
    listing: 'Anytime access', reality: 'Entrance closed 9–5', evidence: 'Timed entrance sign',
    charge: 'Door misuse', landlord: 'Just schedule your life better!',
    locationHint: 'The door is keeping time.', actionHint: 'Test the handle, then flip the sign.'
  },
  {
    id: 'D5', caseId: 'RC-037', title: 'The phantom fire', icon: '05',
    hook: 'A giant FIRE DAMAGE sticker points to one tiny birthday candle.',
    steps: [
      { verb: 'Lift the glass dome', reveal: 'The birthday candle has a perfectly clean wick.' },
      { verb: 'Inspect the wick', reveal: 'The wick is unlit and untouched.' },
      { verb: 'Check the wall and table', reveal: 'No smoke or burn marks anywhere.' }
    ],
    listing: 'Fire damage claim', reality: 'Unlit candle · No marks', evidence: 'Unlit candle · No marks',
    charge: 'Fire damage', landlord: 'The flame was... potential!',
    locationHint: 'That warning sticker is enormous.', actionHint: 'Lift the dome; inspect wick and wall.'
  }
];

export const DEFECT_BY_ID = Object.fromEntries(DEFECTS.map((d) => [d.id, d])) as Record<DefectId, Defect>;
