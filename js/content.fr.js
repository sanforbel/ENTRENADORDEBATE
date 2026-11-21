/* Traduction française du contenu (fusionnée sur la base valencienne). */
CONTENT.fr = {
  CAST: { pepa: { name: "Mamie Pepa" } },
  RANKS: [{ name: "Auditeur" }, { name: "Débatteur stagiaire" }, { name: "Débatteur" }, { name: "Orateur titulaire" }, { name: "Capitaine d'équipe" }, { name: "Juge" }],
  UNITS: [
    { title: "Structure de l'argument", lessons: [
      { title: "Qu'est-ce qu'un argument ?", steps: [
        { title: "Qu'est-ce qu'un argument ?", hook: "Donner son avis, c'est gratuit. Argumenter demande un peu plus d'effort… mais convainc beaucoup plus." },
        { group: "5e B", msgs: [{ text: "Le voyage de fin d'année doit être dans un parc d'attractions, point final." }, { text: "Moi, je vote pour les Pyrénées : c'est moins cher, car le car et l'auberge coûtent environ 90 € et le parc dépasse 200 €." }],
          prompt: "Qui a argumenté ?", options: ["Pau", "Nerea", "Aucun des deux"],
          why: "Nerea donne une raison (le prix) qui soutient sa proposition. Pau se contente d'affirmer et clôt la conversation avec « point final ».", hint: "Cherchez qui explique pourquoi, pas qui parle le plus fort." },
        { title: "Les pièces d'un argument", points: ["<b>Conclusion</b> : ce que vous voulez que l'autre accepte.", "<b>Prémisses</b> : les raisons qui la soutiennent.", "<b>Connecteurs</b> : les mots qui relient les pièces (« parce que », « car », « donc », « alors »)."] },
        { prompt: "Quelle phrase argumente vraiment ?", a: "Les récréations devraient être plus longues. Tout le monde le pense.", b: "Les récréations devraient être plus longues, parce qu'après une pause on se concentre mieux en classe.",
          why: "La B offre une raison liée à la conclusion. La A se contente d'invoquer « tout le monde », ce qui n'est pas une raison.", hint: "L'une explique pourquoi ; l'autre dit seulement qui le pense." },
        { prompt: "Touchez la conclusion.", parts: [{ t: "J'ai dormi cinq heures" }, " et ", { t: "demain j'ai deux contrôles" }, ", alors ", { t: "aujourd'hui je ne peux pas aller au match" }, "."],
          why: "« Alors » introduit la conclusion : ce qui découle des deux raisons précédentes.", hint: "Regardez le connecteur « alors » : ce qui suit est souvent la conclusion." },
        { prompt: "Argument ou simple affirmation ?", labels: ["Simple affirmation", "Argument"],
          cards: [{ t: "La pizza à l'ananas est la meilleure du monde." }, { t: "On devrait aller au collège à pied parce qu'il est à dix minutes et qu'on économise de l'essence." }, { t: "Mon équipe va gagner le championnat." }, { t: "Comme il pleut, la professeure a reporté la sortie au parc." }, { t: "Les séries d'aujourd'hui sont ennuyeuses." }, { t: "Il faut recycler l'huile usagée, car un seul litre peut polluer des milliers de litres d'eau." }],
          why: "Il y a argument quand au moins une raison soutient l'idée (« parce que », « comme », « car »…)." },
        { prompt: "Conclusion : « Nous devrions avoir des fontaines à eau dans la cour. » Quelles phrases seraient des prémisses ?",
          options: ["En été, il fait très chaud dans la cour.", "Les bouteilles en plastique produisent beaucoup de déchets.", "La cour est grise.", "Boire de l'eau aide à rester attentif."],
          why: "Les trois soutiennent la proposition (chaleur, déchets, attention). La couleur de la cour n'a aucun rapport.", hint: "Une prémisse doit donner une raison d'installer des fontaines. Quelle phrase n'en donne aucune ?" },
        { level: "Pour aller plus loin", prompt: "« Tous les chats volent. Misto est un chat. Donc Misto vole. » Qu'est-ce qui ne va pas dans cet argument ?",
          options: ["La structure est correcte, mais une prémisse est fausse.", "La structure est incorrecte.", "C'est un argument parfait."],
          why: "Si les prémisses étaient vraies, la conclusion en découlerait. Le problème est la première prémisse : les chats ne volent pas. Un argument peut être bien construit et partir pourtant d'une donnée fausse.", hint: "Séparez deux questions : la forme est-elle bonne ? Les données sont-elles vraies ?" },
        { prompt: "Construisez l'argument : touchez les pièces pour les placer.", slots: [{ label: "Prémisse 1" }, { label: "Prémisse 2" }, { label: "Conclusion" }],
          chips: ["La bibliothèque ferme à 14 h.", "Beaucoup d'élèves ne peuvent étudier que l'après-midi.", "Il faut ouvrir la bibliothèque l'après-midi.", "La bibliothèque a beaucoup de livres."],
          why: "Les deux premières expliquent le problème ; la troisième est la proposition. « Elle a beaucoup de livres » est vrai, mais ne soutient pas la conclusion.", hint: "Une des phrases est vraie mais n'aide en rien à défendre la proposition." }
      ], rule: { text: "Une opinion dit ce que vous pensez. Un argument dit pourquoi quelqu'un d'autre devrait le penser aussi.", source: "D'après A. Weston, A Rulebook for Arguments (Hackett, 5e éd., 2017)." } },
      { title: "Prémisses cachées", steps: [
        { title: "Prémisses cachées", hook: "Souvent, la raison la plus importante est justement celle qu'on ne dit pas." },
        { title: "La raison invisible", points: ["<b>Prémisse implicite</b> : une raison dont l'argument a besoin mais qu'il ne dit pas.", "La repérer permet de voir si l'argument tient vraiment.", "Astuce : demandez-vous <i>qu'est-ce qui devrait être vrai pour que la conclusion s'ensuive ?</i>"] },
        { group: "Répétition de théâtre", msgs: [{ text: "Je ne viens pas à la répétition aujourd'hui : j'ai un match." }, { text: "D'accord…" }],
          prompt: "Quelle prémisse Marc cache-t-il ?", options: ["Que le match est plus important que la répétition.", "Qu'il ne connaît pas son rôle.", "Que la répétition est ennuyeuse."],
          why: "Pour que « j'ai un match » justifie de ne pas aller à la répétition, il faut supposer que le match est prioritaire. C'est justement ce qu'Aitana pourrait contester.", hint: "Que doit penser Marc pour que « j'ai un match » soit une bonne excuse ?" },
        { prompt: "« Ce portable est le plus cher, donc c'est le meilleur. » Quelle est la prémisse cachée ?", options: ["Plus c'est cher, meilleur c'est.", "Le portable est neuf.", "Tous les portables se valent."],
          why: "Dès qu'on met la prémisse au jour (« plus c'est cher, meilleur c'est »), on voit tout de suite qu'elle est discutable.", hint: "Quelle idée relie le prix à la qualité ?" },
        { prompt: "Quel argument cache une prémisse plus discutable ?", a: "Il pleut ; donc tu ferais mieux de prendre un parapluie.", b: "Elle a beaucoup d'abonnés ; donc elle s'y connaît en nutrition.",
          why: "Dans la A, la prémisse cachée (« le parapluie protège de la pluie ») est acceptable. Dans la B (« qui a beaucoup d'abonnés s'y connaît en nutrition »), elle est très douteuse.", hint: "Écrivez la prémisse manquante dans chaque cas et demandez-vous si vous y croiriez." },
        { prompt: "Mamie Pepa dit : « Ne te fais pas ce tatouage, après tu ne trouveras pas de travail. » Touchez la prémisse implicite la plus probable.",
          parts: ["Peut-être que Mamie pense que ", { t: "certaines entreprises refusent les personnes tatouées" }, ", ou que ", { t: "les tatouages font mal" }, ", ou encore que ", { t: "l'encre coûte cher" }, "."],
          why: "Seule la première relie le tatouage à « ne pas trouver de travail ». Les autres peuvent être vraies, mais ne soutiennent pas cette conclusion.", hint: "Cherchez celle qui relie « tatouage » et « travail »." },
        { prompt: "« Tu dois regarder cette série : elle a cinq saisons. » Quelles prémisses cachées pourrait-il y avoir ?",
          options: ["Une série longue est une bonne série.", "Si elle a autant de saisons, c'est qu'elle plaît au public.", "Les séries courtes n'existent pas.", "Le personnage principal est blond."],
          why: "Les deux premières relient « cinq saisons » à « tu dois la regarder ». Les autres n'ont aucun rapport (ou sont fausses).", hint: "Il y en a deux de correctes." },
        { prompt: "Rendez explicite la prémisse cachée.", slots: [{ label: "Prémisse explicite" }, { label: "Prémisse cachée" }, { label: "Conclusion" }],
          chips: ["Laia a beaucoup révisé.", "Qui révise beaucoup réussit.", "Laia va réussir.", "Laia a une nouvelle trousse."],
          why: "D'habitude, on dirait seulement « Laia a beaucoup révisé, elle va réussir ». La prémisse « qui révise beaucoup réussit » reste cachée… et c'est celle qu'on pourrait discuter.", hint: "Quelle idée générale fait passer de « a révisé » à « va réussir » ?" }
      ], rule: { text: "Rendez visible ce qui n'est pas dit : c'est là que se cachent souvent les points faibles d'un argument.", source: "Sur l'enthymème et les prémisses implicites, voir D. Walton, Informal Logic: A Pragmatic Approach (Cambridge UP, 2e éd., 2008)." } }
    ] },
    { title: "Sophismes", lessons: [
      { title: "Attaquez l'idée, pas la personne", steps: [
        { title: "Attaquez l'idée, pas la personne", hook: "Quand on ne peut pas réfuter une idée, il est tentant d'attaquer celui ou celle qui l'énonce. Ne tombez pas dans le piège." },
        { group: "Conseil des délégués", msgs: [{ text: "Je propose un potager dans la cour : on apprendrait les sciences et on mangerait plus de légumes." }, { text: "Ouais, c'est ça, toi qui ne sais même pas arroser un cactus." }],
          prompt: "Que fait Pau ?", options: ["Il réfute la proposition.", "Il attaque Aitana au lieu de la proposition.", "Il apporte une donnée."],
          why: "C'est une attaque personnelle (ad hominem) : elle détourne l'attention vers Aitana. Qu'elle arrose bien ou mal ne dit rien sur l'intérêt du potager.", hint: "Pau parle-t-il du potager ou d'Aitana ?" },
        { title: "Deux pièges classiques", points: ["<b>Attaque personnelle</b> (<i>ad hominem</i>) : critiquer la personne qui parle au lieu de ce qu'elle dit.", "<b>Homme de paille</b> : déformer l'argument adverse pour le rendre plus facile à abattre.", "<b>Comment répondre</b> : revenez à l'idée de départ (« Cela ne répond pas à ma proposition, qui est… »)."] },
        { prompt: "Proposition : « On devrait réduire les devoirs du week-end. » Quelle réponse tombe dans l'homme de paille ?", a: "« Tu veux qu'on ne fasse rien et qu'on n'apprenne jamais rien ! »", b: "« Si on les réduit, on risque de ne pas finir le programme : comment compenserait-on ? »",
          why: "La A déforme la proposition (réduire n'est pas supprimer tout effort). La B la discute telle qu'elle est.", hint: "Quelle réponse change ce qui a été proposé ?" },
        { prompt: "Sophisme ou critique légitime ?", labels: ["Sophisme", "Critique légitime"],
          cards: [{ t: "Ne l'écoute pas sur le changement climatique : il prend la voiture pour tout." }, { t: "Leur étude porte sur dix personnes : c'est trop peu pour généraliser." }, { t: "Comme elle est en 6e, elle n'a aucune idée de comment organiser la fête." }, { t: "Il dit que la cantine est plus chère, mais le tarif est le même que l'an dernier." }, { t: "Tu veux fermer la cour parce que tu détestes qu'on s'amuse." }, { t: "La proposition n'explique pas d'où viendra l'argent." }],
          why: "Les critiques légitimes visent l'argument (données, échantillon, coûts). Les sophismes visent la personne ou déforment ce qu'elle a dit." },
        { prompt: "Marc propose de limiter les portables en classe. Touchez le passage de la réponse de Nerea qui est une attaque personnelle.",
          parts: ["Nerea répond : ", { t: "« Marc veut toujours commander »" }, " et, en plus, ", { t: "« les portables nous aident à chercher des informations »" }, "."],
          why: "« Veut toujours commander » parle de Marc, pas de la proposition. La seconde partie est bien un argument (discutable, mais sur le sujet).", hint: "Quel passage parle de Marc et non des portables ?" },
        { prompt: "Pau dit : « Aitana veut réduire le plastique à la cantine, mais elle apporte son goûter dans du papier aluminium. » Quelle est la meilleure réponse d'Aitana ?",
          options: ["« Et toi alors ? Tu arrives toujours en retard ! »", "« Tu as raison sur ce point, mais que je ne sois pas cohérente ne rend pas la proposition fausse : parlons des déchets de la cantine. »", "« Je ne veux plus en parler. »"],
          why: "Reconnaître le détail et ramener la discussion à l'idée est la réponse la plus solide face à un « et toi alors ? » (tu quoque).", hint: "La meilleure réponse revient au sujet sans attaquer." },
        { prompt: "Proposition : « Les cours de soutien devraient se faire en ligne. » Quelles réponses réfutent l'idée et non la personne ?",
          options: ["« Tous les élèves n'ont pas d'ordinateur chez eux. »", "« Tu dis ça parce que tu es paresseux. »", "« En ligne, c'est plus difficile de poser des questions. »", "« Tu veux toujours la solution de facilité. »"],
          why: "Les réponses 1 et 3 parlent de la proposition (accès et interaction). Les deux autres attaquent la personne.", hint: "Deux parlent des cours et deux parlent de la personne." }
      ], rule: { text: "Attaquez les arguments, jamais les personnes. Et si vous déformez l'idée de l'autre, vous ne réfutez qu'un fantôme.", source: "Voir D. Walton, Ad Hominem Arguments (University of Alabama Press, 1998) et T. Govier, A Practical Study of Argument (Wadsworth, 7e éd., 2010)." } },
      { title: "« Tout le monde le fait »", steps: [
        { title: "« Tout le monde le fait »", hook: "Que beaucoup de gens le pensent ne le rend pas vrai. Et il n'y a presque jamais que deux options." },
        { title: "Trois pièges de la majorité et des extrêmes", points: ["<b>Appel à la majorité</b> (<i>ad populum</i>) : « c'est vrai parce que beaucoup de gens le pensent ».", "<b>Faux dilemme</b> : présenter deux options comme si c'étaient les seules.", "<b>Généralisation hâtive</b> : tirer une règle générale de très peu de cas."] },
        { group: "Fin d'année", msgs: [{ text: "Soit on va tous en sortie à la rivière, soit on ne fait rien en fin d'année." }, { text: "Il y a d'autres options : un jeu de piste dans le village, une journée de jeux au collège…" }],
          prompt: "Quel piège Marc repère-t-il ?", options: ["Faux dilemme", "Attaque personnelle", "Appel à la majorité"],
          why: "Nerea ne présente que deux options (la rivière ou rien) alors qu'il y en a bien d'autres.", hint: "Combien d'options Nerea propose-t-elle ?" },
        { prompt: "De quel piège s'agit-il ?", labels: ["Majorité", "Généralisation"],
          cards: [{ t: "Cette chaîne a un million d'abonnés : elle dit forcément la vérité." }, { t: "Mon cousin a étudié à l'étranger et n'a rien appris : étudier à l'étranger ne sert à rien." }, { t: "Toute la classe l'a partagé, donc ça doit être vrai." }, { t: "Deux élèves de 4e ont échoué : la 4e est une catastrophe." }, { t: "Si tout le monde le fait, ça ne peut pas être si grave." }, { t: "J'ai essayé un livre numérique et j'ai eu mal aux yeux : les livres numériques sont mauvais." }],
          why: "L'appel à la majorité prend la popularité pour une preuve. La généralisation tire une règle de très peu de cas." },
        { prompt: "Quelle phrase évite le faux dilemme ?", a: "Soit on interdit les portables, soit on accepte que personne ne travaille.", b: "On pourrait les interdire, en réglementer l'usage ou les utiliser seulement pour certaines activités.",
          why: "La B ouvre l'éventail des options ; la A présente deux extrêmes comme s'il n'y avait rien entre les deux.", hint: "Quelle phrase propose plus de deux options ?" },
        { prompt: "Touchez la conclusion qui généralise trop.", parts: ["Marc écrit : « J'ai demandé à trois amis et ", { t: "tous les trois aiment le reggaeton" }, ", donc ", { t: "tout le collège aime le reggaeton" }, ". »"],
          why: "Trois amis ne représentent pas tout le collège : l'échantillon est minuscule et non aléatoire.", hint: "Quelle partie passe de « trois personnes » à « tout le monde » ?" },
        { level: "Pour aller plus loin", prompt: "Une enquête auprès de 1 200 élèves tirés au sort indique que 70 % préféreraient commencer plus tard. L'utiliser dans un débat, est-ce un appel à la majorité ?",
          options: ["Oui, car elle repose sur ce que pensent beaucoup de gens.", "Pas forcément : si la question est de savoir ce que préfèrent les élèves, l'opinion majoritaire est justement la donnée pertinente.", "Oui : toutes les enquêtes sont des sophismes."],
          why: "Le sophisme consiste à faire de la popularité une preuve de vérité. Ici, on ne dit pas que commencer plus tard est « mieux » : on mesure une préférence, et un échantillon large et aléatoire en est une bonne preuve.", hint: "Distinguez « c'est vrai parce que beaucoup le pensent » et « on veut savoir ce que beaucoup pensent »." }
      ], rule: { text: "Le nombre de personnes qui croient une chose n'est pas une raison ; la qualité des preuves, si.", source: "Classification des sophismes informels d'I. M. Copi, C. Cohen et K. McMahon, Introduction to Logic (Pearson, 14e éd., 2014)." } }
    ] },
    { title: "Réfutation", lessons: [
      { title: "Réfuter avec méthode : les 4 R", steps: [
        { title: "Réfuter avec méthode", hook: "Réfuter, ce n'est pas dire « non ». C'est montrer pourquoi l'autre argument ne tient pas." },
        { title: "Les 4 R de la réfutation", points: ["<b>Reprendre</b> : résumer honnêtement ce qu'a dit l'autre équipe.", "<b>Repérer</b> : montrer le point faible (donnée, prémisse, conclusion…).", "<b>Raisonner</b> : apporter votre raison ou votre preuve.", "<b>Ramener</b> : relier le tout à votre position."] },
        { group: "Débat en classe", msgs: [{ text: "Les uniformes effacent les différences sociales au collège." }, { text: "Ils disent que l'uniforme efface les différences sociales. Mais les différences se voient tout autant dans les baskets, le portable ou le sac. Donc l'uniforme ne résout pas le problème qu'il prétend résoudre." }],
          prompt: "Quelle étape franchit Nerea quand elle dit « Ils disent que l'uniforme efface les différences sociales » ?", options: ["Reprendre", "Repérer", "Ramener"],
          why: "Commencer par résumer l'argument adverse montre que vous l'avez écouté et indique clairement ce que vous réfutez.", hint: "Donne-t-elle son idée ou celle de l'autre équipe ?" },
        { prompt: "Mettez la réfutation en ordre avec les 4 R.", slots: [{ label: "Reprendre" }, { label: "Repérer" }, { label: "Raisonner" }, { label: "Ramener" }],
          chips: ["L'autre équipe dit que les devoirs améliorent les notes.", "Mais elle confond faire plus d'heures et apprendre davantage.", "Plusieurs recherches montrent qu'au-delà d'un certain temps par jour, les devoirs n'améliorent plus les résultats.", "C'est pourquoi nous défendons moins de devoirs, mais mieux pensés.", "Les devoirs sont ennuyeux."],
          why: "D'abord on résume, ensuite on montre l'erreur, on la prouve et on conclut avec sa position. « Ils sont ennuyeux » ne réfute rien.", hint: "Une pièce est en trop : ce n'est pas une raison, c'est une opinion." },
        { prompt: "Argument adverse : « Il faut prolonger la piste cyclable parce que cela améliorerait la sécurité. » Quelle réfutation est la plus forte ?", a: "« Nous ne sommes pas d'accord, point. »", b: "« Cela améliorerait la sécurité, oui, mais si elle n'est pas reliée aux itinéraires existants, personne ne l'utilisera : il faut d'abord la relier. »",
          why: "La B concède un point et réfute avec une raison : une réfutation nuancée, bien plus difficile à abattre.", hint: "Laquelle donne une raison ?" },
        { prompt: "Réfutation ou simple contradiction ?", labels: ["Réfutation", "Simple contradiction"],
          cards: [{ t: "Ce n'est pas vrai." }, { t: "Ce chiffre date d'il y a quinze ans : la situation a beaucoup changé depuis." }, { t: "Eh bien moi, je pense le contraire." }, { t: "Leur exemple est un cas isolé : il ne montre aucune tendance." }, { t: "C'est ridicule." }, { t: "Même si c'était vrai, cela n'explique pas pourquoi leur mesure serait la meilleure option." }],
          why: "Réfuter exige une raison (date, échantillon, lien de cause…). Contredire, c'est seulement nier." },
        { prompt: "Quelles stratégies servent à réfuter une preuve ?", options: ["Se demander si la source est fiable.", "Vérifier si la donnée est à jour.", "Se moquer de la personne qui l'a présentée.", "Vérifier si l'échantillon est représentatif."],
          why: "Source, date et échantillon sont les trois questions clés face à toute donnée. Se moquer est une attaque personnelle.", hint: "Toutes sauf une s'attaquent à la donnée, pas à la personne." }
      ], rule: { text: "Bien réfuter, c'est rendre justice à l'argument adverse avant de l'abattre.", source: "Sur les objections et les exceptions (rebuttals), voir S. Toulmin, The Uses of Argument (Cambridge UP, éd. mise à jour, 2003)." } }
    ] },
    { title: "Art oratoire et voix", lessons: [
      { title: "Le corps parle aussi", steps: [
        { title: "Le corps parle aussi", hook: "Vous pouvez avoir le meilleur argument du monde : si personne ne vous écoute, il ne sert à rien." },
        { title: "Trois outils de l'orateur", points: ["<b>Regard</b> : balayez toute la salle, ne le fixez pas sur vos notes.", "<b>Voix</b> : variez le volume et le rythme ; les pauses donnent de la force.", "<b>Posture</b> : pieds ancrés, mains visibles et gestes qui accompagnent vos paroles."] },
        { prompt: "Ça aide ou ça dessert ?", labels: ["Ça aide", "Ça dessert"],
          cards: [{ t: "Faire une pause juste avant l'idée clé." }, { t: "Lire tout son discours sur sa feuille." }, { t: "Regarder différentes personnes du public." }, { t: "Dire « euh… » toutes les deux phrases." }, { t: "Parler très vite pour tout dire." }, { t: "Baisser la voix à un moment précis pour créer du suspense." }],
          why: "Tout ce qui aide à créer le lien avec le public (regard, pauses, voix variée) aide ; tout ce qui le coupe (lecture, tics, précipitation) dessert." },
        { prompt: "En plein discours, vous vous rendez compte que vous avez donné un chiffre faux. Que vaut-il mieux faire ?", options: ["Faire comme si de rien n'était.", "S'arrêter, corriger brièvement et continuer.", "S'excuser pendant une minute."],
          why: "Une correction brève montre de la rigueur et de l'assurance. L'ignorer pourrait vous coûter cher lors de la réfutation adverse.", hint: "Pensez à ce que ferait quelqu'un de sûr et rigoureux." },
        { prompt: "Quelle ouverture capte le mieux l'attention ?", a: "« Bonjour. Aujourd'hui, nous allons parler des devoirs. »", b: "« Combien d'heures avez-vous passées hier sur vos devoirs ? Aujourd'hui, nous allons vous montrer que plus ne veut pas toujours dire mieux. »",
          why: "Une question directe implique le public et annonce la thèse. La A est correcte, mais n'éveille aucun intérêt.", hint: "Quelle ouverture fait réfléchir le public ?" },
        { prompt: "Touchez les tics de langage (mots de remplissage).", parts: ["« Bonjour. ", { t: "Euh, ben, du coup," }, " ", { t: "nous défendons que la récréation doit être plus longue" }, " parce que ", { t: "se reposer améliore la concentration" }, ". »"],
          why: "Les tics de langage (« euh », « ben », « du coup ») font perdre de l'assurance. Remplacez-les par un court silence : c'est bien mieux.", hint: "Cherchez les mots qui n'apportent aucun contenu." },
        { prompt: "Qu'est-ce qui aide à gérer le trac ?", options: ["Respirer lentement avant de passer.", "Répéter à voix haute.", "Apprendre par cœur mot à mot sans comprendre.", "Avoir une fiche avec les idées clés."],
          why: "Respirer, répéter et avoir un plan d'idées donnent de l'assurance. Apprendre sans comprendre fait bloquer si l'on perd le fil.", hint: "Une option augmente le risque de trou de mémoire." }
      ], rule: { text: "Une pause bien placée vaut mieux que dix mots de remplissage.", source: "Voir C. Anderson, TED Talks: The Official TED Guide to Public Speaking (Houghton Mifflin Harcourt, 2016)." } }
    ] },
    { title: "Preuves et données", lessons: [
      { title: "Des sources fiables", steps: [
        { title: "Des sources fiables", hook: "Une donnée sans source n'est qu'une rumeur avec des chiffres." },
        { title: "Trois questions face à une donnée", points: ["<b>Qui le dit ?</b> Auteur, spécialité et intérêts.", "<b>Quand ?</b> Les données se périment.", "<b>Comment le sait-il ?</b> Méthode, échantillon et données d'origine. Et si possible, vérifiez dans une seconde source indépendante."] },
        { prompt: "Source fiable ou douteuse ?", labels: ["Fiable", "Douteuse"],
          cards: [{ t: "Rapport d'un organisme officiel de statistique avec sa méthodologie publiée." }, { t: "Capture d'écran d'un message sans auteur ni date." }, { t: "Article scientifique relu par des pairs." }, { t: "Vidéo de quelqu'un qui dit « un médecin me l'a dit »." }, { t: "Article de presse qui cite l'étude originale et renvoie aux données." }, { t: "Site qui vend le produit qu'il présente comme le meilleur." }],
          why: "Une source est fiable quand on sait qui l'a produite, comment et quand, et qu'elle n'a pas d'intérêt direct dans le résultat." },
        { prompt: "Dans un débat, quelle est la meilleure façon de citer une donnée ?", options: ["« C'est prouvé. »", "« Selon [organisme], dans une étude de [année] portant sur [nombre] personnes… »", "« Je l'ai vu sur Internet. »"],
          why: "Dire qui, quand et avec quel échantillon permet au jury d'évaluer la donnée… et empêche l'autre équipe de la démonter facilement.", hint: "Quelle option répond aux trois questions : qui, quand et comment ?" },
        { prompt: "Vous voulez défendre que le bruit nuit à la concentration. Quelle preuve est la plus utile ?", a: "« Beaucoup de gens disent que le bruit dérange. »", b: "« Une étude a comparé les résultats d'élèves dans des salles bruyantes et silencieuses. »",
          why: "La B compare des situations de façon systématique. La A ne recueille que des impressions (et fait appel à la majorité).", hint: "Laquelle repose sur une comparaison et non sur des impressions ?" },
        { prompt: "Touchez le point faible de la source.", parts: ["« Selon ", { t: "une étude que j'ai lue il y a longtemps" }, ", ", { t: "80 % des jeunes" }, " ", { t: "ne lisent jamais" }, ". »"],
          why: "On ne sait pas qui a fait l'étude, quand ni comment : impossible de la vérifier.", hint: "Quel passage ne répond pas à « qui, quand, comment » ?" },
        { prompt: "Avant d'utiliser une donnée dans un débat, que devez-vous vérifier ?", options: ["Qui l'a publiée.", "De quand elle date.", "Si elle vous donne raison.", "Si d'autres sources disent la même chose."],
          why: "Qu'elle vous donne raison ne la rend pas plus fiable : c'est justement là qu'il faut la vérifier le plus (biais de confirmation).", hint: "Une option est un piège : le biais de confirmation." }
      ], rule: { text: "Avant de citer, demandez-vous : qui le dit, quand, et comment le sait-il ?", source: "Inspiré de la « lecture latérale » de S. Wineburg et S. McGrew (Stanford History Education Group, 2017)." } }
    ] },
    { title: "Débat improvisé", lessons: [
      { title: "15 minutes pour se préparer", steps: [
        { title: "15 minutes pour se préparer", hook: "Vous ne connaissez le sujet qu'au dernier moment. Vous avez peu de temps… mais vous pouvez avoir un plan." },
        { title: "Un plan en quatre étapes", points: ["<b>1. Définir</b> le sujet : que veut dire chaque mot clé ?", "<b>2. Remue-méninges</b> pour et contre (y compris pour l'autre camp !).", "<b>3. Choisir</b> 2 ou 3 arguments solides et associer une preuve à chacun.", "<b>4. Préparer</b> l'ouverture et une phrase finale."] },
        { prompt: "Sujet : « Faut-il interdire les devoirs à l'école primaire ? » Que faites-vous d'abord ?", options: ["Écrire le discours complet.", "Définir ce qu'on entend par « devoirs » et par « interdire ».", "Chercher une blague pour commencer."],
          why: "Si vous ne définissez pas les termes, vous risquez de défendre autre chose que ce dont parle l'autre équipe.", hint: "Avant de débattre, il faut savoir exactement de quoi on parle." },
        { prompt: "Bon usage des 15 minutes ou temps perdu ?", labels: ["Bon usage", "Temps perdu"],
          cards: [{ t: "Se répartir les rôles : qui cherche des données, qui prépare la réfutation." }, { t: "Discuter dix minutes pour savoir si le sujet est juste." }, { t: "Anticiper les deux arguments les plus probables de l'autre équipe." }, { t: "Rédiger l'introduction mot à mot." }, { t: "Noter les idées sous forme de schémas courts." }],
          why: "Avec peu de temps, il faut se répartir les tâches, anticiper et schématiser. Tout rédiger ou se plaindre du sujet fait perdre de précieuses minutes." },
        { prompt: "Sujet : « Le collège devrait-il commencer à 9 h au lieu de 8 h ? » Quels arguments sont pour ?",
          options: ["Les adolescents ont tendance à s'endormir plus tard.", "Les horaires du transport scolaire seraient plus compliqués.", "L'attention en première heure pourrait s'améliorer.", "Les familles qui travaillent tôt seraient en difficulté."],
          why: "1 et 3 soutiennent le changement. 2 et 4 sont des arguments contre… qu'il vaut mieux avoir préparés pour les réfuter !", hint: "Deux sont pour et deux sont contre." },
        { prompt: "Quel plan de préparation est le plus utile ?", a: "Une liste de douze idées sans aucun ordre.", b: "Trois arguments, chacun avec une preuve et une objection possible.",
          why: "Moins d'idées, mais bien construites et avec la réfutation anticipée : c'est ce qui rapporte des points.", hint: "Qualité ou quantité ?" },
        { prompt: "Mettez les étapes de la préparation dans l'ordre.", slots: [{ label: "Étape 1" }, { label: "Étape 2" }, { label: "Étape 3" }, { label: "Étape 4" }],
          chips: ["Définir les mots clés.", "Faire un remue-méninges pour et contre.", "Choisir les arguments les plus solides.", "Préparer l'ouverture et la conclusion.", "Rédiger tout le discours."],
          why: "Définir → produire des idées → sélectionner → préparer le début et la fin. Tout rédiger ne tient pas en 15 minutes.", hint: "Une pièce est en trop." }
      ], rule: { text: "Dans un débat improvisé, ce n'est pas celui qui a le plus d'idées qui gagne, mais celui qui sait le mieux les choisir et les ordonner.", source: "Pratique courante dans les ligues de débat scolaires. Essayez-le en mode « Improvisé » dans la Salle de débat." } }
    ] },
    { title: "Règles et rôles", lessons: [
      { title: "Qui fait quoi dans un débat", steps: [
        { title: "Qui fait quoi dans un débat", hook: "Chaque prise de parole a une mission. Si vous la confondez, vous perdez des points même en parlant très bien." },
        { title: "Trois prises de parole, trois missions", points: ["<b>Exposé initial</b> : présente la position, définit le sujet et annonce la ligne argumentative.", "<b>Réfutation</b> : répond aux arguments adverses et renforce les siens.", "<b>Conclusion</b> : fait la synthèse du débat et montre pourquoi vous avez gagné. Aucun argument nouveau !"] },
        { prompt: "Exposé initial ou conclusion ?", labels: ["Exposé initial", "Conclusion"],
          cards: [{ t: "« Aujourd'hui, nous défendrons trois idées… »" }, { t: "« Tout au long du débat, nous avons montré que… »" }, { t: "« Par “réseaux sociaux”, nous entendons les plateformes où… »" }, { t: "« L'autre équipe n'a pas répondu à notre deuxième argument ; donc… »" }, { t: "« Notre ligne argumentative porte sur… »" }],
          why: "L'exposé annonce et définit ; la conclusion fait le bilan de ce qui s'est passé dans le débat." },
        { prompt: "Dans la conclusion, une oratrice présente une donnée nouvelle qui n'était pas apparue avant. Que se passe-t-il ?", options: ["C'est une bonne stratégie de surprise.", "C'est en général pénalisé : la conclusion ne doit pas introduire d'arguments nouveaux.", "Cela n'a aucune importance."],
          why: "L'autre équipe ne peut plus y répondre. C'est pourquoi la plupart des règlements le pénalisent. Consultez toujours celui de votre tournoi.", hint: "L'autre équipe peut-elle répondre à cette donnée ?" },
        { prompt: "Quelle phrase est typique de la réfutation ?", a: "« Ils ont dit que la mesure coûte cher, mais ils n'ont pas tenu compte des économies à long terme. »", b: "« Bonjour, mesdames et messieurs du jury : aujourd'hui nous défendrons la position pour. »",
          why: "La A répond directement à un argument adverse. La B est l'ouverture d'un exposé initial.", hint: "Laquelle répond à l'autre équipe ?" },
        { prompt: "Qu'évalue généralement un jury de débat ?", options: ["La solidité des arguments.", "La qualité des preuves.", "Qui parle le plus fort.", "La capacité à réfuter et à répondre."],
          why: "La voix compte dans la mesure où elle communique bien, mais crier plus fort ne rapporte rien. Consultez la grille officielle de votre tournoi.", hint: "Une option n'a rien à voir avec la qualité du débat." },
        { prompt: "Touchez ce que Pau ne devrait pas dire dans une conclusion.", parts: ["« ", { t: "Nous avons montré que l'horaire actuel nuit au repos." }, " ", { t: "En plus, nous vous apportons une donnée nouvelle que nous n'avons pas encore citée." }, " ", { t: "C'est pourquoi nous vous demandons votre vote." }, " »"],
          why: "Introduire des données nouvelles en conclusion est l'erreur de rôle classique : l'autre équipe ne peut pas les réfuter.", hint: "Rappel : aucun argument nouveau en conclusion." }
      ], rule: { text: "À chaque prise de parole, sa mission : exposer, réfuter ou conclure. Ne les mélangez pas.", source: "Structure générale des débats académiques scolaires. Consultez toujours le règlement officiel du tournoi auquel vous participez." } }
    ] }
  ],
  CLAIMS: [
    { author: "Rubén, 3e", text: "Depuis qu'on a des tableaux numériques, les notes de maths ont baissé. Les tableaux numériques nous font moins apprendre.", flaw: "Corrélation n'est pas causalité", flawKeys: ["cause", "correlation", "coincid", "autres facteurs", "ne veut pas dire", "ne prouve pas", "peut etre", "autres raisons"], explain: "Que deux choses arrivent en même temps ne veut pas dire que l'une cause l'autre. Les notes ont pu baisser pour bien d'autres raisons (programme, enseignants, horaires…)." },
    { author: "Lidia, 4e", text: "Ma voisine a arrêté ses études et gagne maintenant beaucoup d'argent avec une chaîne de vidéos. Étudier ne sert à rien.", flaw: "Généralisation hâtive", flawKeys: ["un cas", "un seul cas", "generalis", "exception", "la plupart", "donnees", "isole", "tout le monde"], explain: "Un seul cas (et exceptionnel) ne permet pas de tirer une règle générale. Il faudrait des données sur ce qui arrive à la plupart des gens." },
    { author: "Joel, 5e", text: "Si on nous laisse porter une casquette en classe, bientôt on viendra en pyjama et on finira sans aucune règle.", flaw: "Pente glissante", flawKeys: ["pente", "glissante", "pas forcement", "exager", "consequence", "etape", "ne mene pas", "saut"], explain: "On suppose, sans preuve, qu'un premier pas entraînera forcément une chaîne de conséquences extrêmes." },
    { author: "Marta, 1re", text: "Ce soda est vanté par le footballeur le plus célèbre du monde, donc il doit être bon pour la santé.", flaw: "Autorité non pertinente", flawKeys: ["autorite", "expert", "footballeur", "pas medecin", "nutrition", "publicite", "paye", "ne sait pas"], explain: "Être expert en football ne fait pas de quelqu'un un expert en nutrition. En plus, il est payé pour en faire la publicité." },
    { author: "Iker, 3e", text: "Soit on nous laisse le portable en classe, soit on retourne au Moyen Âge.", flaw: "Faux dilemme", flawKeys: ["options", "alternative", "juste milieu", "deux", "reglement", "extreme", "entre les deux"], explain: "On présente deux extrêmes comme les seules options, alors qu'il existe de nombreuses possibilités intermédiaires (usage encadré, activités précises…)." },
    { author: "Sara, 4e", text: "Des millions de personnes regardent cette émission chaque soir ; donc c'est une bonne émission.", flaw: "Appel à la majorité", flawKeys: ["majorite", "populaire", "beaucoup de gens", "audience", "ne veut pas dire", "qualite", "millions"], explain: "Être populaire ne prouve pas qu'elle soit bonne : l'audience mesure le succès, pas la qualité." },
    { author: "Hugo, 1re", text: "Inutile d'écouter la proposition du conseil des délégués sur la cantine : ce ne sont que des gamins de quinze ans.", flaw: "Attaque personnelle", flawKeys: ["personne", "age", "ad hominem", "proposition", "idee", "arguments", "peu importe qui"], explain: "On écarte la proposition à cause de l'âge de ses auteurs, sans examiner son contenu." },
    { author: "Noa, 3e", text: "Les jeux vidéo sont violents, et c'est pour ça que les jeunes d'aujourd'hui sont plus agressifs que jamais.", flaw: "Prémisse douteuse et causalité non prouvée", flawKeys: ["pas tous", "donnees", "plus agressifs", "cause", "prouv", "generalis", "etudes", "que jamais"], explain: "Il généralise (tous les jeux vidéo ne sont pas violents), affirme sans données que les jeunes sont « plus agressifs que jamais » et attribue une cause sans la prouver." },
    { author: "Àlex, 5e", text: "Personne n'a prouvé que la télépathie n'existe pas ; donc elle existe.", flaw: "Appel à l'ignorance", flawKeys: ["ignorance", "charge de la preuve", "prouver", "ne prouve pas", "preuves", "celui qui affirme"], explain: "Que quelque chose n'ait pas été réfuté ne prouve pas que c'est vrai. La charge de la preuve revient à celui qui affirme." },
    { author: "Clara, 4e", text: "La sortie de fin d'année s'est toujours faite à la plage ; ça n'a aucun sens de changer.", flaw: "Appel à la tradition", flawKeys: ["tradition", "toujours", "habitude", "ne veut pas dire", "mieux", "changer"], explain: "Qu'une chose se soit toujours faite ainsi ne prouve pas que ce soit la meilleure option." },
    { author: "Dani, 3e", text: "Ceux qui veulent réduire les devoirs veulent en réalité ne jamais travailler.", flaw: "Homme de paille", flawKeys: ["deform", "homme de paille", "n'ont pas dit", "reduire n'est pas", "exager", "caricatur", "supprimer"], explain: "On déforme la position adverse (réduire ≠ supprimer le travail) pour la rendre plus facile à attaquer." },
    { author: "Laia, 1re", text: "Si un produit est naturel, il est bon pour la santé.", flaw: "Appel à la nature", flawKeys: ["naturel", "poison", "champignon", "ne veut pas dire", "toxique", "pas tout"], explain: "Beaucoup de substances naturelles sont nocives (certains champignons, des poisons…). « Naturel » ne veut pas dire « sain »." },
    { author: "Pol, 5e", text: "J'ai porté mon tee-shirt bleu au contrôle et j'ai réussi : c'est mon tee-shirt porte-bonheur.", flaw: "Post hoc (après cela, donc à cause de cela)", flawKeys: ["hasard", "coincid", "cause", "reviser", "post hoc", "ne veut pas dire", "apres"], explain: "Avoir réussi après avoir porté le tee-shirt ne veut pas dire que le tee-shirt en est la cause." },
    { author: "Irene, 3e", text: "On a tellement dépensé pour la fête de fin d'année qu'on ne peut plus l'annuler, même s'il pleut.", flaw: "Coût irrécupérable", flawKeys: ["depense", "deja", "cout", "recuperer", "avenir", "decider", "independamment"], explain: "L'argent déjà dépensé ne se récupère pas en continuant. La décision devrait dépendre de ce qui est utile maintenant et à l'avenir." }
  ],
  TOPICS: [
    "Faut-il interdire les portables dans les établissements scolaires ?", "Apprendre à coder devrait-il être obligatoire au collège ?", "Les jeux vidéo devraient-ils être considérés comme un sport ?", "La cantine scolaire devrait-elle être gratuite ?",
    "Faut-il autoriser l'intelligence artificielle pour faire les devoirs ?", "Faut-il abaisser l'âge du droit de vote à 16 ans ?", "L'uniforme scolaire devrait-il être obligatoire ?", "Faut-il interdire les voitures dans les centres-villes ?",
    "Les réseaux sociaux font-ils plus de mal que de bien aux adolescents ?", "Faut-il supprimer les examens traditionnels ?", "Faut-il limiter le tourisme dans les villes ?", "Le service civique devrait-il être obligatoire pour les élèves ?",
    "Les créateurs de contenu qui parlent de santé devraient-ils avoir un diplôme ?", "La semaine scolaire devrait-elle durer quatre jours ?", "Faut-il interdire la publicité pour la restauration rapide aux heures des programmes jeunesse ?", "Les devoirs devraient-ils être facultatifs ?",
    "Le collège devrait-il commencer à 9 h ?", "Faut-il remplacer les notes chiffrées par des appréciations écrites ?", "Étudier deux langues étrangères devrait-il être obligatoire ?", "Faut-il un âge minimum pour utiliser les réseaux sociaux ?"
  ],
  IDEES: [
    "Gagner une dispute, ce n'est pas avoir raison.", "Si vous ne connaissez que vos arguments, vous ne connaissez pas encore le sujet.", "Une bonne question démonte plus qu'un cri.", "Avant de partager, demandez-vous : qui le dit et comment le sait-il ?",
    "Changer d'avis face à une bonne preuve, ce n'est pas perdre : c'est apprendre.", "Le silence d'une pause fait aussi partie du discours.", "Une donnée sans source est une rumeur avec des chiffres.", "Réfuter, c'est répondre à la meilleure version de l'argument adverse.",
    "Si vous ne pouvez pas l'expliquer brièvement, ce n'est pas encore clair pour vous.", "Bien écouter, c'est la moitié de savoir répondre."
  ],
  SALA_RUBRIC: [
    { title: "Thèse et position", desc: "La position est claire dès le début et maintenue." },
    { title: "Arguments et structure", desc: "Arguments clairs, ordonnés et reliés." },
    { title: "Preuves", desc: "Données, exemples ou sources pertinents et cités." },
    { title: "Réfutation", desc: "Répond aux arguments adverses ou les anticipe." },
    { title: "Expression orale", desc: "Voix, rythme, regard et langage corporel." },
    { title: "Gestion du temps", desc: "Utilise bien son temps sans le dépasser." }
  ],
  DEFAULT_TURN_NAMES: ["Exposé initial", "Réfutation 1", "Réfutation 2", "Conclusion"],
  TURN_MISSIONS: {
    "Exposé initial": "Présentez votre position, définissez les termes clés et annoncez votre ligne argumentative.",
    "Réfutation 1": "Répondez aux principaux arguments de l'autre équipe et renforcez les vôtres.",
    "Réfutation 2": "Approfondissez la réfutation et refermez les fronts encore ouverts.",
    "Conclusion": "Faites la synthèse du débat et expliquez pourquoi vous avez gagné. Aucun argument nouveau."
  }
};
