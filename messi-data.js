/**
 * Messi Library — Argentine Spanish native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Rogue (Mastermind) · Urchin
 * Audio folder: Messi_Library/
 * Lane: after Ep 2.75 cook-off · Argentina playmaker meet
 */

const MESSI_BASE = 'Messi_Library';

const MESSI_LIBRARY_CATEGORIES = [
    'Argentine Shadowing',
    'Post Cook-Off Route',
    'Playmaker Drills'
];

const MESSI_PHRASE_DECK = [
    {
        es: 'Melbourne es mi sí.',
        ko: '멜버른이 제 예예요.',
        en: 'Melbourne is my yes.',
        beat: 'Ep2.76-S1',
        note: 'After cook-off — Argentine Spanish native before Korean'
    },
    {
        es: 'Juego a mi manera — sin drama.',
        ko: '내 방식으로 플레이해요 — 드라마 없이.',
        en: 'I play my way — no drama.',
        beat: 'Ep2.76-CO',
        note: 'Plates down at HOTEL · preset 18 · not a date invoice'
    },
    {
        es: '¡Gol! ¡Vamos Argentina!',
        ko: '골! 아르헨티나 파이팅!',
        en: 'Goal! Go Argentina!',
        beat: 'Ep2.76-CH',
        note: 'La Boca screen · after Degraves score · no soulmate CTAs'
    },
    {
        es: 'Confío en mi camino.',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Activation',
        note: 'messi-argentina-playmaker · Fast Character sheet · preset 18'
    }
];

const MESSI_COOKOFF_ROUTE = [
    {
        pin: 'HOTEL',
        title: 'Kitchen cool-down — plates down',
        beat: 'Ep2.76-S1',
        es: 'Un brindis — sin factura de desempeño.',
        ko: '건배 — 연기 청구서 없이.',
        en: 'A toast — no performance invoice.',
        note: 'After Ep 2.75 cook-off · SYSTEM mute · hearts loud'
    },
    {
        pin: 'DEGRAVES',
        title: 'Degraves stroll — Argentina on the phone',
        beat: 'Ep2.76-S2',
        es: 'Un respiro. Un pase. Mi camino.',
        ko: '한 숨. 한 패스. 제 길.',
        en: 'One breath. One pass. My path.',
        note: 'lets-cook handoff · girls-love Ch.2 optional'
    },
    {
        pin: 'BOCA',
        title: 'La Boca screen — Vamos Argentina',
        beat: 'Ep2.76-CL',
        es: 'Juego y sigo adelante.',
        ko: '플레이하고 앞으로 나아갈게요.',
        en: 'I play and move forward.',
        note: 'Quest side-humor · Argentina lane open'
    }
];

const MESSI_PLAYMAKER_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        es: 'Soy Messi, un viajero de Argentina.',
        ko: '저는 아르헨티나에서 온 방랑자 메시예요.',
        en: 'I am Messi, a wanderer from Argentina.',
        note: 'fastcharacter.com · Rogue Mastermind · Level 5 · Urchin'
    }
];

const MESSI_JOURNEY_CATEGORY = {
    id: 'messi',
    label: 'Messi Library',
    description: 'Argentine Spanish native + Korean shadowing · Fast Character Mastermind Rogue'
};

function buildMessiTranscript(parts) {
    const lines = [];
    if (parts.es) lines.push(`Spanish (Messi · Argentina): ${parts.es}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: messi-argentina-playmaker · Boot: TTMIK.html?messi=1');
    lines.push('Sheet: fastcharacter.com · Messi · Rogue (Mastermind) · Urchin');
    return lines.join('\n\n');
}

function buildMessiPhraseLessons(startId) {
    return MESSI_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 2.76 · ${p.es.slice(0, 18)}…`,
            subtitle: 'Argentine Shadowing',
            duration: '00:30',
            src: `${MESSI_BASE}/Argentine_Shadowing/Phrase_${n}.mp3`,
            transcript: buildMessiTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.es }],
            group: 'messi'
        });
    });
}

function buildMessiRouteLessons(startId) {
    return MESSI_COOKOFF_ROUTE.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Post Cook-Off Route',
            duration: '01:00',
            src: `${MESSI_BASE}/Post_CookOff_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildMessiTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.es }],
            group: 'messi'
        });
    });
}

function buildMessiPlaymakerLessons(startId) {
    return MESSI_PLAYMAKER_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Playmaker Drills',
            duration: '00:45',
            src: `${MESSI_BASE}/Playmaker_Drills/Drill_${n}.mp3`,
            transcript: buildMessiTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.es }],
            group: 'messi'
        });
    });
}

function generateMessiLibraryLessons(startId) {
    let id = startId;
    const phrase = buildMessiPhraseLessons(id);
    id += phrase.length;
    const route = buildMessiRouteLessons(id);
    id += route.length;
    const playmaker = buildMessiPlaymakerLessons(id);
    return phrase.concat(route, playmaker);
}

const MESSI_COURSE_DEFS = [
    { subtitle: 'Argentine Shadowing', trackCount: MESSI_PHRASE_DECK.length },
    { subtitle: 'Post Cook-Off Route', trackCount: MESSI_COOKOFF_ROUTE.length },
    { subtitle: 'Playmaker Drills', trackCount: MESSI_PLAYMAKER_DRILLS.length }
];