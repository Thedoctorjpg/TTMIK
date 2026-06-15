/**
 * Martin Library — Norwegian native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Barbarian (World Tree) · Guide
 * Audio folder: Martin_Library/
 */

const MARTIN_BASE = 'Martin_Library';

const MARTIN_LIBRARY_CATEGORIES = [
    'Norwegian Shadowing',
    'Fjord Walk Route',
    'Guide Drills'
];

const MARTIN_PHRASE_DECK = [
    {
        no: 'Melbourne er mitt ja.',
        ko: '멜버른이 제 예예요.',
        en: 'Melbourne is my yes.',
        beat: 'Ep8-S1',
        note: 'World-card close — Norwegian native before Korean'
    },
    {
        no: 'Jeg er nok — alene og hel.',
        ko: '혼자서도 충분해요 — 완전하게.',
        en: 'I am enough — alone and whole.',
        beat: 'Ep8-CO',
        note: 'The World · preset 15 · Veil Lumen landing'
    },
    {
        no: 'Jeg slipper med humor.',
        ko: '웃음으로 놓아줄게요.',
        en: 'I release with humor.',
        beat: 'Ep8-S2',
        note: 'Fjord calm — laugh before re-watch spiral'
    },
    {
        no: 'Jeg stoler på min vei.',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Activation',
        note: 'martin-nordic-guide · Fast Character sheet · preset 15'
    }
];

const MARTIN_ROUTE_BEATS = [
    {
        pin: 'BOTANIC',
        title: 'Lake path — world card calm',
        beat: 'Ep8-S1',
        no: 'Jeg bærer min lykt — ikke deres forventning.',
        ko: '제 랜턴을 들어요 — 그들의 기대가 아니라.',
        en: 'I carry my lantern — not their expectation.',
        note: 'Preset 15 · Ignan echo · sovereign completion'
    },
    {
        pin: 'PRINCES',
        title: 'Bridge dawn — fjord breath',
        beat: 'Ep8-S2',
        no: 'Ett pust. Ett steg. Min vei.',
        ko: '한 숨. 한 걸음. 제 길.',
        en: 'One breath. One step. My path.',
        note: 'Guide rest — no performance invoice'
    },
    {
        pin: 'HOSIER',
        title: 'Laneway finale — lighter return',
        beat: 'Ep8-CL',
        no: 'Jeg går lettere hjem.',
        ko: '더 가볍게 돌아갈게요.',
        en: 'I walk home lighter.',
        note: 'Quest main-veil · Ep 8 World close'
    }
];

const MARTIN_GUIDE_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        no: 'Jeg er Martin, en vandrer fra Norge.',
        ko: '저는 노르웨이에서 온 방랑자 마틴이에요.',
        en: 'I am Martin, a wanderer from Norway.',
        note: 'fastcharacter.com · Barbarian World Tree · Level 5 · Guide'
    }
];

const MARTIN_JOURNEY_CATEGORY = {
    id: 'martin',
    label: 'Martin Library',
    description: 'Norwegian native input + Korean shadowing · Fast Character Nordic Guide'
};

function buildMartinTranscript(parts) {
    const lines = [];
    if (parts.no) lines.push(`Norwegian (Martin): ${parts.no}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: martin-nordic-guide · Boot: TTMIK.html?martin=1');
    lines.push('Sheet: fastcharacter.com · Martin · Barbarian (World Tree) · Guide');
    return lines.join('\n\n');
}

function buildMartinPhraseLessons(startId) {
    return MARTIN_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 8 · ${p.no.slice(0, 18)}…`,
            subtitle: 'Norwegian Shadowing',
            duration: '00:30',
            src: `${MARTIN_BASE}/Norwegian_Shadowing/Phrase_${n}.mp3`,
            transcript: buildMartinTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.no }],
            group: 'martin'
        });
    });
}

function buildMartinRouteLessons(startId) {
    return MARTIN_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Fjord Walk Route',
            duration: '01:00',
            src: `${MARTIN_BASE}/Fjord_Walk_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildMartinTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.no }],
            group: 'martin'
        });
    });
}

function buildMartinGuideLessons(startId) {
    return MARTIN_GUIDE_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Guide Drills',
            duration: '00:45',
            src: `${MARTIN_BASE}/Guide_Drills/Drill_${n}.mp3`,
            transcript: buildMartinTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.no }],
            group: 'martin'
        });
    });
}

function generateMartinLibraryLessons(startId) {
    let id = startId;
    const phrase = buildMartinPhraseLessons(id);
    id += phrase.length;
    const route = buildMartinRouteLessons(id);
    id += route.length;
    const guide = buildMartinGuideLessons(id);
    return phrase.concat(route, guide);
}

const MARTIN_COURSE_DEFS = [
    { subtitle: 'Norwegian Shadowing', trackCount: MARTIN_PHRASE_DECK.length },
    { subtitle: 'Fjord Walk Route', trackCount: MARTIN_ROUTE_BEATS.length },
    { subtitle: 'Guide Drills', trackCount: MARTIN_GUIDE_DRILLS.length }
];