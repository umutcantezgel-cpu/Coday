# E2E Test Infra: Coday Full Website Redesign

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Single H1 per page | ORIGINAL_REQUEST | 5 | 5 | ✓ |
| 2 | Primary CTA visible above fold | ORIGINAL_REQUEST | 5 | 5 | ✓ |
| 3 | Touch targets >= 44px | ORIGINAL_REQUEST | 5 | 5 | ✓ |
| 4 | Keyboard navigation | ORIGINAL_REQUEST | 5 | 5 | ✓ |
| 5 | WCAG 2.2 AA Contrast | ORIGINAL_REQUEST | 5 | 5 | ✓ |

## Test Architecture
- Test runner: Playwright (already present in project root as playwright.config.ts)
- Test case format: Playwright test files in `tests/e2e/` (wait, User rules say: "Tests in `__tests__/` next to source, never separate `/tests/` folder")
- Output: JUnit or standard console output.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | User navigates homepage to services to contact | Layout, Navigation, A11y | Medium |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature
- Tier 3: pairwise coverage
- Tier 4: ≥5 scenarios
