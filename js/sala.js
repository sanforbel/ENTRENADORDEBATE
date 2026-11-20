/* Sala de debat: simulació de torns amb cronòmetre, micròfon, rúbrica i exportació. */

const DEFAULT_TURNS = [
  { name: "Exposició inicial", min: 4 },
  { name: "Refutació 1", min: 5 },
  { name: "Refutació 2", min: 5 },
  { name: "Conclusió", min: 3 }
];
const CRUTCHES = ["eh", "ehh", "eeh", "mmm", "o siga", "osea", "o sea", "bo", "bueno", "vale", "en plan", "tipo", "saps", "sabes", "no?"];

let SALA = null;     // sessió en curs
let TIMER = null;    // interval del cronòmetre
let REC = null;      // reconeixement de veu

function stopSalaMedia() {
  if (TIMER) { clearInterval(TIMER); TIMER = null; }
  if (REC) { try { REC.onend = null; REC.stop(); } catch (e) {} REC = null; }
}

function renderSala() {
  stopSalaMedia();
  if (SALA && SALA.running) return renderTurn();
  const view = document.getElementById("view");
  view.innerHTML = "";
  const cfg = SALA && SALA.cfg || { mode: "torneig", topic: "", side: "A favor", lang: "ca-ES", turns: clone(DEFAULT_TURNS), rounds: 3, secs: 60, prep: 15 };
  const box = el(`<section class="page sala">
    <header class="page-head"><h1>🎙️ Sala de debat</h1><p>Practica torns reals amb cronòmetre, micròfon i rúbrica.</p></header>
    <div class="tabs" role="tablist">
      <button role="tab" data-m="torneig">Format torneig</button>
      <button role="tab" data-m="lliure">Lliure</button>
      <button role="tab" data-m="improvisat">Improvisat</button>
    </div>
    <div class="card">
      <div class="grid2">
        <label>Tema de debat<input id="sTopic" type="text" placeholder="Ex.: Cal prohibir els mòbils als centres educatius?" value="${esc(cfg.topic)}"></label>
        <label>Postura<select id="sSide"><option>A favor</option><option>En contra</option></select></label>
        <label>Idioma del micròfon<select id="sLang"><option value="ca-ES">Valencià / català</option><option value="es-ES">Castellà</option><option value="en-GB">Anglés</option></select></label>
      </div>
      <div id="sModeBox"></div>
      <div class="row"><button class="primary big" id="sGo">Comença</button></div>
    </div>
    ${S.sala.length ? `<div class="card"><div class="bar"><h3>Debats anteriors</h3><button class="secondary" id="sClear">Esborra l'historial</button></div>
      <ul class="hist">${S.sala.slice().reverse().slice(0, 8).map(h => `<li><b>${esc(h.topic || "Sense tema")}</b> · ${esc(h.side)} · ${esc(prettyDate(h.date))} · <b>${h.grade != null ? h.grade.toFixed(1) : "—"}</b>/10</li>`).join("")}</ul></div>` : ""}
  </section>`);
  view.appendChild(box);
  box.querySelector("#sSide").value = cfg.side;
  box.querySelector("#sLang").value = cfg.lang;
  const modeBox = box.querySelector("#sModeBox");

  const drawMode = () => {
    box.querySelectorAll(".tabs button").forEach(b => { const on = b.dataset.m === cfg.mode; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
    if (cfg.mode === "torneig") {
      modeBox.innerHTML = `<p class="tip">Valors orientatius: ajusta els noms i els minuts a les bases del teu torneig.</p>
        <div class="turns">${cfg.turns.map((t, i) => `<div class="turn-row"><input data-i="${i}" data-k="name" value="${esc(t.name)}" aria-label="Nom del torn ${i + 1}"><input data-i="${i}" data-k="min" type="number" min="0.5" max="15" step="0.5" value="${t.min}" aria-label="Minuts"><span>min</span><button class="icon-btn" data-del="${i}" aria-label="Elimina el torn">✕</button></div>`).join("")}</div>
        <div class="row"><button class="secondary" id="sAdd">+ Afig un torn</button><button class="ghost-btn" id="sDefault">Restaura els torns per defecte</button></div>`;
      modeBox.querySelectorAll(".turn-row input").forEach(inp => inp.oninput = () => {
        const t = cfg.turns[+inp.dataset.i];
        if (inp.dataset.k === "min") t.min = Math.max(0.5, parseFloat(inp.value) || 1); else t.name = inp.value;
      });
      modeBox.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { cfg.turns.splice(+b.dataset.del, 1); drawMode(); });
      modeBox.querySelector("#sAdd").onclick = () => { cfg.turns.push({ name: "Torn " + (cfg.turns.length + 1), min: 3 }); drawMode(); };
      modeBox.querySelector("#sDefault").onclick = () => { cfg.turns = clone(DEFAULT_TURNS); drawMode(); };
    } else if (cfg.mode === "lliure") {
      modeBox.innerHTML = `<div class="grid2">
        <label>Rondes<input id="sRounds" type="number" min="1" max="8" value="${cfg.rounds}"></label>
        <label>Segons per torn<input id="sSecs" type="number" min="15" max="600" step="15" value="${cfg.secs}"></label></div>`;
      modeBox.querySelector("#sRounds").oninput = e => cfg.rounds = Math.max(1, +e.target.value || 1);
      modeBox.querySelector("#sSecs").oninput = e => cfg.secs = Math.max(15, +e.target.value || 60);
    } else {
      modeBox.innerHTML = `<p class="tip">El tema i la postura es trien a l'atzar. Després tens un temps de preparació i, en acabar, comença el debat amb els torns del format torneig.</p>
        <div class="grid2"><label>Minuts de preparació<input id="sPrep" type="number" min="1" max="30" value="${cfg.prep}"></label></div>
        <div class="row"><button class="secondary" id="sRand">🎲 Genera un tema</button></div>`;
      modeBox.querySelector("#sPrep").oninput = e => cfg.prep = Math.max(1, +e.target.value || 15);
      modeBox.querySelector("#sRand").onclick = randomTopic;
    }
  };
  const randomTopic = () => {
    box.querySelector("#sTopic").value = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    box.querySelector("#sSide").value = Math.random() < 0.5 ? "A favor" : "En contra";
  };
  box.querySelectorAll(".tabs button").forEach(b => b.onclick = () => { cfg.mode = b.dataset.m; drawMode(); if (cfg.mode === "improvisat" && !box.querySelector("#sTopic").value) randomTopic(); });
  drawMode();
  const clr = box.querySelector("#sClear");
  if (clr) clr.onclick = () => { if (confirm("Vols esborrar l'historial de debats?")) { S.sala = []; save(); renderSala(); } };

  box.querySelector("#sGo").onclick = () => {
    cfg.topic = box.querySelector("#sTopic").value.trim();
    cfg.side = box.querySelector("#sSide").value;
    cfg.lang = box.querySelector("#sLang").value;
    if (!cfg.topic) { box.querySelector("#sTopic").focus(); toast("Escriu un tema (o genera'n un en el mode Improvisat)."); return; }
    const turns = cfg.mode === "lliure"
      ? Array.from({ length: cfg.rounds }, (_, i) => ({ name: "Torn " + (i + 1), min: cfg.secs / 60 }))
      : cfg.turns.filter(t => t.name.trim());
    if (!turns.length) { toast("Afig almenys un torn."); return; }
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
    <header class="page-head"><h1>⏱️ Preparació</h1><p><b>${esc(SALA.cfg.topic)}</b> · Postura: <b>${esc(SALA.cfg.side)}</b></p></header>
    <div class="card center"><div class="big-timer" id="pT">${fmt(left)}</div>
      <ol class="plan"><li>Definiu les paraules clau.</li><li>Pluja d'idees a favor i en contra.</li><li>Trieu 2–3 arguments amb una evidència cadascun.</li><li>Prepareu l'obertura i la frase final.</li></ol>
      <textarea id="pNotes" rows="6" placeholder="Esquema de l'equip…">${esc(SALA.notes || "")}</textarea>
      <div class="row center"><button class="primary big" id="pGo">Comença el debat</button><button class="secondary" id="pCancel">Cancel·la</button></div></div>
  </section>`);
  view.appendChild(box);
  TIMER = setInterval(() => {
    left--;
    const t = box.querySelector("#pT");
    if (!t) return stopSalaMedia();
    t.textContent = fmt(Math.max(0, left));
    t.classList.toggle("warn", left <= 60 && left > 0);
    if (left === 0) { t.classList.add("over"); beep(); toast("S'ha acabat el temps de preparació!"); }
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
    <header class="page-head"><h1>🎙️ ${esc(turn.name)} <small>(${SALA.i + 1}/${SALA.turns.length})</small></h1>
      <p><b>${esc(SALA.cfg.topic)}</b> · ${esc(SALA.cfg.side)}</p></header>
    <div class="turn-layout">
      <div class="card">
        ${mission ? `<p class="mission">🎯 ${esc(mission)}</p>` : ""}
        <div class="timer-wrap"><div class="big-timer" id="tT">${fmt(left)}</div><div class="bar-track"><span id="tBar" style="width:100%"></span></div></div>
        <div class="row center">
          <button class="primary" id="tPlay">▶ Inicia</button>
          <button class="secondary" id="tReset">↺ Reinicia</button>
          <button class="mic" id="tMic" aria-pressed="false" title="Transcripció per veu">🎤 Micròfon</button>
        </div>
        <p class="tip" id="tMicTip"></p>
        <div class="transcript" id="tTrans" aria-live="polite"><span class="muted">La transcripció apareixerà ací. També pots escriure o anotar idees baix.</span></div>
        <textarea id="tManual" rows="4" placeholder="Notes o text del torn…"></textarea>
        <div class="stats" id="tStats"></div>
      </div>
      <aside class="card">
        <div class="bar"><h3>Rúbrica (0–2)</h3><span class="badge" id="tSum">0/12</span></div>
        <div class="rubric">${SALA_RUBRIC.map((c, i) => `<div class="r-line"><div><b>${esc(c.title)}</b><small>${esc(c.desc)}</small></div><div class="seg" data-i="${i}">${[0, 1, 2].map(v => `<button data-v="${v}" class="${v === 0 ? "sel" : ""}">${v}</button>`).join("")}</div></div>`).join("")}</div>
        <label>Comentari<textarea id="tCom" rows="3" placeholder="Punts forts i a millorar…"></textarea></label>
        <div class="row wrap">
          <button class="chip-btn small" data-p="La tesi s'entén des del principi. ">+ Tesi clara</button>
          <button class="chip-btn small" data-p="Cal citar millor les fonts de les dades. ">+ Fonts</button>
          <button class="chip-btn small" data-p="Bona refutació; reforça-la amb una evidència. ">+ Refutació</button>
          <button class="chip-btn small" data-p="Cal reduir les crosses verbals i fer més pauses. ">+ Crosses</button>
        </div>
        <div class="row"><button class="primary big" id="tSave">${SALA.i + 1 < SALA.turns.length ? "Desa i passa al torn següent" : "Desa i acaba el debat"}</button></div>
        <button class="ghost-btn" id="tQuit">Abandona el debat</button>
      </aside>
    </div>
  </section>`);
  view.appendChild(box);
  const $ = s => box.querySelector(s);

  const text = () => (finalText + " " + $("#tManual").value).trim();
  const drawStats = () => {
    const t = text();
    const words = t ? t.split(/\s+/).length : 0;
    const elapsed = total - left;
    const wpm = elapsed > 5 && finalText ? Math.round(finalText.trim().split(/\s+/).length / (elapsed / 60)) : null;
    const low = " " + strip(t).replace(/[.,;:!?¿¡«»"()]/g, " ").replace(/\s+/g, " ") + " ";
    const cr = CRUTCHES.reduce((a, c) => a + (low.split(" " + strip(c) + " ").length - 1), 0);
    $("#tStats").innerHTML = `<span>📝 ${words} paraules</span>${wpm ? `<span title="Entre 120 i 160 és un ritme còmode">⏩ ${wpm} paraules/min</span>` : ""}<span title="eh, bo, o siga, vale…">🩼 ${cr} crosses verbals</span>`;
  };
  const drawTimer = () => {
    $("#tT").textContent = fmt(left);
    $("#tT").classList.toggle("warn", left <= 30 && left > 0);
    $("#tT").classList.toggle("over", left <= 0);
    $("#tBar").style.width = Math.max(0, 100 * left / total) + "%";
  };
  $("#tPlay").onclick = () => {
    running = !running;
    $("#tPlay").textContent = running ? "⏸ Pausa" : "▶ Continua";
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
  if (!SR) { $("#tMic").disabled = true; $("#tMicTip").textContent = "El teu navegador no permet la transcripció per veu (prova Chrome o Edge). Pots escriure les notes manualment."; }
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
    REC.onerror = e => { $("#tMicTip").textContent = e.error === "not-allowed" ? "Cal donar permís al micròfon (i obrir l'app en HTTPS)." : "Error del micròfon: " + e.error; };
    REC.onend = () => { if (REC) try { REC.start(); } catch (e) {} };
    try { REC.start(); $("#tMic").classList.add("on"); $("#tMic").setAttribute("aria-pressed", "true"); $("#tMicTip").textContent = "Escoltant…"; }
    catch (e) { $("#tMicTip").textContent = "No s'ha pogut iniciar el micròfon."; REC = null; }
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
  $("#tQuit").onclick = () => { if (confirm("Vols abandonar el debat? No es guardarà.")) { stopSalaMedia(); SALA.running = false; renderSala(); } };
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
    <header class="page-head"><h1>🏁 Debat acabat</h1><p><b>${esc(SALA.cfg.topic)}</b> · ${esc(SALA.cfg.side)}</p></header>
    <div class="score-hero"><div class="score-num"><b>${grade != null ? grade.toFixed(1) : "—"}</b><span>NOTA /10</span></div>
      <div><p>${sum} punts de ${12 * r.length} possibles en ${r.length} ${r.length === 1 ? "torn" : "torns"}.</p><p class="muted">+${5 * r.length} XP de pràctica</p></div></div>
    <div class="card"><table class="table"><thead><tr><th>Torn</th>${SALA_RUBRIC.map(c => `<th title="${esc(c.desc)}">${esc(c.title.split(" ")[0])}</th>`).join("")}<th>Total</th><th>Temps</th></tr></thead>
      <tbody>${r.map(x => `<tr><td>${esc(x.turn)}</td>${x.rubric.map(v => `<td>${v}</td>`).join("")}<td><b>${x.sum}/12</b></td><td>${fmt(x.used)} / ${fmt(x.planned)}</td></tr>`).join("")}</tbody></table></div>
    ${r.filter(x => x.comment).map(x => `<div class="card"><b>${esc(x.turn)}:</b> ${esc(x.comment)}</div>`).join("")}
    <div class="row wrap"><button class="primary" id="sExp">Exporta (.txt)</button><button class="secondary" id="sNew">Nou debat</button></div>
  </section>`);
  view.appendChild(box);
  box.querySelector("#sExp").onclick = () => exportSala(grade);
  box.querySelector("#sNew").onclick = () => { SALA.running = false; renderSala(); };
}

function exportSala(grade) {
  const L = [];
  L.push("ENTRENADOR DE DEBAT · Sala de debat");
  L.push("Data: " + prettyDate(today()));
  if (S.nick) L.push("Participant: " + S.nick);
  L.push("Tema: " + SALA.cfg.topic);
  L.push("Postura: " + SALA.cfg.side);
  L.push("Nota final (0-10): " + (grade != null ? grade.toFixed(1) : "—"));
  if (SALA.notes) { L.push("", "Esquema de preparació:", SALA.notes); }
  SALA.results.forEach(x => {
    L.push("", "— " + x.turn + " —");
    L.push("Rúbrica: " + SALA_RUBRIC.map((c, i) => c.title + " " + x.rubric[i]).join(" · ") + " = " + x.sum + "/12");
    L.push("Temps: " + fmt(x.used) + " de " + fmt(x.planned));
    if (x.comment) L.push("Comentari: " + x.comment);
    L.push(x.text || "(sense transcripció)");
  });
  download("debat_" + today() + ".txt", L.join("\n"));
}
