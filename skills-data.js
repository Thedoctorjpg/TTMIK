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
        { id: 'side-ignan-heal', text: 'Walk with Ignan native Mari — Ilokano + Korean + English healing phrases, no performance invoice', type: 'side' }
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
        linkedGroups: ['melbourne'],
        linkedCategories: ['GoPro & Content', 'Melbourne Arrival'],
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
        linkedGroups: ['sovereign', 'melbourne'],
        linkedCategories: ['Self-Intimacy Practice', 'Style Switching'],
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
        linkedGroups: ['melbourne'],
        linkedCategories: ['Daily Life', 'Social & Cultural'],
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
        linkedGroups: ['sovereign', 'melbourne'],
        linkedCategories: ['Emergency Protocol', 'Customs & Etiquette'],
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
        linkedGroups: ['melbourne'],
        linkedCategories: ['Melbourne Arrival', 'Transportation'],
        shadowingPhrases: [
            { ko: '멜버른이 제 선택이에요.', en: 'Melbourne is my choice.' },
            { ko: '아름다운 “만약에”도 놓을 수 있어요.', en: 'I can release a beautiful “what if.”' },
            { ko: '제 길을 믿어요.', en: 'I trust my path.' }
        ],
        ritualSteps: [
            'Name the “maybe” without regret',
            'Affirm the “yes” you actually chose',
            'One creative line celebrating Melbourne',
            'Release: no extra leg required'
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
        linkedGroups: ['melbourne', 'sovereign'],
        linkedCategories: ['Self-Intimacy Practice', 'Cultural Sites', 'Daily Life'],
        shadowingPhrases: [
            { ko: '괜찮아요, 괜찮아요.', ilo: 'Ok laeng, ok laeng.', en: "It's okay, it's okay." },
            { ko: '잠시 쉬어도 괜찮아요.', ilo: 'Nasaem met ti aginana.', en: "It's okay to pause and breathe." },
            { ko: '제 길을 믿어요.', ilo: 'Piliem ti bukodko a dalan.', en: 'Choose your own path.' },
            { ko: '나는 나만의 이야기를 씁니다.', ilo: 'Maysa nga anges, maysa a talna.', en: 'One breath, one peace.' }
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
    }
];

function getSkillById(id) {
    return SKILLS.find(s => s.id === id) || null;
}