import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';
import { TaskCategory } from '../../types';
import { cn } from '../../lib/utils';

const COLORS = {
    study: '#fb923c', // Orange
    work: '#60a5fa',  // Blue
    reading: '#4ade80', // Green
    other: '#9ca3af'  // Gray
};

const LABELS: Record<TaskCategory, string> = {
    study: '学习',
    work: '工作',
    reading: '阅读',
    other: '其他'
};

export const TaskDistribution: React.FC = () => {
    const { stats, settings } = useStore();
    const isDark = settings.darkMode;
    
    const distribution = stats?.categoryDistribution || { work: 0, study: 0, reading: 0, other: 0 };

    const data = Object.entries(distribution).map(([key, value]) => ({
        name: LABELS[key as TaskCategory],
        value: value,
        key: key as TaskCategory
    })).filter(d => d.value > 0);

    // If empty, show placeholder
    const isEmpty = data.length === 0;
    const displayData = isEmpty ? [{ name: '无数据', value: 1, key: 'other' }] : data;

    return (
        <div className={cn(
            "p-6 rounded-2xl shadow-sm border mb-6 transition-colors duration-300",
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        )}>
            <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-white" : "text-gray-800")}>任务分布</h3>
            <div className="flex items-center">
                <div className="h-40 w-40 relative shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={displayData}
                                innerRadius={40}
                                outerRadius={70}
                                paddingAngle={isEmpty ? 0 : 5}
                                dataKey="value"
                                stroke="none"
                            >
                                {displayData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={isEmpty ? (isDark ? '#374151' : '#f3f4f6') : COLORS[entry.key as TaskCategory]} 
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="flex-1 pl-6 space-y-3">
                    {isEmpty ? (
                        <div className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-400")}>暂无数据</div>
                    ) : (
                        data.map(item => {
                            const total = data.reduce((acc, cur) => acc + cur.value, 0);
                            const percent = Math.round((item.value / total) * 100);
                            return (
                                <div key={item.key} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[item.key as TaskCategory] }} />
                                        <span className={cn(isDark ? "text-gray-400" : "text-gray-600")}>{item.name}</span>
                                    </div>
                                    <span className={cn("font-bold", isDark ? "text-white" : "text-gray-800")}>{percent}%</span>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};
