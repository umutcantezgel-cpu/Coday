import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ClientComponent from '@/features/booking/ui/BookingClient';
import { getBreadcrumbSchema, getWebPageSchema, BASE_URL, ORG_ID } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Book Free Consultation | Web Design Wetzlar',
      description:
        'Book your free 30-minute consultation with Coday in Wetzlar. Web design, SEO and development for local businesses in Hesse. Personal and no obligation.',
      keywords: [
        'Book Web Design Consultation',
        'Website Consultation Wetzlar',
        'Coday Web Booking',
        'Free Strategy Call',
      ],
      path: '/en/booking',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Erstgespräch buchen | Webdesigner Wetzlar Hessen',
    description:
      'Buchen Sie Ihr kostenloses 30-Minuten-Beratungsgespräch mit Coday in Wetzlar. Webdesign, SEO und Entwicklung. Persönlich und unverbindlich anfragen.',
    keywords: [
      'Erstgespräch buchen Webdesign',
      'Webdesign Beratung Wetzlar',
      'Coday Web Termin',
      'Kostenloses Erstgespräch',
    ],
    path: '/de/booking',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/booking`;
  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: isEn ? 'Booking' : 'Termin buchen', url: `/${_locale}/booking` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // No Organization node here: the root layout already ships one for every page.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Book Free Web Design Consultation | Coday Wetzlar'
          : 'Kostenloses Erstgespräch buchen | Coday Wetzlar',
        description: isEn
          ? 'Book your free 30-minute consultation with Coday in Wetzlar.'
          : 'Buchen Sie Ihr kostenloses 30-Minuten-Beratungsgespräch mit Coday in Wetzlar.',
        locale: _locale,
        type: 'ContactPage',
        // Restores the edge the hand-written node carried before this slice.
        aboutId: ORG_ID,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-booking"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Book Your Free Web Design Consultation in Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                A thorough web design consultation in Wetzlar is the decisive first step towards
                building a successful digital presence for your business. When you book an initial
                consultation for a new website or a relaunch, we take the time to understand your
                specific business goals, your target audience and the unique requirements of your
                industry. At Coday, our web design agency based in Hesse, the consultation is
                completely free and carries no obligation whatsoever. Together, we analyse which
                features and functionalities your future website truly needs, and we discuss how
                targeted local search engine optimisation and strategic content marketing can bring
                more qualified customers from Wetzlar, Gießen, Marburg, Frankfurt and the entire
                Central Hesse region to your business.
              </p>
              <p>
                A professionally designed website is far more than a static digital business card.
                It is a powerful strategic tool for acquiring new clients, strengthening your
                employer brand and automating your daily business processes. During our 30-minute
                consultation, we cover essential topics including intuitive user experience design,
                mobile-first responsive layouts for smartphones and tablets, and fast loading times
                based on Core Web Vitals — all of which are critical for achieving strong Google
                rankings today.
              </p>
              <p>
                We also discuss the entire project workflow transparently: from the initial
                wireframing and interactive prototyping through to the final technical development
                and successful launch of your new website. We consistently rely on modern, fast and
                future-proof web technologies that scale flexibly with the growing demands of your
                business. Legal and technical considerations such as accessibility, strict GDPR
                compliance, data security and our long-term maintenance and hosting services are all
                covered in detail during the conversation.
              </p>
              <p>
                Booking a consultation with Coday means you will be advised fairly, honestly and
                with a clear focus on measurable business results. Take advantage of this valuable
                opportunity to receive a tailored roadmap for your web project. Book your
                appointment in our calendar now and let us lay the foundation for your digital
                visibility and growth together. We look forward to getting to know you, your vision
                and your business personally — and to showing you the innovative solutions that will
                drive your long-term success online.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Webdesign-Beratung &amp; Erstgespräch in Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Eine fundierte Webdesign-Beratung in Wetzlar ist der erste entscheidende Schritt auf
                dem Weg zu einer erfolgreichen digitalen Präsenz für Ihr Unternehmen. Wenn Sie bei
                Coday, Ihrem Webdesigner Wetzlar Hessen, für Ihre neue Website oder einen Relaunch
                ein Erstgespräch buchen, legen wir großen Wert darauf, Ihre individuellen
                geschäftlichen Ziele, Ihre Zielgruppe und die speziellen Anforderungen Ihrer Branche
                genau zu verstehen. In unserer Webdesign-Agentur aus Hessen nehmen wir uns
                ausführlich Zeit für Sie – das Beratungsgespräch ist für Sie komplett kostenlos und
                völlig unverbindlich. Wir analysieren in dieser Erstberatung gemeinsam, welche
                konkreten Funktionen und Features Ihre künftige Webseite unbedingt benötigt. Zudem
                erörtern wir, wie wir durch gezielte, lokale Suchmaschinenoptimierung (SEO) und
                zielgruppenorientiertes Content-Marketing mehr qualifizierte Kunden aus Wetzlar,
                Gießen, Marburg, Frankfurt und der gesamten Region Mittelhessen für Sie gewinnen
                können. Wir überlegen gemeinsam, welches moderne UI/UX-Design Ihre Markenidentität
                und Ihre Unternehmenswerte am authentischsten und wirkungsvollsten widerspiegelt.
              </p>
              <p>
                Ein professionell erstelltes Webdesign ist heutzutage weit mehr als nur eine
                einfache, statische digitale Visitenkarte im Netz. Es handelt sich vielmehr um ein
                mächtiges, strategisches Werkzeug zur aktiven Kundengewinnung, zur nachhaltigen
                Stärkung Ihrer Arbeitgebermarke (Employer Branding) zur Gewinnung von Fachkräften
                und zur intelligenten Automatisierung Ihrer täglichen Geschäftsprozesse. Während
                unseres 30-minütigen Beratungsgesprächs klären wir unter anderem essenzielle Fragen
                zur optimalen, intuitiven Nutzerführung (Usability), zur unabdingbaren
                Mobile-Optimierung (Responsive Design für Smartphones und Tablets) sowie zu
                schnellen Ladezeiten (Performance und Core Web Vitals), die für ein herausragendes
                Google-Ranking heutzutage absolut unerlässlich sind.
              </p>
              <p>
                Darüber hinaus besprechen wir transparent den gesamten Projektablauf: angefangen von
                der ersten strukturellen Skizze (Wireframing) über das interaktive Prototyping im
                Design-Prozess bis hin zur finalen, technischen Entwicklung (Coding) und dem
                erfolgreichen Go-Live (Launch) Ihrer neuen Internetpräsenz. Wir setzen bei der
                Umsetzung konsequent auf moderne, extrem schnelle und vor allem zukunftssichere
                Web-Technologien, die flexibel und skalierbar mit den wachsenden Anforderungen Ihres
                Unternehmens Schritt halten können. Auch rechtliche und technische Rahmenbedingungen
                wie Barrierefreiheit (Accessibility), eine strikt DSGVO-konforme Umsetzung und
                Datensicherheit sowie unsere Angebote zur langfristigen technischen Betreuung
                (Wartung, Pflege, Updates und Hosting) kommen in unserem Gespräch detailliert zur
                Sprache. Nutzen Sie diese wertvolle Gelegenheit, um sich von uns einen klaren,
                maßgeschneiderten Fahrplan für Ihr anstehendes Webprojekt aufstellen zu lassen. Ein
                Erstgespräch bei der Digitalagentur Coday bedeutet für Sie, dass Sie fair und auf
                Augenhöhe beraten werden – absolut transparent, ehrlich und immer mit dem klaren
                Fokus auf Ihren messbaren geschäftlichen Erfolg im digitalen Raum. Buchen Sie jetzt
                Ihren Termin in unserem Kalender und lassen Sie uns gemeinsam den Grundstein für
                Ihre digitale Dominanz und Sichtbarkeit legen. Wir freuen uns sehr darauf, Sie, Ihr
                Team und Ihre spannende Vision persönlich kennenzulernen und Ihnen passgenaue,
                innovative Lösungen für Ihr langfristiges Unternehmenswachstum aufzuzeigen.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
