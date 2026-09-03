import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, ORG_ID, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import ClientComponent from '@/features/career/ui/CultureClient';
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
      title: 'Philosophy & Work Culture | Coday Web Agency Wetzlar',
      description:
        '100% founder-led web design & Next.js development from Wetzlar, Hesse. Radical transparency, AI-augmented engineering & uncompromising performance.',
      path: '/en/career/culture',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Unsere Philosophie & Arbeitskultur | Webdesign Wetzlar | Coday',
    description:
      '100% Inhabergeführtes Webdesign & Next.js Entwicklung aus Wetzlar, Hessen. Transparenz, KI-gestütztes Handwerk & kompromisslose Performance.',
    path: '/de/career/culture',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  setRequestLocale(locale);
  const isEn = locale === 'en';

  const pageUrl = `${BASE_URL}/${locale}/career/culture`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${locale}` },
      { name: isEn ? 'Career' : 'Karriere', url: `/${locale}/career` },
      {
        name: isEn ? 'Culture & Philosophy' : 'Kultur & Philosophie',
        url: `/${locale}/career/culture`,
      },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // Referenced by @id only — the root layout is what renders the Organization node.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Our Philosophy & Work Culture | Web Design Wetzlar | Coday'
          : 'Unsere Philosophie & Arbeitskultur | Webdesign Wetzlar | Coday',
        description: isEn
          ? '100% founder-led web design & Next.js development from Wetzlar, Hesse. Radical transparency, AI-augmented engineering & uncompromising performance.'
          : '100% Inhabergeführtes Webdesign & Next.js Entwicklung aus Wetzlar, Hessen. Transparenz, KI-gestütztes Handwerk & kompromisslose Performance.',
        locale,
        type: 'AboutPage',
        // Restores the edge the hand-written node carried: the page describes the
        // company without claiming to be the page that owns it.
        aboutId: ORG_ID,
      }),
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
                Our Work Culture: Where High-End Web Engineering Meets Regional Reliability
              </h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-700">
                <p>
                  Choosing the right web design partner is a pivotal decision for your digital
                  growth. Traditional agencies frequently sell clients on senior consultants and
                  pitch decks, only to delegate actual execution to rotating junior developers. At{' '}
                  <strong className="text-slate-900 font-semibold">Coday in Wetzlar</strong>, we
                  operate on the opposite principle: direct founder engagement, radical
                  transparency, and AI-augmented craftsmanship that delivers enterprise-grade web
                  applications with zero bureaucracy.
                </p>
                <p>
                  Our work culture is rooted in deep technical competence and personal
                  accountability. When you partner with Coday for{' '}
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="text-primary-700 underline font-semibold"
                  >
                    Web Design in Wetzlar, Giessen, and Hesse
                  </Link>
                  , every design token, Next.js route, and SEO schema is engineered directly by
                  founder Umutcan Emre Tezgel. This eliminates communication loss and ensures that
                  your strategic business goals are directly translated into high-converting digital
                  infrastructure.
                </p>
                <p>
                  By leveraging state-of-the-art AI-augmented workflows and full-stack Next.js App
                  Router architectures, we achieve what traditional agencies struggle with: flawless
                  Core Web Vitals (100/100 Google PageSpeed score), rock-solid accessibility (WCAG /
                  BITV compliance), and rapid turnaround times without quality compromises. For
                  specialized requirements such as custom 3D visuals or legal certifications, we
                  integrate vetted specialists from our curated network across the DACH region.
                </p>
                <p>
                  Whether you are looking to collaborate with us on our{' '}
                  <Link href="/career/jobs" className="text-primary-700 underline font-semibold">
                    open job positions
                  </Link>
                  , explore our{' '}
                  <Link
                    href="/career/benefits"
                    className="text-primary-700 underline font-semibold"
                  >
                    remote-first employee benefits
                  </Link>
                  , or partner with us via our{' '}
                  <Link href="/contact" className="text-primary-700 underline font-semibold">
                    contact inquiry
                  </Link>
                  : Honest collaboration, guaranteed fixed pricing, and clean engineering define the
                  Coday philosophy.
                </p>
              </div>

              {/* Career Hub Navigation */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4 mt-12">
                <h3 className="text-xl font-bold text-slate-900">
                  Explore Opportunities & Working with Coday
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  Discover more about our open roles, engineering standards, and developer perks:
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/career/jobs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 text-white font-bold hover:bg-primary-800 transition-colors shadow-sm text-sm"
                  >
                    View Open Positions →
                  </Link>
                  <Link
                    href="/career/benefits"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Benefits & Perks →
                  </Link>
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Career Hub Overview →
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-8 tracking-tight">
                Unsere Agenturkultur: Wo Inhaberführung auf modernste Webtechnologie trifft
              </h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-700">
                <p>
                  Die Wahl des richtigen Webdesign-Partners ist eine entscheidende Weichenstellung
                  für Ihren geschäftlichen Erfolg im Internet. Klassische Großagenturen verkaufen
                  oft im Erstgespräch mit erfahrenen Seniors und übergeben die eigentliche
                  Programmierung anschließend an wechselnde Junior-Entwickler oder externe
                  Subunternehmen. Bei{' '}
                  <strong className="text-slate-900 font-semibold">Coday in Wetzlar</strong> setzen
                  wir auf direkte Inhaberbetreuung, verbindliche Transparenz und modernste
                  Next.js-Entwicklung ohne bürokratische Umwege.
                </p>
                <p>
                  Unsere Arbeitskultur basiert auf echter handwerklicher Präzision und direkter
                  Verantwortung. Wenn Sie mit Coday ein Projekt für{' '}
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="text-primary-700 underline font-semibold"
                  >
                    Webdesign in Wetzlar, Gießen und ganz Hessen
                  </Link>{' '}
                  starten, wird jede Zeile TypeScript, jede UI-Komponente und jede SEO-Struktur
                  direkt von Gründer & Lead Developer Umutcan Emre Tezgel umgesetzt. Sie sprechen
                  ohne Stille-Post-Effekt immer mit dem Experten, der Ihre Website baut.
                </p>
                <p>
                  Durch den gezielten Einsatz hochmoderner KI-Toolchains und zukunftsfähiger Next.js
                  App Router Architekturen erreichen wir außergewöhnliche Ergebnisse: perfekte Core
                  Web Vitals (100/100 PageSpeed-Score), lückenlose Barrierefreiheit nach BITV /
                  WCAG-Standards und Ladezeiten im Sub-Sekunden-Bereich. Für sehr spezifische
                  Fachanforderungen wie individuelle 3D-Modelle oder komplexe Rechtsprüfungen
                  greifen wir auf ein erprobtes, handverlesenes Spezialisten-Netzwerk im
                  deutschsprachigen Raum zurück.
                </p>
                <p>
                  Ganz gleich, ob Sie als Entwickler über unsere{' '}
                  <Link href="/career/jobs" className="text-primary-700 underline font-semibold">
                    offenen Stellen
                  </Link>{' '}
                  zu uns stoßen, unsere{' '}
                  <Link
                    href="/career/benefits"
                    className="text-primary-700 underline font-semibold"
                  >
                    Mitarbeiter-Benefits
                  </Link>{' '}
                  kennenlernen möchten oder als Unternehmen eine Anfrage über unser{' '}
                  <Link href="/contact" className="text-primary-700 underline font-semibold">
                    Kontaktformular
                  </Link>{' '}
                  stellen: Wir schaffen digitale Flaggschiffe, die Vertrauen aufbauen und messbar
                  performen.
                </p>
              </div>

              {/* Career Hub Navigation */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4 mt-12">
                <h3 className="text-xl font-bold text-slate-900">
                  Mehr über Karriere & Einstieg bei Coday erfahren
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  Entdecken Sie alle Möglichkeiten der Zusammenarbeit und unsere
                  Entwickler-Vorteile:
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/career/jobs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 text-white font-bold hover:bg-primary-800 transition-colors shadow-sm text-sm"
                  >
                    Offene Stellen ansehen →
                  </Link>
                  <Link
                    href="/career/benefits"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Benefits & Arbeitsmodell →
                  </Link>
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Karriere-Hauptseite →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
