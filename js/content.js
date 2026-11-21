/* Entrenador de Debat · Contingut original
   Tots els textos, personatges i exemples són propis.
   Format de cada pas d'una lliçó: vegeu README.md (secció «Afegir contingut»). */

const CAST = {
  nerea:  { name: "Nerea",     color: "#C2410C" },
  pau:    { name: "Pau",       color: "#1D4ED8" },
  aitana: { name: "Aitana",    color: "#7C3AED" },
  marc:   { name: "Marc",      color: "#0F766E" },
  pepa:   { name: "Iaia Pepa", color: "#BE123C" },
  vicent: { name: "Vicent",    color: "#4D7C0F" }
};

const RANKS = [
  { name: "Oient", xp: 0 },
  { name: "Debatent en pràctiques", xp: 120 },
  { name: "Debatent", xp: 320 },
  { name: "Orador/a titular", xp: 650 },
  { name: "Capità/ana d'equip", xp: 1100 },
  { name: "Jutge/essa", xp: 1700 }
];

const UNITS = [
  {
    id: "u1", title: "Estructura de l'argument", icon: "🧱", color: "#C2410C",
    lessons: [
      {
        id: "u1-l1", title: "Què és un argument?",
        steps: [
          { type: "intro", title: "Què és un argument?", hook: "Opinar és gratis. Argumentar costa una mica més… però convenç molt més.", cast: ["nerea", "pau"] },
          { type: "chat", group: "1r B",
            msgs: [
              { who: "pau", text: "El viatge de fi de curs ha de ser a un parc temàtic i punt." },
              { who: "nerea", text: "Jo vote pel Pirineu: ix més barat, ja que l'autobús i l'alberg costen uns 90 € i el parc passa de 200 €." }
            ],
            prompt: "Qui ha argumentat?",
            options: ["Pau", "Nerea", "Cap dels dos"], answer: 1,
            why: "Nerea dona una raó (el preu) que sosté la seua proposta. Pau només afirma i tanca la conversa amb «i punt».",
            hint: "Busca qui explica per què, no qui ho diu més fort." },
          { type: "concept", title: "Les peces d'un argument",
            points: [
              "<b>Conclusió</b>: el que vols que l'altra persona accepte.",
              "<b>Premisses</b>: les raons que la sostenen.",
              "<b>Connectors</b>: les paraules que lliguen les peces («perquè», «ja que», «per tant», «així que»)."
            ] },
          { type: "vs", prompt: "Quina frase argumenta de veritat?",
            a: "Els patis haurien de ser més llargs. Ho pensa tothom.",
            b: "Els patis haurien de ser més llargs, perquè després de descansar ens concentrem millor a classe.",
            answer: 1,
            why: "La B ofereix una raó relacionada amb la conclusió. La A només apel·la a «tothom», que no és cap raó.",
            hint: "Una de les dues explica per què; l'altra només diu qui ho pensa." },
          { type: "tap", prompt: "Toca la conclusió.",
            parts: [{ t: "He dormit cinc hores" }, " i ", { t: "demà tinc dos exàmens" }, ", així que ", { t: "hui no puc anar al partit", ok: true }, "."],
            why: "«Així que» introduïx la conclusió: el que es deduïx de les dues raons anteriors.",
            hint: "Fixa't en el connector «així que»: el que ve després sol ser la conclusió." },
          { type: "cards", prompt: "Argument o només afirmació?", labels: ["Només ho afirma", "Argument"],
            cards: [
              { t: "La pizza amb pinya és la millor del món.", a: 0 },
              { t: "Hauríem d'anar a peu a l'institut perquè està a deu minuts i estalviem gasolina.", a: 1 },
              { t: "El meu equip guanyarà la lliga.", a: 0 },
              { t: "Com que plou, la professora ha ajornat l'eixida al parc.", a: 1 },
              { t: "Les sèries d'ara són avorrides.", a: 0 },
              { t: "Cal reciclar l'oli usat, ja que un sol litre pot contaminar milers de litres d'aigua.", a: 1 }
            ],
            why: "Hi ha argument quan apareix almenys una raó que sosté la idea («perquè», «com que», «ja que»…)." },
          { type: "multi", prompt: "Conclusió: «Hauríem de tindre fonts d'aigua al pati.» Quines frases en serien premisses?",
            options: ["A l'estiu fa molta calor al pati.", "Les botelles de plàstic generen molts residus.", "El pati és de color gris.", "Beure aigua ajuda a mantindre l'atenció."],
            answers: [0, 1, 3],
            why: "Les tres sostenen la proposta (calor, residus, atenció). El color del pati no hi té cap relació.",
            hint: "Una premissa ha de donar una raó per a posar fonts. Quina frase no en dona cap?" },
          { type: "choice", level: "Aprofundiment", prompt: "«Tots els gats volen. El Misto és un gat. Per tant, el Misto vola.» Què li passa a este argument?",
            options: ["L'estructura és correcta, però una premissa és falsa.", "L'estructura és incorrecta.", "És un argument perfecte."],
            answer: 0,
            why: "Si les premisses foren certes, la conclusió se'n deduiria. El problema és la primera premissa: els gats no volen. Un argument pot estar ben construït i, tot i això, partir d'una dada falsa.",
            hint: "Separa dues preguntes: la forma està bé? Les dades són certes?" },
          { type: "build", prompt: "Construïx l'argument: toca les peces per a col·locar-les.",
            slots: [{ label: "Premissa 1", accept: [0, 1] }, { label: "Premissa 2", accept: [0, 1] }, { label: "Conclusió", accept: [2] }],
            chips: ["La biblioteca tanca a les 14 h.", "Molts alumnes només poden estudiar per la vesprada.", "Cal obrir la biblioteca per la vesprada.", "La biblioteca té molts llibres."],
            why: "Les dues primeres expliquen el problema; la tercera n'és la proposta. «Té molts llibres» és cert, però no sosté la conclusió.",
            hint: "Una de les frases és certa però no ajuda gens a defendre la proposta." }
        ],
        rule: { text: "Una opinió diu què penses. Un argument diu per què hauria de pensar-ho algú altre.", source: "A partir d'A. Weston, A Rulebook for Arguments (Hackett, 5a ed., 2017)." }
      },
      {
        id: "u1-l2", title: "Premisses amagades",
        steps: [
          { type: "intro", title: "Premisses amagades", hook: "Moltes vegades la raó més important és justament la que no es diu.", cast: ["marc", "aitana", "pepa"] },
          { type: "concept", title: "La raó invisible",
            points: [
              "<b>Premissa implícita</b>: una raó que l'argument necessita però que no diu.",
              "Detectar-la permet vore si l'argument s'aguanta de veritat.",
              "Truc: pregunta't <i>què hauria de ser cert perquè la conclusió seguisca?</i>"
            ] },
          { type: "chat", group: "Assaig de teatre",
            msgs: [
              { who: "marc", text: "Hui no vindré a l'assaig: tinc partit." },
              { who: "aitana", text: "D'acord…" }
            ],
            prompt: "Quina premissa amaga Marc?",
            options: ["Que el partit és més important que l'assaig.", "Que no sap el paper.", "Que l'assaig és avorrit."], answer: 0,
            why: "Perquè «tinc partit» justifique no anar a l'assaig, cal suposar que el partit té prioritat. Aitana podria discutir justament això.",
            hint: "Què ha de pensar Marc perquè «tinc partit» siga una bona excusa?" },
          { type: "choice", prompt: "«Este mòbil és el més car, així que és el millor.» Quina premissa amagada hi ha?",
            options: ["Com més car, millor.", "El mòbil és nou.", "Tots els mòbils són iguals."], answer: 0,
            why: "Quan traus a la llum la premissa («com més car, millor»), es veu de seguida que és discutible.",
            hint: "Quina idea connecta el preu amb la qualitat?" },
          { type: "vs", prompt: "Quin argument amaga una premissa més discutible?",
            a: "Plou; per tant, millor que agafes el paraigua.",
            b: "Té molts seguidors; per tant, sap de nutrició.",
            answer: 1,
            why: "En la A, la premissa amagada («el paraigua protegix de la pluja») és acceptable. En la B («qui té molts seguidors sap de nutrició») és molt dubtosa.",
            hint: "Escriu la premissa que falta en cada cas i pregunta't si te la creuries." },
          { type: "tap", prompt: "La iaia Pepa diu: «No et faces eixe tatuatge, que després no trobaràs faena.» Toca la premissa implícita més probable.",
            parts: ["Potser la iaia pensa que ", { t: "algunes empreses rebutgen gent amb tatuatges", ok: true }, ", o que ", { t: "els tatuatges fan mal" }, ", o bé que ", { t: "la tinta és cara" }, "."],
            why: "Només la primera connecta el tatuatge amb «no trobar faena». Les altres poden ser certes, però no sostenen eixa conclusió.",
            hint: "Busca la que lliga «tatuatge» amb «faena»." },
          { type: "multi", prompt: "«Has de vore esta sèrie: té cinc temporades.» Quines premisses amagades hi podria haver?",
            options: ["Una sèrie llarga és una sèrie bona.", "Si té tantes temporades, és perquè agrada al públic.", "Les sèries curtes no existixen.", "El protagonista és ros."],
            answers: [0, 1],
            why: "Les dues primeres connecten «cinc temporades» amb «l'has de vore». Les altres no tenen relació (o són falses).",
            hint: "N'hi ha dues de correctes." },
          { type: "build", prompt: "Fes explícita la premissa amagada.",
            slots: [{ label: "Premissa explícita", accept: [0] }, { label: "Premissa amagada", accept: [1] }, { label: "Conclusió", accept: [2] }],
            chips: ["Laia ha estudiat molt.", "Qui estudia molt aprova.", "Laia aprovarà.", "Laia té un estoig nou."],
            why: "Normalment diríem només «Laia ha estudiat molt, aprovarà». La premissa «qui estudia molt aprova» queda amagada… i és la que podríem discutir.",
            hint: "Quina idea general fa que «ha estudiat» porte a «aprovarà»?" }
        ],
        rule: { text: "Fes visible el que no es diu: és on solen amagar-se els punts febles d'un argument.", source: "Sobre l'entimema i les premisses implícites, vegeu D. Walton, Informal Logic: A Pragmatic Approach (Cambridge UP, 2a ed., 2008)." }
      }
    ]
  },
  {
    id: "u2", title: "Fal·làcies", icon: "🪤", color: "#7C3AED",
    lessons: [
      {
        id: "u2-l1", title: "Ataca la idea, no la persona",
        steps: [
          { type: "intro", title: "Ataca la idea, no la persona", hook: "Quan no pots rebatre una idea, és temptador atacar qui la diu. No caigues en el parany.", cast: ["aitana", "pau", "marc", "nerea"] },
          { type: "chat", group: "Consell d'alumnes",
            msgs: [
              { who: "aitana", text: "Propose fer un hort al pati: aprendríem ciències i menjaríem més verdura" },
              { who: "pau", text: "Ja, clar, tu que no saps ni regar un cactus" }
            ],
            prompt: "Què fa Pau?",
            options: ["Rebat la proposta.", "Ataca Aitana en lloc de la proposta.", "Aporta una dada."], answer: 1,
            why: "És un atac a la persona (ad hominem): desvia l'atenció cap a Aitana. Que regue bé o malament no diu res sobre si l'hort és bona idea.",
            hint: "Pau parla de l'hort o d'Aitana?" },
          { type: "concept", title: "Dues trampes clàssiques",
            points: [
              "<b>Atac a la persona</b> (ad hominem): criticar qui parla en lloc del que diu.",
              "<b>Home de palla</b>: deformar l'argument contrari perquè siga més fàcil de tombar.",
              "<b>Com respondre</b>: torna a la idea original («Això no respon la meua proposta, que és…»)."
            ] },
          { type: "vs", prompt: "Proposta: «Hauríem de reduir els deures del cap de setmana.» Quina resposta cau en l'home de palla?",
            a: "«Vols que no fem res i que no aprenguem mai!»",
            b: "«Si es reduïxen, potser no acabem el temari: com ho compensaríem?»",
            answer: 0,
            why: "La A deforma la proposta (reduir no és eliminar tot l'esforç). La B la discutix tal com és.",
            hint: "Quina resposta canvia el que s'ha proposat?" },
          { type: "cards", prompt: "Fal·làcia o crítica legítima?", labels: ["Fal·làcia", "Crítica legítima"],
            cards: [
              { t: "No faces cas del que diu sobre el canvi climàtic: va amb cotxe a tot arreu.", a: 0 },
              { t: "El seu estudi té una mostra de deu persones: és massa xicoteta per a generalitzar.", a: 1 },
              { t: "Com que és de primer, no té ni idea d'organitzar la festa.", a: 0 },
              { t: "Diu que el menjador és més car, però la quota és la mateixa que l'any passat.", a: 1 },
              { t: "Vols tancar el pati perquè odies que ens divertim.", a: 0 },
              { t: "La proposta no explica d'on eixiran els diners.", a: 1 }
            ],
            why: "Les crítiques legítimes apunten a l'argument (dades, mostra, costos). Les fal·làcies apunten a la persona o deformen el que ha dit." },
          { type: "tap", prompt: "Marc proposa limitar els mòbils a classe. Toca el fragment de la resposta de Nerea que és un atac personal.",
            parts: ["Nerea respon: ", { t: "«Marc sempre vol manar»", ok: true }, " i, a més, ", { t: "«els mòbils ens ajuden a buscar informació»" }, "."],
            why: "«Sempre vol manar» parla de Marc, no de la proposta. La segona part sí que és un argument (discutible, però sobre el tema).",
            hint: "Quin tros parla de Marc i no dels mòbils?" },
          { type: "choice", prompt: "Pau diu: «Aitana vol reduir el plàstic al menjador, però ella porta l'esmorzar en paper d'alumini.» Quina és la millor resposta d'Aitana?",
            options: ["«I tu què? Sempre arribes tard!»", "«Tens raó en això, però que jo no siga coherent no fa falsa la proposta: parlem dels residus del menjador.»", "«No pense parlar-ne més.»"],
            answer: 1,
            why: "Reconéixer el detall i reconduir cap a la idea és la resposta més sòlida davant d'un «i tu, què?» (tu quoque).",
            hint: "La millor resposta torna al tema sense atacar." },
          { type: "multi", prompt: "Proposta: «Les classes de reforç haurien de ser en línia.» Quines respostes rebaten la idea i no la persona?",
            options: ["«No tot l'alumnat té ordinador a casa.»", "«Ho dius perquè eres un gandul.»", "«En línia costa més preguntar dubtes.»", "«Tu sempre vols el més còmode.»"],
            answers: [0, 2],
            why: "Les respostes 1 i 3 parlen de la proposta (accés i interacció). Les altres dues ataquen qui la fa.",
            hint: "N'hi ha dues que parlen de les classes i dues que parlen de la persona." }
        ],
        rule: { text: "Ataca els arguments, mai les persones. I si deformes la idea de l'altre, només rebats un fantasma.", source: "Vegeu D. Walton, Ad Hominem Arguments (University of Alabama Press, 1998) i T. Govier, A Practical Study of Argument (Wadsworth, 7a ed., 2010)." }
      },
      {
        id: "u2-l2", title: "«Ho fa tothom»",
        steps: [
          { type: "intro", title: "«Ho fa tothom»", hook: "Que molta gent ho pense no ho fa cert. I quasi mai hi ha només dues opcions.", cast: ["nerea", "marc"] },
          { type: "concept", title: "Tres trampes de les majories i els extrems",
            points: [
              "<b>Apel·lació a la majoria</b> (ad populum): «és cert perquè ho pensa molta gent».",
              "<b>Falsa disjuntiva</b>: presentar dues opcions com si foren les úniques.",
              "<b>Generalització precipitada</b>: traure una regla general a partir de pocs casos."
            ] },
          { type: "chat", group: "Fi de curs",
            msgs: [
              { who: "nerea", text: "O anem tots d'excursió al riu o no fem res a final de curs." },
              { who: "marc", text: "Hi ha més opcions: una gimcana pel poble, un dia de jocs a l'institut…" }
            ],
            prompt: "Quina trampa detecta Marc?",
            options: ["Falsa disjuntiva", "Atac a la persona", "Apel·lació a la majoria"], answer: 0,
            why: "Nerea presenta només dues opcions (riu o res) quan n'hi ha moltes més.",
            hint: "Quantes opcions ofereix Nerea?" },
          { type: "cards", prompt: "Quina trampa és?", labels: ["Majoria", "Generalització"],
            cards: [
              { t: "Este canal té un milió de seguidors: segur que diu la veritat.", a: 0 },
              { t: "El meu cosí va estudiar a l'estranger i no va aprendre res: estudiar fora no servix.", a: 1 },
              { t: "Tota la classe ho ha compartit, així que deu ser veritat.", a: 0 },
              { t: "Dos alumnes de 2n han suspés: 2n és un curs desastrós.", a: 1 },
              { t: "Si ho fa tothom, no pot ser tan dolent.", a: 0 },
              { t: "Vaig provar un llibre digital i em va cansar la vista: els llibres digitals són dolents.", a: 1 }
            ],
            why: "La majoria usa la popularitat com a prova. La generalització trau una regla de molt pocs casos." },
          { type: "vs", prompt: "Quina frase evita la falsa disjuntiva?",
            a: "O prohibim els mòbils o acceptem que ningú estudie.",
            b: "Podríem prohibir-los, regular-ne l'ús o usar-los només en activitats concretes.",
            answer: 1,
            why: "La B obri el ventall d'opcions; la A planteja dos extrems com si no hi haguera res entremig.",
            hint: "Quina frase ofereix més de dues opcions?" },
          { type: "tap", prompt: "Toca la conclusió que generalitza massa.",
            parts: ["Marc escriu: «He preguntat a tres amics i ", { t: "a tots tres els agrada el reggaeton" }, ", així que ", { t: "a tot l'institut li agrada el reggaeton", ok: true }, ".»"],
            why: "Tres amics no representen tot l'institut: la mostra és minúscula i no aleatòria.",
            hint: "Quina part passa de «tres persones» a «tothom»?" },
          { type: "choice", level: "Aprofundiment", prompt: "Una enquesta a 1.200 alumnes triats a l'atzar diu que el 70 % preferix entrar més tard. Usar-la en un debat és una apel·lació a la majoria?",
            options: ["Sí, perquè es basa en el que pensa molta gent.", "No necessàriament: si la pregunta és què preferix l'alumnat, l'opinió majoritària és justament la dada rellevant.", "Sí: totes les enquestes són fal·làcies."],
            answer: 1,
            why: "La fal·làcia consistix a usar la popularitat com a prova de veritat. Ací no es diu que entrar tard siga «millor»: es mesura una preferència, i una mostra àmplia i aleatòria n'és una bona evidència.",
            hint: "Distingix entre «és cert perquè molts ho pensen» i «volem saber què pensen molts»." }
        ],
        rule: { text: "La quantitat de gent que creu una cosa no és una raó; la qualitat de les proves, sí.", source: "Classificació de fal·làcies informals d'I. M. Copi, C. Cohen i K. McMahon, Introduction to Logic (Pearson, 14a ed., 2014)." }
      }
    ]
  },
  {
    id: "u3", title: "Refutació", icon: "🛡️", color: "#0F766E",
    lessons: [
      {
        id: "u3-l1", title: "Refutar amb mètode: les 4 R",
        steps: [
          { type: "intro", title: "Refutar amb mètode", hook: "Refutar no és dir «no». És demostrar per què l'altre argument no s'aguanta.", cast: ["nerea", "aitana"] },
          { type: "concept", title: "Les 4 R de la refutació",
            points: [
              "<b>Reprén</b>: resumix amb justícia el que ha dit l'altre equip.",
              "<b>Rebat</b>: assenyala el punt feble (dada, premissa, conclusió…).",
              "<b>Raona</b>: aporta la teua raó o la teua prova.",
              "<b>Remata</b>: connecta-ho amb la teua postura."
            ] },
          { type: "chat", group: "Debat a classe",
            msgs: [
              { who: "aitana", text: "Els uniformes eliminen les diferències socials a l'institut." },
              { who: "nerea", text: "Diuen que l'uniforme elimina les diferències socials. Però les diferències es veuen igual en les sabatilles, el mòbil o la motxilla. Per tant, l'uniforme no resol el problema que diu resoldre." }
            ],
            prompt: "Quin pas fa Nerea quan diu «Diuen que l'uniforme elimina les diferències socials»?",
            options: ["Reprén", "Rebat", "Remata"], answer: 0,
            why: "Començar resumint l'argument contrari demostra que l'has escoltat i deixa clar què estàs rebatent.",
            hint: "Està dient la seua idea o la de l'altre equip?" },
          { type: "build", prompt: "Ordena la refutació amb les 4 R.",
            slots: [{ label: "Reprén", accept: [0] }, { label: "Rebat", accept: [1] }, { label: "Raona", accept: [2] }, { label: "Remata", accept: [3] }],
            chips: ["L'altre equip diu que els deures milloren les notes.", "Però confonen fer més hores amb aprendre més.", "Diverses investigacions troben que, a partir d'un cert temps diari, els deures deixen de millorar el rendiment.", "Per això defenem menys deures, però més ben pensats.", "Els deures són avorrits."],
            why: "Primer resumixes, després assenyales l'error, el demostres i tanques amb la teua postura. «Són avorrits» no refuta res.",
            hint: "Una peça sobra: no és una raó, és una opinió." },
          { type: "vs", prompt: "Argument contrari: «Cal ampliar el carril bici perquè augmentaria la seguretat.» Quina refutació és més forta?",
            a: "«No estem d'acord, i punt.»",
            b: "«Augmentaria la seguretat, sí, però si no es connecta amb les rutes que ja existixen, ningú no l'usarà: primer cal connectar-lo.»",
            answer: 1,
            why: "La B concedix una part i rebat amb una raó: és una refutació matisada, molt més difícil de tombar.",
            hint: "Quina dona una raó?" },
          { type: "cards", prompt: "Refuta o només contradiu?", labels: ["Refuta", "Només contradiu"],
            cards: [
              { t: "No és veritat.", a: 1 },
              { t: "Eixa dada és de fa quinze anys: la situació ha canviat molt des d'aleshores.", a: 0 },
              { t: "Doncs jo pense el contrari.", a: 1 },
              { t: "El seu exemple és un cas aïllat: no demostra cap tendència.", a: 0 },
              { t: "Això és ridícul.", a: 1 },
              { t: "Encara que fora cert, no explica per què la seua mesura seria la millor opció.", a: 0 }
            ],
            why: "Refutar exigix una raó (data, mostra, relació causal…). Contradir només nega." },
          { type: "multi", prompt: "Quines estratègies servixen per a rebatre una evidència?",
            options: ["Qüestionar si la font és fiable.", "Comprovar si la dada està actualitzada.", "Riure's de qui l'ha presentada.", "Mirar si la mostra és representativa."],
            answers: [0, 1, 3],
            why: "Font, actualitat i mostra són les tres preguntes clau davant de qualsevol dada. Riure's és un atac personal.",
            hint: "Totes menys una ataquen la dada, no la persona." }
        ],
        rule: { text: "Refutar bé és fer justícia a l'argument contrari abans de tombar-lo.", source: "Sobre les objeccions i les excepcions (rebuttals), vegeu S. Toulmin, The Uses of Argument (Cambridge UP, ed. actualitzada, 2003)." }
      }
    ]
  },
  {
    id: "u4", title: "Oratòria i veu", icon: "🎤", color: "#BE123C",
    lessons: [
      {
        id: "u4-l1", title: "El cos també parla",
        steps: [
          { type: "intro", title: "El cos també parla", hook: "Pots tindre el millor argument del món, però si ningú t'escolta, no servix.", cast: ["pau", "vicent"] },
          { type: "concept", title: "Tres eines de l'orador",
            points: [
              "<b>Mirada</b>: repartix-la per tota la sala, no la claves en el paper.",
              "<b>Veu</b>: varia el volum i el ritme; les pauses donen força.",
              "<b>Postura</b>: peus ferms, mans visibles i gestos que acompanyen el que dius."
            ] },
          { type: "cards", prompt: "Ajuda o resta?", labels: ["Ajuda", "Resta"],
            cards: [
              { t: "Fer una pausa just abans de la idea clau.", a: 0 },
              { t: "Llegir tot el discurs del paper.", a: 1 },
              { t: "Mirar diferents persones del públic.", a: 0 },
              { t: "Dir «eh…» cada dues frases.", a: 1 },
              { t: "Parlar molt de pressa per a dir-ho tot.", a: 1 },
              { t: "Baixar el volum en un moment concret per a crear expectació.", a: 0 }
            ],
            why: "Tot el que ajuda a connectar amb el públic (mirada, pauses, variació de veu) suma; el que el desconnecta (lectura, farciment, pressa) resta." },
          { type: "choice", prompt: "En mig del discurs t'adones que has dit una dada malament. Què és millor fer?",
            options: ["Fer com si res.", "Aturar-te, corregir-ho breument i continuar.", "Demanar perdó durant un minut."], answer: 1,
            why: "Una correcció breu demostra rigor i seguretat. Ignorar-ho et pot costar cara en la refutació contrària.",
            hint: "Pensa què faria algú amb seguretat i rigor." },
          { type: "vs", prompt: "Quin inici capta millor l'atenció?",
            a: "«Bon dia. Hui parlarem dels deures.»",
            b: "«Quantes hores vau dedicar ahir als deures? Hui vos demostrarem que més no sempre vol dir millor.»",
            answer: 1,
            why: "Una pregunta directa implica el públic i anuncia la tesi. La A és correcta, però no desperta cap interés.",
            hint: "Quin inici fa pensar el públic?" },
          { type: "tap", prompt: "Toca les crosses verbals (paraules de farciment).",
            parts: ["«Bona vesprada. ", { t: "Eh, bo, o siga,", ok: true }, " ", { t: "defenem que el pati ha de ser més llarg" }, " perquè ", { t: "descansar millora la concentració" }, ".»"],
            why: "Les crosses («eh», «bo», «o siga») resten seguretat. Substituïx-les per un silenci breu: sona molt millor.",
            hint: "Busca les paraules que no aporten cap contingut." },
          { type: "multi", prompt: "Quins recursos ajuden a controlar els nervis?",
            options: ["Respirar lentament abans d'eixir.", "Assajar en veu alta.", "Memoritzar paraula per paraula sense entendre-ho.", "Tindre una fitxa amb les idees clau."],
            answers: [0, 1, 3],
            why: "Respirar, assajar i portar un guió d'idees donen seguretat. Memoritzar sense entendre fa que et bloquejes si perds el fil.",
            hint: "Una de les opcions augmenta el risc de quedar-te en blanc." }
        ],
        rule: { text: "Una pausa ben posada val més que deu paraules de farciment.", source: "Vegeu C. Anderson, TED Talks: The Official TED Guide to Public Speaking (Houghton Mifflin Harcourt, 2016)." }
      }
    ]
  },
  {
    id: "u5", title: "Evidències i dades", icon: "📊", color: "#1D4ED8",
    lessons: [
      {
        id: "u5-l1", title: "Fonts fiables",
        steps: [
          { type: "intro", title: "Fonts fiables", hook: "Una dada sense font és només un rumor amb números.", cast: ["marc", "pepa"] },
          { type: "concept", title: "Tres preguntes davant d'una dada",
            points: [
              "<b>Qui ho diu?</b> Autoria, especialitat i interessos.",
              "<b>Quan?</b> Les dades caduquen.",
              "<b>Com ho sap?</b> Mètode, mostra i dades originals. I, si pots, contrasta-ho en una segona font independent."
            ] },
          { type: "cards", prompt: "Font fiable o dubtosa?", labels: ["Fiable", "Dubtosa"],
            cards: [
              { t: "Informe d'un organisme oficial d'estadística amb la metodologia publicada.", a: 0 },
              { t: "Captura d'un missatge sense autor ni data.", a: 1 },
              { t: "Article científic revisat per experts.", a: 0 },
              { t: "Vídeo d'algú que diu «m'ho ha contat un metge».", a: 1 },
              { t: "Notícia que cita l'estudi original i enllaça les dades.", a: 0 },
              { t: "Web que ven el producte que diu que és el millor.", a: 1 }
            ],
            why: "Una font és fiable quan sabem qui l'ha feta, com i quan, i no té interessos directes en el resultat." },
          { type: "choice", prompt: "En un debat, quina és la millor manera de citar una dada?",
            options: ["«Està demostrat.»", "«Segons [organisme], en un estudi de [any] amb [nombre] persones…»", "«Ho he vist a internet.»"], answer: 1,
            why: "Dir qui, quan i amb quina mostra permet que el jurat valore la dada… i que l'altre equip no la puga desmuntar fàcilment.",
            hint: "Quina opció respon les tres preguntes: qui, quan i com?" },
          { type: "vs", prompt: "Vols defendre que el soroll afecta la concentració. Quina evidència és més útil?",
            a: "«Molta gent diu que el soroll molesta.»",
            b: "«Un estudi va comparar els resultats d'alumnes en aules sorolloses i en aules silencioses.»",
            answer: 1,
            why: "La B compara situacions de manera sistemàtica. La A només recull impressions (i apel·la a la majoria).",
            hint: "Quina es basa en una comparació i no en impressions?" },
          { type: "tap", prompt: "Toca el punt feble de la font.",
            parts: ["«Segons ", { t: "un estudi que vaig llegir fa temps", ok: true }, ", ", { t: "el 80 % dels joves" }, " ", { t: "no llig mai" }, ".»"],
            why: "No sabem qui va fer l'estudi, quan ni com: és impossible comprovar-lo.",
            hint: "Quin tros no respon «qui, quan, com»?" },
          { type: "multi", prompt: "Abans d'usar una dada en un debat, què has de comprovar?",
            options: ["Qui l'ha publicada.", "De quan és.", "Si et dona la raó.", "Si altres fonts diuen el mateix."],
            answers: [0, 1, 3],
            why: "Que et done la raó no la fa més fiable: és justament quan més cal revisar-la (biaix de confirmació).",
            hint: "Hi ha una opció que és un parany: el biaix de confirmació." }
        ],
        rule: { text: "Abans de citar, pregunta't: qui ho diu, quan i com ho sap?", source: "Inspirat en la «lectura lateral» de S. Wineburg i S. McGrew (Stanford History Education Group, 2017)." }
      }
    ]
  },
  {
    id: "u6", title: "Debat improvisat", icon: "⏱️", color: "#A16207",
    lessons: [
      {
        id: "u6-l1", title: "15 minuts per a preparar",
        steps: [
          { type: "intro", title: "15 minuts per a preparar", hook: "No saps el tema fins a l'últim moment. Tens poc temps… però pots tindre un pla.", cast: ["aitana", "marc", "nerea"] },
          { type: "concept", title: "Un pla en quatre passos",
            points: [
              "<b>1. Definix</b> el tema: què vol dir cada paraula clau?",
              "<b>2. Pluja d'idees</b> a favor i en contra (també de la postura contrària!).",
              "<b>3. Tria</b> 2 o 3 arguments forts i assigna una evidència a cadascun.",
              "<b>4. Prepara</b> l'obertura i una frase final."
            ] },
          { type: "choice", prompt: "Tema: «Cal prohibir els deures a primària?» Què feu primer?",
            options: ["Escriure el discurs complet.", "Definir què entenem per «deures» i per «prohibir».", "Buscar un acudit per a començar."], answer: 1,
            why: "Si no definiu els termes, podeu acabar defenent una cosa diferent de la que discutix l'altre equip.",
            hint: "Abans de discutir, cal saber de què parlem exactament." },
          { type: "cards", prompt: "Aprofita els 15 minuts o perd el temps?", labels: ["Aprofita", "Perd temps"],
            cards: [
              { t: "Repartir l'equip: qui busca dades i qui prepara la refutació.", a: 0 },
              { t: "Discutir deu minuts si el tema és just.", a: 1 },
              { t: "Anticipar els dos arguments més probables de l'altre equip.", a: 0 },
              { t: "Redactar la introducció paraula per paraula.", a: 1 },
              { t: "Apuntar les idees en esquemes curts.", a: 0 }
            ],
            why: "Amb poc temps, cal repartir tasques, anticipar i esquematitzar. Redactar-ho tot o queixar-se del tema consumix minuts preciosos." },
          { type: "multi", prompt: "Tema: «L'institut hauria de començar a les 9.00 en lloc de les 8.00?» Quins arguments són a favor?",
            options: ["Els adolescents tendixen a dormir més tard.", "Es complicaria l'horari del transport escolar.", "L'atenció a primera hora podria millorar.", "Les famílies que treballen prompte ho tindrien més difícil."],
            answers: [0, 2],
            why: "1 i 3 donen suport al canvi. 2 i 4 són arguments en contra… que també t'interessa tindre preparats per a refutar-los!",
            hint: "Dos són a favor i dos en contra." },
          { type: "vs", prompt: "Quin esquema de preparació és més útil?",
            a: "Una llista de dotze idees sense cap ordre.",
            b: "Tres arguments, cadascun amb una evidència i una possible objecció.",
            answer: 1,
            why: "Menys idees però ben construïdes i amb la refutació anticipada: això és el que puntua.",
            hint: "Qualitat o quantitat?" },
          { type: "build", prompt: "Ordena els passos de la preparació.",
            slots: [{ label: "Pas 1", accept: [0] }, { label: "Pas 2", accept: [1] }, { label: "Pas 3", accept: [2] }, { label: "Pas 4", accept: [3] }],
            chips: ["Definir les paraules clau.", "Fer una pluja d'idees a favor i en contra.", "Triar els arguments més forts.", "Preparar l'obertura i el tancament.", "Escriure el discurs sencer."],
            why: "Definir → generar idees → seleccionar → preparar inici i final. Escriure-ho tot no cap en 15 minuts.",
            hint: "Una peça sobra." }
        ],
        rule: { text: "En un debat improvisat no guanya qui més idees té, sinó qui millor les tria i les ordena.", source: "Pràctica habitual en les lligues escolars de debat. Prova-ho en el mode «Improvisat» de la Sala de debat." }
      }
    ]
  },
  {
    id: "u7", title: "Normativa i rols", icon: "⚖️", color: "#4D7C0F",
    lessons: [
      {
        id: "u7-l1", title: "Qui fa què en un debat",
        steps: [
          { type: "intro", title: "Qui fa què en un debat", hook: "Cada torn té una missió. Si la confons, perds punts encara que parles molt bé.", cast: ["pau", "vicent"] },
          { type: "concept", title: "Tres torns, tres missions",
            points: [
              "<b>Exposició inicial</b>: presenta la postura, definix el tema i anuncia la línia argumental.",
              "<b>Refutació</b>: respon els arguments contraris i reforça els propis.",
              "<b>Conclusió</b>: sintetitza el debat i mostra per què heu guanyat. Res d'arguments nous!"
            ] },
          { type: "cards", prompt: "Exposició inicial o conclusió?", labels: ["Exposició inicial", "Conclusió"],
            cards: [
              { t: "«Hui defendrem tres idees…»", a: 0 },
              { t: "«Al llarg del debat hem demostrat que…»", a: 1 },
              { t: "«Entenem per “xarxes socials” les plataformes on…»", a: 0 },
              { t: "«L'altre equip no ha respost el nostre segon argument; per tant…»", a: 1 },
              { t: "«La nostra línia argumental se centra en…»", a: 0 }
            ],
            why: "L'exposició anuncia i definix; la conclusió fa balanç del que ha passat en el debat." },
          { type: "choice", prompt: "En la conclusió, una oradora presenta una dada nova que no havia eixit abans. Què passa?",
            options: ["És una bona estratègia sorpresa.", "Normalment es penalitza: la conclusió no ha d'introduir arguments nous.", "No té cap importància."], answer: 1,
            why: "L'altre equip ja no pot respondre-la. Per això la majoria de bases ho penalitzen. Consulta sempre les del teu torneig.",
            hint: "Pot respondre l'altre equip a eixa dada?" },
          { type: "vs", prompt: "Quina frase és típica de la refutació?",
            a: "«Han dit que la mesura és cara, però no han tingut en compte l'estalvi a llarg termini.»",
            b: "«Bon dia, membres del jurat: hui defendrem la postura a favor.»",
            answer: 0,
            why: "La A respon directament a un argument contrari. La B és una obertura d'exposició inicial.",
            hint: "Quina respon a l'altre equip?" },
          { type: "multi", prompt: "Què sol valorar un jurat de debat?",
            options: ["La solidesa dels arguments.", "La qualitat de les evidències.", "Qui parla més fort.", "La capacitat de refutar i de respondre."],
            answers: [0, 1, 3],
            why: "La veu compta en la mesura que comunica bé, però cridar més no puntua. Revisa la rúbrica oficial del teu torneig.",
            hint: "Una de les opcions no té res a vore amb la qualitat del debat." },
          { type: "tap", prompt: "Toca el que Pau no hauria de dir en una conclusió.",
            parts: ["«", { t: "Hem demostrat que l'horari actual perjudica el descans." }, " ", { t: "A més, vos portem una dada nova que encara no hem dit.", ok: true }, " ", { t: "Per això, vos demanem el vot." }, "»"],
            why: "Introduir dades noves en la conclusió és el clàssic error de rol: l'altre equip no les pot rebatre.",
            hint: "Recorda: res d'arguments nous en la conclusió." }
        ],
        rule: { text: "Cada torn, una missió: exposar, refutar o concloure. No les barreges.", source: "Estructura general dels debats acadèmics escolars. Consulta sempre les bases oficials del torneig en què participes." }
      }
    ]
  }
];

