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

let categories = deriveCategories(lessons);
let libraryGroups = [
    'All',
    'TTMIK Courses',
    'Sovereign Guide',
    'Melbourne Journey',
    'Ignan Library',
    'Asuka Library'
];