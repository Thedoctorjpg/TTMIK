/**
 * TTMIK Audio Lab - Application Logic
 *
 * Depends on: utils.js, lesson-data.js, storage.js
 */

let currentLesson = 0;
let isPlaying = false;
let audio = null;
let repeatMode = false;
let shadowingInterval = null;
let activeCategory = 'All';
let activeLibraryGroup = 'All';
let lessonSearchQuery = '';
let shadowingRunning = false;
let shadowingIndex = 0;
let shadowingShowEnglish = false;
let activeBlobUrl = null;

const DEFAULT_SHADOWING_PHRASES = [
    { ko: '\uC548\uB155\uD558\uC138\uC694! \uB9CC\uB098\uC11C \uBC18\uAC00\uC6CC\uC694.', en: 'Hello! Nice to meet you.' },
    { ko: '\uC624\uB298 \uB0A0\uC528\uAC00 \uC815\uB9D0 \uC88B\uB124\uC694.', en: 'The weather is really nice today.' },
    { ko: '\uCEE4\uD53C \uD55C \uC794 \uB9C8\uC2E4\uAE4C\uC694?', en: 'Shall we have a cup of coffee?' },
    { ko: '\uC774\uAC70 \uC5BC\uB9C8\uC608\uC694?', en: 'How much is this?' },
    { ko: '\uD654\uC7A5\uC2E4\uC774 \uC5B4\uB514\uC608\uC694?', en: 'Where is the bathroom?' },
    { ko: '\uD55C\uAD6D\uC5B4\uB97C \uBC30\uC6B0\uACE0 \uC788\uC5B4\uC694.', en: "I'm learning Korean." },
    { ko: '\uB2E4\uC2DC \uD55C \uBC88 \uB9D0\uD574 \uC8FC\uC138\uC694.', en: 'Please say it one more time.' },
    { ko: '\uB9DB\uC788\uC5B4\uC694!', en: "It's delicious!" }
];

function switchTab(tabId) {
    const tab = document.getElementById(`tab-${tabId}`);
    if (!tab) {
        console.error(`switchTab: tab-${tabId} does not exist`);
        return;
    }
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    tab.classList.remove('hidden');
    document.querySelectorAll('.tab-link').forEach(link => {
        const active = link.dataset.tab === String(tabId);
        link.classList.toggle('bg-zinc-800', active);
        link.classList.toggle('text-white', active);
        link.classList.toggle('font-medium', active);
        link.classList.toggle('text-zinc-400', !active);
    });
    if (tabId === 2) renderShadowingUI();
    if (tabId === 3) renderSkillsUI();
    if (tabId === 4) {
        renderJourneyDashboard();
        renderMultiformatEditorPanel();
    }
    if (tabId === 5) updateProgressUI();
}

function getLessonsForGroup() {
    if (activeLibraryGroup === 'TTMIK Courses') {
        return lessons.filter(l => l.group === 'ttmik');
    }
    if (activeLibraryGroup === 'Sovereign Guide') {
        return lessons.filter(l => l.group === 'sovereign' || l.group === 'melbourne');
    }
    if (activeLibraryGroup === 'Melbourne Journey') {
        return lessons.filter(l => l.group === 'melbourne');
    }
    if (activeLibraryGroup === 'Healing Factors Library') {
        return lessons.filter(l => l.group === 'heal');
    }
    if (activeLibraryGroup === 'Mexico Library') {
        return lessons.filter(l => l.group === 'mexico');
    }
    if (activeLibraryGroup === 'Canada Library') {
        return lessons.filter(l => l.group === 'canada');
    }
    if (activeLibraryGroup === 'USA Library') {
        return lessons.filter(l => l.group === 'usa');
    }
    if (activeLibraryGroup === 'Ignan Library') {
        return lessons.filter(l => l.group === 'ignan');
    }
    if (activeLibraryGroup === 'Asuka Library') {
        return lessons.filter(l => l.group === 'asuka');
    }
    if (activeLibraryGroup === 'Heidi Library') {
        return lessons.filter(l => l.group === 'heidi');
    }
    if (activeLibraryGroup === 'Sven Library') {
        return lessons.filter(l => l.group === 'sven');
    }
    if (activeLibraryGroup === 'Martin Library') {
        return lessons.filter(l => l.group === 'martin');
    }
    if (activeLibraryGroup === 'Ronaldo Library') {
        return lessons.filter(l => l.group === 'ronaldo');
    }
    if (activeLibraryGroup === 'Mbappé Library') {
        return lessons.filter(l => l.group === 'mbappe');
    }
    if (activeLibraryGroup === 'Messi Library') {
        return lessons.filter(l => l.group === 'messi');
    }
    if (activeLibraryGroup === 'Vinicus Library') {
        return lessons.filter(l => l.group === 'vinicus');
    }
    if (activeLibraryGroup === 'Kane Library') {
        return lessons.filter(l => l.group === 'kane');
    }
    return lessons;
}

function getFilteredLessons() {
    let filtered = getLessonsForGroup();

    if (activeCategory !== 'All') {
        filtered = filtered.filter(l => l.subtitle === activeCategory);
    }

    if (lessonSearchQuery.trim()) {
        const q = lessonSearchQuery.trim().toLowerCase();
        filtered = filtered.filter(l =>
            l.title.toLowerCase().includes(q) ||
            l.subtitle.toLowerCase().includes(q)
        );
    }

    return filtered;
}

