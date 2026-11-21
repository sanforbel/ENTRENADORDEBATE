/* Navegació, Inici (full de temporada), Calendari, Docent i Perfil. */

const ROUTES = {
  inici: renderHome,
  calendari: renderPath,
  mocio: () => renderArena(),
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
  if (name === "jornada" && arg) {
    if (!lessonUnlocked(arg)) { toast("Primer cal disputar la jornada anterior d'este bloc."); location.hash = "#calendari"; return; }
    return startLesson(arg);
  }
  if (name === "revisio") return startReview();
  (ROUTES[name] || renderHome)();
  updateSidebar();
  document.getElementById("view").focus({ preventScroll: true });
}

function updateSidebar() {
  document.getElementById("sideStreak").textContent = streak() + " d";
  document.getElementById("sideXP").textContent = S.xp + " pts";
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
  setTimeout(() => toast("Tasca nova de classe: " + findLesson(lesson).lesson.title), 300);
}

function jornadaNum(id) { return allLessons().findIndex(x => x.lesson.id === id) + 1; }

/* ---------- Inici: full de temporada ---------- */
function renderHome() {
  const view = document.getElementById("view");
  const g = todayGoal(), r = rankInfo();
  const nl = nextLesson();
  const due = dueReviews().length;
  const idea = IDEES[dayOfYear(today()) % IDEES.length];
  const claim = arenaClaimFor(today());
  const task = S.task && findLesson(S.task.lesson);
  const taskToday = S.task && (!S.task.days.length || S.task.days.includes(weekdayIdx(today())));
  const done = allLessons().filter(x => S.lessons[x.lesson.id]).length;
  view.innerHTML = "";
  const box = el(`<section class="page home">
    <header class="page-head"><p class="doc-label">Full de temporada · ${esc(prettyDate(today()))}</p><h1>${S.nick ? esc(S.nick) : "Benvinguda, benvingut"}</h1>
      <p>${done} de ${allLessons().length} jornades disputades · ${S.xp} pts</p></header>

    <div class="home-grid">
      <div class="doc">
        <p class="doc-label">Ordre del dia</p>
        <ul class="checklist">
          <li class="${g.lesson ? "done" : ""}"><span class="cb">${g.lesson ? "✓" : ""}</span><a href="${nl ? "#jornada/" + nl.lesson.id : "#calendari"}">Disputar una jornada</a></li>
          <li class="${g.arena ? "done" : ""}"><span class="cb">${g.arena ? "✓" : ""}</span><a href="#mocio">Respondre la moció del dia</a></li>
          ${due ? `<li><span class="cb"></span><a href="#revisio">Revisar ${due} ${due === 1 ? "exercici pendent" : "exercicis pendents"}</a></li>` : ""}
        </ul>
      </div>
      <div class="doc">
        <p class="doc-label">Assistència d'esta setmana</p>
        ${attendanceStrip()}
        <p class="muted small">${streak()} ${streak() === 1 ? "dia seguit" : "dies seguits"} entrenant.</p>
      </div>
      <div class="doc credential">
        <p class="doc-label">Credencial</p>
        <b>${esc(r.rank.name)}</b>
        <div class="meter"><span style="width:${r.pct}%"></span></div>
        <p class="muted small">${r.next ? `${ptsLabel(r.next.xp - S.xp)} per a ${esc(r.next.name)}` : "Nivell màxim"}</p>
      </div>
    </div>

    ${task ? `<a class="doc link-card task-card ${taskToday ? "today" : ""}" href="#jornada/${task.lesson.id}" style="--unit:${task.unit.color}">
      <p class="doc-label">Tasca de classe${S.task.classe ? " · " + esc(S.task.classe) : ""}${S.task.days.length ? " · " + S.task.days.map(d => WEEKDAYS_SHORT[d]).join(" ") : ""}</p>
      <b>Jornada ${jornadaNum(task.lesson.id)}. ${esc(task.lesson.title)}</b>
      <span class="muted">${S.lessons[task.lesson.id] ? "Disputada. Es pot repetir quan vulgues." : taskToday ? "Programada per a hui." : "Pendent."}</span></a>` : ""}

    <div class="home-grid two">
      ${nl ? `<a class="doc link-card next-card" href="#jornada/${nl.lesson.id}" style="--unit:${nl.unit.color}">
        <p class="doc-label">Pròxima jornada · ${esc(nl.unit.title)}</p><b>Jornada ${jornadaNum(nl.lesson.id)}. ${esc(nl.lesson.title)}</b><span class="go">Comença la sessió →</span></a>`
        : `<div class="doc next-card"><p class="doc-label">Temporada</p><b>Totes les jornades disputades.</b><span class="muted">Pots repetir-les o practicar a la Sala.</span></div>`}
      <a class="doc link-card" href="#mocio"><p class="doc-label">Moció del dia</p><p class="motion-text small">${esc(claim.text)}</p>
        <span class="muted">${S.arena[today()] ? "Resposta lliurada · " + total20(S.arena[today()].crit) + "/20" : "Pendent de resposta"}</span></a>
    </div>

    <div class="doc pissarra"><p class="doc-label">Frase per a la pissarra</p><p>${esc(idea)}</p><button class="text-btn" id="shareIdea">Copia-la</button></div>
  </section>`);
  view.appendChild(box);
  box.querySelector("#shareIdea").onclick = () => copyText(idea, "Frase copiada.");
}

