/**
 * FIFA World Cup 2026 Nation Libraries — Mexico · Canada · USA
 * Host cities per FIFA canadamexicousa2026 · Jun 11 – Jul 19, 2026
 * Audio folders: Mexico_Library/ · Canada_Library/ · USA_Library/
 *
 * Reference skills: ignan-pilgrim (Mexico) · flame-kissed-bard/helen-neighbor (Canada)
 *                   melbourne-lantern-bard/lo3tus (USA)
 */

const FIFA_2026_META = {
    tournament: 'FIFA World Cup 2026',
    dates: '11 June – 19 July 2026',
    nations: ['Mexico', 'Canada', 'USA'],
    url: 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026'
};

const MEXICO_BASE = 'Mexico_Library';
const CANADA_BASE = 'Canada_Library';
const USA_BASE = 'USA_Library';

const MEXICO_LIBRARY_CATEGORIES = [
    'Spanish Shadowing',
    'Host City Route',
    'Cantina Celebration'
];

const CANADA_LIBRARY_CATEGORIES = [
    'French Shadowing',
    'Host City Route',
    'Bilingual Drills'
];

const USA_LIBRARY_CATEGORIES = [
    'English Shadowing',
    'Host City Route',
    'Match Day Fans'
];

/** Mexico — Estadio Azteca · Akron · BBVA */
const MEXICO_PHRASE_DECK = [
    {
        es: '¡Qué buen partido! Salud.',
        ko: '정말 좋은 경기예요! 건배.',
        en: 'What a great match! Cheers.',
        beat: 'Ep2.65-CO',
        note: 'ignan-pilgrim · CANTINA · Mari speaks Spanish first'
    },
    {
        es: '¡Gol! ¡Vamos México!',
        ko: '골! 멕시코 파이팅!',
        en: 'Goal! Go Mexico!',
        beat: 'Ep2.65-CH',
        note: 'TV replay · phones face-down except one cheer'
    },
    {
        es: 'La comida está deliciosa.',
        ko: '음식이 정말 맛있어요.',
        en: 'The food is delicious.',
        beat: 'CANTINA',
        note: 'Cantina booth — order before the algorithm'
    },
    {
        es: 'Celebro a mi manera — sin drama.',
        ko: '내 방식으로 축하해요 — 드라마 없이.',
        en: 'I celebrate my way — no drama.',
        beat: 'Activation',
        note: 'Mari FIFA cantina · preset 12 · ?fifa=1'
    }
];

const MEXICO_HOST_CITIES = [
    {
        city: 'CDMX',
        stadium: 'Estadio Azteca',
        title: 'Mexico City — opening energy',
        es: 'Ciudad de México, aquí estamos.',
        ko: '멕시코시티, 왔어요.',
        en: 'Mexico City — we are here.',
        note: 'Azteca · group stage + knockout host'
    },
    {
        city: 'GDL',
        stadium: 'Estadio Akron',
        title: 'Guadalajara — plaza calm',
        es: 'Guadalajara tiene buena vibra.',
        ko: '과달라하라 분위기가 좋아요.',
        en: 'Guadalajara has good energy.',
        note: 'Akron · mariachi optional — no performance debt'
    },
    {
        city: 'MTY',
        stadium: 'Estadio BBVA',
        title: 'Monterrey — mountain air',
        es: 'Monterrey, qué vista tan bonita.',
        ko: '몬테레이, 경치가 정말 예뻐요.',
        en: 'Monterrey — what a beautiful view.',
        note: 'BBVA · Regiomontano warmth without rescue framing'
    }
];

const MEXICO_CANTINA_DRILLS = [
    {
        title: 'Salud toast — joy not invoice',
        es: '¡Salud! Disfrutemos el partido.',
        ko: '건배! 경기 즐겨요.',
        en: 'Cheers — enjoy the match.',
        note: 'side-fifa-celebrate · log without posting'
    },
    {
        title: 'Goal cheer — three languages',
        es: '¡Gol! ¡Buen provecho, amigos!',
        ilo: 'Naragsak unay!',
        ko: '골! 맛있게 드세요, 친구들!',
        en: 'Goal — good meal, good friends.',
        note: 'Ilokano + Spanish + Korean · ignan-pilgrim shadow deck'
    },
    {
        title: 'Cantina close — own celebration',
        es: '¡Hasta luego! Gracias.',
        ko: '다음에 봐요! 감사해요.',
        en: 'See you — thanks for tonight.',
        note: 'No soulmate CTA · phones face-down at close'
    }
];

