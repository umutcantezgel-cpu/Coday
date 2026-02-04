# Testing Strategy

> Verification approaches and testing patterns for Agency Domination.
> Follow these guidelines when writing or running tests.

---

## Testing Philosophy

1. **Test business logic thoroughly** — Calculator pricing, validation rules
2. **Test user flows end-to-end** — Critical paths that generate revenue
3. **Trust the framework** — Don't test React/Next.js internals
4. **Performance as tests** — Lighthouse CI gates deployments

---

## Testing Stack

| Type | Tool | Purpose |
|------|------|---------|
| Unit | Vitest | Fast, isolated function tests |
| Component | Testing Library | React component behavior |
| E2E | Playwright | Full user flow testing |
| Performance | Lighthouse CI | Core Web Vitals gates |
| Visual | Playwright screenshots | Regression detection |

---

## Test Categories

### 1. Unit Tests (Vitest)

**Location:** `*.test.ts` next to source file
**Coverage Target:** 80% on business logic

**What to Unit Test:**
- Pricing calculations
- Discount tier logic
- Module validation
- Delivery estimation
- Utility functions
- Zod schemas

**What NOT to Unit Test:**
- React component rendering
- API routes (use integration tests)
- Third-party libraries

#### Example: Pricing Logic

```typescript
// features/calculator/lib/pricing.test.ts

import { describe, it, expect } from 'vitest';
import { calculatePricing, validateSelection } from './pricing';

describe('calculatePricing', () => {
  it('calculates one-time total correctly', () => {
    const result = calculatePricing(['basis-starter', 'seo-basic']);

    expect(result.oneTimeCents).toBe(188000); // 1490 + 390
    expect(result.monthlyCents).toBe(0);
    expect(result.discountPercent).toBe(0);
  });

  it('applies 5% discount above €5.000', () => {
    const result = calculatePricing([
      'basis-enterprise', // 4990
      'design-3d-hero',   // 690
    ]);

    // 5680€ before discount
    // 5% off = 284€ discount
    // Final: 5396€
    expect(result.oneTimeCents).toBe(539600);
    expect(result.discountPercent).toBe(5);
  });

  it('applies 10% discount above €10.000', () => {
    const result = calculatePricing([
      'basis-enterprise',    // 4990
      'func-portal',         // 990
      'seo-premium',         // 990
      'seo-basic',           // 390
      'design-illustrations', // 490
      'design-3d-hero',      // 690
      'design-animations',   // 390
      'func-blog',           // 590
      'func-multilang',      // 690
    ]);

    expect(result.discountPercent).toBe(10);
  });

  it('separates one-time and monthly costs', () => {
    const result = calculatePricing([
      'basis-starter',      // 1490 one-time
      'support-priority',   // 99 monthly
    ]);

    expect(result.oneTimeCents).toBe(149000);
    expect(result.monthlyCents).toBe(9900);
  });
});

describe('validateSelection', () => {
  it('requires at least one basis package', () => {
    const errors = validateSelection(['seo-basic']);

    expect(errors).toContainEqual(
      expect.objectContaining({
        type: 'category-limit',
        message: expect.stringContaining('Basis'),
      })
    );
  });

  it('enforces dependencies', () => {
    const errors = validateSelection(['basis-starter', 'func-blog']);

    expect(errors).toContainEqual(
      expect.objectContaining({
        type: 'dependency',
        message: expect.stringContaining('SEO'),
      })
    );
  });

  it('enforces incompatibilities', () => {
    const errors = validateSelection(['basis-starter', 'func-multilang']);

    expect(errors).toContainEqual(
      expect.objectContaining({
        type: 'incompatible',
      })
    );
  });

  it('returns empty array for valid selection', () => {
    const errors = validateSelection([
      'basis-business',
      'seo-basic',
      'func-blog',
    ]);

    expect(errors).toHaveLength(0);
  });
});
```

#### Example: Zod Schema

```typescript
// entities/module/model/schema.test.ts

import { describe, it, expect } from 'vitest';
import { ModuleSchema, parseModule, safeParseModule } from './schema';

describe('ModuleSchema', () => {
  const validModule = {
    id: 'basis-starter',
    category: 'basis',
    name: 'Starter',
    description: 'Perfect for small projects',
    priceInCents: 149000,
    priceType: 'one-time',
    sortOrder: 1,
    deliveryDays: 5,
  };

  it('accepts valid module', () => {
    expect(() => parseModule(validModule)).not.toThrow();
  });

  it('rejects invalid category', () => {
    const invalid = { ...validModule, category: 'invalid' };
    const result = safeParseModule(invalid);

    expect(result.success).toBe(false);
  });

  it('rejects negative price', () => {
    const invalid = { ...validModule, priceInCents: -100 };
    const result = safeParseModule(invalid);

    expect(result.success).toBe(false);
  });

  it('rejects missing required fields', () => {
    const invalid = { id: 'test' };
    const result = safeParseModule(invalid);

    expect(result.success).toBe(false);
  });
});
```