/* ---------- Calendari de la temporada ---------- */
function renderPath() {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const total = allLessons().length, done = allLessons().filter(x => S.lessons[x.lesson.id]).length;
  const box = el(`<section class="page path">
    <header class="page-head"><h1>Calendari de la temporada</h1><p>${done} de ${total} jornades disputades. Dins de cada bloc, les jornades es disputen en ordre.</p></header>
  </section>`);
  UNITS.forEach((u, ui) => {
    const d = u.lessons.filter(l => S.lessons[l.id]).length;
    const sec = el(`<section class="doc block" style="--unit:${u.color}">
      <div class="block-head"><span class="block-num">Bloc ${ui + 1}</span><h2>${esc(u.title)}</h2><span class="muted">${d}/${u.lessons.length}</span></div>
      <table class="table fixtures"><thead><tr><th>Jornada</th><th>Sessió</th><th>Estat</th><th></th></tr></thead><tbody></tbody></table></section>`);
    const tb = sec.querySelector("tbody");
    let nextGiven = false;
    u.lessons.forEach(l => {
      const rec = S.lessons[l.id];
      const open = lessonUnlocked(l.id);
      const isNext = open && !rec && !nextGiven;
      if (isNext) nextGiven = true;
      const isTask = S.task && S.task.lesson === l.id;
      const state = rec ? `Disputada · ${rec.best}/${rec.total}` : isNext ? "Pròxima" : open ? "Oberta" : "Pendent de l'anterior";
      tb.appendChild(el(`<tr class="${rec ? "played" : ""} ${isNext ? "next" : ""} ${!open ? "locked" : ""}">
        <td>${jornadaNum(l.id)}</td><td><b>${esc(l.title)}</b>${isTask ? ` <span class="ex-flag">Tasca</span>` : ""}<small class="m-state">${state}</small></td><td class="state">${state}</td>
        <td>${open ? `<a class="${isNext ? "primary small-btn" : "secondary small-btn"}" href="#jornada/${l.id}">${rec ? "Repeteix" : "Comença"}</a>` : ""}</td></tr>`));
    });
    box.appendChild(sec);
  });
  box.appendChild(el(`<p class="muted small">Les jornades noves s'afigen editant <code>js/content.js</code>.</p>`));
  view.appendChild(box);
}

