/**
 * Standardized Motion Design Tokens
 *
 * All animation timing, easing, and stagger values should reference
 * these tokens for consistency across the application.
 */
import type { Transition, Variants } from 'motion/react';

// ─── Easing ────────────────────────────────────────────────
export const EASING = {
  /** Default smooth easing for most reveals */
  smooth: [0.16, 1, 0.3, 1] as const,
  /** Subtle ease-out for simple fades */
  gentle: 'easeOut' as const,
  /** Snappy spring for interactive elements */
  spring: { type: 'spring' as const, damping: 25, stiffness: 300 },
  /** Bouncy spring for playful interactions */
  bouncy: { type: 'spring' as const, damping: 15, stiffness: 200 },
} as const;

// ─── Durations (seconds) ───────────────────────────────────
export const DURATION = {
  fast: 0.2,
  default: 0.4,
  medium: 0.6,
  slow: 0.8,
} as const;

// ─── Stagger Delays (seconds) ──────────────────────────────
export const STAGGER = {
  /** Fast stagger for character-level animations */
  fast: 0.02,
  /** Default stagger for list items */
  default: 0.05,
  /** Slow stagger for larger cards/sections */
  slow: 0.1,
  /** Very slow stagger for hero-level sequences */
  hero: 0.15,
} as const;

// ─── Reusable Transitions ──────────────────────────────────
export const TRANSITION: Record<string, Transition> = {
  /** Standard scroll-reveal transition */
  reveal: { duration: DURATION.medium, ease: EASING.gentle },
  /** Spring-based entrance */
  springIn: EASING.spring,
  /** Quick interaction feedback */
  tap: { duration: DURATION.fast },
} as const;

// ─── Reusable Variants ─────────────────────────────────────

/** Fade up from below — most common scroll reveal */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/** Fade in without movement */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Scale up from slightly smaller */
export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * Creates a stagger-container variant pair.
 * Use on parent with `variants={staggerContainer(0.1)}` and
 * `initial="hidden" whileInView="visible"`.
 * Children should use `fadeUpVariants` or similar with `variants` prop.
 */
export const staggerContainer = (
  staggerDelay: number = STAGGER.default,
  childDuration: number = DURATION.medium
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0,
      when: 'beforeChildren',
      duration: childDuration,
    },
  },
});
