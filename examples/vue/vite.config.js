import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3002,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}) 