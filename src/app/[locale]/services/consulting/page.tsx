import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ConsultingClient } from '@/features/services/ui/ConsultingClient';
import { setRequestLocale } from 'next-intl/server';
import {
  BASE_URL,
  getOrganizationSchema,
  getServiceSchema,
  getBreadcrumbSchema,
} from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Digital Consulting & Web Strategy | Wetzlar',
      description:
        'Strategic digital consulting by Coday in Wetzlar. We guide businesses in Central Hesse through their digital transformation. Book your appointment.',
      keywords: [
        'Digital Consulting Wetzlar',
        'Web Strategy Central Hesse',
        'Website Architecture Consulting',
        'Coday Consulting',
      ],
      path: '/en/services/consulting',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Digitale Beratung & Webstrategie | Wetzlar',
    description:
      'Strategische Digitalberatung von Coday in Wetzlar. Wir begleiten Unternehmen in Mittelhessen bei der digitalen Transformation. Jetzt Termin buchen.',
    keywords: [
      'Digitalberatung Wetzlar',
      'Webstrategie Mittelhessen',
      'Website Konzeption Beratung',
      'Coday Consulting',
    ],
    path: '/de/services/consulting',
    type: 'money',
  });
}

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const _seoTitle =
    _locale === 'en'
      ? 'Digital Consulting & Web Strategy | Wetzlar | Coday'
      : 'Digitale Beratung & Webstrategie | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Strategic digital consulting by Coday in Wetzlar. We guide businesses in Central Hesse through their digital transformation. Book your appointment.'
      : 'Strategische Digitalberatung von Coday in Wetzlar. Wir begleiten Unternehmen in Mittelhessen bei der digitalen Transformation. Jetzt Termin buchen.';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Services', url: `/${_locale}/services` },
    {
      name: isEn ? 'Digital Consulting' : 'Digitale Beratung',
      url: `/${_locale}/services/consulting`,
    },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      getServiceSchema({
        name: _seoTitle,
        description: _seoDesc,
        url: `${BASE_URL}/${_locale}/services/consulting`,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-consulting"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ConsultingClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Digital Consulting & Web Strategy for Sustainable Business Growth'
            : 'Digitale Beratung & Webstrategie für nachhaltiges Unternehmenswachstum'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'Digital consulting is far more than choosing the right tools or redesigning a website. It is a strategic discipline that aligns your digital presence with your core business objectives, ensuring that every investment in technology delivers measurable returns. At Coday in Wetzlar, we provide independent, technology-agnostic digital consulting that helps businesses across Hesse navigate the complexities of digital transformation with clarity and confidence. Whether you are a local retailer exploring e-commerce for the first time, a professional services firm seeking to automate client workflows, or an established manufacturer digitizing operations — our consulting approach begins with understanding your business model, competitive landscape, and growth ambitions before recommending any technical solution. We believe that the best web strategy is one that serves your specific situation, not a generic template applied across industries.'
              : 'Digitale Beratung ist weit mehr als die Auswahl der richtigen Tools oder das Redesign einer Website. Es ist eine strategische Disziplin, die Ihre digitale Präsenz mit Ihren zentralen Geschäftszielen in Einklang bringt und sicherstellt, dass jede Investition in Technologie messbare Ergebnisse liefert. Bei Coday in Wetzlar bieten wir unabhängige, technologieneutrale digitale Beratung, die Unternehmen in ganz Hessen dabei unterstützt, die Komplexität der digitalen Transformation mit Klarheit und Zuversicht zu meistern. Ob Sie ein lokaler Einzelhändler sind, der erstmals E-Commerce erkundet, ein Dienstleistungsunternehmen, das Kundenworkflows automatisieren möchte, oder ein etablierter Hersteller, der Betriebsabläufe digitalisiert — unser Beratungsansatz beginnt mit dem Verständnis Ihres Geschäftsmodells, Ihrer Wettbewerbslandschaft und Ihrer Wachstumsambitionen, bevor wir eine technische Lösung empfehlen. Wir sind überzeugt, dass die beste Webstrategie diejenige ist, die Ihrer spezifischen Situation dient, und keine generische Vorlage, die branchenübergreifend angewendet wird.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'A robust web strategy forms the backbone of every successful digital transformation. We work with you to define a clear digital roadmap that prioritizes the initiatives with the highest business impact. This includes evaluating your current tech stack, identifying redundancies and integration gaps, and recommending modern architectures that scale with your growth — from headless CMS platforms and API-first backends to automated marketing funnels and analytics infrastructure. Our digital consulting covers the full spectrum: conversion rate optimization (CRO), search engine optimization (SEO and GEO), content strategy, user experience design, and performance engineering. Every recommendation we make is grounded in data and aligned with your budget constraints, because effective web strategy is not about implementing the most expensive solution — it is about implementing the right one.'
              : 'Eine robuste Webstrategie bildet das Rückgrat jeder erfolgreichen digitalen Transformation. Wir erarbeiten gemeinsam mit Ihnen eine klare digitale Roadmap, die die Initiativen mit dem höchsten geschäftlichen Nutzen priorisiert. Dazu gehört die Bewertung Ihres aktuellen Tech-Stacks, die Identifikation von Redundanzen und Integrationslücken sowie die Empfehlung moderner Architekturen, die mit Ihrem Wachstum skalieren — von Headless-CMS-Plattformen und API-first-Backends bis hin zu automatisierten Marketing-Funnels und Analytics-Infrastruktur. Unsere digitale Beratung deckt das gesamte Spektrum ab: Conversion-Rate-Optimierung (CRO), Suchmaschinenoptimierung (SEO und GEO), Content-Strategie, User-Experience-Design und Performance-Engineering. Jede Empfehlung, die wir aussprechen, ist datenbasiert und auf Ihre Budgetgrenzen abgestimmt, denn eine effektive Webstrategie bedeutet nicht, die teuerste Lösung zu implementieren — sondern die richtige.'}
          </p>
          <p>
            {_locale === 'en'
              ? "Our consulting methodology is built around interactive workshops and collaborative strategy sessions. We don't deliver a static PDF report and disappear — we work alongside you to translate insights into actionable plans. Our web strategy workshops are designed for decision-makers and cover topics from competitive analysis and market positioning to technical architecture decisions and content planning. These sessions ensure that your team understands not just what needs to change, but why each change matters for your bottom line. For businesses in Wetzlar and throughout Central Hesse, having a local consulting partner who understands regional market dynamics — from the mid-size industrial landscape to the growing services sector — is a significant advantage. We combine local market knowledge with international best practices, ensuring your digital strategy is both globally competitive and locally relevant."
              : 'Unsere Beratungsmethodik basiert auf interaktiven Workshops und kollaborativen Strategiesitzungen. Wir liefern keinen statischen PDF-Bericht und verschwinden — wir arbeiten an Ihrer Seite, um Erkenntnisse in umsetzbare Pläne zu übersetzen. Unsere Webstrategie-Workshops richten sich an Entscheidungsträger und behandeln Themen von Wettbewerbsanalyse und Marktpositionierung bis hin zu technischen Architekturentscheidungen und Content-Planung. Diese Sitzungen stellen sicher, dass Ihr Team nicht nur versteht, was sich ändern muss, sondern warum jede Veränderung für Ihren Geschäftserfolg entscheidend ist. Für Unternehmen in Wetzlar und in ganz Mittelhessen ist ein lokaler Beratungspartner, der die regionalen Marktdynamiken versteht — von der mittelständischen Industrielandschaft bis zum wachsenden Dienstleistungssektor — ein erheblicher Vorteil. Wir verbinden lokale Marktkenntnisse mit internationalen Best Practices und stellen sicher, dass Ihre digitale Strategie sowohl global wettbewerbsfähig als auch lokal relevant ist.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Choosing Coday as your digital consulting partner in Wetzlar means working with an agency that prioritizes substance over sales pitches. As a solo agency, every project receives direct, senior-level attention — no account managers, no juniors learning on your budget. We bring deep expertise in modern web technologies (Next.js, React, headless architectures), performance optimization, and AI-augmented workflows to every engagement. Our web strategy recommendations are always implementation-ready, with clear technical specifications, realistic timelines, and transparent cost estimates. Whether you need a comprehensive digital audit, a focused web strategy for a specific initiative, or ongoing advisory support as your digital landscape evolves, Coday delivers the clarity and expertise that transform digital ambitions into measurable results. Contact us to schedule your initial strategy session and discover how thoughtful digital consulting can unlock growth opportunities you may not have considered.'
              : 'Coday als Ihren Partner für digitale Beratung in Wetzlar zu wählen, bedeutet mit einer Agentur zu arbeiten, die Substanz über Verkaufsgespräche stellt. Als Solo-Agentur erhält jedes Projekt direkte Aufmerksamkeit auf Senior-Level — keine Account-Manager, keine Junioren, die auf Ihrem Budget lernen. Wir bringen tiefgreifende Expertise in modernen Webtechnologien (Next.js, React, Headless-Architekturen), Performance-Optimierung und KI-unterstützten Workflows in jedes Projekt ein. Unsere Webstrategie-Empfehlungen sind immer implementierungsbereit, mit klaren technischen Spezifikationen, realistischen Zeitplänen und transparenten Kostenschätzungen. Ob Sie ein umfassendes digitales Audit, eine fokussierte Webstrategie für eine spezifische Initiative oder eine kontinuierliche Beratungsunterstützung benötigen, während sich Ihre digitale Landschaft weiterentwickelt — Coday liefert die Klarheit und Expertise, die digitale Ambitionen in messbare Ergebnisse verwandeln. Kontaktieren Sie uns, um Ihre erste Strategiesitzung zu vereinbaren und zu entdecken, wie durchdachte digitale Beratung Wachstumschancen erschließen kann, die Sie vielleicht noch nicht in Betracht gezogen haben.'}
          </p>
        </div>
      </section>
    </>
  );
}
