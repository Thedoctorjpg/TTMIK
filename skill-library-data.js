/**
 * Skill boot registry + composed specialty libraries
 * Maps every repo .skill.md to boot URL, library lane, and sync preset
 */

const SKILL_BOOT_REGISTRY = {
    'melbourne-lantern-bard': {
        source: 'Melbourne_Lantern_Bard.skill.md',
        preset: 1,
        shadowIndex: 0,
        libraryGroup: 'Melbourne Journey',
        libraryCategory: 'GoPro & Content',
        tag: 'melbourne'
    },
    'flame-kissed-bard': {
        source: 'Flame-Kissed_Bard.skill.md',
        preset: 5,
        shadowIndex: 1,
        libraryGroup: 'Sovereign Guide',
        libraryCategory: 'Essential Foundations',
        tag: 'sovereign'
    },
    'lo3tus': {
        source: 'Lo3tus.skill.md',
        preset: 6,
        shadowIndex: 0,
        libraryGroup: 'Melbourne Journey',
        libraryCategory: 'Social & Cultural',
        tag: 'melbourne'
    },
    'helen-neighbor': {
        source: 'Helen_Neighbor_Archetype.skill.md',
        invoke: 'practiceDibAftercare',
        altBoot: 'heal=1',
        preset: 9,
        libraryGroup: 'Melbourne Journey',
        libraryCategory: 'Emergency Protocol',
        tag: 'heal'
    },
    'sua-tattoo': {
        source: 'Sua_Tattoo_Artist.skill.md',
        invoke: 'practiceCicadaAttune',
        altBoot: 'sua=1',
        shadowIndex: 2,
        questId: 'side-boundary',
        libraryGroup: 'Sovereign Guide',
        libraryCategory: 'Self-Intimacy Practice',
        tag: 'sovereign'
    },
    'asuka-brisbane': {
        source: 'Asuka_Brisbane_Archetype.skill.md',
        invoke: 'practiceAsukaMaybe',
        altBoot: 'asuka=1',
        preset: 11,
        libraryGroup: 'Asuka Library',
        libraryCategory: 'Japanese Shadowing',
        tag: 'asuka'
    },
    'heidi-alpine-wayfarer': {
        source: 'Heidi_Alpine_Wayfarer_Archetype.skill.md',
        invoke: 'practiceHeidiWayfarer',
        altBoot: 'heidi=1',
        preset: 13,
        libraryGroup: 'Heidi Library',
        libraryCategory: 'German Shadowing',
        tag: 'heidi'
    },
    'sven-nordic-ranger': {
        source: 'Sven_Nordic_Ranger_Archetype.skill.md',
        invoke: 'practiceSvenRanger',
        altBoot: 'sven=1',
        preset: 14,
        libraryGroup: 'Sven Library',
        libraryCategory: 'Swedish Shadowing',
        tag: 'sven'
    },
    'martin-nordic-guide': {
        source: 'Martin_Nordic_Guide_Archetype.skill.md',
        invoke: 'practiceMartinGuide',
        altBoot: 'martin=1',
        preset: 15,
        libraryGroup: 'Martin Library',
        libraryCategory: 'Norwegian Shadowing',
        tag: 'martin'
    },
    'ronaldo-portugal-glory': {
        source: 'Ronaldo_Portugal_Glory_Archetype.skill.md',
        invoke: 'practiceRonaldoGlory',
        altBoot: 'ronaldo=1',
        preset: 16,
        libraryGroup: 'Ronaldo Library',
        libraryCategory: 'Portuguese Shadowing',
        tag: 'ronaldo'
    },
    'mbappe-france-attack': {
        source: 'Mbappe_France_Attack_Archetype.skill.md',
        invoke: 'practiceMbappeAttack',
        altBoot: 'mbappe=1',
        preset: 17,
        libraryGroup: 'Mbappé Library',
        libraryCategory: 'French Shadowing',
        tag: 'mbappe'
    },
    'messi-argentina-playmaker': {
        source: 'Messi_Argentina_Playmaker_Archetype.skill.md',
        invoke: 'practiceMessiPlaymaker',
        altBoot: 'messi=1',
        preset: 18,
        libraryGroup: 'Messi Library',
        libraryCategory: 'Argentine Shadowing',
        tag: 'messi'
    },
    'vinicus-brasil-samba': {
        source: 'Vinicus_Brasil_Samba_Archetype.skill.md',
        invoke: 'practiceVinicusSamba',
        altBoot: 'vinicus=1',
        preset: 19,
        libraryGroup: 'Vinicus Library',
        libraryCategory: 'Brazilian Shadowing',
        tag: 'vinicus'
    },
    'harry-kane-england-striker': {
        source: 'Harry_Kane_England_Striker_Archetype.skill.md',
        invoke: 'practiceHarryKaneStriker',
        altBoot: 'kane=1',
        preset: 20,
        libraryGroup: 'Kane Library',
        libraryCategory: 'English Shadowing',
        tag: 'kane'
    },
    'neon-evangelion': {
        source: 'Neon_Evangelion_Archetype.skill.md',
        invoke: 'practiceNeonEvangelion',
        altBoot: 'rei=1',
        preset: 21,
        libraryGroup: 'Evangelion Library',
        libraryCategory: 'Japanese Shadowing',
        tag: 'evangelion'
    },
    'rick-morty-multiverse': {
        source: 'Rick_Morty_Multiverse_Archetype.skill.md',
        invoke: 'practiceRickMortyMultiverse',
        altBoot: 'rickmorty=1',
        preset: 22,
        libraryGroup: 'Rick & Morty Multiverse Library',
        libraryCategory: 'Multiverse Shadowing',
        tag: 'rickmorty'
    },
    'rach3l': {
        source: 'rach3l.skill.md',
        shadowIndex: 0,
        libraryGroup: 'Sovereign Guide',
        libraryCategory: 'Essential Foundations',
        tag: 'sovereign'
    },
    'ignan-pilgrim': {
        source: 'Ignan_Pilgrim.skill.md',
        invoke: 'practiceIgnanHealingJourney',
        altBoot: 'ignan=1',
        preset: 10,
        libraryGroup: 'Ignan Library',
        libraryCategory: 'Trilingual Shadowing',
        fifaLibrary: 'Mexico Library',
        fifaCategory: 'Spanish Shadowing',
        tag: 'ignan'
    },
    'ignan-grounding': {
        source: 'Ignan_Grounding.skill.md',
        sync: { pin: 'HOTEL', episode: '2.5', reel: null },
        shadowIndex: 0,
        libraryGroup: 'Ignan Library',
        libraryCategory: 'Ilokano Grounding',
        tag: 'ignan'
    },
    'ignan-dalan': {
        source: 'Ignan_Dalan.skill.md',
        sync: { pin: 'BOTANIC', episode: '2.6', reel: null },
        shadowIndex: 2,
        questId: 'side-ignan-heal',
        libraryGroup: 'Ignan Library',
        libraryCategory: 'Healing Walk Route',
        tag: 'ignan'
    }
};

