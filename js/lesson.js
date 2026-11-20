/* Motor de lliçons: tipus d'exercici, correcció, ajuda escalonada i tancament. */

let RUN = null;

const COMBO_MSGS = ["Quin ritme!", "Imparable!", "Va com la seda!", "Ets una màquina!", "Ni Vera et pilla!"];

function startLesson(lessonId) {
  const f = findLesson(lessonId);
  if (!f) { location.hash = "#itinerari"; return; }
  RUN = {
    mode: "lesson", lesson: f.lesson, unit: f.unit,
    items: f.lesson.steps.map((s, i) => ({ step: s, key: f.lesson.id + "#" + i })),
    i: 0, xp: 0, ok: 0, scored: 0, failed: []
  };
  renderLessonShell();
}

function startReview() {
  const due = dueReviews();
  const items = due.map(r => ({ step: stepFromKey(r.key), key: r.key })).filter(x => x.step);
  if (!items.length) { toast("No tens cap repàs pendent. 👏"); location.hash = "#inici"; return; }
  RUN = { mode: "review", lesson: { title: "Repàs", rule: null }, unit: { color: "#334155" }, items: shuffle(items).slice(0, 10), i: 0, xp: 0, ok: 0, scored: 0, failed: [] };
  renderLessonShell();
}

function startRevenge(prev) {
  RUN = {
    mode: "revenge", prev, lesson: prev.lesson, unit: prev.unit,
    items: prev.failed.map(k => prev.items.find(x => x.key === k)),
    i: 0, xp: 0, ok: 0, scored: 0, failed: []
  };
  renderLessonShell();
}

function renderLessonShell() {
  const view = document.getElementById("view");
  document.body.classList.add("in-lesson");
  view.innerHTML = "";
  const shell = el(`
    <section class="lesson" style="--unit:${RUN.unit.color}">
      <div class="lesson-top">
        <button class="icon-btn" id="lsClose" aria-label="Ix de la lliçó">✕</button>
        <div class="progress" role="progressbar" aria-label="Progrés de la lliçó"><span id="lsProg"></span></div>
        <button class="icon-btn" id="lsSpeak" aria-label="Llig en veu alta" title="Llig en veu alta">🔊</button>
        <span class="xp-pill" id="lsXP">⚡ 0</span>
      </div>
      <div class="lesson-body" id="lsBody"></div>
      <div class="lesson-foot" id="lsFoot"></div>
    </section>`);
  view.appendChild(shell);
  shell.querySelector("#lsClose").onclick = () => {
    if (confirm("Vols eixir? Perdràs el progrés d'esta lliçó.")) { endLessonMode(); location.hash = "#itinerari"; }
  };
  shell.querySelector("#lsSpeak").onclick = () => {
    const st = RUN.items[RUN.i] && RUN.items[RUN.i].step;
    if (!st) return;
    if (!S.settings.voice) { S.settings.voice = true; save(); toast("Narració activada (pots desactivar-la al Perfil)."); }
    speak([st.title, st.hook, st.prompt, (st.points || []).join(". "), st.a, st.b].filter(Boolean).join(". "));
  };
  renderStep();
}

