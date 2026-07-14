'use client';

import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import {
  ShieldCheck,
  Files,
  Gavel,
  UsersThree,
  CheckCircle,
  Bank,
  LockKey,
} from '@phosphor-icons/react';
import { cn } from '@/shared/lib/utils';
import GradientText from '@/shared/ui/GradientText';
import { baseButtonStyles, buttonVariants, buttonSizes } from '@/shared/ui/ButtonStyles';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { TechSovereigntySection } from '@/features/gov/TechSovereigntySection';
import { OzgRoadmap } from '@/features/gov/OzgRoadmap';
import { PricingReality } from '@/features/gov/PricingReality';
import { TenderWizard } from '@/features/gov/TenderWizard';
import { DownloadArea } from '@/features/gov/DownloadArea';
import { GovContactForm } from '@/features/gov/GovContactForm';
import { Suspense } from 'react';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

const PublicSectorPage: React.FC = () => {
  const t = useTranslations('public-sector');

  return (
    <div className="bg-background-light min-h-dvh font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Gov Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in-up motion-reduce:animate-none">
            <OptimizedIcon icon={Bank} className="w-4 h-4" />
            {t('hero.badge')}
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-slate-900 mb-6 tracking-tight max-w-4xl mx-auto">
            {t('hero.headline')} <br />
            <GradientText
              colors={['#1e3a8a', '#3b82f6', '#1e3a8a']}
              animationSpeed={6}
              className="inline-block mt-2"
            >
              {t('hero.subline')}
            </GradientText>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('meta.description')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up delay-100 motion-reduce:animate-none">
            <NavLink
              href="/contact"
              className={cn(
                baseButtonStyles,
                buttonVariants.primary,
                buttonSizes.lg,
                'bg-blue-900 hover:bg-blue-800 shadow-xl'
              )}
            >
              {t('hero.cta')}
            </NavLink>
            <NavLink
              href="/services"
              className={cn(baseButtonStyles, buttonVariants.outline, buttonSizes.lg)}
            >
              Unsere Lösungen
            </NavLink>
          </div>
        </div>
      </section>

      {/* --- TRUST & COMPLIANCE --- */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: ShieldCheck, label: t('trust.bitv'), desc: 'Barrierefrei' },
              { icon: LockKey, label: t('trust.dsgvo'), desc: 'Serverstandort DE' },
              { icon: CheckCircle, label: t('trust.iso'), desc: 'Sicherheitsstandards' },
              { icon: Files, label: t('trust.opensource'), desc: 'Open Source' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-default">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors motion-reduce:duration-[0.01ms]">
                  <OptimizedIcon
                    icon={item.icon}
                    className="w-8 h-8 text-slate-600 group-hover:text-blue-700 transition-colors motion-reduce:duration-[0.01ms]"
                  />
                </div>
                <h3 className="font-bold text-slate-800">{item.label}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICE SPECTRUM --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
              {t('services.title')}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-2 mb-4">
              {t('services.headline')}
            </h2>
            <p className="text-slate-600">{t('services.subline')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: UsersThree,
                title: t('services.items.portals.title'),
                desc: t('services.items.portals.desc'),
              },
              {
                icon: Files,
                title: t('services.items.internal.title'),
                desc: t('services.items.internal.desc'),
              },
              {
                icon: Bank,
                title: t('services.items.smartcity.title'),
                desc: t('services.items.smartcity.desc'),
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow motion-reduce:duration-[0.01ms]"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-700">
                  <OptimizedIcon icon={service.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechSovereigntySection />
      <OzgRoadmap />
      <PricingReality />
      <TenderWizard />
      <DownloadArea />

      {/* --- PRICING & PROCUREMENT (CRITICAL) --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <OptimizedIcon icon={Gavel} className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">{t('pricing.title')}</h2>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 mb-10">
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              "{t('pricing.disclaimer')}"
            </p>
          </div>

          {/* Process Visualization */}
          <div className="grid md:grid-cols-4 gap-4 text-sm font-mono text-blue-200">
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                1
              </span>
              {t('pricing.process.analysis')}
            </div>
            <div className="hidden md:block w-full h-px bg-blue-500/30"></div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                2
              </span>
              {t('pricing.process.spec')}
            </div>
            <div className="hidden md:block w-full h-px bg-blue-500/30"></div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                3
              </span>
              {t('pricing.process.calc')}
            </div>
            <div className="hidden md:block w-full h-px bg-blue-500/30"></div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                4
              </span>
              {t('pricing.process.offer')}
            </div>
          </div>
        </div>
      </section>

      {/* --- REQUEST QUOTE & CONTACT --- */}
      <section id="contact" className="py-24 bg-background border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* LEFT: Request Form */}
            <div>
              <Suspense fallback={null}>
                <GovContactForm />
              </Suspense>
            </div>

            {/* RIGHT: Upload & Direct Contact */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('contact.title')}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Sie haben bereits fertige Vergabeunterlagen oder ein Lastenheft? Laden Sie es
                  direkt hoch oder senden Sie es uns verschlüsselt zu.
                </p>

                <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-white hover:border-blue-400 transition-colors motion-reduce:duration-[0.01ms] cursor-pointer group">
                  <OptimizedIcon
                    icon={Files}
                    className="w-12 h-12 text-slate-400 mx-auto mb-4 group-hover:text-blue-500 transition-colors motion-reduce:duration-[0.01ms]"
                  />
                  <p className="text-lg font-medium text-slate-700">{t('contact.upload_label')}</p>
                  <p className="text-sm text-slate-500 mt-2">
                    oder via E-Mail an{' '}
                    <span className="text-blue-600 font-mono">umut@codayweb.de</span>
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <OptimizedIcon icon={ShieldCheck} className="text-blue-600" />
                  Sicherer Datenaustausch
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Wir unterstützen S/MIME Verschlüsselung und gängige Behörden-Transfer-Tools
                  (Cryptshare, FTAPI).
                </p>
                <a
                  href="mailto:umut@codayweb.de"
                  className="text-blue-700 font-bold text-sm hover:underline"
                >
                  PGP-Key anfordern &rarr;
                </a>
              </div>

              <p className="text-xs text-slate-400">
                Wir behandeln Ihre Daten vertraulich gemäß DSGVO.{' '}
                <NavLink href="/legal/datenschutz" className="underline">
                  Datenschutzerklärung
                </NavLink>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <SeoContentBlock title={t('seoText.title')} text={t('seoText.content')} />
      <RelevantFAQs
        serviceId={['web-development', 'seo']}
        className="bg-gray-50 border-t border-gray-100"
      />
    </div>
  );
};
export default PublicSectorPage;
