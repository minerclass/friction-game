/* =====================================================
   FRICTION LAB — calibration engine
   Three dimensions (noetic, rhetorical, existential) +
   infrastructural friction as condition of possibility.
   Core mechanic: productive challenge and exclusionary
   barrier are DIFFERENT AXES, not one dial.
===================================================== */

const L = {
  level: 0,
  ch: [],          // challenge per dimension level (0-100)
  ba: [],          // barrier per dimension level (0-100)
  foundation: null // 'protects' | 'compliance' | 'lockdown'
};

const LEVELS = [
  {
    key:'noetic', tag:'Level 1 · Noetic Friction', locus:'The Head',
    title:'The Head: Preserve the Struggle of Thought',
    construct:'Core construct: internal cognitive labor and schema accommodation. Threatened by noetic displacement — instant output mutes the signal of "not knowing."',
    scen:'Your 8th-grade class is starting an argument essay on the causes of the American Civil War. Every student has an LLM one tab away. Choose the design move for the thinking work.',
    moves:[
      {t:'Allow full LLM generation, with citation', s:'Students disclose AI use and cite it properly.',
       ch:8, ba:2, kind:'byp',
       v:'<span class="vtag byp">Bypass</span><b>Disclosure is not friction.</b> The citation is honest and the schema is still never assembled. The map barely moves: low barrier, but almost no productive challenge — flawless output, undeveloped retrieval.'},
      {t:'Thinking journal first, AI as critic second', s:'Handwritten or typed first claims and a concept map before any AI; then students must rebut the model\u2019s outline in their own words.',
       ch:68, ba:12, kind:'cal',
       v:'<span class="vtag cal">Calibrated</span><b>The struggle happens inside the student first.</b> The "not knowing" signal stays audible, and the AI becomes an interlocutor to push against rather than a ghostwriter. High challenge, low barrier — the calibrated zone.'},
      {t:'Ban every digital tool; all work handwritten in class, no spell-check, no dictation', s:'Maximum rigor. No exceptions.',
       ch:34, ba:64, kind:'exc',
       v:'<span class="vtag exc">Exclusion</span><b>That felt rigorous, but watch the axes.</b> Challenge rose a little; the barrier rose a lot. A student with dysgraphia or a multilingual learner is now blocked by transcription mechanics that add zero conceptual work. This is a wall, not a workout — exclusionary friction is a different kind, not a higher dose.'}
    ]
  },
  {
    key:'rhet', tag:'Level 2 · Rhetorical Friction', locus:'The Room',
    title:'The Room: Claims Must Survive Other Minds',
    construct:'Core construct: the dialogic struggle of defending ideas to unpredictable human audiences. Threatened by rhetorical saturation — agreeable synthetic partners that never really push back.',
    scen:'Drafts exist. Now the ideas need to meet resistance. How does the argument get tested in your classroom?',
    moves:[
      {t:'Students "discuss" their thesis with a chatbot partner', s:'Each student refines their argument in private dialogue with an AI.',
       ch:14, ba:4, kind:'byp',
       v:'<span class="vtag byp">Bypass</span><b>The partner is too agreeable.</b> Synthetic interlocutors accommodate; peers object. Without unpredictable human resistance, the claim is polished but never actually tested. Rhetorical saturation in miniature.'},
      {t:'Structured Socratic seminar with objection rounds', s:'Every claim must survive two live peer objections; speaking roles are scaffolded and rotated.',
       ch:64, ba:13, kind:'cal',
       v:'<span class="vtag cal">Calibrated</span><b>Now the claim meets other minds.</b> Objections are unpredictable, the author must reformulate in real time, and the scaffolded roles keep the barrier low for anxious or developing speakers. Productive struggle in the room.'},
      {t:'Surprise cold-calls, graded on the spot, no preparation or supports', s:'Pure pressure produces pure rigor.',
       ch:42, ba:58, kind:'exc',
       v:'<span class="vtag exc">Exclusion</span><b>Pressure is not the same as challenge.</b> Some struggle rises, but the spike is in the barrier: processing differences, language load, and anxiety now gate participation while adding little dialogic depth. Wrong axis again.'}
    ]
  },
  {
    key:'exis', tag:'Level 3 · Existential Friction', locus:'The World',
    title:'The World: Standing Behind One\u2019s Words',
    construct:'Core construct: embodied accountability and authorial stakes. Threatened by existential abstraction — claims detached from an accountable claimant.',
    scen:'The essays are nearly final. The last design choice: what does it mean, in your classroom, to be the author of this argument?',
    moves:[
      {t:'Anonymous submission to an auto-grader', s:'Efficient, consistent, and nobody has to present anything.',
       ch:10, ba:3, kind:'byp',
       v:'<span class="vtag byp">Bypass</span><b>No claimant, no stakes.</b> The text detaches from any person who must stand behind it — the precise condition of existential abstraction. Frictionless, and weightless.'},
      {t:'Signed authorial stance plus a short oral defense', s:'Students declare their position, then defend three choices they made to a panel — with rehearsal time and notes allowed.',
       ch:70, ba:15, kind:'cal',
       v:'<span class="vtag cal">Calibrated</span><b>The argument has a body now.</b> A named author, answerable in person, explaining decisions they actually made. Rehearsal and notes keep the barrier manageable while the accountability stays real.'},
      {t:'Mandatory public defense: no notes, no rehearsal, English only', s:'Real stakes mean no safety nets.',
       ch:48, ba:66, kind:'exc',
       v:'<span class="vtag exc">Exclusion</span><b>You raised the stakes and built a wall.</b> Removing notes, rehearsal, and language supports doesn\u2019t deepen authorship; it filters out multilingual learners and anxious students before authorship is even tested. The map shows it: drifting into the Grind/Exclusion corner.'}
    ]
  }
];

