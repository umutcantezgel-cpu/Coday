import { useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '@/shared/lib/analytics/tracking';

/**
 * SEQ-15 Task 4: Tracks scroll depth at 25%, 50%, 75%, 100% thresholds.
 * Fires each threshold only once per page view.
 *
 * @example useScrollDepth(); // Place in page component
 */
export function useScrollDepth(): void {
  const firedRef = useRef<Set<number>>(new Set());

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const percentage = Math.round((scrollTop / docHeight) * 100);
    const thresholds = [25, 50, 75, 100];

    for (const threshold of thresholds) {
      if (percentage >= threshold && !firedRef.current.has(threshold)) {
        firedRef.current.add(threshold);
        trackEvent('scroll_depth', { depth: threshold });
      }
    }
  }, []);

  useEffect(() => {
    // Reset on mount (new page)
    firedRef.current = new Set();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}
