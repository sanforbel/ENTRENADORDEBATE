/* Llengües de la interfície: valencià (base), castellà, anglés i francés. */

const LANGS = [
  { id: "va", label: "Valencià", html: "ca-ES-valencia", speech: "ca-ES" },
  { id: "es", label: "Castellano", html: "es", speech: "es-ES" },
  { id: "en", label: "English", html: "en", speech: "en-GB" },
  { id: "fr", label: "Français", html: "fr", speech: "fr-FR" }
];

const DATES = {
  va: { short: ["dl.", "dt.", "dc.", "dj.", "dv.", "ds.", "dg."], long: ["dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte", "diumenge"],
        months: ["de gener", "de febrer", "de març", "d'abril", "de maig", "de juny", "de juliol", "d'agost", "de setembre", "d'octubre", "de novembre", "de desembre"],
        fmt: (w, d, m) => `${w} ${d} ${m}` },
  es: { short: ["lu.", "ma.", "mi.", "ju.", "vi.", "sá.", "do."], long: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
        months: ["de enero", "de febrero", "de marzo", "de abril", "de mayo", "de junio", "de julio", "de agosto", "de septiembre", "de octubre", "de noviembre", "de diciembre"],
        fmt: (w, d, m) => `${w} ${d} ${m}` },
  en: { short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], long: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        fmt: (w, d, m) => `${w} ${d} ${m}` },
  fr: { short: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."], long: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
        months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        fmt: (w, d, m) => `${w} ${d} ${m}` }
};

const UI = {};

