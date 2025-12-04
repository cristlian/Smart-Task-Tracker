import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { formatTime } from '../../lib/utils';
import { STRINGS } from '../../i18n/strings.zh-CN';
import { Play, Pause, Square, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const THEME_COLORS = {
    indigo: {
        ring: '#6366f1',
        gradient: 'from-indigo-600 to-indigo-500',
        hover: 'hover:from-indigo-700 hover:to-indigo-600',
        shadow: 'shadow-indigo-500/30',
        lightBg: 'bg-indigo-100',
        lightText: 'text-indigo-600',
        darkBg: 'bg-indigo-900/50',
        darkText: 'text-indigo-300',
    },
    blue: {
        ring: '#3b82f6',
        gradient: 'from-blue-600 to-blue-500',
        hover: 'hover:from-blue-700 hover:to-blue-600',
        shadow: 'shadow-blue-500/30',
        lightBg: 'bg-blue-100',
        lightText: 'text-blue-600',
        darkBg: 'bg-blue-900/50',
        darkText: 'text-blue-300',
    },
    purple: {
        ring: '#a855f7',
        gradient: 'from-purple-600 to-purple-500',
        hover: 'hover:from-purple-700 hover:to-purple-600',
        shadow: 'shadow-purple-500/30',
        lightBg: 'bg-purple-100',
        lightText: 'text-purple-600',
        darkBg: 'bg-purple-900/50',
        darkText: 'text-purple-300',
    },
    pink: {
        ring: '#ec4899',
        gradient: 'from-pink-600 to-pink-500',
        hover: 'hover:from-pink-700 hover:to-pink-600',
        shadow: 'shadow-pink-500/30',
        lightBg: 'bg-pink-100',
        lightText: 'text-pink-600',
        darkBg: 'bg-pink-900/50',
        darkText: 'text-pink-300',
    },
    orange: {
        ring: '#f97316',
        gradient: 'from-orange-600 to-orange-500',
        hover: 'hover:from-orange-700 hover:to-orange-600',
        shadow: 'shadow-orange-500/30',
        lightBg: 'bg-orange-100',
        lightText: 'text-orange-600',
        darkBg: 'bg-orange-900/50',
        darkText: 'text-orange-300',
    },
} as const;

type ThemeKey = keyof typeof THEME_COLORS;

export const TimerModule: React.FC = () => {
    const { timer, settings, startTimer, pauseTimer, resumeTimer, stopTimer, tickTimer, confirmCompletion } = useStore();
    const colors = THEME_COLORS[settings.themeColor as ThemeKey] ?? THEME_COLORS.indigo;

    useEffect(() => {
        let interval: number | undefined;
        if (timer.status === 'focusing') {
            interval = window.setInterval(tickTimer, 1000);
        }
        return () => {
            if (interval) {
                window.clearInterval(interval);
            }
        };
    }, [timer.status, tickTimer]);

    const progress = ((timer.duration - timer.timeLeft) / timer.duration) * 100;
    const isDark = settings.darkMode;
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div
            className={cn(
                'p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center h-full min-h-[180px] transition-all duration-300',
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            )}
        >
            <div
                className={cn(
                    'text-xs font-semibold mb-3 uppercase tracking-widest px-3 py-1 rounded-full',
                    timer.mode === 'focus'
                        ? isDark
                            ? `${colors.darkBg} ${colors.darkText}`
                            : `${colors.lightBg} ${colors.lightText}`
                        : isDark
                            ? 'bg-green-900/50 text-green-300'
                            : 'bg-green-100 text-green-600'
                )}
            >
                {timer.mode === 'focus' ? STRINGS.timer.focus : STRINGS.timer.break}
            </div>

            <div className="relative mb-4">
                <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r={radius} fill="none" stroke={isDark ? '#374151' : '#f3f4f6'} strokeWidth="8" />
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke={timer.mode === 'focus' ? colors.ring : '#22c55e'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn('text-4xl font-bold font-mono tabular-nums', isDark ? 'text-white' : 'text-gray-800')}>
                        {formatTime(timer.timeLeft)}
                    </span>
                </div>
            </div>

            <div className="flex gap-3">
                {timer.status === 'idle' && (
                    <button
                        onClick={startTimer}
                        className={cn(
                            'flex items-center px-5 py-2.5 bg-gradient-to-r text-white rounded-xl transition-all shadow-lg font-medium',
                            colors.gradient,
                            colors.hover,
                            colors.shadow
                        )}
                    >
                        <Play size={18} className="mr-2" fill="currentColor" /> {STRINGS.timer.start}
                    </button>
                )}

                {timer.status === 'focusing' && (
                    <button
                        onClick={pauseTimer}
                        className={cn(
                            'flex items-center px-5 py-2.5 rounded-xl transition-all font-medium',
                            isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                    >
                        <Pause size={18} className="mr-2" /> {STRINGS.timer.pause}
                    </button>
                )}

                {timer.status === 'paused' && (
                    <>
                        <button
                            onClick={resumeTimer}
                            className={cn(
                                'flex items-center px-5 py-2.5 bg-gradient-to-r text-white rounded-xl transition-all shadow-lg font-medium',
                                colors.gradient,
                                colors.hover,
                                colors.shadow
                            )}
                        >
                            <Play size={18} className="mr-2" fill="currentColor" /> {STRINGS.timer.resume}
                        </button>
                        <button
                            onClick={stopTimer}
                            className="flex items-center px-5 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-medium border border-red-200"
                        >
                            <Square size={18} className="mr-2" /> {STRINGS.timer.stop}
                        </button>
                    </>
                )}

                {timer.status === 'completed' && (
                    <button
                        onClick={confirmCompletion}
                        className="flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30 animate-pulse-soft font-medium"
                    >
                        <CheckCircle size={18} className="mr-2" /> {STRINGS.msg.sessionCompleted}
                    </button>
                )}
            </div>
        </div>
    );
};
