import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
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
      title: 'Portfolio & Case Studies | Real Web Design References – Coday',
      description:
        'Explore real client projects by Coday Web Agency. Next.js websites, 100/100 Core Web Vitals & measurable conversion growth for mid-market businesses.',
      path: '/en/work',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Portfolio & Case Studies | Reale Webdesign Referenzen – Coday',
    description:
      'Entdecken Sie erfolgreiche Kundenprojekte der Coday Webagentur. Next.js Webseiten, 100/100 Core Web Vitals & messbare Conversion-Steigerungen im Mittelstand.',
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
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
      <div className="min-h-dvh bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden text-center">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Breadcrumbs />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
              <Sparkle className="w-4 h-4 text-amber-400" />
              {isEn
                ? 'REAL PROJECTS • VERIFIED RESULTS'
                : 'ECHTE PROJEKTE • NACHWEISBARE KENNZAHLEN'}
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-8">
              Messbarer Impact für den{' '}
              <GradientText
                colors={['#fbbf24', '#fef08a', '#f59e0b']}
                animationSpeed={5}
                showBorder={false}
                className="inline-block"
              >
                Mittelstand
              </GradientText>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Keine fiktiven Mockups oder Platzhalter-Logos. Jedes Projekt demonstriert
              handgeschriebene Next.js-Architektur, 100/100 PageSpeed und messbare
              Conversion-Steigerungen.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                <Lightning className="w-4 h-4 text-amber-400" />
                <span>Sub-0,3s Ladezeiten</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                <TrendUp className="w-4 h-4 text-amber-400" />
                <span>Bis zu +320% Lead-Wachstum</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% DSGVO & Eigentum</span>
              </div>
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
                  className="group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition duration-300 flex flex-col justify-between"
                >
                  {/* Top Image Preview */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    {heroImage ? (
                      <OptimizedImage
                        src={heroImage}
                        alt={content.solution.imageAlts?.[0] || content.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Live Badge */}
                    {project.status === 'live' && project.liveUrl && (
                      <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Live Projekt
                      </div>
                    )}

                    {/* Verified Metrics Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                      {content.results.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-2.5 rounded-xl text-center"
                        >
                          <div className="text-amber-400 font-extrabold text-sm sm:text-base">
                            {metric.value}
                          </div>
                          <div className="text-slate-400 text-[10px] sm:text-xs truncate">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-4">
                        {content.category}
                      </div>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {content.title}
                      </h2>
                      <p className="text-slate-300 text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed">
                        {content.challenge.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors group-hover:translate-x-1 duration-200"
                      >
                        <span>Case Study analysieren</span>
                        <ArrowRight weight="bold" className="w-4 h-4" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-400 hover:text-slate-200 underline transition-colors"
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
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-24 text-slate-400">
          <div className="p-8 lg:p-12 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
              Webdesign Referenzen & messbarer Projekterfolg in Hessen
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Als spezialisierte Webagentur mit Fokus auf High-Performance Next.js-Lösungen setzen
                wir ausschließlich auf verifizierbare Kundenprojekte. Ob Handwerksbetriebe wie
                Batherm und MemoBau, E-Commerce Flagships wie Talia Boutique oder
                Notdienst-Unternehmen wie MS Schlüsseldienst Wetzlar: Wir transformieren langsame,
                ineffiziente Websites in planbare Umsatzbringer.
              </p>
              <p>
                Jede Website wird mit 100/100 Core Web Vitals, server-seitigem Rendering (SSG/SSR)
                und zielgerichteter Suchmaschinenoptimierung für Hessen und ganz Deutschland
                ausgeliefert.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-slate-900/60 border-t border-slate-800/80 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-6">
              Möchten Sie ähnliche Ergebnisse für Ihr Unternehmen?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Lassen Sie uns Ihre aktuelle Web-Präsenz analysieren. Wir zeigen Ihnen die konkreten
              Hebel für mehr Anfragen, Top-PageSpeed und regionale Sichtbarkeit.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-amber-400 text-slate-950 font-bold rounded-full hover:bg-amber-300 transition duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02] text-lg"
            >
              <span>Kostenloses Website-Audit anfordern</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
