import React from 'react';
import { useStore } from '../../store/useStore';
import { STRINGS } from '../../i18n/strings.zh-CN';
import { Target, X } from 'lucide-react';
import { cn } from '../../lib/utils';

// Theme color mapping for gradient
const THEME_GRADIENTS = {
    indigo: 'from-indigo-600 to-indigo-500 shadow-indigo-500/20',
    blue: 'from-blue-600 to-blue-500 shadow-blue-500/20',
    purple: 'from-purple-600 to-purple-500 shadow-purple-500/20',
    pink: 'from-pink-600 to-pink-500 shadow-pink-500/20',
    orange: 'from-orange-600 to-orange-500 shadow-orange-500/20',
};

export const CurrentTaskModule: React.FC = () => {
    const { tasks, activeTaskId, setActiveTask, settings } = useStore();
    const activeTask = tasks.find(t => t.id === activeTaskId);
    const gradient = THEME_GRADIENTS[settings.themeColor] || THEME_GRADIENTS.indigo;

    if (!activeTask) return null;

    const handleClearFocus = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveTask(null);
    };

    return (
        <div className={cn(
            "bg-gradient-to-r p-4 rounded-2xl shadow-lg text-white flex items-center gap-4 relative group animate-slide-up",
            gradient
        )}>
            <button 
                onClick={handleClearFocus}
                className="p-3 bg-white/15 rounded-xl hover:bg-white/25 transition-all cursor-pointer backdrop-blur-sm"
                title="取消当前聚焦"
            >
                <Target size={24} className="text-white" />
            </button>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white/70 uppercase tracking-wider mb-0.5">{STRINGS.modules.currentTask}</div>
                <div className="font-semibold text-lg truncate">{activeTask.title}</div>
            </div>
            <button 
                onClick={handleClearFocus}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 transition-all opacity-0 group-hover:opacity-100"
                title="取消当前聚焦"
            >
                <X size={16} className="text-white" />
            </button>
        </div>
    );
};
