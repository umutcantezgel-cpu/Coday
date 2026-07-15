import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/RetailClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Retail | Wetzlar & Hesse Region',
      description:
        'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday Wetzlar.',
      path: '/en/industries/retail',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Einzelhandel | Wetzlar & Hessen',
    description:
      'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.',
    path: '/de/industries/retail',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Retail | Wetzlar & Hesse Region | Coday'
      : 'Webdesign für Einzelhandel | Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday Wetzlar.'
      : 'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.';
  return (
    <>
      <SeoHead
        title="Coday | retail"
        description="Erfahren Sie mehr über retail"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Content */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Professionelles Webdesign für den Einzelhandel in Wetzlar und Hessen
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Im heutigen digitalen Zeitalter ist eine starke Online-Präsenz für den Einzelhandel
            unerlässlich. Coday, Ihre Experten-Agentur für Webdesign in Wetzlar und der Region
            Hessen, bietet maßgeschneiderte Lösungen, die speziell auf die Bedürfnisse von
            Einzelhändlern zugeschnitten sind. Egal, ob Sie ein lokales Geschäft in der Wetzlarer
            Altstadt betreiben oder als mittelständisches Unternehmen Ihre Reichweite in ganz Hessen
            und darüber hinaus ausbauen möchten – wir entwickeln Onlineshops und Webseiten, die Ihre
            Marke perfekt in Szene setzen und nachweislich Ihren Umsatz steigern. Ein ansprechendes
            Design, gepaart mit einer intuitiven Benutzerführung (UX) und modernster Technologie,
            bildet das Fundament für Ihren digitalen Erfolg.
          </p>
          <p>
            Ein erfolgreicher Onlineshop für den Einzelhandel muss mehr können, als nur Produkte
            anzuzeigen. Er muss Vertrauen aufbauen, die Markenidentität stärken und den Kaufprozess
            so reibungslos wie möglich gestalten. Wir von Coday verstehen diese Anforderungen bis
            ins kleinste Detail. Unsere E-Commerce-Lösungen sind nicht nur optisch ansprechend,
            sondern auch technisch auf dem neuesten Stand. Wir setzen auf performante Systeme wie
            Headless CMS und moderne Frontend-Frameworks wie Next.js, um blitzschnelle Ladezeiten
            und eine exzellente Performance auf allen Endgeräten zu gewährleisten. Besonders die
            mobile Optimierung (Mobile First) spielt heute eine entscheidende Rolle, da immer mehr
            Kunden über ihr Smartphone einkaufen.
          </p>
          <p>
            Darüber hinaus legen wir großen Wert auf Suchmaschinenoptimierung (SEO). Eine
            wunderschöne Webseite nützt wenig, wenn sie von potenziellen Kunden nicht gefunden wird.
            Durch gezielte SEO-Strategien, lokale Optimierung für Wetzlar und Hessen sowie
            durchdachte Content-Konzepte sorgen wir dafür, dass Ihr Einzelhandelsgeschäft bei Google
            & Co. ganz weit oben steht. Wir integrieren leistungsstarke Analysetools, damit Sie das
            Verhalten Ihrer Kunden besser verstehen und Ihre Marketingmaßnahmen kontinuierlich
            optimieren können. Von der Konzeption über das Webdesign bis hin zur technischen
            Umsetzung und der anschließenden Betreuung – Coday ist Ihr verlässlicher Partner für die
            digitale Transformation Ihres Einzelhandels.
          </p>
          <p>
            Lassen Sie uns gemeinsam die Brücke zwischen dem stationären Handel und der digitalen
            Welt schlagen. Mit innovativen Konzepten wie Click & Collect, nahtlosen
            Kassensystem-Integrationen und personalisierten Einkaufserlebnissen verschaffen wir
            Ihnen einen entscheidenden Wettbewerbsvorteil. Der Einzelhandel befindet sich im Wandel,
            und wer jetzt in professionelles Webdesign und durchdachte E-Commerce-Lösungen
            investiert, sichert sich den Erfolg von morgen. Kontaktieren Sie uns noch heute für ein
            unverbindliches Beratungsgespräch und erfahren Sie, wie wir Ihr Geschäft in Wetzlar und
            ganz Hessen digital voranbringen können. Wir freuen uns auf Ihr Projekt!
          </p>
        </div>
      </section>
    </>
  );
}
