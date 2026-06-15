/**
 * Healing Factors Library — GENERATED from source files
 * Run: node scripts/heal-library.js
 *
 * Sources:
 *   webdrama-sync-data.js  → HEALING_FACTORS · BARDIC_INSPIRATION.afterBlessingHeal
 *   heal-skills.js         → SKILLS korean phrases
 *   ignan-data.js          → IGNAN_PHRASE_DECK · IGNAN_FIFA_CELEBRATION
 *
 * Healed: 2026-06-15 · 18 tracks
 */

const HEALING_LIBRARY_SOURCES = [
    'webdrama-sync-data.js',
    'packages/ttmik-heal-skills/lib/heal-skills.js',
    'ignan-data.js'
];

const HEALING_BASE = 'Healing_Library';

const HEALING_LIBRARY_CATEGORIES = [
    "Post-DIB Landing",
    "Boundaries & Cord-Cut",
    "Lantern & Humor",
    "Ignan Journey",
    "Celebration",
    "Pre-Match Attune",
    "Moon Card",
    "Cicada Attune",
    "Daily Integration"
];

const HEALING_FACTOR_DECK = [
    {
        "factorId": "post-dib",
        "title": "Post-DIB landing — HOTEL mirror",
        "subtitle": "Post-DIB Landing",
        "boot": "TTMIK.html?heal=1",
        "note": "preset 9 · dib-aftercare · quest side-dib-heal",
        "pin": "HOTEL",
        "questId": "side-dib-heal",
        "edit": "dib-aftercare",
        "en": "It's okay, it's okay.",
        "ko": "괜찮아요, 괜찮아요.",
        "phrase": "GoPro off · phone face-down · one breath",
        "skillId": "helen-neighbor"
    },
    {
        "factorId": "hermit-lantern",
        "title": "Hermit Lantern — one breath, one laugh",
        "subtitle": "Lantern & Humor",
        "boot": "TTMIK.html?heal-factor=hermit-lantern",
        "note": "",
        "skillId": "melbourne-lantern-bard",
        "phrase": "One breath, one laugh",
        "en": "One breath, one laugh",
        "ko": "멜버른 골목이 정말 예뻐요!"
    },
    {
        "factorId": "humor-release",
        "title": "Humor alchemy — release without dramatizing",
        "subtitle": "Lantern & Humor",
        "boot": "TTMIK.html?heal-factor=humor-release",
        "note": "ep-2-5-dib",
        "skillId": "melbourne-lantern-bard",
        "edit": "ep-2-5-dib",
        "ko": "유머로 풀어낼게요",
        "en": "I'll release it with humor."
    },
    {
        "factorId": "helen-boundary",
        "title": "Helen boundary whisper",
        "subtitle": "Boundaries & Cord-Cut",
        "boot": "TTMIK.html?heal-factor=helen-boundary",
        "note": "",
        "skillId": "helen-neighbor",
        "shadowIndex": 2,
        "ko": "괜찮아요, 괜찮아요",
        "en": "It's okay, it's okay."
    },
    {
        "factorId": "pause-breathe",
        "title": "Pause OK — rest is allowed",
        "subtitle": "Boundaries & Cord-Cut",
        "boot": "TTMIK.html?heal-factor=pause-breathe",
        "note": "",
        "skillId": "helen-neighbor",
        "shadowIndex": 4,
        "ko": "잠시 쉬어도 괜찮아요",
        "en": "It's okay to pause and breathe."
    },
    {
        "factorId": "cord-cut",
        "title": "Cord-cut — own timeline",
        "subtitle": "Boundaries & Cord-Cut",
        "boot": "TTMIK.html?heal-factor=cord-cut",
        "note": "",
        "skillId": "helen-neighbor",
        "phrase": "I choose my own timeline and energy field",
        "en": "I choose my own timeline and energy field.",
        "ko": "잠시 쉬어도 괜찮아요."
    },
    {
        "factorId": "daily-ritual",
        "title": "Daily integration ritual",
        "subtitle": "Daily Integration",
        "boot": "TTMIK.html?heal-factor=daily-ritual",
        "note": "quest side-ritual",
        "skillId": "flame-kissed-bard",
        "questId": "side-ritual",
        "en": "I write my own story.",
        "ko": "나는 나만의 이야기를 씁니다."
    },
    {
        "factorId": "no-rewatch",
        "title": "No re-watch spiral",
        "subtitle": "Daily Integration",
        "boot": "TTMIK.html?heal-factor=no-rewatch",
        "note": "GoPro off before mirror · phone face-down",
        "en": "GoPro off before mirror · phone face-down",
        "phrase": "One breath · one boundary · no re-watch spiral"
    },
    {
        "factorId": "ignan-walk",
        "title": "Ignan healing walk — Mari leads",
        "subtitle": "Ignan Journey",
        "boot": "TTMIK.html?ignan=1",
        "note": "ignan-healing-journey · quest side-ignan-heal · Shoulders drop — body before app",
        "skillId": "ignan-pilgrim",
        "pin": "BOTANIC",
        "questId": "side-ignan-heal",
        "edit": "ignan-healing-journey",
        "en": "It's okay, it's okay.",
        "ilo": "Ok laeng, ok laeng.",
        "ko": "괜찮아요, 괜찮아요."
    },
    {
        "factorId": "fifa-celebrate",
        "title": "Mari FIFA cantina — joy not drama",
        "subtitle": "Celebration",
        "boot": "TTMIK.html?fifa=1",
        "note": "mari-fifa-celebration · quest side-fifa-celebrate · Mari speaks Ilokano first at the cantina booth",
        "skillId": "ignan-pilgrim",
        "pin": "CANTINA",
        "questId": "side-fifa-celebrate",
        "edit": "mari-fifa-celebration",
        "en": "So happy — cheers to the game and the meal.",
        "ilo": "Naragsak unay! Ok laeng, agnanayon.",
        "ko": "맛있어요! 축하해요!"
    },
    {
        "factorId": "match-attune",
        "title": "Attune before match — Federation pause",
        "subtitle": "Pre-Match Attune",
        "boot": "TTMIK.html?attune=1",
        "note": "match-attune-ritual · quest side-fifa-celebrate",
        "skillId": "melbourne-lantern-bard",
        "pin": "FED",
        "questId": "side-fifa-celebrate",
        "edit": "match-attune-ritual",
        "ko": "응원 전에 한 숨",
        "en": "One breath before the cheer."
    },
    {
        "factorId": "rei-mercy",
        "title": "Rei mercy heal — observe without absorbing",
        "subtitle": "Moon Card",
        "boot": "TTMIK.html?rei=1",
        "note": "rei-mercy-ritual · quest side-humor",
        "skillId": "neon-evangelion",
        "pin": "NERV",
        "shadowIndex": 1,
        "questId": "side-humor",
        "edit": "rei-mercy-ritual",
        "ko": "관찰만 하고 흡수하지 않을게요",
        "en": "I observe without absorbing.",
        "ja": "観測するだけ。吸収しない。"
    },
    {
        "factorId": "cicada-attune",
        "title": "Sua cicada attune — shed before you cheer",
        "subtitle": "Cicada Attune",
        "boot": "TTMIK.html?sua=1",
        "note": "cicada-attune-ritual · quest side-boundary",
        "skillId": "sua-tattoo",
        "pin": "FED",
        "shadowIndex": 2,
        "questId": "side-boundary",
        "edit": "cicada-attune-ritual",
        "ko": "새 껍질을 벗을게요",
        "en": "I will shed my old skin.",
        "phrase": "One breath before I shed my old skin."
    }
];

