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

const vercelLogDevPlugin = () => ({
  name: 'vercel-log-dev-middleware',
  configureServer(server) {
    server.middlewares.use('/api/log', (req, res) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const level = (data.level || 'error').toUpperCase();
            const reason = data.reason || (data.error ? (typeof data.error === 'object' ? (data.error.message || JSON.stringify(data.error)) : data.error) : null);
            const line = reason ? `${data.message} | Reason: ${reason}` : data.message;
            console.log(`\x1b[36m[VERCEL LOG SIMULATOR]\x1b[0m \x1b[33m[${level}]\x1b[0m ${line}`);
            if (data.context && Object.keys(data.context).length > 0) {
              console.log('  \x1b[90m↳ Context:\x1b[0m', data.context);
            }
          } catch {
            console.log('[VERCEL LOG SIMULATOR]', body);
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, timestamp: new Date().toISOString() }));
        });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'active', dev: true }));
      }
    });
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compressionDevPlugin(),
    vercelLogDevPlugin(),
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
