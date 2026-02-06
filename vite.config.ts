import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

import Sitemap from 'vite-plugin-sitemap';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
  // Define routes for sitemap
  // Define specific routes
  const baseRoutes = [
    '', // Root
    '/services',
    '/services/industries',
    '/services/web-development',
    '/services/web-design',
    '/services/seo',
    '/services/performance',
    '/services/enterprise-web',
    '/services/web-development/e-commerce',
    '/services/web-development/web-apps',
    '/services/web-development/cms-headless',
    '/services/web-development/api-integrations',
    '/services/web-development/migration',
    '/services/web-design/ui-ux',
    '/services/web-design/brand-identity',
    '/services/web-design/design-systems',
    '/services/web-design/audit',
    '/work',
    '/work/creative-impact',
    '/work/batherm',
    '/process',
    '/packages',
    '/contact',
    '/calculator',
    '/legal/impressum',
    '/legal/datenschutz',
    '/legal/agb',
    '/booking',
    '/academy',
    '/knowledge/blog',
    '/knowledge/newsletter',
    '/knowledge/whitepapers',
    '/career',
    '/career/jobs',
    '/career/culture',
    '/career/benefits',
    '/analyzer',
  ];

  const languages = ['de', 'en'];

  // Generate all localized routes
  const routes = languages.flatMap((lang) => baseRoutes.map((route) => `/${lang}${route}`));

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
        generateRobotsTxt: false,
      }),
    ],
    define: {
      // API Keys removed for security
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      outDir: 'dist',
      sourcemap: false, // Disabled source maps for security
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for stable caching
            'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            // UI libraries (icons only - motion splits naturally with pages)
            'vendor-icons': ['lucide-react'],
            // Zustand state management
            'vendor-state': ['zustand'],
            // Animation
            'vendor-motion': ['motion/react'],
          },
          // Optimize chunk file names for caching
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      // CSS optimization
      cssCodeSplit: true,
      // Source maps for production debugging

      // Target modern browsers
      target: 'es2020',
      // Report compressed size
      reportCompressedSize: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'motion/react',
        'zustand',
        'react-helmet-async',
      ],
    },
  };
});
