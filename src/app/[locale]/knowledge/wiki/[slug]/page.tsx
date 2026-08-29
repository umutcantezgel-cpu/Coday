import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { wikiEntities } from '@/features/knowledge/model/entities';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import {
  ArrowLeft,
  ArrowRight,
  Sparkle,
  BookBookmark,
  CheckCircle,
  Tag,
} from '@phosphor-icons/react/dist/ssr';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const entity of wikiEntities) {
      params.push({ locale, slug: entity.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const entity = wikiEntities.find((e) => e.slug === slug);
  if (!entity) {
    return {
      title: 'Wiki Term Not Found | Coday',
      description: 'The requested wiki term could not be found.',
    };
  }

  const isEn = locale === 'en';
  const title = isEn
    ? `${entity.displayName} – Tech Wiki & Definition | Coday`
    : `${entity.displayName} – Definition & Erklärung | Coday Tech-Wiki`;
  const description = isEn
    ? `Learn what ${entity.displayName} means in modern web development, performance optimization, and SEO. Comprehensive glossary entry by Coday.`
    : `Was bedeutet ${entity.displayName}? Definition, Best Practices und technische Einordnung für modernes Webdesign & Next.js Entwicklung von Coday.`;

  return generatePageMetadata({
    title,
    description,
    keywords: [
      entity.displayName,
      ...entity.aliases,
      'Webentwicklung Glossar',
      'Tech Wiki Wetzlar',
    ],
    path: `/${locale}/knowledge/wiki/${slug}`,
    type: 'article',
  });
}

export default async function WikiTermPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';

  const entity = wikiEntities.find((e) => e.slug === slug);
  if (!entity) {
    notFound();
  }

  const relatedEntities = wikiEntities.filter((e) => entity.relatedEntities.includes(e.slug));

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${locale}` },
    { name: 'Knowledge', url: `/${locale}/knowledge/blog` },
    { name: 'WikiHub', url: `/${locale}/knowledge/wikihub` },
    { name: entity.displayName, url: `/${locale}/knowledge/wiki/${slug}` },
  ]);

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/${locale}/knowledge/wiki/${slug}#term`,
    name: entity.displayName,
    alternateName: entity.aliases,
    termCode: entity.slug,
    inDefinedTermSet: `${BASE_URL}/${locale}/knowledge/wikihub`,
    url: `${BASE_URL}/${locale}/knowledge/wiki/${slug}`,
    ...(entity.wikidataId ? { sameAs: entity.wikidataId } : {}),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(locale), breadcrumbs, definedTermSchema],
  };

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        <nav className="mb-8">
          <Link
            href="/knowledge/wikihub"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-slate-600 hover:text-primary border border-slate-200 text-sm font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{isEn ? 'Back to WikiHub' : 'Zurück zum WikiHub'}</span>
          </Link>
        </nav>

        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {entity.category}
            </span>
            <span className="text-xs font-mono text-slate-400">/{entity.slug}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 mb-6 tracking-tight">
            {entity.displayName}
          </h1>

          {entity.aliases.length > 0 && (
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag size={14} />
                {isEn ? 'Aliases:' : 'Synonyme:'}
              </span>
              {entity.aliases.map((alias) => (
                <span
                  key={alias}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                >
                  {alias}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
            <p>
              {isEn
                ? `${entity.displayName} is a core concept in modern web architecture, headless content systems, and high-performance digital applications. In the context of Coday's engineering philosophy, mastering ${entity.displayName} ensures sub-0.3s Core Web Vitals, enterprise security, and maximum organic conversion.`
                : `${entity.displayName} ist ein elementarer Bestandteil moderner Webarchitekturen, Headless-Systeme und High-Performance Weblösungen. In der Entwicklungspraxis von Coday garantiert der gezielte Einsatz von ${entity.displayName} Ladezeiten unter 300ms, höchste Sicherheitsstandards und maximale Conversion-Raten für Unternehmen in Mittelhessen und Deutschland.`}
            </p>
          </div>

          {relatedEntities.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
                <Sparkle size={18} className="text-primary" />
                {isEn ? 'Related Concepts & Technologies' : 'Verwandte Begriffe & Technologien'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedEntities.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/knowledge/wiki/${rel.slug}`}
                    className="p-3.5 bg-slate-50 hover:bg-primary/5 rounded-2xl border border-slate-200/80 hover:border-primary/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                        {rel.displayName}
                      </p>
                      <span className="text-[11px] text-slate-400 font-mono">/{rel.slug}</span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* CTA Box */}
        <section className="bg-gradient-to-br from-slate-900 to-secondary-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
              {isEn ? 'High Performance Web Engineering' : 'Maßgeschneiderte Webentwicklung'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">
              {isEn
                ? `Need expert implementation of ${entity.displayName}?`
                : `Sie möchten ${entity.displayName} professionell in Ihr Webprojekt integrieren?`}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {isEn
                ? 'Coday delivers bespoke Next.js and Headless solutions with sub-0.3s speed and 100/100 Core Web Vitals. Let us build your high-converting digital platform.'
                : 'Coday entwickelt High-Performance Websites und Headless-Lösungen mit messbarem ROI und 100/100 PageSpeed. Lassen Sie sich jetzt unverbindlich beraten.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              <span>{isEn ? 'Request Free Consultation' : 'Kostenlose Erstberatung anfragen'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
