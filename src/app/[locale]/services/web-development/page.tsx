import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDevelopmentClient } from '@/features/services/ui/WebDevelopmentClient';
import { setRequestLocale } from 'next-intl/server';
import { getBreadcrumbSchema, BASE_URL, FOUNDER_ID } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Code, ShieldCheck, Lightning, Cpu } from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Next.js Web Development & Full-Stack Agency | Coday',
      description:
        'Custom Next.js web development for B2B & mid-market. Sub-second load times, deep API integrations & enterprise security without WordPress risks.',
      keywords: [
        'Next.js Web Development',
        'React Development Agency',
        'Full Stack Web Development Wetzlar',
        'Custom Web Development',
        'Coday Web Development',
      ],
      path: '/en/services/web-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Next.js Webentwicklung & Full-Stack Webagentur | Coday',
    description:
      'Maßgeschneiderte Next.js Webentwicklung für B2B & Mittelstand. Subsekundäre Ladezeiten, API-Integrationen & maximale Sicherheit ohne WordPress-Risiken.',
    keywords: [
      'Next.js Webentwicklung',
      'React Entwicklung Agentur',
      'Fullstack Webentwicklung Wetzlar',
      'Maßgeschneiderte Webentwicklung',
      'Coday Webentwicklung',
    ],
    path: '/de/services/web-development',
    type: 'money',
  });
}

export default async function WebDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Services' : 'Leistungen', url: `/${_locale}/services` },
    {
      name: isEn ? 'Web Development' : 'Webentwicklung',
      url: `/${_locale}/services/web-development`,
    },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization lives in the root layout's head, so it is not repeated here.
    '@graph': [
      breadcrumbs,
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/services/web-development#service`,
        name: isEn
          ? 'Next.js Web Development & Full-Stack Agency'
          : 'Next.js Webentwicklung & Full-Stack Webagentur',
        url: `${BASE_URL}/${_locale}/services/web-development`,
        description: isEn
          ? 'Enterprise Next.js 15 and React 19 web development for mid-market and B2B leaders.'
          : 'Maßgeschneiderte Next.js 15 und React 19 Webentwicklung für den anspruchsvollen Mittelstand und B2B.',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Hessen, Deutschland',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Next.js 15 & React 19 Architecture',
                description:
                  'Server Components, SSG, Sub-0.3s Ladezeiten und 100/100 Core Web Vitals.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Sanity Headless CMS Integration',
                description:
                  'Strukturierte Redaktionsumgebung mit Live-Preview ohne Datenbank-Verwaltungsaufwand.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B API & ERP Integrationen',
                description:
                  'Sichere Anbindung von REST/GraphQL APIs, CRM-Systemen und Zahlungsdienstleistern.',
              },
            },
          ],
        },
      },
      {
        '@type': 'TechArticle',
        '@id': `${BASE_URL}/${_locale}/services/web-development#techarticle`,
        headline: isEn
          ? 'Modern Web Development Architecture with Next.js 15 and React Server Components'
          : 'Moderne Webentwicklungs-Architektur mit Next.js 15 und React Server Components',
        description:
          'Detaillierte Analyse, warum serverseitig vorkompilierte Next.js Architekturen monolithische PHP- und WordPress-Systeme in Performance, Sicherheit und Skalierbarkeit übertreffen.',
        // Reference the canonical founder node the layout already emits rather
        // than declaring a second, id-less Person for the same human.
        author: { '@id': FOUNDER_ID },
      },
    ],
  };

  return (
    <>
      <script
        id="schema-web-development"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebDevelopmentClient />

      {/* Structured Semantic Topic Silo & Architecture Deep Dive */}
      <section className="container mx-auto px-4 py-20 max-w-6xl text-slate-700">
        <div className="p-8 lg:p-14 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <Cpu className="w-4 h-4 text-amber-600" />
            <span>ENTERPRISE ARCHITEKTUR-STANDARDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-8">
            {isEn
              ? 'Why Modern Next.js Architecture Replaces Legacy Monoliths'
              : 'Warum moderne Next.js 15 Architektur traditionelle CMS-Monolithen ablöst'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <Lightning className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Subsekundäre Ladezeiten</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Durch statische Vorkompilierung (SSG) und Vercel Edge Caching werden Inhalte in
                unter 300ms an den Browser ausgeliefert — mit 0ms Layout Shifts.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Maximale Sicherheit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keine angreifbare MySQL-Datenbank auf dem Webserver, keine unsicheren
                Drittanbieter-Plugins, vollständige Isolierung sensibler Backend-Logik.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <Code className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Strikte TypeScript-Typisierung
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% wartbarer, sauber dokumentierter Code ohne Laufzeitfehler. Automatisierte CI/CD
                Qualitäts-Gates bei jedem Git-Commit.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-slate-600">
            <p>
              Als spezialisierte Webagentur in Wetzlar entwickeln wir digitale Produkte nach den
              höchsten Standards moderner Softwaretechnik. Während traditionelle Baukästen oder
              überladene WordPress-Themes hunderte überflüssige Skripte laden, setzen wir auf einen
              maßgeschneiderten Tech-Stack rund um{' '}
              <strong>Next.js 15, React 19, Tailwind CSS 4 und Sanity CMS</strong>.
            </p>
            <p>
              Das Ergebnis: Perfekte Google Lighthouse 100/100 Scores, minimale Serverkosten und
              eine intuitive Redaktionserfahrung für Ihr Marketing-Team.
            </p>
          </div>

          {/* Internal Silo Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4">
              Verwandte Leistungen & Case Studies:
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/web-design"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Webdesign & UI/UX</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/services/performance"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Performance & Speed Optimization</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/services/seo"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Technisches SEO & Topic Silos</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/work/batherm"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Case Study: Batherm Handwerk</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 border border-amber-300 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors shadow-sm"
              >
                <span>Festpreise ansehen</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