const FOUNDATION = {
  tag:'Foundation · Infrastructural Friction', locus:'The System — Condition of Possibility',
  title:'The System: Secure the Conditions',
  construct:'Infrastructural friction is not a fourth peer dimension. It is the policy, grading, and time structure that determines whether the three designs you just built can survive contact with a real school.',
  scen:'Your assignment design is finished. Now the district asks for the policy that will hold it in place. What you choose here doesn\u2019t add challenge or barrier — it decides whether your calibration endures or collapses.',
  moves:[
    {t:'Detection software and an integrity pledge', s:'Police the outputs; leave instruction untouched.',
     found:'compliance',
     v:'<span class="vtag byp">Compliance Only</span><b>The conditions were never secured.</b> Detection is an arms race that says nothing about how thinking is graded or when struggle gets time. Your three calibrated designs now depend on individual teacher heroics — and erode by spring.'},
    {t:'Process-focused rubrics, protected time for struggle, and accommodation pathways', s:'Grade thinking trajectories, schedule long blocks, and route exclusionary barriers to documented supports.',
     found:'protects',
     v:'<span class="vtag cal">Condition Secured</span><b>This is what infrastructural friction is for.</b> The system now rewards process over proxy, gives struggle the time it needs, and removes barriers through policy rather than ad hoc mercy. The three dimensions you designed can actually persist.'},
    {t:'District-wide device and AI ban', s:'Remove the problem at the network level.',
     found:'lockdown',
     v:'<span class="vtag exc">Lockdown</span><b>The system just converted your design into a wall.</b> A blanket ban doesn\u2019t preserve struggle; it removes the assistive pathways your accommodation choices depended on and pushes AI use into the unsupervised dark. Policy-level exclusion propagates down through everything you built.'}
  ]
};

/* ---------- rendering ---------- */
function $(id){return document.getElementById(id);}
function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='deep'&&!quizStarted)startQuiz();
}
function startLab(){go('lab');showLevel();}

function rail(){
  const names=['I · Noetic','II · Rhetorical','III · Existential','Foundation · Infrastructural'];
  $('levelrail').innerHTML=names.map((n,i)=>{
    let cls='lv'+(i===3?' infra':'');
    if(i<L.level)cls+=' done';
    if(i===L.level)cls+=' now';
    return `<span class="${cls}">${n}</span>`;
  }).join('');
}

