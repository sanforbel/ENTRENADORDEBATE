/* Sala de debat: simulació de torns amb cronòmetre, micròfon, rúbrica i exportació. */

const DEFAULT_TURN_MIN = [4, 5, 5, 3];
function defaultTurns() { return DEFAULT_TURN_NAMES.map((name, i) => ({ name, min: DEFAULT_TURN_MIN[i] })); }
const CRUTCHES = ["eh", "ehh", "eeh", "mmm", "o siga", "osea", "o sea", "bo", "bueno", "vale", "en plan", "tipo", "saps", "sabes", "no?",
  "um", "uh", "erm", "like", "you know", "i mean", "basically", "euh", "ben", "bah", "du coup", "genre", "en fait", "voila"];
const MIC_LANGS = [["ca-ES", "ml_va"], ["es-ES", "ml_es"], ["en-GB", "ml_en"], ["fr-FR", "ml_fr"]];

let SALA = null;     // sessió en curs
let TIMER = null;    // interval del cronòmetre
let REC = null;      // reconeixement de veu

function stopSalaMedia() {
  if (TIMER) { clearInterval(TIMER); TIMER = null; }
  if (REC) { try { REC.onend = null; REC.stop(); } catch (e) {} REC = null; }
}

function sideLabel(v) { return { for: t("pos_for"), against: t("pos_against") }[v] || v || "—"; }

