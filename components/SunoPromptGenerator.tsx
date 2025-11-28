import React, { useState } from 'react';
import { Wand2, Copy, Loader2, Music, AlertCircle } from 'lucide-react';
import { generateSunoPrompt } from '../services/geminiService';
import { GeneratedPrompt } from '../types';

export const SunoPromptGenerator: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeneratedPrompt | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateSunoPrompt(idea);
      setResult(data);
    } catch (err) {
      setError("Falha ao gerar o prompt. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Wand2 className="text-purple-500" size={36} />
          Suno Architect AI
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Não sabe como descrever sua música? Diga a ideia e nossa IA criará o 
          <strong> Style</strong> e as <strong> Lyrics</strong> estruturadas para você copiar e colar.
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl mb-8">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Descreva sua ideia musical
        </label>
        <div className="relative">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Ex: Uma música triste sertaneja sobre um caminhoneiro que sente falta de casa, com voz grave..."
            className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !idea.trim()}
            className={`
              absolute bottom-4 right-4 px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg
              ${isLoading || !idea.trim() 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-transform'}
            `}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            {isLoading ? 'Criando...' : 'Gerar Prompt'}
          </button>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-900/20 text-red-400 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
          {/* Style Card */}
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col">
            <div className="bg-purple-900/30 p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-purple-300 flex items-center gap-2">
                <Music size={18} />
                Style Description
              </h3>
              <button 
                onClick={() => copyToClipboard(result.style)}
                className="text-slate-400 hover:text-white transition-colors"
                title="Copiar Style"
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="p-6 font-mono text-sm text-purple-100 bg-slate-900/50 flex-1">
              {result.style}
            </div>
            <div className="p-3 bg-slate-950/50 text-xs text-slate-500 text-center">
              Copie e cole no campo "Style of Music"
            </div>
          </div>

          {/* Lyrics Card */}
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col md:row-span-2">
            <div className="bg-pink-900/30 p-4 border-b border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-pink-300">Lyrics & Structure</h3>
                <span className="text-xs text-pink-400/70">{result.title_suggestion}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(result.lyrics)}
                className="text-slate-400 hover:text-white transition-colors"
                title="Copiar Letra"
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="p-6 font-mono text-sm text-slate-300 whitespace-pre-wrap bg-slate-900/50 max-h-[500px] overflow-y-auto custom-scrollbar">
              {result.lyrics}
            </div>
            <div className="p-3 bg-slate-950/50 text-xs text-slate-500 text-center">
              Copie e cole no campo "Lyrics"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
