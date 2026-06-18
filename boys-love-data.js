/**
 * Boys Love Library — English native + Korean TTMIK shadowing
 * After the Bamboo · Shen Qingqiu / Luo Binghe · SVSSS slow-burn mirror
 * Source: boys-love/data/afterTheBamboo.js · WebNovel SVSSS Ch.1
 * Audio folder: BoysLove_Library/
 * Lane: Ep 7.8 BAMBOO · slow-burn boundary · disciple-not-rescue
 */

const BOYS_LOVE_BASE = 'BoysLove_Library';

const BOYS_LOVE_WEBNOVEL_META = {
    bookId: '35203689408704405',
    chapterId: '94532538348928087',
    url: 'https://www.webnovel.com/book/35203689408704405/94532538348928087',
    novelApp: 'http://localhost:5191',
    title: "The Scum Villain's Self-Saving System (Terjemahan Indonesia)",
    chapter: 'Chapter 1 — woodshed reveal',
    pair: 'Shen Qingqiu / Luo Binghe'
};

const BOYS_LOVE_LIBRARY_CATEGORIES = [
    'English Shadowing',
    'Slow-Burn Route',
    'Webnovel BL Drills'
];

const BOYS_LOVE_PHRASE_DECK = [
    {
        en: 'Not a rescue mission.',
        ko: '구출 임무가 아니에요.',
        beat: 'Ep7.8-ACT',
        note: 'Activation — slow-burn boundary · Helen handoff · enFirst',
        enFirst: true
    },
    {
        en: 'I like you. Slowly. On purpose.',
        ko: '좋아해요. 천천히. 의도적으로.',
        beat: 'Ep7.8-S1',
        note: 'After the Bamboo Ch.2 dawn — not a date invoice'
    },
    {
        en: 'Disciple, not beloved — not yet.',
        ko: '제자예요, 사랑하는 사람이 아니에요 — 아직은.',
        beat: 'Ep7.8-S1',
        note: 'Qingqiu in-character pedagogy · OOC frozen'
    },
    {
        en: 'The knot loosens — not all at once.',
        ko: '매듭이 풀려요 — 한꺼번에는 아니에요.',
        beat: 'Ep7.8-S2',
        note: 'Woodshed truce · kindness in installments'
    },
    {
        en: 'Tea before feelings.',
        ko: '감정보다 차를 먼저.',
        beat: 'Ep7.8-CO',
        note: 'Bamboo dawn ritual · Melbourne Lantern boundary'
    },
    {
        en: 'Some confessions are for later chapters.',
        ko: '어떤 고백은 나중 장을 위한 거예요.',
        beat: 'Ep7.8-S3',
        note: 'Binghe POV · timing not submission'
    },
    {
        en: 'Romance flag detected — I mute it.',
        ko: '로맨스 플래그 감지 — 음소거할게요.',
        beat: 'Ep7.8-BD',
        note: 'Melbourne Lantern Bard · System overlay boundary'
    },
    {
        en: 'Not a date. Sustenance, not romance.',
        ko: '데이트가 아니에요. 연애가 아니라 먹을 거예요.',
        beat: 'Ep7.8-CL',
        note: 'Plain rice bowl · slow-burn-boundary heal handoff'
    }
];

const BOYS_LOVE_ROUTE_BEATS = [
    {
        pin: 'BAMBOO',
        title: 'Woodshed door — quiet ledger',
        beat: 'Ep7.8-S1',
        en: "Don't punish him again, okay?",
        ko: '더 이상 벌주지 마세요, 알겠죠?',
        note: 'Yue Qingyuan · SVSSS Ch.1 handoff · preset 28 · b-point-guard adjacent'
    },
    {
        pin: 'SHED',
        title: 'Woodshed truce — one knot',
        beat: 'Ep7.8-S2',
        en: 'Water, bandage, silence — in character.',
        ko: '물, 붕대, 침묵 — 캐릭터 안에서.',
        note: 'Third thing between cruel and kind · B-points: 99'
    },
    {
        pin: 'DAWN',
        title: 'Bamboo at dawn — tea path',
        beat: 'Ep7.8-CL',
        en: 'When our eyes meet, I look away first — timing.',
        ko: '눈이 마주치면 제가 먼저 피해요 — 타이밍이에요.',
        note: 'Binghe POV · boys-love :5191 · slow-burn-boundary close'
    }
];