function renderLibraryGroupFilters() {
    const container = document.getElementById('library-group-filters');
    if (!container || typeof libraryGroups === 'undefined') return;
    container.textContent = '';

    libraryGroups.forEach(group => {
        const btn = document.createElement('button');
        const active = group === activeLibraryGroup;
        btn.className = active
            ? 'px-4 py-2 rounded-2xl text-sm font-semibold bg-pink-500 text-white'
            : 'px-4 py-2 rounded-2xl text-sm font-medium bg-zinc-800 text-zinc-400 hover:bg-zinc-700';
        btn.textContent = group;
        btn.onclick = () => {
            activeLibraryGroup = group;
            activeCategory = 'All';
            renderLibraryGroupFilters();
            renderCategoryFilters();
            renderLessons();
        };
        container.appendChild(btn);
    });
}

function handleLessonSearch(value) {
    lessonSearchQuery = value;
    renderLessons();
}

function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container || typeof categories === 'undefined') return;
    container.textContent = '';

    const visibleSubtitles = new Set(getLessonsForGroup().map(l => l.subtitle));
    const cats = ['All', ...[...visibleSubtitles].sort()];

    cats.forEach(cat => {
        const btn = document.createElement('button');
        const active = cat === activeCategory;
        btn.className = active
            ? 'px-4 py-2 rounded-2xl text-sm font-medium bg-white text-zinc-900'
            : 'px-4 py-2 rounded-2xl text-sm font-medium bg-zinc-800 text-zinc-400 hover:bg-zinc-700';
        btn.textContent = cat;
        btn.onclick = () => {
            activeCategory = cat;
            renderCategoryFilters();
            renderLessons();
        };
        container.appendChild(btn);
    });
}

function renderLessons() {
    const grid = document.getElementById('lessons-grid');
    if (!grid) return;
    grid.textContent = '';

    getFilteredLessons().forEach(lesson => {
        const i = lessons.indexOf(lesson);
        const completed = getLessonProgress(lesson.id).completed;
        const card = document.createElement('div');
        card.className = 'bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500 transition';

        const hero = document.createElement('div');
        hero.className = 'h-48 bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center text-6xl relative';
        hero.textContent = '\u{1F1F0}\u{1F1F7}';
        if (completed) {
            const badge = document.createElement('span');
            badge.className = 'absolute top-4 right-4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm';
            setFaIcon(badge, 'fa-solid fa-check');
            hero.appendChild(badge);
        }

        const body = document.createElement('div');
        body.className = 'p-6';
        const title = document.createElement('h4');
        title.className = 'font-semibold';
        title.textContent = lesson.title;
        const meta = document.createElement('p');
        meta.className = 'text-xs text-zinc-500';
        meta.textContent = `${lesson.subtitle} \u2022 ${lesson.duration}`;
        body.appendChild(title);
        body.appendChild(meta);

        card.appendChild(hero);
        card.appendChild(body);
        card.onclick = () => loadLesson(i);
        grid.appendChild(card);
    });
}

function loadLesson(index, resumeTab = true) {
    if (index < 0 || index >= lessons.length) {
        console.error(`loadLesson: index ${index} is out of range (0-${lessons.length - 1})`);
        return;
    }

    const prevLesson = lessons[currentLesson];
    if (prevLesson) {
        const notesEl = document.getElementById('notes');
        saveNotesForLesson(prevLesson.id, notesEl ? notesEl.value : '', false);
        if (audio && audio.src) savePlaybackPosition(prevLesson.id, audio.currentTime);
    }

    currentLesson = index;
    appState.currentLesson = index;
    persistState();

    const lesson = lessons[index];
    if (!lesson) {
        console.error(`loadLesson: lesson at index ${index} is undefined`);
        return;
    }

    document.getElementById('lesson-title').textContent = lesson.title || 'Untitled Lesson';
    document.getElementById('lesson-subtitle').textContent = lesson.subtitle || '';
    const badge = document.getElementById('header-lesson-badge');
    if (badge) badge.textContent = `${lesson.subtitle} \u2022 ${lesson.title}`;

    setTranscriptContent(document.getElementById('transcript'), lesson.transcript);
    renderVocabList(document.getElementById('vocab-list'), lesson.vocab);
    loadNotesForLesson(lesson.id);

    if (lesson.src && isSafeAudioSrc(lesson.src)) {
        const resumeAt = getLessonProgress(lesson.id).lastPosition;
        audio.src = encodeURI(lesson.src);
        if (resumeAt > 0) {
            audio.addEventListener('loadedmetadata', function restorePosition() {
                if (audio.duration && resumeAt < audio.duration - 5) {
                    audio.currentTime = resumeAt;
                }
                audio.removeEventListener('loadedmetadata', restorePosition);
            });
        }
    } else {
        if (lesson.src) console.warn('Blocked unsafe audio source for lesson:', lesson.id);
        audio.removeAttribute('src');
        audio.load();
    }

    if (shadowingRunning) resetShadowing();

    if (resumeTab) switchTab(0);
}

function togglePlay() {
    if (!audio.src || audio.src === window.location.href) {
        alert('Choose a built-in lesson or upload an MP3 to start listening.');
        return;
    }

    if (isPlaying) {
        audio.pause();
        updatePlayButtonIcon(false);
        isPlaying = false;
        return;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            updatePlayButtonIcon(true);
            isPlaying = true;
        }).catch(err => {
            console.error('Audio playback failed:', err);
            isPlaying = false;
            updatePlayButtonIcon(false);
            if (err.name === 'NotAllowedError') {
                alert('Playback was blocked by the browser. Please interact with the page first.');
            } else if (err.name === 'NotSupportedError') {
                alert('This audio format is not supported by your browser.');
            } else {
                alert('Unable to play audio: ' + err.message);
            }
        });
    }
}

