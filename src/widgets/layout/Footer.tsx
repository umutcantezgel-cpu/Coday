import React from 'react';
import { LocalizedNavLink as NavLink } from '@/shared/ui/LocalizedLink';

import { useTranslation } from 'react-i18next';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { FacebookLogo, InstagramLogo, TwitterLogo, LinkedinLogo } from '@phosphor-icons/react';
import { LogoLoop } from '@/shared/ui';
import { TrustBadges } from '@/shared/ui/TrustBadges';
import { clientLogos } from '@/shared/data/clientLogos';

export const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <footer
      className="bg-secondary text-white border-t border-gray-800 pt-16 pb-8 relative overflow-hidden"
      role="contentinfo"
    >
      {/* Bright Blur Effect for Logo Visibility - Scaled up for full top-left coverage */}
      <div className="absolute top-0 start-0 w-[900px] h-[900px] bg-white/10 blur-[160px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Logo Bar */}
        <div className="mb-12 border-b border-gray-800/50 pb-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">
            {t('logobar.title', { defaultValue: 'Vertrauen schenken uns' })}
          </p>
          <div className="opacity-50 hover:opacity-100 transition-opacity duration-300">
            <LogoLoop logos={clientLogos} speed={25} logoHeight={24} gap={48} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-12 w-full">
          {/* Col 1: Logo & Agency Description */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <OptimizedImage
                src="/images/brand/coday-logo-footer.webp"
                alt="Coday"
                className="h-10 sm:h-16 w-auto mb-6 !bg-transparent"
              />
            </div>
            <p className="text-sm text-gray-400 max-w-xs mb-6 font-medium">{t('footer.slogan')}</p>

            {/* Trust Visual */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 max-w-xs">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white flex items-center justify-center p-1">
                <OptimizedImage
                  src="/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen-small.webp"
                  alt="Partnerschaft"
                  className="w-full h-full object-cover rounded-md"
                  width={40}
                  height={40}
                  priority={false}
                />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('footer.trust.title', { defaultValue: 'Coday Web' })}
                </div>
                <div className="text-[10px] text-gray-300">
                  {t('footer.trust.desc', { defaultValue: 'Premium Agency' })}
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Main Navigation */}
          <nav aria-label={t('footer.sections.navigation', { defaultValue: 'Navigation' })}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              {t('footer.sections.navigation', { defaultValue: 'Navigation' })}
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.main.home', { defaultValue: 'Startseite' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/work"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.main.work', { defaultValue: 'Portfolio' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.company.about', { defaultValue: 'Über uns' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/process"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.main.process', { defaultValue: 'Prozess' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pricing"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.main.pricing', { defaultValue: 'Preise' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/partnerschaft"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.main.partnerschaft', { defaultValue: 'Partner-Programm' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calculator"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.resources.calculator', { defaultValue: 'Preis-Rechner' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/career"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.career.label', { defaultValue: 'Karriere' })}
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Col 3: Services */}
          <nav aria-label={t('footer.sections.services', { defaultValue: 'Services' })}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              {t('footer.sections.services', { defaultValue: 'Services' })}
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/services/web-development"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.services.web_development.label', { defaultValue: 'Webentwicklung' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services/ui-ux-design"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.services.ui_ux.label', { defaultValue: 'UI/UX Design' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services/seo"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.services.seo.label', { defaultValue: 'SEO Optimierung' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services/ecommerce"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.services.ecommerce.label', { defaultValue: 'E-Commerce' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services/web-development/api-integrations"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.services.api.label', { defaultValue: 'API-Integrationen' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services/web-development/full-stack-entwicklung"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.services.fullstack.label', { defaultValue: 'Full-Stack Entwicklung' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/oeffentliche-auftraege"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.industries.public', { defaultValue: 'Öffentliche Aufträge' })}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services/industries/startups-tech"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {t('nav.industries.tech', { defaultValue: 'Tech Startups' })}
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Col 4: Direct Contact details */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              {t('footer.sections.contact', { defaultValue: 'Kontakt' })}
            </h3>
            <ul className="space-y-3 mb-6 text-sm text-gray-300">
              <li>
                <a href="mailto:umut@codayweb.de" className="hover:text-primary transition-colors">
                  umut@codayweb.de
                </a>
              </li>
              <li>
                <a href="tel:+4917641195301" className="hover:text-primary transition-colors">
                  +49 176 41195301
                </a>
              </li>
              <li className="pt-2 text-gray-400">
                Coday Digital Agency
                <br />
                Wetzlar, Deutschland
                <br />
                (Remote weltweit)
              </li>
            </ul>
            <NavLink
              to="/contact"
              className="inline-block px-6 py-2 bg-primary/20 text-blue-400 border border-primary/30 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all"
            >
              {t('nav.main.contact', { defaultValue: 'Projekt starten' })}
            </NavLink>
          </div>
        </div>

        {/* Trust Badges in Footer */}
        <div className="border-t border-gray-800/50 pt-10 pb-6">
          <TrustBadges
            align="center"
            className="opacity-80 grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <nav aria-label="Soziale Medien" className="flex gap-6 text-gray-400">
            <a
              href="/contact"
              className="hover:text-primary transition-colors"
              aria-label={t('social.visit', { platform: 'Facebook' })}
            >
              <OptimizedIcon icon={FacebookLogo} />
            </a>
            <a
              href="/contact"
              className="hover:text-primary transition-colors"
              aria-label={t('social.visit', { platform: 'Instagram' })}
            >
              <OptimizedIcon icon={InstagramLogo} />
            </a>
            <a
              href="/contact"
              className="hover:text-primary transition-colors"
              aria-label={t('social.visit', { platform: 'Twitter' })}
            >
              <OptimizedIcon icon={TwitterLogo} />
            </a>
            <a
              href="/contact"
              className="hover:text-primary transition-colors"
              aria-label={t('social.visit', { platform: 'LinkedIn' })}
            >
              <OptimizedIcon icon={LinkedinLogo} />
            </a>
          </nav>
          <nav
            aria-label="Rechtliche Informationen"
            className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-xs text-gray-400"
          >
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
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