const BOYS_LOVE_WEBNOVEL_DRILLS = [
    {
        title: 'Fast Character sheet invoke — Qingqiu pair',
        en: 'I am Shen Qingqiu — trash-villain facade, disciple care on purpose.',
        ko: '저는 쓰레기 악역 심청추예요 — 제자를 의도적으로 돌봐요.',
        note: 'fastcharacter.com · Shen Qingqiu · Monk Kensei · Sage · Level 5 · LN'
    },
    {
        title: 'After the Bamboo novel anchor',
        en: 'Chapter one — woodshed door, quiet ledger.',
        ko: '1장 — 창고 문, 조용한 장부.',
        note: `${BOYS_LOVE_WEBNOVEL_META.novelApp} · ${BOYS_LOVE_WEBNOVEL_META.url}`
    },
    {
        title: 'Webnovel crossover handoff',
        en: 'SVSSS bound → Solo gate — one breath, no binge spiral.',
        ko: 'SVSSS 묶임 → 솔로 게이트 — 한 숨, 폭주 없이.',
        note: 'Cross-lane: b-point-guard · e-rank-pause · slow-burn-boundary'
    }
];

const BOYS_LOVE_JOURNEY_CATEGORY = {
    id: 'boys-love',
    label: 'Boys Love Library',
    description: 'English native input + Korean shadowing · After the Bamboo · Qingqiu/Binghe slow-burn'
};

function buildBoysLoveTranscript(parts) {
    const lines = [];
    if (parts.en) lines.push(`English (BL): ${parts.en}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push(`\nWebNovel: ${BOYS_LOVE_WEBNOVEL_META.url}`);
    lines.push(`Novel: ${BOYS_LOVE_WEBNOVEL_META.novelApp}`);
    lines.push('Skill: boys-love-qing-binghe · Boot: TTMIK.html?boys-love=1');
    lines.push('Sheet: fastcharacter.com · Shen Qingqiu · Monk (Kensei) · Sage');
    return lines.join('\n\n');
}

function buildBoysLovePhraseLessons(startId) {
    return BOYS_LOVE_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7.8 · ${p.en.slice(0, 28)}…`,
            subtitle: 'English Shadowing',
            duration: '00:30',
            src: `${BOYS_LOVE_BASE}/English_Shadowing/Phrase_${n}.mp3`,
            transcript: buildBoysLoveTranscript(p),
            vocab: [{ ko: p.ko, en: p.en }],
            group: 'boys-love'
        });
    });
}

function buildBoysLoveRouteLessons(startId) {
    return BOYS_LOVE_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Slow-Burn Route',
            duration: '01:00',
            src: `${BOYS_LOVE_BASE}/Slow_Burn_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildBoysLoveTranscript(b),
            vocab: [{ ko: b.ko, en: b.en }],
            group: 'boys-love'
        });
    });
}

function buildBoysLoveWebnovelLessons(startId) {
    return BOYS_LOVE_WEBNOVEL_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Webnovel BL Drills',
            duration: '00:45',
            src: `${BOYS_LOVE_BASE}/Webnovel_BL_Drills/Drill_${n}.mp3`,
            transcript: buildBoysLoveTranscript(d),
            vocab: [{ ko: d.ko, en: d.en }],
            group: 'boys-love'
        });
    });
}

function generateBoysLoveLibraryLessons(startId) {
    let id = startId;
    const phrase = buildBoysLovePhraseLessons(id);
    id += phrase.length;
    const route = buildBoysLoveRouteLessons(id);
    id += route.length;
    const webnovel = buildBoysLoveWebnovelLessons(id);
    return phrase.concat(route, webnovel);
}

const BOYS_LOVE_COURSE_DEFS = [
    { subtitle: 'English Shadowing', trackCount: BOYS_LOVE_PHRASE_DECK.length },
    { subtitle: 'Slow-Burn Route', trackCount: BOYS_LOVE_ROUTE_BEATS.length },
    { subtitle: 'Webnovel BL Drills', trackCount: BOYS_LOVE_WEBNOVEL_DRILLS.length }
];

function getBoysLoveBambooRitual() {
    return typeof BARDIC_INSPIRATION !== 'undefined' ? BARDIC_INSPIRATION.boysLoveBamboo : null;
}