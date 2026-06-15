/**
 * Healing Factors Library — Hermes heal pipeline lessons
 * Audio folder: Healing_Library/ (drop MP3s to match track filenames)
 */

const HEALING_BASE = 'Healing_Library';

const HEALING_LIBRARY_CATEGORIES = [
    'Post-DIB Landing',
    'Boundaries & Cord-Cut',
    'Lantern & Humor',
    'Ignan Journey',
    'Celebration',
    'Daily Integration'
];

/** Mirrors HEALING_FACTORS.factors + postBlessing steps from webdrama-sync-data.js */
const HEALING_FACTOR_DECK = [
    {
        factorId: 'post-dib',
        title: 'Post-DIB landing — HOTEL mirror',
        subtitle: 'Post-DIB Landing',
        pin: 'HOTEL',
        ko: '괜찮아요, 괜찮아요.',
        en: "It's okay, it's okay.",
        phrase: 'GoPro off · phone face-down · one breath',
        skillId: 'helen-neighbor',
        boot: 'TTMIK.html?heal=1',
        note: 'preset 9 · dib-aftercare · quest side-dib-heal'
    },
    {
        factorId: 'hermit-lantern',
        title: 'Hermit Lantern — one breath, one laugh',
        subtitle: 'Lantern & Humor',
        ko: '멜버른 골목이 정말 예뻐요!',
        en: 'One breath, one laugh.',
        phrase: 'One breath, one laugh',
        skillId: 'melbourne-lantern-bard',
        boot: 'TTMIK.html?heal-factor=hermit-lantern',
        note: 'Center humor before skit — no re-watch spiral'
    },
    {
        factorId: 'humor-release',
        title: 'Humor alchemy — release without dramatizing',
        subtitle: 'Lantern & Humor',
        ko: '유머로 풀어낼게요.',
        en: "I'll release it with humor.",
        skillId: 'melbourne-lantern-bard',
        edit: 'ep-2-5-dib',
        boot: 'TTMIK.html?heal-factor=humor-release',
        note: 'Ep 2.5 DIB wrap — name what released'
    },
    {
        factorId: 'helen-boundary',
        title: 'Helen boundary whisper',
        subtitle: 'Boundaries & Cord-Cut',
        ko: '괜찮아요, 괜찮아요.',
        en: "It's okay, it's okay.",
        skillId: 'helen-neighbor',
        shadowIndex: 2,
        boot: 'TTMIK.html?heal-factor=helen-boundary',
        note: 'Compassion includes protecting your peace'
    },
    {
        factorId: 'pause-breathe',
        title: 'Pause OK — rest is allowed',
        subtitle: 'Boundaries & Cord-Cut',
        ko: '잠시 쉬어도 괜찮아요.',
        en: "It's okay to pause and breathe.",
        skillId: 'helen-neighbor',
        shadowIndex: 4,
        boot: 'TTMIK.html?heal-factor=pause-breathe',
        note: 'Shoulders drop before Korean shadow'
    },
    {
        factorId: 'cord-cut',
        title: 'Cord-cut — own timeline',
        subtitle: 'Boundaries & Cord-Cut',
        ko: '제 시간표를 선택해요.',
        en: 'I choose my own timeline and energy field.',
        phrase: 'I choose my own timeline and energy field',
        skillId: 'helen-neighbor',
        boot: 'TTMIK.html?heal-factor=cord-cut',
        note: 'No reply owed to expired blessings'
    },
    {
        factorId: 'ignan-walk',
        title: 'Ignan healing walk — Mari leads',
        subtitle: 'Ignan Journey',
        ilo: 'Ok laeng, aginana.',
        ko: '괜찮아요, 괜찮아요.',
        en: "It's okay — walk your own dalan.",
        pin: 'BOTANIC',
        skillId: 'ignan-pilgrim',
        boot: 'TTMIK.html?ignan=1',
        note: 'Ep 2.6 · preset 10 · quest side-ignan-heal'
    },
    {
        factorId: 'fifa-celebrate',
        title: 'Mari FIFA cantina — joy not drama',
        subtitle: 'Celebration',
        ilo: 'Naragsak unay! Ok laeng, agnanayon.',
        ko: '맛있어요! 축하해요!',
        en: 'Celebrate without posting — own joy.',
        pin: 'CANTINA',
        skillId: 'ignan-pilgrim',
        boot: 'TTMIK.html?fifa=1',
        note: 'Ep 2.65 · preset 12 · quest side-fifa-celebrate'
    },
    {
        factorId: 'daily-ritual',
        title: 'Daily integration ritual',
        subtitle: 'Daily Integration',
        ko: '나는 나만의 이야기를 씁니다.',
        en: 'I write my own story.',
        skillId: 'flame-kissed-bard',
        questId: 'side-ritual',
        boot: 'TTMIK.html?heal-factor=daily-ritual',
        note: 'Morning activation — flame not lack'
    },
    {
        factorId: 'no-rewatch',
        title: 'No re-watch spiral',
        subtitle: 'Daily Integration',
        en: 'GoPro off before mirror · phone face-down',
        phrase: 'One breath · one boundary · no re-watch spiral',
        boot: 'TTMIK.html?heal-factor=no-rewatch',
        note: 'Name what released once — do not re-open the hook'
    }
];

