import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { STRINGS } from '../../i18n/strings.zh-CN';
import { Plus, Check, Trash2, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

export const TaskListModule: React.FC = () => {
    const { tasks, addTask, toggleTask, deleteTask, setActiveTask, activeTaskId } = useStore();
    const [input, setInput] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            addTask(input.trim());
            setInput('');
        }
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col max-h-[300px]">
            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase">{STRINGS.modules.taskList}</h3>

            <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={STRINGS.tasks.placeholder}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                />
                <button type="submit" className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200">
                    <Plus size={18} />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {tasks.length === 0 && (
                    <div className="text-center text-gray-400 text-sm py-4">{STRINGS.tasks.empty}</div>
                )}
                {tasks.map(task => (
                    <div key={task.id} className="group flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <button
                            onClick={() => toggleTask(task.id)}
                            className={cn(
                                "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                                task.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 text-transparent hover:border-indigo-400"
                            )}
                        >
                            <Check size={12} strokeWidth={3} />
                        </button>

                        <span className={cn("flex-1 text-sm truncate", task.completed && "text-gray-400 line-through")}>
                            {task.title}
                        </span>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!task.completed && (
                                <button
                                    onClick={() => setActiveTask(task.id)}
                                    className={cn("p-1 rounded hover:bg-indigo-100", activeTaskId === task.id ? "text-indigo-600" : "text-gray-400")}
                                    title={STRINGS.tasks.setFocus}
                                >
                                    <Target size={14} />
                                </button>
                            )}
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
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
