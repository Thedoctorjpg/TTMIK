import { Flame, Clock, BookOpen, CheckCircle } from 'lucide-react';

export default function ProgressDashboard({ progress, lessons = [] }) {
  const hours = (progress.totalSeconds / 3600).toFixed(1);
  const completed = lessons.filter((l) => progress.completedLessons.includes(l.id));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-orange-400" />
            <h3 className="font-semibold text-xl">Listening Streak</h3>
          </div>
          <div className="text-7xl font-bold text-emerald-400">{progress.streak}</div>
          <p className="text-zinc-400 mt-2">days in a row</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-xl">Total Hours</h3>
          </div>
          <div className="text-7xl font-bold">{hours}</div>
          <p className="text-zinc-400 mt-2">hours practiced</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-pink-400" />
            <h3 className="font-semibold text-xl">Lessons Played</h3>
          </div>
          <div className="text-7xl font-bold text-pink-400">{progress.lessonsPlayed}</div>
          <p className="text-zinc-400 mt-2">total lessons</p>
        </div>
      </div>

      {completed.length > 0 && (
        <div className="mt-8 bg-zinc-900 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h3 className="font-semibold text-xl">Completed Lessons</h3>
            <span className="text-sm text-zinc-500">({completed.length})</span>
          </div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {completed.map((l) => (
              <div key={l.id} className="flex items-center gap-3 py-2 border-b border-zinc-800 last:border-0">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">{l.title}</span>
                <span className="text-xs text-zinc-500 ml-auto">{l.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
