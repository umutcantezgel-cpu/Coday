'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/shared/lib/analytics/tracking';

interface NavPillCtaProps {
  href: string;
  /** `cta_label` of the `cta_click` event. */
  ctaLabel: string;
  className: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * A header CTA: the localised Link plus the `cta_click` event the old header
 * fired from its onClick. Lives here so the server-rendered actions block can
 * keep that tracking without a chunk of its own.
 */
export const NavPillCta: React.FC<NavPillCtaProps> = ({
  href,
  ctaLabel,
  className,
  style,
  children,
}) => (
  <Link
    href={href}
    onClick={() => trackEvent('cta_click', { cta_label: ctaLabel, cta_position: 'header_desktop' })}
    className={className}
    style={style}
  >
    {children}
  </Link>
);

/**
 * Shared with DesktopNavClient: `true` while a dropdown is open. The scroll
 * listener below reads it to keep the header on screen, which is what the old
 * single-component header did through its `activeCategoryRef`.
 */
const NavPillPinContext = createContext<React.MutableRefObject<boolean> | null>(null);

const detachedPin: React.MutableRefObject<boolean> = { current: false };

/** Returns the shell's pin ref, or a detached one when rendered without a shell (tests). */
export const useNavPillPin = () => useContext(NavPillPinContext) ?? detachedPin;

interface NavPillShellProps {
  children: React.ReactNode;
}

/**
 * The floating pill. Owns nothing but the scroll-driven `scrolled` / `at-top`
 * / `nav-hidden` classes, so the logo, links and actions inside it can be
 * server-rendered.
 */
export const NavPillShell: React.FC<NavPillShellProps> = ({ children }) => {
  // UX States
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const pinnedRef = useRef(false);

  // Smart Scroll Logic - Native Implementation
  useEffect(() => {
    // Initialize state properly on mount (e.g. if loaded midway down the page)
    lastScrollY.current = window.scrollY;

    // Defer the initial state update to avoid cascading render warning
    requestAnimationFrame(() => {
      if (window.scrollY > 50) setIsScrolled(true);
    });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const previous = lastScrollY.current;

          // Determine direction. An open dropdown pins the header: hiding it
          // would take the panel the user is reading with it.
          if (pinnedRef.current) {
            setIsVisible(true);
          } else if (currentScrollY > previous && currentScrollY > 150) {
            setIsVisible(false); // Hide on scroll down
          } else {
            setIsVisible(true); // Show on scroll up
          }

          // Determine scrolled state (for transparency/blur)
          if (currentScrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavPillPinContext.Provider value={pinnedRef}>
      <nav
        className={`nav-pill ${isScrolled ? 'scrolled' : 'at-top'} ${!isVisible ? 'nav-hidden' : ''}`}
        aria-label="Hauptnavigation"
      >
        {children}
      </nav>
    </NavPillPinContext.Provider>
  );
};

export default NavPillShell;
