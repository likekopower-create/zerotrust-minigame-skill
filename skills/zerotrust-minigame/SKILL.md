---
name: zerotrust-minigame
description: Build a standalone HTML5 minigame for ZERO TRUST SIMULATOR using the included starter and versioned result protocol, or prepare its integration into Simulation. Use when a developer or AI needs to create a compatible game without the main project.
---

# ZERO TRUST SIMULATOR minigame development

This package is a portable handoff. Do not require the main game, a Google account, or Supabase credentials to build and test a minigame.

## Read first

- Read [the developer contract](references/developer-guide.md) before implementation. It distinguishes the existing Tetris module from the proposed external game protocol `zt-minigame/1`.
- Use [the starter](assets/starter/) for an independently playable HTML5 game and a mock parent harness. Copy it to a new game folder; replace the demonstration game and its scoring rule rather than editing Simulation.
- When integrating into the main project, read [the integration checklist](references/integration.md). The production host adapter does not exist in the current project snapshot. Never claim that passing mock tests proves live score sync.

## Workflow

1. Identify game ID, mechanics, end condition, raw score range, round duration, replay policy, and resource licenses. Propose unresolved gameplay choices; do not invent an approved leaderboard reward.
2. Deliver `index.html`, local JS/CSS/assets, `manifest.json`, and handoff instructions. Use relative paths. No absolute disk paths, secrets, direct Supabase calls, global score storage keys, or dependence on the parent DOM.
3. Support direct launch and iframe mode. Use the included SDK handshake and submit a final result once per round. Retry the same result with the same event ID; never convert retries to new rewards.
4. Keep raw game score separate from awarded Simulation points. The host applies an approved rule and validates source/origin, game, session, run, event, and bounds. The client protocol is not proof against cheating.
5. Pause input, simulation timers, and sound when paused or hidden. Resume only when appropriate. Stop resources when leaving. Fit touch screens in portrait and landscape and retain keyboard controls when useful.
6. Test standalone and mock embedding, duplicate result/retry, malformed payload, wrong source/origin, pause/resume, replay, and narrow/wide viewports. Run the included tests and document actual results and untested items.
7. Hand off source plus manifest, score rule proposal, dependency/license list, and test record. Do not publish, change database permissions, or modify the main project unless that work is requested.

## Boundaries

The starter host is an in-memory test tool and cannot write real scores. An integrator must add a production adapter, a game registry and, for trustworthy rankings, authoritative result validation and durable idempotency. Existing `PlayerStatsManager.recordMinigameScore` adds a delta without deduplication. Never call it twice for the same accepted result or send a cumulative total as a delta.
