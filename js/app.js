/* Navegació, Inici (full de temporada), Calendari, Docent, Perfil i Com funciona. */

const ROUTES = {
  inici: renderHome,
  calendari: renderPath,
  mocio: () => renderArena(),
  sala: renderSala,
  docent: renderTeacher,
  perfil: renderProfile,
  info: renderInfo
};
const NAV = [["inici", "◧", "nav_home"], ["calendari", "▤", "nav_cal"], ["mocio", "§", "nav_motion"], ["sala", "◉", "nav_sala"], ["docent", "✎", "nav_teacher"], ["perfil", "◍", "nav_profile"], ["info", "?", "nav_info"]];

function route() {
  const [name, arg] = location.hash.replace(/^#/, "").split("/");
  stopSalaMedia();
  endLessonMode();
  document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + (name || "inici")));
  window.scrollTo(0, 0);
  if (name === "jornada" && arg) {
    if (!lessonUnlocked(arg)) { toast(t("locked_prev")); location.hash = "#calendari"; return; }
    return startLesson(arg);
  }
  if (name === "revisio") return startReview();
  (ROUTES[name] || renderHome)();
  updateSidebar();
  document.getElementById("view").focus({ preventScroll: true });
}

function langSelect(id) {
  return `<select id="${id}" class="lang-select" aria-label="${esc(t("lang"))}">${LANGS.map(l => `<option value="${l.id}" ${l.id === LANG ? "selected" : ""}>${esc(l.label)}</option>`).join("")}</select>`;
}

function setLang(id) {
  S.settings.lang = id; save();
  applyLang(id);
  renderChrome();
  route();
}

/* Barra lateral i elements fixos, segons la llengua. */
function renderChrome() {
  document.querySelector(".skip").textContent = t("skip");
  document.getElementById("brandText").innerHTML = t("brand");
  document.getElementById("nav").innerHTML = NAV.map(([h, ic, k]) => `<a href="#${h}"><span aria-hidden="true">${ic}</span><em>${esc(t(k))}</em></a>`).join("");
  document.getElementById("sideStats").innerHTML = `
    <span title="${esc(t("side_att_t"))}"><small>${esc(t("side_att"))}</small><b id="sideStreak"></b></span>
    <span title="${esc(t("side_pts_t"))}"><small>${esc(t("side_pts"))}</small><b id="sideXP"></b></span>`;
  document.getElementById("sideLang").innerHTML = langSelect("langSide");
  document.getElementById("langSide").onchange = e => setLang(e.target.value);
  document.getElementById("sideCredit").innerHTML = `<a href="#info">${esc(t("credit_short"))}</a>`;
  document.getElementById("howTitle").textContent = t("how_title");
  document.getElementById("howBody").innerHTML = t("how_body");
  document.getElementById("howClose").textContent = t("close");
}

function updateSidebar() {
  document.getElementById("sideStreak").textContent = streak() + " " + t("d");
  document.getElementById("sideXP").textContent = S.xp + " " + t("pts");
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
  setTimeout(() => toast(t("task_new", { t: findLesson(lesson).lesson.title })), 300);
}