UI.va = {
  colon: ": ",
  brand: "Entrenador<br>de Debat", app_name: "Entrenador de Debat", skip: "Salta al contingut",
  nav_home: "Inici", nav_cal: "Calendari", nav_motion: "Moció", nav_sala: "Sala", nav_teacher: "Docent", nav_profile: "Perfil", nav_info: "Com funciona",
  side_att: "Assistència", side_att_t: "Dies seguits d'entrenament", side_pts: "Punts", side_pts_t: "Punts de temporada", lang: "Llengua",
  credit_short: "Creat per Sandra Fortanet amb Claude",
  d: "d", pts: "pts", pt_1: "1 punt", pt_n: "{n} pts",
  task_new: "Tasca nova de classe: {t}", locked_prev: "Primer cal disputar la jornada anterior d'este bloc.",
  copied_phrase: "Frase copiada.", copied_link: "Enllaç copiat.", copied_prompt: "Prompt copiat. Enganxa'l en l'assistent d'IA que useu al centre.", copy_fallback: "Copia el text:",
  // Inici
  home_label: "Full de temporada · {d}", home_welcome: "Benvinguda, benvingut", home_sub: "{a} de {b} jornades disputades · {p} pts",
  agenda: "Ordre del dia", agenda_lesson: "Disputar una jornada", agenda_motion: "Respondre la moció del dia",
  agenda_review_1: "Revisar 1 exercici pendent", agenda_review_n: "Revisar {n} exercicis pendents",
  week_att: "Assistència d'esta setmana", streak_1: "1 dia seguit d'entrenament.", streak_n: "{n} dies seguits d'entrenament.",
  credential: "Credencial", to_next: "{p} per a {r}", max_level: "Nivell màxim",
  class_task: "Tasca de classe", jornada_n: "Jornada {n}. {t}", task_done: "Disputada. Es pot repetir quan vulgues.", task_today: "Programada per a hui.", task_pending: "Pendent.",
  next_j: "Pròxima jornada · {u}", start_arrow: "Comença la sessió →", season: "Temporada", all_done: "Totes les jornades disputades.", all_done_sub: "Pots repetir-les o practicar a la Sala.",
  motion_today: "Moció del dia", motion_delivered: "Resposta lliurada · {s}/20", motion_pending: "Pendent de resposta",
  board: "Frase per a la pissarra", copy_it: "Copia-la",
  // Calendari
  cal_title: "Calendari de la temporada", cal_sub: "{a} de {b} jornades disputades. Dins de cada bloc, les jornades es disputen en ordre.",
  bloc: "Bloc {n}", th_jornada: "Jornada", th_session: "Sessió", th_state: "Estat",
  st_played: "Disputada · {a}/{b}", st_next: "Pròxima", st_open: "Oberta", st_locked: "Pendent de l'anterior",
  flag_task: "Tasca", btn_repeat: "Repeteix", btn_start: "Comença", cal_foot: "Les jornades noves s'afigen editant <code>js/content.js</code>.",
  // Docent
  tch_title: "Panell docent", tch_sub: "L'app no té servidor ni comptes: les tasques viatgen en un enllaç i el progrés, en fitxers que l'alumnat us lliura.",
  tch_task: "Tasca de classe", tch_task_help: "Si no assigneu cap tasca, cada alumne segueix el calendari en ordre. La jornada assignada queda oberta encara que no hagen fet les anteriors.",
  tch_group: "Grup", tch_group_ph: "Ex.: 3r ESO B", tch_jornada: "Jornada", tch_days: "Dies de sessió",
  tch_link: "Genera l'enllaç per a l'alumnat", tch_here: "Aplica-la en este dispositiu", tch_clear: "Lleva la tasca d'este dispositiu",
  tch_link_label: "Enllaç de la tasca", tch_copy: "Copia", tch_link_help: "Compartiu-lo per Aules, Classroom o un codi QR. En obrir-lo, la tasca apareixerà a l'Inici de cada alumne.",
  tch_applied: "Tasca aplicada en este dispositiu.",
  tch_progress: "Progrés de l'alumnat", tch_progress_help: "Cada alumne descarrega el seu fitxer des de <b>Perfil → Exporta el meu progrés</b> (amb pseudònim o número de llista) i el puja a Aules o al Classroom. Ací podeu importar-los tots de colp.",
  tch_import: "Importa fitxers .json", tch_none: "No s'ha trobat cap fitxer vàlid.",
  col_student: "Alumne/a", col_points: "Punts", col_cred: "Credencial", col_jorn: "Jornades", col_motions: "Mocions", col_avg: "Mitjana mocions", col_streak: "Dies seguits", col_debates: "Debats", col_task: "Tasca: {t}", col_exported: "Exportat", yes: "Sí",
  tch_csv: "Descarrega CSV", tch_ideas: "Propostes per a l'aula",
  tch_tips: [
    "<b>Jurat d'aula</b>: a la Moció del dia, activeu l'opció perquè un equip puntue la intervenció d'un altre amb la mateixa papereta abans de vore la puntuació automàtica. Després, comenteu les discrepàncies.",
    "<b>Sala de debat</b>: projecteu el cronòmetre i aneu omplint la rúbrica mentre parla cada orador. Exporteu el resultat al final.",
    "<b>Debat improvisat</b>: el mode «Improvisat» trau tema i postura a l'atzar i dona temps de preparació (15 minuts per defecte).",
    "<b>Correcció amb IA</b>: «Copia el prompt per a una IA» prepara la papereta perquè la pugueu usar amb l'assistent que tinga autoritzat el centre."
  ],
  // Perfil
  prof_title: "Perfil", season_badge: "Entrenador de Debat · Temporada {y}", no_nick: "Sense pseudònim",
  nick_label: "Pseudònim o número de llista", nick_ph: "Ex.: 3B-07", nick_help: "Per a protegir la teua privacitat, no uses el nom i els cognoms complets.",
  stats: "Estadístiques", st_jorn: "Jornades disputades", st_mot: "Mocions respostes", st_avg: "Mitjana de les mocions", st_streak: "Dies seguits d'entrenament", st_deb: "Debats a la Sala", st_rev: "Exercicis pendents de revisió",
  creds: "Credencials", prefs: "Preferències", pref_voice: "Lectura en veu alta a les jornades (botó 🔊)", pref_theme: "Aparença", th_auto: "Automàtica", th_light: "Clara", th_dark: "Fosca", pref_lang: "Llengua de l'aplicació",
  export_btn: "Exporta el meu progrés (.json)", reset_btn: "Esborra totes les dades", need_nick: "Primer escriu un pseudònim o número de llista.",
  reset_confirm: "Segur que vols esborrar tot el progrés d'este dispositiu? No es pot desfer.", reset_done: "Dades esborrades.",
  how_title: "Criteris de correcció", close: "Tanca",
  how_body: `<p>La papereta de la Moció del dia la genera un <b>corrector automàtic orientatiu</b> que funciona dins del navegador, sense enviar el text enlloc. No és una IA: busca indicis en el text i els convertix en punts de 0 a 4 per criteri.</p>
    <table class="table"><tbody>
      <tr><td><b>Argumentació</b></td><td>Connectors de causa i conseqüència («perquè», «per tant»…).</td></tr>
      <tr><td><b>Evidències</b></td><td>Exemples, dades, xifres i fonts («segons…»).</td></tr>
      <tr><td><b>Refutació</b></td><td>Marques de contraargumentació i si s'identifica la fal·làcia concreta de la moció.</td></tr>
      <tr><td><b>Claredat i estructura</b></td><td>Posició explícita al principi, llargària de les frases i conclusió.</td></tr>
      <tr><td><b>Pertinència</b></td><td>Relació amb les paraules i la idea de la moció.</td></tr>
    </tbody></table>
    <p>Com que mira la forma i no entén del tot el sentit, <b>pot equivocar-se</b>. La puntuació és orientativa: contrasteu-la amb el jurat d'aula, amb el professorat o amb el prompt per a IA.</p>`,
  // Jornada
  tl_chat: "Transcripció", tl_choice: "Pregunta", tl_vs: "Cara a cara", tl_multi: "Selecció", tl_tap: "Subratllat", tl_cards: "Classificació", tl_build: "Esquema",
  review_title: "Sessió de revisió", review_unit: "Revisió", repeat_unit: "Repetició", no_review: "No tens cap exercici pendent de revisió.",
  ls_close: "✕ Tanca", ls_speak: "Llig en veu alta", ls_progress: "Progrés de la jornada", ls_close_confirm: "Vols tancar la sessió? No es guardarà el progrés d'esta jornada.",
  voice_on: "Lectura en veu alta activada (es pot desactivar al Perfil).", ex_count: "Exercici {a} de {b}", acta: "Acta",
  check: "Comprova", flag_review: "Revisió", v_ok: "Correcte", v_ko: "Revisa-ho", v_resolved: "Resolt",
  ko_help: "Pots demanar una pista o la resolució.", ko_reread: "Torna a llegir-ho amb calma.", hint: "Pista", solution: "Resolució", to_review: "Passa a la llista de revisió.",
  retry: "Torna-ho a intentar", justif: "Justificació", cont: "Continua", plus_pts: "+{n} pts",
  fitxa: "Fitxa de la jornada", f_bloc: "Bloc", f_plant: "Plantejament", f_cast: "Intervenen", f_ex: "Exercicis", start_session: "Comença la sessió",
  reglament: "Reglament de la jornada", art: "Art. {n}.", read_btn: "Llegit", conversa: "Conversa",
  multi_tip: "Pots marcar-ne més d'una.", tap_tip: "Toca el fragment per a subratllar-lo.", build_tip: "Peces disponibles (toca-les per a col·locar-les; toca una casella plena per a buidar-la):",
  empty: "(buit)", th_statement: "Afirmació", vs_a: "Intervenció A", vs_b: "Intervenció B",
  acta_j: "Acta de la jornada", acta_r: "Acta de la sessió de revisió", th_num: "Núm.", th_ex: "Exercici", th_res: "Resultat",
  r_first: "Correcte a la primera", r_retry: "Correcte en repetir", r_solved: "Resolt amb ajuda",
  acta_sum: "<b>{a} de {b}</b> correctes a la primera · <b>+{p} pts</b>", acta_rep: " · Repetició: {a}/{b} (+{p} pts)",
  conclusion: "Conclusió de la sessió", reference: "Referència: {s}", to_review_on: "Per a revisar el {d}", answer: "Resposta: {a}",
  attendance: "Assistència", total_pts: "Total: {p} pts", flag_new: "Nova",
  close_acta: "Tanca l'acta", repeat_1: "Repeteix ara la fallada", repeat_n: "Repeteix ara les {n} fallades", go_motion: "Vés a la moció del dia",
  // Moció
  crit: {
    logica: { name: "Argumentació", good: "Les raons estan ben encadenades i porten a la conclusió.", weak: "Les idees apareixen soltes: no queda clar per què se'n deduïx la teua posició.", q: "Per què hauria d'acceptar el jurat la teua conclusió? Quina raó la sosté?" },
    evidencia: { name: "Evidències", good: "Hi ha exemples o dades que donen suport al que dius.", weak: "Tot descansa en l'opinió: no hi ha cap exemple, dada ni font.", q: "Quina dada o quin exemple concret demostraria el que afirmes?" },
    refutacio: { name: "Refutació", good: "Identifiques on falla el raonament de la moció.", weak: "Prens posició, però no expliques on falla el raonament de la moció.", q: "En quin punt exacte s'equivoca el raonament de la moció?" },
    claredat: { name: "Claredat i estructura", good: "La posició és explícita i el text té un inici i un tancament clars.", weak: "Costa identificar la posició o el text no té una estructura clara.", q: "Si el jurat només llegira la primera i l'última frase, sabria què defens?" },
    rellevancia: { name: "Pertinència", good: "Respons exactament el que planteja la moció.", weak: "Part del text s'allunya del que planteja la moció.", q: "Estàs responent exactament el que afirma la moció, o un tema veí?" }
  },
  levels: ["Absent", "Inicial", "En procés", "Assolit", "Excel·lent"],
  dec: ["Insuficient", "Cal reforçar-la", "Intervenció sòlida", "Intervenció guanyadora"],
  coach: ["Nota al marge: comença declarant la teua posició.", "Nota al marge: el jurat ha de saber la teua posició des de la primera frase.", "Nota al marge: falta una raó explícita («perquè», «ja que», «per tant»).", "Nota al marge: no hi ha cap exemple ni dada.", "Nota al marge: assenyala on falla el raonament de la moció.", "Nota al marge: falta una frase de conclusió.", "Nota al marge: l'estructura és completa. Revisa-la i lliura-la."],
  mo_title: "Moció del dia", mo_practice: "Moció de pràctica", mo_by: "Moció presentada per {a}", fictional: "(personatge fictici)",
  position: "La teua posició", pos_for: "A favor", pos_against: "En contra", pos_nuanced: "Matisada",
  written: "Intervenció escrita", words_hint: "(entre 40 i 200 paraules)", ph_text: "Senyores i senyors del jurat: …", words_1: "1 paraula", words_n: "{n} paraules",
  peer_opt: "Jurat d'aula: una altra persona avalua la intervenció abans de vore la papereta automàtica", deliver: "Lliura la intervenció", rankup: "Nova credencial: {r}.",
  peer_title: "Jurat d'aula", peer_sub: "Passa el dispositiu a la persona que farà de jurat. Ha de puntuar cada criteri abans de vore la papereta automàtica.",
  motion: "Moció", intervention: "Intervenció ({v})", criterion: "Criteri", scale_tip: "0 Absent · 1 Inicial · 2 En procés · 3 Assolit · 4 Excel·lent",
  peer_comment: "Comentari del jurat d'aula", peer_comment_ph: "Un punt fort i un aspecte que cal millorar.", open_ballot: "Obri la papereta automàtica",
  but: "En canvi,", flaw_yes: "Has detectat la fal·làcia de la moció.", flaw_no: "No has arribat a nomenar la fal·làcia que amaga la moció.",
  ballot_title: "Papereta del jurat", position_lbl: "Posició", debater: "Debatent", total: "Total", points: "Punts", level: "Nivell",
  jury_comment: "Comentari del jurat", jury_question: "Pregunta del jurat", prev_avg: "La teua mitjana anterior: {n}/20.", first_motion: "És la teua primera moció.",
  xp_line: "+{n} pts.", xp_line_rep: "+{n} pts (inclou la rèplica).", fallacy: "Fal·làcia de la moció", peer_vs: "Jurat d'aula vs. papereta automàtica (0–4)",
  th_peer: "Jurat d'aula", th_auto_col: "Automàtica", diff: "Cal comentar-ho", same: "Coincidix", comment_lbl: "Comentari:",
  peer_disc: "Allà on hi haja diferències de 2 punts o més, discutiu qui ho ha valorat millor.", your_int: "La teua intervenció",
  reply: "Presenta una rèplica", criteria_btn: "Criteris de correcció", copy_prompt: "Copia el prompt per a una IA", other_motion: "Una altra moció de pràctica", dots_aria: "{v} de 4",
  reply_title: "Rèplica", reply_sub: "Tens una oportunitat de reescriure la intervenció. Respon la pregunta del jurat.", revised: "Intervenció revisada",
  deliver_reply: "Lliura la rèplica", back_ballot: "Torna a la papereta", reply_up: "La rèplica puja de {a} a {b}/20. +15 pts", reply_same: "La rèplica no millora la puntuació. Es manté la papereta anterior.",
  ai_prompt: `Actua com a jurat de debat escolar per a alumnat de secundària. Respon en valencià normatiu (AVL).

MOCIÓ: "{m}"

INTERVENCIÓ DE L'ALUMNE/A: "{x}"

Puntua la intervenció de 0 a 4 en cada criteri (0 absent, 4 excel·lent) i justifica-ho breument:
1. Argumentació (raons lligades amb connectors, conclusió que se'n deduïx)
2. Evidències (exemples, dades i fonts pertinents)
3. Refutació (identifica la trampa o fal·làcia de la moció)
4. Claredat i estructura (posició explícita, frases clares, conclusió)
5. Pertinència (respon exactament el que diu la moció)

Després, escriu un comentari breu de jurat i formula una sola pregunta que ajude l'alumne/a a millorar la intervenció. No reescrigues la intervenció per l'alumne/a: guia'l perquè la millore ell o ella.`,
  // Sala
  sala_title: "Sala de debat", sala_sub: "Practica torns reals amb cronòmetre, micròfon i rúbrica.", tab_t: "Format torneig", tab_l: "Lliure", tab_i: "Improvisat",
  topic: "Tema de debat", topic_ph: "Ex.: Cal prohibir els mòbils als centres educatius?", stance: "Postura", mic_lang: "Idioma del micròfon",
  ml_va: "Valencià / català", ml_es: "Castellà", ml_en: "Anglés", ml_fr: "Francés", start: "Comença", prev_debates: "Debats anteriors", clear_hist: "Esborra l'historial", no_topic: "Sense tema",
  turns_tip: "Valors orientatius: ajusta els noms i els minuts a les bases del teu torneig.", turn_name_aria: "Nom del torn {n}", minutes: "Minuts", min: "min", del_turn: "Elimina el torn",
  add_turn: "+ Afig un torn", restore: "Restaura els torns per defecte", rounds: "Rondes", secs: "Segons per torn",
  impro_tip: "El tema i la postura es trien a l'atzar. Després tens un temps de preparació i, en acabar, comença el debat amb els torns del format torneig.",
  prep_min: "Minuts de preparació", draw: "Sorteja un tema", clear_confirm: "Vols esborrar l'historial de debats?",
  need_topic: "Escriu un tema (o sorteja'n un en el mode Improvisat).", need_turn: "Afig almenys un torn.", turn_n: "Torn {n}",
  prep_title: "Preparació", plan: ["Definiu les paraules clau.", "Pluja d'idees a favor i en contra.", "Trieu 2 o 3 arguments amb una evidència cadascun.", "Prepareu l'obertura i la frase final."],
  team_notes: "Esquema de l'equip…", start_debate: "Comença el debat", cancel: "Cancel·la", prep_over: "S'ha acabat el temps de preparació!",
  mission: "Missió del torn:", play: "▶ Inicia", pause: "⏸ Pausa", resume: "▶ Continua", reset: "↺ Reinicia", mic: "Micròfon", mic_title: "Transcripció per veu",
  transcript_ph: "La transcripció apareixerà ací. També pots escriure o anotar idees baix.", notes_ph: "Notes o text del torn…",
  rubric: "Rúbrica (0–2)", comment: "Comentari", comment_ph: "Punts forts i a millorar…",
  presets: [["+ Tesi clara", "La tesi s'entén des del principi. "], ["+ Fonts", "Cal citar millor les fonts de les dades. "], ["+ Refutació", "Bona refutació; reforça-la amb una evidència. "], ["+ Crosses", "Cal reduir les crosses verbals i fer més pauses. "]],
  save_next: "Desa i passa al torn següent", save_end: "Desa i acaba el debat", quit: "Abandona el debat",
  wpm: "{n} paraules/min", wpm_t: "Entre 120 i 160 és un ritme còmode", crutches: "{n} crosses verbals", crutches_t: "eh, bo, o siga, vale…",
  no_sr: "El teu navegador no permet la transcripció per veu (prova Chrome o Edge). Pots escriure les notes manualment.",
  mic_perm: "Cal donar permís al micròfon (i obrir l'app en HTTPS).", mic_err: "Error del micròfon: {e}", mic_on: "Micròfon actiu: ja pots parlar.", mic_fail: "No s'ha pogut iniciar el micròfon.",
  quit_confirm: "Vols abandonar el debat? No es guardarà.", acta_debate: "Acta del debat", grade10: "Nota /10",
  sum_line_1: "{a} punts de {b} possibles en 1 torn.", sum_line_n: "{a} punts de {b} possibles en {n} torns.", practice_pts: "+{n} pts de pràctica",
  th_turn: "Torn", th_total: "Total", th_time: "Temps", export_txt: "Exporta (.txt)", new_debate: "Nou debat",
  exp_title: "ENTRENADOR DE DEBAT · Sala de debat", exp_date: "Data", exp_part: "Participant", exp_topic: "Tema", exp_stance: "Postura", exp_grade: "Nota final (0-10)",
  exp_prep: "Esquema de preparació:", exp_rubric: "Rúbrica", exp_time: "Temps: {a} de {b}", exp_comment: "Comentari", no_transcript: "(sense transcripció)",
  // Com funciona
  info_title: "Com funciona",
  info_html: `
    <div class="doc"><p class="doc-label">Què és</p>
      <p>L'<b>Entrenador de Debat</b> és una aplicació per a aprendre a argumentar, refutar i parlar en públic a l'ESO i al Batxillerat. Està plantejada com una <b>temporada de lliga de debat</b>: cada sessió és una jornada, cada dia hi ha una moció per respondre i el progrés es reflectix en credencials de debatent.</p></div>
    <div class="doc"><p class="doc-label">Seccions</p>
      <table class="table"><tbody>
        <tr><td><b>Inici</b></td><td>Full de temporada: ordre del dia, assistència de la setmana, credencial i tasca de classe.</td></tr>
        <tr><td><b>Calendari</b></td><td>Set blocs temàtics amb les jornades. Dins de cada bloc es disputen en ordre. Cada jornada té una fitxa, un reglament i exercicis variats, i acaba amb una acta.</td></tr>
        <tr><td><b>Moció</b></td><td>Cada dia, una afirmació amb una fal·làcia amagada. Prens posició, escrius la intervenció i reps una papereta del jurat amb puntuació, comentari i una pregunta per a millorar. Pots presentar una rèplica.</td></tr>
        <tr><td><b>Sala</b></td><td>Simulació de debat amb torns, cronòmetre, micròfon, recompte de crosses verbals i rúbrica. Té format torneig, lliure i improvisat.</td></tr>
        <tr><td><b>Docent</b></td><td>Assignació de tasques per enllaç i importació del progrés de l'alumnat.</td></tr>
        <tr><td><b>Perfil</b></td><td>Pseudònim, estadístiques, preferències, llengua i exportació del progrés.</td></tr>
      </tbody></table></div>
    <div class="doc"><p class="doc-label">Com es puntua</p>
      <ul class="tips">
        <li><b>Exercicis de les jornades</b>: 10 punts a la primera, 5 si cal repetir i 0 si es consulta la resolució. A partir del segon error apareixen «Pista» i «Resolució».</li>
        <li><b>Revisió espaiada</b>: els exercicis fallats tornen d'ací a 3 dies i, si s'encerten, d'ací a 7.</li>
        <li><b>Moció del dia</b>: de 0 a 4 en cinc criteris (total sobre 20). La correcció és automàtica i orientativa: no és una IA i pot equivocar-se. Per això hi ha el jurat d'aula i el prompt per a IA.</li>
        <li><b>Credencials</b>: els punts acumulats fan avançar d'«Oient» a «Jutge/jutgessa». L'assistència compta els dies seguits d'entrenament.</li>
      </ul></div>
    <div class="doc"><p class="doc-label">Privadesa</p>
      <p>No hi ha comptes ni servidor. Tot es guarda en el navegador del dispositiu i cap text s'envia enlloc. Per a lliurar el progrés al professorat, l'alumnat exporta un fitxer amb un pseudònim o un número de llista.</p></div>
    <div class="doc"><p class="doc-label">Llengües</p>
      <p>L'aplicació funciona en valencià, castellà, anglés i francés. La llengua es canvia des del menú lateral o des del Perfil. El progrés es manté en canviar de llengua.</p></div>`,
  credits_label: "Crèdits",
  credits_html: `<p>Aplicació creada per <b>Sandra Fortanet</b> en col·laboració amb <b>Claude</b> (Anthropic), a partir d'una anàlisi pròpia de recursos per a ensenyar a argumentar. Tots els textos, personatges i exercicis són originals.</p>`
};