function renderSala() {
  stopSalaMedia();
  if (SALA && SALA.running) return renderTurn();
  const view = document.getElementById("view");
  view.innerHTML = "";
  const cfg = SALA && SALA.cfg || { mode: "torneig", topic: "", side: "for", lang: langInfo().speech, turns: defaultTurns(), rounds: 3, secs: 60, prep: 15 };
  const box = el(`<section class="page sala">
    <header class="page-head"><h1>${esc(t("sala_title"))}</h1><p>${esc(t("sala_sub"))}</p></header>
    <div class="tabs" role="tablist">
      <button role="tab" data-m="torneig">${esc(t("tab_t"))}</button>
      <button role="tab" data-m="lliure">${esc(t("tab_l"))}</button>
      <button role="tab" data-m="improvisat">${esc(t("tab_i"))}</button>
    </div>
    <div class="card">
      <div class="grid2">
        <label>${esc(t("topic"))}<input id="sTopic" type="text" placeholder="${esc(t("topic_ph"))}" value="${esc(cfg.topic)}"></label>
        <label>${esc(t("stance"))}<select id="sSide"><option value="for">${esc(t("pos_for"))}</option><option value="against">${esc(t("pos_against"))}</option></select></label>
        <label>${esc(t("mic_lang"))}<select id="sLang">${MIC_LANGS.map(([v, k]) => `<option value="${v}">${esc(t(k))}</option>`).join("")}</select></label>
      </div>
      <div id="sModeBox"></div>
      <div class="row"><button class="primary big" id="sGo">${esc(t("start"))}</button></div>
    </div>
    ${S.sala.length ? `<div class="card"><div class="bar"><h3>${esc(t("prev_debates"))}</h3><button class="secondary" id="sClear">${esc(t("clear_hist"))}</button></div>
      <ul class="hist">${S.sala.slice().reverse().slice(0, 8).map(h => `<li><b>${esc(h.topic || t("no_topic"))}</b> · ${esc(sideLabel(h.side))} · ${esc(prettyDate(h.date))} · <b>${h.grade != null ? h.grade.toFixed(1) : "—"}</b>/10</li>`).join("")}</ul></div>` : ""}
  </section>`);
  view.appendChild(box);
  box.querySelector("#sSide").value = cfg.side === "against" || cfg.side === "En contra" ? "against" : "for";
  box.querySelector("#sLang").value = cfg.lang;
  const modeBox = box.querySelector("#sModeBox");

  const drawMode = () => {
    box.querySelectorAll(".tabs button").forEach(b => { const on = b.dataset.m === cfg.mode; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
    if (cfg.mode === "torneig") {
      modeBox.innerHTML = `<p class="tip">${esc(t("turns_tip"))}</p>
        <div class="turns">${cfg.turns.map((tr, i) => `<div class="turn-row"><input data-i="${i}" data-k="name" value="${esc(tr.name)}" aria-label="${esc(t("turn_name_aria", { n: i + 1 }))}"><input data-i="${i}" data-k="min" type="number" min="0.5" max="15" step="0.5" value="${tr.min}" aria-label="${esc(t("minutes"))}"><span>${esc(t("min"))}</span><button class="icon-btn" data-del="${i}" aria-label="${esc(t("del_turn"))}">✕</button></div>`).join("")}</div>
        <div class="row"><button class="secondary" id="sAdd">${esc(t("add_turn"))}</button><button class="ghost-btn" id="sDefault">${esc(t("restore"))}</button></div>`;
      modeBox.querySelectorAll(".turn-row input").forEach(inp => inp.oninput = () => {
        const tr = cfg.turns[+inp.dataset.i];
        if (inp.dataset.k === "min") tr.min = Math.max(0.5, parseFloat(inp.value) || 1); else tr.name = inp.value;
      });
      modeBox.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { cfg.turns.splice(+b.dataset.del, 1); drawMode(); });
      modeBox.querySelector("#sAdd").onclick = () => { cfg.turns.push({ name: t("turn_n", { n: cfg.turns.length + 1 }), min: 3 }); drawMode(); };
      modeBox.querySelector("#sDefault").onclick = () => { cfg.turns = defaultTurns(); drawMode(); };
    } else if (cfg.mode === "lliure") {
      modeBox.innerHTML = `<div class="grid2">
        <label>${esc(t("rounds"))}<input id="sRounds" type="number" min="1" max="8" value="${cfg.rounds}"></label>
        <label>${esc(t("secs"))}<input id="sSecs" type="number" min="15" max="600" step="15" value="${cfg.secs}"></label></div>`;
      modeBox.querySelector("#sRounds").oninput = e => cfg.rounds = Math.max(1, +e.target.value || 1);
      modeBox.querySelector("#sSecs").oninput = e => cfg.secs = Math.max(15, +e.target.value || 60);
    } else {
      modeBox.innerHTML = `<p class="tip">${esc(t("impro_tip"))}</p>
        <div class="grid2"><label>${esc(t("prep_min"))}<input id="sPrep" type="number" min="1" max="30" value="${cfg.prep}"></label></div>
        <div class="row"><button class="secondary" id="sRand">${esc(t("draw"))}</button></div>`;
      modeBox.querySelector("#sPrep").oninput = e => cfg.prep = Math.max(1, +e.target.value || 15);
      modeBox.querySelector("#sRand").onclick = randomTopic;
    }
  };
  const randomTopic = () => {
    box.querySelector("#sTopic").value = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    box.querySelector("#sSide").value = Math.random() < 0.5 ? "for" : "against";
  };
  box.querySelectorAll(".tabs button").forEach(b => b.onclick = () => { cfg.mode = b.dataset.m; drawMode(); if (cfg.mode === "improvisat" && !box.querySelector("#sTopic").value) randomTopic(); });
  drawMode();
  const clr = box.querySelector("#sClear");
  if (clr) clr.onclick = () => { if (confirm(t("clear_confirm"))) { S.sala = []; save(); renderSala(); } };

  box.querySelector("#sGo").onclick = () => {
    cfg.topic = box.querySelector("#sTopic").value.trim();
    cfg.side = box.querySelector("#sSide").value;
    cfg.lang = box.querySelector("#sLang").value;
    if (!cfg.topic) { box.querySelector("#sTopic").focus(); toast(t("need_topic")); return; }
    const turns = cfg.mode === "lliure"
      ? Array.from({ length: cfg.rounds }, (_, i) => ({ name: t("turn_n", { n: i + 1 }), min: cfg.secs / 60 }))
      : cfg.turns.filter(tr => tr.name.trim());
    if (!turns.length) { toast(t("need_turn")); return; }
    SALA = { cfg, turns, i: 0, results: [], running: true, prep: cfg.mode === "improvisat" };
    SALA.prep ? renderPrep() : renderTurn();
  };
}

function fmt(sec) {
  const s = Math.abs(Math.round(sec));
  return (sec < 0 ? "+" : "") + pad(Math.floor(s / 60)) + ":" + pad(s % 60);
}

function renderPrep() {
  const view = document.getElementById("view");
  view.innerHTML = "";
  let left = SALA.cfg.prep * 60;
  const box = el(`<section class="page sala">
    <header class="page-head"><h1>${esc(t("prep_title"))}</h1><p><b>${esc(SALA.cfg.topic)}</b> · ${esc(t("stance") + t("colon"))}<b>${esc(sideLabel(SALA.cfg.side))}</b></p></header>
    <div class="card center"><div class="big-timer" id="pT">${fmt(left)}</div>
      <ol class="plan">${t("plan").map(p => `<li>${esc(p)}</li>`).join("")}</ol>
      <textarea id="pNotes" rows="6" placeholder="${esc(t("team_notes"))}">${esc(SALA.notes || "")}</textarea>
      <div class="row center"><button class="primary big" id="pGo">${esc(t("start_debate"))}</button><button class="secondary" id="pCancel">${esc(t("cancel"))}</button></div></div>
  </section>`);
  view.appendChild(box);
  TIMER = setInterval(() => {
    left--;
    const tm = box.querySelector("#pT");
    if (!tm) return stopSalaMedia();
    tm.textContent = fmt(Math.max(0, left));
    tm.classList.toggle("warn", left <= 60 && left > 0);
    if (left === 0) { tm.classList.add("over"); beep(); toast(t("prep_over")); }
  }, 1000);
  box.querySelector("#pGo").onclick = () => { SALA.notes = box.querySelector("#pNotes").value; SALA.prep = false; stopSalaMedia(); renderTurn(); };
  box.querySelector("#pCancel").onclick = () => { SALA.running = false; renderSala(); };
}

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination); o.frequency.value = 880; g.gain.value = 0.08;
    o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 350);
  } catch (e) {}
}

