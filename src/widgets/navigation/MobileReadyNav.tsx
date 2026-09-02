'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

import { CaretDown, ArrowUpRight, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import CodayLogo from '@/assets/images/coday_logo.png';
import Image from 'next/image';
import { LanguageSwitcher } from '@/widgets/navigation/LanguageSwitcher';

import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getNavItems } from '@/widgets/navigation/config';
import dynamic from 'next/dynamic';
import '@/widgets/navigation/MobileReadyNav.css';

const MobileNavOverlay = dynamic(
  () => import('@/widgets/navigation/MobileNavOverlay').then((m) => m.MobileNavOverlay),
  {
    ssr: false,
  }
);

interface CardNavProps {
  className?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

/**
 * Stable ids linking a sidebar button to the group it scrolls to. Derived from
 * the static config, so server and client agree. The dots in keys like
 * `nav.services.label` are stripped: they are legal in an id but would make the
 * id an invalid CSS selector for anyone reaching for querySelector later.
 */
const idSlug = (label: string) => label.replace(/[^a-zA-Z0-9]+/g, '-');
const groupId = (itemLabel: string, index: number) => `dd-grp-${idSlug(itemLabel)}-${index}`;
const groupTitleId = (itemLabel: string, index: number) =>
  `dd-grp-${idSlug(itemLabel)}-${index}-title`;

const MobileReadyNav: React.FC<CardNavProps> = ({
  className = '',
  buttonBgColor = 'var(--color-primary-700)', // Semantic token from theme
  buttonTextColor = 'var(--color-text-inverse)',
}) => {
  const t = useTranslations('common');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // UX States
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  // Dropdown scroll plumbing. Every group is rendered and visible, so the
  // sidebar is a table of contents that scrolls its panel rather than a filter.
  const scrollHostRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const groupRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  /** Silences the scroll spy while a click-driven scroll is in flight. */
  const programmaticUntil = useRef(0);
  const scrollAnimRef = useRef(0);
  /** Read inside the scroll listener so its dependency array can stay empty. */
  const activeCategoryRef = useRef<string | null>(null);

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
          if (activeCategoryRef.current) {
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

  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Get translated items

  const items = getNavItems();

  // Track active tabs for content inside dropdowns
  const [activeTabs, setActiveTabs] = useState<Record<string, number>>(() => {
    const initialTabs: Record<string, number> = {};
    items.forEach((item) => {
      initialTabs[item.label] = 0;
    });
    return initialTabs;
  });

  /**
   * Animates a panel's scroll position by hand.
   *
   * Native smooth scrolling is not usable here: engines that do not implement
   * `scroll-behavior: smooth` drop `scrollTo({behavior:'smooth'})` on the floor
   * rather than jumping, which would make the sidebar look broken. A rAF tween
   * behaves identically everywhere and honours reduced motion explicitly.
   */
  const tweenScrollTop = useCallback((host: HTMLElement, to: number) => {
    if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);

    const from = host.scrollTop;
    const delta = to - from;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // rAF is suspended while the document is hidden, which would leave the
    // animation — and therefore the scroll — stuck half-done.
    const cannotAnimate = typeof document !== 'undefined' && document.hidden;

    if (reduce || cannotAnimate || Math.abs(delta) < 2) {
      host.scrollTop = to;
      programmaticUntil.current = Date.now() + 60;
      scrollAnimRef.current = 0;
      return;
    }

    const duration = 320;
    const start = performance.now();
    programmaticUntil.current = Date.now() + duration + 120;

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      host.scrollTop = from + delta * eased;
      scrollAnimRef.current = p < 1 ? requestAnimationFrame(step) : 0;
    };
    scrollAnimRef.current = requestAnimationFrame(step);
  }, []);

