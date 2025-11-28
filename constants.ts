import { Module } from './types';

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@HarmoniaViva-HV";

export const COURSE_MODULES: Module[] = [
  {
    id: 'intro',
    title: 'Módulo 1: Primeiros Passos no Suno',
    description: 'Entenda a interface, crie sua conta e gere seu primeiro som em 5 minutos.',
    icon: 'book',
    lessons: [
      {
        id: 'what-is-suno',
        title: 'O que é o Suno AI?',
        content: `
          <h3 class="text-xl font-bold mb-4 text-purple-400">A Revolução da Música Generativa</h3>
          <p class="mb-4">O Suno é uma ferramenta de inteligência artificial capaz de gerar músicas realistas, incluindo vocais e instrumentais, a partir de simples descrições de texto.</p>
          <p class="mb-4">Diferente de outros modelos, o Suno entende nuances de gênero, ritmo e até emoção na voz.</p>
          <div class="bg-slate-800 p-4 rounded-lg border-l-4 border-purple-500 my-6">
            <p class="font-semibold">Dica de Ouro:</p>
            <p>Não pense no Suno apenas como um "gerador". Pense nele como um parceiro de banda que sabe tocar todos os instrumentos.</p>
          </div>
        `,
        imageUrl: 'https://picsum.photos/800/400?grayscale'
      },
      {
        id: 'interface',
        title: 'Tour pela Interface',
        content: `
          <h3 class="text-xl font-bold mb-4 text-purple-400">Navegando no Create Mode</h3>
          <p class="mb-4">Ao acessar o Suno, você verá duas abas principais na área de criação:</p>
          <ul class="list-disc list-inside space-y-2 mb-6 ml-4">
            <li><strong>Simple Mode:</strong> Apenas uma descrição do que você quer. Bom para testes rápidos.</li>
            <li><strong>Custom Mode:</strong> Onde a mágica acontece. Aqui você controla a letra (Lyrics) e o estilo (Style) separadamente.</li>
          </ul>
          <p>Neste curso, focaremos 100% no <strong>Custom Mode</strong> para controle total.</p>
        `,
      }
    ]
  },
  {
    id: 'prompting',
    title: 'Módulo 2: A Arte do Prompt',
    description: 'Domine estilos musicais, estruturas de música e metatags.',
    icon: 'music',
    lessons: [
      {
        id: 'styles',
        title: 'Dominando Estilos Musicais',
        content: `
          <h3 class="text-xl font-bold mb-4 text-purple-400">Como descrever o som perfeito</h3>
          <p class="mb-4">O campo "Style of Music" aceita mais do que apenas gêneros. Tente combinar:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             <div class="bg-slate-800 p-3 rounded">1. <strong>Gênero:</strong> Rock, Jazz, EDM, Lo-fi</div>
             <div class="bg-slate-800 p-3 rounded">2. <strong>Vibe:</strong> Dark, Uplifting, Melancholic</div>
             <div class="bg-slate-800 p-3 rounded">3. <strong>Instrumentos:</strong> Acoustic Guitar, Synth, 808 bass</div>
             <div class="bg-slate-800 p-3 rounded">4. <strong>Voz:</strong> Male voice, Female whisper, Choir</div>
          </div>
          <p class="text-sm text-gray-400">Exemplo: "Upbeat 80s synthpop, female vocals, heavy reverb, catchy hook"</p>
        `
      },
      {
        id: 'metatags',
        title: 'Metatags: Estruturando a Música',
        content: `
          <h3 class="text-xl font-bold mb-4 text-purple-400">O Segredo das Metatags</h3>
          <p class="mb-4">Metatags são comandos entre colchetes <code>[]</code> que dizem à IA como cantar ou tocar.</p>
          <p class="mb-2">Principais tags:</p>
          <ul class="list-none space-y-2 mb-6">
            <li class="bg-slate-800 p-2 rounded border border-slate-700"><code>[Verse]</code> - Conta a história, melodia mais calma.</li>
            <li class="bg-slate-800 p-2 rounded border border-slate-700"><code>[Chorus]</code> - O refrão. Energia alta, repetitivo.</li>
            <li class="bg-slate-800 p-2 rounded border border-slate-700"><code>[Bridge]</code> - Mudança de ritmo antes do final.</li>
            <li class="bg-slate-800 p-2 rounded border border-slate-700"><code>[Intro]</code> e <code>[Outro]</code> - Começo e fim instrumental.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Módulo 3: Técnicas Avançadas',
    description: 'Extensão de faixas, correções e mixagem.',
    icon: 'star',
    lessons: [
      {
        id: 'extend',
        title: 'Usando o Extend',
        content: `
          <h3 class="text-xl font-bold mb-4 text-purple-400">Músicas além de 2 minutos</h3>
          <p class="mb-4">O Suno gera clipes de até 2 minutos (v3) ou 4 minutos (v3.5/v4). Para fazer músicas completas:</p>
          <ol class="list-decimal list-inside space-y-3 ml-2">
            <li>Gere a primeira parte (ex: Verso 1 + Refrão).</li>
            <li>Clique nos três pontinhos (...) e selecione <strong>Extend</strong>.</li>
            <li>No campo "Continue from", certifique-se que o tempo está no final do clipe.</li>
            <li>Escreva a próxima parte da letra (ex: Verso 2) e gere novamente.</li>
          </ol>
        `
      }
    ]
  }
];