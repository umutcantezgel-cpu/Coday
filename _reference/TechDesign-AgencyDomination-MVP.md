# Technical Design Document: Agency Domination MVP

## Executive Summary

**System:** Agency Domination — "The Market Eater"
**Version:** MVP 1.1 (Aurora Design System)
**Architecture Pattern:** Feature-Sliced Design (FSD) + Jamstack
**Estimated Effort:** 4 weeks (solo + AI assistance)
**Document Status:** Final — Ready for Implementation

### Technical Vision

Eine hochperformante Multi-Page Application, die durch extreme Modularität sowohl als Showcase-Website dient als auch als Template-Basis für das "1 Woche Lieferzeit"-Versprechen an Kunden. Jede architektonische Entscheidung optimiert für:

1. **Performance:** LCP < 1.0s (non-negotiable)
2. **Modularity:** Component extraction für Client-Projekte
3. **AI-Maintainability:** Klare Interfaces, kleine Dateien, deterministische Patterns

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        EDGE LAYER                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Vercel    │  │  Cloudflare │  │   next/image (AVIF)     │  │
│  │   Edge      │  │     CDN     │  │   Optimization          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Next.js 14 (App Router)                 │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐  │   │
│  │  │    RSC     │  │  Client    │  │     API Routes     │  │   │
│  │  │  (Static)  │  │ Components │  │   (Edge Runtime)   │  │   │
│  │  └────────────┘  └────────────┘  └────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Feature-Sliced Design (FSD)                  │   │
│  │  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐    │   │
│  │  │ features │  │   entities   │  │     shared       │    │   │
│  │  │ /calc    │  │   /module    │  │     /ui          │    │   │
│  │  │ /cases   │  │   /lead      │  │     /lib         │    │   │
│  │  └──────────┘  └──────────────┘  └──────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐   │
│  │      Supabase       │  │         Static Assets           │   │
│  │  ┌───────────────┐  │  │  ┌───────────────────────────┐  │   │
│  │  │   PostgreSQL  │  │  │  │   MDX (Case Studies)      │  │   │
│  │  │   - leads     │  │  │  │   JSON (Calculator Cfg)   │  │   │
│  │  │   - analytics │  │  │  │   Images (Optimized)      │  │   │
│  │  └───────────────┘  │  │  └───────────────────────────┘  │   │
│  │  ┌───────────────┐  │  │                                 │   │
│  │  │   Storage     │  │  │                                 │   │
│  │  │   - images    │  │  │                                 │   │
│  │  └───────────────┘  │  │                                 │   │
│  └─────────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    THIRD-PARTY (via Partytown)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Vercel    │  │   Sentry    │  │      Plausible/         │  │
│  │  Analytics  │  │   (Errors)  │  │      PostHog            │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                    ↑ Runs in Web Worker (off main thread)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Decision

### Core Stack (Non-Negotiable)

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| **Framework** | Next.js | 14.2+ | App Router, RSC, Partial Prerendering |
| **Language** | TypeScript | 5.3+ | Strict mode, no `any` |
| **Styling** | Tailwind CSS | 3.4+ | Token-driven via CSS variables |
| **State** | Zustand | 4.5+ | Calculator state, minimal boilerplate |
| **Backend** | Supabase | Latest | PostgreSQL, Auth, Storage, Edge Functions |
| **Deployment** | Vercel | - | Edge network, Image optimization |

### Supporting Stack

| Purpose | Technology | Rationale |
|---------|------------|-----------|
| **Animation** | Framer Motion | RSC-compatible, performant |
| **Forms** | React Hook Form + Zod | Type-safe validation |
| **Icons** | Lucide React | Tree-shakeable, consistent |
| **MDX** | next-mdx-remote | RSC-compatible, Case Studies |
| **Analytics** | Plausible (via Partytown) | Privacy-first, lightweight |
| **Monitoring** | Sentry | Error tracking, performance |
| **Linting** | ESLint + Prettier | AI-consistent formatting |
| **Testing** | Vitest + Playwright | Unit + E2E |

### Explicitly Forbidden

| Technology | Reason |
|------------|--------|
| `any` type | Breaks type safety |
| CSS-in-JS (Styled Components, Emotion) | Runtime cost, RSC incompatible |
| Redux | Overkill for this scope |
| Axios | Native fetch is sufficient |
| Moment.js | Use date-fns or native |
| jQuery | 2024 called, they don't want it back |

---

## Feature-Sliced Design (FSD) Architecture

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing pages group
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx
│   │   ├── process/page.tsx
│   │   └── contact/page.tsx
│   ├── calculator/
│   │   └── page.tsx              # Full calculator page
│   ├── work/
│   │   ├── page.tsx              # Case studies list
│   │   └── [slug]/page.tsx       # Individual case study
│   ├── performance/
│   │   └── page.tsx              # Live metrics dashboard
│   ├── legal/
│   │   ├── impressum/page.tsx
│   │   ├── datenschutz/page.tsx
│   │   └── agb/page.tsx
│   ├── api/
│   │   ├── leads/route.ts        # Lead submission
│   │   ├── performance/route.ts  # Performance metrics
│   │   └── revalidate/route.ts   # On-demand revalidation
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Tailwind + CSS Variables
│   └── not-found.tsx
│
├── features/                     # FSD: Feature modules
│   ├── calculator/               # Calculator feature
│   │   ├── ui/                   # Feature-specific UI
│   │   │   ├── Calculator.tsx
│   │   │   ├── ModuleCard.tsx
│   │   │   ├── ModuleGrid.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── PriceSummary.tsx
│   │   │   └── ConfigShare.tsx
│   │   ├── model/                # Business logic
│   │   │   ├── store.ts          # Zustand store
│   │   │   ├── types.ts          # TypeScript interfaces
│   │   │   ├── selectors.ts      # Derived state
│   │   │   └── validation.ts     # Business rules
│   │   ├── lib/                  # Utilities
│   │   │   ├── pricing.ts        # Price calculation
│   │   │   ├── delivery.ts       # Delivery estimation
│   │   │   └── config-hash.ts    # URL encoding
│   │   ├── api/                  # API integration
│   │   │   └── submit-lead.ts
│   │   └── index.ts              # Barrel export
│   │
│   ├── case-studies/             # Case Studies feature
│   │   ├── ui/
│   │   │   ├── CaseStudyCard.tsx
│   │   │   ├── CaseStudyHero.tsx
│   │   │   ├── ResultsTable.tsx
│   │   │   ├── TechStack.tsx
│   │   │   └── Testimonial.tsx
│   │   ├── model/
│   │   │   └── types.ts
│   │   ├── lib/
│   │   │   ├── mdx.ts            # MDX processing
│   │   │   └── metadata.ts       # SEO generation
│   │   └── index.ts
│   │
│   └── performance/              # Performance showcase
│       ├── ui/
│       │   ├── PerformanceBadge.tsx
│       │   ├── MetricsDashboard.tsx
│       │   └── LighthouseScore.tsx
│       ├── model/
│       │   └── types.ts
│       ├── lib/
│       │   └── web-vitals.ts
│       └── index.ts
│
├── entities/                     # FSD: Business entities
│   ├── module/                   # Calculator module entity
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── schema.ts         # Zod schema
│   │   ├── lib/
│   │   │   └── validation.ts
│   │   └── index.ts
│   │
│   └── lead/                     # Lead entity
│       ├── model/
│       │   ├── types.ts
│       │   └── schema.ts
│       ├── lib/
│       │   └── validation.ts
│       └── index.ts
│
├── shared/                       # FSD: Shared code
│   ├── ui/                       # Design system components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Typography/
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   └── index.ts
│   │   ├── Layout/
│   │   │   ├── Section.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Grid.tsx
│   │   │   └── index.ts
│   │   └── index.ts              # Main barrel export
│   │
│   ├── lib/                      # Shared utilities
│   │   ├── supabase/
│   │   │   ├── client.ts         # Browser client
│   │   │   ├── server.ts         # Server client
│   │   │   └── types.ts          # Generated types
│   │   ├── utils/
│   │   │   ├── cn.ts             # clsx + twMerge
│   │   │   ├── format.ts         # Number/date formatting
│   │   │   └── seo.ts            # Metadata helpers
│   │   └── constants/
│   │       ├── routes.ts
│   │       └── config.ts
│   │
│   ├── hooks/                    # Shared React hooks
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   └── usePerformance.ts
│   │
│   └── config/                   # Configuration files
│       ├── site.ts               # Site metadata
│       ├── navigation.ts         # Nav structure
│       └── modules.json          # Calculator modules (static)
│
├── widgets/                      # FSD: Composed components
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileMenu.tsx
│   │   └── index.ts
│   ├── Footer/
│   ├── CalculatorPreview/        # Homepage calculator teaser
│   └── ContactForm/
│
└── content/                      # Static content
    ├── case-studies/
    │   ├── projekt-alpha.mdx
    │   ├── projekt-beta.mdx
    │   └── projekt-gamma.mdx
    └── legal/
        ├── impressum.mdx
        ├── datenschutz.mdx
        └── agb.mdx
