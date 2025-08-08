import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        '@mediapipe/hands',
        '@mediapipe/camera_utils',
        '@mediapipe/control_utils'
      ],
      output: {
        globals: {
          '@mediapipe/hands': 'Hands',
          '@mediapipe/camera_utils': 'CameraUtils',
          '@mediapipe/control_utils': 'ControlUtils'
        }
      }
    }
  }
})