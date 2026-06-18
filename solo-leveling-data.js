/**
 * Solo Leveling Library — English native + Korean TTMIK shadowing
 * WebNovel comic Ch.1 — 000 Only I Level Up
 * Source: https://www.webnovel.com/comic/15227640605485101/45196186038101142
 * Audio folder: SoloLeveling_Library/
 * Lane: Ep 7.7 GATE · E-rank dungeon · Cartenon Temple
 */

const SOLO_LEVELING_BASE = 'SoloLeveling_Library';

const SOLO_LEVELING_WEBNOVEL_META = {
    comicId: '15227640605485101',
    chapterId: '45196186038101142',
    url: 'https://www.webnovel.com/comic/15227640605485101/45196186038101142',
    title: 'Solo Leveling (Only I level up)',
    chapter: 'Chapter 1 — 000 Only I Level Up',
    originalTitle: '나 혼자만 레벨업',
    author: 'Chugong'
};

const SOLO_LEVELING_LIBRARY_CATEGORIES = [
    'English Shadowing',
    'Dungeon Gate Route',
    'Hunter Drills',
    'Daily Grind Drills'
];

const SOLO_LEVELING_PHRASE_DECK = [
    {
        en: "I'm used to it.",
        ko: '익숙해요.',
        kr: '익숙해.',
        beat: 'Ep7.7-ACT',
        note: 'Iconic Ch.1 line to Joohee — weakness without shame spiral · enFirst',
        enFirst: true
    },
    {
        en: "It's my fault for being so weak.",
        ko: '제가 약해서 그래요.',
        beat: 'Ep7.7-S1',
        note: 'E-rank boundary — family breadwinner · no rescue invoice'
    },
    {
        en: 'The weakest hunter of all mankind.',
        ko: '인류 최약 헌터예요.',
        kr: '인류 최약 헌터',
        beat: 'Ep7.7-S1',
        note: 'Sung Jinwoo E-rank — observe label, do not absorb'
    },
    {
        en: 'Gates opened ten years ago.',
        ko: '십 년 전에 게이트가 열렸어요.',
        beat: 'Ep7.7-S2',
        note: 'World intro — hunters ranked E to S · powers fixed until System'
    },
    {
        en: 'Please, be afraid.',
        ko: '두려워하세요.',
        beat: 'Ep7.7-CO',
        note: 'Chairman Go Gunhee — survival over arrogance'
    },
    {
        en: "It's a double dungeon.",
        ko: '이중 던전이에요.',
        beat: 'Ep7.7-S3',
        note: 'Cartenon Temple vote — Jinwoo tie-breaker for family money'
    },
    {
        en: 'Everyone, duck!',
        ko: '다들 엎드려요!',
        beat: 'Ep7.7-S4',
        note: 'Statue of God heat vision — save Joohee · phone face-down after'
    },
    {
        en: 'Better than nothing.',
        ko: '없는 것보단 나아요.',
        beat: 'Ep7.7-CL',
        note: 'Low-power dagger breaks on goblin — essence stone hope cut short'
    },
    {
        en: "It's dangerous. You should leave.",
        ko: '위험해요. 나가야 해요.',
        beat: 'Ep7.7-S5',
        note: 'Joohee care line — concern without rescue invoice'
    },
    {
        en: 'I need the money for my family.',
        ko: '가족을 위해 돈이 필요해요.',
        beat: 'Ep7.7-S5',
        note: 'Double dungeon vote — breadwinner context · no shame spiral'
    },
    {
        en: 'Hunters are ranked from E to S.',
        ko: '헌터는 E부터 S까지 등급이 있어요.',
        beat: 'Ep7.7-S6',
        note: 'Rank ladder intro — label is context until System unlocks'
    },
    {
        en: 'Daily grind — same gate, same label.',
        ko: '매일 같은 게이트, 같은 등급.',
        beat: 'Ep7.7-DG',
        note: 'Construction site repeat raid — observe without absorbing'
    }
];

const SOLO_LEVELING_ROUTE_BEATS = [
    {
        pin: 'GATE',
        title: 'Dungeon gate — raid party forms',
        beat: 'Ep7.7-S1',
        en: 'If Jinwoo is on the team, it will be an easy raid.',
        ko: '진우가 있으면 쉬운 레이드예요.',
        note: 'Construction site D-rank gate · preset 27 · Fighter Champion sheet'
    },
    {
        pin: 'STONE',
        title: 'Essence stone — first loot',
        beat: 'Ep7.7-S2',
        en: 'Essence stones pay the bills.',
        ko: '정수석이 생활비가 돼요.',
        note: 'Goblin stab · Joohee heal · no re-watch spiral'
    },
    {
        pin: 'TEMPLE',
        title: 'Cartenon Temple — double dungeon door',
        beat: 'Ep7.7-CL',
        en: 'The door shut behind us.',
        ko: '문이 뒤에서 닫혔어요.',
        note: 'Statue of God awakens · e-rank-pause heal handoff'
    },
    {
        pin: 'JOOHEE',
        title: 'Joohee heal — care without pity',
        beat: 'Ep7.7-S5',
        en: 'Are you hurt? Let me heal you.',
        ko: '다쳤어요? 제가 치료할게요.',
        note: 'Party healer concern · no weakness performance'
    },
    {
        pin: 'VOTE',
        title: 'Family money vote — tie-breaker',
        beat: 'Ep7.7-S5',
        en: 'I vote yes — we need the payout.',
        ko: '찬성이에요 — 보상이 필요해요.',
        note: 'Double dungeon party vote · Jinwoo tie-break for bills'
    }
];

