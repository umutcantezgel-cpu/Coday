'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { usePathname } from '@/i18n/navigation';
import { useNavPillPin } from '@/widgets/navigation/NavPillShell';

/**
 * One desktop menu, already translated on the server.
 *
 * `key` is the untranslated label key (`nav.services.label`): it is what the
 * old client-only header used as its state key and as the seed for the group
 * ids, so keeping it keeps every id in the HTML byte-identical.
 */
export interface DesktopNavGroup {
  /** Translated group heading. */
  title: string;
  /** The `.dropdown-links-grid` for this group, rendered on the server. */
  grid: React.ReactNode;
}

export interface DesktopNavItem {
  key: string;
  /** Translated menu label. */
  label: string;
  bgColor: string;
  textColor: string;
  /** Translated `nav.a11y.sections` string for the sidebar's aria-label. */
  sectionsLabel: string;
  groups?: DesktopNavGroup[];
  /** The fallback `.dropdown-links-grid` for items without groups, server-rendered. */
  fallback?: React.ReactNode;
}

interface DesktopNavClientProps {
  items: DesktopNavItem[];
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

/**
 * The desktop menu bar: triggers, chevrons, panels, sidebars and group shells.
 * The link grids inside the groups arrive as server-rendered ReactNodes, so
 * the ~150 translations never run on the client and the config never ships
 * in the layout chunk. Every ref points at an element this component renders
 * itself, which keeps the scroll, spy and fit logic unchanged.
 */
export const DesktopNavClient: React.FC<DesktopNavClientProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pinRef = useNavPillPin();

  // Dropdown scroll plumbing. Every group is rendered and visible, so the
  // sidebar is a table of contents that scrolls its panel rather than a filter.
  const scrollHostRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const groupRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  /** Silences the scroll spy while a click-driven scroll is in flight. */
  const programmaticUntil = useRef(0);
  const scrollAnimRef = useRef(0);

  const pathname = usePathname();
  const linksRef = useRef<HTMLDivElement>(null);

  // Track active tabs for content inside dropdowns
  const [activeTabs, setActiveTabs] = useState<Record<string, number>>(() => {
    const initialTabs: Record<string, number> = {};
    items.forEach((item) => {
      initialTabs[item.key] = 0;
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
    (itemKey: string, index: number) => {
      // Move the indicator first, so panels too short to scroll still respond.
      setActiveTabs((prev) => (prev[itemKey] === index ? prev : { ...prev, [itemKey]: index }));

      const host = scrollHostRefs.current.get(itemKey);
      const section = groupRefs.current.get(`${itemKey}::${index}`);
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
    // An open dropdown pins the header: hiding it would take the panel the
    // user is reading with it. The shell reads this inside its scroll listener.
    pinRef.current = activeCategory !== null;
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

      // Only meaningful once there is something to scroll: on a panel that fits,
      // "at the bottom" is true from the start and would pin the last group.
      const scrollable = host.scrollHeight - host.clientHeight > 1;

      let best = 0;
      if (scrollable && host.scrollTop + host.clientHeight >= host.scrollHeight - 2) {
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
    // Keyed on activeCategory only: the pin ref is stable for the shell's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Close dropdown on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCategory(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle outside click to close. The boundary is the whole <header>, as
  // before: clicking the logo or the actions block does not close the panel.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const root = linksRef.current?.closest('header') ?? linksRef.current;
      if (root && !root.contains(event.target as Node)) {
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

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 300);
  };

  /**
   * The links are server-rendered and carry no handlers of their own, so the
   * "close on link click" of the old per-link onClick is delegated here.
   */
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as Element).closest('a')) setActiveCategory(null);
  };

  return (
    <div className="nav-desktop-links hidden lg:flex" ref={linksRef}>
      {items.map((item) => (
        <div
          key={item.key}
          className="nav-item-wrapper"
          onMouseEnter={() => handleMouseEnter(item.key)}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-pill-link relative z-10 ${activeCategory === item.key ? 'active bg-slate-100' : 'hover:bg-slate-50'}`}
            aria-expanded={activeCategory === item.key}
            onClick={() => setActiveCategory(activeCategory === item.key ? null : item.key)}
          >
            {item.label}
            <OptimizedIcon
              icon={CaretDown}
              className={`nav-chevron ${activeCategory === item.key ? 'rotate' : ''}`}
            />
          </button>

          {/* Focused Dropdown */}
          <div
            ref={(el) => {
              if (el) panelRefs.current.set(item.key, el);
              else panelRefs.current.delete(item.key);
            }}
            className={`nav-dropdown absolute left-1/2 -translate-x-1/2 transition-[opacity,transform] motion-reduce:duration-[0.01ms] duration-300 ease-out will-change-[opacity,transform] transform-gpu origin-top ${
              activeCategory === item.key
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
                <div className="dropdown-sidebar" role="group" aria-label={item.sectionsLabel}>
                  {item.groups.map((group, idx) => (
                    <button
                      key={group.title}
                      type="button"
                      className={`dropdown-sidebar-item ${activeTabs[item.key] === idx ? 'active' : ''}`}
                      aria-controls={groupId(item.key, idx)}
                      aria-current={activeTabs[item.key] === idx ? 'true' : undefined}
                      // No onMouseEnter: with nothing hidden, hover-to-scroll
                      // would drag the content out from under the pointer.
                      onClick={() => scrollToGroup(item.key, idx)}
                      onFocus={() => scrollToGroup(item.key, idx)}
                    >
                      {group.title}
                      {activeTabs[item.key] === idx && <div className="active-indicator" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Content Grid */}
              <div
                className="dropdown-content"
                ref={(el) => {
                  if (el) scrollHostRefs.current.set(item.key, el);
                  else scrollHostRefs.current.delete(item.key);
                }}
                onClick={handleContentClick}
              >
                {item.groups && item.groups.length > 0
                  ? // Every group is rendered AND visible; the sidebar scrolls
                    // between them. The block wrapper is what lets the heading
                    // stick — as a grid item its sticky travel would be zero.
                    item.groups.map((group, groupIdx) => (
                      <div
                        key={group.title}
                        ref={(el) => {
                          const key = `${item.key}::${groupIdx}`;
                          if (el) groupRefs.current.set(key, el);
                          else groupRefs.current.delete(key);
                        }}
                        id={groupId(item.key, groupIdx)}
                        role="group"
                        aria-labelledby={groupTitleId(item.key, groupIdx)}
                        className="dropdown-group"
                      >
                        {/* Stays a div: all five dropdowns ship in the SSR HTML
                            of every route, so headings here would put 17 of them
                            ahead of the page h1. */}
                        <div className="dropdown-group-title" id={groupTitleId(item.key, groupIdx)}>
                          {group.title}
                        </div>

                        {group.grid}
                      </div>
                    ))
                  : // No groups (fallback)
                    item.fallback}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesktopNavClient;