const HEALING_POST_BLESSING_STEPS = [
    {
        "title": "Step 1 — gear down",
        "step": "GoPro off · phone face-down · one breath",
        "subtitle": "Post-DIB Landing"
    },
    {
        "title": "Step 2 — name the release",
        "step": "Name what the skit released — no re-watch spiral",
        "subtitle": "Post-DIB Landing"
    },
    {
        "title": "Step 3 — cord-cut phrase",
        "step": "Helen cord-cut: \"I choose my own timeline and energy field\"",
        "subtitle": "Post-DIB Landing",
        "ko": "제 시간표를 선택해요."
    },
    {
        "title": "Step 4 — boundary whisper",
        "step": "Whisper boundary phrase · 괜찮아요, 괜찮아요",
        "subtitle": "Post-DIB Landing",
        "ko": "괜찮아요, 괜찮아요."
    },
    {
        "title": "Step 5 — close the loop",
        "step": "Close: humor tended the wound — you do not owe the algorithm a reply",
        "subtitle": "Post-DIB Landing"
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
    if (parts.ja) lines.push(`Japanese: ${parts.ja}`);
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
    { subtitle: 'Pre-Match Attune', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Pre-Match Attune').length },
    { subtitle: 'Moon Card', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Moon Card').length },
    { subtitle: 'Cicada Attune', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Cicada Attune').length },
    { subtitle: 'Daily Integration', trackCount: HEALING_FACTOR_DECK.filter(f => f.subtitle === 'Daily Integration').length }
];

function getHealingFactorById(factorId) {
    const deck = HEALING_FACTOR_DECK.find(f => f.factorId === factorId);
    if (deck) return deck;
    if (typeof HEALING_FACTORS !== 'undefined') {
        const sync = HEALING_FACTORS.factors.find(f => f.id === factorId);
        if (sync) return { factorId: sync.id, ...sync };
    }
    return null;
}

