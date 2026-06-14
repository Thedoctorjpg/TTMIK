/**
 * @jest-environment jsdom
 */

const {
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
} = require('../src/app');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sampleLessons = [
  {
    id: 1,
    title: 'Lesson 1',
    subtitle: 'Level 1',
    duration: '05:00',
    src: 'audio/lesson1.mp3',
    transcript: '<p>Hello</p>',
    vocab: [{ ko: '안녕', en: 'hello' }],
  },
  {
    id: 2,
    title: 'Lesson 2',
    subtitle: 'Level 1',
    duration: '06:30',
    src: 'audio/lesson2.mp3',
    transcript: '<p>Thank you</p>',
    vocab: [
      { ko: '감사합니다', en: 'thank you' },
      { ko: '네', en: 'yes' },
    ],
  },
  {
    id: 3,
    title: 'Lesson 3',
    subtitle: 'Level 2',
    duration: '07:15',
    src: 'audio/lesson3.mp3',
    transcript: '',
    vocab: [],
  },
];

function buildDOM() {
  document.body.innerHTML = `
    <div class="tab-content" id="tab-0">Player</div>
    <div class="tab-content hidden" id="tab-1">Lessons</div>
    <div class="tab-content hidden" id="tab-2">Practice</div>
    <div class="tab-content hidden" id="tab-3">Progress</div>

    <a class="tab-link bg-zinc-800 text-white" href="#">Player</a>
    <a class="tab-link text-zinc-400" href="#">Lessons</a>
    <a class="tab-link text-zinc-400" href="#">Practice</a>
    <a class="tab-link text-zinc-400" href="#">Progress</a>

    <div id="lessons-grid"></div>

    <h3 id="lesson-title"></h3>
    <p id="lesson-subtitle"></p>
    <div id="transcript"></div>
    <div id="vocab-list"></div>

    <button id="play-btn"><i class="fa-solid fa-play ml-1"></i></button>
    <button id="repeat-btn" class="text-zinc-400"></button>

    <button class="speed-btn">0.5x</button>
    <button class="speed-btn">0.75x</button>
    <button class="speed-btn bg-white text-zinc-900">1x</button>
    <button class="speed-btn">1.25x</button>
    <button class="speed-btn">1.5x</button>

    <div id="playback-time">00:00</div>
    <span id="duration">00:00</span>
    <input type="range" id="progress" value="0" min="0" max="100" />
    <input type="range" id="volume" min="0" max="100" value="80" />

    <div id="shadowing-text"></div>
  `;
}

function createMockAudio() {
  return {
    src: '',
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
    loop: false,
    play: jest.fn(),
    pause: jest.fn(),
    addEventListener: jest.fn(),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  buildDOM();
  resetState();
});

// ---- formatTime -----------------------------------------------------------

describe('formatTime', () => {
  it('returns 00:00 for falsy input', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(null)).toBe('00:00');
    expect(formatTime(undefined)).toBe('00:00');
    expect(formatTime(NaN)).toBe('00:00');
  });

  it('formats seconds correctly', () => {
    expect(formatTime(1)).toBe('00:01');
    expect(formatTime(59)).toBe('00:59');
    expect(formatTime(60)).toBe('01:00');
    expect(formatTime(125)).toBe('02:05');
    expect(formatTime(3661)).toBe('61:01');
  });

  it('floors fractional seconds', () => {
    expect(formatTime(90.7)).toBe('01:30');
    expect(formatTime(61.999)).toBe('01:01');
  });

  it('pads single-digit minutes and seconds', () => {
    expect(formatTime(5)).toBe('00:05');
    expect(formatTime(65)).toBe('01:05');
  });
});

// ---- switchTab ------------------------------------------------------------

describe('switchTab', () => {
  it('shows the selected tab and hides others', () => {
    switchTab(2, document);
    expect(document.getElementById('tab-0').classList.contains('hidden')).toBe(true);
    expect(document.getElementById('tab-1').classList.contains('hidden')).toBe(true);
    expect(document.getElementById('tab-2').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('tab-3').classList.contains('hidden')).toBe(true);
  });

  it('highlights the active tab link', () => {
    switchTab(1, document);
    const links = document.querySelectorAll('.tab-link');
    expect(links[0].classList.contains('text-zinc-400')).toBe(true);
    expect(links[1].classList.contains('bg-zinc-800')).toBe(true);
    expect(links[1].classList.contains('text-white')).toBe(true);
  });

  it('switches from one tab to another', () => {
    switchTab(3, document);
    expect(document.getElementById('tab-3').classList.contains('hidden')).toBe(false);

    switchTab(0, document);
    expect(document.getElementById('tab-0').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('tab-3').classList.contains('hidden')).toBe(true);
  });
});

// ---- renderLessons --------------------------------------------------------

