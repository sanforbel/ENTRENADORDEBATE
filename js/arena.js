/* Arena: repte del dia amb text lliure, coaching en viu, avaluació per rúbrica i coavaluació. */

const ARENA_CRITERIA = [
  { id: "logica", name: "Lògica", w: 0.25, good: "Lligues les idees amb connectors de causa i conseqüència.", weak: "Falta explicar per què: les idees apareixen soltes, sense connectors que les lliguen.", tip: "Afig almenys una raó amb «perquè», «ja que» o «per tant»." },
  { id: "evidencia", name: "Evidència", w: 0.2, good: "Recolzes el que dius amb exemples o dades.", weak: "Tot es basa en opinió: no hi ha cap exemple, dada ni font.", tip: "Aporta un exemple concret o una dada amb la seua font («segons…»)." },
  { id: "refutacio", name: "Refutació", w: 0.2, good: "Assenyales on falla el raonament de l'altra persona.", weak: "Dius si estàs d'acord o no, però no assenyales on falla el seu raonament.", tip: "Identifica la trampa: «això no demostra que…», «confon… amb…»." },
  { id: "claredat", name: "Claredat", w: 0.15, good: "La postura és clara i el text s'entén bé.", weak: "Costa vore quina és la teua postura o les frases són massa llargues o massa curtes.", tip: "Comença amb una frase de postura («No em convenç perquè…») i acaba amb una conclusió." },
  { id: "rellevancia", name: "Rellevància", w: 0.2, good: "Et centres en el que diu l'afirmació.", weak: "Part del que dius s'allunya de l'afirmació concreta.", tip: "Torna a llegir l'afirmació i respon exactament el que diu, citant-ne alguna paraula." }
];

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

function scoreLabel(g) {
  if (g >= 80) return "Brillant";
  if (g >= 60) return "Sòlid";
  if (g >= 40) return "Encaminat";
  return "En construcció";
}

function liveCoach(text, claim) {
  const a = analyseArgument(text, claim);
  if (a.words < 5) return "✍️ Comença dient clarament si et convenç o no.";
  if (!a.hits.stance) return "🧭 Deixa clara la postura en la primera frase («No em convenç perquè…»).";
  if (!a.hits.logic) return "🔗 Explica per què: prova amb «perquè», «ja que» o «per tant».";
  if (!a.hits.evidence && !a.hits.number) return "📊 I un exemple o una dada?";
  if (!a.hits.refute && !a.hits.flaw) return "🛡️ Assenyala on falla: «això no demostra que…».";
  if (!a.hits.conclusion) return "🏁 Tanca amb una conclusió: «per tant…».";
  return "✅ Té bona pinta! Revisa-ho i envia-ho.";
}

