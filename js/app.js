/* Navegació, Inici, Itinerari, Docent i Perfil. */

const ROUTES = {
  inici: renderHome,
  itinerari: renderPath,
  arena: () => renderArena(),
  sala: renderSala,
  docent: renderTeacher,
  perfil: renderProfile
};

function route() {
  const [name, arg] = location.hash.replace(/^#/, "").split("/");
  stopSalaMedia();
  endLessonMode();
  document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + (name || "inici")));
  window.scrollTo(0, 0);
  if (name === "leccio" && arg) {
    if (!lessonUnlocked(arg)) { toast("Primer has de completar la lliçó anterior."); location.hash = "#itinerari"; return; }
    return startLesson(arg);
  }
  if (name === "repas") return startReview();
  (ROUTES[name] || renderHome)();
  updateSidebar();
  document.getElementById("view").focus({ preventScroll: true });
}

function updateSidebar() {
  const s = streak();
  document.getElementById("sideStreak").textContent = "🔥 " + s;
  document.getElementById("sideXP").textContent = "⚡ " + S.xp;
}

/* ---------- Paràmetres d'URL (tasca enviada pel docent) ---------- */
function readTaskFromURL() {
  const p = new URLSearchParams(location.search);
  const lesson = p.get("tasca");
  if (!lesson || !findLesson(lesson)) return;
  const days = (p.get("dies") || "").split(",").map(Number).filter(n => n >= 0 && n <= 6);
  S.task = { lesson, days, classe: (p.get("classe") || "").slice(0, 40), set: today() };
  save();
  history.replaceState(null, "", location.pathname + (location.hash || "#inici"));
  setTimeout(() => toast("Tens una tasca nova de classe: " + findLesson(lesson).lesson.title), 300);
}

