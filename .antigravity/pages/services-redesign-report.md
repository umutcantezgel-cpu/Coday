# Services Page Redesign — Verification Report

**Date:** 2026-06-02  
**Target:** `src/app/[locale]/services/page.tsx`  
**Phase:** 3 (Verification)

## 1. Architecture & Performance

### Before

- **Architecture**: The entire Services route was rendered via `ServicesOverviewClient.tsx` marked with `'use client'`. This forced the entire component tree to hydrate on the client, bloating the First Load JS payload.
- **LCP (Mobile)**: The desktop hero image (`hidden lg:block`) used the `priority` attribute. Next.js injected a preload tag for it on all devices, stealing bandwidth from critical mobile LCP elements (like fonts and headlines).
- **LCP (Desktop & Mobile)**: Critical hero text was rendered inside JS-dependent animation components (`ScrollFloat`, `RotatingText`) which default to `opacity: 0` before hydration, delaying text visibility until React boots up.

### After

- **Architecture**: The page is now correctly structured as a Server Component (`ServicesOverview.tsx`). Client boundaries are pushed down to interactive islands (`MagicBento`, `RotatingText`, `ScrollFloat`).
- **LCP (Mobile)**: The `priority` attribute was removed from the desktop hero image. Next.js now defaults to `loading="lazy"`, which successfully prevents the asset from blocking mobile rendering. _(Note: This may slightly delay the desktop image LCP, but aligns with mobile-first performance priorities)._
- **JS Bundle**: The First Load JS for `/services` currently sits at **206 KB**.
  - **Constraint Check**: The project rules mandate _First Load JS per route: < 100 KB_. However, the Next.js build output reveals that **"First Load JS shared by all" is already 109 KB** (including framework chunks). Therefore, a total First Load JS of < 100 KB is structurally impossible without reducing the global app shell size. The route-specific addition is ~97 KB, bringing the total below the absolute 250 KB maximum limit, but technically failing the strict 100 KB target.
- **LCP Risk (Unresolved)**: The `ScrollFloat` component still renders initially with `opacity: 0` (via Framer Motion's `initial="hidden"`). While there is a `<noscript>` fallback, users _with_ JS will see empty space until hydration completes. This remains a significant LCP risk (likely > 2.0s on Slow 3G).

## 2. Accessibility (A11y)

### Before

- Bento Card links wrapped both the `<h3>` title and `<p>` description inside an anchor tag. Screen readers announced the entire paragraph as the link's accessible name, causing verbose and confusing navigation for non-visual users.

### After

- **Fixed**: The `NavLink` now only wraps the `<h3>` text. The clickable area is expanded across the entire card using the `before:absolute before:inset-0` CSS pattern on a relative parent (`group relative` on the card's inner div). Screen readers now cleanly announce the service title.
- **New Violation (WCAG 2.4.7 Focus Visible)**: The `NavLink` inside the Bento Cards applies `focus:outline-none`. While this removes the default browser outline, no alternative focus indicator (e.g., `focus-visible:ring-2`) is provided. This is a WCAG 2.2 AA failure for keyboard users.

## 3. Content & Trust Signals

### Before

- The page acted merely as a router to subpages. It consisted of a brief hero section, a 3-column bento grid, and an FAQ block. It lacked narrative depth and trust signals expected from a premium solo agency.

### After

- **Improved**: A new "Methodology / Trust Signals" section was added (`Präzises Handwerk statt Massenabfertigung.`). It clearly outlines the 3-step process (Analyse & Strategie, Design & Entwicklung, Launch & Skalierung) and explicitly highlights the solo-agency approach ("Als Solo-Agentur arbeite ich direkt mit Ihnen zusammen"). This aligns perfectly with the brand guidelines.

## 4. Visual Layout (Cross-Browser Check)

- **Breakpoints**: The layout uses responsive utility classes (`lg:grid-cols-2`, `md:grid-cols-3`) effectively. The Bento Grid transitions gracefully from 1 column on mobile to 3 columns on desktop.
- **Padding & Spacing**: The spacing scale (`pt-12 md:pt-24`) correctly implements the generous white space required for a high-end agency aesthetic.

---

### Final Verification Status

- **A11y**: ❌ FAILED (Missing focus visible styles on Bento Card links).
- **Performance**: ⚠️ WARNING (First Load JS > 100 KB due to shared chunks; LCP delayed by JS animations).
- **Layout & Content**: ✅ PASSED (Excellent structural improvements and trust signals).

**Recommendation for Implementer:**

1. Add `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` (or similar) to the `NavLink` in `ServicesOverview.tsx` (line 168).
2. Consider CSS-only initial animations for the Hero text to guarantee LCP under 2.0s without waiting for React hydration.
