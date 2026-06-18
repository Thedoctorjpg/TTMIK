/**
 * SVSSS Library — Indonesian native + Korean TTMIK shadowing
 * The Scum Villain's Self-Saving System · WebNovel Ch.1 (ID translation)
 * Source: https://www.webnovel.com/book/35203689408704405/94532538348928087
 * Audio folder: SVSSS_Library/
 * Lane: Ep 7.6 Qing Jing Peak · System bound · B-point guard
 */

const SVSSS_BASE = 'SVSSS_Library';

const SVSSS_WEBNOVEL_META = {
    bookId: '35203689408704405',
    chapterId: '94532538348928087',
    url: 'https://www.webnovel.com/book/35203689408704405/94532538348928087',
    title: "The Scum Villain's Self-Saving System (Terjemahan Indonesia)",
    chapter: 'Chapter 1',
    translator: 'BoaHancock31'
};

const SVSSS_LIBRARY_CATEGORIES = [
    'Indonesian Shadowing',
    'Qing Jing Route',
    'System Drills'
];

const SVSSS_PHRASE_DECK = [
    {
        id: 'Penulis tolol, novel tolol!',
        ko: '바보 작가, 바보 소설!',
        en: 'Stupid author, stupid novel!',
        beat: 'Ep7.6-ACT',
        note: 'Activation curse — System auto-trigger · 100 B-points · OOC frozen'
    },
    {
        id: 'YOU CAN YOU UP, NO CAN NO BB',
        ko: '할 수 있으면 해봐, 못 하면 말고',
        en: 'System design motto — observe, do not absorb the trash-novel spiral',
        beat: 'Ep7.6-SYS',
        note: 'Google Translate voice · bound role Shen Qingqiu · Pedang Xiu Ya',
        enFirst: true
    },
    {
        id: 'Aku… Di mana ini?',
        ko: '여기가… 어디예요?',
        en: 'Where am I?',
        beat: 'Ep7.6-S1',
        note: 'Qing Jing Peak wake — play confused, not comedy invoice'
    },
    {
        id: 'Ini adalah Puncak Qing Jing milikmu.',
        ko: '여기는 당신의 청정봉이에요.',
        en: 'This is your Qing Jing Peak.',
        beat: 'Ep7.6-S1',
        note: 'Yue Qingyuan shixiong at bedside — reputation still clean'
    },
    {
        id: 'Poin B tidak boleh di bawah nol.',
        ko: 'B 포인트는 0 아래로 내려가면 안 돼요.',
        en: 'B-points must not fall below zero.',
        beat: 'Ep7.6-S2',
        note: 'Deportation = death · stay in character until OOC unlocks'
    },
    {
        id: 'Aku harus tetap sesuai karakter.',
        ko: '캐릭터에서 벗어나면 안 돼요.',
        en: 'I must stay in character — OOC frozen.',
        beat: 'Ep7.6-CO',
        note: 'Trash-villain facade · no sudden kindness invoice'
    },
    {
        id: 'Di mana Luo Binghe?',
        ko: '루오빙허는 어디 있어요?',
        en: 'Where is Luo Binghe?',
        beat: 'Ep7.6-S3',
        note: 'Male lead not at bedside — woodshed reveal incoming'
    },
    {
        id: 'Dia di gudang kayu.',
        ko: '그는 나무 창고에 있어요.',
        en: 'He is in the woodshed.',
        beat: 'Ep7.6-CL',
        note: 'Original Shen Qingqiu abuse arc — phone face-down after beat'
    }
];