```

### FSD Layer Rules (ENFORCED)

```
Layer Hierarchy (Top → Bottom):
app → widgets → features → entities → shared

Rules:
1. A layer can ONLY import from layers BELOW it
2. app can import from: widgets, features, entities, shared
3. widgets can import from: features, entities, shared
4. features can import from: entities, shared
5. entities can import from: shared
6. shared imports from: external packages only

FORBIDDEN:
- shared importing from features ❌
- entities importing from features ❌
- features importing from widgets ❌
- Circular dependencies ❌
```

### Barrel Export Pattern

Every module must have an `index.ts` that explicitly exports public API:

```typescript
// features/calculator/index.ts
// PUBLIC API - Only these exports are allowed to be imported

// UI Components
export { Calculator } from './ui/Calculator';
export { ModuleCard } from './ui/ModuleCard';
export { PriceSummary } from './ui/PriceSummary';

// Store & State
export { useCalculatorStore } from './model/store';
export type { CalculatorState } from './model/types';

// Utilities (if needed externally)
export { calculateTotal } from './lib/pricing';
export { generateConfigHash } from './lib/config-hash';

// Types
export type { Module, ModuleCategory } from './model/types';
```

---

## Calculator Data Model

### Module Configuration Schema

```typescript
// entities/module/model/types.ts

/**
 * Module category for grouping in the UI
 */
export type ModuleCategory =
  | 'basis'      // Base packages (required)
  | 'design'     // Design upgrades
  | 'function'   // Functionality add-ons
  | 'seo'        // SEO & Performance
  | 'support';   // Support & Maintenance

/**
 * Pricing type determines how the price is displayed and calculated
 */
export type PriceType = 'one-time' | 'monthly';

/**
 * Module definition - the core entity
 */
export interface Module {
  /** Unique identifier (kebab-case) */
  id: string;

  /** Category for filtering */
  category: ModuleCategory;

  /** Display name */
  name: string;

  /** Short description (max 100 chars) */
  description: string;

  /** Detailed description for modal/tooltip */
  details?: string;

  /** Price in EUR (cents for precision) */
  priceInCents: number;

  /** One-time or recurring */
  priceType: PriceType;

  /** Preview image path */
  previewImage?: string;

  /** Module IDs that must be selected first */
  dependencies?: string[];

  /** Module IDs that cannot be combined */
  incompatible?: string[];

  /** Show "Popular" badge */
  isPopular?: boolean;

  /** Show "Recommended" badge (AI-suggested) */
  isRecommended?: boolean;

  /** Sort order within category */
  sortOrder: number;

  /** Estimated days this adds to delivery */
  deliveryDays: number;
}

/**
 * Category metadata for UI
 */
