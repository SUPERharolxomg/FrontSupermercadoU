import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El proxy redirige /api al backend, así el navegador no necesita CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': process.env.API_TARGET || 'http://localhost:3000',
    },
  },
});
