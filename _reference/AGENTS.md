# AGENTS.md — Master Plan for Agency Domination

> **This is the single source of truth for AI agents working on this project.**
> Read this file FIRST before any implementation.

---

## Project Overview

**App:** Agency Domination — "The Market Eater"
**Goal:** High-performance agency website with interactive "Supermarket" calculator
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind + Zustand + Supabase
**Architecture:** Feature-Sliced Design (FSD)
**Current Phase:** Phase 1 — Foundation

---

## How I Should Think

Before writing ANY code, follow this cognitive framework:

1. **Understand Intent First**
   - Read the relevant `agent_docs/` file for context
   - Identify which FSD layer this change belongs to
   - Verify the change aligns with PRD requirements

2. **Ask If Unsure**
   - If critical information is missing, ASK before proceeding
   - Never assume — assumptions lead to rework
   - One specific clarifying question is better than wrong code

3. **Plan Before Coding**
   - Propose a brief implementation plan
   - List files that will be created/modified
   - Wait for approval before writing code

4. **Verify After Changes**
   - Run `pnpm typecheck` after TypeScript changes
   - Run `pnpm lint` to catch style issues
   - Run `pnpm test` if tests exist for the module
   - Check the browser for visual verification

5. **Explain Trade-offs**
   - When recommending an approach, mention alternatives
   - Be explicit about performance implications
   - Note any technical debt being introduced

---

## Plan → Execute → Verify (MANDATORY)

Every feature implementation MUST follow this loop:

```
┌─────────────────────────────────────────────────────────────┐
│  1. PLAN                                                     │
│     - Read relevant agent_docs/                             │
│     - Outline approach in 3-5 bullet points                 │
│     - List files to create/modify                           │
│     - ASK FOR APPROVAL                                      │
├─────────────────────────────────────────────────────────────┤
│  2. EXECUTE                                                  │
│     - Implement ONE small piece at a time                   │
│     - Follow FSD layer rules strictly                       │
│     - Use barrel exports for all modules                    │
│     - NO `any` types — use `unknown` + type guards          │
├─────────────────────────────────────────────────────────────┤
│  3. VERIFY                                                   │
│     - pnpm typecheck (must pass)                            │
│     - pnpm lint (must pass)                                 │
│     - pnpm test (if applicable)                             │
│     - Visual check in browser                               │
│     - FIX any issues before moving on                       │
└─────────────────────────────────────────────────────────────┘
```

**CRITICAL:** Do NOT proceed to the next task if verification fails.

---

## Context Files (Load on Demand)

Only load these files when you need specific information:

| File | When to Load |
|------|--------------|
| `agent_docs/tech_stack.md` | Setting up new packages, understanding dependencies |
| `agent_docs/code_patterns.md` | Writing new components, understanding FSD rules |
| `agent_docs/project_brief.md` | Design decisions, Aurora color rules |
| `agent_docs/product_requirements.md` | Feature requirements, acceptance criteria |
| `agent_docs/testing.md` | Writing tests, understanding test strategy |

---

## Current State

**Last Updated:** 2026-02-01
**Working On:** Initial project setup
**Recently Completed:** PRD and Tech Design documentation
**Blocked By:** None

---

## Roadmap

### Phase 1: Foundation ✅ IN PROGRESS

- [ ] **1.1 Project Initialization**
  - Create Next.js 14 project with App Router
  - Configure TypeScript (strict mode)
  - Set up Tailwind with Aurora design tokens
  - Configure ESLint + Prettier
  - Set up Husky pre-commit hooks

- [ ] **1.2 FSD Structure**
  - Create directory structure per Tech Design
  - Set up barrel exports for each layer
  - Configure path aliases in tsconfig.json
  - Add ESLint rules for FSD layer imports

- [ ] **1.3 Design System Foundation**
  - Implement CSS variables in globals.css
  - Create shared/ui/Button component
  - Create shared/ui/Card component
  - Create shared/ui/Input component
  - Create shared/ui/Typography components
  - Document in Storybook (optional)

- [ ] **1.4 Layout Components**
  - Create root layout with fonts
  - Create Header widget (responsive)
  - Create Footer widget
  - Implement mobile navigation
  - Add PerformanceBadge placeholder

---

### Phase 2: Core Features

#### Step 2.1: Calculator Logic (Zustand Store & Types)

- [ ] **2.1.1 Entity: Module**
  - Create `entities/module/model/types.ts` (Module interface)
  - Create `entities/module/model/schema.ts` (Zod validation)
  - Create `entities/module/index.ts` (barrel export)

- [ ] **2.1.2 Static Configuration**
  - Create `shared/config/modules.json` (all 20+ modules)
  - Create TypeScript types for config
  - Validate JSON against Zod schema at build time

- [ ] **2.1.3 Calculator Store**
  - Create `features/calculator/model/types.ts`
  - Create `features/calculator/model/store.ts` (Zustand + Immer)
  - Implement module selection logic
  - Implement dependency validation
  - Implement incompatibility checks