UI.es = {
  colon: ": ",
  brand: "Entrenador<br>de Debate", app_name: "Entrenador de Debate", skip: "Saltar al contenido",
  nav_home: "Inicio", nav_cal: "Calendario", nav_motion: "Moción", nav_sala: "Sala", nav_teacher: "Docente", nav_profile: "Perfil", nav_info: "Cómo funciona",
  side_att: "Asistencia", side_att_t: "Días seguidos de entrenamiento", side_pts: "Puntos", side_pts_t: "Puntos de temporada", lang: "Idioma",
  credit_short: "Creado por Sandra Fortanet con Claude",
  d: "d", pts: "pts", pt_1: "1 punto", pt_n: "{n} pts",
  task_new: "Nueva tarea de clase: {t}", locked_prev: "Primero hay que disputar la jornada anterior de este bloque.",
  copied_phrase: "Frase copiada.", copied_link: "Enlace copiado.", copied_prompt: "Prompt copiado. Pégalo en el asistente de IA que uséis en el centro.", copy_fallback: "Copia el texto:",
  home_label: "Hoja de temporada · {d}", home_welcome: "Te damos la bienvenida", home_sub: "{a} de {b} jornadas disputadas · {p} pts",
  agenda: "Orden del día", agenda_lesson: "Disputar una jornada", agenda_motion: "Responder la moción del día",
  agenda_review_1: "Revisar 1 ejercicio pendiente", agenda_review_n: "Revisar {n} ejercicios pendientes",
  week_att: "Asistencia de esta semana", streak_1: "1 día seguido de entrenamiento.", streak_n: "{n} días seguidos de entrenamiento.",
  credential: "Credencial", to_next: "{p} para {r}", max_level: "Nivel máximo",
  class_task: "Tarea de clase", jornada_n: "Jornada {n}. {t}", task_done: "Disputada. Se puede repetir cuando quieras.", task_today: "Programada para hoy.", task_pending: "Pendiente.",
  next_j: "Próxima jornada · {u}", start_arrow: "Empieza la sesión →", season: "Temporada", all_done: "Todas las jornadas disputadas.", all_done_sub: "Puedes repetirlas o practicar en la Sala.",
  motion_today: "Moción del día", motion_delivered: "Respuesta entregada · {s}/20", motion_pending: "Pendiente de respuesta",
  board: "Frase para la pizarra", copy_it: "Cópiala",
  cal_title: "Calendario de la temporada", cal_sub: "{a} de {b} jornadas disputadas. Dentro de cada bloque, las jornadas se disputan en orden.",
  bloc: "Bloque {n}", th_jornada: "Jornada", th_session: "Sesión", th_state: "Estado",
  st_played: "Disputada · {a}/{b}", st_next: "Próxima", st_open: "Abierta", st_locked: "Pendiente de la anterior",
  flag_task: "Tarea", btn_repeat: "Repetir", btn_start: "Empezar", cal_foot: "Las jornadas nuevas se añaden editando <code>js/content.js</code>.",
  tch_title: "Panel docente", tch_sub: "La app no tiene servidor ni cuentas: las tareas viajan en un enlace y el progreso, en archivos que os entrega el alumnado.",
  tch_task: "Tarea de clase", tch_task_help: "Si no asignáis ninguna tarea, cada estudiante sigue el calendario en orden. La jornada asignada queda abierta aunque no hayan hecho las anteriores.",
  tch_group: "Grupo", tch_group_ph: "Ej.: 3.º ESO B", tch_jornada: "Jornada", tch_days: "Días de sesión",
  tch_link: "Generar el enlace para el alumnado", tch_here: "Aplicarla en este dispositivo", tch_clear: "Quitar la tarea de este dispositivo",
  tch_link_label: "Enlace de la tarea", tch_copy: "Copiar", tch_link_help: "Compartidlo por Aules, Classroom o un código QR. Al abrirlo, la tarea aparecerá en el Inicio de cada estudiante.",
  tch_applied: "Tarea aplicada en este dispositivo.",
  tch_progress: "Progreso del alumnado", tch_progress_help: "Cada estudiante descarga su archivo desde <b>Perfil → Exportar mi progreso</b> (con seudónimo o número de lista) y lo sube a Aules o a Classroom. Aquí podéis importarlos todos de golpe.",
  tch_import: "Importar archivos .json", tch_none: "No se ha encontrado ningún archivo válido.",
  col_student: "Estudiante", col_points: "Puntos", col_cred: "Credencial", col_jorn: "Jornadas", col_motions: "Mociones", col_avg: "Media mociones", col_streak: "Días seguidos", col_debates: "Debates", col_task: "Tarea: {t}", col_exported: "Exportado", yes: "Sí",
  tch_csv: "Descargar CSV", tch_ideas: "Propuestas para el aula",
  tch_tips: [
    "<b>Jurado de aula</b>: en la Moción del día, activad la opción para que un equipo puntúe la intervención de otro con la misma papeleta antes de ver la puntuación automática. Después, comentad las discrepancias.",
    "<b>Sala de debate</b>: proyectad el cronómetro e id rellenando la rúbrica mientras habla cada orador. Exportad el resultado al final.",
    "<b>Debate improvisado</b>: el modo «Improvisado» sortea tema y postura y da tiempo de preparación (15 minutos por defecto).",
    "<b>Corrección con IA</b>: «Copiar el prompt para una IA» prepara la papeleta para que la podáis usar con el asistente que tenga autorizado el centro."
  ],
  prof_title: "Perfil", season_badge: "Entrenador de Debate · Temporada {y}", no_nick: "Sin seudónimo",
  nick_label: "Seudónimo o número de lista", nick_ph: "Ej.: 3B-07", nick_help: "Para proteger tu privacidad, no uses tu nombre y apellidos completos.",
  stats: "Estadísticas", st_jorn: "Jornadas disputadas", st_mot: "Mociones respondidas", st_avg: "Media de las mociones", st_streak: "Días seguidos de entrenamiento", st_deb: "Debates en la Sala", st_rev: "Ejercicios pendientes de revisión",
  creds: "Credenciales", prefs: "Preferencias", pref_voice: "Lectura en voz alta en las jornadas (botón 🔊)", pref_theme: "Apariencia", th_auto: "Automática", th_light: "Clara", th_dark: "Oscura", pref_lang: "Idioma de la aplicación",
  export_btn: "Exportar mi progreso (.json)", reset_btn: "Borrar todos los datos", need_nick: "Primero escribe un seudónimo o número de lista.",
  reset_confirm: "¿Seguro que quieres borrar todo el progreso de este dispositivo? No se puede deshacer.", reset_done: "Datos borrados.",
  how_title: "Criterios de corrección", close: "Cerrar",
  how_body: `<p>La papeleta de la Moción del día la genera un <b>corrector automático orientativo</b> que funciona dentro del navegador, sin enviar el texto a ninguna parte. No es una IA: busca indicios en el texto y los convierte en puntos de 0 a 4 por criterio.</p>
    <table class="table"><tbody>
      <tr><td><b>Argumentación</b></td><td>Conectores de causa y consecuencia («porque», «por tanto»…).</td></tr>
      <tr><td><b>Evidencias</b></td><td>Ejemplos, datos, cifras y fuentes («según…»).</td></tr>
      <tr><td><b>Refutación</b></td><td>Marcas de contraargumentación y si se identifica la falacia concreta de la moción.</td></tr>
      <tr><td><b>Claridad y estructura</b></td><td>Posición explícita al principio, longitud de las frases y conclusión.</td></tr>
      <tr><td><b>Pertinencia</b></td><td>Relación con las palabras y la idea de la moción.</td></tr>
    </tbody></table>
    <p>Como se fija en la forma y no entiende del todo el sentido, <b>puede equivocarse</b>. La puntuación es orientativa: contrastadla con el jurado de aula, con el profesorado o con el prompt para IA.</p>`,
  tl_chat: "Transcripción", tl_choice: "Pregunta", tl_vs: "Cara a cara", tl_multi: "Selección", tl_tap: "Subrayado", tl_cards: "Clasificación", tl_build: "Esquema",
  review_title: "Sesión de revisión", review_unit: "Revisión", repeat_unit: "Repetición", no_review: "No tienes ningún ejercicio pendiente de revisión.",
  ls_close: "✕ Cerrar", ls_speak: "Leer en voz alta", ls_progress: "Progreso de la jornada", ls_close_confirm: "¿Quieres cerrar la sesión? No se guardará el progreso de esta jornada.",
  voice_on: "Lectura en voz alta activada (se puede desactivar en el Perfil).", ex_count: "Ejercicio {a} de {b}", acta: "Acta",
  check: "Comprobar", flag_review: "Revisión", v_ok: "Correcto", v_ko: "Revísalo", v_resolved: "Resuelto",
  ko_help: "Puedes pedir una pista o la resolución.", ko_reread: "Vuelve a leerlo con calma.", hint: "Pista", solution: "Resolución", to_review: "Pasa a la lista de revisión.",
  retry: "Volver a intentarlo", justif: "Justificación", cont: "Continuar", plus_pts: "+{n} pts",
  fitxa: "Ficha de la jornada", f_bloc: "Bloque", f_plant: "Planteamiento", f_cast: "Intervienen", f_ex: "Ejercicios", start_session: "Empezar la sesión",
  reglament: "Reglamento de la jornada", art: "Art. {n}.", read_btn: "Leído", conversa: "Conversación",
  multi_tip: "Puedes marcar más de una.", tap_tip: "Toca el fragmento para subrayarlo.", build_tip: "Piezas disponibles (tócalas para colocarlas; toca una casilla llena para vaciarla):",
  empty: "(vacío)", th_statement: "Afirmación", vs_a: "Intervención A", vs_b: "Intervención B",
  acta_j: "Acta de la jornada", acta_r: "Acta de la sesión de revisión", th_num: "N.º", th_ex: "Ejercicio", th_res: "Resultado",
  r_first: "Correcto a la primera", r_retry: "Correcto al repetir", r_solved: "Resuelto con ayuda",
  acta_sum: "<b>{a} de {b}</b> correctos a la primera · <b>+{p} pts</b>", acta_rep: " · Repetición: {a}/{b} (+{p} pts)",
  conclusion: "Conclusión de la sesión", reference: "Referencia: {s}", to_review_on: "Para revisar el {d}", answer: "Respuesta: {a}",
  attendance: "Asistencia", total_pts: "Total: {p} pts", flag_new: "Nueva",
  close_acta: "Cerrar el acta", repeat_1: "Repetir ahora el fallo", repeat_n: "Repetir ahora los {n} fallos", go_motion: "Ir a la moción del día",
  crit: {
    logica: { name: "Argumentación", good: "Las razones están bien encadenadas y llevan a la conclusión.", weak: "Las ideas aparecen sueltas: no queda claro por qué se deduce tu posición.", q: "¿Por qué debería aceptar el jurado tu conclusión? ¿Qué razón la sostiene?" },
    evidencia: { name: "Evidencias", good: "Hay ejemplos o datos que apoyan lo que dices.", weak: "Todo descansa en la opinión: no hay ningún ejemplo, dato ni fuente.", q: "¿Qué dato o qué ejemplo concreto demostraría lo que afirmas?" },
    refutacio: { name: "Refutación", good: "Identificas dónde falla el razonamiento de la moción.", weak: "Tomas posición, pero no explicas dónde falla el razonamiento de la moción.", q: "¿En qué punto exacto se equivoca el razonamiento de la moción?" },
    claredat: { name: "Claridad y estructura", good: "La posición es explícita y el texto tiene un inicio y un cierre claros.", weak: "Cuesta identificar la posición o el texto no tiene una estructura clara.", q: "Si el jurado solo leyera la primera y la última frase, ¿sabría qué defiendes?" },
    rellevancia: { name: "Pertinencia", good: "Respondes exactamente a lo que plantea la moción.", weak: "Parte del texto se aleja de lo que plantea la moción.", q: "¿Estás respondiendo exactamente a lo que afirma la moción, o a un tema vecino?" }
  },
  levels: ["Ausente", "Inicial", "En proceso", "Logrado", "Excelente"],
  dec: ["Insuficiente", "Hay que reforzarla", "Intervención sólida", "Intervención ganadora"],
  coach: ["Nota al margen: empieza declarando tu posición.", "Nota al margen: el jurado debe conocer tu posición desde la primera frase.", "Nota al margen: falta una razón explícita («porque», «ya que», «por tanto»).", "Nota al margen: no hay ningún ejemplo ni dato.", "Nota al margen: señala dónde falla el razonamiento de la moción.", "Nota al margen: falta una frase de conclusión.", "Nota al margen: la estructura está completa. Revísala y entrégala."],
  mo_title: "Moción del día", mo_practice: "Moción de práctica", mo_by: "Moción presentada por {a}", fictional: "(personaje ficticio)",
  position: "Tu posición", pos_for: "A favor", pos_against: "En contra", pos_nuanced: "Matizada",
  written: "Intervención escrita", words_hint: "(entre 40 y 200 palabras)", ph_text: "Señoras y señores del jurado: …", words_1: "1 palabra", words_n: "{n} palabras",
  peer_opt: "Jurado de aula: otra persona evalúa la intervención antes de ver la papeleta automática", deliver: "Entregar la intervención", rankup: "Nueva credencial: {r}.",
  peer_title: "Jurado de aula", peer_sub: "Pasa el dispositivo a la persona que hará de jurado. Debe puntuar cada criterio antes de ver la papeleta automática.",
  motion: "Moción", intervention: "Intervención ({v})", criterion: "Criterio", scale_tip: "0 Ausente · 1 Inicial · 2 En proceso · 3 Logrado · 4 Excelente",
  peer_comment: "Comentario del jurado de aula", peer_comment_ph: "Un punto fuerte y un aspecto que hay que mejorar.", open_ballot: "Abrir la papeleta automática",
  but: "En cambio,", flaw_yes: "Has detectado la falacia de la moción.", flaw_no: "No has llegado a nombrar la falacia que esconde la moción.",
  ballot_title: "Papeleta del jurado", position_lbl: "Posición", debater: "Debatiente", total: "Total", points: "Puntos", level: "Nivel",
  jury_comment: "Comentario del jurado", jury_question: "Pregunta del jurado", prev_avg: "Tu media anterior: {n}/20.", first_motion: "Es tu primera moción.",
  xp_line: "+{n} pts.", xp_line_rep: "+{n} pts (incluye la réplica).", fallacy: "Falacia de la moción", peer_vs: "Jurado de aula vs. papeleta automática (0–4)",
  th_peer: "Jurado de aula", th_auto_col: "Automática", diff: "Hay que comentarlo", same: "Coincide", comment_lbl: "Comentario:",
  peer_disc: "Donde haya diferencias de 2 puntos o más, discutid quién lo ha valorado mejor.", your_int: "Tu intervención",
  reply: "Presentar una réplica", criteria_btn: "Criterios de corrección", copy_prompt: "Copiar el prompt para una IA", other_motion: "Otra moción de práctica", dots_aria: "{v} de 4",
  reply_title: "Réplica", reply_sub: "Tienes una oportunidad de reescribir la intervención. Responde a la pregunta del jurado.", revised: "Intervención revisada",
  deliver_reply: "Entregar la réplica", back_ballot: "Volver a la papeleta", reply_up: "La réplica sube de {a} a {b}/20. +15 pts", reply_same: "La réplica no mejora la puntuación. Se mantiene la papeleta anterior.",
  ai_prompt: `Actúa como jurado de debate escolar para alumnado de secundaria. Responde en castellano.

MOCIÓN: "{m}"

INTERVENCIÓN DEL ALUMNO/A: "{x}"

Puntúa la intervención de 0 a 4 en cada criterio (0 ausente, 4 excelente) y justifícalo brevemente:
1. Argumentación (razones enlazadas con conectores, conclusión que se deduce de ellas)
2. Evidencias (ejemplos, datos y fuentes pertinentes)
3. Refutación (identifica la trampa o falacia de la moción)
4. Claridad y estructura (posición explícita, frases claras, conclusión)
5. Pertinencia (responde exactamente a lo que dice la moción)

Después, escribe un comentario breve de jurado y formula una sola pregunta que ayude al alumno/a a mejorar la intervención. No reescribas la intervención por el alumno/a: guíale para que la mejore él o ella.`,
  sala_title: "Sala de debate", sala_sub: "Practica turnos reales con cronómetro, micrófono y rúbrica.", tab_t: "Formato torneo", tab_l: "Libre", tab_i: "Improvisado",
  topic: "Tema de debate", topic_ph: "Ej.: ¿Hay que prohibir los móviles en los centros educativos?", stance: "Postura", mic_lang: "Idioma del micrófono",
  ml_va: "Valenciano / catalán", ml_es: "Castellano", ml_en: "Inglés", ml_fr: "Francés", start: "Empezar", prev_debates: "Debates anteriores", clear_hist: "Borrar el historial", no_topic: "Sin tema",
  turns_tip: "Valores orientativos: ajusta los nombres y los minutos a las bases de tu torneo.", turn_name_aria: "Nombre del turno {n}", minutes: "Minutos", min: "min", del_turn: "Eliminar el turno",
  add_turn: "+ Añadir un turno", restore: "Restaurar los turnos por defecto", rounds: "Rondas", secs: "Segundos por turno",
  impro_tip: "El tema y la postura se sortean. Después tienes un tiempo de preparación y, al acabar, empieza el debate con los turnos del formato torneo.",
  prep_min: "Minutos de preparación", draw: "Sortear un tema", clear_confirm: "¿Quieres borrar el historial de debates?",
  need_topic: "Escribe un tema (o sortea uno en el modo Improvisado).", need_turn: "Añade al menos un turno.", turn_n: "Turno {n}",
  prep_title: "Preparación", plan: ["Definid las palabras clave.", "Lluvia de ideas a favor y en contra.", "Elegid 2 o 3 argumentos con una evidencia cada uno.", "Preparad la apertura y la frase final."],
  team_notes: "Esquema del equipo…", start_debate: "Empezar el debate", cancel: "Cancelar", prep_over: "¡Se ha acabado el tiempo de preparación!",
  mission: "Misión del turno:", play: "▶ Iniciar", pause: "⏸ Pausa", resume: "▶ Continuar", reset: "↺ Reiniciar", mic: "Micrófono", mic_title: "Transcripción por voz",
  transcript_ph: "La transcripción aparecerá aquí. También puedes escribir o anotar ideas abajo.", notes_ph: "Notas o texto del turno…",
  rubric: "Rúbrica (0–2)", comment: "Comentario", comment_ph: "Puntos fuertes y a mejorar…",
  presets: [["+ Tesis clara", "La tesis se entiende desde el principio. "], ["+ Fuentes", "Hay que citar mejor las fuentes de los datos. "], ["+ Refutación", "Buena refutación; refuérzala con una evidencia. "], ["+ Muletillas", "Hay que reducir las muletillas y hacer más pausas. "]],
  save_next: "Guardar y pasar al turno siguiente", save_end: "Guardar y acabar el debate", quit: "Abandonar el debate",
  wpm: "{n} palabras/min", wpm_t: "Entre 120 y 160 es un ritmo cómodo", crutches: "{n} muletillas", crutches_t: "eh, bueno, o sea, vale…",
  no_sr: "Tu navegador no permite la transcripción por voz (prueba Chrome o Edge). Puedes escribir las notas manualmente.",
  mic_perm: "Hay que dar permiso al micrófono (y abrir la app en HTTPS).", mic_err: "Error del micrófono: {e}", mic_on: "Micrófono activo: ya puedes hablar.", mic_fail: "No se ha podido iniciar el micrófono.",
  quit_confirm: "¿Quieres abandonar el debate? No se guardará.", acta_debate: "Acta del debate", grade10: "Nota /10",
  sum_line_1: "{a} puntos de {b} posibles en 1 turno.", sum_line_n: "{a} puntos de {b} posibles en {n} turnos.", practice_pts: "+{n} pts de práctica",
  th_turn: "Turno", th_total: "Total", th_time: "Tiempo", export_txt: "Exportar (.txt)", new_debate: "Nuevo debate",
  exp_title: "ENTRENADOR DE DEBATE · Sala de debate", exp_date: "Fecha", exp_part: "Participante", exp_topic: "Tema", exp_stance: "Postura", exp_grade: "Nota final (0-10)",
  exp_prep: "Esquema de preparación:", exp_rubric: "Rúbrica", exp_time: "Tiempo: {a} de {b}", exp_comment: "Comentario", no_transcript: "(sin transcripción)",
  info_title: "Cómo funciona",
  info_html: `
    <div class="doc"><p class="doc-label">Qué es</p>
      <p>El <b>Entrenador de Debate</b> es una aplicación para aprender a argumentar, refutar y hablar en público en la ESO y el Bachillerato. Está planteada como una <b>temporada de liga de debate</b>: cada sesión es una jornada, cada día hay una moción que responder y el progreso se refleja en credenciales de debatiente.</p></div>
    <div class="doc"><p class="doc-label">Secciones</p>
      <table class="table"><tbody>
        <tr><td><b>Inicio</b></td><td>Hoja de temporada: orden del día, asistencia de la semana, credencial y tarea de clase.</td></tr>
        <tr><td><b>Calendario</b></td><td>Siete bloques temáticos con sus jornadas. Dentro de cada bloque se disputan en orden. Cada jornada tiene una ficha, un reglamento y ejercicios variados, y termina con un acta.</td></tr>
        <tr><td><b>Moción</b></td><td>Cada día, una afirmación con una falacia escondida. Tomas posición, escribes la intervención y recibes una papeleta del jurado con puntuación, comentario y una pregunta para mejorar. Puedes presentar una réplica.</td></tr>
        <tr><td><b>Sala</b></td><td>Simulación de debate con turnos, cronómetro, micrófono, recuento de muletillas y rúbrica. Tiene formato torneo, libre e improvisado.</td></tr>
        <tr><td><b>Docente</b></td><td>Asignación de tareas por enlace e importación del progreso del alumnado.</td></tr>
        <tr><td><b>Perfil</b></td><td>Seudónimo, estadísticas, preferencias, idioma y exportación del progreso.</td></tr>
      </tbody></table></div>
    <div class="doc"><p class="doc-label">Cómo se puntúa</p>
      <ul class="tips">
        <li><b>Ejercicios de las jornadas</b>: 10 puntos a la primera, 5 si hay que repetir y 0 si se consulta la resolución. A partir del segundo error aparecen «Pista» y «Resolución».</li>
        <li><b>Revisión espaciada</b>: los ejercicios fallados vuelven dentro de 3 días y, si se aciertan, dentro de 7.</li>
        <li><b>Moción del día</b>: de 0 a 4 en cinco criterios (total sobre 20). La corrección es automática y orientativa: no es una IA y puede equivocarse. Por eso existen el jurado de aula y el prompt para IA.</li>
        <li><b>Credenciales</b>: los puntos acumulados hacen avanzar de «Oyente» a «Juez/jueza». La asistencia cuenta los días seguidos de entrenamiento.</li>
      </ul></div>
    <div class="doc"><p class="doc-label">Privacidad</p>
      <p>No hay cuentas ni servidor. Todo se guarda en el navegador del dispositivo y ningún texto se envía a ninguna parte. Para entregar el progreso al profesorado, el alumnado exporta un archivo con un seudónimo o un número de lista.</p></div>
    <div class="doc"><p class="doc-label">Idiomas</p>
      <p>La aplicación funciona en valenciano, castellano, inglés y francés. El idioma se cambia desde el menú lateral o desde el Perfil. El progreso se mantiene al cambiar de idioma.</p></div>`,
  credits_label: "Créditos",
  credits_html: `<p>Aplicación creada por <b>Sandra Fortanet</b> en colaboración con <b>Claude</b> (Anthropic), a partir de un análisis propio de recursos para enseñar a argumentar. Todos los textos, personajes y ejercicios son originales.</p>`
};

