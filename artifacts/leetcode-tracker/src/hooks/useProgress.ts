import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "lc-mastery-completed";

function loadCompleted(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as number[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function saveCompleted(set: Set<number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function useProgress() {
  const [completed, setCompleted] = useState<Set<number>>(() => loadCompleted());

  useEffect(() => {
    saveCompleted(completed);
  }, [completed]);

  const toggle = useCallback((id: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (id: number) => completed.has(id),
    [completed]
  );

  const completedCount = completed.size;

  return { completed, toggle, isCompleted, completedCount };
}
