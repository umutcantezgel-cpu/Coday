import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getBreadcrumbSchema, BASE_URL } from '@/lib/schema';
import { CareerOverviewClient } from '@/features/career/ui/CareerOverviewClient';
import { Link } from '@/i18n/navigation';
import { Briefcase, Buildings, Lightning } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Careers at Coday | Web Design Agency Jobs Wetzlar',
      description:
        'Discover exciting career opportunities at the web design agency Coday in Wetzlar. Join our team for premium web development & digital solutions.',
      keywords: [
        'Web Agency Jobs Wetzlar',
        'Next.js Developer Jobs Hesse',
        'Frontend Developer Wetzlar',
        'Coday Careers',
      ],
      path: '/en/career',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Karriere bei Coday | Webdesign Agentur Jobs Wetzlar',
    description:
      'Entdecken Sie tolle Karrieremöglichkeiten in der Webdesign Agentur Coday in Wetzlar. Werden Sie Teil unseres Teams für Premium Webentwicklung!',
    keywords: [
      'Webagentur Jobs Wetzlar',
      'Next.js Entwickler Hessen',
      'Frontend Entwickler Wetzlar',
      'Coday Karriere',
    ],
    path: '/de/career',
    type: 'default',
  });
}

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${locale}` },
    { name: isEn ? 'Careers' : 'Karriere', url: `/${locale}/career` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(locale),
      breadcrumbs,
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${locale}/career`,
        name: isEn ? 'Careers at Coday' : 'Karriere bei Coday',
        description: isEn
          ? 'Discover exciting career opportunities at the web design agency Coday in Wetzlar. Join our team for premium web development & digital solutions.'
          : 'Entdecken Sie tolle Karrieremöglichkeiten in der Webdesign Agentur Coday in Wetzlar. Werden Sie Teil unseres Teams für Premium Webentwicklung!',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerOverviewClient />

      {/* Prominent Career Subpage Hub & Navigation */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700 bg-primary-50 px-3.5 py-1.5 rounded-full border border-primary-100 inline-block mb-3">
              {isEn ? 'Explore Opportunities' : 'Karrierebereiche im Überblick'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              {isEn
                ? 'Your Gateway to Coday: Subpages & Opportunities'
                : 'Ihre Karriere bei Coday: Alle Bereiche & Vorteile'}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              {isEn
                ? 'Explore our open job listings, learn about our founder-led engineering culture, and discover our remote-first perks.'
                : 'Informieren Sie sich über offene Positionen, unsere inhabergeführte Entwicklungskultur und maßgeschneiderte Mitarbeiter-Benefits.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Jobs */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-primary-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 font-bold flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                  <OptimizedIcon icon={Briefcase} className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-3">
                  {isEn ? 'Open Positions & Jobs' : 'Offene Stellen & Jobangebote'}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {isEn
                    ? 'Discover current opportunities for Next.js developers, UI/UX designers, and SEO consultants in Wetzlar & 100% remote.'
                    : 'Entdecken Sie offene Vakanzen für Next.js Entwickler, UI/UX Designer und SEO-Berater in Wetzlar sowie 100% remote.'}
                </p>
              </div>
              <Link
                href="/career/jobs"
                className="inline-flex items-center justify-between font-bold text-sm text-primary-700 hover:text-primary-800 pt-4 border-t border-slate-100 group-hover:border-primary-100 transition-colors"
              >
                <span>{isEn ? 'View Open Positions' : 'Offene Stellen ansehen'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card 2: Culture */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-primary-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                  <OptimizedIcon icon={Buildings} className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-3">
                  {isEn ? 'Team Culture & Philosophy' : 'Teamkultur & Philosophie'}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {isEn
                    ? 'Learn about our radical transparency, direct founder collaboration, and high-performance Next.js engineering standards.'
                    : 'Erfahren Sie mehr über unsere radikale Transparenz, direkte Inhaberbetreuung und kompromisslose Next.js-Qualitätsstandards.'}
                </p>
              </div>
              <Link
                href="/career/culture"
                className="inline-flex items-center justify-between font-bold text-sm text-primary-700 hover:text-primary-800 pt-4 border-t border-slate-100 group-hover:border-primary-100 transition-colors"
              >
                <span>{isEn ? 'Explore Our Culture' : 'Teamkultur entdecken'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card 3: Benefits */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-primary-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                  <OptimizedIcon icon={Lightning} className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-3">
                  {isEn ? 'Benefits & Work Model' : 'Benefits & Arbeitsmodell'}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {isEn
                    ? 'Explore 100% remote flexibility, high-end Apple hardware setups, dedicated learning budgets, and flexible working hours.'
                    : 'Profitieren Sie von 100% Remote-Flexibilität, moderner Apple-Hardware, Weiterbildungsbudget und flexibler Zeiteinteilung.'}
                </p>
              </div>
              <Link
                href="/career/benefits"
                className="inline-flex items-center justify-between font-bold text-sm text-primary-700 hover:text-primary-800 pt-4 border-t border-slate-100 group-hover:border-primary-100 transition-colors"
              >
                <span>{isEn ? 'Discover All Benefits' : 'Benefits kennenlernen'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {isEn ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Careers at Coday: Your Future in Web Development in Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Welcome to the careers page of Coday, your leading agency for premium{' '}
                <Link
                  href="/webdesign-agentur-wetzlar"
                  className="text-primary-700 underline font-medium"
                >
                  web design in Wetzlar
                </Link>{' '}
                and the greater Central Hesse region. If you are looking for a new professional
                challenge in modern web development, UI/UX design, or technical SEO optimization,
                you have come to the right place. Our mission is not only to create outstanding
                digital products for our clients but also to provide a work environment that fosters
                creativity, innovation, and continuous growth. Wetzlar, as a thriving business hub
                in Hesse, offers the perfect backdrop for a flourishing career in the tech industry.
              </p>
              <p>
                At Coday, we place great value on a collaborative and inspiring work culture. We
                firmly believe that the best results emerge when talented individuals with diverse
                perspectives and skill sets work together. On our dedicated{' '}
                <Link href="/career/jobs" className="text-primary-700 underline font-medium">
                  Open Positions page
                </Link>
                , you can review current project vacancies. Whether you are an experienced frontend
                developer well-versed in React, Next.js, and Tailwind CSS, a backend specialist who
                architects robust and scalable cloud systems, or a creative UI designer with an eye
                for detail – you will find exciting projects with us that both challenge and advance
                your professional skills.
              </p>
              <p>
                To understand how we collaborate on daily client sprints, visit our{' '}
                <Link href="/career/culture" className="text-primary-700 underline font-medium">
                  Team Culture & Philosophy page
                </Link>
                . We maintain a radical commitment to transparency, clean code, and direct client
                communication without account manager intermediaries. Furthermore, check out our{' '}
                <Link href="/career/benefits" className="text-primary-700 underline font-medium">
                  Benefits & Perks overview
                </Link>{' '}
                to see how our 100% remote model, hardware provisions, and flexible work schedules
                support a healthy work-life integration.
              </p>
              <p>
                Launch your career at an up-and-coming web agency. Explore our{' '}
                <Link href="/services" className="text-primary-700 underline font-medium">
                  comprehensive digital services
                </Link>{' '}
                or send us a speculative inquiry via our{' '}
                <Link href="/contact" className="text-primary-700 underline font-medium">
                  contact form
                </Link>
                . We look forward to connecting with passionate developers and designers who want to
                shape the digital landscape together with Coday in Wetzlar, Hesse, and across the
                DACH region.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Karriere bei Coday: Ihre Zukunft in der Webentwicklung in Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Willkommen auf der Karriereseite von Coday, Ihrer führenden Agentur für{' '}
                <Link
                  href="/webdesign-agentur-wetzlar"
                  className="text-primary-700 underline font-medium"
                >
                  Webdesign in Wetzlar
                </Link>{' '}
                und der gesamten Region Mittelhessen. Wenn Sie auf der Suche nach einer neuen
                beruflichen Herausforderung im Bereich Webentwicklung, UI/UX-Design oder technisches
                SEO sind, dann sind Sie hier genau richtig. Unser Ziel ist es, nicht nur
                herausragende digitale Produkte für unsere Kunden zu erschaffen, sondern auch ein
                Arbeitsumfeld zu bieten, das Kreativität, Innovation und kontinuierliches
                persönliches Wachstum fördert.
              </p>
              <p>
                Bei Coday legen wir großen Wert auf ein kollegiales und inspirierendes Arbeitsklima.
                Auf unserer Übersichtsseite für{' '}
                <Link href="/career/jobs" className="text-primary-700 underline font-medium">
                  offene Stellen und Jobs
                </Link>{' '}
                finden Sie aktuelle Ausschreibungen für Entwickler und Kreative. Egal, ob Sie ein
                erfahrener Frontend-Entwickler mit tiefem Know-how in React, Next.js und TypeScript
                sind, ein Backend-Spezialist für API-Integrationen oder ein detailverliebter
                UI/UX-Designer – bei uns erwarten Sie abwechslungsreiche Kundenprojekte mit
                messbarem Mehrwert.
              </p>
              <p>
                Unsere Arbeitsweise und Grundwerte stellen wir Ihnen ausführlich auf unserer Seite
                zur{' '}
                <Link href="/career/culture" className="text-primary-700 underline font-medium">
                  Teamkultur und Agentur-Philosophie
                </Link>{' '}
                vor. Wir setzen auf direkte Inhaberführung ohne bürokratische Zwischenebenen,
                radikale Transparenz und KI-gestützte Entwicklungsprozesse. Welche Vorteile Sie
                darüber hinaus erwarten, erfahren Sie auf unserer Seite für{' '}
                <Link href="/career/benefits" className="text-primary-700 underline font-medium">
                  Mitarbeiter-Benefits und Arbeitsmodelle
                </Link>
                : von 100% ortsunabhängiger Remote-Arbeit über modernste Hardware-Ausstattung bis
                hin zu flexiblen Arbeitszeitmodellen.
              </p>
              <p>
                Gestalten Sie die Zukunft moderner Webanwendungen bei Coday. Informieren Sie sich
                über unsere vielfältigen{' '}
                <Link href="/services" className="text-primary-700 underline font-medium">
                  Dienstleistungen und Web-Services
                </Link>{' '}
                oder treten Sie direkt über unser{' '}
                <Link href="/contact" className="text-primary-700 underline font-medium">
                  Kontaktformular
                </Link>{' '}
                mit uns in Verbindung. Wir freuen uns darauf, engagierte Talente kennenzulernen und
                gemeinsam innovative digitale Flaggschiffe zu realisieren.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