function renderTurn() {
  stopSalaMedia();
  if (SALA.prep) return renderPrep();
  if (SALA.i >= SALA.turns.length) return renderSalaSummary();
  const view = document.getElementById("view");
  const turn = SALA.turns[SALA.i];
  const total = Math.round(turn.min * 60);
  let left = total, running = false, finalText = "", interim = "";
  const rubric = SALA_RUBRIC.map(() => 0);
  const mission = TURN_MISSIONS[turn.name] || "";
  view.innerHTML = "";
  const box = el(`<section class="page sala">
    <header class="page-head"><h1>${esc(turn.name)} <small>(${SALA.i + 1}/${SALA.turns.length})</small></h1>
      <p><b>${esc(SALA.cfg.topic)}</b> · ${esc(sideLabel(SALA.cfg.side))}</p></header>
    <div class="turn-layout">
      <div class="card">
        ${mission ? `<p class="mission"><b>${esc(t("mission"))}</b> ${esc(mission)}</p>` : ""}
        <div class="timer-wrap"><div class="big-timer" id="tT">${fmt(left)}</div><div class="bar-track"><span id="tBar" style="width:100%"></span></div></div>
        <div class="row center">
          <button class="primary" id="tPlay">${esc(t("play"))}</button>
          <button class="secondary" id="tReset">${esc(t("reset"))}</button>
          <button class="mic" id="tMic" aria-pressed="false" title="${esc(t("mic_title"))}">${esc(t("mic"))}</button>
        </div>
        <p class="tip" id="tMicTip"></p>
        <div class="transcript" id="tTrans" aria-live="polite"><span class="muted">${esc(t("transcript_ph"))}</span></div>
        <textarea id="tManual" rows="4" placeholder="${esc(t("notes_ph"))}"></textarea>
        <div class="stats" id="tStats"></div>
      </div>
      <aside class="card">
        <div class="bar"><h3>${esc(t("rubric"))}</h3><span class="badge" id="tSum">0/12</span></div>
        <div class="rubric">${SALA_RUBRIC.map((c, i) => `<div class="r-line"><div><b>${esc(c.title)}</b><small>${esc(c.desc)}</small></div><div class="seg" data-i="${i}">${[0, 1, 2].map(v => `<button data-v="${v}" class="${v === 0 ? "sel" : ""}">${v}</button>`).join("")}</div></div>`).join("")}</div>
        <label>${esc(t("comment"))}<textarea id="tCom" rows="3" placeholder="${esc(t("comment_ph"))}"></textarea></label>
        <div class="row wrap">${t("presets").map(([lbl, txt]) => `<button class="chip-btn small" data-p="${esc(txt)}">${esc(lbl)}</button>`).join("")}</div>
        <div class="row"><button class="primary big" id="tSave">${esc(SALA.i + 1 < SALA.turns.length ? t("save_next") : t("save_end"))}</button></div>
        <button class="ghost-btn" id="tQuit">${esc(t("quit"))}</button>
      </aside>
    </div>
  </section>`);
  view.appendChild(box);
  const $ = s => box.querySelector(s);

  const text = () => (finalText + " " + $("#tManual").value).trim();
  const drawStats = () => {
    const txt = text();
    const words = txt ? txt.split(/\s+/).length : 0;
    const elapsed = total - left;
    const wpm = elapsed > 5 && finalText ? Math.round(finalText.trim().split(/\s+/).length / (elapsed / 60)) : null;
    const low = " " + strip(txt).replace(/[.,;:!?¿¡«»"()]/g, " ").replace(/\s+/g, " ") + " ";
    const cr = CRUTCHES.reduce((a, c) => a + (low.split(" " + strip(c) + " ").length - 1), 0);
    $("#tStats").innerHTML = `<span>${esc(tn("words", words))}</span>${wpm ? `<span title="${esc(t("wpm_t"))}">${esc(t("wpm", { n: wpm }))}</span>` : ""}<span title="${esc(t("crutches_t"))}">${esc(t("crutches", { n: cr }))}</span>`;
  };
  const drawTimer = () => {
    $("#tT").textContent = fmt(left);
    $("#tT").classList.toggle("warn", left <= 30 && left > 0);
    $("#tT").classList.toggle("over", left <= 0);
    $("#tBar").style.width = Math.max(0, 100 * left / total) + "%";
  };
  $("#tPlay").onclick = () => {
    running = !running;
    $("#tPlay").textContent = running ? t("pause") : t("resume");
    if (running) {
      TIMER = setInterval(() => {
        if (!document.body.contains(box)) return stopSalaMedia();
        left--;
        if (left === 0) beep();
        drawTimer(); drawStats();
      }, 1000);
    } else { clearInterval(TIMER); TIMER = null; }
  };
  $("#tReset").onclick = () => { left = total; drawTimer(); };

  // Micròfon (Web Speech API)
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { $("#tMic").disabled = true; $("#tMicTip").textContent = t("no_sr"); }
  $("#tMic").onclick = () => {
    if (REC) { REC.onend = null; REC.stop(); REC = null; $("#tMic").classList.remove("on"); $("#tMic").setAttribute("aria-pressed", "false"); return; }
    REC = new SR();
    REC.lang = SALA.cfg.lang; REC.continuous = true; REC.interimResults = true;
    REC.onresult = e => {
      interim = "";
      for (let k = e.resultIndex; k < e.results.length; k++) {
        if (e.results[k].isFinal) finalText += e.results[k][0].transcript + " ";
        else interim += e.results[k][0].transcript;
      }
      $("#tTrans").innerHTML = esc(finalText) + `<span class="muted">${esc(interim)}</span>`;
      drawStats();
    };
    REC.onerror = e => { $("#tMicTip").textContent = e.error === "not-allowed" ? t("mic_perm") : t("mic_err", { e: e.error }); };
    REC.onend = () => { if (REC) try { REC.start(); } catch (e) {} };
    try { REC.start(); $("#tMic").classList.add("on"); $("#tMic").setAttribute("aria-pressed", "true"); $("#tMicTip").textContent = t("mic_on"); }
    catch (e) { $("#tMicTip").textContent = t("mic_fail"); REC = null; }
  };
  $("#tManual").oninput = drawStats;

  box.querySelectorAll(".seg").forEach(seg => seg.querySelectorAll("button").forEach(b => b.onclick = () => {
    rubric[+seg.dataset.i] = +b.dataset.v;
    seg.querySelectorAll("button").forEach(x => x.classList.toggle("sel", x === b));
    $("#tSum").textContent = rubric.reduce((a, v) => a + v, 0) + "/12";
  }));
  box.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { $("#tCom").value += b.dataset.p; });

  $("#tSave").onclick = () => {
    SALA.results.push({ turn: turn.name, rubric: rubric.slice(), sum: rubric.reduce((a, v) => a + v, 0), comment: $("#tCom").value.trim(), text: text(), used: total - left, planned: total });
    SALA.i++;
    renderTurn();
  };
  $("#tQuit").onclick = () => { if (confirm(t("quit_confirm"))) { stopSalaMedia(); SALA.running = false; renderSala(); } };
  drawTimer(); drawStats();
}

function renderSalaSummary() {
  stopSalaMedia();
  const view = document.getElementById("view");
  const r = SALA.results;
  const sum = r.reduce((a, x) => a + x.sum, 0);
  const grade = r.length ? 10 * sum / (12 * r.length) : null;
  if (!SALA.saved) {
    SALA.saved = true;
    S.sala.push({ date: today(), topic: SALA.cfg.topic, side: SALA.cfg.side, grade, turns: r.length });
    markActive("sala");
    addXP(5 * r.length);
    save();
  }
  view.innerHTML = "";
  const box = el(`<section class="page sala">
    <header class="page-head"><h1>${esc(t("acta_debate"))}</h1><p><b>${esc(SALA.cfg.topic)}</b> · ${esc(sideLabel(SALA.cfg.side))}</p></header>
    <div class="score-hero"><div class="score-num"><b>${grade != null ? grade.toFixed(1) : "—"}</b><span>${esc(t("grade10"))}</span></div>
      <div><p>${esc(tn("sum_line", r.length, { a: sum, b: 12 * r.length }))}</p><p class="muted">${esc(t("practice_pts", { n: 5 * r.length }))}</p></div></div>
    <div class="card table-wrap"><table class="table"><thead><tr><th>${esc(t("th_turn"))}</th>${SALA_RUBRIC.map(c => `<th title="${esc(c.desc)}">${esc(c.title.split(" ")[0])}</th>`).join("")}<th>${esc(t("th_total"))}</th><th>${esc(t("th_time"))}</th></tr></thead>
      <tbody>${r.map(x => `<tr><td>${esc(x.turn)}</td>${x.rubric.map(v => `<td>${v}</td>`).join("")}<td><b>${x.sum}/12</b></td><td>${fmt(x.used)} / ${fmt(x.planned)}</td></tr>`).join("")}</tbody></table></div>
    ${r.filter(x => x.comment).map(x => `<div class="card"><b>${esc(x.turn)}:</b> ${esc(x.comment)}</div>`).join("")}
    <div class="row wrap"><button class="primary" id="sExp">${esc(t("export_txt"))}</button><button class="secondary" id="sNew">${esc(t("new_debate"))}</button></div>
  </section>`);
  view.appendChild(box);
  box.querySelector("#sExp").onclick = () => exportSala(grade);
  box.querySelector("#sNew").onclick = () => { SALA.running = false; renderSala(); };
}

function exportSala(grade) {
  const L = [];
  L.push(t("exp_title"));
  L.push(t("exp_date") + t("colon") + prettyDate(today()));
  if (S.nick) L.push(t("exp_part") + t("colon") + S.nick);
  L.push(t("exp_topic") + t("colon") + SALA.cfg.topic);
  L.push(t("exp_stance") + t("colon") + sideLabel(SALA.cfg.side));
  L.push(t("exp_grade") + t("colon") + (grade != null ? grade.toFixed(1) : "—"));
  if (SALA.notes) { L.push("", t("exp_prep"), SALA.notes); }
  SALA.results.forEach(x => {
    L.push("", "— " + x.turn + " —");
    L.push(t("exp_rubric") + t("colon") + SALA_RUBRIC.map((c, i) => c.title + " " + x.rubric[i]).join(" · ") + " = " + x.sum + "/12");
    L.push(t("exp_time", { a: fmt(x.used), b: fmt(x.planned) }));
    if (x.comment) L.push(t("exp_comment") + t("colon") + x.comment);
    L.push(x.text || t("no_transcript"));
  });
  download("debat_" + today() + ".txt", L.join("\n"));
}
