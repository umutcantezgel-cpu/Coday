import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ClientComponent from '@/features/legal/ui/GarantieClient';
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
      title: 'Our Quality Guarantee | Web Design Wetzlar | Coday',
      description:
        'Coday guarantees premium web design from Wetzlar. Satisfaction, fixed price and on-time delivery for your business. For companies across Central Hesse.',
      keywords: [
        'Web Design Guarantee',
        'Fixed Price Guarantee',
        '100% Code Ownership',
        'Coday Guarantee',
      ],
      path: '/en/garantie',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Unsere Qualitätsgarantie | Webdesign Wetzlar | Coday',
    description:
      'Coday garantiert Ihnen Premium Webdesign aus Wetzlar. Zufriedenheit, Festpreis und termingerechte Lieferung. Für Unternehmen in ganz Mittelhessen.',
    keywords: [
      'Webdesign Garantie',
      'Festpreisgarantie Webagentur',
      '100% Code Eigentum',
      'Coday Qualitätsgarantie',
    ],
    path: '/de/garantie',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/garantie`;
  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: isEn ? 'Guarantee' : 'Garantie', url: `/${_locale}/garantie` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization is defined once in the root layout and only linked to below.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: isEn ? 'Coday Web Design Quality Guarantee' : 'Coday Qualitätsgarantie für Webdesign',
        description: isEn
          ? 'Coday guarantees premium web design from Wetzlar: satisfaction, fixed price and on-time delivery.'
          : 'Coday garantiert Ihnen Premium Webdesign aus Wetzlar: Zufriedenheit, Festpreis und termingerechte Lieferung.',
        locale: _locale,
        // Restores the edge the hand-written node carried before this slice.
        aboutId: ORG_ID,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-garantie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {params.locale === 'en'
            ? 'Our Web Design Quality Guarantee'
            : 'Unsere Qualitätsgarantie für Ihr Webdesign'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {params.locale === 'en'
              ? 'At Coday, our quality guarantee is the cornerstone of every web design project we deliver from Wetzlar. We understand that investing in a professional website is a significant decision for any business, and we believe you deserve absolute certainty about what you are getting. That is why every Coday project comes with a binding fixed-price guarantee. The price we quote during our initial consultation is the exact price you pay upon delivery — no hidden fees, no surprise charges, no scope-creep markups. We put this commitment in writing before a single line of code is written, so you can plan your budget with complete confidence. This transparent pricing model has earned us the trust of businesses across Central Hesse, from established enterprises in Wetzlar to growing startups throughout the Lahn-Dill region. Our fixed-price approach is not a marketing gimmick; it is a reflection of our disciplined project management methodology. We invest significant time upfront in thorough discovery and detailed scoping so that every deliverable, timeline, and milestone is clearly defined before development begins. This rigorous planning phase eliminates the ambiguity that typically leads to budget overruns in web design projects.'
              : 'Bei Coday ist unsere Qualitätsgarantie das Fundament jedes Webdesign-Projekts, das wir aus Wetzlar heraus umsetzen. Wir wissen, dass die Investition in eine professionelle Website eine bedeutende Entscheidung für jedes Unternehmen darstellt, und wir sind überzeugt, dass Sie absolute Sicherheit darüber verdienen, was Sie erhalten. Deshalb kommt jedes Coday-Projekt mit einer verbindlichen Festpreisgarantie. Der Preis, den wir in unserem Erstgespräch nennen, ist exakt der Preis, den Sie bei Lieferung zahlen — keine versteckten Gebühren, keine überraschenden Zusatzkosten, keine nachträglichen Aufschläge wegen Umfangsänderungen. Wir halten dieses Versprechen schriftlich fest, bevor eine einzige Zeile Code geschrieben wird, damit Sie Ihr Budget mit vollständiger Planungssicherheit kalkulieren können. Dieses transparente Preismodell hat uns das Vertrauen von Unternehmen in ganz Mittelhessen eingebracht, von etablierten Betrieben in Wetzlar bis hin zu wachsenden Start-ups in der gesamten Lahn-Dill-Region. Unser Festpreisansatz ist kein Marketingtrick, sondern Ausdruck unserer disziplinierten Projektmanagement-Methodik. Wir investieren vorab erhebliche Zeit in eine gründliche Analysephase und detaillierte Projektplanung, sodass jedes Ergebnis, jeder Zeitplan und jeder Meilenstein klar definiert ist, bevor die Entwicklung beginnt. Diese sorgfältige Planungsphase eliminiert die Unklarheiten, die bei Webdesign-Projekten typischerweise zu Budgetüberschreitungen führen.'}
          </p>
          <p>
            {params.locale === 'en'
              ? "Performance is not an afterthought at Coday — it is a guarantee. Every website we build in Wetzlar is engineered to achieve a Google Lighthouse score of 90 or above across all four audit categories: Performance, Accessibility, Best Practices, and SEO. This is not an aspirational target; it is a contractual commitment. We measure and document these scores before handover, and if any category falls below the 90-point threshold, we continue optimizing at no additional cost until the standard is met. Achieving consistently high Lighthouse scores requires deep technical expertise in modern web development. We optimize every critical rendering path, implement efficient lazy-loading strategies for images and media, leverage next-generation image formats like WebP and AVIF, minimize JavaScript bundle sizes, and ensure that your Core Web Vitals — Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift — all fall within Google's recommended thresholds. These are not abstract metrics; they directly influence how Google ranks your website in search results, how quickly visitors can interact with your content, and ultimately how many of those visitors convert into paying customers. For businesses in Wetzlar and throughout Hesse competing in an increasingly digital marketplace, a website that loads in under two seconds on mobile devices is not a luxury — it is a competitive necessity."
              : 'Performance ist bei Coday kein nachträglicher Gedanke — sie ist eine Garantie. Jede Website, die wir in Wetzlar entwickeln, wird so konzipiert, dass sie in allen vier Google-Lighthouse-Prüfkategorien einen Score von 90 oder höher erreicht: Performance, Barrierefreiheit, Best Practices und SEO. Das ist kein ehrgeiziges Ziel, sondern eine vertragliche Zusage. Wir messen und dokumentieren diese Werte vor der Übergabe, und sollte eine Kategorie unter die 90-Punkte-Schwelle fallen, optimieren wir ohne Zusatzkosten weiter, bis der Standard erreicht ist. Konstant hohe Lighthouse-Scores zu erzielen erfordert tiefgreifende technische Expertise in der modernen Webentwicklung. Wir optimieren jeden kritischen Rendering-Pfad, implementieren effiziente Lazy-Loading-Strategien für Bilder und Medien, nutzen Bildformate der nächsten Generation wie WebP und AVIF, minimieren JavaScript-Bundle-Größen und stellen sicher, dass Ihre Core Web Vitals — Largest Contentful Paint, Interaction to Next Paint und Cumulative Layout Shift — alle innerhalb der von Google empfohlenen Schwellenwerte liegen. Das sind keine abstrakten Kennzahlen; sie beeinflussen direkt, wie Google Ihre Website in den Suchergebnissen rankt, wie schnell Besucher mit Ihren Inhalten interagieren können und letztlich, wie viele dieser Besucher zu zahlenden Kunden werden. Für Unternehmen in Wetzlar und in ganz Hessen, die in einem zunehmend digitalen Markt konkurrieren, ist eine Website, die auf mobilen Geräten in unter zwei Sekunden lädt, kein Luxus — sie ist eine Wettbewerbsnotwendigkeit.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'One of the most important aspects of our quality guarantee is our strict no-vendor-lock-in policy. When Coday builds your website in Wetzlar, you own one hundred percent of the source code, design assets, and content from the moment of delivery. We do not use proprietary page builders, closed-source platforms, or custom content management systems that would tie you permanently to our services. Instead, we build on open, industry-standard technologies — primarily Next.js, React, and headless CMS platforms — that any qualified developer can maintain, extend, or migrate. This means that if you ever decide to work with a different agency or bring your web development in-house, you can do so without restrictions, without additional licensing fees, and without losing a single page of content. We believe this level of transparency and freedom is essential for building genuine trust with our clients. Your website is your business asset, and it should remain fully under your control at all times. We provide comprehensive handover documentation including technical architecture guides, deployment instructions, and content management tutorials so that you or your future development partner can hit the ground running. This commitment to openness is a fundamental part of how we do business as a web design agency in Wetzlar.'
              : 'Einer der wichtigsten Aspekte unserer Qualitätsgarantie ist unsere strikte Richtlinie gegen Anbieterabhängigkeit. Wenn Coday Ihre Website in Wetzlar erstellt, gehören Ihnen ab dem Moment der Übergabe hundert Prozent des Quellcodes, der Designdateien und der Inhalte. Wir verwenden keine proprietären Baukastensysteme, keine Closed-Source-Plattformen und keine hauseigenen Content-Management-Systeme, die Sie dauerhaft an unsere Dienste binden würden. Stattdessen bauen wir auf offene, branchenübliche Technologien — in erster Linie Next.js, React und Headless-CMS-Plattformen — die jeder qualifizierte Entwickler warten, erweitern oder migrieren kann. Das bedeutet, dass Sie, falls Sie sich jemals entscheiden, mit einer anderen Agentur zusammenzuarbeiten oder Ihre Webentwicklung intern abzuwickeln, dies ohne Einschränkungen, ohne zusätzliche Lizenzgebühren und ohne den Verlust einer einzigen Seite Ihres Inhalts tun können. Wir sind überzeugt, dass dieses Maß an Transparenz und Freiheit unerlässlich ist, um echtes Vertrauen bei unseren Kunden aufzubauen. Ihre Website ist Ihr Geschäftsgut, und sie sollte jederzeit vollständig unter Ihrer Kontrolle bleiben. Wir stellen umfassende Übergabedokumentationen bereit, einschließlich technischer Architektur-Leitfäden, Deployment-Anleitungen und Content-Management-Tutorials, damit Sie oder Ihr zukünftiger Entwicklungspartner sofort produktiv arbeiten können. Dieses Bekenntnis zur Offenheit ist ein fundamentaler Bestandteil unserer Arbeitsweise als Webdesign-Agentur in Wetzlar.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'Our quality guarantee extends well beyond the initial launch of your website. Coday provides dedicated post-launch support to ensure that your digital presence continues to perform at the highest level long after go-live. During the support period, we monitor your website for any technical issues, apply security patches promptly, and address any bugs or display inconsistencies that may emerge as browsers and devices receive updates. We understand that a website is not a static product — it is a living business tool that must evolve with your company, your customers, and the ever-changing landscape of web technology. That is why we also offer ongoing maintenance packages tailored to the specific needs of businesses in Wetzlar and the surrounding region. Whether you need regular content updates, new landing pages for seasonal campaigns, performance re-audits against the latest Core Web Vitals benchmarks, or integration of new third-party tools, our team is ready to support you. Every enhancement we make continues to fall under our quality standards, meaning Lighthouse scores stay above 90, responsive design remains flawless, and security protocols are always up to date. We see each web design project not as a one-time transaction but as the beginning of a long-term partnership. Our goal is simple: to be the most reliable web design partner a business in Wetzlar could ask for, delivering measurable results, unwavering quality, and complete peace of mind with every project we undertake.'
              : 'Unsere Qualitätsgarantie reicht weit über den initialen Launch Ihrer Website hinaus. Coday bietet dedizierten Post-Launch-Support, um sicherzustellen, dass Ihre digitale Präsenz auch lange nach dem Go-Live auf höchstem Niveau performt. Während der Support-Phase überwachen wir Ihre Website auf technische Probleme, spielen Sicherheits-Patches zeitnah ein und beheben alle Fehler oder Darstellungsinkonsistenzen, die auftreten können, wenn Browser und Geräte Updates erhalten. Wir verstehen, dass eine Website kein statisches Produkt ist — sie ist ein lebendiges Geschäftswerkzeug, das sich gemeinsam mit Ihrem Unternehmen, Ihren Kunden und der sich ständig verändernden Landschaft der Webtechnologie weiterentwickeln muss. Deshalb bieten wir auch laufende Wartungspakete an, die auf die spezifischen Bedürfnisse von Unternehmen in Wetzlar und der umliegenden Region zugeschnitten sind. Ob Sie regelmäßige Inhaltsaktualisierungen, neue Landingpages für saisonale Kampagnen, Performance-Re-Audits gegen die neuesten Core-Web-Vitals-Benchmarks oder die Integration neuer Drittanbieter-Tools benötigen — wir stehen Ihnen zur Seite. Jede Verbesserung, die wir vornehmen, unterliegt weiterhin unseren Qualitätsstandards. Das bedeutet, Lighthouse-Scores bleiben über 90, das responsive Design bleibt einwandfrei und die Sicherheitsprotokolle sind immer auf dem neuesten Stand. Wir betrachten jedes Webdesign-Projekt nicht als einmalige Transaktion, sondern als den Beginn einer langfristigen Partnerschaft. Unser Ziel ist einfach: der zuverlässigste Webdesign-Partner zu sein, den ein Unternehmen in Wetzlar sich wünschen kann — mit messbaren Ergebnissen, kompromissloser Qualität und vollständiger Planungssicherheit bei jedem Projekt, das wir übernehmen.'}
          </p>
        </div>
      </section>
    </>
  );
}
