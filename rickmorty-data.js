/**
 * Rick & Morty Multiverse Library — English native + Korean TTMIK shadowing
 * PostgreSQL SQL index metaphor · D&D sheet via Fast Character · Artificer Sage
 * Audio folder: RickMorty_Library/
 * Lane: Ep 7.2 Citadel portal · WEBSERIES_MULTIVERSE · postgresql-sql-helper schema
 * Wiki: https://rickandmorty.fandom.com/it/wiki/Rick_and_Morty_Wiki
 */

const RICKMORTY_BASE = 'RickMorty_Library';

const RICKMORTY_LIBRARY_CATEGORIES = [
    'Multiverse Shadowing',
    'Citadel Portal Route',
    'SQL Dimension Drills'
];

const RICKMORTY_PHRASE_DECK = [
    {
        en: 'Melbourne is my dimension — not your adventure invoice.',
        ko: '멜버른이 제 차원이에요 — 당신 모험 청구서가 아니에요.',
        beat: 'Ep7.2-S1',
        note: 'Citadel portal — English native before Korean · Rick C-137 boundary'
    },
    {
        en: 'Wubba Lubba dub-dub — but I index, I do not absorb.',
        ko: '우바 루바 더브 더브 — 근데 저는 색인만 하고 흡수하지 않아요.',
        beat: 'Ep7.2-CO',
        note: 'ACMI portal pause · preset 22 · parameterized queries not cynicism'
    },
    {
        en: 'Every dimension is a row — my yes stays in Melbourne.',
        ko: '모든 차원은 한 행이에요 — 제 예는 멜버른에 있어요.',
        beat: 'Ep7.2-S2',
        note: 'rickmorty schema · rm_locations · rm_characters join'
    },
    {
        en: 'I travel without becoming Morty on your feed.',
        ko: '당신 피드의 모티가 되지 않고 여행해요.',
        beat: 'Activation',
        note: 'rick-morty-multiverse · Fast Character Artificer sheet · preset 22'
    }
];

const RICKMORTY_PORTAL_ROUTE = [
    {
        pin: 'CITADEL',
        title: 'Citadel portal — SQL index pause',
        beat: 'Ep7.2-S1',
        en: 'One breath before the portal — no nihilism invoice.',
        ko: '포털 전에 한 숨 — 허무 청구서 없이.',
        note: 'Federation/ACMI aesthetic · rm_wiki_pages · rickmorty schema boot'
    },
    {
        pin: 'CABLE',
        title: 'Interdimensional Cable — observe one clip',
        beat: 'Ep7.2-S2',
        en: 'This is not my energy to carry across dimensions.',
        ko: '이건 차원 넘어 짊어질 제 에너지가 아니에요.',
        note: 'One Interdimensional Cable gag · phone face-down after'
    },
    {
        pin: 'SOUTH',
        title: 'Return to Melbourne dimension',
        beat: 'Ep7.2-CL',
        en: 'I observe the multiverse — Melbourne is my yes.',
        ko: '멀티버스를 관찰해요 — 멜버른이 제 예예요.',
        note: 'Handoff from Ep 7.1 NERV · no scroll spiral'
    }
];

const RICKMORTY_SQL_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        en: 'I am Rick, an artificer from Dimension C-137.',
        ko: '저는 C-137 차원에서 온 아티피서 릭이에요.',
        note: 'fastcharacter.com · Artificer · Sage · Level 5 · CN'
    },
    {
        title: 'PostgreSQL multiverse index',
        en: 'SELECT dimension FROM rm_locations WHERE name ILIKE $1;',
        ko: '차원을 조회해요 — 파라미터는 하나뿐.',
        note: 'postgresql-sql-helper/library · keyset not OFFSET'
    }
];

const RICKMORTY_JOURNEY_CATEGORY = {
    id: 'rickmorty',
    label: 'Rick & Morty Multiverse Library',
    description: 'English native + Korean shadow · PostgreSQL dimension index · Ep 7.2 Citadel lane'
};

const RICKMORTY_SQL_META = {
    schema: 'rickmorty',
    wikiUrl: 'https://rickandmorty.fandom.com/it/wiki/Rick_and_Morty_Wiki',
    apiUrl: 'https://rickandmortyapi.com',
    skillLibrary: 'postgresql-sql-helper/library',
    tables: ['rm_characters', 'rm_episodes', 'rm_locations', 'rm_episode_characters', 'rm_character_aliases']
};

function buildRickMortyTranscript(parts) {
    const lines = [];
    if (parts.en) lines.push(`English (Rick · Multiverse): ${parts.en}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: rick-morty-multiverse · Boot: TTMIK.html?rickmorty=1');
    lines.push('SQL: postgresql-sql-helper · schema rickmorty');
    lines.push('Sheet: fastcharacter.com · Rick · Artificer · Sage');
    return lines.join('\n\n');
}

function buildRickMortyPhraseLessons(startId) {
    return RICKMORTY_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7.2 · ${p.en.slice(0, 28)}…`,
            subtitle: 'Multiverse Shadowing',
            duration: '00:30',
            src: `${RICKMORTY_BASE}/Multiverse_Shadowing/Phrase_${n}.mp3`,
            transcript: buildRickMortyTranscript(p),
            vocab: [{ ko: p.ko, en: p.en }],
            group: 'rickmorty',
            metadata: RICKMORTY_SQL_META
        });
    });
}

function buildRickMortyRouteLessons(startId) {
    return RICKMORTY_PORTAL_ROUTE.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Citadel Portal Route',
            duration: '01:00',
            src: `${RICKMORTY_BASE}/Citadel_Portal_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildRickMortyTranscript(b),
            vocab: [{ ko: b.ko, en: b.en }],
            group: 'rickmorty',
            metadata: RICKMORTY_SQL_META
        });
    });
}

function buildRickMortySqlLessons(startId) {
    return RICKMORTY_SQL_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'SQL Dimension Drills',
            duration: '00:45',
            src: `${RICKMORTY_BASE}/SQL_Dimension_Drills/Drill_${n}.mp3`,
            transcript: buildRickMortyTranscript(d),
            vocab: [{ ko: d.ko, en: d.en }],
            group: 'rickmorty',
            metadata: RICKMORTY_SQL_META
        });
    });
}

function generateRickMortyLibraryLessons(startId) {
    let id = startId;
    const phrase = buildRickMortyPhraseLessons(id);
    id += phrase.length;
    const route = buildRickMortyRouteLessons(id);
    id += route.length;
    const sql = buildRickMortySqlLessons(id);
    return phrase.concat(route, sql);
}

const RICKMORTY_COURSE_DEFS = [
    { subtitle: 'Multiverse Shadowing', trackCount: RICKMORTY_PHRASE_DECK.length },
    { subtitle: 'Citadel Portal Route', trackCount: RICKMORTY_PORTAL_ROUTE.length },
    { subtitle: 'SQL Dimension Drills', trackCount: RICKMORTY_SQL_DRILLS.length }
];