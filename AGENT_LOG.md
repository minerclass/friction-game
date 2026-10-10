# Agent Log

Append-only record of automated and agent-assisted changes to this repository.
Newest entry first. No participant data, committee or faculty names, credentials,
or tokens.

---

## 2026-10-10 - v2: sixty-second sort, classic preserved, explainer short

**New play loop.** `index.html` is now a ten-card sort from an eighteen-card bank
(`scenarios.js`) with a sixty-second clock that pauses while the verdict is read.
Every answer explains itself (dimension, threat, what would calibrate it) and the
end screen names recurring confusions instead of only scoring.

**Classic preserved.** The original four-stage design simulation moved unchanged
to `classic/` (its dead `style.css` moved with it). The game hub link still resolves.

**Short.** `shorts/calibration.html` is a deterministic timeline (`window.__seek`)
rendered to `calibration.mp4` and `calibration-wide.mp4` by `render/render.mjs`.
Rendered in a container without font access, so the MP4s carry a fallback sans;
re-render locally to bake in Space Grotesk.

**Framework check.** Infrastructure stays beneath the map as a rail, not a quadrant.
The Grind corner remains a map region, not an answer category.

**Verified.** Headless playthrough at 390px and 1280px: no script errors, no horizontal
overflow, score arithmetic matches a scripted pattern of misses.

---

## 2026-09-01 - Adopt the shared ink, and fix a pre-existing credit-line failure

**Token adoption.** Text and dim colours now come from the shared tokens with pre-adoption
fallbacks. Dim text improves from 6.48 to **8.48**.

**Ground and dimension colours kept local.** `--bg` and the four friction-dimension colours
(`--noetic`, `--rhet`, `--exis`, `--infra`) are this simulation's signal, not decoration.

**Contrast repair.** `.credit` used a hardcoded `#5d6975`, measuring **3.40** against the
ground. It now uses `--dim`, which resolves to the shared muted ink at 8.48.

**Note for the next agent: `style.css` in this repo is dead.** `index.html` does not link
it; the live styles are the inline `<style>` block. Edit the inline block. The orphaned
file still contains an old `:root`, which is misleading when grepping.

**Verified.** Zero failures, down from two; tightest pair 8.02.

**Measurement limitation, stated plainly.** This is an interactive piece: most of its
content appears only after play begins, so the contrast probe covered the landing screen
(13 text-bearing elements) and not deeper game states. Those are unmeasured, not verified
clean.
