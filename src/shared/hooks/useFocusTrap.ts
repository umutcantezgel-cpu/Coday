import { useEffect, useRef } from 'react';

/**
 * Hook to trap focus within a container when active.
 * Handles Tab and Shift+Tab to cycle focus, and optionally ESC to close.
 * Restoration of focus on unmount is handled automatically.
 */
export const useFocusTrap = (isActive: boolean, onEscape?: () => void) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive && containerRef.current) {
      // Save current focus
      previousFocus.current = document.activeElement as HTMLElement;

      // Find focusable elements
      const focusableElements = containerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      // Only claim focus if the visitor has not already put it somewhere (e.g. a
      // form field), and never scroll the page to do so.
      if (focusableElements.length > 0 && document.activeElement === document.body) {
        (focusableElements[0] as HTMLElement).focus({ preventScroll: true });
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onEscape) {
          e.preventDefault();
          onEscape();
          return;
        }

        if (e.key !== 'Tab') return;

        const focusable = containerRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable || focusable.length === 0) return;

        const firstElement = focusable[0] as HTMLElement;
        const lastElement = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Restore focus
        if (previousFocus.current) {
          previousFocus.current.focus();
        }
      };
    }
    return undefined;
  }, [isActive, onEscape]);

  return containerRef;
};