function setSpeed(speed) {
    audio.playbackRate = speed;
    document.querySelectorAll('.speed-btn').forEach(btn => {
        const label = parseFloat(btn.textContent);
        const active = label === speed;
        btn.classList.toggle('bg-white', active);
        btn.classList.toggle('text-zinc-900', active);
    });
    persistSettings();
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg|m4a|webm)$/i)) {
        alert('Unsupported file type. Please upload an audio file (MP3, WAV, OGG, M4A, or WebM).');
        e.target.value = '';
        return;
    }

    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('File is too large. Please upload a file smaller than 500MB.');
        e.target.value = '';
        return;
    }

    if (activeBlobUrl) {
        URL.revokeObjectURL(activeBlobUrl);
        activeBlobUrl = null;
    }

    let url;
    try {
        url = URL.createObjectURL(file);
        activeBlobUrl = url;
    } catch (err) {
        console.error('Failed to create object URL:', err);
        alert('Failed to load the file. Please try again.');
        return;
    }

    audio.src = url;
    const uploadedLesson = createLesson({
        title: file.name.replace(/\.(mp3|wav|ogg|m4a|webm)$/i, ''),
        subtitle: 'Your TTMIK Upload',
        duration: '??:??',
        src: url,
        transcript: 'Paste transcript here...'
    });
    lessons.unshift(uploadedLesson);
    renderLessons();
    loadLesson(0);
    alert('Audio loaded! Uploads are session-only — use New Lesson to keep metadata after refresh.');
}

function addNewLesson() {
    const title = prompt('Lesson title (e.g. Level 1 Lesson 5):');
    if (!title || !title.trim()) return;

    const newLesson = createLesson({ title: title.trim() });
    lessons.unshift(newLesson);
    persistCustomLesson(newLesson);
    renderLessons();
    loadLesson(0);
}

function saveNotes() {
    const lesson = lessons[currentLesson];
    if (!lesson) return;
    saveNotesForLesson(lesson.id, document.getElementById('notes').value, true);
}

function toggleRepeat() {
    repeatMode = !repeatMode;
    audio.loop = repeatMode;
    document.getElementById('repeat-btn').classList.toggle('text-pink-500', repeatMode);
    persistSettings();
}

function toggleShuffle() {
    alert('Shuffle coming soon! For now enjoy sequential playback.');
}

function toggleDark() {
    const isDark = document.documentElement.classList.toggle('dark');
    persistDarkMode(isDark);
}

function prevTrack() {
    if (lessons.length === 0) return;
    loadLesson(currentLesson > 0 ? currentLesson - 1 : lessons.length - 1);
}

function nextTrack() {
    if (lessons.length === 0) return;
    loadLesson(currentLesson < lessons.length - 1 ? currentLesson + 1 : 0);
}

function getShadowingPhrases() {
    const lesson = lessons[currentLesson];
    const vocab = (lesson?.vocab || []).filter(v => v.ko).map(v => ({
        ko: v.ko,
        en: v.en || ''
    }));
    const skillPhrases = typeof getSkillShadowingPhrases === 'function' ? getSkillShadowingPhrases() : [];
    const base = vocab.length ? [...vocab, ...DEFAULT_SHADOWING_PHRASES] : DEFAULT_SHADOWING_PHRASES;
    return skillPhrases.length ? [...skillPhrases, ...base] : base;
}

function stopShadowingTimer() {
    if (shadowingInterval !== null) {
        clearInterval(shadowingInterval);
        shadowingInterval = null;
    }
}

function renderShadowingUI() {
    const phrases = getShadowingPhrases();
    const phrase = phrases[shadowingIndex % phrases.length];
    const iloEl = document.getElementById('shadowing-ilo');
    const esEl = document.getElementById('shadowing-es');
    const jaEl = document.getElementById('shadowing-ja');
    const koEl = document.getElementById('shadowing-ko');
    const enEl = document.getElementById('shadowing-en');
    const hintEl = document.getElementById('shadowing-hint');
    const counterEl = document.getElementById('shadowing-counter');
    const btnEl = document.getElementById('shadowing-toggle-btn');
    const dotsEl = document.getElementById('shadowing-dots');

    if (iloEl) {
        if (phrase?.ilo) {
            iloEl.textContent = phrase.ilo;
            iloEl.classList.remove('hidden');
        } else {
            iloEl.textContent = '';
            iloEl.classList.add('hidden');
        }
    }
    if (esEl) {
        if (phrase?.es) {
            esEl.textContent = phrase.es;
            esEl.classList.remove('hidden');
        } else {
            esEl.textContent = '';
            esEl.classList.add('hidden');
        }
    }
    if (jaEl) {
        if (phrase?.ja) {
            jaEl.textContent = phrase.ja;
            jaEl.classList.remove('hidden');
        } else {
            jaEl.textContent = '';
            jaEl.classList.add('hidden');
        }
    }
    if (koEl) koEl.textContent = phrase?.ko || '';
    const showBtn = document.getElementById('shadowing-show-btn');
    if (enEl) {
        if (shadowingShowEnglish) {
            enEl.textContent = phrase?.en || '';
            enEl.classList.remove('hidden');
            if (showBtn) showBtn.classList.add('hidden');
        } else {
            enEl.textContent = '';
            enEl.classList.add('hidden');
            if (showBtn) showBtn.classList.remove('hidden');
        }
    }
    if (hintEl) {
        const lesson = lessons[currentLesson];
        const hasVocab = lesson?.vocab?.length > 0;
        const activeSkill = typeof getActiveSkill === 'function' ? getActiveSkill() : null;
        const nativeHint = typeof formatShadowNativeHint === 'function'
            ? formatShadowNativeHint(phrase)
            : null;
        if (nativeHint) {
            hintEl.textContent = nativeHint;
        } else if (activeSkill) {
            hintEl.textContent = `Active skill: ${activeSkill.name} + lesson vocab`;
        } else if (hasVocab) {
            hintEl.textContent = 'Practicing vocab from current lesson + general phrases';
        } else {
            hintEl.textContent = 'General Korean phrases';
        }
        hintEl.classList.toggle('hidden', false);
    }
    if (counterEl) {
        counterEl.textContent = `Phrase ${(shadowingIndex % phrases.length) + 1} / ${phrases.length}`;
    }
    if (btnEl) {
        setButtonIconLabel(
            btnEl,
            shadowingRunning ? 'fa-solid fa-pause mr-2' : 'fa-solid fa-microphone mr-2',
            shadowingRunning ? 'Pause' : 'Start Shadowing'
        );
    }
    if (dotsEl) {
        dotsEl.textContent = '';
        phrases.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = i === (shadowingIndex % phrases.length)
                ? 'w-3 h-3 rounded-full bg-pink-500'
                : 'w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-500';
            dot.onclick = () => goToShadowingPhrase(i);
            dotsEl.appendChild(dot);
        });
    }
}