const SOLO_LEVELING_HUNTER_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        en: 'I am Sung Jinwoo — E-rank hunter.',
        ko: '저는 E급 헌터 성진우예요.',
        note: 'fastcharacter.com · Fighter Champion · Soldier · Level 5 · LN'
    },
    {
        title: 'WebNovel comic anchor',
        en: 'Chapter zero-zero-zero — Only I Level Up.',
        ko: '000화 — 나 혼자만 레벨업.',
        note: SOLO_LEVELING_WEBNOVEL_META.url
    },
    {
        title: 'Rank ladder observe drill',
        en: 'E-rank today — context, not destiny.',
        ko: '오늘은 E급 — 맥락이지 운명이 아니에요.',
        note: 'Hunter ladder E→S · no identity collapse'
    }
];

const SOLO_LEVELING_DAILY_GRIND = [
    {
        title: 'Construction site gate — repeat raid',
        en: 'Same D-rank gate — I show up anyway.',
        ko: '같은 D급 게이트 — 그래도 나와요.',
        note: 'Daily grind boundary · family breadwinner'
    },
    {
        title: 'Essence stone payout — bills first',
        en: 'Loot pays rent — not pride.',
        ko: '전리품이 월세예요 — 자존심이 아니에요.',
        note: 'Goblin stab hope · Joohee heal · no re-watch'
    },
    {
        title: 'Webnovel crossover handoff',
        en: 'Gate after System — one breath, no binge.',
        ko: '시스템 다음 게이트 — 한 숨, 폭주 없이.',
        note: 'SVSSS 7.6 → Solo 7.7 · webnovel-crossover library'
    }
];

const SOLO_LEVELING_JOURNEY_CATEGORY = {
    id: 'solo-leveling',
    label: 'Solo Leveling Library',
    description: 'English native input + Korean shadowing · WebNovel comic Ch.1 · dungeon gate'
};

function buildSoloLevelingTranscript(parts) {
    const lines = [];
    if (parts.en) lines.push(`English (Jinwoo): ${parts.en}`);
    if (parts.kr) lines.push(`Korean (source): ${parts.kr}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push(`\nWebNovel comic: ${SOLO_LEVELING_WEBNOVEL_META.url}`);
    lines.push('Skill: sung-jinwoo-solo-leveling · Boot: TTMIK.html?solo-leveling=1');
    lines.push('Sheet: fastcharacter.com · Sung Jinwoo · Fighter Champion · Soldier');
    return lines.join('\n\n');
}

function buildSoloLevelingPhraseLessons(startId) {
    return SOLO_LEVELING_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7.7 · ${p.en.slice(0, 24)}…`,
            subtitle: 'English Shadowing',
            duration: '00:30',
            src: `${SOLO_LEVELING_BASE}/English_Shadowing/Phrase_${n}.mp3`,
            transcript: buildSoloLevelingTranscript(p),
            vocab: [{ ko: p.ko, en: p.en }],
            group: 'solo-leveling'
        });
    });
}

function buildSoloLevelingRouteLessons(startId) {
    return SOLO_LEVELING_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Dungeon Gate Route',
            duration: '01:00',
            src: `${SOLO_LEVELING_BASE}/Dungeon_Gate_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildSoloLevelingTranscript(b),
            vocab: [{ ko: b.ko, en: b.en }],
            group: 'solo-leveling'
        });
    });
}

function buildSoloLevelingHunterLessons(startId) {
    return SOLO_LEVELING_HUNTER_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Hunter Drills',
            duration: '00:45',
            src: `${SOLO_LEVELING_BASE}/Hunter_Drills/Drill_${n}.mp3`,
            transcript: buildSoloLevelingTranscript(d),
            vocab: [{ ko: d.ko, en: d.en }],
            group: 'solo-leveling'
        });
    });
}

function buildSoloLevelingDailyGrindLessons(startId) {
    return SOLO_LEVELING_DAILY_GRIND.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Daily Grind Drills',
            duration: '00:45',
            src: `${SOLO_LEVELING_BASE}/Daily_Grind_Drills/Drill_${n}.mp3`,
            transcript: buildSoloLevelingTranscript(d),
            vocab: [{ ko: d.ko, en: d.en }],
            group: 'solo-leveling'
        });
    });
}

function generateSoloLevelingLibraryLessons(startId) {
    let id = startId;
    const phrase = buildSoloLevelingPhraseLessons(id);
    id += phrase.length;
    const route = buildSoloLevelingRouteLessons(id);
    id += route.length;
    const hunter = buildSoloLevelingHunterLessons(id);
    id += hunter.length;
    const dailyGrind = buildSoloLevelingDailyGrindLessons(id);
    return phrase.concat(route, hunter, dailyGrind);
}

const SOLO_LEVELING_COURSE_DEFS = [
    { subtitle: 'English Shadowing', trackCount: SOLO_LEVELING_PHRASE_DECK.length },
    { subtitle: 'Dungeon Gate Route', trackCount: SOLO_LEVELING_ROUTE_BEATS.length },
    { subtitle: 'Hunter Drills', trackCount: SOLO_LEVELING_HUNTER_DRILLS.length },
    { subtitle: 'Daily Grind Drills', trackCount: SOLO_LEVELING_DAILY_GRIND.length }
];

function getSoloLevelingGateRitual() {
    return typeof BARDIC_INSPIRATION !== 'undefined' ? BARDIC_INSPIRATION.soloLevelingGate : null;
}