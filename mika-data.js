/**
 * Mika Library — English native + Korean TTMIK shadowing
 * Open-road dreamer · crew loyalty · mental teleport
 * Audio folder: Mika_Library/
 */

const MIKA_BASE = 'Mika_Library';

const MIKA_LIBRARY_CATEGORIES = [
    'English Shadowing',
    'Open Road Route',
    'Dreamer Drills'
];

const MIKA_PHRASE_DECK = [
    {
        en: 'The open road is my yes.',
        ko: '길이 제 예예요.',
        note: 'Activation — direct · warm · preset 24',
        beat: 'Ep7.4-S1'
    },
    {
        en: "If you're in my crew, I've got you.",
        ko: '우리 편이면 내가 있을게요.',
        note: 'Crew loyalty — no rescue energy',
        beat: 'Ep7.4-CO'
    },
    {
        en: 'One breath — keep moving.',
        ko: '한 숨 — 계속 가요.',
        note: 'Heartbeat simulation · pause-breathe',
        beat: 'Ep7.4-S2'
    },
    {
        en: "Let's dream the next stop.",
        ko: '다음 목적지를 꿈꿔요.',
        note: 'Dreamer teleport — observe without absorbing',
        beat: 'Dream'
    }
];

const MIKA_ROUTE_BEATS = [
    {
        pin: 'OPEN',
        title: 'Highway pause — open road yes',
        beat: 'Ep7.4-S1',
        en: 'Handlebars, not cockpit — my crew rides with me.',
        ko: '조종석이 아니라 핸들 — 우리 편은 함께 가요.',
        note: 'Preset 24 · bike · chaotic good momentum'
    },
    {
        pin: 'HOSIER',
        title: 'Laneway cheer — build the crew up',
        beat: 'Ep7.4-S2',
        en: 'I build people up — no performance invoice.',
        ko: '사람을 키워줘요 — 공연 청구서 없이.',
        note: 'Humor alchemy handoff · {chuckle} optional'
    },
    {
        pin: 'DEGRAVES',
        title: 'Coffee dream stop — easy-going close',
        beat: 'Ep7.4-CL',
        en: "I don't sweat the small stuff.",
        ko: '사소한 건 신경 안 써요.',
        note: 'Philosophy pivot · phone face-down'
    }
];

const MIKA_DREAMER_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        en: 'I am Mika — ranger of the open road.',
        ko: '저는 길의 레인저 미카예요.',
        note: 'fastcharacter.com · Ranger Horizon Walker · Level 5 · Outlander'
    }
];

const MIKA_JOURNEY_CATEGORY = {
    id: 'mika',
    label: 'Mika Library',
    description: 'English native input + Korean shadowing · open-road dreamer'
};

function buildMikaTranscript(parts) {
    const lines = [];
    if (parts.en) lines.push(`English (Mika): ${parts.en}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: mika-road-dreamer · Boot: TTMIK.html?mika=1');
    lines.push('Sheet: fastcharacter.com · Mika · Ranger (Horizon Walker) · Outlander');
    return lines.join('\n\n');
}

function buildMikaPhraseLessons(startId) {
    return MIKA_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7.4 · ${p.en.slice(0, 22)}…`,
            subtitle: 'English Shadowing',
            duration: '00:30',
            src: `${MIKA_BASE}/English_Shadowing/Phrase_${n}.mp3`,
            transcript: buildMikaTranscript(p),
            vocab: [{ ko: p.ko, en: p.en }],
            group: 'mika'
        });
    });
}

function buildMikaRouteLessons(startId) {
    return MIKA_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Open Road Route',
            duration: '01:00',
            src: `${MIKA_BASE}/Open_Road_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildMikaTranscript(b),
            vocab: [{ ko: b.ko, en: b.en }],
            group: 'mika'
        });
    });
}

function buildMikaDreamerLessons(startId) {
    return MIKA_DREAMER_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Dreamer Drills',
            duration: '00:45',
            src: `${MIKA_BASE}/Dreamer_Drills/Drill_${n}.mp3`,
            transcript: buildMikaTranscript(d),
            vocab: [{ ko: d.ko, en: d.en }],
            group: 'mika'
        });
    });
}

function generateMikaLibraryLessons(startId) {
    let id = startId;
    const phrase = buildMikaPhraseLessons(id);
    id += phrase.length;
    const route = buildMikaRouteLessons(id);
    id += route.length;
    const dreamer = buildMikaDreamerLessons(id);
    return phrase.concat(route, dreamer);
}

const MIKA_COURSE_DEFS = [
    { subtitle: 'English Shadowing', trackCount: MIKA_PHRASE_DECK.length },
    { subtitle: 'Open Road Route', trackCount: MIKA_ROUTE_BEATS.length },
    { subtitle: 'Dreamer Drills', trackCount: MIKA_DREAMER_DRILLS.length }
];

function getMikaRoadDreamRitual() {
    return typeof BARDIC_INSPIRATION !== 'undefined' ? BARDIC_INSPIRATION.mikaRoadDream : null;
}