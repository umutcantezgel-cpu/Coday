import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Next.js Developer Hessen | Web Solutions',
      description:
        'Web agency and Next.js developer in Hessen. Custom web development, Headless CMS and SEO for the German Mittelstand.',
      path: '/en/standorte/hessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Next.js Entwickler Hessen | Web-Lösungen',
    description:
      'Webagentur und Next.js Entwickler in Hessen. Webentwicklung, Headless CMS und SEO für den Mittelstand.',
    path: '/de/standorte/hessen',
    type: 'money',
  });
}

const content = {
  de: {
    hero: {
      title: 'Next.js Entwicklung in',
      titleHighlight: 'Hessen',
      description:
        'Von Frankfurt bis Kassel. Ich helfe dem hessischen Mittelstand bei der digitalen Transformation mit modernen, blitzschnellen Web-Architekturen.',
      cta: 'Kostenlose Strategy Session',
    },
    network: {
      title: 'Moderne Web-Entwicklung für Hessens Wirtschaft',
      items: [
        {
          title: 'Hessenweites Netzwerk',
          text: 'Egal ob Startups in Frankfurt am Main, Industrie-Champions in Kassel oder Hidden Champions in Mittelhessen – wir betreuen Kunden im gesamten Bundesland mit maßgeschneiderten Weblösungen.',
        },
        {
          title: 'Enterprise-Grade Performance',
          text: 'Als spezialisierter Next.js Entwickler in Hessen sorge ich dafür, dass Ihre Website nicht nur gut aussieht, sondern auch extrem schnell lädt und perfekt bei Google rankt (Core Web Vitals).',
        },
        {
          title: 'DSGVO-konform & sicher',
          text: 'Für den deutschen Mittelstand ist Rechtssicherheit essenziell. Wir nutzen EU-Server, Cookie-Consent-Management und verzichten auf unnötige US-Tracker.',
        },
        {
          title: 'Persönliche Betreuung',
          text: 'Kein Callcenter, kein Projektmanager-Ping-Pong. Bei Coday sprechen Sie direkt mit dem Entwickler. Für Kickoff-Meetings komme ich gerne zu Ihnen.',
        },
      ],
    },
    services: {
      title: 'Leistungen für hessische Unternehmen',
      items: [
        'Next.js & React Webentwicklung',
        'Headless CMS (Sanity, Contentful)',
        'SEO & lokale Suchmaschinenoptimierung',
        'UI/UX Design & Prototyping',
        'Performance-Optimierung & Core Web Vitals',
        'E-Commerce mit Shopify & Custom Solutions',
        'API-Integrationen & Automatisierung',
        'WordPress-zu-Next.js Migration',
      ],
    },
    regions: {
      title: 'Unsere Regionen in Hessen',
      items: [
        { name: 'Rhein-Main-Gebiet', cities: 'Frankfurt, Wiesbaden, Darmstadt, Offenbach, Mainz' },
        { name: 'Mittelhessen', cities: 'Wetzlar, Gießen, Marburg, Herborn, Dillenburg' },
        { name: 'Nordhessen', cities: 'Kassel, Fulda, Bad Hersfeld' },
        { name: 'Südhessen', cities: 'Darmstadt, Bensheim, Viernheim' },
      ],
    },
    references: {
      title: 'Erfolgsgeschichten aus Hessen',
      items: [
        {
          name: 'Batherm',
          text: 'Professionelle Webpräsenz für den Heizungs- und Sanitärfachbetrieb. Moderne Darstellung mit optimierter lokaler Auffindbarkeit.',
        },
        {
          name: 'MS Schlüsseldienst Wetzlar',
          text: 'Lokale SEO-Strategie und performante Website. Ergebnis: Top-Platzierung bei lokalen Suchanfragen.',
        },
        {
          name: 'Lindener Ratsstuben',
          text: 'Digitale Visitenkarte für die traditionelle Gastronomie. Responsive Design mit Online-Reservierung.',
        },
      ],
    },
    faq: {
      title: 'FAQ für den hessischen Mittelstand',
      items: [
        {
          q: 'Arbeiten Sie auch für Unternehmen in Gießen, Marburg oder Frankfurt?',
          a: 'Ja, ich arbeite remote mit Kunden in ganz Hessen und bin für wichtige Kickoff-Meetings auch gerne vor Ort in Frankfurt, Darmstadt, Gießen oder Marburg.',
        },
        {
          q: 'Sind Ihre Systeme DSGVO-konform?',
          a: 'Selbstverständlich. Für den deutschen Mittelstand ist Rechtssicherheit essenziell. Wir nutzen EU-Server, Cookie-Consent-Management und verzichten auf unnötige US-Tracker, sofern nicht anders gewünscht.',
        },
        {
          q: 'Was kostet eine professionelle Website?',
          a: 'Projekte starten typischerweise bei 5.000€ für eine professionelle Next.js Website. Enterprise-Lösungen und komplexe Web-Apps werden individuell kalkuliert. Durch mein Solo-Agentur-Modell spare ich Ihnen die Overhead-Kosten großer Agenturen.',
        },
        {
          q: 'Wie unterstützen Sie bei der Migration von WordPress?',
          a: 'Ich übernehme die komplette Migration Ihrer bestehenden WordPress-Seite zu Next.js und einem Headless CMS. Dabei bleiben SEO-Rankings erhalten und die Performance verbessert sich drastisch.',
        },
        {
          q: 'Bieten Sie auch Wartung und Support an?',
          a: 'Ja, nach dem Go-Live biete ich monatliche Wartungspakete an. Diese umfassen Sicherheitsupdates, Performance-Monitoring und Content-Pflege.',
        },
        {
          q: 'Wie läuft ein typisches Projekt ab?',
          a: 'Erstgespräch → Anforderungsanalyse → Design-Konzept → Entwicklung → Testing → Go-Live. Die gesamte Kommunikation ist transparent und Sie erhalten regelmäßige Updates.',
        },
        {
          q: 'Können Sie auch bestehende Websites optimieren?',
          a: 'Ja, Performance-Audits und Core Web Vitals Optimierung gehören zu meinen Kernleistungen. Oft lässt sich die Ladezeit bestehender Websites um 50-80% reduzieren.',
        },
      ],
    },
    cta: {
      title: 'Digitale Transformation für Hessen',
      description:
        'Ob Frankfurt, Wetzlar oder Kassel – lassen Sie uns gemeinsam Ihre digitale Zukunft gestalten. Kostenlose Erstberatung, unverbindlich.',
      button: 'Strategy Session buchen',
    },
  },
  en: {
    hero: {
      title: 'Next.js Development in',
      titleHighlight: 'Hesse',
      description:
        'From Frankfurt to Kassel. I help the Hessian SMB sector with digital transformation using modern, blazing-fast web architectures.',
      cta: 'Free Strategy Session',
    },
    network: {
      title: "Modern Web Development for Hesse's Economy",
      items: [
        {
          title: 'Hesse-wide Network',
          text: 'Whether startups in Frankfurt, industry champions in Kassel, or hidden champions in Central Hesse – we serve clients across the entire state with tailored web solutions.',
        },
        {
          title: 'Enterprise-Grade Performance',
          text: 'As a specialized Next.js developer in Hesse, I ensure your website not only looks great but also loads extremely fast and ranks perfectly on Google (Core Web Vitals).',
        },
        {
          title: 'GDPR-compliant & Secure',
          text: 'For the German SMB sector, legal certainty is essential. We use EU servers, cookie consent management, and avoid unnecessary US trackers.',
        },
        {
          title: 'Personal Support',
          text: "No call center, no project manager ping-pong. At Coday, you speak directly with the developer. I'm happy to come to you for kickoff meetings.",
        },
      ],
    },
    services: {
      title: 'Services for Hessian Businesses',
      items: [
        'Next.js & React Web Development',
        'Headless CMS (Sanity, Contentful)',
        'SEO & Local Search Optimization',
        'UI/UX Design & Prototyping',
        'Performance Optimization & Core Web Vitals',
        'E-Commerce with Shopify & Custom Solutions',
        'API Integrations & Automation',
        'WordPress-to-Next.js Migration',
      ],
    },
    regions: {
      title: 'Our Regions in Hesse',
      items: [
        { name: 'Rhine-Main Area', cities: 'Frankfurt, Wiesbaden, Darmstadt, Offenbach, Mainz' },
        { name: 'Central Hesse', cities: 'Wetzlar, Gießen, Marburg, Herborn, Dillenburg' },
        { name: 'Northern Hesse', cities: 'Kassel, Fulda, Bad Hersfeld' },
        { name: 'Southern Hesse', cities: 'Darmstadt, Bensheim, Viernheim' },
      ],
    },
    references: {
      title: 'Success Stories from Hesse',
      items: [
        {
          name: 'Batherm',
          text: 'Professional web presence for the heating and sanitary specialist. Modern presentation with optimized local discoverability.',
        },
        {
          name: 'MS Schlüsseldienst Wetzlar',
          text: 'Local SEO strategy and performant website. Result: Top ranking for local search queries.',
        },
        {
          name: 'Lindener Ratsstuben',
          text: 'Digital business card for traditional gastronomy. Responsive design with online reservation.',
        },
      ],
    },
    faq: {
      title: 'FAQ for Hessian Businesses',
      items: [
        {
          q: 'Do you also work with companies in Gießen, Marburg or Frankfurt?',
          a: 'Yes, I work remotely with clients across all of Hesse and am happy to attend important kickoff meetings in Frankfurt, Darmstadt, Gießen, or Marburg.',
        },
        {
          q: 'Are your systems GDPR-compliant?',
          a: 'Absolutely. For the German SMB sector, legal certainty is essential. We use EU servers, cookie consent management, and avoid unnecessary US trackers unless requested otherwise.',
        },
        {
          q: 'What does a professional website cost?',
          a: 'Projects typically start at €5,000 for a professional Next.js website. Enterprise solutions and complex web apps are individually quoted. My solo agency model saves you the overhead costs of large agencies.',
        },
        {
          q: 'How do you support WordPress migration?',
          a: 'I handle the complete migration of your existing WordPress site to Next.js and a headless CMS. SEO rankings are preserved and performance improves dramatically.',
        },
        {
          q: 'Do you also offer maintenance and support?',
          a: 'Yes, after go-live I offer monthly maintenance packages including security updates, performance monitoring, and content management.',
        },
        {
          q: 'What does a typical project look like?',
          a: 'Initial meeting → Requirements analysis → Design concept → Development → Testing → Go-live. All communication is transparent with regular updates.',
        },
        {
          q: 'Can you also optimize existing websites?',
          a: 'Yes, performance audits and Core Web Vitals optimization are among my core services. Often, existing website load times can be reduced by 50-80%.',
        },
      ],
    },
    cta: {
      title: 'Digital Transformation for Hesse',
      description:
        "Whether Frankfurt, Wetzlar or Kassel – let's shape your digital future together. Free initial consultation, no obligations.",
      button: 'Book Strategy Session',
    },
  },
};

