import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactClient } from '@/features/contact/ui/ContactClient';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Contact Us & Free Website Audit | Coday Web Agency',
      description:
        'Get in touch with Coday Web Agency. Free 10-minute video audit for your website & strategy consultation. Request now!',
      keywords: [
        'Contact Web Agency Wetzlar',
        'Website Consultation Wetzlar',
        'Web Design Inquiry',
        'Free SEO Audit',
      ],
      path: '/en/contact',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Kontakt & Kostenloses Website-Audit | Coday Webagentur',
    description:
      'Nehmen Sie Kontakt mit der Coday Webagentur auf. Kostenloses 10-Minuten Video-Audit für Ihre Website & unverbindliches Strategiegespräch. Jetzt anfragen!',
    keywords: [
      'Kontakt Webagentur Wetzlar',
      'Webdesign Beratung Wetzlar',
      'Website anfragen',
      'Kostenloses Website Audit',
    ],
    path: '/de/contact',
    type: 'money',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Contact' : 'Kontakt', url: `/${_locale}/contact` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'ContactPage',
        '@id': `${BASE_URL}/${_locale}/contact#contactpage`,
        name: isEn
          ? 'Contact & Free Website Audit | Coday Web Agency'
          : 'Kontakt & Kostenloses Website-Audit | Coday Webagentur',
        description: isEn
          ? 'Direct contact to Lead Architect Umutcan Emre Tezgel for high-end web development projects.'
          : 'Direkter Kontakt zu Lead-Architekt Umutcan Emre Tezgel für anspruchsvolle Webprojekte.',
        mainEntity: {
          '@type': 'LocalBusiness',
          name: 'Coday Webagentur',
          url: BASE_URL,
          telephone: '+49-176-41195301',
          email: 'umut@codayweb.de',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Lessingstraße 4',
            addressLocality: 'Wetzlar',
            postalCode: '35578',
            addressRegion: 'Hessen',
            addressCountry: 'DE',
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        id="schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
