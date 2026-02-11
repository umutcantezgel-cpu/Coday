import React from 'react';
import { LocalizedNavLink as NavLink } from '../../shared/ui/LocalizedLink';

import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/Icon';

export const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <footer className="bg-secondary text-white border-t border-gray-800 pt-16 pb-8 relative overflow-hidden">
      {/* Bright Blur Effect for Logo Visibility - Scaled up for full top-left coverage */}
      <div className="absolute top-0 left-0 w-[900px] h-[900px] bg-white/10 blur-[160px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/brand/coday-wordmark.svg"
                alt="Coday"
                className="h-16 w-auto mb-6"
              />
            </div>
            <p className="text-sm text-gray-400 max-w-xs mb-6 font-medium">{t('footer.slogan')}</p>

            {/* Trust Visual */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 max-w-xs">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                <img
                  src="/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.webp"
                  alt="Partnerschaft"
                  className="w-full h-full object-cover"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('footer.trust.title')}
                </div>
                <div className="text-[10px] text-gray-400">{t('footer.trust.desc')}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              {t('footer.sections.pricing')}
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/packages"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('footer.links.packages')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/booking"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('footer.links.booking')}
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              {t('footer.sections.knowledge')}
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/knowledge/academy"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.academy.label')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/knowledge/blog"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.academy.blog.label')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/knowledge/newsletter"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.academy.newsletter.label')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/knowledge/whitepapers"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.academy.whitepapers.label')}
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              {t('footer.sections.career')}
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/career/jobs"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.career.jobs.label')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/career/culture"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.career.culture.label')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/career/benefits"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.career.benefits.label')}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-gray-400">
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Besuchen Sie uns auf Facebook"
            >
              <Icon name="facebook" />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Besuchen Sie uns auf Instagram"
            >
              <Icon name="instagram" />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Besuchen Sie uns auf Twitter"
            >
              <Icon name="twitter" />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Besuchen Sie uns auf LinkedIn"
            >
              <Icon name="linkedin" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-xs text-gray-500">
            <NavLink to="/legal/agb" className="hover:text-white transition-colors">
              {t('nav.legal.agb')}
            </NavLink>
            <NavLink to="/legal/datenschutz" className="hover:text-white transition-colors">
              {t('nav.legal.privacy')}
            </NavLink>
            <NavLink to="/legal/impressum" className="hover:text-white transition-colors">
              {t('nav.legal.imprint')}
            </NavLink>
            <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
