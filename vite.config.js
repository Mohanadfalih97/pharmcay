import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://medicines-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        // لا تقم بإزالة /api من الرابط
      }
    }
  }
  
})
