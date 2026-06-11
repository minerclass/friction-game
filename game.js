/* ==========================================================================
   FRICTION LAB: CALIBRATION SIMULATOR
   ========================================================================== */

"use strict";

// Game State
const state = {
  screen: "title",
  level: 1, // 1 to 5
  soundOn: false,
  stats: {
    challenge: 0,
    barrier: 0,
    schema: 0 // Win condition: reaches 100
  },
  levelAnswers: [],
  meanChallenge: 0,
  meanAccessibility: 0,
  schemaIntegrity: "Low"
};

// Web Audio API Context
let audioCtx = null;
let bgHum = null;
let levelOsc = null;

// Canvas Particles
let bgCanvas = null;
let bgCtx = null;
let gameCanvas = null;
let gameCtx = null;
let particleEngine = null;
let gameLoopId = null;

// Student profiles for Level 5
const studentProfiles = [
  {
    name: "Profile 1: Student with Dysgraphia",
    desc: "Goal: Remove handwriting fatigue (exclusionary barrier) while preserving noetic task complexity.",
    targetAssist: 85, // High assistance needed (transcription engine)
    targetStruggle: 75, // High cognitive struggle needed
    successMsg: "Calibrated! Transcription software is provided to eliminate physical motor blockades, but noetic challenge remains high."
  },
  {
    name: "Profile 2: English Language Learner (ELL)",
    desc: "Goal: Minimize vocabulary blockades (exclusionary) while preserving critical source synthesis.",
    targetAssist: 80, // High assistance needed (bilingual dictionary/AI translation)
    targetStruggle: 70, // High synthesis challenge
    successMsg: "Calibrated! AI bilingual translation is enabled to prevent mechanical exclusion, but sources must be synthesized by the head."
  },
  {
    name: "Profile 3: Advanced Researcher",
    desc: "Goal: Challenge a highly capable student who defaults to frictionless bypass.",
    targetAssist: 15, // Low assistance needed
    targetStruggle: 90, // Extremely high cognitive challenge
    successMsg: "Calibrated! Assistance is minimized and prompt criteria are highly complex, forcing productive schema expansion."
  }
];
let currentProfileIdx = 0;