  /**
   * Scrolls a dropdown to one of its groups.
   *
   * Deliberately not `scrollIntoView`: that walks every scrollable ancestor
   * including the document, and the header hides itself on downward document
   * scroll — the open panel would fly off-screen with it.
   */
  const scrollToGroup = useCallback(
    (itemLabel: string, index: number) => {
      // Move the indicator first, so panels too short to scroll still respond.
      setActiveTabs((prev) => (prev[itemLabel] === index ? prev : { ...prev, [itemLabel]: index }));

      const host = scrollHostRefs.current.get(itemLabel);
      const section = groupRefs.current.get(`${itemLabel}::${index}`);
      if (!host || !section) return;
      if (host.scrollHeight - host.clientHeight <= 1) return;

      // offsetTop is measured against the shared offsetParent and is immune to
      // the panel's open/close scale transform, unlike getBoundingClientRect.
      tweenScrollTop(host, section.offsetTop - host.offsetTop);
    },
    [tweenScrollTop]
  );

  /**
   * Keeps the sidebar highlight in step with the panel's scroll position.
   *
   * A plain scroll listener rather than an IntersectionObserver: all five panels
   * stay laid out (they are only `opacity-0`), so observers would run on every
   * page, and at the scroll end the last two groups intersect at once, which
   * would leave the final tab permanently unreachable.
   */
  useEffect(() => {
    activeCategoryRef.current = activeCategory;
    if (!activeCategory) return;

    const host = scrollHostRefs.current.get(activeCategory);
    if (!host) return;
    const label = activeCategory;

    // Runs straight off the scroll event rather than through requestAnimationFrame:
    // it reads a handful of rects, browsers already coalesce scroll events to one
    // per frame, and rAF is suspended whenever the document is hidden — which
    // would leave the highlight silently frozen.
    const sync = () => {
      if (Date.now() < programmaticUntil.current) return;

      let count = 0;
      while (groupRefs.current.has(`${label}::${count}`)) count++;
      if (count === 0) return;

      let best = 0;
      if (host.scrollTop + host.clientHeight >= host.scrollHeight - 2) {
        // At the bottom the last groups share the viewport; without this the
        // final tab could never light up.
        best = count - 1;
      } else {
        const hostTop = host.getBoundingClientRect().top;
        for (let i = 0; i < count; i++) {
          const el = groupRefs.current.get(`${label}::${i}`);
          if (el && el.getBoundingClientRect().top - hostTop <= 24) best = i;
        }
      }

      setActiveTabs((prev) => (prev[label] === best ? prev : { ...prev, [label]: best }));
    };

    // Panels keep their scroll position between opens — resync on open.
    sync();
    // A user who grabs the panel mid-tween wins: cancel it and hand back control.
    const cancelTween = () => {
      if (scrollAnimRef.current) {
        cancelAnimationFrame(scrollAnimRef.current);
        scrollAnimRef.current = 0;
        programmaticUntil.current = 0;
      }
    };

    host.addEventListener('scroll', sync, { passive: true });
    host.addEventListener('wheel', cancelTween, { passive: true });
    host.addEventListener('touchstart', cancelTween, { passive: true });
    return () => {
      host.removeEventListener('scroll', sync);
      host.removeEventListener('wheel', cancelTween);
      host.removeEventListener('touchstart', cancelTween);
      if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = 0;
    };
    // Keyed on activeCategory only: `items` is a fresh array every render.
  }, [activeCategory]);

