import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Age-Calculator-App/',
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setup.ts'
  }
});
