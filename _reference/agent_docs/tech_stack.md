# Tech Stack Reference

> Complete technology stack for Agency Domination MVP.
> Reference this document when setting up packages or understanding dependencies.

---

## Core Stack

### Framework: Next.js 14+

```bash
# Installation
npx create-next-app@latest agency-domination --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Key Features Used:**
- App Router (not Pages Router)
- React Server Components (RSC)
- Server Actions (for forms)
- Route Handlers (API routes)
- Image Optimization
- Font Optimization

**Configuration:**
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
};

export default config;
```

---

### Language: TypeScript 5.3+

**Strict Mode Configuration:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**CRITICAL RULES:**
- `any` type is FORBIDDEN
- Use `unknown` + type guards for external data
- All function parameters and returns must be typed

---

### Styling: Tailwind CSS 3.4+

**Installation:**
```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D @tailwindcss/typography @tailwindcss/forms
```

**Antigravity Token Integration:**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ag-black': 'rgb(var(--ag-black) / <alpha-value>)',
        'ag-white': 'rgb(var(--ag-white) / <alpha-value>)',
        'ag-gray': {
          100: 'rgb(var(--ag-gray-100) / <alpha-value>)',
          200: 'rgb(var(--ag-gray-200) / <alpha-value>)',
          300: 'rgb(var(--ag-gray-300) / <alpha-value>)',
          400: 'rgb(var(--ag-gray-400) / <alpha-value>)',
          500: 'rgb(var(--ag-gray-500) / <alpha-value>)',
          600: 'rgb(var(--ag-gray-600) / <alpha-value>)',
          700: 'rgb(var(--ag-gray-700) / <alpha-value>)',
          800: 'rgb(var(--ag-gray-800) / <alpha-value>)',
          900: 'rgb(var(--ag-gray-900) / <alpha-value>)',
        },
        'ag-accent': {
          DEFAULT: 'rgb(var(--ag-accent) / <alpha-value>)',
          hover: 'rgb(var(--ag-accent-hover) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
```

---

### State Management: Zustand 4.5+

**Installation:**
```bash
pnpm add zustand immer
```

**Usage Pattern:**
```typescript
// features/calculator/model/store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CalculatorState {
  selectedModuleIds: Set<string>;
  toggleModule: (id: string) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    immer((set) => ({
      selectedModuleIds: new Set<string>(),

      toggleModule: (id) => {
        set((state) => {
          if (state.selectedModuleIds.has(id)) {
            state.selectedModuleIds.delete(id);
          } else {
            state.selectedModuleIds.add(id);
          }
        });
      },
    })),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

---

### Backend: Supabase

**Installation:**
```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

**Client Setup (Browser):**
```typescript
// shared/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Server Setup:**
```typescript
// shared/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}
```

**Generate Types:**
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/shared/lib/supabase/types.ts
```

---

## Supporting Libraries

### Validation: Zod

```bash
pnpm add zod
```

**Usage:**
```typescript
import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  priceInCents: z.number().int().nonnegative(),
  category: z.enum(['basis', 'design', 'function', 'seo', 'support']),
});

export type Module = z.infer<typeof ModuleSchema>;
```

---

### Animation: Framer Motion

```bash
pnpm add framer-motion
```

**Usage (RSC-compatible):**
```typescript
'use client';

import { motion } from 'framer-motion';

export function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

### Forms: React Hook Form + Zod

```bash
pnpm add react-hook-form @hookform/resolvers
```

**Usage:**
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email('Bitte gültige E-Mail eingeben'),
  message: z.string().min(10, 'Mindestens 10 Zeichen'),
});

type FormData = z.infer<typeof FormSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

---

### Icons: Lucide React

```bash
pnpm add lucide-react
```

**Usage:**
```typescript
import { Package, Palette, Zap } from 'lucide-react';

// Use directly in JSX
<Package className="h-5 w-5 text-ag-gray-400" />
```

---

### MDX: next-mdx-remote

```bash
pnpm add next-mdx-remote
```

**Usage:**
```typescript
// app/work/[slug]/page.tsx
import { compileMDX } from 'next-mdx-remote/rsc';
import { readFile } from 'fs/promises';

export default async function CaseStudyPage({ params }) {
  const source = await readFile(`content/case-studies/${params.slug}.mdx`, 'utf-8');

  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return <article>{content}</article>;
}
```

---

### Utilities: clsx + tailwind-merge

```bash
pnpm add clsx tailwind-merge
```

**Setup:**
```typescript
// shared/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

**Usage:**
```typescript
import { cn } from '@/shared/lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className // Allow override from props
)} />
```

---

## Dev Dependencies

### Linting & Formatting

```bash
pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
pnpm add -D eslint-plugin-import eslint-plugin-jsx-a11y
```

### Git Hooks

```bash
pnpm add -D husky lint-staged
npx husky init
```

### Testing

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test
```

---

## Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=antigravity.agency

# Site
NEXT_PUBLIC_SITE_URL=https://antigravity.agency
```

---

## Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "prepare": "husky"
  }
}
```

---

## Version Summary

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.2+ | Framework |
| react | 18.2+ | UI Library |
| typescript | 5.3+ | Language |
| tailwindcss | 3.4+ | Styling |
| zustand | 4.5+ | State |
| @supabase/supabase-js | latest | Backend |
| zod | 3.22+ | Validation |
| framer-motion | 11+ | Animation |
| react-hook-form | 7+ | Forms |
| lucide-react | 0.300+ | Icons |

---

*Last Updated: 2026-02-01*
