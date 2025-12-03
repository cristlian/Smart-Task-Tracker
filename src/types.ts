export type TimerMode = 'focus' | 'break';
export type AppStatus = 'idle' | 'focusing' | 'paused' | 'break' | 'completed';
export type TaskCategory = 'work' | 'study' | 'reading' | 'other';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
    category: TaskCategory;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    unlocked: boolean;
    unlockedAt?: number;
    icon: string;
}

export interface UserStats {
    totalFocusMinutes: number;
    completedTasksCount: number;
    consecutiveDays: number;
    lastFocusDate: string | null;
    dailyHistory: Record<string, number>; // YYYY-MM-DD -> minutes
    categoryDistribution: Record<TaskCategory, number>;
}

export interface TimerState {
    mode: TimerMode;
    timeLeft: number;
    duration: number;
    status: AppStatus;
}

export interface ModuleConfig {
    id: string;
    visible: boolean;
    order: number;
}

export interface AppSettings {
    focusDuration: number;
    breakDuration: number;
    modules: ModuleConfig[];
    soundEnabled: boolean;
    soundVolume: number;
    notificationEnabled: boolean;
    vibrationEnabled: boolean;
    darkMode: boolean;
    themeColor: 'indigo' | 'blue' | 'purple' | 'pink' | 'orange';
}

export interface AppState {
    tasks: Task[];
    activeTaskId: string | null;
    focusProjectName: string | null;
    petAwakeSince: number | null;
    isPaused: boolean;
    costume: string | null;
    timer: TimerState;
    settings: AppSettings;
    stats: UserStats;
    achievements: Achievement[];

    // Task actions
    addTask: (title: string, category?: TaskCategory) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    setActiveTask: (id: string | null) => void;

    // Focus actions
    setFocusProjectName: (name: string | null) => void;
    setPetAwakeSince: (time: number | null) => void;
    setIsPaused: (paused: boolean) => void;
    setCostume: (costume: string | null) => void;

    // Settings actions
    updateModuleConfig: (modules: ModuleConfig[]) => void;
    updateSettings: (settings: Partial<AppSettings>) => void;
    resetAllData: () => void;

    // Timer actions
    startTimer: () => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    stopTimer: () => void;
    tickTimer: () => void;
    completeSession: () => void;
    confirmCompletion: () => void;
}
