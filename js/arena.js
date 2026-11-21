/* Moció del dia: posició, text lliure, papereta del jurat (0–4 per criteri), rèplica i jurat d'aula. */

const ARENA_CRITERIA = [
  { id: "logica", name: "Argumentació", w: 0.25,
    good: "Les raons estan ben encadenades i porten a la conclusió.",
    weak: "Les idees apareixen soltes: no queda clar per què se'n deduïx la teua posició.",
    q: "Per què hauria d'acceptar el jurat la teua conclusió? Quina raó la sosté?" },
  { id: "evidencia", name: "Evidències", w: 0.2,
    good: "Hi ha exemples o dades que donen suport al que dius.",
    weak: "Tot descansa en l'opinió: no hi ha cap exemple, dada ni font.",
    q: "Quina dada o quin exemple concret demostraria el que afirmes?" },
  { id: "refutacio", name: "Refutació", w: 0.2,
    good: "Identifiques on falla el raonament de la moció.",
    weak: "Prens posició, però no expliques on falla el raonament de la moció.",
    q: "En quin punt exacte s'equivoca el raonament de la moció?" },
  { id: "claredat", name: "Claredat i estructura", w: 0.15,
    good: "La posició és explícita i el text té un inici i un tancament clars.",
    weak: "Costa identificar la posició o el text no té una estructura clara.",
    q: "Si el jurat només llegira la primera i l'última frase, sabria què defens?" },
  { id: "rellevancia", name: "Pertinència", w: 0.2,
    good: "Respons exactament el que planteja la moció.",
    weak: "Part del text s'allunya del que planteja la moció.",
    q: "Estàs responent exactament el que afirma la moció, o un tema veí?" }
];
const LEVELS = ["Absent", "Inicial", "En procés", "Assolit", "Excel·lent"];
const to4 = v => Math.max(0, Math.min(4, Math.round(v / 25)));
const total20 = crit => ARENA_CRITERIA.reduce((a, c) => a + to4(crit[c.id]), 0);
function decision(t) {
  if (t >= 17) return "Intervenció guanyadora";
  if (t >= 13) return "Intervenció sòlida";
  if (t >= 9) return "Cal reforçar-la";
  return "Insuficient";
}

const LEX = {
  logic: ["perque", "ja que", "per tant", "aixi que", "per aixo", "ates que", "com que", "de manera que", "en consequencia", "aleshores", "llavors", "porque", "ya que", "por tanto", "asi que", "por eso", "dado que", "puesto que", "por lo tanto", "implica", "es deduix", "es dedueix", "si es aixi", "suposa que"],
  evidence: ["segons", "estudi", "dades", "dada", "enquesta", "informe", "percentatge", "per exemple", "com ara", "font", "investigaci", "experts", "estadistic", "segun", "estudio", "datos", "encuesta", "por ejemplo", "fuente", "investigacion", "un cas", "pensem en", "imagina"],
  refute: ["pero", "tanmateix", "no obstant", "en canvi", "encara que", "malgrat", "sin embargo", "aunque", "no obstante", "en cambio", "fals", "no es cert", "no es veritat", "no vol dir", "no implica", "no demostra", "confon", "oblida", "no te en compte", "no tiene en cuenta", "falso", "no significa", "no demuestra", "fallacia", "falacia", "generalitz", "excepci", "aillat", "coincid", "correlaci", "trampa"],
  stance: ["crec que", "pense que", "considere", "estic d'acord", "no estic d'acord", "discrepe", "rebutge", "defense", "em convenc", "no em convenc", "opine", "creo que", "pienso que", "estoy de acuerdo", "no estoy de acuerdo", "depen", "depende", "no es cert", "es fals", "te rao", "no te rao"],
  conclusion: ["per tant", "en conclusio", "en resum", "per aixo", "aixi doncs", "en definitiva", "por tanto", "en conclusion", "en resumen", "en definitiva", "per acabar", "concloc"]
};
const STOP = new Set(["aquest", "aquesta", "aquests", "aquestes", "estes", "aquells", "aquelles", "tenim", "tindre", "perque", "sempre", "quan", "tambe", "nomes", "molts", "moltes", "totes", "eixe", "eixa", "aixo", "d'aixo", "seria", "podem", "poden", "estan", "estava", "havia", "haver", "fer-ho", "aleshores"]);

