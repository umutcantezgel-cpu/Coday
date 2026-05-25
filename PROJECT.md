# Project: Next.js 15 Migration & Stabilization

## Architecture
- Migrate away from `react-router` and `react-router-dom` to Next.js 15 App Router (`next/navigation`, `next/link`).
- Support Server Components / Client Components. Use `"use client"` where hooks like `usePathname` or `useSearchParams` are used.
- Fix TS errors in components and sanity schema.
- Preserve and improve accessibility per web.dev guidelines.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | i18n & Hydration | Migrate react-i18next client usages to next-intl to fix hydration & missing text | none | IN_PROGRESS |
| 2 | Tailwind v4 & Layout | Fix Tailwind brand vs primary mappings, fix CookieBanner aside landmark | none | IN_PROGRESS |
| 3 | Playwright ESM | Fix __dirname ESM error in e2e/a11y-audit/a11y.spec.ts | none | DONE |
| 4 | Structural Hydration | Fix GlobalErrorBoundary client boundary, raw script in layout.tsx, Tailwind block/flex conflict in ServicesSection | none | IN_PROGRESS |

## Code Layout
- `src/_react_router_backup/` must be ignored or deleted by workers (file manipulation is preferred if `rm` prompts).
- Replace `Link`, `NavLink`, `useNavigate`, `useLocation`, `useParams`, `useSearchParams` from `react-router-dom` with Next.js equivalents.
