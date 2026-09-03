import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ClientComponent from '@/features/knowledge/ui/FAQClient';
import { getBreadcrumbSchema, getFaqSchema, getWebPageSchema, BASE_URL } from '@/lib/schema';
import { getFAQs } from '@/features/faq/model';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'FAQ | Web Design Agency Wetzlar Central Hesse | Coday',
      description:
        'Answers to frequently asked questions about web design, pricing and process at Coday in Wetzlar. Everything business owners in Hesse need to know.',
      keywords: [
        'Web Design FAQ',
        'Website Costs FAQ',
        'Web Development Questions',
        'Coday FAQ',
        'Web Agency Wetzlar',
      ],
      path: '/en/knowledge/faq',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Häufige Fragen (FAQ) | Webdesign Agentur Wetzlar | Coday',
    description:
      'Antworten auf häufige Fragen zu Webdesign, Preisen und Ablauf bei Coday in Wetzlar. Alles was Unternehmer in Mittelhessen wissen müssen. Jetzt lesen.',
    keywords: [
      'Webdesign FAQ',
      'Website Kosten FAQ',
      'Webentwicklung Fragen',
      'Coday FAQ',
      'Webdesign Agentur Wetzlar',
    ],
    path: '/de/knowledge/faq',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const faqs = getFAQs(_locale);
  const pageUrl = `${BASE_URL}/${_locale}/knowledge/faq`;
  const pageName = isEn
    ? 'FAQ | Web Design Agency Wetzlar Central Hesse'
    : 'Häufige Fragen (FAQ) | Webdesign Agentur Wetzlar';
  const pageDescription = isEn
    ? 'Answers to frequently asked questions about web design, pricing and process at Coday in Wetzlar. Everything business owners in Hesse need to know.'
    : 'Antworten auf häufige Fragen zu Webdesign, Preisen und Ablauf bei Coday in Wetzlar. Alles was Unternehmer in Mittelhessen wissen müssen. Jetzt lesen.';

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: 'Knowledge', url: `/${_locale}/knowledge/blog` },
      { name: 'FAQ', url: `/${_locale}/knowledge/faq` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // The root layout supplies the Organization node for every page, this one included.
    '@graph': [
      breadcrumbs,
      // No mainEntityId: getFaqSchema's FAQPage node carries no @id yet (a later
      // slice is expected to add one) so there is nothing here to point at.
      getWebPageSchema({
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        locale: _locale,
      }),
      getFaqSchema(faqs),
    ],
  };

  return (
    <>
      <script
        id="schema-faq-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              FAQ — Web Design Agency Wetzlar, Central Hesse
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Our FAQ page answers the most frequently asked questions about working with Coday, a
                specialist web design agency based in Wetzlar. Whether you run a craft business in
                Gießen, a restaurant in Marburg or a service company anywhere in Central Hesse, you
                will find clear, honest answers about our process, timelines and what you can expect
                from a professional website project. We created this resource because transparency
                is a core principle at Coday — no hidden fees, no vague promises, just
                straightforward information.
              </p>
              <p>
                Common questions we address include how long a typical web design project takes,
                what our pricing models look like and which technologies we use for development.
                Many business owners in Hesse wonder whether they need a full custom website or if a
                template-based approach might suit them better. We explain the trade-offs clearly so
                you can make an informed decision. You will also find answers about ongoing
                maintenance, hosting, domain management and how we handle content updates after
                launch.
              </p>
              <p>
                We also cover topics around search engine optimisation, GDPR compliance and mobile
                responsiveness — three areas that every modern business website must get right. Our
                answers are written in plain language, free from technical jargon, because we
                believe that understanding your own website should never require a computer science
                degree. If you are comparing web design agencies in Wetzlar or the wider
                Mittelhessen region, this FAQ gives you a clear picture of how Coday operates.
              </p>
              <p>
                If your specific question is not listed here, we are always happy to help directly.
                Book a free, no-obligation consultation through our booking page, or send us a
                message. At Coday, every enquiry receives a personal response — because behind this
                agency is a real person who genuinely cares about delivering excellent results for
                local businesses in Wetzlar and across Hesse.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              FAQ — Webdesign Agentur Wetzlar, Mittelhessen
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Unsere FAQ-Seite beantwortet die am häufigsten gestellten Fragen zur Zusammenarbeit
                mit Coday, einer spezialisierten Webdesign Agentur mit Sitz in Wetzlar. Ob Sie einen
                Handwerksbetrieb in Gießen führen, ein Restaurant in Marburg betreiben oder ein
                Dienstleistungsunternehmen irgendwo in Mittelhessen haben — hier finden Sie klare,
                ehrliche Antworten zu unserem Ablauf, unseren Zeitrahmen und dem, was Sie von einem
                professionellen Website-Projekt erwarten können. Wir haben diese Seite erstellt,
                weil Transparenz ein Grundprinzip bei Coday ist — keine versteckten Kosten, keine
                vagen Versprechen, sondern nur nachvollziehbare Informationen.
              </p>
              <p>
                Häufig gestellte Fragen umfassen unter anderem, wie lange ein typisches
                Webdesign-Projekt dauert, wie unsere Preismodelle aussehen und welche Technologien
                wir für die Entwicklung einsetzen. Viele Unternehmer in Hessen fragen sich, ob sie
                eine komplett individuelle Website benötigen oder ob ein vorlagenbasierter Ansatz
                besser geeignet wäre. Wir erklären die jeweiligen Vor- und Nachteile klar und
                verständlich, damit Sie eine fundierte Entscheidung treffen können. Außerdem finden
                Sie hier Antworten zu laufender Wartung, Hosting, Domain-Verwaltung und dazu, wie
                wir inhaltliche Aktualisierungen nach dem Launch handhaben.
              </p>
              <p>
                Darüber hinaus behandeln wir Themen wie Suchmaschinenoptimierung, DSGVO-Konformität
                und mobile Responsivität — drei Bereiche, die jede moderne Unternehmenswebsite
                zwingend richtig umsetzen muss. Unsere Antworten sind in verständlicher Sprache
                verfasst, frei von technischem Fachjargon, denn wir sind der Überzeugung, dass das
                Verständnis der eigenen Website kein Informatikstudium erfordern sollte. Wenn Sie
                Webdesign Agenturen in Wetzlar oder der weiteren Region Mittelhessen vergleichen,
                verschafft Ihnen diese FAQ-Seite ein klares Bild davon, wie Coday arbeitet.
              </p>
              <p>
                Sollte Ihre spezifische Frage hier nicht aufgeführt sein, helfen wir Ihnen jederzeit
                gerne persönlich weiter. Buchen Sie ein kostenloses, unverbindliches Erstgespräch
                über unsere Buchungsseite oder schreiben Sie uns eine Nachricht. Bei Coday erhält
                jede Anfrage eine persönliche Antwort — denn hinter dieser Agentur steht ein echter
                Mensch, dem es aufrichtig am Herzen liegt, herausragende Ergebnisse für lokale
                Unternehmen in Wetzlar und ganz Hessen zu liefern.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
