/**
 * TTMIK Audio Lab - Application Logic
 *
 * Depends on: utils.js (shared utilities), lesson-data.js (generated data)
 */

let currentLesson = 0;
let isPlaying = false;
let audio = null;
let repeatMode = false;

function switchTab(n) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(`tab-${n}`).classList.remove('hidden');

    document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.remove('bg-zinc-800', 'text-white');
        link.classList.add('text-zinc-400');
    });
    document.querySelectorAll('.tab-link')[n].classList.add('bg-zinc-800', 'text-white');
}

function renderLessons() {
    const grid = document.getElementById('lessons-grid');
    grid.innerHTML = '';

    lessons.forEach((lesson, i) => {
        const card = document.createElement('div');
        card.className = "bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500 transition";
        card.innerHTML = `
            <div class="h-48 bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center text-6xl">
                \u{1F1F0}\u{1F1F7}
            </div>
            <div class="p-6">
                <h4 class="font-semibold">${lesson.title}</h4>
                <p class="text-xs text-zinc-500">${lesson.subtitle} \u2022 ${lesson.duration}</p>
            </div>
        `;
        card.onclick = () => loadLesson(i);
        grid.appendChild(card);
    });
}

function loadLesson(index) {
    currentLesson = index;
    const lesson = lessons[index];

    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-subtitle').textContent = lesson.subtitle;
    document.getElementById('transcript').innerHTML = lesson.transcript || DEFAULT_TRANSCRIPT;

    const vocabHTML = lesson.vocab ? lesson.vocab.map(v => `
        <div class="flex justify-between items-center">
            <span class="korean">${v.ko}</span>
            <span class="text-zinc-400">${v.en}</span>
        </div>
    `).join('') : '';
    document.getElementById('vocab-list').innerHTML = vocabHTML;

    if (lesson.src) {
        audio.src = encodeURI(lesson.src);
    }

    switchTab(0);
}

function togglePlay() {
    if (!audio.src) {
        alert("Choose a built-in lesson or upload an MP3 to start listening.");
        return;
    }

    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayButtonIcon(isPlaying);
}

function setSpeed(speed) {
    audio.playbackRate = speed;
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.classList.toggle('bg-white', btn.textContent === speed + 'x');
        btn.classList.toggle('text-zinc-900', btn.textContent === speed + 'x');
    });
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    audio.src = url;

    lessons.unshift(createLesson({
        title: file.name.replace('.mp3', ''),
        subtitle: "Your TTMIK Upload",
        duration: "??:??",
        src: url,
        transcript: "<p>Paste transcript here...</p>"
    }));

    renderLessons();
    loadLesson(0);
    alert("MP3 loaded! Great work on your Korean journey \u{1F4AA}");
}

function addNewLesson() {
    const title = prompt("Lesson title (e.g. Level 1 Lesson 5):");
    if (!title) return;

    lessons.unshift(createLesson({ title: title }));
    renderLessons();
    loadLesson(0);
}

function saveNotes() {
    const notes = document.getElementById('notes').value;
    alert("Notes saved! (In a real app these would persist)");
}

function toggleRepeat() {
    repeatMode = !repeatMode;
    audio.loop = repeatMode;
    document.getElementById('repeat-btn').classList.toggle('text-pink-500', repeatMode);
}

function toggleShuffle() {
    alert("Shuffle coming soon! For now enjoy sequential playback.");
}

function prevTrack() {
    if (currentLesson > 0) loadLesson(currentLesson - 1);
}

function nextTrack() {
    if (currentLesson < lessons.length - 1) loadLesson(currentLesson + 1);
}

function startShadowing() {
    const phrases = [
        "\uC548\uB155\uD558\uC138\uC694! \uB9CC\uB098\uC11C \uBC18\uAC00\uC6CC\uC694.",
        "\uC624\uB298 \uB0A0\uC528\uAC00 \uC815\uB9D0 \uC88B\uB124\uC694.",
        "\uCEE4\uD53C \uD55C \uC794 \uB9C8\uC2E4\uAE4C\uC694?"
    ];
    let i = 0;
    const el = document.getElementById('shadowing-text');

    setInterval(() => {
        el.textContent = phrases[i];
        i = (i + 1) % phrases.length;
    }, 4000);
}

function setupAudio() {
    audio = document.getElementById('main-audio');

    audio.addEventListener('timeupdate', () => {
        const progress = document.getElementById('progress');
        if (audio.duration) {
            progress.value = (audio.currentTime / audio.duration) * 100;
        }
        document.getElementById('playback-time').textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        document.getElementById('duration').textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButtonIcon(false);
    });

    const progressSlider = document.getElementById('progress');
    progressSlider.addEventListener('input', () => {
        if (audio.duration) {
            audio.currentTime = (progressSlider.value / 100) * audio.duration;
        }
    });

    audio.volume = 0.8;
    document.getElementById('volume').addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    }
});

// Init
window.onload = () => {
    setupAudio();
    renderLessons();
    loadLesson(0);
    switchTab(0);

    console.log("%cTTMIK WebApp ready! Upload your MP3s and start practicing.", "color:#ec4899; font-size:13px");
};
