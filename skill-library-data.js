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
        shadowIndex: 0,
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
            'pause-breathe', 'cord-cut', 'ignan-walk', 'fifa-celebrate',
            'daily-ritual', 'no-rewatch'
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
    'Melbourne Journey': {
        group: 'melbourne',
        factors: ['hermit-lantern', 'humor-release', 'helen-boundary', 'post-dib'],
        boot: 'library=melbourne-skills'
    },
    'Sovereign Guide': {
        group: 'sovereign',
        factors: ['daily-ritual', 'cord-cut', 'no-rewatch'],
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

/** Ordered lane boots — skills · libraries · heal steps · FIFA 2026 */
const BOOT_ALL_HEAL_STEPS = [
    { id: 'heal-4', label: 'Post-DIB landing', boot: 'heal=1', alt: 'step=4' },
    { id: 'heal-5', label: 'Asuka maybe', boot: 'asuka=1', alt: 'step=5' },
    { id: 'heal-6', label: 'Ignan healing walk', boot: 'ignan=1', alt: 'step=6' },
    { id: 'heal-7', label: 'Mari FIFA cantina', boot: 'fifa=1', alt: 'step=7' }
];

const BOOT_ALL_INDEX = {
    compose: 'library=compose',
    bootAll: 'boot=all',
    trackCount: 283
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
    else if (lib.id === 'melbourne-skills') startMelbourneCategory('GoPro & Content');
    else if (lib.id === 'sovereign-skills') startJourneyCategory('sovereign');
    else switchTab(3);
    return true;
}