UI.en = {
  colon: ": ",
  brand: "Debate<br>Coach", app_name: "Debate Coach", skip: "Skip to content",
  nav_home: "Home", nav_cal: "Fixtures", nav_motion: "Motion", nav_sala: "Debate room", nav_teacher: "Teacher", nav_profile: "Profile", nav_info: "How it works",
  side_att: "Attendance", side_att_t: "Consecutive training days", side_pts: "Points", side_pts_t: "Season points", lang: "Language",
  credit_short: "Created by Sandra Fortanet with Claude",
  d: "d", pts: "pts", pt_1: "1 point", pt_n: "{n} pts",
  task_new: "New class task: {t}", locked_prev: "You need to complete the previous session in this block first.",
  copied_phrase: "Quote copied.", copied_link: "Link copied.", copied_prompt: "Prompt copied. Paste it into the AI assistant your school uses.", copy_fallback: "Copy the text:",
  home_label: "Season sheet · {d}", home_welcome: "Welcome", home_sub: "{a} of {b} sessions completed · {p} pts",
  agenda: "Today's agenda", agenda_lesson: "Complete a session", agenda_motion: "Answer today's motion",
  agenda_review_1: "Review 1 pending exercise", agenda_review_n: "Review {n} pending exercises",
  week_att: "This week's attendance", streak_1: "1 consecutive training day.", streak_n: "{n} consecutive training days.",
  credential: "Credential", to_next: "{p} to {r}", max_level: "Top level",
  class_task: "Class task", jornada_n: "Session {n}. {t}", task_done: "Completed. You can repeat it whenever you like.", task_today: "Scheduled for today.", task_pending: "Pending.",
  next_j: "Next session · {u}", start_arrow: "Start the session →", season: "Season", all_done: "All sessions completed.", all_done_sub: "You can repeat them or practise in the Debate room.",
  motion_today: "Today's motion", motion_delivered: "Answer submitted · {s}/20", motion_pending: "Waiting for your answer",
  board: "Quote for the board", copy_it: "Copy it",
  cal_title: "Season fixtures", cal_sub: "{a} of {b} sessions completed. Within each block, sessions are taken in order.",
  bloc: "Block {n}", th_jornada: "Session", th_session: "Topic", th_state: "Status",
  st_played: "Completed · {a}/{b}", st_next: "Next", st_open: "Open", st_locked: "Waiting for the previous one",
  flag_task: "Task", btn_repeat: "Repeat", btn_start: "Start", cal_foot: "New sessions can be added by editing <code>js/content.js</code>.",
  tch_title: "Teacher panel", tch_sub: "The app has no server and no accounts: tasks travel in a link and progress in files that students hand in.",
  tch_task: "Class task", tch_task_help: "If you don't assign a task, each student follows the fixtures in order. The assigned session is unlocked even if earlier ones haven't been done.",
  tch_group: "Group", tch_group_ph: "E.g. Year 10 B", tch_jornada: "Session", tch_days: "Session days",
  tch_link: "Create the link for students", tch_here: "Apply it on this device", tch_clear: "Remove the task from this device",
  tch_link_label: "Task link", tch_copy: "Copy", tch_link_help: "Share it through your learning platform, email or a QR code. When students open it, the task appears on their Home page.",
  tch_applied: "Task applied on this device.",
  tch_progress: "Student progress", tch_progress_help: "Each student downloads their file from <b>Profile → Export my progress</b> (with a nickname or class number) and uploads it to your platform. You can import them all at once here.",
  tch_import: "Import .json files", tch_none: "No valid file was found.",
  col_student: "Student", col_points: "Points", col_cred: "Credential", col_jorn: "Sessions", col_motions: "Motions", col_avg: "Motion average", col_streak: "Day streak", col_debates: "Debates", col_task: "Task: {t}", col_exported: "Exported", yes: "Yes",
  tch_csv: "Download CSV", tch_ideas: "Classroom ideas",
  tch_tips: [
    "<b>Class jury</b>: in Today's motion, turn on the option so that one team scores another team's speech with the same ballot before seeing the automatic score. Then discuss the differences.",
    "<b>Debate room</b>: project the timer and fill in the rubric while each speaker talks. Export the result at the end.",
    "<b>Impromptu debate</b>: the \"Impromptu\" mode draws a topic and side at random and gives preparation time (15 minutes by default).",
    "<b>AI marking</b>: \"Copy the prompt for an AI\" prepares the ballot so you can use it with the assistant your school has approved."
  ],
  prof_title: "Profile", season_badge: "Debate Coach · Season {y}", no_nick: "No nickname",
  nick_label: "Nickname or class number", nick_ph: "E.g. 10B-07", nick_help: "To protect your privacy, don't use your full name.",
  stats: "Statistics", st_jorn: "Sessions completed", st_mot: "Motions answered", st_avg: "Motion average", st_streak: "Consecutive training days", st_deb: "Debates in the room", st_rev: "Exercises waiting for review",
  creds: "Credentials", prefs: "Preferences", pref_voice: "Read sessions aloud (🔊 button)", pref_theme: "Appearance", th_auto: "Automatic", th_light: "Light", th_dark: "Dark", pref_lang: "App language",
  export_btn: "Export my progress (.json)", reset_btn: "Delete all data", need_nick: "Please enter a nickname or class number first.",
  reset_confirm: "Are you sure you want to delete all progress on this device? This cannot be undone.", reset_done: "Data deleted.",
  how_title: "Marking criteria", close: "Close",
  how_body: `<p>The ballot for Today's motion is produced by an <b>approximate automatic marker</b> that runs inside the browser and never sends the text anywhere. It is not an AI: it looks for clues in the text and turns them into 0–4 points per criterion.</p>
    <table class="table"><tbody>
      <tr><td><b>Reasoning</b></td><td>Cause-and-effect connectives ("because", "therefore"…).</td></tr>
      <tr><td><b>Evidence</b></td><td>Examples, data, figures and sources ("according to…").</td></tr>
      <tr><td><b>Rebuttal</b></td><td>Counter-argument markers and whether the motion's specific fallacy is identified.</td></tr>
      <tr><td><b>Clarity and structure</b></td><td>A clear position at the start, sentence length and a conclusion.</td></tr>
      <tr><td><b>Relevance</b></td><td>Connection with the words and the idea of the motion.</td></tr>
    </tbody></table>
    <p>Because it looks at form and doesn't fully understand meaning, <b>it can get things wrong</b>. The score is a guide: compare it with the class jury, your teacher or the AI prompt.</p>`,
  tl_chat: "Transcript", tl_choice: "Question", tl_vs: "Head to head", tl_multi: "Selection", tl_tap: "Highlight", tl_cards: "Sorting", tl_build: "Outline",
  review_title: "Review session", review_unit: "Review", repeat_unit: "Retry", no_review: "You have no exercises waiting for review.",
  ls_close: "✕ Close", ls_speak: "Read aloud", ls_progress: "Session progress", ls_close_confirm: "Close the session? Progress in this session won't be saved.",
  voice_on: "Read-aloud turned on (you can turn it off in your Profile).", ex_count: "Exercise {a} of {b}", acta: "Report",
  check: "Check", flag_review: "Review", v_ok: "Correct", v_ko: "Check again", v_resolved: "Solved",
  ko_help: "You can ask for a hint or the solution.", ko_reread: "Read it again carefully.", hint: "Hint", solution: "Solution", to_review: "Added to your review list.",
  retry: "Try again", justif: "Explanation", cont: "Continue", plus_pts: "+{n} pts",
  fitxa: "Session sheet", f_bloc: "Block", f_plant: "Starting point", f_cast: "Featuring", f_ex: "Exercises", start_session: "Start the session",
  reglament: "Session rules", art: "Art. {n}.", read_btn: "Done reading", conversa: "Conversation",
  multi_tip: "You can tick more than one.", tap_tip: "Tap the fragment to highlight it.", build_tip: "Available pieces (tap to place them; tap a filled box to empty it):",
  empty: "(empty)", th_statement: "Statement", vs_a: "Speech A", vs_b: "Speech B",
  acta_j: "Session report", acta_r: "Review session report", th_num: "No.", th_ex: "Exercise", th_res: "Result",
  r_first: "Correct first time", r_retry: "Correct on retry", r_solved: "Solved with help",
  acta_sum: "<b>{a} of {b}</b> correct first time · <b>+{p} pts</b>", acta_rep: " · Retry: {a}/{b} (+{p} pts)",
  conclusion: "Key takeaway", reference: "Reference: {s}", to_review_on: "To review on {d}", answer: "Answer: {a}",
  attendance: "Attendance", total_pts: "Total: {p} pts", flag_new: "New",
  close_acta: "Close the report", repeat_1: "Retry the missed one now", repeat_n: "Retry the {n} missed ones now", go_motion: "Go to today's motion",
  crit: {
    logica: { name: "Reasoning", good: "Your reasons are well linked and lead to the conclusion.", weak: "The ideas stand alone: it isn't clear why your position follows from them.", q: "Why should the jury accept your conclusion? What reason supports it?" },
    evidencia: { name: "Evidence", good: "There are examples or data supporting what you say.", weak: "Everything rests on opinion: there are no examples, data or sources.", q: "What fact or concrete example would prove what you claim?" },
    refutacio: { name: "Rebuttal", good: "You identify where the motion's reasoning breaks down.", weak: "You take a side, but you don't explain where the motion's reasoning fails.", q: "At what exact point does the motion's reasoning go wrong?" },
    claredat: { name: "Clarity and structure", good: "Your position is explicit and the text has a clear opening and close.", weak: "It's hard to find your position, or the text lacks a clear structure.", q: "If the jury only read your first and last sentences, would they know what you argue?" },
    rellevancia: { name: "Relevance", good: "You answer exactly what the motion says.", weak: "Part of the text drifts away from what the motion says.", q: "Are you answering exactly what the motion claims, or a neighbouring topic?" }
  },
  levels: ["Missing", "Beginning", "Developing", "Secure", "Excellent"],
  dec: ["Insufficient", "Needs strengthening", "Solid speech", "Winning speech"],
  coach: ["Margin note: start by stating your position.", "Margin note: the jury should know your position from the first sentence.", "Margin note: there is no explicit reason (\"because\", \"since\", \"therefore\").", "Margin note: there are no examples or data.", "Margin note: point out where the motion's reasoning fails.", "Margin note: a concluding sentence is missing.", "Margin note: the structure is complete. Check it and submit it."],
  mo_title: "Today's motion", mo_practice: "Practice motion", mo_by: "Motion proposed by {a}", fictional: "(fictional character)",
  position: "Your position", pos_for: "For", pos_against: "Against", pos_nuanced: "Nuanced",
  written: "Written speech", words_hint: "(40 to 200 words)", ph_text: "Ladies and gentlemen of the jury: …", words_1: "1 word", words_n: "{n} words",
  peer_opt: "Class jury: another person scores the speech before seeing the automatic ballot", deliver: "Submit the speech", rankup: "New credential: {r}.",
  peer_title: "Class jury", peer_sub: "Pass the device to the person acting as the jury. They must score each criterion before seeing the automatic ballot.",
  motion: "Motion", intervention: "Speech ({v})", criterion: "Criterion", scale_tip: "0 Missing · 1 Beginning · 2 Developing · 3 Secure · 4 Excellent",
  peer_comment: "Class jury comment", peer_comment_ph: "One strength and one thing to improve.", open_ballot: "Open the automatic ballot",
  but: "However,", flaw_yes: "You spotted the motion's fallacy.", flaw_no: "You didn't name the fallacy hidden in the motion.",
  ballot_title: "Jury ballot", position_lbl: "Position", debater: "Debater", total: "Total", points: "Points", level: "Level",
  jury_comment: "Jury comment", jury_question: "Jury question", prev_avg: "Your previous average: {n}/20.", first_motion: "This is your first motion.",
  xp_line: "+{n} pts.", xp_line_rep: "+{n} pts (includes the reply).", fallacy: "The motion's fallacy", peer_vs: "Class jury vs. automatic ballot (0–4)",
  th_peer: "Class jury", th_auto_col: "Automatic", diff: "Worth discussing", same: "Agrees", comment_lbl: "Comment:",
  peer_disc: "Where scores differ by 2 points or more, discuss who judged it better.", your_int: "Your speech",
  reply: "Submit a reply", criteria_btn: "Marking criteria", copy_prompt: "Copy the prompt for an AI", other_motion: "Another practice motion", dots_aria: "{v} of 4",
  reply_title: "Reply", reply_sub: "You get one chance to rewrite your speech. Answer the jury's question.", revised: "Revised speech",
  deliver_reply: "Submit the reply", back_ballot: "Back to the ballot", reply_up: "The reply raises the score from {a} to {b}/20. +15 pts", reply_same: "The reply doesn't improve the score. The previous ballot stands.",
  ai_prompt: `Act as a school debate judge for secondary students. Answer in English.

MOTION: "{m}"

STUDENT'S SPEECH: "{x}"

Score the speech from 0 to 4 on each criterion (0 missing, 4 excellent) and briefly justify each score:
1. Reasoning (reasons linked with connectives, a conclusion that follows)
2. Evidence (relevant examples, data and sources)
3. Rebuttal (identifies the trick or fallacy in the motion)
4. Clarity and structure (explicit position, clear sentences, conclusion)
5. Relevance (answers exactly what the motion says)

Then write a short judge's comment and ask one single question that helps the student improve the speech. Don't rewrite the speech for the student: guide them so they improve it themselves.`,
  sala_title: "Debate room", sala_sub: "Practise real speeches with a timer, microphone and rubric.", tab_t: "Tournament format", tab_l: "Free", tab_i: "Impromptu",
  topic: "Debate topic", topic_ph: "E.g. Should mobile phones be banned in schools?", stance: "Side", mic_lang: "Microphone language",
  ml_va: "Valencian / Catalan", ml_es: "Spanish", ml_en: "English", ml_fr: "French", start: "Start", prev_debates: "Previous debates", clear_hist: "Clear history", no_topic: "No topic",
  turns_tip: "Suggested values: adjust the names and minutes to your tournament rules.", turn_name_aria: "Name of speech {n}", minutes: "Minutes", min: "min", del_turn: "Delete the speech",
  add_turn: "+ Add a speech", restore: "Restore default speeches", rounds: "Rounds", secs: "Seconds per speech",
  impro_tip: "The topic and side are drawn at random. Then you get preparation time and, when it ends, the debate starts with the tournament-format speeches.",
  prep_min: "Preparation minutes", draw: "Draw a topic", clear_confirm: "Clear the debate history?",
  need_topic: "Write a topic (or draw one in Impromptu mode).", need_turn: "Add at least one speech.", turn_n: "Speech {n}",
  prep_title: "Preparation", plan: ["Define the key words.", "Brainstorm for and against.", "Choose 2 or 3 arguments, each with a piece of evidence.", "Prepare the opening and the final sentence."],
  team_notes: "Team outline…", start_debate: "Start the debate", cancel: "Cancel", prep_over: "Preparation time is over!",
  mission: "Speech goal:", play: "▶ Start", pause: "⏸ Pause", resume: "▶ Resume", reset: "↺ Reset", mic: "Microphone", mic_title: "Voice transcription",
  transcript_ph: "The transcript will appear here. You can also type or jot down ideas below.", notes_ph: "Notes or text of the speech…",
  rubric: "Rubric (0–2)", comment: "Comment", comment_ph: "Strengths and things to improve…",
  presets: [["+ Clear thesis", "The thesis is clear from the start. "], ["+ Sources", "Sources for the data need to be cited better. "], ["+ Rebuttal", "Good rebuttal; strengthen it with evidence. "], ["+ Fillers", "Cut down on filler words and pause more. "]],
  save_next: "Save and go to the next speech", save_end: "Save and finish the debate", quit: "Leave the debate",
  wpm: "{n} words/min", wpm_t: "120–160 is a comfortable pace", crutches: "{n} filler words", crutches_t: "um, uh, like, you know…",
  no_sr: "Your browser doesn't support voice transcription (try Chrome or Edge). You can type your notes instead.",
  mic_perm: "You need to allow microphone access (and open the app over HTTPS).", mic_err: "Microphone error: {e}", mic_on: "Microphone on: you can start speaking.", mic_fail: "The microphone couldn't be started.",
  quit_confirm: "Leave the debate? It won't be saved.", acta_debate: "Debate report", grade10: "Score /10",
  sum_line_1: "{a} points out of {b} in 1 speech.", sum_line_n: "{a} points out of {b} in {n} speeches.", practice_pts: "+{n} practice pts",
  th_turn: "Speech", th_total: "Total", th_time: "Time", export_txt: "Export (.txt)", new_debate: "New debate",
  exp_title: "DEBATE COACH · Debate room", exp_date: "Date", exp_part: "Participant", exp_topic: "Topic", exp_stance: "Side", exp_grade: "Final score (0-10)",
  exp_prep: "Preparation outline:", exp_rubric: "Rubric", exp_time: "Time: {a} of {b}", exp_comment: "Comment", no_transcript: "(no transcript)",
  info_title: "How it works",
  info_html: `
    <div class="doc"><p class="doc-label">What it is</p>
      <p><b>Debate Coach</b> is an app for learning to argue, rebut and speak in public at secondary school. It is designed as a <b>debate league season</b>: each lesson is a session, there is a motion to answer every day, and progress shows up as debater credentials.</p></div>
    <div class="doc"><p class="doc-label">Sections</p>
      <table class="table"><tbody>
        <tr><td><b>Home</b></td><td>Season sheet: today's agenda, weekly attendance, credential and class task.</td></tr>
        <tr><td><b>Fixtures</b></td><td>Seven themed blocks with their sessions, taken in order within each block. Each session has a sheet, rules and varied exercises, and ends with a report.</td></tr>
        <tr><td><b>Motion</b></td><td>Every day, a claim with a hidden fallacy. You take a side, write your speech and get a jury ballot with a score, a comment and one question to help you improve. You can submit a reply.</td></tr>
        <tr><td><b>Debate room</b></td><td>Debate simulation with speeches, timer, microphone, filler-word count and rubric. Tournament, free and impromptu formats.</td></tr>
        <tr><td><b>Teacher</b></td><td>Assign tasks by link and import student progress.</td></tr>
        <tr><td><b>Profile</b></td><td>Nickname, statistics, preferences, language and progress export.</td></tr>
      </tbody></table></div>
    <div class="doc"><p class="doc-label">Scoring</p>
      <ul class="tips">
        <li><b>Session exercises</b>: 10 points first time, 5 on a retry and 0 if you look at the solution. From the second mistake on, "Hint" and "Solution" appear.</li>
        <li><b>Spaced review</b>: missed exercises come back in 3 days and, if answered correctly, again in 7.</li>
        <li><b>Today's motion</b>: 0 to 4 on five criteria (total out of 20). Marking is automatic and approximate: it is not an AI and can be wrong. That's why there is a class jury and an AI prompt.</li>
        <li><b>Credentials</b>: accumulated points take you from "Listener" to "Judge". Attendance counts consecutive training days.</li>
      </ul></div>
    <div class="doc"><p class="doc-label">Privacy</p>
      <p>There are no accounts and no server. Everything is stored in the device's browser and no text is sent anywhere. To hand in progress, students export a file using a nickname or class number.</p></div>
    <div class="doc"><p class="doc-label">Languages</p>
      <p>The app works in Valencian, Spanish, English and French. Change the language from the side menu or your Profile. Your progress is kept when you switch.</p></div>`,
  credits_label: "Credits",
  credits_html: `<p>App created by <b>Sandra Fortanet</b> in collaboration with <b>Claude</b> (Anthropic), based on her own analysis of resources for teaching argumentation. All texts, characters and exercises are original.</p>`
};

