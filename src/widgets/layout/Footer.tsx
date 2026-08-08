'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import NextLink from 'next/link';
import { m } from 'motion/react';
import { useTranslations } from 'next-intl';

import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import GradientText from '@/shared/ui/GradientText';
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  LinkedinLogo,
  ArrowRight,
  RocketLaunch,
} from '@phosphor-icons/react';

import LogoLoop from '@/shared/ui/LogoLoop';
import { TrustBadges } from '@/shared/ui/TrustBadges';
import { clientLogos } from '@/shared/data/clientLogos';

export const Footer: React.FC = () => {
  const t = useTranslations('common');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    const footerElement = footerRef.current;
    if (footerElement) {
      footerElement.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (footerElement) {
        footerElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#050505] text-white overflow-hidden pb-24 lg:pb-0 font-sans border-t border-white/[0.03]"
      role="contentinfo"
    >
      {/* Background Spotlight / Glow effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.05), transparent 40%)`,
        }}
      />

      {/* Static Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[150px] mix-blend-screen" />
        <div className="absolute -bottom-[50%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[150px] mix-blend-screen" />
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{ backgroundImage: 'url(/noise.svg)' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 lg:pt-32 pb-8">
        {/* Massive Typography CTA Section */}
        <div className="flex flex-col items-center justify-center text-center mb-32 relative">
          {/* Subtle connecting line to top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-px h-24 bg-gradient-to-b from-transparent to-primary/30" />

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-8 shadow-[0_0_40px_rgba(37,99,235,0.15)] group hover:scale-105 transition-transform duration-500 cursor-default">
              <OptimizedIcon
                icon={RocketLaunch}
                className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors duration-500"
                weight="duotone"
              />
            </div>

            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[5.5rem] leading-[1.1] mb-8 tracking-tight break-words hyphens-auto">
              {t('global_cta.title_prefix')} <br className="hidden sm:block" />
              <GradientText colors={['#60A5FA', '#3B82F6', '#2563EB']} className="pb-2">
                {t('global_cta.title_highlight')}
              </GradientText>
            </h2>

            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              {t('global_cta.subtitle')}
            </p>

            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition motion-reduce:duration-[0.01ms] duration-300 bg-primary border border-transparent rounded-full hover:bg-blue-600 hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-[#050505] overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer motion-reduce:animate-none" />
              </div>

              <span className="relative flex items-center gap-3 text-lg">
                {t('global_cta.button')}
                <OptimizedIcon
                  icon={ArrowRight}
                  weight="bold"
                  className="transition-transform motion-reduce:duration-[0.01ms] duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          </m.div>
        </div>

        {/* Client Logos / Trust */}
        <div className="mb-32 opacity-60 hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-700 grayscale hover:grayscale-0 relative">
          <div className="absolute top-1/2 left-0 w-1/4 h-px bg-gradient-to-r from-transparent to-white/10" />
          <div className="absolute top-1/2 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-white/10" />
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-10 bg-[#050505] inline-block px-4 relative z-10 left-1/2 -translate-x-1/2">
            {t('logobar.title', { defaultValue: 'Vertrauen schenken uns' })}
          </p>
          <LogoLoop logos={clientLogos} speed={30} logoHeight={24} gap={64} />
        </div>

        {/* Minimalist Structured Grid (5 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20 w-full border-t border-white/10 pt-16">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col items-start lg:col-span-1">
            <img
              src="/images/brand/webdesign-wetzlar-coday-logo-footer.webp"
              alt="Coday Webdesign Wetzlar"
              className="w-48 sm:w-60 h-auto mb-8 opacity-90 object-contain hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <p className="text-sm text-gray-400 max-w-xs mb-8 leading-relaxed font-light">
              {t('footer.slogan')}
            </p>

            <div className="mt-auto flex items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-sm transition-all hover:bg-white/[0.04] hover:border-white/10 cursor-default group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300">
                <OptimizedImage
                  src="/images/hero/webdesign-wetzlar-business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen-small.webp"
                  alt="Partnerschaft"
                  className="w-full h-full object-cover rounded-[10px]"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5 group-hover:text-blue-100 transition-colors">
                  {t('footer.trust.title', { defaultValue: 'Coday Web' })}
                </div>
                <div className="text-[10px] text-primary font-medium tracking-wide">
                  {t('footer.trust.desc', { defaultValue: 'Premium Agency' })}
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <nav aria-label={t('footer.sections.navigation', { defaultValue: 'Navigation' })}>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              {t('footer.sections.navigation', { defaultValue: 'Navigation' })}
            </h3>
            <ul className="space-y-4">
              {[
                { href: '/', label: t('nav.main.home', { defaultValue: 'Startseite' }) },
                { href: '/work', label: t('nav.main.work', { defaultValue: 'Portfolio' }) },
                { href: '/about', label: t('nav.company.about', { defaultValue: 'Über uns' }) },
                { href: '/process', label: t('nav.main.process', { defaultValue: 'Prozess' }) },
                { href: '/pricing', label: t('nav.main.pricing', { defaultValue: 'Preise' }) },
                {
                  href: '/calculator',
                  label: t('nav.resources.calculator', { defaultValue: 'Preis-Rechner' }),
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="group inline-flex items-center text-sm font-light text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Services */}
          <nav aria-label={t('footer.sections.services', { defaultValue: 'Services' })}>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              {t('footer.sections.services', { defaultValue: 'Services' })}
            </h3>
            <ul className="space-y-4">
              {[
                {
                  href: '/services/web-development',
                  label: t('nav.services.web_development.label', {
                    defaultValue: 'Webentwicklung',
                  }),
                },
                {
                  href: '/services/design/ui-ux',
                  label: t('nav.services.ui_ux.label', { defaultValue: 'UI/UX Design' }),
                },
                {
                  href: '/services/seo',
                  label: t('nav.services.seo.label', { defaultValue: 'SEO Optimierung' }),
                },
                {
                  href: '/services/ecommerce-development',
                  label: t('nav.services.ecommerce.label', { defaultValue: 'E-Commerce' }),
                },
                {
                  href: '/services/development/api-integration',
                  label: t('nav.services.api.label', { defaultValue: 'API-Integrationen' }),
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="group inline-flex items-center text-sm font-light text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Branchen (New for SEO) */}
          <nav aria-label={t('nav.industries.label', { defaultValue: 'Branchen' })}>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              {t('nav.industries.label', { defaultValue: 'Branchen' })}
            </h3>
            <ul className="space-y-4">
              {[
                {
                  href: '/branchen/gesundheitswesen',
                  label: t('nav.industries.healthcare.title', { defaultValue: 'Gesundheitswesen' }),
                },
                {
                  href: '/branchen/anwaelte-kanzleien',
                  label: t('nav.industries.other.lawyers', { defaultValue: 'Kanzleien & Anwälte' }),
                },
                {
                  href: '/branchen/handwerker',
                  label: t('nav.industries.crafts.title', { defaultValue: 'Handwerk & Bau' }),
                },
                {
                  href: '/branchen/automobil',
                  label: t('nav.industries.automotive.title', { defaultValue: 'Automobil & KFZ' }),
                },
                {
                  href: '/branchen/gastronomie',
                  label: t('nav.industries.other.gastronomy', { defaultValue: 'Gastronomie' }),
                },
                {
                  href: '/branchen',
                  label: t('nav.industries.other.overview', {
                    defaultValue: 'Alle Branchen ansehen',
                  }),
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="group inline-flex items-center text-sm font-light text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 5: Contact */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              {t('footer.sections.contact', { defaultValue: 'Kontakt' })}
            </h3>
            <ul className="space-y-5 text-sm text-gray-400 font-light">
              <li>
                <a
                  href="mailto:kontakt@codayweb.de"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-400/20 group-hover:text-purple-300 transition-colors">
                    <span className="text-xs">@</span>
                  </div>
                  kontakt@codayweb.de
                </a>
              </li>
              <li>
                <a
                  href="tel:+4917641195301"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-400/20 group-hover:text-purple-300 transition-colors">
                    <span className="text-xs">✆</span>
                  </div>
                  +49 176 41195301
                </a>
              </li>
              <li className="pt-4 text-gray-500 text-xs leading-relaxed border-t border-white/5 mt-6">
                Umutcan Emre Tezgel (Coday)
                <br />
                Lessingstraße 4<br />
                35578 Wetzlar
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges - elegant & minimal */}
        <div className="flex justify-center mb-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <TrustBadges align="center" />
        </div>

        {/* Bottom Bar: Legal & Social */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {[
              {
                icon: FacebookLogo,
                href: 'https://www.facebook.com/profile.php?id=61588758264018',
                label: 'Facebook',
                hoverClass: 'group-hover:text-blue-500 group-hover:border-blue-500',
              },
              {
                icon: InstagramLogo,
                href: 'https://www.instagram.com/codayweb/',
                label: 'Instagram',
                hoverClass: 'group-hover:text-pink-500 group-hover:border-pink-500',
              },
              {
                icon: TwitterLogo,
                href: 'https://twitter.com/codayweb',
                label: 'Twitter',
                hoverClass: 'group-hover:text-sky-500 group-hover:border-sky-500',
              },
              {
                icon: LinkedinLogo,
                href: 'https://www.linkedin.com/in/umutcan-tezgel',
                label: 'LinkedIn',
                hoverClass: 'group-hover:text-blue-400 group-hover:border-blue-400',
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 ${social.hoverClass}`}
              >
                <OptimizedIcon
                  icon={social.icon}
                  className="text-gray-400 group-hover:text-current transition-colors"
                />
              </a>
            ))}
          </div>

          <nav
            aria-label={t('footer.legalInfo', { defaultValue: 'Rechtliche Informationen' })}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-light text-gray-500"
          >
            {[
              { href: '/uebersicht', label: 'Sitemap' },
              { href: '/garantie', label: t('nav.main.garantie', { defaultValue: 'Garantie' }) },
              { href: '/presse', label: t('nav.main.presse', { defaultValue: 'Presse' }) },
              { href: '/legal/agb', label: t('nav.legal.agb') },
              { href: '/legal/datenschutz', label: t('nav.legal.privacy') },
              { href: '/legal/impressum', label: t('nav.legal.imprint') },
            ].map((link, idx) => (
              <Link
                key={idx}
                prefetch={false}
                href={link.href}
                className="hover:text-gray-300 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <span className="opacity-60 ml-2">
              {t('footer.rights', { year: new Date().getFullYear() })}
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
