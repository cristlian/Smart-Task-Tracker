import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, Home, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BottomNav: React.FC = () => {
    return (
        <nav className="h-20 bg-white border-t border-gray-100 flex items-start justify-around pt-3 pb-safe">
            <NavLink
                to="/data"
                className={({ isActive }) => cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
                )}
            >
                <BarChart2 size={24} />
                <span className="text-[10px] font-medium">数据</span>
            </NavLink>

            <NavLink
                to="/"
                className={({ isActive }) => cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
                )}
            >
                <Home size={24} />
                <span className="text-[10px] font-medium">首页</span>
            </NavLink>

            <NavLink
                to="/settings"
                className={({ isActive }) => cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
                )}
            >
                <Settings size={24} />
                <span className="text-[10px] font-medium">设置</span>
            </NavLink>
        </nav>
    );
};
