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
      title: 'Transparent Web Design Pricing & Plans | Coday Web Agency',
      description:
        'Transparent fixed pricing for high-end web design & Next.js development. No hidden fees, 100% source code ownership & measurable ROI. Calculate now!',
      path: '/en/pricing',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Transparente Webdesign Preise & Pakete | Coday Webagentur',
    description:
      'Transparente Festpreise für High-End Webdesign & Next.js Entwicklung. Keine versteckten Kosten, 100% Quellcode-Eigentum & messbarer ROI. Jetzt kalkulieren!',
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
        name: 'Transparente Webdesign Festpreise Coday Webagentur',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Starter Webdesign / Local Authority',
            description:
              'Maßgeschneiderte Next.js Website für Handwerker und lokale Dienstleister mit 100/100 Core Web Vitals.',
            price: '1900',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: '1900',
              priceCurrency: 'EUR',
              valueAddedTaxIncluded: false,
            },
          },
          {
            '@type': 'Offer',
            name: 'Business Enterprise / B2B Power',
            description:
              'Hochmoderne B2B-Plattform mit Sanity Headless CMS, 60s Recruiting-Funnel und subsekundären Ladezeiten.',
            price: '3800',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: '3800',
              priceCurrency: 'EUR',
              valueAddedTaxIncluded: false,
            },
          },
          {
            '@type': 'Offer',
            name: 'Custom Web Application & E-Commerce',
            description:
              'Individuelle Next.js Web-Apps, Kundenportale und Headless Online-Shops mit API- und ERP-Anbindung.',
            price: '6500',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: '6500',
              priceCurrency: 'EUR',
              valueAddedTaxIncluded: false,
            },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/${_locale}/pricing#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Gibt es bei Coday versteckte Folgekosten oder Abo-Fallen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nein. Wir arbeiten mit transparenten Festpreisen. Nach Projektabschluss gehört der gesamte Quellcode und das Design zu 100% Ihnen. Es gibt keine verpflichtenden Wartungs-Abos oder Lizenzgebühren.',
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
          {
            '@type': 'Question',
            name: 'Wie schnell ist meine neue Next.js Website online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Je nach Projektumfang dauert die Umsetzung zwischen 14 und 28 Werktagen ab Bereitstellung der Kerninformationen.',
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