function meanCh(){return L.ch.length?Math.round(L.ch.reduce((a,b)=>a+b,0)/L.ch.length):0;}
function meanBa(){return L.ba.length?Math.round(L.ba.reduce((a,b)=>a+b,0)/L.ba.length):0;}

function updateMap(){
  const ch=meanCh(), ba=meanBa();
  $('chnum').textContent=ch+'%';
  $('banum').textContent=ba+'%';
  document.querySelector('#chbar i').style.width=ch+'%';
  document.querySelector('#babar i').style.width=ba+'%';
  const dot=$('dot');
  dot.style.left=Math.max(4,Math.min(96,ch))+'%';
  dot.style.bottom=Math.max(4,Math.min(96,ba))+'%';
  const ss=$('schemastate');
  ss.className='schemastate';
  if(ba>=35){ss.classList.add('excluded');ss.textContent='Schema assembly: gated by barriers';}
  else if(ch>=50&&ch<=80){ss.classList.add('durable');ss.textContent='Schema assembly: durable';}
  else if(ch>=30){ss.classList.add('forming');ss.textContent='Schema assembly: forming';}
  else {ss.classList.add('bypassed');ss.textContent='Schema assembly: bypassed';}
}

function showLevel(){
  rail(); updateMap();
  document.body.dataset.level=L.level;
  $('verdict').innerHTML='';
  $('nextrow').classList.remove('show');
  const isFound = L.level===3;
  const lv = isFound ? FOUNDATION : LEVELS[L.level];
  const tag=$('dimtag');
  tag.innerHTML=`${lv.tag} <span class="locus">&middot; ${lv.locus}</span>`;
  tag.classList.toggle('infra',isFound);
  $('levtitle').textContent=lv.title;
  $('levconstruct').textContent=lv.construct;
  $('levscen').textContent=lv.scen;
  const wrap=$('moves');
  wrap.innerHTML='';
  // prepend foundation explainer once
  const old=document.querySelector('.foundnote'); if(old)old.remove();
  if(isFound){
    const fn=document.createElement('div');
    fn.className='foundnote';
    fn.innerHTML='<b>Note the shift:</b> this round will not move the calibration dot. Infrastructural friction operates beneath the map — it is the condition that lets (or forbids) your three designs to exist at all.';
    wrap.parentNode.insertBefore(fn,wrap);
  }
  lv.moves.forEach(m=>{
    const b=document.createElement('button');
    b.innerHTML=m.t+`<small>${m.s}</small>`;
    b.onclick=()=>{
      [...wrap.children].forEach(c=>c.disabled=true);
      b.classList.add('picked');
      if(isFound){ L.foundation=m.found; }
      else { L.ch.push(m.ch); L.ba.push(m.ba); updateMap(); }
      $('verdict').innerHTML=m.v;
      $('nextrow').classList.add('show');
      $('nextbtn').textContent = L.level===3 ? 'See the lab assessment \u2192' : 'Continue \u2192';
    };
    wrap.appendChild(b);
  });
}
function nextLevel(){
  L.level++;
  if(L.level<=3)showLevel();
  else showResults();
}

