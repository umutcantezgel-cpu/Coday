import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/career/ui/JobsClient';
import { Link } from '@/i18n/navigation';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Job Openings | Web Design Agency Wetzlar Hesse',
      description:
        'Current job openings at Coday in Wetzlar. We are looking for web designers, developers and creatives for exciting projects in Central Hesse. Apply now.',
      keywords: [
        'Web Design Jobs Wetzlar',
        'Frontend Developer Jobs Hesse',
        'React Next.js Jobs Wetzlar',
        'Coday Jobs',
      ],
      path: '/en/career/jobs',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Stellenangebote | Webdesign Agentur Wetzlar Hessen',
    description:
      'Aktuelle Stellenangebote bei Coday in Wetzlar. Wir suchen Webdesigner, Entwickler und Kreative für spannende Projekte in Mittelhessen. Jetzt bewerben.',
    keywords: [
      'Webdesign Jobs Wetzlar',
      'Frontend Entwickler Jobs Hessen',
      'React Next.js Stellen Wetzlar',
      'Coday Stellenangebote',
    ],
    path: '/de/career/jobs',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Careers' : 'Karriere', url: `/${_locale}/career` },
    { name: isEn ? 'Jobs' : 'Stellenangebote', url: `/${_locale}/career/jobs` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization lives in the root layout's graph; repeating it here would duplicate the node.
    '@graph': [
      breadcrumbs,
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/${_locale}/career/jobs#collection`,
        name: isEn ? 'Coday Job Openings' : 'Coday Stellenangebote & Jobs',
        url: `${BASE_URL}/${_locale}/career/jobs`,
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
      <ClientComponent />
      {/* Semantic Local SEO Content Section */}
      <section className="border-t border-slate-200/80 bg-slate-50/70 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-slate-800">
          {isEn ? (
            <>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-8 tracking-tight">
                Web Development & Design Careers in Wetzlar, Hesse
              </h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-700">
                <p>
                  Welcome to the official job openings portal of Coday, the leading boutique agency
                  for{' '}
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="text-primary-700 underline font-semibold"
                  >
                    web design in Wetzlar
                  </Link>{' '}
                  and the wider Central Hesse region. We are continually looking for passionate
                  frontend engineers, creative UI/UX designers, and technical SEO strategists who
                  share our commitment to craftsmanship, performance, and clean code. Whether you
                  work locally in Hesse or 100% remotely from anywhere in the DACH area, Coday
                  offers a high-impact environment where your work directly shapes client success.
                </p>
                <p>
                  Why partner with Coday? We believe exceptional digital products are born when
                  developers and designers have the autonomy, high-end tooling, and freedom to do
                  their best work without corporate overhead. On our{' '}
                  <Link href="/career/culture" className="text-primary-700 underline font-semibold">
                    Team Culture & Philosophy page
                  </Link>
                  , you can explore how our founder-led approach eliminates unnecessary management
                  layers. Furthermore, our comprehensive{' '}
                  <Link
                    href="/career/benefits"
                    className="text-primary-700 underline font-semibold"
                  >
                    Benefits & Work Model
                  </Link>{' '}
                  guarantees modern Apple hardware, flexible working hours, and transparent
                  compensation packages.
                </p>
                <p>
                  Our client portfolio ranges from regional Mittelstand businesses to innovative
                  digital brands. As part of our team or freelancer network, you will work on
                  state-of-the-art architectures leveraging React, Next.js App Router, TypeScript,
                  and Tailwind CSS. You will also collaborate on{' '}
                  <Link
                    href="/services/web-development"
                    className="text-primary-700 underline font-semibold"
                  >
                    custom web development
                  </Link>
                  ,{' '}
                  <Link
                    href="/services/design/ui-ux"
                    className="text-primary-700 underline font-semibold"
                  >
                    accessible UI/UX design systems
                  </Link>
                  , and advanced{' '}
                  <Link href="/services/seo" className="text-primary-700 underline font-semibold">
                    search engine optimization
                  </Link>{' '}
                  that achieve perfect 100/100 Google Core Web Vitals scores.
                </p>
                <p>
                  Ready to take the next step in your career? Browse the open roles above, check our{' '}
                  <Link href="/career" className="text-primary-700 underline font-semibold">
                    Career Overview hub
                  </Link>
                  , or submit your portfolio directly via our{' '}
                  <Link href="/contact" className="text-primary-700 underline font-semibold">
                    contact form
                  </Link>
                  . We look forward to getting to know you and building exceptional web applications
                  together!
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-8 tracking-tight">
                Jobs & Karriere in Webentwicklung & Webdesign in Wetzlar
              </h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-700">
                <p>
                  Willkommen auf der offiziellen Stellenangebote-Seite von Coday, Ihrer
                  spezialisierten Agentur für{' '}
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="text-primary-700 underline font-semibold"
                  >
                    Webdesign in Wetzlar
                  </Link>{' '}
                  und der Region Mittelhessen. Wir sind stets auf der Suche nach motivierten
                  Talenten, erfahrenen Freelancern und engagierten Kooperationspartnern, die unsere
                  Leidenschaft für kompromisslose technische Exzellenz und modernes Screendesign
                  teilen. Ob vor Ort in Wetzlar oder 100% remote aus dem gesamten DACH-Raum: Bei
                  Coday finden Sie anspruchsvolle Projekte mit echter Gestaltungsfreiheit.
                </p>
                <p>
                  Was macht das Arbeiten bei Coday besonders? Wir setzen auf direkte Inhaberführung
                  und verzichten auf bürokratische Umwege. Auf unserer Seite zur{' '}
                  <Link href="/career/culture" className="text-primary-700 underline font-semibold">
                    Teamkultur und Arbeitsphilosophie
                  </Link>{' '}
                  erfahren Sie, wie wir in agilen Sprints transparente Ergebnisse liefern. Zudem
                  bietet Ihnen unsere Übersicht zu den{' '}
                  <Link
                    href="/career/benefits"
                    className="text-primary-700 underline font-semibold"
                  >
                    Mitarbeiter-Benefits und Arbeitsmodellen
                  </Link>{' '}
                  Einblicke in unsere flexiblen Remote-Optionen, modernste
                  Apple-Hardware-Ausstattung und kontinuierliche Weiterbildungsförderung.
                </p>
                <p>
                  Unsere Projekte decken ein breites Spektrum ab – von anspruchsvollen
                  Unternehmensauftritten für mittelständische Betriebe bis hin zu performanten
                  Webapplikationen. Wir setzen konsequent auf moderne Tech-Stacks mit React,
                  Next.js, TypeScript und barrierefreiem Design. Egal, ob Sie sich für{' '}
                  <Link
                    href="/services/web-development"
                    className="text-primary-700 underline font-semibold"
                  >
                    moderne Webentwicklung
                  </Link>
                  , nutzerzentriertes{' '}
                  <Link
                    href="/services/design/ui-ux"
                    className="text-primary-700 underline font-semibold"
                  >
                    UI/UX Design
                  </Link>{' '}
                  oder datengetriebene{' '}
                  <Link href="/services/seo" className="text-primary-700 underline font-semibold">
                    Suchmaschinenoptimierung (SEO)
                  </Link>{' '}
                  begeistern: Bei uns gestalten Sie digitale Erlebnisse nach den höchsten Standards
                  der Branche.
                </p>
                <p>
                  Entdecken Sie unsere aktuellen Stellenausschreibungen oben, besuchen Sie unsere{' '}
                  <Link href="/career" className="text-primary-700 underline font-semibold">
                    Karriere-Hauptseite
                  </Link>{' '}
                  oder senden Sie uns Ihre Initiativbewerbung über unser{' '}
                  <Link href="/contact" className="text-primary-700 underline font-semibold">
                    Kontaktformular
                  </Link>
                  . Wir freuen uns auf den Austausch mit Ihnen!
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