const HEALING_POST_BLESSING_STEPS = [
    {
        title: 'Step 1 — gear down',
        step: 'GoPro off · phone face-down · one breath',
        subtitle: 'Post-DIB Landing'
    },
    {
        title: 'Step 2 — name the release',
        step: 'Name what the skit released — no re-watch spiral',
        subtitle: 'Post-DIB Landing'
    },
    {
        title: 'Step 3 — cord-cut phrase',
        step: 'Helen cord-cut: "I choose my own timeline and energy field"',
        ko: '제 시간표를 선택해요.',
        subtitle: 'Post-DIB Landing'
    },
    {
        title: 'Step 4 — boundary whisper',
        step: 'Whisper 괜찮아요, 괜찮아요',
        ko: '괜찮아요, 괜찮아요.',
        subtitle: 'Post-DIB Landing'
    },
    {
        title: 'Step 5 — close the loop',
        step: 'Humor tended the wound — you do not owe the algorithm a reply',
        subtitle: 'Post-DIB Landing'
    }
];

const HEALING_JOURNEY_CATEGORY = {
    id: 'heal',
    label: 'Healing Factors Library',
    description: 'Hermes heal pipeline — post-DIB landing, boundaries, Ignan walk, celebration'
};

function buildHealingTranscript(parts) {
    const lines = [];
    if (parts.phrase) lines.push(`Anchor: ${parts.phrase}`);
    if (parts.ilo) lines.push(`Ilokano: ${parts.ilo}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.step) lines.push(`Ritual: ${parts.step}`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    if (parts.skillId) lines.push(`Skill: ${parts.skillId}`);
    if (parts.boot) lines.push(`Boot: ${parts.boot}`);
    lines.push('\nMantra: One breath · one boundary · no re-watch spiral');
    return lines.join('\n\n');
}

function buildHealingFactorLessons(startId) {
    return HEALING_FACTOR_DECK.map((f, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: f.title,
            subtitle: f.subtitle,
            duration: '00:45',
            src: `${HEALING_BASE}/${f.subtitle.replace(/[^a-zA-Z0-9]+/g, '_')}/Factor_${n}_${f.factorId}.mp3`,
            transcript: buildHealingTranscript(f),
            vocab: [{ ko: f.ko || f.phrase || f.step || '', en: f.en || f.phrase || f.step || '' }],
            group: 'heal'
        });
    });
}

function buildHealingPostBlessingLessons(startId) {
    return HEALING_POST_BLESSING_STEPS.map((s, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: s.title,
            subtitle: s.subtitle,
            duration: '00:30',
            src: `${HEALING_BASE}/Post_DIB_Landing/Blessing_${n}.mp3`,
            transcript: buildHealingTranscript(s),
            vocab: [{ ko: s.ko || '', en: s.step }],
            group: 'heal'
        });
    });
}

function generateHealingLibraryLessons(startId) {
    let id = startId;
    const factors = buildHealingFactorLessons(id);
    id += factors.length;
    const blessing = buildHealingPostBlessingLessons(id);
    return factors.concat(blessing);
}

const HEALING_COURSE_DEFS = [
    { subtitle: 'Post-DIB Landing', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Post-DIB Landing').length + HEALING_POST_BLESSING_STEPS.length },
    { subtitle: 'Boundaries & Cord-Cut', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Boundaries & Cord-Cut').length },
    { subtitle: 'Lantern & Humor', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Lantern & Humor').length },
    { subtitle: 'Ignan Journey', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Ignan Journey').length },
    { subtitle: 'Celebration', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Celebration').length },
    { subtitle: 'Daily Integration', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Daily Integration').length }
];

function getHealingFactorById(factorId) {
    return HEALING_FACTOR_DECK.find(f => f.factorId === factorId) || null;
}