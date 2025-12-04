import React from 'react';
import { KPICards } from '../components/Data/KPICards';
import { WeeklyChart } from '../components/Data/WeeklyChart';
import { MonthlyChart } from '../components/Data/MonthlyChart';
import { TaskDistribution } from '../components/Data/TaskDistribution';
import { RecentAchievements } from '../components/Data/RecentAchievements';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export const DataPage: React.FC = () => {
    const { settings } = useStore();
    const isDark = settings.darkMode;

    return (
        <div className={cn(
            "flex flex-col h-full overflow-y-auto transition-colors duration-300",
            isDark ? "bg-gray-900" : "bg-gray-50"
        )}>
            <div className="p-6 pt-8 pb-6">
                <div className="text-center mb-8">
                    <h1 className={cn(
                        "text-2xl font-bold",
                        isDark ? "text-white" : "text-gray-800"
                    )}>数据统计</h1>
                    <p className={cn(
                        "text-sm mt-1",
                        isDark ? "text-gray-400" : "text-gray-500"
                    )}>专注成长轨迹</p>
                </div>

                <KPICards />
                <WeeklyChart />
                <MonthlyChart />
                <TaskDistribution />
                <RecentAchievements />
            </div>
        </div>
    );
};
