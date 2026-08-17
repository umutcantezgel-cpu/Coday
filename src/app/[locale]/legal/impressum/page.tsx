import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Legal Notice | Web Design Agency Wetzlar Hesse',
      description:
        'Legal notice and company information for Coday, web design agency in Wetzlar. Owner: Umutcan Emre Tezgel. Contact details and legal information.',
      path: '/en/legal/impressum',
      type: 'legal',
    });
  }
  return generatePageMetadata({
    title: 'Impressum | Webdesign Agentur Wetzlar Mittelhessen',
    description:
      'Impressum und Anbieterkennzeichnung von Coday, Webdesign Agentur in Wetzlar. Inhaber: Umutcan Emre Tezgel. Kontakt und rechtliche Informationen.',
    path: '/de/legal/impressum',
    type: 'legal',
  });
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Legal Notice | Web Design Agency Wetzlar Hesse | Coday'
      : 'Impressum | Webdesign Agentur Wetzlar Mittelhessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Legal notice and company information for Coday, web design agency in Wetzlar. Owner: Umutcan Emre Tezgel. Contact details and legal information.'
      : 'Impressum und Anbieterkennzeichnung von Coday, Webdesign Agentur in Wetzlar. Inhaber: Umutcan Emre Tezgel. Kontakt und rechtliche Informationen.';
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8 text-secondary-900">
          {isEn ? 'Legal Notice' : 'Impressum'}
        </h1>

        <section className="py-[var(--space-section)] space-y-4 text-secondary-800">
          <h2 className="text-xl font-semibold text-secondary-900">
            {isEn ? 'Information according to § 5 DDG' : 'Angaben gemäß § 5 DDG'}
          </h2>
          <p>
            Umutcan Emre Tezgel
            <br />
            Coday · Einzelunternehmen
            <br />
            Lessingstraße 4<br />
            35578 Wetzlar
            <br />
            Deutschland
          </p>

          <h2 className="text-xl font-semibold text-secondary-900 mt-8">
            {isEn ? 'Contact' : 'Kontakt'}
          </h2>
          <p>
            Telefon: +49 176 41195301
            <br />
            E-Mail: kontakt@codayweb.de
          </p>

          <h2 className="text-xl font-semibold text-secondary-900 mt-8">
            {isEn ? 'VAT Identification Number' : 'Umsatzsteuer-ID'}
          </h2>
          <p>
            {isEn
              ? 'VAT identification number according to § 27 a of the German Value Added Tax Act (UStG):'
              : 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:'}
            <br />
            <strong className="font-mono text-secondary-900 text-base">DE459754827</strong>
          </p>

          <h2 className="text-xl font-semibold text-secondary-900 mt-8">
            {isEn ? 'Responsible for Content' : 'Inhaltlich Verantwortlicher'}
          </h2>
          <p>
            {isEn
              ? 'Responsible for content according to § 18 Abs. 2 MStV:'
              : 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:'}
            <br />
            Umutcan Emre Tezgel
            <br />
            Lessingstraße 4<br />
            35578 Wetzlar
          </p>

          <h2 className="text-xl font-semibold text-secondary-900 mt-8">
            {isEn ? 'EU Dispute Resolution' : 'EU-Streitschlichtung'}
          </h2>
          <p>
            {isEn ? (
              <>
                The European Commission provides a platform for online dispute resolution (ODR):{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                .<br />
                Our e-mail address can be found above in the imprint.
              </>
            ) : (
              <>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                .<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </>
            )}
          </p>
        </section>
      </div>
    </>
  );
}