// Scenarios for the Sandbox Quiz
const scenarios = [
  {
    text: "A teacher asks students to generate an AI outline for an essay, handwrite a critique of its historical biases, and then formulate their final thesis live during an oral defense.",
    options: [
      { text: "Noetic Friction (The Head)", correct: true, feedback: "Correct! Handwriting the critique and synthesizing the final thesis forces Piagetian accommodation and prevents cognitive delegation." },
      { text: "Rhetorical Friction (The Room)", correct: false, feedback: "Incorrect. While it contains an oral component, the core of critiquing and handwritten drafts is Noetic (internal cognitive work)." },
      { text: "Existential Friction (The World)", correct: false, feedback: "Incorrect. The primary challenge here is the cognitive critique of the source." },
      { text: "Exclusionary Blockade", correct: false, feedback: "Incorrect. This is productive struggle, not an exclusionary barrier." }
    ]
  },
  {
    text: "A student is required to stand in a circle and defend their AI-assisted arguments against real-time peer objections and teacher counter-questions.",
    options: [
      { text: "Rhetorical Friction (The Room)", correct: true, feedback: "Correct! The Room is the locus of dialogic resistance, where claims must survive the presence of disagreement from other minds." },
      { text: "Noetic Friction (The Head)", correct: false, feedback: "Incorrect. This real-time verbal exchange represents Rhetorical (dialogic) friction rather than isolated cognitive labor." },
      { text: "Infrastructural Friction", correct: false, feedback: "Incorrect. This is a classroom interaction (Rhetorical) rather than a system-level policy." },
      { text: "Existential Friction (The World)", correct: false, feedback: "Incorrect. Close, but the dialogic critique makes it Rhetorical." }
    ]
  },
  {
    text: "An English Language Learner is completely blocked from using an AI translator for complex research articles, resulting in them failing the task due to vocabulary barriers.",
    options: [
      { text: "Exclusionary Blockade", correct: true, feedback: "Correct! Completely banning assistive translation tools introduces mechanical barriers that lock out access without building cognitive schema." },
      { text: "Productive Difficulty", correct: false, feedback: "Incorrect. This barrier does not support schema growth; it simply excludes the student." },
      { text: "Noetic Friction", correct: false, feedback: "Incorrect. This is an unproductive mechanical blockade, not productive cognitive struggle." },
      { text: "Infrastructural Friction", correct: false, feedback: "Incorrect. It is a consequence of a policy, but represents an Exclusionary Blockade in practice." }
    ]
  },
  {
    text: "An assessment policy requires students to submit a screencast recording showing their hand-drawing concept map and explaining their revision history before the final paper is accepted.",
    options: [
      { text: "Existential Friction (The World)", correct: true, feedback: "Correct! Forcing the student to show their face/voice and explain their revision decisions anchors their personal agency and identity to the work (The World)." },
      { text: "Infrastructural Friction", correct: false, feedback: "Incorrect. It's an assessment design that focuses on authorship (Existential) rather than the policy structure itself." },
      { text: "Rhetorical Friction (The Room)", correct: false, feedback: "Incorrect. This is a student-to-work explanation (Existential) rather than a peer-to-peer dialogue (Rhetorical)." },
      { text: "Noetic Friction (The Head)", correct: false, feedback: "Incorrect. It preserves noetic work, but the video explanation and personal signature make it Existential." }
    ]
  },
  {
    text: "A district updates its AI policy to state that the primary value to protect is 'productive struggle,' and grading rubrics are modified to evaluate the process of writing rather than only the final output.",
    options: [
      { text: "Infrastructural Friction (The System)", correct: true, feedback: "Correct! This is a system-level policy and grading structure (The System) that creates the conditions of possibility for the other frictions to survive." },
      { text: "Noetic Friction (The Head)", correct: false, feedback: "Incorrect. The policy enables noetic friction, but the update itself is Infrastructural." },
      { text: "Rhetorical Friction (The Room)", correct: false, feedback: "Incorrect. This is a system/policy level change." },
      { text: "Productive Difficulty", correct: false, feedback: "Incorrect. It supports productive difficulties, but the locus is Infrastructural." }
    ]
  },
  {
    text: "A student with severe dysgraphia is allowed to dictate their essay outline to an AI speech-to-text tool, but is required to explain why they ordered the arguments that way.",
    options: [
      { text: "Calibrated Productive Friction", correct: true, feedback: "Correct! Dictation removes the exclusionary physical fatigue (dysgraphia) while the mandatory explanation preserves the productive noetic challenge." },
      { text: "Frictionless Bypass", correct: false, feedback: "Incorrect. The student still had to think through and justify the argument, so it was not a complete bypass." },
      { text: "Exclusionary Blockade", correct: false, feedback: "Incorrect. The tool accommodation prevents it from being a blockade." },
      { text: "Existential Friction", correct: false, feedback: "Incorrect. It has existential qualities, but it represents calibrated equity design." }
    ]
  },
  {
    text: "A student copies a generic prompt into an LLM, copies the output, and submits it. The paper receives an A, but the student retains none of the concepts.",
    options: [
      { text: "Frictionless Bypass (Unproductive Success)", correct: true, feedback: "Correct! This is the 'Great Bypass' where frictionless automation yields a high score (success) with zero cognitive footprint or schema construction (unproductive)." },
      { text: "Exclusionary Blockade", correct: false, feedback: "Incorrect. Bypassing struggle is the opposite of a blockade." },
      { text: "Noetic Friction", correct: false, feedback: "Incorrect. The friction was completely bypassed." },
      { text: "Rhetorical Saturation", correct: false, feedback: "Incorrect. This is noetic displacement/bypass, not dialogic saturation." }
    ]
  },
  {
    text: "A teacher mandates that all essays must be hand-written on loose-leaf paper in the classroom. A student with dyslexia fails because they cannot access spellcheck or translation assistance.",
    options: [
      { text: "Exclusionary Blockade", correct: true, feedback: "Correct! This creates an exclusionary barrier by locking out assistive technologies that are necessary for access, confusing mechanical compliance with cognitive learning." },
      { text: "Noetic Friction", correct: false, feedback: "Incorrect. This locks the student out of showing their understanding, failing to build productive schema." },
      { text: "Infrastructural Friction", correct: false, feedback: "Incorrect. This classroom rule represents a mechanical blockade." },
      { text: "Productive struggle", correct: false, feedback: "Incorrect. Banning assistive technology for a student with a learning disability is not a productive difficulty." }
    ]
  },
  {
    text: "In a class discussion, a student uses an AI chatbot to generate live replies. The chatbot always agrees, validates the student, and never pushes back, leaving the student's assumptions unchallenged.",
    options: [
      { text: "Rhetorical Saturation", correct: true, feedback: "Correct! The student's dialogic interlocutor has been replaced by a compliant system. Under rhetorical saturation, the friction of genuine disagreement disappears." },
      { text: "Existential Abstraction", correct: false, feedback: "Incorrect. This is a breakdown in dialogue (Rhetorical) rather than authorial commitment (Existential)." },
      { text: "Noetic Displacement", correct: false, feedback: "Incorrect. It displaces thinking, but specifically in the dialogic dimension (Rhetorical)." },
      { text: "Infrastructural Friction", correct: false, feedback: "Incorrect. This is a dialogic bypass scenario." }
    ]
  },
  {
    text: "A teacher requires students to sign their names to a public pledge in the hallway stating they verified their primary sources and will stand behind every claim under questioning.",
    options: [
      { text: "Existential Friction (The World)", correct: true, feedback: "Correct! Signing a pledge and committing one's name/vulnerability in physical space creates the embodied accountability of authorship." },
      { text: "Noetic Friction (The Head)", correct: false, feedback: "Incorrect. This relates to authorial commitment (Existential) rather than purely internal synthesis (Noetic)." },
      { text: "Rhetorical Friction (The Room)", correct: false, feedback: "Incorrect. It is about personal accountability (Existential) rather than peer debate (Rhetorical)." },
      { text: "Infrastructural Friction", correct: false, feedback: "Incorrect. This is a pedagogical ritual, not a system-level policy." }
    ]
  }
];
let currentScenarioIdx = 0;
let quizScore = 0;

// Initialize Background Particle FX
function initParticles() {
  bgCanvas = document.getElementById("fx");
  bgCtx = bgCanvas.getContext("2d");
  
  const resize = () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  particleEngine = {
    particles: [],
    max: 60,
    init() {
      this.particles = [];
      for (let i = 0; i < this.max; i++) {
        this.particles.push(this.createParticle());
      }
    },
    createParticle() {
      return {
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1
      };
    },
    update() {
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      
      // Level specific colors
      let color = "56, 189, 248"; // Default Cyan
      if (state.screen === "gameScreen") {
        if (state.level === 1) color = "99, 102, 241"; // Indigo
        else if (state.level === 2) color = "192, 132, 252"; // Purple
        else if (state.level === 3) color = "16, 185, 129"; // Emerald
        else if (state.level === 4) color = "244, 63, 94"; // Rose
        else if (state.level === 5) color = "245, 158, 11"; // Gold
      }
      
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;
        
        bgCtx.fillStyle = `rgba(${color}, ${p.alpha})`;
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        bgCtx.fill();
      });
      requestAnimationFrame(() => this.update());
    }
  };
  particleEngine.init();
  particleEngine.update();
}

// Sound Synthesizer via Web Audio API
function toggleSound() {
  state.soundOn = !state.soundOn;
  const btn = document.getElementById("soundBtn");
  if (state.soundOn) {
    btn.textContent = "SOUND ON";
    btn.style.borderColor = "var(--accent)";
    btn.style.color = "var(--text)";
    startAudio();
  } else {
    btn.textContent = "SOUND OFF";
    btn.style.borderColor = "rgba(255, 255, 255, 0.15)";
    btn.style.color = "var(--dim)";
    stopAudio();
  }
}

function startAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  // Base background hum
  bgHum = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();
  
  bgHum.type = "sine";
  bgHum.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A hum
  
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(100, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  
  bgHum.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  bgHum.start();
  
  updateLevelAudio();
}