/** Canada — BC Place · BMO Field */
const CANADA_PHRASE_DECK = [
    {
        fr: 'Quel beau match! Santé.',
        ko: '정말 좋은 경기네요! 건배.',
        en: 'What a beautiful match! Cheers.',
        beat: 'CA-CO',
        note: 'flame-kissed-bard · French native before Korean'
    },
    {
        fr: 'Vancouver est magnifique.',
        ko: '밴쿠버가 정말 아름다워요.',
        en: 'Vancouver is magnificent.',
        beat: 'CA-VAN',
        note: 'BC Place · harbour walk optional'
    },
    {
        fr: 'Toronto, c\'est ma fête tranquille.',
        ko: '토론토, 조용한 축제예요.',
        en: 'Toronto — my quiet celebration.',
        beat: 'CA-TO',
        note: 'BMO Field · no rescue energy in the crowd'
    },
    {
        fr: 'Je choisis mon propre rythme.',
        ko: '제 속도를 선택해요.',
        en: 'I choose my own pace.',
        beat: 'Activation',
        note: 'helen-neighbor boundary echo · cord-cut without drama'
    }
];

const CANADA_HOST_CITIES = [
    {
        city: 'YVR',
        stadium: 'BC Place',
        title: 'Vancouver — harbour lights',
        fr: 'Les lumières du port sont douces.',
        ko: '항구 불빛이 부드러워요.',
        en: 'The harbour lights are gentle.',
        note: 'BC Place · mountain backdrop · side-ritual optional'
    },
    {
        city: 'YYZ',
        stadium: 'BMO Field',
        title: 'Toronto — lake breeze',
        fr: 'Le vent du lac est apaisant.',
        ko: '호수 바람이 편안해요.',
        en: 'The lake breeze is calming.',
        note: 'BMO Field · Exhibition Place · bilingual crowd'
    }
];

const CANADA_BILINGUAL_DRILLS = [
    {
        title: 'English-French fan pair',
        en: 'Good game — well played.',
        fr: 'Bon match — bien joué.',
        ko: '좋은 경기였어요.',
        note: 'Canada hosts · both official languages honored'
    },
    {
        title: 'Boundary at the watch party',
        en: 'Shared snacks, not shared bank details.',
        fr: 'Collations partagées, pas de coordonnées bancaires.',
        ko: '간식은 나눠도, 계좌는 안 돼요.',
        note: 'helen-neighbor · cook-off rule applies to texts too'
    }
];

/** USA — 11 host cities (route deck picks 5 anchor metros) */
const USA_PHRASE_DECK = [
    {
        en: 'What a match! Let\'s enjoy the game.',
        ko: '어떤 경기예요! 경기 즐겨요.',
        beat: 'US-CO',
        note: 'melbourne-lantern-bard · chaotic neutral fan energy'
    },
    {
        en: 'This stadium is incredible.',
        ko: '이 경기장 정말 대단해요.',
        beat: 'US-ST',
        note: 'Host city arrival — film the vibe not the wound'
    },
    {
        en: 'I cheer on my own terms.',
        ko: '내 방식으로 응원해요.',
        beat: 'Activation',
        note: 'Sovereign fan — no algorithm owed a reaction'
    },
    {
        en: 'Not a date. Not a rescue. Just football.',
        ko: '데이트 아니에요. 구출도 아니에요. 그냥 축구예요.',
        beat: 'Bardic',
        note: 'BARDIC_INSPIRATION mantra · lo3tus deadpan optional'
    }
];

const USA_HOST_CITIES = [
    {
        city: 'LAX',
        stadium: 'SoFi Stadium',
        metro: 'Los Angeles',
        title: 'LA — SoFi lights',
        en: 'Los Angeles glows tonight.',
        ko: '오늘 LA가 빛나요.',
        note: 'SoFi · Inglewood · opening ceremony host'
    },
    {
        city: 'MIA',
        stadium: 'Hard Rock Stadium',
        metro: 'Miami',
        title: 'Miami — tropical night',
        en: 'Miami heat, cool boundaries.',
        ko: '마이애미 열기, 차가운 경계.',
        note: 'Hard Rock · humidity humor allowed'
    },
    {
        city: 'NYC',
        stadium: 'MetLife Stadium',
        metro: 'New York / New Jersey',
        title: 'NYC — final host',
        en: 'New York — the final is here.',
        ko: '뉴욕 — 결승이 여기 있어요.',
        note: 'MetLife · Jul 19 final · no FOMO spiral'
    },
    {
        city: 'SEA',
        stadium: 'Lumen Field',
        metro: 'Seattle',
        title: 'Seattle — rain-ready',
        en: 'Seattle rain, steady cheer.',
        ko: '시애틀 비, 꾸준한 응원.',
        note: 'Lumen Field · Pacific northwest calm'
    },
    {
        city: 'DAL',
        stadium: 'AT&T Stadium',
        metro: 'Dallas',
        title: 'Dallas — big sky',
        en: 'Dallas — wide open joy.',
        ko: '댈러스 — 넓은 기쁨.',
        note: 'AT&T · Arlington · group + knockout'
    }
];

