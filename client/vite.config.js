import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/register-challenge': 'http://localhost:4000',
      '/register-response': 'http://localhost:4000',
      '/login-challenge': 'http://localhost:4000',
      '/login-response': 'http://localhost:4000',
    },
  },
});
