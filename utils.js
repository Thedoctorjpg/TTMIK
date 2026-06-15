/**
 * Shared utility functions for TTMIK Audio Lab
 */

const DEFAULT_TRANSCRIPT = 'Transcript not available.';

function formatShadowNativeHint(phrase) {
    if (!phrase) return null;
    const parts = [];
    if (phrase.ilo) parts.push(`Ignan: ${phrase.ilo}`);
    if (phrase.es) parts.push(`Spanish: ${phrase.es}`);
    if (phrase.fr) parts.push(`French: ${phrase.fr}`);
    if (phrase.ja) parts.push(`Japanese: ${phrase.ja}`);
    if (phrase.de) parts.push(`German: ${phrase.de}`);
    if (phrase.sv) parts.push(`Swedish: ${phrase.sv}`);
    if (phrase.no) parts.push(`Norwegian: ${phrase.no}`);
    if (phrase.ko) parts.push(`Korean: ${phrase.ko}`);
    if (parts.length > 1) return parts.join(' · ');
    if (phrase.ilo) return `Ignan: ${phrase.ilo} · Korean: ${phrase.ko || ''}`;
    if (phrase.es) return `Spanish: ${phrase.es} · Korean: ${phrase.ko || ''}`;
    if (phrase.fr) return `French: ${phrase.fr} · Korean: ${phrase.ko || ''}`;
    if (phrase.ja) return `Japanese: ${phrase.ja} · Korean: ${phrase.ko || ''}`;
    if (phrase.de) return `German: ${phrase.de} · Korean: ${phrase.ko || ''}`;
    if (phrase.sv) return `Swedish: ${phrase.sv} · Korean: ${phrase.ko || ''}`;
    if (phrase.no) return `Norwegian: ${phrase.no} · Korean: ${phrase.ko || ''}`;
    return null;
}

function shadowPhraseCopyText(phrase) {
    if (!phrase) return '';
    return [phrase.ilo, phrase.es, phrase.fr, phrase.ja, phrase.de, phrase.sv, phrase.no, phrase.ko, phrase.en].filter(Boolean).join('\n');
}

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

function sanitizeLessonText(str, maxLen = 500) {
    if (typeof str !== 'string') return '';
    return str.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001f]/g, '').trim().slice(0, maxLen);
}

function isSafeAudioSrc(src) {
    if (typeof src !== 'string' || !src.trim()) return false;
    if (src.startsWith('blob:')) return /^blob:[^\s]+$/.test(src);
    if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return false;
    if (src.includes('..') || src.startsWith('/')) return false;
    return /\.(mp3|wav|ogg|m4a|webm)$/i.test(src);
}

function sanitizeVocabEntry(entry) {
    if (!entry || typeof entry !== 'object') return null;
    const ko = sanitizeLessonText(entry.ko, 200);
    const en = sanitizeLessonText(entry.en, 200);
    if (!ko && !en) return null;
    return { ko, en };
}

function setFaIcon(el, iconClass) {
    if (!el) return;
    el.replaceChildren();
    const icon = document.createElement('i');
    icon.className = iconClass;
    el.appendChild(icon);
}

function setButtonIconLabel(el, iconClass, label) {
    if (!el) return;
    el.replaceChildren();
    const icon = document.createElement('i');
    icon.className = iconClass;
    el.appendChild(icon);
    if (label) el.appendChild(document.createTextNode(label));
}

function createLesson({ id, title, subtitle, duration, src, transcript, vocab, group }) {
    const safeSrc = src && isSafeAudioSrc(src) ? src : '';
    return {
        id: id || Date.now(),
        title: sanitizeLessonText(title, 200) || 'Untitled Lesson',
        subtitle: sanitizeLessonText(subtitle, 100) || 'Talk To Me In Korean',
        duration: sanitizeLessonText(duration, 20) || '00:00',
        src: safeSrc,
        transcript: sanitizeLessonText(transcript, 50000) || DEFAULT_TRANSCRIPT,
        vocab: (Array.isArray(vocab) ? vocab : []).map(sanitizeVocabEntry).filter(Boolean),
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
    setFaIcon(
        document.getElementById('play-btn'),
        playing ? 'fa-solid fa-pause' : 'fa-solid fa-play ml-1'
    );
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