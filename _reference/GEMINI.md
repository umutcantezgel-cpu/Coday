# GEMINI.md — Google Antigravity Configuration

> **Aurora Design System instructions for Gemini 3 Pro (High) and Claude Opus 4.5**
> This file supplements AGENTS.md with environment-specific directives.
> **Design: Light Mode, Gradient Text, Blue-Violet-Pink spectrum**

---

## Project Context

**App:** Agency Domination — "The Market Eater"
**Stack:** Next.js 14 + TypeScript (Strict) + Tailwind + Zustand + Supabase
**Architecture:** Feature-Sliced Design (FSD)
**Stage:** MVP Development
**User Level:** Developer (Enterprise Standard Required)

---

## Directives

### 1. Master Plan First

```
ALWAYS read AGENTS.md first.
It contains:
- Current phase and active tasks
- Granular roadmap with checkboxes
- What NOT to do
- Success criteria
```

### 2. Documentation On Demand

Load `agent_docs/` files when needed:

| Need | File to Load |
|------|--------------|
| Tech stack questions | `agent_docs/tech_stack.md` |
| Code patterns, FSD rules | `agent_docs/code_patterns.md` |
| Design decisions, colors | `agent_docs/project_brief.md` |
| Feature requirements | `agent_docs/product_requirements.md` |
| Testing strategy | `agent_docs/testing.md` |

### 3. Plan-First Workflow

```
Before writing ANY code:
1. State what you're about to do (2-3 sentences)
2. List files to create/modify
3. WAIT for approval
4. Only then proceed
```

### 4. Incremental Building

```
Build in small, verifiable steps:
- ONE component at a time
- ONE function at a time
- Verify after each step
- Commit logical units
```

### 5. Verification is Mandatory

```bash
# After EVERY change, run:
pnpm typecheck  # Must pass
pnpm lint       # Must pass

# If tests exist:
pnpm test       # Must pass

# Do NOT proceed if any check fails
```

### 6. No Linting in Chat

```
Do NOT act as a linter in conversation.
Use `pnpm lint` command instead.
Focus on implementation, not style nitpicking.
```

### 7. Concise Communication

```
- Be direct and specific
- Ask ONE clarifying question at a time
- No filler text or excessive explanations
- If you made a mistake, fix it immediately
```

---

## Feature-Sliced Design (FSD) Enforcement

### Layer Hierarchy (STRICT)

```
app → widgets → features → entities → shared

Import direction: TOP → BOTTOM only
```

### Import Rules

```typescript
// ✅ ALLOWED
// app/ can import from widgets/, features/, entities/, shared/
// widgets/ can import from features/, entities/, shared/
// features/ can import from entities/, shared/
// entities/ can import from shared/
// shared/ imports from external packages ONLY

// ❌ FORBIDDEN
// shared/ importing from features/ or entities/
// entities/ importing from features/
// features/ importing from widgets/
// ANY circular dependencies
```

### ESLint Will Enforce This

The project includes ESLint rules that block forbidden imports.
If you see an import error, it's likely an FSD violation.

---

## TypeScript Constraints (NON-NEGOTIABLE)

### The `any` Ban

```typescript
// ❌ ABSOLUTELY FORBIDDEN
const data: any = response.json();
function process(input: any): any { }

// ✅ REQUIRED PATTERN
const data: unknown = await response.json();

// With type guard:
function isModule(data: unknown): data is Module {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  );
}

if (isModule(data)) {
  // data is now typed as Module
}
```

### Zod Validation (Required for External Data)

```typescript
import { z } from 'zod';

// Define schema
const ModuleSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  priceInCents: z.number().int().nonnegative(),
  category: z.enum(['basis', 'design', 'function', 'seo', 'support']),
});

// Infer type from schema
type Module = z.infer<typeof ModuleSchema>;

// Validate external data
function parseModules(data: unknown): Module[] {
  const result = z.array(ModuleSchema).safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid modules data: ${result.error.message}`);
  }
  return result.data;
}
```

### Strict Function Typing

```typescript
// ❌ FORBIDDEN: Untyped parameters or returns
function calculate(items) {
  return items.reduce((a, b) => a + b);
}

// ✅ REQUIRED: Full type annotations
function calculateTotal(items: Module[]): number {
  return items.reduce((sum, item) => sum + item.priceInCents, 0);
}
```

---

## Tailwind & Design Token Rules

### No Magic Numbers

```typescript
// ❌ FORBIDDEN: Hardcoded values
<div style={{ padding: '24px', color: '#2563EB' }}>
<div className="p-[24px] text-[#2563EB]">

// ✅ REQUIRED: Design tokens only
<div className="p-6 text-aurora-sapphire">
```

### Color Usage (Aurora Protocol)

```
RULE: Gradient text for H1/H2 headings, gradient backgrounds for CTAs

✅ Required for text-gradient / text-gradient-vivid:
- Hero headlines (H1)
- Section headings (H2)
- Key metrics and results

✅ Required for gradient-ocean / gradient-twilight:
- Primary CTA buttons
- Discount badges
- Active states