export interface CategoryMeta {
  id: ModuleCategory;
  name: string;
  description: string;
  icon: string;
  required: boolean;      // Must select at least one?
  maxSelections?: number; // Limit selections?
}
```

### Static Module Configuration

```json
// shared/config/modules.json
{
  "version": "1.0.0",
  "lastUpdated": "2026-02-01",
  "categories": [
    {
      "id": "basis",
      "name": "Basis-Pakete",
      "description": "Wähle dein Grundpaket",
      "icon": "package",
      "required": true,
      "maxSelections": 1
    },
    {
      "id": "design",
      "name": "Design-Upgrades",
      "description": "Visuelle Erweiterungen",
      "icon": "palette",
      "required": false
    },
    {
      "id": "function",
      "name": "Funktionen",
      "description": "Erweiterte Features",
      "icon": "zap",
      "required": false
    },
    {
      "id": "seo",
      "name": "Performance & SEO",
      "description": "Sichtbarkeit & Geschwindigkeit",
      "icon": "trending-up",
      "required": false
    },
    {
      "id": "support",
      "name": "Support & Wartung",
      "description": "Laufende Betreuung",
      "icon": "headphones",
      "required": false,
      "maxSelections": 1
    }
  ],
  "modules": [
    {
      "id": "basis-starter",
      "category": "basis",
      "name": "Starter",
      "description": "Perfekt für kleine Projekte (1-5 Seiten)",
      "details": "Enthält: Responsive Design, Kontaktformular, SEO-Grundlagen, 1 Revisionsrunde",
      "priceInCents": 149000,
      "priceType": "one-time",
      "previewImage": "/images/modules/starter.webp",
      "isPopular": true,
      "sortOrder": 1,
      "deliveryDays": 5
    },
    {
      "id": "basis-business",
      "category": "basis",
      "name": "Business",
      "description": "Für wachsende Unternehmen (6-15 Seiten)",
      "details": "Enthält: Alles aus Starter + Blog-Integration, erweiterte Animationen, 2 Revisionsrunden",
      "priceInCents": 299000,
      "priceType": "one-time",
      "previewImage": "/images/modules/business.webp",
      "sortOrder": 2,
      "deliveryDays": 7
    },
    {
      "id": "basis-enterprise",
      "category": "basis",
      "name": "Enterprise",
      "description": "Maximale Flexibilität (16+ Seiten)",
      "details": "Enthält: Alles aus Business + Custom CMS, Multi-Language Ready, 3 Revisionsrunden",
      "priceInCents": 499000,
      "priceType": "one-time",
      "previewImage": "/images/modules/enterprise.webp",
      "sortOrder": 3,
      "deliveryDays": 10
    },
    {
      "id": "design-illustrations",
      "category": "design",
      "name": "Custom Illustrations",
      "description": "Handgezeichnete Illustrationen im Brand-Stil",
      "priceInCents": 49000,
      "priceType": "one-time",
      "sortOrder": 1,
      "deliveryDays": 3
    },
    {
      "id": "design-3d-hero",
      "category": "design",
      "name": "3D Hero Section",
      "description": "Interaktive 3D-Elemente im Header",
      "priceInCents": 69000,
      "priceType": "one-time",
      "sortOrder": 2,
      "deliveryDays": 2
    },
    {
      "id": "design-animations",
      "category": "design",
      "name": "Micro-Animations",
      "description": "Lottie-basierte Animationen für mehr Leben",
      "priceInCents": 39000,
      "priceType": "one-time",
      "sortOrder": 3,
      "deliveryDays": 2
    },
    {
      "id": "design-darkmode",
      "category": "design",
      "name": "Dark Mode Toggle",
      "description": "Automatischer Light/Dark Switch",
      "priceInCents": 19000,
      "priceType": "one-time",
      "sortOrder": 4,
      "deliveryDays": 1
    },
    {
      "id": "design-icons",
      "category": "design",
      "name": "Custom Icon Set",
      "description": "Eigenes Icon-Set passend zum Design",
      "priceInCents": 29000,
      "priceType": "one-time",
      "sortOrder": 5,
      "deliveryDays": 2
    },
    {
      "id": "func-blog",
      "category": "function",
      "name": "Blog-System",
      "description": "Headless CMS für regelmäßige Inhalte",
      "priceInCents": 59000,
      "priceType": "one-time",
      "dependencies": ["seo-basic"],
      "sortOrder": 1,
      "deliveryDays": 3
    },
    {
      "id": "func-newsletter",
      "category": "function",
      "name": "Newsletter-Integration",
      "description": "Anbindung an Mailchimp, ConvertKit o.ä.",
      "priceInCents": 29000,
      "priceType": "one-time",
      "sortOrder": 2,
      "deliveryDays": 1
    },
    {
      "id": "func-contact-advanced",
      "category": "function",
      "name": "Kontaktformular Advanced",
      "description": "Multi-Step Formular mit Datei-Upload",
      "priceInCents": 19000,
      "priceType": "one-time",
      "sortOrder": 3,
      "deliveryDays": 1
    },
    {
      "id": "func-booking",
      "category": "function",
      "name": "Buchungssystem",
      "description": "Calendly-Style Terminbuchung",
      "priceInCents": 49000,
      "priceType": "one-time",
      "sortOrder": 4,
      "deliveryDays": 2
    },
    {
      "id": "func-multilang",
      "category": "function",
      "name": "Multi-Language",
      "description": "2 Sprachen, einfach erweiterbar",
      "priceInCents": 69000,
      "priceType": "one-time",
      "dependencies": ["basis-business"],
      "incompatible": ["basis-starter"],
      "sortOrder": 5,
      "deliveryDays": 3
    },
    {
      "id": "func-portal",
      "category": "function",
      "name": "Kundenportal",
      "description": "Login-Bereich mit geschützten Inhalten",
      "priceInCents": 99000,
      "priceType": "one-time",
      "dependencies": ["basis-enterprise"],
      "sortOrder": 6,
      "deliveryDays": 4
    },
    {
      "id": "seo-basic",
      "category": "seo",
      "name": "SEO-Grundpaket",
      "description": "Meta-Tags, Sitemap, Schema.org",
      "priceInCents": 39000,
      "priceType": "one-time",
      "isPopular": true,
      "sortOrder": 1,
      "deliveryDays": 1
    },
    {
      "id": "seo-premium",
      "category": "seo",
      "name": "SEO-Premium",
      "description": "Keyword-Recherche, Content-Optimierung",
      "priceInCents": 99000,
      "priceType": "one-time",
      "dependencies": ["seo-basic"],
      "sortOrder": 2,
      "deliveryDays": 3
    },
    {
      "id": "seo-speed",
      "category": "seo",
      "name": "Speed-Optimierung",
      "description": "Garantiert LCP < 1s",
      "priceInCents": 29000,
      "priceType": "one-time",
      "isRecommended": true,
      "sortOrder": 3,
      "deliveryDays": 1
    },
    {
      "id": "seo-analytics",
      "category": "seo",
      "name": "Analytics Setup",
      "description": "Plausible/GA4 + Custom Events",
      "priceInCents": 19000,
      "priceType": "one-time",
      "sortOrder": 4,
      "deliveryDays": 1
    },
    {
      "id": "support-basic",
      "category": "support",
      "name": "Basic Support",
      "description": "Email-Support, 48h Response",
      "priceInCents": 0,
      "priceType": "monthly",
      "sortOrder": 1,
      "deliveryDays": 0
    },
    {
      "id": "support-priority",
      "category": "support",
      "name": "Priority Support",
      "description": "24h Response, Telefon-Support",
      "priceInCents": 9900,
      "priceType": "monthly",
      "sortOrder": 2,
      "deliveryDays": 0
    },
    {
      "id": "support-enterprise",
      "category": "support",
      "name": "Enterprise Support",
      "description": "4h Response, Slack-Channel, SLA",
      "priceInCents": 29900,
      "priceType": "monthly",
      "sortOrder": 3,
      "deliveryDays": 0
    }
  ],
  "discountTiers": [
    {
      "minAmount": 500000,
      "discountPercent": 5,
      "label": "5% Rabatt ab 5.000€"
    },
    {
      "minAmount": 1000000,
      "discountPercent": 10,
      "label": "10% Rabatt ab 10.000€"
    }
  ]
}
```

### Zustand Store

```typescript
// features/calculator/model/store.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Module, ModuleCategory } from '@/entities/module';
import { calculatePricing, validateSelection } from '../lib/pricing';
import { estimateDelivery } from '../lib/delivery';
import { generateConfigHash, parseConfigHash } from '../lib/config-hash';

interface CalculatorState {
  // Selection state
  selectedModuleIds: Set<string>;
  activeCategory: ModuleCategory | 'all';