function goToShadowingPhrase(index) {
    shadowingIndex = index;
    shadowingShowEnglish = false;
    renderShadowingUI();
}

function showShadowingTranslation() {
    shadowingShowEnglish = true;
    renderShadowingUI();
}

function toggleShadowing() {
    shadowingRunning = !shadowingRunning;
    stopShadowingTimer();

    if (shadowingRunning) {
        shadowingInterval = setInterval(() => {
            const phrases = getShadowingPhrases();
            shadowingIndex = (shadowingIndex + 1) % phrases.length;
            shadowingShowEnglish = false;
            renderShadowingUI();
        }, 5000);
    }
    renderShadowingUI();
}

function resetShadowing() {
    shadowingRunning = false;
    shadowingIndex = 0;
    shadowingShowEnglish = false;
    stopShadowingTimer();
    renderShadowingUI();
}

function startShadowing() {
    toggleShadowing();
}

function startJourneyCategory(groupId) {
    if (groupId === 'heal') {
        activeLibraryGroup = 'Healing Factors Library';
        activeCategory = 'Post-DIB Landing';
    } else if (groupId === 'mexico') {
        activeLibraryGroup = 'Mexico Library';
        activeCategory = 'Spanish Shadowing';
    } else if (groupId === 'canada') {
        activeLibraryGroup = 'Canada Library';
        activeCategory = 'French Shadowing';
    } else if (groupId === 'usa') {
        activeLibraryGroup = 'USA Library';
        activeCategory = 'English Shadowing';
    } else if (groupId === 'ignan') {
        activeLibraryGroup = 'Ignan Library';
        activeCategory = 'Trilingual Shadowing';
    } else if (groupId === 'asuka') {
        activeLibraryGroup = 'Asuka Library';
        activeCategory = 'Japanese Shadowing';
    } else if (groupId === 'heidi') {
        activeLibraryGroup = 'Heidi Library';
        activeCategory = 'German Shadowing';
    } else if (groupId === 'sven') {
        activeLibraryGroup = 'Sven Library';
        activeCategory = 'Swedish Shadowing';
    } else if (groupId === 'martin') {
        activeLibraryGroup = 'Martin Library';
        activeCategory = 'Norwegian Shadowing';
    } else if (groupId === 'ronaldo') {
        activeLibraryGroup = 'Ronaldo Library';
        activeCategory = 'Portuguese Shadowing';
    } else if (groupId === 'mbappe') {
        activeLibraryGroup = 'Mbappé Library';
        activeCategory = 'French Shadowing';
    } else if (groupId === 'messi') {
        activeLibraryGroup = 'Messi Library';
    } else if (groupId === 'vinicus') {
        activeLibraryGroup = 'Vinicus Library';
        activeCategory = 'Brazilian Shadowing';
    } else if (groupId === 'kane') {
        activeLibraryGroup = 'Kane Library';
        activeCategory = 'English Shadowing';
    } else if (groupId === 'melbourne') {
        activeLibraryGroup = 'Melbourne Journey';
    } else if (groupId === 'sovereign') {
        activeLibraryGroup = 'Sovereign Guide';
        activeCategory = 'Essential Foundations';
    } else {
        activeLibraryGroup = 'Sovereign Guide';
        activeCategory = 'All';
    }
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startMelbourneCategory(subtitle) {
    activeLibraryGroup = 'Melbourne Journey';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startIgnanCategory(subtitle) {
    activeLibraryGroup = 'Ignan Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startAsukaCategory(subtitle) {
    activeLibraryGroup = 'Asuka Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startHeidiCategory(subtitle) {
    activeLibraryGroup = 'Heidi Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startSvenCategory(subtitle) {
    activeLibraryGroup = 'Sven Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startMartinCategory(subtitle) {
    activeLibraryGroup = 'Martin Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startRonaldoCategory(subtitle) {
    activeLibraryGroup = 'Ronaldo Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startMbappeCategory(subtitle) {
    activeLibraryGroup = 'Mbappé Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startMessiCategory(subtitle) {
    activeLibraryGroup = 'Messi Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startVinicusCategory(subtitle) {
    activeLibraryGroup = 'Vinicus Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startKaneCategory(subtitle) {
    activeLibraryGroup = 'Kane Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startHealCategory(subtitle) {
    activeLibraryGroup = 'Healing Factors Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startMexicoCategory(subtitle) {
    activeLibraryGroup = 'Mexico Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startCanadaCategory(subtitle) {
    activeLibraryGroup = 'Canada Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function startUsaCategory(subtitle) {
    activeLibraryGroup = 'USA Library';
    activeCategory = subtitle;
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function renderJourneyDashboard() {
    const grid = document.getElementById('journey-grid');
    if (!grid || typeof JOURNEY_CATEGORIES === 'undefined') return;
    grid.textContent = '';

    const journeyCards = [...JOURNEY_CATEGORIES];
    if (typeof IGNAN_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(IGNAN_JOURNEY_CATEGORY);
    }
    if (typeof HEALING_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(HEALING_JOURNEY_CATEGORY);
    }
    if (typeof MEXICO_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(MEXICO_JOURNEY_CATEGORY);
    }
    if (typeof CANADA_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(CANADA_JOURNEY_CATEGORY);
    }
    if (typeof USA_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(USA_JOURNEY_CATEGORY);
    }
    if (typeof ASUKA_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(ASUKA_JOURNEY_CATEGORY);
    }
    if (typeof HEIDI_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(HEIDI_JOURNEY_CATEGORY);
    }
    if (typeof SVEN_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(SVEN_JOURNEY_CATEGORY);
    }
    if (typeof MARTIN_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(MARTIN_JOURNEY_CATEGORY);
    }
    if (typeof RONALDO_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(RONALDO_JOURNEY_CATEGORY);
    }
    if (typeof MBAPPE_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(MBAPPE_JOURNEY_CATEGORY);
    }
    if (typeof MESSI_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(MESSI_JOURNEY_CATEGORY);
    }
    if (typeof VINICUS_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(VINICUS_JOURNEY_CATEGORY);
    }
    if (typeof KANE_JOURNEY_CATEGORY !== 'undefined') {
        journeyCards.push(KANE_JOURNEY_CATEGORY);
    }

    journeyCards.forEach(journey => {
        const card = document.createElement('button');
        const ring = journey.id === 'heal'
            ? 'hover:ring-sky-500'
            : journey.id === 'mexico'
                ? 'hover:ring-amber-500'
                : journey.id === 'canada'
                    ? 'hover:ring-red-500'
                    : journey.id === 'usa'
                        ? 'hover:ring-blue-500'
                        : journey.id === 'ignan'
            ? 'hover:ring-emerald-500'
            : journey.id === 'asuka'
                ? 'hover:ring-rose-500'
                : journey.id === 'heidi'
                    ? 'hover:ring-yellow-500'
                    : journey.id === 'sven'
                        ? 'hover:ring-cyan-500'
                        : journey.id === 'martin'
                            ? 'hover:ring-indigo-500'
                            : journey.id === 'ronaldo'
                                ? 'hover:ring-orange-500'
                                : journey.id === 'mbappe'
                                    ? 'hover:ring-sky-500'
                                    : journey.id === 'messi'
                                        ? 'hover:ring-emerald-500'
                                        : journey.id === 'vinicus'
                                            ? 'hover:ring-lime-500'
                                            : journey.id === 'kane'
                                                ? 'hover:ring-rose-500'
                                                : 'hover:ring-pink-500';
        card.className = `text-left bg-zinc-900 rounded-3xl p-8 hover:ring-2 ${ring} transition`;
        const title = document.createElement('h3');
        title.className = 'text-2xl font-semibold mb-2';
        title.textContent = journey.label;
        const desc = document.createElement('p');
        desc.className = 'text-zinc-400 text-sm mb-4';
        desc.textContent = journey.description;
        const count = document.createElement('p');
        count.className = journey.id === 'heal'
            ? 'text-sky-400 text-sm font-medium'
            : journey.id === 'mexico'
                ? 'text-amber-400 text-sm font-medium'
                : journey.id === 'canada'
                    ? 'text-red-400 text-sm font-medium'
                    : journey.id === 'usa'
                        ? 'text-blue-400 text-sm font-medium'
                        : journey.id === 'ignan'
            ? 'text-emerald-400 text-sm font-medium'
            : journey.id === 'asuka'
                ? 'text-rose-400 text-sm font-medium'
                : journey.id === 'heidi'
                    ? 'text-yellow-400 text-sm font-medium'
                    : journey.id === 'sven'
                        ? 'text-cyan-400 text-sm font-medium'
                        : journey.id === 'martin'
                            ? 'text-indigo-400 text-sm font-medium'
                            : journey.id === 'ronaldo'
                                ? 'text-orange-400 text-sm font-medium'
                                : journey.id === 'mbappe'
                                    ? 'text-sky-400 text-sm font-medium'
                                    : journey.id === 'messi'
                                        ? 'text-emerald-400 text-sm font-medium'
                                        : journey.id === 'vinicus'
                                            ? 'text-lime-400 text-sm font-medium'
                                            : journey.id === 'kane'
                                                ? 'text-rose-400 text-sm font-medium'
                                                : 'text-pink-400 text-sm font-medium';
        if (journey.id === 'melbourne') {
            count.textContent = `${lessons.filter(l => l.group === 'melbourne').length} tracks`;
        } else if (journey.id === 'sovereign') {
            count.textContent = `${lessons.filter(l => l.group === 'sovereign').length} tracks`;
        } else if (journey.id === 'heal') {
            count.textContent = `${lessons.filter(l => l.group === 'heal').length} tracks`;
        } else if (journey.id === 'mexico') {
            count.textContent = `${lessons.filter(l => l.group === 'mexico').length} tracks`;
        } else if (journey.id === 'canada') {
            count.textContent = `${lessons.filter(l => l.group === 'canada').length} tracks`;
        } else if (journey.id === 'usa') {
            count.textContent = `${lessons.filter(l => l.group === 'usa').length} tracks`;
        } else if (journey.id === 'ignan') {
            count.textContent = `${lessons.filter(l => l.group === 'ignan').length} tracks`;
        } else if (journey.id === 'asuka') {
            count.textContent = `${lessons.filter(l => l.group === 'asuka').length} tracks`;
        } else if (journey.id === 'heidi') {
            count.textContent = `${lessons.filter(l => l.group === 'heidi').length} tracks`;
        } else if (journey.id === 'sven') {
            count.textContent = `${lessons.filter(l => l.group === 'sven').length} tracks`;
        } else if (journey.id === 'martin') {
            count.textContent = `${lessons.filter(l => l.group === 'martin').length} tracks`;
        } else if (journey.id === 'ronaldo') {
            count.textContent = `${lessons.filter(l => l.group === 'ronaldo').length} tracks`;
        } else if (journey.id === 'mbappe') {
            count.textContent = `${lessons.filter(l => l.group === 'mbappe').length} tracks`;
        } else if (journey.id === 'messi') {
            count.textContent = `${lessons.filter(l => l.group === 'messi').length} tracks`;
        } else if (journey.id === 'vinicus') {
            count.textContent = `${lessons.filter(l => l.group === 'vinicus').length} tracks`;
        } else if (journey.id === 'kane') {
            count.textContent = `${lessons.filter(l => l.group === 'kane').length} tracks`;
        } else {
            count.textContent = `${lessons.filter(l => l.group === 'sovereign' || l.group === 'melbourne').length} tracks`;
        }
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(count);
        card.onclick = () => startJourneyCategory(journey.id);
        grid.appendChild(card);
    });

    const melbourneGrid = document.getElementById('melbourne-quick-grid');
    if (!melbourneGrid) return;
    melbourneGrid.textContent = '';

    const melbourneCats = SOVEREIGN_COURSE_DEFS.filter(d => d.group === 'melbourne');
    melbourneCats.forEach(def => {
        const trackCount = def.tracks.length;
        const btn = document.createElement('button');
        btn.className = 'bg-zinc-800 hover:bg-zinc-700 rounded-2xl px-4 py-3 text-left transition';
        const titleSpan = document.createElement('span');
        titleSpan.className = 'font-medium block';
        titleSpan.textContent = def.subtitle;
        const countSpan = document.createElement('span');
        countSpan.className = 'text-xs text-zinc-500';
        countSpan.textContent = `${trackCount} track${trackCount === 1 ? '' : 's'}`;
        btn.appendChild(titleSpan);
        btn.appendChild(countSpan);
        btn.onclick = () => startMelbourneCategory(def.subtitle);
        melbourneGrid.appendChild(btn);
    });

    const ignanGrid = document.getElementById('ignan-quick-grid');
    if (!ignanGrid || typeof IGNAN_COURSE_DEFS === 'undefined') return;
    ignanGrid.textContent = '';

    IGNAN_COURSE_DEFS.forEach(def => {
        const btn = document.createElement('button');
        btn.className = 'bg-emerald-900/30 hover:bg-emerald-800/40 ring-1 ring-emerald-500/20 rounded-2xl px-4 py-3 text-left transition';
        const titleSpan = document.createElement('span');
        titleSpan.className = 'font-medium block text-emerald-100';
        titleSpan.textContent = def.subtitle;
        const countSpan = document.createElement('span');
        countSpan.className = 'text-xs text-emerald-400/70';
        countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
        btn.appendChild(titleSpan);
        btn.appendChild(countSpan);
        btn.onclick = () => startIgnanCategory(def.subtitle);
        ignanGrid.appendChild(btn);
    });

    const fifaMeta = document.getElementById('fifa-2026-meta');
    if (fifaMeta && typeof FIFA_2026_META !== 'undefined') {
        fifaMeta.textContent = `${FIFA_2026_META.tournament} · ${FIFA_2026_META.dates} · ${FIFA_2026_META.nations.join(' · ')}`;
    }

    const mexicoGrid = document.getElementById('mexico-quick-grid');
    if (mexicoGrid && typeof MEXICO_COURSE_DEFS !== 'undefined') {
        mexicoGrid.textContent = '';
        MEXICO_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-amber-900/30 hover:bg-amber-800/40 ring-1 ring-amber-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-amber-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-amber-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startMexicoCategory(def.subtitle);
            mexicoGrid.appendChild(btn);
        });
    }

    const canadaGrid = document.getElementById('canada-quick-grid');
    if (canadaGrid && typeof CANADA_COURSE_DEFS !== 'undefined') {
        canadaGrid.textContent = '';
        CANADA_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-red-900/30 hover:bg-red-800/40 ring-1 ring-red-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-red-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-red-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startCanadaCategory(def.subtitle);
            canadaGrid.appendChild(btn);
        });
    }

    const usaGrid = document.getElementById('usa-quick-grid');
    if (usaGrid && typeof USA_COURSE_DEFS !== 'undefined') {
        usaGrid.textContent = '';
        USA_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-blue-900/30 hover:bg-blue-800/40 ring-1 ring-blue-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-blue-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-blue-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startUsaCategory(def.subtitle);
            usaGrid.appendChild(btn);
        });
    }

    const healGrid = document.getElementById('heal-quick-grid');
    if (healGrid && typeof HEALING_COURSE_DEFS !== 'undefined') {
        healGrid.textContent = '';
        HEALING_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-sky-900/30 hover:bg-sky-800/40 ring-1 ring-sky-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-sky-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-sky-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startHealCategory(def.subtitle);
            healGrid.appendChild(btn);
        });
    }

    const asukaGrid = document.getElementById('asuka-quick-grid');
    if (asukaGrid && typeof ASUKA_COURSE_DEFS !== 'undefined') {
        asukaGrid.textContent = '';
        ASUKA_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-rose-900/30 hover:bg-rose-800/40 ring-1 ring-rose-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-rose-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-rose-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startAsukaCategory(def.subtitle);
            asukaGrid.appendChild(btn);
        });
    }

    const heidiGrid = document.getElementById('heidi-quick-grid');
    if (heidiGrid && typeof HEIDI_COURSE_DEFS !== 'undefined') {
        heidiGrid.textContent = '';
        HEIDI_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-yellow-900/30 hover:bg-yellow-800/40 ring-1 ring-yellow-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-yellow-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-yellow-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startHeidiCategory(def.subtitle);
            heidiGrid.appendChild(btn);
        });
    }

    const svenGrid = document.getElementById('sven-quick-grid');
    if (svenGrid && typeof SVEN_COURSE_DEFS !== 'undefined') {
        svenGrid.textContent = '';
        SVEN_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-cyan-900/30 hover:bg-cyan-800/40 ring-1 ring-cyan-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-cyan-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-cyan-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startSvenCategory(def.subtitle);
            svenGrid.appendChild(btn);
        });
    }

    const martinGrid = document.getElementById('martin-quick-grid');
    if (martinGrid && typeof MARTIN_COURSE_DEFS !== 'undefined') {
        martinGrid.textContent = '';
        MARTIN_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-indigo-900/30 hover:bg-indigo-800/40 ring-1 ring-indigo-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-indigo-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-indigo-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startMartinCategory(def.subtitle);
            martinGrid.appendChild(btn);
        });
    }

    const ronaldoGrid = document.getElementById('ronaldo-quick-grid');
    if (ronaldoGrid && typeof RONALDO_COURSE_DEFS !== 'undefined') {
        ronaldoGrid.textContent = '';
        RONALDO_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-orange-900/30 hover:bg-orange-800/40 ring-1 ring-orange-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-orange-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-orange-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startRonaldoCategory(def.subtitle);
            ronaldoGrid.appendChild(btn);
        });
    }

    const mbappeGrid = document.getElementById('mbappe-quick-grid');
    if (mbappeGrid && typeof MBAPPE_COURSE_DEFS !== 'undefined') {
        mbappeGrid.textContent = '';
        MBAPPE_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-sky-900/30 hover:bg-sky-800/40 ring-1 ring-sky-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-sky-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-sky-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startMbappeCategory(def.subtitle);
            mbappeGrid.appendChild(btn);
        });
    }

    const messiGrid = document.getElementById('messi-quick-grid');
    if (messiGrid && typeof MESSI_COURSE_DEFS !== 'undefined') {
        messiGrid.textContent = '';
        MESSI_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-emerald-900/30 hover:bg-emerald-800/40 ring-1 ring-emerald-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-emerald-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-emerald-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startMessiCategory(def.subtitle);
            messiGrid.appendChild(btn);
        });
    }

    const vinicusGrid = document.getElementById('vinicus-quick-grid');
    if (vinicusGrid && typeof VINICUS_COURSE_DEFS !== 'undefined') {
        vinicusGrid.textContent = '';
        VINICUS_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-lime-900/30 hover:bg-lime-800/40 ring-1 ring-lime-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-lime-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-lime-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startVinicusCategory(def.subtitle);
            vinicusGrid.appendChild(btn);
        });
    }

    const kaneGrid = document.getElementById('kane-quick-grid');
    if (kaneGrid && typeof KANE_COURSE_DEFS !== 'undefined') {
        kaneGrid.textContent = '';
        KANE_COURSE_DEFS.forEach(def => {
            const btn = document.createElement('button');
            btn.className = 'bg-rose-900/30 hover:bg-rose-800/40 ring-1 ring-rose-500/20 rounded-2xl px-4 py-3 text-left transition';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'font-medium block text-rose-100';
            titleSpan.textContent = def.subtitle;
            const countSpan = document.createElement('span');
            countSpan.className = 'text-xs text-rose-400/70';
            countSpan.textContent = `${def.trackCount} track${def.trackCount === 1 ? '' : 's'}`;
            btn.appendChild(titleSpan);
            btn.appendChild(countSpan);
            btn.onclick = () => startKaneCategory(def.subtitle);
            kaneGrid.appendChild(btn);
        });
    }

    if (typeof renderBootAllPanel === 'function') {
        renderBootAllPanel();
    }
    if (typeof renderSkillLibraryComposer === 'function') {
        renderSkillLibraryComposer();
    }
}

