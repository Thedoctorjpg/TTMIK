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