import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/finnantrack',
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
    dedupe: ['jwt-decode']
  },
  plugins: [
    react(),
    tailwindcss()
  ], 
  optimizeDeps: {
    include: ['jwt-decode']
  }
})
