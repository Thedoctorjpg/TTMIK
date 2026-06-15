import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Repeat, Upload,
  BookOpen, BarChart3, GraduationCap, Menu, X, Sun, Moon, Send, Heart,
} from 'lucide-react';
import defaultLessons from './data/lessons';
import { useProgress } from './hooks/useProgress';
import ShadowingPractice from './components/ShadowingPractice';
import ProgressDashboard from './components/ProgressDashboard';

const WEBHOOK_URL = import.meta.env.VITE_TTMIK_WEBHOOK_URL || '/api/ttmik-webhook';
const HEAL_FEED_URL = import.meta.env.VITE_TTMIK_HEAL_FEED_URL || '/api/ttmik-heal-feed';
const X_HANDLE = (import.meta.env.VITE_X_HANDLE || 'adhdloganberry').replace(/^@/, '');
const HEAL_FEED_TWEET = '괜찮아요, 괜찮아요 — feed rest OK. 관찰만 하고 흡수하지 않을게요. One breath · one boundary · no re-watch spiral. #HealTheFeed #TTMIK #LearnKorean';

function escapeText(str) {
  if (typeof str !== 'string') return '';
  return str;
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const min = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function App() {
  // ---- State ----
  const [lessons, setLessons] = useState(defaultLessons);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [repeatMode, setRepeatMode] = useState(false);
  const [tab, setTab] = useState('player');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('ttmik_tweet_dark') !== 'light';
  });
  const [notes, setNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);

  const audioRef = useRef(null);
  const sessionStartRef = useRef(null);

  const {
    progress, recordSession, saveNotes: persistNotes,
    getNotesForLesson, markLessonComplete,
  } = useProgress();

  const lesson = lessons[currentIdx];

  // ---- Dark mode ----
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('ttmik_tweet_dark', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // ---- Load lesson audio ----
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (lesson?.src) {
      audio.src = lesson.src;
    } else {
      audio.removeAttribute('src');
    }
    setNotes(getNotesForLesson(lesson?.id));
    setNotesSaved(false);
  }, [currentIdx, lesson, getNotesForLesson]);

  // ---- Audio events ----
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setProgressPct((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(audio.currentTime);
    };
    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      if (sessionStartRef.current) {
        const elapsed = (Date.now() - sessionStartRef.current) / 1000;
        if (elapsed > 5) recordSession(elapsed);
        sessionStartRef.current = null;
      }
      markLessonComplete(lesson?.id);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, [lesson, recordSession, markLessonComplete]);

  // ---- Playback rate ----
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = repeatMode;
  }, [repeatMode]);

  // ---- Controls ----
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    if (isPlaying) {
      audio.pause();
      if (sessionStartRef.current) {
        const elapsed = (Date.now() - sessionStartRef.current) / 1000;
        if (elapsed > 5) recordSession(elapsed);
        sessionStartRef.current = null;
      }
    } else {
      audio.play().catch(() => {});
      sessionStartRef.current = Date.now();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, recordSession]);

  const prevTrack = () => {
    if (currentIdx > 0) { setCurrentIdx(currentIdx - 1); setIsPlaying(false); }
  };
  const nextTrack = () => {
    if (currentIdx < lessons.length - 1) { setCurrentIdx(currentIdx + 1); setIsPlaying(false); }
  };
  const loadLesson = (i) => {
    setCurrentIdx(i);
    setIsPlaying(false);
    setTab('player');
    setSidebarOpen(false);
  };

  // ---- File upload ----
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newLesson = {
      id: Date.now(),
      title: file.name.replace(/\.mp3$/i, ''),
      subtitle: 'Your TTMIK Upload',
      duration: '??:??',
      src: url,
      transcript: 'Paste transcript here...',
      vocab: [],
    };
    setLessons([newLesson, ...lessons]);
    setCurrentIdx(0);
    setTab('player');
  };

  // ---- Notes ----
  const handleSaveNotes = () => {
    if (lesson) persistNotes(lesson.id, notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 1500);
  };

  // ---- Heal feed + Tweet ----
  const healFeed = useCallback(() => {
    const text = HEAL_FEED_TWEET;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');

    const payload = {
      event: 'ttmik_heal_feed',
      lesson: 'Twitter feed heal',
      progress: 100,
      timestamp: new Date().toISOString(),
      platform: 'TTMIK Feed Heal',
      user: X_HANDLE,
      tweet: text,
    };

    fetch(HEAL_FEED_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(`💚 Feed healed @${X_HANDLE}:`, data))
      .catch((err) => console.warn('Heal feed error:', err));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('heal-feed') === '1' || params.get('tweet-heal') === '1') {
      healFeed();
    }
  }, [healFeed]);

  const tweetProgress = () => {
    const text = `Just finished "${escapeText(lesson?.title)}" with TTMIK! 🇰🇷🔥 Progress: ${Math.round(progressPct)}% #LearnKorean #TTMIK`;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');

    const payload = {
      event: 'ttmik_progress',
      lesson: lesson?.title,
      progress: Math.round(progressPct),
      timestamp: new Date().toISOString(),
      platform: 'TTMIK Tweet App',
      user: X_HANDLE,
    };

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(`📤 Posted to x.com/${X_HANDLE}:`, data))
      .catch((err) => console.warn('Webhook error:', err));
  };

  // ---- Keyboard shortcuts ----
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [togglePlay]);

  // ---- Speed buttons ----
  const speeds = [0.5, 0.75, 1, 1.25, 1.5];

  const navItems = [
    { id: 'player', label: 'Player', icon: Play },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: GraduationCap },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-zinc-800 text-white rounded-2xl flex items-center justify-center md:hidden"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed left-0 top-0 h-screen w-72 border-r flex flex-col z-50
          transition-transform md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}
        `}>
          <div className={`p-6 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center text-3xl">
                🇰🇷
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">TTMIK Tweet</h1>
                <p className="text-xs text-zinc-500">Learn • Practice • Share</p>
              </div>
            </div>
          </div>

          <nav className="p-4 flex-1 overflow-auto space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setTab(id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition ${
                  tab === id
                    ? (darkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-zinc-900')
                    : (darkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-zinc-500 hover:bg-zinc-100')
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>

          <div className={`p-4 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <label className="cursor-pointer block">
              <input type="file" accept="audio/mp3,audio/*" className="hidden" onChange={handleUpload} />
              <div className="flex items-center justify-center gap-2 bg-white text-zinc-900 py-3 rounded-2xl font-semibold hover:bg-zinc-200 transition">
                <Upload className="w-5 h-5" /> Upload MP3
              </div>
            </label>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:ml-72 flex-1 p-6 md:p-10 pt-16 md:pt-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {tab === 'player' && 'Now Playing'}
                {tab === 'library' && 'Lesson Library'}
                {tab === 'practice' && 'Practice'}
                {tab === 'progress' && 'Your Progress'}
              </h2>
              <p className="text-zinc-400">Talk To Me In Korean • Tweet Edition</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition ${
                darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* ========== PLAYER TAB ========== */}
          {tab === 'player' && (
            <div className="max-w-4xl">
              <div className={`rounded-3xl p-6 md:p-10 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className={`w-full md:w-64 h-48 md:h-64 rounded-3xl flex items-center justify-center text-8xl flex-shrink-0 ${
                    darkMode ? 'bg-zinc-800' : 'bg-zinc-200'
                  }`}>
                    🇰🇷
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-1">{lesson?.title}</h3>
                    <p className="text-zinc-400 mb-6">{lesson?.subtitle}</p>

                    <div className="flex justify-between font-mono text-3xl md:text-5xl tabular-nums mb-4">
                      <span>{formatTime(currentTime)}</span>
                      <span className="text-zinc-500">/ {formatTime(duration)}</span>
                    </div>

                    <input
                      type="range"
                      value={progressPct}
                      onChange={(e) => {
                        if (audioRef.current && duration) {
                          audioRef.current.currentTime = (e.target.value / 100) * duration;
                        }
                      }}
                      className="w-full accent-pink-500 mb-6"
                    />

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-6 md:gap-8">
                      <button
                        onClick={() => setRepeatMode(!repeatMode)}
                        className={`text-2xl transition ${repeatMode ? 'text-pink-500' : 'text-zinc-400 hover:text-white'}`}
                      >
                        <Repeat className="w-6 h-6" />
                      </button>
                      <button onClick={prevTrack} className="text-3xl hover:scale-110 transition">
                        <SkipBack className="w-8 h-8" />
                      </button>
                      <button
                        onClick={togglePlay}
                        className="w-16 h-16 md:w-20 md:h-20 bg-white text-zinc-950 rounded-3xl flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-xl"
                      >
                        {isPlaying ? <Pause size={36} /> : <Play size={36} className="ml-1" />}
                      </button>
                      <button onClick={nextTrack} className="text-3xl hover:scale-110 transition">
                        <SkipForward className="w-8 h-8" />
                      </button>
                    </div>

                    {/* Speed */}
                    <div className="mt-6 flex items-center gap-3 justify-center">
                      <span className="text-xs uppercase tracking-widest text-zinc-500">Speed</span>
                      <div className={`flex gap-1 rounded-3xl p-1 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                        {speeds.map((s) => (
                          <button
                            key={s}
                            onClick={() => setPlaybackRate(s)}
                            className={`px-3 py-1 text-sm rounded-3xl transition ${
                              playbackRate === s
                                ? 'bg-white text-zinc-900 shadow-sm'
                                : ''
                            }`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tweet + heal feed */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                      <button
                        onClick={healFeed}
                        className="flex items-center gap-3 bg-sky-600/20 border border-sky-500/30 text-sky-100 px-6 py-3 rounded-3xl hover:bg-sky-600/30 transition"
                      >
                        <Heart className="w-5 h-5" /> Heal @{X_HANDLE} feed
                      </button>
                      <button
                        onClick={tweetProgress}
                        className="flex items-center gap-3 bg-black border border-white/20 text-white px-6 py-3 rounded-3xl hover:bg-zinc-900 transition"
                      >
                        <Send className="w-5 h-5" /> Post to @{X_HANDLE}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transcript + Vocab + Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className={`rounded-3xl p-8 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                  <h4 className="font-semibold mb-4">Transcript</h4>
                  <pre className="whitespace-pre-wrap text-zinc-300 leading-relaxed text-sm">
                    {lesson?.transcript || 'No transcript available.'}
                  </pre>
                </div>

                <div className="space-y-6">
                  <div className={`rounded-3xl p-8 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                    <h4 className="font-semibold mb-4">Key Vocab</h4>
                    {lesson?.vocab?.length > 0 ? (
                      <div className="space-y-3">
                        {lesson.vocab.map((v, i) => (
                          <div key={i} className={`flex justify-between py-2 border-b last:border-0 ${
                            darkMode ? 'border-zinc-800' : 'border-zinc-200'
                          }`}>
                            <span className="korean text-lg">{v.ko}</span>
                            <span className="text-zinc-400">{v.en}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-500 italic text-sm">No vocabulary for this lesson.</p>
                    )}
                  </div>

                  <div className={`rounded-3xl p-8 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                    <h4 className="font-semibold mb-4">Your Notes</h4>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className={`w-full rounded-2xl p-4 text-sm border-0 focus:ring-2 focus:ring-pink-500 ${
                        darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-zinc-200 text-zinc-900'
                      }`}
                      placeholder="Write your thoughts, new words..."
                    />
                    <button
                      onClick={handleSaveNotes}
                      className={`mt-3 text-xs px-5 py-2 rounded-2xl transition ${
                        darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'
                      }`}
                    >
                      {notesSaved ? 'Saved!' : 'Save Notes'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== LIBRARY TAB ========== */}
          {tab === 'library' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((l, i) => (
                <div
                  key={l.id}
                  onClick={() => loadLesson(i)}
                  className={`rounded-3xl overflow-hidden cursor-pointer transition hover:ring-2 hover:ring-pink-500 ${
                    darkMode ? 'bg-zinc-900' : 'bg-zinc-100'
                  } ${i === currentIdx ? 'ring-2 ring-pink-500' : ''}`}
                >
                  <div className="h-32 bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center text-5xl">
                    🇰🇷
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-sm">{l.title}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{l.subtitle} • {l.duration}</p>
                    {progress.completedLessons.includes(l.id) && (
                      <span className="inline-block mt-2 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========== PRACTICE TAB ========== */}
          {tab === 'practice' && <ShadowingPractice />}

          {/* ========== PROGRESS TAB ========== */}
          {tab === 'progress' && <ProgressDashboard progress={progress} />}
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
