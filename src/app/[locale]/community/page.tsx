import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  ShoppingBag,
  Sparkle,
  Users,
  CalendarBlank,
  ArrowRight,
  ShieldCheck,
  Lightning,
  TreeStructure,
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
      title: 'Coday Community | Web Design & Tech Network',
      description:
        'The Coday digital network for businesses and developers: explore website modules, workshops, regional partners, and project dates.',
      keywords: [
        'Web Design Network Hesse',
        'Next.js Community Germany',
        'Headless Web Agency Central Hesse',
        'Developer Meetup Wetzlar',
      ],
      path: '/en/community',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Coday Community | Netzwerk für Webdesign & Tech',
    description:
      'Das Coday Netzwerk für Unternehmen und Entwickler in Hessen: Entdecken Sie Website-Module, Events, Partner und Termine im Überblick.',
    keywords: [
      'Webdesign Netzwerk Hessen',
      'Next.js Community Mittelhessen',
      'Webentwicklung Partner Wetzlar',
      'Digitalagentur Netzwerk Gießen',
    ],
    path: '/de/community',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale || 'de';
  setRequestLocale(locale);
  const isEn = locale === 'en';

  const pageUrl = `${BASE_URL}/${locale}/community`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${locale}` },
      { name: 'Community', url: `/${locale}/community` },
    ],
    pageUrl
  );

  const webPage = getWebPageSchema({
    name: isEn ? 'Coday Community Hub & Partner Network' : 'Coday Community Hub & Partner-Netzwerk',
    description: isEn
      ? 'The central hub for website modules, developer workshops, partner network and project scheduling.'
      : 'Der zentrale Hub für Website-Module, Entwickler-Workshops, Partnernetzwerk und Terminplanung.',
    url: pageUrl,
    locale,
  });

  const modules = [
    {
      href: '/community/marketplace',
      icon: ShoppingBag,
      title: isEn ? 'Website Modules & Tools' : 'Website-Bausteine & Module',
      description: isEn
        ? 'Twelve modular components: appointment booking, calculators, job application funnels and member areas.'
        : 'Zwölf einsatzbereite Module: Terminbuchung, interaktive Kalkulatoren, Express-Bewerbung und Kundenbereiche.',
      badge: isEn ? 'Modules' : 'Bausteine',
    },
    {
      href: '/community/events',
      icon: Sparkle,
      title: isEn ? 'Workshops & Meetups' : 'Workshops & Meetups',
      description: isEn
        ? 'Hands-on training formats covering Next.js App Router, local SEO architecture and B2B funnel conversion.'
        : 'Praxisnahe Workshop-Formate zu Next.js App Router, lokaler SEO-Architektur und B2B-Conversion.',
      badge: isEn ? 'Knowledge' : 'Wissen',
    },
    {
      href: '/community/members',
      icon: Users,
      title: isEn ? 'Partner Network' : 'Partner-Netzwerk',
      description: isEn
        ? 'Cooperation with freelancers and specialized agencies in Central Hesse for frontend, design, and content.'
        : 'Zusammenarbeit mit Freelancern und Spezialisten aus Mittelhessen für Frontend, Design und Content.',
      badge: isEn ? 'Network' : 'Netzwerk',
    },
    {
      href: '/community/calendar',
      icon: CalendarBlank,
      title: isEn ? 'Project Availability' : 'Projekt-Verfügbarkeit',
      description: isEn
        ? 'Transparent capacity planning, current lead times, and booking options for free initial consultations.'
        : 'Transparente Kapazitäten, aktuelle Vorlaufzeiten und Termine für ein unverbindliches Erstgespräch.',
      badge: isEn ? 'Scheduling' : 'Kapazität',
    },
  ];

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Header Section */}
        <div className="text-left space-y-4 mb-12">
          <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            {isEn ? 'Ecosystem & Collaboration' : 'Ökosystem & Kollaboration'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
            <span>Coday </span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              Community
            </GradientText>
            <span> {isEn ? '& Partner Hub' : '& Partner-Hub'}</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed">
            {isEn
              ? 'Our community platform connects entrepreneurs, creators, and engineering partners across Central Hesse. Discover production-tested website components, join focused knowledge sessions, connect with specialized peers, or plan your next digital project with reliable lead times.'
              : 'Unsere Community-Plattform verbindet Unternehmer, Kreative und technische Partner im Raum Mittelhessen. Entdecken Sie praxiserprobte Website-Komponenten, vertiefen Sie Ihr Wissen in praxisnahen Workshops, vernetzen Sie sich mit Fachexperten und planen Sie neue Projekte mit verlässlichen Vorlaufzeiten.'}
          </p>
        </div>

        {/* Grid of 4 Community Hub Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.href}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" weight="bold" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {mod.badge}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-secondary mb-2 group-hover:text-primary transition-colors">
                    {mod.title}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {mod.description}
                  </p>
                </div>
                <div>
                  <Link
                    href={mod.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>{isEn ? 'Explore section' : 'Bereich ansehen'}</span>
                    <ArrowRight className="w-4 h-4" weight="bold" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Semantic Content Blocks for Search Engines & Users */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-secondary mb-4">
              {isEn
                ? 'High-Performance Web Architecture in Practice'
                : 'Moderne Web-Architektur in der Praxis'}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
              {isEn
                ? 'Modern digital presence is no longer about monolithic page builders. We build on Next.js 15, strict TypeScript, and headless CMS integrations that guarantee sub-second load times and 100/100 Core Web Vitals. The Coday Community shares these architectures and open modules with regional businesses.'
                : 'Erfolgreiche digitale Markenauftritte basieren heute nicht mehr auf überladenen Baukästen oder trägen Themes. Coday setzt konsequent auf Next.js 15, typensichere Architekturen und Headless-Content-Systeme. Damit erzielen wir Ladezeiten unter einer halben Sekunde und perfekte Core-Web-Vitals-Werte in Google. Im Community-Bereich teilen wir diese Erkenntnisse und Komponenten.'}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {isEn
                ? 'Whether you are looking for an interactive consultation calculator for craft businesses, an applicant qualification funnel, or need specialized whitelabel development support: our modular ecosystem is built for fast delivery, full legal compliance under German DSGVO, and long-term search engine visibility.'
                : 'Ob interaktiver Beratungssimulator für Handwerksbetriebe, qualifizierende Online-Bewerbungsfunnels oder spezialisierte Whitelabel-Unterstützung: Unsere modulare Infrastruktur steht für schnelle Umsetzung, vollste DSGVO-Konformität und nachhaltige Top-Platzierungen in lokalen Suchergebnissen.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Lightning className="w-4 h-4" weight="bold" />
                <span>{isEn ? 'Sub-0.5s Load Time' : 'Ladezeit < 0,5s'}</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm">
                {isEn
                  ? 'Zero render-blocking scripts, lean bundles, and edge delivery for maximum speed.'
                  : 'Keine render-blockierenden Skripte, minimale Bundles und Edge-Caching für maximales Tempo.'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <ShieldCheck className="w-4 h-4" weight="bold" />
                <span>{isEn ? 'DSGVO & Security' : 'DSGVO & Sicherheit'}</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm">
                {isEn
                  ? 'A+ rated security headers, server-side data processing, and local hosting.'
                  : 'A+ Sicherheitsheader, sichere Serverless-Verarbeitung und rechtskonformer Datenschutz.'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <TreeStructure className="w-4 h-4" weight="bold" />
                <span>{isEn ? 'Structured Schema' : 'Strukturierte Daten'}</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm">
                {isEn
                  ? 'Automated Schema.org microdata for enhanced rich snippets on Google.'
                  : 'Automatisierte Schema.org-Markup für Rich Snippets und erstklassige Sichtbarkeit.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
