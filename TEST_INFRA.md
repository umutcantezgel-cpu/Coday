# E2E Test Infra: Coday Local SEO & A11y

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Wetzlar Local SEO Text | ORIGINAL_REQUEST R1 | 5      | 5      | ✓      |
| 2 | Wetzlar LocalBusiness JSON-LD | ORIGINAL_REQUEST R1 | 5      | 5      | ✓      |
| 3 | A11y & Tech SEO (100/100 Score) | ORIGINAL_REQUEST R2 | 5      | 5      | ✓      |

## Test Architecture
- Test runner: Playwright (already configured at `playwright.config.ts`) and Lighthouse.
- Directory layout: 
  - `e2e/seo/`
  - `e2e/a11y/`

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | User searches for Wetzlar web design, lands on homepage, can navigate entirely with keyboard, screen reader reads correct ARIA labels. | F1, F2, F3 | High |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature (where boundaries exist)
- Tier 3: pairwise coverage of major feature interactions
- Tier 4: ≥5 realistic application scenarios
