import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { ORG_ID, getBreadcrumbSchema, getWebPageSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'GEO Agency Wetzlar | AI Search Optimization Hesse | Coday',
      description:
        'Generative Engine Optimization by Coday in Wetzlar. Make your brand visible in AI Overviews and ChatGPT searches. For businesses in Central Hesse.',
      keywords: [
        'Generative Engine Optimization',
        'GEO Agency Wetzlar',
        'AI Overviews Optimization',
        'ChatGPT SEO Agency',
        'Coday GEO',
      ],
      path: '/en/services/generative-engine-optimization',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'GEO Agentur Wetzlar | KI-Suchoptimierung Hessen | Coday',
    description:
      'Generative Engine Optimization von Coday in Wetzlar. Ihre Marke in AI Overviews und ChatGPT-Suchen sichtbar machen. Für Unternehmen in Mittelhessen.',
    keywords: [
      'Generative Engine Optimization',
      'GEO Agentur Wetzlar',
      'AI Overviews Optimierung',
      'ChatGPT SEO Agentur',
      'Coday Web GEO',
    ],
    path: '/de/services/generative-engine-optimization',
    type: 'money',
  });
}

const content = {
  de: {
    hero: {
      title: 'Generative Engine',
      titleHighlight: 'Optimization (GEO)',
      titleSuffix: 'Agentur',
      description:
        'Klassisches SEO stirbt. Die Zukunft gehört KI-Suchmaschinen (Google AI Overviews, Perplexity, ChatGPT Search). Wir optimieren Ihre Marke so, dass die KI Sie als einzige logische Antwort auf Nutzerfragen empfiehlt.',
      cta: 'GEO-Audit anfragen',
    },
    whyUs: {
      title: 'Warum GEO entscheidend für Ihren Umsatz ist',
      items: [
        {
          title: 'KI-Overviews dominieren die Suche',
          text: 'Nutzer klicken nicht mehr auf Links. Sie lesen die von KI generierten Zusammenfassungen. Wenn Ihr Unternehmen dort nicht erwähnt wird, existieren Sie für den Suchenden nicht.',
        },
        {
          title: 'Zitationen statt Backlinks',
          text: 'Die neuen Algorithmen (LLMs) werten semantische Zitationen höher als klassische Backlinks. Wir bauen Ihre Marke zur definitiven "Entity" in Ihrer Nische auf.',
        },
        {
          title: 'Wettbewerbsvorteil sichern',
          text: 'Während Ihre Konkurrenz noch Keywords in Texten versteckt, trainieren wir Sprachmodelle indirekt darauf, Sie als Marktführer zu erkennen.',
        },
      ],
    },
    services: {
      title: 'Unsere GEO-Services',
      items: [
        'Semantic Entity Building (Knowledge Graph)',
        'Content-Architektur für KI-Scraper',
        'Zitations-Aufbau & PR für LLMs',
        'Strukturierte Daten (Advanced JSON-LD)',
        'Technische Perfektion (Core Web Vitals)',
        'Autoritäts-Signale für Google SGE',
      ],
    },
    faq: {
      title: 'Häufige Fragen zu Generative Engine Optimization',
      items: [
        {
          q: 'Was ist der Unterschied zwischen SEO und GEO?',
          a: 'SEO (Search Engine Optimization) optimiert für Links und Algorithmen, um Nutzer zum Klicken zu bewegen. Als Generative Engine Optimization (GEO) Agentur optimieren wir für KI-Modelle, damit diese Ihre Inhalte in direkten Antworten und Zusammenfassungen zitieren.',
        },
        {
          q: 'Für wen lohnt sich GEO?',
          a: 'Für jedes Unternehmen, dessen Kunden nach Erklärungen, Vergleichen oder direkten Lösungen suchen. B2B, SaaS, Medizin, Finanzen und Premium-Dienstleister profitieren massiv von einer Generative Engine Optimization (GEO) Agentur.',
        },
        {
          q: 'Macht GEO klassisches SEO überflüssig?',
          a: 'Nein, es ist eine Evolution. Technische Perfektion (Pagespeed) und hochwertige Inhalte sind weiterhin die Basis. GEO setzt darauf auf und nutzt strukturierte Daten und Semantic Web Prinzipien, um KI-Bots zu lenken.',
        },
      ],
    },
    cta: {
      title: 'Bereit für die Suche der Zukunft?',
      description:
        'Lassen Sie uns Ihre Website auf die KI-Ära vorbereiten. Unverbindliche Beratung für Unternehmen.',
      button: 'Jetzt Strategie-Gespräch buchen',
    },
  },
  en: {
    hero: {
      title: 'Generative Engine',
      titleHighlight: 'Optimization (GEO)',
      titleSuffix: 'Agency',
      description:
        'Classic SEO is dying. The future belongs to AI search engines (Google AI Overviews, Perplexity, ChatGPT Search). As a specialized Generative Engine Optimization (GEO) Agency, we optimize your brand so AI recommends you as the only logical answer.',
      cta: 'Request GEO Audit',
    },
    whyUs: {
      title: 'Why GEO is crucial for your revenue',
      items: [
        {
          title: 'AI Overviews dominate search',
          text: "Users no longer click on links. They read AI-generated summaries. If your company isn't mentioned there, you don't exist to the searcher.",
        },
        {
          title: 'Citations instead of backlinks',
          text: 'New algorithms (LLMs) value semantic citations higher than classic backlinks. We build your brand into the definitive "Entity" in your niche.',
        },
        {
          title: 'Secure your competitive advantage',
          text: 'While your competitors are still hiding keywords in texts, we indirectly train language models to recognize you as the market leader.',
        },
      ],
    },
    services: {
      title: 'Our GEO Services',
      items: [
        'Semantic Entity Building (Knowledge Graph)',
        'Content Architecture for AI Scrapers',
        'Citation Building & PR for LLMs',
        'Structured Data (Advanced JSON-LD)',
        'Technical Perfection (Core Web Vitals)',
        'Authority Signals for Google SGE',
      ],
    },
    faq: {
      title: 'Frequently Asked Questions about GEO',
      items: [
        {
          q: 'What is the difference between SEO and GEO?',
          a: 'SEO (Search Engine Optimization) optimizes for links and algorithms to get users to click. As a Generative Engine Optimization (GEO) Agency, we optimize for AI models so they cite your content in direct answers and summaries.',
        },
        {
          q: 'Who benefits from GEO?',
          a: 'Any business whose customers search for explanations, comparisons, or direct solutions. B2B, SaaS, medical, finance, and premium service providers benefit massively from partnering with a Generative Engine Optimization (GEO) Agency.',
        },
        {
          q: 'Does GEO make classic SEO obsolete?',
          a: 'No, it is an evolution. Technical perfection (Pagespeed) and high-quality content remain the foundation. A Generative Engine Optimization (GEO) Agency builds on this, using structured data and Semantic Web principles to guide AI bots.',
        },
      ],
    },
    cta: {
      title: 'Ready for the search of the future?',
      description: 'Let us prepare your website for the AI era. Free consultation for businesses.',
      button: 'Book Strategy Call Now',
    },
  },
};

