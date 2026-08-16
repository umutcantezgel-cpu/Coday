import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SeoClient } from '@/features/services/ui/SeoClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import {
  ArrowRight,
  MagnifyingGlass,
  Sparkle,
  Lightning,
  TreeStructure,
  GlobeHemisphereWest,
} from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'B2B SEO & Generative Engine Optimization Agency | Coday',
      description:
        'Google top rankings & visibility in AI search engines (GEO). Technical SEO audits, Core Web Vitals and semantic content architecture.',
      path: '/en/services/seo',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'B2B SEO & Generative Engine Optimization Agentur | Coday',
    description:
      'Google Top-Rankings & Sichtbarkeit in KI-Suchmaschinen (GEO). Technische SEO-Audits, Core Web Vitals und semantische Content-Silos.',
    path: '/de/services/seo',
    type: 'money',
  });
}

export default async function SeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/services/seo#service`,
        name: isEn
          ? 'B2B SEO & Generative Engine Optimization (GEO) Agency'
          : 'B2B SEO & Generative Engine Optimization (GEO) Agentur',
        url: `${BASE_URL}/${_locale}/services/seo`,
        description: isEn
          ? 'Technical SEO audits, Core Web Vitals 100/100 optimization and Generative Engine Optimization for AI search engines.'
          : 'Technische SEO-Audits, Core Web Vitals 100/100 Optimierung und Generative Engine Optimization für KI-Suchmaschinen.',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Hessen, Deutschland',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'SEO & GEO Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Technisches SEO & Core Web Vitals',
                description:
                  'Server-Side Rendering, 0ms Cumulative Layout Shift, blitzsaubere Indexierbarkeit.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Semantische Topic-Silos & Entitäten-Aufbau',
                description:
                  'Strukturierte interne Verlinkung und Knowledge-Graph-Architektur für thematische Autorität.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Generative Engine Optimization (GEO)',
                description:
                  'JSON-LD Schema Markup und Fact-Density für Zitationen in Google AI Overviews, ChatGPT und Perplexity.',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/${_locale}/services/seo#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was ist Generative Engine Optimization (GEO)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'GEO ist die nächste Entwicklungsstufe von SEO. Inhalte werden so mit strukturierten Daten (JSON-LD), Fakten-Dichte und Entitäten-Hierarchien aufgebaut, dass KI-Modelle wie Google AI Overviews, ChatGPT Search und Perplexity Ihr Unternehmen als verlässliche Quelle zitieren und empfehlen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie beeinflussen Core Web Vitals das Ranking?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Google nutzt PageSpeed und Core Web Vitals als direkten Rankingfaktor. Schnelle Next.js Websites mit LCP unter 1,0s und 0ms Layout Shifts werden im Algorithmus gegenüber trägen WordPress-Seiten massiv bevorzugt.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie funktioniert Local SEO für Unternehmen in Mittelhessen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch optimierte Google Business Profile, konsistente NAP-Daten, regionale Topic-Silos (z.B. für Wetzlar, Gießen, Frankfurt) und lokalisierte Schema.org Auszeichnungen platzieren wir Ihr Unternehmen dauerhaft in den Google Maps Top-3.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        id="schema-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoClient />

      {/* 3 Pillars of Modern SEO & GEO Showcase */}
      <section className="container mx-auto px-4 py-20 max-w-6xl text-slate-700">
        <div className="p-8 lg:p-14 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkle className="w-4 h-4 text-amber-600" />
            <span>DIE 3 SÄULEN MODERNER SUCHEMPFEHLUNGEN (2026)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-8">
            {isEn
              ? 'From Traditional Search Rankings to AI Engine Citations'
              : 'Von klassischen Google-Rankings zur Dominanz in KI-Suchmaschinen'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <Lightning className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Technical Excellence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                100/100 Core Web Vitals, serverseitiges Next.js Rendering und subsekundäre
                Ladezeiten für maximale Google Bot Crawl-Effizienz.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <TreeStructure className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Semantic Authority</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strikte Topic-Silos, Keyword-Cluster und Knowledge-Graph-Architekturen zur
                Etablierung nachhaltiger Themenführerschaft.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <GlobeHemisphereWest className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. GEO & AI Citations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reichhaltige Schema.org Markups und zitierfähige Fakten-Strukturierung für
                Perplexity, ChatGPT und Google AI Overviews.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-slate-600">
            <p>
              Reines Keyword-Stuffing ist tot. Moderne Suchmaschinen bewerten semantische Relevanz,
              Nutzerzufriedenheit (INP, LCP) und strukturierte Wissensgraphen. Als technische SEO-
              und GEO-Agentur in Wetzlar sichern wir Ihrem Unternehmen die Sichtbarkeit auf allen
              relevanten Plattformen der nächsten Dekade.
            </p>
          </div>

          {/* Internal Silo Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4">
              Verwandte Leistungen & Case Studies:
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/web-development"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Full-Stack Webentwicklung</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/services/performance"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>PageSpeed & Core Web Vitals</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/work/schluesseldienst-wetzlar"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Case Study: MS Schlüsseldienst Local SEO</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 border border-amber-300 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors shadow-sm"
              >
                <span>SEO-Pakete & Festpreise</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
