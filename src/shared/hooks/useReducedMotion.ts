import { useState, useEffect } from 'react';

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
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
