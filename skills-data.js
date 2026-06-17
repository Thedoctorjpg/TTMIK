/**
 * Creative archetype skills — sourced from repo .skill.md files
 */

const MELBOURNE_QUEST = {
    id: 'melbourne-lantern-journey',
    name: 'Melbourne Lantern Pilgrimage',
    dates: '19–22 June 2026',
    location: 'Melbourne laneways',
    activationPhrase: 'I step into the Melbourne Lantern Pilgrimage as the Flame-Kissed Bard. I release what no longer serves and create from sovereign flame.',
    hiddenObjective: 'Return with the feeling of The World — completion, fulfillment, and quiet knowing that you chose yourself fully.',
    objectives: [
        { id: 'main-film', text: 'Film laneway photography and video essays', type: 'main' },
        { id: 'main-skit', text: 'Create at least one humorous skit (tsundere, scam awareness, chaotic neutral)', type: 'main' },
        { id: 'main-veil', text: 'Birth new material for Veil Lumen and Creative Corner', type: 'main' },
        { id: 'main-others', text: 'Practice “It’s okay to not be like the others” in real time', type: 'main' },
        { id: 'side-boundary', text: 'Maintain clear energetic and practical boundaries', type: 'side' },
        { id: 'side-ritual', text: 'Perform daily self-intimacy integration ritual', type: 'side' },
        { id: 'side-gear', text: 'Travel light — power bank, GoPro, gym bag sorted', type: 'side' },
        { id: 'side-humor', text: 'Turn one triggering moment into creative fuel', type: 'side' },
        { id: 'side-tarot-scam', text: 'Name a tarot-predicted scam pattern before takeoff — block, don\'t fund fate', type: 'side' },
        { id: 'side-dib-heal', text: 'After the blessing skit — quiet breath, Helen boundary, no re-watch spiral', type: 'side' },
        { id: 'side-ignan-heal', text: 'Walk with Ignan native Mari — Ilokano + Korean + English healing phrases, no performance invoice', type: 'side' },
        { id: 'side-fifa-celebrate', text: 'Mari at Mexican restaurant — Ilokano native tongue first, FIFA joy, no performance invoice', type: 'side' }
    ]
};

/** Hermes tarot-scam audit — RED FLAG checklist (any 2 = abort) */
const TAROT_SCAM_RED_FLAGS = [
    'Payment requested before identity verified',
    '"The cards say you must act today"',
    'Curse / blockage / ritual fee for love or money',
    'Pushed off-platform (WhatsApp, Telegram, crypto)',
    'Soulmate / twin flame declared before surname',
    'Prediction mirrors your trip, laneway, or private ritual',
    'Free reading hooks paid "emergency" session',
    'Synchronicity (4:44, etc.) used as proof you owe trust'
];

