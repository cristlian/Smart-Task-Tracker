import React from 'react';
import { KPICards } from '../components/Data/KPICards';
import { WeeklyChart } from '../components/Data/WeeklyChart';
import { MonthlyChart } from '../components/Data/MonthlyChart';
import { TaskDistribution } from '../components/Data/TaskDistribution';
import { RecentAchievements } from '../components/Data/RecentAchievements';

export const DataPage: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
            <div className="p-6 pt-8 pb-6">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">数据统计</h1>
                    <p className="text-sm text-gray-500 mt-1">专注成长轨迹</p>
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
