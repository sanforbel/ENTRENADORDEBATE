/* Motor de jornades (lliçons): exercicis, veredicte, ajuda per passos i acta final. */

let RUN = null;

const TYPE_LABEL = {
  chat: "Transcripció", choice: "Pregunta", vs: "Cara a cara", multi: "Selecció",
  tap: "Subratllat", cards: "Classificació", build: "Esquema"
};

function startLesson(lessonId) {
  const f = findLesson(lessonId);
  if (!f) { location.hash = "#calendari"; return; }
  RUN = newRun("lesson", f.lesson, f.unit, f.lesson.steps.map((s, i) => ({ step: s, key: f.lesson.id + "#" + i })));
  renderLessonShell();
}

function startReview() {
  const items = dueReviews().map(r => ({ step: stepFromKey(r.key), key: r.key })).filter(x => x.step);
  if (!items.length) { toast("No tens cap exercici pendent de revisió."); location.hash = "#inici"; return; }
  RUN = newRun("review", { title: "Sessió de revisió", rule: null }, { title: "Revisió", color: "#334155" }, shuffle(items).slice(0, 10));
  renderLessonShell();
}

function startRepeat(prev) {
  RUN = newRun("repeat", prev.lesson, prev.unit, prev.failed.map(k => prev.items.find(x => x.key === k)));
  RUN.prev = prev;
  renderLessonShell();
}

function newRun(mode, lesson, unit, items) {
  return { mode, lesson, unit, items, i: 0, xp: 0, ok: 0, scored: 0, failed: [], results: [] };
}

function renderLessonShell() {
  const view = document.getElementById("view");
  document.body.classList.add("in-lesson");
  view.innerHTML = "";
  const shell = el(`
    <section class="lesson" style="--unit:${RUN.unit.color}">
      <div class="lesson-top">
        <button class="text-btn" id="lsClose">✕ Tanca</button>
        <div class="lesson-title"><span class="kicker">${esc(RUN.mode === "review" ? "Revisió" : RUN.mode === "repeat" ? "Repetició" : RUN.unit.title)}</span><b>${esc(RUN.lesson.title)}</b></div>
        <button class="text-btn" id="lsSpeak" title="Llig en veu alta">🔊</button>
        <span class="pts" id="lsXP">0 pts</span>
      </div>
      <div class="step-line"><span id="lsCount"></span><div class="progress" role="progressbar" aria-label="Progrés de la jornada"><span id="lsProg"></span></div></div>
      <div class="lesson-body" id="lsBody"></div>
      <div class="lesson-foot" id="lsFoot"></div>
    </section>`);
  view.appendChild(shell);
  shell.querySelector("#lsClose").onclick = () => {
    if (confirm("Vols tancar la sessió? No es guardarà el progrés d'esta jornada.")) { endLessonMode(); location.hash = "#calendari"; }
  };
  shell.querySelector("#lsSpeak").onclick = () => {
    const st = RUN.items[RUN.i] && RUN.items[RUN.i].step;
    if (!st) return;
    if (!S.settings.voice) { S.settings.voice = true; save(); toast("Lectura en veu alta activada (es pot desactivar al Perfil)."); }
    speak([st.title, st.hook, st.prompt, (st.points || []).join(". "), st.a, st.b].filter(Boolean).join(". "));
  };
  renderStep();
}

