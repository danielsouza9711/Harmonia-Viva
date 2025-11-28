import React, { useState } from 'react';
import { Menu, X, Youtube, Music, BookOpen, Wand2 } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL } from '../constants';
import { AppRoute } from '../types';

interface LayoutProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentRoute, onNavigate, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { route: AppRoute.HOME, label: 'Início', icon: <BookOpen size={20} /> },
    { route: AppRoute.COURSE, label: 'Conteúdo do Curso', icon: <Music size={20} /> },
    { route: AppRoute.TOOL, label: 'Suno Architect (IA)', icon: <Wand2 size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md z-50 sticky top-0">
        <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Harmonia Viva
        </span>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-300 hover:text-white transition-colors">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-out shadow-2xl
          md:translate-x-0 md:static md:h-screen flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-8 hidden md:block">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Harmonia Viva
          </h1>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-semibold">Masterclass Suno</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => {
                onNavigate(item.route);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                ${currentRoute === item.route 
                  ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
              `}
            >
              <span className={currentRoute === item.route ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}>
                {item.icon}
              </span>
              <span className="font-medium tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <a 
            href={YOUTUBE_CHANNEL_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-300 text-sm font-bold group border border-red-900/20 hover:border-red-500"
          >
            <Youtube size={18} className="group-hover:scale-110 transition-transform" />
            Canal Oficial
          </a>
          <div className="mt-4 text-[10px] text-slate-600 text-center uppercase tracking-wider">
             &copy; 2024 Harmonia Viva
          </div>
        </div>
      </aside>

      {/* Main Content Area - Fixed viewport height logic for mobile (dvh) */}
      <main className="flex-1 h-[calc(100dvh-65px)] md:h-screen overflow-y-auto bg-slate-950 p-4 md:p-8 scroll-smooth relative w-full">
        {/* Background Gradients for Aesthetics */}
        <div className="fixed top-0 left-0 w-full h-96 bg-purple-900/5 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-full h-96 bg-blue-900/5 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};