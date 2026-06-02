# Project: Motion System Overhaul

## Architecture

- Implementation of the Emil Kowalski motion philosophy.
- Core restriction: Only animate `transform` and `opacity`.
- Components affected: Buttons, Navigation, Inputs, Cards, Modals, Toasts, Accordions, Page Transitions, Scroll Animations.

## Milestones

| #   | Name                      | Scope                                                                                                                                                                                     | Dependencies | Status |
| --- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------ |
| 1   | Baseline Analysis         | Use chrome-devtools and a11y-debugging to measure current FPS, layout triggers, memory, and a11y compliance. Output to `.antigravity/motion/performance-baseline.md` and `a11y-audit.md`. | none         | DONE   |
| 2   | Component Interactions    | Implement 4-pillar motion on UI components (Buttons, Nav, Inputs, Cards, etc.) with exact timings.                                                                                        | M1           | DONE   |
| 3   | Page & Scroll Transitions | Implement Next.js page transitions and IntersectionObserver-based scroll animations with staggering.                                                                                      | M2           | DONE   |
| 4   | Final Verification        | Verify 60fps, no GPU leaks, and reduced-motion compliance using devtools and a11y skills.                                                                                                 | M3           | DONE   |

## Interface Contracts

### Motion ↔ Components

- Standard timing: hover (150ms ease-appear), active (scale 0.97, 80ms), loading (fade), success (scale pulse 300ms), error (shake 400ms).
- Scroll Animation: threshold 0.15, rootMargin: 0px 0px -50px 0px. Standard entrance: opacity/translateY(20px) in 400ms. Staggering 60ms delay, max 400ms.

## Code Layout

- Next.js App Router (src/app, src/components)
- Next-Intl for i18n
- TailwindCSS for styling
- `motion` (Framer Motion) for complex animations where required, or standard CSS transitions.
