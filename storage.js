/**
 * TTMIK localStorage persistence layer
 */

const STORAGE_KEY = 'ttmik_lab_v1';

let appState = null;
let notesSaveTimer = null;
let positionSaveTimer = null;
let lastListenTimestamp = null;

function getDefaultState() {
    return {
        version: 1,
        currentLesson: 0,
        settings: { volume: 80, playbackRate: 1, repeatMode: false, darkMode: true },
        notes: {},
        progress: {},
        stats: { totalListenSeconds: 0, streak: 0, lastActiveDate: null, lessonsPlayed: 0 },
        customLessons: [],
        activeSkillId: null,
        questProgress: {},
        skillNotes: {}
    };
}

function sanitizeStoredLesson(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const id = typeof raw.id === 'number' && raw.id > 0 ? raw.id : null;
    if (!id) return null;

    const src = typeof raw.src === 'string' && isSafeAudioSrc(raw.src) ? raw.src : '';
    if (raw.src && !src) return null;

    return createLesson({
        id,
        title: raw.title,
        subtitle: raw.subtitle,
        duration: raw.duration,
        src,
        transcript: raw.transcript,
        vocab: raw.vocab,
        group: 'custom'
    });
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return getDefaultState();
        const saved = JSON.parse(raw);
        const defaults = getDefaultState();
        const customLessons = Array.isArray(saved.customLessons)
            ? saved.customLessons.map(sanitizeStoredLesson).filter(Boolean)
            : [];

        return {
            ...defaults,
            currentLesson: typeof saved.currentLesson === 'number' ? saved.currentLesson : defaults.currentLesson,
            settings: { ...defaults.settings, ...(saved.settings || {}) },
            stats: { ...defaults.stats, ...(saved.stats || {}) },
            notes: saved.notes && typeof saved.notes === 'object' ? saved.notes : defaults.notes,
            progress: saved.progress && typeof saved.progress === 'object' ? saved.progress : defaults.progress,
            customLessons,
            activeSkillId: typeof saved.activeSkillId === 'string' ? saved.activeSkillId : defaults.activeSkillId,
            questProgress: saved.questProgress && typeof saved.questProgress === 'object' ? saved.questProgress : defaults.questProgress,
            skillNotes: saved.skillNotes && typeof saved.skillNotes === 'object' ? saved.skillNotes : defaults.skillNotes
        };
    } catch (err) {
        console.error('Failed to load saved state:', err);
        return getDefaultState();
    }
}

function persistState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (err) {
        console.error('Failed to persist state:', err);
    }
}

function getLessonProgress(lessonId) {
    if (!appState.progress[lessonId]) {
        appState.progress[lessonId] = {
            lastPosition: 0,
            completed: false,
            listenTime: 0,
            completedAt: null
        };
    }
    return appState.progress[lessonId];
}

function todayString() {
    return new Date().toISOString().slice(0, 10);
}

function updateStreak() {
    const today = todayString();
    const last = appState.stats.lastActiveDate;
    if (last === today) return;

    if (last) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        appState.stats.streak = last === yesterdayStr ? appState.stats.streak + 1 : 1;
    } else {
        appState.stats.streak = 1;
    }
    appState.stats.lastActiveDate = today;
    persistState();
}

function recordListenTime(delta) {
    if (!delta || delta <= 0 || delta > 5) return;
    const lesson = lessons[currentLesson];
    if (!lesson) return;

    appState.stats.totalListenSeconds += delta;
    getLessonProgress(lesson.id).listenTime += delta;
    updateStreak();
    persistState();
    updateProgressUI();
}

function markLessonComplete(lessonId) {
    if (!lessonId) return;
    const progress = getLessonProgress(lessonId);
    if (progress.completed) return;
    progress.completed = true;
    progress.completedAt = new Date().toISOString();
    appState.stats.lessonsPlayed = (appState.stats.lessonsPlayed || 0) + 1;
    persistState();
    renderLessons();
    updateProgressUI();
}

function getCompletedLessons() {
    return lessons.filter(l => getLessonProgress(l.id).completed);
}

function savePlaybackPosition(lessonId, time) {
    if (!lessonId) return;
    getLessonProgress(lessonId).lastPosition = time;
    persistState();
}

function showNotesStatus(message, isSaved = false) {
    const el = document.getElementById('notes-status');
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('text-emerald-400', isSaved);
    el.classList.toggle('text-zinc-500', !isSaved);
}