  // Computed (cached)
  totalOneTimeCents: number;
  totalMonthlyCents: number;
  discountPercent: number;
  estimatedDeliveryDays: number;
  validationErrors: ValidationError[];

  // UI state
  isLoading: boolean;
  isSummaryOpen: boolean;
}

interface ValidationError {
  moduleId: string;
  type: 'dependency' | 'incompatible' | 'category-limit';
  message: string;
}

interface CalculatorActions {
  // Module selection
  toggleModule: (moduleId: string) => void;
  selectModule: (moduleId: string) => void;
  deselectModule: (moduleId: string) => void;
  clearSelection: () => void;

  // Category filter
  setActiveCategory: (category: ModuleCategory | 'all') => void;

  // Config sharing
  getShareableUrl: () => string;
  loadFromUrl: (hash: string) => void;

  // UI
  toggleSummary: () => void;

  // Internal
  recalculate: () => void;
}

type CalculatorStore = CalculatorState & CalculatorActions;

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    immer((set, get) => ({
      // Initial state
      selectedModuleIds: new Set<string>(),
      activeCategory: 'all',
      totalOneTimeCents: 0,
      totalMonthlyCents: 0,
      discountPercent: 0,
      estimatedDeliveryDays: 0,
      validationErrors: [],
      isLoading: false,
      isSummaryOpen: false,

      // Actions
      toggleModule: (moduleId) => {
        const { selectedModuleIds } = get();
        if (selectedModuleIds.has(moduleId)) {
          get().deselectModule(moduleId);
        } else {
          get().selectModule(moduleId);
        }
      },

      selectModule: (moduleId) => {
        set((state) => {
          state.selectedModuleIds.add(moduleId);
        });
        get().recalculate();
      },

      deselectModule: (moduleId) => {
        set((state) => {
          state.selectedModuleIds.delete(moduleId);
        });
        get().recalculate();
      },

      clearSelection: () => {
        set((state) => {
          state.selectedModuleIds = new Set();
          state.totalOneTimeCents = 0;
          state.totalMonthlyCents = 0;
          state.discountPercent = 0;
          state.estimatedDeliveryDays = 0;
          state.validationErrors = [];
        });
      },

      setActiveCategory: (category) => {
        set((state) => {
          state.activeCategory = category;
        });
      },

      getShareableUrl: () => {
        const { selectedModuleIds } = get();
        const hash = generateConfigHash(Array.from(selectedModuleIds));
        return `${window.location.origin}/calculator?config=${hash}`;
      },

      loadFromUrl: (hash) => {
        const moduleIds = parseConfigHash(hash);
        set((state) => {
          state.selectedModuleIds = new Set(moduleIds);
        });
        get().recalculate();
      },

      toggleSummary: () => {
        set((state) => {
          state.isSummaryOpen = !state.isSummaryOpen;
        });
      },

      recalculate: () => {
        const { selectedModuleIds } = get();
        const selectedArray = Array.from(selectedModuleIds);

        // Calculate pricing
        const pricing = calculatePricing(selectedArray);

        // Validate selection
        const errors = validateSelection(selectedArray);

        // Estimate delivery
        const deliveryDays = estimateDelivery(selectedArray);

        set((state) => {
          state.totalOneTimeCents = pricing.oneTimeCents;
          state.totalMonthlyCents = pricing.monthlyCents;
          state.discountPercent = pricing.discountPercent;
          state.estimatedDeliveryDays = deliveryDays;
          state.validationErrors = errors;
        });
      },
    })),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedModuleIds: Array.from(state.selectedModuleIds),
      }),
      merge: (persisted, current) => ({
        ...current,
        selectedModuleIds: new Set(
          (persisted as { selectedModuleIds: string[] })?.selectedModuleIds || []
        ),
      }),
    }
  )
);

// Selectors (for derived state)
export const selectSelectedModules = (state: CalculatorStore) =>
  Array.from(state.selectedModuleIds);

export const selectHasValidSelection = (state: CalculatorStore) =>
  state.validationErrors.length === 0 && state.selectedModuleIds.size > 0;

export const selectFormattedTotal = (state: CalculatorStore) => ({
  oneTime: formatCurrency(state.totalOneTimeCents),
  monthly: formatCurrency(state.totalMonthlyCents),
  discount: state.discountPercent > 0
    ? `-${state.discountPercent}%`
    : null,
});

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}
```

### Pricing Logic

```typescript
// features/calculator/lib/pricing.ts

import modulesConfig from '@/shared/config/modules.json';
import type { Module } from '@/entities/module';

interface PricingResult {
  oneTimeCents: number;
  monthlyCents: number;
  discountPercent: number;
  breakdown: {
    moduleId: string;
    name: string;
    originalCents: number;
    finalCents: number;
  }[];
}

export function calculatePricing(selectedIds: string[]): PricingResult {
  const modules = modulesConfig.modules as Module[];
  const discountTiers = modulesConfig.discountTiers;

  let oneTimeCents = 0;
  let monthlyCents = 0;
  const breakdown: PricingResult['breakdown'] = [];

  // Calculate raw totals
  for (const moduleId of selectedIds) {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) continue;

    if (module.priceType === 'one-time') {
      oneTimeCents += module.priceInCents;
    } else {
      monthlyCents += module.priceInCents;
    }

    breakdown.push({
      moduleId: module.id,
      name: module.name,
      originalCents: module.priceInCents,
      finalCents: module.priceInCents, // Will be updated after discount
    });
  }

  // Apply discount tiers (only to one-time)
  let discountPercent = 0;
  for (const tier of discountTiers) {
    if (oneTimeCents >= tier.minAmount) {
      discountPercent = tier.discountPercent;
    }
  }

  if (discountPercent > 0) {
    const discountAmount = Math.round(oneTimeCents * (discountPercent / 100));
    oneTimeCents -= discountAmount;

    // Update breakdown with discounted prices
    for (const item of breakdown) {
      const module = modules.find((m) => m.id === item.moduleId);
      if (module?.priceType === 'one-time') {
        item.finalCents = Math.round(
          item.originalCents * (1 - discountPercent / 100)
        );
      }
    }
  }

  return {
    oneTimeCents,
    monthlyCents,
    discountPercent,
    breakdown,
  };
}

