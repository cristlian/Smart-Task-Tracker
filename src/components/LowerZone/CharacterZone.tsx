import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { Glasses, Flower, Crown, Sparkles } from 'lucide-react';
import './FaceSprites.css';



function XIcon(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

export const CharacterZone: React.FC = () => {
    const { timer, costume, setCostume } = useStore();
    const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [isHappy, setIsHappy] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const longPressTimer = useRef<number | null>(null);
    const isDragging = useRef(false);

    const isLocked = timer.status === 'focusing' || timer.status === 'paused';

    // Eye Tracking
    useEffect(() => {
        if (isLocked) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            // Limit movement to 15px
            const maxDist = 15;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const scale = dist > maxDist ? maxDist / dist : 1;

            setEyePos({ x: dx * scale, y: dy * scale });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isLocked]);

    // Random Blinking
    useEffect(() => {
        if (isLocked) return;
        const blinkLoop = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
            setTimeout(blinkLoop, Math.random() * 3000 + 2000);
        };
        const timerId = setTimeout(blinkLoop, 2000);
        return () => clearTimeout(timerId);
    }, [isLocked]);

    // Gestures
    const handlePointerDown = (e: React.PointerEvent) => {
        if (isLocked) return;
        isDragging.current = false;

        // Start Long Press Timer
        longPressTimer.current = window.setTimeout(() => {
            setMenuOpen(true);
            // Center menu on click/touch
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                // Relative to container
                setMenuPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
            isDragging.current = true;
        }, 500);
    };

    const handlePointerUp = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }

        if (menuOpen) {
            // Apply selection
            if (selectedOption) {
                setCostume(selectedOption === 'none' ? null : selectedOption);
            }
            setMenuOpen(false);
            setSelectedOption(null);
            isDragging.current = false;
        } else if (!isDragging.current && !isLocked) {
            // Short Tap -> Happy Feedback
            setIsHappy(true);
            setTimeout(() => setIsHappy(false), 1000);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (menuOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check distance to menu items
            // Menu center is menuPos
            // Items are at radius 80px (simplified)
            // We'll just check angle/distance for simplicity or hit testing
            // Actually, let's just do simple hit testing based on coordinates if we rendered them fixed?
            // Better: Calculate angle and distance from menu center

            const dx = x - menuPos.x;
            const dy = y - menuPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 30) { // Deadzone center
                // Determine quadrant/sector
                // 4 items: Top, Right, Bottom, Left? Or spread?
                // Let's spread them: 0, 90, 180, 270 deg
                // Glasses (Top), Flower (Right), Crown (Bottom), None (Left)

                const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180 to 180
                // Normalize to 0-360
                const normalizedAngle = angle < 0 ? angle + 360 : angle;

                if (normalizedAngle >= 315 || normalizedAngle < 45) setSelectedOption('flower'); // Right
                else if (normalizedAngle >= 45 && normalizedAngle < 135) setSelectedOption('crown'); // Bottom
                else if (normalizedAngle >= 135 && normalizedAngle < 225) setSelectedOption('none'); // Left
                else setSelectedOption('glasses'); // Top
            } else {
                setSelectedOption(null);
            }
        } else {
            // Cancel long press if moved too much before triggering?
            // For now, simple implementation
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex-1 bg-gradient-to-b from-white to-indigo-50 rounded-t-[3rem] relative overflow-hidden flex items-center justify-center touch-none select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerUp}
        >
            {/* Background Decor */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50" />

            {/* Character */}
            <div
                className={cn(
                    "face-container relative w-48 h-48 bg-white rounded-full shadow-xl flex flex-col items-center justify-center transition-transform duration-300",
                    isHappy && "animate-bounce",
                    isLocked && "opacity-80 grayscale-[0.2]"
                )}
            >
                {/* Costume: Glasses */}
                {costume === 'glasses' && (
                    <div className="absolute top-14 w-36 h-12 border-4 border-black rounded-full z-20" />
                )}
                {/* Costume: Flower */}
                {costume === 'flower' && (
                    <div className="absolute -top-4 -right-2 text-pink-500 z-20">
                        <Flower size={48} fill="currentColor" />
                    </div>
                )}
                {/* Costume: Crown */}
                {costume === 'crown' && (
                    <div className="absolute -top-8 text-amber-500 z-20">
                        <Crown size={56} fill="currentColor" />
                    </div>
                )}

                {/* Eyes */}
                <div
                    className="flex gap-8 z-10 transition-transform duration-75"
                    style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                >
                    <div className={cn("w-6 h-6 bg-gray-800 rounded-full transition-all", isBlinking && "scale-y-0")} />
                    <div className={cn("w-6 h-6 bg-gray-800 rounded-full transition-all", isBlinking && "scale-y-0")} />
                </div>

                {/* Mouth */}
                <div
                    className="mt-4 transition-transform duration-75"
                    style={{ transform: `translate(${eyePos.x * 0.5}px, ${eyePos.y * 0.5}px)` }}
                >
                    {isHappy ? (
                        <div className="w-8 h-4 border-b-4 border-gray-800 rounded-full" />
                    ) : (
                        <div className="w-4 h-2 bg-gray-800 rounded-b-full" />
                    )}
                </div>

                {/* Happy Feedback */}
                {isHappy && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-400 animate-ping">
                        <Sparkles size={40} />
                    </div>
                )}
            </div>

            {/* Radial Menu Overlay */}
            {menuOpen && (
                <div className="absolute inset-0 z-50 pointer-events-none">
                    <div
                        className="absolute w-64 h-64 rounded-full bg-black/5 backdrop-blur-[2px] border border-white/20"
                        style={{
                            left: menuPos.x - 128,
                            top: menuPos.y - 128,
                        }}
                    >
                        {/* Menu Items */}
                        {/* Top: Glasses */}
                        <div className={cn(
                            "absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all",
                            selectedOption === 'glasses' ? "bg-indigo-600 text-white scale-125 shadow-lg" : "bg-white text-gray-600"
                        )}>
                            <Glasses size={24} />
                        </div>

                        {/* Right: Flower */}
                        <div className={cn(
                            "absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all",
                            selectedOption === 'flower' ? "bg-pink-600 text-white scale-125 shadow-lg" : "bg-white text-gray-600"
                        )}>
                            <Flower size={24} />
                        </div>

                        {/* Bottom: Crown */}
                        <div className={cn(
                            "absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all",
                            selectedOption === 'crown' ? "bg-amber-600 text-white scale-125 shadow-lg" : "bg-white text-gray-600"
                        )}>
                            <Crown size={24} />
                        </div>

                        {/* Left: None */}
                        <div className={cn(
                            "absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all",
                            selectedOption === 'none' ? "bg-red-500 text-white scale-125 shadow-lg" : "bg-white text-gray-600"
                        )}>
                            <XIcon size={24} />
                        </div>

                        {/* Connector Lines (Optional visual aid) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                            <div className="w-full h-[1px] bg-gray-400 absolute" />
                            <div className="h-full w-[1px] bg-gray-400 absolute" />
                        </div>
                    </div>
                </div>
            )}

            {/* Locked Indicator */}
            {isLocked && (
                <div className="absolute bottom-4 text-xs font-bold text-indigo-300 uppercase tracking-widest">
                    LOCKED
                </div>
            )}
        </div>
    );
};
