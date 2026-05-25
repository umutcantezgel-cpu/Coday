import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Privacy Policy',
      description: 'Privacy policy for codayweb.de — how we handle your data in compliance with GDPR.',
      path: '/en/legal/datenschutz',
      type: 'legal',
    });
  }
  return generatePageMetadata({
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung von codayweb.de — DSGVO-konforme Datenverarbeitung und Ihre Rechte.',
    path: '/de/legal/datenschutz',
    type: 'legal',
  });
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">
        {isEn ? 'Privacy Policy' : 'Datenschutzerklärung'}
      </h1>
      <section className="py-[var(--space-section)] space-y-6 text-gray-300">
        <h2 className="text-xl font-semibold text-white">
          {isEn ? '1. Data Controller' : '1. Verantwortlicher'}
        </h2>
        <p>
          Umutcan Emre Tezgel<br />
          Coday · Einzelunternehmen<br />
          Lessingstraße 4, 35578 Wetzlar<br />
          E-Mail: umut@codayweb.de
        </p>

        <h2 className="text-xl font-semibold text-white">
          {isEn ? '2. Your Rights under GDPR' : '2. Ihre Rechte nach DSGVO'}
        </h2>
        <p>
          {isEn
            ? 'You have the right to access, rectification, erasure, restriction of processing, data portability, and objection (Art. 15-21 GDPR).'
            : 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15-21 DSGVO).'}
        </p>

        <h2 className="text-xl font-semibold text-white">
          {isEn ? '3. Hosting' : '3. Hosting'}
        </h2>
        <p>
          {isEn
            ? 'This website is hosted on Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel processes server logs (IP address, browser, timestamp) to ensure operation.'
            : 'Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Vercel verarbeitet Server-Logdaten (IP-Adresse, Browser, Zeitstempel) zur Sicherstellung des Betriebs.'}
        </p>

        <p className="text-sm text-gray-500 mt-12">
          {isEn ? 'Last updated: May 2026' : 'Stand: Mai 2026'}
        </p>
      </section>
    </main>
  );
}
