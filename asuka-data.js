/**
 * Asuka Library — Japanese native + Korean TTMIK shadowing (Ep 5)
 * Audio folder: Asuka_Library/
 */

const ASUKA_BASE = 'Asuka_Library';

const ASUKA_LIBRARY_CATEGORIES = [
    'Japanese Shadowing',
    'Maybe Walk Route',
    'Sovereign Choice'
];

const ASUKA_PHRASE_DECK = [
    {
        ja: 'メルボルンが私の選択です。',
        ko: '멜버른이 제 선택이에요.',
        en: 'Melbourne is my choice.',
        beat: 'Ep5-S2',
        note: 'Tram monologue — Japanese native before Korean'
    },
    {
        ja: '美しい「もしも」も手放せます。',
        ko: '아름다운 “만약에”도 놓을 수 있어요.',
        en: 'I can release a beautiful “what if.”',
        beat: 'Ep5-CO',
        note: 'Rain glass cold open'
    },
    {
        ja: '自分の道を信じます。',
        ko: '제 길을 믿어요.',
        en: 'I trust my path.',
        beat: 'Ep5-S2',
        note: 'Affirm the yes you chose'
    },
    {
        ja: 'ブリスベンは美しい「もしかしたら」。メルボルンが私の「はい」。',
        ko: '브리스번은 아름다운 “아마도”. 멜버른이 제 “예”예요.',
        en: 'Brisbane was a beautiful maybe. Melbourne is my yes.',
        beat: 'Activation',
        note: 'asuka-brisbane · preset 11'
    }
];

const ASUKA_ROUTE_BEATS = [
    {
        pin: 'FED',
        title: 'Rain glass — beautiful maybe',
        beat: 'Ep5-CO',
        ja: 'もしかしたら、よかったかもしれない。',
        ko: '아마도, 좋았을지도 몰라요.',
        en: "It could've been nice.",
        note: 'Preset 11 · no FOMO replay'
    },
    {
        pin: 'FLINDERS',
        title: 'Tram monologue — Melbourne is my yes',
        beat: 'Ep5-S1',
        ja: 'メルボルンが私の「はい」です。ブリスベンが失敗したからじゃない。',
        ko: '멜버른이 제 “예”예요. 브리스번이 실패해서가 아니에요.',
        en: 'Melbourne is my yes — not because Brisbane failed.',
        note: 'Reflection in glass — only your face'
    },
    {
        pin: 'HOSIER',
        title: 'Clear-weather cliff — episode five',
        beat: 'Ep5-CL',
        ja: '余分な旅路は要らない。',
        ko: '추가 여정은 필요 없어요.',
        en: 'No extra leg required.',
        note: 'Quest main-others · Transportation lessons'
    }
];

const ASUKA_SOVEREIGN_DRILLS = [
    {
        title: 'Distant flame release',
        ja: '遠い炎に感謝して、手放します。',
        ko: '먼 불꽃에 감사하고 놓아줄게요.',
        en: 'I thank the distant flame and release it.',
        note: 'Symbol only — no contact prompts'
    }
];

const ASUKA_JOURNEY_CATEGORY = {
    id: 'asuka',
    label: 'Asuka Library',
    description: 'Japanese native input + Korean shadowing · Ep 5 The Maybe'
};

function buildAsukaTranscript(parts) {
    const lines = [];
    if (parts.ja) lines.push(`Japanese (Asuka): ${parts.ja}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: asuka-brisbane · Boot: TTMIK.html?asuka=1');
    return lines.join('\n\n');
}

function buildAsukaPhraseLessons(startId) {
    return ASUKA_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 5 · ${p.ja.slice(0, 12)}…`,
            subtitle: 'Japanese Shadowing',
            duration: '00:30',
            src: `${ASUKA_BASE}/Japanese_Shadowing/Phrase_${n}.mp3`,
            transcript: buildAsukaTranscript(p),
            vocab: [{ ko: p.ko, en: p.en, note: p.ja }],
            group: 'asuka'
        });
    });
}

function buildAsukaRouteLessons(startId) {
    return ASUKA_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Maybe Walk Route',
            duration: '01:00',
            src: `${ASUKA_BASE}/Maybe_Walk_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildAsukaTranscript(b),
            vocab: [{ ko: b.ko, en: b.en, note: b.ja }],
            group: 'asuka'
        });
    });
}

function buildAsukaSovereignLessons(startId) {
    return ASUKA_SOVEREIGN_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Sovereign Choice',
            duration: '00:45',
            src: `${ASUKA_BASE}/Sovereign_Choice/Choice_${n}.mp3`,
            transcript: buildAsukaTranscript(d),
            vocab: [{ ko: d.ko, en: d.en, note: d.ja }],
            group: 'asuka'
        });
    });
}

function generateAsukaLibraryLessons(startId) {
    let id = startId;
    const phrase = buildAsukaPhraseLessons(id);
    id += phrase.length;
    const route = buildAsukaRouteLessons(id);
    id += route.length;
    const sovereign = buildAsukaSovereignLessons(id);
    return phrase.concat(route, sovereign);
}

const ASUKA_COURSE_DEFS = [
    { subtitle: 'Japanese Shadowing', trackCount: ASUKA_PHRASE_DECK.length },
    { subtitle: 'Maybe Walk Route', trackCount: ASUKA_ROUTE_BEATS.length },
    { subtitle: 'Sovereign Choice', trackCount: ASUKA_SOVEREIGN_DRILLS.length }
];