---

### 2. Component Tests (Testing Library)

**Location:** `*.test.tsx` next to component
**Coverage Target:** Critical interactive components

**What to Test:**
- User interactions (clicks, inputs)
- Conditional rendering
- Accessibility (roles, labels)
- Error states

**What NOT to Test:**
- Styling (visual regression tests instead)
- Implementation details
- Snapshot tests (avoid)

#### Example: ModuleCard

```typescript
// features/calculator/ui/ModuleCard.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModuleCard } from './ModuleCard';

const mockModule = {
  id: 'basis-starter',
  category: 'basis' as const,
  name: 'Starter',
  description: 'Perfect for small projects',
  priceInCents: 149000,
  priceType: 'one-time' as const,
  sortOrder: 1,
  deliveryDays: 5,
};

describe('ModuleCard', () => {
  it('renders module information', () => {
    render(
      <ModuleCard
        module={mockModule}
        isSelected={false}
        onToggle={() => {}}
      />
    );

    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Perfect for small projects')).toBeInTheDocument();
    expect(screen.getByText(/1\.490/)).toBeInTheDocument(); // Price formatted
  });

  it('calls onToggle when clicked', () => {
    const handleToggle = vi.fn();

    render(
      <ModuleCard
        module={mockModule}
        isSelected={false}
        onToggle={handleToggle}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('shows selected state', () => {
    render(
      <ModuleCard
        module={mockModule}
        isSelected={true}
        onToggle={() => {}}
      />
    );

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-pressed', 'true');
  });

  it('prevents interaction when disabled', () => {
    const handleToggle = vi.fn();

    render(
      <ModuleCard
        module={mockModule}
        isSelected={false}
        onToggle={handleToggle}
        disabled
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleToggle).not.toHaveBeenCalled();
  });

  it('is keyboard accessible', () => {
    const handleToggle = vi.fn();

    render(
      <ModuleCard
        module={mockModule}
        isSelected={false}
        onToggle={handleToggle}
      />
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleToggle).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: ' ' });
    expect(handleToggle).toHaveBeenCalledTimes(2);
  });

  it('shows Popular badge when applicable', () => {
    const popularModule = { ...mockModule, isPopular: true };

    render(
      <ModuleCard
        module={popularModule}
        isSelected={false}
        onToggle={() => {}}
      />
    );

    expect(screen.getByText('Beliebt')).toBeInTheDocument();
  });
});
```

---

### 3. E2E Tests (Playwright)

**Location:** `e2e/*.spec.ts`
**Coverage Target:** All critical user journeys

**What to E2E Test:**
- Calculator configuration flow
- Lead submission
- Case study navigation
- Mobile responsiveness

#### Example: Calculator Flow

```typescript
// e2e/calculator.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
  });

  test('complete configuration flow', async ({ page }) => {
    // 1. Select base package
    await page.click('[data-testid="module-basis-starter"]');

    // Verify selection
    await expect(
      page.locator('[data-testid="module-basis-starter"]')
    ).toHaveAttribute('aria-pressed', 'true');

    // 2. Add SEO package
    await page.click('[data-testid="module-seo-basic"]');

    // 3. Verify price updates
    await expect(
      page.locator('[data-testid="total-one-time"]')
    ).toContainText('1.880'); // 1490 + 390

    // 4. Add Blog (has dependency on SEO)
    await page.click('[data-testid="module-func-blog"]');

    // 5. Verify price with blog
    await expect(
      page.locator('[data-testid="total-one-time"]')
    ).toContainText('2.470'); // + 590

    // 6. Click Get Quote
    await page.click('[data-testid="cta-get-quote"]');

    // 7. Verify redirect to contact with config
    await expect(page).toHaveURL(/\/contact\?config=/);

    // 8. Verify form pre-filled with config
    await expect(
      page.locator('[data-testid="config-summary"]')
    ).toContainText('Starter');
    await expect(
      page.locator('[data-testid="config-summary"]')
    ).toContainText('SEO-Grundpaket');
  });

  test('enforces dependencies', async ({ page }) => {
    // Select base package
    await page.click('[data-testid="module-basis-starter"]');

    // Try to select Blog (requires SEO)
    await page.click('[data-testid="module-func-blog"]');

    // Verify warning appears
    await expect(
      page.locator('[data-testid="validation-warning"]')
    ).toContainText('SEO-Grundpaket');
  });

  test('applies discount at €5.000+', async ({ page }) => {
    // Select Enterprise package (€4.990)
    await page.click('[data-testid="module-basis-enterprise"]');

    // Add module to push over €5.000
    await page.click('[data-testid="module-design-darkmode"]'); // +190

    // Verify discount badge appears
    await expect(
      page.locator('[data-testid="discount-badge"]')
    ).toContainText('5%');
  });

  test('shareable URL works', async ({ page, context }) => {
    // Configure selection
    await page.click('[data-testid="module-basis-business"]');
    await page.click('[data-testid="module-seo-basic"]');

    // Get shareable URL
    await page.click('[data-testid="share-config"]');

    const shareUrl = await page
      .locator('[data-testid="share-url-input"]')
      .inputValue();

    // Open in new tab
    const newPage = await context.newPage();
    await newPage.goto(shareUrl);

    // Verify same configuration loaded
    await expect(
      newPage.locator('[data-testid="module-basis-business"]')
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(
      newPage.locator('[data-testid="module-seo-basic"]')
    ).toHaveAttribute('aria-pressed', 'true');
  });
});
```