export function validateSelection(
  selectedIds: string[]
): ValidationError[] {
  const modules = modulesConfig.modules as Module[];
  const categories = modulesConfig.categories;
  const errors: ValidationError[] = [];

  // Check dependencies
  for (const moduleId of selectedIds) {
    const module = modules.find((m) => m.id === moduleId);
    if (!module?.dependencies) continue;

    for (const depId of module.dependencies) {
      if (!selectedIds.includes(depId)) {
        const dep = modules.find((m) => m.id === depId);
        errors.push({
          moduleId,
          type: 'dependency',
          message: `"${module.name}" benötigt "${dep?.name}"`,
        });
      }
    }
  }

  // Check incompatibilities
  for (const moduleId of selectedIds) {
    const module = modules.find((m) => m.id === moduleId);
    if (!module?.incompatible) continue;

    for (const incompId of module.incompatible) {
      if (selectedIds.includes(incompId)) {
        const incomp = modules.find((m) => m.id === incompId);
        errors.push({
          moduleId,
          type: 'incompatible',
          message: `"${module.name}" ist nicht kompatibel mit "${incomp?.name}"`,
        });
      }
    }
  }

  // Check category limits
  for (const category of categories) {
    const selectedInCategory = selectedIds.filter((id) => {
      const module = modules.find((m) => m.id === id);
      return module?.category === category.id;
    });

    if (category.required && selectedInCategory.length === 0) {
      errors.push({
        moduleId: '',
        type: 'category-limit',
        message: `Bitte wähle ein ${category.name}`,
      });
    }

    if (
      category.maxSelections &&
      selectedInCategory.length > category.maxSelections
    ) {
      errors.push({
        moduleId: '',
        type: 'category-limit',
        message: `Maximal ${category.maxSelections} ${category.name} erlaubt`,
      });
    }
  }

  return errors;
}
```

---

## Database Schema (Supabase)

### PostgreSQL Schema

```sql
-- ============================================
-- AGENCY DOMINATION - SUPABASE SCHEMA
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Contact Info
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),

    -- Calculator Config
    selected_modules JSONB NOT NULL DEFAULT '[]',
    total_one_time_cents INTEGER NOT NULL DEFAULT 0,
    total_monthly_cents INTEGER NOT NULL DEFAULT 0,
    discount_percent INTEGER NOT NULL DEFAULT 0,
    estimated_delivery_days INTEGER NOT NULL DEFAULT 0,
    config_hash VARCHAR(100),

    -- Additional Info
    message TEXT,
    budget_range VARCHAR(50),
    timeline VARCHAR(50),
    referral_source VARCHAR(100),

    -- Metadata
    ip_address INET,
    user_agent TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),

    -- Status
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    assigned_to UUID REFERENCES auth.users(id),
    notes TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    contacted_at TIMESTAMPTZ,
    converted_at TIMESTAMPTZ
);

-- Indexes for leads
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_config_hash ON public.leads(config_hash);

-- RLS Policies for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admin) can read leads
CREATE POLICY "Admin can read leads" ON public.leads
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Anyone can insert (public form)
CREATE POLICY "Anyone can insert leads" ON public.leads
    FOR INSERT
    WITH CHECK (true);

-- Only admin can update
CREATE POLICY "Admin can update leads" ON public.leads
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- ============================================
-- PERFORMANCE METRICS TABLE
-- ============================================
CREATE TABLE public.performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Metrics
    page_path VARCHAR(255) NOT NULL,
    lcp_ms INTEGER NOT NULL,
    fid_ms INTEGER,
    cls_score DECIMAL(5, 4),
    ttfb_ms INTEGER,
    lighthouse_score INTEGER,

    -- Context
    device_type VARCHAR(20), -- 'mobile' | 'desktop'
    connection_type VARCHAR(20), -- '4g' | '3g' | 'wifi'
    country_code VARCHAR(2),

    -- Timestamps
    measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for metrics
CREATE INDEX idx_metrics_page ON public.performance_metrics(page_path);
CREATE INDEX idx_metrics_measured ON public.performance_metrics(measured_at DESC);

-- Partition by month for performance
-- (Implement if high volume expected)

-- ============================================
-- CASE STUDIES TABLE (CMS)
-- ============================================
CREATE TABLE public.case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Basic Info
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),

    -- Quick Stats
    industry VARCHAR(100),
    duration_weeks INTEGER,
    budget_range VARCHAR(50),
    key_result VARCHAR(255), -- e.g., "+340% Organic Traffic"

    -- Content (MDX stored separately, this is metadata)
    excerpt TEXT,
    cover_image VARCHAR(500),
    featured_image VARCHAR(500),

    -- Results Metrics
    metrics JSONB DEFAULT '[]',
    -- Format: [{ "label": "Page Load", "before": "4.2s", "after": "0.9s", "change": "-78%" }]

    -- Tech Stack Used
    tech_stack JSONB DEFAULT '[]',
    -- Format: ["Next.js", "Supabase", "Tailwind"]

    -- Client Info
    client_name VARCHAR(255),
    client_position VARCHAR(100),
    client_company VARCHAR(255),
    testimonial TEXT,
    client_logo VARCHAR(500),

    -- SEO
    meta_title VARCHAR(70),
    meta_description VARCHAR(160),

    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,

    -- Sorting
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for case studies
CREATE INDEX idx_cases_slug ON public.case_studies(slug);
CREATE INDEX idx_cases_status ON public.case_studies(status);
CREATE INDEX idx_cases_featured ON public.case_studies(is_featured) WHERE is_featured = true;

-- RLS Policies for case studies
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Anyone can read published case studies
CREATE POLICY "Public can read published" ON public.case_studies
    FOR SELECT
    USING (status = 'published');

-- Admin can do everything
CREATE POLICY "Admin full access" ON public.case_studies
    FOR ALL
    USING (auth.role() = 'authenticated');

-- ============================================
-- ANALYTICS EVENTS TABLE
-- ============================================
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Event Info
    event_name VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT '{}',

    -- Context
    page_path VARCHAR(255),
    referrer VARCHAR(500),
    session_id VARCHAR(100),

    -- User Context
    device_type VARCHAR(20),
    browser VARCHAR(50),
    os VARCHAR(50),
    country_code VARCHAR(2),

    -- UTM
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for analytics
CREATE INDEX idx_analytics_event ON public.analytics_events(event_name);
CREATE INDEX idx_analytics_created ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_session ON public.analytics_events(session_id);

-- Hypertable for time-series (if using TimescaleDB)
-- SELECT create_hypertable('analytics_events', 'created_at');

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER cases_updated_at
    BEFORE UPDATE ON public.case_studies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Run in Supabase Dashboard or via API

-- Case study images
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('case-studies', 'case-studies', true);

