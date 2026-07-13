import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { ORG_ID } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'GEO Agency Wetzlar | AI Search Optimization Hesse',
      description:
        'Generative Engine Optimization by Coday in Wetzlar. Make your brand visible in AI Overviews and ChatGPT searches. For businesses in Central Hesse.',
      path: '/en/services/generative-engine-optimization',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'GEO Agentur Wetzlar | KI-Suchoptimierung Hessen',
    description:
      'Generative Engine Optimization von Coday in Wetzlar. Ihre Marke in AI Overviews und ChatGPT-Suchen sichtbar machen. Für Unternehmen in Mittelhessen.',
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
          a: 'SEO (Search Engine Optimization) optimiert für Links und Algorithmen, um Nutzer zum Klicken zu bewegen. GEO (Generative Engine Optimization) optimiert für KI-Modelle, damit diese Ihre Inhalte in direkten Antworten und Zusammenfassungen zitieren.',
        },
        {
          q: 'Für wen lohnt sich GEO?',
          a: 'Für jedes Unternehmen, dessen Kunden nach Erklärungen, Vergleichen oder direkten Lösungen suchen. B2B, SaaS, Medizin, Finanzen und Premium-Dienstleister profitieren massiv.',
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
        'Classic SEO is dying. The future belongs to AI search engines (Google AI Overviews, Perplexity, ChatGPT Search). We optimize your brand so AI recommends you as the only logical answer.',
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
          a: 'SEO optimizes for links and algorithms to get users to click. GEO optimizes for AI models so they cite your content in direct answers and summaries.',
        },
        {
          q: 'Who benefits from GEO?',
          a: 'Any company whose customers search for explanations, comparisons, or direct solutions. B2B, SaaS, medical, finance, and premium service providers benefit massively.',
        },
        {
          q: 'Does GEO make classic SEO obsolete?',
          a: "No, it's an evolution. Technical perfection (pagespeed) and high-quality content are still the foundation. GEO builds upon this, using structured data and Semantic Web principles to guide AI bots.",
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
  setRequestLocale(locale);
  const t = locale === 'en' ? content.en : content.de;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.codayweb.de/services/generative-engine-optimization#service',
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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'GEO Agency Wetzlar | AI Search Optimization Hesse | Coday'
      : 'GEO Agentur Wetzlar | KI-Suchoptimierung Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Generative Engine Optimization by Coday in Wetzlar. Make your brand visible in AI Overviews and ChatGPT searches. For businesses in Central Hesse.'
      : 'Generative Engine Optimization von Coday in Wetzlar. Ihre Marke in AI Overviews und ChatGPT-Suchen sichtbar machen. Für Unternehmen in Mittelhessen.';
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? `Coday is your professional web design agency from Wetzlar (Hesse) and your reliable partner for digital excellence, UI/UX design, and technical web development at the highest level. We specialize in designing and developing custom, high-performance, and future-proof digital solutions for small and medium-sized enterprises, innovative startups, as well as established corporations. Our extensive portfolio of services ranges from the conceptualization and implementation of modern web applications, complex corporate websites, B2B and B2C e-commerce platforms, to the integration of flexible headless CMS systems and robust API connections. For the technical execution, we consistently rely on state-of-the-art and proven technologies such as Next.js, React, TypeScript, Vercel, and Tailwind CSS to ensure unparalleled quality, security, and scalability. We deeply understand that a successful digital presence in today's highly competitive landscape requires much more than just an appealing visual design. It must function as a powerful sales channel, build lasting customer trust, and deliver measurable business results. For this reason, we place an extremely strong focus on comprehensive search engine optimization (SEO), lightning-fast loading times (Performance & Core Web Vitals), strict digital accessibility (Accessibility Standards), and an outstanding, user-centric user experience (UX) in every single project we undertake. Our highly experienced web developers and designers will guide you as your dedicated digital partners throughout the entire project lifecycle: starting with initial strategic consulting, through detailed prototyping and wireframing, all the way to a seamless launch, ongoing hosting, and long-term technical maintenance. Thanks to our data-driven approach and our extensive expertise across various industries – including automotive, construction, hospitality, real estate, healthcare, professional services, and consulting – we create digital brand experiences that sustainably inspire your demanding target audience and measurably increase your conversion rates. Coday stands for transparent communication, premium code quality, and genuine partnership. Let us drive your digital transformation forward together, digitize your business processes, and successfully translate your entrepreneurial vision into the digital age.`
            : `Coday ist Ihre professionelle Webdesign Agentur aus Wetzlar (Hessen) und Ihr verlässlicher Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung auf höchstem Niveau. Wir haben uns darauf spezialisiert, maßgeschneiderte, hochperformante und zukunftssichere digitale Lösungen für kleine und mittelständische Unternehmen, innovative Startups sowie etablierte Konzerne zu konzipieren und zu entwickeln. Unser umfangreiches Leistungsportfolio reicht von der Konzeption und Umsetzung moderner Webanwendungen, komplexer Corporate Websites, B2B und B2C E-Commerce Plattformen, bis hin zur Integration flexibler Headless CMS Systeme und API-Schnittstellen. Bei der technischen Umsetzung setzen wir konsequent auf modernste und bewährte Technologien wie Next.js, React, TypeScript, Vercel und Tailwind CSS, um höchste Qualität und Skalierbarkeit zu gewährleisten. Wir verstehen tiefgründig, dass eine erfolgreiche digitale Präsenz in der heutigen Zeit weit mehr als nur ein ansprechendes visuelles Design benötigt. Sie muss als starker Vertriebskanal fungieren, Vertrauen aufbauen und messbare geschäftliche Ergebnisse liefern. Aus diesem Grund legen wir bei jedem Projekt einen extrem starken Fokus auf ganzheitliche Suchmaschinenoptimierung (SEO), blitzschnelle Ladezeiten (Performance & Core Web Vitals), strikte Barrierefreiheit (Accessibility Standards) sowie eine herausragende, nutzerzentrierte User Experience (UX). Unsere erfahrenen Webentwickler und Designer begleiten Sie als digitale Partner durch den gesamten Prozess: angefangen bei der initialen Strategieberatung, über detailliertes Prototyping und Wireframing, bis hin zum nahtlosen Launch, fortlaufendem Hosting und langfristiger technischer Wartung. Dank unseres datengetriebenen Ansatzes und unserer weitreichenden Expertise in diversen Branchen – darunter Automobil, Handwerk, Gastronomie, Immobilien, Gesundheitswesen, Dienstleistung und Unternehmensberatung – kreieren wir digitale Markenerlebnisse, die Ihre anspruchsvolle Zielgruppe nachhaltig begeistern und Ihre Konversionsraten messbar steigern. Coday steht für transparente Kommunikation, erstklassige Code-Qualität und echte Partnerschaft. Lassen Sie uns gemeinsam Ihre digitale Transformation vorantreiben, Prozesse digitalisieren und Ihre unternehmerische Vision erfolgreich ins digitale Zeitalter übersetzen.`}
        </p>
      </div>
      <div className="flex-1 w-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, faqJsonLd]) }}
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
    </>
  );
}
