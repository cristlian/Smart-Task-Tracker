import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { formatTime } from '../../lib/utils';
import { STRINGS } from '../../i18n/strings.zh-CN';
import { Play, Pause, Square, CheckCircle } from 'lucide-react';

export const TimerModule: React.FC = () => {
    const { timer, startTimer, pauseTimer, resumeTimer, stopTimer, tickTimer, confirmCompletion } = useStore();

    useEffect(() => {
        let interval: number;
        if (timer.status === 'focusing') {
            interval = setInterval(tickTimer, 1000);
        }
        return () => clearInterval(interval);
    }, [timer.status, tickTimer]);

    const progress = ((timer.duration - timer.timeLeft) / timer.duration) * 100;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-full min-h-[180px]">
            <div className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                {timer.mode === 'focus' ? STRINGS.timer.focus : STRINGS.timer.break}
            </div>

            <div className="text-6xl font-bold text-gray-800 font-mono tabular-nums mb-6">
                {formatTime(timer.timeLeft)}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex gap-4">
                {timer.status === 'idle' && (
                    <button onClick={startTimer} className="btn-primary flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <Play size={20} className="mr-2" /> {STRINGS.timer.start}
                    </button>
                )}

                {timer.status === 'focusing' && (
                    <button onClick={pauseTimer} className="btn-secondary flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Pause size={20} className="mr-2" /> {STRINGS.timer.pause}
                    </button>
                )}

                {timer.status === 'paused' && (
                    <>
                        <button onClick={resumeTimer} className="btn-primary flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Play size={20} className="mr-2" /> {STRINGS.timer.resume}
                        </button>
                        <button onClick={stopTimer} className="btn-danger flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                            <Square size={20} className="mr-2" /> {STRINGS.timer.stop}
                        </button>
                    </>
                )}

                {timer.status === 'completed' && (
                    <button onClick={confirmCompletion} className="btn-success animate-bounce flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        <CheckCircle size={20} className="mr-2" /> {STRINGS.msg.sessionCompleted}
                    </button>
                )}
            </div>
        </div>
    );
};
