/**
 * Heal Healing Factors Library from TTMIK source files.
 * Sources: webdrama-sync-data.js · heal-skills.js · ignan-data.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { SKILLS } = require('./heal-skills');

const HEALING_BASE = 'Healing_Library';

const HEALING_LIBRARY_CATEGORIES = [
    'Post-DIB Landing',
    'Boundaries & Cord-Cut',
    'Lantern & Humor',
    'Ignan Journey',
    'Celebration',
    'Daily Integration'
];

const FACTOR_CATEGORIES = {
    'post-dib': 'Post-DIB Landing',
    'hermit-lantern': 'Lantern & Humor',
    'humor-release': 'Lantern & Humor',
    'helen-boundary': 'Boundaries & Cord-Cut',
    'pause-breathe': 'Boundaries & Cord-Cut',
    'cord-cut': 'Boundaries & Cord-Cut',
    'ignan-walk': 'Ignan Journey',
    'fifa-celebrate': 'Celebration',
    'daily-ritual': 'Daily Integration',
    'no-rewatch': 'Daily Integration'
};

const FACTOR_BOOTS = {
    'post-dib': 'TTMIK.html?heal=1',
    'ignan-walk': 'TTMIK.html?ignan=1',
    'fifa-celebrate': 'TTMIK.html?fifa=1'
};

const FACTOR_TITLES = {
    'post-dib': 'Post-DIB landing — HOTEL mirror',
    'hermit-lantern': 'Hermit Lantern — one breath, one laugh',
    'humor-release': 'Humor alchemy — release without dramatizing',
    'helen-boundary': 'Helen boundary whisper',
    'pause-breathe': 'Pause OK — rest is allowed',
    'cord-cut': 'Cord-cut — own timeline',
    'ignan-walk': 'Ignan healing walk — Mari leads',
    'fifa-celebrate': 'Mari FIFA cantina — joy not drama',
    'daily-ritual': 'Daily integration ritual',
    'no-rewatch': 'No re-watch spiral'
};

const FACTOR_EN = {
    'humor-release': "I'll release it with humor.",
    'helen-boundary': "It's okay, it's okay.",
    'pause-breathe': "It's okay to pause and breathe.",
    'cord-cut': 'I choose my own timeline and energy field.',
    'daily-ritual': 'I write my own story.',
    'no-rewatch': 'GoPro off before mirror · phone face-down',
    'post-dib': "It's okay, it's okay."
};

const BLESSING_STEP_TITLES = [
    'Step 1 — gear down',
    'Step 2 — name the release',
    'Step 3 — cord-cut phrase',
    'Step 4 — boundary whisper',
    'Step 5 — close the loop'
];

const BLESSING_STEP_KO = {
    2: '제 시간표를 선택해요.',
    3: '괜찮아요, 괜찮아요.'
};

const RUNTIME_BLOCK = `
function buildHealingTranscript(parts) {
    const lines = [];
    if (parts.phrase) lines.push(\`Anchor: \${parts.phrase}\`);
    if (parts.ilo) lines.push(\`Ilokano: \${parts.ilo}\`);
    if (parts.ko) lines.push(\`Korean (TTMIK): \${parts.ko}\`);
    if (parts.en) lines.push(\`English: \${parts.en}\`);
    if (parts.step) lines.push(\`Ritual: \${parts.step}\`);
    if (parts.note) lines.push(\`\\nOn-set: \${parts.note}\`);
    if (parts.pin) lines.push(\`Pin: \${parts.pin}\`);
    if (parts.skillId) lines.push(\`Skill: \${parts.skillId}\`);
    if (parts.boot) lines.push(\`Boot: \${parts.boot}\`);
    lines.push('\\nMantra: One breath · one boundary · no re-watch spiral');
    return lines.join('\\n\\n');
}

function buildHealingFactorLessons(startId) {
    return HEALING_FACTOR_DECK.map((f, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: f.title,
            subtitle: f.subtitle,
            duration: '00:45',
            src: \`\${HEALING_BASE}/\${f.subtitle.replace(/[^a-zA-Z0-9]+/g, '_')}/Factor_\${n}_\${f.factorId}.mp3\`,
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
            src: \`\${HEALING_BASE}/Post_DIB_Landing/Blessing_\${n}.mp3\`,
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
    const deck = HEALING_FACTOR_DECK.find(f => f.factorId === factorId);
    if (deck) return deck;
    if (typeof HEALING_FACTORS !== 'undefined') {
        const sync = HEALING_FACTORS.factors.find(f => f.id === factorId);
        if (sync) return { factorId: sync.id, ...sync };
    }
    return null;
}
`;

function loadHealingSources(root) {
    const projectRoot = path.resolve(root);
    const read = (rel) => fs.readFileSync(path.join(projectRoot, rel), 'utf8');

    const code = `${read('webdrama-sync-data.js')}
HEALING_FACTORS.postBlessing = BARDIC_INSPIRATION.afterBlessingHeal;
${read('ignan-data.js')}
;({
    healingFactors: HEALING_FACTORS,
    ignanPhrases: typeof IGNAN_PHRASE_DECK !== 'undefined' ? IGNAN_PHRASE_DECK : [],
    ignanFifa: typeof IGNAN_FIFA_CELEBRATION !== 'undefined' ? IGNAN_FIFA_CELEBRATION : []
});`;

    const sandbox = { console };
    vm.createContext(sandbox);
    const loaded = vm.runInContext(code, sandbox, { filename: 'heal-library-sources.js' });

    const skillKo = {};
    for (const skill of SKILLS) {
        skillKo[skill.id] = skill.korean || [];
    }

    return { ...loaded, skillKo };
}

function getSkillKo(skillKo, skillId, index) {
    const lines = skillKo[skillId];
    if (!lines?.length) return undefined;
    return lines[Math.min(index, lines.length - 1)];
}

function buildFactorNote(factor) {
    const parts = [];
    if (factor.preset) parts.push(`preset ${factor.preset}`);
    if (factor.edit) parts.push(factor.edit);
    if (factor.questId) parts.push(`quest ${factor.questId}`);
    if (factor.note) parts.push(factor.note);
    return parts.join(' · ');
}

function buildFactorDeck(sources) {
    const { healingFactors, skillKo, ignanPhrases, ignanFifa } = sources;
    const factors = [...healingFactors.factors];
    const postDibIdx = factors.findIndex((f) => f.id === 'post-dib');
    if (postDibIdx > 0) {
        const [postDib] = factors.splice(postDibIdx, 1);
        factors.unshift(postDib);
    }

    const shadowPhrase = healingFactors.postBlessing?.shadowPhrase;

    return factors.map((factor) => {
        const entry = {
            factorId: factor.id,
            title: FACTOR_TITLES[factor.id] || factor.label,
            subtitle: FACTOR_CATEGORIES[factor.id] || 'Daily Integration',
            boot: FACTOR_BOOTS[factor.id] || `TTMIK.html?heal-factor=${factor.id}`,
            note: buildFactorNote(factor)
        };

        if (factor.skillId) entry.skillId = factor.skillId;
        if (factor.pin) entry.pin = factor.pin;
        if (factor.shadowIndex != null) entry.shadowIndex = factor.shadowIndex;
        if (factor.questId) entry.questId = factor.questId;
        if (factor.edit) entry.edit = factor.edit;
        if (factor.phrase) entry.phrase = factor.phrase;
        if (factor.ko) entry.ko = factor.ko;

        entry.en = FACTOR_EN[factor.id] || factor.phrase || factor.note || '';

        if (factor.id === 'post-dib') {
            entry.ko = shadowPhrase?.ko || factor.ko || '괜찮아요, 괜찮아요.';
            entry.en = shadowPhrase?.en || entry.en;
            entry.phrase = 'GoPro off · phone face-down · one breath';
            entry.skillId = factor.skillId || healingFactors.postBlessing?.skillId || 'helen-neighbor';
        }
        if (factor.id === 'hermit-lantern') {
            entry.ko = getSkillKo(skillKo, 'melbourne-lantern-bard', 0) || entry.ko;
            entry.phrase = factor.phrase;
            entry.en = factor.phrase;
        }
        if (factor.id === 'humor-release') {
            entry.ko = factor.ko || getSkillKo(skillKo, 'melbourne-lantern-bard', 2);
        }
        if (factor.id === 'cord-cut') {
            entry.ko = getSkillKo(skillKo, 'helen-neighbor', 4) || getSkillKo(skillKo, 'ignan-dalan', 2) || '제 시간표를 선택해요.';
        }
        if (factor.id === 'daily-ritual') {
            entry.ko = getSkillKo(skillKo, 'flame-kissed-bard', 0) || entry.ko;
        }
        if (factor.id === 'no-rewatch') {
            entry.phrase = healingFactors.mantra;
            entry.en = factor.note || entry.en;
        }
        if (factor.id === 'ignan-walk' && ignanPhrases[0]) {
            entry.ilo = ignanPhrases[0].ilo;
            entry.ko = ignanPhrases[0].ko;
            entry.en = ignanPhrases[0].en;
            entry.note = [entry.note, ignanPhrases[0].note].filter(Boolean).join(' · ');
        }
        if (factor.id === 'fifa-celebrate' && ignanFifa[0]) {
            entry.ilo = ignanFifa[0].ilo;
            entry.ko = ignanFifa[0].ko;
            entry.en = ignanFifa[0].en;
            entry.note = [entry.note, ignanFifa[0].note].filter(Boolean).join(' · ');
        }

        return entry;
    });
}

function buildPostBlessingSteps(sources) {
    const steps = sources.healingFactors.postBlessing?.steps || [];
    return steps.map((step, i) => ({
        title: BLESSING_STEP_TITLES[i] || `Step ${i + 1}`,
        step,
        subtitle: 'Post-DIB Landing',
        ...(BLESSING_STEP_KO[i] ? { ko: BLESSING_STEP_KO[i] } : {})
    }));
}

function buildHealingLibraryFileContent(sources) {
    const deck = buildFactorDeck(sources);
    const blessing = buildPostBlessingSteps(sources);
    const today = new Date().toISOString().slice(0, 10);
    const trackCount = deck.length + blessing.length;

    return `/**
 * Healing Factors Library — GENERATED from source files
 * Run: node scripts/heal-library.js
 *
 * Sources:
 *   webdrama-sync-data.js  → HEALING_FACTORS · BARDIC_INSPIRATION.afterBlessingHeal
 *   heal-skills.js         → SKILLS korean phrases
 *   ignan-data.js          → IGNAN_PHRASE_DECK · IGNAN_FIFA_CELEBRATION
 *
 * Healed: ${today} · ${trackCount} tracks
 */

