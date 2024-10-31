import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env from the parent directory (root level)
dotenv.config({ path: resolve(__dirname, '../.env') });

export default defineConfig({
  server: {
    proxy: {
      'https://gpsw.vercel.app/api': {
        target: process.env.BACKEND_API_URL || "http://localhost:5000/", // Ensure no trailing slash
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      external: [
        // Removed '@fortawesome/free-solid-svg-icons' from external
      ],
    },
  },
  plugins: [react()],
});
