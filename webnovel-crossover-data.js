/**
 * Webnovel Crossover Library — shared phrases across SVSSS · Solo Leveling · Boys Love
 * Links B-point guard · E-rank pause · slow-burn boundary lanes
 * Audio folder: WebnovelCrossover_Library/
 * Lane: Ep 7.9 CROSS · one breath · no binge spiral
 */

const WEBNOVEL_CROSSOVER_BASE = 'WebnovelCrossover_Library';

const WEBNOVEL_CROSSOVER_META = {
    svsssUrl: 'https://www.webnovel.com/book/35203689408704405/94532538348928087',
    soloUrl: 'https://www.webnovel.com/comic/15227640605485101/45196186038101142',
    boysLoveApp: 'http://localhost:5191'
};

const WEBNOVEL_CROSSOVER_CATEGORIES = [
    'Crossover Shadowing',
    'Lane Handoff Drills'
];

const WEBNOVEL_CROSSOVER_PHRASES = [
    {
        en: 'One breath — B-points above zero, gate ahead.',
        ko: '한 숨 — B 포인트는 0 위, 게이트는 앞에.',
        lanes: ['svsss', 'solo-leveling'],
        beat: 'Ep7.9-X1',
        note: 'QING → GATE handoff · observe both lanes without absorbing'
    },
    {
        en: 'Not a rescue mission — E-rank or disciple.',
        ko: '구출 임무가 아니에요 — E급이든 제자든.',
        lanes: ['svsss', 'boys-love', 'solo-leveling'],
        beat: 'Ep7.9-X2',
        note: 'Shared boundary — no pity or salvation invoice'
    },
    {
        en: 'Stay in character — weakness is context, not destiny.',
        ko: '캐릭터를 유지해요 — 약함은 맥락이지 운명이 아니에요.',
        lanes: ['svsss', 'solo-leveling'],
        beat: 'Ep7.9-X3',
        note: 'OOC frozen · E-rank label observe-only'
    },
    {
        en: 'I like you slowly — tea before the dungeon vote.',
        ko: '천천히 좋아해요 — 던전 투표 전에 차를.',
        lanes: ['boys-love', 'solo-leveling'],
        beat: 'Ep7.9-X4',
        note: 'After the Bamboo × Cartenon Temple pacing'
    },
    {
        en: 'Phone face-down after the beat — one pass only.',
        ko: '장면 뒤에는 폰을 뒤집어요 — 한 번만.',
        lanes: ['svsss', 'solo-leveling', 'boys-love'],
        beat: 'Ep7.9-X5',
        note: 'Woodshed · Statue of God · bamboo dawn — no re-watch'
    },
    {
        en: 'No WebNovel binge spiral — humor tends the wound.',
        ko: '웹노벨 폭주는 없어요 — 유머가 상처를 돌봐요.',
        lanes: ['svsss', 'solo-leveling', 'boys-love'],
        beat: 'Ep7.9-CL',
        note: 'Cross-lane close · Melbourne Lantern Bard'
    }
];

const WEBNOVEL_CROSSOVER_HANDOFFS = [
    {
        pin: 'CROSS',
        title: 'SVSSS System → Solo gate',
        beat: 'Ep7.9-H1',
        en: "I'm used to it — after B-points stay above zero.",
        ko: '익숙해요 — B 포인트가 0 위에 있는 다음에.',
        note: 'Preset 26→27 · shen-qingqiu-svsss → sung-jinwoo-solo-leveling'
    },
    {
        pin: 'MIRROR',
        title: 'Woodshed → bamboo slow-burn',
        beat: 'Ep7.9-H2',
        en: 'The knot loosens — disciple care, not rescue.',
        ko: '매듭이 풀려요 — 구출이 아니라 제자 돌봄.',
        note: 'svsss woodshed → boys-love After the Bamboo Ch.1'
    },
    {
        pin: 'LEDGER',
        title: 'Three-lane ledger close',
        beat: 'Ep7.9-CL',
        en: 'One boundary · three lanes · no algorithm shame.',
        ko: '한 경계 · 세 레인 · 알고리즘 부끄 없이.',
        note: 'b-point-guard · e-rank-pause · slow-burn-boundary'
    }
];

function buildWebnovelCrossoverTranscript(parts) {
    const lines = [];
    if (parts.en) lines.push(`English (crossover): ${parts.en}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.lanes) lines.push(`Lanes: ${parts.lanes.join(' · ')}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push(`\nSVSSS: ${WEBNOVEL_CROSSOVER_META.svsssUrl}`);
    lines.push(`Solo: ${WEBNOVEL_CROSSOVER_META.soloUrl}`);
    lines.push(`BL: ${WEBNOVEL_CROSSOVER_META.boysLoveApp}`);
    lines.push('Boot: TTMIK.html?library=webnovel-crossover');
    return lines.join('\n\n');
}

function buildWebnovelCrossoverPhraseLessons(startId) {
    return WEBNOVEL_CROSSOVER_PHRASES.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7.9 · ${p.en.slice(0, 24)}…`,
            subtitle: 'Crossover Shadowing',
            duration: '00:30',
            src: `${WEBNOVEL_CROSSOVER_BASE}/Crossover_Shadowing/Phrase_${n}.mp3`,
            transcript: buildWebnovelCrossoverTranscript(p),
            vocab: [{ ko: p.ko, en: p.en }],
            group: 'webnovel-crossover'
        });
    });
}

function buildWebnovelCrossoverHandoffLessons(startId) {
    return WEBNOVEL_CROSSOVER_HANDOFFS.map((h, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${h.pin} · ${h.title}`,
            subtitle: 'Lane Handoff Drills',
            duration: '01:00',
            src: `${WEBNOVEL_CROSSOVER_BASE}/Lane_Handoff_Drills/Handoff_${n}_${h.pin}.mp3`,
            transcript: buildWebnovelCrossoverTranscript(h),
            vocab: [{ ko: h.ko, en: h.en }],
            group: 'webnovel-crossover'
        });
    });
}

function generateWebnovelCrossoverLibraryLessons(startId) {
    let id = startId;
    const phrase = buildWebnovelCrossoverPhraseLessons(id);
    id += phrase.length;
    const handoff = buildWebnovelCrossoverHandoffLessons(id);
    return phrase.concat(handoff);
}

const WEBNOVEL_CROSSOVER_COURSE_DEFS = [
    { subtitle: 'Crossover Shadowing', trackCount: WEBNOVEL_CROSSOVER_PHRASES.length },
    { subtitle: 'Lane Handoff Drills', trackCount: WEBNOVEL_CROSSOVER_HANDOFFS.length }
];

function getWebnovelCrossoverRitual() {
    return typeof BARDIC_INSPIRATION !== 'undefined' ? BARDIC_INSPIRATION.webnovelCrossover : null;
}