function endLessonMode() {
  document.body.classList.remove("in-lesson");
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function updateTop() {
  const p = document.getElementById("lsProg");
  if (p) p.style.width = Math.round(100 * RUN.i / RUN.items.length) + "%";
  const x = document.getElementById("lsXP");
  if (x) x.textContent = "⚡ " + RUN.xp;
}

function renderStep() {
  updateTop();
  if (RUN.i >= RUN.items.length) return finishRun();
  const { step } = RUN.items[RUN.i];
  const body = document.getElementById("lsBody");
  const foot = document.getElementById("lsFoot");
  body.innerHTML = ""; foot.innerHTML = "";
  body.scrollTop = 0;

  if (step.type === "intro") return renderIntro(step, body, foot);
  if (step.type === "concept") return renderConcept(step, body, foot);
  if (step.type === "cards") return renderCards(step, body, foot);

  const checkBtn = el(`<button class="primary big" disabled>Comprova</button>`);
  let W = null;
  W = WIDGETS[step.type](step, () => { if (W) checkBtn.disabled = !W.ready(); });
  if (step.level) body.appendChild(el(`<span class="level-tag">⭐ ${esc(step.level)}</span>`));
  if (RUN.mode === "review") body.appendChild(el(`<span class="level-tag review">🔁 Repàs</span>`));
  if (step.type === "chat") body.appendChild(chatBlock(step));
  body.appendChild(el(`<h2 class="step-prompt">${esc(step.prompt)}</h2>`));
  body.appendChild(W.el);

  let attempts = 0;
  const showCheck = () => { foot.innerHTML = ""; foot.appendChild(checkBtn); checkBtn.disabled = !W.ready(); };
  showCheck();

  checkBtn.onclick = () => {
    const ok = W.check();
    W.lock(true);
    if (ok) {
      const gain = RUN.mode === "revenge" ? 3 : (attempts === 0 ? 10 : 5);
      stepDone(step, attempts === 0, gain);
      band(foot, "ok", attempts === 0 ? "Molt bé!" : "Ara sí!", `+${gain} XP`, step.why);
    } else {
      attempts++;
      const b = band(foot, "ko", "No del tot.", attempts >= 2 ? "Vols una ajuda?" : "Pensa-ho una altra vegada.", null, true);
      const actions = b.querySelector(".band-actions");
      if (attempts >= 2) {
        const help = el(`<button class="ghost-btn">💡 Explica-m'ho</button>`);
        const sol = el(`<button class="ghost-btn">👀 Mostra la solució</button>`);
        help.onclick = () => { const p = b.querySelector(".why"); p.innerHTML = esc(step.hint || step.why); p.hidden = false; };
        sol.onclick = () => {
          W.reveal();
          stepDone(step, false, 0);
          band(foot, "neutral", "Esta era la resposta.", "Ho repassarem més avant.", step.why, false, true);
        };
        actions.prepend(sol); actions.prepend(help);
      }
      const retry = el(`<button class="primary">Torna-ho a provar</button>`);
      retry.onclick = () => { W.reset(); W.lock(false); showCheck(); };
      actions.appendChild(retry);
    }
  };
}

function stepDone(step, firstTry, gain) {
  const key = RUN.items[RUN.i].key;
  RUN.scored++;
  RUN.xp += gain;
  if (firstTry) RUN.ok++;
  if (RUN.mode === "review") reviewResult(key, firstTry);
  else if (!firstTry && RUN.mode === "lesson") RUN.failed.push(key);
  updateTop();
}

function band(foot, kind, title, sub, why, noContinue, whyOpen) {
  foot.innerHTML = "";
  const b = el(`
    <div class="band ${kind}" role="status">
      <div class="band-text"><strong>${esc(title)}</strong> <span>${esc(sub || "")}</span></div>
      <div class="band-actions"></div>
      <p class="why" ${whyOpen ? "" : "hidden"}>${why ? esc(why) : ""}</p>
    </div>`);
  const actions = b.querySelector(".band-actions");
  if (why && !whyOpen) {
    const w = el(`<button class="ghost-btn">Per què?</button>`);
    w.onclick = () => { b.querySelector(".why").hidden = !b.querySelector(".why").hidden; };
    actions.appendChild(w);
  }
  if (!noContinue) {
    const c = el(`<button class="primary">Continua</button>`);
    c.onclick = () => { RUN.i++; renderStep(); };
    actions.appendChild(c);
    setTimeout(() => c.focus(), 30);
  }
  foot.appendChild(b);
  return b;
}

function continueBtn(foot, label = "Continua") {
  const c = el(`<button class="primary big">${esc(label)}</button>`);
  c.onclick = () => { RUN.i++; renderStep(); };
  foot.appendChild(c);
  setTimeout(() => c.focus(), 30);
}

/* ---------- Pantalles sense correcció ---------- */
function renderIntro(st, body, foot) {
  body.appendChild(el(`
    <div class="intro">
      <div class="mascot-big" aria-hidden="true">${MASCOT.emoji}</div>
      <p class="kicker">${esc(RUN.unit.title || "")}</p>
      <h2 class="intro-title">${esc(st.title)}</h2>
      <p class="hook">${esc(st.hook)}</p>
      <div class="cast">${(st.cast || []).map(c => `<span class="cast-chip" style="--c:${CAST[c].color}"><span aria-hidden="true">${CAST[c].emoji}</span>${esc(CAST[c].name)}</span>`).join("")}</div>
    </div>`));
  continueBtn(foot, "Som-hi!");
}

function renderConcept(st, body, foot) {
  body.appendChild(el(`
    <div class="concept">
      <p class="kicker">💡 Concepte clau</p>
      <h2>${esc(st.title)}</h2>
      <ol>${st.points.map(p => `<li>${p}</li>`).join("")}</ol>
    </div>`));
  continueBtn(foot, "Entesos");
}

function chatBlock(st) {
  return el(`
    <div class="chat" aria-label="Conversa">
      <div class="chat-head">💬 ${esc(st.group || "Xat")}</div>
      ${st.msgs.map((m, i) => {
        const c = CAST[m.who];
        return `<div class="msg ${i % 2 ? "right" : ""}" style="--c:${c.color};animation-delay:${i * 0.35}s">
          <span class="avatar" aria-hidden="true">${c.emoji}</span>
          <div class="bubble"><b>${esc(c.name)}</b>${esc(m.text)}</div></div>`;
      }).join("")}
    </div>`);
}

/* ---------- Ginys amb correcció ---------- */
const WIDGETS = {
  choice: optionsWidget,
  chat: optionsWidget,
  vs(st, onChange) {
    let sel = null;
    const w = el(`<div class="vs">
      <button class="vs-card" data-i="0"><span class="vs-tag">A</span>${esc(st.a)}</button>
      <span class="vs-mid" aria-hidden="true">VS</span>
      <button class="vs-card" data-i="1"><span class="vs-tag">B</span>${esc(st.b)}</button></div>`);
    const btns = [...w.querySelectorAll(".vs-card")];
    btns.forEach(b => b.onclick = () => { sel = +b.dataset.i; btns.forEach(x => x.classList.toggle("sel", x === b)); onChange(); });
    return {
      el: w, ready: () => sel !== null,
      check() { const ok = sel === st.answer; btns[sel].classList.add(ok ? "right" : "wrong"); return ok; },
      reveal() { btns.forEach(x => x.classList.remove("wrong", "sel")); btns[st.answer].classList.add("right"); },
      reset() { sel = null; btns.forEach(x => x.classList.remove("sel", "right", "wrong")); onChange(); },
      lock(v) { btns.forEach(x => x.disabled = v); }
    };
  },
  multi(st, onChange) {
    const sel = new Set();
    const w = el(`<div class="options multi">${st.options.map((o, i) => `<button class="opt" data-i="${i}" aria-pressed="false"><span class="box" aria-hidden="true"></span>${esc(o)}</button>`).join("")}</div>`);
    const btns = [...w.querySelectorAll(".opt")];
    btns.forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      sel.has(i) ? sel.delete(i) : sel.add(i);
      b.classList.toggle("sel", sel.has(i)); b.setAttribute("aria-pressed", sel.has(i)); onChange();
    });
    w.prepend(el(`<p class="tip">Pots marcar-ne més d'una.</p>`));
    return {
      el: w, ready: () => sel.size > 0,
      check() {
        const ans = new Set(st.answers);
        btns.forEach((b, i) => { if (sel.has(i)) b.classList.add(ans.has(i) ? "right" : "wrong"); });
        return sel.size === ans.size && [...sel].every(i => ans.has(i));
      },
      reveal() { btns.forEach((b, i) => { b.classList.remove("wrong", "sel"); b.classList.toggle("right", st.answers.includes(i)); }); },
      reset() { sel.clear(); btns.forEach(b => { b.classList.remove("sel", "right", "wrong"); b.setAttribute("aria-pressed", "false"); }); onChange(); },
      lock(v) { btns.forEach(x => x.disabled = v); }
    };
  },
  tap(st, onChange) {
    let sel = null;
    const w = el(`<p class="tap-text"></p>`);
    const frags = [];
    st.parts.forEach(p => {
      if (typeof p === "string") w.appendChild(document.createTextNode(p));
      else {
        const b = el(`<button class="frag">${esc(p.t)}</button>`);
        b._ok = !!p.ok;
        b.onclick = () => { sel = b; frags.forEach(x => x.classList.toggle("sel", x === b)); onChange(); };
        frags.push(b); w.appendChild(b);
      }
    });
    return {
      el: w, ready: () => !!sel,
      check() { sel.classList.add(sel._ok ? "right" : "wrong"); return sel._ok; },
      reveal() { frags.forEach(x => { x.classList.remove("sel", "wrong"); if (x._ok) x.classList.add("right"); }); },
      reset() { sel = null; frags.forEach(x => x.classList.remove("sel", "right", "wrong")); onChange(); },
      lock(v) { frags.forEach(x => x.disabled = v); }
    };
  },
  build(st, onChange) {
    const filled = st.slots.map(() => null);
    const w = el(`<div class="build">
      <div class="slots">${st.slots.map((s, i) => `<div class="slot-row"><span class="slot-label">${esc(s.label)}</span><button class="slot" data-s="${i}" aria-label="${esc(s.label)}: buit">—</button></div>`).join("")}</div>
      <div class="chips-pool">${shuffle(st.chips.map((c, i) => ({ c, i }))).map(o => `<button class="chip-btn" data-c="${o.i}">${esc(o.c)}</button>`).join("")}</div></div>`);
    const slots = [...w.querySelectorAll(".slot")];
    const chips = [...w.querySelectorAll(".chip-btn")];
    const draw = () => {
      slots.forEach((s, i) => {
        s.textContent = filled[i] === null ? "Toca una peça…" : st.chips[filled[i]];
        s.classList.toggle("empty", filled[i] === null);
      });
      chips.forEach(c => c.classList.toggle("used", filled.includes(+c.dataset.c)));
      onChange();
    };
    chips.forEach(c => c.onclick = () => {
      const ci = +c.dataset.c;
      if (filled.includes(ci)) return;
      const e = filled.indexOf(null);
      if (e >= 0) { filled[e] = ci; draw(); }
    });
    slots.forEach(s => s.onclick = () => { filled[+s.dataset.s] = null; slots.forEach(x => x.classList.remove("right", "wrong")); draw(); });
    draw();
    return {
      el: w, ready: () => filled.every(x => x !== null),
      check() {
        let ok = true;
        filled.forEach((ci, i) => { const good = st.slots[i].accept.includes(ci); slots[i].classList.add(good ? "right" : "wrong"); if (!good) ok = false; });
        return ok;
      },
      reveal() {
        const used = new Set();
        st.slots.forEach((s, i) => { const c = s.accept.find(a => !used.has(a)); used.add(c); filled[i] = c; });
        draw(); slots.forEach(s => { s.classList.remove("wrong"); s.classList.add("right"); });
      },
      reset() { filled.fill(null); slots.forEach(x => x.classList.remove("right", "wrong")); draw(); },
      lock(v) { slots.concat(chips).forEach(x => x.disabled = v); }
    };
  }
};