#### Example: Lead Submission

```typescript
// e2e/contact.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('submits lead successfully', async ({ page }) => {
    // Start from calculator
    await page.goto('/calculator');
    await page.click('[data-testid="module-basis-starter"]');
    await page.click('[data-testid="cta-get-quote"]');

    // Fill form
    await page.fill('[name="companyName"]', 'Test GmbH');
    await page.fill('[name="contactName"]', 'Max Mustermann');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="phone"]', '+49 123 456789');
    await page.fill('[name="message"]', 'Interested in your services');

    // Submit
    await page.click('[type="submit"]');

    // Verify success
    await expect(
      page.locator('[data-testid="success-message"]')
    ).toBeVisible();

    // Verify redirect or confirmation
    await expect(page.locator('h1')).toContainText('Danke');
  });

  test('validates required fields', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    await page.click('[type="submit"]');

    // Verify validation errors
    await expect(
      page.locator('[data-testid="error-companyName"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="error-email"]')
    ).toBeVisible();
  });

  test('validates email format', async ({ page }) => {
    await page.goto('/contact');

    await page.fill('[name="email"]', 'invalid-email');
    await page.click('[type="submit"]');

    await expect(
      page.locator('[data-testid="error-email"]')
    ).toContainText('gültige');
  });
});
```

---

### 4. Performance Tests (Lighthouse CI)

**Location:** `lighthouserc.json`
**Frequency:** Every PR, blocks merge on failure

#### Configuration

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/calculator",
        "http://localhost:3000/work",
        "http://localhost:3000/work/example-case-study"
      ],
      "startServerCommand": "pnpm start",
      "startServerReadyPattern": "ready on",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 1000 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 200 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## Pre-Commit Hooks

```bash
# .husky/pre-commit

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 1. Lint staged files
npx lint-staged

# 2. Type check
pnpm typecheck

# 3. Run affected tests
pnpm test --run --passWithNoTests
```

```json
// package.json
{
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

---

## CI Pipeline Tests

```yaml
# .github/workflows/test.yml

name: Test

on:
  pull_request:
    branches: [main, develop]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test --coverage
      - uses: codecov/codecov-action@v3

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: npx playwright install --with-deps
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
```

---

## Test Commands Reference

```bash
# Unit tests
pnpm test                    # Run all tests
pnpm test --watch            # Watch mode
pnpm test --coverage         # With coverage
pnpm test pricing            # Run specific file

# E2E tests
pnpm test:e2e                # Run Playwright tests
pnpm test:e2e --ui           # With UI
pnpm test:e2e --debug        # Debug mode
pnpm test:e2e calculator     # Specific test file

# Performance
pnpm lighthouse              # Run Lighthouse locally
pnpm lighthouse:ci           # CI mode with assertions

# All checks (pre-push)
pnpm typecheck && pnpm lint && pnpm test
```

---

## Verification Checklist

After implementing a feature, verify:

- [ ] Unit tests pass (`pnpm test`)
- [ ] TypeScript compiles (`pnpm typecheck`)
- [ ] Lint rules pass (`pnpm lint`)
- [ ] E2E tests pass (if applicable)
- [ ] Lighthouse scores maintained
- [ ] No console errors in browser
- [ ] Works on mobile viewport
- [ ] Keyboard navigation works

---

*Last Updated: 2026-02-01*
