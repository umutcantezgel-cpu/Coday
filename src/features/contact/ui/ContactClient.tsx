"use client";

import React, { Suspense, lazy, useEffect } from 'react';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import BookingCalendar from '@/features/booking/ui/BookingCalendar';
const InteractiveMap = lazy(() => import('@/shared/ui/InteractiveMap'));
const ApplicationWizard = lazy(() => import('@/features/contact/ApplicationWizard'));
import { TestimonialCard } from '@/shared/ui/TestimonialCard';
import LogoLoop from '@/shared/ui/LogoLoop';
import { clientLogos } from '@/shared/data/clientLogos';

import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  ArrowRight,
  Phone,
  Envelope,
  MapPin,
  Clock,
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
} from '@phosphor-icons/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { useCalculatorStore } from '@/features/calculator/model/store';
import StepIndicator from '@/shared/ui/StepIndicator';
import { Skeleton } from '@/shared/ui/Skeleton';
import { MobileContactLayout } from '@/features/contact/ui/MobileContactLayout';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

export const ContactClient: React.FC = () => {
  const t = useTranslations('contact');
  const selectedPackageId = useCalculatorStore((state) => state.selectedPackageId);
  const setStep = useCalculatorStore((state) => state.setStep);
  const hasPackage = !!selectedPackageId;

  // Set step when arriving from flow
  useEffect(() => {
    if (hasPackage) {
      setStep('contact');
    }
  }, [hasPackage, setStep]);

  return (
    <div className="bg-background-light min-h-dvh">
      {/* Step Indicator - only shown when coming from package flow */}
      {hasPackage && (
        <div className="pt-20 md:pt-24 pb-4">
          <StepIndicator currentStep="contact" className="mb-0" />
        </div>
      )}

      {/* Mobile Layout (Tabbed) */}
      <div className="lg:hidden mt-20">
        <MobileContactLayout />
      </div>

      {/* Desktop Layout (Original Split) */}
      <div className="hidden lg:block">
        <section
          className={`relative ${hasPackage ? 'pt-6 md:pt-12' : 'pt-24 md:pt-32'} pb-32 md:pb-24 px-4 overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Text Side */}
              <div>
                <div className="mb-4">
                  <Breadcrumbs />
                </div>
                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                  {t('hero.badge')}
                </span>
                <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary mb-6 tracking-tight">
                  <BlurText
                    text={t('hero.title_start')}
                    delay={100}
                    animateBy="words"
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
                  <BookingCalendar />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                  <h3 className="font-bold text-gray-900 text-lg">Kontaktinformationen</h3>

                  <div className="grid gap-6">
                    <a
                      href="mailto:umut@codayweb.de"
                      className="flex items-start gap-4 text-slate-600 hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform flex-shrink-0">
                        <OptimizedIcon icon={Envelope} />
                      </div>
                      <div>
                        <strong className="block text-secondary text-sm mb-1">
                          {t('location.email.label', { fallback: 'E-Mail' })}
                        </strong>
                        <span className="text-sm">umut@codayweb.de</span>
                      </div>
                    </a>

                    <a
                      href="tel:+4917641195301"
                      className="flex items-start gap-4 text-slate-600 hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                        <OptimizedIcon icon={Phone} />
                      </div>
                      <div>
                        <strong className="block text-secondary text-sm mb-1">
                          {t('location.phone.label', { fallback: 'Telefon' })}
                        </strong>
                        <span className="text-sm">+49 176 41195301</span>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 text-slate-600">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                        <OptimizedIcon icon={MapPin} />
                      </div>
                      <div>
                        <strong className="block text-secondary text-sm mb-1">
                          {t('location.address.label', { fallback: 'Standort' })}
                        </strong>
                        <span className="text-sm">
                          Wetzlar, Deutschland
                          <br />
                          (Remote weltweit)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-slate-600">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                        <OptimizedIcon icon={Clock} />
                      </div>
                      <div>
                        <strong className="block text-secondary text-sm mb-1">
                          {t('location.hours.label', { fallback: 'Erreichbarkeit' })}
                        </strong>
                        <span className="text-sm">
                          Mo. - Fr.: 09:00 - 18:00 Uhr
                          <br />
                          (Termine nach Vereinbarung)
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <h4 className="text-sm font-bold text-gray-900 mb-3">
                        {t('location.socials.label', { fallback: 'Folgen Sie uns' })}
                      </h4>
                      <div className="flex gap-3">
                        <a
                          href="/contact"
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors"
                        >
                          <OptimizedIcon icon={InstagramLogo} />
                        </a>
                        <a
                          href="/contact"
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors"
                        >
                          <OptimizedIcon icon={LinkedinLogo} />
                        </a>
                        <a
                          href="/contact"
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors"
                        >
                          <OptimizedIcon icon={FacebookLogo} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wizard Application Form */}
              <div className="relative flex flex-col gap-8">
                {/* Logo Bar Above Form */}
                <div className="w-full overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                    {t('logobar.title', { fallback: 'Vertrauen schenken uns innovative Unternehmen'})}
                  </p>
                  <LogoLoop
                    logos={clientLogos}
                    speed={25}
                    logoHeight={32}
                    gap={48}
                    pauseOnHover={true}
                  />
                </div>

                <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-3xl" />}>
                  <ApplicationWizard />
                </Suspense>

                {/* Trust Indicators - Testimonial */}
                <div className="mt-8">
                  <TestimonialCard
                    quote={t('testimonial.text')}
                    authorName={t('testimonial.author')}
                    authorPosition={t('testimonial.role')}
                    rating={5}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAQs for Rich Snippets */}
      <RelevantFAQs
        serviceId={['web-development', 'web-design', 'seo']}
        className="bg-gray-50 border-t border-gray-100"
      />

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
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-success"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex-1 text-start">
                  <strong className="block text-gray-900 group-hover:text-success transition-colors">
                    {t('location.whatsapp.label')}
                  </strong>
                  <span className="text-sm text-gray-500">+49 176 41195301</span>
                </div>
                <OptimizedIcon
                  icon={ArrowRight}
                  className="text-gray-400 group-hover:text-success group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                />
              </a>

              {/* Phone */}
              <a
                href="tel:+4917641195301"
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-aurora-mist hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <OptimizedIcon icon={Phone} className="text-primary" />
                </div>
                <div className="flex-1 text-start">
                  <strong className="block text-gray-900 group-hover:text-primary transition-colors">
                    {t('location.phone.label')}
                  </strong>
                  <span className="text-sm text-gray-500">+49 176 41195301</span>
                </div>
                <OptimizedIcon
                  icon={ArrowRight}
                  className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                />
              </a>

              {/* Email */}
              <a
                href="mailto:umut@codayweb.de"
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-aurora-mist hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <OptimizedIcon icon={Envelope} className="text-purple-600" />
                </div>
                <div className="flex-1 text-start">
                  <strong className="block text-gray-900 group-hover:text-purple-600 transition-colors">
                    {t('location.email.label')}
                  </strong>
                  <span className="text-sm text-gray-500">umut@codayweb.de</span>
                </div>
                <OptimizedIcon
                  icon={ArrowRight}
                  className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                />
              </a>

              {/* Address */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-aurora-mist">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <OptimizedIcon icon={MapPin} className="text-orange-600" />
                </div>
                <div className="flex-1 text-start">
                  <strong className="block text-gray-900">{t('location.address.label')}</strong>
                  <span className="text-sm text-gray-500">{t('location.address.value')}</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <Suspense fallback={<Skeleton className="h-[450px] w-full rounded-xl" />}>
              <InteractiveMap height="450px" />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};