describe('renderLessons', () => {
  it('populates the lessons grid', () => {
    renderLessons(sampleLessons, document);
    const grid = document.getElementById('lessons-grid');
    expect(grid.children.length).toBe(3);
  });

  it('renders title and subtitle for each card', () => {
    renderLessons(sampleLessons, document);
    const grid = document.getElementById('lessons-grid');
    expect(grid.children[0].innerHTML).toContain('Lesson 1');
    expect(grid.children[0].innerHTML).toContain('Level 1');
  });

  it('clears previous cards on re-render', () => {
    renderLessons(sampleLessons, document);
    renderLessons(sampleLessons.slice(0, 1), document);
    const grid = document.getElementById('lessons-grid');
    expect(grid.children.length).toBe(1);
  });

  it('handles empty lesson list', () => {
    renderLessons([], document);
    const grid = document.getElementById('lessons-grid');
    expect(grid.children.length).toBe(0);
  });

  it('stores index in data attribute', () => {
    renderLessons(sampleLessons, document);
    const grid = document.getElementById('lessons-grid');
    expect(grid.children[2].dataset.index).toBe('2');
  });
});

// ---- loadLesson -----------------------------------------------------------

describe('loadLesson', () => {
  it('sets title and subtitle', () => {
    const audio = createMockAudio();
    loadLesson(0, sampleLessons, audio, document);
    expect(document.getElementById('lesson-title').textContent).toBe('Lesson 1');
    expect(document.getElementById('lesson-subtitle').textContent).toBe('Level 1');
  });

  it('populates transcript HTML', () => {
    const audio = createMockAudio();
    loadLesson(0, sampleLessons, audio, document);
    expect(document.getElementById('transcript').innerHTML).toBe('<p>Hello</p>');
  });

  it('shows fallback when transcript is empty', () => {
    const audio = createMockAudio();
    loadLesson(2, sampleLessons, audio, document);
    expect(document.getElementById('transcript').innerHTML).toContain('No transcript yet');
  });

  it('renders vocabulary', () => {
    const audio = createMockAudio();
    loadLesson(1, sampleLessons, audio, document);
    const vocabHTML = document.getElementById('vocab-list').innerHTML;
    expect(vocabHTML).toContain('감사합니다');
    expect(vocabHTML).toContain('thank you');
  });

  it('renders empty vocab list when vocab is empty', () => {
    const audio = createMockAudio();
    loadLesson(2, sampleLessons, audio, document);
    expect(document.getElementById('vocab-list').innerHTML).toBe('');
  });

  it('sets audio src with URI encoding', () => {
    const audio = createMockAudio();
    loadLesson(0, sampleLessons, audio, document);
    expect(audio.src).toBe('audio/lesson1.mp3');
  });

  it('updates currentLesson state', () => {
    const audio = createMockAudio();
    loadLesson(1, sampleLessons, audio, document);
    expect(getState().currentLesson).toBe(1);
  });

  it('switches to player tab', () => {
    switchTab(2, document);
    const audio = createMockAudio();
    loadLesson(0, sampleLessons, audio, document);
    expect(document.getElementById('tab-0').classList.contains('hidden')).toBe(false);
  });

  it('handles out-of-bounds index gracefully', () => {
    const audio = createMockAudio();
    loadLesson(99, sampleLessons, audio, document);
    // should not throw
  });
});

// ---- togglePlay -----------------------------------------------------------

describe('togglePlay', () => {
  it('returns false when audio has no src', () => {
    const audio = createMockAudio();
    audio.src = '';
    expect(togglePlay(audio, document)).toBe(false);
  });

  it('starts playback', () => {
    const audio = createMockAudio();
    audio.src = 'test.mp3';
    const result = togglePlay(audio, document);
    expect(result).toBe(true);
    expect(audio.play).toHaveBeenCalled();
  });

  it('pauses playback on second toggle', () => {
    const audio = createMockAudio();
    audio.src = 'test.mp3';
    togglePlay(audio, document); // play
    togglePlay(audio, document); // pause
    expect(audio.pause).toHaveBeenCalled();
    expect(getState().isPlaying).toBe(false);
  });

  it('updates play button icon', () => {
    const audio = createMockAudio();
    audio.src = 'test.mp3';
    togglePlay(audio, document);
    expect(document.getElementById('play-btn').innerHTML).toContain('fa-pause');

    togglePlay(audio, document);
    expect(document.getElementById('play-btn').innerHTML).toContain('fa-play');
  });
});

// ---- setSpeed -------------------------------------------------------------

