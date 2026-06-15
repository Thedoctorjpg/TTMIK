/**
 * Heidi Library — German native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Bard (College of Lore) · Wayfarer
 * Audio folder: Heidi_Library/
 */

const HEIDI_BASE = 'Heidi_Library';

const HEIDI_LIBRARY_CATEGORIES = [
    'German Shadowing',
    'Lantern Walk Route',
    'Wayfarer Drills'
];

const HEIDI_PHRASE_DECK = [
    {
        de: 'Melbourne ist mein Ja.',
        ko: '멜버른이 제 예예요.',
        en: 'Melbourne is my yes.',
        beat: 'Ep6-S1',
        note: 'Lantern monologue — German native before Korean'
    },
    {
        de: 'Ich singe meine eigene Geschichte.',
        ko: '나는 나만의 이야기를 씁니다.',
        en: 'I sing my own story.',
        beat: 'Ep6-CO',
        note: 'Flame-Kissed Bard shadow · preset 13'
    },
    {
        de: 'Mit Humor lasse ich los.',
        ko: '웃음으로 놓아줄게요.',
        en: 'I release with humor.',
        beat: 'Ep6-S2',
        note: 'Hermit alchemy — laugh before re-watch spiral'
    },
    {
        de: 'Ich vertraue meinem Weg.',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Activation',
        note: 'heidi-alpine-wayfarer · Fast Character sheet · preset 13'
    }
];

const HEIDI_ROUTE_BEATS = [
    {
        pin: 'HOSIER',
        title: 'Laneway lantern — sovereign flame',
        beat: 'Ep6-S1',
        de: 'Ich trage meine Laterne — nicht ihre Erwartung.',
        ko: '제 랜턴을 들어요 — 그들의 기대가 아니라.',
        en: 'I carry my lantern — not their expectation.',
        note: 'Preset 13 · GoPro consent · chaotic neutral'
    },
    {
        pin: 'DEGRAVES',
        title: 'Coffee alley — wayfarer pause',
        beat: 'Ep6-S2',
        de: 'Ein Atemzug. Ein Schritt. Mein Weg.',
        ko: '한 숨. 한 걸음. 제 길.',
        en: 'One breath. One step. My path.',
        note: 'Wayfarer rest — no performance invoice'
    },
    {
        pin: 'PRINCES',
        title: 'Bridge close — world card calm',
        beat: 'Ep6-CL',
        de: 'Ich bin genug — allein und vollständig.',
        ko: '혼자서도 충분해요 — 완전하게.',
        en: 'I am enough — alone and whole.',
        note: 'Quest main-veil · Ep 8 echo'
    }
];

const HEIDI_WAYFARER_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        de: 'Ich bin Heidi, eine Wanderin der Lieder.',
        ko: '저는 노래의 방랑자 하이디예요.',
        en: 'I am Heidi, a wanderer of songs.',
        note: 'fastcharacter.com · Bard Lore · Level 5 · Wayfarer'
    }
];

const HEIDI_JOURNEY_CATEGORY = {
    id: 'heidi',
    label: 'Heidi Library',
    description: 'German native input + Korean shadowing · Fast Character Wayfarer Bard'
};

function buildHeidiTranscript(parts) {
    const lines = [];
    if (parts.de) lines.push(`German (Heidi): ${parts.de}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: heidi-alpine-wayfarer · Boot: TTMIK.html?heidi=1');
    lines.push('Sheet: fastcharacter.com · Heidi · Bard (College of Lore) · Wayfarer');
    return lines.join('\n\n');
}

function buildHeidiPhraseLessons(startId) {
    return HEIDI_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 6 · ${p.de.slice(0, 18)}…`,
            subtitle: 'German Shadowing',
            duration: '00:30',
            src: `${HEIDI_BASE}/German_Shadowing/Phrase_${n}.mp3`,
            transcript: buildHeidiTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.de }],
            group: 'heidi'
        });
    });
}

function buildHeidiRouteLessons(startId) {
    return HEIDI_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Lantern Walk Route',
            duration: '01:00',
            src: `${HEIDI_BASE}/Lantern_Walk_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildHeidiTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.de }],
            group: 'heidi'
        });
    });
}

function buildHeidiWayfarerLessons(startId) {
    return HEIDI_WAYFARER_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Wayfarer Drills',
            duration: '00:45',
            src: `${HEIDI_BASE}/Wayfarer_Drills/Drill_${n}.mp3`,
            transcript: buildHeidiTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.de }],
            group: 'heidi'
        });
    });
}

function generateHeidiLibraryLessons(startId) {
    let id = startId;
    const phrase = buildHeidiPhraseLessons(id);
    id += phrase.length;
    const route = buildHeidiRouteLessons(id);
    id += route.length;
    const wayfarer = buildHeidiWayfarerLessons(id);
    return phrase.concat(route, wayfarer);
}

const HEIDI_COURSE_DEFS = [
    { subtitle: 'German Shadowing', trackCount: HEIDI_PHRASE_DECK.length },
    { subtitle: 'Lantern Walk Route', trackCount: HEIDI_ROUTE_BEATS.length },
    { subtitle: 'Wayfarer Drills', trackCount: HEIDI_WAYFARER_DRILLS.length }
];