export default async function HessenLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = locale === 'en' ? content.en : content.de;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Coday Web Hessen',
    image: 'https://codayweb.de/images/brand/coday-logo-footer.webp',
    '@id': 'https://codayweb.de/standorte/hessen',
    url: 'https://codayweb.de/standorte/hessen',
    telephone: '+4917641195301',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    areaServed: [
      { '@type': 'State', name: 'Hessen' },
      { '@type': 'City', name: 'Frankfurt am Main' },
      { '@type': 'City', name: 'Wetzlar' },
      { '@type': 'City', name: 'Gießen' },
      { '@type': 'City', name: 'Kassel' },
      { '@type': 'City', name: 'Darmstadt' },
      { '@type': 'City', name: 'Marburg' },
    ],
    priceRange: '€€',
    knowsAbout: ['Next.js', 'Web Design', 'SEO', 'Headless CMS', 'Sanity', 'React'],
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

  return (
    <main className="flex-1 w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="py-[var(--space-section)] relative px-4 md:px-8 bg-gradient-to-br from-bg-primary to-bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            {t.hero.title} <span className="text-primary-500">{t.hero.titleHighlight}</span>
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

      {/* Network Section */}
      <section className="py-[var(--space-section)] px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.network.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.network.items.map((item, i) => (
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

      {/* Regions Section */}
      <section className="py-[var(--space-section)] px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.regions.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.regions.items.map((region, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] p-6 rounded-2xl border border-white/10"
              >
                <h3 className="text-lg font-bold text-white mb-2">{region.name}</h3>
                <p className="text-sm text-gray-400">{region.cities}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-[var(--space-section)] px-4 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.references.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.references.items.map((ref, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] p-8 rounded-2xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-lg">{ref.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{ref.name}</h3>
                <p className="text-gray-400 leading-relaxed">{ref.text}</p>
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
                <h4 className="text-lg font-semibold text-white mb-3">{item.q}</h4>
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
    </main>
  );
}
