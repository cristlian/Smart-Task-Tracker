import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, Home, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';

// Theme color mapping
const THEME_ACTIVE_COLORS = {
    indigo: 'text-indigo-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    orange: 'text-orange-600',
};

export const BottomNav: React.FC = () => {
    const { settings } = useStore();
    const isDark = settings.darkMode;
    const activeColor = THEME_ACTIVE_COLORS[settings.themeColor] || THEME_ACTIVE_COLORS.indigo;

    return (
        <nav className={cn(
            "h-20 border-t flex items-start justify-around pt-3 pb-safe transition-colors duration-300",
            isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
        )}>
            <NavLink
                to="/data"
                className={({ isActive }) => cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive ? activeColor : (isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")
                )}
            >
                <BarChart2 size={24} />
                <span className="text-[10px] font-medium">数据</span>
            </NavLink>

            <NavLink
                to="/"
                className={({ isActive }) => cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive ? activeColor : (isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")
                )}
            >
                <Home size={24} />
                <span className="text-[10px] font-medium">首页</span>
            </NavLink>

            <NavLink
                to="/settings"
                className={({ isActive }) => cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive ? activeColor : (isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")
                )}
            >
                <Settings size={24} />
                <span className="text-[10px] font-medium">设置</span>
            </NavLink>
        </nav>
    );
};
