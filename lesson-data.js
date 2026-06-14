/**
 * TTMIK Lesson Data
 *
 * Lessons are generated from course definitions instead of being
 * hand-written individually (previously 1350+ lines of repetitive objects).
 * To add a new course, just append a definition to COURSE_DEFS below.
 */

const COURSE_DEFS = [
    {
        folder: "10-Minute-Korean-Daily-Conversation-Practice-For-Beginners",
        subtitle: "10-Minute Conversation",
        trackCount: 50
    },
    {
        folder: "1100_Short__Useful_Korean_Phrases-Audio_Files",
        subtitle: "1100 Korean Phrases",
        trackCount: 100
    }
];

// Generate all lessons from course definitions
let lessons = [];
let nextId = 1;

COURSE_DEFS.forEach(def => {
    const courseLessons = generateCourseLessons({
        folder: def.folder,
        subtitle: def.subtitle,
        startId: nextId,
        trackCount: def.trackCount
    });
    lessons = lessons.concat(courseLessons);
    nextId += def.trackCount;
});

// Derive categories automatically from course data
let categories = deriveCategories(lessons);