/* ---------- results ---------- */
function showResults(){
  go('results');
  const ch=meanCh(), ba=meanBa(), f=L.foundation;
  $('statch').textContent=ch+'%';
  $('statba').textContent=ba+'%';
  $('statfo').textContent=f==='protects'?'Secured':(f==='lockdown'?'Lockdown':'Compliance');
  let head,desc,label,schema,thesis,title;
  const calibrated = ch>=50 && ch<=80 && ba<20;
  if(calibrated && f==='protects'){
    title='Friction Calibration Certified';
    label='DESIGN CERTIFICATE · COMPLETED'; head='Calibrated, and Built to Last';
    schema='Durable';
    desc='You held all three dimensions in the calibrated zone — high productive challenge, low exclusionary barrier — and then secured the infrastructural conditions that let the design survive beyond one heroic classroom. The output of this assignment will be an artifact of learning, not a proxy that displaces it.';
    thesis='Friction is not a mechanical bug to be smoothed away by automated text engines. It is the resistance that makes human understanding durable. You differentiated productive struggle (noetic, rhetorical, existential work) from exclusionary structural obstacles — and you used the system itself to protect that difference.';
  } else if(calibrated){
    title='Calibrated Design, Unsecured Conditions';
    label='DESIGN ASSESSMENT · PARTIAL'; head='Good Design on Borrowed Time';
    schema='Forming';
    desc='Your three dimensions sit in the calibrated zone, but the foundation you chose cannot hold them there. '+(f==='lockdown'
      ?'A lockdown policy converts calibrated design into exclusion from above: the assistive pathways your choices relied on are gone.'
      :'A compliance-only policy leaves the design dependent on individual effort; without process-based grading and protected time, calibration erodes.');
    thesis='This is why infrastructural friction is the condition of possibility rather than a fourth peer dimension: nothing you design at the level of the head, the room, or the world persists unless the system makes room for it.';
  } else if(ba>=35){
    title='Exclusion Detected';
    label='DESIGN ASSESSMENT · EXCLUSIONARY'; head='Walls Where the Workout Should Be';
    schema='Gated';
    desc='Your environment drifted up the vertical axis. The moves that felt most rigorous — bans, no-support defenses, on-the-spot pressure — raised barriers faster than they raised challenge. Multilingual learners and students with disabilities are now locked out of struggle they were never given access to.';
    thesis='The map\u2019s vertical axis is the framework\u2019s sharpest claim: exclusionary friction is a different kind of obstacle, not a higher dose of the productive kind. Rigor that gates participation produces neither equity nor learning.';
  } else if(ba>=20){
    title='Drifting Toward Exclusion';
    label='DESIGN ASSESSMENT · BORDERLINE'; head='Strong Challenge, Rising Walls';
    schema='Forming';
    desc='Your productive challenge held up, but the barrier reading crept past the threshold. Somewhere in this design, at least one move traded access for the appearance of rigor. The learning is real for the students who can reach it — and that qualifier is the problem.';
    thesis='Watch the vertical axis early: exclusionary friction is a different kind of obstacle, not a higher dose of the productive kind, and it compounds quietly. One barrier per dimension is enough to gate the very students the calibration was meant to serve.';
  } else if(ch<50){
    title='Bypass Conditions Detected';
    label='DESIGN ASSESSMENT · BYPASSED'; head='Frictionless, and Empty';
    schema='Bypassed';
    desc='Your environment stayed low on both axes. Nothing blocked anyone — and nothing asked anything of anyone. Outputs will look proficient while retrieval strength and schema consolidation are left undeveloped: unproductive success at scale.';
    thesis='The frictionless path is the quiet failure mode: no visible harm, flawless artifacts, and no learning underneath. The absence of barriers is necessary but never sufficient.';
  } else {
    title='Overloaded Calibration';
    label='DESIGN ASSESSMENT · OVERLOADED'; head='Past the Desirable Zone';
    schema='Forming';
    desc='Barriers stayed low — good — but mean challenge pushed past the desirable-difficulty band. Struggle beyond what working memory can integrate stops producing schema and starts producing abandonment. Desirable difficulties have a ceiling as well as a floor.';
    thesis='Productive friction is a band, not a maximum. Calibration means holding challenge inside the zone where struggle still converts to schema — Sweller\u2019s load limits apply to friction architects too.';
  }
  $('resulttitle').textContent=title;
  $('certlabel').textContent=label;
  $('certlabel').style.color = calibrated&&f==='protects' ? 'var(--good)' : (ba>=35?'var(--bad)':'var(--warn)');
  $('certhead').textContent=head;
  $('certdesc').textContent=desc;
  $('statsc').textContent=schema;
  $('resultthesis').textContent=thesis;
}

