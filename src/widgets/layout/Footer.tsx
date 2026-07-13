import React from 'react';
import { Link } from '@/i18n/navigation';

import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  LinkedinLogo,
} from '@phosphor-icons/react/dist/ssr';
import LogoLoop from '@/shared/ui/LogoLoop';
import { TrustBadges } from '@/shared/ui/TrustBadges';
import { clientLogos } from '@/shared/data/clientLogos';
import { ProvenExpertSeal } from '@/components/ProvenExpertSeal';

export const Footer: React.FC = () => {
  const t = useTranslations('common');
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
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-6">
            {t('logobar.title', { defaultValue: 'Vertrauen schenken uns' })}
          </p>
          <div className="opacity-50 hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-300">
            <LogoLoop logos={clientLogos} speed={25} logoHeight={24} gap={48} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 w-full">
          {/* Col 1: Logo & Agency Description */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <OptimizedImage
                src="/images/brand/webdesign-wetzlar-coday-logo-footer.webp"
                alt="Coday"
                title="Webdesign Wetzlar – Coday"
                className="h-10 sm:h-16 w-auto mb-6 !bg-transparent"
              />
            </div>
            <p className="text-sm text-gray-300 max-w-xs mb-6 font-medium">{t('footer.slogan')}</p>

            {/* Trust Visual */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 max-w-xs">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white flex items-center justify-center p-1">
                <OptimizedImage
                  src="/images/hero/webdesign-wetzlar-business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen-small.webp"
                  alt="Partnerschaft"
                  title="Webdesign Wetzlar Partnerschaft"
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
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              {t('footer.sections.navigation', { defaultValue: 'Navigation' })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  prefetch={false}
                  href="/"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.main.home', { defaultValue: 'Startseite' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/work"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.main.work', { defaultValue: 'Portfolio' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/about"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.company.about', { defaultValue: 'Über uns' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/process"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.main.process', { defaultValue: 'Prozess' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/pricing"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.main.pricing', { defaultValue: 'Preise' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/partnerschaft"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.main.partnerschaft', { defaultValue: 'Partner-Programm' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/calculator"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.resources.calculator', { defaultValue: 'Preis-Rechner' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/career"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.career.label', { defaultValue: 'Karriere' })}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 3: Services */}
          <nav aria-label={t('footer.sections.services', { defaultValue: 'Services' })}>
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              {t('footer.sections.services', { defaultValue: 'Services' })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  prefetch={false}
                  href="/services/web-development"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.services.web_development.label', { defaultValue: 'Webentwicklung' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/services/design/ui-ux"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.services.ui_ux.label', { defaultValue: 'UI/UX Design' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/services/seo"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.services.seo.label', { defaultValue: 'SEO Optimierung' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/services/ecommerce-development"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.services.ecommerce.label', { defaultValue: 'E-Commerce' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/services/development/api-integration"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.services.api.label', { defaultValue: 'API-Integrationen' })}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/services/web-development"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  {t('nav.services.fullstack.label', { defaultValue: 'Full-Stack Entwicklung' })}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 4: Regionales (SEO) */}
          <nav aria-label={t('footer.sections.regional', { defaultValue: 'Regionales' })}>
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              {t('footer.sections.regional', { defaultValue: 'Standorte & Branchen' })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  prefetch={false}
                  href="/webdesign-agentur-wetzlar"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  Webdesign Agentur Wetzlar
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/standorte/hessen"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  Webdesign Hessen
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/standorte/wetzlar"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  Webagentur Wetzlar
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/branchen/gesundheitswesen/arzt-wetzlar"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  Praxis-Website Wetzlar
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/branchen/gesundheitswesen/arzt-giessen"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  Praxis-Website Gießen
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/branchen/handwerker/wetzlar"
                  className="text-sm text-gray-300 hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  Handwerker Wetzlar
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 5: Direct Contact details */}
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              {t('footer.sections.contact', { defaultValue: 'Kontakt' })}
            </h3>
            <ul className="space-y-3 mb-6 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:kontakt@codayweb.de"
                  className="hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  kontakt@codayweb.de
                </a>
              </li>
              <li>
                <a
                  href="tel:+4917641195301"
                  className="hover:text-primary transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
                >
                  +49 176 41195301
                </a>
              </li>
              <li className="pt-2 text-gray-300">
                Umutcan Emre Tezgel (Coday)
                <br />
                Lessingstraße 4
                <br />
                35578 Wetzlar
              </li>
            </ul>
            <Link
              prefetch={false}
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-6 bg-primary/20 text-blue-400 border border-primary/30 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition motion-reduce:duration-[0.01ms]"
            >
              {t('nav.main.contact', { defaultValue: 'Projekt starten' })}
            </Link>
          </div>
        </div>

        {/* Trust & Review Badges in Footer */}
        <div className="border-t border-gray-800/50 pt-10 pb-6 flex flex-col items-center justify-center gap-8">
          <TrustBadges
            align="center"
            className="opacity-80 grayscale hover:grayscale-0 transition motion-reduce:duration-[0.01ms] duration-300"
          />
          <ProvenExpertSeal />
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <nav aria-label="Soziale Medien" className="flex gap-6 text-gray-300">
            <a
              href="https://www.facebook.com/profile.php?id=61588758264018"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors motion-reduce:duration-[0.01ms] p-3 -m-3 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label={t('social.visit', { platform: 'Facebook' })}
            >
              <span className="sr-only">{t('social.visit', { platform: 'Facebook' })}</span>
              <OptimizedIcon icon={FacebookLogo} />
            </a>
            <a
              href="https://www.instagram.com/codayweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors motion-reduce:duration-[0.01ms] p-3 -m-3 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label={t('social.visit', { platform: 'Instagram' })}
            >
              <span className="sr-only">{t('social.visit', { platform: 'Instagram' })}</span>
              <OptimizedIcon icon={InstagramLogo} />
            </a>
            <a
              href="https://twitter.com/codayweb"
              className="hover:text-primary transition-colors motion-reduce:duration-[0.01ms] p-3 -m-3 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label={t('social.visit', { platform: 'Twitter' })}
            >
              <span className="sr-only">{t('social.visit', { platform: 'Twitter' })}</span>
              <OptimizedIcon icon={TwitterLogo} />
            </a>
            <a
              href="https://www.linkedin.com/in/umutcan-tezgel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors motion-reduce:duration-[0.01ms] p-3 -m-3 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label={t('social.visit', { platform: 'LinkedIn' })}
            >
              <span className="sr-only">{t('social.visit', { platform: 'LinkedIn' })}</span>
              <OptimizedIcon icon={LinkedinLogo} />
            </a>
          </nav>
          <nav
            aria-label="Rechtliche Informationen"
            className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-xs text-gray-300"
          >
            <Link
              prefetch={false}
              href="/legal/agb"
              className="hover:text-white transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
            >
              {t('nav.legal.agb')}
            </Link>
            <Link
              prefetch={false}
              href="/legal/datenschutz"
              className="hover:text-white transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
            >
              {t('nav.legal.privacy')}
            </Link>
            <Link
              prefetch={false}
              href="/legal/impressum"
              className="hover:text-white transition-colors motion-reduce:duration-[0.01ms] inline-flex items-center min-h-[48px] py-2"
            >
              {t('nav.legal.imprint')}
            </Link>
            <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