function setupAudio() {
    audio = document.getElementById('main-audio');
    if (!audio) {
        console.error('setupAudio: audio element not found');
        return;
    }

    audio.addEventListener('timeupdate', () => {
        const progress = document.getElementById('progress');
        if (audio.duration && isFinite(audio.duration)) {
            progress.value = (audio.currentTime / audio.duration) * 100;
            if (audio.currentTime / audio.duration >= 0.9) {
                markLessonComplete(lessons[currentLesson]?.id);
            }
        }
        document.getElementById('playback-time').textContent = formatTime(audio.currentTime);

        if (!audio.paused && lastListenTimestamp !== null) {
            const delta = audio.currentTime - lastListenTimestamp;
            if (delta > 0 && delta < 2) recordListenTime(delta);
        }
        lastListenTimestamp = audio.currentTime;

        clearTimeout(positionSaveTimer);
        positionSaveTimer = setTimeout(() => {
            const lesson = lessons[currentLesson];
            if (lesson && audio.src) savePlaybackPosition(lesson.id, audio.currentTime);
        }, 2000);
    });

    audio.addEventListener('loadedmetadata', () => {
        document.getElementById('duration').textContent = formatTime(audio.duration);
    });

    audio.addEventListener('play', () => {
        lastListenTimestamp = audio.currentTime;
        updateStreak();
    });

    audio.addEventListener('pause', () => {
        const lesson = lessons[currentLesson];
        if (lesson) savePlaybackPosition(lesson.id, audio.currentTime);
        lastListenTimestamp = null;
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButtonIcon(false);
        const lesson = lessons[currentLesson];
        if (lesson) {
            markLessonComplete(lesson.id);
            savePlaybackPosition(lesson.id, 0);
        }
        if (!repeatMode && currentLesson < lessons.length - 1) {
            nextTrack();
        }
    });

    audio.addEventListener('error', () => {
        isPlaying = false;
        updatePlayButtonIcon(false);
        const error = audio.error;
        let msg = 'An unknown audio error occurred.';
        if (error) {
            switch (error.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    msg = 'Audio loading was aborted.';
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    msg = 'A network error prevented the audio from loading.';
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    msg = 'The audio file could not be decoded.';
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    msg = 'The audio file format is not supported or the file was not found.';
                    break;
            }
        }
        console.error('Audio error:', msg, error);
        document.getElementById('lesson-subtitle').textContent = msg;
    });

    const progressSlider = document.getElementById('progress');
    progressSlider.addEventListener('input', () => {
        if (audio.duration && isFinite(audio.duration)) {
            audio.currentTime = (progressSlider.value / 100) * audio.duration;
        }
    });

    document.getElementById('volume').addEventListener('input', (e) => {
        const vol = Number(e.target.value) / 100;
        audio.volume = Math.max(0, Math.min(1, isNaN(vol) ? 0.8 : vol));
        persistSettings();
    });
}