export default async function GeoServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const t = _locale === 'en' ? content.en : content.de;

  const pageUrl = `${BASE_URL}/${_locale}/services/generative-engine-optimization`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    // Was hardcoded without a locale segment, so /de and /en both claimed
    // `…/services/generative-engine-optimization#service` — a URI matching no
    // real route, and one node for two pages.
    '@id': `${pageUrl}#service`,
    name: 'Generative Engine Optimization (GEO)',
    provider: {
      '@id': ORG_ID,
    },
    areaServed: [
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    description: t.hero.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: '2500.00',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: locale === 'en' ? 'Home' : 'Startseite', url: `/${locale}` },
      { name: locale === 'en' ? 'Services' : 'Leistungen', url: `/${locale}/services` },
      { name: 'GEO', url: `/${locale}/services/generative-engine-optimization` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // ORG_ID resolves against the Organization node the root layout emits.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: `${t.hero.title} ${t.hero.titleHighlight} ${t.hero.titleSuffix}`,
        description: t.hero.description,
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      serviceJsonLd,
      faqJsonLd,
    ],
  };

  return (
    <>
      <div className="flex-1 w-full flex flex-col">
        <script
          id="schema-geo"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <section className="py-[var(--space-section)] relative px-4 md:px-8 bg-gradient-to-br from-bg-primary to-bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.08),transparent_60%)]" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              {t.hero.title} <span className="text-primary-500">{t.hero.titleHighlight}</span>{' '}
              {t.hero.titleSuffix}
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                {t.hero.cta}
              </Button>
            </Link>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-[var(--space-section)] px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.whyUs.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t.whyUs.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary-500/30 transition-colors motion-reduce:duration-[0.01ms]"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-[var(--space-section)] px-4 bg-neutral-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">{t.services.title}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {t.services.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5"
                >
                  <span className="text-primary-500 text-xl flex-shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-[var(--space-section)] px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">{t.faq.title}</h2>
            <div className="space-y-6">
              {t.faq.items.map((item, i) => (
                <div key={i} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.q}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-[var(--space-section)] px-4 bg-gradient-to-br from-primary-900/20 to-bg-primary">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">{t.cta.description}</p>
            <Link href="/booking">
              <Button variant="primary" size="lg">
                {t.cta.button}
              </Button>
            </Link>
          </div>
        </section>
      </div>
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Generative Engine Optimization (GEO) in Wetzlar and Hesse: The Future of Digital Visibility'
            : 'Generative Engine Optimization (GEO) in Wetzlar und Hessen: Die Zukunft der digitalen Sichtbarkeit'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'Generative Engine Optimization (GEO) represents the next evolutionary step in digital visibility and is fundamentally changing how businesses are discovered by their potential customers online. Unlike traditional Search Engine Optimization (SEO), which focuses primarily on rankings in static search result lists and building backlinks, GEO concentrates on how Artificial Intelligence and Large Language Models (LLMs) process, structure, and reproduce information. In a world where platforms like ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot are increasingly becoming the first point of contact for complex search queries, businesses must reposition themselves. As a specialized GEO agency based in Wetzlar, Coday is at the forefront of this transformation, helping companies across Hesse and beyond adapt to the new AI-driven search paradigm before their competitors do.'
              : 'Generative Engine Optimization (GEO) repräsentiert den nächsten evolutionären Schritt in der digitalen Sichtbarkeit und verändert grundlegend, wie Unternehmen von ihren potenziellen Kunden online gefunden werden. Anders als bei klassischer Search Engine Optimization (SEO), bei der es primär um Rankings in statischen Suchergebnislisten und den Aufbau von Backlinks geht, konzentriert sich GEO darauf, wie Künstliche Intelligenz und große Sprachmodelle (Large Language Models, LLMs) Informationen verarbeiten, strukturieren und wiedergeben. In einer Welt, in der Plattformen wie ChatGPT, Perplexity, Google AI Overviews und Bing Copilot zunehmend die erste Anlaufstelle für komplexe Suchanfragen werden, müssen sich Unternehmen neu positionieren. Als spezialisierte GEO-Agentur mit Sitz in Wetzlar steht Coday an der Spitze dieser Transformation und hilft Unternehmen in ganz Hessen und darüber hinaus, sich an das neue, KI-gesteuerte Suchparadigma anzupassen, bevor es die Konkurrenz tut.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'As a specialized GEO agency headquartered in Wetzlar, we support businesses throughout Central Hesse — from Gießen and Marburg to Frankfurt — in achieving visibility within these new AI-powered search environments. Our approach is built on Semantic Entity Building and the creation of a robust digital identity. This means we don\'t just optimize your brand for algorithms; we establish it as an undisputed authority and trusted source ("Entity") within your specific industry. When a user asks an AI about the best providers, solutions, or services in your segment, the AI must cite your brand as the logical and reliable answer. Our AI search optimization methodology goes beyond surface-level tactics. We analyze how large language models interpret your industry, identify the knowledge gaps that your brand can authoritatively fill, and create content architectures that make your expertise unmistakable to AI systems.'
              : 'Als spezialisierte GEO-Agentur mit Sitz in Wetzlar unterstützen wir Unternehmen in ganz Mittelhessen – von Gießen über Marburg bis Frankfurt – dabei, in diesen neuen, KI-gestützten Suchumgebungen präsent zu sein. Unser Ansatz basiert auf Semantic Entity Building und der Schaffung einer robusten digitalen Identität. Das bedeutet, dass wir Ihre Marke nicht nur für Algorithmen optimieren, sondern sie als unumstrittene Autorität und vertrauenswürdige Quelle („Entity") in Ihrer spezifischen Branche etablieren. Wenn ein Nutzer eine KI nach den besten Anbietern, Lösungen oder Dienstleistungen in Ihrem Segment fragt, muss die KI Ihre Marke als logische und verlässliche Antwort zitieren. Unsere KI-Suchoptimierung geht über oberflächliche Taktiken hinaus. Wir analysieren, wie große Sprachmodelle Ihre Branche interpretieren, identifizieren die Wissenslücken, die Ihre Marke autoritativ füllen kann, und erstellen Content-Architekturen, die Ihre Expertise für KI-Systeme unverkennbar machen.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'The mechanisms of GEO require deep technical understanding. We use advanced structured data (Advanced JSON-LD) to precisely communicate the context and relationships of your content to AI scrapers and crawlers. It is no longer sufficient to simply place keywords in texts. Instead, content must be structured so that language models can extract the facts, expertise, and nuances of your offering without errors. Citation building and digital PR play a decisive role here, as LLMs validate information by cross-referencing consistency and mentions across various high-authority platforms. For businesses in Wetzlar, Hesse, and throughout Germany, this AI search optimization approach ensures that your brand is not just indexed but actively recommended. We build citation networks that establish your business as a recognized entity across the platforms that AI models trust most — from industry publications and authoritative directories to expert forums and press coverage.'
              : 'Die Mechanismen von GEO erfordern ein tiefes technisches Verständnis. Wir nutzen fortschrittliche Strukturierte Daten (Advanced JSON-LD), um KI-Scrapern und Crawlern den Kontext und die Relationen Ihrer Inhalte präzise zu vermitteln. Es reicht nicht mehr aus, bloße Keywords in Texten zu platzieren. Stattdessen müssen Inhalte so strukturiert sein, dass Sprachmodelle die Fakten, Expertise und Nuancen Ihres Angebots fehlerfrei extrahieren können. Zitations-Aufbau (Citation Building) und digitale PR spielen hierbei eine entscheidende Rolle, da LLMs Informationen validieren, indem sie Konsistenz und Erwähnungen über verschiedene, hoch-autoritäre Plattformen hinweg abgleichen. Für Unternehmen in Wetzlar, Hessen und in ganz Deutschland stellt dieser KI-Suchoptimierungsansatz sicher, dass Ihre Marke nicht nur indexiert, sondern aktiv empfohlen wird. Wir bauen Zitationsnetzwerke auf, die Ihr Unternehmen als anerkannte Entität auf den Plattformen etablieren, denen KI-Modelle am meisten vertrauen — von Fachpublikationen und autoritativen Verzeichnissen bis hin zu Expertenforen und Presseberichterstattung.'}
          </p>
          <p>
            {_locale === 'en'
              ? "Furthermore, the technical perfection of your website — particularly excellent Core Web Vitals — is an essential prerequisite. AI bots prefer fast, secure, and accessible websites because these can be reliably crawled and their content confidently cited. With our expertise in Generative Engine Optimization, we secure a decisive competitive advantage for your business. While many competitors still cling to outdated SEO tactics, our GEO agency indirectly trains AI models to recognize your company as the market leader. Whether B2B, SaaS, medical, finance, or premium services — GEO is the indispensable strategy to not only maintain relevance in the AI era but to harness the full potential of modern information retrieval for your business growth. Partnering with a forward-thinking GEO agency in Wetzlar means your brand is prepared for both today's search landscape and the AI-first future that is rapidly becoming reality across Hesse and all of Germany."
              : 'Darüber hinaus ist die technische Perfektion Ihrer Website – insbesondere exzellente Core Web Vitals – eine zwingende Voraussetzung. KI-Bots bevorzugen schnelle, sichere und barrierefreie Websites, da diese verlässlich gecrawlt und deren Inhalte zuverlässig zitiert werden können. Mit unserer Expertise im Bereich Generative Engine Optimization sichern wir Ihnen einen entscheidenden Wettbewerbsvorteil. Während viele Konkurrenten noch an veralteten SEO-Taktiken festhalten, trainiert unsere GEO-Agentur indirekt die KI-Modelle darauf, Ihr Unternehmen als Marktführer zu erkennen. Ob B2B, SaaS, Medizin, Finanzen oder Premium-Dienstleistungen – GEO ist die unverzichtbare Strategie, um in der KI-Ära nicht nur an Relevanz zu behalten, sondern das volle Potenzial der modernen Informationsbeschaffung für Ihr Unternehmenswachstum zu nutzen. Die Partnerschaft mit einer zukunftsorientierten GEO-Agentur in Wetzlar bedeutet, dass Ihre Marke sowohl für die heutige Suchlandschaft als auch für die KI-first Zukunft vorbereitet ist, die in Hessen und ganz Deutschland schnell Realität wird.'}
          </p>
        </div>
      </section>
    </>
  );
}
