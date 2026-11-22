/* Moció del dia: posició, text lliure, papereta del jurat (0–4 per criteri), rèplica i jurat d'aula. */

const CRIT_IDS = [
  { id: "logica", w: 0.25 }, { id: "evidencia", w: 0.2 }, { id: "refutacio", w: 0.2 },
  { id: "claredat", w: 0.15 }, { id: "rellevancia", w: 0.2 }
];
function arenaCriteria() { const c = t("crit"); return CRIT_IDS.map(x => Object.assign({}, x, c[x.id])); }
const to4 = v => Math.max(0, Math.min(4, Math.round(v / 25)));
const total20 = crit => CRIT_IDS.reduce((a, c) => a + to4(crit[c.id]), 0);
function decision(n) { const d = t("dec"); return n >= 17 ? d[3] : n >= 13 ? d[2] : n >= 9 ? d[1] : d[0]; }

/* Indicis lèxics en valencià, castellà, anglés i francés (sense accents: es compara amb strip()). */
const LEX = {
  logic: ["perque", "ja que", "per tant", "aixi que", "per aixo", "ates que", "com que", "de manera que", "en consequencia", "aleshores", "llavors", "implica", "es deduix", "es dedueix", "suposa que",
    "porque", "ya que", "por tanto", "asi que", "por eso", "dado que", "puesto que", "por lo tanto",
    "because", "since", "therefore", " so ", "thus", "as a result", "which means", "hence", "this means",
    "parce que", " car ", "puisque", "donc", "par consequent", "c'est pourquoi", "ainsi", "cela signifie"],
  evidence: ["segons", "estudi", "dades", "dada", "enquesta", "informe", "percentatge", "per exemple", "com ara", "font", "investigaci", "experts", "estadistic", "un cas", "pensem en", "imagina", "al meu institut", "al nostre institut", "a la meua classe", "en el meu cas", "com quan", "posem per cas",
    "segun", "estudio", "datos", "encuesta", "por ejemplo", "fuente", "investigacion", "en mi instituto", "en nuestro instituto", "en mi clase", "en mi caso", "como cuando",
    "according to", "study", "data", "survey", "report", "for example", "for instance", "source", "research", "per cent", "percent", "statistic", "in my school", "at my school", "in my class", "in my case", "like when",
    "selon", "etude", "donnees", "enquete", "rapport", "par exemple", "recherche", "statistique", "pourcentage", "dans mon lycee", "dans mon college", "dans ma classe", "dans mon cas", "comme quand"],
  refute: ["pero", "tanmateix", "no obstant", "en canvi", "encara que", "malgrat", "fals", "no es cert", "no es veritat", "no vol dir", "no implica", "no demostra", "confon", "oblida", "no te en compte", "fallacia",
    "sin embargo", "aunque", "no obstante", "en cambio", "falso", "no significa", "no demuestra", "no tiene en cuenta", "falacia", "no quiere decir",
    " but ", "however", "although", "whereas", "false", "not true", "doesn't mean", "does not mean", "doesn't prove", "does not prove", "confuses", "ignores", "fallacy",
    " mais ", "cependant", "pourtant", "bien que", "meme si", "faux", "pas vrai", "ne veut pas dire", "ne prouve pas", "confond", "oublie", "sophisme",
    "generalitz", "generaliz", "generalis", "excepci", "exception", "aillat", "aislado", "isolated", "isole", "coincid", "correlaci", "correlation", "trampa", "trap", "piege"],
  stance: ["crec que", "pense que", "considere", "estic d'acord", "no estic d'acord", "discrepe", "rebutge", "defense", "em convenc", "no em convenc", "opine", "te rao", "no te rao", "es fals", "no es cert", "depen",
    "creo que", "pienso que", "estoy de acuerdo", "no estoy de acuerdo", "me convence", "no me convence", "depende",
    "i think", "i believe", "i agree", "i disagree", "i don't agree", "convinces me", "not convinced", "it depends", "is wrong", "is right",
    "je pense", "je crois", "je suis d'accord", "je ne suis pas d'accord", "me convainc", "ca depend", "cela depend", "a tort", "a raison"],
  conclusion: ["per tant", "en conclusio", "en resum", "per aixo", "aixi doncs", "en definitiva", "per acabar", "concloc",
    "por tanto", "en conclusion", "en resumen", "para terminar",
    "therefore", "in conclusion", "to sum up", "in short", "that's why", "that is why",
    "donc", "pour conclure", "en resume", "c'est pourquoi"]
};
const STOP = new Set(["aquest", "aquesta", "aquests", "aquestes", "estes", "aquells", "aquelles", "tenim", "tindre", "perque", "sempre", "quan", "tambe", "nomes", "molts", "moltes", "totes", "eixe", "eixa", "aixo", "seria", "podem", "poden", "estan", "estava", "havia", "haver", "aleshores",
  "porque", "siempre", "tambien", "todos", "todas", "tenemos", "estos", "estas", "would", "there", "their", "about", "which", "these", "those", "parce", "toujours", "aussi", "toutes", "cette"]);

