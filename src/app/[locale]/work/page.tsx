import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getBreadcrumbSchema, BASE_URL } from '@/lib/schema';
import { workData } from '@/shared/data/work';
import { Link } from '@/i18n/navigation';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import {
  ArrowRight,
  Sparkle,
  TrendUp,
  Lightning,
  ShieldCheck,
  Globe,
  DeviceMobile,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';
import GradientText from '@/shared/ui/GradientText';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { TrustBadges } from '@/shared/ui/TrustBadges';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Case Studies & Portfolio | Coday',
      description:
        'Real client projects by Coday: Next.js websites, 100/100 Core Web Vitals and measurable B2B conversion growth for businesses.',
      keywords: [
        'Web Design Portfolio',
        'Website Case Studies',
        'Next.js Client Projects',
        'Conversion Optimized References',
        'Coday Portfolio',
      ],
      path: '/en/work',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Referenzen & Case Studies | Coday',
    description:
      'Echte Kundenprojekte von Coday: Next.js Websites, 100/100 Core Web Vitals und messbare Conversion-Steigerungen für Unternehmen.',
    keywords: [
      'Webdesign Referenzen',
      'Website Portfolio Wetzlar',
      'Case Studies Webentwicklung',
      'Erfolgreiche Relaunches',
      'Coday Work',
    ],
    path: '/de/work',
    type: 'money',
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';
  const lang = isEn ? 'en' : 'de';

  const projects = Object.values(workData);
  const caseStudies = projects.filter((p) => p.type === 'case_study');

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Portfolio' : 'Referenzen', url: `/${_locale}/work` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/${_locale}/work#collection`,
        name: isEn
          ? 'Portfolio & Case Studies | Coday Web Agency'
          : 'Portfolio & Case Studies | Coday Webagentur',
        description: isEn
          ? 'Real client projects and performance case studies by Coday Web Agency.'
          : 'Reale Kundenprojekte und Performance-Case-Studies der Coday Webagentur.',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: caseStudies.map((project, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'CreativeWork',
              name: project.content[lang].title,
              headline: project.content[lang].subtitle,
              url: `${BASE_URL}/${_locale}/work/${project.slug}`,
              description: project.content[lang].challenge.description,
            },
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        id="schema-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-dvh bg-[#fafafa] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
        {/* Hero Section */}
        <section className="pt-4 pb-12 lg:pt-8 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden text-center">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 blur-[140px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Breadcrumbs />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-300 bg-amber-50 text-amber-900 text-xs sm:text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">
              <Sparkle className="w-4 h-4 text-amber-700" />
              {isEn
                ? 'REAL PROJECTS • VERIFIED RESULTS'
                : 'ECHTE PROJEKTE • NACHWEISBARE KENNZAHLEN'}
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-slate-900 leading-[1.1] tracking-tight mb-8">
              {isEn ? 'Measurable Impact for ' : 'Messbarer Impact für den '}
              <GradientText
                colors={['#b45309', '#d97706', '#f59e0b']}
                animationSpeed={5}
                showBorder={false}
                className="inline-block"
              >
                {isEn ? 'Businesses' : 'Mittelstand'}
              </GradientText>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              {isEn
                ? 'Measurable Impact for Businesses: No fictional mockups or placeholder logos. Every project demonstrates handcrafted Next.js architecture, 100/100 PageSpeed, and measurable conversion growth.'
                : 'Messbarer Impact für den Mittelstand: Keine fiktiven Mockups oder Platzhalter-Logos. Jedes Projekt demonstriert handgeschriebene Next.js-Architektur, 100/100 PageSpeed und messbare Conversion-Steigerungen.'}
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                <Lightning className="w-4 h-4 text-amber-600" />
                <span>{isEn ? 'Sub-0.3s Load Times' : 'Sub-0,3s Ladezeiten'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                <TrendUp className="w-4 h-4 text-amber-600" />
                <span>{isEn ? 'Up to +320% Lead Growth' : 'Bis zu +320% Lead-Wachstum'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>{isEn ? '100% GDPR & Ownership' : '100% DSGVO & Eigentum'}</span>
              </div>
            </div>

            {/* Dual Verified Reviews Badges: Google Maps & ProvenExpert */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://www.google.com/maps?cid=8570940562624494590"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-amber-400 hover:shadow-md transition-all group"
                title="Google Maps Rezensionen für Coday ansehen"
              >
                <span className="font-bold text-slate-900">5,0 / 5,0</span>
                <span className="text-amber-500 tracking-wider">★★★★★</span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                  Google Maps (4 Rezensionen)
                </span>
              </a>

              <a
                href="https://www.provenexpert.com/de-de/coday-webagentur/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-emerald-500 hover:shadow-md transition-all group"
                title="ProvenExpert Profil von Coday ansehen"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-900">5,0 / 5,0</span>
                <span className="text-amber-500 tracking-wider">★★★★★</span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  ProvenExpert (4 Bewertungen)
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Featured Case Studies Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {caseStudies.map((project) => {
              const content = project.content[lang];
              const heroImage = content.solution.images[0];

              return (
                <div
                  key={project.slug}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image Preview */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100 border-b border-slate-100">
                    {heroImage ? (
                      <OptimizedImage
                        src={heroImage}
                        alt={content.solution.imageAlts?.[0] || content.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-8 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                        <div className="relative z-10">
                          <span className="text-[11px] uppercase tracking-widest text-primary font-bold mb-1.5 block">
                            {content.category}
                          </span>
                          <span className="text-xl sm:text-2xl font-black font-display text-white tracking-tight">
                            {content.title}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                    {/* Live Badge */}
                    {project.status === 'live' && project.liveUrl && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        Live Projekt
                      </div>
                    )}

                    {/* Verified Metrics Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                      {content.results.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm p-2.5 rounded-xl text-center"
                        >
                          <div className="text-amber-800 font-extrabold text-sm sm:text-base">
                            {metric.value}
                          </div>
                          <div className="text-slate-600 text-[10px] sm:text-xs font-medium truncate">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs uppercase tracking-wider mb-4">
                        {content.category}
                      </div>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-3 group-hover:text-amber-800 transition-colors">
                        {content.title}
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed">
                        {content.challenge.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 text-amber-700 font-bold text-sm hover:text-amber-800 transition-colors group-hover:translate-x-1 duration-200"
                      >
                        <span>
                          {isEn
                            ? `Analyze ${content.title} Case Study`
                            : `Case Study ${content.title} analysieren`}
                        </span>
                        <ArrowRight weight="bold" className="w-4 h-4" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-500 hover:text-slate-900 underline transition-colors"
                        >
                          Website öffnen ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEO Longform Content */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-24 text-slate-600">
          <div className="p-8 lg:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-6">
              {isEn
                ? 'Web Design Case Studies & Measurable Project Success'
                : 'Webdesign Referenzen & messbarer Projekterfolg in Hessen'}
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                {isEn
                  ? 'As a specialized web agency focused on high-performance Next.js solutions, we rely exclusively on verifiable client projects. From craft businesses like Batherm and MemoBau to e-commerce flagships like Talia Boutique or emergency services like Locksmith Wetzlar: We transform sluggish websites into predictable revenue engines.'
                  : 'Als spezialisierte Webagentur mit Fokus auf High-Performance Next.js-Lösungen setzen wir ausschließlich auf verifizierbare Kundenprojekte. Ob Handwerksbetriebe wie Batherm und MemoBau, E-Commerce Flagships wie Talia Boutique oder Notdienst-Unternehmen wie MS Schlüsseldienst Wetzlar: Wir transformieren langsame, ineffiziente Websites in planbare Umsatzbringer.'}
              </p>
              <p>
                {isEn
                  ? 'Every website is engineered with 100/100 Core Web Vitals, server-side rendering (SSG/SSR), and targeted search engine optimization for Germany and international markets.'
                  : 'Jede Website wird mit 100/100 Core Web Vitals, server-seitigem Rendering (SSG/SSR) und zielgerichteter Suchmaschinenoptimierung für Hessen und ganz Deutschland ausgeliefert.'}
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badges Bar */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
          <TrustBadges align="center" />
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-white border-t border-slate-200 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 mb-6">
              {isEn
                ? 'Want Similar Results for Your Business?'
                : 'Möchten Sie ähnliche Ergebnisse für Ihr Unternehmen?'}
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {isEn
                ? 'Let us audit your current web presence. We will show you actionable levers for more inquiries, top PageSpeed, and market visibility.'
                : 'Lassen Sie uns Ihre aktuelle Web-Präsenz analysieren. Wir zeigen Ihnen die konkreten Hebel für mehr Anfragen, Top-PageSpeed und regionale Sichtbarkeit.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition duration-300 shadow-lg shadow-primary-700/25 hover:scale-[1.02] text-lg"
            >
              <span>
                {isEn ? 'Request Free Website Audit' : 'Kostenloses Website-Audit anfordern'}
              </span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
