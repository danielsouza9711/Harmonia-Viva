import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { CourseViewer } from './components/CourseViewer';
import { SunoPromptGenerator } from './components/SunoPromptGenerator';
import { COURSE_MODULES } from './constants';
import { AppRoute } from './types';
import { Play } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.COURSE:
        return <CourseViewer modules={COURSE_MODULES} />;
      case AppRoute.TOOL:
        return <SunoPromptGenerator />;
      case AppRoute.HOME:
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-fade-in">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                <span className="block text-white">Domine a</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  Música com I.A.
                </span>
              </h1>
              <p className="text-xl text-slate-400 md:px-12 leading-relaxed">
                Bem-vindo à <strong>Harmonia Viva</strong>. A plataforma definitiva para você sair do zero e criar hits profissionais usando o Suno AI.
                Sem teoria musical complexa. Apenas criatividade pura.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => setCurrentRoute(AppRoute.COURSE)}
                className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <Play className="fill-slate-900 group-hover:scale-110 transition-transform" />
                Começar Masterclass
              </button>
              
              <button
                onClick={() => setCurrentRoute(AppRoute.TOOL)}
                className="px-8 py-4 bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 font-bold rounded-full text-lg transition-all flex items-center justify-center"
              >
                Ir para Ferramenta AI
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-16 text-left">
              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <div className="text-purple-400 text-4xl font-bold mb-2">01</div>
                <h3 className="text-white font-bold text-lg">Fundamentos</h3>
                <p className="text-slate-500 text-sm">Entenda como a engine do Suno "pensa" e pare de gastar créditos à toa.</p>
              </div>
              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <div className="text-pink-400 text-4xl font-bold mb-2">02</div>
                <h3 className="text-white font-bold text-lg">Engenharia de Prompt</h3>
                <p className="text-slate-500 text-sm">Aprenda a linguagem secreta dos estilos e metatags para controle total.</p>
              </div>
              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                 <div className="text-red-400 text-4xl font-bold mb-2">AI</div>
                <h3 className="text-white font-bold text-lg">Suno Architect</h3>
                <p className="text-slate-500 text-sm">Acesso exclusivo à nossa ferramenta que escreve seus prompts automaticamente.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout currentRoute={currentRoute} onNavigate={setCurrentRoute}>
      {renderContent()}
    </Layout>
  );
}