/* ---------- Inici ---------- */
function renderHome() {
  const view = document.getElementById("view");
  const g = todayGoal(), r = rankInfo(), s = streak();
  const nl = nextLesson();
  const due = dueReviews().length;
  const idea = IDEES[dayOfYear(today()) % IDEES.length];
  const claim = arenaClaimFor(today());
  const task = S.task && findLesson(S.task.lesson);
  const taskToday = S.task && (!S.task.days.length || S.task.days.includes(weekdayIdx(today())));
  const hello = new Date().getHours() < 14 ? "Bon dia" : new Date().getHours() < 21 ? "Bona vesprada" : "Bona nit";
  view.innerHTML = "";
  const box = el(`<section class="page home">
    <div class="mascot-talk">
      <span class="mascot-big" aria-hidden="true">${r.rank.badge}</span>
      <div class="bubble big"><p><b>${hello}${S.nick ? ", " + esc(S.nick) : ""}!</b> Sóc ${MASCOT.name}, ${esc(MASCOT.desc)}.</p>
        <p>${g.lesson && g.arena ? "Objectiu d'avui complet. Quina màquina! 🎉" : g.lesson ? "Ja tens la lliçó. Et falta el repte de l'Arena." : g.arena ? "Ja tens el repte. Et falta una lliçó." : "Hui toca una lliçó i un repte. Som-hi?"}</p></div>
    </div>

    <div class="home-grid">
      <div class="card goals">
        <h3>Objectiu d'avui</h3>
        <a class="goal ${g.lesson ? "done" : ""}" href="${nl ? "#leccio/" + nl.lesson.id : "#itinerari"}"><span>${g.lesson ? "✅" : "📘"}</span>Una lliçó<b>${g.lesson}/1</b></a>
        <a class="goal ${g.arena ? "done" : ""}" href="#arena"><span>${g.arena ? "✅" : "⚔️"}</span>El repte del dia<b>${g.arena}/1</b></a>
      </div>
      <div class="card">
        <h3>🔥 ${s} ${s === 1 ? "dia" : "dies"} de ratxa</h3>
        ${weekStrip()}
        <p class="muted">Pròxima fita: ${nextStreakGoal().goal} dies (${esc(prettyDate(nextStreakGoal().date))}).</p>
      </div>
      <div class="card">
        <h3>${r.rank.badge} ${esc(r.rank.name)}</h3>
        <div class="xpbar"><span style="width:${r.pct}%"></span></div>
        <p class="muted">${S.xp} XP${r.next ? ` · ${r.next.xp - S.xp} XP per a ser ${esc(r.next.name)}` : ""}</p>
      </div>
    </div>

    ${task ? `<a class="card task-card ${taskToday ? "today" : ""}" href="#leccio/${task.lesson.id}" style="--unit:${task.unit.color}">
      <span class="kicker">📌 Tasca de classe${S.task.classe ? " · " + esc(S.task.classe) : ""}${S.task.days.length ? " · " + S.task.days.map(d => WEEKDAYS_SHORT[d]).join(" ") : ""}</span>
      <b>${task.unit.icon} ${esc(task.lesson.title)}</b>
      <span>${S.lessons[task.lesson.id] ? "✅ Feta. Pots repetir-la quan vulgues." : taskToday ? "Hui és dia de tasca!" : "Pendent"}</span></a>` : ""}

    <div class="home-grid two">
      ${nl ? `<a class="card next-card" href="#leccio/${nl.lesson.id}" style="--unit:${nl.unit.color}">
        <span class="kicker">Continua l'itinerari</span><b>${nl.unit.icon} ${esc(nl.lesson.title)}</b><span>${esc(nl.unit.title)}</span><span class="go">Comença ➜</span></a>`
        : `<div class="card next-card"><b>Has completat totes les lliçons! 🏆</b><span>Repassa-les o practica a l'Arena i a la Sala.</span></div>`}
      <a class="card arena-card" href="#arena"><span class="kicker">⚔️ Repte del dia</span><b>«${esc(claim.text.length > 110 ? claim.text.slice(0, 110) + "…" : claim.text)}»</b><span>${S.arena[today()] ? "Fet · " + S.arena[today()].score + " punts" : "Et convenç? Rebat-lo!"}</span></a>
    </div>

    ${due ? `<a class="card review-card" href="#repas"><b>🔁 Tens ${due} ${due === 1 ? "pregunta" : "preguntes"} per a repassar</b><span>El repàs espaiat fa que no se t'oblide. Fes-lo ara ➜</span></a>` : ""}

    <div class="card idea"><span class="kicker">💭 Idea del dia</span><p>${esc(idea)}</p><button class="ghost-btn" id="shareIdea">Comparteix</button></div>
  </section>`);
  view.appendChild(box);
  box.querySelector("#shareIdea").onclick = () => {
    const text = `«${idea}» — Entrenador de Debat`;
    if (navigator.share) navigator.share({ text }).catch(() => {}); else copyText(text, "Idea copiada.");
  };
}

/* ---------- Itinerari ---------- */
function renderPath() {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const total = allLessons().length, done = allLessons().filter(x => S.lessons[x.lesson.id]).length;
  const box = el(`<section class="page path">
    <header class="page-head"><h1>🗺️ Itinerari</h1><p>${done} de ${total} lliçons completades. Dins de cada unitat, cada lliçó desbloqueja la següent.</p></header>
    <nav class="unit-index">${UNITS.map(u => { const d = u.lessons.filter(l => S.lessons[l.id]).length; return `<a href="#u-${u.id}" style="--unit:${u.color}" data-jump="${u.id}"><span>${u.icon}</span>${esc(u.title)}<b>${d}/${u.lessons.length}</b></a>`; }).join("")}</nav>
  </section>`);
  UNITS.forEach(u => {
    const sec = el(`<section class="unit" id="u-${u.id}" style="--unit:${u.color}">
      <header class="unit-head"><span class="unit-icon">${u.icon}</span><div><h2>${esc(u.title)}</h2><p>${u.lessons.filter(l => S.lessons[l.id]).length}/${u.lessons.length} lliçons</p></div></header>
      <div class="nodes"></div></section>`);
    const nodes = sec.querySelector(".nodes");
    let currentGiven = false;
    u.lessons.forEach((l, i) => {
      const isDone = !!S.lessons[l.id];
      const open = lessonUnlocked(l.id);
      const current = open && !isDone && !currentGiven;
      if (current) currentGiven = true;
      const offset = [0, 60, 90, 60, 0, -60, -90, -60][i % 8];
      const isTask = S.task && S.task.lesson === l.id;
      nodes.appendChild(el(`<div class="node-wrap" style="--x:${offset}px">
        ${open ? `<a class="node ${isDone ? "done" : ""} ${current ? "current" : ""}" href="#leccio/${l.id}" aria-label="${esc(l.title)}${isDone ? " (completada)" : ""}">${isDone ? "✔" : u.icon}</a>`
               : `<span class="node locked" aria-label="${esc(l.title)} (bloquejada)">🔒</span>`}
        <span class="node-label">${esc(l.title)}${isTask ? " 📌" : ""}${isDone ? `<small>${S.lessons[l.id].best}/${S.lessons[l.id].total} a la primera</small>` : ""}</span>
      </div>`));
    });
    box.appendChild(sec);
  });
  box.appendChild(el(`<p class="muted center">Més lliçons en preparació. Pots afegir-ne de pròpies editant <code>js/content.js</code>.</p>`));
  view.appendChild(box);
  box.querySelectorAll("[data-jump]").forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById("u-" + a.dataset.jump).scrollIntoView({ behavior: "smooth" }); });
}

/* ---------- Docent ---------- */
function renderTeacher() {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const t = S.task || { lesson: allLessons()[0].lesson.id, days: [], classe: "" };
  const box = el(`<section class="page teacher">
    <header class="page-head"><h1>👩‍🏫 Panell docent</h1><p>L'app no té servidor ni comptes: les tasques viatgen en un enllaç i el progrés, en fitxers que l'alumnat us lliura.</p></header>
    <div class="card">
      <h3>📌 Tasca de classe</h3>
      <p class="muted">Si no assigneu cap tasca, cada alumne segueix el seu itinerari. La lliçó assignada queda desbloquejada encara que no hagen fet les anteriors.</p>
      <div class="grid2">
        <label>Grup<input id="dClass" maxlength="40" placeholder="Ex.: 3r ESO B" value="${esc(t.classe)}"></label>
        <label>Lliçó<select id="dLesson">${UNITS.map(u => `<optgroup label="${esc(u.icon + " " + u.title)}">${u.lessons.map(l => `<option value="${l.id}">${esc(l.title)}</option>`).join("")}</optgroup>`).join("")}</select></label>
      </div>
      <fieldset class="days"><legend>Dies de lliçó</legend>${WEEKDAYS_SHORT.map((d, i) => `<label class="day"><input type="checkbox" value="${i}" ${t.days.includes(i) ? "checked" : ""}><span>${d.replace(".", "")}</span></label>`).join("")}</fieldset>
      <div class="row wrap"><button class="primary" id="dLink">Genera l'enllaç per a l'alumnat</button><button class="secondary" id="dHere">Aplica-la en este dispositiu</button>${S.task ? `<button class="ghost-btn" id="dClear">Lleva la tasca d'este dispositiu</button>` : ""}</div>
      <div id="dOut"></div>
    </div>
    <div class="card">
      <h3>📈 Progrés de l'alumnat</h3>
      <p class="muted">Cada alumne descarrega el seu fitxer des de <b>Perfil → Exporta el meu progrés</b> (amb pseudònim o número de llista) i el puja a Aules o al Classroom. Ací els podeu importar tots de colp.</p>
      <label class="file-btn secondary">Importa fitxers .json<input type="file" id="dFiles" accept=".json,application/json" multiple hidden></label>
      <div id="dTable"></div>
    </div>
    <div class="card">
      <h3>🤝 Idees per a l'aula</h3>
      <ul class="tips">
        <li><b>Coavaluació a l'Arena</b>: activeu «Mode coavaluació» i que un equip valore l'argument d'un altre amb la mateixa rúbrica abans de vore la correcció automàtica. Després, comenteu les discrepàncies.</li>
        <li><b>Sala de debat</b>: projecteu el cronòmetre i aneu omplint la rúbrica mentre parla cada orador. Exporteu el resultat al final.</li>
        <li><b>Debat improvisat</b>: el mode «Improvisat» genera tema i postura a l'atzar i dona 15 minuts de preparació (configurable).</li>
        <li><b>Correcció amb IA</b>: a l'Arena, «Copia el prompt per a una IA» prepara la rúbrica perquè la pugueu usar amb l'assistent que tinga autoritzat el centre.</li>
      </ul>
    </div>
  </section>`);
  view.appendChild(box);
  const $ = s => box.querySelector(s);
  $("#dLesson").value = t.lesson;
  const read = () => ({ lesson: $("#dLesson").value, classe: $("#dClass").value.trim(), days: [...box.querySelectorAll(".days input:checked")].map(i => +i.value) });
  $("#dLink").onclick = () => {
    const v = read();
    const base = location.href.split("?")[0].split("#")[0];
    const url = `${base}?tasca=${encodeURIComponent(v.lesson)}${v.days.length ? "&dies=" + v.days.join(",") : ""}${v.classe ? "&classe=" + encodeURIComponent(v.classe) : ""}#inici`;
    $("#dOut").innerHTML = `<div class="link-out"><input readonly value="${esc(url)}" aria-label="Enllaç de la tasca"><button class="primary" id="dCopy">Copia</button></div>
      <p class="muted">Compartiu-lo per Aules, Classroom o un codi QR. En obrir-lo, la tasca apareixerà a l'Inici de cada alumne.</p>`;
    $("#dCopy").onclick = () => copyText(url, "Enllaç copiat.");
  };
  $("#dHere").onclick = () => { const v = read(); S.task = Object.assign(v, { set: today() }); save(); toast("Tasca aplicada en este dispositiu."); renderTeacher(); };
  const clr = $("#dClear");
  if (clr) clr.onclick = () => { S.task = null; save(); renderTeacher(); };
  $("#dFiles").onchange = e => importProgress([...e.target.files], $("#dTable"), read());
}

