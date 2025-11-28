import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cast process to any to resolve TS error about cwd() missing on type Process
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY so the existing service code works without changes
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});