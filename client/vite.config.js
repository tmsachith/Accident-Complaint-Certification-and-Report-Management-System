import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env from the parent directory (root level)
dotenv.config({ path: resolve(__dirname, '../.env') });

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL, // Using the environment variable from .env
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
