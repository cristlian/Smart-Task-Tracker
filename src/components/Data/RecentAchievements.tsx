import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle2, Lock } from 'lucide-react';

export const RecentAchievements: React.FC = () => {
    const { achievements } = useStore();
    
    // Sort: Unlocked first, then by id
    const sorted = [...(achievements || [])].sort((a, b) => {
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        return 0;
    });

    if (sorted.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">最近成就</h3>
            <div className="space-y-4">
                {sorted.map(achievement => (
                    <div key={achievement.id} className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100 grayscale'}`}>
                            {achievement.icon}
                        </div>
                        <div className="flex-1">
                            <div className={`font-bold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                                {achievement.title}
                            </div>
                            <div className="text-xs text-gray-500">
                                {achievement.description}
                            </div>
                        </div>
                        {achievement.unlocked && (
                            <CheckCircle2 className="text-green-500" size={20} />
                        )}
                        {!achievement.unlocked && (
                            <Lock className="text-gray-300" size={16} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
