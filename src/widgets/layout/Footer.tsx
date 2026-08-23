'use client';
import React from 'react';
import { Link } from '@/i18n/navigation';
import { m } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { useConsentStore } from '@/shared/lib/consent/consentStore';

import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import Image from 'next/image';
import GradientText from '@/shared/ui/GradientText';
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  LinkedinLogo,
  ArrowRight,
  RocketLaunch,
  EnvelopeSimple,
  Phone,
} from '@phosphor-icons/react/dist/ssr';

import LogoLoop from '@/shared/ui/LogoLoop';
import { TrustBadges } from '@/shared/ui/TrustBadges';
import { clientLogos } from '@/shared/data/clientLogos';

export const Footer: React.FC = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const isEn = locale === 'en';
  const openSettings = useConsentStore((state) => state.openSettings);

  return (
    <footer
      className="relative bg-slate-50 text-slate-900 overflow-hidden pb-24 lg:pb-0 font-sans border-t border-slate-200"
      role="contentinfo"
    >
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary-100/40 blur-[140px]" />
        <div className="absolute -bottom-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-100/30 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 lg:pt-28 pb-8">
        {/* Massive Typography CTA Section in Elevated Light Card */}
        <div className="mb-24 relative">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 border border-primary-100 mb-8 shadow-sm group hover:scale-105 transition-transform duration-300">
                <OptimizedIcon
                  icon={RocketLaunch}
                  className="w-8 h-8 text-primary-700"
                  weight="duotone"
                />
              </div>

              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6 tracking-tight text-slate-900 break-words hyphens-auto">
                {t('global_cta.title_prefix')} <br className="hidden sm:block" />
                <GradientText colors={['#147a7a', '#0f5c5c', '#0d9488']} className="pb-2">
                  {t('global_cta.title_highlight')}
                </GradientText>
              </h2>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                {t('global_cta.subtitle')}
              </p>

              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-primary-700 hover:bg-primary-800 border border-transparent rounded-full shadow-lg shadow-primary-700/25 hover:shadow-xl hover:shadow-primary-700/30 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 focus:ring-offset-white overflow-hidden"
              >
                <span className="relative flex items-center gap-3 text-lg">
                  {t('global_cta.button')}
                  <OptimizedIcon
                    icon={ArrowRight}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </m.div>
        </div>

        {/* Client Logos / Trust */}
        <div className="mb-24 opacity-75 hover:opacity-100 transition-opacity duration-500 relative">
          <div className="absolute top-1/2 left-0 w-1/4 h-px bg-gradient-to-r from-transparent to-slate-300" />
          <div className="absolute top-1/2 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-slate-300" />
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-700 mb-8 bg-slate-50 inline-block px-4 relative z-10 left-1/2 -translate-x-1/2">
            {t('logobar.title')}
          </p>
          <LogoLoop logos={clientLogos} speed={30} logoHeight={24} gap={64} />
        </div>

        {/* Minimalist Structured Grid (5 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16 w-full border-t border-slate-200 pt-16">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col items-start lg:col-span-1">
            <Link
              href="/"
              className="group relative inline-flex items-center mb-6 transition-all duration-300"
              title="Coday Web: Webdesign Agentur Wetzlar"
              aria-label="Coday Web: Webdesign Agentur Wetzlar Startseite"
            >
              <div className="relative flex items-center justify-center p-2 sm:p-3">
                {/* Outer soft light-grey airbrush spray halo dissolving seamlessly into bg-slate-50 */}
                <div
                  className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(203,213,225,0.75)_0%,rgba(226,232,240,0.5)_40%,transparent_75%)] rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700"
                  aria-hidden="true"
                />
                {/* Inner subtle spray layer */}
                <div
                  className="absolute -inset-2 bg-[radial-gradient(circle,rgba(203,213,225,0.6)_0%,transparent_70%)] rounded-full blur-lg pointer-events-none opacity-90"
                  aria-hidden="true"
                />

                {/* Crisp, large Coday logo rendered directly on the soft light spray background */}
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/images/brand/coday-logo-footer.png"
                    alt={t('footer.logo_alt')}
                    width={220}
                    height={68}
                    className="h-10 sm:h-12 w-auto object-contain brightness-0 contrast-200 group-hover:opacity-85 transition-all duration-300"
                    priority={false}
                  />
                </div>
              </div>
            </Link>
            <p className="text-sm text-slate-600 max-w-xs mb-8 leading-relaxed font-normal">
              {t('footer.slogan')}
            </p>

            <div className="mt-auto flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-primary-300 cursor-default group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300 border border-slate-200">
                <OptimizedImage
                  src="/images/hero/webdesign-wetzlar-business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen-small.webp"
                  alt="Webdesign Wetzlar – Partnerschaftliche Zusammenarbeit & Vertrauen"
                  className="w-full h-full object-cover rounded-[10px]"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-0.5 group-hover:text-primary-700 transition-colors">
                  {t('footer.trust.title')}
                </div>
                <div className="text-[10px] text-primary-700 font-semibold tracking-wide">
                  {t('footer.trust.desc')}
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Company / Unternehmen Navigation */}
          <nav aria-label={t('nav.company.label')}>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-600"></span>
              {t('nav.company.label')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: t('nav.main.home') },
                { href: '/about', label: t('nav.company.about') },
                { href: '/work', label: t('nav.main.work') },
                { href: '/process', label: t('nav.main.process') },
                { href: '/pricing', label: t('nav.main.pricing') },
                { href: '/career', label: t('nav.company.career') },
                {
                  href: '/career/jobs',
                  label: t('nav.career.jobs.label'),
                },
                {
                  href: '/career/culture',
                  label: t('nav.career.culture.label'),
                },
                {
                  href: '/career/benefits',
                  label: t('nav.career.benefits.label'),
                },
                {
                  href: '/calculator',
                  label: t('nav.resources.calculator'),
                },
                {
                  href: '/strobi',
                  label: 'Strobi Mii World',
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Services */}
          <nav aria-label={t('footer.sections.services')}>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              {t('footer.sections.services')}
            </h3>
            <ul className="space-y-3.5">
              {[
                {
                  href: '/services/web-development',
                  label: t('nav.services.web_development.label'),
                },
                {
                  href: '/services/design/ui-ux',
                  label: t('nav.services.ui_ux.label'),
                },
                {
                  href: '/services/seo',
                  label: t('nav.services.seo.label'),
                },
                {
                  href: '/services/ecommerce-development',
                  label: t('nav.services.ecommerce.label'),
                },
                {
                  href: '/services/development/api-integration',
                  label: t('nav.services.api.label'),
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Branchen */}
          <nav aria-label={t('nav.industries.label')}>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              {t('nav.industries.label')}
            </h3>
            <ul className="space-y-3.5">
              {[
                {
                  href: '/branchen/aerzte-gesundheit',
                  label: t('nav.industries.healthcare.title'),
                },
                {
                  href: '/branchen/anwaelte-kanzleien',
                  label: t('nav.industries.other.lawyers'),
                },
                {
                  href: '/branchen/handwerk-bau',
                  label: t('nav.industries.crafts.title'),
                },
                {
                  href: '/branchen/automobil',
                  label: t('nav.industries.automotive.title'),
                },
                {
                  href: '/branchen/gastronomie',
                  label: t('nav.industries.other.gastronomy'),
                },
                {
                  href: '/branchen',
                  label: t('nav.industries.other.overview'),
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 5: Contact */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800"></span>
              {t('footer.sections.contact')}
            </h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>
                <a
                  href="mailto:kontakt@codayweb.de"
                  className="hover:text-primary-700 transition-colors duration-200 flex items-center gap-3 group font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                    <OptimizedIcon
                      icon={EnvelopeSimple}
                      className="w-4 h-4 text-slate-600 group-hover:text-primary-700 transition-colors"
                    />
                  </div>
                  kontakt@codayweb.de
                </a>
              </li>
              <li>
                <a
                  href="tel:+4917641195301"
                  className="hover:text-primary-700 transition-colors duration-200 flex items-center gap-3 group font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                    <OptimizedIcon
                      icon={Phone}
                      className="w-4 h-4 text-slate-600 group-hover:text-primary-700 transition-colors"
                    />
                  </div>
                  +49 176 41195301
                </a>
              </li>
              <li className="pt-3 text-slate-700 text-xs leading-relaxed border-t border-slate-200 mt-4">
                Umutcan Emre Tezgel (Coday)
                <br />
                Lessingstraße 4<br />
                35578 Wetzlar
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges - elegant & minimal */}
        <div className="flex justify-center mb-12 opacity-90 hover:opacity-100 transition-all duration-300">
          <TrustBadges align="center" />
        </div>

        {/* Bottom Bar: Legal & Social */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {[
              {
                icon: FacebookLogo,
                href: 'https://www.facebook.com/profile.php?id=61588758264018',
                label: 'Facebook',
                hoverClass: 'hover:text-blue-600 hover:border-blue-300',
              },
              {
                icon: InstagramLogo,
                href: 'https://www.instagram.com/codayweb/',
                label: 'Instagram',
                hoverClass: 'hover:text-pink-600 hover:border-pink-300',
              },
              {
                icon: TwitterLogo,
                href: 'https://twitter.com/codayweb',
                label: 'Twitter',
                hoverClass: 'hover:text-sky-600 hover:border-sky-300',
              },
              {
                icon: LinkedinLogo,
                href: 'https://www.linkedin.com/in/umutcan-tezgel',
                label: 'LinkedIn',
                hoverClass: 'hover:text-blue-700 hover:border-blue-300',
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`group relative flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 ${social.hoverClass}`}
              >
                <OptimizedIcon
                  icon={social.icon}
                  className="text-slate-700 group-hover:text-current transition-colors w-5 h-5"
                />
              </a>
            ))}
          </div>

          <nav
            aria-label={t('footer.legalInfo')}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-700"
          >
            {[
              { href: '/uebersicht', label: 'Sitemap' },
              { href: '/garantie', label: t('nav.main.garantie') },
              { href: '/presse', label: t('nav.main.presse') },
              { href: '/legal/agb', label: t('nav.legal.agb') },
              { href: '/legal/datenschutz', label: t('nav.legal.privacy') },
              { href: '/legal/impressum', label: t('nav.legal.imprint') },
            ].map((link, idx) => (
              <Link
                key={idx}
                prefetch={false}
                href={link.href}
                className="hover:text-slate-900 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
            <button
              type="button"
              onClick={openSettings}
              className="hover:text-slate-900 transition-colors duration-200 relative group cursor-pointer text-xs font-medium text-slate-700 bg-transparent border-none p-0"
              aria-label={
                isEn
                  ? 'Open Privacy & Cookie Settings'
                  : 'Privatsphäre- & Cookie-Einstellungen öffnen'
              }
            >
              <span>{isEn ? 'Privacy Settings' : 'Cookie-Einstellungen'}</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 transition-all duration-200 group-hover:w-full"></span>
            </button>
            <span className="text-slate-700 font-medium ml-2">
              © {new Date().getFullYear()} {t('footer.rights')}
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
