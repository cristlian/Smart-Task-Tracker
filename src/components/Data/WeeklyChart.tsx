import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export const WeeklyChart: React.FC = () => {
    const { stats, settings } = useStore();
    const isDark = settings.darkMode;
    
    // Generate data for current week (Mon-Sun)
    const current = new Date();
    const day = current.getDay(); // 0 is Sun, 1 is Mon
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(current.setDate(diff));
    
    const data = [];
    const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const minutes = stats.dailyHistory[dateStr] || 0;
        
        data.push({
            name: weekDays[i],
            minutes: minutes,
            date: dateStr
        });
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className={cn(
                    "p-2 shadow-lg rounded-lg border text-xs",
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                )}>
                    <p className={cn("font-bold", isDark ? "text-gray-200" : "text-gray-700")}>{label}</p>
                    <p className="text-orange-500">{payload[0].value} 分钟</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={cn(
            "p-6 rounded-2xl shadow-sm border mb-6 transition-colors duration-300",
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        )}>
            <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-white" : "text-gray-800")}>本周专注时长</h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={24}>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: isDark ? '#9ca3af' : '#9ca3af' }} 
                            dy={10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="minutes" radius={[4, 4, 4, 4]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.minutes > 0 ? '#fb923c' : (isDark ? '#374151' : '#e5e7eb')} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