UI.fr = {
  colon: " : ",
  brand: "Entraîneur<br>de débat", app_name: "Entraîneur de débat", skip: "Aller au contenu",
  nav_home: "Accueil", nav_cal: "Calendrier", nav_motion: "Motion", nav_sala: "Salle", nav_teacher: "Enseignant", nav_profile: "Profil", nav_info: "Mode d'emploi",
  side_att: "Assiduité", side_att_t: "Jours d'entraînement consécutifs", side_pts: "Points", side_pts_t: "Points de la saison", lang: "Langue",
  credit_short: "Créé par Sandra Fortanet avec Claude",
  d: "j", pts: "pts", pt_1: "1 point", pt_n: "{n} pts",
  task_new: "Nouvelle tâche de classe : {t}", locked_prev: "Il faut d'abord disputer la journée précédente de ce bloc.",
  copied_phrase: "Phrase copiée.", copied_link: "Lien copié.", copied_prompt: "Prompt copié. Collez-le dans l'assistant d'IA utilisé dans votre établissement.", copy_fallback: "Copiez le texte :",
  home_label: "Feuille de saison · {d}", home_welcome: "Bienvenue", home_sub: "{a} journées disputées sur {b} · {p} pts",
  agenda: "Ordre du jour", agenda_lesson: "Disputer une journée", agenda_motion: "Répondre à la motion du jour",
  agenda_review_1: "Réviser 1 exercice en attente", agenda_review_n: "Réviser {n} exercices en attente",
  week_att: "Assiduité de la semaine", streak_1: "1 jour d'entraînement consécutif.", streak_n: "{n} jours d'entraînement consécutifs.",
  credential: "Accréditation", to_next: "{p} pour devenir {r}", max_level: "Niveau maximal",
  class_task: "Tâche de classe", jornada_n: "Journée {n}. {t}", task_done: "Disputée. Vous pouvez la refaire quand vous voulez.", task_today: "Prévue pour aujourd'hui.", task_pending: "À faire.",
  next_j: "Prochaine journée · {u}", start_arrow: "Commencer la séance →", season: "Saison", all_done: "Toutes les journées sont disputées.", all_done_sub: "Vous pouvez les refaire ou vous entraîner dans la Salle.",
  motion_today: "Motion du jour", motion_delivered: "Réponse remise · {s}/20", motion_pending: "En attente de réponse",
  board: "Phrase pour le tableau", copy_it: "La copier",
  cal_title: "Calendrier de la saison", cal_sub: "{a} journées disputées sur {b}. Dans chaque bloc, les journées se disputent dans l'ordre.",
  bloc: "Bloc {n}", th_jornada: "Journée", th_session: "Séance", th_state: "État",
  st_played: "Disputée · {a}/{b}", st_next: "Prochaine", st_open: "Ouverte", st_locked: "En attente de la précédente",
  flag_task: "Tâche", btn_repeat: "Refaire", btn_start: "Commencer", cal_foot: "On ajoute de nouvelles journées en modifiant <code>js/content.js</code>.",
  tch_title: "Espace enseignant", tch_sub: "L'application n'a ni serveur ni comptes : les tâches circulent par un lien et la progression, dans des fichiers que les élèves vous remettent.",
  tch_task: "Tâche de classe", tch_task_help: "Si vous n'assignez aucune tâche, chaque élève suit le calendrier dans l'ordre. La journée assignée est ouverte même si les précédentes n'ont pas été faites.",
  tch_group: "Groupe", tch_group_ph: "Ex. : 3e B", tch_jornada: "Journée", tch_days: "Jours de séance",
  tch_link: "Créer le lien pour les élèves", tch_here: "L'appliquer sur cet appareil", tch_clear: "Retirer la tâche de cet appareil",
  tch_link_label: "Lien de la tâche", tch_copy: "Copier", tch_link_help: "Partagez-le via votre ENT, par courriel ou avec un code QR. En l'ouvrant, la tâche apparaît sur la page d'accueil de chaque élève.",
  tch_applied: "Tâche appliquée sur cet appareil.",
  tch_progress: "Progression des élèves", tch_progress_help: "Chaque élève télécharge son fichier depuis <b>Profil → Exporter ma progression</b> (avec un pseudonyme ou un numéro) et le dépose sur votre ENT. Ici, vous pouvez tous les importer d'un coup.",
  tch_import: "Importer des fichiers .json", tch_none: "Aucun fichier valide n'a été trouvé.",
  col_student: "Élève", col_points: "Points", col_cred: "Accréditation", col_jorn: "Journées", col_motions: "Motions", col_avg: "Moyenne motions", col_streak: "Jours consécutifs", col_debates: "Débats", col_task: "Tâche : {t}", col_exported: "Exporté", yes: "Oui",
  tch_csv: "Télécharger le CSV", tch_ideas: "Idées pour la classe",
  tch_tips: [
    "<b>Jury de classe</b> : dans la Motion du jour, activez l'option pour qu'une équipe note l'intervention d'une autre avec le même bulletin avant de voir la note automatique. Discutez ensuite des écarts.",
    "<b>Salle de débat</b> : projetez le chronomètre et remplissez la grille pendant que chaque orateur parle. Exportez le résultat à la fin.",
    "<b>Débat improvisé</b> : le mode « Improvisé » tire au sort le sujet et le camp, puis laisse un temps de préparation (15 minutes par défaut).",
    "<b>Correction par IA</b> : « Copier le prompt pour une IA » prépare le bulletin pour l'assistant autorisé par votre établissement."
  ],
  prof_title: "Profil", season_badge: "Entraîneur de débat · Saison {y}", no_nick: "Sans pseudonyme",
  nick_label: "Pseudonyme ou numéro de liste", nick_ph: "Ex. : 3B-07", nick_help: "Pour protéger votre vie privée, n'utilisez pas votre nom complet.",
  stats: "Statistiques", st_jorn: "Journées disputées", st_mot: "Motions répondues", st_avg: "Moyenne des motions", st_streak: "Jours d'entraînement consécutifs", st_deb: "Débats dans la Salle", st_rev: "Exercices à réviser",
  creds: "Accréditations", prefs: "Préférences", pref_voice: "Lecture à voix haute des journées (bouton 🔊)", pref_theme: "Apparence", th_auto: "Automatique", th_light: "Claire", th_dark: "Sombre", pref_lang: "Langue de l'application",
  export_btn: "Exporter ma progression (.json)", reset_btn: "Effacer toutes les données", need_nick: "Écrivez d'abord un pseudonyme ou un numéro de liste.",
  reset_confirm: "Voulez-vous vraiment effacer toute la progression de cet appareil ? C'est irréversible.", reset_done: "Données effacées.",
  how_title: "Critères de correction", close: "Fermer",
  how_body: `<p>Le bulletin de la Motion du jour est produit par un <b>correcteur automatique indicatif</b> qui fonctionne dans le navigateur, sans envoyer le texte nulle part. Ce n'est pas une IA : il cherche des indices dans le texte et les convertit en points de 0 à 4 par critère.</p>
    <table class="table"><tbody>
      <tr><td><b>Argumentation</b></td><td>Connecteurs de cause et de conséquence (« parce que », « donc »…).</td></tr>
      <tr><td><b>Preuves</b></td><td>Exemples, données, chiffres et sources (« selon… »).</td></tr>
      <tr><td><b>Réfutation</b></td><td>Marques de contre-argumentation et identification du sophisme précis de la motion.</td></tr>
      <tr><td><b>Clarté et structure</b></td><td>Position explicite au début, longueur des phrases et conclusion.</td></tr>
      <tr><td><b>Pertinence</b></td><td>Lien avec les mots et l'idée de la motion.</td></tr>
    </tbody></table>
    <p>Comme il regarde la forme sans tout comprendre du sens, <b>il peut se tromper</b>. La note est indicative : comparez-la avec le jury de classe, avec l'enseignant ou avec le prompt pour IA.</p>`,
  tl_chat: "Transcription", tl_choice: "Question", tl_vs: "Face-à-face", tl_multi: "Sélection", tl_tap: "Surlignage", tl_cards: "Classement", tl_build: "Schéma",
  review_title: "Séance de révision", review_unit: "Révision", repeat_unit: "Reprise", no_review: "Vous n'avez aucun exercice à réviser.",
  ls_close: "✕ Fermer", ls_speak: "Lire à voix haute", ls_progress: "Progression de la journée", ls_close_confirm: "Fermer la séance ? La progression de cette journée ne sera pas enregistrée.",
  voice_on: "Lecture à voix haute activée (désactivable dans le Profil).", ex_count: "Exercice {a} sur {b}", acta: "Procès-verbal",
  check: "Vérifier", flag_review: "Révision", v_ok: "Correct", v_ko: "À revoir", v_resolved: "Résolu",
  ko_help: "Vous pouvez demander un indice ou la solution.", ko_reread: "Relisez calmement.", hint: "Indice", solution: "Solution", to_review: "Ajouté à la liste de révision.",
  retry: "Réessayer", justif: "Justification", cont: "Continuer", plus_pts: "+{n} pts",
  fitxa: "Fiche de la journée", f_bloc: "Bloc", f_plant: "Point de départ", f_cast: "Personnages", f_ex: "Exercices", start_session: "Commencer la séance",
  reglament: "Règlement de la journée", art: "Art. {n}.", read_btn: "Lu", conversa: "Conversation",
  multi_tip: "Vous pouvez en cocher plusieurs.", tap_tip: "Touchez le fragment pour le surligner.", build_tip: "Pièces disponibles (touchez-les pour les placer ; touchez une case remplie pour la vider) :",
  empty: "(vide)", th_statement: "Affirmation", vs_a: "Intervention A", vs_b: "Intervention B",
  acta_j: "Procès-verbal de la journée", acta_r: "Procès-verbal de la révision", th_num: "N°", th_ex: "Exercice", th_res: "Résultat",
  r_first: "Correct du premier coup", r_retry: "Correct au deuxième essai", r_solved: "Résolu avec aide",
  acta_sum: "<b>{a} sur {b}</b> corrects du premier coup · <b>+{p} pts</b>", acta_rep: " · Reprise : {a}/{b} (+{p} pts)",
  conclusion: "Conclusion de la séance", reference: "Référence : {s}", to_review_on: "À réviser le {d}", answer: "Réponse : {a}",
  attendance: "Assiduité", total_pts: "Total : {p} pts", flag_new: "Nouvelle",
  close_acta: "Fermer le procès-verbal", repeat_1: "Refaire l'erreur maintenant", repeat_n: "Refaire les {n} erreurs maintenant", go_motion: "Aller à la motion du jour",
  crit: {
    logica: { name: "Argumentation", good: "Les raisons sont bien enchaînées et mènent à la conclusion.", weak: "Les idées sont isolées : on ne voit pas pourquoi votre position en découle.", q: "Pourquoi le jury devrait-il accepter votre conclusion ? Quelle raison la soutient ?" },
    evidencia: { name: "Preuves", good: "Des exemples ou des données appuient ce que vous dites.", weak: "Tout repose sur l'opinion : aucun exemple, aucune donnée ni source.", q: "Quelle donnée ou quel exemple concret prouverait ce que vous affirmez ?" },
    refutacio: { name: "Réfutation", good: "Vous identifiez où le raisonnement de la motion échoue.", weak: "Vous prenez position, mais sans expliquer où le raisonnement de la motion échoue.", q: "À quel point précis le raisonnement de la motion se trompe-t-il ?" },
    claredat: { name: "Clarté et structure", good: "La position est explicite et le texte a une ouverture et une clôture claires.", weak: "La position est difficile à repérer ou le texte manque de structure.", q: "Si le jury ne lisait que la première et la dernière phrase, saurait-il ce que vous défendez ?" },
    rellevancia: { name: "Pertinence", good: "Vous répondez exactement à ce que pose la motion.", weak: "Une partie du texte s'éloigne de ce que pose la motion.", q: "Répondez-vous exactement à ce qu'affirme la motion, ou à un sujet voisin ?" }
  },
  levels: ["Absent", "Débutant", "En cours", "Acquis", "Excellent"],
  dec: ["Insuffisante", "À renforcer", "Intervention solide", "Intervention gagnante"],
  coach: ["Note en marge : commencez par annoncer votre position.", "Note en marge : le jury doit connaître votre position dès la première phrase.", "Note en marge : il manque une raison explicite (« parce que », « car », « donc »).", "Note en marge : il n'y a ni exemple ni donnée.", "Note en marge : montrez où le raisonnement de la motion échoue.", "Note en marge : il manque une phrase de conclusion.", "Note en marge : la structure est complète. Relisez-la et remettez-la."],
  mo_title: "Motion du jour", mo_practice: "Motion d'entraînement", mo_by: "Motion proposée par {a}", fictional: "(personnage fictif)",
  position: "Votre position", pos_for: "Pour", pos_against: "Contre", pos_nuanced: "Nuancée",
  written: "Intervention écrite", words_hint: "(entre 40 et 200 mots)", ph_text: "Mesdames et messieurs du jury : …", words_1: "1 mot", words_n: "{n} mots",
  peer_opt: "Jury de classe : une autre personne évalue l'intervention avant de voir le bulletin automatique", deliver: "Remettre l'intervention", rankup: "Nouvelle accréditation : {r}.",
  peer_title: "Jury de classe", peer_sub: "Passez l'appareil à la personne qui fera office de jury. Elle doit noter chaque critère avant de voir le bulletin automatique.",
  motion: "Motion", intervention: "Intervention ({v})", criterion: "Critère", scale_tip: "0 Absent · 1 Débutant · 2 En cours · 3 Acquis · 4 Excellent",
  peer_comment: "Commentaire du jury de classe", peer_comment_ph: "Un point fort et un point à améliorer.", open_ballot: "Ouvrir le bulletin automatique",
  but: "En revanche,", flaw_yes: "Vous avez repéré le sophisme de la motion.", flaw_no: "Vous n'avez pas nommé le sophisme caché dans la motion.",
  ballot_title: "Bulletin du jury", position_lbl: "Position", debater: "Débatteur", total: "Total", points: "Points", level: "Niveau",
  jury_comment: "Commentaire du jury", jury_question: "Question du jury", prev_avg: "Votre moyenne précédente : {n}/20.", first_motion: "C'est votre première motion.",
  xp_line: "+{n} pts.", xp_line_rep: "+{n} pts (réplique comprise).", fallacy: "Le sophisme de la motion", peer_vs: "Jury de classe vs bulletin automatique (0–4)",
  th_peer: "Jury de classe", th_auto_col: "Automatique", diff: "À discuter", same: "Concorde", comment_lbl: "Commentaire :",
  peer_disc: "Là où l'écart est de 2 points ou plus, discutez de qui a le mieux évalué.", your_int: "Votre intervention",
  reply: "Présenter une réplique", criteria_btn: "Critères de correction", copy_prompt: "Copier le prompt pour une IA", other_motion: "Une autre motion d'entraînement", dots_aria: "{v} sur 4",
  reply_title: "Réplique", reply_sub: "Vous avez une occasion de réécrire votre intervention. Répondez à la question du jury.", revised: "Intervention révisée",
  deliver_reply: "Remettre la réplique", back_ballot: "Retour au bulletin", reply_up: "La réplique fait passer la note de {a} à {b}/20. +15 pts", reply_same: "La réplique n'améliore pas la note. Le bulletin précédent est maintenu.",
  ai_prompt: `Agis comme membre du jury d'un débat scolaire pour des élèves du secondaire. Réponds en français.

MOTION : « {m} »

INTERVENTION DE L'ÉLÈVE : « {x} »

Note l'intervention de 0 à 4 pour chaque critère (0 absent, 4 excellent) et justifie brièvement :
1. Argumentation (raisons reliées par des connecteurs, conclusion qui en découle)
2. Preuves (exemples, données et sources pertinents)
3. Réfutation (identifie le piège ou le sophisme de la motion)
4. Clarté et structure (position explicite, phrases claires, conclusion)
5. Pertinence (répond exactement à ce que dit la motion)

Ensuite, rédige un bref commentaire de jury et pose une seule question qui aide l'élève à améliorer son intervention. Ne réécris pas l'intervention à sa place : guide-le pour qu'il l'améliore lui-même.`,
  sala_title: "Salle de débat", sala_sub: "Entraînez-vous à de vraies prises de parole avec chronomètre, micro et grille.", tab_t: "Format tournoi", tab_l: "Libre", tab_i: "Improvisé",
  topic: "Sujet du débat", topic_ph: "Ex. : Faut-il interdire les portables dans les établissements scolaires ?", stance: "Camp", mic_lang: "Langue du micro",
  ml_va: "Valencien / catalan", ml_es: "Espagnol", ml_en: "Anglais", ml_fr: "Français", start: "Commencer", prev_debates: "Débats précédents", clear_hist: "Effacer l'historique", no_topic: "Sans sujet",
  turns_tip: "Valeurs indicatives : adaptez les noms et les minutes au règlement de votre tournoi.", turn_name_aria: "Nom de la prise de parole {n}", minutes: "Minutes", min: "min", del_turn: "Supprimer la prise de parole",
  add_turn: "+ Ajouter une prise de parole", restore: "Rétablir les prises de parole par défaut", rounds: "Manches", secs: "Secondes par prise de parole",
  impro_tip: "Le sujet et le camp sont tirés au sort. Vous avez ensuite un temps de préparation, puis le débat commence avec les prises de parole du format tournoi.",
  prep_min: "Minutes de préparation", draw: "Tirer un sujet au sort", clear_confirm: "Effacer l'historique des débats ?",
  need_topic: "Écrivez un sujet (ou tirez-en un au sort en mode Improvisé).", need_turn: "Ajoutez au moins une prise de parole.", turn_n: "Prise de parole {n}",
  prep_title: "Préparation", plan: ["Définissez les mots clés.", "Remue-méninges pour et contre.", "Choisissez 2 ou 3 arguments, chacun avec une preuve.", "Préparez l'ouverture et la phrase finale."],
  team_notes: "Schéma de l'équipe…", start_debate: "Commencer le débat", cancel: "Annuler", prep_over: "Le temps de préparation est écoulé !",
  mission: "Mission de la prise de parole :", play: "▶ Démarrer", pause: "⏸ Pause", resume: "▶ Reprendre", reset: "↺ Réinitialiser", mic: "Micro", mic_title: "Transcription vocale",
  transcript_ph: "La transcription s'affichera ici. Vous pouvez aussi écrire ou noter des idées ci-dessous.", notes_ph: "Notes ou texte de la prise de parole…",
  rubric: "Grille (0–2)", comment: "Commentaire", comment_ph: "Points forts et points à améliorer…",
  presets: [["+ Thèse claire", "La thèse est claire dès le début. "], ["+ Sources", "Il faut mieux citer les sources des données. "], ["+ Réfutation", "Bonne réfutation ; renforcez-la avec une preuve. "], ["+ Tics", "Il faut réduire les tics de langage et faire plus de pauses. "]],
  save_next: "Enregistrer et passer à la suivante", save_end: "Enregistrer et terminer le débat", quit: "Quitter le débat",
  wpm: "{n} mots/min", wpm_t: "Entre 120 et 160, le rythme est confortable", crutches: "{n} tics de langage", crutches_t: "euh, ben, du coup, genre…",
  no_sr: "Votre navigateur ne permet pas la transcription vocale (essayez Chrome ou Edge). Vous pouvez écrire vos notes à la main.",
  mic_perm: "Il faut autoriser le micro (et ouvrir l'application en HTTPS).", mic_err: "Erreur du micro : {e}", mic_on: "Micro actif : vous pouvez parler.", mic_fail: "Impossible de démarrer le micro.",
  quit_confirm: "Quitter le débat ? Il ne sera pas enregistré.", acta_debate: "Procès-verbal du débat", grade10: "Note /10",
  sum_line_1: "{a} points sur {b} possibles en 1 prise de parole.", sum_line_n: "{a} points sur {b} possibles en {n} prises de parole.", practice_pts: "+{n} pts d'entraînement",
  th_turn: "Prise de parole", th_total: "Total", th_time: "Temps", export_txt: "Exporter (.txt)", new_debate: "Nouveau débat",
  exp_title: "ENTRAÎNEUR DE DÉBAT · Salle de débat", exp_date: "Date", exp_part: "Participant", exp_topic: "Sujet", exp_stance: "Camp", exp_grade: "Note finale (0-10)",
  exp_prep: "Schéma de préparation :", exp_rubric: "Grille", exp_time: "Temps : {a} sur {b}", exp_comment: "Commentaire", no_transcript: "(sans transcription)",
  info_title: "Mode d'emploi",
  info_html: `
    <div class="doc"><p class="doc-label">De quoi s'agit-il ?</p>
      <p>L'<b>Entraîneur de débat</b> est une application pour apprendre à argumenter, réfuter et parler en public au collège et au lycée. Elle est conçue comme une <b>saison de ligue de débat</b> : chaque séance est une journée, chaque jour propose une motion à laquelle répondre, et la progression se traduit en accréditations de débatteur.</p></div>
    <div class="doc"><p class="doc-label">Rubriques</p>
      <table class="table"><tbody>
        <tr><td><b>Accueil</b></td><td>Feuille de saison : ordre du jour, assiduité de la semaine, accréditation et tâche de classe.</td></tr>
        <tr><td><b>Calendrier</b></td><td>Sept blocs thématiques et leurs journées, disputées dans l'ordre à l'intérieur de chaque bloc. Chaque journée a une fiche, un règlement et des exercices variés, et se termine par un procès-verbal.</td></tr>
        <tr><td><b>Motion</b></td><td>Chaque jour, une affirmation qui cache un sophisme. Vous prenez position, rédigez votre intervention et recevez un bulletin du jury avec une note, un commentaire et une question pour progresser. Vous pouvez présenter une réplique.</td></tr>
        <tr><td><b>Salle</b></td><td>Simulation de débat avec prises de parole, chronomètre, micro, comptage des tics de langage et grille. Formats tournoi, libre et improvisé.</td></tr>
        <tr><td><b>Enseignant</b></td><td>Attribution de tâches par lien et import de la progression des élèves.</td></tr>
        <tr><td><b>Profil</b></td><td>Pseudonyme, statistiques, préférences, langue et export de la progression.</td></tr>
      </tbody></table></div>
    <div class="doc"><p class="doc-label">Notation</p>
      <ul class="tips">
        <li><b>Exercices des journées</b> : 10 points du premier coup, 5 au deuxième essai et 0 si l'on consulte la solution. À partir de la deuxième erreur apparaissent « Indice » et « Solution ».</li>
        <li><b>Révision espacée</b> : les exercices manqués reviennent 3 jours plus tard puis, s'ils sont réussis, 7 jours plus tard.</li>
        <li><b>Motion du jour</b> : de 0 à 4 sur cinq critères (total sur 20). La correction est automatique et indicative : ce n'est pas une IA et elle peut se tromper. D'où le jury de classe et le prompt pour IA.</li>
        <li><b>Accréditations</b> : les points accumulés font passer d'« Auditeur » à « Juge ». L'assiduité compte les jours d'entraînement consécutifs.</li>
      </ul></div>
    <div class="doc"><p class="doc-label">Vie privée</p>
      <p>Il n'y a ni comptes ni serveur. Tout est enregistré dans le navigateur de l'appareil et aucun texte n'est envoyé. Pour remettre leur progression, les élèves exportent un fichier avec un pseudonyme ou un numéro de liste.</p></div>
    <div class="doc"><p class="doc-label">Langues</p>
      <p>L'application fonctionne en valencien, espagnol, anglais et français. On change de langue depuis le menu latéral ou le Profil. La progression est conservée.</p></div>`,
  credits_label: "Crédits",
  credits_html: `<p>Application créée par <b>Sandra Fortanet</b> en collaboration avec <b>Claude</b> (Anthropic), à partir de sa propre analyse de ressources pour enseigner l'argumentation. Tous les textes, personnages et exercices sont originaux.</p>`
};

