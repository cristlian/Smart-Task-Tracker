import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ModuleSettings } from '../components/Settings/ModuleSettings';
import { Switch } from '../components/Settings/Switch';
import { ChevronRight, Volume2, Bell, Moon, Shield, HelpCircle, Trash2, Info, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

const THEME_COLORS = [
    { id: 'indigo', bg: 'bg-indigo-500' },
    { id: 'blue', bg: 'bg-blue-500' },
    { id: 'purple', bg: 'bg-purple-500' },
    { id: 'pink', bg: 'bg-pink-500' },
    { id: 'orange', bg: 'bg-orange-500' },
];

export const SettingsPage: React.FC = () => {
    const { settings, updateSettings, resetAllData } = useStore();
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [subPage, setSubPage] = useState<'none' | 'privacy' | 'help' | 'about'>('none');

    const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">{title}</h3>
            <div className={cn("bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", settings.darkMode && "bg-gray-800 border-gray-700")}>
                {children}
            </div>
        </div>
    );

    const Item = ({ icon: Icon, label, children, onClick, isLast }: any) => (
        <div 
            className={cn(
                "flex items-center justify-between p-4 transition-colors",
                !isLast && "border-b border-gray-50 dark:border-gray-700",
                onClick && "cursor-pointer active:bg-gray-50 dark:active:bg-gray-700"
            )}
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-gray-50 text-gray-600", settings.darkMode && "bg-gray-700 text-gray-300")}>
                    <Icon size={20} />
                </div>
                <span className={cn("text-sm font-medium text-gray-700", settings.darkMode && "text-gray-200")}>{label}</span>
            </div>
            {children}
        </div>
    );

    const handleReset = () => {
        resetAllData();
        setShowResetConfirm(false);
        window.location.reload(); // Force reload to ensure clean state
    };

    if (subPage !== 'none') {
        return (
            <div className={cn("flex flex-col h-full bg-gray-50", settings.darkMode && "bg-gray-900")}>
                <div className="p-6 pt-8 pb-4 flex items-center gap-4">
                    <button onClick={() => setSubPage('none')} className={cn("p-2 rounded-full hover:bg-gray-200", settings.darkMode && "hover:bg-gray-800 text-white")}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className={cn("text-xl font-bold text-gray-800", settings.darkMode && "text-white")}>
                        {subPage === 'privacy' && '隐私政策'}
                        {subPage === 'help' && '使用帮助'}
                        {subPage === 'about' && '关于应用'}
                    </h1>
                </div>
                <div className="flex-1 overflow-y-auto p-6 pt-0">
                    <div className={cn("bg-white p-6 rounded-2xl shadow-sm text-sm text-gray-600 leading-relaxed", settings.darkMode && "bg-gray-800 text-gray-300")}>
                        {subPage === 'privacy' && (
                            <>
                                <p className="mb-4">我们非常重视您的隐私。本应用（专注玩偶）是一个本地优先的应用程序。</p>
                                <h4 className="font-bold mb-2">数据存储</h4>
                                <p className="mb-4">所有专注记录、任务数据和设置均存储在您的设备本地（LocalStorage）。我们不会将您的数据上传到任何云端服务器。</p>
                                <h4 className="font-bold mb-2">数据清除</h4>
                                <p>您可以随时在设置中点击“清除所有数据”来彻底删除本应用存储的所有信息。</p>
                            </>
                        )}
                        {subPage === 'help' && (
                            <>
                                <h4 className="font-bold mb-2">如何开始专注？</h4>
                                <p className="mb-4">在首页点击“开始专注”按钮即可。您可以设置专注时长和休息时长。</p>
                                <h4 className="font-bold mb-2">如何解锁新装扮？</h4>
                                <p className="mb-4">通过完成专注任务积累时长，达成成就后可解锁新的玩偶装扮。</p>
                                <h4 className="font-bold mb-2">模块排序</h4>
                                <p>在设置页的“模块设置”中，您可以拖拽调整首页模块的顺序，或隐藏不需要的模块。</p>
                            </>
                        )}
                        {subPage === 'about' && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-indigo-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl">🧸</div>
                                <h2 className="text-lg font-bold mb-1">专注玩偶</h2>
                                <p className="text-gray-400 mb-6">Version 1.0.0</p>
                                <p>让专注变得更有趣。</p>
                                <p className="mt-8 text-xs text-gray-400">© 2025 Figurine Focus Team</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col h-full bg-gray-50 overflow-y-auto", settings.darkMode && "bg-gray-900")}>
            <div className="p-6 pt-8 pb-6">
                <div className="text-center mb-8">
                    <h1 className={cn("text-2xl font-bold text-gray-800", settings.darkMode && "text-white")}>设置</h1>
                    <p className="text-sm text-gray-500 mt-1">个性化您的专注体验</p>
                </div>

                <Section title="模块设置">
                    <div className="p-4">
                        <p className="text-xs text-gray-400 mb-3">拖拽调整顺序，点击眼睛图标切换显示</p>
                        <ModuleSettings />
                    </div>
                </Section>

                <Section title="声音与通知">
                    <Item icon={Volume2} label="提示音效">
                        <Switch checked={settings.soundEnabled} onChange={(v) => updateSettings({ soundEnabled: v })} />
                    </Item>
                    {settings.soundEnabled && (
                        <div className="px-4 pb-4 pt-0">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={settings.soundVolume} 
                                onChange={(e) => updateSettings({ soundVolume: parseInt(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>
                    )}
                    <Item icon={Bell} label="推送通知">
                        <Switch checked={settings.notificationEnabled} onChange={(v) => updateSettings({ notificationEnabled: v })} />
                    </Item>
                    <Item icon={Volume2} label="震动反馈" isLast>
                        <Switch checked={settings.vibrationEnabled} onChange={(v) => updateSettings({ vibrationEnabled: v })} />
                    </Item>
                </Section>

                <Section title="外观">
                    <Item icon={Moon} label="深色模式">
                        <Switch checked={settings.darkMode} onChange={(v) => updateSettings({ darkMode: v })} />
                    </Item>
                    <div className="p-4 border-t border-gray-50 dark:border-gray-700">
                        <div className="text-sm font-medium text-gray-700 mb-3 dark:text-gray-200">主题色彩</div>
                        <div className="flex gap-3">
                            {THEME_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => updateSettings({ themeColor: color.id as any })}
                                    className={cn(
                                        "w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-transparent",
                                        color.bg,
                                        settings.themeColor === color.id && "ring-gray-400 scale-110"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </Section>

                <Section title="数据与隐私">
                    <Item icon={Shield} label="隐私政策" onClick={() => setSubPage('privacy')}>
                        <ChevronRight size={16} className="text-gray-400" />
                    </Item>
                    <Item icon={Trash2} label="清除所有数据" isLast onClick={() => setShowResetConfirm(true)}>
                        <span className="text-xs text-red-500 font-medium">重置</span>
                    </Item>
                </Section>

                <Section title="帮助与支持">
                    <Item icon={HelpCircle} label="使用帮助" onClick={() => setSubPage('help')}>
                        <ChevronRight size={16} className="text-gray-400" />
                    </Item>
                    <Item icon={Info} label="关于应用" isLast onClick={() => setSubPage('about')}>
                        <ChevronRight size={16} className="text-gray-400" />
                    </Item>
                </Section>

                <div className="text-center text-xs text-gray-400 pb-8">
                    Figurine Focus v1.0.0
                </div>
            </div>

            {/* Reset Confirmation Modal */}
            {showResetConfirm && (
                <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">确定要清除所有数据吗？</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            此操作将删除您的所有任务、专注记录和设置，且无法恢复。应用将回到初始状态。
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                            >
                                取消
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                            >
                                确认清除
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
