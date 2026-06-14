import { Flame, Clock, BookOpen } from 'lucide-react';

export default function ProgressDashboard({ progress }) {
  const hours = (progress.totalSeconds / 3600).toFixed(1);

  return (
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
  );
}