function arenaClaimFor(k) { return CLAIMS[dayOfYear(k) % CLAIMS.length]; }

function countHits(txt, list) { return list.filter(w => txt.includes(w)).length; }
function keywords(text) {
  return [...new Set(strip(text).split(/[^a-z'·-]+/).filter(w => w.length >= 5 && !STOP.has(w)).map(w => w.slice(0, 5)))];
}

function analyseArgument(text, claim) {
  const raw = text.trim();
  const norm = " " + strip(raw).replace(/[’]/g, "'").replace(/\s+/g, " ") + " ";
  const words = raw ? raw.split(/\s+/).length : 0;
  const sentences = raw.split(/[.!?…]+/).map(s => s.trim()).filter(Boolean);
  const avgLen = sentences.length ? words / sentences.length : 0;
  const firstSentence = " " + strip(sentences[0] || "").replace(/[’]/g, "'") + " ";
  const hits = {
    logic: countHits(norm, LEX.logic),
    evidence: countHits(norm, LEX.evidence),
    refute: countHits(norm, LEX.refute),
    stance: countHits(firstSentence, LEX.stance),
    conclusion: countHits(norm, LEX.conclusion),
    number: /\d/.test(raw),
    flaw: countHits(norm, claim.flawKeys.map(strip))
  };
  const ck = keywords(claim.text), tk = new Set(keywords(raw));
  const overlap = ck.filter(k => tk.has(k)).length;

  const sc = {};
  sc.logica = 25 + 20 * Math.min(hits.logic, 3) + (words > 40 ? 10 : 0) + (hits.conclusion ? 5 : 0);
  sc.evidencia = 15 + 22 * Math.min(hits.evidence, 3) + (hits.number ? 20 : 0);
  sc.refutacio = 15 + 18 * Math.min(hits.refute, 3) + 20 * Math.min(hits.flaw, 2);
  sc.claredat = 45 + (hits.stance ? 20 : 0) + (avgLen >= 8 && avgLen <= 28 ? 15 : -10) + (hits.conclusion ? 10 : 0) + (words >= 40 && words <= 250 ? 10 : 0) - (words < 20 ? 20 : 0);
  sc.rellevancia = 30 + 45 * Math.min(1, overlap / 4) + 12 * Math.min(hits.flaw, 2);
  /* Antifarciment: si hi ha massa marques per paraula (connectors i paraules clau
     amuntegats sense desenvolupar), es rebaixen els criteris que depenen d'indicis. */
  const markers = hits.logic + hits.evidence + hits.refute + hits.conclusion;
  const density = words ? markers / words : 0;
  const stuffing = density > 0.15 ? Math.max(0.4, 0.15 / density) : 1;
  hits.stuffed = stuffing < 1;
  ["logica", "evidencia", "refutacio", "claredat"].forEach(k => sc[k] *= stuffing);
  const cap = words < 10 ? 25 : words < 25 ? 55 : 100;
  Object.keys(sc).forEach(k => sc[k] = Math.max(5, Math.min(cap, Math.round(sc[k]))));
  const global = Math.round(CRIT_IDS.reduce((a, c) => a + c.w * sc[c.id], 0));
  return { sc, global, hits, words, overlap };
}

function liveCoach(text, claim) {
  const a = analyseArgument(text, claim), c = t("coach");
  if (a.words < 5) return c[0];
  if (a.hits.stuffed) return t("coach_stuff");
  if (!a.hits.stance) return c[1];
  if (!a.hits.logic) return c[2];
  if (!a.hits.evidence && !a.hits.number) return c[3];
  if (!a.hits.refute && !a.hits.flaw) return c[4];
  if (!a.hits.conclusion) return c[5];
  return c[6];
}

const wordsLabel = n => tn("words", n);

function renderArena(practiceId) {
  const view = document.getElementById("view");
  const k = today();
  const done = S.arena[k];
  const practice = !!practiceId;
  const claim = practice ? CLAIMS.find(c => c.id === practiceId) : arenaClaimFor(k);
  if (done && !practice) return renderBallot(claim, done, false);

  view.innerHTML = "";
  const box = el(`<section class="page arena">
    <header class="page-head"><h1>${esc(t("mo_title"))}</h1><p>${practice ? esc(t("mo_practice")) : esc(prettyDate(k))}</p></header>
    <article class="doc motion">
      <p class="doc-label">${esc(t("mo_by", { a: claim.author }))} <span class="muted">${esc(t("fictional"))}</span></p>
      <p class="motion-text">${esc(claim.text)}</p>
      <fieldset class="position"><legend>${esc(t("position"))}</legend>
        <button data-v="for">${esc(t("pos_for"))}</button><button data-v="against">${esc(t("pos_against"))}</button><button data-v="nuanced">${esc(t("pos_nuanced"))}</button>
      </fieldset>
    </article>
    <div class="doc write-card" hidden>
      <label for="arText">${esc(t("written"))} <span class="muted">${esc(t("words_hint"))}</span></label>
      <textarea id="arText" rows="9" placeholder="${esc(t("ph_text"))}"></textarea>
      <div class="coach-row"><span class="margin-note" id="arCoach" aria-live="polite">${esc(t("coach")[0])}</span><span class="wc" id="arWc">${esc(wordsLabel(0))}</span></div>
      <label class="check"><input type="checkbox" id="arPeer"> ${esc(t("peer_opt"))}</label>
      <div class="row"><button class="primary" id="arSend" disabled>${esc(t("deliver"))}</button></div>
    </div>
  </section>`);
  view.appendChild(box);
  let vote = null;
  box.querySelectorAll(".position button").forEach(b => b.onclick = () => {
    vote = b.dataset.v;
    box.querySelectorAll(".position button").forEach(x => x.classList.toggle("sel", x === b));
    box.querySelector(".write-card").hidden = false;
    box.querySelector("#arText").focus();
  });
  const ta = box.querySelector("#arText");
  ta.oninput = () => {
    const n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
    box.querySelector("#arWc").textContent = wordsLabel(n);
    box.querySelector("#arCoach").textContent = liveCoach(ta.value, claim);
    box.querySelector("#arSend").disabled = n < 8;
  };
  box.querySelector("#arSend").onclick = () => {
    const text = ta.value.trim();
    const res = analyseArgument(text, claim);
    const entry = { claim: claim.id, vote, text, score: res.global, crit: res.sc, improved: false, peer: null, practice };
    if (box.querySelector("#arPeer").checked) renderPeer(claim, entry, practice);
    else commitArena(claim, entry, practice);
  };
}

function voteLabel(v) { return { for: t("pos_for"), against: t("pos_against"), nuanced: t("pos_nuanced") }[v] || v || "—"; }

function commitArena(claim, entry, practice) {
  entry.xp = (practice ? 5 : 20) + total20(entry.crit);
  S.arenaScores.push(entry.score);
  if (!practice) S.arena[today()] = entry;
  markActive("arena");
  const r = addXP(entry.xp);
  if (r.rankUp) toast(t("rankup", { r: rankInfo().rank.name }));
  save();
  renderBallot(claim, entry, practice);
}

function renderPeer(claim, entry, practice) {
  const view = document.getElementById("view");
  const crits = arenaCriteria(), levels = t("levels");
  view.innerHTML = "";
  const box = el(`<section class="page">
    <header class="page-head"><h1>${esc(t("peer_title"))}</h1><p>${esc(t("peer_sub"))}</p></header>
    <div class="doc"><p class="doc-label">${esc(t("motion"))}</p><p>${esc(claim.text)}</p><p class="doc-label">${esc(t("intervention", { v: voteLabel(entry.vote) }))}</p><p class="peer-text">${esc(entry.text)}</p></div>
    <div class="doc">
      <table class="table ballot-input"><thead><tr><th>${esc(t("criterion"))}</th>${levels.map((l, i) => `<th title="${esc(l)}">${i}</th>`).join("")}</tr></thead>
      <tbody>${crits.map(c => `<tr data-c="${c.id}"><td>${esc(c.name)}</td>${levels.map((l, i) => `<td><button class="mark" data-v="${i}" aria-label="${esc(c.name)}: ${i}, ${esc(l)}"></button></td>`).join("")}</tr>`).join("")}</tbody></table>
      <p class="tip">${esc(t("scale_tip"))}</p>
      <label>${esc(t("peer_comment"))}<textarea id="peerCom" rows="3" placeholder="${esc(t("peer_comment_ph"))}"></textarea></label>
      <div class="row"><button class="primary" id="peerGo" disabled>${esc(t("open_ballot"))}</button></div>
    </div>
  </section>`);
  view.appendChild(box);
  const vals = {};
  box.querySelectorAll("tbody tr").forEach(tr => tr.querySelectorAll(".mark").forEach(b => b.onclick = () => {
    vals[tr.dataset.c] = +b.dataset.v;
    tr.querySelectorAll(".mark").forEach(x => { x.classList.toggle("on", x === b); x.textContent = x === b ? "✓" : ""; });
    box.querySelector("#peerGo").disabled = Object.keys(vals).length < crits.length;
  }));
  box.querySelector("#peerGo").onclick = () => {
    entry.peer = { vals, comment: box.querySelector("#peerCom").value.trim() };
    commitArena(claim, entry, practice);
  };
}

function ballotFor(entry, claim) {
  const sc = entry.crit, crits = arenaCriteria();
  const best = crits.slice().sort((a, b) => sc[b.id] - sc[a.id])[0];
  const lever = crits.slice().sort((a, b) => (100 - sc[b.id]) * b.w - (100 - sc[a.id]) * a.w)[0];
  const a = analyseArgument(entry.text, claim);
  const comment = `${best.good} ${t("but")} ${lever.weak.charAt(0).toLowerCase() + lever.weak.slice(1)} ${a.hits.flaw ? t("flaw_yes") : t("flaw_no")}`;
  return { lever, comment };
}

function renderBallot(claim, entry, practice) {
  const view = document.getElementById("view");
  const b = ballotFor(entry, claim), crits = arenaCriteria(), levels = t("levels");
  const tot = total20(entry.crit);
  const prev = S.arenaScores.length > 1 ? Math.round(S.arenaScores.slice(0, -1).reduce((x, y) => x + y, 0) / (S.arenaScores.length - 1) / 5) : null;
  view.innerHTML = "";
  const peerRows = entry.peer ? crits.map(c => {
    const auto = to4(entry.crit[c.id]), p = entry.peer.vals[c.id];
    return `<tr><td>${esc(c.name)}</td><td>${p}</td><td>${auto}</td><td>${esc(Math.abs(p - auto) >= 2 ? t("diff") : t("same"))}</td></tr>`;
  }).join("") : "";
  const box = el(`<section class="page arena-result">
    <header class="page-head"><h1>${esc(t("ballot_title"))}</h1><p>${practice ? esc(t("mo_practice")) : esc(t("mo_title") + " · " + prettyDate(today()))}</p></header>
    <div class="doc ballot">
      <div class="ballot-head">
        <div><p class="doc-label">${esc(t("motion"))}</p><p class="motion-text small">${esc(claim.text)}</p>
          <p class="muted">${esc(t("position_lbl") + t("colon"))}<b>${esc(voteLabel(entry.vote))}</b>${S.nick ? " · " + esc(t("debater") + t("colon")) + esc(S.nick) : ""}</p></div>
        <div class="ballot-total"><span class="doc-label">${esc(t("total"))}</span><b>${tot}<small>/20</small></b><span class="decision">${esc(decision(tot))}</span></div>
      </div>
      <table class="table ballot-table"><thead><tr><th>${esc(t("criterion"))}</th><th>${esc(t("points"))}</th><th>${esc(t("level"))}</th></tr></thead>
        <tbody>${crits.map(c => { const v = to4(entry.crit[c.id]); return `<tr><td>${esc(c.name)}</td><td><span class="dots" aria-label="${esc(t("dots_aria", { v }))}">${"●".repeat(v)}${"○".repeat(4 - v)}</span> ${v}/4</td><td>${esc(levels[v])}</td></tr>`; }).join("")}</tbody></table>
      <div class="ballot-section"><p class="doc-label">${esc(t("jury_comment"))}</p><p>${esc(b.comment)}</p></div>
      <div class="ballot-section question"><p class="doc-label">${esc(t("jury_question"))}</p><p>${esc(b.lever.q)}</p></div>
      <p class="muted small">${esc(prev != null ? t("prev_avg", { n: prev }) : t("first_motion"))} ${entry.xp ? esc(entry.improved ? t("xp_line_rep", { n: entry.xp }) : t("xp_line", { n: entry.xp })) : ""}</p>
    </div>
    <details class="doc"><summary>${esc(t("fallacy"))}</summary><p><b>${esc(claim.flaw)}.</b> ${esc(claim.explain)}</p></details>
    ${entry.peer ? `<div class="doc"><p class="doc-label">${esc(t("peer_vs"))}</p>
      <table class="table"><thead><tr><th>${esc(t("criterion"))}</th><th>${esc(t("th_peer"))}</th><th>${esc(t("th_auto_col"))}</th><th></th></tr></thead><tbody>${peerRows}</tbody></table>
      ${entry.peer.comment ? `<p><b>${esc(t("comment_lbl"))}</b> ${esc(entry.peer.comment)}</p>` : ""}
      <p class="muted">${esc(t("peer_disc"))}</p></div>` : ""}
    <details class="doc"><summary>${esc(t("your_int"))}</summary><p class="peer-text">${esc(entry.text)}</p></details>
    <div class="row wrap">
      ${!entry.improved ? `<button class="primary" id="arImprove">${esc(t("reply"))}</button>` : ""}
      <button class="secondary" id="arHow">${esc(t("criteria_btn"))}</button>
      <button class="secondary" id="arPrompt">${esc(t("copy_prompt"))}</button>
      <button class="secondary" id="arPractice">${esc(t("other_motion"))}</button>
    </div>
  </section>`);
  view.appendChild(box);
  box.querySelector("#arHow").onclick = () => document.getElementById("howDialog").showModal();
  box.querySelector("#arPrompt").onclick = () => copyText(aiPrompt(claim, entry.text), t("copied_prompt"));
  box.querySelector("#arPractice").onclick = () => {
    const others = CLAIMS.filter(c => c.id !== claim.id);
    renderArena(others[Math.floor(Math.random() * others.length)].id);
  };
  const imp = box.querySelector("#arImprove");
  if (imp) imp.onclick = () => renderReply(claim, entry, practice, b);
}

function renderReply(claim, entry, practice, b) {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const box = el(`<section class="page">
    <header class="page-head"><h1>${esc(t("reply_title"))}</h1><p>${esc(t("reply_sub"))}</p></header>
    <div class="doc ballot-section question"><p class="doc-label">${esc(t("jury_question"))} · ${esc(b.lever.name)}</p><p>${esc(b.lever.q)}</p></div>
    <div class="doc"><label for="imText">${esc(t("revised"))}</label>
      <textarea id="imText" rows="10">${esc(entry.text)}</textarea>
      <div class="coach-row"><span class="margin-note" id="imCoach">${esc(liveCoach(entry.text, claim))}</span></div>
      <div class="row"><button class="primary" id="imSend">${esc(t("deliver_reply"))}</button><button class="secondary" id="imCancel">${esc(t("back_ballot"))}</button></div></div>
  </section>`);
  view.appendChild(box);
  const ta = box.querySelector("#imText");
  ta.oninput = () => box.querySelector("#imCoach").textContent = liveCoach(ta.value, claim);
  box.querySelector("#imCancel").onclick = () => renderBallot(claim, entry, practice);
  box.querySelector("#imSend").onclick = () => {
    const res = analyseArgument(ta.value, claim);
    const better = total20(res.sc) > total20(entry.crit);
    const upd = Object.assign({}, entry, { text: ta.value.trim(), improved: true });
    if (better) {
      upd.score = res.global; upd.crit = res.sc; upd.xp = (entry.xp || 0) + 15;
      addXP(15);
      toast(t("reply_up", { a: total20(entry.crit), b: total20(res.sc) }));
    } else toast(t("reply_same"));
    S.arenaScores[S.arenaScores.length - 1] = upd.score;
    if (!practice) S.arena[today()] = upd;
    save();
    renderBallot(claim, upd, practice);
  };
}

function aiPrompt(claim, text) {
  return t("ai_prompt", { m: claim.text, x: text });
}

function copyText(text, msg) {
  const done = () => toast(msg);
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}
function fallbackCopy(text, done) {
  const ta = el(`<textarea style="position:fixed;opacity:0"></textarea>`);
  ta.value = text; document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); done(); } catch (e) { prompt(t("copy_fallback"), text); }
  ta.remove();
}
