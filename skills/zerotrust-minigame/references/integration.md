# Integration into Simulation

Status: implementation plan, not an installed production adapter. The demo host is in-memory only. No SQL changes or real score writes are included in this handoff.

## Registry example

Maintain this on the trusted host side after review. Never accept a game-supplied reward as authorization.

```javascript
const registry = {
  'tap-training': {
    entry: 'Mini-Games/tap-training/index.html',
    allowedOrigin: location.origin,
    protocol: 1,
    rawMin: 0,
    rawMax: 50,
    // Demo only; owner must approve the production reward.
    reward: p => p.outcome === 'completed' && p.rawScore === 50 ? 10 : 0
  }
};
```

Resolve entry relative to the actual Simulation document/base. Current local app lives inside `ZERO TRUST SIMULATOR.V0.0.3/ZERO TRUST SIMULATOR`; deployments may copy it to repo root. Do not hardcode `../../` into every imported game. Keep all game asset paths relative to its own entry.

## Receive and persist flow

1. Create one active game session and server-issued run where authoritative scoring is required. Keep the account identity on the host/server, never accept player_id from the game as authority.
2. Receive only from the active iframe and its registered origin. Validate the envelope, registered game, active session/run, result schema and bounds. Restrict payload size and rate; the demo validator covers its small result schema only.
3. Apply host-approved reward mapping. `rawScore` is not necessarily leaderboard points. Reject outcomes/metrics that cannot represent a valid finish.
4. Deduplicate by player/game/run and event. Same accepted event returns the previous receipt; another event for a finished run is rejected. Retire run on exit and reject late results.
5. For a prototype, the existing `window.PlayerStatsManager.recordMinigameScore(delta, gameId)` updates local score. It does not provide durable idempotency or anti-cheat. In production, implement an atomic server validation/receipt/award operation and reconcile the local snapshot through the existing revision-controlled save path. Do not independently award via both the old RPC and a new award RPC.
6. Acknowledge the actual persistence level. A local save is not a confirmed Supabase write. Display cloud state from existing sync events/UI; do not fake cloud acknowledgement.
7. On replay issue a new run, not a new event pretending to finish the same run. On pause/hidden stop timers/input/audio; on close stop and unload the iframe.

## Existing score flow to preserve

`PlayerStatsManager.recordMinigameScore` in `js/main.js` adds a delta to `minigameScore`, recalculates `totalScore = missionScore + minigameScore`, appends `{type:'minigame',game,points,timestamp}`, and updates localStorage/UI/Ranking hooks. It has no internal deduplication.

`js/cloud-data.js` saves through `save_v003_player_data(p_stats,p_progression,p_blocktown_answers,p_expected_revision)`. `js/cloud-sync.js` polls changed snapshots when ready, handles authenticated vs guest state, user choice of local/cloud data, and revision conflicts. Keep these responsibilities on the parent.

Current Tetris credits deltas while playing. Do not also award its final score through the new result adapter. This protocol is for new independent games unless Tetris is deliberately migrated in a separate change with credit behavior tested.

## Production acceptance

- Test the imported game on both root and nested app paths.
- Test account switch, logout, offline, reconnect, late messages, duplicate result, replay, reload, two tabs/devices, and revision conflict.
- Verify exact local/cloud totals before and after; test that rejected results do not change missionScore, minigameScore, history or the receipt ledger.
- Inspect imported same-origin code/dependencies. An iframe does not by itself make hostile same-origin JavaScript safe. Use reviewed code or isolation design suited to the source. Do not pass authentication tokens to the game.
- If sandbox makes origin opaque (`null`), this SDK/host contract does not support it; design a reviewed transport rather than weakening checks to accept every sender.
- Do not widen RLS or expose service keys to make the demo work. New scoring database changes require a separate migration and review against actual deployed schema.