function saveNotesForLesson(lessonId, text, showFeedback = true) {
    appState.notes[lessonId] = text;
    persistState();
    if (showFeedback) showNotesStatus('Saved', true);
}

function loadNotesForLesson(lessonId) {
    const notesEl = document.getElementById('notes');
    if (!notesEl) return;
    notesEl.value = appState.notes[lessonId] || '';
    showNotesStatus(appState.notes[lessonId] ? 'Loaded' : '');
}

function persistCustomLesson(lesson) {
    if (lesson.src && lesson.src.startsWith('blob:')) return;
    const sanitized = sanitizeStoredLesson(lesson);
    if (!sanitized) return;

    const existing = appState.customLessons.findIndex(l => l.id === sanitized.id);
    if (existing >= 0) appState.customLessons[existing] = sanitized;
    else appState.customLessons.unshift(sanitized);
    persistState();
}

function restoreCustomLessons() {
    if (!appState.customLessons.length) return;
    const builtInIds = new Set(lessons.map(l => l.id));
    const custom = appState.customLessons
        .map(sanitizeStoredLesson)
        .filter(Boolean)
        .filter(l => !builtInIds.has(l.id));
    if (custom.length) lessons = [...custom, ...lessons];
}

function persistSettings() {
    appState.settings = {
        volume: Number(document.getElementById('volume').value),
        playbackRate: audio.playbackRate,
        repeatMode
    };
    persistState();
}

function updateProgressUI() {
    const hours = (appState.stats.totalListenSeconds / 3600).toFixed(1);
    const completedLessons = getCompletedLessons();
    const streakEl = document.getElementById('streak-value');
    const hoursEl = document.getElementById('hours-value');
    const completedEl = document.getElementById('completed-value');
    const completedSubEl = document.getElementById('completed-subtitle');
    const playedEl = document.getElementById('played-value');
    const completedList = document.getElementById('completed-list');

    if (streakEl) streakEl.textContent = appState.stats.streak;
    if (hoursEl) hoursEl.textContent = hours;
    if (completedEl) completedEl.textContent = completedLessons.length;
    if (completedSubEl) completedSubEl.textContent = `of ${lessons.length} lessons`;
    if (playedEl) playedEl.textContent = appState.stats.lessonsPlayed || 0;

    const questEl = document.getElementById('quest-progress-badge');
    if (questEl && typeof getQuestCompletionCount === 'function') {
        const done = getQuestCompletionCount();
        const total = MELBOURNE_QUEST?.objectives?.length || 0;
        questEl.textContent = total ? `${done}/${total} quest` : '';
    }

    if (completedList) {
        completedList.textContent = '';
        if (!completedLessons.length) {
            const empty = document.createElement('p');
            empty.className = 'text-zinc-500 text-sm';
            empty.textContent = 'Complete a lesson to see it here.';
            completedList.appendChild(empty);
        } else {
            completedLessons.forEach(l => {
                const row = document.createElement('div');
                row.className = 'flex items-center gap-3 py-2 border-b border-zinc-800 last:border-0';
                const icon = document.createElement('i');
                icon.className = 'fa-solid fa-check text-emerald-400 text-sm';
                const title = document.createElement('span');
                title.className = 'text-sm flex-1';
                title.textContent = l.title;
                const sub = document.createElement('span');
                sub.className = 'text-xs text-zinc-500';
                sub.textContent = l.subtitle;
                row.appendChild(icon);
                row.appendChild(title);
                row.appendChild(sub);
                completedList.appendChild(row);
            });
        }
    }
}

function setupNotesAutoSave() {
    const notesEl = document.getElementById('notes');
    if (!notesEl) return;
    notesEl.addEventListener('input', () => {
        showNotesStatus('Saving...');
        clearTimeout(notesSaveTimer);
        notesSaveTimer = setTimeout(() => {
            const lesson = lessons[currentLesson];
            if (!lesson) return;
            saveNotesForLesson(lesson.id, notesEl.value, true);
        }, 500);
    });
}

function applySettings() {
    const { volume, playbackRate, repeatMode: savedRepeat, darkMode } = appState.settings;
    audio.volume = volume / 100;
    document.getElementById('volume').value = volume;
    audio.playbackRate = playbackRate;
    setSpeed(playbackRate);
    repeatMode = savedRepeat;
    audio.loop = savedRepeat;
    document.getElementById('repeat-btn').classList.toggle('text-pink-500', savedRepeat);
    document.documentElement.classList.toggle('dark', darkMode !== false);
}

function persistDarkMode(isDark) {
    appState.settings.darkMode = isDark;
    persistState();
}