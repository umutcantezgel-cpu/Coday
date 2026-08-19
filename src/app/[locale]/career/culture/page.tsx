import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import ClientComponent from '@/features/career/ui/CultureClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Philosophy & Work Culture | Web Design Wetzlar Hesse | Coday',
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(locale),
      {
        '@type': 'AboutPage',
        '@id': `${BASE_URL}/${locale}/career/culture`,
        url: `${BASE_URL}/${locale}/career/culture`,
        name: isEn
          ? 'Our Philosophy & Work Culture | Web Design Wetzlar | Coday'
          : 'Unsere Philosophie & Arbeitskultur | Webdesign Wetzlar | Coday',
        description: isEn
          ? '100% founder-led web design & Next.js development from Wetzlar, Hesse. Radical transparency, AI-augmented engineering & uncompromising performance.'
          : '100% Inhabergeführtes Webdesign & Next.js Entwicklung aus Wetzlar, Hessen. Transparenz, KI-gestütztes Handwerk & kompromisslose Performance.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#organization` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: isEn ? 'Home' : 'Startseite',
              item: `${BASE_URL}/${locale}`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: isEn ? 'Career' : 'Karriere',
              item: `${BASE_URL}/${locale}/career`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: isEn ? 'Culture & Philosophy' : 'Kultur & Philosophie',
              item: `${BASE_URL}/${locale}/career/culture`,
            },
          ],
        },
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
                  <strong className="text-slate-900 font-semibold">
                    Web Design in Wetzlar, Giessen, and Hesse
                  </strong>
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
                  Whether you are a mid-sized enterprise, an established craft business, or an
                  ambitious service provider in Hesse, our mission is to build digital platforms
                  that generate measurable inquiries and sustainable search engine authority. Honest
                  collaboration, guaranteed fixed pricing, and clean engineering — that is the Coday
                  philosophy.
                </p>
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
                  <strong className="text-slate-900 font-semibold">
                    Webdesign in Wetzlar, Gießen und ganz Hessen
                  </strong>{' '}
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
                  Ganz gleich, ob Sie als mittelständisches Unternehmen, renommierter
                  Handwerksbetrieb oder moderner Dienstleister in Mittelhessen und darüber hinaus
                  Ihre Online-Sichtbarkeit ausbauen wollen: Wir schaffen digitale Erlebnisse, die
                  Vertrauen aufbauen, qualifizierte Kundenanfragen generieren und bei Google
                  nachhaltig auf den vordersten Plätzen ranken.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
