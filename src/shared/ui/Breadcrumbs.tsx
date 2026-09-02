'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CaretRight, House } from '@phosphor-icons/react/dist/ssr';

interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '' }) => {
  const t = useTranslations('common');
  const pathname = usePathname() || '';

  // Ensure locale is stripped (next-intl usePathname sometimes includes it during SSG)
  const cleanPathname = pathname.replace(/^\/(de|en)(\/|$)/, '/');
  const pathnames = cleanPathname.split('/').filter((x) => x);

  // If we are at the root, don't show breadcrumbs
  if (pathnames.length === 0) {
    return null;
  }

  // Path segments that reuse an existing nav label.
  const NAV_KEYS: Record<string, string> = {
    services: 'nav.services.label',
    industries: 'nav.industries.label',
    work: 'nav.work.label',
    knowledge: 'nav.resources.knowledge.title',
    contact: 'nav.about.contact.label',
    career: 'nav.career.label',
    legal: 'nav.company.legal',
    'web-development': 'nav.services.web_development.label',
    'web-design': 'nav.services.web_design.label',
    seo: 'nav.services.seo.label',
    performance: 'nav.services.performance.label',
    blog: 'nav.academy.blog.label',
    pricing: 'nav.main.pricing',
  };

  /** "inbound-marketing" -> "Inbound Marketing" */
  const humanize = (segment: string) =>
    segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  /**
   * Resolution order: a dedicated breadcrumb label, then the matching nav label,
   * then the humanised slug. `t.has` is required — a missing message does not
   * return the bare key, it returns `common.<key>` via getMessageFallback, so
   * comparing the result against the key never detects a miss.
   */
  const labelFor = (segment: string) => {
    if (t.has(`breadcrumb.${segment}`)) return t(`breadcrumb.${segment}`);

    const navKey = NAV_KEYS[segment];
    if (navKey && t.has(navKey)) return t(navKey);

    return humanize(segment);
  };

  return (
    <nav aria-label="breadcrumb" className={`flex items-center text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-slate-500 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] flex items-center"
            aria-label="Home"
            title={t('nav.main.home', { defaultValue: 'Startseite' })}
          >
            <span className="sr-only">{t('nav.main.home', { defaultValue: 'Startseite' })}</span>
            <OptimizedIcon icon={House} className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const rawTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const to = rawTo === '/knowledge' ? '/knowledge/wikihub' : rawTo;
          const translatedLabel = labelFor(value);
          // /knowledge/wiki has no page of its own — it redirects to the wikihub,
          // which the /knowledge crumb already links. Rendering it as a link put
          // ~100 internal links onto a redirect.
          const isLast = index === pathnames.length - 1 || rawTo === '/knowledge/wiki';

          return (
            <li key={to} className="flex items-center space-x-2">
              <OptimizedIcon icon={CaretRight} className="w-3 h-3 text-slate-400" />
              {isLast ? (
                <span className="text-slate-900 font-medium cursor-default" aria-current="page">
                  {translatedLabel}
                </span>
              ) : (
                <Link
                  href={to}
                  className="text-slate-500 hover:text-primary transition-colors motion-reduce:duration-[0.01ms]"
                >
                  {translatedLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