function stopAudio() {
  if (bgHum) {
    try { bgHum.stop(); } catch(e) {}
    bgHum = null;
  }
  if (levelOsc) {
    try { levelOsc.stop(); } catch(e) {}
    levelOsc = null;
  }
}

function updateLevelAudio() {
  if (!state.soundOn || !audioCtx) return;
  
  if (levelOsc) {
    try { levelOsc.stop(); } catch(e) {}
    levelOsc = null;
  }

  levelOsc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  let freq = 110; // Level 1 hum
  let type = "sine";
  let vol = 0.03;
  
  if (state.level === 1) {
    freq = 110;
    type = "sine";
  } else if (state.level === 2) {
    freq = 220;
    type = "triangle";
    vol = 0.02;
  } else if (state.level === 3) {
    freq = 165;
    type = "sine";
    vol = 0.03;
  } else if (state.level === 4) {
    freq = 147;
    type = "triangle";
    vol = 0.015;
  } else if (state.level === 5) {
    freq = 330;
    type = "sine";
    vol = 0.01;
  }
  
  levelOsc.type = type;
  levelOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  
  levelOsc.connect(gain);
  gain.connect(audioCtx.destination);
  levelOsc.start();
}

function playBeep(freq, type = "sine", duration = 0.1, volume = 0.1) {
  if (!state.soundOn || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// Navigation / Screen routing
function go(screenId, envName) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
  document.body.setAttribute("data-env", envName);
  state.screen = screenId;
}

function startGame() {
  go("gameScreen", "noetic");
  loadLevel(1);
}

// Game levels loading and rendering
function loadLevel(levelNum) {
  state.level = levelNum;
  state.stats.schema = 0;
  state.stats.challenge = 0;
  state.stats.barrier = 0;
  
  // Wipe screen transition
  const wipe = document.getElementById("wipe");
  const wipetext = document.getElementById("wipetext");
  const titles = [
    "Calibrating Noetic Friction",
    "Engaging Rhetorical Friction",
    "Verifying Existential Friction",
    "Structuring Infrastructural Friction",
    "The Equity Calibration Challenge"
  ];
  const envNames = ["noetic", "rhetorical", "existential", "infrastructural", "end"];
  
  wipetext.textContent = titles[levelNum - 1];
  wipe.classList.add("active");
  playBeep(440, "triangle", 0.3, 0.05);

  setTimeout(() => {
    document.body.setAttribute("data-env", envNames[levelNum - 1]);
    updateLevelAudio();
    renderHUD();
    renderLevelConsole();
    wipe.classList.remove("active");
  }, 1000);
}

function renderHUD() {
  const titles = [
    "Level 1 &middot; Noetic Friction",
    "Level 2 &middot; Rhetorical Friction",
    "Level 3 &middot; Existential Friction",
    "Level 4 &middot; Infrastructural Friction",
    "Level 5 &middot; Equity Calibration"
  ];
  document.getElementById("phasechip").innerHTML = titles[state.level - 1];
  document.getElementById("roundCounter").textContent = `Stage ${state.level} of 5`;
  updateStatsDisplay();
}

function updateStatsDisplay() {
  document.getElementById("fidnum").textContent = `${Math.round(state.stats.challenge)}%`;
  document.getElementById("fidbar").firstElementChild.style.width = `${state.stats.challenge}%`;
  
  document.getElementById("reachnum").textContent = `${Math.round(state.stats.barrier)}%`;
  document.getElementById("reachbar").firstElementChild.style.width = `${state.stats.barrier}%`;
  
  const authnum = document.getElementById("authnum");
  const indicator = document.getElementById("authindicator");
  const authdesc = document.getElementById("authdesc");
  const authflag = document.getElementById("authflag");
  
  if (state.stats.schema >= 100) {
    authnum.textContent = "Calibrated";
    indicator.className = "indicator-dot green";
    authdesc.textContent = "Optimal schema assembly";
    authflag.textContent = "Status: CALIBRATED";
    authflag.className = "auth green-tag";
  } else if (state.stats.barrier > 50) {
    authnum.textContent = "Excluded";
    indicator.className = "indicator-dot red";
    authdesc.textContent = "Mechanical exclusion active";
    authflag.textContent = "Status: EXCLUDED";
    authflag.className = "auth red-tag";
  } else if (state.stats.challenge < 30) {
    authnum.textContent = "Bypassed";
    indicator.className = "indicator-dot red";
    authdesc.textContent = "Frictionless AI delegation";
    authflag.textContent = "Status: BYPASSED";
    authflag.className = "auth red-tag";
  } else {
    authnum.textContent = "Calibrating";
    indicator.className = "indicator-dot yellow";
    authdesc.textContent = "Assembling mental model";
    authflag.textContent = "Status: IN PROGRESS";
    authflag.className = "auth yellow-tag";
  }
}

// Level Console Render Dispatcher
function renderLevelConsole() {
  const viewport = document.getElementById("gameViewport");
  viewport.innerHTML = "";
  
  const roundtitle = document.getElementById("roundtitle");
  const roundprompt = document.getElementById("roundprompt");
  const opts = document.getElementById("opts");
  const outcome = document.getElementById("outcome");
  const charName = document.getElementById("charName");
  const charDialogue = document.getElementById("charDialogue");
  const charIcon = document.getElementById("charIcon");
  
  opts.innerHTML = "";
  outcome.innerHTML = "";
  document.getElementById("nextrow").style.display = "none";
  
  // Clean canvas loops if any
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
    gameLoopId = null;
  }
  
  if (state.level === 1) {
    roundtitle.textContent = "Noetic Calibration";
    roundprompt.textContent = "A cognitive ball rolls down a track. Prevent the ball from taking the frictionless bypass shortcut by adding Desirable Difficulties.";
    charName.textContent = "Learning Scientist";
    charDialogue.textContent = "To construct a schema, the student's brain must wrestle. Bypassing the struggle using AI generates an essay, but builds zero knowledge.";
    charIcon.className = "fa-solid fa-brain";
    charIcon.style.color = "var(--noetic)";
    
    initLevel1Game();
  } else if (state.level === 2) {
    roundtitle.textContent = "Rhetorical Calibration";
    roundprompt.textContent = "The student's thesis sits in a Socratic circle. Pop agreeable AI clones by spawning peer critique shockwaves (click circles) to keep dialogue active.";
    charName.textContent = "Media Ecologist";
    charDialogue.textContent = "AI tools are designed to agree and validate. This creates Rhetorical Saturation. We must design dialogue with real human objections.";
    charIcon.className = "fa-solid fa-users";
    charIcon.style.color = "var(--rhetorical)";
    
    initLevel2Game();
  } else if (state.level === 3) {
    roundtitle.textContent = "Existential Verification";
    roundprompt.textContent = "Sign your name to claim your thesis, then choose the correct personal research defense actions to fend off plagiarism accusations.";
    charName.textContent = "Academic Integrity Director";
    charDialogue.textContent = "Existential friction is the vulnerability of authorship. Stand behind your name. Prove that you navigated the source path yourself.";
    charIcon.className = "fa-solid fa-fingerprint";
    charIcon.style.color = "var(--existential)";
    
    initLevel3Game();
  } else if (state.level === 4) {
    roundtitle.textContent = "Infrastructural Policy";
    roundprompt.textContent = "Review the incoming district policies. Choose the policy that preserves productive struggle while maintaining student equity.";
    charName.textContent = "Superintendent";
    charDialogue.textContent = "Systemic conditions rule. A single teacher's assignment cannot withstand a school policy that rewards fast, frictionless output.";
    charIcon.className = "fa-solid fa-building-columns";
    charIcon.style.color = "var(--infra)";
    
    initLevel4Game();
  } else if (state.level === 5) {
    roundtitle.textContent = "Equity Calibration Sandbox";
    roundprompt.textContent = "Calibrate the sliders for the selected student profile. Balance Scaffolding Support (assistance) and Cognitive Challenge (struggle).";
    charName.textContent = "Equity Director";
    charDialogue.textContent = "We must not confuse mechanical blockades with cognitive rigor. Give support to lift physical barriers, but preserve the thinking.";
    charIcon.className = "fa-solid fa-scale-balanced";
    charIcon.style.color = "var(--gold)";
    
    initLevel5Game();
  }
}