/* ---------- Docent ---------- */
function renderTeacher() {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const t = S.task || { lesson: allLessons()[0].lesson.id, days: [], classe: "" };
  const box = el(`<section class="page teacher">
    <header class="page-head"><h1>Panell docent</h1><p>L'app no té servidor ni comptes: les tasques viatgen en un enllaç i el progrés, en fitxers que l'alumnat us lliura.</p></header>
    <div class="doc">
      <p class="doc-label">Tasca de classe</p>
      <p class="muted">Si no assigneu cap tasca, cada alumne segueix el calendari en ordre. La jornada assignada queda oberta encara que no hagen fet les anteriors.</p>
      <div class="grid2">
        <label>Grup<input id="dClass" maxlength="40" placeholder="Ex.: 3r ESO B" value="${esc(t.classe)}"></label>
        <label>Jornada<select id="dLesson">${UNITS.map((u, ui) => `<optgroup label="Bloc ${ui + 1}. ${esc(u.title)}">${u.lessons.map(l => `<option value="${l.id}">${jornadaNum(l.id)}. ${esc(l.title)}</option>`).join("")}</optgroup>`).join("")}</select></label>
      </div>
      <fieldset class="days"><legend>Dies de sessió</legend>${WEEKDAYS_SHORT.map((d, i) => `<label class="day"><input type="checkbox" value="${i}" ${t.days.includes(i) ? "checked" : ""}><span>${d.replace(".", "")}</span></label>`).join("")}</fieldset>
      <div class="row wrap"><button class="primary" id="dLink">Genera l'enllaç per a l'alumnat</button><button class="secondary" id="dHere">Aplica-la en este dispositiu</button>${S.task ? `<button class="text-btn" id="dClear">Lleva la tasca d'este dispositiu</button>` : ""}</div>
      <div id="dOut"></div>
    </div>
    <div class="doc">
      <p class="doc-label">Progrés de l'alumnat</p>
      <p class="muted">Cada alumne descarrega el seu fitxer des de <b>Perfil → Exporta el meu progrés</b> (amb pseudònim o número de llista) i el puja a Aules o al Classroom. Ací podeu importar-los tots de colp.</p>
      <label class="file-btn secondary">Importa fitxers .json<input type="file" id="dFiles" accept=".json,application/json" multiple hidden></label>
      <div id="dTable"></div>
    </div>
    <div class="doc">
      <p class="doc-label">Propostes per a l'aula</p>
      <ul class="tips">
        <li><b>Jurat d'aula</b>: a la Moció del dia, activeu l'opció perquè un equip puntue la intervenció d'un altre amb la mateixa papereta abans de vore la puntuació automàtica. Després, comenteu les discrepàncies.</li>
        <li><b>Sala de debat</b>: projecteu el cronòmetre i aneu omplint la rúbrica mentre parla cada orador. Exporteu el resultat al final.</li>
        <li><b>Debat improvisat</b>: el mode «Improvisat» trau tema i postura a l'atzar i dona temps de preparació (15 minuts per defecte).</li>
        <li><b>Correcció amb IA</b>: «Copia el prompt per a una IA» prepara la papereta perquè la pugueu usar amb l'assistent que tinga autoritzat el centre.</li>
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
      try { const d = JSON.parse(fr.result); if (d.app === "entrenador-debat") rows.push(d); } catch (e) {}
      if (--pending === 0) drawProgressTable(rows, out, task);
    };
    fr.readAsText(f);
  });
}

function drawProgressTable(rows, out, task) {
  if (!rows.length) { out.innerHTML = `<p class="muted">No s'ha trobat cap fitxer vàlid.</p>`; return; }
  rows.sort((a, b) => String(a.nick).localeCompare(String(b.nick), "ca", { numeric: true }));
  const tl = findLesson(task.lesson);
  const avg = r => r.mocioAvg20 != null ? r.mocioAvg20 + "/20" : (r.arenaAvg != null ? Math.round(r.arenaAvg / 5) + "/20" : "—");
  out.innerHTML = `<div class="table-wrap"><table class="table"><thead><tr><th>Alumne/a</th><th>Punts</th><th>Credencial</th><th>Jornades</th><th>Mocions</th><th>Mitjana mocions</th><th>Dies seguits</th><th>Debats</th><th>Tasca: ${esc(tl ? tl.lesson.title : "—")}</th><th>Exportat</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${esc(r.nick || "—")}</td><td>${r.xp}</td><td>${esc(r.rank)}</td><td>${r.lessonsDone.length}/${allLessons().length}</td><td>${r.arenaCount}</td><td>${avg(r)}</td><td>${r.streak}</td><td>${r.debates}</td><td>${r.lessonsDone.includes(task.lesson) ? "Sí" : "—"}</td><td>${esc(r.exported)}</td></tr>`).join("")}</tbody></table></div>
    <div class="row"><button class="secondary" id="dCsv">Descarrega CSV</button></div>`;
  out.querySelector("#dCsv").onclick = () => {
    const head = ["alumne", "punts", "credencial", "jornades", "mocions", "mitjana_mocions_20", "dies_seguits", "debats", "tasca_feta", "exportat"];
    const lines = [head.join(";")].concat(rows.map(r => [r.nick, r.xp, r.rank, r.lessonsDone.length, r.arenaCount, avg(r).replace("/20", ""), r.streak, r.debates, r.lessonsDone.includes(task.lesson) ? "si" : "no", r.exported].map(v => `"${String(v).replace(/"/g, '""')}"`).join(";")));
    download("progres_classe.csv", "﻿" + lines.join("\n"), "text/csv");
  };
}

/* ---------- Perfil ---------- */
function exportPayload() {
  const tots = Object.values(S.arena).map(a => total20(a.crit));
  return {
    app: "entrenador-debat", v: 3, nick: S.nick || "(sense pseudònim)", exported: today(),
    xp: S.xp, rank: rankInfo().rank.name, streak: streak(),
    lessonsDone: Object.keys(S.lessons), lessons: S.lessons,
    arenaCount: tots.length, mocioAvg20: tots.length ? Math.round(10 * tots.reduce((a, b) => a + b, 0) / tots.length) / 10 : null,
    debates: S.sala.length, task: S.task ? S.task.lesson : null
  };
}

