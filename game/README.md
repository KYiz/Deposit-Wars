# Deposit Wars — Sunny Side Studio playable prototype

G2 / TASK-004. English first. This is one fictional room with five case-inspired defects. It is a local prototype, not a published game or legal guide.

## Start

Requires Node.js 24+ for the bundled TypeScript test command, and pnpm 11+. From this `game` directory:

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Open the local address printed by Vite (normally `http://localhost:5173/`). For a production build, run `pnpm build` then `pnpm preview`. Refresh the page to start a new run.

## Play

1. Tap the highlighted curtain beside the microwave. On a narrow phone, swipe the room sideways to see the closet and exit.
2. Inspect each suspicious item. D2, D4 and D5 have more than one inspection step.
3. Open the **Inspection Phone** to compare the fictional listing with the room, then record evidence. The phone is the only tool.
4. Select **Face landlord**. Choose a charge and its matching evidence card. Wrong matches have no deposit penalty.
5. If you finish with unresolved charges, select **Back to inspect** and continue. Five correct rebuttals return `$500 / $500` in this fictional scoring system.

**Controls:** mouse click or touch; on keyboards press `1`–`5` to open room spots, `Esc` to close dialogs, and `Tab` to reach labeled buttons. **Hint** and sound toggle are under the room. The local playtest log export is in the footer. No events are sent to a server.

## Verify

```powershell
pnpm typecheck
pnpm test
pnpm build
pnpm test:browser
```

`test:browser` launches local Chrome or Edge. Set `BROWSER_PATH` to another Chromium executable if neither is at the common Windows path. It generates screenshots in ignored `test-output/`. The browser suite covers full desktop and emulated 390×844 touch playthrough, partial settlement recovery, refresh reset, and local event logging. Physical phones, Safari, Firefox, actual platform SDKs, and advertising are outside this G2 check.

## Scope and provenance

Design baseline: `../deposit_wars_skills/artifacts/design/LEVEL_001.md` and `GDD.md`. Source IDs RC-038/039/040/042/037 are traceability metadata; no source images, identities, addresses, or original text are shipped. The visual scene is programmatic placeholder art in Phaser and may be replaced later. G3 requires a separate CEO decision.