// ==========================================
// LEVEL 1: NOETIC GAMEPLAY (Canvas Desirable Difficulty)
// ==========================================
let L1Ball = null;
let L1Difficulties = [];
let L1BypassNode = null;
let L1LearningNode = null;

function initLevel1Game() {
  const viewport = document.getElementById("gameViewport");
  const canvas = document.createElement("canvas");
  canvas.className = "canvas-game";
  viewport.appendChild(canvas);
  
  canvas.width = viewport.clientWidth;
  canvas.height = viewport.clientHeight;
  
  L1Ball = {
    x: 30,
    y: 80,
    vx: 1.5,
    vy: 0,
    radius: 8,
    color: "#fff"
  };
  
  L1Difficulties = [];
  L1BypassNode = { x: canvas.width - 50, y: 80, radius: 25, active: false };
  L1LearningNode = { x: canvas.width - 50, y: 220, radius: 25, active: false };
  
  const opts = document.getElementById("opts");
  const btn1 = document.createElement("button");
  btn1.className = "opt-btn";
  btn1.innerHTML = "<i class='fa-solid fa-lock'></i> Drop Retrieval Practice Block";
  btn1.onclick = () => addL1Difficulty("retrieval", canvas.width * 0.4, 60, 20, 100);
  
  const btn2 = document.createElement("button");
  btn2.className = "opt-btn";
  btn2.innerHTML = "<i class='fa-solid fa-pen-nib'></i> Drop Hand-drawn Concept Map Gate";
  btn2.onclick = () => addL1Difficulty("concept", canvas.width * 0.65, 60, 20, 100);
  
  opts.appendChild(btn1);
  opts.appendChild(btn2);
  
  state.stats.challenge = 0;
  state.stats.barrier = 0;
  state.stats.schema = 0;
  updateStatsDisplay();
  
  function addL1Difficulty(type, x, y, w, h) {
    if (L1Difficulties.some(d => d.type === type)) return;
    L1Difficulties.push({ type, x, y, w, h });
    playBeep(220, "sine", 0.15, 0.1);
    
    // Recalculate stats based on added difficulties
    state.stats.challenge = L1Difficulties.length * 35;
    state.stats.barrier = L1Difficulties.length * 8; // slight mechanical load
    updateStatsDisplay();
    
    // Deactivate bypass option
    if (type === "retrieval") btn1.disabled = true;
    if (type === "concept") btn2.disabled = true;
  }
  
  function runLoop() {
    gameCtx = canvas.getContext("2d");
    gameCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Tracks
    gameCtx.strokeStyle = "rgba(255,255,255,0.05)";
    gameCtx.lineWidth = 4;
    // Bypass Track (Upper)
    gameCtx.beginPath();
    gameCtx.moveTo(0, 80);
    gameCtx.lineTo(canvas.width, 80);
    gameCtx.stroke();
    // Learning Track (Lower Loop)
    gameCtx.beginPath();
    gameCtx.moveTo(canvas.width * 0.4, 80);
    gameCtx.lineTo(canvas.width * 0.4, 220);
    gameCtx.lineTo(canvas.width, 220);
    gameCtx.stroke();
    
    // Draw Difficulties / Blocks
    L1Difficulties.forEach(d => {
      gameCtx.fillStyle = d.type === "retrieval" ? "var(--noetic)" : "#a78bfa";
      gameCtx.fillRect(d.x, d.y, d.w, d.h);
      gameCtx.font = "8px Fira Code";
      gameCtx.fillStyle = "#fff";
      gameCtx.fillText(d.type.toUpperCase(), d.x - 5, d.y - 5);
    });
    
    // Draw Nodes
    // Bypass Exit
    gameCtx.fillStyle = L1BypassNode.active ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.02)";
    gameCtx.strokeStyle = L1BypassNode.active ? "var(--bad)" : "var(--line)";
    gameCtx.beginPath();
    gameCtx.arc(L1BypassNode.x, L1BypassNode.y, L1BypassNode.radius, 0, Math.PI * 2);
    gameCtx.fill();
    gameCtx.stroke();
    gameCtx.font = "8px Fira Code";
    gameCtx.fillStyle = L1BypassNode.active ? "var(--bad)" : "var(--dim)";
    gameCtx.fillText("AI BYPASS", L1BypassNode.x - 22, L1BypassNode.y + 3);
    
    // Learning Exit
    gameCtx.fillStyle = L1LearningNode.active ? "rgba(52, 211, 153, 0.2)" : "rgba(255,255,255,0.02)";
    gameCtx.strokeStyle = L1LearningNode.active ? "var(--good)" : "var(--line)";
    gameCtx.beginPath();
    gameCtx.arc(L1LearningNode.x, L1LearningNode.y, L1LearningNode.radius, 0, Math.PI * 2);
    gameCtx.fill();
    gameCtx.stroke();
    gameCtx.fillStyle = L1LearningNode.active ? "var(--good)" : "var(--dim)";
    gameCtx.fillText("SCHEMA YIELD", L1LearningNode.x - 25, L1LearningNode.y + 3);
    
    // Update Ball
    L1Ball.x += L1Ball.vx;
    L1Ball.y += L1Ball.vy;
    
    // Check collisions with blocks
    L1Difficulties.forEach(d => {
      if (L1Ball.vx > 0 && L1Ball.x + L1Ball.radius >= d.x && L1Ball.x - L1Ball.radius <= d.x + d.w && L1Ball.y === 80) {
        // Drop down!
        L1Ball.vx = 0;
        L1Ball.vy = 2;
        playBeep(330, "triangle", 0.08, 0.05);
      }
    });
    
    // Turn corner on learning track
    if (L1Ball.vy > 0 && L1Ball.y >= 220) {
      L1Ball.y = 220;
      L1Ball.vy = 0;
      L1Ball.vx = 1.5;
    }
    
    // Check end conditions
    if (L1Ball.x >= L1BypassNode.x && L1Ball.y === 80 && !L1BypassNode.active && !L1LearningNode.active) {
      L1BypassNode.active = true;
      state.stats.schema = 0;
      showOutcome(false, "Unproductive Success! The ball bypassed all desirable difficulties. Plentiful text was created, but zero schema was assembled.");
    }
    if (L1Ball.x >= L1LearningNode.x && L1Ball.y === 220 && !L1LearningNode.active && !L1BypassNode.active) {
      L1LearningNode.active = true;
      state.stats.schema = 100;
      showOutcome(true, "Productive Success! Calibrated difficulty forced schema activation. The student built robust neural pathways!");
    }
    
    // Draw Ball
    gameCtx.fillStyle = L1Ball.color;
    gameCtx.beginPath();
    gameCtx.arc(L1Ball.x, L1Ball.y, L1Ball.radius, 0, Math.PI * 2);
    gameCtx.fill();
    
    gameLoopId = requestAnimationFrame(runLoop);
  }
  runLoop();
}

