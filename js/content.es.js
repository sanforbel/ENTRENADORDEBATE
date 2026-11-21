/* Traducción al castellano del contenido (se fusiona sobre la base valenciana). */
CONTENT.es = {
  CAST: { pepa: { name: "la abuela Pepa" } },
  RANKS: [{ name: "Oyente" }, { name: "Debatiente en prácticas" }, { name: "Debatiente" }, { name: "Orador/a titular" }, { name: "Capitán/capitana de equipo" }, { name: "Juez/jueza" }],
  UNITS: [
    { title: "Estructura del argumento", lessons: [
      { title: "¿Qué es un argumento?", steps: [
        { title: "¿Qué es un argumento?", hook: "Opinar es gratis. Argumentar cuesta un poco más… pero convence mucho más." },
        { group: "1.º B", msgs: [{ text: "El viaje de fin de curso tiene que ser a un parque temático y punto." }, { text: "Yo voto por el Pirineo: sale más barato, ya que el autobús y el albergue cuestan unos 90 € y el parque pasa de 200 €." }],
          prompt: "¿Quién ha argumentado?", options: ["Pau", "Nerea", "Ninguno de los dos"],
          why: "Nerea da una razón (el precio) que sostiene su propuesta. Pau solo afirma y cierra la conversación con «y punto».", hint: "Busca quién explica por qué, no quién lo dice más fuerte." },
        { title: "Las piezas de un argumento", points: ["<b>Conclusión</b>: lo que quieres que la otra persona acepte.", "<b>Premisas</b>: las razones que la sostienen.", "<b>Conectores</b>: las palabras que unen las piezas («porque», «ya que», «por tanto», «así que»)."] },
        { prompt: "¿Qué frase argumenta de verdad?", a: "Los recreos deberían ser más largos. Lo piensa todo el mundo.", b: "Los recreos deberían ser más largos, porque después de descansar nos concentramos mejor en clase.",
          why: "La B ofrece una razón relacionada con la conclusión. La A solo apela a «todo el mundo», que no es ninguna razón.", hint: "Una de las dos explica por qué; la otra solo dice quién lo piensa." },
        { prompt: "Toca la conclusión.", parts: [{ t: "He dormido cinco horas" }, " y ", { t: "mañana tengo dos exámenes" }, ", así que ", { t: "hoy no puedo ir al partido" }, "."],
          why: "«Así que» introduce la conclusión: lo que se deduce de las dos razones anteriores.", hint: "Fíjate en el conector «así que»: lo que viene después suele ser la conclusión." },
        { prompt: "¿Argumento o solo afirmación?", labels: ["Solo lo afirma", "Argumento"],
          cards: [{ t: "La pizza con piña es la mejor del mundo." }, { t: "Deberíamos ir a pie al instituto porque está a diez minutos y ahorramos gasolina." }, { t: "Mi equipo ganará la liga." }, { t: "Como llueve, la profesora ha aplazado la salida al parque." }, { t: "Las series de ahora son aburridas." }, { t: "Hay que reciclar el aceite usado, ya que un solo litro puede contaminar miles de litros de agua." }],
          why: "Hay argumento cuando aparece al menos una razón que sostiene la idea («porque», «como», «ya que»…)." },
        { prompt: "Conclusión: «Deberíamos tener fuentes de agua en el patio.» ¿Qué frases serían premisas?",
          options: ["En verano hace mucho calor en el patio.", "Las botellas de plástico generan muchos residuos.", "El patio es de color gris.", "Beber agua ayuda a mantener la atención."],
          why: "Las tres sostienen la propuesta (calor, residuos, atención). El color del patio no tiene ninguna relación.", hint: "Una premisa tiene que dar una razón para poner fuentes. ¿Qué frase no da ninguna?" },
        { level: "Profundización", prompt: "«Todos los gatos vuelan. Misto es un gato. Por tanto, Misto vuela.» ¿Qué le pasa a este argumento?",
          options: ["La estructura es correcta, pero una premisa es falsa.", "La estructura es incorrecta.", "Es un argumento perfecto."],
          why: "Si las premisas fueran ciertas, la conclusión se deduciría. El problema es la primera premisa: los gatos no vuelan. Un argumento puede estar bien construido y, aun así, partir de un dato falso.", hint: "Separa dos preguntas: ¿la forma está bien? ¿Los datos son ciertos?" },
        { prompt: "Construye el argumento: toca las piezas para colocarlas.", slots: [{ label: "Premisa 1" }, { label: "Premisa 2" }, { label: "Conclusión" }],
          chips: ["La biblioteca cierra a las 14 h.", "Muchos alumnos solo pueden estudiar por la tarde.", "Hay que abrir la biblioteca por la tarde.", "La biblioteca tiene muchos libros."],
          why: "Las dos primeras explican el problema; la tercera es la propuesta. «Tiene muchos libros» es cierto, pero no sostiene la conclusión.", hint: "Una de las frases es cierta pero no ayuda nada a defender la propuesta." }
      ], rule: { text: "Una opinión dice qué piensas. Un argumento dice por qué debería pensarlo otra persona.", source: "A partir de A. Weston, A Rulebook for Arguments (Hackett, 5.ª ed., 2017)." } },
      { title: "Premisas ocultas", steps: [
        { title: "Premisas ocultas", hook: "Muchas veces la razón más importante es justamente la que no se dice." },
        { title: "La razón invisible", points: ["<b>Premisa implícita</b>: una razón que el argumento necesita pero que no dice.", "Detectarla permite ver si el argumento se sostiene de verdad.", "Truco: pregúntate <i>¿qué tendría que ser cierto para que la conclusión se siga?</i>"] },
        { group: "Ensayo de teatro", msgs: [{ text: "Hoy no vendré al ensayo: tengo partido." }, { text: "Vale…" }],
          prompt: "¿Qué premisa oculta Marc?", options: ["Que el partido es más importante que el ensayo.", "Que no se sabe el papel.", "Que el ensayo es aburrido."],
          why: "Para que «tengo partido» justifique no ir al ensayo, hay que suponer que el partido tiene prioridad. Aitana podría discutir justamente eso.", hint: "¿Qué tiene que pensar Marc para que «tengo partido» sea una buena excusa?" },
        { prompt: "«Este móvil es el más caro, así que es el mejor.» ¿Qué premisa oculta hay?", options: ["Cuanto más caro, mejor.", "El móvil es nuevo.", "Todos los móviles son iguales."],
          why: "Cuando sacas a la luz la premisa («cuanto más caro, mejor»), se ve enseguida que es discutible.", hint: "¿Qué idea conecta el precio con la calidad?" },
        { prompt: "¿Qué argumento oculta una premisa más discutible?", a: "Llueve; por tanto, mejor que cojas el paraguas.", b: "Tiene muchos seguidores; por tanto, sabe de nutrición.",
          why: "En la A, la premisa oculta («el paraguas protege de la lluvia») es aceptable. En la B («quien tiene muchos seguidores sabe de nutrición») es muy dudosa.", hint: "Escribe la premisa que falta en cada caso y pregúntate si te la creerías." },
        { prompt: "La abuela Pepa dice: «No te hagas ese tatuaje, que después no encontrarás trabajo.» Toca la premisa implícita más probable.",
          parts: ["Quizá la abuela piensa que ", { t: "algunas empresas rechazan a gente con tatuajes" }, ", o que ", { t: "los tatuajes duelen" }, ", o bien que ", { t: "la tinta es cara" }, "."],
          why: "Solo la primera conecta el tatuaje con «no encontrar trabajo». Las otras pueden ser ciertas, pero no sostienen esa conclusión.", hint: "Busca la que une «tatuaje» con «trabajo»." },
        { prompt: "«Tienes que ver esta serie: tiene cinco temporadas.» ¿Qué premisas ocultas podría haber?",
          options: ["Una serie larga es una serie buena.", "Si tiene tantas temporadas, es porque gusta al público.", "Las series cortas no existen.", "El protagonista es rubio."],
          why: "Las dos primeras conectan «cinco temporadas» con «tienes que verla». Las otras no tienen relación (o son falsas).", hint: "Hay dos correctas." },
        { prompt: "Haz explícita la premisa oculta.", slots: [{ label: "Premisa explícita" }, { label: "Premisa oculta" }, { label: "Conclusión" }],
          chips: ["Laia ha estudiado mucho.", "Quien estudia mucho aprueba.", "Laia aprobará.", "Laia tiene un estuche nuevo."],
          why: "Normalmente diríamos solo «Laia ha estudiado mucho, aprobará». La premisa «quien estudia mucho aprueba» queda oculta… y es la que podríamos discutir.", hint: "¿Qué idea general hace que «ha estudiado» lleve a «aprobará»?" }
      ], rule: { text: "Haz visible lo que no se dice: ahí suelen esconderse los puntos débiles de un argumento.", source: "Sobre el entimema y las premisas implícitas, véase D. Walton, Informal Logic: A Pragmatic Approach (Cambridge UP, 2.ª ed., 2008)." } }
    ] },
    { title: "Falacias", lessons: [
      { title: "Ataca la idea, no a la persona", steps: [
        { title: "Ataca la idea, no a la persona", hook: "Cuando no puedes rebatir una idea, es tentador atacar a quien la dice. No caigas en la trampa." },
        { group: "Consejo de estudiantes", msgs: [{ text: "Propongo hacer un huerto en el patio: aprenderíamos ciencias y comeríamos más verdura." }, { text: "Ya, claro, tú que no sabes ni regar un cactus." }],
          prompt: "¿Qué hace Pau?", options: ["Rebate la propuesta.", "Ataca a Aitana en lugar de a la propuesta.", "Aporta un dato."],
          why: "Es un ataque a la persona (ad hominem): desvía la atención hacia Aitana. Que riegue bien o mal no dice nada sobre si el huerto es buena idea.", hint: "¿Pau habla del huerto o de Aitana?" },
        { title: "Dos trampas clásicas", points: ["<b>Ataque a la persona</b> (<i>ad hominem</i>): criticar a quien habla en lugar de lo que dice.", "<b>Hombre de paja</b>: deformar el argumento contrario para que sea más fácil de derribar.", "<b>Cómo responder</b>: vuelve a la idea original («Eso no responde a mi propuesta, que es…»)."] },
        { prompt: "Propuesta: «Deberíamos reducir los deberes del fin de semana.» ¿Qué respuesta cae en el hombre de paja?", a: "«¡Quieres que no hagamos nada y que no aprendamos nunca!»", b: "«Si se reducen, quizá no terminemos el temario: ¿cómo lo compensaríamos?»",
          why: "La A deforma la propuesta (reducir no es eliminar todo el esfuerzo). La B la discute tal como es.", hint: "¿Qué respuesta cambia lo que se ha propuesto?" },
        { prompt: "¿Falacia o crítica legítima?", labels: ["Falacia", "Crítica legítima"],
          cards: [{ t: "No hagas caso de lo que dice sobre el cambio climático: va en coche a todas partes." }, { t: "Su estudio tiene una muestra de diez personas: es demasiado pequeña para generalizar." }, { t: "Como es de primero, no tiene ni idea de organizar la fiesta." }, { t: "Dice que el comedor es más caro, pero la cuota es la misma que el año pasado." }, { t: "Quieres cerrar el patio porque odias que nos divirtamos." }, { t: "La propuesta no explica de dónde saldrá el dinero." }],
          why: "Las críticas legítimas apuntan al argumento (datos, muestra, costes). Las falacias apuntan a la persona o deforman lo que ha dicho." },
        { prompt: "Marc propone limitar los móviles en clase. Toca el fragmento de la respuesta de Nerea que es un ataque personal.",
          parts: ["Nerea responde: ", { t: "«Marc siempre quiere mandar»" }, " y, además, ", { t: "«los móviles nos ayudan a buscar información»" }, "."],
          why: "«Siempre quiere mandar» habla de Marc, no de la propuesta. La segunda parte sí es un argumento (discutible, pero sobre el tema).", hint: "¿Qué trozo habla de Marc y no de los móviles?" },
        { prompt: "Pau dice: «Aitana quiere reducir el plástico en el comedor, pero ella trae el almuerzo en papel de aluminio.» ¿Cuál es la mejor respuesta de Aitana?",
          options: ["«¿Y tú qué? ¡Siempre llegas tarde!»", "«Tienes razón en eso, pero que yo no sea coherente no hace falsa la propuesta: hablemos de los residuos del comedor.»", "«No pienso hablar más de esto.»"],
          why: "Reconocer el detalle y reconducir hacia la idea es la respuesta más sólida ante un «¿y tú qué?» (tu quoque).", hint: "La mejor respuesta vuelve al tema sin atacar." },
        { prompt: "Propuesta: «Las clases de refuerzo deberían ser en línea.» ¿Qué respuestas rebaten la idea y no a la persona?",
          options: ["«No todo el alumnado tiene ordenador en casa.»", "«Lo dices porque eres un vago.»", "«En línea cuesta más preguntar dudas.»", "«Tú siempre quieres lo más cómodo.»"],
          why: "Las respuestas 1 y 3 hablan de la propuesta (acceso e interacción). Las otras dos atacan a quien la hace.", hint: "Dos hablan de las clases y dos hablan de la persona." }
      ], rule: { text: "Ataca los argumentos, nunca a las personas. Y si deformas la idea del otro, solo rebates un fantasma.", source: "Véanse D. Walton, Ad Hominem Arguments (University of Alabama Press, 1998) y T. Govier, A Practical Study of Argument (Wadsworth, 7.ª ed., 2010)." } },
      { title: "«Lo hace todo el mundo»", steps: [
        { title: "«Lo hace todo el mundo»", hook: "Que mucha gente lo piense no lo hace cierto. Y casi nunca hay solo dos opciones." },
        { title: "Tres trampas de las mayorías y los extremos", points: ["<b>Apelación a la mayoría</b> (<i>ad populum</i>): «es cierto porque lo piensa mucha gente».", "<b>Falso dilema</b>: presentar dos opciones como si fueran las únicas.", "<b>Generalización precipitada</b>: sacar una regla general a partir de pocos casos."] },
        { group: "Fin de curso", msgs: [{ text: "O vamos todos de excursión al río o no hacemos nada a final de curso." }, { text: "Hay más opciones: una gincana por el pueblo, un día de juegos en el instituto…" }],
          prompt: "¿Qué trampa detecta Marc?", options: ["Falso dilema", "Ataque a la persona", "Apelación a la mayoría"],
          why: "Nerea presenta solo dos opciones (río o nada) cuando hay muchas más.", hint: "¿Cuántas opciones ofrece Nerea?" },
        { prompt: "¿Qué trampa es?", labels: ["Mayoría", "Generalización"],
          cards: [{ t: "Este canal tiene un millón de seguidores: seguro que dice la verdad." }, { t: "Mi primo estudió en el extranjero y no aprendió nada: estudiar fuera no sirve." }, { t: "Toda la clase lo ha compartido, así que debe de ser verdad." }, { t: "Dos alumnos de 2.º han suspendido: 2.º es un curso desastroso." }, { t: "Si lo hace todo el mundo, no puede ser tan malo." }, { t: "Probé un libro digital y se me cansó la vista: los libros digitales son malos." }],
          why: "La mayoría usa la popularidad como prueba. La generalización saca una regla de muy pocos casos." },
        { prompt: "¿Qué frase evita el falso dilema?", a: "O prohibimos los móviles o aceptamos que nadie estudie.", b: "Podríamos prohibirlos, regular su uso o usarlos solo en actividades concretas.",
          why: "La B abre el abanico de opciones; la A plantea dos extremos como si no hubiera nada en medio.", hint: "¿Qué frase ofrece más de dos opciones?" },
        { prompt: "Toca la conclusión que generaliza demasiado.", parts: ["Marc escribe: «He preguntado a tres amigos y ", { t: "a los tres les gusta el reguetón" }, ", así que ", { t: "a todo el instituto le gusta el reguetón" }, ".»"],
          why: "Tres amigos no representan a todo el instituto: la muestra es minúscula y no es aleatoria.", hint: "¿Qué parte pasa de «tres personas» a «todo el mundo»?" },
        { level: "Profundización", prompt: "Una encuesta a 1.200 estudiantes elegidos al azar dice que el 70 % prefiere entrar más tarde. ¿Usarla en un debate es una apelación a la mayoría?",
          options: ["Sí, porque se basa en lo que piensa mucha gente.", "No necesariamente: si la pregunta es qué prefiere el alumnado, la opinión mayoritaria es justamente el dato relevante.", "Sí: todas las encuestas son falacias."],
          why: "La falacia consiste en usar la popularidad como prueba de verdad. Aquí no se dice que entrar tarde sea «mejor»: se mide una preferencia, y una muestra amplia y aleatoria es una buena evidencia de ello.", hint: "Distingue entre «es cierto porque muchos lo piensan» y «queremos saber qué piensan muchos»." }
      ], rule: { text: "La cantidad de gente que cree algo no es una razón; la calidad de las pruebas, sí.", source: "Clasificación de falacias informales de I. M. Copi, C. Cohen y K. McMahon, Introduction to Logic (Pearson, 14.ª ed., 2014)." } }
    ] },
    { title: "Refutación", lessons: [
      { title: "Refutar con método: las 4 R", steps: [
        { title: "Refutar con método", hook: "Refutar no es decir «no». Es demostrar por qué el otro argumento no se sostiene." },
        { title: "Las 4 R de la refutación", points: ["<b>Retoma</b>: resume con justicia lo que ha dicho el otro equipo.", "<b>Rebate</b>: señala el punto débil (dato, premisa, conclusión…).", "<b>Razona</b>: aporta tu razón o tu prueba.", "<b>Remata</b>: conéctalo con tu postura."] },
        { group: "Debate en clase", msgs: [{ text: "Los uniformes eliminan las diferencias sociales en el instituto." }, { text: "Dicen que el uniforme elimina las diferencias sociales. Pero las diferencias se ven igual en las zapatillas, el móvil o la mochila. Por tanto, el uniforme no resuelve el problema que dice resolver." }],
          prompt: "¿Qué paso da Nerea cuando dice «Dicen que el uniforme elimina las diferencias sociales»?", options: ["Retoma", "Rebate", "Remata"],
          why: "Empezar resumiendo el argumento contrario demuestra que lo has escuchado y deja claro qué estás rebatiendo.", hint: "¿Está diciendo su idea o la del otro equipo?" },
        { prompt: "Ordena la refutación con las 4 R.", slots: [{ label: "Retoma" }, { label: "Rebate" }, { label: "Razona" }, { label: "Remata" }],
          chips: ["El otro equipo dice que los deberes mejoran las notas.", "Pero confunden hacer más horas con aprender más.", "Diversas investigaciones encuentran que, a partir de cierto tiempo diario, los deberes dejan de mejorar el rendimiento.", "Por eso defendemos menos deberes, pero mejor pensados.", "Los deberes son aburridos."],
          why: "Primero resumes, después señalas el error, lo demuestras y cierras con tu postura. «Son aburridos» no refuta nada.", hint: "Sobra una pieza: no es una razón, es una opinión." },
        { prompt: "Argumento contrario: «Hay que ampliar el carril bici porque aumentaría la seguridad.» ¿Qué refutación es más fuerte?", a: "«No estamos de acuerdo, y punto.»", b: "«Aumentaría la seguridad, sí, pero si no se conecta con las rutas que ya existen, nadie lo usará: primero hay que conectarlo.»",
          why: "La B concede una parte y rebate con una razón: es una refutación matizada, mucho más difícil de derribar.", hint: "¿Cuál da una razón?" },
        { prompt: "¿Refuta o solo contradice?", labels: ["Refuta", "Solo contradice"],
          cards: [{ t: "No es verdad." }, { t: "Ese dato es de hace quince años: la situación ha cambiado mucho desde entonces." }, { t: "Pues yo pienso lo contrario." }, { t: "Su ejemplo es un caso aislado: no demuestra ninguna tendencia." }, { t: "Eso es ridículo." }, { t: "Aunque fuera cierto, no explica por qué su medida sería la mejor opción." }],
          why: "Refutar exige una razón (fecha, muestra, relación causal…). Contradecir solo niega." },
        { prompt: "¿Qué estrategias sirven para rebatir una evidencia?", options: ["Cuestionar si la fuente es fiable.", "Comprobar si el dato está actualizado.", "Reírse de quien la ha presentado.", "Mirar si la muestra es representativa."],
          why: "Fuente, actualidad y muestra son las tres preguntas clave ante cualquier dato. Reírse es un ataque personal.", hint: "Todas menos una atacan el dato, no a la persona." }
      ], rule: { text: "Refutar bien es hacer justicia al argumento contrario antes de derribarlo.", source: "Sobre las objeciones y las excepciones (rebuttals), véase S. Toulmin, The Uses of Argument (Cambridge UP, ed. actualizada, 2003)." } }
    ] },
    { title: "Oratoria y voz", lessons: [
      { title: "El cuerpo también habla", steps: [
        { title: "El cuerpo también habla", hook: "Puedes tener el mejor argumento del mundo, pero si nadie te escucha, no sirve." },
        { title: "Tres herramientas del orador", points: ["<b>Mirada</b>: repártela por toda la sala, no la claves en el papel.", "<b>Voz</b>: varía el volumen y el ritmo; las pausas dan fuerza.", "<b>Postura</b>: pies firmes, manos visibles y gestos que acompañen lo que dices."] },
        { prompt: "¿Ayuda o resta?", labels: ["Ayuda", "Resta"],
          cards: [{ t: "Hacer una pausa justo antes de la idea clave." }, { t: "Leer todo el discurso del papel." }, { t: "Mirar a diferentes personas del público." }, { t: "Decir «eh…» cada dos frases." }, { t: "Hablar muy deprisa para decirlo todo." }, { t: "Bajar el volumen en un momento concreto para crear expectación." }],
          why: "Todo lo que ayuda a conectar con el público (mirada, pausas, variación de voz) suma; lo que lo desconecta (lectura, muletillas, prisa) resta." },
        { prompt: "En medio del discurso te das cuenta de que has dicho un dato mal. ¿Qué es mejor hacer?", options: ["Hacer como si nada.", "Pararte, corregirlo brevemente y continuar.", "Pedir perdón durante un minuto."],
          why: "Una corrección breve demuestra rigor y seguridad. Ignorarlo te puede costar caro en la refutación contraria.", hint: "Piensa qué haría alguien con seguridad y rigor." },
        { prompt: "¿Qué inicio capta mejor la atención?", a: "«Buenos días. Hoy hablaremos de los deberes.»", b: "«¿Cuántas horas dedicasteis ayer a los deberes? Hoy os demostraremos que más no siempre quiere decir mejor.»",
          why: "Una pregunta directa implica al público y anuncia la tesis. La A es correcta, pero no despierta ningún interés.", hint: "¿Qué inicio hace pensar al público?" },
        { prompt: "Toca las muletillas (palabras de relleno).", parts: ["«Buenas tardes. ", { t: "Eh, bueno, o sea," }, " ", { t: "defendemos que el recreo debe ser más largo" }, " porque ", { t: "descansar mejora la concentración" }, ".»"],
          why: "Las muletillas («eh», «bueno», «o sea») restan seguridad. Sustitúyelas por un silencio breve: suena mucho mejor.", hint: "Busca las palabras que no aportan ningún contenido." },
        { prompt: "¿Qué recursos ayudan a controlar los nervios?", options: ["Respirar lentamente antes de salir.", "Ensayar en voz alta.", "Memorizar palabra por palabra sin entenderlo.", "Llevar una ficha con las ideas clave."],
          why: "Respirar, ensayar y llevar un guion de ideas dan seguridad. Memorizar sin entender hace que te bloquees si pierdes el hilo.", hint: "Una de las opciones aumenta el riesgo de quedarte en blanco." }
      ], rule: { text: "Una pausa bien puesta vale más que diez palabras de relleno.", source: "Véase C. Anderson, TED Talks: The Official TED Guide to Public Speaking (Houghton Mifflin Harcourt, 2016)." } }
    ] },
    { title: "Evidencias y datos", lessons: [
      { title: "Fuentes fiables", steps: [
        { title: "Fuentes fiables", hook: "Un dato sin fuente es solo un rumor con números." },
        { title: "Tres preguntas ante un dato", points: ["<b>¿Quién lo dice?</b> Autoría, especialidad e intereses.", "<b>¿Cuándo?</b> Los datos caducan.", "<b>¿Cómo lo sabe?</b> Método, muestra y datos originales. Y, si puedes, contrástalo en una segunda fuente independiente."] },
        { prompt: "¿Fuente fiable o dudosa?", labels: ["Fiable", "Dudosa"],
          cards: [{ t: "Informe de un organismo oficial de estadística con la metodología publicada." }, { t: "Captura de un mensaje sin autor ni fecha." }, { t: "Artículo científico revisado por expertos." }, { t: "Vídeo de alguien que dice «me lo ha contado un médico»." }, { t: "Noticia que cita el estudio original y enlaza los datos." }, { t: "Web que vende el producto que dice que es el mejor." }],
          why: "Una fuente es fiable cuando sabemos quién la ha hecho, cómo y cuándo, y no tiene intereses directos en el resultado." },
        { prompt: "En un debate, ¿cuál es la mejor manera de citar un dato?", options: ["«Está demostrado.»", "«Según [organismo], en un estudio de [año] con [número] personas…»", "«Lo he visto en internet.»"],
          why: "Decir quién, cuándo y con qué muestra permite que el jurado valore el dato… y que el otro equipo no lo pueda desmontar fácilmente.", hint: "¿Qué opción responde a las tres preguntas: quién, cuándo y cómo?" },
        { prompt: "Quieres defender que el ruido afecta a la concentración. ¿Qué evidencia es más útil?", a: "«Mucha gente dice que el ruido molesta.»", b: "«Un estudio comparó los resultados de estudiantes en aulas ruidosas y en aulas silenciosas.»",
          why: "La B compara situaciones de manera sistemática. La A solo recoge impresiones (y apela a la mayoría).", hint: "¿Cuál se basa en una comparación y no en impresiones?" },
        { prompt: "Toca el punto débil de la fuente.", parts: ["«Según ", { t: "un estudio que leí hace tiempo" }, ", ", { t: "el 80 % de los jóvenes" }, " ", { t: "no lee nunca" }, ".»"],
          why: "No sabemos quién hizo el estudio, cuándo ni cómo: es imposible comprobarlo.", hint: "¿Qué trozo no responde a «quién, cuándo, cómo»?" },
        { prompt: "Antes de usar un dato en un debate, ¿qué debes comprobar?", options: ["Quién lo ha publicado.", "De cuándo es.", "Si te da la razón.", "Si otras fuentes dicen lo mismo."],
          why: "Que te dé la razón no lo hace más fiable: es justamente cuando más hay que revisarlo (sesgo de confirmación).", hint: "Hay una opción que es una trampa: el sesgo de confirmación." }
      ], rule: { text: "Antes de citar, pregúntate: ¿quién lo dice, cuándo y cómo lo sabe?", source: "Inspirado en la «lectura lateral» de S. Wineburg y S. McGrew (Stanford History Education Group, 2017)." } }
    ] },
    { title: "Debate improvisado", lessons: [
      { title: "15 minutos para preparar", steps: [
        { title: "15 minutos para preparar", hook: "No sabes el tema hasta el último momento. Tienes poco tiempo… pero puedes tener un plan." },
        { title: "Un plan en cuatro pasos", points: ["<b>1. Define</b> el tema: ¿qué quiere decir cada palabra clave?", "<b>2. Lluvia de ideas</b> a favor y en contra (¡también de la postura contraria!).", "<b>3. Elige</b> 2 o 3 argumentos fuertes y asigna una evidencia a cada uno.", "<b>4. Prepara</b> la apertura y una frase final."] },
        { prompt: "Tema: «¿Hay que prohibir los deberes en primaria?» ¿Qué hacéis primero?", options: ["Escribir el discurso completo.", "Definir qué entendemos por «deberes» y por «prohibir».", "Buscar un chiste para empezar."],
          why: "Si no definís los términos, podéis acabar defendiendo algo diferente de lo que discute el otro equipo.", hint: "Antes de discutir, hay que saber de qué hablamos exactamente." },
        { prompt: "¿Aprovecha los 15 minutos o pierde el tiempo?", labels: ["Aprovecha", "Pierde tiempo"],
          cards: [{ t: "Repartir el equipo: quién busca datos y quién prepara la refutación." }, { t: "Discutir diez minutos si el tema es justo." }, { t: "Anticipar los dos argumentos más probables del otro equipo." }, { t: "Redactar la introducción palabra por palabra." }, { t: "Apuntar las ideas en esquemas cortos." }],
          why: "Con poco tiempo, hay que repartir tareas, anticipar y esquematizar. Redactarlo todo o quejarse del tema consume minutos preciosos." },
        { prompt: "Tema: «¿El instituto debería empezar a las 9.00 en lugar de a las 8.00?» ¿Qué argumentos son a favor?",
          options: ["Los adolescentes tienden a dormir más tarde.", "Se complicaría el horario del transporte escolar.", "La atención a primera hora podría mejorar.", "Las familias que trabajan temprano lo tendrían más difícil."],
          why: "1 y 3 apoyan el cambio. 2 y 4 son argumentos en contra… ¡que también te interesa tener preparados para refutarlos!", hint: "Dos son a favor y dos en contra." },
        { prompt: "¿Qué esquema de preparación es más útil?", a: "Una lista de doce ideas sin ningún orden.", b: "Tres argumentos, cada uno con una evidencia y una posible objeción.",
          why: "Menos ideas pero bien construidas y con la refutación anticipada: eso es lo que puntúa.", hint: "¿Calidad o cantidad?" },
        { prompt: "Ordena los pasos de la preparación.", slots: [{ label: "Paso 1" }, { label: "Paso 2" }, { label: "Paso 3" }, { label: "Paso 4" }],
          chips: ["Definir las palabras clave.", "Hacer una lluvia de ideas a favor y en contra.", "Elegir los argumentos más fuertes.", "Preparar la apertura y el cierre.", "Escribir el discurso entero."],
          why: "Definir → generar ideas → seleccionar → preparar inicio y final. Escribirlo todo no cabe en 15 minutos.", hint: "Sobra una pieza." }
      ], rule: { text: "En un debate improvisado no gana quien más ideas tiene, sino quien mejor las elige y las ordena.", source: "Práctica habitual en las ligas escolares de debate. Pruébalo en el modo «Improvisado» de la Sala de debate." } }
    ] },
    { title: "Normativa y roles", lessons: [
      { title: "Quién hace qué en un debate", steps: [
        { title: "Quién hace qué en un debate", hook: "Cada turno tiene una misión. Si la confundes, pierdes puntos aunque hables muy bien." },
        { title: "Tres turnos, tres misiones", points: ["<b>Exposición inicial</b>: presenta la postura, define el tema y anuncia la línea argumental.", "<b>Refutación</b>: responde a los argumentos contrarios y refuerza los propios.", "<b>Conclusión</b>: sintetiza el debate y muestra por qué habéis ganado. ¡Nada de argumentos nuevos!"] },
        { prompt: "¿Exposición inicial o conclusión?", labels: ["Exposición inicial", "Conclusión"],
          cards: [{ t: "«Hoy defenderemos tres ideas…»" }, { t: "«A lo largo del debate hemos demostrado que…»" }, { t: "«Entendemos por “redes sociales” las plataformas donde…»" }, { t: "«El otro equipo no ha respondido a nuestro segundo argumento; por tanto…»" }, { t: "«Nuestra línea argumental se centra en…»" }],
          why: "La exposición anuncia y define; la conclusión hace balance de lo que ha pasado en el debate." },
        { prompt: "En la conclusión, una oradora presenta un dato nuevo que no había salido antes. ¿Qué pasa?", options: ["Es una buena estrategia sorpresa.", "Normalmente se penaliza: la conclusión no debe introducir argumentos nuevos.", "No tiene ninguna importancia."],
          why: "El otro equipo ya no puede responderlo. Por eso la mayoría de bases lo penalizan. Consulta siempre las de tu torneo.", hint: "¿Puede responder el otro equipo a ese dato?" },
        { prompt: "¿Qué frase es típica de la refutación?", a: "«Han dicho que la medida es cara, pero no han tenido en cuenta el ahorro a largo plazo.»", b: "«Buenos días, miembros del jurado: hoy defenderemos la postura a favor.»",
          why: "La A responde directamente a un argumento contrario. La B es una apertura de exposición inicial.", hint: "¿Cuál responde al otro equipo?" },
        { prompt: "¿Qué suele valorar un jurado de debate?", options: ["La solidez de los argumentos.", "La calidad de las evidencias.", "Quién habla más fuerte.", "La capacidad de refutar y de responder."],
          why: "La voz cuenta en la medida en que comunica bien, pero gritar más no puntúa. Revisa la rúbrica oficial de tu torneo.", hint: "Una de las opciones no tiene nada que ver con la calidad del debate." },
        { prompt: "Toca lo que Pau no debería decir en una conclusión.", parts: ["«", { t: "Hemos demostrado que el horario actual perjudica el descanso." }, " ", { t: "Además, os traemos un dato nuevo que todavía no hemos dicho." }, " ", { t: "Por eso, os pedimos el voto." }, "»"],
          why: "Introducir datos nuevos en la conclusión es el clásico error de rol: el otro equipo no los puede rebatir.", hint: "Recuerda: nada de argumentos nuevos en la conclusión." }
      ], rule: { text: "Cada turno, una misión: exponer, refutar o concluir. No las mezcles.", source: "Estructura general de los debates académicos escolares. Consulta siempre las bases oficiales del torneo en que participas." } }
    ] }
  ],
  CLAIMS: [
    { author: "Rubén, 4.º ESO", text: "Desde que tenemos pizarras digitales han bajado las notas de matemáticas. Las pizarras digitales hacen que aprendamos menos.", flaw: "Correlación no implica causalidad", flawKeys: ["causa", "correlacion", "coincid", "otros factores", "no implica", "no quiere decir", "puede ser", "otras razones", "no demuestra"], explain: "Que dos cosas pasen a la vez no quiere decir que una cause la otra. Las notas pueden haber bajado por muchos otros factores (temario, profesorado, horarios…)." },
    { author: "Lidia, 3.º ESO", text: "Mi vecina dejó los estudios y ahora gana mucho dinero con un canal de vídeos. Estudiar no sirve para nada.", flaw: "Generalización precipitada", flawKeys: ["un caso", "un solo caso", "generaliz", "excepcion", "la mayoria", "datos", "aislado", "todo el mundo"], explain: "Un solo caso (y excepcional) no permite sacar una regla general. Harían falta datos sobre qué pasa con la mayoría de personas." },
    { author: "Joel, 2.º ESO", text: "Si dejamos llevar gorra en clase, pronto vendremos en pijama y acabaremos sin ninguna norma.", flaw: "Pendiente resbaladiza", flawKeys: ["resbaladiza", "no tiene por que", "exager", "consecuenc", "paso", "no lleva", "no implica", "salto"], explain: "Se da por hecho, sin pruebas, que un primer paso llevará inevitablemente a una cadena de consecuencias extremas." },
    { author: "Marta, 1.º Bachillerato", text: "Este refresco lo anuncia el futbolista más famoso del mundo, así que debe de ser sano.", flaw: "Autoridad irrelevante", flawKeys: ["autoridad", "experto", "futbolista", "no es medico", "nutricion", "publicidad", "le pagan", "no sabe"], explain: "Ser experto en fútbol no hace a alguien experto en nutrición. Además, cobra por anunciarlo." },
    { author: "Iker, 4.º ESO", text: "O nos dejan el móvil en clase o volvemos a la Edad Media.", flaw: "Falso dilema", flawKeys: ["opciones", "alternativ", "termino medio", "dos", "regular", "extremo", "en medio"], explain: "Se presentan dos extremos como si fueran las únicas opciones, cuando hay muchas posibilidades intermedias (usos regulados, actividades concretas…)." },
    { author: "Sara, 3.º ESO", text: "Millones de personas ven ese programa cada noche; por tanto, es un buen programa.", flaw: "Apelación a la mayoría", flawKeys: ["mayoria", "popular", "mucha gente", "audiencia", "no quiere decir", "calidad", "millones"], explain: "Que sea popular no demuestra que sea bueno: la audiencia mide el éxito, no la calidad." },
    { author: "Hugo, 1.º Bachillerato", text: "No hay que hacer caso de la propuesta del consejo de estudiantes sobre el comedor: solo son críos de quince años.", flaw: "Ataque a la persona", flawKeys: ["persona", "edad", "ad hominem", "propuesta", "idea", "argumentos", "no importa quien"], explain: "Se descarta la propuesta por la edad de quien la hace, sin examinar su contenido." },
    { author: "Noa, 4.º ESO", text: "Los videojuegos son violentos y por eso los jóvenes de ahora son más agresivos que nunca.", flaw: "Premisa dudosa y causalidad sin probar", flawKeys: ["no todos", "datos", "mas agresivos", "causa", "demostr", "generaliz", "estudios", "que nunca"], explain: "Generaliza (no todos los videojuegos son violentos), da por hecho que los jóvenes son «más agresivos que nunca» sin datos y, además, atribuye la causa sin probarla." },
    { author: "Álex, 2.º ESO", text: "Nadie ha demostrado que la telepatía no exista; por tanto, existe.", flaw: "Apelación a la ignorancia", flawKeys: ["ignoranc", "carga de la prueba", "demostrar", "no demuestra", "pruebas", "quien afirma"], explain: "Que no se haya demostrado algo no prueba lo contrario. La carga de la prueba es de quien afirma." },
    { author: "Clara, 3.º ESO", text: "Siempre se ha hecho la excursión de final de curso a la playa; no tiene sentido cambiarlo.", flaw: "Apelación a la tradición", flawKeys: ["tradicion", "siempre", "costumbre", "no quiere decir", "mejor", "cambiar"], explain: "Que algo se haya hecho siempre así no demuestra que sea la mejor opción." },
    { author: "Dani, 4.º ESO", text: "Los que quieren reducir los deberes, en realidad, lo que quieren es no estudiar nunca.", flaw: "Hombre de paja", flawKeys: ["deform", "hombre de paja", "no han dicho", "reducir no", "exager", "tergivers", "eliminar"], explain: "Se deforma la postura contraria (reducir ≠ eliminar el estudio) para hacerla más fácil de atacar." },
    { author: "Laia, 1.º Bachillerato", text: "Si un producto es natural, es bueno para la salud.", flaw: "Apelación a la naturaleza", flawKeys: ["natural", "veneno", "setas", "no quiere decir", "toxic", "no todo"], explain: "Hay muchas sustancias naturales perjudiciales (algunas setas, venenos…). «Natural» no equivale a «sano»." },
    { author: "Pol, 2.º ESO", text: "Llevé la camiseta azul al examen y aprobé: es mi camiseta de la suerte.", flaw: "Post hoc (después de, luego a causa de)", flawKeys: ["casualidad", "coincid", "causa", "estudiar", "post hoc", "no implica", "despues"], explain: "Que el aprobado llegara después de llevar la camiseta no quiere decir que la camiseta sea la causa." },
    { author: "Irene, 4.º ESO", text: "Hemos gastado tanto en la fiesta de final de curso que ahora no podemos cancelarla, aunque llueva.", flaw: "Coste hundido", flawKeys: ["gastado", "ya esta", "coste", "recuperar", "futuro", "decidir", "independiente"], explain: "El dinero ya gastado no se recupera por el hecho de seguir adelante. La decisión debería depender de lo que conviene ahora y en el futuro." }
  ],
  TOPICS: [
    "¿Hay que prohibir los móviles en los centros educativos?", "¿Debería ser obligatorio aprender a programar en la ESO?", "¿Los videojuegos deberían considerarse un deporte?", "¿Deberían ser gratuitos los comedores escolares?",
    "¿Debería estar permitida la inteligencia artificial para hacer los deberes?", "¿Hay que bajar la edad para votar a los 16 años?", "¿Los uniformes escolares deberían ser obligatorios?", "¿Hay que prohibir los vehículos privados en el centro de las ciudades?",
    "¿Las redes sociales hacen más mal que bien a los adolescentes?", "¿Deberían desaparecer los exámenes tradicionales?", "¿Hay que limitar el turismo en las ciudades?", "¿Debería ser obligatorio el servicio comunitario para el alumnado?",
    "¿Deberían necesitar una titulación los creadores de contenido que hablan de salud?", "¿La semana escolar debería ser de cuatro días?", "¿Hay que prohibir la publicidad de comida rápida en horario infantil?", "¿Los deberes deberían ser opcionales?",
    "¿El instituto debería empezar a las 9.00?", "¿Las notas numéricas deberían sustituirse por informes descriptivos?", "¿Debería ser obligatorio estudiar dos lenguas extranjeras?", "¿Hay que poner un límite de edad para tener redes sociales?"
  ],
  IDEES: [
    "Ganar una discusión no es lo mismo que tener razón.", "Si solo conoces tus argumentos, todavía no conoces el tema.", "Una buena pregunta desmonta más que un grito.", "Antes de compartirlo, pregúntate: ¿quién lo dice y cómo lo sabe?",
    "Cambiar de opinión ante una buena prueba no es perder: es aprender.", "El silencio de una pausa también forma parte del discurso.", "Un dato sin fuente es un rumor con números.", "Refutar es responder a la mejor versión del argumento contrario.",
    "Si no puedes explicarlo brevemente, todavía no lo tienes claro.", "Escuchar bien es la mitad de saber responder."
  ],
  SALA_RUBRIC: [
    { title: "Tesis y postura", desc: "La postura se entiende desde el principio y se mantiene." },
    { title: "Argumentos y estructura", desc: "Argumentos claros, ordenados y conectados." },
    { title: "Evidencias", desc: "Datos, ejemplos o fuentes pertinentes y citados." },
    { title: "Refutación", desc: "Responde o anticipa los argumentos contrarios." },
    { title: "Oratoria", desc: "Voz, ritmo, mirada y lenguaje corporal." },
    { title: "Gestión del tiempo", desc: "Aprovecha el turno sin pasarse." }
  ],
  DEFAULT_TURN_NAMES: ["Exposición inicial", "Refutación 1", "Refutación 2", "Conclusión"],
  TURN_MISSIONS: {
    "Exposición inicial": "Presenta la postura, define los términos clave y anuncia la línea argumental.",
    "Refutación 1": "Responde a los argumentos principales del otro equipo y refuerza los vuestros.",
    "Refutación 2": "Profundiza en la refutación y cierra los frentes abiertos.",
    "Conclusión": "Sintetiza el debate y explica por qué habéis ganado. Ningún argumento nuevo."
  }
};