describe('setSpeed', () => {
  it('sets audio playback rate', () => {
    const audio = createMockAudio();
    setSpeed(1.5, audio, document);
    expect(audio.playbackRate).toBe(1.5);
  });

  it('highlights the matching speed button', () => {
    const audio = createMockAudio();
    setSpeed(0.75, audio, document);
    const btns = document.querySelectorAll('.speed-btn');
    expect(btns[1].classList.contains('bg-white')).toBe(true);
    expect(btns[2].classList.contains('bg-white')).toBe(false);
  });

  it('switches highlight when speed changes', () => {
    const audio = createMockAudio();
    setSpeed(1, audio, document);
    setSpeed(1.25, audio, document);
    const btns = document.querySelectorAll('.speed-btn');
    expect(btns[2].classList.contains('bg-white')).toBe(false);
    expect(btns[3].classList.contains('bg-white')).toBe(true);
  });
});

// ---- toggleRepeat ---------------------------------------------------------

describe('toggleRepeat', () => {
  it('toggles repeat mode on', () => {
    const audio = createMockAudio();
    const result = toggleRepeat(audio, document);
    expect(result).toBe(true);
    expect(audio.loop).toBe(true);
  });

  it('toggles repeat mode off', () => {
    const audio = createMockAudio();
    toggleRepeat(audio, document);
    const result = toggleRepeat(audio, document);
    expect(result).toBe(false);
    expect(audio.loop).toBe(false);
  });

  it('applies highlight class', () => {
    const audio = createMockAudio();
    toggleRepeat(audio, document);
    expect(document.getElementById('repeat-btn').classList.contains('text-pink-500')).toBe(true);

    toggleRepeat(audio, document);
    expect(document.getElementById('repeat-btn').classList.contains('text-pink-500')).toBe(false);
  });
});

// ---- prevTrack / nextTrack -----------------------------------------------

describe('prevTrack', () => {
  it('goes to previous lesson', () => {
    const audio = createMockAudio();
    loadLesson(2, sampleLessons, audio, document);
    const moved = prevTrack(sampleLessons, audio, document);
    expect(moved).toBe(true);
    expect(getState().currentLesson).toBe(1);
  });

  it('does not go below 0', () => {
    const audio = createMockAudio();
    loadLesson(0, sampleLessons, audio, document);
    const moved = prevTrack(sampleLessons, audio, document);
    expect(moved).toBe(false);
    expect(getState().currentLesson).toBe(0);
  });
});

describe('nextTrack', () => {
  it('goes to next lesson', () => {
    const audio = createMockAudio();
    loadLesson(0, sampleLessons, audio, document);
    const moved = nextTrack(sampleLessons, audio, document);
    expect(moved).toBe(true);
    expect(getState().currentLesson).toBe(1);
  });

  it('does not go past last lesson', () => {
    const audio = createMockAudio();
    loadLesson(2, sampleLessons, audio, document);
    const moved = nextTrack(sampleLessons, audio, document);
    expect(moved).toBe(false);
    expect(getState().currentLesson).toBe(2);
  });
});

// ---- handleFileUpload -----------------------------------------------------

describe('handleFileUpload', () => {
  it('returns null for falsy file', () => {
    const audio = createMockAudio();
    expect(handleFileUpload(null, [...sampleLessons], audio, document, jest.fn())).toBeNull();
  });

  it('creates a new lesson from the uploaded file', () => {
    const audio = createMockAudio();
    const lessons = [...sampleLessons];
    const fakeURL = 'blob:http://localhost/abc';
    const mockCreateObjectURL = jest.fn(() => fakeURL);
    const file = { name: 'my-lesson.mp3' };

    const result = handleFileUpload(file, lessons, audio, document, mockCreateObjectURL);
    expect(result.title).toBe('my-lesson');
    expect(result.src).toBe(fakeURL);
    expect(result.subtitle).toBe('Your TTMIK Upload');
    expect(lessons[0]).toBe(result);
  });

  it('sets audio.src to the object URL', () => {
    const audio = createMockAudio();
    const lessons = [...sampleLessons];
    const fakeURL = 'blob:http://localhost/xyz';
    handleFileUpload({ name: 'test.mp3' }, lessons, audio, document, () => fakeURL);
    expect(audio.src).toBe(fakeURL);
  });

  it('renders updated lesson list', () => {
    const audio = createMockAudio();
    const lessons = [...sampleLessons];
    handleFileUpload({ name: 'new.mp3' }, lessons, audio, document, () => 'blob:url');
    const grid = document.getElementById('lessons-grid');
    expect(grid.children.length).toBe(4);
  });
});

// ---- addNewLesson ---------------------------------------------------------

