// Entrenador de Debat – Oratòria (rúbrica integrada)
transcriptP.textContent=''; manualInput.value=''; rubricComment.value=''; renderRubric([0,0,0,0,0,0]);


if(state.currentRound < state.rounds){ state.currentRound++; newIdea(); updateHeader(); startTurnBtn.disabled = false; nextBtn.disabled = true; stopTurnBtn.disabled = true; setInstruction('Prepara el següent torn i prem “Inicia torn”.'); }
else { startTurnBtn.disabled = true; nextBtn.disabled = true; stopTurnBtn.disabled = true; setInstruction('Debat finalitzat. Exporta l\'historial si vols guardar-lo.'); }
save(); updateHeader();
}


function renderHistory(){
historyList.innerHTML = '';
state.history.forEach(item=>{
const li = document.createElement('li');
const rubricStr = `Rúbrica: ${item.rubric.items.join('-')} (=${item.rubric.subtotal}/12)`;
li.innerHTML = `<strong>Ronda ${item.round}</strong> · <em>${item.idea}</em><br>${escapeHtml(item.transcript||'(sense transcripció)')}<br><small>${rubricStr}${item.rubric.comment? ' · Comentari: '+escapeHtml(item.rubric.comment): ''}</small>`;
historyList.appendChild(li);
});
}


function escapeHtml(str){ return str.replace(/[&<>\"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }


// ====== Feedback ràpid ======
function addScore(v){ state.score += v; if(state.score<0) state.score=0; updateHeader(); save(); }


// ====== Export ======
function exportTxt(){
const lines = [];
const roundsDone = state.history.length;
const finalGrade = computeFinalGrade();
lines.push(`Entrenador de Debat – Oratòria (+Rúbrica)`);
lines.push(`Tema: ${state.topic}`);
lines.push(`Rol: ${state.role}`);
lines.push(`Rondes: ${state.rounds}`);
lines.push(`Puntuació ràpida: ${state.score}`);
lines.push(`Suma rúbrica: ${state.rubricTotals} / ${roundsDone*12}`);
lines.push(`Nota final (0-10): ${finalGrade!=null? finalGrade.toFixed(1): '—'}`);
lines.push('');
state.history.forEach(h=>{
lines.push(`— Ronda ${h.round} — Idea: ${h.idea}`);
lines.push(`Rúbrica (0-2): ${h.rubric.items.join('-')} = ${h.rubric.subtotal}/12`);
if(h.rubric.comment) lines.push(`Comentari: ${h.rubric.comment}`);
lines.push(h.transcript || '(sense transcripció)');
lines.push('');
});
const blob = new Blob([lines.join('\n')], {type:'text/plain'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a'); a.href = url; a.download = 'debat_oratoria_rubrica.txt'; a.click(); URL.revokeObjectURL(url);
}


// ====== Esdeveniments ======
form.addEventListener('submit', (e)=>{ e.preventDefault(); beginDebate(); });
resetBtn.addEventListener('click', ()=>{ localStorage.removeItem('orat_db_state_rub'); location.reload(); });
startTurnBtn.addEventListener('click', startTurn);
stopTurnBtn.addEventListener('click', stopTurn);
nextBtn.addEventListener('click', nextRound);
micBtn.addEventListener('click', toggleMic);


goodBtn.addEventListener('click', ()=>{ addScore(1); feedbackBox.textContent = '✅ Bon ús de l\'estructura o exemple rellevant.'; });
badBtn.addEventListener('click', ()=>{ addScore(-1); feedbackBox.textContent = '⚠️ Millora: fes la tesi més clara o aporta una evidència.'; });


exportBtn.addEventListener('click', exportTxt);


themeToggle.addEventListener('click', ()=>{ const isLight = !document.documentElement.classList.contains('light'); setTheme(isLight); });
helpBtn.addEventListener('click', ()=> helpDialog.showModal());
closeHelp.addEventListener('click', ()=> helpDialog.close());


clearData.addEventListener('click', (e)=>{ e.preventDefault(); if(confirm('Vols netejar dades locals (estat i tema)?')){ localStorage.removeItem('orat_db_state_rub'); localStorage.removeItem('orat_theme'); alert('Dades netejades.'); } });


presetClarity.addEventListener('click', ()=> appendPreset('La tesi s\'entén des del principi i es manté al llarg de l\'exposició. '));
presetEvidence.addEventListener('click', ()=> appendPreset('Aporta com a mínim una dada o font; cal citar-la millor. '));
presetRefute.addEventListener('click', ()=> appendPreset('Bona anticipació d\'objeccions; reforça la resposta amb una evidència. '));
function appendPreset(t){ rubricComment.value += t; rubricComment.focus(); }


// ====== Inici ======
(function init(){
const savedTheme = localStorage.getItem('orat_theme'); setTheme(savedTheme === 'light');
const saved = load(); if(saved){ state = {...state, ...saved}; }
drawCriteria(); newIdea(); renderRubric([0,0,0,0,0,0]); updateHeader(); renderHistory();
if(state.topic){ setInstruction(`Tema: ${state.topic} · Rol: ${state.role==='pro'?'A favor':'En contra'}`); topicInput.value = state.topic; roleSelect.value = state.role; timePerTurn.value = state.timePerTurn; roundsInput.value = state.rounds; }
})();
