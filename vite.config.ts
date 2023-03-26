import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
// http://194.135.92.114
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://botsdesk.com/cu',
        secure: false,

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      },
      '/api': {
        target: 'https://botsdesk.com/ag',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