function endLessonMode() {
  document.body.classList.remove("in-lesson");
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function updateTop() {
  const n = RUN.items.length;
  const p = document.getElementById("lsProg");
  if (p) p.style.width = Math.round(100 * Math.min(RUN.i, n) / n) + "%";
  const c = document.getElementById("lsCount");
  if (c) c.textContent = RUN.i < n ? `Exercici ${RUN.i + 1} de ${n}` : "Acta";
  const x = document.getElementById("lsXP");
  if (x) x.textContent = RUN.xp + " pts";
}

function renderStep() {
  updateTop();
  if (RUN.i >= RUN.items.length) return finishRun();
  const { step } = RUN.items[RUN.i];
  const body = document.getElementById("lsBody");
  const foot = document.getElementById("lsFoot");
  body.innerHTML = ""; foot.innerHTML = "";
  window.scrollTo(0, 0);

  if (step.type === "intro") return renderIntro(step, body, foot);
  if (step.type === "concept") return renderConcept(step, body, foot);

  const checkBtn = el(`<button class="primary" disabled>Comprova</button>`);
  let W = null;
  W = (step.type === "cards" ? sortWidget : WIDGETS[step.type])(step, () => { if (W) checkBtn.disabled = !W.ready(); });

  const head = el(`<div class="ex-head"><span class="ex-type">${esc(TYPE_LABEL[step.type] || "")}</span>${step.level ? `<span class="ex-flag">${esc(step.level)}</span>` : ""}${RUN.mode === "review" ? `<span class="ex-flag">Revisió</span>` : ""}</div>`);
  body.appendChild(head);
  if (step.type === "chat") body.appendChild(transcriptBlock(step));
  body.appendChild(el(`<h2 class="step-prompt">${esc(step.prompt)}</h2>`));
  body.appendChild(W.el);

  let attempts = 0;
  const showCheck = () => { foot.innerHTML = ""; foot.appendChild(checkBtn); checkBtn.disabled = !W.ready(); };
  showCheck();

  checkBtn.onclick = () => {
    const ok = W.check();
    W.lock(true);
    if (ok) {
      const gain = RUN.mode === "repeat" ? 3 : (attempts === 0 ? 10 : 5);
      stepDone(attempts === 0 ? "first" : "retry", gain);
      verdict(foot, "ok", "Correcte", `+${gain} pts`, step.why);
    } else {
      attempts++;
      const v = verdict(foot, "ko", "Revisa-ho", attempts >= 2 ? "Pots demanar una pista o la resolució." : "Torna a llegir-ho amb calma.", null, true);
      const actions = v.querySelector(".verdict-actions");
      if (attempts >= 2) {
        const hint = el(`<button class="text-btn">Pista</button>`);
        const sol = el(`<button class="text-btn">Resolució</button>`);
        hint.onclick = () => { const p = v.querySelector(".verdict-note"); p.textContent = step.hint || step.why; p.hidden = false; };
        sol.onclick = () => { W.reveal(); stepDone("solved", 0); verdict(foot, "neutral", "Resolt", "Passa a la llista de revisió.", step.why, false, true); };
        actions.append(hint, sol);
      }
      const retry = el(`<button class="primary">Torna-ho a intentar</button>`);
      retry.onclick = () => { W.reset(); W.lock(false); showCheck(); };
      actions.appendChild(retry);
    }
  };
}

function stepDone(result, gain) {
  const key = RUN.items[RUN.i].key;
  RUN.results[RUN.i] = result;
  RUN.scored++;
  RUN.xp += gain;
  const first = result === "first";
  if (first) RUN.ok++;
  if (RUN.mode === "review") reviewResult(key, first);
  else if (!first && RUN.mode === "lesson") RUN.failed.push(key);
  updateTop();
}

function verdict(foot, kind, stamp, sub, note, noContinue, noteOpen) {
  foot.innerHTML = "";
  const v = el(`
    <div class="verdict ${kind}" role="status">
      <span class="stamp">${esc(stamp)}</span>
      <span class="verdict-sub">${esc(sub || "")}</span>
      <div class="verdict-actions"></div>
      <p class="verdict-note" ${noteOpen ? "" : "hidden"}>${note ? esc(note) : ""}</p>
    </div>`);
  const actions = v.querySelector(".verdict-actions");
  if (note && !noteOpen) {
    const j = el(`<button class="text-btn">Justificació</button>`);
    j.onclick = () => { const n = v.querySelector(".verdict-note"); n.hidden = !n.hidden; };
    actions.appendChild(j);
  }
  if (!noContinue) {
    const c = el(`<button class="primary">Continua</button>`);
    c.onclick = () => { RUN.i++; renderStep(); };
    actions.appendChild(c);
    setTimeout(() => c.focus(), 30);
  }
  foot.appendChild(v);
  return v;
}

function continueBtn(foot, label = "Continua") {
  const c = el(`<button class="primary">${esc(label)}</button>`);
  c.onclick = () => { RUN.i++; renderStep(); };
  foot.appendChild(c);
  setTimeout(() => c.focus(), 30);
}

/* ---------- Pantalles informatives ---------- */
function renderIntro(st, body, foot) {
  body.appendChild(el(`
    <div class="doc">
      <p class="doc-label">Fitxa de la jornada</p>
      <h2 class="doc-title">${esc(st.title)}</h2>
      <dl class="fitxa">
        <dt>Bloc</dt><dd>${esc(RUN.unit.title)}</dd>
        <dt>Plantejament</dt><dd>${esc(st.hook)}</dd>
        ${(st.cast || []).length ? `<dt>Intervenen</dt><dd>${st.cast.map(c => esc(CAST[c].name)).join(", ")}</dd>` : ""}
        <dt>Exercicis</dt><dd>${RUN.items.filter(x => !["intro", "concept"].includes(x.step.type)).length}</dd>
      </dl>
    </div>`));
  continueBtn(foot, "Comença la sessió");
}

function renderConcept(st, body, foot) {
  body.appendChild(el(`
    <div class="doc reglament">
      <p class="doc-label">Reglament de la jornada</p>
      <h2 class="doc-title">${esc(st.title)}</h2>
      ${st.points.map((p, i) => `<p class="article"><span>Art. ${i + 1}.</span> ${p}</p>`).join("")}
    </div>`));
  continueBtn(foot, "Llegit");
}

function transcriptBlock(st) {
  return el(`
    <div class="transcript-doc" aria-label="Transcripció">
      <p class="doc-label">${esc(st.group || "Conversa")}</p>
      ${st.msgs.map(m => `<p><span class="speaker">${esc(CAST[m.who].name.toUpperCase())}.</span> ${esc(m.text)}</p>`).join("")}
    </div>`);
}

/* ---------- Ginys ---------- */
const WIDGETS = {
  choice: optionsWidget,
  chat: optionsWidget,
  vs(st, onChange) {
    let sel = null;
    const w = el(`<div class="vs">
      <button class="vs-card" data-i="0"><span class="vs-tag">Intervenció A</span>${esc(st.a)}</button>
      <button class="vs-card" data-i="1"><span class="vs-tag">Intervenció B</span>${esc(st.b)}</button></div>`);
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
    const w = el(`<div class="options multi"><p class="tip">Pots marcar-ne més d'una.</p>${st.options.map((o, i) => `<button class="opt" data-i="${i}" aria-pressed="false"><span class="box" aria-hidden="true"></span>${esc(o)}</button>`).join("")}</div>`);
    const btns = [...w.querySelectorAll(".opt")];
    btns.forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      sel.has(i) ? sel.delete(i) : sel.add(i);
      b.classList.toggle("sel", sel.has(i)); b.setAttribute("aria-pressed", sel.has(i)); onChange();
    });
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
    const w = el(`<div class="tap-wrap"><p class="tip">Toca el fragment per a subratllar-lo.</p><p class="tap-text"></p></div>`);
    const p = w.querySelector(".tap-text");
    const frags = [];
    st.parts.forEach(part => {
      if (typeof part === "string") p.appendChild(document.createTextNode(part));
      else {
        const b = el(`<button class="frag">${esc(part.t)}</button>`);
        b._ok = !!part.ok;
        b.onclick = () => { sel = b; frags.forEach(x => x.classList.toggle("sel", x === b)); onChange(); };
        frags.push(b); p.appendChild(b);
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
      <table class="schema"><tbody>${st.slots.map((s, i) => `<tr><th scope="row">${esc(s.label)}</th><td><button class="slot" data-s="${i}">—</button></td></tr>`).join("")}</tbody></table>
      <p class="tip">Peces disponibles (toca-les per a col·locar-les; toca una casella plena per a buidar-la):</p>
      <div class="chips-pool">${shuffle(st.chips.map((c, i) => ({ c, i }))).map(o => `<button class="chip-btn" data-c="${o.i}">${esc(o.c)}</button>`).join("")}</div></div>`);
    const slots = [...w.querySelectorAll(".slot")];
    const chips = [...w.querySelectorAll(".chip-btn")];
    const draw = () => {
      slots.forEach((s, i) => { s.textContent = filled[i] === null ? "(buit)" : st.chips[filled[i]]; s.classList.toggle("empty", filled[i] === null); });
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
  const w = el(`<div class="options">${st.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="letter" aria-hidden="true">${"abcd"[i]})</span>${esc(o)}</button>`).join("")}</div>`);
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

/* Taula de classificació: cada afirmació es classifica en una de dues columnes. */
function sortWidget(st, onChange) {
  const rows = shuffle(st.cards.map((c, i) => ({ ...c, i })));
  const sel = {};
  const w = el(`<div class="sort-wrap"><table class="sort-table">
    <thead><tr><th>Afirmació</th><th>${esc(st.labels[0])}</th><th>${esc(st.labels[1])}</th></tr></thead>
    <tbody>${rows.map(r => `<tr data-r="${r.i}"><td>${esc(r.t)}</td>${[0, 1].map(k => `<td class="cell"><button class="mark" data-k="${k}" aria-label="${esc(st.labels[k])}" aria-pressed="false"></button></td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`);
  const trs = [...w.querySelectorAll("tbody tr")];
  trs.forEach(tr => tr.querySelectorAll(".mark").forEach(b => b.onclick = () => {
    sel[tr.dataset.r] = +b.dataset.k;
    tr.querySelectorAll(".mark").forEach(x => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); x.textContent = on ? "✓" : ""; });
    tr.classList.remove("right", "wrong");
    onChange();
  }));
  const setAll = () => trs.forEach(tr => {
    const r = st.cards[tr.dataset.r];
    tr.querySelectorAll(".mark").forEach(x => { const on = +x.dataset.k === r.a; x.classList.toggle("on", on); x.textContent = on ? "✓" : ""; });
  });
  return {
    el: w, ready: () => Object.keys(sel).length === st.cards.length,
    check() {
      let ok = true;
      trs.forEach(tr => { const good = sel[tr.dataset.r] === st.cards[tr.dataset.r].a; tr.classList.add(good ? "right" : "wrong"); if (!good) ok = false; });
      return ok;
    },
    reveal() { trs.forEach(tr => { tr.classList.remove("wrong"); tr.classList.add("right"); sel[tr.dataset.r] = st.cards[tr.dataset.r].a; }); setAll(); },
    reset() { trs.forEach(tr => { if (tr.classList.contains("wrong")) { delete sel[tr.dataset.r]; tr.querySelectorAll(".mark").forEach(x => { x.classList.remove("on"); x.textContent = ""; }); } tr.classList.remove("right", "wrong"); }); onChange(); },
    lock(v) { w.querySelectorAll(".mark").forEach(x => x.disabled = v); }
  };
}

/* ---------- Resposta correcta en text (per a l'acta) ---------- */
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

/* ---------- Acta de la sessió ---------- */
function finishRun() {
  if (RUN.mode === "repeat") {
    const prev = RUN.prev, gained = RUN.xp;
    addXP(gained); save();
    prev.repeated = { ok: RUN.ok, total: RUN.scored, xp: gained };
    RUN = prev;
    return renderActa();
  }
  commitRun();
  renderActa();
}

function commitRun() {
  if (RUN.committed) return;
  RUN.committed = true;
  if (RUN.mode === "lesson") {
    const prev = S.lessons[RUN.lesson.id];
    S.lessons[RUN.lesson.id] = { best: Math.max(RUN.ok, prev ? prev.best : 0), total: RUN.scored, date: today() };
    RUN.failed.forEach(k => scheduleReview(k));
  }
  markActive("lesson");
  RUN.rankUp = addXP(RUN.xp).rankUp;
  save();
}

function renderActa() {
  const run = RUN;
  updateTop();
  const body = document.getElementById("lsBody");
  const foot = document.getElementById("lsFoot");
  body.innerHTML = ""; foot.innerHTML = "";
  window.scrollTo(0, 0);
  const r = rankInfo();
  const label = { first: "Correcte a la primera", retry: "Correcte en repetir", solved: "Resolt amb ajuda" };
  const rows = run.items.map((it, i) => ({ it, i, res: run.results[i] })).filter(x => x.res);
  const due = addDays(today(), REVIEW_BOXES[0]);
  body.appendChild(el(`
    <div class="doc acta">
      <p class="doc-label">Acta de la ${run.mode === "review" ? "sessió de revisió" : "jornada"}</p>
      <h2 class="doc-title">${esc(run.lesson.title)}</h2>
      <p class="muted">${esc(prettyDate(today()))}${S.nick ? " · " + esc(S.nick) : ""}</p>
      <table class="table acta-table"><thead><tr><th>Núm.</th><th>Exercici</th><th>Resultat</th></tr></thead>
        <tbody>${rows.map((x, n) => `<tr class="${x.res}"><td>${n + 1}</td><td>${esc(TYPE_LABEL[x.it.step.type])}</td><td>${esc(label[x.res])}</td></tr>`).join("")}</tbody></table>
      <p class="acta-sum"><b>${run.ok} de ${run.scored}</b> correctes a la primera · <b>+${run.xp} pts</b>${run.repeated ? ` · Repetició: ${run.repeated.ok}/${run.repeated.total} (+${run.repeated.xp} pts)` : ""}</p>
      ${run.lesson.rule ? `<div class="conclusio"><p class="doc-label">Conclusió de la sessió</p><p class="conclusio-text">${esc(run.lesson.rule.text)}</p><p class="ref">Referència: ${esc(run.lesson.rule.source)}</p></div>` : ""}
      ${run.mode === "lesson" && run.failed.length ? `<div class="revisar"><p class="doc-label">Per a revisar el ${esc(prettyDate(due))}</p>
        ${run.failed.map(k => { const st = stepFromKey(k); return `<div class="rev-item"><b>${esc(st.prompt)}</b><p>Resposta: ${esc(answerText(st))}</p></div>`; }).join("")}</div>` : ""}
      <div class="acta-foot">
        <div><span class="doc-label">Credencial</span><b>${esc(r.rank.name)}</b>${run.rankUp ? ` <span class="ex-flag">Nova</span>` : ""}<small>${r.next ? `${ptsLabel(r.next.xp - S.xp)} per a ${esc(r.next.name)}` : "Nivell màxim"}</small></div>
        <div><span class="doc-label">Assistència</span><b>${streak()} ${streak() === 1 ? "dia seguit" : "dies seguits"}</b><small>Total: ${S.xp} pts</small></div>
      </div>
    </div>`));
  const close = el(`<button class="primary">Tanca l'acta</button>`);
  close.onclick = () => { endLessonMode(); location.hash = "#inici"; };
  if (run.mode === "lesson" && run.failed.length && !run.repeated) {
    const rep = el(`<button class="secondary">${run.failed.length === 1 ? "Repeteix ara la fallada" : "Repeteix ara les " + run.failed.length + " fallades"}</button>`);
    rep.onclick = () => startRepeat(run);
    foot.appendChild(rep);
  }
  if (!todayGoal().arena) {
    const m = el(`<button class="secondary">Vés a la moció del dia</button>`);
    m.onclick = () => { endLessonMode(); location.hash = "#mocio"; };
    foot.appendChild(m);
  }
  foot.appendChild(close);
}

function attendanceStrip() {
  return `<table class="attendance"><tr>${weekKeys().map((k, i) => `<th class="${k === today() ? "today" : ""}">${WEEKDAYS_SHORT[i]}</th>`).join("")}</tr>
    <tr>${weekKeys().map(k => `<td class="${k === today() ? "today" : ""}">${isActive(k) ? "✓" : k < today() ? "·" : ""}</td>`).join("")}</tr></table>`;
}
