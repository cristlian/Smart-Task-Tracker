import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export const MonthlyChart: React.FC = () => {
    const { stats, settings } = useStore();
    const isDark = settings.darkMode;
    
    // Generate data for last 4 weeks (Week 1 = 3 weeks ago, Week 4 = This week)
    const data = [];
    const current = new Date();
    
    // i=3 (3 weeks ago) to i=0 (this week)
    for (let i = 3; i >= 0; i--) {
        let totalMinutes = 0;
        // Sum 7 days for this week chunk
        for (let j = 0; j < 7; j++) {
            const d = new Date(current);
            // Calculate date: Today - (WeeksAgo * 7) - DayOffset
            // Example: i=0 (This week). j=0 (Today). j=6 (6 days ago).
            d.setDate(current.getDate() - (i * 7) - j);
            const dateStr = d.toISOString().split('T')[0];
            totalMinutes += stats.dailyHistory[dateStr] || 0;
        }
        
        data.push({
            minutes: totalMinutes,
        });
    }
    
    const chartData = data.map((d, index) => ({
        ...d,
        name: `第${index + 1}周`
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className={cn(
                    "p-2 shadow-lg rounded-lg border text-xs",
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                )}>
                    <p className={cn("font-bold", isDark ? "text-gray-200" : "text-gray-700")}>{label}</p>
                    <p className="text-blue-500">{payload[0].value} 分钟</p>
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
            <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-white" : "text-gray-800")}>月度趋势</h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#f3f4f6'} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: '#9ca3af' }} 
                            dy={10}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                            type="monotone" 
                            dataKey="minutes" 
                            stroke="#60a5fa" 
                            strokeWidth={3} 
                            dot={{ r: 4, fill: '#60a5fa', strokeWidth: 2, stroke: isDark ? '#1f2937' : '#fff' }} 
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