function importProgress(files, out, task) {
  const rows = [];
  let pending = files.length;
  if (!pending) return;
  files.forEach(f => {
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const d = JSON.parse(fr.result);
        if (d.app === "entrenador-debat") rows.push(d);
      } catch (e) {}
      if (--pending === 0) drawProgressTable(rows, out, task);
    };
    fr.readAsText(f);
  });
}

function drawProgressTable(rows, out, task) {
  if (!rows.length) { out.innerHTML = `<p class="muted">No s'ha trobat cap fitxer vàlid.</p>`; return; }
  rows.sort((a, b) => String(a.nick).localeCompare(String(b.nick), "ca", { numeric: true }));
  const tl = findLesson(task.lesson);
  out.innerHTML = `<div class="table-wrap"><table class="table"><thead><tr><th>Alumne/a</th><th>XP</th><th>Rang</th><th>Lliçons</th><th>Reptes</th><th>Mitjana Arena</th><th>Ratxa</th><th>Debats</th><th>Tasca: ${esc(tl ? tl.lesson.title : "—")}</th><th>Exportat</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${esc(r.nick || "—")}</td><td>${r.xp}</td><td>${esc(r.rank)}</td><td>${r.lessonsDone.length}/${allLessons().length}</td><td>${r.arenaCount}</td><td>${r.arenaAvg != null ? r.arenaAvg : "—"}</td><td>${r.streak}</td><td>${r.debates}</td><td>${r.lessonsDone.includes(task.lesson) ? "✅" : "—"}</td><td>${esc(r.exported)}</td></tr>`).join("")}</tbody></table></div>
    <div class="row"><button class="secondary" id="dCsv">Descarrega CSV</button></div>`;
  out.querySelector("#dCsv").onclick = () => {
    const head = ["alumne", "xp", "rang", "llicons", "reptes", "mitjana_arena", "ratxa", "debats", "tasca_feta", "exportat"];
    const lines = [head.join(";")].concat(rows.map(r => [r.nick, r.xp, r.rank, r.lessonsDone.length, r.arenaCount, r.arenaAvg ?? "", r.streak, r.debates, r.lessonsDone.includes(task.lesson) ? "si" : "no", r.exported].map(v => `"${String(v).replace(/"/g, '""')}"`).join(";")));
    download("progres_classe.csv", "﻿" + lines.join("\n"), "text/csv");
  };
}

