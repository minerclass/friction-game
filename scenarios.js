/* Friction Lab · scenario bank
   Each card is one design move. The player sorts it into one of four answers:
     cal   Calibrated     high productive challenge, low exclusionary barrier
     byp   Bypass         low challenge, low barrier: polished output, no learning
     exc   Exclusion      barrier dominates: a wall where the workout should be
     inf   Infrastructure the move sits beneath the learner map (policy, time, grading, access)
   x = productive challenge 0..100, y = exclusionary barrier 0..100 (map position after the verdict).
   dim = which friction dimension the card mainly touches. Infrastructural friction is the
   condition of possibility for the other three, not a fourth peer dimension.
   Public educational content only. No participant, student, or staff material. */

window.FL_SCENARIOS = [
  { id:'journal', dim:'noetic', a:'cal', x:72, y:12,
    t:'Thinking journal first, AI as critic second',
    d:'Students write first claims and a concept map before any AI, then rebut the model’s outline in their own words.',
    why:'The not-knowing happens inside the student before the model speaks. The AI becomes something to push against, not a ghostwriter.',
    tag:'noetic friction preserved' },

  { id:'cite', dim:'noetic', a:'byp', x:10, y:8,
    t:'Allow full AI generation, with citation',
    d:'Students disclose AI use and cite it properly.',
    why:'Disclosure is honesty, not friction. In this scenario no step asks the student to build the schema first, so the output can be polished while the retrieval happens in the model.',
    fix:'Require a first claim in the student’s own words before the tool opens.',
    tag:'unproductive success' },

  { id:'handwrite', dim:'noetic', a:'exc', x:35, y:85,
    t:'Ban every digital tool; all work handwritten in class, no spell-check, no dictation',
    d:'Maximum rigor. No exceptions.',
    why:'Transcription mechanics add no conceptual work; they gate who can show it. A student with dysgraphia or a multilingual learner is blocked by the pencil, not the idea.',
    fix:'Keep the thinking-first sequence; allow dictation and typed drafts as access, not shortcuts.',
    trap:'cal', tag:'wall, not workout' },

  { id:'chatbot', dim:'rhetorical', a:'byp', x:18, y:6,
    t:'Students “discuss” their thesis with a chatbot partner',
    d:'The chatbot supplies objections and a revised argument; students accept both without evaluating the reasoning or testing the claim with peers.',
    why:'In this scenario the bypass is the missing evaluation: the student neither weighs the model’s objections nor tests the claim against people who can push back unpredictably. The dialogue happened; the learner’s judgment did not.',
    fix:'Add two live human objections the claim has to survive.',
    tag:'rhetorical saturation' },

  { id:'seminar', dim:'rhetorical', a:'cal', x:78, y:14,
    t:'Socratic seminar with objection rounds',
    d:'Every claim must survive two live peer objections. Speaking roles are scaffolded and rotated.',
    why:'The claim meets other minds. Objections are unpredictable, the author reformulates in real time, and the scaffolded roles keep the barrier low for developing speakers.',
    tag:'rhetorical friction preserved' },

  { id:'coldcall', dim:'rhetorical', a:'exc', x:40, y:80,
    t:'Surprise cold-calls, graded on the spot, no preparation or supports',
    d:'Pure pressure produces pure rigor.',
    why:'Pressure is not challenge. Processing differences, language load, and anxiety now gate participation while adding little dialogic depth.',
    fix:'Keep the live objection; add prep time, a visible question bank, and rotating roles.',
    trap:'cal', tag:'wrong axis' },

  { id:'autograder', dim:'existential', a:'byp', x:8, y:10,
    t:'Generated text submitted without an ownership check',
    d:'Students submit generated text; no explanation, revision record, or defense connects it to their thinking.',
    why:'In this scenario nothing ties the text to a person who thought it through: no explanation, no revision trail, no defense. The bypass is the absence of accountable thinking, not the grading tool.',
    fix:'Attach a name and one decision the author has to explain.',
    tag:'existential abstraction' },

  { id:'stance', dim:'existential', a:'cal', x:74, y:16,
    t:'Signed authorial stance plus a short oral defense',
    d:'Students declare a position and defend three choices they made, with rehearsal time and notes allowed.',
    why:'The argument has a body: a named author, answerable in person. Rehearsal and notes keep the barrier manageable while the accountability stays real.',
    tag:'existential friction preserved' },

  { id:'publicdef', dim:'existential', a:'exc', x:55, y:88,
    t:'Mandatory public defense: no notes, no rehearsal, English only',
    d:'Real stakes mean no safety nets.',
    why:'Raising stakes by removing supports filters multilingual and anxious students out before authorship is tested. Both axes are high here; the barrier axis dominates.',
    fix:'Keep the defense. Restore notes, rehearsal, and home-language options.',
    trap:'cal', grind:true, tag:'the grind corner' },

  { id:'detect', dim:'infra', a:'inf', x:0, y:0, infra:'erodes',
    t:'Detection software and an integrity pledge',
    d:'Police the outputs; leave instruction untouched.',
    why:'This is a system condition, not a learner-facing design. Policing outputs says nothing about how thinking is graded or when struggle gets time, so calibrated designs end up depending on teacher heroics.',
    tag:'compliance only' },

  { id:'rubrics', dim:'infra', a:'inf', x:0, y:0, infra:'protects',
    t:'Process rubrics, protected struggle time, documented accommodation pathways',
    d:'Grade thinking trajectories, schedule long blocks, route barriers to documented supports.',
    why:'This sits beneath the map. It is the policy, time, and grading structure that lets calibrated designs survive contact with a real school.',
    tag:'conditions secured' },

  { id:'ban', dim:'infra', a:'inf', x:0, y:0, infra:'erodes',
    t:'District-wide device and AI ban',
    d:'Remove the problem at the network level.',
    why:'A policy move, and one that propagates exclusion downward: it removes the assistive pathways accommodation depends on and pushes AI use into the unsupervised dark.',
    tag:'lockdown' },

  { id:'volume', dim:'noetic', a:'exc', x:30, y:75,
    t:'Hand-paraphrase 25 sources before quoting any of them, due tomorrow',
    d:'Depth through volume.',
    why:'Volume is not depth. The barrier is time, and time is unevenly distributed across students who work, caregive, or lack home internet.',
    fix:'Three sources, paraphrased and interrogated in class, over two days.',
    trap:'cal', tag:'time as a wall' },

  { id:'flaw', dim:'noetic', a:'cal', x:70, y:18,
    t:'Evaluate an AI counterargument with evidence before drafting',
    d:'Students revise, rebut, or accept the counterargument with reasons; the model supplies an argument, and the student supplies judgment.',
    why:'The friction stays in the student. Deciding what the counterargument gets right or wrong requires the retrieval and schema work the model cannot do on the learner’s behalf.',
    tag:'noetic friction preserved' },

  { id:'polish', dim:'noetic', a:'byp', x:15, y:10,
    t:'Teacher generates a model essay; students “improve” it by changing word choice',
    d:'Everyone works from the same strong draft.',
    why:'Editing the surface of a finished schema is not building one. In this scenario the retrieval and organization happened in the model before the student arrived.',
    fix:'Give the students the prompt, not the essay. Compare to the model only afterward.',
    tag:'unproductive success' },

  { id:'record', dim:'existential', a:'cal', x:66, y:20,
    t:'AI allowed only after a recorded 90-second explanation of the plan',
    d:'Students commit to a claim in their own voice before the tool enters the task. Notes, rehearsal, and an equivalent typed or assistive response are available.',
    why:'Accountability precedes assistance, and the supports keep the barrier low. The learner owns a position the model can then be measured against.',
    tag:'existential friction preserved' },

  { id:'finalonly', dim:'infra', a:'inf', x:0, y:0, infra:'erodes',
    t:'Grade only the final artifact; process notes earn zero credit',
    d:'The product is what matters.',
    why:'A grading structure, not a task design. By rewarding only the surface artifact, the system itself incentivizes bypass in every classroom beneath it.',
    tag:'bypass by policy' },

  { id:'blocks', dim:'infra', a:'inf', x:0, y:0, infra:'protects',
    t:'Two protected “struggle blocks” per unit: no AI, no grade taken',
    d:'Written into the pacing calendar, not left to individual teachers.',
    why:'Time is infrastructure. Protecting it at the calendar level is what keeps productive struggle from eroding by spring.',
    tag:'conditions secured' }
];