/** Maps specialty libraries ↔ Hermes healing factors */
const LIBRARY_BUILD_MANIFEST = {
    'Healing Factors Library': {
        group: 'heal',
        factors: [
            'post-dib', 'hermit-lantern', 'humor-release', 'helen-boundary',
            'pause-breathe', 'cord-cut', 'ignan-walk', 'fifa-celebrate', 'match-attune',
            'rei-mercy', 'cicada-attune', 'daily-ritual', 'no-rewatch'
        ],
        boot: 'library=heal',
        healFrom: 'scripts/heal-library.js',
        sources: ['webdrama-sync-data.js', 'heal-skills.js', 'ignan-data.js'],
        mantra: 'One breath · one boundary · no re-watch spiral'
    },
    'Ignan Library': {
        group: 'ignan',
        factors: ['ignan-walk', 'fifa-celebrate', 'post-dib'],
        boot: 'library=ignan'
    },
    'Asuka Library': {
        group: 'asuka',
        factors: ['pause-breathe', 'cord-cut'],
        boot: 'library=asuka'
    },
    'Heidi Library': {
        group: 'heidi',
        factors: ['hermit-lantern', 'daily-ritual', 'humor-release'],
        boot: 'library=heidi'
    },
    'Sven Library': {
        group: 'sven',
        factors: ['no-rewatch', 'pause-breathe', 'cord-cut'],
        boot: 'library=sven'
    },
    'Martin Library': {
        group: 'martin',
        factors: ['daily-ritual', 'hermit-lantern', 'no-rewatch'],
        boot: 'library=martin'
    },
    'Ronaldo Library': {
        group: 'ronaldo',
        factors: ['fifa-celebrate', 'humor-release', 'no-rewatch'],
        boot: 'library=ronaldo'
    },
    'Mbappé Library': {
        group: 'mbappe',
        factors: ['fifa-celebrate', 'pause-breathe', 'no-rewatch'],
        boot: 'library=mbappe'
    },
    'Messi Library': {
        group: 'messi',
        factors: ['humor-release', 'helen-boundary', 'no-rewatch'],
        boot: 'library=messi'
    },
    'Vinicus Library': {
        group: 'vinicus',
        factors: ['fifa-celebrate', 'humor-release', 'no-rewatch'],
        boot: 'library=vinicus'
    },
    'Kane Library': {
        group: 'kane',
        factors: ['match-attune', 'fifa-celebrate', 'pause-breathe', 'no-rewatch'],
        boot: 'library=kane'
    },
    'Evangelion Library': {
        group: 'evangelion',
        factors: ['rei-mercy', 'pause-breathe', 'no-rewatch', 'cord-cut'],
        boot: 'library=evangelion'
    },
    'Melbourne Journey': {
        group: 'melbourne',
        factors: ['hermit-lantern', 'humor-release', 'helen-boundary', 'post-dib'],
        boot: 'library=melbourne-skills'
    },
    'Sovereign Guide': {
        group: 'sovereign',
        factors: ['cicada-attune', 'daily-ritual', 'cord-cut', 'no-rewatch'],
        boot: 'library=sovereign-skills'
    },
    'Mexico Library': {
        group: 'mexico',
        factors: ['fifa-celebrate'],
        boot: 'library=mexico',
        hosts: ['CDMX', 'GDL', 'MTY']
    },
    'Canada Library': {
        group: 'canada',
        factors: ['pause-breathe', 'cord-cut'],
        boot: 'library=canada',
        hosts: ['YVR', 'YYZ']
    },
    'USA Library': {
        group: 'usa',
        factors: ['hermit-lantern', 'no-rewatch', 'fifa-celebrate'],
        boot: 'library=usa',
        hosts: ['LAX', 'MIA', 'NYC', 'SEA', 'DAL']
    }
};

