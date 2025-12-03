import React from 'react';
import { useStore } from '../../store/useStore';
import { Clock, CheckCircle2, TrendingUp, Medal } from 'lucide-react';

export const KPICards: React.FC = () => {
    const { stats } = useStore();

    const totalHours = (stats.totalFocusMinutes / 60).toFixed(1);
    const level = Math.floor(stats.totalFocusMinutes / 60 / 5) + 1;

    const cards = [
        {
            icon: <Clock className="text-blue-500" size={24} />,
            label: "总专注时间",
            value: `${totalHours}小时`,
            bg: "bg-blue-50"
        },
        {
            icon: <CheckCircle2 className="text-green-500" size={24} />,
            label: "完成任务",
            value: `${stats.completedTasksCount}个`,
            bg: "bg-green-50"
        },
        {
            icon: <TrendingUp className="text-orange-500" size={24} />,
            label: "连续天数",
            value: `${stats.consecutiveDays}天`,
            bg: "bg-orange-50"
        },
        {
            icon: <Medal className="text-purple-500" size={24} />,
            label: "专注等级",
            value: `Lv.${level}`,
            bg: "bg-purple-50"
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            {cards.map((card, index) => (
                <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                    <div className={`w-10 h-10 rounded-full ${card.bg} flex items-center justify-center`}>
                        {card.icon}
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 mb-1">{card.label}</div>
                        <div className="text-lg font-bold text-gray-800">{card.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
