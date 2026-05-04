import { useState, useEffect } from 'react';

interface AppState {
  completedDays: number[];
  exercises: Record<string, boolean>;
  meals: Record<string, boolean>;
  activeDay: number;
}

const defaultState: AppState = {
  completedDays: [],
  exercises: {},
  meals: {},
  activeDay: 1,
};

export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem('armplan_state');
      return stored ? JSON.parse(stored) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem('armplan_state', JSON.stringify(state));
  }, [state]);

  const toggleExercise = (key: string) => {
    setState(s => ({
      ...s,
      exercises: { ...s.exercises, [key]: !s.exercises[key] }
    }));
  };

  const toggleMeal = (key: string) => {
    setState(s => ({
      ...s,
      meals: { ...s.meals, [key]: !s.meals[key] }
    }));
  };

  const toggleDayComplete = (day: number) => {
    setState(s => {
      const completed = s.completedDays.includes(day)
        ? s.completedDays.filter(d => d !== day)
        : [...s.completedDays, day];
      return { ...s, completedDays: completed };
    });
  };

  const setActiveDay = (day: number) => {
    setState(s => ({ ...s, activeDay: day }));
  };

  return {
    state,
    toggleExercise,
    toggleMeal,
    toggleDayComplete,
    setActiveDay,
  };
}