/* Mocions del dia: cadascuna amaga una trampa argumentativa. */
const CLAIMS = [
  { id: "c1", author: "Rubèn, 4t ESO", text: "Des que tenim pissarres digitals han baixat les notes de matemàtiques. Les pissarres digitals fan que aprenguem menys.",
    flaw: "Correlació no implica causalitat", flawKeys: ["causa", "correlaci", "coincid", "altres factors", "no implica", "no vol dir", "pot ser", "altres raons", "no demostra"],
    explain: "Que dues coses passen alhora no vol dir que una cause l'altra. Les notes poden haver baixat per molts altres factors (temari, professorat, horaris…)." },
  { id: "c2", author: "Lídia, 3r ESO", text: "La meua veïna va deixar els estudis i ara guanya molts diners amb un canal de vídeos. Estudiar no servix per a res.",
    flaw: "Generalització precipitada", flawKeys: ["un cas", "un sol cas", "generalitz", "excepci", "la majoria", "dades", "aillat", "tothom"],
    explain: "Un sol cas (i excepcional) no permet traure una regla general. Caldrien dades sobre què passa a la majoria de persones." },
  { id: "c3", author: "Joel, 2n ESO", text: "Si deixem portar gorra a classe, prompte vindrem en pijama i acabarem sense cap norma.",
    flaw: "Pendent relliscós", flawKeys: ["relliscos", "no te per que", "exager", "consequenc", "pas", "no porta", "no implica", "salt"],
    explain: "Es dona per fet, sense proves, que un primer pas portarà inevitablement a una cadena de conseqüències extremes." },
  { id: "c4", author: "Marta, 1r Batxillerat", text: "Este refresc l'anuncia el futbolista més famós del món, així que deu ser sa.",
    flaw: "Autoritat irrellevant", flawKeys: ["autoritat", "expert", "futbolista", "no es metge", "nutrici", "publicitat", "li paguen", "no sap"],
    explain: "Ser expert en futbol no fa algú expert en nutrició. A més, cobra per anunciar-lo." },
  { id: "c5", author: "Iker, 4t ESO", text: "O ens deixen el mòbil a classe o tornem a l'edat mitjana.",
    flaw: "Falsa disjuntiva", flawKeys: ["opcions", "alternativ", "terme mitja", "dues", "regular", "extrem", "entremig"],
    explain: "Es presenten dos extrems com si foren les úniques opcions, quan hi ha moltes possibilitats intermèdies (usos regulats, activitats concretes…)." },
  { id: "c6", author: "Sara, 3r ESO", text: "Milions de persones veuen eixe programa cada nit; per tant, és un bon programa.",
    flaw: "Apel·lació a la majoria", flawKeys: ["majoria", "popular", "molta gent", "audiencia", "no vol dir", "qualitat", "milions"],
    explain: "Que siga popular no demostra que siga bo: l'audiència mesura l'èxit, no la qualitat." },
  { id: "c7", author: "Hugo, 1r Batxillerat", text: "No cal fer cas de la proposta del consell d'alumnes sobre el menjador: només són xiquets de quinze anys.",
    flaw: "Atac a la persona", flawKeys: ["persona", "edat", "ad hominem", "proposta", "idea", "arguments", "no importa qui"],
    explain: "Es descarta la proposta per l'edat de qui la fa, sense examinar-ne el contingut." },
  { id: "c8", author: "Noa, 4t ESO", text: "Els videojocs són violents i per això els joves d'ara són més agressius que mai.",
    flaw: "Premissa dubtosa i causalitat sense provar", flawKeys: ["no tots", "dades", "mes agressius", "causa", "demostr", "generalitz", "estudis", "que mai"],
    explain: "Generalitza (no tots els videojocs són violents), dona per fet que els joves són «més agressius que mai» sense dades i, a més, atribuïx la causa sense provar-la." },
  { id: "c9", author: "Àlex, 2n ESO", text: "Ningú ha demostrat que la telepatia no existisca; per tant, existix.",
    flaw: "Apel·lació a la ignorància", flawKeys: ["ignoranc", "carrega de la prova", "demostrar", "no demostra", "proves", "qui afirma"],
    explain: "Que no s'haja demostrat una cosa no prova la contrària. La càrrega de la prova és de qui afirma." },
  { id: "c10", author: "Clara, 3r ESO", text: "Sempre s'ha fet l'excursió de final de curs a la platja; no té sentit canviar-ho.",
    flaw: "Apel·lació a la tradició", flawKeys: ["tradici", "sempre", "costum", "no vol dir", "millor", "canviar"],
    explain: "Que una cosa s'haja fet sempre així no demostra que siga la millor opció." },
  { id: "c11", author: "Dani, 4t ESO", text: "Els que volen reduir els deures, en realitat, el que volen és no estudiar mai.",
    flaw: "Home de palla", flawKeys: ["deform", "home de palla", "no han dit", "reduir no", "exager", "tergivers", "eliminar"],
    explain: "Es deforma la postura contrària (reduir ≠ eliminar l'estudi) per a fer-la més fàcil d'atacar." },
  { id: "c12", author: "Laia, 1r Batxillerat", text: "Si un producte és natural, és bo per a la salut.",
    flaw: "Apel·lació a la naturalesa", flawKeys: ["natural", "veri", "verí", "bolets", "no vol dir", "toxic", "toxics", "no tot"],
    explain: "Hi ha moltes substàncies naturals perjudicials (alguns bolets, verins…). «Natural» no equival a «sa»." },
  { id: "c13", author: "Pol, 2n ESO", text: "Vaig portar la samarreta blava a l'examen i vaig aprovar: és la meua samarreta de la sort.",
    flaw: "Post hoc (després, per tant per això)", flawKeys: ["casualitat", "coincid", "causa", "estudiar", "post hoc", "no implica", "despres"],
    explain: "Que l'aprovat vinguera després de portar la samarreta no vol dir que la samarreta en siga la causa." },
  { id: "c14", author: "Irene, 4t ESO", text: "Hem gastat tant en la festa de final de curs que ara no podem cancel·lar-la, encara que ploga.",
    flaw: "Cost enfonsat", flawKeys: ["gastat", "ja esta", "cost", "recuperar", "futur", "decidir", "independent"],
    explain: "Els diners ja gastats no es recuperen continuant. La decisió hauria de dependre del que convé ara i en el futur." }
];

