# Code Patterns & Architecture Rules

> Mandatory patterns for Agency Domination codebase.
> Violations will cause build failures and code review rejections.

---

## Feature-Sliced Design (FSD)

### Layer Hierarchy

```
┌─────────────────────────────────────────────────┐
│  app/         ← Next.js routing layer           │
├─────────────────────────────────────────────────┤
│  widgets/     ← Composed UI blocks              │
├─────────────────────────────────────────────────┤
│  features/    ← Feature modules                 │
├─────────────────────────────────────────────────┤
│  entities/    ← Business entities               │
├─────────────────────────────────────────────────┤
│  shared/      ← Shared utilities & UI           │
└─────────────────────────────────────────────────┘

IMPORT DIRECTION: TOP → BOTTOM only
```

### FSD Layer Rules (ENFORCED)

| Layer | Can Import From | Cannot Import From |
|-------|-----------------|-------------------|
| `app/` | widgets, features, entities, shared | — |
| `widgets/` | features, entities, shared | app |
| `features/` | entities, shared | app, widgets |
| `entities/` | shared | app, widgets, features |
| `shared/` | external packages only | app, widgets, features, entities |

### Import Examples

```typescript
// ✅ CORRECT: app/ importing from features/
// app/calculator/page.tsx
import { Calculator } from '@/features/calculator';

// ✅ CORRECT: features/ importing from entities/
// features/calculator/ui/ModuleCard.tsx
import type { Module } from '@/entities/module';

// ✅ CORRECT: features/ importing from shared/
// features/calculator/ui/Calculator.tsx
import { Button, Card } from '@/shared/ui';

// ❌ FORBIDDEN: shared/ importing from features/
// shared/ui/Button/Button.tsx
import { useCalculatorStore } from '@/features/calculator'; // ERROR!

// ❌ FORBIDDEN: entities/ importing from features/
// entities/module/lib/validation.ts
import { calculateTotal } from '@/features/calculator'; // ERROR!

// ❌ FORBIDDEN: features/ importing from widgets/
// features/calculator/ui/Calculator.tsx
import { Header } from '@/widgets/Header'; // ERROR!
```

### ESLint Rule (Auto-enforced)

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // shared cannot import from upper layers
          {
            target: './src/shared',
            from: './src/entities',
            message: 'shared/ cannot import from entities/',
          },
          {
            target: './src/shared',
            from: './src/features',
            message: 'shared/ cannot import from features/',
          },
          {
            target: './src/shared',
            from: './src/widgets',
            message: 'shared/ cannot import from widgets/',
          },
          // entities cannot import from upper layers
          {
            target: './src/entities',
            from: './src/features',
            message: 'entities/ cannot import from features/',
          },
          {
            target: './src/entities',
            from: './src/widgets',
            message: 'entities/ cannot import from widgets/',
          },
          // features cannot import from widgets
          {
            target: './src/features',
            from: './src/widgets',
            message: 'features/ cannot import from widgets/',
          },
        ],
      },
    ],
  },
};
```

---

## Barrel Export Pattern (MANDATORY)

### What is a Barrel Export?

A single `index.ts` file that re-exports all public APIs from a module.

### Why Required?

1. **Encapsulation:** Internal implementation is hidden
2. **Refactoring:** Change internals without breaking imports
3. **Tree-shaking:** Only imported exports are bundled
4. **Consistency:** One import path per module

### Pattern

```
features/calculator/
├── ui/
│   ├── Calculator.tsx      ← Implementation
│   ├── ModuleCard.tsx      ← Implementation
│   └── PriceSummary.tsx    ← Implementation
├── model/
│   ├── store.ts            ← Implementation
│   └── types.ts            ← Implementation
├── lib/
│   └── pricing.ts          ← Implementation
└── index.ts                ← PUBLIC API (barrel)
```

### Barrel Export File

```typescript
// features/calculator/index.ts

// ==========================================
// PUBLIC API — Only these exports are allowed
// ==========================================

// UI Components
export { Calculator } from './ui/Calculator';
export { ModuleCard } from './ui/ModuleCard';
export { PriceSummary } from './ui/PriceSummary';

// State Management
export { useCalculatorStore } from './model/store';
export {
  selectSelectedModules,
  selectHasValidSelection,
  selectFormattedTotal,
} from './model/selectors';

// Types (export only what external consumers need)
export type {
  CalculatorState,
  ValidationError,
} from './model/types';

// Utilities (only if needed externally)
export { calculateTotal } from './lib/pricing';
export { generateConfigHash } from './lib/config-hash';

// ==========================================
// INTERNAL — Not exported (private)
// ==========================================
// - ./ui/ModuleGrid.tsx (internal composition)
// - ./lib/delivery.ts (internal helper)
// - ./model/validation.ts (internal logic)
```

### Importing From Barrel

```typescript
// ✅ CORRECT: Import from barrel
import { Calculator, useCalculatorStore } from '@/features/calculator';
import type { Module } from '@/entities/module';
import { Button, Card } from '@/shared/ui';