  /**
   * Keeps the open panel inside the viewport.
   *
   * `.nav-dropdown` is centred on its trigger with no collision handling, so the
   * outer menus overhang the edge — measured at 144px past the left edge on a
   * 1024px viewport. The overhang is written to `--dd-shift`, which the
   * stylesheet applies as a margin.
   */
  useEffect(() => {
    if (!activeCategory) return;
    const panel = panelRefs.current.get(activeCategory);
    const trigger = panel?.parentElement?.querySelector('button');
    if (!panel || !trigger) return;

    const fit = () => {
      // Measure the trigger, not the panel: the panel carries scale-95 during
      // the open transition, which would make its width read ~5% short.
      const pill = panel.closest('.nav-pill') as HTMLElement | null;
      const scale =
        pill && pill.offsetWidth ? pill.getBoundingClientRect().width / pill.offsetWidth : 1;
      const rect = trigger.getBoundingClientRect();
      const centre = rect.left + rect.width / 2;
      const half = (panel.offsetWidth * scale) / 2;
      const pad = 16;

      let shift = 0;
      if (centre - half < pad) shift = pad - (centre - half);
      else if (centre + half > window.innerWidth - pad)
        shift = window.innerWidth - pad - (centre + half);

      panel.style.setProperty('--dd-shift', `${shift / (scale || 1)}px`);
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [activeCategory]);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCategory(null);
      setIsMobileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 300);
  };

