import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import {
  BASE_URL,
  getOrganizationSchema,
  getBreadcrumbSchema,
  getPricingSchema,
} from '@/lib/schema';
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
      keywords: [
        'Web Design Pricing',
        'Website Costs Wetzlar',
        'Fixed Price Web Development',
        'Website Relaunch Cost',
        'Coday Web Pricing',
      ],
      path: '/en/pricing',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Preise & Angebote auf Anfrage | Coday Webagentur',
    description:
      'Verbindliche Festpreise für High-End Webdesign & Next.js Entwicklung. Schnelle Ladezeiten, 100/100 PageSpeed und 100% Code-Eigentum.',
    keywords: [
      'Webdesign Preise',
      'Website Kosten Wetzlar',
      'Festpreis Webentwicklung',
      'Website Relaunch Preis',
      'Coday Web Preise',
    ],
    path: '/de/pricing',
    type: 'money',
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);

  const breadcrumbs = getBreadcrumbSchema([
    { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: _locale === 'en' ? 'Pricing' : 'Preise', url: `/${_locale}/pricing` },
  ]);

  const pricingFaq = {
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/${_locale}/pricing#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wie setzen sich die Preise zusammen, wenn keine festen Pauschalen angegeben sind?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jedes Unternehmen hat individuelle Anforderungen und Ziele. In einer kostenlosen Erstberatung analysieren wir Ihren Bedarf, wählen gemeinsam die benötigten Module aus und erstellen ein verbindliches Festpreisangebot ab 2.000 Euro. Sie zahlen ausschließlich für Features, die messbaren Mehrwert stiften.',
        },
      },
      {
        '@type': 'Question',
        name: 'Warum ist Coday günstiger und schneller als traditionelle Werbeagenturen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wir verzichten bewusst auf administrative Wasserköpfe, Sales-Zwischenhändler und teure Prestige-Büros. Durch unsere hochmoderne Next.js 15 Architektur setzt Inhaber Umutcan Emre Tezgel Projekte schneller und präziser um als traditionelle Fünf-Personen-Teams.',
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
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(_locale), breadcrumbs, getPricingSchema(_locale), pricingFaq],
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
