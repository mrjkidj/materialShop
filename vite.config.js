import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005,
    proxy: {
      '/api': {
        target: 'http://3754715-aw99408.twc1.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Не изменяем путь
      },
      '/uploads': {
        target: 'http://localhost:4990', // Адрес сервера, где находятся изображения
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