describe('addNewLesson', () => {
  it('returns null when title is falsy', () => {
    const lessons = [...sampleLessons];
    expect(addNewLesson('', lessons, document)).toBeNull();
    expect(addNewLesson(null, lessons, document)).toBeNull();
  });

  it('creates a new lesson with the given title', () => {
    const lessons = [...sampleLessons];
    const result = addNewLesson('My Custom Lesson', lessons, document);
    expect(result.title).toBe('My Custom Lesson');
    expect(result.subtitle).toBe('Talk To Me In Korean');
    expect(result.duration).toBe('00:00');
    expect(lessons[0]).toBe(result);
  });

  it('renders updated lesson list', () => {
    const lessons = [...sampleLessons];
    addNewLesson('Test', lessons, document);
    const grid = document.getElementById('lessons-grid');
    expect(grid.children.length).toBe(4);
  });
});

// ---- getShadowingPhrases --------------------------------------------------

describe('getShadowingPhrases', () => {
  it('returns an array of Korean phrases', () => {
    const phrases = getShadowingPhrases();
    expect(Array.isArray(phrases)).toBe(true);
    expect(phrases.length).toBeGreaterThan(0);
    phrases.forEach(p => expect(typeof p).toBe('string'));
  });
});

// ---- startShadowing -------------------------------------------------------

describe('startShadowing', () => {
  it('cycles through phrases using the interval callback', () => {
    const callbacks = [];
    const fakeSetInterval = (fn) => {
      callbacks.push(fn);
      return 42;
    };

    const intervalId = startShadowing(document, fakeSetInterval);
    expect(intervalId).toBe(42);

    const el = document.getElementById('shadowing-text');
    const phrases = getShadowingPhrases();

    callbacks[0]();
    expect(el.textContent).toBe(phrases[0]);

    callbacks[0]();
    expect(el.textContent).toBe(phrases[1]);

    callbacks[0]();
    expect(el.textContent).toBe(phrases[2]);

    // wraps around
    callbacks[0]();
    expect(el.textContent).toBe(phrases[0]);
  });

  it('returns null when shadowing-text element is missing', () => {
    document.getElementById('shadowing-text').remove();
    expect(startShadowing(document, jest.fn())).toBeNull();
  });
});

// ---- setupAudio -----------------------------------------------------------

describe('setupAudio', () => {
  it('registers event listeners on the audio element', () => {
    const audio = createMockAudio();
    setupAudio(audio, document);

    const eventNames = audio.addEventListener.mock.calls.map(c => c[0]);
    expect(eventNames).toContain('timeupdate');
    expect(eventNames).toContain('loadedmetadata');
    expect(eventNames).toContain('ended');
  });

  it('sets initial volume to 0.8', () => {
    const audio = createMockAudio();
    setupAudio(audio, document);
    expect(audio.volume).toBe(0.8);
  });

  it('timeupdate handler updates progress and time display', () => {
    const audio = createMockAudio();
    setupAudio(audio, document);

    const timeupdateHandler = audio.addEventListener.mock.calls.find(
      c => c[0] === 'timeupdate'
    )[1];

    audio.currentTime = 30;
    audio.duration = 120;
    timeupdateHandler();

    expect(document.getElementById('progress').value).toBe('25');
    expect(document.getElementById('playback-time').textContent).toBe('00:30');
  });

  it('loadedmetadata handler updates duration display', () => {
    const audio = createMockAudio();
    setupAudio(audio, document);

    const handler = audio.addEventListener.mock.calls.find(
      c => c[0] === 'loadedmetadata'
    )[1];

    audio.duration = 185;
    handler();
    expect(document.getElementById('duration').textContent).toBe('03:05');
  });

  it('ended handler resets isPlaying and button', () => {
    const audio = createMockAudio();
    audio.src = 'test.mp3';
    togglePlay(audio, document); // now playing

    setupAudio(audio, document);
    const handler = audio.addEventListener.mock.calls.find(c => c[0] === 'ended')[1];
    handler();

    expect(getState().isPlaying).toBe(false);
    expect(document.getElementById('play-btn').innerHTML).toContain('fa-play');
  });
});

// ---- getState / resetState ------------------------------------------------

describe('getState / resetState', () => {
  it('returns initial state', () => {
    expect(getState()).toEqual({
      currentLesson: 0,
      isPlaying: false,
      repeatMode: false,
    });
  });

  it('reflects mutations', () => {
    const audio = createMockAudio();
    audio.src = 'test.mp3';
    togglePlay(audio, document);
    loadLesson(2, sampleLessons, audio, document);
    toggleRepeat(audio, document);

    const state = getState();
    expect(state.currentLesson).toBe(2);
    expect(state.isPlaying).toBe(true);
    expect(state.repeatMode).toBe(true);
  });

  it('resetState restores defaults', () => {
    const audio = createMockAudio();
    audio.src = 'test.mp3';
    togglePlay(audio, document);
    resetState();
    expect(getState()).toEqual({
      currentLesson: 0,
      isPlaying: false,
      repeatMode: false,
    });
  });
});
