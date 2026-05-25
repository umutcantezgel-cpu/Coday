const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf-8');

// Replace the TIER 1 PRIMITIVE COLORS block
const newTier1 = `  /* ═══ TIER 1: PRIMITIVE COLORS ═══ */
  --color-primary-50: #f0fdfd;
  --color-primary-100: #ccfbfb;
  --color-primary-200: #99f6f6;
  --color-primary-300: #5eead4;
  --color-primary-400: #2dd4bf;
  --color-primary-500: #14b8a6;
  --color-primary-600: #0d9488;
  --color-primary-700: #147a7a;
  --color-primary-800: #115e5e;
  --color-primary-900: #134e4e;
  --color-primary-950: #042f2e;

  --color-secondary-50: #f8fafc;
  --color-secondary-100: #f1f5f9;
  --color-secondary-200: #e2e8f0;
  --color-secondary-300: #cbd5e1;
  --color-secondary-400: #94a3b8;
  --color-secondary-500: #64748b;
  --color-secondary-600: #475569;
  --color-secondary-700: #334155;
  --color-secondary-800: #2d3748;
  --color-secondary-900: #0f172a;
  --color-secondary-950: #020617;

  --color-accent-50: #fffbeb;
  --color-accent-100: #fef3c7;
  --color-accent-200: #fde68a;
  --color-accent-300: #fcd34d;
  --color-accent-400: #fbbf24;
  --color-accent-500: #f59e0b;
  --color-accent-600: #f6ad55;
  --color-accent-700: #d97706;
  --color-accent-800: #b45309;
  --color-accent-900: #92400e;
  --color-accent-950: #78350f;

  --color-neutral-50: #fafafa;
  --color-neutral-100: #f4f4f5;
  --color-neutral-200: #e4e4e7;
  --color-neutral-300: #d4d4d8;
  --color-neutral-400: #a1a1aa;
  --color-neutral-500: #71717a;
  --color-neutral-600: #52525b;
  --color-neutral-700: #3f3f46;
  --color-neutral-800: #27272a;
  --color-neutral-900: #18181b;
  --color-neutral-950: #09090b;

  --color-primary: var(--color-primary-600);
  --color-secondary: var(--color-secondary-900);`;

css = css.replace(/\/\* ═══ TIER 1: PRIMITIVE COLORS ═══ \*\/[\s\S]*?--color-secondary: var\(--color-secondary-900\);/m, newTier1);

// Remove unused theme variables
css = css.replace(/  --animate-fade-in-up[\s\S]*?@keyframes shimmer \{\s*100% \{ transform: translateX\(100%\); \}\s*\}/m, '');
css = css.replace(/  --color-text-slate: #334155;\n/g, '');
css = css.replace(/  --font-size-xs: 0\.618rem;\n[\s\S]*?--font-size-4xl: 6\.854rem;\n/m, '');
css = css.replace(/  --font-weight-light: 300;\n[\s\S]*?--font-weight-extrabold: 800;\n/m, '');
css = css.replace(/  \/\* ═══ FIBONACCI SPACING ═══ \*\/[\s\S]*?--space-12: 256px;\n/m, '');

// Clean up unused utilities in the rest of the CSS
css = css.replace(/\s*\.shape-blob\s*\{\s*border-radius:[^}]+\}/m, '');
css = css.replace(/\s*\.touch-target\s*\{[\s\S]*?\}\n/m, '\n');
css = css.replace(/\s*\.thumb-zone-cta\s*\{[\s\S]*?\}\n/m, '\n');
css = css.replace(/\s*@media\s*\(min-width:\s*768px\)\s*\{\s*\.thumb-zone-cta\s*\{[\s\S]*?\}\s*\}\n/m, '\n');
css = css.replace(/\s*\.touch-feedback\s*\{[\s\S]*?\}\n/g, '\n');
css = css.replace(/\s*\.touch-feedback:active\s*\{[\s\S]*?\}\n/g, '\n');
css = css.replace(/\s*\.content-auto\s*\{[\s\S]*?\}\n/m, '\n');

// Clean up unused status colors
css = css.replace(/\s*--color-success: #38a169;\n\s*--color-warning: #d69e2e;\n\s*--color-error: #e53e3e;\n\s*--color-info: #3182ce;\n/m, '');

// Clean up stray blank lines within theme
css = css.replace(/@theme \{\n\s*\n/g, '@theme {\n');
css = css.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('src/app/globals.css', css, 'utf-8');
console.log('Cleanup complete');
