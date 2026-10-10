# Friction Lab

Two playable versions of the calibration map from the Pedagogical Friction Framework (Micah J. Miner), plus a 30-second explainer short.

**Live:** https://minerclass.github.io/friction-game/

## sixty seconds (`index.html`)

Sort ten classroom design moves, drawn from a bank of eighteen, into four answers: calibrated, bypass, exclusion, or infrastructure. Every answer gets a two-sentence explanation naming the friction dimension at stake and, where it applies, what would calibrate the move. The round ends with a pattern readout that names your recurring confusion (walls read as workouts, polished output credited as learning, and so on) rather than a bare score.

- `?present=1` enlarges type for a projected room; `?timer=0` removes the clock for classroom use.
- Keys 1–4 answer; Enter advances.
- Reading time is not charged to the clock. The clock keeps sorting honest; it is not the point.
- Scenarios live in `scenarios.js`. Add a card by appending an object; the dealer guarantees at least two of each answer type per round.

## the 5-minute design version (`classic/`)

The original simulation: design one assignment across noetic, rhetorical, and existential friction, then secure the infrastructural conditions that let it survive. Links from older decks to `/classic/` keep working.

## the short (`shorts/`)

`calibration.html` is a deterministic 30-second animation (9:16 by default, `?wide=1` for 16:9). `render/render.mjs` captures it frame by frame to `calibration.mp4` and `calibration-wide.mp4`. Voiceover script, post copy, and captions are in `calibration-script.md` and `calibration.srt`.

## Framework note

Infrastructural friction is modeled beneath the map, not as a fourth quadrant or a fourth peer dimension. It is the policy, time, grading, and access structure that decides whether the other three dimensions can exist in a real school.

## Privacy

Public educational resource. Nothing is stored or transmitted. Do not add student data, staff data, participant material, credentials, or internal district information. Scores are illustrative, not validated assessments.
