'use client';
import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '50px 0px -50px 0px',
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) {
  // Start visible for no-JS fallback and SSR — JS will hide before observing
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
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
            setIsVisible(false);
            return;
          }
        }
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
