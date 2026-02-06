import React, { useState, Suspense, lazy } from 'react';
import BlurText from '../shared/ui/BlurText';
import GradientText from '../shared/ui/GradientText';
// import ApplicationWizard from '../features/contact/ApplicationWizard'; // Loaded lazily
import AvailabilityGrid from '../features/contact/AvailabilityGrid';
import InteractiveMap from '../shared/ui/InteractiveMap';

const ApplicationWizard = lazy(() => import('../features/contact/ApplicationWizard'));

import { useTranslation } from 'react-i18next';
import { Icon } from '../shared/ui/Icon';
import { SeoHead } from '@/shared/ui/SeoHead';

const Contact: React.FC = () => {
  const { t } = useTranslation('contact');
  return (
    <div className="bg-background-light min-h-screen">
      <SeoHead
        title={`${t('hero.title_start')} ${t('hero.title_gradient')} | Coday`}
        description={t('hero.desc')}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text Side */}
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('hero.badge')}
              </span>
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('hero.title_start')}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="inline-block"
                />
                <br />
                <GradientText
                  colors={['#3B82F6', '#2563EB', '#1D4ED8']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('hero.title_gradient')}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">{t('hero.desc')}</p>

              <div className="mb-12">
                <AvailabilityGrid />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-primary">
                    <Icon name="verified" />
                  </div>
                  <div>
                    <strong className="block text-secondary">{t('features.consult.title')}</strong>
                    <span className="text-sm">{t('features.consult.desc')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-primary">
                    <Icon name="rocket_launch" />
                  </div>
                  <div>
                    <strong className="block text-secondary">{t('features.strategy.title')}</strong>
                    <span className="text-sm">{t('features.strategy.desc')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wizard Application Form */}
            <div className="relative">
              <Suspense
                fallback={<div className="h-[600px] w-full bg-gray-50 rounded-3xl animate-pulse" />}
              >
                <ApplicationWizard />
              </Suspense>

              {/* Trust Indicators */}
              {/* Trust Indicators */}
              <div className="mt-8 flex justify-center gap-8 grayscale opacity-50">
                {/* Mock Logos */}
                <span className="font-bold text-slate-400">{t('trust.google')}</span>
                <span className="font-bold text-slate-400">{t('trust.shopify')}</span>
                <span className="font-bold text-slate-400">{t('trust.facebook')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-display font-bold text-3xl text-secondary mb-12">{t('faq.title')}</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-start">
            {(t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>).map(
              (faq, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <h4 className="font-bold text-secondary mb-2 text-lg">{faq.q}</h4>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact Info & Map Section */}
      <section className="py-12 md:py-24 bg-aurora-snow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
              {t('location.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('location.desc')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/4917641195301?text=${t('location.whatsapp.message')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-aurora-mist hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex-1 text-start">
                  <strong className="block text-gray-900 group-hover:text-[#25D366] transition-colors">
                    {t('location.whatsapp.label')}
                  </strong>
                  <span className="text-sm text-gray-500">+49 176 41195301</span>
                </div>
                <Icon
                  name="arrow_forward"
                  className="text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                />
              </a>

              {/* Phone */}
              <a
                href="tel:+4917641195301"
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-aurora-mist hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="phone" className="text-primary" />
                </div>
                <div className="flex-1 text-start">
                  <strong className="block text-gray-900 group-hover:text-primary transition-colors">
                    {t('location.phone.label')}
                  </strong>
                  <span className="text-sm text-gray-500">+49 176 41195301</span>
                </div>
                <Icon
                  name="arrow_forward"
                  className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                />
              </a>

              {/* Email */}
              <a
                href="mailto:umut@codayweb.de"
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-aurora-mist hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="mail" className="text-purple-600" />
                </div>
                <div className="flex-1 text-start">
                  <strong className="block text-gray-900 group-hover:text-purple-600 transition-colors">
                    {t('location.email.label')}
                  </strong>
                  <span className="text-sm text-gray-500">umut@codayweb.de</span>
                </div>
                <Icon
                  name="arrow_forward"
                  className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                />
              </a>

              {/* Address */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-aurora-mist">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="location_on" className="text-orange-600" />
                </div>
                <div className="flex-1 text-start">
                  <strong className="block text-gray-900">{t('location.address.label')}</strong>
                  <span className="text-sm text-gray-500">{t('location.address.value')}</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <InteractiveMap height="450px" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
