import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const PORT = parseInt(process.env.PORT || '5137', 10);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './src') as string
    }
  },
  preview: {
    port: PORT,
    strictPort: true
  },
  server: {
    port: PORT,
    strictPort: true,
    host: true,
    origin: `http://0.0.0.0:${PORT}`
  }
});