- [ ] **2.1.4 Pricing Logic**
  - Create `features/calculator/lib/pricing.ts`
  - Implement discount tier calculation
  - Implement price breakdown generation
  - Add unit tests for pricing logic

- [ ] **2.1.5 Delivery Estimation**
  - Create `features/calculator/lib/delivery.ts`
  - Calculate cumulative delivery days
  - Add buffer for complexity

- [ ] **2.1.6 Config Sharing**
  - Create `features/calculator/lib/config-hash.ts`
  - Implement URL encoding/decoding
  - Add localStorage persistence

#### Step 2.2: Calculator UI (Components & Animation)

- [ ] **2.2.1 Module Card Component**
  - Create `features/calculator/ui/ModuleCard.tsx`
  - Implement selected/unselected states
  - Add hover animations (Framer Motion)
  - Show badges (Popular, Recommended)
  - Handle dependency warnings

- [ ] **2.2.2 Module Grid**
  - Create `features/calculator/ui/ModuleGrid.tsx`
  - Implement category filtering
  - Responsive grid layout
  - Loading skeleton states

- [ ] **2.2.3 Category Filter**
  - Create `features/calculator/ui/CategoryFilter.tsx`
  - Tab-style category navigation
  - Mobile-friendly (horizontal scroll)
  - Show count per category

- [ ] **2.2.4 Price Summary**
  - Create `features/calculator/ui/PriceSummary.tsx`
  - Sticky positioning on desktop
  - Animated price counter
  - Show one-time vs monthly breakdown
  - Display discount badge
  - Delivery estimate display

- [ ] **2.2.5 Main Calculator Component**
  - Create `features/calculator/ui/Calculator.tsx`
  - Compose all sub-components
  - Handle validation errors display
  - CTA button to contact form

- [ ] **2.2.6 Calculator Page**
  - Create `app/calculator/page.tsx`
  - Add page metadata (SEO)
  - Handle URL config parameter
  - Prefetch contact page

#### Step 2.3: Supabase Integration (Leads & API)

- [ ] **2.3.1 Supabase Setup**
  - Create Supabase project
  - Run schema migrations (from Tech Design)
  - Configure RLS policies
  - Generate TypeScript types

- [ ] **2.3.2 Client Configuration**
  - Create `shared/lib/supabase/client.ts` (browser)
  - Create `shared/lib/supabase/server.ts` (server)
  - Set up environment variables

- [ ] **2.3.3 Lead Entity**
  - Create `entities/lead/model/types.ts`
  - Create `entities/lead/model/schema.ts` (Zod)
  - Create barrel export

- [ ] **2.3.4 Lead Submission API**
  - Create `app/api/leads/route.ts`
  - Validate request body with Zod
  - Insert into Supabase
  - Return success/error response
  - Add rate limiting

- [ ] **2.3.5 Contact Form Integration**
  - Update `widgets/ContactForm` to include calculator config
  - Pre-fill form from calculator state
  - Show configuration summary
  - Handle submission loading state

---

### Phase 3: Case Studies

- [ ] **3.1 MDX Setup**
  - Configure next-mdx-remote
  - Create MDX components (custom styling)
  - Set up content directory structure

- [ ] **3.2 Case Study Components**
  - Create `features/case-studies/ui/CaseStudyCard.tsx`
  - Create `features/case-studies/ui/CaseStudyHero.tsx`
  - Create `features/case-studies/ui/ResultsTable.tsx`
  - Create `features/case-studies/ui/Testimonial.tsx`

- [ ] **3.3 Case Study Pages**
  - Create `app/work/page.tsx` (list view)
  - Create `app/work/[slug]/page.tsx` (detail view)
  - Implement static generation
  - Add SEO metadata generation

- [ ] **3.4 Content Creation**
  - Write 3 complete case studies in MDX
  - Optimize all images (AVIF/WebP)
  - Add structured data (JSON-LD)

---

### Phase 4: Performance & Polish

- [ ] **4.1 Performance Badge**
  - Implement Web Vitals collection
  - Create live LCP display
  - Create `/performance` dashboard page

- [ ] **4.2 Analytics Integration**
  - Set up Plausible via Partytown
  - Add custom events for calculator
  - Track lead submissions

- [ ] **4.3 SEO & Meta**
  - Create dynamic OG images
  - Add sitemap.xml
  - Add robots.txt
  - Implement structured data

- [ ] **4.4 Final Optimization**
  - Run Lighthouse audit
  - Fix any performance issues
  - Verify LCP < 1.0s on all pages
  - Cross-browser testing

---

### Phase 5: Launch

- [ ] **5.1 Legal Pages**
  - Create Impressum
  - Create Datenschutz (Privacy Policy)
  - Create AGB (if needed)
  - Cookie consent banner