function optionsWidget(st, onChange) {
  let sel = null;
  const w = el(`<div class="options">${st.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="letter" aria-hidden="true">${"ABCD"[i]}</span>${esc(o)}</button>`).join("")}</div>`);
  const btns = [...w.querySelectorAll(".opt")];
  btns.forEach(b => b.onclick = () => { sel = +b.dataset.i; btns.forEach(x => x.classList.toggle("sel", x === b)); onChange(); });
  return {
    el: w, ready: () => sel !== null,
    check() { const ok = sel === st.answer; btns[sel].classList.add(ok ? "right" : "wrong"); return ok; },
    reveal() { btns.forEach(x => x.classList.remove("wrong", "sel")); btns[st.answer].classList.add("right"); },
    reset() { sel = null; btns.forEach(x => x.classList.remove("sel", "right", "wrong")); onChange(); },
    lock(v) { btns.forEach(x => x.disabled = v); }
  };
}

/* ---------- Targetes ràpides amb combo ---------- */
function renderCards(st, body, foot) {
  const cards = shuffle(st.cards);
  let i = 0, combo = 0, errors = 0, gained = 0;
  const results = [];
  if (RUN.mode === "review") body.appendChild(el(`<span class="level-tag review">🔁 Repàs</span>`));
  body.appendChild(el(`<h2 class="step-prompt">${esc(st.prompt)}</h2>`));
  const stage = el(`<div class="cards-stage">
      <div class="cards-meta"><span id="cdCount"></span><span class="combo" id="cdCombo" aria-live="polite"></span></div>
      <div class="swipe-card" id="cdCard"></div>
      <p class="combo-msg" id="cdMsg" aria-live="polite"></p>
      <div class="cards-btns">
        <button class="label-btn l0">${esc(st.labels[0])}</button>
        <button class="label-btn l1">${esc(st.labels[1])}</button>
      </div></div>`);
  body.appendChild(stage);
  const card = stage.querySelector("#cdCard");
  const btns = [stage.querySelector(".l0"), stage.querySelector(".l1")];
  const draw = () => {
    stage.querySelector("#cdCount").textContent = `${i + 1} / ${cards.length}`;
    stage.querySelector("#cdCombo").textContent = combo >= 2 ? `🔥 ×${combo}` : "";
    card.className = "swipe-card in";
    card.textContent = cards[i].t;
  };
  const answer = choice => {
    btns.forEach(b => b.disabled = true);
    const ok = choice === cards[i].a;
    results.push({ t: cards[i].t, a: cards[i].a, ok });
    if (ok) {
      combo++; gained += RUN.mode === "revenge" ? 1 : 2;
      card.classList.add("good", choice === 0 ? "out-left" : "out-right");
      stage.querySelector("#cdMsg").textContent = combo >= 3 ? COMBO_MSGS[Math.min(combo - 3, COMBO_MSGS.length - 1)] : "";
    } else {
      combo = 0; errors++;
      card.classList.add("bad");
      stage.querySelector("#cdMsg").textContent = "Era: «" + st.labels[cards[i].a] + "»";
    }
    setTimeout(() => {
      i++;
      btns.forEach(b => b.disabled = false);
      if (i < cards.length) { draw(); if (!ok) stage.querySelector("#cdMsg").textContent = ""; }
      else summary();
    }, ok ? 480 : 1300);
  };
  btns.forEach((b, k) => b.onclick = () => answer(k));
  const keyH = e => {
    if (!document.body.contains(stage)) { document.removeEventListener("keydown", keyH); return; }
    if (e.key === "ArrowLeft") btns[0].click();
    if (e.key === "ArrowRight") btns[1].click();
  };
  document.addEventListener("keydown", keyH);
  draw();

  function summary() {
    document.removeEventListener("keydown", keyH);
    const firstTry = errors === 0;
    RUN.scored++; RUN.xp += gained;
    if (firstTry) RUN.ok++;
    const key = RUN.items[RUN.i].key;
    if (RUN.mode === "review") reviewResult(key, firstTry);
    else if (!firstTry && RUN.mode === "lesson") RUN.failed.push(key);
    updateTop();
    body.innerHTML = "";
    body.appendChild(el(`<div class="cards-summary">
      <h2>${errors === 0 ? "Totes bé! 🎯" : `${cards.length - errors} de ${cards.length}`}</h2>
      <ul>${results.map(r => `<li class="${r.ok ? "ok" : "ko"}"><span>${r.ok ? "✔" : "✖"}</span><div>${esc(r.t)}<small>${esc(st.labels[r.a])}</small></div></li>`).join("")}</ul>
      <p class="why">${esc(st.why)}</p></div>`));
    foot.innerHTML = "";
    band(foot, errors === 0 ? "ok" : "neutral", errors === 0 ? "Perfecte!" : "Repassa les que has fallat.", `+${gained} XP`, null);
  }
}

/* ---------- Text de la resposta correcta (per al resum) ---------- */
function answerText(st) {
  switch (st.type) {
    case "choice": case "chat": return st.options[st.answer];
    case "vs": return st.answer === 0 ? st.a : st.b;
    case "multi": return st.answers.map(i => st.options[i]).join(" · ");
    case "tap": return (st.parts.find(p => p.ok) || {}).t;
    case "build": {
      const used = new Set();
      return st.slots.map(s => { const c = s.accept.find(a => !used.has(a)); used.add(c); return s.label + ": " + st.chips[c]; }).join(" → ");
    }
    case "cards": return st.cards.map(c => `${c.t} → ${st.labels[c.a]}`).join(" | ");
    default: return "";
  }
}

/* ---------- Tancament ---------- */
function finishRun() {
  if (RUN.mode === "revenge") {
    const prev = RUN.prev;
    prev.xp += RUN.xp;
    prev.revenged = true;
    RUN = prev;
    return showEnd();
  }
  showEnd();
}

function showEnd() {
  const run = RUN;
  const screens = [];
  if (run.mode === "lesson" && run.failed.length && !run.revenged) screens.push(scrRevenge);
  screens.push(scrDone);
  if (run.lesson.rule) screens.push(scrRule);
  if (run.mode === "lesson" && run.failed.length) screens.push(scrResisted);
  screens.push(scrRank, scrStreak);
  if (!todayGoal().arena) screens.push(scrArena);

  let committed = false;
  let rankUp = false;
  const commit = () => {
    if (committed) return;
    committed = true;
    if (run.mode === "lesson") {
      const prev = S.lessons[run.lesson.id];
      S.lessons[run.lesson.id] = { best: Math.max(run.ok, prev ? prev.best : 0), total: run.scored, date: today() };
      run.failed.forEach(k => scheduleReview(k));
    }
    markActive("lesson");
    rankUp = addXP(run.xp).rankUp;
    save();
  };

  let idx = 0;
  const body = document.getElementById("lsBody");
  const foot = document.getElementById("lsFoot");
  const prog = document.getElementById("lsProg");
  if (prog) prog.style.width = "100%";
  const next = () => { idx++; idx < screens.length ? screens[idx]() : exit(); };
  const exit = () => { endLessonMode(); location.hash = "#inici"; };
  const btn = (label, fn, cls = "primary big") => { const b = el(`<button class="${cls}">${esc(label)}</button>`); b.onclick = fn; foot.appendChild(b); return b; };
  const clear = () => { body.innerHTML = ""; foot.innerHTML = ""; };

  function scrRevenge() {
    clear();
    body.appendChild(el(`<div class="end-screen"><div class="mascot-big">${MASCOT.emoji}</div>
      <h2>Revenja?</h2><p>${run.failed.length === 1 ? "Hi ha una pregunta que se t'ha resistit." : `Hi ha ${run.failed.length} preguntes que se t'han resistit.`} Vols tornar-hi ara que la tens fresca?</p></div>`));
    btn("Sí, ara mateix", () => startRevenge(run));
    btn("Ara no", next, "secondary big");
  }
  function scrDone() {
    commit();
    clear();
    confetti();
    body.appendChild(el(`<div class="end-screen">
      <div class="trophy" aria-hidden="true">🏆</div>
      <h2>${run.mode === "review" ? "Repàs completat!" : "Lliçó superada!"}</h2>
      <div class="end-stats">
        <div><b>${run.ok}/${run.scored}</b><span>a la primera</span></div>
        <div><b>+${run.xp}</b><span>XP</span></div>
      </div></div>`));
    btn("Continua", next);
  }
  function scrRule() {
    clear();
    body.appendChild(el(`<div class="end-screen">
      <p class="kicker">El que t'emportes</p>
      <div class="rule-card"><span>LA CLAU</span><p>${esc(run.lesson.rule.text)}</p></div>
      <p class="source">📚 ${esc(run.lesson.rule.source)}</p></div>`));
    btn("Continua", next);
  }
  function scrResisted() {
    clear();
    const due = addDays(today(), REVIEW_BOXES[0]);
    body.appendChild(el(`<div class="end-screen left">
      <h2>El que se t'ha resistit</h2>
      <p>Ho repassaràs d'ací a ${REVIEW_BOXES[0]} dies (${esc(prettyDate(due))}).</p>
      ${run.failed.map(k => { const st = stepFromKey(k); return `<div class="resisted"><b>${esc(st.prompt)}</b><p>✅ ${esc(answerText(st))}</p><small>${esc(st.why)}</small></div>`; }).join("")}
    </div>`));
    btn("Continua", next);
  }
  function scrRank() {
    clear();
    const r = rankInfo();
    if (rankUp) confetti();
    body.appendChild(el(`<div class="end-screen">
      ${rankUp ? `<p class="kicker">Nou rang!</p>` : ""}
      <div class="mascot-big rank-badge">${r.rank.badge}</div>
      <h2>${esc(r.rank.name)}</h2>
      <div class="xpbar"><span style="width:${r.pct}%"></span></div>
      <p>${r.next ? `${S.xp} XP · et falten ${r.next.xp - S.xp} XP per a ser <b>${esc(r.next.name)}</b>` : `${S.xp} XP · has arribat al rang màxim!`}</p></div>`));
    btn("Continua", next);
  }
  function scrStreak() {
    clear();
    const s = streak(), g = nextStreakGoal();
    body.appendChild(el(`<div class="end-screen">
      <div class="flame" aria-hidden="true">🔥</div>
      <h2>${s} ${s === 1 ? "dia" : "dies"} de ratxa</h2>
      ${weekStrip()}
      <p>Pròxima fita: <b>${g.goal} dies</b>, el ${esc(prettyDate(g.date))}.</p></div>`));
    btn("Continua", next);
  }
  function scrArena() {
    clear();
    body.appendChild(el(`<div class="end-screen">
      <div class="mascot-big">⚔️</div>
      <h2>Et falta el Repte del dia</h2>
      <p>Per a completar l'objectiu d'avui, rebat l'afirmació del dia a l'Arena.</p></div>`));
    btn("Vés a l'Arena", () => { endLessonMode(); location.hash = "#arena"; });
    btn("Ara no", exit, "secondary big");
  }
  screens[0]();
}

function weekStrip() {
  return `<div class="week">${weekKeys().map((k, i) => `<span class="wd ${isActive(k) ? "on" : ""} ${k === today() ? "today" : ""}"><i>${isActive(k) ? "🔥" : ""}</i>${WEEKDAYS_SHORT[i]}</span>`).join("")}</div>`;
}
