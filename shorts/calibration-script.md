# two axes, not one dial. · 30-second short

Companion to `calibration.html` / `calibration.mp4` (9:16) and `calibration-wide.mp4` (16:9).
The MP4s are silent; on-screen text carries the idea. Record the voiceover below over the video, or post it silent with the captions file.

## Voiceover (about 85 words, 30 seconds)

The page at `calibration.html` also carries a readable transcript and a pause/resume control; with reduced motion enabled it waits for the viewer to press play.

| time | line |
|---|---|
| 0:00 | Every assignment lives somewhere on this map. |
| 0:04 | Across: how much the student has to think, argue, and stand behind. That friction is what makes learning durable. |
| 0:09 | Up: how much gets in the way of showing it. Language, time, transcription, anxiety, access. |
| 0:14 | Four corners. One of them teaches. A wall is a different kind of obstacle, not a higher dose of a workout. |
| 0:19 | When AI replaces the learner's work, the thinking moves elsewhere. The output can stay polished while the learner bypasses the work. |
| 0:24 | Underneath it all: infrastructure. Policy, grading, and protected time decide whether a good design survives. |
| 0:27 | Sort ten moves yourself. Untimed first; the sixty-second round is the replay. Friction Lab. |

## Post copy (LinkedIn / Bluesky / Threads)

Rigor and exclusion feel the same from the front of the room. They are not the same axis.
Thirty seconds on the calibration map, then sort ten classroom moves yourself (untimed, or against the clock if you want the replay): minerclass.github.io/friction-game

## Re-rendering

```
cd friction-game && npm i playwright && npx playwright install chromium
node render/render.mjs calibration          # 1080x1920
node render/render.mjs calibration --wide   # 1920x1080
```
Render on a machine with internet access so Space Grotesk and JetBrains Mono load; otherwise the system fallback font is baked in.
