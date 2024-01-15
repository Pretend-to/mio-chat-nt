import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'emoji-picker'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: '5173',
    proxy: {
      '/qava': {
        // 后台地址
        target: 'https://api.fcip.top/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api1/, '')
      },
      '/mava': {
        // 后台地址
        target: 'http://mio.fcip.top:6050/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api2/, '')
      },
      '/server': {
        // 后台地址
        target: 'http://127.0.0.1:1889',
        changeOrigin: true,
        rewrite: path => path.replace('/server', '')
      }
    }
  }

})
