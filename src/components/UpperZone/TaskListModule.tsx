import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { STRINGS } from '../../i18n/strings.zh-CN';
import { Plus, Check, Trash2, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

export const TaskListModule: React.FC = () => {
    const { tasks, addTask, toggleTask, deleteTask, setActiveTask, activeTaskId, settings } = useStore();
    const [input, setInput] = useState('');
    const isDark = settings.darkMode;

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            addTask(input.trim());
            setInput('');
        }
    };

    return (
        <div className={cn(
            "p-4 rounded-2xl shadow-sm border h-full flex flex-col max-h-[300px] transition-all duration-300",
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        )}>
            <h3 className={cn(
                "text-xs font-bold mb-3 uppercase tracking-wider",
                isDark ? "text-gray-400" : "text-gray-400"
            )}>{STRINGS.modules.taskList}</h3>

            <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={STRINGS.tasks.placeholder}
                    className={cn(
                        "flex-1 px-4 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-indigo-300 outline-none text-sm transition-all",
                        isDark 
                            ? "bg-gray-700 text-white placeholder-gray-400 focus:bg-gray-600" 
                            : "bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:shadow-sm"
                    )}
                />
                <button 
                    type="submit" 
                    className="p-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
                >
                    <Plus size={18} />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {tasks.length === 0 && (
                    <div className={cn(
                        "text-center text-sm py-8 flex flex-col items-center gap-2",
                        isDark ? "text-gray-500" : "text-gray-400"
                    )}>
                        <div className="text-3xl mb-1">📝</div>
                        {STRINGS.tasks.empty}
                    </div>
                )}
                {tasks.map((task, index) => (
                    <div 
                        key={task.id} 
                        className={cn(
                            "group flex items-center gap-3 p-3 rounded-xl transition-all animate-fade-in",
                            isDark 
                                ? "hover:bg-gray-700/70" 
                                : "hover:bg-gray-50 hover:shadow-sm",
                            activeTaskId === task.id && (isDark ? "bg-indigo-900/30 border border-indigo-500/30" : "bg-indigo-50 border border-indigo-200")
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <button
                            onClick={() => toggleTask(task.id)}
                            className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                                task.completed 
                                    ? "bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 text-white" 
                                    : (isDark ? "border-gray-500 hover:border-indigo-400" : "border-gray-300 hover:border-indigo-400"),
                                !task.completed && "text-transparent hover:text-indigo-300"
                            )}
                        >
                            <Check size={12} strokeWidth={3} />
                        </button>

                        <span className={cn(
                            "flex-1 text-sm truncate transition-all",
                            task.completed 
                                ? (isDark ? "text-gray-500 line-through" : "text-gray-400 line-through")
                                : (isDark ? "text-gray-200" : "text-gray-700")
                        )}>
                            {task.title}
                        </span>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!task.completed && (
                                <button
                                    onClick={() => setActiveTask(activeTaskId === task.id ? null : task.id)}
                                    className={cn(
                                        "p-1.5 rounded-lg transition-all",
                                        activeTaskId === task.id 
                                            ? "text-indigo-600 bg-indigo-100" 
                                            : (isDark ? "text-gray-400 hover:text-indigo-400 hover:bg-gray-600" : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50")
                                    )}
                                    title={STRINGS.tasks.setFocus}
                                >
                                    <Target size={14} />
                                </button>
                            )}
                            <button
                                onClick={() => deleteTask(task.id)}
                                className={cn(
                                    "p-1.5 rounded-lg transition-all",
                                    isDark 
                                        ? "text-gray-400 hover:text-red-400 hover:bg-red-900/30" 
                                        : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                                )}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
