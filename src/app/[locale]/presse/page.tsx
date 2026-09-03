import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import ClientComponent from '@/features/company/ui/PresseClient';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Press & Media | Web Design Agency Wetzlar Hesse',
      description:
        'Press materials and media information from Coday, your web design agency in Wetzlar. Logos, press releases and company info at a glance for journalists.',
      keywords: [
        'Coday Press',
        'Web Agency Media Kit',
        'Press Releases Web Design Wetzlar',
        'Coday News',
      ],
      path: '/en/presse',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Pressebereich & Medien | Webdesign Agentur Wetzlar',
    description:
      'Pressematerial und Medieninformationen von Coday, Ihrer Webdesign Agentur in Wetzlar. Logos, Pressemitteilungen und Unternehmensinfos auf einen Blick.',
    keywords: [
      'Coday Presse',
      'Pressemitteilungen Webdesign Wetzlar',
      'Medienkit Webagentur',
      'Coday News',
    ],
    path: '/de/presse',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/presse`;
  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: isEn ? 'Press' : 'Presse', url: `/${_locale}/presse` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization is declared once in the root layout, not per page.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: isEn ? 'Coday Press & Media Center' : 'Coday Presse- & Medienbereich',
        description: isEn
          ? 'Press materials and media information from Coday, your web design agency in Wetzlar.'
          : 'Pressematerial und Medieninformationen von Coday, Ihrer Webdesign Agentur in Wetzlar.',
        locale: _locale,
      }),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />

      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {params.locale === 'en'
            ? 'Press & Media — Coday Web Design Agency'
            : 'Pressebereich & Medien — Coday Webdesign Agentur'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {params.locale === 'en'
              ? 'Welcome to the official press and media area of Coday, a web design agency headquartered in Wetzlar, Hesse. This section serves as a central resource for journalists, bloggers, media representatives, and industry analysts seeking accurate, up-to-date information about our agency, our services, and our approach to modern web development. Coday was founded with a clear mission: to make professional, high-performance web design accessible to small and medium-sized businesses in Central Hesse and beyond. As a solo agency, Coday represents a new model in the web design industry — one where advanced AI-augmented workflows, deep technical expertise, and personal client relationships combine to deliver enterprise-quality websites without the overhead of a traditional agency structure. We believe that every business, regardless of size, deserves a digital presence that performs at the highest level. Our press area provides the context and materials needed to tell this story accurately. We are committed to transparency and welcome media coverage that reflects the genuine realities of running a modern, technology-driven web design operation in a mid-sized German city.'
              : 'Willkommen im offiziellen Presse- und Medienbereich von Coday, einer Webdesign-Agentur mit Hauptsitz in Wetzlar, Hessen. Dieser Bereich dient als zentrale Anlaufstelle für Journalisten, Blogger, Medienvertreter und Branchenanalysten, die nach präzisen, aktuellen Informationen über unsere Agentur, unsere Dienstleistungen und unseren Ansatz für modernes Webdesign suchen. Coday wurde mit einer klaren Mission gegründet: professionelles, leistungsstarkes Webdesign für kleine und mittelständische Unternehmen in Mittelhessen und darüber hinaus zugänglich zu machen. Als Solo-Agentur steht Coday für ein neues Modell in der Webdesign-Branche — eines, bei dem fortschrittliche KI-unterstützte Workflows, tiefgreifende technische Expertise und persönliche Kundenbeziehungen zusammenwirken, um Websites auf Enterprise-Niveau zu liefern, ohne den Overhead einer traditionellen Agenturstruktur. Wir sind überzeugt, dass jedes Unternehmen, unabhängig von seiner Größe, eine digitale Präsenz verdient, die auf höchstem Niveau performt. Unser Pressebereich stellt den Kontext und die Materialien bereit, die benötigt werden, um diese Geschichte akkurat zu erzählen. Wir verpflichten uns zu Transparenz und begrüßen Medienberichterstattung, die die echten Realitäten einer modernen, technologiegetriebenen Webdesign-Agentur in einer mittelgroßen deutschen Stadt widerspiegelt.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'The Coday story began in Wetzlar, a city in the Lahn-Dill district of Hesse with a rich tradition of optical engineering and precision craftsmanship. Drawing inspiration from this heritage of meticulous attention to detail, Coday was established as a web design agency that prioritizes measurable quality over volume. From the very beginning, every project has been guided by three core principles: fixed-price transparency, guaranteed performance standards, and complete code ownership for clients. These are not aspirational slogans — they are contractual commitments backed by our quality guarantee. Key milestones in our agency journey include the development of a proprietary workflow that integrates AI-assisted development tools with human creative direction, enabling us to deliver complex web projects with the speed and consistency typically associated with much larger teams. We have successfully completed projects for businesses across diverse industries, including hospitality, skilled trades, and professional services. Our client roster includes Batherm, MS Schlüsseldienst Wetzlar, and Lindener Ratsstuben — real businesses with real results that we are proud to reference. Each project reinforces our commitment to delivering websites that score 90 or above on Google Lighthouse across all audit categories, load in under two seconds on mobile, and are built on open-source technologies that prevent vendor lock-in.'
              : 'Die Geschichte von Coday begann in Wetzlar, einer Stadt im Lahn-Dill-Kreis in Hessen mit einer reichen Tradition in der optischen Industrie und Präzisionshandwerk. Inspiriert von diesem Erbe akribischer Detailgenauigkeit wurde Coday als Webdesign-Agentur gegründet, die messbare Qualität über Quantität stellt. Von Anfang an wurde jedes Projekt von drei Kernprinzipien geleitet: Festpreistransparenz, garantierte Performance-Standards und vollständige Code-Eigentümerschaft für Kunden. Das sind keine erstrebenswerten Slogans — es sind vertragliche Zusagen, die durch unsere Qualitätsgarantie abgesichert sind. Wichtige Meilensteine auf unserem Agenturweg umfassen die Entwicklung eines proprietären Workflows, der KI-gestützte Entwicklungswerkzeuge mit menschlicher kreativer Leitung verbindet und es uns ermöglicht, komplexe Webprojekte mit der Geschwindigkeit und Konsistenz zu liefern, die typischerweise mit deutlich größeren Teams assoziiert wird. Wir haben erfolgreich Projekte für Unternehmen in verschiedensten Branchen abgeschlossen, darunter Gastronomie, Handwerk und freiberufliche Dienstleistungen. Zu unseren Referenzkunden gehören Batherm, MS Schlüsseldienst Wetzlar und die Lindener Ratsstuben — echte Unternehmen mit echten Ergebnissen, auf die wir stolz verweisen. Jedes Projekt bekräftigt unser Engagement, Websites zu liefern, die in allen Google-Lighthouse-Prüfkategorien 90 oder höher erzielen, auf mobilen Geräten in unter zwei Sekunden laden und auf Open-Source-Technologien aufgebaut sind, die eine Anbieterabhängigkeit verhindern.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'Our press area provides a comprehensive collection of media resources designed to support accurate and efficient reporting about Coday. Available materials include our official agency logo in multiple formats suitable for both digital and print use, high-resolution brand imagery, factual company overview documents, and detailed descriptions of our service portfolio. All press materials are available for download and may be used freely in editorial contexts without prior approval, provided they are reproduced accurately and not altered in ways that misrepresent our brand or services. We kindly request that all published materials reference Coday as a web design agency based in Wetzlar, Hesse, to ensure geographical accuracy. For specialized feature stories, in-depth profiles, or technical articles about our development methodology, we are happy to provide additional materials, arrange interviews, or supply custom data and case study information upon request. Our founder is available for commentary on topics related to web design trends in the German market, the role of artificial intelligence in modern web development workflows, the challenges and opportunities facing solo digital agencies, and the evolving landscape of small-business digital transformation in Hesse and the broader DACH region.'
              : 'Unser Pressebereich bietet eine umfassende Sammlung von Medienressourcen, die eine akkurate und effiziente Berichterstattung über Coday unterstützen. Verfügbare Materialien umfassen unser offizielles Agentur-Logo in mehreren Formaten, die sowohl für digitale als auch für Print-Nutzung geeignet sind, hochauflösende Markenbilder, faktische Unternehmensübersichten und detaillierte Beschreibungen unseres Leistungsportfolios. Alle Pressematerialien stehen zum Download bereit und dürfen in redaktionellen Kontexten frei verwendet werden, ohne vorherige Genehmigung, sofern sie akkurat wiedergegeben und nicht in einer Weise verändert werden, die unsere Marke oder unsere Dienstleistungen falsch darstellt. Wir bitten darum, dass alle veröffentlichten Materialien Coday als Webdesign-Agentur mit Sitz in Wetzlar, Hessen, referenzieren, um die geographische Genauigkeit sicherzustellen. Für spezialisierte Feature-Geschichten, ausführliche Porträts oder technische Artikel über unsere Entwicklungsmethodik stellen wir gerne zusätzliche Materialien bereit, arrangieren Interviews oder liefern auf Anfrage maßgeschneiderte Daten und Fallstudien-Informationen. Unser Gründer steht für Kommentare zu Themen rund um Webdesign-Trends auf dem deutschen Markt, die Rolle künstlicher Intelligenz in modernen Webentwicklungs-Workflows, die Herausforderungen und Chancen für Solo-Digitalagenturen sowie die sich entwickelnde Landschaft der digitalen Transformation kleiner Unternehmen in Hessen und der gesamten DACH-Region zur Verfügung.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'We actively welcome media inquiries and are committed to responding promptly and thoroughly to all press requests. Whether you are a journalist working on a story about the web design industry in Hesse, a technology blogger covering AI-augmented development tools, a business publication profiling innovative solo entrepreneurs, or an industry analyst researching the competitive landscape of digital agencies in Germany, we are happy to assist. Our preferred method of contact for media inquiries is through the contact form on our website or via direct email. We aim to respond to all press inquiries within one business day and can accommodate both German and English-language media. We are also open to contributing guest articles, participating in panel discussions, providing expert commentary for industry reports, and collaborating on content that explores the intersection of technology, design, and small-business growth. Coday believes in building genuine relationships with media professionals, just as we build genuine relationships with our clients. We do not engage in paid press placements, fabricated testimonials, or misleading claims about partnerships or endorsements. Every piece of information we provide to the media is verifiable, accurate, and reflects our actual capabilities and track record as a web design agency operating from Wetzlar, serving businesses across Hesse and the surrounding regions of Germany.'
              : 'Wir begrüßen Medienanfragen aktiv und verpflichten uns, zeitnah und umfassend auf alle Presseanfragen zu reagieren. Ob Sie ein Journalist sind, der an einer Geschichte über die Webdesign-Branche in Hessen arbeitet, ein Technologie-Blogger, der über KI-gestützte Entwicklungswerkzeuge berichtet, eine Wirtschaftspublikation, die innovative Solo-Unternehmer porträtiert, oder ein Branchenanalyst, der die Wettbewerbslandschaft digitaler Agenturen in Deutschland untersucht — wir helfen gerne weiter. Unser bevorzugter Kontaktweg für Medienanfragen ist das Kontaktformular auf unserer Website oder die direkte E-Mail-Kommunikation. Wir streben an, alle Presseanfragen innerhalb eines Werktages zu beantworten, und können sowohl deutsch- als auch englischsprachige Medien bedienen. Wir sind auch offen für Gastbeiträge, die Teilnahme an Podiumsdiskussionen, Expertenkommentare für Branchenberichte und die Zusammenarbeit an Inhalten, die die Schnittstelle von Technologie, Design und Wachstum kleiner Unternehmen erkunden. Coday glaubt an den Aufbau echten Beziehungen zu Medienschaffenden, genau wie wir echte Beziehungen zu unseren Kunden aufbauen. Wir betreiben keine bezahlten Presseplatzierungen, keine erfundenen Testimonials und keine irreführenden Behauptungen über Partnerschaften oder Empfehlungen. Jede Information, die wir den Medien zur Verfügung stellen, ist überprüfbar, akkurat und spiegelt unsere tatsächlichen Fähigkeiten und unsere Erfolgsbilanz als Webdesign-Agentur mit Sitz in Wetzlar wider, die Unternehmen in Hessen und den umliegenden Regionen Deutschlands betreut.'}
          </p>
        </div>
      </section>
    </>
  );
}
