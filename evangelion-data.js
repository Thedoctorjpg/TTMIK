/**
 * Evangelion Library — Japanese native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Monk (Way of Mercy) · Hermit
 * Audio folder: Evangelion_Library/
 * Lane: Ep 7.1 Moon-card neon · NERV · SOUTH night
 */

const EVANGELION_BASE = 'Evangelion_Library';

const EVANGELION_LIBRARY_CATEGORIES = [
    'Japanese Shadowing',
    'NERV Neon Route',
    'Moon Card Drills'
];

const EVANGELION_PHRASE_DECK = [
    {
        ja: '混乱は通過点です。',
        ko: '혼란은 지나가는 곳이에요.',
        en: 'Confusion is a passage point.',
        beat: 'Ep7.1-S1',
        note: 'Moon-card neon — Japanese native before Korean'
    },
    {
        ja: '観測するだけ。吸収しない。',
        ko: '관찰만 하고 흡수하지 않을게요.',
        en: 'Observe only. Do not absorb.',
        beat: 'Ep7.1-CO',
        note: 'rach3l mirror · preset 21 · no scroll spiral'
    },
    {
        ja: 'ネオンは私の境界線。',
        ko: '네온은 제 경계선이에요.',
        en: 'Neon is my boundary.',
        beat: 'Ep7.1-S2',
        note: 'SOUTH night railing · install neon look'
    },
    {
        ja: '自分の道を信じます。',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Activation',
        note: 'neon-evangelion · Fast Character sheet · preset 21'
    }
];

const EVANGELION_ROUTE_BEATS = [
    {
        pin: 'NERV',
        title: 'Command pause — observe without absorbing',
        beat: 'Ep7.1-S1',
        ja: 'これは私のエネルギーじゃない。',
        ko: '이건 제 에너지가 아니에요.',
        en: 'This is not my energy to carry.',
        note: 'Preset 21 · Moon card · neon boundary'
    },
    {
        pin: 'SOUTH',
        title: 'Southbank neon — one breath',
        beat: 'Ep7.1-S2',
        ja: '一息。一歩。私の道。',
        ko: '한 숨. 한 걸음. 제 길.',
        en: 'One breath. One step. My path.',
        note: 'Yarra railing night · no performance debt'
    },
    {
        pin: 'FLINDERS',
        title: 'Tram close — lighter walk home',
        beat: 'Ep7.1-CL',
        ja: '観測して、前に進む。',
        ko: '관찰하고 앞으로 나아갈게요.',
        en: 'I observe and move forward.',
        note: 'Quest side-humor · Ep 8 echo'
    }
];

const EVANGELION_MOON_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        ja: '私はネオン、旅の観測者です。',
        ko: '저는 네온, 여정의 관측자예요.',
        en: 'I am Neon, an observer on the pilgrimage.',
        note: 'fastcharacter.com · Monk Way of Mercy · Level 5 · Hermit'
    },
    {
        title: 'Veil Lumen neon install',
        ja: 'ネオンを灯す。境界を保つ。',
        ko: '네온을 켜요. 경계를 지켜요.',
        en: 'Light the neon. Keep the boundary.',
        note: 'installNeonEvangelionLook() · outfit neon · background nerv'
    }
];

const EVANGELION_JOURNEY_CATEGORY = {
    id: 'evangelion',
    label: 'Evangelion Library',
    description: 'Japanese native input + Korean shadowing · Neon Moon-card · NERV lane'
};

/** Persist Veil Lumen scene look — neon outfit + NERV background */
function installNeonEvangelionLook() {
    try {
        localStorage.setItem('veil_scene_looks_v1', JSON.stringify({
            outfit: 'neon',
            background: 'nerv',
            brightness: 100,
            emissive: 45
        }));
        return true;
    } catch {
        return false;
    }
}

function buildEvangelionTranscript(parts) {
    const lines = [];
    if (parts.ja) lines.push(`Japanese (Neon Evangelion): ${parts.ja}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: neon-evangelion · Boot: TTMIK.html?neon=1');
    lines.push('Veil: installNeonEvangelionLook() · outfit neon · background nerv');
    lines.push('Sheet: fastcharacter.com · Neon · Monk (Way of Mercy) · Hermit');
    return lines.join('\n\n');
}

function buildEvangelionPhraseLessons(startId) {
    return EVANGELION_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7.1 · ${p.ja.slice(0, 12)}…`,
            subtitle: 'Japanese Shadowing',
            duration: '00:30',
            src: `${EVANGELION_BASE}/Japanese_Shadowing/Phrase_${n}.mp3`,
            transcript: buildEvangelionTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.ja }],
            group: 'evangelion'
        });
    });
}

function buildEvangelionRouteLessons(startId) {
    return EVANGELION_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'NERV Neon Route',
            duration: '01:00',
            src: `${EVANGELION_BASE}/NERV_Neon_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildEvangelionTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.ja }],
            group: 'evangelion'
        });
    });
}

function buildEvangelionMoonLessons(startId) {
    return EVANGELION_MOON_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Moon Card Drills',
            duration: '00:45',
            src: `${EVANGELION_BASE}/Moon_Card_Drills/Drill_${n}.mp3`,
            transcript: buildEvangelionTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.ja }],
            group: 'evangelion'
        });
    });
}

function generateEvangelionLibraryLessons(startId) {
    let id = startId;
    const phrase = buildEvangelionPhraseLessons(id);
    id += phrase.length;
    const route = buildEvangelionRouteLessons(id);
    id += route.length;
    const moon = buildEvangelionMoonLessons(id);
    return phrase.concat(route, moon);
}

const EVANGELION_COURSE_DEFS = [
    { subtitle: 'Japanese Shadowing', trackCount: EVANGELION_PHRASE_DECK.length },
    { subtitle: 'NERV Neon Route', trackCount: EVANGELION_ROUTE_BEATS.length },
    { subtitle: 'Moon Card Drills', trackCount: EVANGELION_MOON_DRILLS.length }
];