/* Temes per al mode Improvisat de la Sala de debat. */
const TOPICS = [
  "Cal prohibir els mòbils als centres educatius?",
  "Hauria de ser obligatori aprendre a programar a l'ESO?",
  "Els videojocs haurien de considerar-se un esport?",
  "Haurien de ser gratuïts els menjadors escolars?",
  "Hauria d'estar permesa la intel·ligència artificial per a fer deures?",
  "Cal baixar l'edat per a votar als 16 anys?",
  "Els uniformes escolars haurien de ser obligatoris?",
  "Cal prohibir els vehicles privats als centres de les ciutats?",
  "Les xarxes socials fan més mal que bé als adolescents?",
  "Haurien de desaparéixer els exàmens tradicionals?",
  "Cal limitar el turisme a les ciutats valencianes?",
  "Hauria de ser obligatori el servei comunitari per a l'alumnat?",
  "Haurien de necessitar una titulació els creadors de contingut que parlen de salut?",
  "La setmana escolar hauria de ser de quatre dies?",
  "Cal prohibir la publicitat de menjar ràpid en horari infantil?",
  "Els deures haurien de ser opcionals?",
  "Cal que l'institut comence a les 9.00?",
  "Les notes numèriques haurien de substituir-se per informes descriptius?",
  "Hauria de ser obligatori estudiar dues llengües estrangeres?",
  "Cal posar un límit d'edat per a tindre xarxes socials?"
];

