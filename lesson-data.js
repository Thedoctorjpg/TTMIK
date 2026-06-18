/**
 * TTMIK Lesson Data
 *
 * Lessons are generated from course definitions instead of being
 * hand-written individually. To add a new course, append to COURSE_DEFS.
 */

const COURSE_DEFS = [
    {
        folder: '10-Minute-Korean-Daily-Conversation-Practice-For-Beginners',
        subtitle: '10-Minute Conversation',
        trackCount: 50
    },
    {
        folder: '1100_Short__Useful_Korean_Phrases-Audio_Files',
        subtitle: '1100 Korean Phrases',
        trackCount: 100
    }
];

let lessons = [];
let nextId = 1;

COURSE_DEFS.forEach(def => {
    const courseLessons = generateCourseLessons({
        folder: def.folder,
        subtitle: def.subtitle,
        startId: nextId,
        trackCount: def.trackCount
    });
    courseLessons.forEach(l => { l.group = 'ttmik'; });
    lessons = lessons.concat(courseLessons);
    nextId += def.trackCount;
});

SOVEREIGN_COURSE_DEFS.forEach(def => {
    const courseLessons = generateNamedCourseLessons({
        folder: def.folder,
        subtitle: def.subtitle,
        startId: nextId,
        tracks: def.tracks,
        group: def.group
    });
    lessons = lessons.concat(courseLessons);
    nextId += def.tracks.length;
});

if (typeof generateIgnanLibraryLessons === 'function') {
    const ignanLessons = generateIgnanLibraryLessons(nextId);
    lessons = lessons.concat(ignanLessons);
    nextId += ignanLessons.length;
}

if (typeof generateAsukaLibraryLessons === 'function') {
    const asukaLessons = generateAsukaLibraryLessons(nextId);
    lessons = lessons.concat(asukaLessons);
    nextId += asukaLessons.length;
}

if (typeof generateHeidiLibraryLessons === 'function') {
    const heidiLessons = generateHeidiLibraryLessons(nextId);
    lessons = lessons.concat(heidiLessons);
    nextId += heidiLessons.length;
}

if (typeof generateSvenLibraryLessons === 'function') {
    const svenLessons = generateSvenLibraryLessons(nextId);
    lessons = lessons.concat(svenLessons);
    nextId += svenLessons.length;
}

if (typeof generateMartinLibraryLessons === 'function') {
    const martinLessons = generateMartinLibraryLessons(nextId);
    lessons = lessons.concat(martinLessons);
    nextId += martinLessons.length;
}

if (typeof generateRonaldoLibraryLessons === 'function') {
    const ronaldoLessons = generateRonaldoLibraryLessons(nextId);
    lessons = lessons.concat(ronaldoLessons);
    nextId += ronaldoLessons.length;
}

if (typeof generateMbappeLibraryLessons === 'function') {
    const mbappeLessons = generateMbappeLibraryLessons(nextId);
    lessons = lessons.concat(mbappeLessons);
    nextId += mbappeLessons.length;
}

if (typeof generateMessiLibraryLessons === 'function') {
    const messiLessons = generateMessiLibraryLessons(nextId);
    lessons = lessons.concat(messiLessons);
    nextId += messiLessons.length;
}

if (typeof generateVinicusLibraryLessons === 'function') {
    const vinicusLessons = generateVinicusLibraryLessons(nextId);
    lessons = lessons.concat(vinicusLessons);
    nextId += vinicusLessons.length;
}

if (typeof generateKaneLibraryLessons === 'function') {
    const kaneLessons = generateKaneLibraryLessons(nextId);
    lessons = lessons.concat(kaneLessons);
    nextId += kaneLessons.length;
}

if (typeof generateEvangelionLibraryLessons === 'function') {
    const evangelionLessons = generateEvangelionLibraryLessons(nextId);
    lessons = lessons.concat(evangelionLessons);
    nextId += evangelionLessons.length;
}

if (typeof generateRickMortyLibraryLessons === 'function') {
    const rickmortyLessons = generateRickMortyLibraryLessons(nextId);
    lessons = lessons.concat(rickmortyLessons);
    nextId += rickmortyLessons.length;
}

if (typeof generateMikaLibraryLessons === 'function') {
    const mikaLessons = generateMikaLibraryLessons(nextId);
    lessons = lessons.concat(mikaLessons);
    nextId += mikaLessons.length;
}

if (typeof generateHaleyLibraryLessons === 'function') {
    const haleyLessons = generateHaleyLibraryLessons(nextId);
    lessons = lessons.concat(haleyLessons);
    nextId += haleyLessons.length;
}

if (typeof generateSvsssLibraryLessons === 'function') {
    const svsssLessons = generateSvsssLibraryLessons(nextId);
    lessons = lessons.concat(svsssLessons);
    nextId += svsssLessons.length;
}

if (typeof generateSoloLevelingLibraryLessons === 'function') {
    const soloLessons = generateSoloLevelingLibraryLessons(nextId);
    lessons = lessons.concat(soloLessons);
    nextId += soloLessons.length;
}

if (typeof generateBoysLoveLibraryLessons === 'function') {
    const blLessons = generateBoysLoveLibraryLessons(nextId);
    lessons = lessons.concat(blLessons);
    nextId += blLessons.length;
}

if (typeof generateWebnovelCrossoverLibraryLessons === 'function') {
    const crossoverLessons = generateWebnovelCrossoverLibraryLessons(nextId);
    lessons = lessons.concat(crossoverLessons);
    nextId += crossoverLessons.length;
}

if (typeof generateWebnovelPackageLessons === 'function') {
    const packageLessons = generateWebnovelPackageLessons(nextId);
    lessons = lessons.concat(packageLessons);
    nextId += packageLessons.length;
}

if (typeof generateHealingLibraryLessons === 'function') {
    const healLessons = generateHealingLibraryLessons(nextId);
    lessons = lessons.concat(healLessons);
    nextId += healLessons.length;
}

if (typeof generateFifaNationsLibraryLessons === 'function') {
    const fifaLessons = generateFifaNationsLibraryLessons(nextId);
    lessons = lessons.concat(fifaLessons);
    nextId += fifaLessons.length;
}

let categories = deriveCategories(lessons);
let libraryGroups = [
    'All',
    'TTMIK Courses',
    'Sovereign Guide',
    'Melbourne Journey',
    'Healing Factors Library',
    'Mexico Library',
    'Canada Library',
    'USA Library',
    'Ignan Library',
    'Asuka Library',
    'Heidi Library',
    'Sven Library',
    'Martin Library',
    'Ronaldo Library',
    'Mbappé Library',
    'Messi Library',
    'Vinicus Library',
    'Kane Library',
    'Evangelion Library',
    'Rick & Morty Multiverse Library',
    'Mika Library',
    'Haley Library',
    'SVSSS Library',
    'Solo Leveling Library',
    'Boys Love Library',
    'Webnovel Crossover Library',
    'WebNovel Package Library'
];