/* ---------- classification quiz ---------- */
const CATS=['Noetic Friction','Rhetorical Friction','Existential Friction','Infrastructural (Condition)','Exclusionary Barrier'];
const QUIZ=[
  {t:'Students keep a handwritten thinking journal of first-draft ideas before opening any AI tool.',a:0,
   why:'The struggle preserved is internal cognitive labor in the Head — schema work done before externalization. Classic noetic friction.'},
  {t:'A Socratic seminar where every claim must survive two live peer objections before it can stand.',a:1,
   why:'The resistance comes from other minds in the Room — unpredictable human dialogue that agreeable AI partners cannot replicate.'},
  {t:'Students sign their thesis and orally defend three of their own choices to a community panel.',a:2,
   why:'A named, embodied author answerable for their claims in the World — existential friction against abstraction.'},
  {t:'The district rewrites grading policy so documented thinking process counts alongside the final product.',a:3,
   why:'A system-level structure that creates the conditions for the other three frictions to survive. Not a fourth peer — the foundation.'},
  {t:'A student with dysgraphia is forbidden from using speech-to-text on the final essay.',a:4,
   why:'Transcription mechanics add no conceptual challenge here; they only gate access. A barrier on the wrong axis — exclusionary, not productive.'},
  {t:'A multilingual learner must complete the conceptual synthesis without any dictionary or translation support.',a:4,
   why:'The language wall blocks demonstration of thinking without deepening it — the English Learner Paradox in one move. Remove the barrier, keep the conceptual friction.'},
  {t:'AI is allowed only as a critic: students must write a rebuttal of the model\u2019s outline in their own words.',a:0,
   why:'The model becomes something to push against, but the preserved labor — analyzing, rebutting, reformulating — happens inside the student\u2019s own head. Noetic.'},
  {t:'The school redesigns its schedule into long blocks so that struggle has time to unfold before deadlines.',a:3,
   why:'Time structure is infrastructure. No single classroom can grant what the system\u2019s calendar forbids.'},
  {t:'Students publish their local-history findings, under their own names, to a real community audience.',a:2,
   why:'Authorship with stakes in the World: the claim travels with an accountable claimant attached.'},
  {t:'Peer-review rounds where each author must respond in writing to two objections before revising.',a:1,
   why:'Dialogic resistance from real peers — the claim must survive objection and reformulation. Rhetorical friction, in slow motion.'}
];
let quizStarted=false, qi=0, qscore=0;
function startQuiz(){
  quizStarted=true; qi=0; qscore=0;
  QUIZ.sort(()=>Math.random()-.5);
  showQ();
}
function showQ(){
  const s=QUIZ[qi];
  $('sortcounter').textContent=`SCENARIO ${qi+1} OF ${QUIZ.length}`;
  $('scenariotext').textContent=s.t;
  $('sortfeedback').textContent='';
  $('sortnext').style.display='none';
  const wrap=$('quizbtns');
  wrap.innerHTML='';
  CATS.forEach((c,idx)=>{
    const b=document.createElement('button');
    b.textContent=c;
    b.onclick=()=>answerQ(idx,b);
    wrap.appendChild(b);
  });
  $('scorebar').textContent=`SCORE ${qscore} / ${qi}`;
}
function answerQ(idx,btn){
  const s=QUIZ[qi];
  [...$('quizbtns').children].forEach(c=>c.disabled=true);
  const right=idx===s.a;
  if(right){qscore++;btn.classList.add('right');}
  else{btn.classList.add('wrong');$('quizbtns').children[s.a].classList.add('right');}
  $('sortfeedback').innerHTML=`<b>${right?'Correct':'Not quite'} — ${CATS[s.a]}.</b> ${s.why}`;
  $('scorebar').textContent=`SCORE ${qscore} / ${qi+1}`;
  if(qi<QUIZ.length-1)$('sortnext').style.display='inline-block';
  else $('sortfeedback').innerHTML+=`<br><br><b>Final: ${qscore} of ${QUIZ.length}.</b> The traps were the moves that felt rigorous but sat on the exclusion axis — that distinction is the framework\u2019s sharpest edge.`;
}
function nextScenario(){qi++;showQ();}