document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    }
});

window.onload = () => {
    try {
        appState = loadState();
        restoreCustomLessons();
        setupAudio();
        applySettings();
        setupNotesAutoSave();
        renderLibraryGroupFilters();
        renderCategoryFilters();
        renderLessons();
        renderShadowingUI();
        renderSkillsUI();
        renderJourneyDashboard();
        renderMultiformatEditorPanel();
        updateProgressUI();

        const resumeIndex = Math.min(appState.currentLesson, lessons.length - 1);
        loadLesson(Math.max(0, resumeIndex), false);

        const bootParams = new URLSearchParams(window.location.search);
        if (bootParams.get('boot') === 'all') {
            handleTtmikSyncBoot();
        } else if (bootParams.has('skill') || bootParams.has('preset') || bootParams.has('pin')
            || bootParams.has('heal') || bootParams.has('heal-factor') || bootParams.has('ignan')
            || bootParams.has('asuka') || bootParams.has('heidi') || bootParams.has('sven') || bootParams.has('martin') || bootParams.has('ronaldo') || bootParams.has('mbappe') || bootParams.has('messi') || bootParams.has('vinicus') || bootParams.has('kane') || bootParams.has('cinema') || bootParams.has('beckham') || bootParams.has('fifa') || bootParams.get('mari') === 'fifa'
            || bootParams.has('step')) {
            handleTtmikSyncBoot();
        } else if (bootParams.get('library') === 'melbourne-skills') {
            startMelbourneCategory(bootParams.get('category') || 'GoPro & Content');
        } else if (bootParams.get('library') === 'sovereign-skills') {
            startJourneyCategory('sovereign');
        } else if (bootParams.get('library') === 'heal') {
            startHealCategory(bootParams.get('category') || 'Post-DIB Landing');
        } else if (bootParams.get('library') === 'mexico') {
            startMexicoCategory(bootParams.get('category') || 'Spanish Shadowing');
        } else if (bootParams.get('library') === 'canada') {
            startCanadaCategory(bootParams.get('category') || 'French Shadowing');
        } else if (bootParams.get('library') === 'usa') {
            startUsaCategory(bootParams.get('category') || 'English Shadowing');
        } else if (bootParams.get('library') === 'ignan') {
            startIgnanCategory(bootParams.get('category') || 'Trilingual Shadowing');
        } else if (bootParams.get('library') === 'asuka') {
            startAsukaCategory(bootParams.get('category') || 'Japanese Shadowing');
        } else if (bootParams.get('library') === 'heidi') {
            startHeidiCategory(bootParams.get('category') || 'German Shadowing');
        } else if (bootParams.get('library') === 'sven') {
            startSvenCategory(bootParams.get('category') || 'Swedish Shadowing');
        } else if (bootParams.get('library') === 'martin') {
            startMartinCategory(bootParams.get('category') || 'Norwegian Shadowing');
        } else if (bootParams.get('library') === 'ronaldo') {
            startRonaldoCategory(bootParams.get('category') || 'Portuguese Shadowing');
        } else if (bootParams.get('library') === 'mbappe') {
            startMbappeCategory(bootParams.get('category') || 'French Shadowing');
        } else if (bootParams.get('library') === 'messi') {
            startMessiCategory(bootParams.get('category') || 'Argentine Shadowing');
        } else if (bootParams.get('library') === 'vinicus') {
            startVinicusCategory(bootParams.get('category') || 'Brazilian Shadowing');
        } else if (bootParams.get('library') === 'kane') {
            startKaneCategory(bootParams.get('category') || 'English Shadowing');
        } else if (bootParams.get('library') === 'compose') {
            switchTab(4);
        } else if (bootParams.has('format')) {
            switchTab(4);
        } else {
            switchTab(0);
        }
    } catch (err) {
        console.error('Failed to initialize TTMIK app:', err);
    }
};