const COMPOSED_LIBRARIES = [
    {
        id: 'ignan',
        label: 'Ignan Library',
        description: 'Ilokano · Korean · English — Ep 2.6 healing walk',
        boot: 'library=ignan',
        skills: ['ignan-pilgrim', 'ignan-grounding', 'ignan-dalan'],
        accent: 'emerald'
    },
    {
        id: 'asuka',
        label: 'Asuka Library',
        description: 'Japanese native · Korean shadow — Ep 5 The Maybe',
        boot: 'library=asuka',
        skills: ['asuka-brisbane'],
        accent: 'rose'
    },
    {
        id: 'heidi',
        label: 'Heidi Library',
        description: 'German native · Korean shadow — Fast Character Wayfarer Bard',
        boot: 'library=heidi',
        skills: ['heidi-alpine-wayfarer'],
        accent: 'yellow'
    },
    {
        id: 'sven',
        label: 'Sven Library',
        description: 'Swedish native · Korean shadow — Fast Character Nordic Ranger',
        boot: 'library=sven',
        skills: ['sven-nordic-ranger'],
        accent: 'cyan'
    },
    {
        id: 'martin',
        label: 'Martin Library',
        description: 'Norwegian native · Korean shadow — Fast Character Nordic Guide',
        boot: 'library=martin',
        skills: ['martin-nordic-guide'],
        accent: 'indigo'
    },
    {
        id: 'ronaldo',
        label: 'Ronaldo Library',
        description: 'Portuguese native · Korean shadow — Fast Character Glory Paladin',
        boot: 'library=ronaldo',
        skills: ['ronaldo-portugal-glory'],
        accent: 'orange'
    },
    {
        id: 'mbappe',
        label: 'Mbappé Library',
        description: 'French native · Korean shadow — Fast Character Battle Master Fighter',
        boot: 'library=mbappe',
        skills: ['mbappe-france-attack'],
        accent: 'sky'
    },
    {
        id: 'messi',
        label: 'Messi Library',
        description: 'Argentine Spanish · Korean shadow — Fast Character Mastermind Rogue',
        boot: 'library=messi',
        skills: ['messi-argentina-playmaker'],
        accent: 'emerald'
    },
    {
        id: 'vinicus',
        label: 'Vinicus Library',
        description: 'Brazilian Portuguese · Korean shadow — Fast Character Open Hand Monk',
        boot: 'library=vinicus',
        skills: ['vinicus-brasil-samba'],
        accent: 'lime'
    },
    {
        id: 'kane',
        label: 'Kane Library',
        description: 'English native · Korean shadow — Fast Character Champion Fighter',
        boot: 'library=kane',
        skills: ['harry-kane-england-striker'],
        accent: 'rose'
    },
    {
        id: 'evangelion',
        label: 'Evangelion Library',
        description: 'Japanese native · Korean shadow — Neon Moon-card · NERV lane',
        boot: 'library=evangelion',
        skills: ['neon-evangelion'],
        accent: 'violet'
    },
    {
        id: 'rickmorty',
        label: 'Rick & Morty Multiverse Library',
        description: 'English native · Korean shadow — Ep 7.2 Citadel · PostgreSQL index',
        boot: 'library=rickmorty',
        skills: ['rick-morty-multiverse'],
        accent: 'teal'
    },
    {
        id: 'melbourne-skills',
        label: 'Melbourne Archetypes',
        description: 'Lantern Bard · Lo3tus · Helen — on-set skits & boundaries',
        boot: 'library=melbourne-skills',
        skills: ['melbourne-lantern-bard', 'lo3tus', 'helen-neighbor'],
        accent: 'pink'
    },
    {
        id: 'sovereign-skills',
        label: 'Sovereign Archetypes',
        description: 'Flame-Kissed · rach3l · Sua — inner work & release',
        boot: 'library=sovereign-skills',
        skills: ['flame-kissed-bard', 'rach3l', 'sua-tattoo'],
        accent: 'violet'
    },
    {
        id: 'heal',
        label: 'Healing Factors Library',
        description: 'Hermes heal pipeline — post-DIB · boundaries · Ignan · FIFA celebration',
        boot: 'library=heal',
        skills: ['helen-neighbor', 'melbourne-lantern-bard', 'flame-kissed-bard', 'ignan-pilgrim', 'ignan-grounding'],
        accent: 'sky'
    },
    {
        id: 'mexico',
        label: 'Mexico Library',
        description: 'Spanish native · Korean shadow — FIFA 2026 CDMX · Guadalajara · Monterrey',
        boot: 'library=mexico',
        skills: ['ignan-pilgrim'],
        accent: 'amber'
    },
    {
        id: 'canada',
        label: 'Canada Library',
        description: 'French · English · Korean — Vancouver · Toronto 2026',
        boot: 'library=canada',
        skills: ['flame-kissed-bard', 'helen-neighbor'],
        accent: 'red'
    },
    {
        id: 'usa',
        label: 'USA Library',
        description: 'English native · Korean shadow — LA · Miami · NYC · Seattle · Dallas',
        boot: 'library=usa',
        skills: ['melbourne-lantern-bard', 'lo3tus'],
        accent: 'blue'
    }
];

