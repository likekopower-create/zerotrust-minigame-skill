# Tap Training starter handoff

This is a protocol demonstration, not a finished educational minigame. Replace its mechanics/art and set the game ID consistently in manifest, SDK, mock host and rules.

Run a static HTTP server from the parent `starter` folder. Open `/game/index.html` for standalone practice and `/test-host.html` for embedding. Python example: `python -m http.server 8780 --bind 127.0.0.1`.

Files: index.html entry; game.js mechanics/lifecycle; sdk.js transport; style.css presentation; manifest.json game metadata. No external packages, audio, images, account login or Supabase access are used.

Demo score: 5 accepted button taps ends the round; rawScore=50, metrics.taps=5. Mock host awards 10 mock points on completion. These are not approved production rewards. Replay requires a new host-issued run. Practice replay is local only.

Resources in this starter are code/CSS/text authored for the handoff and contain no downloaded media. For your finished game list every dependency and third-party asset with its license and attribution requirement here.

Record: controls, game rules, raw score formula/bounds, end conditions, round timing, replay policy, host reward proposal, build/export commands if used, supported browsers, dependency versions, asset licenses, test steps/results, and untested constraints. Refer to ../../../references/developer-guide.md in the complete kit or the accompanying Word manual when this game is shared separately.

