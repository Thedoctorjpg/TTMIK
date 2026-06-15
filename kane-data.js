/**
 * Kane Library — English native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Fighter (Champion) · Soldier
 * Audio folder: Kane_Library/
 * Lane: after Ep 2.77 samba — England Three Lions striker
 */

const KANE_BASE = 'Kane_Library';

const KANE_LIBRARY_CATEGORIES = [
    'English Shadowing',
    'Captain Route',
    'Striker Drills'
];

const KANE_PHRASE_DECK = [
    {
        en: 'Melbourne is my yes.',
        ko: '멜버른이 제 예예요.',
        gloss: 'Melbourne is my yes.',
        beat: 'Ep2.78-S1',
        note: 'After samba — English native before Korean'
    },
    {
        en: 'I strike my way — no drama.',
        ko: '내 방식으로 득점해요 — 드라마 없이.',
        gloss: 'I strike my way — no drama.',
        beat: 'Ep2.78-CO',
        note: 'Wembley screen · preset 20 · captain cheer not a date invoice'
    },
    {
        en: 'Goal! Come on England!',
        ko: '골! 잉글랜드 파이팅!',
        gloss: 'Goal! Come on England!',
        beat: 'Ep2.78-CH',
        note: 'Three Lions burst · after Vinicus Brasil · no soulmate CTAs'
    },
    {
        en: 'I trust my path.',
        ko: '제 길을 믿어요.',
        gloss: 'I trust my path.',
        beat: 'Activation',
        note: 'harry-kane-england-striker · Fast Character sheet · preset 20'
    }
];

const KANE_CAPTAIN_ROUTE = [
    {
        pin: 'WEMBLEY',
        title: 'Wembley screen — Three Lions open',
        beat: 'Ep2.78-S1',
        en: 'One step. One strike. My path.',
        ko: '한 걸음. 한 슛. 제 길.',
        gloss: 'One step. One strike. My path.',
        note: 'Preset 20 · clinical finish after Brasil lane'
    },
    {
        pin: 'PUB',
        title: 'Pub pause — cheer not rescue',
        beat: 'Ep2.78-S2',
        en: 'One breath. One chant. No invoice.',
        ko: '한 숨. 한 응원. 청구서 없이.',
        gloss: 'One breath. One chant. No invoice.',
        note: 'FIFA joy without performance debt'
    },
    {
        pin: 'COLLINS',
        title: 'Collins stroll — lighter walk home',
        beat: 'Ep2.78-CL',
        en: 'I score and move forward.',
        ko: '득점하고 앞으로 나아갈게요.',
        gloss: 'I score and move forward.',
        note: 'Quest side-fifa-celebrate · England lane open'
    }
];

const KANE_STRIKER_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        en: 'I am Kane, a striker from England.',
        ko: '저는 잉글랜드에서 온 스트라이커 케인이에요.',
        gloss: 'I am Kane, a striker from England.',
        note: 'fastcharacter.com · Fighter Champion · Level 5 · Soldier'
    }
];

const KANE_JOURNEY_CATEGORY = {
    id: 'kane',
    label: 'Kane Library',
    description: 'English native + Korean shadowing · Fast Character Champion Fighter'
};

function buildKaneTranscript(parts) {
    const lines = [];
    if (parts.en) lines.push(`English (Kane · England): ${parts.en}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.gloss) lines.push(`Gloss: ${parts.gloss}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: harry-kane-england-striker · Boot: TTMIK.html?kane=1');
    lines.push('Sheet: fastcharacter.com · Kane · Fighter (Champion) · Soldier');
    return lines.join('\n\n');
}

function buildKanePhraseLessons(startId) {
    return KANE_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 2.78 · ${p.en.slice(0, 18)}…`,
            subtitle: 'English Shadowing',
            duration: '00:30',
            src: `${KANE_BASE}/English_Shadowing/Phrase_${n}.mp3`,
            transcript: buildKaneTranscript(p),
            vocab: [{ ko: p.ko, en: p.gloss, note: p.en }],
            group: 'kane'
        });
    });
}

function buildKaneRouteLessons(startId) {
    return KANE_CAPTAIN_ROUTE.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Captain Route',
            duration: '01:00',
            src: `${KANE_BASE}/Captain_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildKaneTranscript(b),
            vocab: [{ ko: b.ko, en: b.gloss, note: b.en }],
            group: 'kane'
        });
    });
}

function buildKaneStrikerLessons(startId) {
    return KANE_STRIKER_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Striker Drills',
            duration: '00:45',
            src: `${KANE_BASE}/Striker_Drills/Drill_${n}.mp3`,
            transcript: buildKaneTranscript(d),
            vocab: [{ ko: d.ko, en: d.gloss, note: d.en }],
            group: 'kane'
        });
    });
}

function generateKaneLibraryLessons(startId) {
    let id = startId;
    const phrase = buildKanePhraseLessons(id);
    id += phrase.length;
    const route = buildKaneRouteLessons(id);
    id += route.length;
    const striker = buildKaneStrikerLessons(id);
    return phrase.concat(route, striker);
}

const KANE_COURSE_DEFS = [
    { subtitle: 'English Shadowing', trackCount: KANE_PHRASE_DECK.length },
    { subtitle: 'Captain Route', trackCount: KANE_CAPTAIN_ROUTE.length },
    { subtitle: 'Striker Drills', trackCount: KANE_STRIKER_DRILLS.length }
];