function getSkillBootEntry(skillId) {
    return SKILL_BOOT_REGISTRY[skillId] || null;
}

function getSkillBootUrl(skillId) {
    const entry = getSkillBootEntry(skillId);
    if (!entry) return `?skill=${skillId}`;
    if (entry.altBoot) return `?${entry.altBoot}`;
    return `?skill=${skillId}`;
}

function getComposedLibrary(id) {
    return COMPOSED_LIBRARIES.find(l => l.id === id) || null;
}

/** Boot registry id → Hermes agentskills.io id (when they differ) */
const HERMES_SKILL_ID_ALIASES = {
    'sua-tattoo': 'sua-tattoo-artist'
};

/** Stable preload order — matches packages/ttmik-heal-skills SKILLS array */
const HERMES_PRELOAD_SKILL_IDS = [
    'melbourne-lantern-bard',
    'flame-kissed-bard',
    'lo3tus',
    'helen-neighbor',
    'sua-tattoo-artist',
    'asuka-brisbane',
    'heidi-alpine-wayfarer',
    'sven-nordic-ranger',
    'martin-nordic-guide',
    'ronaldo-portugal-glory',
    'mbappe-france-attack',
    'messi-argentina-playmaker',
    'vinicus-brasil-samba',
    'harry-kane-england-striker',
    'neon-evangelion',
    'rach3l',
    'ignan-pilgrim',
    'ignan-grounding',
    'ignan-dalan'
];

