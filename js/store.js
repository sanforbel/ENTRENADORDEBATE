/* Estat persistent (localStorage), dates, XP, ratxa i repàs espaiat. */

const STORE_KEY = "ed_v2_state";
const DEFAULT_STATE = {
  v: 2,
  nick: "",
  xp: 0,
  days: {},          // "AAAA-MM-DD": { lesson: n, arena: n, sala: n }
  lessons: {},       // "u1-l1": { best, total, date }
  review: [],        // { key: "u1-l1#3", due: "AAAA-MM-DD", box: 0 }
  arena: {},         // "AAAA-MM-DD": { claim, vote, text, score, crit, improved, peer }
  arenaScores: [],   // historial de notes globals
  task: null,        // { lesson, days: [0..6], classe, set }
  sala: [],          // historial de debats
  settings: { theme: "auto", voice: false, lang: null }
};

function clone(o) { return JSON.parse(JSON.stringify(o)); }

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const s = Object.assign(clone(DEFAULT_STATE), parsed);
      s.settings = Object.assign(clone(DEFAULT_STATE.settings), parsed.settings || {});
      return s;
    }
  } catch (e) { /* emmagatzematge no disponible */ }
  return clone(DEFAULT_STATE);
}

let S = loadState();

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* sense persistència */ }
}

function resetState() {
  S = clone(DEFAULT_STATE);
  save();
}

/* ---------- Dates (hora local) ---------- */
const pad = n => String(n).padStart(2, "0");
function dateKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
function today() { return dateKey(new Date()); }
function parseKey(k) { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); }
function addDays(k, n) { const d = parseKey(k); d.setDate(d.getDate() + n); return dateKey(d); }
function weekdayIdx(k) { return (parseKey(k).getDay() + 6) % 7; } // 0 = dilluns
let WEEKDAYS_SHORT = DATES.va.short, WEEKDAYS_LONG = DATES.va.long, MONTHS = DATES.va.months;
function prettyDate(k) {
  const d = parseKey(k);
  return DATES[LANG].fmt(WEEKDAYS_LONG[weekdayIdx(k)], d.getDate(), MONTHS[d.getMonth()]);
}
function dayOfYear(k) {
  const d = parseKey(k);
  return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
}

/* ---------- Activitat i ratxa ---------- */
function markActive(kind) {
  const k = today();
  S.days[k] = S.days[k] || { lesson: 0, arena: 0, sala: 0 };
  S.days[k][kind] = (S.days[k][kind] || 0) + 1;
  save();
}
function isActive(k) {
  const d = S.days[k];
  return !!d && ((d.lesson || 0) + (d.arena || 0) + (d.sala || 0)) > 0;
}
function streak() {
  let k = today();
  if (!isActive(k)) k = addDays(k, -1);
  let n = 0;
  while (isActive(k)) { n++; k = addDays(k, -1); }
  return n;
}
function todayGoal() {
  const d = S.days[today()] || {};
  return { lesson: Math.min(1, d.lesson || 0), arena: Math.min(1, d.arena || 0) };
}
function weekKeys() {
  const t = today();
  const start = addDays(t, -weekdayIdx(t));
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
const STREAK_GOALS = [3, 7, 14, 30, 60, 100, 200, 365];
function nextStreakGoal() {
  const s = streak();
  const g = STREAK_GOALS.find(x => x > s) || s + 100;
  const base = isActive(today()) ? today() : addDays(today(), -1);
  return { goal: g, date: addDays(base, g - s) };
}

/* ---------- XP i rangs ---------- */
function rankIndex(xp) {
  let i = 0;
  RANKS.forEach((r, j) => { if (xp >= r.xp) i = j; });
  return i;
}
function rankInfo(xp = S.xp) {
  const i = rankIndex(xp);
  const r = RANKS[i], next = RANKS[i + 1];
  const pct = next ? Math.round(100 * (xp - r.xp) / (next.xp - r.xp)) : 100;
  return { i, rank: r, next, pct };
}
function ptsLabel(n) { return n === 1 ? t("pt_1") : t("pt_n", { n }); }
function addXP(n) {
  const before = rankIndex(S.xp);
  S.xp += Math.max(0, Math.round(n));
  save();
  return { gained: n, rankUp: rankIndex(S.xp) > before };
}

/* ---------- Lliçons ---------- */
function allLessons() {
  const out = [];
  UNITS.forEach(u => u.lessons.forEach((l, i) => out.push({ unit: u, lesson: l, index: i })));
  return out;
}
function findLesson(id) { return allLessons().find(x => x.lesson.id === id); }
function lessonUnlocked(id) {
  const f = findLesson(id);
  if (!f) return false;
  if (S.task && S.task.lesson === id) return true;
  if (f.index === 0) return true;
  return !!S.lessons[f.unit.lessons[f.index - 1].id];
}
function nextLesson() {
  if (S.task && !S.lessons[S.task.lesson] && findLesson(S.task.lesson)) return findLesson(S.task.lesson);
  return allLessons().find(x => !S.lessons[x.lesson.id] && lessonUnlocked(x.lesson.id)) || null;
}

/* ---------- Repàs espaiat ---------- */
const REVIEW_BOXES = [3, 7];
function scheduleReview(key) {
  const due = addDays(today(), REVIEW_BOXES[0]);
  const ex = S.review.find(r => r.key === key);
  if (ex) { ex.due = due; ex.box = 0; } else S.review.push({ key, due, box: 0 });
  save();
  return due;
}
function reviewResult(key, ok) {
  const r = S.review.find(x => x.key === key);
  if (!r) return;
  if (!ok) { r.box = 0; r.due = addDays(today(), 1); }
  else if (r.box + 1 >= REVIEW_BOXES.length) { S.review = S.review.filter(x => x !== r); }
  else { r.box++; r.due = addDays(today(), REVIEW_BOXES[r.box]); }
  save();
}
function dueReviews() { return S.review.filter(r => r.due <= today()); }
function stepFromKey(key) {
  const [lid, idx] = key.split("#");
  const f = findLesson(lid);
  return f ? f.lesson.steps[Number(idx)] : null;
}

/* ---------- Utilitats de DOM ---------- */
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function strip(s) {
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/·/g, "");
}
function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}
function download(name, text, type = "text/plain") {
  const blob = new Blob([text], { type: type + ";charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function toast(msg) {
  const t = el(`<div class="toast" role="status">${esc(msg)}</div>`);
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2600);
}
function speak(text) {
  if (!S.settings.voice || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(text).replace(/<[^>]+>/g, ""));
  u.lang = langInfo().speech;
  speechSynthesis.speak(u);
}
