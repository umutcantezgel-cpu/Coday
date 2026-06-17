'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Link as NavLink } from '@/i18n/navigation';
import { servicesData } from '@/shared/data/services';
import Image from 'next/image';
import { TestimonialCard } from '@/shared/ui/TestimonialCard';
import {
  appDevImages,
  appDevFeatureMapping,
  brandingImages,
  brandingFeatureMapping,
} from '@/shared/data/serviceImages';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useTranslations } from 'next-intl';

import { StickyCTA } from '@/shared/ui/StickyCTA';
import {
  Lightning,
  ChartBar,
  Stack,
  ShieldCheck,
  Code,
  Users,
  User,
  Sparkle,
  Target,
  Monitor,
  SquaresFour,
  FilmStrip,
  ShoppingCart,
  Cloud,
  Palette,
  RocketLaunch,
  MagnifyingGlass,
  Gauge,
  Lightbulb,
  Calendar as CalendarIcon,
  CheckCircle,
  CaretDown,
  Stack as Layers,
} from '@phosphor-icons/react';
import LogoLoop from '@/shared/ui/LogoLoop';
import { clientLogos } from '@/shared/data/clientLogos';
import { SeoHead } from '@/shared/ui/SeoHead';

const iconMap: Record<string, React.ElementType> = {
  lightning: Lightning,
  chart_bar: ChartBar,
  stack: Stack,
  shield_check: ShieldCheck,
  code: Code,
  users: Users,
  user: User,
  sparkle: Sparkle,
  target: Target,
  monitor: Monitor,
  squares_four: SquaresFour,
  film_strip: FilmStrip,
  shopping_cart: ShoppingCart,
  layers: Layers,
  cloud: Cloud,
  palette: Palette,
  widgets: SquaresFour,
  rocket: RocketLaunch,
  search: MagnifyingGlass,
  speed: Gauge,
  lightbulb: Lightbulb,
  calendar_month: CalendarIcon,
  check_circle: CheckCircle,
  rocket_launch: RocketLaunch,
  expand_more: CaretDown,
  check: CheckCircle, // Fallback for 'check'
};

const getServiceImage = (category?: string, slug?: string) => {
  if (!category || !slug) return null;

  if (category === 'web-development') {
    const key = appDevFeatureMapping[slug];
    return key ? appDevImages[key] : null;
  }
  if (category === 'web-design') {
    const key = brandingFeatureMapping[slug];
    return key ? brandingImages[key] : null;
  }
  return null;
};

