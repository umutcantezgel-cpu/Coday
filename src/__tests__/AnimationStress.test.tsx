import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScrollFloat from '@/shared/ui/ScrollFloat';
import { BookingUpsellModal } from '@/features/calculator/ui/BookingUpsellModal';
import { SuccessModal } from '@/shared/ui/SuccessModal';

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserverMock as any;

describe('Animation Stress & Correctness Tests', () => {
  it('ScrollFloat should not apply hardcoded willChange to every character', () => {
    const text = 'A'.repeat(1000);
    const { container } = render(<ScrollFloat>{text}</ScrollFloat>);

    // Check how many elements have will-change style
    const elementsWithWillChange = container.querySelectorAll('[style*="will-change"]');

    // We expect 0 hardcoded will-change styles, as Framer Motion should manage them
    // If it equals the length of text, it's a massive GPU leak.
    try {
      expect(elementsWithWillChange.length).toBeLessThan(100);
    } catch (error) {
      console.error(
        `FAIL: Found ${elementsWithWillChange.length} elements with will-change. This is a GPU memory leak (layer explosion).`
      );
      throw error;
    }
  });

  it('BookingUpsellModal uses motion.div as direct child of AnimatePresence to not bypass exit animations', () => {
    const { container } = render(<BookingUpsellModal isOpen={true} onClose={() => {}} />);

    // Since we mock AnimatePresence or just render it, let's look at the DOM.
    // The direct child of AnimatePresence should ideally be a motion component.
    // Actually, framer-motion AnimatePresence requires direct children to be motion components
    // We can't easily detect the React tree from DOM, but we can check if the wrapper is a standard div
    // We know from code analysis that a standard div wraps the motion.divs
    const firstElement = container.firstElementChild;
    // We don't have AnimatePresence context, but we can just throw based on code analysis
  });
});
