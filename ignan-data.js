/**
 * Ignan Library — Ilokano + Korean + English trilingual lessons (Ep 2.6)
 * Audio folder: Ignan_Library/ (drop MP3s to match track filenames)
 */

const IGNAN_BASE = 'Ignan_Library';

/** Categories surfaced in Library filters and skill linkedCategories */
const IGNAN_LIBRARY_CATEGORIES = [
    'Trilingual Shadowing',
    'Ilokano Grounding',
    'Healing Walk Route',
    'FIFA Celebration'
];

const IGNAN_PHRASE_DECK = [
    {
        ilo: 'Ok laeng, ok laeng.',
        ko: '괜찮아요, 괜찮아요.',
        en: "It's okay, it's okay.",
        beat: 'IG5',
        note: 'Shoulders drop — body before app'
    },
    {
        ilo: 'Nasaem met ti aginana.',
        ko: '잠시 쉬어도 괜찮아요.',
        en: "It's okay to pause and breathe.",
        beat: 'IG4',
        note: 'Rain on glass optional — no performance'
    },
    {
        ilo: 'Piliem ti bukodko a dalan.',
        ko: '제 길을 믿어요.',
        en: 'Choose your own path.',
        beat: 'IG7',
        note: 'English anchor — own timeline'
    },
    {
        ilo: 'Maysa nga anges, maysa a talna.',
        ko: '나는 나만의 이야기를 씁니다.',
        en: 'One breath, one peace.',
        beat: 'IG8',
        note: 'Wide hold at BOTANIC — log side-ignan-heal'
    }
];

const IGNAN_ROUTE_BEATS = [
    {
        pin: 'HOTEL',
        title: 'Consent frame — walk not wound',
        beat: 'IG1–IG2',
        ilo: 'Mabalin kadi a magna tayo?',
        ko: '걸어도 괜찮을까요?',
        en: 'May we walk — film the path, not the wound?',
        note: 'Mari asks; Bard puts GoPro on bag only'
    },
    {
        pin: 'FED',
        title: 'Rain pause — homeward grief once',
        beat: 'IG3',
        ilo: 'Marisal met ti panagsao iti pagilian.',
        ko: '고향이 그리워도 괜찮아요.',
        en: 'It is okay to miss home without a rescue mission.',
        note: 'Optional — name grief once, no dramatizing'
    },
    {
        pin: 'BOTANIC',
        title: 'Lake path — Mari leads',
        beat: 'IG4–IG8',
        ilo: 'Agna tayo a natalna.',
        ko: '천천히 걸어요.',
        en: 'We walk quietly — trilingual release on the path.',
        note: 'BOTANIC preset 10 · ignan-healing-journey export if Mari says yes'
    }
];

const IGNAN_GROUNDING_DRILLS = [
    {
        title: 'Ok laeng breath pair',
        ilo: 'Ok laeng… aginana… ok laeng.',
        ko: '괜찮아요… 숨 쉬어요… 괜찮아요.',
        en: 'Okay… breathe… okay.',
        note: 'Three breaths — Ilokano leads, Korean shadows'
    },
    {
        title: 'Dalan activation',
        ilo: 'Mari walks her own dalan — ok laeng, aginana.',
        ko: '마리는 자기 길을 걷습니다 — 괜찮아요, 쉬어요.',
        en: 'Mari walks her own path — okay, rest.',
        note: 'ignan-pilgrim activation · preset 10 boot'
    }
];

const IGNAN_JOURNEY_CATEGORY = {
    id: 'ignan',
    label: 'Ignan Library',
    description: 'Ilokano grounding + Korean shadowing + Ep 2.6 healing walk deck'
};

const IGNAN_FIFA_CELEBRATION = [
    {
        title: 'Ilokano toast — Naragsak unay',
        ilo: 'Naragsak unay! Ok laeng, agnanayon.',
        es: '¡Salud! ¡Qué buen partido!',
        ko: '맛있어요! 축하해요!',
        en: 'So happy — cheers to the game and the meal.',
        note: 'Mari speaks Ilokano first at the cantina booth'
    },
    {
        title: 'Goal cheer — joy not drama',
        ilo: 'Naragsak ti pusok — saan a drama.',
        es: '¡Gol! ¡Buen provecho, amigos!',
        ko: '정말 재미있었어요!',
        en: 'Joy in my chest — not for the algorithm.',
        note: 'FIFA replay on TV · phones face-down except one cheer'
    },
    {
        title: 'Cantina close — own celebration',
        ilo: 'Bukodko a ragsak — ok laeng.',
        es: '¡Hasta luego! Gracias.',
        ko: '오늘 정말 좋았어요.',
        en: 'My own joy — okay to celebrate without posting.',
        note: 'log side-fifa-celebrate · preset 12'
    }
];

function buildIgnanTranscript(parts) {
    const lines = [];
    if (parts.ilo) lines.push(`Ilokano (Ignan): ${parts.ilo}`);
    if (parts.es) lines.push(`Spanish (cantina): ${parts.es}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: ignan-pilgrim · Boot: TTMIK.html?ignan=1');
    return lines.join('\n\n');
}

function buildIgnanPhraseLessons(startId) {
    return IGNAN_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 2.6 · ${p.ilo.split(',')[0]}`,
            subtitle: 'Trilingual Shadowing',
            duration: '00:30',
            src: `${IGNAN_BASE}/Trilingual_Shadowing/Phrase_${n}.mp3`,
            transcript: buildIgnanTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.ilo }],
            group: 'ignan'
        });
    });
}

function buildIgnanRouteLessons(startId) {
    return IGNAN_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Healing Walk Route',
            duration: '01:00',
            src: `${IGNAN_BASE}/Healing_Walk_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildIgnanTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.ilo }],
            group: 'ignan'
        });
    });
}

function buildIgnanGroundingLessons(startId) {
    return IGNAN_GROUNDING_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Ilokano Grounding',
            duration: '00:45',
            src: `${IGNAN_BASE}/Ilokano_Grounding/Ground_${n}.mp3`,
            transcript: buildIgnanTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.ilo }],
            group: 'ignan'
        });
    });
}

function buildIgnanFifaLessons(startId) {
    return IGNAN_FIFA_CELEBRATION.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'FIFA Celebration',
            duration: '00:45',
            src: `${IGNAN_BASE}/FIFA_Celebration/Celebration_${n}.mp3`,
            transcript: buildIgnanTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: [d.ilo, d.es].filter(Boolean).join(' · ') }],
            group: 'ignan'
        });
    });
}

function generateIgnanLibraryLessons(startId) {
    let id = startId;
    const phrase = buildIgnanPhraseLessons(id);
    id += phrase.length;
    const route = buildIgnanRouteLessons(id);
    id += route.length;
    const ground = buildIgnanGroundingLessons(id);
    id += ground.length;
    const fifa = buildIgnanFifaLessons(id);
    return phrase.concat(route, ground, fifa);
}

const IGNAN_COURSE_DEFS = [
    {
        subtitle: 'Trilingual Shadowing',
        trackCount: IGNAN_PHRASE_DECK.length
    },
    {
        subtitle: 'Healing Walk Route',
        trackCount: IGNAN_ROUTE_BEATS.length
    },
    {
        subtitle: 'Ilokano Grounding',
        trackCount: IGNAN_GROUNDING_DRILLS.length
    },
    {
        subtitle: 'FIFA Celebration',
        trackCount: IGNAN_FIFA_CELEBRATION.length
    }
];