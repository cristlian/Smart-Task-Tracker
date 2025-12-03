import React from 'react';
import { CharacterZone } from '../components/LowerZone/CharacterZone';
import { TaskListModule } from '../components/UpperZone/TaskListModule';
import { CurrentTaskModule } from '../components/UpperZone/CurrentTaskModule';
import { TimerModule } from '../components/UpperZone/TimerModule';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const { timer } = useStore();
    const navigate = useNavigate();

    // If focusing, redirect to focus page (though BottomNav should handle hiding, 
    // the home page itself might want to redirect if user lands here)
    React.useEffect(() => {
        if (timer.status === 'focusing' || timer.status === 'paused') {
            navigate('/focus');
        }
    }, [timer.status, navigate]);

    return (
        <div className="flex flex-col h-full">
            {/* Upper Zone: Modules (Simplified for v2, just showing key info) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* We reuse the modules for now, but layout is fixed */}
                <div className="h-40">
                    <TimerModule />
                </div>
                <CurrentTaskModule />
                <TaskListModule />
            </div>

            {/* Lower Zone: Character */}
            <div className="h-[40%] shrink-0 flex flex-col">
                <CharacterZone />
            </div>
        </div>
    );
};