function arenaClaimFor(k) { return CLAIMS[dayOfYear(k) % CLAIMS.length]; }

function countHits(t, list) { return list.filter(w => t.includes(w)).length; }
function keywords(text) {
  return [...new Set(strip(text).split(/[^a-z'·-]+/).filter(w => w.length >= 5 && !STOP.has(w)).map(w => w.slice(0, 5)))];
}

function analyseArgument(text, claim) {
  const raw = text.trim();
  const t = " " + strip(raw).replace(/\s+/g, " ") + " ";
  const words = raw ? raw.split(/\s+/).length : 0;
  const sentences = raw.split(/[.!?…]+/).map(s => s.trim()).filter(Boolean);
  const avgLen = sentences.length ? words / sentences.length : 0;
  const firstSentence = " " + strip(sentences[0] || "") + " ";
  const hits = {
    logic: countHits(t, LEX.logic),
    evidence: countHits(t, LEX.evidence),
    refute: countHits(t, LEX.refute),
    stance: countHits(firstSentence, LEX.stance),
    conclusion: countHits(t, LEX.conclusion),
    number: /\d/.test(raw),
    flaw: countHits(t, claim.flawKeys.map(strip))
  };
  const ck = keywords(claim.text), tk = new Set(keywords(raw));
  const overlap = ck.filter(k => tk.has(k)).length;

  const sc = {};
  sc.logica = 25 + 20 * Math.min(hits.logic, 3) + (words > 40 ? 10 : 0) + (hits.conclusion ? 5 : 0);
  sc.evidencia = 15 + 22 * Math.min(hits.evidence, 3) + (hits.number ? 20 : 0);
  sc.refutacio = 15 + 18 * Math.min(hits.refute, 3) + 20 * Math.min(hits.flaw, 2);
  sc.claredat = 45 + (hits.stance ? 20 : 0) + (avgLen >= 8 && avgLen <= 28 ? 15 : -10) + (hits.conclusion ? 10 : 0) + (words >= 40 && words <= 250 ? 10 : 0) - (words < 20 ? 20 : 0);
  sc.rellevancia = 30 + 45 * Math.min(1, overlap / 4) + 12 * Math.min(hits.flaw, 2);
  const cap = words < 10 ? 25 : words < 25 ? 55 : 100;
  Object.keys(sc).forEach(k => sc[k] = Math.max(5, Math.min(cap, Math.round(sc[k]))));
  const global = Math.round(ARENA_CRITERIA.reduce((a, c) => a + c.w * sc[c.id], 0));
  return { sc, global, hits, words, overlap };
}


function liveCoach(text, claim) {
  const a = analyseArgument(text, claim);
  if (a.words < 5) return "Nota al marge: comença declarant la teua posició.";
  if (!a.hits.stance) return "Nota al marge: el jurat ha de saber la teua posició des de la primera frase.";
  if (!a.hits.logic) return "Nota al marge: falta una raó explícita («perquè», «ja que», «per tant»).";
  if (!a.hits.evidence && !a.hits.number) return "Nota al marge: no hi ha cap exemple ni dada.";
  if (!a.hits.refute && !a.hits.flaw) return "Nota al marge: assenyala on falla el raonament de la moció.";
  if (!a.hits.conclusion) return "Nota al marge: falta una frase de conclusió.";
  return "Nota al marge: l'estructura és completa. Revisa-la i lliura-la.";
}

function renderArena(practiceId) {
  const view = document.getElementById("view");
  const k = today();
  const done = S.arena[k];
  const practice = !!practiceId;
  const claim = practice ? CLAIMS.find(c => c.id === practiceId) : arenaClaimFor(k);
  if (done && !practice) return renderBallot(claim, done, false);

  view.innerHTML = "";
  const box = el(`<section class="page arena">
    <header class="page-head"><h1>Moció del dia</h1><p>${practice ? "Moció de pràctica" : esc(prettyDate(k))}</p></header>
    <article class="doc motion">
      <p class="doc-label">Moció presentada per ${esc(claim.author)} <span class="muted">(personatge fictici)</span></p>
      <p class="motion-text">${esc(claim.text)}</p>
      <fieldset class="position"><legend>La teua posició</legend>
        <button data-v="A favor">A favor</button><button data-v="En contra">En contra</button><button data-v="Matisada">Matisada</button>
      </fieldset>
    </article>
    <div class="doc write-card" hidden>
      <label for="arText">Intervenció escrita <span class="muted">(entre 40 i 200 paraules)</span></label>
      <textarea id="arText" rows="9" placeholder="Senyores i senyors del jurat: …"></textarea>
      <div class="coach-row"><span class="margin-note" id="arCoach" aria-live="polite">Nota al marge: comença declarant la teua posició.</span><span class="wc" id="arWc">0 paraules</span></div>
      <label class="check"><input type="checkbox" id="arPeer"> Jurat d'aula: una altra persona avalua la intervenció abans de vore la papereta automàtica</label>
      <div class="row"><button class="primary" id="arSend" disabled>Lliura la intervenció</button></div>
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
    box.querySelector("#arWc").textContent = n + (n === 1 ? " paraula" : " paraules");
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

function commitArena(claim, entry, practice) {
  entry.xp = (practice ? 5 : 20) + total20(entry.crit);
  S.arenaScores.push(entry.score);
  if (!practice) S.arena[today()] = entry;
  markActive("arena");
  const r = addXP(entry.xp);
  if (r.rankUp) toast("Nova credencial: " + rankInfo().rank.name + ".");
  save();
  renderBallot(claim, entry, practice);
}

function renderPeer(claim, entry, practice) {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const box = el(`<section class="page">
    <header class="page-head"><h1>Jurat d'aula</h1><p>Passa el dispositiu a la persona que farà de jurat. Ha de puntuar cada criteri abans de vore la papereta automàtica.</p></header>
    <div class="doc"><p class="doc-label">Moció</p><p>${esc(claim.text)}</p><p class="doc-label">Intervenció (${esc(entry.vote)})</p><p class="peer-text">${esc(entry.text)}</p></div>
    <div class="doc">
      <table class="table ballot-input"><thead><tr><th>Criteri</th>${LEVELS.map((l, i) => `<th title="${l}">${i}</th>`).join("")}</tr></thead>
      <tbody>${ARENA_CRITERIA.map(c => `<tr data-c="${c.id}"><td>${c.name}</td>${LEVELS.map((l, i) => `<td><button class="mark" data-v="${i}" aria-label="${c.name}: ${i}, ${l}"></button></td>`).join("")}</tr>`).join("")}</tbody></table>
      <p class="tip">0 Absent · 1 Inicial · 2 En procés · 3 Assolit · 4 Excel·lent</p>
      <label>Comentari del jurat d'aula<textarea id="peerCom" rows="3" placeholder="Un punt fort i un aspecte que cal millorar."></textarea></label>
      <div class="row"><button class="primary" id="peerGo" disabled>Obri la papereta automàtica</button></div>
    </div>
  </section>`);
  view.appendChild(box);
  const vals = {};
  box.querySelectorAll("tbody tr").forEach(tr => tr.querySelectorAll(".mark").forEach(b => b.onclick = () => {
    vals[tr.dataset.c] = +b.dataset.v;
    tr.querySelectorAll(".mark").forEach(x => { x.classList.toggle("on", x === b); x.textContent = x === b ? "✓" : ""; });
    box.querySelector("#peerGo").disabled = Object.keys(vals).length < ARENA_CRITERIA.length;
  }));
  box.querySelector("#peerGo").onclick = () => {
    entry.peer = { vals, comment: box.querySelector("#peerCom").value.trim() };
    commitArena(claim, entry, practice);
  };
}

function ballotFor(entry, claim) {
  const sc = entry.crit;
  const best = ARENA_CRITERIA.slice().sort((a, b) => sc[b.id] - sc[a.id])[0];
  const lever = ARENA_CRITERIA.slice().sort((a, b) => (100 - sc[b.id]) * b.w - (100 - sc[a.id]) * a.w)[0];
  const a = analyseArgument(entry.text, claim);
  const comment = `${best.good} En canvi, ${lever.weak.charAt(0).toLowerCase() + lever.weak.slice(1)}`
    + (a.hits.flaw ? " Has detectat la fal·làcia de la moció." : " No has arribat a nomenar la fal·làcia que amaga la moció.");
  return { lever, comment };
}

function renderBallot(claim, entry, practice) {
  const view = document.getElementById("view");
  const b = ballotFor(entry, claim);
  const t = total20(entry.crit);
  const prev = S.arenaScores.length > 1 ? Math.round(S.arenaScores.slice(0, -1).reduce((x, y) => x + y, 0) / (S.arenaScores.length - 1) / 5) : null;
  view.innerHTML = "";
  const peerRows = entry.peer ? ARENA_CRITERIA.map(c => {
    const auto = to4(entry.crit[c.id]), p = entry.peer.vals[c.id];
    return `<tr><td>${c.name}</td><td>${p}</td><td>${auto}</td><td>${Math.abs(p - auto) >= 2 ? "Cal comentar-ho" : "Coincidix"}</td></tr>`;
  }).join("") : "";
  const box = el(`<section class="page arena-result">
    <header class="page-head"><h1>Papereta del jurat</h1><p>${practice ? "Moció de pràctica" : "Moció del dia · " + esc(prettyDate(today()))}</p></header>
    <div class="doc ballot">
      <div class="ballot-head">
        <div><p class="doc-label">Moció</p><p class="motion-text small">${esc(claim.text)}</p>
          <p class="muted">Posició: <b>${esc(entry.vote || "—")}</b>${S.nick ? " · Debatent: " + esc(S.nick) : ""}</p></div>
        <div class="ballot-total"><span class="doc-label">Total</span><b>${t}<small>/20</small></b><span class="decision">${esc(decision(t))}</span></div>
      </div>
      <table class="table ballot-table"><thead><tr><th>Criteri</th><th>Punts</th><th>Nivell</th></tr></thead>
        <tbody>${ARENA_CRITERIA.map(c => { const v = to4(entry.crit[c.id]); return `<tr><td>${c.name}</td><td><span class="dots" aria-label="${v} de 4">${"●".repeat(v)}${"○".repeat(4 - v)}</span> ${v}/4</td><td>${LEVELS[v]}</td></tr>`; }).join("")}</tbody></table>
      <div class="ballot-section"><p class="doc-label">Comentari del jurat</p><p>${esc(b.comment)}</p></div>
      <div class="ballot-section question"><p class="doc-label">Pregunta del jurat</p><p>${esc(b.lever.q)}</p></div>
      <p class="muted small">${prev != null ? `La teua mitjana anterior: ${prev}/20.` : "És la teua primera moció."} ${entry.xp ? `+${entry.xp} pts${entry.improved ? " (inclou la rèplica)" : ""}.` : ""}</p>
    </div>
    <details class="doc"><summary>Fal·làcia de la moció</summary><p><b>${esc(claim.flaw)}.</b> ${esc(claim.explain)}</p></details>
    ${entry.peer ? `<div class="doc"><p class="doc-label">Jurat d'aula vs. papereta automàtica (0–4)</p>
      <table class="table"><thead><tr><th>Criteri</th><th>Jurat d'aula</th><th>Automàtica</th><th></th></tr></thead><tbody>${peerRows}</tbody></table>
      ${entry.peer.comment ? `<p><b>Comentari:</b> ${esc(entry.peer.comment)}</p>` : ""}
      <p class="muted">Allà on hi haja diferències de 2 punts o més, discutiu qui ho ha valorat millor.</p></div>` : ""}
    <details class="doc"><summary>La teua intervenció</summary><p class="peer-text">${esc(entry.text)}</p></details>
    <div class="row wrap">
      ${!entry.improved ? `<button class="primary" id="arImprove">Presenta una rèplica</button>` : ""}
      <button class="secondary" id="arHow">Criteris de correcció</button>
      <button class="secondary" id="arPrompt">Copia el prompt per a una IA</button>
      <button class="secondary" id="arPractice">Una altra moció de pràctica</button>
    </div>
  </section>`);
  view.appendChild(box);
  box.querySelector("#arHow").onclick = () => document.getElementById("howDialog").showModal();
  box.querySelector("#arPrompt").onclick = () => copyText(aiPrompt(claim, entry.text), "Prompt copiat. Enganxa'l en l'assistent d'IA que useu al centre.");
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
    <header class="page-head"><h1>Rèplica</h1><p>Tens una oportunitat de reescriure la intervenció. Respon la pregunta del jurat.</p></header>
    <div class="doc ballot-section question"><p class="doc-label">Pregunta del jurat · ${esc(b.lever.name)}</p><p>${esc(b.lever.q)}</p></div>
    <div class="doc"><label for="imText">Intervenció revisada</label>
      <textarea id="imText" rows="10">${esc(entry.text)}</textarea>
      <div class="coach-row"><span class="margin-note" id="imCoach">${esc(liveCoach(entry.text, claim))}</span></div>
      <div class="row"><button class="primary" id="imSend">Lliura la rèplica</button><button class="secondary" id="imCancel">Torna a la papereta</button></div></div>
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
      toast(`La rèplica puja de ${total20(entry.crit)} a ${total20(res.sc)}/20. +15 pts`);
    } else toast("La rèplica no millora la puntuació. Es manté la papereta anterior.");
    S.arenaScores[S.arenaScores.length - 1] = upd.score;
    if (!practice) S.arena[today()] = upd;
    save();
    renderBallot(claim, upd, practice);
  };
}

function aiPrompt(claim, text) {
  return `Actua com a jurat de debat escolar per a alumnat d'ESO. Respon en valencià normatiu (AVL).

AFIRMACIÓ A DEBATRE: "${claim.text}"

RESPOSTA DE L'ALUMNE/A: "${text}"

Avalua la resposta de 0 a 4 en cada criteri (0 absent, 4 excel·lent) i justifica-ho breument:
1. Argumentació (raons lligades amb connectors, conclusió que se'n deduïx)
2. Evidència (exemples, dades i fonts pertinents)
3. Refutació (identifica la trampa o fal·làcia de l'afirmació)
4. Claredat i estructura (postura explícita, frases clares, conclusió)
5. Pertinència (respon exactament el que diu l'afirmació)

Després, escriu un comentari breu de jurat i formula una sola pregunta que ajude l'alumne/a a millorar la intervenció. No reescrigues la resposta per l'alumne/a: guia'l perquè la millore ell o ella.`;
}

function copyText(text, msg) {
  const done = () => toast(msg);
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}
function fallbackCopy(text, done) {
  const ta = el(`<textarea style="position:fixed;opacity:0"></textarea>`);
  ta.value = text; document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); done(); } catch (e) { prompt("Copia el text:", text); }
  ta.remove();
}
