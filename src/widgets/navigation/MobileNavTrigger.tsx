'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from '@/i18n/navigation';
import type { MobileNavItem } from '@/widgets/navigation/MobileNavOverlay';

export type { MobileNavItem } from '@/widgets/navigation/MobileNavOverlay';

const MobileNavOverlay = dynamic(
  () => import('@/widgets/navigation/MobileNavOverlay').then((m) => m.MobileNavOverlay),
  {
    ssr: false,
  }
);

interface MobileNavTriggerProps {
  /** The nav config, translated on the server, handed to the overlay untouched. */
  items: MobileNavItem[];
}

/**
 * The hamburger button and the gate in front of the mobile overlay chunk.
 * The overlay is not even requested until the first tap, so the initial JS
 * bundle and hydration of every page stay free of it.
 */
export const MobileNavTrigger: React.FC<MobileNavTriggerProps> = ({ items }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    if (!hasBeenOpened) setHasBeenOpened(true);
    setIsMobileOpen((prev) => !prev);
  };

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <button
        className={`mobile-menu-trigger p-2 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-[0.9] transition-transform motion-reduce:duration-[0.01ms] ${isMobileOpen ? 'is-open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
        aria-expanded={isMobileOpen}
      >
        <div className="hamburger-icon">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </button>

      {/* Mobile Menu Overlay - rendered only after first user trigger to prevent initial JS bundle & hydration overhead */}
      {hasBeenOpened && (
        <MobileNavOverlay
          items={items}
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default MobileNavTrigger;
