# Accessibility & Motion Audit

**Date:** 2026-05-31
**Tool:** Chrome DevTools Protocol (Puppeteer Trace) & Lighthouse
**Target:** `http://localhost:3000/de`

## Lighthouse Accessibility Metrics
* **Accessibility Score:** 100 / 100
* Lighthouse found no violations for basic ARIA, contrast, and structural rules. (Note: automated testing only catches ~30% of actual a11y issues).

## `prefers-reduced-motion` Compliance Check
We ran a Puppeteer trace with `prefers-reduced-motion: reduce` emulated.
* **Status:** **FAILED**
* **Active Animations Detected:** 48 active `SPAN` elements still running `KeyframeEffect` animations.

### Detailed Findings
While some UI components (like `Button` and `Input`) correctly implement `motion-reduce:transition-none` and `motion-reduce:animate-none`, a codebase-wide audit reveals widespread violations where animations continue to play for users who have requested reduced motion.

**Violating Tailwind Animations Found in Codebase:**
- `animate-pulse` (e.g., `InProgressSection.tsx`, `GearSetup.tsx`, `WebAppsClient.tsx`, `LocalSEO`)
- `animate-spin` (e.g., `NewsletterClient.tsx`, `ChatWidget.tsx`)
- `animate-ping` (e.g., `ApiIntegrationClient.tsx`, `ChatWidget.tsx`)
- `animate-bounce` (e.g., `MigrationClient.tsx`, `HeroScrollIndicator.tsx`)
- `animate-gradient-xy` (e.g., `GradientText.tsx`)
- `animate-marquee` (defined in `tokens/motion.css`)

None of these classes are overridden globally, nor do they consistently use `motion-reduce` variants in their markup. The presence of 48 actively animating spans during the trace confirms that continuous animations (like a marquee or pulsing dots) are not being halted.

## Recommended Action Items
1. **Global Motion Override:** Instead of manually appending `motion-reduce:animate-none` to every element, configure Tailwind or CSS to globally disable animations when `prefers-reduced-motion` is active:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, ::before, ::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
2. **Review CSS Variables:** If CSS Variables are driving animations (like a Marquee), ensure they fallback to static layouts.
3. **Audit Third-Party Widgets:** Ensure the ChatWidget and CookieSettings modals respect motion preferences for their enter/leave transitions.