export function ServiceDetailClient() {
  const params = useParams();
  const category = params?.category as string;
  const slug = params?.slug as string;

  // Find the service data based on URL params
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const serviceCategory = servicesData[category || ''];
  const service = serviceCategory ? serviceCategory[slug || ''] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-surface-base">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('generic_detail.not_found.title')}
          </h1>
          <NavLink href="/services" className="text-sapphire hover:underline">
            {t('generic_detail.not_found.link')}
          </NavLink>
        </div>
      </div>
    );
  }

  // Fetch translated arrays
  const benefits = t.raw(service.benefitsKey) as string[];
  const processSteps = service.processStepsKey
    ? (t.raw(service.processStepsKey) as {
        number: string;
        title: string;
        description: string;
      }[])
    : [];
  const advantages = service.advantagesKey
    ? (t.raw(service.advantagesKey) as {
        title: string;
        description: string;
        icon: string;
      }[])
    : [];
  const testimonials = service.testimonialsKey
    ? (t.raw(service.testimonialsKey) as {
        company: string;
        name: string;
        role: string;
        text: string;
      }[])
    : [];
  const faqs = service.faqsKey
    ? (t.raw(service.faqsKey) as { question: string; answer: string }[])
    : [];

  const schemaData = {
    service: {
      name: t(service.titleKey),
      description: t(service.descriptionKey),
      serviceType:
        category === 'web-development'
          ? 'Web Development'
          : category === 'web-design'
            ? 'Web Design'
            : 'Professional Service',
    },
    ...(faqs.length > 0 && {
      faq: {
        questions: faqs,
      },
    }),
  };

  return (
    <main className="bg-surface-base pt-24 pb-0">
      <SeoHead schemaData={schemaData} pageType="service" />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <ol className="flex items-center text-sm text-gray-500">
          <li>
            <NavLink
              href="/services"
              className="hover:text-sapphire transition-colors motion-reduce:duration-[0.01ms]"
            >
              {tCommon('nav.services.label')}
            </NavLink>
          </li>
          <li aria-hidden="true" className="mx-2">
            /
          </li>
          <li>
            <NavLink
              href={`/services/${category}`}
              className="hover:text-sapphire transition-colors motion-reduce:duration-[0.01ms] capitalize"
            >
              {service.category}
            </NavLink>
          </li>
          <li aria-hidden="true" className="mx-2">
            /
          </li>
          <li aria-current="page" className="text-sapphire font-medium">
            {t(service.titleKey)}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 lg:mb-20 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center justify-center p-3 bg-sapphire/10 rounded-xl text-sapphire mb-6">
              <OptimizedIcon
                icon={iconMap[service.icon] || Code}
                className="text-3xl text-balance"
              />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight text-balance">
              {t(service.titleKey)}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-prose text-pretty mb-8">
              {t(service.longDescriptionKey)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NavLink
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition motion-reduce:duration-[0.01ms] match-hover-translate-y-1"
              >
                {t('generic_detail.hero.consulting_btn')}
                <OptimizedIcon icon={CalendarIcon} className="ml-2" />
              </NavLink>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* Abstract Visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-60"></div>
            <div className="relative glass-card p-8 rounded-3xl border border-white/50 bg-surface-elevated/60 backdrop-blur-xl shadow-glass">
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
                {t('generic_detail.hero.benefits_title')}
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="text-sapphire mr-3 text-xl mt-0.5"
                    />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Benefits (only if Process is NOT present, otherwise Advantages section handles it) */}
      {!service.processStepsKey && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 lg:mb-24 lg:hidden">
          <div className="glass-card p-8 rounded-2xl bg-surface-elevated shadow-aurora">
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
              {t('generic_detail.hero.benefits_title')}
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <OptimizedIcon icon={CheckCircle} className="text-sapphire mr-3 text-xl mt-0.5" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Trust / Logos Section */}
      <section className="py-12 border-y border-border-muted bg-surface-elevated/50 mb-12 lg:mb-24 overflow-hidden">
        <div className="w-full text-center">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-8">
            {tCommon('generic_detail.trust.title')}
          </p>
          <LogoLoop logos={clientLogos} speed={30} logoHeight={48} gap={64} pauseOnHover={true} />
        </div>
      </section>

      {/* Process Section */}
      {service.processStepsKey && (
        <section className="bg-gray-900 text-white py-24 mb-24 overflow-hidden relative">
          {/* Dynamic Background Visual */}
          {slug && (
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
              {/* Helper to resolve image based on category/slug - Rendered conditionally */}
              {(() => {
                // Simple logic to resolve image from our mappings
                const bgImage = getServiceImage(category, slug);
                if (bgImage) {
                  return (
                    <Image
                      src={bgImage.src}
                      alt=""
                      width={400}
                      height={400}
                      className="w-full h-full object-cover mix-blend-overlay grayscale"
                    />
                  );
                }
                return null;
              })()}
            </div>
          )}

          {/* Background Blobs (preserved but pushed back) */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-gray-900/80"></div> {/* Darken overlay */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-screen animate-pulse-slow motion-reduce:animate-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-screen animate-pulse-slow delay-1000 motion-reduce:animate-none"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="text-action-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('generic_detail.process.label')}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl mb-6 text-balance">
                {t.rich('generic_detail.process.title', { br: () => <br /> })}
              </h2>
            </div>

            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2"></div>

              <ol className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8" role="list">
                {processSteps.map((step, index) => (
                  <li key={index} className="relative group">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-xl font-bold font-display mb-6 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition motion-reduce:duration-[0.01ms] duration-300 shadow-lg relative z-10"
                        aria-hidden="true"
                      >
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold mb-4 h-14 flex items-center justify-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed max-w-prose text-pretty">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Advantages Section */}
      {service.advantagesKey && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('generic_detail.advantages.label')}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-6 text-balance">
                {t.rich('generic_detail.advantages.title', { br: () => <br /> })}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-prose text-pretty">
                {t('generic_detail.advantages.desc')}
              </p>
              <NavLink
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition motion-reduce:duration-[0.01ms]"
              >
                {t('generic_detail.advantages.contact_btn')}
              </NavLink>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {advantages.map((adv, index) => (
                <div
                  key={index}
                  className="bg-surface-elevated p-6 rounded-2xl shadow-sm border border-border-muted hover:shadow-md transition-shadow motion-reduce:duration-[0.01ms]"
                >
                  <OptimizedIcon
                    icon={iconMap[adv.icon] || Code}
                    className="text-sapphire text-3xl mb-4 text-balance"
                  />
                  <h3 className="font-bold text-gray-900 mb-2">{adv.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-prose text-pretty">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {service.testimonialsKey && testimonials && testimonials.length > 0 && (
        <section className="bg-surface-light py-24 mb-24 border-y border-border-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('generic_detail.testimonials.label')}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-6 text-balance">
                {t('generic_detail.testimonials.title')}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="h-full">
                  <TestimonialCard
                    quote={t.text}
                    authorName={t.name}
                    authorPosition={t.role}
                    authorCompany={t.company}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqsKey && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4 text-balance">
              {t('generic_detail.faq.title')}
            </h2>
            <p className="text-gray-600">{t('generic_detail.faq.desc')}</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 text-center pb-20">
        <div className="glass-card p-12 rounded-3xl bg-secondary border border-gray-800 relative overflow-hidden group hover:border-gray-700 transition-colors motion-reduce:duration-[0.01ms]">
          <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors motion-reduce:duration-[0.01ms] duration-500"></div>

          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl text-white mb-6 text-balance">
              {t('generic_detail.final_cta.title')}
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('generic_detail.final_cta.desc')}
            </p>
            <NavLink
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 rounded-xl bg-surface-elevated hover:bg-gray-100 shadow-lg hover:shadow-xl transition motion-reduce:duration-[0.01ms] transform hover:scale-[0.97] ease-spring"
            >
              {t('generic_detail.final_cta.button')}
              <OptimizedIcon icon={RocketLaunch} className="ml-2" />
            </NavLink>
          </div>
        </div>
      </section>
      <StickyCTA />
    </main>
  );
}

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = React.useId();
  const panelId = `faq-panel-${id}`;

  return (
    <div className="border border-border-subtle rounded-xl bg-surface-elevated overflow-hidden transition motion-reduce:duration-[0.01ms] duration-300 hover:shadow-sm">
      <h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="active:scale-[0.97] w-full flex items-center justify-between p-6 text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-xl"
        >
          <span className="font-bold text-gray-900 text-lg">{question}</span>
          <OptimizedIcon
            icon={CaretDown}
            className={`text-gray-400 transition-transform motion-reduce:duration-[0.01ms] duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        className={`px-6 text-gray-600 leading-relaxed max-w-prose text-pretty ${isOpen ? 'block pb-6' : 'hidden'}`}
      >
        {answer}
      </div>
    </div>
  );
};
