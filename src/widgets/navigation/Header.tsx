import React, { Suspense } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import CodayLogo from '@/assets/images/coday_logo.png';
import { Link } from '@/i18n/navigation';
import { getNavItems, type NavLink } from '@/widgets/navigation/config';
import { LanguageSwitcher } from '@/widgets/navigation/LanguageSwitcher';
import { HeaderContactActions } from '@/widgets/navigation/HeaderContactActions';
import { NavPillShell, NavPillCta } from '@/widgets/navigation/NavPillShell';
import { DesktopNavClient, type DesktopNavItem } from '@/widgets/navigation/DesktopNavClient';
import { MobileNavTrigger, type MobileNavItem } from '@/widgets/navigation/MobileNavTrigger';

interface HeaderProps {
  className?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

type Translate = Awaited<ReturnType<typeof getTranslations>>;

/**
 * The site header, rendered on the server. The markup is the one the old
 * client-only header produced; only three small islands hydrate: the pill's
 * scroll classes, the desktop dropdown logic and the hamburger. Every label is
 * translated here, once per request, and every link is in the server HTML,
 * which scripts/qa/check-nav-reach.mjs relies on.
 */
export async function Header({
  className = '',
  buttonBgColor = 'var(--color-primary-700)', // Semantic token from theme
  buttonTextColor = 'var(--color-text-inverse)',
}: HeaderProps = {}) {
  const t = await getTranslations('common');
  const items = getNavItems();

  const renderGroupGrid = (links: NavLink[]) => (
    <div className="dropdown-links-grid">
      {links.map((link, i) => (
        <div key={i} className="dropdown-link-item group relative">
          <div className="link-icon-wrapper" aria-hidden="true">
            <OptimizedIcon icon={ArrowUpRight} className="link-arrow" />
          </div>
          <div className="link-text">
            <Link
              href={link.href}
              locale={link.locale}
              prefetch={false}
              title={t(link.label)}
              aria-label={
                link.href.startsWith('http') ? `${t(link.label)} (Website)` : t(link.label)
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
  );

  const renderFallbackGrid = (links: NavLink[] | undefined) => (
    <div className="dropdown-links-grid">
      {links?.map((link, i) => (
        <Link key={i} href={link.href} locale={link.locale} className="dropdown-link-item">
          {t(link.label)}
        </Link>
      ))}
    </div>
  );

  const desktopItems: DesktopNavItem[] = items.map((item) => ({
    key: item.label,
    label: t(item.label),
    bgColor: item.bgColor,
    textColor: item.textColor,
    sectionsLabel: t('nav.a11y.sections', { category: t(item.label) }),
    groups: item.groups?.map((group) => ({
      title: t(group.title),
      grid: renderGroupGrid(group.links),
    })),
    fallback: item.groups && item.groups.length > 0 ? undefined : renderFallbackGrid(item.links),
  }));

  const mobileItems: MobileNavItem[] = items.map((item) => ({
    key: item.label,
    label: t(item.label),
    groups: item.groups?.map((group) => ({
      title: t(group.title),
      links: group.links.map((link) => translateLink(t, link)),
    })),
    links: item.links?.map((link) => translateLink(t, link)),
  }));

  return (
    <header className={`card-nav-container ${className}`}>
      {/* Floating Pill */}
      <NavPillShell>
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

        {/* Desktop Links (Center). No Suspense here on purpose: React outlines
            large boundaries when prerendering (the grids would land in hidden
            segments after </header>), and scripts/qa/check-nav-reach.mjs plus
            non-JS crawlers read the links from inside <header>. */}
        <DesktopNavClient items={desktopItems} />

        {/* Actions (Right) */}
        <div className="nav-pill-actions">
          {/* Desktop/Tablet Only Actions */}
          <div className="nav-desktop-actions hidden lg:flex items-center gap-3">
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>

            <NavPillCta
              href="/pricing"
              ctaLabel="packages"
              className="nav-pill-cta hidden xl:flex"
              style={{
                backgroundColor: 'var(--color-accent-700)',
                color: 'var(--color-text-inverse)',
              }}
            >
              <span>{t('nav.packages.label')}</span>
              <OptimizedIcon icon={ArrowRight} className="cta-arrow" />
            </NavPillCta>

            <NavPillCta
              href="/contact"
              ctaLabel="contact"
              className="nav-pill-cta"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              <span>{t('nav.cta_booking')}</span>
              <OptimizedIcon icon={ArrowRight} className="cta-arrow" />
            </NavPillCta>
          </div>

          {/* Mobile Hamburger (Visible only on mobile) */}
          <div className="mobile-only-actions lg:hidden flex items-center gap-2">
            <HeaderContactActions />
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>
            <MobileNavTrigger items={mobileItems} />
          </div>
        </div>
      </NavPillShell>
    </header>
  );
}

function translateLink(t: Translate, link: NavLink) {
  return {
    label: t(link.label),
    href: link.href,
    ...(link.desc ? { desc: t(link.desc) } : {}),
    ...(link.locale ? { locale: link.locale } : {}),
  };
}

export default Header;