const USA_MATCH_DAY_DRILLS = [
    {
        title: 'Kickoff cheer — one breath first',
        en: 'One breath, one cheer.',
        ko: '한 숨, 한 응원.',
        note: 'Hermit Lantern · hermit-lantern heal factor'
    },
    {
        title: 'Halftime boundary',
        en: 'Phone face-down at halftime.',
        ko: '하프타임에 폰 뒤집어요.',
        note: 'no-rewatch heal factor · no scroll spiral'
    },
    {
        title: 'Final whistle — log and leave',
        en: 'Good game. I leave lighter.',
        ko: '좋은 경기. 더 가벼워져요.',
        note: 'Quest side-fifa-celebrate echo · celebrate without posting'
    }
];

const MEXICO_JOURNEY_CATEGORY = {
    id: 'mexico',
    label: 'Mexico Library',
    description: 'Spanish native + Korean shadowing · FIFA 2026 CDMX · Guadalajara · Monterrey'
};

const CANADA_JOURNEY_CATEGORY = {
    id: 'canada',
    label: 'Canada Library',
    description: 'French · English · Korean · FIFA 2026 Vancouver · Toronto'
};

const USA_JOURNEY_CATEGORY = {
    id: 'usa',
    label: 'USA Library',
    description: 'English native + Korean shadowing · 11 US host cities · Final at MetLife'
};

function buildNationTranscript(parts, skillId, boot) {
    const lines = [];
    if (parts.es) lines.push(`Spanish: ${parts.es}`);
    if (parts.fr) lines.push(`French: ${parts.fr}`);
    if (parts.ilo) lines.push(`Ilokano: ${parts.ilo}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.stadium) lines.push(`Stadium: ${parts.stadium}`);
    if (parts.city) lines.push(`Host city: ${parts.city}${parts.metro ? ` (${parts.metro})` : ''}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    lines.push(`\nFIFA 2026: ${FIFA_2026_META.dates}`);
    lines.push(`Skill: ${skillId} · Boot: ${boot}`);
    return lines.join('\n\n');
}

function buildMexicoPhraseLessons(startId) {
    return MEXICO_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 2.65 · ${p.es.split('!')[0]}`,
            subtitle: 'Spanish Shadowing',
            duration: '00:30',
            src: `${MEXICO_BASE}/Spanish_Shadowing/Phrase_${n}.mp3`,
            transcript: buildNationTranscript(p, 'ignan-pilgrim', 'TTMIK.html?fifa=1'),
            vocab: [{ ko: p.ko, en: p.en, note: p.es }],
            group: 'mexico'
        });
    });
}

function buildMexicoCityLessons(startId) {
    return MEXICO_HOST_CITIES.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.city} · ${b.title}`,
            subtitle: 'Host City Route',
            duration: '01:00',
            src: `${MEXICO_BASE}/Host_City_Route/Route_${n}_${b.city}.mp3`,
            transcript: buildNationTranscript(b, 'ignan-pilgrim', 'TTMIK.html?library=mexico'),
            vocab: [{ ko: b.ko, en: b.en, note: b.es }],
            group: 'mexico'
        });
    });
}

function buildMexicoCantinaLessons(startId) {
    return MEXICO_CANTINA_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Cantina Celebration',
            duration: '00:45',
            src: `${MEXICO_BASE}/Cantina_Celebration/Cantina_${n}.mp3`,
            transcript: buildNationTranscript(d, 'ignan-pilgrim', 'TTMIK.html?fifa=1'),
            vocab: [{ ko: d.ko, en: d.en, note: [d.es, d.ilo].filter(Boolean).join(' · ') }],
            group: 'mexico'
        });
    });
}

function buildCanadaPhraseLessons(startId) {
    return CANADA_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `WC26 · ${p.fr.slice(0, 18)}…`,
            subtitle: 'French Shadowing',
            duration: '00:30',
            src: `${CANADA_BASE}/French_Shadowing/Phrase_${n}.mp3`,
            transcript: buildNationTranscript(p, 'flame-kissed-bard', 'TTMIK.html?library=canada'),
            vocab: [{ ko: p.ko, en: p.en, note: p.fr }],
            group: 'canada'
        });
    });
}

