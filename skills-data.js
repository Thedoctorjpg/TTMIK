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