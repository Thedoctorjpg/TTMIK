/**
 * Ronaldo Library — Portuguese native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Paladin (Oath of Glory) · Entertainer
 * Audio folder: Ronaldo_Library/
 */

const RONALDO_BASE = 'Ronaldo_Library';

const RONALDO_LIBRARY_CATEGORIES = [
    'Portuguese Shadowing',
    'Cinema Encounters',
    'Match Day Route',
    'Glory Drills'
];

const RONALDO_PHRASE_DECK = [
    {
        pt: 'Melbourne é o meu sim.',
        ko: '멜버른이 제 예예요.',
        en: 'Melbourne is my yes.',
        beat: 'Ep2.65-S1',
        note: 'Cantina open — Portuguese native before Korean'
    },
    {
        pt: 'Celebramos à nossa maneira — sem drama.',
        ko: '내 방식으로 축하해요 — 드라마 없이.',
        en: 'We celebrate our way — no drama.',
        beat: 'Ep2.65-CO',
        note: 'Mari FIFA cantina · preset 16 · phones face-down except one cheer'
    },
    {
        pt: 'Gol! Força Portugal!',
        ko: '골! 포르투갈 파이팅!',
        en: 'Goal! Go Portugal!',
        beat: 'Ep2.65-CH',
        note: 'TV replay · ignan-pilgrim handoff · no soulmate CTAs'
    },
    {
        pt: 'Confio no meu caminho.',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Activation',
        note: 'ronaldo-portugal-glory · Fast Character sheet · preset 16'
    }
];

const RONALDO_CINEMA_ENCOUNTERS = [
    {
        pin: 'CINEMA',
        title: 'Bend It Like Beckham — English fan meet',
        beat: 'Ep2.64-S1',
        en: 'Bend it like Beckham? Cheer it your way — no drama.',
        ko: '베컴처럼? 내 방식으로 응원해요 — 드라마 없이.',
        pt: 'Dobrá-lo como o Beckham? Celebramos à nossa maneira.',
        note: 'Fast scene 30s · English fan · prelude to Ep 2.65 cantina'
    },
    {
        pin: 'CINEMA',
        title: 'Lobby toast — football is freedom',
        beat: 'Ep2.64-CO',
        en: 'Anyone can play. Anyone can choose their path.',
        ko: '누구나 할 수 있어요. 누구나 자기 길을 고를 수 있어요.',
        pt: 'Qualquer um pode jogar. Qualquer um escolhe o seu caminho.',
        note: 'Bend It Like Beckham homage · Jules/Jess energy · not a date'
    },
    {
        pin: 'CINEMA',
        title: 'Credits roll — walk to cantina',
        beat: 'Ep2.64-CL',
        en: 'Good film. Good night. See you at the match.',
        ko: '좋은 영화. 좋은 밤. 경기장에서 봐요.',
        pt: 'Bom filme. Boa noite. Vemo-nos no jogo.',
        note: 'Handoff to CANTINA · preset 16 · side-fifa-celebrate'
    }
];

const RONALDO_ROUTE_BEATS = [
    {
        pin: 'CANTINA',
        title: 'Cantina booth — Portugal cheer',
        beat: 'Ep2.65-S1',
        pt: 'Um brinde — sem fatura de desempenho.',
        ko: '건배 — 연기 청구서 없이.',
        en: 'A toast — no performance invoice.',
        note: 'Preset 16 · order before the algorithm'
    },
    {
        pin: 'FED',
        title: 'Square pause — match calm',
        beat: 'Ep2.65-S2',
        pt: 'Uma respiração. Um passo. O meu caminho.',
        ko: '한 숨. 한 걸음. 제 길.',
        en: 'One breath. One step. My path.',
        note: 'FIFA joy without rescue framing'
    },
    {
        pin: 'FLINDERS',
        title: 'Tram close — lighter walk home',
        beat: 'Ep2.65-CL',
        pt: 'Celebro e sigo em frente.',
        ko: '축하하고 앞으로 나아갈게요.',
        en: 'I celebrate and move forward.',
        note: 'Quest side-fifa-celebrate · after BOTANIC walk'
    }
];

const RONALDO_GLORY_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        pt: 'Sou o Ronaldo, um viajante de Portugal.',
        ko: '저는 포르투갈에서 온 방랑자 호날두예요.',
        en: 'I am Ronaldo, a wanderer from Portugal.',
        note: 'fastcharacter.com · Paladin Glory · Level 5 · Entertainer'
    }
];

const RONALDO_JOURNEY_CATEGORY = {
    id: 'ronaldo',
    label: 'Ronaldo Library',
    description: 'Portuguese native input + Korean shadowing · Fast Character Glory Paladin'
};

function buildRonaldoTranscript(parts) {
    const lines = [];
    if (parts.en) lines.push(`English (fan): ${parts.en}`);
    if (parts.pt) lines.push(`Portuguese (Ronaldo): ${parts.pt}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: ronaldo-portugal-glory · Boot: TTMIK.html?ronaldo=1');
    lines.push('Sheet: fastcharacter.com · Ronaldo · Paladin (Oath of Glory) · Entertainer');
    return lines.join('\n\n');
}

function buildRonaldoPhraseLessons(startId) {
    return RONALDO_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 2.65 · ${p.pt.slice(0, 18)}…`,
            subtitle: 'Portuguese Shadowing',
            duration: '00:30',
            src: `${RONALDO_BASE}/Portuguese_Shadowing/Phrase_${n}.mp3`,
            transcript: buildRonaldoTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.pt }],
            group: 'ronaldo'
        });
    });
}

function buildRonaldoCinemaLessons(startId) {
    return RONALDO_CINEMA_ENCOUNTERS.map((c, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${c.title}`,
            subtitle: 'Cinema Encounters',
            duration: '00:30',
            src: `${RONALDO_BASE}/Cinema_Encounters/Encounter_${n}_CINEMA.mp3`,
            transcript: buildRonaldoTranscript(c),
            vocab: [{ ko: c.ko, en: c.en, note: [c.en, c.pt].filter(Boolean).join(' · ') }],
            group: 'ronaldo'
        });
    });
}

function buildRonaldoRouteLessons(startId) {
    return RONALDO_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Match Day Route',
            duration: '01:00',
            src: `${RONALDO_BASE}/Match_Day_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildRonaldoTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.pt }],
            group: 'ronaldo'
        });
    });
}

function buildRonaldoGloryLessons(startId) {
    return RONALDO_GLORY_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Glory Drills',
            duration: '00:45',
            src: `${RONALDO_BASE}/Glory_Drills/Drill_${n}.mp3`,
            transcript: buildRonaldoTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.pt }],
            group: 'ronaldo'
        });
    });
}

function generateRonaldoLibraryLessons(startId) {
    let id = startId;
    const phrase = buildRonaldoPhraseLessons(id);
    id += phrase.length;
    const cinema = buildRonaldoCinemaLessons(id);
    id += cinema.length;
    const route = buildRonaldoRouteLessons(id);
    id += route.length;
    const glory = buildRonaldoGloryLessons(id);
    return phrase.concat(cinema, route, glory);
}

const RONALDO_COURSE_DEFS = [
    { subtitle: 'Portuguese Shadowing', trackCount: RONALDO_PHRASE_DECK.length },
    { subtitle: 'Cinema Encounters', trackCount: RONALDO_CINEMA_ENCOUNTERS.length },
    { subtitle: 'Match Day Route', trackCount: RONALDO_ROUTE_BEATS.length },
    { subtitle: 'Glory Drills', trackCount: RONALDO_GLORY_DRILLS.length }
];