function buildCanadaCityLessons(startId) {
    return CANADA_HOST_CITIES.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.city} · ${b.title}`,
            subtitle: 'Host City Route',
            duration: '01:00',
            src: `${CANADA_BASE}/Host_City_Route/Route_${n}_${b.city}.mp3`,
            transcript: buildNationTranscript(b, 'helen-neighbor', 'TTMIK.html?library=canada'),
            vocab: [{ ko: b.ko, en: b.en, note: b.fr }],
            group: 'canada'
        });
    });
}

function buildCanadaBilingualLessons(startId) {
    return CANADA_BILINGUAL_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Bilingual Drills',
            duration: '00:45',
            src: `${CANADA_BASE}/Bilingual_Drills/Drill_${n}.mp3`,
            transcript: buildNationTranscript(d, 'helen-neighbor', 'TTMIK.html?library=canada'),
            vocab: [{ ko: d.ko, en: d.en, note: [d.fr, d.en].filter(Boolean).join(' · ') }],
            group: 'canada'
        });
    });
}

function buildUsaPhraseLessons(startId) {
    return USA_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `WC26 · ${p.en.split('.')[0]}`,
            subtitle: 'English Shadowing',
            duration: '00:30',
            src: `${USA_BASE}/English_Shadowing/Phrase_${n}.mp3`,
            transcript: buildNationTranscript(p, 'melbourne-lantern-bard', 'TTMIK.html?library=usa'),
            vocab: [{ ko: p.ko, en: p.en }],
            group: 'usa'
        });
    });
}

function buildUsaCityLessons(startId) {
    return USA_HOST_CITIES.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.city} · ${b.title}`,
            subtitle: 'Host City Route',
            duration: '01:00',
            src: `${USA_BASE}/Host_City_Route/Route_${n}_${b.city}.mp3`,
            transcript: buildNationTranscript(b, 'melbourne-lantern-bard', 'TTMIK.html?library=usa'),
            vocab: [{ ko: b.ko, en: b.en }],
            group: 'usa'
        });
    });
}

function buildUsaMatchDayLessons(startId) {
    return USA_MATCH_DAY_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Match Day Fans',
            duration: '00:45',
            src: `${USA_BASE}/Match_Day_Fans/Fan_${n}.mp3`,
            transcript: buildNationTranscript(d, 'lo3tus', 'TTMIK.html?library=usa'),
            vocab: [{ ko: d.ko, en: d.en }],
            group: 'usa'
        });
    });
}

function generateMexicoLibraryLessons(startId) {
    let id = startId;
    const phrase = buildMexicoPhraseLessons(id);
    id += phrase.length;
    const cities = buildMexicoCityLessons(id);
    id += cities.length;
    const cantina = buildMexicoCantinaLessons(id);
    return phrase.concat(cities, cantina);
}

function generateCanadaLibraryLessons(startId) {
    let id = startId;
    const phrase = buildCanadaPhraseLessons(id);
    id += phrase.length;
    const cities = buildCanadaCityLessons(id);
    id += cities.length;
    const bilingual = buildCanadaBilingualLessons(id);
    return phrase.concat(cities, bilingual);
}

function generateUsaLibraryLessons(startId) {
    let id = startId;
    const phrase = buildUsaPhraseLessons(id);
    id += phrase.length;
    const cities = buildUsaCityLessons(id);
    id += cities.length;
    const matchDay = buildUsaMatchDayLessons(id);
    return phrase.concat(cities, matchDay);
}

function generateFifaNationsLibraryLessons(startId) {
    let id = startId;
    const mexico = generateMexicoLibraryLessons(id);
    id += mexico.length;
    const canada = generateCanadaLibraryLessons(id);
    id += canada.length;
    const usa = generateUsaLibraryLessons(id);
    return mexico.concat(canada, usa);
}

const MEXICO_COURSE_DEFS = [
    { subtitle: 'Spanish Shadowing', trackCount: MEXICO_PHRASE_DECK.length },
    { subtitle: 'Host City Route', trackCount: MEXICO_HOST_CITIES.length },
    { subtitle: 'Cantina Celebration', trackCount: MEXICO_CANTINA_DRILLS.length }
];

const CANADA_COURSE_DEFS = [
    { subtitle: 'French Shadowing', trackCount: CANADA_PHRASE_DECK.length },
    { subtitle: 'Host City Route', trackCount: CANADA_HOST_CITIES.length },
    { subtitle: 'Bilingual Drills', trackCount: CANADA_BILINGUAL_DRILLS.length }
];

const USA_COURSE_DEFS = [
    { subtitle: 'English Shadowing', trackCount: USA_PHRASE_DECK.length },
    { subtitle: 'Host City Route', trackCount: USA_HOST_CITIES.length },
    { subtitle: 'Match Day Fans', trackCount: USA_MATCH_DAY_DRILLS.length }
];