const HERMES_PRELOAD_BUNDLE = 'ttmik-all';

function getHermesSkillId(bootId) {
    return HERMES_SKILL_ID_ALIASES[bootId] || bootId;
}

function getHermesPreloadCmd(skillIds) {
    const ids = skillIds || HERMES_PRELOAD_SKILL_IDS;
    return `hermes -s ${ids.join(',')}`;
}

function getHermesBundleCmd() {
    return `hermes /${HERMES_PRELOAD_BUNDLE}`;
}

function getAllSkillBootIds() {
    return Object.keys(SKILL_BOOT_REGISTRY);
}

function getAllLibraryBootEntries() {
    return COMPOSED_LIBRARIES.map((lib) => ({
        id: lib.id,
        label: lib.label,
        boot: lib.boot,
        accent: lib.accent,
        skills: lib.skills
    }));
}

/** Full heal lane — post-DIB through attune (single source for boot panel + heal=all) */
const HEAL_ALL_LANE = [
    { id: 'heal-4', label: 'Post-DIB landing', boot: 'heal=1', alt: 'step=4', invoke: 'practiceDibAftercare', questId: 'side-dib-heal' },
    { id: 'rei-mercy', label: 'Rei mercy heal', boot: 'heal-factor=rei-mercy', alt: 'rei=1', invoke: 'practiceReiMercyHeal', questId: 'side-humor' },
    { id: 'heal-5', label: 'Asuka maybe', boot: 'asuka=1', alt: 'step=5', invoke: 'practiceAsukaMaybe', questId: 'main-others' },
    { id: 'heal-6', label: 'Ignan healing walk', boot: 'ignan=1', alt: 'step=6', invoke: 'practiceIgnanHealingJourney', questId: 'side-ignan-heal' },
    { id: 'heal-7', label: 'Mari FIFA cantina', boot: 'fifa=1', alt: 'step=7', invoke: 'practiceMariFifaCelebrate', questId: 'side-fifa-celebrate' },
    { id: 'heal-8', label: 'Attune before match', boot: 'attune=1', alt: 'before-match=1', invoke: 'practiceMatchAttune', questId: 'side-fifa-celebrate' }
];

const BOOT_ALL_HEAL_STEPS = HEAL_ALL_LANE;

function getHealAllLane() {
    return HEAL_ALL_LANE;
}

const BOOT_ALL_INDEX = {
    compose: 'library=compose',
    bootAll: 'boot=all',
    healAll: 'heal=all',
    trackCount: 345
};

function openComposedLibrary(libId) {
    const lib = getComposedLibrary(libId);
    if (!lib) return false;
    if (lib.id === 'heal') startHealCategory('Post-DIB Landing');
    else if (lib.id === 'mexico') startMexicoCategory('Spanish Shadowing');
    else if (lib.id === 'canada') startCanadaCategory('French Shadowing');
    else if (lib.id === 'usa') startUsaCategory('English Shadowing');
    else if (lib.id === 'ignan') startIgnanCategory('Trilingual Shadowing');
    else if (lib.id === 'asuka') startAsukaCategory('Japanese Shadowing');
    else if (lib.id === 'heidi') startHeidiCategory('German Shadowing');
    else if (lib.id === 'sven') startSvenCategory('Swedish Shadowing');
    else if (lib.id === 'martin') startMartinCategory('Norwegian Shadowing');
    else if (lib.id === 'ronaldo') startRonaldoCategory('Portuguese Shadowing');
    else if (lib.id === 'mbappe') startMbappeCategory('French Shadowing');
    else if (lib.id === 'messi') startMessiCategory('Argentine Shadowing');
    else if (lib.id === 'vinicus') startVinicusCategory('Brazilian Shadowing');
    else if (lib.id === 'kane') startKaneCategory('English Shadowing');
    else if (lib.id === 'evangelion') startEvangelionCategory('Japanese Shadowing');
    else if (lib.id === 'rickmorty') startRickMortyCategory('Multiverse Shadowing');
    else if (lib.id === 'melbourne-skills') startMelbourneCategory('GoPro & Content');
    else if (lib.id === 'sovereign-skills') startJourneyCategory('sovereign');
    else switchTab(3);
    return true;
}