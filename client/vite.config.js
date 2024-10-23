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
        target: process.env.VITE_API_URL || "https://gpsw.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      external: [
        '@fortawesome/free-solid-svg-icons' // Keep this as external if you're using it that way
        // Removed 'react-transition-group' from external
      ],
    },
  },
  plugins: [react()],
});
