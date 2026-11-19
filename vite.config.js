
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/meal-api': {
        target: 'https://www.themealdb.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/meal-api/, ''),
      },
    },
  },
})
