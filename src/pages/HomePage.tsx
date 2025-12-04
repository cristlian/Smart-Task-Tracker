import React from 'react';
import { CharacterZone } from '../components/LowerZone/CharacterZone';
import { TaskListModule } from '../components/UpperZone/TaskListModule';
import { CurrentTaskModule } from '../components/UpperZone/CurrentTaskModule';
import { TimerModule } from '../components/UpperZone/TimerModule';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const HomePage: React.FC = () => {
    const { timer, settings } = useStore();
    const navigate = useNavigate();

    // Sort modules by order and filter by visibility
    const sortedModules = [...settings.modules].sort((a, b) => a.order - b.order);

    // If focusing, redirect to focus page (though BottomNav should handle hiding, 
    // the home page itself might want to redirect if user lands here)
    React.useEffect(() => {
        if (timer.status === 'focusing' || timer.status === 'paused') {
            navigate('/focus');
        }
    }, [timer.status, navigate]);

    const renderModule = (moduleId: string) => {
        switch (moduleId) {
            case 'timer':
                return <div className="h-40" key="timer"><TimerModule /></div>;
            case 'current-task':
                return <CurrentTaskModule key="current-task" />;
            case 'task-list':
                return <TaskListModule key="task-list" />;
            default:
                return null;
        }
    };

    return (
        <div className={cn("flex flex-col h-full", settings.darkMode && "bg-gray-900")}>
            {/* Upper Zone: Modules (Sorted and filtered by visibility) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {sortedModules
                    .filter(m => m.visible)
                    .map(module => renderModule(module.id))
                }
            </div>

            {/* Lower Zone: Character */}
            <div className="h-[40%] shrink-0 flex flex-col">
                <CharacterZone />
            </div>
        </div>
    );
};
