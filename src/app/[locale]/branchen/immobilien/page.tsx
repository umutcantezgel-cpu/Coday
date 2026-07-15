import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import ImmobilienClient from '@/features/industries/ui/ImmobilienClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Real Estate Agents | Wetzlar Hesse',
      description:
        'Web development for real estate agents in Wetzlar and Hesse. Impress clients with excellent property listings and targeted online lead generation.',
      path: '/en/branchen/immobilien',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Immobilienmakler | Wetzlar Hessen',
    description:
      'Webentwicklung für Immobilienmakler in Wetzlar und ganz Hessen. Überzeugen Sie mit exzellenten Exposés und zielgerichteter Lead-Generierung online.',
    path: '/de/branchen/immobilien',
    type: 'money',
  });
}

export default async function ImmobilienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Real Estate Agents | Wetzlar Hesse | Coday'
      : 'Webdesign für Immobilienmakler | Wetzlar Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Premium websites for real estate agents in Wetzlar and Hesse. Property listings, search features and lead generation through modern design. Inquire.'
      : 'Hochwertige Webseiten für Immobilienmakler in Wetzlar und Hessen. Exposés, Objektsuche und Lead-Generierung durch modernes Webdesign. Jetzt anfragen.';
  return (
    <>
      <script
        id="schema-branchen-immobilien"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/branchen/immobilien`,
              }),
            ],
          }),
        }}
      />
      <ImmobilienClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Professionelles Webdesign für Immobilienmakler
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            In der heutigen wettbewerbsintensiven Immobilienbranche ist eine professionelle und
            leistungsstarke Website unerlässlich. Immobilienmakler, Hausverwaltungen und Bauträger
            in Wetzlar, Hessen und im gesamten Bundesgebiet müssen online überzeugen, um wertvolle
            Leads zu generieren und Vertrauen bei potenziellen Käufern, Verkäufern und Mietern
            aufzubauen. Coday bietet Ihnen als spezialisierte Webdesign Agentur maßgeschneiderte
            digitale Lösungen für den Immobilienmarkt. Wir entwickeln hochperformante, ansprechende
            und conversion-optimierte Webseiten, die Ihre Immobilienangebote perfekt in Szene
            setzen.
          </p>
          <p>
            Ein durchdachtes UX/UI-Design sorgt dafür, dass Besucher schnell und intuitiv die
            passenden Objekte finden. Durch die Integration von intelligenten Such- und
            Filterfunktionen, interaktiven Karten, virtuellen 360-Grad-Rundgängen und hochwertigen
            Bildergalerien schaffen wir ein immersives Nutzererlebnis. Wir wissen, dass Immobilien
            emotional verkauft werden – deshalb legen wir größten Wert auf eine ästhetische und
            markengerechte Präsentation Ihres Portfolios. Zudem binden wir Ihre Maklersoftware (z.B.
            FlowFact, onOffice, OpenEstate) nahtlos über moderne API-Schnittstellen an, sodass Ihre
            Objekte automatisch synchronisiert werden.
          </p>
          <p>
            Neben dem ansprechenden Design optimieren wir Ihre Immobilien-Website konsequent für
            Suchmaschinen (SEO), damit Sie bei relevanten Suchanfragen wie &quot;Immobilienmakler
            Wetzlar&quot; oder &quot;Haus kaufen Hessen&quot; auf den vorderen Plätzen bei Google
            ranken. Eine hohe Sichtbarkeit ist der Schlüssel zur Gewinnung von neuen
            Alleinaufträgen. Darüber hinaus integrieren wir smarte Lead-Generierungs-Tools wie
            interaktive Wertermittlungsrechner und benutzerfreundliche Kontaktformulare, die die
            Hemmschwelle zur Kontaktaufnahme signifikant senken.
          </p>
          <p>
            Sicherheit und Datenschutz (DSGVO) haben bei der Verarbeitung sensibler Kundendaten
            höchste Priorität. Profitieren Sie von unserer langjährigen Erfahrung in der
            Webentwicklung für die Immobilienwirtschaft. Wir begleiten Sie partnerschaftlich von der
            strategischen Planung über das Design und die technische Umsetzung bis hin zum Hosting
            und der kontinuierlichen Betreuung. Steigern Sie Ihre Bekanntheit, professionalisieren
            Sie Ihren digitalen Auftritt und sichern Sie sich einen entscheidenden
            Wettbewerbsvorteil. Kontaktieren Sie Coday noch heute, um Ihre individuelle
            Immobilien-Website erfolgreich zu realisieren.
          </p>
        </div>
      </section>
    </>
  );
}