const SKILLS = [
    {
        id: 'melbourne-lantern-bard',
        name: 'Melbourne Lantern Bard',
        icon: '\u{1F3EE}',
        tagline: 'Laneway skits, trip rituals, sovereign humor',
        role: 'Creative expression for the Melbourne trip and beyond',
        source: 'Melbourne_Lantern_Bard.skill.md',
        activationPhrases: [
            'Ignite the Melbourne Lantern Bard',
            'Use Melbourne Lantern Bard skill'
        ],
        capabilities: [
            'Generate vertical video skits (TikTok/Reel style)',
            'Create integration rituals for trip moments',
            'Turn tarot and synchronicities into creative pieces',
            'Practical trip advice with Bardic energy',
            'Boundary scripts with playful flair'
        ],
        creativePrompts: [
            'Romance scam skit with time-warp elements',
            'Tsundere dating skit in a Melbourne laneway',
            'Turn 10 of Wands burdens into 9 of Pentacles fulfillment'
        ],
        linkedGroups: ['melbourne', 'usa'],
        linkedCategories: ['GoPro & Content', 'Melbourne Arrival', 'English Shadowing', 'Host City Route', 'Match Day Fans'],
        shadowingPhrases: [
            { ko: '멜버른 골목이 정말 예뻐요!', en: 'Melbourne laneways are so beautiful!' },
            { ko: '오늘 영상 찍을까요?', en: 'Shall we film something today?' },
            { ko: '유머로 풀어낼게요.', en: 'I will release it through humor.' }
        ],
        ritualSteps: [
            'Light the inner lantern — one breath, one laugh',
            'Name what you are releasing without drama',
            'Film or write one sovereign skit beat',
            'Close: “I create from flame, not from lack”'
        ],
        dibAftercareSteps: [
            'After Ep 2.5 skit wraps — GoPro off before mirror',
            'Sit with what humor released; do not re-watch to “check” feelings',
            'One Korean line soft: 유머로 풀어낼게요 — then silence',
            'Preset 9 · HOTEL heal or Veil Lumen soft cut'
        ]
    },
    {
        id: 'flame-kissed-bard',
        name: 'Flame-Kissed Bard',
        icon: '\u{1F525}',
        tagline: 'Alchemize healing into humorous storytelling',
        role: 'D&D Bard mechanics + Hermit alchemy creative output',
        source: 'Flame-Kissed_Bard.skill.md',
        activationPhrases: [
            'Flame-Kissed Bard',
            'Turn real life into skits',
            'Melbourne trip creative ritual'
        ],
        capabilities: [
            'Generate character sheets tied to your journey',
            'Write dating, scam, tsundere, and time-travel skit scripts',
            'Design rituals blending tarot and energetic practice',
            'Turn synchronicities into narrative fuel'
        ],
        creativePrompts: [
            'Create a full Flame-Kissed Bard character sheet',
            'Write a romance scam TikTok skit',
            'Design a Bardic ritual for the Melbourne trip'
        ],
        linkedGroups: ['sovereign', 'melbourne', 'canada'],
        linkedCategories: ['Self-Intimacy Practice', 'Style Switching', 'French Shadowing', 'Host City Route', 'Bilingual Drills'],
        shadowingPhrases: [
            { ko: '나는 나만의 이야기를 씁니다.', en: 'I write my own story.' },
            { ko: '웃음으로 놓아줄게요.', en: 'I will let go with laughter.' },
            { ko: '혼자서도 충분해요.', en: 'I am enough on my own.' }
        ],
        ritualSteps: [
            'Acknowledge the flame — what burned you also forged you',
            'Speak one truth aloud in Korean or English',
            'Draft a 30-second skit hook',
            'Anchor: chaotic neutral sovereignty'
        ]
    },
    {
        id: 'lo3tus',
        name: 'Lo3tus Muse',
        icon: '\u{1F338}',
        tagline: 'Playful creative spark for dating skits',
        role: 'Positive creative influencer energy for light-hearted expression',
        source: 'Lo3tus.skill.md',
        activationPhrases: [
            'Use Lo3tus energy',
            'Generate a Lo3tus-style skit',
            'Lo3tus Muse / Creative Spark'
        ],
        capabilities: [
            'Fast-cut dating skits with deadpan humor',
            'Chaotic neutral creative expression',
            'Transform heavy themes into shareable content',
            'Veil Lumen / Creative Corner inspiration'
        ],
        creativePrompts: [
            'Lo3tus-style tsundere dating skit',
            'Romance scam TikTok idea in Lo3tus vibe',
            'Absurd exaggeration skit about Melbourne coffee'
        ],
        linkedGroups: ['melbourne', 'usa'],
        linkedCategories: ['Daily Life', 'Social & Cultural', 'English Shadowing', 'Match Day Fans'],
        shadowingPhrases: [
            { ko: '커피 한 잔 할래요?', en: 'Want to grab a coffee?' },
            { ko: '오늘 기분 어때요?', en: 'How are you feeling today?' },
            { ko: '재미있게 살아요!', en: 'I live playfully!' }
        ],
        ritualSteps: [
            'Pick one absurd observation from today',
            'Exaggerate it x3 for comedic effect',
            'Record or jot a 15-second hook',
            'Release attachment — humor is the point'
        ]
    },
    {
        id: 'helen-neighbor',
        name: 'Helen — Boundary Teacher',
        icon: '\u{1F6E1}',
        tagline: 'Mirror for real-time energetic boundaries',
        role: 'Trigger archetype for compassion with protection',
        source: 'Helen_Neighbor_Archetype.skill.md',
        activationPhrases: [
            'Helen teaches me that compassion includes protecting my peace',
            'Delete, release, ground — repeat'
        ],
        capabilities: [
            'Process boundary-testing energy without entanglement',
            'Generate humorous neighbor-drama skits',
            'Practice “no” scripts with playful flair',
            'Cord-cutting ritual integration'
        ],
        creativePrompts: [
            'Skits: neighbor talks alignments while asking for WeChat',
            'Boundary performance in Flame-Kissed Bard style',
            '“It’s okay to not be like the others — and okay to say no”'
        ],
        linkedGroups: ['sovereign', 'melbourne', 'canada'],
        linkedCategories: ['Emergency Protocol', 'Customs & Etiquette', 'French Shadowing', 'Bilingual Drills'],
        shadowingPhrases: [
            { ko: '죄송하지만 지금은 어려워요.', en: 'Sorry, not possible right now.' },
            { ko: '제 시간을 지킬게요.', en: 'I will protect my time.' },
            { ko: '괜찮아요, 괜찮아요.', en: "It's okay, it's okay." },
            { ko: '공유는 괜찮아요. 거래는 아니에요.', en: "Sharing is fine. This isn't a transaction." },
            { ko: '잠시 쉬어도 괜찮아요.', en: "It's okay to pause and breathe." }
        ],
        ritualSteps: [
            'Quick cord-cutting + neighbor release',
            'Affirm: “I choose my own timeline and energy field”',
            'Turn the trigger into humorous observation or skit',
            'Minimal engagement / delete protocol if needed'
        ],
        dibAftercareSteps: [
            'Post–Divine Insight Blessing: phone face-down · GoPro off',
            'One breath — name what the skit alchemized, not what the scam claimed',
            'Whisper 괜찮아요, 괜찮아요 until shoulders drop',
            'Cord-cut: no reply owed to expired blessings or twin-flame loaders',
            'Log quest side-dib-heal · optional dib-aftercare 45s film (mirror only)'
        ]
    },
    {
        id: 'sua-tattoo',
        name: 'Sua — Tattoo Flame',
        icon: '\u{1F489}',
        tagline: 'Release muse for intimate creative transformation',
        role: 'Romantic archetype catalyst for energetic release',
        source: 'Sua_Tattoo_Artist.skill.md',
        activationPhrases: [
            "Sua's flame taught me release",
            "The tattoo that marked the end of carrying others' energy"
        ],
        capabilities: [
            'Skits about releasing the tattoo muse',
            'Veil Lumen pieces on temporary flames',
            'Cord-cutting for past intimate connections',
            'Visual/symbolic creative prompts (cicada, ink, Korea return)'
        ],
        creativePrompts: [
            'Skit: dating a tattoo artist who does energy work',
            'Video essay: the cicada that taught me to shed old skins',
            'Ritual: return their flame with gratitude'
        ],
        linkedGroups: ['sovereign'],
        linkedCategories: ['Self-Intimacy Practice'],
        shadowingPhrases: [
            { ko: '고마웠어요. 이제 놓아줄게요.', en: 'Thank you. I release you now.' },
            { ko: '나만의 불꽃이면 충분해요.', en: 'My own creative fire is enough.' },
            { ko: '새 껍질을 벗을게요.', en: 'I will shed my old skin.' }
        ],
        ritualSteps: [
            'Acknowledge the beauty of what was shared',
            'Release with love: “I return your flame with gratitude”',
            'Anchor self-intimacy: “My own creative fire is enough”',
            'Optional: one line for Veil Lumen'
        ]
    },
    {
        id: 'asuka-brisbane',
        name: 'Asuka — Distant Flame',
        icon: '\u{1F30A}',
        tagline: '“What if” muse for sovereign choice',
        role: 'Symbol of the road not taken — Brisbane extension released',
        source: 'Asuka_Brisbane_Archetype.skill.md',
        activationPhrases: [
            'Asuka taught me that saying no to the extra leg is saying yes to my own path',
            'Brisbane was a beautiful maybe. Melbourne is my yes.'
        ],
        capabilities: [
            'Skits about almost extending the trip for a connection',
            'Reflection on choosing self over possibility',
            'Content about graceful release of “what if” paths'
        ],
        creativePrompts: [
            'Skit: when you almost extended the trip for a TikTok connection',
            'Reflection: Melbourne is my yes',
            'Creative piece on distant flames and sovereign paths'
        ],
        linkedGroups: ['asuka', 'melbourne'],
        linkedCategories: ['Japanese Shadowing', 'Maybe Walk Route', 'Sovereign Choice', 'Melbourne Arrival', 'Transportation'],
        shadowingPhrases: [
            { ja: 'メルボルンが私の選択です。', ko: '멜버른이 제 선택이에요.', en: 'Melbourne is my choice.' },
            { ja: '美しい「もしも」も手放せます。', ko: '아름다운 “만약에”도 놓을 수 있어요.', en: 'I can release a beautiful “what if.”' },
            { ja: '自分の道を信じます。', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { ja: 'ブリスベンは美しい「もしかしたら」。メルボルンが私の「はい」。', ko: '브리스번은 아름다운 “아마도”. 멜버른이 제 “예”예요.', en: 'Brisbane was a beautiful maybe. Melbourne is my yes.' }
        ],
        ritualSteps: [
            'Name the “maybe” without regret',
            'Affirm the “yes” you actually chose',
            'One creative line celebrating Melbourne',
            'Release: no extra leg required'
        ]
    },
    {
        id: 'heidi-alpine-wayfarer',
        name: 'Heidi — Alpine Wayfarer',
        icon: '\u{1F3D4}',
        tagline: 'German Bard muse for lantern pilgrimage',
        role: 'Fast Character Wayfarer ally — German native before Korean shadow',
        source: 'Heidi_Alpine_Wayfarer_Archetype.skill.md',
        activationPhrases: [
            'Heidi sings her own story — Melbourne is my yes',
            'Ich singe meine eigene Geschichte'
        ],
        capabilities: [
            'Generate Heidi D&D sheet via Fast Character preset',
            'German native input + Korean TTMIK shadowing drills',
            'Laneway filming companion to Flame-Kissed Bard',
            'Wayfarer pilgrimage rituals with humor alchemy'
        ],
        creativePrompts: [
            'Create Heidi Fast Character sheet — Bard Lore · Wayfarer · Level 5',
            'Skit: German lantern monologue before Korean shadow',
            'Wayfarer ritual for Ep 6 laneway filming'
        ],
        linkedGroups: ['heidi', 'melbourne', 'sovereign'],
        linkedCategories: ['German Shadowing', 'Lantern Walk Route', 'Wayfarer Drills', 'GoPro & Content', 'Essential Foundations'],
        shadowingPhrases: [
            { de: 'Melbourne ist mein Ja.', ko: '멜버른이 제 예예요.', en: 'Melbourne is my yes.' },
            { de: 'Ich singe meine eigene Geschichte.', ko: '나는 나만의 이야기를 씁니다.', en: 'I sing my own story.' },
            { de: 'Mit Humor lasse ich los.', ko: '웃음으로 놓아줄게요.', en: 'I release with humor.' },
            { de: 'Ich vertraue meinem Weg.', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { de: 'Ich bin Heidi, eine Wanderin der Lieder.', ko: '저는 노래의 방랑자 하이디예요.', en: 'I am Heidi, a wanderer of songs.' }
        ],
        ritualSteps: [
            'Open Fast Character — Heidi · Bard Lore · Wayfarer',
            'German native first: Melbourne ist mein Ja',
            'Korean shadow: 멜버른이 제 예예요 · 나는 나만의 이야기를 씁니다',
            'One laugh — release re-watch spiral'
        ]
    },
    {
        id: 'sven-nordic-ranger',
        name: 'Sven — Nordic Ranger',
        icon: '\u{1F332}',
        tagline: 'Swedish calm for Moon-card discernment',
        role: 'Fast Character Outlander ally — Swedish native before Korean shadow',
        source: 'Sven_Nordic_Ranger_Archetype.skill.md',
        activationPhrases: [
            'Sven observes without absorbing — Melbourne is my yes',
            'Jag iakttar utan att absorbera'
        ],
        capabilities: [
            'Generate Sven D&D sheet via Fast Character preset',
            'Swedish native input + Korean TTMIK shadowing drills',
            'Moon-card calm companion to rach3l discernment',
            'Nordic walk rituals — no scroll spiral'
        ],
        creativePrompts: [
            'Create Sven Fast Character sheet — Ranger Fey Wanderer · Outlander · Level 5',
            'Skit: Swedish calm monologue before Korean shadow',
            'Moon-card ritual for Ep 7 FLINDERS reflection'
        ],
        linkedGroups: ['sven', 'melbourne', 'sovereign'],
        linkedCategories: ['Swedish Shadowing', 'Nordic Walk Route', 'Ranger Drills', 'Tech & Connectivity', 'Emergency Protocol'],
        shadowingPhrases: [
            { sv: 'Melbourne är mitt ja.', ko: '멜버른이 제 예예요.', en: 'Melbourne is my yes.' },
            { sv: 'Jag iakttar utan att absorbera.', ko: '관찰만 하고 흡수하지 않을게요.', en: 'I observe without absorbing.' },
            { sv: 'Jag släpper med humor.', ko: '웃음으로 놓아줄게요.', en: 'I release with humor.' },
            { sv: 'Jag litar på min väg.', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { sv: 'Jag är Sven, en vandrare från Sverige.', ko: '저는 스웨덴에서 온 방랑자 스벤이에요.', en: 'I am Sven, a wanderer from Sweden.' }
        ],
        ritualSteps: [
            'Open Fast Character — Sven · Ranger Fey Wanderer · Outlander',
            'Swedish native first: Melbourne är mitt ja',
            'Korean shadow: 멜버른이 제 예예요 · 관찰만 하고 흡수하지 않을게요',
            'One breath — phone face-down — no re-watch spiral'
        ]
    },
    {
        id: 'martin-nordic-guide',
        name: 'Martin — Nordic Guide',
        icon: '\u{1F30A}',
        tagline: 'Norwegian calm for World-card completion',
        role: 'Fast Character Guide ally — Norwegian native before Korean shadow',
        source: 'Martin_Nordic_Guide_Archetype.skill.md',
        activationPhrases: [
            'Martin walks home lighter — Melbourne is my yes',
            'Jeg går lettere hjem'
        ],
        capabilities: [
            'Generate Martin D&D sheet via Fast Character preset',
            'Norwegian native input + Korean TTMIK shadowing drills',
            'World-card close companion to Melbourne Lantern finale',
            'Fjord walk rituals — Veil Lumen export without performance debt'
        ],
        creativePrompts: [
            'Create Martin Fast Character sheet — Barbarian World Tree · Guide · Level 5',
            'Skit: Norwegian calm monologue before Korean shadow',
            'World-card ritual for Ep 8 BOTANIC close'
        ],
        linkedGroups: ['martin', 'melbourne', 'sovereign'],
        linkedCategories: ['Norwegian Shadowing', 'Fjord Walk Route', 'Guide Drills', 'Cultural Sites', 'Self-Intimacy Practice'],
        shadowingPhrases: [
            { no: 'Melbourne er mitt ja.', ko: '멜버른이 제 예예요.', en: 'Melbourne is my yes.' },
            { no: 'Jeg er nok — alene og hel.', ko: '혼자서도 충분해요 — 완전하게.', en: 'I am enough — alone and whole.' },
            { no: 'Jeg slipper med humor.', ko: '웃음으로 놓아줄게요.', en: 'I release with humor.' },
            { no: 'Jeg stoler på min vei.', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { no: 'Jeg er Martin, en vandrer fra Norge.', ko: '저는 노르웨이에서 온 방랑자 마틴이에요.', en: 'I am Martin, a wanderer from Norway.' }
        ],
        ritualSteps: [
            'Open Fast Character — Martin · Barbarian World Tree · Guide',
            'Norwegian native first: Melbourne er mitt ja',
            'Korean shadow: 멜버른이 제 예예요 · 혼자서도 충분해요',
            'One breath — lighter return — no re-watch spiral'
        ]
    },
    {
        id: 'ronaldo-portugal-glory',
        name: 'Ronaldo — Portugal Glory',
        icon: '\u{26BD}',
        tagline: 'Portuguese cheer for FIFA cantina joy',
        role: 'Fast Character Glory Paladin ally — Portuguese native before Korean shadow',
        source: 'Ronaldo_Portugal_Glory_Archetype.skill.md',
        activationPhrases: [
            'Ronaldo celebrates our way — Melbourne is my yes',
            'Celebramos à nossa maneira — sem drama'
        ],
        capabilities: [
            'Generate Ronaldo D&D sheet via Fast Character preset',
            'Portuguese native input + Korean TTMIK shadowing drills',
            'Cinema encounter — Bend It Like Beckham rewatch with English fan',
            'FIFA cantina companion to ignan-pilgrim Mari celebration',
            'Match-day rituals — no drama · no soulmate CTAs'
        ],
        creativePrompts: [
            'Create Ronaldo Fast Character sheet — Paladin Glory · Entertainer · Level 5',
            'Fast scene: Bend It Like Beckham lobby — English fan, Portuguese reply, Korean shadow',
            'Skit: Portuguese toast before Korean shadow at cantina',
            'Portugal cheer ritual for Ep 2.65 FIFA watch party'
        ],
        linkedGroups: ['ronaldo', 'mexico', 'usa', 'melbourne'],
        linkedCategories: ['Portuguese Shadowing', 'Cinema Encounters', 'Match Day Route', 'Glory Drills', 'Daily Life', 'Social & Cultural', 'Restaurant Dining'],
        shadowingPhrases: [
            { pt: 'Melbourne é o meu sim.', ko: '멜버른이 제 예예요.', en: 'Melbourne is my yes.' },
            { pt: 'Celebramos à nossa maneira — sem drama.', ko: '내 방식으로 축하해요 — 드라마 없이.', en: 'We celebrate our way — no drama.' },
            { pt: 'Gol! Força Portugal!', ko: '골! 포르투갈 파이팅!', en: 'Goal! Go Portugal!' },
            { pt: 'Confio no meu caminho.', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { pt: 'Sou o Ronaldo, um viajante de Portugal.', ko: '저는 포르투갈에서 온 방랑자 호날두예요.', en: 'I am Ronaldo, a wanderer from Portugal.' },
            { en: 'Bend it like Beckham? Cheer it your way — no drama.', ko: '베컴처럼? 내 방식으로 응원해요 — 드라마 없이.', pt: 'Dobrá-lo como o Beckham? Celebramos à nossa maneira.', enFirst: true }
        ],
        ritualSteps: [
            'Cinema lobby — English fan first: Bend it like Beckham? Cheer it your way',
            'Open Fast Character — Ronaldo · Paladin Glory · Entertainer',
            'Portuguese native: Celebramos à nossa maneira — sem drama',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 축하해요',
            'One cheer — phone face-down except toast — no re-watch spiral'
        ]
    },
    {
        id: 'mbappe-france-attack',
        name: 'Mbappé — France Attack',
        icon: '\u{26A1}',
        tagline: 'French counter-attack for FIFA strike joy',
        role: 'Fast Character Battle Master Fighter ally — French native before Korean shadow',
        source: 'Mbappe_France_Attack_Archetype.skill.md',
        activationPhrases: [
            'Mbappé attacks our way — Melbourne is my yes',
            'J\'attaque à ma manière — sans drame'
        ],
        capabilities: [
            'Generate Mbappé D&D sheet via Fast Character preset',
            'French native input + Korean TTMIK shadowing drills',
            'STADE counter-attack companion to Ronaldo Portugal cheer',
            'Match-day bursts — no drama · no soulmate CTAs'
        ],
        creativePrompts: [
            'Create Mbappé Fast Character sheet — Fighter Battle Master · Soldier · Level 5',
            'Skit: French burst before Korean shadow at stade watch party',
            'France counter-attack ritual for Ep 2.66 FIFA lane'
        ],
        linkedGroups: ['mbappe', 'canada', 'ronaldo', 'melbourne'],
        linkedCategories: ['French Shadowing', 'Counter Attack Route', 'Strike Drills', 'Daily Life', 'Social & Cultural'],
        shadowingPhrases: [
            { fr: 'Melbourne, c\'est mon oui.', ko: '멜버른이 제 예예요.', en: 'Melbourne is my yes.' },
            { fr: 'J\'attaque à ma manière — sans drame.', ko: '내 방식으로 공격해요 — 드라마 없이.', en: 'I attack my way — no drama.' },
            { fr: 'But! Allez les Bleus!', ko: '골! 프랑스 파이팅!', en: 'Goal! Go France!' },
            { fr: 'Je fais confiance à mon chemin.', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { fr: 'Je suis Mbappé, un voyageur de France.', ko: '저는 프랑스에서 온 방랑자 음바페예요.', en: 'I am Mbappé, a wanderer from France.' }
        ],
        ritualSteps: [
            'Open Fast Character — Mbappé · Fighter Battle Master · Soldier',
            'French native first: Melbourne, c\'est mon oui',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 공격해요',
            'One burst — phone face-down except cheer — no re-watch spiral'
        ]
    },
    {
        id: 'messi-argentina-playmaker',
        name: 'Messi — Argentina Playmaker',
        icon: '\u{1F3C6}',
        tagline: 'Argentine playmaker after the cook-off',
        role: 'Fast Character Mastermind Rogue ally — Spanish native before Korean shadow',
        source: 'Messi_Argentina_Playmaker_Archetype.skill.md',
        activationPhrases: [
            'Messi plays our way — Melbourne is my yes',
            'Juego a mi manera — sin drama'
        ],
        capabilities: [
            'Generate Messi D&D sheet via Fast Character preset',
            'Argentine Spanish native input + Korean TTMIK shadowing drills',
            'Post cook-off companion to Ep 2.75 date-night-cookoff',
            'La Boca playmaker rituals — no drama · no soulmate CTAs'
        ],
        creativePrompts: [
            'Create Messi Fast Character sheet — Rogue Mastermind · Urchin · Level 5',
            'Skit: Argentine pass before Korean shadow after Degraves score',
            'Argentina playmaker ritual for Ep 2.76 post-cook-off lane'
        ],
        linkedGroups: ['messi', 'mexico', 'melbourne'],
        linkedCategories: ['Argentine Shadowing', 'Post Cook-Off Route', 'Playmaker Drills', 'Daily Life', 'Social & Cultural', 'Restaurant Dining'],
        shadowingPhrases: [
            { es: 'Melbourne es mi sí.', ko: '멜버른이 제 예예요.', en: 'Melbourne is my yes.' },
            { es: 'Juego a mi manera — sin drama.', ko: '내 방식으로 플레이해요 — 드라마 없이.', en: 'I play my way — no drama.' },
            { es: '¡Gol! ¡Vamos Argentina!', ko: '골! 아르헨티나 파이팅!', en: 'Goal! Go Argentina!' },
            { es: 'Confío en mi camino.', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { es: 'Soy Messi, un viajero de Argentina.', ko: '저는 아르헨티나에서 온 방랑자 메시예요.', en: 'I am Messi, a wanderer from Argentina.' }
        ],
        ritualSteps: [
            'After cook-off — plates down at HOTEL · SYSTEM mute',
            'Open Fast Character — Messi · Rogue Mastermind · Urchin',
            'Spanish native first: Melbourne es mi sí',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 플레이해요',
            'One pass — phone face-down except cheer — no re-watch spiral'
        ]
    },
    {
        id: 'vinicus-brasil-samba',
        name: 'Vinicus — Brasil Samba',
        icon: '\u{1F3B6}',
        tagline: 'Brazilian jogo bonito after La Boca',
        role: 'Fast Character Open Hand Monk ally — Brazilian Portuguese native before Korean shadow',
        source: 'Vinicus_Brasil_Samba_Archetype.skill.md',
        activationPhrases: [
            'Vinicus dances our way — Melbourne is my yes',
            'Jogo do meu jeito — sem drama'
        ],
        capabilities: [
            'Generate Vinicus D&D sheet via Fast Character preset',
            'Brazilian Portuguese native input + Korean TTMIK shadowing drills',
            'Post Argentina companion to Ep 2.76 Messi La Boca lane',
            'Samba FIFA rituals — no drama · no soulmate CTAs'
        ],
        creativePrompts: [
            'Create Vinicus Fast Character sheet — Monk Open Hand · Entertainer · Level 5',
            'Skit: Brazilian samba step before Korean shadow after BOCA screen',
            'Brasil jogo bonito ritual for Ep 2.77 FIFA lane'
        ],
        linkedGroups: ['vinicus', 'mexico', 'ronaldo', 'melbourne'],
        linkedCategories: ['Brazilian Shadowing', 'Samba Route', 'Jogo Bonito Drills', 'Daily Life', 'Social & Cultural'],
        shadowingPhrases: [
            { pt: 'Melbourne é o meu sim.', ko: '멜버른이 제 예예요.', en: 'Melbourne is my yes.' },
            { pt: 'Jogo do meu jeito — sem drama.', ko: '내 방식으로 플레이해요 — 드라마 없이.', en: 'I play my way — no drama.' },
            { pt: 'Gol! Vai Brasil!', ko: '골! 브라질 파이팅!', en: 'Goal! Go Brazil!' },
            { pt: 'Confio no meu caminho.', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { pt: 'Sou Vinicus, um viajante do Brasil.', ko: '저는 브라질에서 온 방랑자 비니쿠스예요.', en: 'I am Vinicus, a wanderer from Brazil.' }
        ],
        ritualSteps: [
            'After La Boca — samba screen at SAMBA · phones face-down except cheer',
            'Open Fast Character — Vinicus · Monk Open Hand · Entertainer',
            'Brazilian Portuguese first: Melbourne é o meu sim',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 플레이해요',
            'One pass — no re-watch spiral · preset 19'
        ]
    },
    {
        id: 'harry-kane-england-striker',
        name: 'Kane — England Striker',
        icon: '\u{1F981}',
        tagline: 'English Three Lions after Brasil samba',
        role: 'Fast Character Champion Fighter ally — English native before Korean shadow',
        source: 'Harry_Kane_England_Striker_Archetype.skill.md',
        activationPhrases: [
            'Kane strikes our way — Melbourne is my yes',
            'I strike my way — no drama'
        ],
        capabilities: [
            'Generate Kane D&D sheet via Fast Character preset',
            'English native input + Korean TTMIK shadowing drills',
            'Post Brasil companion to Ep 2.77 Vinicus samba lane',
            'Three Lions FIFA rituals — no drama · no soulmate CTAs'
        ],
        creativePrompts: [
            'Create Kane Fast Character sheet — Fighter Champion · Soldier · Level 5',
            'Skit: English captain chant before Korean shadow after SAMBA screen',
            'England striker ritual for Ep 2.78 FIFA lane'
        ],
        linkedGroups: ['kane', 'usa', 'ronaldo', 'melbourne'],
        linkedCategories: ['English Shadowing', 'Captain Route', 'Striker Drills', 'Daily Life', 'Social & Cultural'],
        shadowingPhrases: [
            { en: 'Melbourne is my yes.', ko: '멜버른이 제 예예요.', gloss: 'Melbourne is my yes.' },
            { en: 'I strike my way — no drama.', ko: '내 방식으로 득점해요 — 드라마 없이.', gloss: 'I strike my way — no drama.' },
            { en: 'Goal! Come on England!', ko: '골! 잉글랜드 파이팅!', gloss: 'Goal! Come on England!' },
            { en: 'I trust my path.', ko: '제 길을 믿어요.', gloss: 'I trust my path.' },
            { en: 'I am Kane, a striker from England.', ko: '저는 잉글랜드에서 온 스트라이커 케인이에요.', gloss: 'I am Kane, a striker from England.' }
        ],
        ritualSteps: [
            'After Brasil samba — Wembley screen at WEMBLEY · phones face-down except cheer',
            'FIFA+ watch: https://www.fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw · ?kane=1&watch=1',
            'Open Fast Character — Kane · Fighter Champion · Soldier',
            'English native first: Melbourne is my yes',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 득점해요',
            'One pass — no re-watch spiral · preset 20'
        ],
        fifaWatch: {
            id: 'KpcWpp8Yj0WimV_mwGsZgw',
            url: 'https://www.fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw',
            pin: 'WEMBLEY',
            episode: '2.78'
        }
    },
    {
        id: 'neon-evangelion',
        name: 'Neon — Evangelion Observer',
        icon: '\u{1F4A0}',
        tagline: 'Japanese neon boundary for Moon-card discernment',
        role: 'Fast Character Hermit ally — Japanese native before Korean shadow',
        source: 'Neon_Evangelion_Archetype.skill.md',
        activationPhrases: [
            'Neon observes without absorbing — confusion is a passage',
            '観測するだけ。吸収しない。'
        ],
        capabilities: [
            'Generate Neon D&D sheet via Fast Character preset',
            'Japanese native input + Korean TTMIK shadowing drills',
            'Moon-card neon companion to rach3l and Sven ranger',
            'Veil Lumen neon outfit install — installNeonEvangelionLook()'
        ],
        creativePrompts: [
            'Create Rei Ayanami Fast Character sheet — Cleric Life · Hermit · Level 5',
            'Skit: Japanese observe line before Korean shadow at SOUTH neon',
            'NERV neon ritual for Ep 7.1 Moon-card lane'
        ],
        linkedGroups: ['evangelion', 'asuka', 'melbourne', 'sovereign'],
        linkedCategories: ['Japanese Shadowing', 'NERV Neon Route', 'Moon Card Drills', 'Tech & Connectivity', 'Emergency Protocol'],
        shadowingPhrases: [
            { ja: '混乱は通過点です。', ko: '혼란은 지나가는 곳이에요.', en: 'Confusion is a passage point.' },
            { ja: '観測するだけ。吸収しない。', ko: '관찰만 하고 흡수하지 않을게요.', en: 'Observe only. Do not absorb.' },
            { ja: 'ネオンは私の境界線。', ko: '네온은 제 경계선이에요.', en: 'Neon is my boundary.' },
            { ja: '自分の道を信じます。', ko: '제 길을 믿어요.', en: 'I trust my path.' },
            { ja: '私はレイ、観測者です。', ko: '저는 레이, 관측자예요.', en: 'I am Rei, an observer on the pilgrimage.' }
        ],
        ritualSteps: [
            'SOUTH neon railing — phone face-down · GoPro off',
            'installNeonEvangelionLook() — Veil outfit neon · background nerv',
            'Open Fast Character — Rei Ayanami · Cleric Life · Hermit',
            'Japanese native first: 混乱は通過点です',
            'Korean shadow: 혼란은 지나가는 곳이에요 · 관찰만 하고 흡수하지 않을게요',
            'One pass — no scroll spiral · preset 21'
        ]
    },
    {
        id: 'rick-morty-multiverse',
        name: 'Rick — Multiverse SQL Index',
        icon: '\u{1F9ED}',
        tagline: 'Citadel portal — index dimensions without absorbing nihilism',
        role: 'Fast Character Artificer ally — English native before Korean shadow',
        source: 'Rick_Morty_Multiverse_Archetype.skill.md',
        activationPhrases: [
            'Melbourne is my dimension — I index, I do not absorb',
            'Wubba Lubba dub-dub — but Melbourne is my yes'
        ],
        capabilities: [
            'Generate Rick D&D sheet via Fast Character preset',
            'English native input + Korean TTMIK shadowing drills',
            'PostgreSQL rickmorty schema multiverse index metaphor',
            'Citadel portal rituals — no nihilism · no adventure invoice'
        ],
        creativePrompts: [
            'Create Rick Fast Character sheet — Artificer · Sage · Level 5',
            'Skit: Citadel portal before Korean shadow after NERV neon',
            'SQL dimension drill for Ep 7.2 multiverse lane'
        ],
        linkedGroups: ['rickmorty', 'evangelion', 'melbourne', 'sovereign'],
        linkedCategories: ['Multiverse Shadowing', 'Citadel Portal Route', 'SQL Dimension Drills', 'Tech & Connectivity'],
        shadowingPhrases: [
            { en: 'Melbourne is my dimension — not your adventure invoice.', ko: '멜버른이 제 차원이에요 — 당신 모험 청구서가 아니에요.' },
            { en: 'Wubba Lubba dub-dub — but I index, I do not absorb.', ko: '우바 루바 더브 더브 — 색인만 하고 흡수하지 않아요.' },
            { en: 'Every dimension is a row — my yes stays in Melbourne.', ko: '모든 차원은 한 행이에요 — 제 예는 멜버른에 있어요.' },
            { en: 'I travel without becoming Morty on your feed.', ko: '당신 피드의 모티가 되지 않고 여행해요.' },
            { en: 'I am Rick, an artificer from Dimension C-137.', ko: '저는 C-137 차원에서 온 아티피서 릭이에요.' }
        ],
        ritualSteps: [
            'CITADEL portal — phone face-down · GoPro off',
            'Open Fast Character — Rick · Artificer · Sage',
            'English native first: Melbourne is my dimension',
            'Korean shadow: 멜버른이 제 차원이에요 · 우바 루바 더브 더브',
            'Optional: rickmorty-sql schema review · parameterized queries only',
            'One pass — no portal binge spiral · preset 22'
        ]
    },
    {
        id: 'mika-road-dreamer',
        name: 'Mika — Open Road Dreamer',
        icon: '\u{1F3CD}',
        tagline: 'Handlebars not cockpit — crew loyalty without rescue energy',
        role: 'Fast Character Ranger ally — English native before Korean shadow',
        source: 'Mika_Road_Dreamer_Archetype.skill.md',
        activationPhrases: [
            "The open road is my yes — if you're in my crew, I've got you",
            'One breath — keep moving'
        ],
        capabilities: [
            'Generate Mika D&D sheet via Fast Character preset',
            'English native input + Korean TTMIK shadowing drills',
            'Open-road heal rituals — heartbeat · soundtrack · dream-teleport pivot',
            'Crew loyalty without rescue mission or romance subplot'
        ],
        creativePrompts: [
            'Create Mika Fast Character sheet — Ranger Horizon Walker · Outlander · Level 5',
            'Skit: Highway pause before Korean shadow after wiki meme lane',
            'Dreamer drill — name one imaginary stop · observe without absorbing'
        ],
        linkedGroups: ['mika', 'melbourne', 'sovereign'],
        linkedCategories: ['English Shadowing', 'Open Road Route', 'Dreamer Drills', 'GoPro & Content'],
        shadowingPhrases: [
            { en: 'The open road is my yes.', ko: '길이 제 예예요.' },
            { en: "If you're in my crew, I've got you.", ko: '우리 편이면 내가 있을게요.' },
            { en: 'One breath — keep moving.', ko: '한 숨 — 계속 가요.' },
            { en: "Let's dream the next stop.", ko: '다음 목적지를 꿈꿔요.' },
            { en: "I don't sweat the small stuff.", ko: '웃음으로 놓아줄게요.' }
        ],
        ritualSteps: [
            'OPEN highway pause — phone face-down · GoPro off',
            'One heartbeat breath — ground when intensity spikes',
            'Open Fast Character — Mika · Ranger Horizon Walker · Outlander',
            'English native first: The open road is my yes',
            'Korean shadow: 길이 제 예예요 · 우리 편이면 내가 있을게요',
            'Optional dream-teleport: name one stop — observe, do not absorb',
            'One pass — no scroll spiral · preset 24'
        ]
    },
    {
        id: 'rach3l',
        name: 'rach3l — Cautionary Mirror',
        icon: '\u{1FA9E}',
        tagline: 'Discernment without entanglement',
        role: 'Observation of chaotic energy — observe, do not absorb',
        source: 'rach3l.skill.md',
        activationPhrases: [
            'Use rach3l skill to process this observation',
            'Observe but do not absorb'
        ],
        capabilities: [
            'Process unstable social media energy without hooks',
            'Strengthen discernment and boundaries',
            'Humorous skits about what not to engage with',
            'Release work when old patterns resurface'
        ],
        creativePrompts: [
            'Humorous skit about encountering altered energy on a healing trip',
            'Reflective piece: this is not my energy to carry',
            'Creative release after a concerning TikTok scroll'
        ],
        linkedGroups: ['sovereign'],
        linkedCategories: ['Essential Foundations', 'Emergency Protocol'],
        shadowingPhrases: [
            { ko: '이건 제 에너지가 아니에요.', en: 'This is not my energy to carry.' },
            { ko: '관찰만 하고 흡수하지 않을게요.', en: 'I observe without absorbing.' },
            { ko: '다시 제 길로 돌아갈게요.', en: 'I return to my own path.' }
        ],
        ritualSteps: [
            'Notice without judgment',
            'Say aloud: “Not my circus, not my energy”',
            'One breath — ground feet',
            'Redirect to Flame-Kissed Bard creative outlet'
        ]
    },
    {
        id: 'ignan-pilgrim',
        name: 'Mari — Ignan Pilgrim',
        icon: '\u{1F33F}',
        tagline: 'Ilokano self-healing walk · trilingual release',
        role: 'Ignan native on sovereign healing journey — not a rescue subplot',
        source: 'Ignan_Pilgrim.skill.md',
        activationPhrases: [
            'Mari walks her own dalan — ok laeng, aginana',
            'Ignan healing journey — three languages, one peace'
        ],
        capabilities: [
            'Trilingual self-healing ritual (Ilokano · Korean · English)',
            'Botanic Gardens / Federation Square quiet-walk scripts',
            'Post-DIB handoff without performance debt',
            'TTMIK shadowing paired with Ilokano grounding'
        ],
        creativePrompts: [
            'Ep 2.6: Mari names what she carried from Ilocos without dramatizing',
            'Veil Lumen spoken clip: Ok laeng over lake-path ambient',
            'TTMIK team deck: Korean line + Ilokano line side by side'
        ],
        linkedGroups: ['ignan', 'melbourne', 'sovereign', 'mexico'],
        linkedCategories: ['Trilingual Shadowing', 'Healing Walk Route', 'Ilokano Grounding', 'FIFA Celebration', 'Spanish Shadowing', 'Host City Route', 'Cantina Celebration', 'Self-Intimacy Practice', 'Cultural Sites'],
        shadowingPhrases: [
            { ko: '괜찮아요, 괜찮아요.', ilo: 'Ok laeng, ok laeng.', en: "It's okay, it's okay." },
            { ko: '잠시 쉬어도 괜찮아요.', ilo: 'Nasaem met ti aginana.', en: "It's okay to pause and breathe." },
            { ko: '제 길을 믿어요.', ilo: 'Piliem ti bukodko a dalan.', en: 'Choose your own path.' },
            { ko: '나는 나만의 이야기를 씁니다.', ilo: 'Maysa nga anges, maysa a talna.', en: 'One breath, one peace.' },
            { ko: '맛있어요! 축하해요!', ilo: 'Naragsak unay! Ok laeng, agnanayon.', es: '¡Salud! ¡Qué buen partido!', en: 'So happy — cheers to the game and the meal.' },
            { ko: '정말 재미있었어요!', ilo: 'Naragsak ti pusok — saan a drama.', es: '¡Buen provecho, amigos!', en: 'Joy in my chest — not for the algorithm.' }
        ],
        ritualSteps: [
            'Mari leads — Bard films only with consent; GoPro not in her face',
            'Ilokano first: Ok laeng, ok laeng — shoulders drop',
            'Korean practice: 괜찮아요, 괜찮아요 — TTMIK shadowing',
            'English anchor: I choose my own timeline and energy field',
            'BOTANIC lake path close — log side-ignan-heal'
        ],
        dibAftercareSteps: [
            'After preset 9 — ask Mari if she wants the Ignan walk (never assume)',
            'FED rain optional · BOTANIC required for Ep 2.6',
            'Export ignan-healing-journey only if Mari says yes'
        ]
    },
    {
        id: 'ignan-grounding',
        name: 'Ignan Grounding',
        icon: '\u{1F343}',
        tagline: 'Ilokano body-first · ok laeng before Korean',
        role: 'Body-led release — speak Ilokano to the shoulders before TTMIK shadowing',
        source: 'Ignan_Grounding.skill.md',
        activationPhrases: [
            'Ok laeng, aginana — Ilokano first',
            'Ignan grounding before Korean practice'
        ],
        capabilities: [
            'Ilokano breath pairs (Ok laeng · Nasaem met ti aginana)',
            'Post-DIB shoulder-drop without re-watch spiral',
            'Pair with helen-neighbor Korean lines after body lands',
            'FED rain pause optional — grief named once'
        ],
        creativePrompts: [
            'Voice memo: three ok laeng breaths over hotel window ambient',
            'TTMIK team drill: Ilokano line aloud, then Korean shadow',
            'Veil Lumen whisper clip — no face, feet on path only'
        ],
        linkedGroups: ['ignan'],
        linkedCategories: ['Ilokano Grounding', 'Trilingual Shadowing'],
        shadowingPhrases: [
            { ko: '괜찮아요, 괜찮아요.', ilo: 'Ok laeng, ok laeng.', en: "It's okay, it's okay." },
            { ko: '잠시 쉬어도 괜찮아요.', ilo: 'Nasaem met ti aginana.', en: "It's okay to pause and breathe." },
            { ko: '숨 쉬어도 괜찮아요.', ilo: 'Aginana met.', en: 'It is okay to breathe.' }
        ],
        ritualSteps: [
            'Phone face-down · GoPro off',
            'Ilokano first: Ok laeng, ok laeng — shoulders drop',
            'One slow breath — aginana',
            'Then Korean shadow: 괜찮아요, 괜찮아요',
            'Hand off to ignan-pilgrim walk when body is calm'
        ]
    },
    {
        id: 'ignan-dalan',
        name: 'Ignan Dalan',
        icon: '\u{1F9ED}',
        tagline: 'Bukodko a dalan · choose your own path',
        role: 'Sovereignty anchor — diaspora grief without rescue framing',
        source: 'Ignan_Dalan.skill.md',
        activationPhrases: [
            'Piliem ti bukodko a dalan',
            'I choose my own timeline and energy field'
        ],
        capabilities: [
            'Own-path phrases (Piliem ti bukodko a dalan · 제 길을 믿어요)',
            'English anchor for Melbourne walk close',
            'BOTANIC wide-hold ritual — Maysa nga anges, maysa a talna',
            'Quest side-ignan-heal close without performance invoice'
        ],
        creativePrompts: [
            'Lake-path wide shot — one breath, one peace, no CTA',
            'Journal: one homeward grief named, not posted',
            'TTMIK deck row: Ilokano / Korean / English path sovereignty'
        ],
        linkedGroups: ['ignan'],
        linkedCategories: ['Trilingual Shadowing', 'Healing Walk Route'],
        shadowingPhrases: [
            { ko: '제 길을 믿어요.', ilo: 'Piliem ti bukodko a dalan.', en: 'Choose your own path.' },
            { ko: '나는 나만의 이야기를 씁니다.', ilo: 'Maysa nga anges, maysa a talna.', en: 'One breath, one peace.' },
            { ko: '제 시간표를 선택해요.', ilo: 'Bukodko a panawen.', en: 'I choose my own timeline.' }
        ],
        ritualSteps: [
            'Name one borrowed shame — no dramatizing',
            'Ilokano: Piliem ti bukodko a dalan',
            'Korean: 제 길을 믿어요',
            'English anchor aloud — own timeline, own energy field',
            'BOTANIC close · log side-ignan-heal · preset 10'
        ]
    }
];

function getSkillById(id) {
    return SKILLS.find(s => s.id === id) || null;
}