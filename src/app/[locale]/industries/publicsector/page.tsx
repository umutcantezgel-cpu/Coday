import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/PublicSectorClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Public Sector | Hesse Germany',
      description:
        'Accessible and GDPR-compliant websites for municipalities and authorities in Hesse. Secure web development by Coday from Wetzlar. Get in touch today.',
      path: '/en/industries/publicsector',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Öffentlichen Sektor | Hessen',
    description:
      'Barrierefreie und DSGVO-konforme Webseiten für Kommunen und Behörden in Hessen. Sichere Webentwicklung von Coday aus Wetzlar. Jetzt Kontakt aufnehmen.',
    path: '/de/industries/publicsector',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Public Sector | Hesse Germany | Coday'
      : 'Webdesign für Öffentlichen Sektor | Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Accessible and GDPR-compliant websites for municipalities and authorities in Hesse. Secure web development by Coday from Wetzlar. Get in touch today.'
      : 'Barrierefreie und DSGVO-konforme Webseiten für Kommunen und Behörden in Hessen. Sichere Webentwicklung von Coday aus Wetzlar. Jetzt Kontakt aufnehmen.';
  return (
    <>
      <SeoHead
        title="Coday | publicsector"
        description="Erfahren Sie mehr über publicsector"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Webdesign für den Öffentlichen Sektor in Hessen
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Die Digitalisierung des öffentlichen Sektors ist eine der wichtigsten Aufgaben unserer
            Zeit. Behörden, Kommunen und staatliche Einrichtungen in Hessen und ganz Deutschland
            stehen vor der Herausforderung, ihre Dienstleistungen bürgernah, barrierefrei und
            digital zugänglich zu machen. Als erfahrene Webdesign Agentur aus Wetzlar ist Coday Ihr
            verlässlicher Partner für die Entwicklung moderner, sicherer und DSGVO-konformer
            Web-Lösungen für den Public Sector. Wir wissen, dass im öffentlichen Dienst besondere
            Anforderungen an Datenschutz, Datensicherheit und Barrierefreiheit (gemäß BITV 2.0 und
            WCAG) gestellt werden.
          </p>
          <p>
            Unsere maßgeschneiderten Websites und Portale stellen sicher, dass alle Bürgerinnen und
            Bürger uneingeschränkten Zugang zu wichtigen Informationen und digitalen
            Verwaltungsleistungen haben. Von der Konzeption über das Design bis hin zur technischen
            Umsetzung und langfristigen Wartung bieten wir alles aus einer Hand. Wir entwickeln
            intuitive Benutzeroberflächen, die komplexe Verwaltungsprozesse vereinfachen und die
            Effizienz in den Behörden steigern. Dabei setzen wir auf moderne, skalierbare
            Technologien wie React, Next.js und sichere Headless-CMS-Systeme, die höchste
            Performance und Ausfallsicherheit garantieren. Ein weiterer entscheidender Faktor ist
            die responsive Gestaltung, sodass Ihre digitalen Angebote auf allen Endgeräten optimal
            nutzbar sind.
          </p>
          <p>
            Darüber hinaus unterstützen wir Sie bei der Integration von Fachanwendungen und
            Online-Diensten, um den Weg zum digitalen Rathaus oder zur digitalen Kreisverwaltung
            erfolgreich zu meistern. Vertrauen Sie auf unsere Expertise und unsere strengen
            Sicherheitsstandards. Wir begleiten Sie als strategischer Partner bei der digitalen
            Transformation, beraten Sie transparent und setzen Ihre Projekte termingerecht und
            budgettreu um. Die Digitalisierung der Verwaltung bietet enorme Chancen für mehr
            Transparenz, Servicequalität und Bürgernähe. Lassen Sie uns gemeinsam den öffentlichen
            Sektor fit für die digitale Zukunft machen.
          </p>
          <p>
            Kontaktieren Sie uns für eine umfassende Beratung und erfahren Sie, wie wir Ihre
            kommunalen Webprojekte erfolgreich umsetzen können. Coday ist Ihre Agentur für
            zukunftssichere digitale Lösungen im öffentlichen Dienst in Hessen und darüber hinaus.
            Mit maßgeschneiderten, zukunftsweisenden Technologien sichern wir ab, dass Ihre digitale
            Infrastruktur auch kommenden Anforderungen und gesetzlichen Änderungen problemlos
            standhält. Setzen Sie auf eine vertrauensvolle Zusammenarbeit und gestalten Sie mit uns
            die digitale Zukunft Ihrer Behörde oder Kommune.
          </p>
        </div>
      </section>
    </>
  );
}