/* ---------- Perfil ---------- */
function exportPayload() {
  const sc = Object.values(S.arena).map(a => a.score);
  return {
    app: "entrenador-debat", v: 2, nick: S.nick || "(sense pseudònim)", exported: today(),
    xp: S.xp, rank: rankInfo().rank.name, streak: streak(),
    lessonsDone: Object.keys(S.lessons), lessons: S.lessons,
    arenaCount: sc.length, arenaAvg: sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : null,
    debates: S.sala.length, task: S.task ? S.task.lesson : null
  };
}

function renderProfile() {
  const view = document.getElementById("view");
  const r = rankInfo();
  const sc = Object.values(S.arena).map(a => a.score);
  view.innerHTML = "";
  const box = el(`<section class="page profile">
    <header class="page-head"><h1>👤 Perfil</h1></header>
    <div class="card profile-hero">
      <span class="mascot-big">${r.rank.badge}</span>
      <div><h2>${esc(S.nick || "Sense pseudònim")}</h2><p>${esc(r.rank.name)} · ${S.xp} XP</p><div class="xpbar"><span style="width:${r.pct}%"></span></div></div>
    </div>
    <div class="card">
      <label>Pseudònim o número de llista<input id="pNick" maxlength="30" value="${esc(S.nick)}" placeholder="Ex.: 3B-07 o Ratpenat17"></label>
      <p class="muted">Per protegir la teua privacitat, no uses el nom i els cognoms complets.</p>
    </div>
    <div class="stats-grid">
      <div class="card stat"><b>${Object.keys(S.lessons).length}/${allLessons().length}</b><span>lliçons</span></div>
      <div class="card stat"><b>${sc.length}</b><span>reptes de l'Arena</span></div>
      <div class="card stat"><b>${sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : "—"}</b><span>mitjana a l'Arena</span></div>
      <div class="card stat"><b>${streak()}</b><span>dies de ratxa</span></div>
      <div class="card stat"><b>${S.sala.length}</b><span>debats a la Sala</span></div>
      <div class="card stat"><b>${S.review.length}</b><span>preguntes en repàs</span></div>
    </div>
    <div class="card"><h3>Rangs</h3><ol class="ranks">${RANKS.map((x, i) => `<li class="${i <= r.i ? "on" : ""}"><span>${x.badge}</span>${esc(x.name)}<small>${x.xp} XP</small></li>`).join("")}</ol></div>
    <div class="card">
      <h3>Preferències</h3>
      <label class="check"><input type="checkbox" id="pVoice" ${S.settings.voice ? "checked" : ""}> Narració en veu alta a les lliçons (botó 🔊)</label>
      <label>Tema visual<select id="pTheme"><option value="auto">Automàtic</option><option value="light">Clar</option><option value="dark">Fosc</option></select></label>
    </div>
    <div class="row wrap">
      <button class="primary" id="pExport">Exporta el meu progrés (.json)</button>
      <button class="danger-btn" id="pReset">Esborra totes les dades</button>
    </div>
  </section>`);
  view.appendChild(box);
  const $ = s => box.querySelector(s);
  $("#pTheme").value = S.settings.theme;
  $("#pNick").onchange = e => { S.nick = e.target.value.trim(); save(); renderProfile(); };
  $("#pVoice").onchange = e => { S.settings.voice = e.target.checked; save(); };
  $("#pTheme").onchange = e => { S.settings.theme = e.target.value; save(); applyTheme(); };
  $("#pExport").onclick = () => {
    if (!S.nick) { toast("Primer posa un pseudònim o número de llista."); $("#pNick").focus(); return; }
    download(`progres_${S.nick.replace(/[^\w-]+/g, "_")}_${today()}.json`, JSON.stringify(exportPayload(), null, 2), "application/json");
  };
  $("#pReset").onclick = () => { if (confirm("Segur que vols esborrar tot el progrés d'este dispositiu? No es pot desfer.")) { resetState(); applyTheme(); renderProfile(); updateSidebar(); toast("Dades esborrades."); } };
}

