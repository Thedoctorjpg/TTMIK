import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ttmik_tweet_progress';

function loadFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultProgress();
  } catch {
    return defaultProgress();
  }
}

function defaultProgress() {
  return {
    streak: 0,
    totalSeconds: 0,
    lessonsPlayed: 0,
    lastDate: null,
    notes: {},
    completedLessons: [],
  };
}

export function useProgress() {
  const [progress, setProgress] = useState(loadFromStorage);

  const persist = useCallback((updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const recordSession = useCallback((durationSeconds) => {
    persist((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let streak = prev.streak;
      if (prev.lastDate === today) {
        // already counted
      } else if (prev.lastDate === yesterday) {
        streak += 1;
      } else {
        streak = 1;
      }
      return {
        ...prev,
        streak,
        totalSeconds: prev.totalSeconds + durationSeconds,
        lessonsPlayed: prev.lessonsPlayed + 1,
        lastDate: today,
      };
    });
  }, [persist]);

  const saveNotes = useCallback((lessonId, text) => {
    persist((prev) => ({
      ...prev,
      notes: { ...prev.notes, [lessonId]: text },
    }));
  }, [persist]);

  const getNotesForLesson = useCallback((lessonId) => {
    return progress.notes[lessonId] || '';
  }, [progress.notes]);

  const markLessonComplete = useCallback((lessonId) => {
    persist((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  }, [persist]);

  return {
    progress,
    recordSession,
    saveNotes,
    getNotesForLesson,
    markLessonComplete,
  };
}
