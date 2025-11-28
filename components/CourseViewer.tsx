import React, { useState, useEffect } from 'react';
import { Module } from '../types';
import { ChevronRight, PlayCircle, BookOpen, CheckCircle, Lock, ArrowLeft, ArrowRight, Menu } from 'lucide-react';

interface CourseViewerProps {
  modules: Module[];
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ modules }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(modules[0].id);
  const [activeLessonId, setActiveLessonId] = useState<string>(modules[0].lessons[0].id);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  
  // Mobile View State: 'list' shows curriculum, 'content' shows the lesson
  const [mobileView, setMobileView] = useState<'list' | 'content'>('list');

  // Load progress from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('harmoniaVivaProgress');
    if (saved) {
      try {
        setCompletedLessons(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse progress");
      }
    }
  }, []);

  const toggleCompletion = (lessonId: string) => {
    const newSet = new Set(completedLessons);
    if (newSet.has(lessonId)) {
      newSet.delete(lessonId);
    } else {
      newSet.add(lessonId);
    }
    setCompletedLessons(newSet);
    localStorage.setItem('harmoniaVivaProgress', JSON.stringify(Array.from(newSet)));
  };

  const handleLessonSelect = (moduleId: string, lessonId: string) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    setMobileView('content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentModule = modules.find(m => m.id === activeModuleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === activeLessonId);

  // Navigation Logic
  const getNextLesson = () => {
    const currentModIndex = modules.findIndex(m => m.id === activeModuleId);
    const currentLessonIndex = currentModule!.lessons.findIndex(l => l.id === activeLessonId);

    if (currentLessonIndex < currentModule!.lessons.length - 1) {
      return { mod: currentModule!, less: currentModule!.lessons[currentLessonIndex + 1] };
    } else if (currentModIndex < modules.length - 1) {
      const nextMod = modules[currentModIndex + 1];
      return { mod: nextMod, less: nextMod.lessons[0] };
    }
    return null;
  };

  const getPrevLesson = () => {
    const currentModIndex = modules.findIndex(m => m.id === activeModuleId);
    const currentLessonIndex = currentModule!.lessons.findIndex(l => l.id === activeLessonId);

    if (currentLessonIndex > 0) {
      return { mod: currentModule!, less: currentModule!.lessons[currentLessonIndex - 1] };
    } else if (currentModIndex > 0) {
      const prevMod = modules[currentModIndex - 1];
      return { mod: prevMod, less: prevMod.lessons[prevMod.lessons.length - 1] };
    }
    return null;
  };

  const next = getNextLesson();
  const prev = getPrevLesson();

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[80vh]">
      {/* Syllabus Sidebar - Hidden on mobile if viewing content */}
      <div className={`
        lg:w-80 flex-shrink-0 space-y-4 lg:block
        ${mobileView === 'content' ? 'hidden' : 'block'}
      `}>
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Currículo</h2>
            <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                {Math.round((completedLessons.size / modules.reduce((acc, m) => acc + m.lessons.length, 0)) * 100)}% Concluído
            </span>
        </div>

        <div className="space-y-3 pb-20 lg:pb-0">
          {modules.map((module) => (
            <div key={module.id} className="bg-slate-900/80 rounded-xl overflow-hidden border border-slate-800 transition-all hover:border-slate-700">
              <button
                onClick={() => setActiveModuleId(module.id === activeModuleId ? '' : module.id)}
                className={`w-full text-left p-4 flex items-center justify-between transition-colors ${activeModuleId === module.id ? 'bg-slate-800' : 'hover:bg-slate-800/50'}`}
              >
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-200 text-sm">{module.title}</span>
                    <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{module.lessons.length} Aulas</span>
                </div>
                <ChevronRight 
                    className={`text-slate-500 transition-transform duration-300 ${activeModuleId === module.id ? 'rotate-90 text-purple-400' : ''}`} 
                    size={16} 
                />
              </button>
              
              {/* Accordion content */}
              {activeModuleId === module.id && (
                <div className="bg-slate-950/50 border-t border-slate-800/50">
                  {module.lessons.map((lesson) => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const isActive = activeLessonId === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(module.id, lesson.id)}
                        className={`
                          w-full flex items-center gap-3 p-3 pl-4 text-sm transition-all border-l-2
                          ${isActive 
                            ? 'bg-purple-900/10 border-purple-500 text-purple-200' 
                            : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}
                        `}
                      >
                        <div className={`flex-shrink-0 ${isCompleted ? 'text-green-500' : (isActive ? 'text-purple-400' : 'text-slate-600')}`}>
                            {isCompleted ? <CheckCircle size={16} className="fill-green-500/10" /> : <PlayCircle size={16} />}
                        </div>
                        <span className="truncate text-left">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Viewer - Hidden on mobile if viewing list */}
      <div className={`
        flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col relative
        ${mobileView === 'list' ? 'hidden lg:flex' : 'flex'}
      `}>
        {currentLesson ? (
          <>
            {/* Mobile Header for "Back" */}
            <div className="lg:hidden p-4 border-b border-slate-800 flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer" onClick={() => setMobileView('list')}>
                <ArrowLeft size={16} />
                <span className="text-sm font-semibold">Voltar ao Menu</span>
            </div>

            <div className="p-6 md:p-10 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800/50">
               <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-3 uppercase tracking-widest">
                 <BookOpen size={14} />
                 {currentModule?.title}
               </div>
               <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">{currentLesson.title}</h1>
            </div>
            
            <div className="p-6 md:p-10 flex-1 overflow-y-auto">
              {currentLesson.imageUrl && (
                <div className="relative mb-8 group rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
                    <img 
                    src={currentLesson.imageUrl} 
                    alt={currentLesson.title} 
                    className="w-full h-48 md:h-80 object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>
              )}
              
              <div 
                className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-slate-100 prose-a:text-purple-400 prose-code:text-pink-300 prose-code:bg-slate-950 prose-code:px-1 prose-code:rounded prose-code:border prose-code:border-slate-800"
                dangerouslySetInnerHTML={{ __html: currentLesson.content }}
              />
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-950/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex gap-2 w-full md:w-auto">
                    {prev && (
                        <button 
                            onClick={() => handleLessonSelect(prev.mod.id, prev.less.id)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                        >
                            <ArrowLeft size={16} /> Anterior
                        </button>
                    )}
                    {next && (
                        <button 
                            onClick={() => {
                                toggleCompletion(currentLesson.id); // Auto-complete current when going next
                                if(!completedLessons.has(currentLesson.id)) {
                                     // Ensure we add it if not added
                                     const newSet = new Set(completedLessons);
                                     newSet.add(currentLesson.id);
                                     setCompletedLessons(newSet);
                                     localStorage.setItem('harmoniaVivaProgress', JSON.stringify(Array.from(newSet)));
                                }
                                handleLessonSelect(next.mod.id, next.less.id);
                            }}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                        >
                            Próxima <ArrowRight size={16} />
                        </button>
                    )}
                </div>

                <button 
                  onClick={() => toggleCompletion(currentLesson.id)}
                  className={`
                    w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold transition-all shadow-lg
                    ${completedLessons.has(currentLesson.id)
                        ? 'bg-green-600/20 text-green-400 border border-green-500/50 hover:bg-green-600/30'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-purple-900/30'}
                  `}
                >
                  <CheckCircle size={18} className={completedLessons.has(currentLesson.id) ? 'fill-green-500 text-slate-900' : ''} />
                  {completedLessons.has(currentLesson.id) ? 'Concluída' : 'Marcar como Concluída'}
                </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Menu size={32} className="text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-300 mb-2">Comece sua Jornada</h3>
            <p className="max-w-xs">Selecione um módulo no menu lateral para visualizar o conteúdo da aula.</p>
          </div>
        )}
      </div>
    </div>
  );
};