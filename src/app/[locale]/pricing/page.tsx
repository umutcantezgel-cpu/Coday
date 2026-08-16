import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
import Packages from '@/features/pricing/ui/Packages';
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
      title: 'Web Design Pricing & Custom Quotes | Coday Web Agency',
      description:
        'Fixed-price quotes for high-end web design & Next.js development. Ultra-fast load times, 100/100 PageSpeed and full code ownership.',
      path: '/en/pricing',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Preise & Angebote auf Anfrage | Coday Webagentur',
    description:
      'Verbindliche Festpreise für High-End Webdesign & Next.js Entwicklung. Schnelle Ladezeiten, 100/100 PageSpeed und 100% Code-Eigentum.',
    path: '/de/pricing',
    type: 'money',
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'OfferCatalog',
        '@id': `${BASE_URL}/${_locale}/pricing#catalog`,
        name:
          _locale === 'en'
            ? 'Web Design & Next.js Development Packages Coday'
            : 'Webdesign & Next.js Entwicklungs-Pakete Coday Webagentur',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Starter Webdesign / Local Authority',
            description:
              'Maßgeschneiderte Next.js Website für Handwerker und lokale Dienstleister mit 100/100 Core Web Vitals.',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Business Enterprise / B2B Power',
            description:
              'Hochmoderne B2B-Plattform mit Sanity Headless CMS, 60s Recruiting-Funnel und subsekundären Ladezeiten.',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Custom Web Application & E-Commerce',
            description:
              'Individuelle Next.js Web-Apps, Kundenportale und Headless Online-Shops mit API- und ERP-Anbindung.',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/${_locale}/pricing#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie setzen sich die Preise zusammen, wenn keine festen Pauschalen angegeben sind?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Jedes Unternehmen hat individuelle Anforderungen und Ziele. In einer kostenlosen Erstberatung analysieren wir Ihren Bedarf, wählen gemeinsam die benötigten Module aus und erstellen ein verbindliches Festpreisangebot. Sie zahlen ausschließlich für Features, die messbaren Mehrwert stiften.',
            },
          },
          {
            '@type': 'Question',
            name: 'Warum ist Coday 5 bis 10 Mal günstiger als traditionelle Werbeagenturen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir verzichten bewusst auf administrative Wasserköpfe, Sales-Zwischenhändler und teure Prestige-Büros. Durch unsere hochmoderne Next.js 15 Architektur und modernste KI-gestützte Entwicklungsworkflows setzt Inhaber Umutcan Emre Tezgel Projekte schneller und präziser um als traditionelle Fünf-Personen-Teams.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie sind die Zahlungsmodalitäten geregelt?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel teilen wir die Investition in zwei faire Meilensteine: 50% Anzahlung bei Projektstart und 50% erst nach erfolgreichem Launch und Ihrer vollständigen Freigabe.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        id="schema-pricing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Packages />
    </>
  );
}
