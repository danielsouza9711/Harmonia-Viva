export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown-like content or HTML string
  imageUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  icon: 'book' | 'music' | 'settings' | 'star' | 'terminal';
}

export interface GeneratedPrompt {
  style: string;
  lyrics: string;
  title_suggestion: string;
}

export enum AppRoute {
  HOME = 'HOME',
  COURSE = 'COURSE',
  TOOL = 'TOOL',
}