function renderArena(practiceId) {
  const view = document.getElementById("view");
  const k = today();
  const done = S.arena[k];
  const practice = !!practiceId;
  const claim = practice ? CLAIMS.find(c => c.id === practiceId) : arenaClaimFor(k);

  if (done && !practice) return renderArenaResult(claim, done, false);

  view.innerHTML = "";
  const box = el(`<section class="page arena">
    <header class="page-head"><h1>⚔️ Arena</h1><p>${practice ? "Repte de pràctica" : "Repte del dia · " + esc(prettyDate(k))}</p></header>
    <article class="claim-card">
      <p class="kicker">Proposat per ${esc(claim.author)} <small>(personatge fictici)</small></p>
      <blockquote>${esc(claim.text)}</blockquote>
      <div class="vote" role="group" aria-label="Et convenç?">
        <span>Et convenç?</span>
        <button data-v="Sí">Sí</button><button data-v="No">No</button><button data-v="Depén">Depén</button>
      </div>
    </article>
    <div class="card write-card" hidden>
      <label for="arText"><b>Defén-la o rebat-la</b> <small>(entre 40 i 200 paraules és l'ideal)</small></label>
      <textarea id="arText" rows="8" placeholder="Ex.: No em convenç perquè…"></textarea>
      <div class="coach-row"><span class="coach" id="arCoach" aria-live="polite">✍️ Comença dient clarament si et convenç o no.</span><span class="wc" id="arWc">0 paraules</span></div>
      <label class="check"><input type="checkbox" id="arPeer"> Mode coavaluació: una companya o un company ho valora abans de vore la correcció automàtica</label>
      <div class="row"><button class="primary big" id="arSend" disabled>Envia</button></div>
    </div>
  </section>`);
  view.appendChild(box);
  let vote = null;
  box.querySelectorAll(".vote button").forEach(b => b.onclick = () => {
    vote = b.dataset.v;
    box.querySelectorAll(".vote button").forEach(x => x.classList.toggle("sel", x === b));
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
    const peerMode = box.querySelector("#arPeer").checked;
    loading(view, () => {
      const res = analyseArgument(text, claim);
      const entry = { claim: claim.id, vote, text, score: res.global, crit: res.sc, improved: false, peer: null, practice };
      if (peerMode) renderPeer(claim, entry, practice);
      else commitArena(claim, entry, practice);
    });
  };
}

function loading(view, cb) {
  view.innerHTML = "";
  view.appendChild(el(`<section class="page loading-screen"><div class="mascot-big spin">${MASCOT.emoji}</div><p>Buscant trampes en el raonament…</p></section>`));
  setTimeout(cb, 1300);
}

function commitArena(claim, entry, practice) {
  const base = practice ? 5 : 20;
  const bonus = Math.round(entry.score / 10);
  entry.xp = base + bonus;
  const prevScores = S.arenaScores.slice();
  entry.better = prevScores.length ? Math.round(100 * prevScores.filter(s => s < entry.score).length / prevScores.length) : null;
  S.arenaScores.push(entry.score);
  if (!practice) S.arena[today()] = entry;
  markActive("arena");
  const r = addXP(entry.xp);
  if (r.rankUp) { confetti(); toast("Has pujat de rang! Ara eres " + rankInfo().rank.name + "."); }
  save();
  renderArenaResult(claim, entry, practice);
}

function renderPeer(claim, entry, practice) {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const levels = ["1 · Inicial", "2 · En procés", "3 · Assolit", "4 · Excel·lent"];
  const box = el(`<section class="page">
    <header class="page-head"><h1>🤝 Coavaluació</h1><p>Passa el dispositiu a la persona que avaluarà. Valora cada criteri abans de vore la correcció automàtica.</p></header>
    <div class="card"><p class="kicker">Afirmació</p><p>${esc(claim.text)}</p><p class="kicker">Resposta</p><p class="peer-text">${esc(entry.text)}</p></div>
    <div class="card peer-grid">${ARENA_CRITERIA.map(c => `<div class="peer-row"><b>${c.name}</b><div class="seg" data-c="${c.id}">${levels.map((l, i) => `<button data-v="${i + 1}" title="${l}">${i + 1}</button>`).join("")}</div></div>`).join("")}
      <label>Comentari (un punt fort i un a millorar)<textarea id="peerCom" rows="3"></textarea></label>
      <div class="row"><button class="primary big" id="peerGo" disabled>Mostra la comparació</button></div></div>
  </section>`);
  view.appendChild(box);
  const vals = {};
  box.querySelectorAll(".seg").forEach(seg => seg.querySelectorAll("button").forEach(b => b.onclick = () => {
    vals[seg.dataset.c] = +b.dataset.v;
    seg.querySelectorAll("button").forEach(x => x.classList.toggle("sel", x === b));
    box.querySelector("#peerGo").disabled = Object.keys(vals).length < ARENA_CRITERIA.length;
  }));
  box.querySelector("#peerGo").onclick = () => {
    entry.peer = { vals, comment: box.querySelector("#peerCom").value.trim() };
    commitArena(claim, entry, practice);
  };
}

function feedbackFor(entry, claim) {
  const sc = entry.crit;
  const sorted = ARENA_CRITERIA.slice().sort((a, b) => sc[b.id] - sc[a.id]);
  const strong = sorted[0];
  // El que més puja la nota: el criteri amb més marge ponderat.
  const lever = ARENA_CRITERIA.slice().sort((a, b) => (100 - sc[b.id]) * b.w - (100 - sc[a.id]) * a.w)[0];
  const good = ARENA_CRITERIA.filter(c => sc[c.id] >= 60).map(c => c.good);
  if (!good.length) good.push("T'has atrevit a posicionar-te: és el primer pas.");
  const a = analyseArgument(entry.text, claim);
  const persuade = a.hits.evidence || a.hits.number ? "Convences sobretot amb exemples i dades."
    : a.hits.refute ? "Convences sobretot assenyalant febleses de l'afirmació."
    : a.hits.logic ? "Convences sobretot amb raonaments encadenats."
    : "Ara mateix convences sobretot amb la teua opinió personal.";
  const steps = [lever.tip];
  const second = ARENA_CRITERIA.filter(c => c !== lever).sort((x, y) => sc[x.id] - sc[y.id])[0];
  if (sc[second.id] < 70) steps.push(second.tip);
  if (!a.hits.flaw) steps.push("Pista: pregunta't quina trampa amaga el raonament de " + claim.author.split(",")[0] + ".");
  const summary = entry.score >= 80 ? "Resposta molt completa: postura clara, raons i proves."
    : entry.score >= 60 ? `Bona base. El teu punt fort és la ${strong.name.toLowerCase()}; si treballes la ${lever.name.toLowerCase()}, la nota pujarà de valent.`
    : entry.score >= 40 ? `Vas pel bon camí. Ara cal reforçar sobretot la ${lever.name.toLowerCase()}.`
    : "Encara és un esbós: desenvolupa més la resposta amb raons i algun exemple.";
  return { strong, lever, good, persuade, blind: lever.weak, steps, summary };
}

function renderArenaResult(claim, entry, practice) {
  const view = document.getElementById("view");
  const fb = feedbackFor(entry, claim);
  view.innerHTML = "";
  const peerRows = entry.peer ? ARENA_CRITERIA.map(c => {
    const auto = Math.max(1, Math.min(4, Math.ceil(entry.crit[c.id] / 25)));
    const p = entry.peer.vals[c.id];
    return `<tr><td>${c.name}</td><td>${p}</td><td>${auto}</td><td>${Math.abs(p - auto) >= 2 ? "⚠️ Comenteu-ho" : "👍"}</td></tr>`;
  }).join("") : "";
  const box = el(`<section class="page arena-result">
    <header class="page-head"><h1>⚔️ ${practice ? "Repte de pràctica" : "Repte del dia"}</h1><p>${esc(claim.text)}</p></header>
    <div class="score-hero">
      <div class="score-num"><b>${entry.score}</b><span>${esc(scoreLabel(entry.score).toUpperCase())}</span></div>
      <div><p>${esc(fb.summary)}</p>
        ${entry.better != null ? `<p class="muted">Millor que el ${entry.better} % de les teues respostes anteriors.</p>` : `<p class="muted">És la teua primera resposta a l'Arena.</p>`}
        ${entry.xp ? `<p class="muted">+${entry.xp} XP${entry.improved ? " (inclou la bonificació per millorar-la)" : ""}</p>` : ""}</div>
    </div>
    <div class="card crit-list">${ARENA_CRITERIA.map(c => `
      <div class="crit"><div class="crit-head"><b>${c.name}</b>
        ${c === fb.strong ? `<span class="tag good">EL TEU FORT</span>` : ""}${c === fb.lever ? `<span class="tag lever">EL QUE MÉS LA PUJA</span>` : ""}
        <span class="crit-val">${entry.crit[c.id]}</span></div>
        <div class="bar-track"><span style="width:${entry.crit[c.id]}%;background:${barColor(entry.crit[c.id])}"></span></div></div>`).join("")}
    </div>
    <div class="fb-grid">
      <div class="card fb ok"><h3>✅ El que has fet bé</h3><ul>${fb.good.map(g => `<li>${esc(g)}</li>`).join("")}</ul></div>
      <div class="card fb warn"><h3>⚠️ Compte amb açò</h3><p><b>Com convences:</b> ${esc(fb.persuade)}</p><p><b>El teu punt cec:</b> ${esc(fb.blind)}</p></div>
      <div class="card fb up"><h3>🚀 Com pujar-la</h3><ol>${fb.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
    </div>
    <details class="card trap"><summary>🪤 Quina era la trampa amagada?</summary><p><b>${esc(claim.flaw)}.</b> ${esc(claim.explain)}</p></details>
    ${entry.peer ? `<div class="card"><h3>🤝 Coavaluació vs. correcció automàtica (escala 1–4)</h3>
      <table class="table"><thead><tr><th>Criteri</th><th>Company/a</th><th>Automàtica</th><th></th></tr></thead><tbody>${peerRows}</tbody></table>
      ${entry.peer.comment ? `<p><b>Comentari:</b> ${esc(entry.peer.comment)}</p>` : ""}
      <p class="muted">On hi ha diferències grans, discutiu-les: qui té més raó, la persona o la màquina?</p></div>` : ""}
    <details class="card"><summary>La teua resposta</summary><p class="peer-text">${esc(entry.text)}</p></details>
    <div class="row wrap">
      ${!entry.improved ? `<button class="primary" id="arImprove">🦇 Millora-la amb ${MASCOT.name}</button>` : ""}
      <button class="secondary" id="arHow">Com t'avalue?</button>
      <button class="secondary" id="arPrompt">Copia el prompt per a una IA</button>
      <button class="secondary" id="arPractice">Practica amb un altre repte</button>
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
  if (imp) imp.onclick = () => renderImprove(claim, entry, practice, fb);
}

function barColor(v) { return v >= 70 ? "var(--ok)" : v >= 45 ? "var(--warn)" : "var(--ko)"; }

function renderImprove(claim, entry, practice, fb) {
  const view = document.getElementById("view");
  view.innerHTML = "";
  const greet = S.nick ? `${esc(S.nick)}, ` : "";
  const box = el(`<section class="page">
    <div class="mascot-talk"><span class="mascot-big">${MASCOT.emoji}</span>
      <div class="bubble big"><p>${greet}fixem-nos en una sola cosa: <b>${esc(fb.lever.name.toLowerCase())}</b>.</p><p>${esc(fb.lever.weak)}</p><p><b>Prova açò:</b> ${esc(fb.lever.tip)}</p></div></div>
    <div class="card"><label for="imText"><b>Reescriu la resposta</b></label>
      <textarea id="imText" rows="9">${esc(entry.text)}</textarea>
      <div class="coach-row"><span class="coach" id="imCoach">${esc(liveCoach(entry.text, claim))}</span></div>
      <div class="row"><button class="primary big" id="imSend">Torna a avaluar</button><button class="secondary" id="imCancel">Deixa-ho estar</button></div></div>
  </section>`);
  view.appendChild(box);
  const ta = box.querySelector("#imText");
  ta.oninput = () => box.querySelector("#imCoach").textContent = liveCoach(ta.value, claim);
  box.querySelector("#imCancel").onclick = () => renderArenaResult(claim, entry, practice);
  box.querySelector("#imSend").onclick = () => loading(view, () => {
    const res = analyseArgument(ta.value, claim);
    const gain = res.global - entry.score;
    const upd = Object.assign({}, entry, { text: ta.value.trim(), score: Math.max(res.global, entry.score), crit: res.global >= entry.score ? res.sc : entry.crit, improved: true });
    if (gain > 0) { addXP(15); upd.xp = (entry.xp || 0) + 15; toast(`Has pujat ${gain} punts! +15 XP`); }
    else toast("Esta vegada no ha pujat. Mira els consells i torna-ho a provar demà.");
    S.arenaScores[S.arenaScores.length - 1] = upd.score;
    if (!practice) S.arena[today()] = upd;
    save();
    renderArenaResult(claim, upd, practice);
  });
}

function aiPrompt(claim, text) {
  return `Actua com a jurat de debat escolar per a alumnat d'ESO. Respon en valencià normatiu (AVL).

AFIRMACIÓ A DEBATRE: "${claim.text}"

RESPOSTA DE L'ALUMNE/A: "${text}"

Avalua la resposta de 0 a 100 en cada criteri i justifica-ho breument:
1. Lògica (raons lligades amb connectors, conclusió que se'n deduïx)
2. Evidència (exemples, dades i fonts pertinents)
3. Refutació (identifica la trampa o fal·làcia de l'afirmació)
4. Claredat (postura explícita, frases clares, conclusió)
5. Rellevància (respon exactament el que diu l'afirmació)

Després, indica: el punt fort, el criteri que més faria pujar la nota, què ha fet bé, el seu punt cec i tres passos concrets per a millorar-la. No reescrigues la resposta per l'alumne/a: guia'l perquè la millore ell o ella.`;
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
