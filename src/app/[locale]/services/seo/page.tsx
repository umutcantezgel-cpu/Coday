import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SeoClient } from '@/features/services/ui/SeoClient';
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
      title: 'SEO Agency | Professional Search Optimization',
      description:
        'Professional SEO and GEO optimization by Coday. More visibility for your business on Google. Get your free consultation today.',
      path: '/en/services/seo',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'SEO Agentur | Suchmaschinenoptimierung & GEO',
    description:
      'Professionelle SEO und GEO Optimierung von Coday. Mehr Sichtbarkeit für Ihr Unternehmen bei Google. Jetzt kostenlos beraten lassen.',
    path: '/de/services/seo',
    type: 'money',
  });
}

export default async function SeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'SEO Agency | Professional Search Optimization | Coday'
      : 'SEO Agentur | Suchmaschinenoptimierung & GEO | Coday';
  return (
    <>
      <script
        id="schema-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'SEO Agency | Professional Search Optimization'
                    : 'SEO Agentur | Suchmaschinenoptimierung & GEO',
                description:
                  _locale === 'en'
                    ? 'Professional SEO and GEO optimization by Coday. More visibility for your business on Google.'
                    : 'Professionelle SEO und GEO Optimierung von Coday. Mehr Sichtbarkeit für Ihr Unternehmen bei Google. Jetzt kostenlos beraten lassen.',
                url: `${BASE_URL}/${_locale}/services/seo`,
              }),
            ],
          }),
        }}
      />
      <SeoClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Advanced SEO Strategies for Sustainable Growth'
            : 'Erweiterte SEO-Strategien für nachhaltiges Wachstum'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? "Search Engine Optimization (SEO) is the cornerstone of every successful long-term digital marketing strategy. As a dedicated SEO agency, Coday helps businesses increase their organic visibility and attract highly targeted traffic through professional search optimization. In today's fiercely competitive online landscape, a visually appealing website alone is not enough — it must be easily discoverable by potential customers who are actively searching for your products or services. Our comprehensive approach to search optimization covers every dimension that modern search engines evaluate: technical infrastructure, on-page content quality, and off-page authority signals. We start every engagement with a thorough, data-driven audit of your current digital presence. This audit identifies technical bottlenecks such as slow page load speeds, mobile usability issues, crawl errors, and indexing gaps that silently undermine your rankings. By systematically resolving these foundational problems, we build a robust technical architecture that search engines can crawl, index, and rank with confidence."
              : 'Suchmaschinenoptimierung (SEO) ist das Fundament jeder erfolgreichen, langfristigen digitalen Marketingstrategie. Als spezialisierte SEO-Agentur unterstützt Coday Unternehmen dabei, ihre organische Sichtbarkeit zu steigern und hochgradig zielgerichteten Traffic zu generieren. Im heutigen hart umkämpften Online-Ökosystem reicht eine optisch ansprechende Website allein nicht aus — sie muss von potenziellen Kunden, die aktiv nach Ihren Produkten oder Dienstleistungen suchen, leicht gefunden werden können. Unser ganzheitlicher Ansatz zur Suchmaschinenoptimierung deckt jede Dimension ab, die moderne Suchmaschinen bewerten: technische Infrastruktur, On-Page-Content-Qualität und Off-Page-Autoritätssignale. Jedes Projekt beginnt mit einem tiefgreifenden, datengesteuerten Audit Ihrer aktuellen digitalen Präsenz. Dieses Audit identifiziert technische Engpässe wie langsame Seitenladezeiten, mobile Usability-Probleme, Crawl-Fehler und Indexierungslücken, die Ihre Rankings still und leise untergraben. Indem wir diese grundlegenden Probleme systematisch beheben, bauen wir eine robuste technische Architektur auf, die Suchmaschinen zuverlässig crawlen, indexieren und ranken können.'}
          </p>
          <p>
            {_locale === 'en'
              ? "Content strategy is a central pillar of our search optimization methodology. We conduct extensive keyword research to uncover high-intent search terms that are directly relevant to your industry and your customers' buying journey. These insights are woven into engaging, valuable content — from optimized meta tags, header hierarchies, and internal linking structures to comprehensive landing pages and long-form guides that demonstrate topical authority. Every element is calibrated for maximum relevance, ensuring your pages answer the exact questions your audience is asking. Beyond written content, we optimize structured data markup (Schema.org JSON-LD) so search engines understand the context and relationships within your site. This structured approach to content is what separates professional search optimization from superficial keyword stuffing and allows your pages to qualify for rich results, featured snippets, and enhanced SERP appearances that drive significantly higher click-through rates."
              : 'Content-Strategie ist eine zentrale Säule unserer Methodik zur Suchmaschinenoptimierung. Wir führen umfangreiche Keyword-Recherchen durch, um hochgradig intent-basierte Suchbegriffe aufzudecken, die direkt für Ihre Branche und die Customer Journey Ihrer Kunden relevant sind. Diese Erkenntnisse fließen in ansprechende, wertvolle Inhalte ein — von optimierten Meta-Tags, Header-Hierarchien und internen Verlinkungsstrukturen bis hin zu umfassenden Zielseiten und ausführlichen Ratgebern, die thematische Autorität demonstrieren. Jedes Element wird auf maximale Relevanz kalibriert, damit Ihre Seiten genau die Fragen beantworten, die Ihre Zielgruppe stellt. Über geschriebene Inhalte hinaus optimieren wir strukturierte Daten (Schema.org JSON-LD), damit Suchmaschinen den Kontext und die Zusammenhänge Ihrer Website verstehen. Dieser strukturierte Ansatz zur Suchmaschinenoptimierung unterscheidet professionelle SEO-Arbeit von oberflächlichem Keyword-Stuffing und ermöglicht es Ihren Seiten, sich für Rich Results, Featured Snippets und erweiterte SERP-Darstellungen zu qualifizieren, die deutlich höhere Klickraten erzielen.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Local SEO is a critical focus area, particularly for businesses aiming to dominate their regional markets. As an agency rooted in Wetzlar, Coday understands the dynamics of local search in Hesse and Central Germany. We optimize your Google Business Profile with accurate categories, compelling descriptions, and a consistent NAP (Name, Address, Phone) across all directories and local citations. This ensures that customers searching for services in your area find you effortlessly. Equally important is the integration of Generative Engine Optimization (GEO) into your SEO strategy. With AI-powered search experiences — Google AI Overviews, ChatGPT, and Perplexity — reshaping how users discover businesses, your content must be structured so that large language models cite and recommend your brand. Our agency combines traditional search optimization with forward-looking GEO techniques, including semantic entity building, citation strategies for LLMs, and authority signals that position your business as the definitive answer in AI-generated results.'
              : 'Lokales SEO ist ein entscheidender Schwerpunkt, insbesondere für Unternehmen, die ihre regionalen Märkte dominieren wollen. Als Agentur mit Sitz in Wetzlar versteht Coday die Dynamik der lokalen Suche in Hessen und Mitteldeutschland. Wir optimieren Ihr Google Unternehmensprofil mit präzisen Kategorien, überzeugenden Beschreibungen und konsistenten NAP-Daten (Name, Adresse, Telefon) über alle Verzeichnisse und lokalen Zitationen hinweg. So stellen wir sicher, dass Kunden, die in Ihrer Region nach Dienstleistungen suchen, Sie mühelos finden. Ebenso wichtig ist die Integration von Generative Engine Optimization (GEO) in Ihre SEO-Strategie. KI-gestützte Sucherlebnisse — Google AI Overviews, ChatGPT und Perplexity — verändern grundlegend, wie Nutzer Unternehmen entdecken. Ihre Inhalte müssen so strukturiert sein, dass große Sprachmodelle Ihre Marke zitieren und empfehlen. Unsere Agentur verbindet klassische Suchmaschinenoptimierung mit zukunftsweisenden GEO-Techniken, darunter semantisches Entity-Building, Zitationsstrategien für LLMs und Autoritätssignale, die Ihr Unternehmen als definitive Antwort in KI-generierten Ergebnissen positionieren.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Search optimization is not a one-time project but an ongoing process of adaptation and refinement. Search algorithms evolve continuously, and an effective SEO strategy must evolve with them. Our agency provides continuous monitoring and transparent reporting that keeps you informed about ranking progress, traffic growth, keyword movements, and overall return on investment. We analyze user experience signals — including dwell time, bounce rates, and Core Web Vitals — to identify opportunities for improvement and secure top positions over time. Off-page authority building through strategic digital PR, high-quality backlink acquisition, and brand mentions across authoritative platforms strengthens your domain authority and competitive position. By partnering with Coday as your SEO agency, you gain a committed expert dedicated to expanding your digital footprint, consistently outperforming competitors, and establishing your brand as a trusted authority in your industry. Let us refine your on-page structure, backlink profile, and content architecture to create a sustainable pipeline of high-converting organic traffic that drives measurable business growth.'
              : 'Suchmaschinenoptimierung ist kein einmaliges Projekt, sondern ein fortlaufender Prozess der Anpassung und Verfeinerung. Suchalgorithmen entwickeln sich kontinuierlich weiter, und eine effektive SEO-Strategie muss sich mit ihnen weiterentwickeln. Unsere Agentur bietet kontinuierliches Monitoring und transparente Berichterstattung, die Sie über Ranking-Fortschritte, Traffic-Wachstum, Keyword-Bewegungen und den gesamten Return on Investment auf dem Laufenden hält. Wir analysieren Nutzererfahrungssignale — darunter Verweildauer, Absprungraten und Core Web Vitals — um Verbesserungspotenziale zu identifizieren und Spitzenpositionen langfristig zu sichern. Off-Page-Autoritätsaufbau durch strategische digitale PR, hochwertige Backlink-Akquise und Markenerwähnungen auf autoritären Plattformen stärkt Ihre Domain-Autorität und Wettbewerbsposition. Wenn Sie mit Coday als Ihrer SEO-Agentur zusammenarbeiten, gewinnen Sie einen engagierten Experten, der sich dafür einsetzt, Ihren digitalen Fußabdruck zu erweitern, Wettbewerber konstant zu übertreffen und Ihre Marke als vertrauenswürdige Autorität in Ihrer Branche zu etablieren. Lassen Sie uns Ihre On-Page-Struktur, Ihr Backlink-Profil und Ihre Content-Architektur verfeinern, um eine nachhaltige Pipeline für hochkonvertierenden organischen Traffic aufzubauen, der messbares Geschäftswachstum antreibt.'}
          </p>
        </div>
      </section>
    </>
  );
}
