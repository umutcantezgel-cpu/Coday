import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/ImmobilienClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Real Estate | Wetzlar Hesse Area',
      description:
        'Premium websites for real estate agents in Wetzlar and Hesse. Property listings, search features and lead generation through modern design. Inquire.',
      path: '/en/industries/immobilien',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Immobilienmakler | Raum Wetzlar',
    description:
      'Hochwertige Webseiten für Immobilienmakler in Wetzlar und Hessen. Exposés, Objektsuche und Lead-Generierung durch modernes Webdesign. Jetzt anfragen.',
    path: '/de/industries/immobilien',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Real Estate | Wetzlar Hesse Area | Coday'
      : 'Webdesign für Immobilienmakler | Raum Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Premium websites for real estate agents in Wetzlar and Hesse. Property listings, search features and lead generation through modern design. Inquire.'
      : 'Hochwertige Webseiten für Immobilienmakler in Wetzlar und Hessen. Exposés, Objektsuche und Lead-Generierung durch modernes Webdesign. Jetzt anfragen.';
  return (
    <>
      <SeoHead
        title="Coday | immobilien"
        description="Erfahren Sie mehr über immobilien"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Premium Webdesign für Immobilienmakler: Digitales Vertrauen schaffen
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            In der Immobilienbranche ist Vertrauen die wichtigste Währung. Potenzielle Käufer,
            Verkäufer und Mieter treffen finanzielle Entscheidungen von enormer Tragweite, weshalb
            der erste Eindruck eines Immobilienmaklers absolut makellos sein muss. Ein hochwertiges,
            professionelles Webdesign für Immobilienmakler ist nicht nur eine digitale Visitenkarte,
            sondern das zentrale Werkzeug zur Lead-Generierung und Kundenbindung. Eine moderne
            Webseite vermittelt Seriosität, Marktkenntnis und Zuverlässigkeit. Wenn ein potenzieller
            Kunde eine Immobilie sucht oder verkaufen möchte, beginnt die Recherche fast immer
            online. Eine langsame, veraltete oder unübersichtliche Webseite führt unweigerlich zu
            einem Vertrauensverlust und dem direkten Wechsel zur Konkurrenz.
          </p>
          <p>
            Ein herausragendes Immobilien-Webdesign zeichnet sich durch intuitive Navigation,
            exzellente visuelle Darstellung und leistungsstarke Suchfunktionen aus. Exposés müssen
            nicht nur informativ, sondern auch emotional ansprechend präsentiert werden.
            Hochauflösende Bilder, virtuelle 360-Grad-Rundgänge, detaillierte Grundrisse und klare
            Beschreibungen sind unerlässlich, um das Interesse der Nutzer zu wecken. Darüber hinaus
            ist eine nahtlose Integration von Immobilien-Management-Systemen (Maklersoftware) von
            großer Bedeutung, um den Verwaltungsaufwand zu minimieren und Angebote in Echtzeit zu
            aktualisieren. Gleichzeitig muss die Webseite für mobile Endgeräte optimiert sein, da
            ein Großteil der Immobiliensuchen heutzutage über Smartphones und Tablets erfolgt. Ein
            responsives Design stellt sicher, dass die Nutzererfahrung auf allen Geräten perfekt
            ist.
          </p>
          <p>
            Darüber hinaus spielt die lokale Suchmaschinenoptimierung (Local SEO) eine entscheidende
            Rolle für den Erfolg eines Immobilienmaklers. Wer in Wetzlar, Gießen oder Frankfurt nach
            einer Immobilie sucht, nutzt ortsbezogene Suchbegriffe. Durch gezielte SEO-Maßnahmen,
            strukturierte Daten und performance-optimierten Code stellen wir sicher, dass Ihre
            Makler-Webseite in den lokalen Google-Suchergebnissen ganz oben rankt. Wir bei Coday
            entwickeln maßgeschneiderte, hochkonvertierende Webseiten für Immobilienmakler, die
            nicht nur durch ein atemberaubendes Design überzeugen, sondern auch messbar mehr
            Anfragen generieren. Setzen Sie auf digitale Exzellenz, um sich als Top-Makler in Ihrer
            Region zu etablieren und Ihre Immobilien erfolgreich zu vermarkten.
          </p>
        </div>
      </section>
    </>
  );
}
