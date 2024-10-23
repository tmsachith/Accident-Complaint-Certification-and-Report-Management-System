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
        target: process.env.VITE_API_URL || "https://gpsw.vercel.app", // Using the environment variable or fallback
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@fortawesome/free-solid-svg-icons': resolve(__dirname, 'node_modules/@fortawesome/free-solid-svg-icons'),
      'react-transition-group': resolve(__dirname, 'node_modules/react-transition-group'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        '@fortawesome/free-solid-svg-icons', 
        'react-transition-group'
      ], // Externalize dependencies
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react()],
});