// ==========================================
// LEVEL 2: RHETORICAL GAMEPLAY (Socratic Circle Arena)
// ==========================================
let L2Clones = [];
let L2Waves = [];
let L2Thesis = null;

function initLevel2Game() {
  const viewport = document.getElementById("gameViewport");
  const canvas = document.createElement("canvas");
  canvas.className = "canvas-game";
  viewport.appendChild(canvas);
  
  canvas.width = viewport.clientWidth;
  canvas.height = viewport.clientHeight;
  
  L2Thesis = { x: canvas.width / 2, y: canvas.height / 2, radius: 28, integrity: 100 };
  L2Clones = [];
  L2Waves = [];
  
  state.stats.challenge = 70;
  state.stats.barrier = 10;
  state.stats.schema = 0;
  updateStatsDisplay();
  
  // Event listener for click/shockwaves
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spawn wave
    L2Waves.push({ x, y, radius: 5, maxRadius: 60, speed: 2.5 });
    playBeep(440, "sine", 0.2, 0.05);
    
    // Slightly adjust challenge
    state.stats.challenge = Math.min(100, state.stats.challenge + 2);
    updateStatsDisplay();
  });
  
  let frame = 0;
  function runLoop() {
    frame++;
    gameCtx = canvas.getContext("2d");
    gameCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Thesis Center Node
    gameCtx.fillStyle = "rgba(192, 132, 252, 0.1)";
    gameCtx.strokeStyle = "var(--rhetorical)";
    gameCtx.lineWidth = 3;
    gameCtx.beginPath();
    gameCtx.arc(L2Thesis.x, L2Thesis.y, L2Thesis.radius, 0, Math.PI * 2);
    gameCtx.fill();
    gameCtx.stroke();
    gameCtx.font = "9px Fira Code";
    gameCtx.fillStyle = "#fff";
    gameCtx.fillText("THESIS", L2Thesis.x - 16, L2Thesis.y + 3);
    
    // Spawn AI clones
    if (frame % 85 === 0 && L2Clones.length < 8 && state.stats.schema < 100 && L2Thesis.integrity > 0) {
      const angle = Math.random() * Math.PI * 2;
      const dist = canvas.width / 2;
      L2Clones.push({
        x: L2Thesis.x + Math.cos(angle) * dist,
        y: L2Thesis.y + Math.sin(angle) * dist,
        vx: -Math.cos(angle) * 0.65,
        vy: -Math.sin(angle) * 0.65,
        radius: 12,
        isParrot: true // agreeable clone
      });
    }
    
    // Update Shockwaves
    for (let i = L2Waves.length - 1; i >= 0; i--) {
      const w = L2Waves[i];
      w.radius += w.speed;
      
      // Draw wave
      gameCtx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      gameCtx.lineWidth = 2;
      gameCtx.beginPath();
      gameCtx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
      gameCtx.stroke();
      
      // Check collision with clones
      L2Clones.forEach((c) => {
        const dx = c.x - w.x;
        const dy = c.y - w.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (Math.abs(dist - w.radius) < 5 && c.isParrot) {
          c.isParrot = false; // Turn into Nuanced Peer Critique
          c.vx *= -0.5; // bounce back
          c.vy *= -0.5;
          playBeep(587, "sine", 0.1, 0.08);
          state.stats.schema = Math.min(100, state.stats.schema + 20);
          updateStatsDisplay();
        }
      });
      
      if (w.radius >= w.maxRadius) {
        L2Waves.splice(i, 1);
      }
    }
    
    // Update Clones
    for (let i = L2Clones.length - 1; i >= 0; i--) {
      const c = L2Clones[i];
      c.x += c.vx;
      c.y += c.vy;
      
      // Draw Clones
      if (c.isParrot) {
        gameCtx.fillStyle = "rgba(239, 68, 68, 0.15)";
        gameCtx.strokeStyle = "var(--bad)";
      } else {
        gameCtx.fillStyle = "rgba(52, 211, 153, 0.15)";
        gameCtx.strokeStyle = "var(--good)";
      }
      gameCtx.lineWidth = 1.5;
      gameCtx.beginPath();
      gameCtx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
      gameCtx.fill();
      gameCtx.stroke();
      
      gameCtx.font = "8px Fira Code";
      gameCtx.fillStyle = "#fff";
      gameCtx.fillText(c.isParrot ? "AI AGREE" : "CRITIQUE", c.x - 18, c.y + 3);
      
      // Check collision with center
      const dx = c.x - L2Thesis.x;
      const dy = c.y - L2Thesis.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist <= L2Thesis.radius + c.radius) {
        // hit center
        L2Clones.splice(i, 1);
        if (c.isParrot) {
          L2Thesis.integrity = Math.max(0, L2Thesis.integrity - 25);
          state.stats.challenge = Math.max(0, state.stats.challenge - 15);
          state.stats.barrier = Math.min(100, state.stats.barrier + 12);
          playBeep(180, "triangle", 0.35, 0.1);
        } else {
          // peer critique successfully integrated into thesis
          state.stats.schema = Math.min(100, state.stats.schema + 15);
          playBeep(880, "sine", 0.15, 0.05);
        }
        updateStatsDisplay();
      }
    }
    
    // Check end conditions
    if (L2Thesis.integrity <= 0 && state.stats.schema < 100) {
      showOutcome(false, "Rhetorical Saturation! Agreeable AI clones flooded the thesis. No critical pushback or dialogue survived. Thesis collapsed.");
      cancelAnimationFrame(gameLoopId);
      return;
    }
    if (state.stats.schema >= 100) {
      showOutcome(true, "Rhetorical Calibration Complete! The thesis withstood peer critiques and rejected automated parrot loops. Robust dialogic understanding built!");
      cancelAnimationFrame(gameLoopId);
      return;
    }
    
    gameLoopId = requestAnimationFrame(runLoop);
  }
  runLoop();
}

