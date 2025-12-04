import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

export const RecentAchievements: React.FC = () => {
    const { achievements, settings } = useStore();
    const isDark = settings.darkMode;
    
    // Sort: Unlocked first, then by id
    const sorted = [...(achievements || [])].sort((a, b) => {
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        return 0;
    });

    if (sorted.length === 0) return null;

    return (
        <div className={cn(
            "p-6 rounded-2xl shadow-sm border mb-6 transition-colors duration-300",
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        )}>
            <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-white" : "text-gray-800")}>最近成就</h3>
            <div className="space-y-4">
                {sorted.map(achievement => (
                    <div key={achievement.id} className="flex items-center gap-4">
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                            achievement.unlocked 
                                ? (isDark ? 'bg-yellow-900/30' : 'bg-yellow-100')
                                : (isDark ? 'bg-gray-700 grayscale' : 'bg-gray-100 grayscale')
                        )}>
                            {achievement.icon}
                        </div>
                        <div className="flex-1">
                            <div className={cn(
                                "font-bold",
                                achievement.unlocked 
                                    ? (isDark ? 'text-white' : 'text-gray-800')
                                    : (isDark ? 'text-gray-500' : 'text-gray-400')
                            )}>
                                {achievement.title}
                            </div>
                            <div className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-500")}>
                                {achievement.description}
                            </div>
                        </div>
                        {achievement.unlocked && (
                            <CheckCircle2 className="text-green-500" size={20} />
                        )}
                        {!achievement.unlocked && (
                            <Lock className={cn(isDark ? "text-gray-600" : "text-gray-300")} size={16} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
