# Entrenador de Debat

Aplicació web multilingüe (valencià, castellà, anglés i francés), plantejada com una temporada de lliga de debat, per a aprendre a argumentar, refutar i parlar en públic a l'ESO i al Batxillerat. Funciona sense servidor ni comptes: n'hi ha prou a obrir `index.html` o a publicar la carpeta en GitHub Pages. El progrés es guarda en el navegador de cada dispositiu (`localStorage`).

## Seccions

| Secció | Què fa |
|---|---|
| **Inici** | Full de temporada: ordre del dia (una jornada i la moció), assistència setmanal, credencial i punts, tasca de classe i frase per a la pissarra. |
| **Calendari** | Set blocs temàtics amb les jornades (lliçons) de la temporada, que es disputen en ordre dins de cada bloc. |
| **Moció** | Moció del dia: una afirmació amb una fal·làcia amagada. Prens posició, escrius la intervenció i reps una papereta del jurat (0–4 per criteri, total sobre 20), amb comentari i una pregunta per a millorar. |
| **Sala de debat** | Simulació de torns (format torneig, lliure o improvisat) amb cronòmetre, micròfon, estadístiques d'oratòria i rúbrica 0–2. |
| **Docent** | Assignació de tasques per enllaç, dies de sessió i importació dels fitxers de progrés de l'alumnat. |
| **Perfil** | Credencial, pseudònim, estadístiques, preferències, llengua i exportació del progrés. |
| **Com funciona** | Explicació de l'aplicació, criteris de correcció i crèdits, en la llengua triada. |

## Jornades

Cada jornada s'obri amb una **fitxa** i un **reglament** (conceptes clau en articles) i combina exercicis: transcripció d'una conversa, cara a cara entre dues intervencions, subratllat, taula de classificació, selecció múltiple, pregunta d'aprofundiment i esquema per peces.

- **Veredicte**: «Correcte» o «Revisa-ho». A partir del segon error apareixen «Pista» i «Resolució».
- **Punts**: 10 a la primera, 5 si cal repetir, 0 si es consulta la resolució.
- **Acta**: en acabar, una sola acta amb el resultat de cada exercici, la conclusió de la sessió amb la referència bibliogràfica, els exercicis per a revisar i la credencial. Es poden repetir les fallades en el moment.
- **Revisió espaiada**: els exercicis fallats tornen d'ací a 3 dies i, si s'encerten, d'ací a 7.

Contingut actual: 9 jornades en 7 blocs (Estructura de l'argument, Fal·làcies, Refutació, Oratòria i veu, Evidències i dades, Debat improvisat, Normativa i rols).

## Papereta de la Moció del dia

La puntuació la calcula un **corrector automàtic orientatiu i local**: no és una IA ni envia el text enlloc. Busca indicis en la intervenció (connectors, dades, marques de refutació, si s'identifica la fal·làcia, posició explícita, relació amb la moció) i els convertix en punts de 0 a 4 per criteri: Argumentació, Evidències, Refutació, Claredat i estructura, i Pertinència. Per a contrastar-la hi ha:

- **«Criteris de correcció»**, que explica el mètode;
- **jurat d'aula**: una altra persona puntua la intervenció amb la mateixa papereta abans de vore l'automàtica, i després es comparen;
- **rèplica**: es pot reescriure una vegada responent la pregunta del jurat;
- **«Copia el prompt per a una IA»**, amb la papereta completa per a l'assistent que tinga autoritzat el centre.

## Tasques de classe sense servidor

1. Al panell **Docent**, trieu grup, jornada i dies, i premeu «Genera l'enllaç».
2. Compartiu l'enllaç (Aules, Classroom, QR). En obrir-lo, la tasca apareix a l'Inici de l'alumne i la jornada queda oberta.
3. L'alumnat exporta el seu progrés des de **Perfil** (amb pseudònim o número de llista) i el lliura.
4. Al panell Docent, importeu tots els `.json` de colp per a vore una taula i descarregar-la en CSV.

## Llengües

La interfície i tot el contingut estan disponibles en **valencià, castellà, anglés i francés**. La llengua es tria al menú lateral, a l'Inici (en mòbil), a «Com funciona» o al Perfil; la primera vegada es detecta la del navegador. El progrés es manté en canviar de llengua.

- Textos de la interfície: `js/i18n.js`.
- Contingut base (valencià): `js/content.js`. Traduccions: `js/content.es.js`, `js/content.en.js` i `js/content.fr.js`, que només contenen els textos i es fusionen sobre l'estructura base (respostes, ordre i peces es definixen una sola vegada).
- El corrector de la Moció reconeix connectors i marques de refutació en les quatre llengües.

## Afegir contingut

Tot el contingut és a `js/content.js`. Cada jornada és un objecte amb `id`, `title`, `steps` i `rule`. Tipus de pas:

```js
{ type: "intro", title, hook, cast: ["nerea", "pau"] }
{ type: "concept", title, points: ["…", "…"] }
{ type: "chat", group, msgs: [{ who, text }], prompt, options, answer, why, hint }
{ type: "choice", prompt, options, answer, why, hint, level }
{ type: "vs", prompt, a, b, answer /* 0 o 1 */, why, hint }
{ type: "multi", prompt, options, answers: [0, 2], why, hint }
{ type: "tap", prompt, parts: ["text", { t: "fragment", ok: true }, …], why, hint }
{ type: "cards", prompt, labels: ["Columna 0", "Columna 1"], cards: [{ t, a }], why }  // taula de classificació
{ type: "build", prompt, slots: [{ label, accept: [índexs de chips] }], chips: [...], why, hint }
```

Les mocions (`CLAIMS`), els temes improvisats (`TOPICS`), les frases per a la pissarra (`IDEES`) i la rúbrica de la Sala (`SALA_RUBRIC`) són al mateix fitxer.

## Estructura

```
index.html      Esquelet i navegació
style.css       Identitat visual (mode clar/fosc, adaptat a mòbil)
js/content.js   Contingut (lliçons, reptes, temes, rúbriques)
js/store.js     Estat, dates, punts, assistència i revisió espaiada
js/lesson.js    Motor de jornades i acta
js/arena.js     Moció del dia i papereta
js/sala.js      Sala de debat
js/app.js       Rutes, Inici, Calendari, Docent i Perfil
```

## Notes

- La transcripció per veu usa l'API Web Speech: funciona en Chrome i Edge i necessita HTTPS (GitHub Pages ho complix).
- Les durades dels torns són orientatives: ajusteu-les a les bases del torneig.
- Tots els textos i personatges (Nerea, Pau, Aitana, Marc, la iaia Pepa, Vicent) són originals. La identitat visual s'inspira en els documents d'una lliga de debat (calendari, acta, papereta del jurat, credencial).

## Crèdits

Aplicació creada per **Sandra Fortanet** ([@sanforbel](https://github.com/sanforbel) · [sandrafortanet.netlify.app](https://sandrafortanet.netlify.app/)) en col·laboració amb **Claude** (Anthropic).

## Drets d'autor i llicència

© 2026 Sandra Fortanet. Llicència **[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ca)**: es pot usar i compartir sense modificacions, citant l'autoria i sense finalitats comercials. No es permeten obres derivades (modificacions, adaptacions ni traduccions). Si voleu adaptar-la o traduir-la, demaneu permís a l'autora. Vegeu [LICENSE.md](LICENSE.md).