/* ---------- API ---------- */
let LANG = "va";
function t(key, vars) {
  let s = (UI[LANG] && UI[LANG][key] !== undefined) ? UI[LANG][key] : UI.va[key];
  if (s === undefined) return key;
  if (vars && typeof s === "string") s = s.replace(/\{(\w+)\}/g, (m, k) => vars[k] !== undefined ? vars[k] : m);
  return s;
}
function tn(key, n, vars) { return t(key + (n === 1 ? "_1" : "_n"), Object.assign({ n }, vars || {})); }
function langInfo() { return LANGS.find(l => l.id === LANG) || LANGS[0]; }

/* Fusió profunda de la traducció del contingut sobre la base valenciana. */
function deepMerge(base, over) {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) && Array.isArray(over)) {
    if (!base.length || typeof base[0] !== "object" || base.some(x => typeof x !== "object" || x === null)) {
      // arrays mixtos (parts de text) o de valors simples
      if (base.some(x => typeof x === "object" && x !== null)) return base.map((b, i) => (typeof b === "object" && b !== null) ? deepMerge(b, over[i]) : (over[i] !== undefined ? over[i] : b));
      return over.slice();
    }
    return base.map((b, i) => deepMerge(b, over[i]));
  }
  if (typeof base === "object" && base !== null && typeof over === "object") {
    const out = Array.isArray(base) ? [] : {};
    Object.keys(base).forEach(k => out[k] = deepMerge(base[k], over[k]));
    Object.keys(over).forEach(k => { if (!(k in base)) out[k] = over[k]; });
    return out;
  }
  return over;
}

