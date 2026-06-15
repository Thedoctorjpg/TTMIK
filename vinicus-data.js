/**
 * Vinicus Library — Brazilian Portuguese native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Monk (Open Hand) · Entertainer
 * Audio folder: Vinicus_Library/
 * Lane: after Ep 2.76 La Boca — Brasil samba jogo bonito
 */

const VINICUS_BASE = 'Vinicus_Library';

const VINICUS_LIBRARY_CATEGORIES = [
    'Brazilian Shadowing',
    'Samba Route',
    'Jogo Bonito Drills'
];

const VINICUS_PHRASE_DECK = [
    {
        pt: 'Melbourne é o meu sim.',
        ko: '멜버른이 제 예예요.',
        en: 'Melbourne is my yes.',
        beat: 'Ep2.77-S1',
        note: 'After La Boca — Brazilian Portuguese native before Korean'
    },
    {
        pt: 'Jogo do meu jeito — sem drama.',
        ko: '내 방식으로 플레이해요 — 드라마 없이.',
        en: 'I play my way — no drama.',
        beat: 'Ep2.77-CO',
        note: 'Samba screen · preset 19 · jogo bonito not a date invoice'
    },
    {
        pt: 'Gol! Vai Brasil!',
        ko: '골! 브라질 파이팅!',
        en: 'Goal! Go Brazil!',
        beat: 'Ep2.77-CH',
        note: 'Federation samba burst · after Messi Argentina · no soulmate CTAs'
    },
    {
        pt: 'Confio no meu caminho.',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Activation',
        note: 'vinicus-brasil-samba · Fast Character sheet · preset 19'
    }
];

const VINICUS_SAMBA_ROUTE = [
    {
        pin: 'SAMBA',
        title: 'Samba screen — jogo bonito open',
        beat: 'Ep2.77-S1',
        pt: 'Um passo. Um gingado. Meu caminho.',
        ko: '한 걸음. 한 삼바 스텝. 제 길.',
        en: 'One step. One samba move. My path.',
        note: 'Preset 19 · rhythm after Argentina lane'
    },
    {
        pin: 'FED',
        title: 'Square pause — beat not rescue',
        beat: 'Ep2.77-S2',
        pt: 'Uma respiração. Um ritmo. Sem fatura.',
        ko: '한 숨. 한 박자. 청구서 없이.',
        en: 'One breath. One beat. No invoice.',
        note: 'FIFA joy without performance debt'
    },
    {
        pin: 'FLINDERS',
        title: 'Laneway stroll — lighter walk home',
        beat: 'Ep2.77-CL',
        pt: 'Danço e sigo em frente.',
        ko: '춤추고 앞으로 나아갈게요.',
        en: 'I dance and move forward.',
        note: 'Quest side-fifa-celebrate · Brasil lane open'
    }
];

const VINICUS_JOGO_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        pt: 'Sou Vinicus, um viajante do Brasil.',
        ko: '저는 브라질에서 온 방랑자 비니쿠스예요.',
        en: 'I am Vinicus, a wanderer from Brazil.',
        note: 'fastcharacter.com · Monk Open Hand · Level 5 · Entertainer'
    }
];

const VINICUS_JOURNEY_CATEGORY = {
    id: 'vinicus',
    label: 'Vinicus Library',
    description: 'Brazilian Portuguese native + Korean shadowing · Fast Character Open Hand Monk'
};

function buildVinicusTranscript(parts) {
    const lines = [];
    if (parts.pt) lines.push(`Portuguese (Vinicus · Brasil): ${parts.pt}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: vinicus-brasil-samba · Boot: TTMIK.html?vinicus=1');
    lines.push('Sheet: fastcharacter.com · Vinicus · Monk (Open Hand) · Entertainer');
    return lines.join('\n\n');
}

function buildVinicusPhraseLessons(startId) {
    return VINICUS_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 2.77 · ${p.pt.slice(0, 18)}…`,
            subtitle: 'Brazilian Shadowing',
            duration: '00:30',
            src: `${VINICUS_BASE}/Brazilian_Shadowing/Phrase_${n}.mp3`,
            transcript: buildVinicusTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.pt }],
            group: 'vinicus'
        });
    });
}

function buildVinicusRouteLessons(startId) {
    return VINICUS_SAMBA_ROUTE.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Samba Route',
            duration: '01:00',
            src: `${VINICUS_BASE}/Samba_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildVinicusTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.pt }],
            group: 'vinicus'
        });
    });
}

function buildVinicusJogoLessons(startId) {
    return VINICUS_JOGO_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Jogo Bonito Drills',
            duration: '00:45',
            src: `${VINICUS_BASE}/Jogo_Bonito_Drills/Drill_${n}.mp3`,
            transcript: buildVinicusTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.pt }],
            group: 'vinicus'
        });
    });
}

function generateVinicusLibraryLessons(startId) {
    let id = startId;
    const phrase = buildVinicusPhraseLessons(id);
    id += phrase.length;
    const route = buildVinicusRouteLessons(id);
    id += route.length;
    const jogo = buildVinicusJogoLessons(id);
    return phrase.concat(route, jogo);
}

const VINICUS_COURSE_DEFS = [
    { subtitle: 'Brazilian Shadowing', trackCount: VINICUS_PHRASE_DECK.length },
    { subtitle: 'Samba Route', trackCount: VINICUS_SAMBA_ROUTE.length },
    { subtitle: 'Jogo Bonito Drills', trackCount: VINICUS_JOGO_DRILLS.length }
];