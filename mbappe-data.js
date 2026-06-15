/**
 * Mbappé Library — French native + Korean TTMIK shadowing
 * D&D sheet via Fast Character · Fighter (Battle Master) · Soldier
 * Audio folder: Mbappe_Library/
 */

const MBAPPE_BASE = 'Mbappe_Library';

const MBAPPE_LIBRARY_CATEGORIES = [
    'French Shadowing',
    'Counter Attack Route',
    'Strike Drills'
];

const MBAPPE_PHRASE_DECK = [
    {
        fr: 'Melbourne, c\'est mon oui.',
        ko: '멜버른이 제 예예요.',
        en: 'Melbourne is my yes.',
        beat: 'Ep2.66-S1',
        note: 'Stade open — French native before Korean'
    },
    {
        fr: 'J\'attaque à ma manière — sans drame.',
        ko: '내 방식으로 공격해요 — 드라마 없이.',
        en: 'I attack my way — no drama.',
        beat: 'Ep2.66-CO',
        note: 'Counter-attack lane · preset 17 · no performance invoice'
    },
    {
        fr: 'But! Allez les Bleus!',
        ko: '골! 프랑스 파이팅!',
        en: 'Goal! Go France!',
        beat: 'Ep2.66-CH',
        note: 'TV replay · after Ronaldo Portugal cheer · no soulmate CTAs'
    },
    {
        fr: 'Je fais confiance à mon chemin.',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Activation',
        note: 'mbappe-france-attack · Fast Character sheet · preset 17'
    }
];

const MBAPPE_ATTACK_ROUTE = [
    {
        pin: 'STADE',
        title: 'Stade burst — counter-attack open',
        beat: 'Ep2.66-S1',
        fr: 'Une accélération. Un geste. Mon chemin.',
        ko: '한 번의 가속. 한 동작. 제 길.',
        en: 'One burst. One move. My path.',
        note: 'Preset 17 · strike before the algorithm'
    },
    {
        pin: 'FED',
        title: 'Square feint — calm before the sprint',
        beat: 'Ep2.66-S2',
        fr: 'Une respiration. Une feinte. Pas de facture.',
        ko: '한 숨. 한 페인트. 청구서 없이.',
        en: 'One breath. One feint. No invoice.',
        note: 'FIFA joy without rescue framing'
    },
    {
        pin: 'FLINDERS',
        title: 'Tram sprint — lighter walk home',
        beat: 'Ep2.66-CL',
        fr: 'Je fonce et j\'avance.',
        ko: '돌진하고 앞으로 나아갈게요.',
        en: 'I sprint and move forward.',
        note: 'Quest side-fifa-celebrate · after cantina cheer'
    }
];

const MBAPPE_STRIKE_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        fr: 'Je suis Mbappé, un voyageur de France.',
        ko: '저는 프랑스에서 온 방랑자 음바페예요.',
        en: 'I am Mbappé, a wanderer from France.',
        note: 'fastcharacter.com · Fighter Battle Master · Level 5 · Soldier'
    }
];

const MBAPPE_JOURNEY_CATEGORY = {
    id: 'mbappe',
    label: 'Mbappé Library',
    description: 'French native input + Korean shadowing · Fast Character Battle Master Fighter'
};

function buildMbappeTranscript(parts) {
    const lines = [];
    if (parts.fr) lines.push(`French (Mbappé): ${parts.fr}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: mbappe-france-attack · Boot: TTMIK.html?mbappe=1');
    lines.push('Sheet: fastcharacter.com · Mbappé · Fighter (Battle Master) · Soldier');
    return lines.join('\n\n');
}

function buildMbappePhraseLessons(startId) {
    return MBAPPE_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 2.66 · ${p.fr.slice(0, 18)}…`,
            subtitle: 'French Shadowing',
            duration: '00:30',
            src: `${MBAPPE_BASE}/French_Shadowing/Phrase_${n}.mp3`,
            transcript: buildMbappeTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.fr }],
            group: 'mbappe'
        });
    });
}

function buildMbappeRouteLessons(startId) {
    return MBAPPE_ATTACK_ROUTE.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Counter Attack Route',
            duration: '01:00',
            src: `${MBAPPE_BASE}/Counter_Attack_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildMbappeTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.fr }],
            group: 'mbappe'
        });
    });
}

function buildMbappeStrikeLessons(startId) {
    return MBAPPE_STRIKE_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Strike Drills',
            duration: '00:45',
            src: `${MBAPPE_BASE}/Strike_Drills/Drill_${n}.mp3`,
            transcript: buildMbappeTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.fr }],
            group: 'mbappe'
        });
    });
}

function generateMbappeLibraryLessons(startId) {
    let id = startId;
    const phrase = buildMbappePhraseLessons(id);
    id += phrase.length;
    const route = buildMbappeRouteLessons(id);
    id += route.length;
    const strike = buildMbappeStrikeLessons(id);
    return phrase.concat(route, strike);
}

const MBAPPE_COURSE_DEFS = [
    { subtitle: 'French Shadowing', trackCount: MBAPPE_PHRASE_DECK.length },
    { subtitle: 'Counter Attack Route', trackCount: MBAPPE_ATTACK_ROUTE.length },
    { subtitle: 'Strike Drills', trackCount: MBAPPE_STRIKE_DRILLS.length }
];