# Agent Log

Append-only record of automated and agent-assisted changes to this repository.
Newest entry first. No participant data, committee or faculty names, credentials,
or tokens.

---

## 2026-10-10 - v2 repairs from the surface-intel review handoff

Implements `agent-handoff-friction-lab-fixes-2026-10-10.md` (shared Research folder) against
`main @ ed39ee5`.

**Results diagnosis.** `finish()` now counts every directed mismatch (12 pairs) before looking
for copy, so a repeated error outside the old five-entry table can no longer fall through to
"Every miss was a one-off." Four truthful states: all matched, misses with no repeated
direction, repeated direction (named with count), and unsorted timeout cards reported apart.

**Accessibility.** The tutorial is a real modal: focus enters, Tab/Shift+Tab wrap, Escape
skips, the page behind it is `inert`, and number keys are ignored while it is open. A polite
live region announces card changes, verdicts, and results. Enter advances only from the page
body, so a mode toggle never advances a card. "Keys 1–4 to answer; Enter to continue." shown.

**Framework copy.** Answer labeled "exclusion / grind"; the grind convention is explained in
the tutorial before play. Infrastructure summary reworded per the handoff. Four scenario keys
(chatbot, autograder → "generated text submitted without an ownership check", record, flaw)
now rest on missing learning evidence rather than on a tool, anonymity, or recording.

**Play shape.** Untimed is the primary button; the sixty-second round is the replay. The clock
is an accumulated sorting budget (segments open on a card, close on answer, tutorial, or
toggle-off), so untimed wall time cannot produce a false timeout. Optional local reflection
panel after results: not scored, stored, or sent.

**Smaller.** Rail stacks at ≤480px; copy label, timer bar, and streak reset per round;
landing-map drift respects reduced motion; results carry illustrative-score context in
presentation mode.

**Explainer.** Caption 5 now reads "when ai replaces the learner's work, the thinking moves
elsewhere" / "the output can stay polished while the learner bypasses the work"; closing
caption points to untimed-first play. Pause/resume and replay controls, a readable transcript,
and a reduced-motion mode that waits for the viewer. Script, SRT, and both MP4s re-rendered to
match (fallback font again: this container cannot reach Google Fonts).

**Verified.** 45 headless checks: all 12 directed pairs ×2, the exact exc>byp regression round,
cal>exc control, perfect/single/one-off rounds, tutorial and feedback charge no time, timeout
yields 1 scored + 9 unsorted + 10 rows, timer off/on across >60 s untimed, toggle during
feedback, replay resets, dealer mix over 30 deals, focus trap both directions, inert, shortcut
guard, live region, 390/1280/present viewports with no overflow, no network on reflection,
explainer pause/resume/transcript/aspect/reduced motion, relative links. Not established:
real screen-reader output, every browser, classic gameplay.

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