function jornadaNum(id) { return allLessons().findIndex(x => x.lesson.id === id) + 1; }
const toNext = r => r.next ? t("to_next", { p: ptsLabel(r.next.xp - S.xp), r: r.next.name }) : t("max_level");

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
    <header class="page-head head-with-lang"><div><p class="doc-label">${esc(t("home_label", { d: prettyDate(today()) }))}</p><h1>${S.nick ? esc(S.nick) : esc(t("home_welcome"))}</h1>
      <p>${esc(t("home_sub", { a: done, b: allLessons().length, p: S.xp }))}</p></div><div class="mobile-lang">${langSelect("langHome")}</div></header>

    <div class="home-grid">
      <div class="doc">
        <p class="doc-label">${esc(t("agenda"))}</p>
        <ul class="checklist">
          <li class="${g.lesson ? "done" : ""}"><span class="cb">${g.lesson ? "✓" : ""}</span><a href="${nl ? "#jornada/" + nl.lesson.id : "#calendari"}">${esc(t("agenda_lesson"))}</a></li>
          <li class="${g.arena ? "done" : ""}"><span class="cb">${g.arena ? "✓" : ""}</span><a href="#mocio">${esc(t("agenda_motion"))}</a></li>
          ${due ? `<li><span class="cb"></span><a href="#revisio">${esc(tn("agenda_review", due))}</a></li>` : ""}
        </ul>
      </div>
      <div class="doc">
        <p class="doc-label">${esc(t("week_att"))}</p>
        ${attendanceStrip()}
        <p class="muted small">${esc(tn("streak", streak()))}</p>
      </div>
      <div class="doc credential">
        <p class="doc-label">${esc(t("credential"))}</p>
        <b>${esc(r.rank.name)}</b>
        <div class="meter"><span style="width:${r.pct}%"></span></div>
        <p class="muted small">${esc(toNext(r))}</p>
      </div>
    </div>

    ${task ? `<a class="doc link-card task-card ${taskToday ? "today" : ""}" href="#jornada/${task.lesson.id}" style="--unit:${task.unit.color}">
      <p class="doc-label">${esc(t("class_task"))}${S.task.classe ? " · " + esc(S.task.classe) : ""}${S.task.days.length ? " · " + S.task.days.map(d => WEEKDAYS_SHORT[d]).join(" ") : ""}</p>
      <b>${esc(t("jornada_n", { n: jornadaNum(task.lesson.id), t: task.lesson.title }))}</b>
      <span class="muted">${esc(S.lessons[task.lesson.id] ? t("task_done") : taskToday ? t("task_today") : t("task_pending"))}</span></a>` : ""}

    <div class="home-grid two">
      ${nl ? `<a class="doc link-card next-card" href="#jornada/${nl.lesson.id}" style="--unit:${nl.unit.color}">
        <p class="doc-label">${esc(t("next_j", { u: nl.unit.title }))}</p><b>${esc(t("jornada_n", { n: jornadaNum(nl.lesson.id), t: nl.lesson.title }))}</b><span class="go">${esc(t("start_arrow"))}</span></a>`
        : `<div class="doc next-card"><p class="doc-label">${esc(t("season"))}</p><b>${esc(t("all_done"))}</b><span class="muted">${esc(t("all_done_sub"))}</span></div>`}
      <a class="doc link-card" href="#mocio"><p class="doc-label">${esc(t("motion_today"))}</p><p class="motion-text small">${esc(claim.text)}</p>
        <span class="muted">${esc(S.arena[today()] ? t("motion_delivered", { s: total20(S.arena[today()].crit) }) : t("motion_pending"))}</span></a>
    </div>

    <div class="doc pissarra"><p class="doc-label">${esc(t("board"))}</p><p>${esc(idea)}</p><button class="text-btn" id="shareIdea">${esc(t("copy_it"))}</button></div>
  </section>`);
  view.appendChild(box);
  box.querySelector("#shareIdea").onclick = () => copyText(idea, t("copied_phrase"));
  box.querySelector("#langHome").onchange = e => setLang(e.target.value);
}

/* ---------- Calendari de la temporada ---------- */
function renderPath() {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const total = allLessons().length, done = allLessons().filter(x => S.lessons[x.lesson.id]).length;
  const box = el(`<section class="page path">
    <header class="page-head"><h1>${esc(t("cal_title"))}</h1><p>${esc(t("cal_sub", { a: done, b: total }))}</p></header>
  </section>`);
  UNITS.forEach((u, ui) => {
    const d = u.lessons.filter(l => S.lessons[l.id]).length;
    const sec = el(`<section class="doc block" style="--unit:${u.color}">
      <div class="block-head"><span class="block-num">${esc(t("bloc", { n: ui + 1 }))}</span><h2>${esc(u.title)}</h2><span class="muted">${d}/${u.lessons.length}</span></div>
      <table class="table fixtures"><thead><tr><th>${esc(t("th_jornada"))}</th><th>${esc(t("th_session"))}</th><th>${esc(t("th_state"))}</th><th></th></tr></thead><tbody></tbody></table></section>`);
    const tb = sec.querySelector("tbody");
    let nextGiven = false;
    u.lessons.forEach(l => {
      const rec = S.lessons[l.id];
      const open = lessonUnlocked(l.id);
      const isNext = open && !rec && !nextGiven;
      if (isNext) nextGiven = true;
      const isTask = S.task && S.task.lesson === l.id;
      const state = rec ? t("st_played", { a: rec.best, b: rec.total }) : isNext ? t("st_next") : open ? t("st_open") : t("st_locked");
      tb.appendChild(el(`<tr class="${rec ? "played" : ""} ${isNext ? "next" : ""} ${!open ? "locked" : ""}">
        <td>${jornadaNum(l.id)}</td><td><b>${esc(l.title)}</b>${isTask ? ` <span class="ex-flag">${esc(t("flag_task"))}</span>` : ""}<small class="m-state">${esc(state)}</small></td><td class="state">${esc(state)}</td>
        <td>${open ? `<a class="${isNext ? "primary small-btn" : "secondary small-btn"}" href="#jornada/${l.id}">${esc(rec ? t("btn_repeat") : t("btn_start"))}</a>` : ""}</td></tr>`));
    });
    box.appendChild(sec);
  });
  box.appendChild(el(`<p class="muted small">${t("cal_foot")}</p>`));
  view.appendChild(box);
}

/* ---------- Docent ---------- */
function renderTeacher() {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const tk = S.task || { lesson: allLessons()[0].lesson.id, days: [], classe: "" };
  const box = el(`<section class="page teacher">
    <header class="page-head"><h1>${esc(t("tch_title"))}</h1><p>${esc(t("tch_sub"))}</p></header>
    <div class="doc">
      <p class="doc-label">${esc(t("tch_task"))}</p>
      <p class="muted">${esc(t("tch_task_help"))}</p>
      <div class="grid2">
        <label>${esc(t("tch_group"))}<input id="dClass" maxlength="40" placeholder="${esc(t("tch_group_ph"))}" value="${esc(tk.classe)}"></label>
        <label>${esc(t("tch_jornada"))}<select id="dLesson">${UNITS.map((u, ui) => `<optgroup label="${esc(t("bloc", { n: ui + 1 }) + ". " + u.title)}">${u.lessons.map(l => `<option value="${l.id}">${jornadaNum(l.id)}. ${esc(l.title)}</option>`).join("")}</optgroup>`).join("")}</select></label>
      </div>
      <fieldset class="days"><legend>${esc(t("tch_days"))}</legend>${WEEKDAYS_SHORT.map((d, i) => `<label class="day"><input type="checkbox" value="${i}" ${tk.days.includes(i) ? "checked" : ""}><span>${esc(d.replace(".", ""))}</span></label>`).join("")}</fieldset>
      <div class="row wrap"><button class="primary" id="dLink">${esc(t("tch_link"))}</button><button class="secondary" id="dHere">${esc(t("tch_here"))}</button>${S.task ? `<button class="text-btn" id="dClear">${esc(t("tch_clear"))}</button>` : ""}</div>
      <div id="dOut"></div>
    </div>
    <div class="doc">
      <p class="doc-label">${esc(t("tch_progress"))}</p>
      <p class="muted">${t("tch_progress_help")}</p>
      <label class="file-btn secondary">${esc(t("tch_import"))}<input type="file" id="dFiles" accept=".json,application/json" multiple hidden></label>
      <div id="dTable"></div>
    </div>
    <div class="doc">
      <p class="doc-label">${esc(t("tch_ideas"))}</p>
      <ul class="tips">${t("tch_tips").map(x => `<li>${x}</li>`).join("")}</ul>
    </div>
  </section>`);
  view.appendChild(box);
  const $ = s => box.querySelector(s);
  $("#dLesson").value = tk.lesson;
  const read = () => ({ lesson: $("#dLesson").value, classe: $("#dClass").value.trim(), days: [...box.querySelectorAll(".days input:checked")].map(i => +i.value) });
  $("#dLink").onclick = () => {
    const v = read();
    const base = location.href.split("?")[0].split("#")[0];
    const url = `${base}?tasca=${encodeURIComponent(v.lesson)}${v.days.length ? "&dies=" + v.days.join(",") : ""}${v.classe ? "&classe=" + encodeURIComponent(v.classe) : ""}#inici`;
    $("#dOut").innerHTML = `<div class="link-out"><input readonly value="${esc(url)}" aria-label="${esc(t("tch_link_label"))}"><button class="primary" id="dCopy">${esc(t("tch_copy"))}</button></div>
      <p class="muted">${esc(t("tch_link_help"))}</p>`;
    $("#dCopy").onclick = () => copyText(url, t("copied_link"));
  };
  $("#dHere").onclick = () => { const v = read(); S.task = Object.assign(v, { set: today() }); save(); toast(t("tch_applied")); renderTeacher(); };
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
  if (!rows.length) { out.innerHTML = `<p class="muted">${esc(t("tch_none"))}</p>`; return; }
  rows.sort((a, b) => String(a.nick).localeCompare(String(b.nick), langInfo().html, { numeric: true }));
  const tl = findLesson(task.lesson);
  const avg = r => r.mocioAvg20 != null ? r.mocioAvg20 + "/20" : (r.arenaAvg != null ? Math.round(r.arenaAvg / 5) + "/20" : "—");
  out.innerHTML = `<div class="table-wrap"><table class="table"><thead><tr><th>${esc(t("col_student"))}</th><th>${esc(t("col_points"))}</th><th>${esc(t("col_cred"))}</th><th>${esc(t("col_jorn"))}</th><th>${esc(t("col_motions"))}</th><th>${esc(t("col_avg"))}</th><th>${esc(t("col_streak"))}</th><th>${esc(t("col_debates"))}</th><th>${esc(t("col_task", { t: tl ? tl.lesson.title : "—" }))}</th><th>${esc(t("col_exported"))}</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${esc(r.nick || "—")}</td><td>${r.xp}</td><td>${esc(r.rank)}</td><td>${r.lessonsDone.length}/${allLessons().length}</td><td>${r.arenaCount}</td><td>${avg(r)}</td><td>${r.streak}</td><td>${r.debates}</td><td>${r.lessonsDone.includes(task.lesson) ? esc(t("yes")) : "—"}</td><td>${esc(r.exported)}</td></tr>`).join("")}</tbody></table></div>
    <div class="row"><button class="secondary" id="dCsv">${esc(t("tch_csv"))}</button></div>`;
  out.querySelector("#dCsv").onclick = () => {
    const head = ["alumne", "punts", "credencial", "jornades", "mocions", "mitjana_mocions_20", "dies_seguits", "debats", "tasca_feta", "exportat"];
    const lines = [head.join(";")].concat(rows.map(r => [r.nick, r.xp, r.rank, r.lessonsDone.length, r.arenaCount, avg(r).replace("/20", ""), r.streak, r.debates, r.lessonsDone.includes(task.lesson) ? "1" : "0", r.exported].map(v => `"${String(v).replace(/"/g, '""')}"`).join(";")));
    download("progres_classe.csv", "﻿" + lines.join("\n"), "text/csv");
  };
}

