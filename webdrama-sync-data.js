/**
 * Melbourne Lantern webdrama ↔ TTMIK sync map
 * Pins, episodes, and reels → skills, lesson categories, shadowing, quest objectives
 * Bardic inspiration unifies TTMIK · lets-cook · girls-love · Veil-Lumen · RTDB · video-editor
 */

/** Cross-app pipeline — shoot order pulls optimised times from lets-cook transportSchedule */
const PIPELINE_SOURCES = {
    ttmik: {
        label: 'TTMIK Skills & Quest',
        paths: ['skills-data.js', 'Melbourne_Lantern_Bard.skill.md'],
        url: 'TTMIK.html',
        role: 'Shadowing · RED FLAGS · pilgrimage quest'
    },
    letsCook: {
        label: 'lets-cook · Date Night',
        paths: ['lets-cook/src/data/dateNightCookOff.js', 'lets-cook/src/data/transportSchedule.js'],
        url: 'http://localhost:5173/date-night',
        role: 'Degraves outing · 45 min cook-off · RTDB schedule phase 0'
    },
    girlsLove: {
        label: 'girls-love · After the Date',
        paths: ['girls-love/data/afterTheDate.js'],
        url: 'http://localhost:5190',
        role: 'Ch.1–4 novel beats · dawn Degraves · post-score dishes'
    },
    veilLumen: {
        label: 'Veil-Lumen · Creative Corner',
        paths: ['Veil-Lumen/js/skills-data.js'],
        url: 'http://localhost:5180',
        role: 'Bardic ritual · skill veil outputs · essay assembly'
    },
    rtdb: {
        label: 'RTDB-Auckland',
        paths: ['RTDB-Auckland/rtdb-config.json', 'lets-cook/src/data/rtdb-config.json'],
        role: 'Waitemata / Britomart depart · 30s refresh · 45s rotation before AKL leg'
    },
    videoEditor: {
        label: 'video-editor · Multiformat',
        paths: ['webdrama-edit-data.js', 'video-editor/melbourne-lantern-edits.json'],
        url: 'http://localhost:8000',
        role: 'Reel A/B · Ep 2.5 DIB · date-night-cookoff · after-the-date exports'
    },
    audit: {
        label: 'Tarot-scam audit',
        paths: ['audit/tarot-scam-avoidance-audit.md'],
        role: 'Scam PSA · divine insight · RED FLAG inventory'
    }
};

/** Bardic inspiration — theme thread across all pipeline sources */
const BARDIC_INSPIRATION = {
    theme: 'I create from flame, not from lack.',
    mantra: 'Not a date. Not a rescue. Lantern lit.',
    hostLine: 'This is NOT a date. It\'s a cook-off.',
    korean: '멜버른 골목이 정말 예뻐요',
    shootLanes: ['morning-block', 'date-night', 'dawn-after'],
    dateNightWindow: {
        outingStart: '17:00',
        ingredientCapEnd: '17:15',
        flatWhiteBy: '17:25',
        kitchenStart: '18:15',
        scoreStart: '19:15',
        homeBy: '20:10',
        dawnBeat: '06:12'
    },
    rtdbCadence: 'Refresh every 30s · rotate boards every 45s before Auckland airport leg',
    pipeline: PIPELINE_SOURCES,
    afterBlessingHeal: {
        label: 'Quiet reflection after Divine Insight Blessing',
        duration: '45s',
        pin: 'HOTEL',
        skillId: 'helen-neighbor',
        questId: 'side-dib-heal',
        shadowIndex: 2,
        shadowPhrase: { ko: '괜찮아요, 괜찮아요.', en: "It's okay, it's okay." },
        steps: [
            'GoPro off · phone face-down · one breath',
            'Name what the skit released — no re-watch spiral',
            'Helen cord-cut: "I choose my own timeline and energy field"',
            'Whisper boundary phrase · 괜찮아요, 괜찮아요',
            'Close: humor tended the wound — you do not owe the algorithm a reply'
        ]
    }
};

