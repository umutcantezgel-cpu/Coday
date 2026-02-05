import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

import Sitemap from 'vite-plugin-sitemap';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // Define routes for sitemap
  const routes = [
    '/',
    '/services',
    '/services/development/web-apps',
    '/services/development/ecommerce',
    '/services/design/ui-ux',
    '/work',
    '/process',
    '/packages',
    '/contact',
    '/calculator',
    '/legal/impressum',
    '/legal/datenschutz'
  ];

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },


    plugins: [
      { enforce: 'pre', ...mdx() },
      react(),
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { quality: 80, lossless: true },
        avif: { quality: 80, lossless: true },
        svg: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIds: false,
                },
              },
            },
          ],
        },
      }),
      Sitemap({
        hostname: 'https://coday.de',
        dynamicRoutes: routes,
        generateRobotsTxt: false
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    build: {
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // Code splitting strategy
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for stable caching
            'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            // UI libraries (icons only - motion splits naturally with pages)
            'vendor-icons': ['lucide-react'],
            // Zustand state management
            'vendor-state': ['zustand'],
          },
          // Optimize chunk file names for caching
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      },
      // CSS optimization
      cssCodeSplit: true,
      // Source maps for production debugging
      sourcemap: false,
      // Target modern browsers
      target: 'es2020',
      // Report compressed size
      reportCompressedSize: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'zustand', 'react-helmet-async']
    }
  };
});