/* Frase per a la pissarra: màximes pròpies. */
const IDEES = [
  "Guanyar una discussió no és el mateix que tindre raó.",
  "Si només coneixes els teus arguments, encara no coneixes el tema.",
  "Una bona pregunta desmunta més que un crit.",
  "Abans de compartir-ho, pregunta't: qui ho diu i com ho sap?",
  "Canviar d'opinió davant d'una bona prova no és perdre: és aprendre.",
  "El silenci d'una pausa també és part del discurs.",
  "Una dada sense font és un rumor amb números.",
  "Refutar és respondre la millor versió de l'argument contrari.",
  "Si no pots explicar-ho breument, encara no ho tens clar.",
  "Escoltar bé és la meitat de saber respondre."
];

/* Criteris de la rúbrica de la Sala de debat (0–2). */
const SALA_RUBRIC = [
  { id: "tesi", title: "Tesi i postura", desc: "La postura s'entén des del principi i es manté." },
  { id: "estructura", title: "Arguments i estructura", desc: "Arguments clars, ordenats i connectats." },
  { id: "evidencia", title: "Evidències", desc: "Dades, exemples o fonts pertinents i citades." },
  { id: "refutacio", title: "Refutació", desc: "Respon o anticipa els arguments contraris." },
  { id: "oratoria", title: "Oratòria", desc: "Veu, ritme, mirada i llenguatge corporal." },
  { id: "temps", title: "Gestió del temps", desc: "Aprofita el torn sense passar-se'n." }
];

const TURN_MISSIONS = {
  "Exposició inicial": "Presenta la postura, definix els termes clau i anuncia la línia argumental.",
  "Refutació 1": "Respon els arguments principals de l'altre equip i reforça els vostres.",
  "Refutació 2": "Aprofundix en la refutació i tanca els fronts oberts.",
  "Conclusió": "Sintetitza el debat i explica per què heu guanyat. Cap argument nou."
};
