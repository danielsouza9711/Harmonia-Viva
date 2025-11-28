import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo (development/production)
  // process.cwd() é usado para localizar o arquivo .env
  // Cast process as any to avoid TypeScript errors in Node environment
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY globalmente para que o código do serviço funcione
      // O JSON.stringify é crucial para injetar o valor corretamente como string
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '') 
    }
  };
});