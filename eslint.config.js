import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist', 'build', 'supabase', '.react-router', 'playwright-report', 'test-results'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['loader', 'action', 'meta', 'links', 'headers', 'prerender'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/no-unresolved': 'error',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // Shared: Cannot import from anywhere upper
            {
              target: 'src/shared',
              from: 'src/entities',
              message: 'Shared cannot import from Entities',
            },
            {
              target: 'src/shared',
              from: 'src/features',
              message: 'Shared cannot import from Features',
            },
            {
              target: 'src/shared',
              from: 'src/widgets',
              message: 'Shared cannot import from Widgets',
            },
            { target: 'src/shared', from: 'src/pages', message: 'Shared cannot import from Pages' },
            { target: 'src/shared', from: 'src/app', message: 'Shared cannot import from App' },
            // Entities: Cannot import from upper
            {
              target: 'src/entities',
              from: 'src/features',
              message: 'Entities cannot import from Features',
            },
            {
              target: 'src/entities',
              from: 'src/widgets',
              message: 'Entities cannot import from Widgets',
            },
            {
              target: 'src/entities',
              from: 'src/pages',
              message: 'Entities cannot import from Pages',
            },
            { target: 'src/entities', from: 'src/app', message: 'Entities cannot import from App' },
            // Features: Cannot import from upper
            {
              target: 'src/features',
              from: 'src/widgets',
              message: 'Features cannot import from Widgets',
            },
            {
              target: 'src/features',
              from: 'src/pages',
              message: 'Features cannot import from Pages',
            },
            { target: 'src/features', from: 'src/app', message: 'Features cannot import from App' },
            // Widgets: Cannot import from upper
            {
              target: 'src/widgets',
              from: 'src/pages',
              message: 'Widgets cannot import from Pages',
            },
            { target: 'src/widgets', from: 'src/app', message: 'Widgets cannot import from App' },
          ],
        },
      ],
    },
  }
);
