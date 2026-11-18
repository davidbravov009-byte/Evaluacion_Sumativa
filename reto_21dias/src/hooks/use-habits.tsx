import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type Habit = {
  id: string;
  title: string;
  description: string;
  icon: 'code' | 'book' | 'exercise' | 'water';
  color: string;
};

export type DailyTask = {
  id: string;
  subject: string;
  title: string;
  duration: string;
  color: string;
};

export type HabitCompletions = Record<number, Record<string, boolean>>;
export type TaskCompletions = Record<number, Record<string, boolean>>;

export const HABITS: Habit[] = [
  { id: 'study', title: 'Estudiar programación', description: 'Una sesión enfocada de aprendizaje', icon: 'code', color: '#5B67F1' },
  { id: 'read', title: 'Leer 20 minutos', description: 'Avanzar en un libro o artículo', icon: 'book', color: '#F59E0B' },
  { id: 'exercise', title: 'Ejercicio físico', description: 'Mover el cuerpo al menos 30 minutos', icon: 'exercise', color: '#EF6A67' },
  { id: 'water', title: 'Beber agua', description: 'Completar la meta diaria de hidratación', icon: 'water', color: '#38A3A5' },
];

export const DAY_PLAN: Record<number, DailyTask[]> = {};

const subjects = ['Programación', 'Matemáticas', 'Idiomas', 'Proyecto', 'Lectura'];
const taskTitles = [
  'Repasar conceptos y tomar apuntes',
  'Resolver ejercicios prácticos',
  'Practicar vocabulario y conversación',
  'Avanzar el proyecto personal',
  'Leer y resumir ideas principales',
];
const durations = ['25 min', '40 min', '20 min', '35 min', '20 min'];
const colors = ['#5B67F1', '#EF6A67', '#38A3A5', '#F59E0B', '#7C64C8'];

for (let day = 1; day <= 21; day += 1) {
  DAY_PLAN[day] = subjects.map((subject, index) => ({
    id: `${day}-${index}`,
    subject,
    title: taskTitles[(day - 1 + index) % taskTitles.length],
    duration: durations[index],
    color: colors[index],
  }));
}

type HabitsContextValue = {
  habits: Habit[];
  completions: HabitCompletions;
  taskCompletions: TaskCompletions;
  dayPlan: Record<number, DailyTask[]>;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  toggleHabit: (habitId: string, day?: number) => void;
  isHabitCompleted: (habitId: string, day?: number) => boolean;
  toggleTask: (taskId: string, day?: number) => void;
  isTaskCompleted: (taskId: string, day?: number) => boolean;
  completedCount: number;
  dailyProgress: number;
  taskCompletedCount: number;
  taskProgress: number;
  totalCompleted: number;
  challengeProgress: number;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

export function HabitsProvider({ children }: PropsWithChildren) {
  const [currentDay, setCurrentDay] = useState(1);
  const [completions, setCompletions] = useState<HabitCompletions>({
    1: { study: true, read: true, exercise: false, water: true },
  });
  const [taskCompletions, setTaskCompletions] = useState<TaskCompletions>({
    1: { '1-0': true, '1-1': true, '1-2': false, '1-3': false, '1-4': true },
  });

  const toggleHabit = useCallback((habitId: string, day = currentDay) => {
    setCompletions((previous) => ({
      ...previous,
      [day]: { ...previous[day], [habitId]: !previous[day]?.[habitId] },
    }));
  }, [currentDay]);

  const isHabitCompleted = useCallback(
    (habitId: string, day = currentDay) => Boolean(completions[day]?.[habitId]),
    [completions, currentDay],
  );

  const toggleTask = useCallback((taskId: string, day = currentDay) => {
    setTaskCompletions((previous) => ({
      ...previous,
      [day]: { ...previous[day], [taskId]: !previous[day]?.[taskId] },
    }));
  }, [currentDay]);

  const isTaskCompleted = useCallback(
    (taskId: string, day = currentDay) => Boolean(taskCompletions[day]?.[taskId]),
    [taskCompletions, currentDay],
  );

  const completedCount = HABITS.filter((habit) => isHabitCompleted(habit.id)).length;
  const dailyProgress = Math.round((completedCount / HABITS.length) * 100);
  const currentTasks = DAY_PLAN[currentDay];
  const taskCompletedCount = currentTasks.filter((task) => isTaskCompleted(task.id)).length;
  const taskProgress = Math.round((taskCompletedCount / currentTasks.length) * 100);
  const totalCompleted = Object.values(completions).reduce(
    (total, day) => total + Object.values(day).filter(Boolean).length,
    0,
  );
  const challengeProgress = Math.round((totalCompleted / (21 * HABITS.length)) * 100);

  const value = useMemo(() => ({
    habits: HABITS,
    completions,
    taskCompletions,
    dayPlan: DAY_PLAN,
    currentDay,
    setCurrentDay,
    toggleHabit,
    isHabitCompleted,
    toggleTask,
    isTaskCompleted,
    completedCount,
    dailyProgress,
    taskCompletedCount,
    taskProgress,
    totalCompleted,
    challengeProgress,
  }), [completions, taskCompletions, currentDay, toggleHabit, isHabitCompleted, toggleTask, isTaskCompleted, completedCount, dailyProgress, taskCompletedCount, taskProgress, totalCompleted, challengeProgress]);

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) throw new Error('useHabits must be used inside HabitsProvider');
  return context;
}