  return (
    <header className={`card-nav-container ${className}`} ref={navRef}>
      {/* Floating Pill */}
      <nav
        className={`nav-pill ${isScrolled ? 'scrolled' : 'at-top'} ${!isVisible ? 'nav-hidden' : ''}`}
        aria-label="Hauptnavigation"
      >
        <Link
          href="/"
          className="nav-pill-logo"
          title="Zur Startseite"
          aria-label="Coday - Zur Startseite"
        >
          <Image
            src={CodayLogo}
            alt="Coday Webdesign Agentur Wetzlar Logo"
            width={48}
            height={48}
            className="logo-icon w-12 h-12 object-contain"
            priority={true}
            fetchPriority="high"
          />
          <span className="logo-text text-lg">Coday</span>
          <span className="sr-only"> – Zur Startseite</span>
        </Link>

        {/* Desktop Links (Center) */}
        <div className="nav-desktop-links hidden lg:flex">
          {items.map((item) => (
            <div
              key={item.label}
              className="nav-item-wrapper"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nav-pill-link relative z-10 ${activeCategory === item.label ? 'active bg-slate-100' : 'hover:bg-slate-50'}`}
                aria-expanded={activeCategory === item.label}
                onClick={() => setActiveCategory(activeCategory === item.label ? null : item.label)}
              >
                {t(item.label)}
                <OptimizedIcon
                  icon={CaretDown}
                  className={`nav-chevron ${activeCategory === item.label ? 'rotate' : ''}`}
                />
              </button>

              {/* Focused Dropdown */}
              <div
                ref={(el) => {
                  if (el) panelRefs.current.set(item.label, el);
                  else panelRefs.current.delete(item.label);
                }}
                className={`nav-dropdown absolute left-1/2 -translate-x-1/2 transition-[opacity,transform] motion-reduce:duration-[0.01ms] duration-300 ease-out will-change-[opacity,transform] transform-gpu origin-top ${
                  activeCategory === item.label
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                }`}
                style={
                  {
                    '--accent-color': item.bgColor,
                    '--text-color': item.textColor,
                  } as React.CSSProperties
                }
              >
                <div className="dropdown-inner">
                  {/* Optional Sidebar for Multi-Group */}
                  {item.groups && item.groups.length > 1 && (
                    <div
                      className="dropdown-sidebar"
                      role="group"
                      aria-label={t('nav.a11y.sections', { category: t(item.label) })}
                    >
                      {item.groups.map((group, idx) => (
                        <button
                          key={group.title}
                          type="button"
                          className={`dropdown-sidebar-item ${activeTabs[item.label] === idx ? 'active' : ''}`}
                          aria-controls={groupId(item.label, idx)}
                          aria-current={activeTabs[item.label] === idx ? 'true' : undefined}
                          // No onMouseEnter: with nothing hidden, hover-to-scroll
                          // would drag the content out from under the pointer.
                          onClick={() => scrollToGroup(item.label, idx)}
                          onFocus={() => scrollToGroup(item.label, idx)}
                        >
                          {t(group.title)}
                          {activeTabs[item.label] === idx && <div className="active-indicator" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Content Grid */}
                  <div
                    className="dropdown-content"
                    ref={(el) => {
                      if (el) scrollHostRefs.current.set(item.label, el);
                      else scrollHostRefs.current.delete(item.label);
                    }}
                  >
                    {item.groups && item.groups.length > 0 ? (
                      // Every group is rendered AND visible; the sidebar scrolls
                      // between them. The block wrapper is what lets the heading
                      // stick — as a grid item its sticky travel would be zero.
                      item.groups.map((group, groupIdx) => (
                        <div
                          key={group.title}
                          ref={(el) => {
                            const key = `${item.label}::${groupIdx}`;
                            if (el) groupRefs.current.set(key, el);
                            else groupRefs.current.delete(key);
                          }}
                          id={groupId(item.label, groupIdx)}
                          role="group"
                          aria-labelledby={groupTitleId(item.label, groupIdx)}
                          className="dropdown-group"
                        >
                          {/* Stays a div: all five dropdowns ship in the SSR HTML
                              of every route, so headings here would put 17 of them
                              ahead of the page h1. */}
                          <div
                            className="dropdown-group-title"
                            id={groupTitleId(item.label, groupIdx)}
                          >
                            {t(group.title)}
                          </div>

                          <div className="dropdown-links-grid">
                            {group.links.map((link, i) => (
                              <div key={i} className="dropdown-link-item group relative">
                                <div className="link-icon-wrapper" aria-hidden="true">
                                  <OptimizedIcon icon={ArrowUpRight} className="link-arrow" />
                                </div>
                                <div className="link-text">
                                  <Link
                                    href={link.href}
                                    locale={(link as any).locale}
                                    prefetch={false}
                                    onClick={() => setActiveCategory(null)}
                                    title={t(link.label)}
                                    aria-label={
                                      link.href.startsWith('http')
                                        ? `${t(link.label)} (Website)`
                                        : t(link.label)
                                    }
                                    className="link-label before:absolute before:inset-0 focus:outline-none focus-visible:ring-0"
                                  >
                                    {t(link.label)}
                                  </Link>
                                  {link.desc && (
                                    <span className="link-desc" aria-hidden="true">
                                      {t(link.desc)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      // No groups (fallback)
                      <div className="dropdown-links-grid">
                        {item.links?.map((link, i) => (
                          <Link
                            key={i}
                            href={link.href}
                            locale={(link as any).locale}
                            className="dropdown-link-item"
                            onClick={() => setActiveCategory(null)}
                          >
                            {t(link.label)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions (Right) */}
        <div className="nav-pill-actions">
          {/* Desktop/Tablet Only Actions */}
          <div className="nav-desktop-actions hidden lg:flex items-center gap-3">
            <React.Suspense fallback={null}>
              <LanguageSwitcher />
            </React.Suspense>

            <Link
              href="/pricing"
              className="nav-pill-cta hidden xl:flex"
              style={{
                backgroundColor: 'var(--color-accent-700)',
                color: 'var(--color-text-inverse)',
              }}
            >
              <span>{t('nav.packages.label')}</span>
              <OptimizedIcon icon={ArrowRight} className="cta-arrow" />
            </Link>

            <Link
              href="/contact"
              className="nav-pill-cta"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              <span>{t('nav.cta_booking')}</span>
              <OptimizedIcon icon={ArrowRight} className="cta-arrow" />
            </Link>
          </div>

          {/* Mobile Hamburger (Visible only on mobile) */}
          <div className="mobile-only-actions lg:hidden flex items-center gap-3">
            <React.Suspense fallback={null}>
              <LanguageSwitcher />
            </React.Suspense>
            <button
              className={`mobile-menu-trigger p-2 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-[0.9] transition-transform motion-reduce:duration-[0.01ms] ${isMobileOpen ? 'is-open' : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileOpen}
            >
              <div className="hamburger-icon">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileNavOverlay
        items={items}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </header>
  );
};

export default MobileReadyNav;
