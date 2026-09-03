import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactClient } from '@/features/contact/ui/ContactClient';
import { BASE_URL, ORG_ID, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

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

  const pageUrl = `${BASE_URL}/${_locale}/contact`;
  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: isEn ? 'Contact' : 'Kontakt', url: `/${_locale}/contact` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // The Organization node itself is emitted by the root layout; here it is only referenced.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Contact & Free Website Audit | Coday Web Agency'
          : 'Kontakt & Kostenloses Website-Audit | Coday Webagentur',
        description: isEn
          ? 'Direct contact to Lead Architect Umutcan Emre Tezgel for high-end web development projects.'
          : 'Direkter Kontakt zu Lead-Architekt Umutcan Emre Tezgel für anspruchsvolle Webprojekte.',
        locale: _locale,
        type: 'ContactPage',
        // `about`, not `mainEntity`: the home page is the one URL answerable for
        // the organisation. Two pages naming #organization as their mainEntity is
        // exactly the ambiguity this slice exists to remove — and the canonical
        // node is still referenced by @id rather than a duplicated NAP entity.
        aboutId: ORG_ID,
      }),
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
