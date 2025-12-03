import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, TimerState, AppSettings, ModuleConfig, TaskCategory, UserStats, Achievement } from '../types';
import { generateId } from '../lib/utils';

const DEFAULT_MODULES: ModuleConfig[] = [
    { id: 'timer', visible: true, order: 0 },
    { id: 'current-task', visible: true, order: 1 },
    { id: 'task-list', visible: true, order: 2 },
];

const DEFAULT_SETTINGS: AppSettings = {
    focusDuration: 25,
    breakDuration: 5,
    modules: DEFAULT_MODULES,
    soundEnabled: true,
    soundVolume: 50,
    notificationEnabled: true,
    vibrationEnabled: true,
    darkMode: false,
    themeColor: 'indigo',
};

const DEFAULT_TIMER: TimerState = {
    mode: 'focus',
    timeLeft: 25 * 60,
    duration: 25 * 60,
    status: 'idle',
};

const DEFAULT_STATS: UserStats = {
    totalFocusMinutes: 0,
    completedTasksCount: 0,
    consecutiveDays: 0,
    lastFocusDate: null,
    dailyHistory: {},
    categoryDistribution: {
        work: 0,
        study: 0,
        reading: 0,
        other: 0
    }
};

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
    { id: 'focus_master', title: '专注大师', description: '连续专注7天', unlocked: false, icon: '🏆' },
    { id: 'task_master', title: '任务达人', description: '累计完成20个任务', unlocked: false, icon: '✅' },
    { id: 'time_guardian', title: '时光守护者', description: '累计专注100小时', unlocked: false, icon: '⭐' },
];

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            tasks: [],
            activeTaskId: null,
            focusProjectName: null,
            petAwakeSince: null,
            isPaused: false,
            costume: null,
            timer: DEFAULT_TIMER,
            settings: DEFAULT_SETTINGS,
            stats: DEFAULT_STATS,
            achievements: DEFAULT_ACHIEVEMENTS,

            addTask: (title: string, category: TaskCategory = 'other') => set((state) => ({
                tasks: [...state.tasks, { id: generateId(), title, completed: false, createdAt: Date.now(), category }]
            })),

            toggleTask: (id: string) => set((state) => {
                const task = state.tasks.find(t => t.id === id);
                if (!task) return state;
                
                const newCompleted = !task.completed;
                const newCount = newCompleted ? (state.stats?.completedTasksCount || 0) + 1 : (state.stats?.completedTasksCount || 0) - 1;
                
                // Check achievement: Task Master
                let newAchievements = state.achievements || DEFAULT_ACHIEVEMENTS;
                if (newCompleted && newCount >= 20) {
                     newAchievements = newAchievements.map(a => 
                        a.id === 'task_master' && !a.unlocked ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
                    );
                }

                return {
                    tasks: state.tasks.map(t => t.id === id ? { ...t, completed: newCompleted } : t),
                    stats: { ...(state.stats || DEFAULT_STATS), completedTasksCount: newCount },
                    achievements: newAchievements
                };
            }),

            deleteTask: (id: string) => set((state) => ({
                tasks: state.tasks.filter(t => t.id !== id),
                activeTaskId: state.activeTaskId === id ? null : state.activeTaskId
            })),

            setActiveTask: (id: string | null) => set({ activeTaskId: id }),
            setFocusProjectName: (name: string | null) => set({ focusProjectName: name }),
            setPetAwakeSince: (time: number | null) => set({ petAwakeSince: time }),
            setIsPaused: (paused: boolean) => set({ isPaused: paused }),
            setCostume: (costume: string | null) => set({ costume }),

            updateModuleConfig: (modules: ModuleConfig[]) => set((state) => ({
                settings: { ...state.settings, modules }
            })),

            updateSettings: (newSettings) => set((state) => ({
                settings: { ...state.settings, ...newSettings }
            })),

            resetAllData: () => set({
                tasks: [],
                activeTaskId: null,
                focusProjectName: null,
                petAwakeSince: null,
                isPaused: false,
                costume: null,
                timer: DEFAULT_TIMER,
                settings: DEFAULT_SETTINGS,
                stats: DEFAULT_STATS,
                achievements: DEFAULT_ACHIEVEMENTS,
            }),

            startTimer: () => set((state) => {
                const duration = state.timer.mode === 'focus'
                    ? state.settings.focusDuration * 60
                    : state.settings.breakDuration * 60;
                return {
                    timer: { ...state.timer, status: 'focusing', duration, timeLeft: duration }
                };
            }),

            pauseTimer: () => set((state) => ({
                timer: { ...state.timer, status: 'paused' }
            })),

            resumeTimer: () => set((state) => ({
                timer: { ...state.timer, status: 'focusing' }
            })),

            stopTimer: () => set((state) => ({
                timer: { ...DEFAULT_TIMER, mode: 'focus', timeLeft: state.settings.focusDuration * 60 }
            })),

            tickTimer: () => {
                const { timer } = get();
                if (timer.status !== 'focusing') return;

                if (timer.timeLeft <= 1) {
                    set({ timer: { ...timer, timeLeft: 0, status: 'completed' } });
                } else {
                    set({ timer: { ...timer, timeLeft: timer.timeLeft - 1 } });
                }
            },

            completeSession: () => set((state) => ({
                timer: { ...state.timer, status: 'completed' }
            })),

            confirmCompletion: () => set((state) => {
                // Only update stats if it was a focus session
                let newStats = { ...(state.stats || DEFAULT_STATS) };
                let newAchievements = [...(state.achievements || DEFAULT_ACHIEVEMENTS)];

                if (state.timer.mode === 'focus') {
                    const minutes = state.settings.focusDuration;
                    const today = getTodayString();
                    
                    // 1. Total Focus Time
                    newStats.totalFocusMinutes += minutes;

                    // 2. Daily History
                    newStats.dailyHistory = {
                        ...newStats.dailyHistory,
                        [today]: (newStats.dailyHistory[today] || 0) + minutes
                    };

                    // 3. Category Distribution
                    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
                    const category = activeTask ? activeTask.category : 'other';
                    newStats.categoryDistribution = {
                        ...newStats.categoryDistribution,
                        [category]: (newStats.categoryDistribution[category] || 0) + minutes
                    };

                    // 4. Consecutive Days
                    if (newStats.lastFocusDate !== today) {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        const yesterdayString = yesterday.toISOString().split('T')[0];

                        if (newStats.lastFocusDate === yesterdayString) {
                            newStats.consecutiveDays += 1;
                        } else {
                            newStats.consecutiveDays = 1;
                        }
                        newStats.lastFocusDate = today;
                    }

                    // 5. Check Achievements
                    // Focus Master (7 days)
                    if (newStats.consecutiveDays >= 7) {
                         newAchievements = newAchievements.map(a => 
                            a.id === 'focus_master' && !a.unlocked ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
                        );
                    }
                    // Time Guardian (100 hours = 6000 minutes)
                    if (newStats.totalFocusMinutes >= 6000) {
                         newAchievements = newAchievements.map(a => 
                            a.id === 'time_guardian' && !a.unlocked ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
                        );
                    }
                }

                // Switch modes
                const nextMode = state.timer.mode === 'focus' ? 'break' : 'focus';
                const nextDuration = nextMode === 'focus' ? state.settings.focusDuration : state.settings.breakDuration;
                
                return {
                    stats: newStats,
                    achievements: newAchievements,
                    timer: {
                        mode: nextMode,
                        status: 'idle',
                        duration: nextDuration * 60,
                        timeLeft: nextDuration * 60
                    }
                };
            }),
        }),
        {
            name: 'figurine-focus-storage',
            version: 1,
            migrate: (persistedState: any, version) => {
                if (version === 0) {
                    return {
                        ...persistedState,
                        stats: DEFAULT_STATS,
                        achievements: DEFAULT_ACHIEVEMENTS
                    };
                }
                return persistedState;
            },
            partialize: (state) => ({
                tasks: state.tasks,
                settings: state.settings,
                stats: state.stats,
                achievements: state.achievements,
                costume: state.costume
            }),
        }
    )
);