// ==========================================
// LEVEL 3: EXISTENTIAL GAMEPLAY (Oral Defense Verification)
// ==========================================
function initLevel3Game() {
  const viewport = document.getElementById("gameViewport");
  viewport.style.background = "#090c15";
  
  const card = document.createElement("div");
  card.className = "sortcard glass-panel";
  card.style.margin = "1rem";
  card.style.height = "calc(100% - 2rem)";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.justifyContent = "center";
  card.style.alignItems = "center";
  card.style.gap = "1rem";
  viewport.appendChild(card);
  
  card.innerHTML = `
    <h4 style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent);">AUTHORIAL SIGNATURE PORTAL</h4>
    <p style="font-size:0.8rem; text-align:center; color:var(--dim);">To bind your identity to this work, type your name below to sign the thesis declaration:</p>
    <div style="display:flex; gap:0.5rem; width:100%; max-width:320px;">
       <input type="text" id="signatureInput" placeholder="Type name to sign..." style="flex-grow:1; background:rgba(0,0,0,0.5); border:1px solid var(--line); color:#fff; border-radius:4px; padding:0.4rem 0.8rem; font-family:var(--font-mono); font-size:0.8rem;">
       <button class="btn" id="signBtn" style="padding:0.4rem 1rem;" onclick="verifySignature()">SIGN</button>
    </div>
    <div id="defenseArena" style="display:none; width:100%; text-align:center;">
       <p id="accusationText" style="font-family:var(--font-serif); font-size:0.95rem; font-style:italic; margin-bottom:1rem; color:var(--bad);"></p>
       <div id="defenseOptions" style="display:flex; flex-direction:column; gap:0.5rem; max-width:400px; margin:0 auto;"></div>
    </div>
  `;
  
  state.stats.challenge = 50;
  state.stats.barrier = 10;
  state.stats.schema = 0;
  updateStatsDisplay();
}

window.verifySignature = function() {
  const nameInput = document.getElementById("signatureInput");
  if (!nameInput.value.trim()) {
    playBeep(220, "sine", 0.15, 0.1);
    return;
  }
  
  playBeep(659, "sine", 0.15, 0.05);
  nameInput.disabled = true;
  document.getElementById("signBtn").disabled = true;
  
  state.stats.challenge = 80;
  state.stats.schema = 30;
  updateStatsDisplay();
  
  // Activate Oral Defense Questions
  const defenseArena = document.getElementById("defenseArena");
  defenseArena.style.display = "block";
  nextAccusation(0);
};

const accusations = [
  {
    text: "Reviewer challence: 'Your methodology looks like an automated template. How do we know you actually did this case study?'",
    options: [
      { text: "Option A: 'I conducted 12 semi-structured interviews and coded the transcripts inductively.'", correct: true, feedback: "Correct! Describing your situated methods establishes authentic, personal authorship." },
      { text: "Option B: 'The template was generated by an AI assistant to save time.'", correct: false, feedback: "Incorrect. Bypassing execution details collapses existential commitment." }
    ]
  },
  {
    text: "Reviewer challenge: 'This paragraph has no page numbers. Prove you read the actual physical source book.'",
    options: [
      { text: "Option A: 'I opened the book in the school library and recorded pages 142-145 in my handwritten reading logs.'", correct: true, feedback: "Correct! Authentic citation records verify your embodied research pathway." },
      { text: "Option B: 'I let an AI summarize the book, and the chatbot didn't give page numbers.'", correct: false, feedback: "Incorrect. Relying on unverified secondary AI summaries abstracts you from the source." }
    ]
  }
];

