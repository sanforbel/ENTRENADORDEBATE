# Entrenador de Debat 🦇

Aplicació web per a aprendre a argumentar, refutar i parlar en públic a l'ESO i al Batxillerat. Funciona sense servidor ni comptes: n'hi ha prou a obrir `index.html` o a publicar la carpeta en GitHub Pages. El progrés es guarda en el navegador de cada dispositiu (`localStorage`).

## Seccions

| Secció | Què fa |
|---|---|
| **Inici** | Objectiu diari (una lliçó + el repte), ratxa setmanal, rang i XP, tasca de classe, repàs pendent i idea del dia. |
| **Itinerari** | Set unitats temàtiques amb camí de lliçons que es desbloquegen en ordre. |
| **Arena** | Repte del dia: una afirmació amb una trampa argumentativa amagada. Votes, escrius la resposta i reps una correcció per rúbrica (Lògica, Evidència, Refutació, Claredat, Rellevància). |
| **Sala de debat** | Simulació de torns (format torneig, lliure o improvisat) amb cronòmetre, micròfon, estadístiques d'oratòria i rúbrica 0–2. |
| **Docent** | Assignació de tasques per enllaç, dies de lliçó i importació dels fitxers de progrés de l'alumnat. |
| **Perfil** | Pseudònim, estadístiques, rangs, preferències i exportació del progrés. |

## Lliçons

Cada lliçó combina diferents tipus d'exercici: escena de xat, concepte clau, comparació «VS», tria de fragment, targetes ràpides amb combo, selecció múltiple, pregunta de nivell superior i construcció d'arguments per peces.

- **Ajuda escalonada**: en el primer error es pot tornar a provar; a partir del segon apareixen «Explica-m'ho» i «Mostra la solució».
- **Puntuació**: +10 XP a la primera, +5 si cal repetir, 0 si es mira la solució.
- **Tancament**: revenja de les preguntes fallades, resum, «La clau» amb referència bibliogràfica, «El que se t'ha resistit», rang i ratxa.
- **Repàs espaiat**: les preguntes fallades tornen d'ací a 3 dies i, si s'encerten, d'ací a 7.

Contingut actual: 9 lliçons i 67 pantalles, repartides en 7 unitats (Estructura de l'argument, Fal·làcies, Refutació, Oratòria i veu, Evidències i dades, Debat improvisat, Normativa i rols).

## Avaluació de l'Arena

L'avaluador és **orientatiu i local**: no és una IA ni envia el text enlloc. Busca indicis en la resposta (connectors, dades, marques de refutació, si detecta la trampa concreta, postura explícita, relació amb l'afirmació) i els tradueix a la rúbrica. Per això l'app ofereix:

- **«Com t'avalue?»**, que explica el mètode amb transparència;
- **mode coavaluació**, en què una companya o un company valora la resposta (1–4) abans de vore la correcció automàtica, i després es comparen;
- **«Copia el prompt per a una IA»**, amb la rúbrica completa per a usar-la amb l'assistent que tinga autoritzat el centre.

## Tasques de classe sense servidor

1. Al panell **Docent**, trieu grup, lliçó i dies, i premeu «Genera l'enllaç».
2. Compartiu l'enllaç (Aules, Classroom, QR). En obrir-lo, la tasca apareix a l'Inici de l'alumne i la lliçó queda desbloquejada.
3. L'alumnat exporta el seu progrés des de **Perfil** (amb pseudònim o número de llista) i el lliura.
4. Al panell Docent, importeu tots els `.json` de colp per a vore una taula i descarregar-la en CSV.

## Afegir contingut

Tot el contingut és a `js/content.js`. Cada lliçó és un objecte amb `id`, `title`, `steps` i `rule`. Tipus de pas:

```js
{ type: "intro", title, hook, cast: ["nerea", "pau"] }
{ type: "concept", title, points: ["…", "…"] }
{ type: "chat", group, msgs: [{ who, text }], prompt, options, answer, why, hint }
{ type: "choice", prompt, options, answer, why, hint, level }
{ type: "vs", prompt, a, b, answer /* 0 o 1 */, why, hint }
{ type: "multi", prompt, options, answers: [0, 2], why, hint }
{ type: "tap", prompt, parts: ["text", { t: "fragment", ok: true }, …], why, hint }
{ type: "cards", prompt, labels: ["Etiqueta 0", "Etiqueta 1"], cards: [{ t, a }], why }
{ type: "build", prompt, slots: [{ label, accept: [índexs de chips] }], chips: [...], why, hint }
```

Les afirmacions de l'Arena (`CLAIMS`), els temes improvisats (`TOPICS`), les idees del dia (`IDEES`) i la rúbrica de la Sala (`SALA_RUBRIC`) són al mateix fitxer.

## Estructura

```
index.html      Esquelet i navegació
style.css       Identitat visual (mode clar/fosc, adaptat a mòbil)
js/content.js   Contingut (lliçons, reptes, temes, rúbriques)
js/store.js     Estat, dates, XP, ratxa i repàs espaiat
js/lesson.js    Motor de lliçons
js/arena.js     Repte del dia i avaluador
js/sala.js      Sala de debat
js/app.js       Rutes, Inici, Itinerari, Docent i Perfil
```

## Notes

- La transcripció per veu usa l'API Web Speech: funciona en Chrome i Edge i necessita HTTPS (GitHub Pages ho complix).
- Les durades dels torns són orientatives: ajusteu-les a les bases del torneig.
- Tots els textos, personatges (Nerea, Pau, Aitana, Marc, la iaia Pepa, Vicent) i la mascota (Vera, la rata penada) són originals.
