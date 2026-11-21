/* English translation of the content (merged over the Valencian base). */
CONTENT.en = {
  CAST: { pepa: { name: "Grandma Pepa" } },
  RANKS: [{ name: "Listener" }, { name: "Trainee debater" }, { name: "Debater" }, { name: "First-team speaker" }, { name: "Team captain" }, { name: "Judge" }],
  UNITS: [
    { title: "Structure of an argument", lessons: [
      { title: "What is an argument?", steps: [
        { title: "What is an argument?", hook: "Giving an opinion is free. Arguing takes a bit more effort… but it's far more convincing." },
        { group: "Year 8 B", msgs: [{ text: "The end-of-year trip has to be to a theme park, full stop." }, { text: "I vote for the Pyrenees: it's cheaper, since the coach and the hostel cost about €90 and the park is over €200." }],
          prompt: "Who made an argument?", options: ["Pau", "Nerea", "Neither of them"],
          why: "Nerea gives a reason (the price) that supports her proposal. Pau only makes a claim and shuts the conversation down with \"full stop\".", hint: "Look for who explains why, not who says it loudest." },
        { title: "The parts of an argument", points: ["<b>Conclusion</b>: what you want the other person to accept.", "<b>Premises</b>: the reasons that support it.", "<b>Connectives</b>: the words that link the parts (\"because\", \"since\", \"therefore\", \"so\")."] },
        { prompt: "Which sentence really makes an argument?", a: "Break time should be longer. Everybody thinks so.", b: "Break time should be longer, because after a rest we concentrate better in class.",
          why: "B offers a reason related to the conclusion. A only appeals to \"everybody\", which is not a reason.", hint: "One explains why; the other only says who thinks so." },
        { prompt: "Tap the conclusion.", parts: [{ t: "I've slept five hours" }, " and ", { t: "I've got two exams tomorrow" }, ", so ", { t: "I can't go to the match today" }, "."],
          why: "\"So\" introduces the conclusion: what follows from the two previous reasons.", hint: "Look at the connective \"so\": what comes after it is usually the conclusion." },
        { prompt: "Argument or just a claim?", labels: ["Just a claim", "Argument"],
          cards: [{ t: "Pineapple pizza is the best in the world." }, { t: "We should walk to school because it's ten minutes away and we save petrol." }, { t: "My team will win the league." }, { t: "As it's raining, the teacher has postponed the trip to the park." }, { t: "Today's TV series are boring." }, { t: "Used cooking oil must be recycled, since a single litre can pollute thousands of litres of water." }],
          why: "There is an argument when at least one reason supports the idea (\"because\", \"as\", \"since\"…)." },
        { prompt: "Conclusion: \"We should have water fountains in the playground.\" Which sentences would be premises?",
          options: ["In summer it gets very hot in the playground.", "Plastic bottles create a lot of waste.", "The playground is grey.", "Drinking water helps you stay focused."],
          why: "All three support the proposal (heat, waste, focus). The colour of the playground has nothing to do with it.", hint: "A premise must give a reason to install fountains. Which sentence gives none?" },
        { level: "Going further", prompt: "\"All cats can fly. Misto is a cat. Therefore, Misto can fly.\" What's wrong with this argument?",
          options: ["The structure is correct, but one premise is false.", "The structure is incorrect.", "It's a perfect argument."],
          why: "If the premises were true, the conclusion would follow. The problem is the first premise: cats can't fly. An argument can be well built and still start from a false fact.", hint: "Separate two questions: is the form right? Are the facts true?" },
        { prompt: "Build the argument: tap the pieces to place them.", slots: [{ label: "Premise 1" }, { label: "Premise 2" }, { label: "Conclusion" }],
          chips: ["The library closes at 2 pm.", "Many students can only study in the afternoon.", "The library should open in the afternoon.", "The library has lots of books."],
          why: "The first two explain the problem; the third is the proposal. \"It has lots of books\" is true, but it doesn't support the conclusion.", hint: "One sentence is true but doesn't help defend the proposal at all." }
      ], rule: { text: "An opinion says what you think. An argument says why someone else should think it too.", source: "Based on A. Weston, A Rulebook for Arguments (Hackett, 5th ed., 2017)." } },
      { title: "Hidden premises", steps: [
        { title: "Hidden premises", hook: "Often the most important reason is precisely the one nobody says." },
        { title: "The invisible reason", points: ["<b>Implicit premise</b>: a reason the argument needs but doesn't state.", "Spotting it lets you see whether the argument really holds up.", "Tip: ask yourself <i>what would have to be true for the conclusion to follow?</i>"] },
        { group: "Drama rehearsal", msgs: [{ text: "I'm not coming to rehearsal today: I've got a match." }, { text: "Fine…" }],
          prompt: "What premise is Marc hiding?", options: ["That the match is more important than the rehearsal.", "That he doesn't know his lines.", "That the rehearsal is boring."],
          why: "For \"I've got a match\" to justify skipping rehearsal, you have to assume the match comes first. That's exactly what Aitana could question.", hint: "What must Marc believe for \"I've got a match\" to be a good excuse?" },
        { prompt: "\"This phone is the most expensive, so it's the best.\" What's the hidden premise?", options: ["The more expensive, the better.", "The phone is new.", "All phones are the same."],
          why: "Once you bring the premise into the open (\"the more expensive, the better\"), it's clearly debatable.", hint: "What idea connects price with quality?" },
        { prompt: "Which argument hides a more questionable premise?", a: "It's raining; so you'd better take an umbrella.", b: "She has lots of followers; so she knows about nutrition.",
          why: "In A, the hidden premise (\"an umbrella protects you from rain\") is acceptable. In B (\"anyone with lots of followers knows about nutrition\") it's very doubtful.", hint: "Write down the missing premise in each case and ask whether you'd believe it." },
        { prompt: "Grandma Pepa says: \"Don't get that tattoo, you won't find a job afterwards.\" Tap the most likely implicit premise.",
          parts: ["Maybe Grandma thinks that ", { t: "some companies turn down people with tattoos" }, ", or that ", { t: "tattoos hurt" }, ", or that ", { t: "ink is expensive" }, "."],
          why: "Only the first links the tattoo with \"not finding a job\". The others may be true, but they don't support that conclusion.", hint: "Find the one that links \"tattoo\" with \"job\"." },
        { prompt: "\"You have to watch this series: it has five seasons.\" What hidden premises could there be?",
          options: ["A long series is a good series.", "If it has so many seasons, audiences must like it.", "Short series don't exist.", "The main character is blond."],
          why: "The first two connect \"five seasons\" with \"you have to watch it\". The others are unrelated (or false).", hint: "Two are correct." },
        { prompt: "Make the hidden premise explicit.", slots: [{ label: "Stated premise" }, { label: "Hidden premise" }, { label: "Conclusion" }],
          chips: ["Laia has studied a lot.", "Anyone who studies a lot passes.", "Laia will pass.", "Laia has a new pencil case."],
          why: "We'd normally just say \"Laia has studied a lot, she'll pass\". The premise \"anyone who studies a lot passes\" stays hidden… and it's the one we could question.", hint: "What general idea takes you from \"has studied\" to \"will pass\"?" }
      ], rule: { text: "Bring what's unsaid into the open: that's where an argument's weak points tend to hide.", source: "On enthymemes and implicit premises, see D. Walton, Informal Logic: A Pragmatic Approach (Cambridge UP, 2nd ed., 2008)." } }
    ] },
    { title: "Fallacies", lessons: [
      { title: "Attack the idea, not the person", steps: [
        { title: "Attack the idea, not the person", hook: "When you can't rebut an idea, it's tempting to attack whoever said it. Don't fall into the trap." },
        { group: "Student council", msgs: [{ text: "I propose a vegetable garden in the playground: we'd learn science and eat more vegetables." }, { text: "Yeah, right, you can't even water a cactus." }],
          prompt: "What is Pau doing?", options: ["Rebutting the proposal.", "Attacking Aitana instead of the proposal.", "Providing a fact."],
          why: "It's a personal attack (ad hominem): it shifts attention to Aitana. Whether she's good at watering says nothing about whether the garden is a good idea.", hint: "Is Pau talking about the garden or about Aitana?" },
        { title: "Two classic traps", points: ["<b>Personal attack</b> (<i>ad hominem</i>): criticising the speaker instead of what they say.", "<b>Straw man</b>: distorting the opposing argument so it's easier to knock down.", "<b>How to respond</b>: go back to the original idea (\"That doesn't answer my proposal, which is…\")."] },
        { prompt: "Proposal: \"We should cut weekend homework.\" Which reply is a straw man?", a: "\"You want us to do nothing and never learn anything!\"", b: "\"If it's cut, we might not finish the syllabus: how would we make up for it?\"",
          why: "A distorts the proposal (cutting is not removing all effort). B discusses it as it is.", hint: "Which reply changes what was proposed?" },
        { prompt: "Fallacy or fair criticism?", labels: ["Fallacy", "Fair criticism"],
          cards: [{ t: "Ignore what he says about climate change: he drives everywhere." }, { t: "Their study has a sample of ten people: it's too small to generalise." }, { t: "She's in Year 7, so she has no idea how to organise the party." }, { t: "He says the canteen is more expensive, but the fee is the same as last year." }, { t: "You want to close the playground because you hate us having fun." }, { t: "The proposal doesn't explain where the money will come from." }],
          why: "Fair criticism targets the argument (data, sample, costs). Fallacies target the person or distort what was said." },
        { prompt: "Marc proposes limiting phones in class. Tap the part of Nerea's reply that is a personal attack.",
          parts: ["Nerea replies: ", { t: "\"Marc always wants to be in charge\"" }, " and, besides, ", { t: "\"phones help us look up information\"" }, "."],
          why: "\"Always wants to be in charge\" is about Marc, not the proposal. The second part is an argument (debatable, but on topic).", hint: "Which part is about Marc rather than phones?" },
        { prompt: "Pau says: \"Aitana wants to reduce plastic in the canteen, but she brings her snack wrapped in foil.\" What's Aitana's best reply?",
          options: ["\"What about you? You're always late!\"", "\"You're right about that, but my being inconsistent doesn't make the proposal false: let's talk about the canteen's waste.\"", "\"I'm not discussing this any more.\""],
          why: "Acknowledging the detail and steering back to the idea is the strongest response to a \"what about you?\" (tu quoque).", hint: "The best reply goes back to the topic without attacking." },
        { prompt: "Proposal: \"Catch-up classes should be online.\" Which replies rebut the idea rather than the person?",
          options: ["\"Not every student has a computer at home.\"", "\"You only say that because you're lazy.\"", "\"Online it's harder to ask questions.\"", "\"You always want the easy option.\""],
          why: "Replies 1 and 3 discuss the proposal (access and interaction). The other two attack whoever made it.", hint: "Two are about the classes and two are about the person." }
      ], rule: { text: "Attack arguments, never people. And if you distort the other side's idea, you're only rebutting a ghost.", source: "See D. Walton, Ad Hominem Arguments (University of Alabama Press, 1998) and T. Govier, A Practical Study of Argument (Wadsworth, 7th ed., 2010)." } },
      { title: "\"Everybody does it\"", steps: [
        { title: "\"Everybody does it\"", hook: "Many people believing something doesn't make it true. And there are hardly ever just two options." },
        { title: "Three traps of majorities and extremes", points: ["<b>Appeal to popularity</b> (<i>ad populum</i>): \"it's true because lots of people think so\".", "<b>False dilemma</b>: presenting two options as if they were the only ones.", "<b>Hasty generalisation</b>: drawing a general rule from very few cases."] },
        { group: "End of term", msgs: [{ text: "Either we all go on a trip to the river or we do nothing at the end of term." }, { text: "There are more options: a treasure hunt around town, a games day at school…" }],
          prompt: "Which trap does Marc spot?", options: ["False dilemma", "Personal attack", "Appeal to popularity"],
          why: "Nerea presents only two options (the river or nothing) when there are many more.", hint: "How many options does Nerea offer?" },
        { prompt: "Which trap is it?", labels: ["Popularity", "Generalisation"],
          cards: [{ t: "This channel has a million followers: it must be telling the truth." }, { t: "My cousin studied abroad and learned nothing: studying abroad is useless." }, { t: "The whole class has shared it, so it must be true." }, { t: "Two Year 9 students have failed: Year 9 is a disaster." }, { t: "If everybody does it, it can't be that bad." }, { t: "I tried an e-book and it tired my eyes: e-books are bad." }],
          why: "Popularity uses how many people believe something as proof. Generalisation draws a rule from very few cases." },
        { prompt: "Which sentence avoids the false dilemma?", a: "Either we ban phones or we accept that nobody studies.", b: "We could ban them, regulate their use or use them only for specific activities.",
          why: "B opens up the range of options; A presents two extremes as if there were nothing in between.", hint: "Which sentence offers more than two options?" },
        { prompt: "Tap the conclusion that generalises too much.", parts: ["Marc writes: \"I asked three friends and ", { t: "all three like reggaeton" }, ", so ", { t: "the whole school likes reggaeton" }, ".\""],
          why: "Three friends don't represent the whole school: the sample is tiny and not random.", hint: "Which part jumps from \"three people\" to \"everyone\"?" },
        { level: "Going further", prompt: "A survey of 1,200 randomly chosen students says 70% would prefer to start later. Is using it in a debate an appeal to popularity?",
          options: ["Yes, because it relies on what lots of people think.", "Not necessarily: if the question is what students prefer, the majority opinion is exactly the relevant fact.", "Yes: all surveys are fallacies."],
          why: "The fallacy is using popularity as proof of truth. Here nobody claims starting later is \"better\": a preference is being measured, and a large random sample is good evidence of it.", hint: "Distinguish between \"it's true because many believe it\" and \"we want to know what many think\"." }
      ], rule: { text: "The number of people who believe something is not a reason; the quality of the evidence is.", source: "Classification of informal fallacies from I. M. Copi, C. Cohen and K. McMahon, Introduction to Logic (Pearson, 14th ed., 2014)." } }
    ] },
    { title: "Rebuttal", lessons: [
      { title: "Rebutting with a method: the 4 Rs", steps: [
        { title: "Rebutting with a method", hook: "Rebutting isn't saying \"no\". It's showing why the other argument doesn't hold up." },
        { title: "The 4 Rs of rebuttal", points: ["<b>Restate</b>: fairly summarise what the other team said.", "<b>Refute</b>: point out the weak spot (fact, premise, conclusion…).", "<b>Reason</b>: give your reason or evidence.", "<b>Round off</b>: connect it to your side."] },
        { group: "Class debate", msgs: [{ text: "School uniforms remove social differences at school." }, { text: "They say uniforms remove social differences. But the differences still show in trainers, phones and bags. So uniforms don't solve the problem they claim to solve." }],
          prompt: "Which step is Nerea taking when she says \"They say uniforms remove social differences\"?", options: ["Restate", "Refute", "Round off"],
          why: "Starting by summarising the opposing argument shows you've listened and makes clear what you're rebutting.", hint: "Is she giving her idea or the other team's?" },
        { prompt: "Put the rebuttal in order using the 4 Rs.", slots: [{ label: "Restate" }, { label: "Refute" }, { label: "Reason" }, { label: "Round off" }],
          chips: ["The other team says homework improves grades.", "But they confuse doing more hours with learning more.", "Several studies find that, beyond a certain amount each day, homework stops improving performance.", "That's why we argue for less homework, but better designed.", "Homework is boring."],
          why: "First you summarise, then you point out the mistake, prove it and close with your side. \"It's boring\" rebuts nothing.", hint: "One piece is left over: it isn't a reason, it's an opinion." },
        { prompt: "Opposing argument: \"The cycle lane should be extended because it would improve safety.\" Which rebuttal is stronger?", a: "\"We disagree, full stop.\"", b: "\"It would improve safety, yes, but if it doesn't connect with existing routes, nobody will use it: it needs connecting first.\"",
          why: "B concedes a point and rebuts with a reason: a nuanced rebuttal, much harder to knock down.", hint: "Which one gives a reason?" },
        { prompt: "Rebuttal or mere contradiction?", labels: ["Rebuttal", "Mere contradiction"],
          cards: [{ t: "That's not true." }, { t: "That figure is fifteen years old: things have changed a lot since then." }, { t: "Well, I think the opposite." }, { t: "Their example is an isolated case: it shows no trend." }, { t: "That's ridiculous." }, { t: "Even if it were true, it doesn't explain why their measure would be the best option." }],
          why: "Rebutting requires a reason (date, sample, causal link…). Contradicting only denies." },
        { prompt: "Which strategies help rebut a piece of evidence?", options: ["Questioning whether the source is reliable.", "Checking whether the data is up to date.", "Laughing at whoever presented it.", "Checking whether the sample is representative."],
          why: "Source, date and sample are the three key questions about any piece of data. Laughing is a personal attack.", hint: "All but one attack the data, not the person." }
      ], rule: { text: "A good rebuttal does justice to the opposing argument before knocking it down.", source: "On objections and exceptions (rebuttals), see S. Toulmin, The Uses of Argument (Cambridge UP, updated ed., 2003)." } }
    ] },
    { title: "Public speaking and voice", lessons: [
      { title: "Your body speaks too", steps: [
        { title: "Your body speaks too", hook: "You can have the best argument in the world, but if nobody listens, it's useless." },
        { title: "Three tools of a speaker", points: ["<b>Eye contact</b>: spread it around the room, don't keep it glued to your notes.", "<b>Voice</b>: vary the volume and pace; pauses add strength.", "<b>Posture</b>: feet planted, hands visible and gestures that support what you say."] },
        { prompt: "Helps or hurts?", labels: ["Helps", "Hurts"],
          cards: [{ t: "Pausing just before the key idea." }, { t: "Reading the whole speech from your notes." }, { t: "Looking at different people in the audience." }, { t: "Saying \"um…\" every other sentence." }, { t: "Talking very fast to fit everything in." }, { t: "Lowering your voice at a specific moment to build suspense." }],
          why: "Anything that helps you connect with the audience (eye contact, pauses, varied voice) helps; anything that disconnects you (reading, fillers, rushing) hurts." },
        { prompt: "In the middle of your speech you realise you've given a wrong figure. What's best?", options: ["Carry on as if nothing happened.", "Stop, correct it briefly and carry on.", "Apologise for a whole minute."],
          why: "A brief correction shows rigour and confidence. Ignoring it could cost you dearly in the other team's rebuttal.", hint: "Think about what a confident, rigorous speaker would do." },
        { prompt: "Which opening grabs attention better?", a: "\"Good morning. Today we're going to talk about homework.\"", b: "\"How many hours did you spend on homework yesterday? Today we'll show you that more doesn't always mean better.\"",
          why: "A direct question involves the audience and announces the thesis. A is correct, but sparks no interest.", hint: "Which opening makes the audience think?" },
        { prompt: "Tap the filler words.", parts: ["\"Good afternoon. ", { t: "Um, well, like," }, " ", { t: "we argue that break time should be longer" }, " because ", { t: "resting improves concentration" }, ".\""],
          why: "Fillers (\"um\", \"well\", \"like\") undermine confidence. Replace them with a short silence: it sounds much better.", hint: "Look for the words that add no content." },
        { prompt: "What helps you control your nerves?", options: ["Breathing slowly before you go on.", "Rehearsing out loud.", "Memorising word for word without understanding.", "Having a card with your key ideas."],
          why: "Breathing, rehearsing and having an outline give you confidence. Memorising without understanding makes you freeze if you lose your thread.", hint: "One option increases the risk of your mind going blank." }
      ], rule: { text: "A well-placed pause is worth more than ten filler words.", source: "See C. Anderson, TED Talks: The Official TED Guide to Public Speaking (Houghton Mifflin Harcourt, 2016)." } }
    ] },
    { title: "Evidence and data", lessons: [
      { title: "Reliable sources", steps: [
        { title: "Reliable sources", hook: "A fact without a source is just a rumour with numbers." },
        { title: "Three questions to ask about data", points: ["<b>Who says so?</b> Authorship, expertise and interests.", "<b>When?</b> Data goes out of date.", "<b>How do they know?</b> Method, sample and original data. And, if you can, check it against a second independent source."] },
        { prompt: "Reliable or doubtful source?", labels: ["Reliable", "Doubtful"],
          cards: [{ t: "A report by an official statistics agency with its methodology published." }, { t: "A screenshot of a message with no author or date." }, { t: "A peer-reviewed scientific article." }, { t: "A video of someone saying \"a doctor told me\"." }, { t: "A news story that cites the original study and links to the data." }, { t: "A website selling the product it says is the best." }],
          why: "A source is reliable when we know who made it, how and when, and it has no direct interest in the result." },
        { prompt: "In a debate, what's the best way to cite a figure?", options: ["\"It's been proven.\"", "\"According to [organisation], in a [year] study of [number] people…\"", "\"I saw it online.\""],
          why: "Saying who, when and with what sample lets the jury weigh the figure… and makes it hard for the other team to pick it apart.", hint: "Which option answers all three questions: who, when and how?" },
        { prompt: "You want to argue that noise affects concentration. Which evidence is more useful?", a: "\"Lots of people say noise is annoying.\"", b: "\"A study compared the results of students in noisy and quiet classrooms.\"",
          why: "B compares situations systematically. A only collects impressions (and appeals to popularity).", hint: "Which is based on a comparison rather than impressions?" },
        { prompt: "Tap the weak point of the source.", parts: ["\"According to ", { t: "a study I read a while ago" }, ", ", { t: "80% of young people" }, " ", { t: "never read" }, ".\""],
          why: "We don't know who did the study, when or how: it's impossible to check.", hint: "Which part doesn't answer \"who, when, how\"?" },
        { prompt: "Before using a figure in a debate, what should you check?", options: ["Who published it.", "How recent it is.", "Whether it proves you right.", "Whether other sources say the same."],
          why: "A figure that proves you right isn't more reliable: that's exactly when you need to check it most (confirmation bias).", hint: "One option is a trap: confirmation bias." }
      ], rule: { text: "Before you cite, ask: who says so, when, and how do they know?", source: "Inspired by the \"lateral reading\" approach of S. Wineburg and S. McGrew (Stanford History Education Group, 2017)." } }
    ] },
    { title: "Impromptu debate", lessons: [
      { title: "15 minutes to prepare", steps: [
        { title: "15 minutes to prepare", hook: "You don't know the topic until the last minute. You have little time… but you can have a plan." },
        { title: "A four-step plan", points: ["<b>1. Define</b> the topic: what does each key word mean?", "<b>2. Brainstorm</b> for and against (the other side too!).", "<b>3. Choose</b> 2 or 3 strong arguments and give each one a piece of evidence.", "<b>4. Prepare</b> the opening and a final sentence."] },
        { prompt: "Topic: \"Should homework be banned in primary school?\" What do you do first?", options: ["Write the whole speech.", "Define what we mean by \"homework\" and \"ban\".", "Look for a joke to start with."],
          why: "If you don't define the terms, you may end up arguing about something different from the other team.", hint: "Before you argue, you need to know exactly what you're talking about." },
        { prompt: "Good use of the 15 minutes or a waste of time?", labels: ["Good use", "Waste of time"],
          cards: [{ t: "Splitting the team: who looks for data and who prepares the rebuttal." }, { t: "Arguing for ten minutes about whether the topic is fair." }, { t: "Anticipating the other team's two most likely arguments." }, { t: "Writing the introduction word for word." }, { t: "Jotting ideas down in short outlines." }],
          why: "With little time, you need to share out tasks, anticipate and outline. Writing everything out or complaining about the topic eats up precious minutes." },
        { prompt: "Topic: \"Should school start at 9.00 instead of 8.00?\" Which arguments are in favour?",
          options: ["Teenagers tend to fall asleep later.", "School transport timetables would get more complicated.", "Attention in the first lesson could improve.", "Families who start work early would find it harder."],
          why: "1 and 3 support the change. 2 and 4 are arguments against… which you'll also want ready to rebut!", hint: "Two are for and two are against." },
        { prompt: "Which preparation outline is more useful?", a: "A list of twelve ideas in no particular order.", b: "Three arguments, each with a piece of evidence and a possible objection.",
          why: "Fewer ideas, but well built and with the rebuttal anticipated: that's what scores.", hint: "Quality or quantity?" },
        { prompt: "Put the preparation steps in order.", slots: [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }, { label: "Step 4" }],
          chips: ["Define the key words.", "Brainstorm for and against.", "Choose the strongest arguments.", "Prepare the opening and the close.", "Write out the whole speech."],
          why: "Define → generate ideas → select → prepare the start and the end. Writing everything out won't fit into 15 minutes.", hint: "One piece is left over." }
      ], rule: { text: "In an impromptu debate, it's not who has the most ideas who wins, but who chooses and orders them best.", source: "Common practice in school debate leagues. Try it in the \"Impromptu\" mode of the Debate room." } }
    ] },
    { title: "Rules and roles", lessons: [
      { title: "Who does what in a debate", steps: [
        { title: "Who does what in a debate", hook: "Every speech has a job. Get it wrong and you lose points even if you speak very well." },
        { title: "Three speeches, three jobs", points: ["<b>Opening speech</b>: presents your side, defines the topic and sets out your line of argument.", "<b>Rebuttal</b>: answers the opposing arguments and reinforces your own.", "<b>Closing speech</b>: sums up the debate and shows why you've won. No new arguments!"] },
        { prompt: "Opening or closing speech?", labels: ["Opening speech", "Closing speech"],
          cards: [{ t: "\"Today we'll defend three ideas…\"" }, { t: "\"Throughout this debate we have shown that…\"" }, { t: "\"By ‘social media’ we mean the platforms where…\"" }, { t: "\"The other team hasn't answered our second argument; therefore…\"" }, { t: "\"Our line of argument focuses on…\"" }],
          why: "The opening announces and defines; the closing takes stock of what happened in the debate." },
        { prompt: "In the closing speech, a speaker presents a new figure that hadn't come up before. What happens?", options: ["It's a good surprise tactic.", "It's usually penalised: the closing speech mustn't introduce new arguments.", "It doesn't matter at all."],
          why: "The other team can no longer answer it. That's why most rules penalise it. Always check your tournament's rules.", hint: "Can the other team respond to that figure?" },
        { prompt: "Which sentence is typical of a rebuttal?", a: "\"They said the measure is expensive, but they haven't considered the long-term savings.\"", b: "\"Good morning, members of the jury: today we'll argue for the motion.\"",
          why: "A answers an opposing argument directly. B is the start of an opening speech.", hint: "Which one answers the other team?" },
        { prompt: "What does a debate jury usually assess?", options: ["How solid the arguments are.", "The quality of the evidence.", "Who speaks loudest.", "The ability to rebut and respond."],
          why: "Voice matters insofar as it communicates well, but shouting louder doesn't score. Check your tournament's official rubric.", hint: "One option has nothing to do with the quality of the debate." },
        { prompt: "Tap what Pau shouldn't say in a closing speech.", parts: ["\"", { t: "We have shown that the current timetable harms rest." }, " ", { t: "We also have a new figure we haven't mentioned yet." }, " ", { t: "That's why we ask for your vote." }, "\""],
          why: "Introducing new data in the closing speech is the classic role mistake: the other team can't rebut it.", hint: "Remember: no new arguments in the closing speech." }
      ], rule: { text: "Each speech, one job: open, rebut or close. Don't mix them up.", source: "General structure of school academic debates. Always check the official rules of the tournament you take part in." } }
    ] }
  ],
  CLAIMS: [
    { author: "Rubén, Year 10", text: "Since we got interactive whiteboards, maths grades have dropped. Interactive whiteboards make us learn less.", flaw: "Correlation doesn't imply causation", flawKeys: ["cause", "correlation", "coincid", "other factors", "doesn't mean", "does not mean", "doesn't prove", "other reasons", "could be"], explain: "Two things happening at the same time doesn't mean one causes the other. Grades may have dropped for many other reasons (syllabus, teachers, timetables…)." },
    { author: "Lidia, Year 9", text: "My neighbour dropped out of school and now earns lots of money with a video channel. Studying is useless.", flaw: "Hasty generalisation", flawKeys: ["one case", "single case", "generalis", "generaliz", "exception", "most people", "data", "isolated", "everyone"], explain: "A single (exceptional) case doesn't allow you to draw a general rule. You'd need data about what happens to most people." },
    { author: "Joel, Year 8", text: "If we're allowed to wear caps in class, soon we'll come in pyjamas and end up with no rules at all.", flaw: "Slippery slope", flawKeys: ["slippery", "doesn't have to", "does not lead", "exaggerat", "consequence", "step", "doesn't mean", "leap"], explain: "It assumes, without evidence, that a first step will inevitably lead to a chain of extreme consequences." },
    { author: "Marta, Year 12", text: "This soft drink is advertised by the most famous footballer in the world, so it must be healthy.", flaw: "Irrelevant authority", flawKeys: ["authority", "expert", "footballer", "not a doctor", "nutrition", "advert", "paid", "doesn't know"], explain: "Being an expert in football doesn't make someone an expert in nutrition. Besides, he's paid to advertise it." },
    { author: "Iker, Year 10", text: "Either they let us use phones in class or we're going back to the Middle Ages.", flaw: "False dilemma", flawKeys: ["options", "alternative", "middle ground", "two", "regulat", "extreme", "in between"], explain: "Two extremes are presented as the only options, when there are plenty in between (regulated use, specific activities…)." },
    { author: "Sara, Year 9", text: "Millions of people watch that show every night; therefore, it's a good show.", flaw: "Appeal to popularity", flawKeys: ["majority", "popular", "lots of people", "audience", "doesn't mean", "quality", "millions"], explain: "Being popular doesn't prove it's good: audience figures measure success, not quality." },
    { author: "Hugo, Year 12", text: "There's no need to listen to the student council's proposal about the canteen: they're just fifteen-year-old kids.", flaw: "Personal attack", flawKeys: ["person", "age", "ad hominem", "proposal", "idea", "arguments", "doesn't matter who"], explain: "The proposal is dismissed because of the proposers' age, without looking at its content." },
    { author: "Noa, Year 10", text: "Video games are violent, and that's why young people today are more aggressive than ever.", flaw: "Doubtful premise and unproven causation", flawKeys: ["not all", "data", "more aggressive", "cause", "prove", "generalis", "studies", "than ever"], explain: "It generalises (not all video games are violent), assumes young people are \"more aggressive than ever\" without data, and attributes the cause without proving it." },
    { author: "Àlex, Year 8", text: "Nobody has proved that telepathy doesn't exist; therefore, it exists.", flaw: "Appeal to ignorance", flawKeys: ["ignorance", "burden of proof", "prove", "doesn't prove", "evidence", "whoever claims"], explain: "Something not having been disproved doesn't prove it's true. The burden of proof lies with whoever makes the claim." },
    { author: "Clara, Year 9", text: "The end-of-year trip has always been to the beach; there's no point changing it.", flaw: "Appeal to tradition", flawKeys: ["tradition", "always", "custom", "doesn't mean", "better", "change"], explain: "The fact that something has always been done a certain way doesn't prove it's the best option." },
    { author: "Dani, Year 10", text: "People who want to cut homework actually just want never to study.", flaw: "Straw man", flawKeys: ["distort", "straw man", "didn't say", "cutting isn't", "exaggerat", "twist", "eliminat"], explain: "The opposing position is distorted (cutting ≠ eliminating study) to make it easier to attack." },
    { author: "Laia, Year 12", text: "If a product is natural, it's good for your health.", flaw: "Appeal to nature", flawKeys: ["natural", "poison", "mushroom", "doesn't mean", "toxic", "not everything"], explain: "Many natural substances are harmful (some mushrooms, poisons…). \"Natural\" doesn't equal \"healthy\"." },
    { author: "Pol, Year 8", text: "I wore my blue T-shirt to the exam and passed: it's my lucky T-shirt.", flaw: "Post hoc (after it, therefore because of it)", flawKeys: ["chance", "coincid", "cause", "studying", "post hoc", "doesn't mean", "after"], explain: "Passing after wearing the T-shirt doesn't mean the T-shirt caused it." },
    { author: "Irene, Year 10", text: "We've spent so much on the end-of-year party that we can't cancel it now, even if it rains.", flaw: "Sunk cost", flawKeys: ["spent", "already", "cost", "get back", "future", "decide", "regardless"], explain: "Money already spent isn't recovered by carrying on. The decision should depend on what makes sense now and in the future." }
  ],
  TOPICS: [
    "Should mobile phones be banned in schools?", "Should learning to code be compulsory in secondary school?", "Should video games be considered a sport?", "Should school meals be free?",
    "Should artificial intelligence be allowed for homework?", "Should the voting age be lowered to 16?", "Should school uniforms be compulsory?", "Should private cars be banned from city centres?",
    "Do social media do teenagers more harm than good?", "Should traditional exams be scrapped?", "Should tourism in cities be limited?", "Should community service be compulsory for students?",
    "Should content creators who talk about health need a qualification?", "Should the school week be four days long?", "Should fast-food advertising be banned during children's TV hours?", "Should homework be optional?",
    "Should school start at 9.00?", "Should number grades be replaced by written reports?", "Should studying two foreign languages be compulsory?", "Should there be a minimum age for social media?"
  ],
  IDEES: [
    "Winning an argument is not the same as being right.", "If you only know your own arguments, you don't know the topic yet.", "A good question takes apart more than a shout.", "Before you share it, ask: who says so and how do they know?",
    "Changing your mind in the face of good evidence isn't losing: it's learning.", "The silence of a pause is part of the speech too.", "A fact without a source is a rumour with numbers.", "Rebutting means answering the best version of the opposing argument.",
    "If you can't explain it briefly, it isn't clear to you yet.", "Listening well is half of knowing how to reply."
  ],
  SALA_RUBRIC: [
    { title: "Thesis and position", desc: "The position is clear from the start and is maintained." },
    { title: "Arguments and structure", desc: "Clear, well-ordered and connected arguments." },
    { title: "Evidence", desc: "Relevant, cited data, examples or sources." },
    { title: "Rebuttal", desc: "Answers or anticipates the opposing arguments." },
    { title: "Delivery", desc: "Voice, pace, eye contact and body language." },
    { title: "Time management", desc: "Makes good use of the time without running over." }
  ],
  DEFAULT_TURN_NAMES: ["Opening speech", "Rebuttal 1", "Rebuttal 2", "Closing speech"],
  TURN_MISSIONS: {
    "Opening speech": "Present your side, define the key terms and set out your line of argument.",
    "Rebuttal 1": "Answer the other team's main arguments and reinforce your own.",
    "Rebuttal 2": "Go deeper into the rebuttal and close any open fronts.",
    "Closing speech": "Sum up the debate and explain why you've won. No new arguments."
  }
};