function applyLang(id) {
  LANG = UI[id] ? id : "va";
  const base = CONTENT.va;
  const c = LANG === "va" ? base : {
    CAST: deepMerge(base.CAST, CONTENT[LANG].CAST),
    RANKS: deepMerge(base.RANKS, CONTENT[LANG].RANKS),
    UNITS: deepMerge(base.UNITS, CONTENT[LANG].UNITS),
    CLAIMS: deepMerge(base.CLAIMS, CONTENT[LANG].CLAIMS),
    TOPICS: CONTENT[LANG].TOPICS || base.TOPICS,
    IDEES: CONTENT[LANG].IDEES || base.IDEES,
    SALA_RUBRIC: deepMerge(base.SALA_RUBRIC, CONTENT[LANG].SALA_RUBRIC),
    DEFAULT_TURN_NAMES: CONTENT[LANG].DEFAULT_TURN_NAMES || base.DEFAULT_TURN_NAMES,
    TURN_MISSIONS: CONTENT[LANG].TURN_MISSIONS || base.TURN_MISSIONS
  };
  CAST = c.CAST; RANKS = c.RANKS; UNITS = c.UNITS; CLAIMS = c.CLAIMS; TOPICS = c.TOPICS; IDEES = c.IDEES;
  SALA_RUBRIC = c.SALA_RUBRIC; DEFAULT_TURN_NAMES = c.DEFAULT_TURN_NAMES; TURN_MISSIONS = c.TURN_MISSIONS;
  const d = DATES[LANG];
  WEEKDAYS_SHORT = d.short; WEEKDAYS_LONG = d.long; MONTHS = d.months;
  document.documentElement.lang = langInfo().html;
  document.title = t("app_name");
}
