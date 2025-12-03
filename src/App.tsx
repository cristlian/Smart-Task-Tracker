import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DataPage } from './pages/DataPage';
import { SettingsPage } from './pages/SettingsPage';
import { FocusPage } from './pages/FocusPage';
import { BottomNav } from './components/Layout/BottomNav';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import { cn } from './lib/utils';

function Layout() {
  const location = useLocation();
  const isFocusMode = location.pathname === '/focus';
  const { settings } = useStore();

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <div className={cn("h-screen w-screen flex justify-center items-center overflow-hidden transition-colors duration-300", settings.darkMode ? "bg-gray-900" : "bg-gray-50")}>
      {/* Fixed Viewport Container for iPhone 14 */}
      <div className={cn(
          "relative w-[375px] h-[812px] shadow-2xl overflow-hidden flex flex-col rounded-[40px] border-8 transition-colors duration-300",
          settings.darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-900"
      )}>

        {/* Dynamic Island Placeholder */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-50 pointer-events-none" />

        {/* Main Content Area */}
        <main className={cn(
            "flex-1 overflow-hidden relative transition-colors duration-300",
            settings.darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-amber-50 to-orange-50"
        )}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/focus" element={<FocusPage />} />
          </Routes>
        </main>

        {/* Bottom Navigation (Hidden in Focus Mode) */}
        {!isFocusMode && <BottomNav />}

        {/* Home Indicator Placeholder */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/20 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
