import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '@/shared/ui/LocalizedLink';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CaretRight, House } from '@phosphor-icons/react';

interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '' }) => {
  const { t } = useTranslation('common');
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  // If we are at the root, don't show breadcrumbs
  if (pathnames.length === 0) {
    return null;
  }

  // Common path mappings to translation keys
  const getTranslationKey = (pathSegment: string) => {
    const mappings: Record<string, string> = {
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
    };

    return mappings[pathSegment] || pathSegment;
  };

  return (
    <nav aria-label="breadcrumb" className={`flex items-center text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-slate-500 hover:text-primary transition-colors flex items-center"
            aria-label="Home"
          >
            <OptimizedIcon icon={House} className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const translationKey = getTranslationKey(value);
          // If translation returns the key itself, try to capitalize the raw path
          const translatedLabel =
            t(translationKey) === translationKey
              ? value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ')
              : t(translationKey);

          return (
            <li key={to} className="flex items-center space-x-2">
              <OptimizedIcon icon={CaretRight} className="w-3 h-3 text-slate-400" />
              {isLast ? (
                <span className="text-slate-900 font-medium cursor-default" aria-current="page">
                  {translatedLabel}
                </span>
              ) : (
                <Link to={to} className="text-slate-500 hover:text-primary transition-colors">
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