function nextAccusation(idx) {
  if (idx >= accusations.length) {
    state.stats.schema = 100;
    updateStatsDisplay();
    showOutcome(true, "Existential Verification Certified! You defended your authorial signature and verified your research path. Learning consolidated!");
    return;
  }
  
  const text = document.getElementById("accusationText");
  const optionsDiv = document.getElementById("defenseOptions");
  const acc = accusations[idx];
  
  text.textContent = acc.text;
  optionsDiv.innerHTML = "";
  
  acc.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt.text;
    btn.onclick = () => {
      if (opt.correct) {
        playBeep(880, "sine", 0.15, 0.05);
        state.stats.schema += 35;
        state.stats.barrier = Math.max(0, state.stats.barrier - 5);
        updateStatsDisplay();
        nextAccusation(idx + 1);
      } else {
        playBeep(220, "triangle", 0.3, 0.1);
        state.stats.challenge = Math.max(0, state.stats.challenge - 20);
        state.stats.barrier = Math.min(100, state.stats.barrier + 20);
        updateStatsDisplay();
        showOutcome(false, "Existential Abstraction! You failed to defend your authorial footprint. The claims exist without a claimant. Academic credit denied.");
      }
    };
    optionsDiv.appendChild(btn);
  });
}

// ==========================================
// LEVEL 4: INFRASTRUCTURAL GAMEPLAY (Policy Decisions)
// ==========================================
function initLevel4Game() {
  const opts = document.getElementById("opts");
  
  const policies = [
    {
      text: "Policy Proposal A: Integrate AI automated grading software. Cut writing feedback cycles down to 1 second; grading is 100% outsourced.",
      correct: false,
      feedback: "Incorrect! Complete automation eliminates noetic struggle and leads to cognitive bypass. The school's learning standards collapse."
    },
    {
      text: "Policy Proposal B: Total Tool Ban. Ban all LLM access on the district network and verify compliance via spyware surveillance software.",
      correct: false,
      feedback: "Incorrect! Complete bans introduce mechanical obstacles (exclusionary barriers) without teaching students how to calibrate struggle or write productively."
    },
    {
      text: "Policy Proposal C: The Pedagogical Calibrator. Declare 'productive struggle' as a protected learning value. Grade drafting processes, and allow translator aids only.",
      correct: true,
      feedback: "Correct! Calibrated policy defines the role of struggle, accommodates mechanical needs, and protects the noetic, rhetorical, and existential axes of learning!"
    }
  ];
  
  state.stats.challenge = 40;
  state.stats.barrier = 40;
  state.stats.schema = 0;
  updateStatsDisplay();
  
  policies.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = p.text;
    btn.onclick = () => {
      if (p.correct) {
        btn.className = "opt-btn correct";
        playBeep(880, "sine", 0.15, 0.05);
        state.stats.challenge = 75;
        state.stats.barrier = 10;
        state.stats.schema = 100;
        updateStatsDisplay();
        showOutcome(true, p.feedback);
      } else {
        btn.className = "opt-btn wrong";
        playBeep(220, "triangle", 0.35, 0.1);
        state.stats.challenge = 10;
        state.stats.barrier = 90;
        state.stats.schema = 0;
        updateStatsDisplay();
        showOutcome(false, p.feedback);
      }
      // Disable other buttons
      document.querySelectorAll("#opts button").forEach(b => b.disabled = true);
    };
    opts.appendChild(btn);
  });
}

// ==========================================
// LEVEL 5: THE CALIBRATION CHALLENGE (Interactive sliders)
// ==========================================
let L5Assist = 50;
let L5Struggle = 50;

function initLevel5Game() {
  currentProfileIdx = 0;
  L5Assist = 50;
  L5Struggle = 50;
  
  loadL5Profile(0);
}

function loadL5Profile(idx) {
  currentProfileIdx = idx;
  L5Assist = 50;
  L5Struggle = 50;
  
  state.stats.challenge = 50;
  state.stats.barrier = 50;
  state.stats.schema = 0;
  updateStatsDisplay();
  
  const viewport = document.getElementById("gameViewport");
  viewport.innerHTML = "";
  
  const prof = studentProfiles[idx];
  
  document.getElementById("roundtitle").textContent = prof.name;
  document.getElementById("roundprompt").textContent = prof.desc;
  
  const sliderGrid = document.createElement("div");
  sliderGrid.className = "calibration-sliders-grid";
  viewport.appendChild(sliderGrid);
  
  sliderGrid.innerHTML = `
    <div class="slider-field">
      <label>Scaffolding & Assistive Tech: <span id="assistVal" style="color:var(--accent);">50%</span></label>
      <span class="slider-sublabel">Reduces physical/mechanical obstacles</span>
      <input type="range" class="lab-slider" id="assistSlider" min="0" max="100" value="50" oninput="onL5SliderChange()">
      <div class="slider-indicators">
        <span>0% None</span>
        <span>100% Full</span>
      </div>
    </div>
    <div class="slider-field">
      <label>Noetic/Cognitive Challenge: <span id="struggleVal" style="color:var(--accent);">50%</span></label>
      <span class="slider-sublabel">Maintains productive struggle</span>
      <input type="range" class="lab-slider" id="struggleSlider" min="0" max="100" value="50" oninput="onL5SliderChange()">
      <div class="slider-indicators">
        <span>0% Bypass</span>
        <span>100% Max Rigor</span>
      </div>
    </div>
  `;
  
  const opts = document.getElementById("opts");
  opts.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "btn btn-glow";
  btn.style.width = "100%";
  btn.textContent = "VERIFY CALIBRATION";
  btn.onclick = () => verifyL5Calibration();
  opts.appendChild(btn);
  
  const outcome = document.getElementById("outcome");
  outcome.innerHTML = "";
  document.getElementById("nextrow").style.display = "none";
}