/** Self-healing factors — post-skit landing, boundaries, Veil soft cuts */
const HEALING_FACTORS = {
    theme: 'Humor tends the wound — quiet lands the peace.',
    mantra: 'One breath · one boundary · no re-watch spiral',
    factors: [
        { id: 'hermit-lantern', label: 'Hermit Lantern', phrase: 'One breath, one laugh', skillId: 'melbourne-lantern-bard' },
        { id: 'humor-release', label: 'Humor alchemy', ko: '유머로 풀어낼게요', skillId: 'melbourne-lantern-bard', edit: 'ep-2-5-dib' },
        { id: 'helen-boundary', label: 'Helen boundary', ko: '괜찮아요, 괜찮아요', skillId: 'helen-neighbor', shadowIndex: 2 },
        { id: 'pause-breathe', label: 'Pause OK', ko: '잠시 쉬어도 괜찮아요', skillId: 'helen-neighbor', shadowIndex: 4 },
        { id: 'cord-cut', label: 'Cord-cut', phrase: 'I choose my own timeline and energy field', skillId: 'helen-neighbor' },
        { id: 'post-dib', label: 'Post-DIB landing', pin: 'HOTEL', preset: 9, edit: 'dib-aftercare', questId: 'side-dib-heal' },
        { id: 'daily-ritual', label: 'Daily integration', questId: 'side-ritual', skillId: 'flame-kissed-bard' },
        { id: 'no-rewatch', label: 'No re-watch spiral', note: 'GoPro off before mirror · phone face-down' },
        { id: 'ignan-walk', label: 'Ignan healing walk', skillId: 'ignan-pilgrim', edit: 'ignan-healing-journey', questId: 'side-ignan-heal', pin: 'BOTANIC' }
    ],
    ignanJourney: {
        character: 'Mari',
        languages: ['ilo', 'ko', 'en'],
        activation: 'Mari walks her own dalan — ok laeng, aginana',
        episode: '2.6',
        preset: 10
    },
    postBlessing: null,
    urls: {
        ttmikStep4: 'TTMIK.html?step=4',
        ttmikHeal: 'TTMIK.html?heal=1',
        dibAftercare: 'http://localhost:8000/video-editor-ultimate.html?project=melbourne-lantern&format=dib-aftercare&aspect=9:16'
    }
};
HEALING_FACTORS.postBlessing = BARDIC_INSPIRATION.afterBlessingHeal;

