import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../lib/utils';
import { Pause, Play, X } from 'lucide-react';
import { cn } from '../lib/utils';
import '../components/LowerZone/FaceSprites.css';

export const FocusPage: React.FC = () => {
    const { timer, pauseTimer, resumeTimer, stopTimer, tickTimer, petAwakeSince, setPetAwakeSince, setIsPaused } = useStore();
    const navigate = useNavigate();
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Awake/Sleep Logic
    const AWAKE_DURATION = 30000; // 30s
    const [isAsleep, setIsAsleep] = useState(false);

    useEffect(() => {
        let interval: number;
        if (timer.status === 'focusing') {
            interval = setInterval(tickTimer, 1000);
        }
        return () => clearInterval(interval);
    }, [timer.status, tickTimer]);

    // Redirect if not focusing/paused
    useEffect(() => {
        if (timer.status === 'idle' || timer.status === 'completed') {
            navigate('/');
        }
    }, [timer.status, navigate]);

    // Handle Awake/Sleep Timer
    useEffect(() => {
        if (timer.status === 'focusing') {
            if (!petAwakeSince) {
                setPetAwakeSince(Date.now());
            }

            const checkSleep = setInterval(() => {
                if (petAwakeSince && Date.now() - petAwakeSince > AWAKE_DURATION) {
                    setIsAsleep(true);
                } else {
                    setIsAsleep(false);
                }
            }, 1000);

            return () => clearInterval(checkSleep);
        } else if (timer.status === 'paused') {
            setIsAsleep(true); // Pause = Sleep
        }
    }, [timer.status, petAwakeSince, setPetAwakeSince]);

    const handlePause = () => {
        pauseTimer();
        setIsPaused(true);
        setIsAsleep(true);
    };

    const handleResume = () => {
        resumeTimer();
        setIsPaused(false);
        setPetAwakeSince(Date.now()); // Reset awake timer
        setIsAsleep(false);
    };

    const handleExitRequest = () => {
        setShowExitConfirm(true);
    };

    const confirmExit = () => {
        stopTimer();
        setIsPaused(false);
        setPetAwakeSince(null);
        navigate('/');
    };

    const cancelExit = () => {
        setShowExitConfirm(false);
    };

    return (
        <div className="h-full w-full bg-gray-900 text-white flex flex-col relative overflow-hidden">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full p-6 pt-safe flex justify-between items-start z-20">
                <div className="flex flex-col">
                    <span className="text-white/60 text-sm uppercase tracking-widest mb-1">当前聚焦</span>
                    <span className="text-xl font-bold">设计系统重构</span> {/* TODO: Connect to real task */}
                </div>
                <button onClick={handleExitRequest} className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Main Timer */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 mt-[-20%]">
                <div className="text-[5rem] font-mono font-bold tracking-tighter leading-none mb-8 tabular-nums">
                    {formatTime(timer.timeLeft)}
                </div>

                {timer.status === 'focusing' ? (
                    <button onClick={handlePause} className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm">
                        <Pause size={32} fill="currentColor" />
                    </button>
                ) : (
                    /* Resume button is handled in overlay for Pause state, but here for safety */
                    <button onClick={handleResume} className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-400 transition-all shadow-lg shadow-green-500/30">
                        <Play size={32} fill="currentColor" className="ml-1" />
                    </button>
                )}
            </div>

            {/* Character Zone (Locked) */}
            <div className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none">
                {/* Simple CSS representation of Awake/Sleep for Phase 3 */}
                <div className="w-full h-full flex items-center justify-center relative">
                    {/* Breathing Light (Awake only) */}
                    {!isAsleep && (
                        <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    )}

                    {/* Face Container */}
                    <div className={cn(
                        "relative w-48 h-48 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-1000",
                        isAsleep ? "scale-95 opacity-80" : "scale-100"
                    )}>
                        {/* Eyes */}
                        <div className="flex gap-8 z-10">
                            {isAsleep ? (
                                <>
                                    <div className="w-8 h-1 bg-gray-800 rounded-full" />
                                    <div className="w-8 h-1 bg-gray-800 rounded-full" />
                                </>
                            ) : (
                                <>
                                    <div className="w-6 h-6 bg-gray-800 rounded-full" />
                                    <div className="w-6 h-6 bg-gray-800 rounded-full" />
                                </>
                            )}
                        </div>

                        {/* Mouth */}
                        <div className="mt-4">
                            {isAsleep ? (
                                <span className="text-2xl font-bold text-gray-800">ω</span>
                            ) : (
                                <div className="w-4 h-2 bg-gray-800 rounded-b-full" />
                            )}
                        </div>

                        {/* zZZ Bubble */}
                        {isAsleep && (
                            <div className="absolute -top-4 right-0 bg-white px-3 py-1 rounded-xl rounded-bl-none shadow-lg animate-bounce text-indigo-600 font-bold">
                                zZZ
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Pause Overlay */}
            {timer.status === 'paused' && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
                    <div className="text-white/80 text-lg mb-8">已暂停</div>
                    <button
                        onClick={handleResume}
                        className="px-12 py-4 bg-green-500 text-white text-xl font-bold rounded-full shadow-xl shadow-green-500/20 hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <Play size={24} fill="currentColor" />
                        继续专注
                    </button>
                </div>
            )}

            {/* Exit Confirmation Overlay */}
            {showExitConfirm && (
                <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
                    <div className="bg-white text-gray-900 rounded-3xl p-6 w-full max-w-sm text-center">
                        <h3 className="text-xl font-bold mb-2">确定要退出吗？</h3>
                        <p className="text-gray-500 mb-6">
                            剩余时间 <span className="font-mono font-bold text-indigo-600">{formatTime(timer.timeLeft)}</span>
                            <br />退出后当前进度将丢失
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={cancelExit}
                                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
                            >
                                继续专注
                            </button>
                            <button
                                onClick={confirmExit}
                                className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200"
                            >
                                确认退出
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
