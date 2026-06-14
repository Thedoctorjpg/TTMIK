import { useState, useEffect, useRef, useMemo } from 'react';
import { Mic, RotateCcw } from 'lucide-react';

const defaultPhrases = [
  { ko: "안녕하세요! 만나서 반가워요.", en: "Hello! Nice to meet you." },
  { ko: "오늘 날씨가 정말 좋네요.", en: "The weather is really nice today." },
  { ko: "커피 한 잔 마실까요?", en: "Shall we have a cup of coffee?" },
  { ko: "이거 얼마예요?", en: "How much is this?" },
  { ko: "화장실이 어디예요?", en: "Where is the bathroom?" },
  { ko: "한국어를 배우고 있어요.", en: "I'm learning Korean." },
  { ko: "다시 한 번 말해 주세요.", en: "Please say it one more time." },
  { ko: "맛있어요!", en: "It's delicious!" },
];

export default function ShadowingPractice({ lessonVocab = [] }) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const intervalRef = useRef(null);

  const phrases = useMemo(() => {
    if (lessonVocab.length > 0) return [...lessonVocab, ...defaultPhrases];
    return defaultPhrases;
  }, [lessonVocab]);

  const phrase = phrases[index % phrases.length];

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setShowEnglish(false);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, phrases.length]);

  const toggle = () => setRunning((r) => !r);
  const reset = () => {
    setRunning(false);
    setIndex(0);
    setShowEnglish(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-zinc-900 rounded-3xl p-12 text-center">
        <h3 className="text-3xl font-semibold mb-2">Shadowing Practice</h3>
        <p className="text-zinc-400 mb-4">Listen → Repeat → Check</p>

        {lessonVocab.length > 0 && (
          <p className="text-xs text-pink-400 mb-6">
            Practicing vocab from current lesson + general phrases
          </p>
        )}

        <div className="bg-zinc-800 rounded-2xl p-8 mb-8 min-h-[160px] flex flex-col items-center justify-center">
          <div className="korean text-3xl mb-4">{phrase.ko}</div>
          {showEnglish ? (
            <div className="text-zinc-400 text-lg">{phrase.en}</div>
          ) : (
            <button
              onClick={() => setShowEnglish(true)}
              className="text-sm text-pink-400 hover:text-pink-300"
            >
              Show translation
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggle}
            className="flex-1 py-6 bg-gradient-to-r from-pink-500 to-violet-500 rounded-3xl text-xl font-bold hover:brightness-110 transition flex items-center justify-center gap-3"
          >
            <Mic className="w-6 h-6" />
            {running ? 'Pause' : 'Start Shadowing'}
          </button>
          <button
            onClick={reset}
            className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center hover:bg-zinc-700 transition"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {phrases.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); setShowEnglish(false); }}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? 'bg-pink-500' : 'bg-zinc-700'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-zinc-500 mt-6">
          Phrase {(index % phrases.length) + 1} / {phrases.length}
        </p>
      </div>
    </div>
  );
}
