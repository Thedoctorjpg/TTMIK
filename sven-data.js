/**
 * Sven Library — Swedish native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Ranger (Fey Wanderer) · Outlander
 * Audio folder: Sven_Library/
 */

const SVEN_BASE = 'Sven_Library';

const SVEN_LIBRARY_CATEGORIES = [
    'Swedish Shadowing',
    'Nordic Walk Route',
    'Ranger Drills'
];

const SVEN_PHRASE_DECK = [
    {
        sv: 'Melbourne är mitt ja.',
        ko: '멜버른이 제 예예요.',
        en: 'Melbourne is my yes.',
        beat: 'Ep7-S1',
        note: 'Moon-card calm — Swedish native before Korean'
    },
    {
        sv: 'Jag iakttar utan att absorbera.',
        ko: '관찰만 하고 흡수하지 않을게요.',
        en: 'I observe without absorbing.',
        beat: 'Ep7-CO',
        note: 'rach3l mirror · preset 14 · no scroll spiral'
    },
    {
        sv: 'Jag släpper med humor.',
        ko: '웃음으로 놓아줄게요.',
        en: 'I release with humor.',
        beat: 'Ep7-S2',
        note: 'Nordic laugh — feet on floor before phone'
    },
    {
        sv: 'Jag litar på min väg.',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Activation',
        note: 'sven-nordic-ranger · Fast Character sheet · preset 14'
    }
];

const SVEN_ROUTE_BEATS = [
    {
        pin: 'FLINDERS',
        title: 'Tram glass — quiet discernment',
        beat: 'Ep7-S1',
        sv: 'Jag bär inte andras energi.',
        ko: '다른 사람 에너지는 안 짊어질게요.',
        en: 'I do not carry others\' energy.',
        note: 'Preset 14 · Moon card · reflection only'
    },
    {
        pin: 'SOUTH',
        title: 'Southbank pause — Nordic breath',
        beat: 'Ep7-S2',
        sv: 'Ett andetag. Ett steg. Min väg.',
        ko: '한 숨. 한 걸음. 제 길.',
        en: 'One breath. One step. My path.',
        note: 'Outlander rest — no performance debt'
    },
    {
        pin: 'PRINCES',
        title: 'Bridge close — calm return',
        beat: 'Ep7-CL',
        sv: 'Jag är nog — ensam och hel.',
        ko: '혼자서도 충분해요 — 완전하게.',
        en: 'I am enough — alone and whole.',
        note: 'Quest side-humor · Ep 8 echo'
    }
];

const SVEN_RANGER_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        sv: 'Jag är Sven, en vandrare från Sverige.',
        ko: '저는 스웨덴에서 온 방랑자 스벤이에요.',
        en: 'I am Sven, a wanderer from Sweden.',
        note: 'fastcharacter.com · Ranger Fey Wanderer · Level 5 · Outlander'
    }
];

const SVEN_JOURNEY_CATEGORY = {
    id: 'sven',
    label: 'Sven Library',
    description: 'Swedish native input + Korean shadowing · Fast Character Nordic Ranger'
};

function buildSvenTranscript(parts) {
    const lines = [];
    if (parts.sv) lines.push(`Swedish (Sven): ${parts.sv}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: sven-nordic-ranger · Boot: TTMIK.html?sven=1');
    lines.push('Sheet: fastcharacter.com · Sven · Ranger (Fey Wanderer) · Outlander');
    return lines.join('\n\n');
}

function buildSvenPhraseLessons(startId) {
    return SVEN_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7 · ${p.sv.slice(0, 18)}…`,
            subtitle: 'Swedish Shadowing',
            duration: '00:30',
            src: `${SVEN_BASE}/Swedish_Shadowing/Phrase_${n}.mp3`,
            transcript: buildSvenTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.sv }],
            group: 'sven'
        });
    });
}

function buildSvenRouteLessons(startId) {
    return SVEN_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Nordic Walk Route',
            duration: '01:00',
            src: `${SVEN_BASE}/Nordic_Walk_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildSvenTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.sv }],
            group: 'sven'
        });
    });
}

function buildSvenRangerLessons(startId) {
    return SVEN_RANGER_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Ranger Drills',
            duration: '00:45',
            src: `${SVEN_BASE}/Ranger_Drills/Drill_${n}.mp3`,
            transcript: buildSvenTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.sv }],
            group: 'sven'
        });
    });
}

function generateSvenLibraryLessons(startId) {
    let id = startId;
    const phrase = buildSvenPhraseLessons(id);
    id += phrase.length;
    const route = buildSvenRouteLessons(id);
    id += route.length;
    const ranger = buildSvenRangerLessons(id);
    return phrase.concat(route, ranger);
}

const SVEN_COURSE_DEFS = [
    { subtitle: 'Swedish Shadowing', trackCount: SVEN_PHRASE_DECK.length },
    { subtitle: 'Nordic Walk Route', trackCount: SVEN_ROUTE_BEATS.length },
    { subtitle: 'Ranger Drills', trackCount: SVEN_RANGER_DRILLS.length }
];