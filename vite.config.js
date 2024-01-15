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
        // qq 头像反代地址
        target: 'https://api.fcip.top/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api1/, '')
      },
      '/server': {
        // lss 后台地址
        target: 'http://http://127.0.0.1:1888', 
        changeOrigin: true,
        rewrite: path => path.replace('/server', '')
      }
    }
  }

})
