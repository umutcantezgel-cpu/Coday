'use client';
import { useEffect, useState } from 'react';

/**
 * True only for devices with a precise pointer that also accept motion.
 *
 * WaterCursor evaluates the same media queries internally and returns early on
 * touch devices — but only after its WebGL2 bundle has been downloaded, parsed
 * and mounted. Gating on this hook keeps the chunk from being requested at all.
 *
 * Starts `false`, so server render and first client render emit nothing.
 */
export function usePointerFine() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setIsFine(pointer.matches && !reducedMotion.matches);
    update();

    pointer.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      pointer.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return isFine;
}