window.onL5SliderChange = function() {
  L5Assist = parseInt(document.getElementById("assistSlider").value);
  L5Struggle = parseInt(document.getElementById("struggleSlider").value);
  
  document.getElementById("assistVal").textContent = `${L5Assist}%`;
  document.getElementById("struggleVal").textContent = `${L5Struggle}%`;
  
  // Real-time stat adjustment
  state.stats.challenge = L5Struggle;
  state.stats.barrier = 100 - L5Assist;
  updateStatsDisplay();
  
  playBeep(220 + L5Struggle + L5Assist, "sine", 0.05, 0.03);
};

function verifyL5Calibration() {
  const prof = studentProfiles[currentProfileIdx];
  
  const assistDiff = Math.abs(L5Assist - prof.targetAssist);
  const struggleDiff = Math.abs(L5Struggle - prof.targetStruggle);
  
  if (assistDiff <= 15 && struggleDiff <= 15) {
    state.stats.schema = 100;
    updateStatsDisplay();
    playBeep(880, "sine", 0.25, 0.08);
    showOutcome(true, prof.successMsg);
    
    // Add next profile button
    const opts = document.getElementById("opts");
    opts.innerHTML = "";
    const nextProfBtn = document.createElement("button");
    nextProfBtn.className = "btn btn-glow";
    nextProfBtn.style.width = "100%";
    
    if (currentProfileIdx < studentProfiles.length - 1) {
      nextProfBtn.textContent = "CALIBRATE NEXT PROFILE &rarr;";
      nextProfBtn.onclick = () => loadL5Profile(currentProfileIdx + 1);
    } else {
      nextProfBtn.textContent = "FINALIZE SIMULATION &rarr;";
      nextProfBtn.onclick = () => {
        state.meanChallenge = 78;
        state.meanAccessibility = 88;
        state.schemaIntegrity = "Optimal";
        
        // Calculate stats
        document.getElementById("endfid").textContent = `${state.meanChallenge}%`;
        document.getElementById("endreach").textContent = `${state.meanAccessibility}%`;
        document.getElementById("endauthor").textContent = state.schemaIntegrity;
        
        go("finaleScreen", "end");
        playBeep(659, "triangle", 0.5, 0.1);
      };
    }
    opts.appendChild(nextProfBtn);
  } else {
    playBeep(220, "triangle", 0.35, 0.1);
    let errorMsg = "Calibration failed: ";
    if (L5Assist < prof.targetAssist - 15) {
      errorMsg += "Exclusionary Blockade active. Support is too low for the mechanical barrier.";
    } else if (L5Assist > prof.targetAssist + 15) {
      errorMsg += "Support is too high, leading to cognitive dependency.";
    } else if (L5Struggle < prof.targetStruggle - 15) {
      errorMsg += "Frictionless Bypass active. Cognitive demand is too low.";
    } else {
      errorMsg += " Rote instruction block. Cognitive demand is too high for the context.";
    }
    showOutcome(false, errorMsg);
  }
}

// Outcome display
function showOutcome(isSuccess, text) {
  const outcome = document.getElementById("outcome");
  if (isSuccess) {
    outcome.className = "outcome success";
    outcome.innerHTML = `<i class='fa-solid fa-circle-check'></i> <strong>SUCCESS:</strong> ${text}`;
    document.getElementById("nextrow").style.display = "flex";
  } else {
    outcome.className = "outcome error";
    outcome.innerHTML = `<i class='fa-solid fa-triangle-exclamation'></i> <strong>WARNING:</strong> ${text}`;
    document.getElementById("nextrow").style.display = "none";
  }
}

function advance() {
  if (state.level < 5) {
    loadLevel(state.level + 1);
  }
}

// ==========================================
// SCREEN 4: INTERACTIVE ACADEMIC SANDBOX QUIZ
// ==========================================
function loadScenario(idx) {
  currentScenarioIdx = idx;
  const scen = scenarios[idx];
  
  document.getElementById("sortcounter").textContent = `SCENARIO ${idx + 1} OF ${scenarios.length}`;
  document.getElementById("scenariotext").textContent = scen.text;
  
  const btns = document.getElementById("phasebtns");
  btns.innerHTML = "";
  
  const feedback = document.getElementById("sortfeedback");
  feedback.innerHTML = "";
  feedback.className = "sortfeedback";
  
  document.getElementById("sortnext").style.display = "none";
  
  scen.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt.text;
    btn.onclick = () => selectQuizOption(btn, opt);
    btns.appendChild(btn);
  });
}

function selectQuizOption(clickedBtn, option) {
  const feedback = document.getElementById("sortfeedback");
  
  // Disable all buttons
  document.querySelectorAll("#phasebtns button").forEach(b => b.disabled = true);
  
  if (option.correct) {
    clickedBtn.className = "opt-btn correct";
    feedback.className = "sortfeedback correct";
    feedback.innerHTML = `<strong>Correct!</strong> ${option.feedback}`;
    quizScore++;
    playBeep(880, "sine", 0.15, 0.05);
  } else {
    clickedBtn.className = "opt-btn wrong";
    feedback.className = "sortfeedback wrong";
    feedback.innerHTML = `<strong>Incorrect.</strong> ${option.feedback}`;
    playBeep(220, "triangle", 0.25, 0.08);
  }
  
  document.getElementById("scorebar").textContent = `SCORE: ${quizScore} / ${scenarios.length}`;
  document.getElementById("sortnext").style.display = "inline-block";
}

window.nextScenario = function() {
  if (currentScenarioIdx < scenarios.length - 1) {
    loadScenario(currentScenarioIdx + 1);
  } else {
    // End of quiz
    const scenBox = document.querySelector(".sortcard");
    scenBox.innerHTML = `
      <div style="text-align:center; padding:2rem 0;">
        <i class="fa-solid fa-graduation-cap" style="font-size:3.5rem; color:var(--accent); margin-bottom:1rem;"></i>
        <h3>Sandbox Quiz Completed!</h3>
        <p style="font-size:1.1rem; margin-top:0.5rem; color:var(--dim);">You scored <strong>${quizScore}</strong> out of <strong>${scenarios.length}</strong>.</p>
        <button class="btn btn-glow" onclick="location.reload()" style="margin-top:1.5rem;">PLAY AGAIN</button>
      </div>
    `;
  }
};

// ==========================================
// INITIALIZATION
// ==========================================
window.onload = function() {
  initParticles();
  loadScenario(0);
};
