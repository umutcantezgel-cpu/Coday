import { useEffect } from 'react';

let lockCount = 0;
let originalStyle = '';
let originalPaddingRight = '';

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (!lock) return;

    if (lockCount === 0) {
      // Save initial overflow and padding right only once
      originalStyle = window.getComputedStyle(document.body).overflow;
      originalPaddingRight = window.getComputedStyle(document.body).paddingRight;

      // Prevent layout shift when scrollbar disappears
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `calc(${originalPaddingRight} + ${scrollbarWidth}px)`;
      }
    }

    lockCount++;

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [lock]);
}
