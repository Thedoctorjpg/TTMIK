/**
 * TTMIK Audio Lab — core application logic.
 *
 * Extracted from TTMIK.html so each function can be unit-tested in
 * isolation.  The HTML file continues to work stand-alone; this module
 * is consumed only by the test suite today, but can later be imported
 * directly once the app migrates to a bundled setup.
 */

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let currentLesson = 0;
let isPlaying = false;
let repeatMode = false;

function getState() {
  return { currentLesson, isPlaying, repeatMode };
}

function resetState() {
  currentLesson = 0;
  isPlaying = false;
  repeatMode = false;
}

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "00:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Tab navigation
// ---------------------------------------------------------------------------

function switchTab(n, doc) {
  doc.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  const target = doc.getElementById(`tab-${n}`);
  if (target) target.classList.remove('hidden');

  const links = doc.querySelectorAll('.tab-link');
  links.forEach(link => {
    link.classList.remove('bg-zinc-800', 'text-white');
    link.classList.add('text-zinc-400');
  });
  if (links[n]) {
    links[n].classList.add('bg-zinc-800', 'text-white');
    links[n].classList.remove('text-zinc-400');
  }
}

// ---------------------------------------------------------------------------
// Lesson rendering
// ---------------------------------------------------------------------------

function renderLessons(lessons, doc) {
  const grid = doc.getElementById('lessons-grid');
  if (!grid) return;
  grid.innerHTML = '';

  lessons.forEach((lesson, i) => {
    const card = doc.createElement('div');
    card.className =
      'bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500 transition';
    card.innerHTML = `
      <div class="h-48 bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center text-6xl">
        🇰🇷
      </div>
      <div class="p-6">
        <h4 class="font-semibold">${escapeHTML(lesson.title)}</h4>
        <p class="text-xs text-zinc-500">${escapeHTML(lesson.subtitle)} • ${escapeHTML(lesson.duration)}</p>
      </div>
    `;
    card.dataset.index = i;
    grid.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
// Load a lesson into the player
// ---------------------------------------------------------------------------

function loadLesson(index, lessons, audio, doc) {
  const lesson = lessons[index];
  if (!lesson) return;
  currentLesson = index;

  const titleEl = doc.getElementById('lesson-title');
  const subtitleEl = doc.getElementById('lesson-subtitle');
  const transcriptEl = doc.getElementById('transcript');
  const vocabEl = doc.getElementById('vocab-list');

  if (titleEl) titleEl.textContent = lesson.title;
  if (subtitleEl) subtitleEl.textContent = lesson.subtitle;
  if (transcriptEl) {
    transcriptEl.innerHTML =
      lesson.transcript ||
      '<p class="text-zinc-500 italic">No transcript yet. Paste one!</p>';
  }

  if (vocabEl) {
    const vocabHTML = lesson.vocab
      ? lesson.vocab
          .map(
            v =>
              `<div class="flex justify-between items-center"><span class="korean">${escapeHTML(v.ko)}</span><span class="text-zinc-400">${escapeHTML(v.en)}</span></div>`
          )
          .join('')
      : '';
    vocabEl.innerHTML = vocabHTML;
  }

  if (lesson.src && audio) {
    audio.src = encodeURI(lesson.src);
  }

  switchTab(0, doc);
}

// ---------------------------------------------------------------------------
// Playback controls
// ---------------------------------------------------------------------------

function togglePlay(audio, doc) {
  if (!audio || !audio.src) {
    return false;
  }

  const btn = doc.getElementById('play-btn');
  if (isPlaying) {
    audio.pause();
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play ml-1"></i>';
  } else {
    audio.play();
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
  isPlaying = !isPlaying;
  return isPlaying;
}

function setSpeed(speed, audio, doc) {
  if (audio) audio.playbackRate = speed;
  if (doc) {
    doc.querySelectorAll('.speed-btn').forEach(btn => {
      const match = btn.textContent === speed + 'x';
      btn.classList.toggle('bg-white', match);
      btn.classList.toggle('text-zinc-900', match);
    });
  }
}

function toggleRepeat(audio, doc) {
  repeatMode = !repeatMode;
  if (audio) audio.loop = repeatMode;
  const btn = doc.getElementById('repeat-btn');
  if (btn) btn.classList.toggle('text-pink-500', repeatMode);
  return repeatMode;
}

// ---------------------------------------------------------------------------
// Track navigation
// ---------------------------------------------------------------------------

function prevTrack(lessons, audio, doc) {
  if (currentLesson > 0) {
    loadLesson(currentLesson - 1, lessons, audio, doc);
    return true;
  }
  return false;
}

function nextTrack(lessons, audio, doc) {
  if (currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1, lessons, audio, doc);
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// File upload
// ---------------------------------------------------------------------------

function handleFileUpload(file, lessons, audio, doc, createObjectURL) {
  if (!file) return null;

  const url = createObjectURL(file);
  audio.src = url;

  const newLesson = {
    id: Date.now(),
    title: file.name.replace('.mp3', ''),
    subtitle: 'Your TTMIK Upload',
    duration: '??:??',
    src: url,
    transcript: '<p>Paste transcript here...</p>',
    vocab: [],
  };
  lessons.unshift(newLesson);

  renderLessons(lessons, doc);
  loadLesson(0, lessons, audio, doc);
  return newLesson;
}

// ---------------------------------------------------------------------------
// Add new lesson (prompt-based)
// ---------------------------------------------------------------------------

function addNewLesson(title, lessons, doc) {
  if (!title) return null;

  const newLesson = {
    id: Date.now(),
    title: title,
    subtitle: 'Talk To Me In Korean',
    duration: '00:00',
    src: '',
    transcript: '',
    vocab: [],
  };
  lessons.unshift(newLesson);
  renderLessons(lessons, doc);
  loadLesson(0, lessons, { src: '' }, doc);
  return newLesson;
}

// ---------------------------------------------------------------------------
// Shadowing practice
// ---------------------------------------------------------------------------

function getShadowingPhrases() {
  return [
    '안녕하세요! 만나서 반가워요.',
    '오늘 날씨가 정말 좋네요.',
    '커피 한 잔 마실까요?',
  ];
}

function startShadowing(doc, setIntervalFn) {
  const phrases = getShadowingPhrases();
  let i = 0;
  const el = doc.getElementById('shadowing-text');
  if (!el) return null;

  const intervalId = (setIntervalFn || setInterval)(() => {
    el.textContent = phrases[i];
    i = (i + 1) % phrases.length;
  }, 4000);

  return intervalId;
}

// ---------------------------------------------------------------------------
// Audio wiring
// ---------------------------------------------------------------------------

function setupAudio(audio, doc) {
  audio.addEventListener('timeupdate', () => {
    const progress = doc.getElementById('progress');
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
    const playbackTime = doc.getElementById('playback-time');
    if (playbackTime) {
      playbackTime.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    const durationEl = doc.getElementById('duration');
    if (durationEl) {
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('ended', () => {
    isPlaying = false;
    const btn = doc.getElementById('play-btn');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play ml-1"></i>';
  });

  const progressSlider = doc.getElementById('progress');
  if (progressSlider) {
    progressSlider.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (progressSlider.value / 100) * audio.duration;
      }
    });
  }

  audio.volume = 0.8;
  const volumeSlider = doc.getElementById('volume');
  if (volumeSlider) {
    volumeSlider.addEventListener('input', e => {
      audio.volume = e.target.value / 100;
    });
  }
}

// ---------------------------------------------------------------------------
// localStorage persistence
// ---------------------------------------------------------------------------

function loadProgress(storage) {
  try {
    return JSON.parse(storage.getItem('ttmik_progress')) || {
      streak: 0, totalSeconds: 0, lessonsPlayed: 0,
      lastDate: null, notes: {},
    };
  } catch {
    return { streak: 0, totalSeconds: 0, lessonsPlayed: 0, lastDate: null, notes: {} };
  }
}

function saveProgress(data, storage) {
  storage.setItem('ttmik_progress', JSON.stringify(data));
}

function recordListeningSession(durationSeconds, storage, nowMs) {
  const progress = loadProgress(storage);
  const now = nowMs || Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  progress.totalSeconds += durationSeconds;
  progress.lessonsPlayed += 1;
  const yesterday = new Date(now - 86400000).toISOString().slice(0, 10);
  if (progress.lastDate === today) {
    // already counted today
  } else if (progress.lastDate === yesterday) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }
  progress.lastDate = today;
  saveProgress(progress, storage);
  return progress;
}

function saveNotes(lessonId, notesText, storage) {
  const progress = loadProgress(storage);
  if (!progress.notes) progress.notes = {};
  progress.notes[lessonId] = notesText;
  saveProgress(progress, storage);
}

function getNotesForLesson(lessonId, storage) {
  const progress = loadProgress(storage);
  return (progress.notes && progress.notes[lessonId]) || '';
}

// ---------------------------------------------------------------------------
// Dark mode
// ---------------------------------------------------------------------------

function toggleDark(doc) {
  const html = doc.documentElement;
  html.classList.toggle('dark');
  return html.classList.contains('dark');
}

// ---------------------------------------------------------------------------
// Responsive sidebar
// ---------------------------------------------------------------------------

function toggleSidebar(doc) {
  const sidebar = doc.getElementById('sidebar');
  const overlay = doc.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

function closeSidebar(doc) {
  const sidebar = doc.getElementById('sidebar');
  const overlay = doc.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  escapeHTML,
  formatTime,
  switchTab,
  renderLessons,
  loadLesson,
  togglePlay,
  setSpeed,
  toggleRepeat,
  prevTrack,
  nextTrack,
  handleFileUpload,
  addNewLesson,
  getShadowingPhrases,
  startShadowing,
  setupAudio,
  getState,
  resetState,
  loadProgress,
  saveProgress,
  recordListeningSession,
  saveNotes,
  getNotesForLesson,
  toggleDark,
  toggleSidebar,
  closeSidebar,
};
