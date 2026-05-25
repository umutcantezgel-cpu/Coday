import { useMediaQuery } from './useMediaQuery';

/**
 * SEQ-14: Hook that detects user's reduced-motion preference.
 * SSR-safe (defaults to false on server).
 *
 * @returns true if the user prefers reduced motion
 *
 * @example
 * const prefersReduced = useReducedMotion();
 * const animationDuration = prefersReduced ? 0 : DURATION.default;
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