// ❌ FORBIDDEN: Direct file import
import { Calculator } from '@/features/calculator/ui/Calculator';
import { useCalculatorStore } from '@/features/calculator/model/store';
```

---

## Component Patterns

### Functional Component Template

```typescript
// features/calculator/ui/ModuleCard.tsx

import { type FC, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { Card, Badge } from '@/shared/ui';
import type { Module } from '@/entities/module';

// ==========================================
// TYPES
// ==========================================

interface ModuleCardProps {
  /** The module to display */
  module: Module;
  /** Whether this module is currently selected */
  isSelected: boolean;
  /** Callback when module is toggled */
  onToggle: () => void;
  /** Optional: disable interaction */
  disabled?: boolean;
  /** Optional: additional CSS classes */
  className?: string;
}

// ==========================================
// COMPONENT
// ==========================================

export const ModuleCard: FC<ModuleCardProps> = ({
  module,
  isSelected,
  onToggle,
  disabled = false,
  className,
}) => {
  // Event handlers
  const handleClick = (e: MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    onToggle();
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      <Card
        className={cn(
          'cursor-pointer transition-all duration-fast',
          isSelected && 'border-ag-accent ring-1 ring-ag-accent bg-ag-accent/5',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-pressed={isSelected}
        aria-disabled={disabled}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-ag-white">{module.name}</h3>
          {module.isPopular && <Badge variant="popular">Beliebt</Badge>}
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-ag-gray-400">
          {module.description}
        </p>

        {/* Price */}
        <div className="mt-4 font-mono text-lg text-ag-accent">
          {formatPrice(module.priceInCents)}
          {module.priceType === 'monthly' && (
            <span className="text-sm text-ag-gray-500">/Monat</span>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

// ==========================================
// HELPERS (private to this file)
// ==========================================

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}
```

### Hook Template

```typescript
// shared/hooks/useMediaQuery.ts

import { useState, useEffect, useCallback } from 'react';

/**
 * React hook for responsive design with media queries
 *
 * @param query - CSS media query string
 * @returns boolean indicating if query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with SSR-safe default
  const [matches, setMatches] = useState(false);

  // Memoized handler
  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches);
  }, []);

  useEffect(() => {
    // Skip on server
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query, handleChange]);

  return matches;
}
```

### Utility Function Template

```typescript
// features/calculator/lib/pricing.ts

import type { Module } from '@/entities/module';
import modulesConfig from '@/shared/config/modules.json';

// ==========================================
// TYPES
// ==========================================

interface PricingResult {
  /** Total one-time costs in cents */
  oneTimeCents: number;
  /** Total monthly costs in cents */
  monthlyCents: number;
  /** Applied discount percentage (0-100) */
  discountPercent: number;
  /** Itemized breakdown */
  breakdown: PricingBreakdownItem[];
}

interface PricingBreakdownItem {
  moduleId: string;
  name: string;
  originalCents: number;
  finalCents: number;
}

// ==========================================
// MAIN FUNCTION
// ==========================================

/**
 * Calculate total pricing with discount tiers
 *
 * @param selectedIds - Array of selected module IDs
 * @returns Pricing breakdown with totals and discounts
 *
 * @example
 * const pricing = calculatePricing(['basis-starter', 'seo-basic']);
 * console.log(pricing.oneTimeCents); // 188000 (1880€)
 */
export function calculatePricing(selectedIds: string[]): PricingResult {
  const modules = modulesConfig.modules as Module[];
  const discountTiers = modulesConfig.discountTiers;

  // Calculate raw totals
  let oneTimeCents = 0;
  let monthlyCents = 0;
  const breakdown: PricingBreakdownItem[] = [];

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
      finalCents: module.priceInCents,
    });
  }

  // Apply discount tiers
  const discountPercent = getDiscountPercent(oneTimeCents, discountTiers);

  if (discountPercent > 0) {
    oneTimeCents = applyDiscount(oneTimeCents, discountPercent);
    updateBreakdownWithDiscount(breakdown, modules, discountPercent);
  }

  return {
    oneTimeCents,
    monthlyCents,
    discountPercent,
    breakdown,
  };
}

// ==========================================
// PRIVATE HELPERS
// ==========================================

function getDiscountPercent(
  amount: number,
  tiers: { minAmount: number; discountPercent: number }[]
): number {
  let discount = 0;
  for (const tier of tiers) {
    if (amount >= tier.minAmount) {
      discount = tier.discountPercent;
    }
  }
  return discount;
}

function applyDiscount(amount: number, percent: number): number {
  return Math.round(amount * (1 - percent / 100));
}

function updateBreakdownWithDiscount(
  breakdown: PricingBreakdownItem[],
  modules: Module[],
  percent: number
): void {
  for (const item of breakdown) {
    const module = modules.find((m) => m.id === item.moduleId);
    if (module?.priceType === 'one-time') {
      item.finalCents = applyDiscount(item.originalCents, percent);
    }
  }
}
```

---

## Type Safety Patterns

### Zod Schema Pattern

```typescript
// entities/module/model/schema.ts

import { z } from 'zod';

// ==========================================
// SCHEMAS
// ==========================================

export const ModuleCategorySchema = z.enum([
  'basis',
  'design',
  'function',
  'seo',
  'support',
]);

export const PriceTypeSchema = z.enum(['one-time', 'monthly']);

export const ModuleSchema = z.object({
  id: z.string().min(1),
  category: ModuleCategorySchema,
  name: z.string().min(1).max(100),
  description: z.string().max(200),
  details: z.string().optional(),
  priceInCents: z.number().int().nonnegative(),
  priceType: PriceTypeSchema,
  previewImage: z.string().url().optional(),
  dependencies: z.array(z.string()).optional(),
  incompatible: z.array(z.string()).optional(),
  isPopular: z.boolean().optional(),
  isRecommended: z.boolean().optional(),
  sortOrder: z.number().int(),
  deliveryDays: z.number().int().nonnegative(),
});

export const ModulesConfigSchema = z.object({
  version: z.string(),
  lastUpdated: z.string(),
  categories: z.array(z.object({
    id: ModuleCategorySchema,
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    required: z.boolean(),
    maxSelections: z.number().optional(),
  })),
  modules: z.array(ModuleSchema),
  discountTiers: z.array(z.object({
    minAmount: z.number(),
    discountPercent: z.number(),
    label: z.string(),
  })),
});

// ==========================================
// TYPES (inferred from schemas)
// ==========================================

export type ModuleCategory = z.infer<typeof ModuleCategorySchema>;
export type PriceType = z.infer<typeof PriceTypeSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type ModulesConfig = z.infer<typeof ModulesConfigSchema>;

// ==========================================
// VALIDATION FUNCTIONS
// ==========================================

export function parseModule(data: unknown): Module {
  return ModuleSchema.parse(data);
}

export function parseModulesConfig(data: unknown): ModulesConfig {
  return ModulesConfigSchema.parse(data);
}

export function safeParseModule(data: unknown) {
  return ModuleSchema.safeParse(data);
}
```

### Type Guard Pattern

```typescript
// shared/lib/utils/type-guards.ts

/**
 * Check if value is a non-null object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Check if value has a specific property
 */
export function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

/**
 * Type guard for Module entity
 */
export function isModule(value: unknown): value is Module {
  return (
    isObject(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.priceInCents === 'number'
  );
}
```

---

## Error Handling Pattern

```typescript
// shared/lib/utils/errors.ts

/**
 * Application-specific error class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Validation error (400)
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

/**
 * Not found error (404)
 */
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Safe error handler for API routes
 */
export function handleApiError(error: unknown): {
  message: string;
  code: string;
  status: number;
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      status: error.statusCode,
    };
  }

  if (error instanceof Error) {
    console.error('Unexpected error:', error);
    return {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
      status: 500,
    };
  }

  console.error('Unknown error:', error);
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    status: 500,
  };
}
```

---

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Component | PascalCase.tsx | `ModuleCard.tsx` |
| Hook | camelCase.ts | `useMediaQuery.ts` |
| Utility | camelCase.ts | `pricing.ts` |
| Type file | camelCase.ts | `types.ts` |
| Schema file | camelCase.ts | `schema.ts` |
| Store file | camelCase.ts | `store.ts` |
| Barrel export | index.ts | `index.ts` |
| Config | camelCase.json/ts | `modules.json` |
| Test | *.test.ts(x) | `pricing.test.ts` |

---

## Code Style Rules

### Imports Order

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { motion } from 'framer-motion';
import { z } from 'zod';

// 3. Internal: shared (alphabetical)
import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

// 4. Internal: entities (alphabetical)
import type { Module } from '@/entities/module';

// 5. Internal: features (alphabetical)
import { useCalculatorStore } from '@/features/calculator';

// 6. Relative imports (same module)
import { formatPrice } from '../lib/pricing';

// 7. Types (at the end)
import type { FC } from 'react';
```

### Export Pattern

```typescript
// Named exports for components
export const Button: FC<ButtonProps> = () => { };

// Named exports for hooks
export function useMediaQuery() { }

// Named exports for utilities
export function calculateTotal() { }

// Type exports
export type { ButtonProps } from './types';

// NO default exports (except pages)
```

---

*Last Updated: 2026-02-01*
