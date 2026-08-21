import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
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
      title: 'Privacy Policy | Web Design Agency Wetzlar Hesse',
      description:
        'Privacy policy of Coday, your web design agency in Wetzlar. GDPR-compliant data processing and your rights. Full transparency and data security.',
      keywords: ['Coday Privacy Policy', 'GDPR Compliance Coday', 'Data Protection Web Agency'],
      path: '/en/legal/datenschutz',
      type: 'legal',
    });
  }
  return generatePageMetadata({
    title: 'Datenschutzerklärung | Webdesign Agentur Wetzlar',
    description:
      'Datenschutzerklärung von Coday, Ihrer Webdesign Agentur in Wetzlar. DSGVO-konforme Datenverarbeitung und Ihre Rechte. Transparenz und Sicherheit.',
    keywords: [
      'Coday Datenschutzerklärung',
      'Datenschutz Webagentur Wetzlar',
      'DSGVO Konformität Coday',
    ],
    path: '/de/legal/datenschutz',
    type: 'legal',
  });
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    {
      name: isEn ? 'Privacy Policy' : 'Datenschutzerklärung',
      url: `/${_locale}/legal/datenschutz`,
    },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${_locale}/legal/datenschutz#webpage`,
        name: isEn ? 'Privacy Policy' : 'Datenschutzerklärung',
        url: `${BASE_URL}/${_locale}/legal/datenschutz`,
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
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-16 md:pt-6 md:pb-20">
        <h1 className="text-3xl font-bold mb-8 text-secondary-900">
          {isEn ? 'Privacy Policy' : 'Datenschutzerklärung'}
        </h1>
        <section className="py-[var(--space-section)] space-y-6 text-secondary-800">
          <h2 className="text-xl font-semibold text-secondary-900">
            {isEn ? '1. Data Controller' : '1. Verantwortlicher'}
          </h2>
          <p>
            Umutcan Emre Tezgel
            <br />
            Coday · Einzelunternehmen
            <br />
            Lessingstraße 4, 35578 Wetzlar
            <br />
            E-Mail: kontakt@codayweb.de
          </p>

          <h2 className="text-xl font-semibold text-secondary-900">
            {isEn ? '2. Your Rights under GDPR' : '2. Ihre Rechte nach DSGVO'}
          </h2>
          <p>
            {isEn
              ? 'You have the right to access, rectification, erasure, restriction of processing, data portability, and objection (Art. 15-21 GDPR).'
              : 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15-21 DSGVO).'}
          </p>

          <h2 className="text-xl font-semibold text-secondary-900">
            {isEn ? '3. Hosting' : '3. Hosting'}
          </h2>
          <p>
            {isEn
              ? 'This website is hosted on Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel processes server logs (IP address, browser, timestamp) to ensure operation.'
              : 'Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Vercel verarbeitet Server-Logdaten (IP-Adresse, Browser, Zeitstempel) zur Sicherstellung des Betriebs.'}
          </p>

          <p className="text-sm text-secondary-600 mt-12">
            {isEn ? 'Last updated: May 2026' : 'Stand: Mai 2026'}
          </p>
        </section>
      </div>
    </>
  );
}