const HEALING_LIBRARY_SOURCES = [
    'webdrama-sync-data.js',
    'packages/ttmik-heal-skills/lib/heal-skills.js',
    'ignan-data.js'
];

const HEALING_BASE = '${HEALING_BASE}';

const HEALING_LIBRARY_CATEGORIES = ${JSON.stringify(HEALING_LIBRARY_CATEGORIES, null, 4)};

const HEALING_FACTOR_DECK = ${JSON.stringify(deck, null, 4)};

const HEALING_POST_BLESSING_STEPS = ${JSON.stringify(blessing, null, 4)};

const HEALING_JOURNEY_CATEGORY = {
    id: 'heal',
    label: 'Healing Factors Library',
    description: 'Hermes heal pipeline — post-DIB landing, boundaries, Ignan walk, celebration'
};
${RUNTIME_BLOCK}
`;
}

function healLibrary(root) {
    const projectRoot = path.resolve(root);
    const sources = loadHealingSources(projectRoot);
    const content = buildHealingLibraryFileContent(sources);
    const outPath = path.join(projectRoot, 'healing-library-data.js');
    fs.writeFileSync(outPath, content, 'utf8');

    const deck = buildFactorDeck(sources);
    const blessing = buildPostBlessingSteps(sources);
    console.log(`Healed library: ${outPath}`);
    console.log(`  ${deck.length} factors + ${blessing.length} post-blessing steps = ${deck.length + blessing.length} tracks`);
    console.log(`  Sources: ${HEALING_LIBRARY_SOURCES.join(', ')}`);
    return { factors: deck.length, blessing: blessing.length, path: outPath };
}

const HEALING_LIBRARY_SOURCES = [
    'webdrama-sync-data.js',
    'packages/ttmik-heal-skills/lib/heal-skills.js',
    'ignan-data.js'
];

module.exports = {
    healLibrary,
    loadHealingSources,
    buildFactorDeck,
    buildPostBlessingSteps,
    buildHealingLibraryFileContent,
    HEALING_LIBRARY_SOURCES,
    FACTOR_CATEGORIES
};