const SVSSS_ROUTE_BEATS = [
    {
        pin: 'QING',
        title: 'Qing Jing Peak — confused wake',
        beat: 'Ep7.6-S1',
        id: 'Shidi akhirnya bangun.',
        ko: '사제님이 드디어 일어났어요.',
        en: 'Shidi finally woke up.',
        note: 'Yue Qingyuan · Pedang Xuan Su · one breath before plot panic'
    },
    {
        pin: 'SYSTEM',
        title: 'System bound — B-point ledger',
        beat: 'Ep7.6-S2',
        id: 'Peran Terikat: Shen Qingqiu. Poin B: 100.',
        ko: '역할 고정: 심청추. B 포인트: 100.',
        en: 'Bound role: Shen Qingqiu. B-points: 100.',
        note: 'Preset 26 · Monk Kensei sheet · no OOC kindness spiral'
    },
    {
        pin: 'WOODS',
        title: 'Woodshed reveal — stay in character',
        beat: 'Ep7.6-CL',
        id: 'Jangan menghukumnya lagi, oke?',
        ko: '더 이상 벌주지 마세요, 알겠죠?',
        en: "Don't punish him again, okay?",
        note: 'Luo Binghe chained in woodshed · b-point-guard heal handoff'
    }
];

const SVSSS_SYSTEM_DRILLS = [
    {
        title: 'Fast Character sheet invoke',
        id: 'Aku Shen Qingqiu — guru Pedang Xiu Ya.',
        ko: '저는 수야 검의 스승 심청추예요.',
        en: 'I am Shen Qingqiu — master of Xiu Ya sword.',
        note: 'fastcharacter.com · Monk Kensei · Sage · Level 5 · LN'
    },
    {
        title: 'WebNovel chapter anchor',
        id: 'Bab satu — Sistem terikat.',
        ko: '1장 — 시스템에 묶였어요.',
        en: 'Chapter one — bound to the System.',
        note: SVSSS_WEBNOVEL_META.url
    }
];

const SVSSS_JOURNEY_CATEGORY = {
    id: 'svsss',
    label: 'SVSSS Library',
    description: 'Indonesian native input + Korean shadowing · WebNovel Ch.1 · System bound'
};

function buildSvsssTranscript(parts) {
    const lines = [];
    if (parts.id) lines.push(`Indonesian (SVSSS): ${parts.id}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push(`\nWebNovel: ${SVSSS_WEBNOVEL_META.url}`);
    lines.push('Skill: shen-qingqiu-svsss · Boot: TTMIK.html?svsss=1');
    lines.push('Sheet: fastcharacter.com · Shen Qingqiu · Monk (Kensei) · Sage');
    return lines.join('\n\n');
}

function buildSvsssPhraseLessons(startId) {
    return SVSSS_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7.6 · ${(p.id || p.en || '').slice(0, 28)}…`,
            subtitle: 'Indonesian Shadowing',
            duration: '00:30',
            src: `${SVSSS_BASE}/Indonesian_Shadowing/Phrase_${n}.mp3`,
            transcript: buildSvsssTranscript(p),
            vocab: [{ ko: p.ko, en: p.id || p.en }],
            group: 'svsss'
        });
    });
}

function buildSvsssRouteLessons(startId) {
    return SVSSS_ROUTE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Qing Jing Route',
            duration: '01:00',
            src: `${SVSSS_BASE}/Qing_Jing_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildSvsssTranscript(b),
            vocab: [{ ko: b.ko, en: b.id }],
            group: 'svsss'
        });
    });
}

function buildSvsssSystemLessons(startId) {
    return SVSSS_SYSTEM_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'System Drills',
            duration: '00:45',
            src: `${SVSSS_BASE}/System_Drills/Drill_${n}.mp3`,
            transcript: buildSvsssTranscript(d),
            vocab: [{ ko: d.ko, en: d.id }],
            group: 'svsss'
        });
    });
}

function generateSvsssLibraryLessons(startId) {
    let id = startId;
    const phrase = buildSvsssPhraseLessons(id);
    id += phrase.length;
    const route = buildSvsssRouteLessons(id);
    id += route.length;
    const system = buildSvsssSystemLessons(id);
    return phrase.concat(route, system);
}

const SVSSS_COURSE_DEFS = [
    { subtitle: 'Indonesian Shadowing', trackCount: SVSSS_PHRASE_DECK.length },
    { subtitle: 'Qing Jing Route', trackCount: SVSSS_ROUTE_BEATS.length },
    { subtitle: 'System Drills', trackCount: SVSSS_SYSTEM_DRILLS.length }
];

function getSvsssSystemRitual() {
    return typeof BARDIC_INSPIRATION !== 'undefined' ? BARDIC_INSPIRATION.svsssSystemBound : null;
}