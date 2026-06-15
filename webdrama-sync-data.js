/**
 * Melbourne Lantern webdrama ↔ TTMIK sync map
 * Pins, episodes, and reels → skills, lesson categories, shadowing, quest objectives
 */

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
        episodes: [2, 6, 8],
        reels: ['A', 'B'],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Melbourne Arrival'],
        questIds: ['main-film', 'main-skit'],
        formats: ['webdrama', 'reel-a', 'reel-b', 'tiktok-15', 'youtube-short']
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
        place: 'Café strip · coffee tsundere',
        episodes: [2, 3],
        reels: ['A', 'B'],
        skillId: 'lo3tus',
        categories: ['Daily Life', 'Social & Cultural'],
        questIds: ['main-others'],
        formats: ['webdrama', 'reel-a', 'reel-b']
    },
    FLINDERS: {
        label: 'Flinders Street Station',
        place: 'Steps / clocks · tram monologue',
        episodes: [5, 7],
        reels: [],
        skillId: 'asuka-brisbane',
        categories: ['Transportation'],
        questIds: ['main-film'],
        formats: ['webdrama', 'veil-lumen-45']
    },
    FED: {
        label: 'Federation Square',
        place: 'Rain on glass · maybe reflection',
        episodes: [5],
        reels: [],
        skillId: 'asuka-brisbane',
        categories: ['Melbourne Arrival'],
        questIds: [],
        formats: ['webdrama', 'veil-lumen']
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
        place: 'Lake path · lantern pass',
        episodes: [8],
        reels: ['B'],
        skillId: 'flame-kissed-bard',
        categories: ['Self-Intimacy Practice'],
        questIds: ['side-ritual', 'main-veil'],
        formats: ['webdrama', 'veil-lumen-16x9']
    },
    HOTEL: {
        label: 'Accommodation',
        place: 'Desk / mirror · phone scenes',
        episodes: [1, 4],
        reels: [],
        skillId: 'helen-neighbor',
        categories: ['Accommodation', 'Emergency Protocol'],
        questIds: ['side-boundary', 'side-gear'],
        formats: ['webdrama']
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

const TTMIK_BLOCK_ROUTE = [
    { time: '08:00', pin: 'DEGRAVES', note: 'Coffee + A7 + Ep 2 cliff' },
    { time: '08:30', pin: 'CENTRE', note: 'A4, A10, B6, B9 rule walk' },
    { time: '09:00', pin: 'HOSIER', note: 'Reels A+B + Ep 2/6 main' },
    { time: '09:45', pin: 'COLLINS', note: 'A6 invoice (optional)' },
    { time: '10:15', pin: 'HOSIER', note: 'Shadowing + SD offload' }
];

function getSyncPin(pinId) {
    return TTMIK_SYNC_PINS[pinId] || null;
}

function getSyncEpisode(epNum) {
    return TTMIK_SYNC_EPISODES[epNum] || null;
}

function getSyncReel(reelId) {
    return TTMIK_SYNC_REELS[reelId] || null;
}

function getShadowingPhraseForSkill(skillId, index = 0) {
    const skill = getSkillById(skillId);
    if (!skill?.shadowingPhrases?.length) return null;
    const i = Math.min(index, skill.shadowingPhrases.length - 1);
    return skill.shadowingPhrases[i];
}