/* ---------- Tema ---------- */
function applyTheme() {
  const t = S.settings.theme;
  if (t === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", t);
}

/* ---------- Inici de l'app ---------- */
(function init() {
  applyTheme();
  readTaskFromURL();
  document.getElementById("howBody").innerHTML = `
    <p>L'Arena fa servir un <b>avaluador automàtic orientatiu</b> que funciona dins del navegador, sense enviar el text enlloc. No és una IA: busca indicis en el text i els compara amb la rúbrica.</p>
    <ul>
      <li><b>Lògica</b>: connectors de causa i conseqüència («perquè», «per tant»…).</li>
      <li><b>Evidència</b>: exemples, dades, xifres i fonts («segons…»).</li>
      <li><b>Refutació</b>: marques de contraargumentació i si detectes la trampa concreta de l'afirmació.</li>
      <li><b>Claredat</b>: postura explícita al principi, llargària de les frases i conclusió.</li>
      <li><b>Rellevància</b>: si et centres en les paraules i la idea de l'afirmació.</li>
    </ul>
    <p>Com que mira la forma i no entén del tot el sentit, <b>pot equivocar-se</b>. Per això la nota és orientativa: contrasta-la amb la coavaluació, amb el teu professorat o amb el prompt per a IA.</p>`;
  document.getElementById("howClose").onclick = () => document.getElementById("howDialog").close();
  window.addEventListener("hashchange", route);
  route();
})();
