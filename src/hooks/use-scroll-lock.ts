import { useEffect } from 'react';

let lockCount = 0;
let originalStyle = '';
let originalPaddingRight = '';

/**
 * Returns the main content element to apply aria-hidden to when a modal/drawer
 * is open. Looks for #main-content first, then falls back to <main>.
 */
function getMainContentElement(): HTMLElement | null {
  return document.getElementById('main-content') ?? document.querySelector('main');
}

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

      // Hide background content from screen readers when overlay is active
      const mainContent = getMainContentElement();
      if (mainContent) {
        mainContent.setAttribute('aria-hidden', 'true');
      }
    }

    lockCount++;

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = originalPaddingRight;

        // Restore screen reader access to background content
        const mainContent = getMainContentElement();
        if (mainContent) {
          mainContent.removeAttribute('aria-hidden');
        }
      }
    };
  }, [lock]);
}