function renderProfile() {
  const view = document.getElementById("view");
  const r = rankInfo();
  const tots = Object.values(S.arena).map(a => total20(a.crit));
  view.innerHTML = "";
  const box = el(`<section class="page profile">
    <header class="page-head"><h1>Perfil</h1></header>
    <div class="doc badge-card">
      <div class="lanyard" aria-hidden="true"></div>
      <p class="doc-label">Entrenador de Debat · Temporada ${new Date().getFullYear()}–${String(new Date().getFullYear() + 1).slice(2)}</p>
      <h2>${esc(S.nick || "Sense pseudònim")}</h2>
      <p class="badge-rank">${esc(r.rank.name)}</p>
      <div class="meter"><span style="width:${r.pct}%"></span></div>
      <p class="muted small">${S.xp} pts${r.next ? ` · ${ptsLabel(r.next.xp - S.xp)} per a ${esc(r.next.name)}` : ""}</p>
    </div>
    <div class="doc">
      <label>Pseudònim o número de llista<input id="pNick" maxlength="30" value="${esc(S.nick)}" placeholder="Ex.: 3B-07"></label>
      <p class="muted small">Per a protegir la teua privacitat, no uses el nom i els cognoms complets.</p>
    </div>
    <div class="doc"><p class="doc-label">Estadístiques</p>
      <table class="table"><tbody>
        <tr><td>Jornades disputades</td><td>${Object.keys(S.lessons).length}/${allLessons().length}</td></tr>
        <tr><td>Mocions respostes</td><td>${tots.length}</td></tr>
        <tr><td>Mitjana de les mocions</td><td>${tots.length ? (Math.round(10 * tots.reduce((a, b) => a + b, 0) / tots.length) / 10) + "/20" : "—"}</td></tr>
        <tr><td>Dies seguits entrenant</td><td>${streak()}</td></tr>
        <tr><td>Debats a la Sala</td><td>${S.sala.length}</td></tr>
        <tr><td>Exercicis pendents de revisió</td><td>${S.review.length}</td></tr>
      </tbody></table></div>
    <div class="doc"><p class="doc-label">Credencials</p><ol class="ranks">${RANKS.map((x, i) => `<li class="${i <= r.i ? "on" : ""}">${esc(x.name)}<small>${x.xp} pts</small></li>`).join("")}</ol></div>
    <div class="doc">
      <p class="doc-label">Preferències</p>
      <label class="check"><input type="checkbox" id="pVoice" ${S.settings.voice ? "checked" : ""}> Lectura en veu alta a les jornades (botó 🔊)</label>
      <label>Aparença<select id="pTheme"><option value="auto">Automàtica</option><option value="light">Clara</option><option value="dark">Fosca</option></select></label>
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
    if (!S.nick) { toast("Primer escriu un pseudònim o número de llista."); $("#pNick").focus(); return; }
    download(`progres_${S.nick.replace(/[^\w-]+/g, "_")}_${today()}.json`, JSON.stringify(exportPayload(), null, 2), "application/json");
  };
  $("#pReset").onclick = () => { if (confirm("Segur que vols esborrar tot el progrés d'este dispositiu? No es pot desfer.")) { resetState(); applyTheme(); renderProfile(); updateSidebar(); toast("Dades esborrades."); } };
}

/* ---------- Aparença ---------- */
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
    <p>La papereta de la Moció del dia la genera un <b>corrector automàtic orientatiu</b> que funciona dins del navegador, sense enviar el text enlloc. No és una IA: busca indicis en el text i els convertix en punts de 0 a 4 per criteri.</p>
    <table class="table"><tbody>
      <tr><td><b>Argumentació</b></td><td>Connectors de causa i conseqüència («perquè», «per tant»…).</td></tr>
      <tr><td><b>Evidències</b></td><td>Exemples, dades, xifres i fonts («segons…»).</td></tr>
      <tr><td><b>Refutació</b></td><td>Marques de contraargumentació i si s'identifica la fal·làcia concreta de la moció.</td></tr>
      <tr><td><b>Claredat i estructura</b></td><td>Posició explícita al principi, llargària de les frases i conclusió.</td></tr>
      <tr><td><b>Pertinència</b></td><td>Relació amb les paraules i la idea de la moció.</td></tr>
    </tbody></table>
    <p>Com que mira la forma i no entén del tot el sentit, <b>pot equivocar-se</b>. La puntuació és orientativa: contrasteu-la amb el jurat d'aula, amb el professorat o amb el prompt per a IA.</p>`;
  document.getElementById("howClose").onclick = () => document.getElementById("howDialog").close();
  window.addEventListener("hashchange", route);
  route();
})();
