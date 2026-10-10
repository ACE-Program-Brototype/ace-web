import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'compression'
import viteCompression from 'vite-plugin-compression'

const compressionDevPlugin = () => ({
  name: 'compression-middleware',
  configureServer(server) {
    server.middlewares.use(compression({ threshold: 0 }))
  },
  configurePreviewServer(server) {
    server.middlewares.use(compression({ threshold: 0 }))
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compressionDevPlugin(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['arm-rain-projection-involves.trycloudflare.com'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
