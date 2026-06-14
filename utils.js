/**
 * Shared utility functions for TTMIK Audio Lab
 */

const DEFAULT_TRANSCRIPT = '<p class="text-zinc-500 italic">Transcript not available.</p>';

/**
 * Format seconds into MM:SS display string.
 */
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

/**
 * Create a lesson object with consistent structure.
 */
function createLesson({ id, title, subtitle, duration, src, transcript, vocab }) {
    return {
        id: id || Date.now(),
        title: title || "Untitled Lesson",
        subtitle: subtitle || "Talk To Me In Korean",
        duration: duration || "00:00",
        src: src || "",
        transcript: transcript || DEFAULT_TRANSCRIPT,
        vocab: vocab || []
    };
}

/**
 * Generate an array of lessons from a course definition.
 * Eliminates repetitive hand-written lesson objects.
 *
 * @param {object} courseDef - { folder, subtitle, startId, trackCount }
 * @returns {Array} Array of lesson objects
 */
function generateCourseLessons({ folder, subtitle, startId, trackCount }) {
    const lessons = [];
    for (let i = 1; i <= trackCount; i++) {
        const trackNum = i.toString().padStart(2, '0');
        lessons.push(createLesson({
            id: startId + i - 1,
            title: `${subtitle} \u2022 Track ${trackNum}`,
            subtitle: subtitle,
            src: `${folder}/Track ${trackNum}.mp3`
        }));
    }
    return lessons;
}

/**
 * Derive unique category names from a lessons array.
 */
function deriveCategories(lessons) {
    const cats = new Set(lessons.map(l => l.subtitle));
    return ["All", ...cats];
}

/**
 * Update the play button icon to reflect current state.
 */
function updatePlayButtonIcon(isPlaying) {
    const btn = document.getElementById('play-btn');
    btn.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play ml-1"></i>';
}