const TTMIK_SYNC_PINS = {
    HOME: {
        label: 'Pre-trip home',
        place: 'Pack + activation ritual',
        episodes: [1],
        reels: [],
        skillId: 'flame-kissed-bard',
        categories: ['Essential Foundations'],
        questIds: ['side-gear'],
        formats: ['webdrama', 'trailer-vo']
    },
    MEL: {
        label: 'Melbourne Airport T1',
        place: 'Arrivals glass · transit cliffhanger',
        episodes: [1],
        reels: [],
        skillId: 'flame-kissed-bard',
        categories: ['Melbourne Arrival'],
        questIds: [],
        formats: ['webdrama', 'trailer']
    },
    HOSIER: {
        label: 'Hosier Lane',
        place: 'Graffiti wall mid-lane',
        episodes: [2, '2.5', 6, 8],
        reels: ['A', 'B'],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Melbourne Arrival'],
        questIds: ['main-film', 'main-skit', 'side-tarot-scam'],
        formats: ['webdrama', 'reel-a', 'reel-b', 'ep-2-5-dib', 'tiktok-15', 'youtube-short']
    },
    CENTRE: {
        label: 'Centre Place',
        place: 'Narrow laneway walk-through',
        episodes: [3, 6],
        reels: ['A', 'B'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Transportation'],
        questIds: ['main-film'],
        formats: ['webdrama', 'reel-a', 'reel-b']
    },
    DEGRAVES: {
        label: 'Degraves Street',
        place: 'Café strip · coffee tsundere · cook-off score · dawn croissant',
        episodes: [2, 3, '2.75'],
        reels: ['A', 'B'],
        skillId: 'lo3tus',
        categories: ['Daily Life', 'Social & Cultural'],
        questIds: ['main-others'],
        formats: ['webdrama', 'reel-a', 'reel-b', 'date-night-cookoff', 'after-the-date'],
        pipeline: ['letsCook', 'girlsLove'],
        cookOffPhases: ['outing', 'cookoff']
    },
    FLINDERS: {
        label: 'Flinders Street Station',
        place: 'Steps / clocks · tram monologue · date meet Flinders Lane end',
        episodes: [5, 7, '2.75'],
        reels: [],
        skillId: 'asuka-brisbane',
        categories: ['Transportation'],
        questIds: ['main-film'],
        formats: ['webdrama', 'veil-lumen-45', 'date-night-cookoff'],
        pipeline: ['letsCook']
    },
    FED: {
        label: 'Federation Square',
        place: 'Rain on glass · maybe reflection · Ignan grief pause',
        episodes: [5, '2.6'],
        reels: [],
        skillId: 'asuka-brisbane',
        categories: ['Melbourne Arrival', 'Self-Intimacy Practice'],
        questIds: ['side-ignan-heal'],
        formats: ['webdrama', 'veil-lumen', 'ignan-healing-journey']
    },
    SOUTH: {
        label: 'Southbank Promenade',
        place: 'Yarra railing · night neon',
        episodes: [4, 7],
        reels: [],
        skillId: 'helen-neighbor',
        categories: ['Emergency Protocol'],
        questIds: ['side-boundary', 'side-humor'],
        formats: ['webdrama', 'veil-lumen', 'helen-clip-20']
    },
    COLLINS: {
        label: 'Collins Street',
        place: 'Business walk · invoice beat',
        episodes: [3],
        reels: ['A'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Social & Cultural'],
        questIds: ['side-humor'],
        formats: ['webdrama', 'reel-a']
    },
    PRINCES: {
        label: 'Princes Bridge',
        place: 'Dawn timelapse · finale wide',
        episodes: [7, 8],
        reels: [],
        skillId: 'melbourne-lantern-bard',
        categories: ['Cultural Sites'],
        questIds: ['main-film', 'main-veil'],
        formats: ['webdrama', 'recap-short', 'trailer']
    },
    BOTANIC: {
        label: 'Royal Botanic Gardens',
        place: 'Lake path · lantern pass · Ignan healing walk',
        episodes: [8, '2.6'],
        reels: ['B'],
        skillId: 'ignan-pilgrim',
        categories: ['Self-Intimacy Practice', 'Cultural Sites'],
        questIds: ['side-ritual', 'main-veil', 'side-ignan-heal'],
        formats: ['webdrama', 'veil-lumen-16x9', 'ignan-healing-journey']
    },
    HOTEL: {
        label: 'Accommodation',
        place: 'Desk / mirror · phone scenes · kitchen cook-off · post-DIB quiet heal',
        episodes: [1, 4, '2.5', '2.75'],
        reels: [],
        skillId: 'helen-neighbor',
        categories: ['Accommodation', 'Emergency Protocol', 'Self-Intimacy Practice'],
        questIds: ['side-boundary', 'side-gear', 'side-dib-heal'],
        formats: ['webdrama', 'date-night-cookoff', 'dib-aftercare'],
        pipeline: ['letsCook', 'girlsLove'],
        cookOffPhases: ['stations']
    }
};

const TTMIK_SYNC_EPISODES = {
    1: {
        title: 'Ignition',
        ko: '점화',
        pins: ['HOME', 'MEL'],
        skillId: 'flame-kissed-bard',
        categories: ['Essential Foundations', 'Melbourne Arrival'],
        questIds: ['side-gear'],
        shadowingIndex: 0
    },
    2: {
        title: 'Arrival Tsundere',
        ko: '도착',
        pins: ['HOSIER', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Melbourne Arrival', 'GoPro & Content'],
        questIds: ['main-film'],
        shadowingIndex: 0
    },
    '2.5': {
        title: 'Divine Insight Blessing',
        ko: '신성한 통찰',
        display: 'Ep 2.5',
        pins: ['HOSIER', 'HOTEL'],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Self-Intimacy Practice'],
        questIds: ['side-tarot-scam', 'side-dib-heal'],
        shadowingIndex: 2,
        duration: '45s',
        formats: ['ep-2-5-dib', 'dib-aftercare'],
        aftercare: 'helen-neighbor',
        aftercareShadowIndex: 2
    },
    '2.6': {
        title: 'Ignan Healing Walk',
        ko: '치유의 걸음',
        display: 'Ep 2.6',
        pins: ['HOTEL', 'FED', 'BOTANIC'],
        skillId: 'ignan-pilgrim',
        categories: ['Self-Intimacy Practice', 'Cultural Sites', 'Daily Life'],
        questIds: ['side-ignan-heal', 'side-ritual'],
        shadowingIndex: 0,
        duration: '90s',
        formats: ['ignan-healing-journey'],
        character: 'Mari',
        languages: ['ilo', 'ko', 'en']
    },
    '2.75': {
        title: 'Cook-Off Not a Date',
        ko: '요리대결',
        display: 'Ep 2.75',
        pins: ['FLINDERS', 'DEGRAVES', 'HOTEL'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Daily Life', 'Social & Cultural'],
        questIds: ['main-others', 'side-humor'],
        shadowingIndex: 1,
        pipeline: ['letsCook', 'girlsLove'],
        duration: '90s',
        formats: ['date-night-cookoff', 'after-the-date']
    },
    3: {
        title: 'Love Bomb Speedrun',
        ko: '러브폭탄',
        pins: ['CENTRE', 'COLLINS', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Daily Life', 'Social & Cultural'],
        questIds: ['main-skit', 'side-humor'],
        shadowingIndex: 2
    },
    4: {
        title: 'Helen Intervention',
        ko: '경계',
        pins: ['HOTEL', 'SOUTH'],
        skillId: 'helen-neighbor',
        categories: ['Emergency Protocol', 'Accommodation'],
        questIds: ['side-boundary'],
        shadowingIndex: 0
    },
    5: {
        title: 'The Maybe',
        ko: '아마도',
        pins: ['FED', 'FLINDERS', 'HOSIER'],
        skillId: 'asuka-brisbane',
        categories: ['Transportation', 'Melbourne Arrival'],
        questIds: ['main-others'],
        shadowingIndex: 0
    },
    6: {
        title: 'Action!',
        ko: '촬영',
        pins: ['HOSIER'],
        skillId: 'flame-kissed-bard',
        categories: ['GoPro & Content'],
        questIds: ['main-skit', 'main-film'],
        shadowingIndex: 1
    },
    7: {
        title: 'The Moon Card',
        ko: '달',
        pins: ['SOUTH', 'FLINDERS', 'PRINCES'],
        skillId: 'rach3l',
        categories: ['Tech & Connectivity', 'Emergency Protocol'],
        questIds: ['side-humor'],
        shadowingIndex: 2
    },
    8: {
        title: 'The World',
        ko: '세계',
        pins: ['PRINCES', 'HOSIER', 'BOTANIC'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Cultural Sites', 'Self-Intimacy Practice', 'GoPro & Content'],
        questIds: ['main-veil', 'main-film'],
        shadowingIndex: 0
    }
};

const TTMIK_SYNC_REELS = {
    A: {
        label: 'Reel A · Tsundere Scam PSA',
        duration: '30s',
        pins: ['HOSIER', 'CENTRE', 'COLLINS', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Social & Cultural'],
        questIds: ['main-skit'],
        formats: ['reel', 'youtube-short']
    },
    B: {
        label: 'Reel B · Not Enjoying Melbourne',
        duration: '30s',
        pins: ['HOSIER', 'CENTRE', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Melbourne Arrival', 'Daily Life'],
        questIds: ['main-film', 'main-others'],
        formats: ['reel', 'tiktok-15']
    }
};

/** On-set quick presets — type 1–5 or ?preset=N in URL */
const TTMIK_SYNC_PRESETS = [
    {
        id: 1,
        label: 'Hosier · Ep 2 · Reel B',
        shortLabel: 'HOSIER B',
        pin: 'HOSIER',
        episode: 2,
        reel: 'B',
        note: '09:00 block — wides + Ep 2 main',
        autoShadow: true
    },
    {
        id: 2,
        label: 'Hosier · Ep 2 · Reel A',
        shortLabel: 'HOSIER A',
        pin: 'HOSIER',
        episode: 2,
        reel: 'A',
        note: 'Scam PSA pickups at graffiti wall'
    },
    {
        id: 3,
        label: 'Degraves · Ep 2 · Reel A',
        shortLabel: 'DEGRAVES',
        pin: 'DEGRAVES',
        episode: 2,
        reel: 'A',
        note: '08:00 — coffee + A7 + Ep 2 cliff'
    },
    {
        id: 4,
        label: 'Centre · Ep 2 · Reel B',
        shortLabel: 'CENTRE',
        pin: 'CENTRE',
        episode: 2,
        reel: 'B',
        note: '08:30 — A4, A10, B6, B9 rule walk'
    },
    {
        id: 5,
        label: 'Hosier · Ep 6 · Reel B',
        shortLabel: 'WRAP',
        pin: 'HOSIER',
        episode: 6,
        reel: 'B',
        note: '10:15 — shadowing + SD offload'
    },
    {
        id: 6,
        label: 'Degraves · Ep 2.75 · Outing',
        shortLabel: 'DATE OUT',
        pin: 'DEGRAVES',
        episode: '2.75',
        reel: 'B',
        note: '17:00 — meet + ingredient cap · lets-cook phase outing',
        autoShadow: true
    },
    {
        id: 7,
        label: 'Hotel · Ep 2.75 · Kitchen',
        shortLabel: 'COOK-OFF',
        pin: 'HOTEL',
        episode: '2.75',
        reel: null,
        note: '18:15 — 45 min stations · GoPro consent · Helen soup'
    },
    {
        id: 8,
        label: 'Degraves · Dawn · After the Date',
        shortLabel: 'DAWN',
        pin: 'DEGRAVES',
        episode: '2.75',
        reel: 'B',
        note: '06:12 — girls-love Ch.2 croissant run'
    },
    {
        id: 9,
        label: 'Hotel · Post-DIB quiet heal',
        shortLabel: 'HEAL',
        pin: 'HOTEL',
        episode: '2.5',
        reel: null,
        note: '09:30 — reflection after blessing skit · Helen self-healing',
        autoShadow: true,
        aftercare: true
    },
    {
        id: 10,
        label: 'Botanic · Ep 2.6 · Ignan heal',
        shortLabel: 'IGNAN',
        pin: 'BOTANIC',
        episode: '2.6',
        reel: null,
        note: '10:30 — Mari trilingual walk · Ilokano + Korean + English',
        autoShadow: true
    },
    {
        id: 11,
        label: 'FED · Ep 5 · The Maybe',
        shortLabel: 'ASUKA',
        pin: 'FED',
        episode: 5,
        reel: null,
        note: 'Rain glass · Brisbane maybe · Japanese native + Korean shadow',
        autoShadow: true
    }
];

const TTMIK_BLOCK_ROUTE = [
    { time: '08:00', pin: 'DEGRAVES', note: 'Coffee + A7 + Ep 2 cliff', presetId: 3 },
    { time: '08:30', pin: 'CENTRE', note: 'A4, A10, B6, B9 rule walk', presetId: 4 },
    { time: '09:00', pin: 'HOSIER', note: 'Reels A+B + Ep 2.5 DIB skit', presetId: 2 },
    { time: '09:30', pin: 'HOTEL', note: 'Quiet reflection after blessing skit', presetId: 9 },
    { time: '09:45', pin: 'COLLINS', note: 'A6 invoice (optional)', sync: { pin: 'COLLINS', episode: 3, reel: 'A' } },
    { time: '10:15', pin: 'HOSIER', note: 'Shadowing + SD offload', presetId: 5 },
    { time: '10:30', pin: 'BOTANIC', note: 'Ep 2.6 Ignan healing walk with Mari', presetId: 10 }
];

/** Lane C — Ignan self-healing journey (after post-DIB · optional FED rain) */
const TTMIK_IGNAN_HEAL_ROUTE = [
    { time: '09:30', pin: 'HOTEL', note: 'Post-DIB landing — ask Mari if she wants the walk', presetId: 9 },
    { time: '10:00', pin: 'FED', note: 'Optional rain pause — name homeward grief without drama', sync: { pin: 'FED', episode: '2.6', reel: null } },
    { time: '10:30', pin: 'BOTANIC', note: 'Trilingual release · Ok laeng + 괜찮아요 + own path', presetId: 10 }
];

/** Date night lane — RTDB AKL legs + lets-cook optimiseDateWindow(17:00) */
const TTMIK_DATE_NIGHT_ROUTE = [
    { time: '05:30', pin: null, note: 'AKL Waitemata RTDB refresh — Britomart-bound train', rtdb: 'waitemata', skill: 'flame-kissed-bard' },
    { time: '06:15', pin: null, note: 'Britomart bus hub — airport connector ≤20 min wait', rtdb: 'britomart', skill: 'helen-neighbor' },
    { time: '12:30', pin: 'MEL', note: 'Land MEL → HOTEL drop bags — no love-bomb speedrun', skill: 'flame-kissed-bard' },
    { time: '17:00', pin: 'FLINDERS', note: 'Meet Flinders Lane end — 15 min silly ingredient cap', presetId: 6 },
    { time: '17:20', pin: 'DEGRAVES', note: 'Stroll + flat white — Bard: hydration not romance', presetId: 6 },
    { time: '18:15', pin: 'HOTEL', note: 'Kitchen stations · 45 min cook-off timer', presetId: 7 },
    { time: '19:15', pin: 'DEGRAVES', note: 'Score · eat · block ingredient-fee Venmos', sync: { pin: 'DEGRAVES', episode: '2.75', reel: 'B' } },
    { time: '06:12', pin: 'DEGRAVES', note: 'Dawn croissant — girls-love Ch.2 · phones optional', presetId: 8 }
];

function resolveEpisodeKey(value) {
    if (value == null || value === '') return null;
    const s = String(value);
    if (s.includes('.')) return s;
    const n = typeof value === 'number' ? value : parseInt(s, 10);
    return Number.isFinite(n) ? n : s;
}

function getSyncPin(pinId) {
    return TTMIK_SYNC_PINS[pinId] || null;
}

function getSyncEpisode(epNum) {
    const key = resolveEpisodeKey(epNum);
    if (key == null) return null;
    return TTMIK_SYNC_EPISODES[key] || null;
}

function getBardicInspiration() {
    return BARDIC_INSPIRATION;
}

function getPipelineSources() {
    return PIPELINE_SOURCES;
}

function getDateNightRoute() {
    return TTMIK_DATE_NIGHT_ROUTE;
}

function getDibAftercareRitual() {
    return BARDIC_INSPIRATION.afterBlessingHeal;
}

function getHealingFactors() {
    return HEALING_FACTORS;
}

function getIgnanHealRoute() {
    return TTMIK_IGNAN_HEAL_ROUTE;
}

function getSyncReel(reelId) {
    return TTMIK_SYNC_REELS[reelId] || null;
}

function getSyncPreset(presetId) {
    const n = typeof presetId === 'number' ? presetId : parseInt(presetId, 10);
    if (!n) return null;
    return TTMIK_SYNC_PRESETS.find(p => p.id === n) || null;
}

function getShadowingPhraseForSkill(skillId, index = 0) {
    const skill = getSkillById(skillId);
    if (!skill?.shadowingPhrases?.length) return null;
    const i = Math.min(index, skill.shadowingPhrases.length - 1);
    return skill.shadowingPhrases[i];
}