'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { industriesData } from '@/shared/data/industries';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import {
  industryHeroImages,
  industryFallbackImage,
  industryGalleryImages,
} from '@/shared/data/industryImages';
import {
  XCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Hammer,
  Buildings,
  FirstAid,
  Gavel,
  ForkKnife,
  ShoppingCart,
  Briefcase,
  RocketLaunch,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { SeoHead } from '@/shared/ui/SeoHead';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

const iconMap: Record<string, React.ElementType> = {
  hammer: Hammer,
  apartment: Buildings,
  local_hospital: FirstAid,
  gavel: Gavel,
  restaurant: ForkKnife,
  shopping_cart: ShoppingCart,
  business_center: Briefcase,
  rocket_launch: RocketLaunch,
};

export function IndustryDetailClient({ industrySlug }: { industrySlug?: string }) {
  const params = useParams();
  const slug = industrySlug || (params?.industry as string);
  const t = useTranslations('industries');
  const industry = slug ? industriesData[slug] : undefined;
  const heroImage =
    slug && industryHeroImages[slug] ? industryHeroImages[slug] : industryFallbackImage;

  if (!industry) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center pt-20">
        <h1 className="text-3xl font-bold text-secondary mb-4">{t('detail.not_found.title')}</h1>
        <Link href="/branchen" className="text-primary hover:underline">
          {t('detail.not_found.link')}
        </Link>
      </div>
    );
  }

  const schemaData = {
    service: {
      name: t(industry.title),
      description: t(industry.hero.subheadline),
      serviceType: 'Industry Solution',
    },
  };

  return (
    <main className="bg-background-light min-h-dvh pt-24">
      <SeoHead schemaData={schemaData} pageType="service" />
      {/* Navigation */}
      <nav aria-label={t('detail.nav.back')} className="container mx-auto px-4 mb-8">
        <Link
          href="/branchen"
          className="inline-flex items-center text-text-slate hover:text-primary transition-colors motion-reduce:duration-[0.01ms]"
        >
          <ArrowLeft size={16} className="mr-2" aria-hidden="true" />
          {t('detail.nav.back')}
        </Link>
      </nav>

      {/* Hero Section - Now with Image */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              <OptimizedIcon icon={iconMap[industry.icon] || Buildings} className="w-4 h-4" />
              <span>{t(industry.title)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
              {t(industry.hero.headline)}
            </h1>
            <p className="text-xl text-text-light max-w-2xl leading-relaxed mb-8">
              {t(industry.hero.subheadline)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition motion-reduce:duration-[0.01ms] shadow-flat hover:translate-y-[-2px]"
              >
                {t('detail.hero.cta_primary')}
              </Link>
              <Link
                href="/calculator"
                className="px-8 py-3 bg-white text-secondary border border-gray-200 font-bold rounded-lg hover:border-primary hover:text-primary transition motion-reduce:duration-[0.01ms] shadow-sm"
              >
                {t('detail.hero.cta_secondary')}
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-2"></div>
            <OptimizedImage
              src={heroImage.src}
              alt={heroImage.alt}
              width={800}
              height={600}
              className="relative rounded-3xl shadow-2xl w-full transform -rotate-1 hover:rotate-0 transition motion-reduce:duration-[0.01ms] duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary mb-12 text-center">
            {t('detail.challenges.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {industry.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="p-8 bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-md transition motion-reduce:duration-[0.01ms]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity motion-reduce:duration-[0.01ms]">
                  <XCircle size={64} className="text-red-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3 relative z-10">
                  {t(challenge.title)}
                </h3>
                <p className="text-text-light relative z-10">{t(challenge.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              {t('detail.solutions.title', { industry: t(industry.title) })}
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">{t('detail.solutions.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {industry.solutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-flat hover:border-primary/50 transition motion-reduce:duration-[0.01ms]"
              >
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <CheckCircle size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{t(sol.title)}</h3>
                <p className="text-text-light">{t(sol.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {slug && industryGalleryImages[slug] && industryGalleryImages[slug].length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">
                {t('detail.gallery.title')}
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                {t('detail.gallery.description', { industry: t(industry.title) })}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {industryGalleryImages[slug].map((img, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition motion-reduce:duration-[0.01ms] duration-500 aspect-square"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-300 z-10"></div>
                  <OptimizedImage
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms] duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform motion-reduce:duration-[0.01ms] duration-300 z-20">
                    <p className="text-sm font-medium line-clamp-2">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Features */}
      <section className="bg-secondary text-white py-20 rounded-3xl mx-4 my-10">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('detail.features.title')}</h2>
              <p className="text-gray-400">
                {t('detail.features.subtitle', { industry: t(industry.title) })}
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary hover:text-white transition-colors motion-reduce:duration-[0.01ms]"
            >
              {t('detail.features.cta')} <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.customFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors motion-reduce:duration-[0.01ms]"
              >
                <h3 className="font-bold text-lg mb-2 text-primary">{t(feat.title)}</h3>
                <p className="text-gray-300 text-sm">{t(feat.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Pollination / Related Industries */}
      <section className="py-20 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-8">{t('detail.related.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(industriesData)
              .filter((ind) => ind.slug !== slug) // Exclude current
              .slice(0, 3) // Take first 3 for consistent layout
              .map((relIndustry) => {
                const relImage = industryHeroImages[relIndustry.slug] || industryFallbackImage;
                return (
                  <Link
                    href={`/branchen/${relIndustry.slug}`}
                    key={relIndustry.slug}
                    className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition motion-reduce:duration-[0.01ms] h-64"
                  >
                    <OptimizedImage
                      src={relImage.src}
                      alt={relImage.alt}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform motion-reduce:duration-[0.01ms] duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                        {t(relIndustry.title)}
                      </h3>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-2">
                        {t('detail.related.link')} <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* SEO Injection Block for Word Count and Keywords */}
      <SeoContentBlock title={`${t(industry.title)} Webdesign`} h1={t(industry.hero.headline)} />
    </main>
  );
}