✅ Standard Aurora colors:
- aurora-charcoal: Body text
- aurora-deep: Solid headings (subheadings)
- aurora-sapphire: Prices, links
- aurora-azure: Focus states, hover

❌ Forbidden:
- Dark backgrounds on main content (light mode only!)
- Hardcoded colors
- Non-token spacing
```

### Available Color Classes

```
Backgrounds: bg-aurora-white, bg-aurora-snow, bg-aurora-cloud
Text: text-aurora-charcoal, text-aurora-deep, text-aurora-slate
Gradients: text-gradient, text-gradient-vivid
Borders: border-aurora-mist, border-aurora-azure
Accents: text-aurora-sapphire, bg-gradient-ocean
```

---

## Component Patterns

### Barrel Exports (Required)

Every module MUST have an `index.ts` that exports its public API:

```typescript
// features/calculator/index.ts

// UI Components
export { Calculator } from './ui/Calculator';
export { ModuleCard } from './ui/ModuleCard';
export { PriceSummary } from './ui/PriceSummary';

// Store
export { useCalculatorStore } from './model/store';

// Types (re-export only what's needed externally)
export type { CalculatorState } from './model/types';

// Utilities (if needed externally)
export { calculateTotal } from './lib/pricing';
```

### Component File Structure

```typescript
// features/calculator/ui/ModuleCard.tsx

import { type FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/ui';
import type { Module } from '@/entities/module';

interface ModuleCardProps {
  module: Module;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const ModuleCard: FC<ModuleCardProps> = ({
  module,
  isSelected,
  onToggle,
  disabled = false,
}) => {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all bg-aurora-white border border-aurora-mist',
        isSelected && 'border-aurora-sapphire ring-2 ring-aurora-sapphire/20 bg-aurora-sapphire/5',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={disabled ? undefined : onToggle}
    >
      {/* Component content */}
    </Card>
  );
};
```

### Hook Pattern

```typescript
// shared/hooks/useMediaQuery.ts

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

---

## API Route Pattern

```typescript
// app/api/leads/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/shared/lib/supabase/server';

const LeadSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  selectedModules: z.array(z.string()),
  totalOneTimeCents: z.number().int(),
  totalMonthlyCents: z.number().int(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // 1. Parse and validate
    const body: unknown = await request.json();
    const data = LeadSchema.parse(body);

    // 2. Create Supabase client
    const supabase = createServerClient();

    // 3. Insert lead
    const { error } = await supabase
      .from('leads')
      .insert({
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        selected_modules: data.selectedModules,
        total_one_time_cents: data.totalOneTimeCents,
        total_monthly_cents: data.totalMonthlyCents,
        message: data.message,
      });

    if (error) throw error;

    // 4. Return success
    return NextResponse.json({ success: true });

  } catch (error) {
    // 5. Handle errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Performance Requirements

### Target Metrics

| Metric | Target | Blocker |
|--------|--------|---------|
| LCP | < 1.0s | > 1.5s |
| FID | < 50ms | > 100ms |
| CLS | < 0.05 | > 0.1 |
| Bundle (JS) | < 100KB | > 150KB |

### Performance Patterns

```typescript
// 1. Use React Server Components for static content
// app/work/[slug]/page.tsx is a Server Component by default

// 2. Mark interactive components explicitly
'use client';

// 3. Lazy load heavy components
import dynamic from 'next/dynamic';

const Calculator = dynamic(
  () => import('@/features/calculator').then(m => m.Calculator),
  { loading: () => <CalculatorSkeleton /> }
);

// 4. Optimize images
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // Only for above-the-fold images
  quality={85}
/>
```

---

## Commands Reference

```bash
# Development
pnpm dev              # Start dev server

# Quality (RUN AFTER EVERY CHANGE)
pnpm typecheck        # TypeScript — MUST PASS
pnpm lint             # ESLint — MUST PASS
pnpm lint:fix         # Auto-fix issues

# Testing
pnpm test             # Run tests
pnpm test:watch       # Watch mode

# Build
pnpm build            # Production build
pnpm analyze          # Bundle analysis
```

---

## Quick Decision Guide

| Situation | Action |
|-----------|--------|
| Adding new dependency | Check bundle size first |
| Creating component | Use functional component + explicit types |
| Managing state | Zustand for features, React state for UI-only |
| Fetching data | Server Components + fetch, or API routes + SWR |
| Styling | Tailwind classes with design tokens only |
| Form handling | React Hook Form + Zod |
| Error handling | Explicit try/catch, never swallow errors |

---

## Remember

1. **AGENTS.md is the source of truth** — read it first
2. **FSD layers are sacred** — never violate import rules
3. **TypeScript strict mode** — no `any`, ever
4. **Aurora design tokens only** — use `aurora-*` colors, `text-gradient` for headings
5. **Verify before proceeding** — `pnpm typecheck && pnpm lint`
6. **Small steps** — one component, one function at a time

---

*Design System: Aurora Protocol (Light Mode, Gradients)*
*This file is specific to Google Antigravity environment.*
*For universal instructions, see AGENTS.md*