/* ---------- Perfil ---------- */
function exportPayload() {
  const tots = Object.values(S.arena).map(a => total20(a.crit));
  return {
    app: "entrenador-debat", v: 4, lang: LANG, nick: S.nick || t("no_nick"), exported: today(),
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
  const y = new Date().getFullYear();
  view.innerHTML = "";
  const box = el(`<section class="page profile">
    <header class="page-head"><h1>${esc(t("prof_title"))}</h1></header>
    <div class="doc badge-card">
      <div class="lanyard" aria-hidden="true"></div>
      <p class="doc-label">${esc(t("season_badge", { y: y + "–" + String(y + 1).slice(2) }))}</p>
      <h2>${esc(S.nick || t("no_nick"))}</h2>
      <p class="badge-rank">${esc(r.rank.name)}</p>
      <div class="meter"><span style="width:${r.pct}%"></span></div>
      <p class="muted small">${S.xp} ${esc(t("pts"))}${r.next ? " · " + esc(toNext(r)) : ""}</p>
    </div>
    <div class="doc">
      <label>${esc(t("nick_label"))}<input id="pNick" maxlength="30" value="${esc(S.nick)}" placeholder="${esc(t("nick_ph"))}"></label>
      <p class="muted small">${esc(t("nick_help"))}</p>
    </div>
    <div class="doc"><p class="doc-label">${esc(t("stats"))}</p>
      <table class="table"><tbody>
        <tr><td>${esc(t("st_jorn"))}</td><td>${Object.keys(S.lessons).length}/${allLessons().length}</td></tr>
        <tr><td>${esc(t("st_mot"))}</td><td>${tots.length}</td></tr>
        <tr><td>${esc(t("st_avg"))}</td><td>${tots.length ? (Math.round(10 * tots.reduce((a, b) => a + b, 0) / tots.length) / 10) + "/20" : "—"}</td></tr>
        <tr><td>${esc(t("st_streak"))}</td><td>${streak()}</td></tr>
        <tr><td>${esc(t("st_deb"))}</td><td>${S.sala.length}</td></tr>
        <tr><td>${esc(t("st_rev"))}</td><td>${S.review.length}</td></tr>
      </tbody></table></div>
    <div class="doc"><p class="doc-label">${esc(t("creds"))}</p><ol class="ranks">${RANKS.map((x, i) => `<li class="${i <= r.i ? "on" : ""}">${esc(x.name)}<small>${x.xp} ${esc(t("pts"))}</small></li>`).join("")}</ol></div>
    <div class="doc">
      <p class="doc-label">${esc(t("prefs"))}</p>
      <label>${esc(t("pref_lang"))}${langSelect("langProfile")}</label>
      <label class="check"><input type="checkbox" id="pVoice" ${S.settings.voice ? "checked" : ""}> ${esc(t("pref_voice"))}</label>
      <label>${esc(t("pref_theme"))}<select id="pTheme"><option value="auto">${esc(t("th_auto"))}</option><option value="light">${esc(t("th_light"))}</option><option value="dark">${esc(t("th_dark"))}</option></select></label>
    </div>
    <div class="row wrap">
      <button class="primary" id="pExport">${esc(t("export_btn"))}</button>
      <button class="danger-btn" id="pReset">${esc(t("reset_btn"))}</button>
    </div>
  </section>`);
  view.appendChild(box);
  const $ = s => box.querySelector(s);
  $("#pTheme").value = S.settings.theme;
  $("#langProfile").onchange = e => setLang(e.target.value);
  $("#pNick").onchange = e => { S.nick = e.target.value.trim(); save(); renderProfile(); };
  $("#pVoice").onchange = e => { S.settings.voice = e.target.checked; save(); };
  $("#pTheme").onchange = e => { S.settings.theme = e.target.value; save(); applyTheme(); };
  $("#pExport").onclick = () => {
    if (!S.nick) { toast(t("need_nick")); $("#pNick").focus(); return; }
    download(`progres_${S.nick.replace(/[^\w-]+/g, "_")}_${today()}.json`, JSON.stringify(exportPayload(), null, 2), "application/json");
  };
  $("#pReset").onclick = () => {
    if (confirm(t("reset_confirm"))) {
      const lang = LANG;
      resetState(); S.settings.lang = lang; save();
      applyTheme(); renderProfile(); updateSidebar(); toast(t("reset_done"));
    }
  };
}

/* ---------- Com funciona ---------- */
function renderInfo() {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const box = el(`<section class="page info">
    <header class="page-head head-with-lang"><div><h1>${esc(t("info_title"))}</h1></div><div>${langSelect("langInfo")}</div></header>
    ${t("info_html")}
    <div class="doc"><p class="doc-label">${esc(t("how_title"))}</p>${t("how_body")}</div>
    <div class="doc credits"><p class="doc-label">${esc(t("credits_label"))}</p>${t("credits_html")}</div>
  </section>`);
  view.appendChild(box);
  box.querySelector("#langInfo").onchange = e => setLang(e.target.value);
}

/* ---------- Aparença ---------- */
function applyTheme() {
  const th = S.settings.theme;
  if (th === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", th);
}

function detectLang() {
  const nav = (navigator.language || "ca").toLowerCase();
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";
  if (nav.startsWith("fr")) return "fr";
  return "va";
}

/* ---------- Inici de l'app ---------- */
(function init() {
  applyTheme();
  applyLang(S.settings.lang || detectLang());
  renderChrome();
  readTaskFromURL();
  document.getElementById("howClose").onclick = () => document.getElementById("howDialog").close();
  window.addEventListener("hashchange", route);
  route();
})();