-- General assets
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('assets', 'assets', true);
```

### TypeScript Types (Generated)

```typescript
// shared/lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          company_name: string;
          contact_name: string;
          email: string;
          phone: string | null;
          selected_modules: Json;
          total_one_time_cents: number;
          total_monthly_cents: number;
          discount_percent: number;
          estimated_delivery_days: number;
          config_hash: string | null;
          message: string | null;
          budget_range: string | null;
          timeline: string | null;
          referral_source: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['leads']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
      };
      case_studies: {
        Row: {
          id: string;
          slug: string;
          title: string;
          tagline: string | null;
          industry: string | null;
          duration_weeks: number | null;
          budget_range: string | null;
          key_result: string | null;
          excerpt: string | null;
          cover_image: string | null;
          metrics: Json;
          tech_stack: Json;
          client_name: string | null;
          testimonial: string | null;
          status: string;
          published_at: string | null;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['case_studies']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<
          Database['public']['Tables']['case_studies']['Insert']
        >;
      };
    };
  };
}
```

---

## Performance Strategy

### Target Metrics

| Metric | Target | Acceptable | Critical |
|--------|--------|------------|----------|
| LCP | < 1.0s | < 1.5s | > 2.0s |
| FID | < 50ms | < 100ms | > 200ms |
| CLS | < 0.05 | < 0.1 | > 0.25 |
| TTFB | < 100ms | < 200ms | > 500ms |
| TTI | < 1.5s | < 2.5s | > 5.0s |
| Bundle (JS) | < 100KB | < 150KB | > 200KB |

### Optimization Strategies

#### 1. React Server Components (RSC)

```typescript
// app/work/[slug]/page.tsx
// This entire page is a Server Component - zero JS shipped

import { getCaseStudy } from '@/features/case-studies';
import { CaseStudyHero, ResultsTable } from '@/features/case-studies/ui';

interface Props {
  params: { slug: string };
}

// Static generation at build time
export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

// Page component - runs on server only
export default async function CaseStudyPage({ params }: Props) {
  const study = await getCaseStudy(params.slug);

  return (
    <article>
      {/* These components render on server, send only HTML */}
      <CaseStudyHero study={study} />
      <ResultsTable metrics={study.metrics} />

      {/* Only this component needs client JS */}
      <ShareButtons slug={params.slug} />
    </article>
  );
}
```

#### 2. Image Optimization

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default config;
```

```typescript
// shared/ui/Image/OptimizedImage.tsx
import Image from 'next/image';
import type { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'loading'> {
  priority?: boolean;
}

export function OptimizedImage({
  priority = false,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      loading={priority ? 'eager' : 'lazy'}
      quality={85}
      placeholder="blur"
      blurDataURL={generateBlurHash(props.src)}
    />
  );
}
```

#### 3. Third-Party Script Isolation (Partytown)

```typescript
// app/layout.tsx
import { Partytown } from '@builder.io/partytown/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <Partytown forward={['dataLayer.push', 'plausible']} />
      </head>
      <body>
        {children}

        {/* Analytics runs in Web Worker */}
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function() {
                (window.plausible.q = window.plausible.q || []).push(arguments)
              }
            `,
          }}
        />
        <script
          type="text/partytown"
          defer
          data-domain="agency-domination.com"
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}
```

#### 4. Bundle Optimization

```typescript
// next.config.ts
const config: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-*',
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Replace large packages with lighter alternatives
      config.resolve.alias = {
        ...config.resolve.alias,
        'lodash': 'lodash-es',
      };
    }
    return config;
  },
};
```

#### 5. Font Optimization

```typescript
// app/layout.tsx
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
  weight: ['400', '500', '600', '700', '900'], // Include black for gradient text
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: false, // Only load when needed
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

#### 6. Critical CSS Extraction

```css
/* app/globals.css */

/* Critical CSS - Inline in <head> */
@layer critical {
  :root {
    --aurora-white: #FFFFFF;
    --aurora-charcoal: #374151;
    --aurora-sapphire: #2563EB;
    --gradient-text: linear-gradient(135deg, #2563EB, #4F46E5, #7C3AED);
  }

  html {
    background-color: var(--aurora-white);
    color: var(--aurora-charcoal);
  }

  /* Prevent layout shift for header */
  header {
    height: 80px;
  }
}

/* Non-critical styles load after */
@layer components {
  /* ... */
}
```

### Performance Monitoring

```typescript
// shared/lib/performance/web-vitals.ts

import { onCLS, onFID, onLCP, onTTFB, type Metric } from 'web-vitals';

const vitalsUrl = '/api/performance';

function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
  });

  // Use `navigator.sendBeacon` if available
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, body);
  } else {
    fetch(vitalsUrl, {
      body,
      method: 'POST',
      keepalive: true,
    });
  }
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

---

## Component Library

### Design Tokens Implementation

```css
/* app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* === AURORA COLOR SYSTEM (Light Mode) === */

    /* Base Palette (Light backgrounds) */
    --aurora-white: 255 255 255;       /* #FFFFFF */
    --aurora-snow: 250 251 252;        /* #FAFBFC */
    --aurora-cloud: 243 244 246;       /* #F3F4F6 */
    --aurora-mist: 229 231 235;        /* #E5E7EB */
    --aurora-steel: 156 163 175;       /* #9CA3AF */
    --aurora-slate: 107 114 128;       /* #6B7280 */
    --aurora-charcoal: 55 65 81;       /* #374151 */
    --aurora-deep: 17 24 39;           /* #111827 */

    /* Blue Gradient Spectrum (Core Palette) */
    --aurora-sky: 96 165 250;          /* #60A5FA */
    --aurora-azure: 59 130 246;        /* #3B82F6 */
    --aurora-sapphire: 37 99 235;      /* #2563EB */
    --aurora-indigo: 79 70 229;        /* #4F46E5 */
    --aurora-violet: 124 58 237;       /* #7C3AED */
    --aurora-purple: 147 51 234;       /* #9333EA */
    --aurora-magenta: 192 38 211;      /* #C026D3 */
    --aurora-pink: 236 72 153;         /* #EC4899 */
    --aurora-abyss: 30 58 95;          /* #1E3A5F */

    /* Semantic Colors */
    --aurora-success: 16 185 129;      /* #10B981 */
    --aurora-warning: 245 158 11;      /* #F59E0B */
    --aurora-error: 239 68 68;         /* #EF4444 */

    /* === GRADIENTS === */
    --gradient-ocean: linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%);
    --gradient-twilight: linear-gradient(135deg, #3B82F6 0%, #4F46E5 50%, #7C3AED 100%);
    --gradient-aurora: linear-gradient(135deg, #60A5FA 0%, #7C3AED 50%, #EC4899 100%);
    --gradient-text: linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%);
    --gradient-text-vivid: linear-gradient(135deg, #3B82F6 0%, #9333EA 50%, #EC4899 100%);

    /* Glass Effect */
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.3);
    --glass-shadow: 0 8px 32px rgba(37, 99, 235, 0.1);

    /* === TYPOGRAPHY === */
    --font-display: 'Outfit', system-ui, sans-serif;
    --font-body: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* === SPACING === */
    --section-padding: clamp(4rem, 8vw, 8rem);
    --container-max: 1440px;
    --container-padding: clamp(1rem, 4vw, 2rem);

    /* === MOTION === */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --duration-fast: 200ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --duration-float: 6000ms;

    /* === BORDERS === */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
  }

  /* Light mode is default */
  html {
    color-scheme: light;
  }

  body {
    @apply bg-aurora-white text-aurora-charcoal antialiased;
    font-family: var(--font-body);
  }

  /* Selection color */
  ::selection {
    @apply bg-aurora-azure/20 text-aurora-deep;
  }
}

