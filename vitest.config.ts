/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    // Include only actual source tests, exclude e2e
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['e2e', '**/e2e/**', 'node_modules', 'dist'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
