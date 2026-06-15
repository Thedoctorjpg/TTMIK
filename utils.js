/**
 * Shared utility functions for TTMIK Audio Lab
 */

const DEFAULT_TRANSCRIPT = 'Transcript not available.';

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '00:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function createLesson({ id, title, subtitle, duration, src, transcript, vocab, group }) {
    return {
        id: id || Date.now(),
        title: title || 'Untitled Lesson',
        subtitle: subtitle || 'Talk To Me In Korean',
        duration: duration || '00:00',
        src: src || '',
        transcript: transcript || DEFAULT_TRANSCRIPT,
        vocab: vocab || [],
        group: group || 'custom'
    };
}

function humanizeTrackName(filename) {
    return filename
        .replace(/\.mp3$/i, '')
        .replace(/_/g, ' ')
        .replace(/\bComplete\b/g, '')
        .trim();
}

function generateNamedCourseLessons({ folder, subtitle, startId, tracks, group }) {
    return tracks.map((filename, i) => createLesson({
        id: startId + i,
        title: `${subtitle} \u2022 ${humanizeTrackName(filename)}`,
        subtitle,
        src: `${folder}/${filename}`,
        group: group || 'sovereign'
    }));
}

function generateCourseLessons({ folder, subtitle, startId, trackCount }) {
    const generated = [];
    for (let i = 1; i <= trackCount; i++) {
        const trackNum = i.toString().padStart(2, '0');
        generated.push(createLesson({
            id: startId + i - 1,
            title: `${subtitle} \u2022 Track ${trackNum}`,
            subtitle,
            src: `${folder}/Track ${trackNum}.mp3`
        }));
    }
    return generated;
}

function deriveCategories(lessonList) {
    const cats = new Set(lessonList.map(l => l.subtitle));
    return ['All', ...cats];
}

function updatePlayButtonIcon(playing) {
    const btn = document.getElementById('play-btn');
    if (!btn) return;
    btn.innerHTML = playing
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play ml-1"></i>';
}

function setTranscriptContent(el, transcript) {
    el.textContent = '';
    if (!transcript) {
        el.textContent = 'No transcript yet. Paste one!';
        return;
    }
    const wrapper = document.createElement('div');
    wrapper.className = 'text-zinc-300 leading-relaxed';
    wrapper.textContent = transcript.replace(/<[^>]*>/g, '');
    el.appendChild(wrapper);
}

function renderVocabList(el, vocab) {
    el.textContent = '';
    (Array.isArray(vocab) ? vocab : []).forEach(v => {
        const row = document.createElement('div');
        row.className = 'flex justify-between items-center';
        const koSpan = document.createElement('span');
        koSpan.className = 'korean';
        koSpan.textContent = v.ko || '';
        const enSpan = document.createElement('span');
        enSpan.className = 'text-zinc-400';
        enSpan.textContent = v.en || '';
        row.appendChild(koSpan);
        row.appendChild(enSpan);
        el.appendChild(row);
    });
}