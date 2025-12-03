import React from 'react';
import { useStore } from '../../store/useStore';
import { STRINGS } from '../../i18n/strings.zh-CN';
import { Target } from 'lucide-react';

export const CurrentTaskModule: React.FC = () => {
    const { tasks, activeTaskId } = useStore();
    const activeTask = tasks.find(t => t.id === activeTaskId);

    if (!activeTask) return null;

    return (
        <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg text-white flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
                <Target size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-indigo-200 uppercase mb-1">{STRINGS.modules.currentTask}</div>
                <div className="font-semibold text-lg truncate">{activeTask.title}</div>
            </div>
        </div>
    );
};
