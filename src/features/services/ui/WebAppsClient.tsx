'use client';
import React, { useState, useEffect, useRef } from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';

import BlurText from '@/shared/ui/BlurText';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import Image from 'next/image';
import { appDevImages } from '@/shared/data/serviceImages';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Stack,
  CreditCard,
  Robot,
  Cloud,
  HardDrives,
  Envelope,
  FileText,
  Check,
  ShieldCheck,
  Lock,
  CloudCheck,
  Headset,
  Wrench,
  DeviceMobile,
  Lightning,
  SecurityCamera,
} from '@phosphor-icons/react/dist/ssr';

const iconMap: Record<string, React.ElementType> = {
  layers: Stack,
  payments: CreditCard,
  smart_toy: Robot,
  cloud: Cloud,
  dns: HardDrives,
  mail: Envelope,
  description: FileText,
  check: Check,
  verified_user: ShieldCheck,
  lock: Lock,
  cloud_done: CloudCheck,
  support_agent: Headset,
  build: Wrench,
  phone_iphone: DeviceMobile,
  bolt: Lightning,
  security: SecurityCamera,
};

export function WebAppsClient() {
  const t = useTranslations('services');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-surface-base font-sans text-text-light">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-sapphire/10 rounded-xl text-sapphire mb-6">
                <OptimizedIcon icon={Stack} className="text-3xl text-balance" />
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight text-balance">
                <BlurText
                  text={t('web_apps_page.hero.title_prefix')}
                  delay={100}
                  animateBy="words"
                  className="inline"
                />{' '}
                <span className="text-sapphire">{t('web_apps_page.hero.title_suffix')}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-prose text-pretty mb-8 max-w-lg">
                {t('web_apps_page.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <NavLink
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition motion-reduce:duration-[0.01ms]"
                >
                  {t('web_apps_page.hero.cta')}
                </NavLink>
              </div>
            </div>
            {/* Visual Placeholder for Code/Dashboard */}
            <div className="relative hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-indigo-500/10 to-primary/10 rounded-full blur-3xl opacity-60"></div>
              <Image
                src={appDevImages.hero?.src || ''}
                alt={appDevImages.hero ? t(appDevImages.hero.alt) : ''}
                width={800}
                height={600}
                className="relative rounded-2xl shadow-xl w-full h-auto rotate-2 hover:rotate-0 transition-transform motion-reduce:duration-[0.01ms] duration-500 bg-surface-elevated p-2"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Integration Network - NEW HIGH COMPLEXITY SECTION */}
      <section ref={sectionRef} className="bg-secondary py-24 mb-24 overflow-hidden relative">
        {/* Neural Network Abstract Background */}
        <div className="absolute inset-0 bg-bg-inverse">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, #1A9A9A 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 text-white">
            <span className="text-action-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_apps_page.integration_network.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6 text-balance">
              {t('web_apps_page.integration_network.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {t('web_apps_page.integration_network.description')}
            </p>
          </div>

          <div className="relative h-[500px] flex items-center justify-center">
            {/* Central Hub */}
            <div className="w-32 h-32 bg-surface-elevated rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] z-20 relative animate-pulse motion-reduce:animate-none">
              <span className="font-bold text-content-base text-center leading-tight">
                Coday
                <br />
                Core
                <br />
                System
              </span>
            </div>

            {/* Orbiting Satellites */}
            {[
              { name: 'Stripe', icon: 'payments', angle: 0, color: 'bg-blue-500', dist: 180 },
              { name: 'OpenAI', icon: 'smart_toy', angle: 60, color: 'bg-green-500', dist: 180 },
              { name: 'Salesforce', icon: 'cloud', angle: 120, color: 'bg-blue-400', dist: 180 },
              { name: 'AWS S3', icon: 'dns', angle: 180, color: 'bg-orange-500', dist: 180 },
              { name: 'SendGrid', icon: 'mail', angle: 240, color: 'bg-blue-600', dist: 180 },
              { name: 'Datev', icon: 'description', angle: 300, color: 'bg-green-600', dist: 180 },
            ].map((sat, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center gap-2 transition motion-reduce:duration-[0.01ms] duration-[1500ms] ease-out"
                style={{
                  transform: isVisible
                    ? `rotate(${sat.angle}deg) translate(${sat.dist}px) rotate(-${sat.angle}deg)`
                    : `rotate(${sat.angle}deg) translate(0px) rotate(-${sat.angle}deg)`,
                  opacity: isVisible ? 1 : 0,
                  willChange: 'transform, opacity',
                }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${sat.color} text-white flex items-center justify-center shadow-lg border-2 border-white/20`}
                >
                  <OptimizedIcon icon={iconMap[sat.icon] || Cloud} className="text-2xl" />
                </div>
                <span className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                  {sat.name}
                </span>
              </div>
            ))}

            {/* Connecting Lines SVG Layer */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30"
            >
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="transition motion-reduce:duration-[0.01ms] duration-[1500ms] ease-out"
                  style={{
                    transform: isVisible
                      ? `rotate(${angle}deg) translateX(180px)`
                      : `rotate(${angle}deg) translateX(0px)`,
                    opacity: isVisible ? 1 : 0,
                    transformOrigin: '50% 50%',
                    willChange: 'transform, opacity',
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Security & Compliance Badges - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="bg-surface-elevated rounded-3xl border border-border-subtle shadow-xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-6 whitespace-pre-line text-balance">
                {t('web_apps_page.security.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-prose text-pretty mb-8">
                {t('web_apps_page.security.description')}
              </p>
              <ul className="space-y-4">
                {((t.raw('web_apps_page.security.items') as string[]) || []).map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 shrink-0">
                      <OptimizedIcon icon={Check} className="text-sm font-bold" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-muted rounded-2xl p-8 grid grid-cols-2 gap-4">
              {[
                { key: 'gdpr', icon: 'verified_user', color: 'text-blue-600' },
                { key: 'ssl', icon: 'lock', color: 'text-green-600' },
                { key: 'uptime', icon: 'cloud_done', color: 'text-purple-600' },
                { key: 'support', icon: 'support_agent', color: 'text-orange-600' },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="bg-surface-elevated p-6 rounded-xl shadow-sm border border-border-muted flex flex-col items-center justify-center text-center hover:scale-[0.97] ease-spring transition-transform motion-reduce:duration-[0.01ms]"
                >
                  <OptimizedIcon
                    icon={iconMap[badge.icon] || ShieldCheck}
                    className={`text-4xl mb-3 ${badge.color}`}
                  />
                  <span className="text-balance font-bold text-gray-900">
                    {t(`web_apps_page.security.badges.${badge.key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4 text-balance">
              {t('web_apps_page.features.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('web_apps_page.features.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                key: 'saas',
                icon: 'cloud',
              },
              {
                key: 'internal_tools',
                icon: 'build',
              },
              {
                key: 'pwa',
                icon: 'phone_iphone',
              },
              {
                key: 'realtime',
                icon: 'bolt',
              },
              {
                key: 'cloud',
                icon: 'dns',
              },
              {
                key: 'security',
                icon: 'security',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-surface-muted hover:bg-surface-elevated hover:shadow-xl transition motion-reduce:duration-[0.01ms] border border-border-muted group"
              >
                <div className="w-12 h-12 bg-surface-elevated rounded-xl shadow-sm flex items-center justify-center text-sapphire mb-6 group-hover:scale-[0.97] ease-spring transition-transform motion-reduce:duration-[0.01ms]">
                  <OptimizedIcon icon={iconMap[feature.icon] || Cloud} />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {t(`web_apps_page.features.items.${feature.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-prose text-pretty">
                  {t(`web_apps_page.features.items.${feature.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoContentBlock
        title={t('web_apps_page.seoText.title')}
        text={t('web_apps_page.seoText.content')}
      />
      <RelevantFAQs serviceId="web-apps" className="mb-24" />
    </div>
  );
}
