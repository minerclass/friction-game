# Friction Lab

Two playable versions of the calibration map from the Pedagogical Friction Framework (Micah J. Miner), plus a 30-second explainer short.

**Live:** https://minerclass.github.io/friction-game/

## sort the map (`index.html`)

Sort ten classroom design moves, drawn from a bank of eighteen, into four answers: calibrated, bypass, exclusion / grind, or infrastructure. Every answer gets a two-sentence explanation naming the friction dimension at stake and, where it applies, what would calibrate the move. The round ends with a pattern readout that names any repeated confusion (walls read as workouts, shortcuts read as walls, system conditions placed on the learner map) and reports unsorted cards separately. An optional, browser-local reflection prompt follows: nothing typed there is scored, stored, or sent.

- **Play untimed first.** The primary button starts an untimed round. The sixty-second round is a replay option; its clock counts accumulated sorting time only, never onboarding or reading the feedback.
- `?timer=1` makes the clock the default; `?timer=0` forces it off. `?present=1` enlarges type for a projected room.
- Keys 1–4 answer; Enter continues. The tutorial is a modal dialog: Tab stays inside it, Escape skips it.
- Verdicts, card changes, and results are announced through a polite live region. Screen-reader output has not been tested with a real screen reader; treat that as unverified.
- Grind is a map region, not an answer. When both axes are high, sort the move as exclusion and preserve the worthwhile challenge in your redesign.
- Scenarios live in `scenarios.js`. Add a card by appending an object; the dealer guarantees at least two of each answer type per round.

## the 5-minute design version (`classic/`)

The original simulation: design one assignment across noetic, rhetorical, and existential friction, then secure the infrastructural conditions that let it survive. Links from older decks to `/classic/` keep working.

## the short (`shorts/`)

`calibration.html` is a deterministic 30-second animation (9:16 by default, `?wide=1` for 16:9). `render/render.mjs` captures it frame by frame to `calibration.mp4` and `calibration-wide.mp4`. Voiceover script, post copy, and captions are in `calibration-script.md` and `calibration.srt`.

## Framework note

Infrastructural friction is modeled beneath the map, not as a fourth quadrant or a fourth peer dimension. It is the policy, time, grading, and access structure that decides whether the other three dimensions can exist in a real school.

## Privacy

Public educational resource. Nothing is stored or transmitted. Do not add student data, staff data, participant material, credentials, or internal district information. Scores are illustrative, not validated assessments.