- [ ] **5.2 Deployment**
  - Configure Vercel project
  - Set environment variables
  - Configure custom domain
  - Set up error monitoring (Sentry)

- [ ] **5.3 Launch Checklist**
  - [ ] All features working
  - [ ] Mobile responsive verified
  - [ ] Forms submitting correctly
  - [ ] Analytics tracking verified
  - [ ] Performance metrics met
  - [ ] Legal compliance verified

---

## What NOT To Do

### Forbidden Actions

```
❌ Do NOT delete files without explicit confirmation
❌ Do NOT modify database schemas without a migration plan
❌ Do NOT add features not in the current phase
❌ Do NOT skip tests for "simple" changes
❌ Do NOT bypass failing pre-commit hooks
❌ Do NOT use deprecated libraries or patterns
❌ Do NOT commit directly to main branch
```

### Forbidden Code Patterns

```typescript
// ❌ FORBIDDEN: any type
const data: any = fetchData();

// ✅ CORRECT: unknown with type guard
const data: unknown = fetchData();
if (isValidData(data)) {
  // data is now typed
}

// ❌ FORBIDDEN: Magic numbers
<div style={{ padding: '24px', color: '#2563EB' }}>

// ✅ CORRECT: Design tokens
<div className="p-6 text-aurora-sapphire">

// ❌ FORBIDDEN: Cross-layer imports
// In shared/ui/Button.tsx:
import { useCalculatorStore } from '@/features/calculator';

// ✅ CORRECT: Only import from lower layers
// In features/calculator/ui/ModuleCard.tsx:
import { Button } from '@/shared/ui';

// ❌ FORBIDDEN: Non-barrel imports
import { Button } from '@/shared/ui/Button/Button';

// ✅ CORRECT: Barrel imports
import { Button } from '@/shared/ui';
```

---

## Engineering Constraints

### Type Safety (No Compromises)

```typescript
// The `any` type is FORBIDDEN — use `unknown` with type guards
// All function parameters and returns must be typed
// Use Zod for runtime validation of external data

import { z } from 'zod';

const ModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceInCents: z.number().int().positive(),
});

type Module = z.infer<typeof ModuleSchema>;

function parseModule(data: unknown): Module {
  return ModuleSchema.parse(data);
}
```

### Architectural Sovereignty

```
Routes/API handlers: Handle request/response ONLY
Business logic: Goes in features/*/lib/ or entities/*/lib/
State management: Centralized in features/*/model/store.ts
UI components: Presentational, receive data via props
```

### Library Governance

```
Before adding a new dependency:
1. Check if existing package.json has similar functionality
2. Prefer native APIs over libraries (fetch over axios)
3. Check bundle size impact (bundlephobia.com)
4. Verify tree-shaking support
5. Check last update date (avoid abandoned packages)
```

### The "No Apologies" Rule

```
❌ Do NOT apologize for errors — fix them immediately
❌ Do NOT generate filler text before providing solutions
✅ If context is missing, ask ONE specific clarifying question
✅ If you make a mistake, acknowledge it briefly and provide the fix
```

---

## File Organization Quick Reference

```
src/
├── app/                    # Next.js routes (Pages & API)
├── features/               # Feature modules (calculator, case-studies)
│   └── [feature]/
│       ├── ui/             # React components
│       ├── model/          # State & types
│       ├── lib/            # Utilities
│       ├── api/            # API integration
│       └── index.ts        # Barrel export (PUBLIC API)
├── entities/               # Business entities (module, lead)
│   └── [entity]/
│       ├── model/          # Types & schemas
│       ├── lib/            # Validation utilities
│       └── index.ts        # Barrel export
├── shared/                 # Shared code (UI, utils, config)
│   ├── ui/                 # Design system components
│   ├── lib/                # Utilities (supabase, utils)
│   ├── hooks/              # Shared React hooks
│   └── config/             # Configuration files
├── widgets/                # Composed UI blocks (Header, Footer)
└── content/                # Static content (MDX, legal)
```

---

## Commands Reference

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server

# Quality
pnpm typecheck        # TypeScript check (MUST pass)
pnpm lint             # ESLint check (MUST pass)
pnpm lint:fix         # Auto-fix lint issues
pnpm format           # Prettier formatting

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report

# Database
pnpm db:generate      # Generate Supabase types
pnpm db:migrate       # Run migrations (if using)
```

---

## Success Criteria

A task is COMPLETE when:

- [ ] Code compiles without TypeScript errors
- [ ] All lint rules pass
- [ ] Relevant tests pass (or new tests added)
- [ ] Visual appearance matches design spec
- [ ] Performance is not degraded
- [ ] FSD layer rules are respected
- [ ] Barrel exports are updated
- [ ] AGENTS.md "Current State" is updated

---

*Last Updated: 2026-02-02*
*Design System: Aurora Protocol (Light Mode, Gradients)*
*Project Status: Phase 1 — Foundation*
*Next Milestone: FSD Structure Setup*