@layer components {
  /* === GRADIENT TEXT (Key Feature) === */

  .text-gradient {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-gradient-vivid {
    background: var(--gradient-text-vivid);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* === BUTTON SYSTEM === */

  .btn {
    @apply inline-flex items-center justify-center gap-2
           font-medium transition-all duration-fast
           focus-visible:outline-none focus-visible:ring-2
           focus-visible:ring-aurora-sapphire focus-visible:ring-offset-2
           focus-visible:ring-offset-aurora-white
           disabled:pointer-events-none disabled:opacity-50;
  }

  .btn-primary {
    @apply btn text-white shadow-lg shadow-aurora-sapphire/25
           active:scale-[0.98];
    background: var(--gradient-ocean);
  }

  .btn-primary:hover {
    filter: brightness(1.1);
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
  }

  .btn-secondary {
    @apply btn border-2 bg-transparent
           hover:bg-aurora-cloud;
    border-image: var(--gradient-twilight) 1;
  }

  .btn-ghost {
    @apply btn text-aurora-slate
           hover:text-aurora-sapphire hover:bg-aurora-cloud;
  }

  .btn-sm { @apply h-9 px-4 text-sm rounded-lg; }
  .btn-md { @apply h-11 px-6 text-base rounded-xl; }
  .btn-lg { @apply h-14 px-8 text-lg rounded-2xl; }

  /* === CARD SYSTEM === */

  .card {
    @apply rounded-2xl bg-aurora-white border border-aurora-mist
           shadow-lg shadow-aurora-slate/5
           transition-all duration-fast;
  }

  .card-interactive {
    @apply card cursor-pointer
           hover:border-aurora-azure/30 hover:-translate-y-1
           hover:shadow-xl hover:shadow-aurora-sapphire/10;
  }

  .card-selected {
    @apply card border-aurora-sapphire bg-aurora-sapphire/5
           ring-2 ring-aurora-sapphire/20;
  }

  .card-glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    backdrop-filter: blur(12px);
    @apply rounded-2xl;
  }

  /* === INPUT SYSTEM === */

  .input {
    @apply w-full rounded-xl border border-aurora-mist bg-aurora-white
           px-4 py-3 text-aurora-charcoal placeholder:text-aurora-steel
           transition-all duration-fast
           focus:border-aurora-azure focus:outline-none
           focus:ring-4 focus:ring-aurora-azure/10;
  }

  .input-error {
    @apply input border-aurora-error focus:border-aurora-error
           focus:ring-aurora-error/10;
  }

  /* === FLOATING BLOBS (Background Decoration) === */

  .aurora-blob {
    @apply absolute rounded-full pointer-events-none;
    filter: blur(80px);
    opacity: 0.4;
    animation: blob-float var(--duration-float) ease-in-out infinite;
  }

  @keyframes blob-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
}

@layer utilities {
  /* === TYPOGRAPHY === */

  .text-display {
    font-family: var(--font-display);
    @apply font-bold tracking-tight;
  }

  .text-mono {
    font-family: var(--font-mono);
  }

  /* === LAYOUT === */

  .section {
    padding-top: var(--section-padding);
    padding-bottom: var(--section-padding);
  }

  .container-custom {
    max-width: var(--container-max);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--container-padding);
    padding-right: var(--container-padding);
  }

  /* === ANIMATIONS === */

  .animate-in {
    animation: animate-in var(--duration-normal) var(--ease-out-expo);
  }

  @keyframes animate-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Gradient text animation */
  .animate-gradient {
    background-size: 300% 100%;
    animation: gradient-shift 8s ease infinite;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Aurora Base Palette (Light mode)
        'aurora-white': 'rgb(var(--aurora-white) / <alpha-value>)',
        'aurora-snow': 'rgb(var(--aurora-snow) / <alpha-value>)',
        'aurora-cloud': 'rgb(var(--aurora-cloud) / <alpha-value>)',
        'aurora-mist': 'rgb(var(--aurora-mist) / <alpha-value>)',
        'aurora-steel': 'rgb(var(--aurora-steel) / <alpha-value>)',
        'aurora-slate': 'rgb(var(--aurora-slate) / <alpha-value>)',
        'aurora-charcoal': 'rgb(var(--aurora-charcoal) / <alpha-value>)',
        'aurora-deep': 'rgb(var(--aurora-deep) / <alpha-value>)',

        // Aurora Blue Spectrum
        'aurora-sky': 'rgb(var(--aurora-sky) / <alpha-value>)',
        'aurora-azure': 'rgb(var(--aurora-azure) / <alpha-value>)',
        'aurora-sapphire': 'rgb(var(--aurora-sapphire) / <alpha-value>)',
        'aurora-indigo': 'rgb(var(--aurora-indigo) / <alpha-value>)',
        'aurora-violet': 'rgb(var(--aurora-violet) / <alpha-value>)',
        'aurora-purple': 'rgb(var(--aurora-purple) / <alpha-value>)',
        'aurora-magenta': 'rgb(var(--aurora-magenta) / <alpha-value>)',
        'aurora-pink': 'rgb(var(--aurora-pink) / <alpha-value>)',
        'aurora-abyss': 'rgb(var(--aurora-abyss) / <alpha-value>)',

        // Semantic Colors
        'aurora-success': 'rgb(var(--aurora-success) / <alpha-value>)',
        'aurora-warning': 'rgb(var(--aurora-warning) / <alpha-value>)',
        'aurora-error': 'rgb(var(--aurora-error) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'hero': ['clamp(4rem, 2.5rem + 7.5vw, 8rem)', { lineHeight: '1.1' }],
        '5xl': ['clamp(3rem, 2rem + 5vw, 5rem)', { lineHeight: '1.1' }],
        '4xl': ['clamp(2.5rem, 1.75rem + 3.75vw, 4rem)', { lineHeight: '1.1' }],
        '3xl': ['clamp(2rem, 1.5rem + 2.5vw, 3rem)', { lineHeight: '1.2' }],
        '2xl': ['clamp(1.5rem, 1.25rem + 1.25vw, 2rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        'section': 'var(--section-padding)',
      },
      maxWidth: {
        'container': 'var(--container-max)',
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out-expo)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
        'float': 'var(--duration-float)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      backgroundImage: {
        'gradient-ocean': 'var(--gradient-ocean)',
        'gradient-twilight': 'var(--gradient-twilight)',
        'gradient-aurora': 'var(--gradient-aurora)',
        'gradient-text': 'var(--gradient-text)',
        'gradient-text-vivid': 'var(--gradient-text-vivid)',
      },
      boxShadow: {
        'glass': 'var(--glass-shadow)',
        'aurora': '0 10px 40px rgba(37, 99, 235, 0.15)',
        'aurora-lg': '0 20px 60px rgba(37, 99, 235, 0.2)',
      },
      animation: {
        'blob-float': 'blob-float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        'blob-float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(({ addVariant, addUtilities }) => {
      addVariant('hocus', ['&:hover', '&:focus-visible']);

      // Gradient text utilities
      addUtilities({
        '.text-gradient': {
          background: 'var(--gradient-text)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-vivid': {
          background: 'var(--gradient-text-vivid)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      });
    }),
  ],
};

export default config;
```

---

## Development Workflow

### Git Strategy

```
main (protected)
├── develop
│   ├── feature/calculator-core
│   ├── feature/case-studies
│   ├── feature/performance-badge
│   └── fix/mobile-nav
└── release/v1.0.0
```

### Branch Naming Convention

```
feature/[feature-name]    # New features
fix/[bug-description]     # Bug fixes
refactor/[scope]          # Code improvements
docs/[scope]              # Documentation
perf/[scope]              # Performance improvements
```

### Commit Convention

```
type(scope): message

Types: feat, fix, refactor, docs, style, perf, test, chore
Scope: calculator, case-studies, ui, config, etc.

Examples:
feat(calculator): add module dependency validation
fix(ui): correct button hover state on mobile
perf(images): implement AVIF with fallback
```

### Pre-commit Hooks

```json
// package.json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run typecheck
```

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - name: Type Check
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Unit Tests
        run: pnpm test

      - name: Build
        run: pnpm build

  lighthouse:
    runs-on: ubuntu-latest
    needs: quality
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4

      - uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/calculator",
        "http://localhost:3000/work"
      ],
      "startServerCommand": "pnpm start",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 1000 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

---

## AI Workflow Integration

### File Size Guidelines (AI-Friendly)

| File Type | Max Lines | Rationale |
|-----------|-----------|-----------|
| Component | 150 | Easy to understand in context |
| Hook | 80 | Single responsibility |
| Utility | 100 | Focused functions |
| Store | 200 | Business logic centralized |
| Types | 100 | Clear interfaces |
| Test | 200 | Comprehensive but readable |

### Code Patterns for AI Maintainability

```typescript
// GOOD: Clear interface, small file
// features/calculator/model/types.ts

/** Calculator module entity */
export interface Module {
  /** Unique kebab-case identifier */
  id: string;
  /** Display name shown in UI */
  name: string;
  /** Price in cents (avoids floating point) */
  priceInCents: number;
}

// GOOD: Single responsibility utility
// features/calculator/lib/pricing.ts

import type { Module } from '../model/types';

/**
 * Calculate total price with discount tiers
 * @param modules - Selected modules
 * @returns Total in cents with discount applied
 */
export function calculateTotal(modules: Module[]): number {
  const subtotal = modules.reduce((sum, m) => sum + m.priceInCents, 0);
  const discount = getDiscount(subtotal);
  return subtotal - discount;
}

function getDiscount(subtotal: number): number {
  if (subtotal >= 1000000) return subtotal * 0.10; // 10% off
  if (subtotal >= 500000) return subtotal * 0.05;  // 5% off
  return 0;
}
```

### JSDoc Requirements

All exported functions and interfaces must have JSDoc comments:

```typescript
/**
 * Brief description of what this does
 *
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 *
 * @example
 * ```ts
 * const result = myFunction('input');
 * // result: 'expected output'
 * ```
 */
```

---

## Deployment

### Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/ingest/:path*",
      "destination": "https://plausible.io/:path*"
    }
  ]
}
```

### Environment Variables

```bash
# .env.local (development)
# .env.production (production - set in Vercel)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=agency-domination.com

# Sentry
NEXT_PUBLIC_SENTRY_DSN=xxx
SENTRY_AUTH_TOKEN=xxx

# Build
NEXT_PUBLIC_SITE_URL=https://agency-domination.com
```

---

## Cost Analysis

### Development Phase

| Service | Free Tier | Paid | Estimated |
|---------|-----------|------|-----------|
| Vercel | Hobby | Pro $20/mo | Free initially |
| Supabase | 500MB, 50k MAU | Pro $25/mo | Free initially |
| Plausible | — | $9/mo | $9/mo |
| Sentry | 5k errors | $26/mo | Free initially |
| Domain | — | ~$15/yr | $15/yr |
| **Total** | | | **$9/mo + $15/yr** |

### Production Phase (Post-Launch)

| Scale | Vercel | Supabase | Plausible | Sentry | Total |
|-------|--------|----------|-----------|--------|-------|
| <1k visitors | Free | Free | $9 | Free | $9/mo |
| 1k-10k visitors | $20 | Free | $9 | Free | $29/mo |
| 10k-50k visitors | $20 | $25 | $19 | $26 | $90/mo |

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| LCP > 1s | Low | Critical | Lighthouse CI blocks deployment |
| Supabase downtime | Low | High | Static fallback for critical content |
| Bundle bloat | Medium | Medium | Size limits in CI, tree-shaking audit |
| Design inconsistency | Medium | Medium | Token enforcement, Storybook review |
| AI code quality | Medium | Medium | Strict types, comprehensive tests |

---

## Definition of Technical Success

### MVP Complete When:

- [ ] All P0 features implemented and tested
- [ ] Lighthouse Score > 95 on all pages
- [ ] LCP < 1.0s verified on slow 3G simulation
- [ ] WCAG 2.1 AA compliance verified
- [ ] Zero TypeScript errors (strict mode)
- [ ] Test coverage > 80% on business logic
- [ ] CI/CD pipeline fully operational
- [ ] Production deployment stable for 24h
- [ ] Performance monitoring active

---

## Appendices

### A. Component Inventory

| Component | Location | RSC? | Priority |
|-----------|----------|------|----------|
| Button | shared/ui/Button | No | P0 |
| Card | shared/ui/Card | Yes | P0 |
| Input | shared/ui/Input | No | P0 |
| ModuleCard | features/calculator/ui | No | P0 |
| Calculator | features/calculator/ui | No | P0 |
| CaseStudyCard | features/case-studies/ui | Yes | P0 |
| PerformanceBadge | features/performance/ui | No | P0 |
| Header | widgets/Header | Partial | P0 |
| Footer | widgets/Footer | Yes | P1 |

### B. API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| /api/leads | POST | Submit calculator lead |
| /api/performance | POST | Log Web Vitals |
| /api/revalidate | POST | On-demand ISR |

### C. External Integrations

| Service | Purpose | SDK/Method |
|---------|---------|------------|
| Supabase | Database, Auth | @supabase/supabase-js |
| Plausible | Analytics | Script (Partytown) |
| Sentry | Error tracking | @sentry/nextjs |
| Resend | Email notifications | @resend/node |

---

*Version: 1.1*
*Last Updated: 2026-02-02*
*Design System: Aurora Protocol (Light Mode)*
*Next Review: Post-MVP Launch*
*Technical Lead: AI-Assisted Development*
