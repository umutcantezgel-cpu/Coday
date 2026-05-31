# Project: Coday Full Website Redesign

## Architecture
- Code layout follows Next.js App Router inside `src/app/[locale]`.
- Redesigns must adhere to high-end design, Emil Kowalski interaction design protocol, strict A11y & Performance limits.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Core Layouts & Homepage | src/app/layout.tsx, src/app/[locale]/layout.tsx, src/app/[locale]/page.tsx | none | PLANNED |
| 2 | General Info Pages | about, contact, pricing, process, garantie, partnerschaft, presse, booking, calculator | none | PLANNED |
| 3 | Legal Pages | legal/*, privacy | none | PLANNED |
| 4 | Services Pages | services/* | none | PLANNED |
| 5 | Work & Career Pages | work/*, career/* | none | PLANNED |
| 6 | Industries & Standorte | branchen/*, industries/*, standorte/*, landingpages/*, webdesign-agentur-wetzlar, angebot-handwerker | none | PLANNED |
| 7 | Knowledge & Community | knowledge/*, community/* | none | PLANNED |
| 8 | AI Specific Pages | ai/* | none | PLANNED |
| 9 | Final E2E Test Pass | Pass all E2E tests | 1-8 | PLANNED |
| 10 | Adversarial Coverage | Tier 5 testing | 9 | PLANNED |

## Interface Contracts
- Each page MUST have a single `<h1/>`.
- Each page MUST have touch-friendly targets (min 44x44px).
- Animations: max 300ms entry, 400ms staggered, 250ms transitions.
- LCP < 2.0s (mobile), CLS < 0.05, first-load JS < 100KB.
- Output: `.antigravity/pages/[SEITENNAME]-redesign-report.md` required for each page.

## Code Layout
- Components: `src/components/...`
- App Router: `src/app/...`
