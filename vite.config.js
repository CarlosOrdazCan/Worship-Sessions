import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/login': 'http://localhost:8080',
      '/profile': 'http://localhost:8080',
      '/songs': 'http://localhost:8080',
      '/setlists': 'http://localhost:8080',
      '/requisitions': 'http://localhost:8080',
      '/notifications': 'http://localhost:8080',
      '/alabanza': 'http://localhost:8080',
    },
  },
});
