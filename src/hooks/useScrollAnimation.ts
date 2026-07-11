import { useEffect, useRef, useState, RefObject } from 'react';

export function useScrollAnimation(ref: RefObject<HTMLElement | null>, once: boolean = true) {
  // Start visible for no-JS fallback and SSR
  const [isInView, setIsInView] = useState(true);
  const initializedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference — keep elements visible
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Disable scroll animations on mobile to ensure content is always visible and doesn't disappear on scroll
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

    if (prefersReducedMotion || isMobile) {
      // Already true from initial state — no setState needed
      return;
    }

    // Reset initialization flag
    initializedRef.current = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!initializedRef.current) {
          // First callback — if not intersecting, hide the element
          initializedRef.current = true;
          if (!entry.isIntersecting) {
            setIsInView(false);
            return;
          }
        }
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, ref]);

  return isInView;
}
