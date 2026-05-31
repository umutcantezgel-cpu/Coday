import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Agency Wetzlar | Next.js & Web Design',
      description:
        'Local expertise meets high-end tech. Your web agency in Wetzlar for Next.js, Headless CMS and web design. Personal meetings in Central Hesse.',
      path: '/en/standorte/wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webagentur Wetzlar | Next.js & Webdesign',
    description:
      'Lokale Expertise trifft auf High-End Tech. Ihre Webagentur in Wetzlar für Next.js, Headless CMS und Webdesign. Persönliche Treffen in Mittelhessen.',
    path: '/de/standorte/wetzlar',
    type: 'money',
  });
}

const content = {
  de: {
    hero: {
      title: 'Ihre',
      titleHighlight: 'Webagentur',
      titleSuffix: 'in Wetzlar',
      description:
        'Persönliche Beratung in Mittelhessen. Als Solo-Founder kombiniere ich lokales Marktverständnis mit modernster Next.js Technologie für messbare digitale Ergebnisse.',
      cta: 'Gespräch vereinbaren',
    },
    whyLocal: {
      title: 'Warum Coday in Wetzlar?',
      items: [
        {
          title: 'Persönliche Treffen',
          text: 'Ob in der Wetzlarer Altstadt auf einen Kaffee oder direkt bei Ihnen im Büro im Lahn-Dill-Kreis. Nähe schafft Vertrauen und kurze Kommunikationswege.',
        },
        {
          title: 'Lokale Marktkenntnis',
          text: 'Wetzlar ist die Stadt der Optik und Präzision. Wir wissen, was der mittelhessische Mittelstand braucht – keine Buzzwords, sondern messbare Ergebnisse durch performantes Webdesign.',
        },
        {
          title: 'Globale Qualität',
          text: 'Lokal ansässig, aber technologisch auf dem Niveau globaler Tech-Startups. Durch AI-augmented Craftsmanship liefere ich Enterprise-Architekturen zu fairen Konditionen.',
        },
      ],
    },
    services: {
      title: 'Unsere Leistungen in Wetzlar',
      items: [
        'Webdesign & UI/UX Entwicklung',
        'Regionale SEO für Mittelhessen',
        'Headless CMS Lösungen (Sanity)',
        'Next.js Webentwicklung & Migration',
        'Performance-Optimierung (Core Web Vitals)',
        'E-Commerce Lösungen für den lokalen Handel',
      ],
    },
    references: {
      title: 'Vertrauen aus der Region',
      items: [
        {
          name: 'Batherm',
          description:
            'Professionelle Webpräsenz für den Heizungs- und Sanitärfachbetrieb aus der Region. Moderne Darstellung der Leistungen mit optimierter lokaler Auffindbarkeit.',
        },
        {
          name: 'MS Schlüsseldienst Wetzlar',
          description:
            'Lokale SEO-Strategie und performante Website für den Schlüsselnotdienst in Wetzlar. Ergebnis: Top-Platzierung bei „Schlüsseldienst Wetzlar" in der Google-Suche.',
        },
        {
          name: 'Lindener Ratsstuben',
          description:
            'Digitale Visitenkarte für die traditionelle Gastronomie. Responsive Webdesign mit Online-Reservierung und optimierter Google-My-Business Integration.',
        },
      ],
    },
    faq: {
      title: 'Häufige Fragen',
      items: [
        {
          q: 'Treffen wir uns persönlich?',
          a: 'Ja, für Unternehmen im Raum Wetzlar, Gießen und Herborn bevorzuge ich ein initiales persönliches Kennenlernen. Danach arbeiten wir hybrid – vor Ort und remote.',
        },
        {
          q: 'Was kostet eine Website in Wetzlar?',
          a: 'Als Solo-Agentur biete ich ein exzellentes Preis-Leistungs-Verhältnis. Kleine Next.js Projekte starten bei 5.000€, komplexe Web-Apps werden individuell kalkuliert.',
        },
        {
          q: 'Wie lange dauert ein Website-Projekt?',
          a: 'Ein typisches Projekt dauert 4-8 Wochen. Von der Erstberatung bis zum Go-Live begleite ich Sie persönlich durch jeden Schritt.',
        },
        {
          q: 'Bieten Sie auch SEO für den Raum Wetzlar an?',
          a: 'Ja, regionale Suchmaschinenoptimierung ist einer meiner Schwerpunkte. Ich helfe Ihnen, bei lokalen Suchanfragen wie „[Branche] Wetzlar" ganz oben zu erscheinen.',
        },
        {
          q: 'Arbeiten Sie auch mit Unternehmen außerhalb von Wetzlar?',
          a: 'Selbstverständlich. Neben Wetzlar betreue ich Kunden in Gießen, Herborn, Dillenburg, Limburg und im gesamten Lahn-Dill-Kreis sowie in ganz Hessen.',
        },
        {
          q: 'Warum eine Solo-Agentur statt einer großen Firma?',
          a: 'Bei mir sprechen Sie immer mit dem Entwickler selbst – kein Zwischenmann, keine Missverständnisse. Sie bekommen Enterprise-Qualität zu fairen Konditionen, weil ich keine Overhead-Kosten einer großen Agentur habe.',
        },
      ],
    },
    cta: {
      title: 'Bereit für Ihre neue Website?',
      description:
        'Lassen Sie uns bei einem Kaffee in Wetzlar über Ihr Projekt sprechen. Kostenlose Erstberatung, unverbindlich.',
      button: 'Jetzt Termin vereinbaren',
    },
  },
  en: {
    hero: {
      title: 'Your',
      titleHighlight: 'Web Agency',
      titleSuffix: 'in Wetzlar',
      description:
        'Personal consulting in Central Hesse. As a solo founder, I combine local market understanding with cutting-edge Next.js technology for measurable digital results.',
      cta: 'Schedule a Meeting',
    },
    whyLocal: {
      title: 'Why Coday in Wetzlar?',
      items: [
        {
          title: 'Personal Meetings',
          text: "Whether for a coffee in Wetzlar's old town or directly at your office in the Lahn-Dill district. Proximity builds trust and shortens communication.",
        },
        {
          title: 'Local Market Knowledge',
          text: 'Wetzlar is the city of optics and precision. We know what the Central Hessian SMB market needs – no buzzwords, just measurable results through performant web design.',
        },
        {
          title: 'Global Quality',
          text: 'Locally based, but technologically on par with global tech startups. Through AI-augmented craftsmanship, I deliver enterprise architectures at fair prices.',
        },
      ],
    },
    services: {
      title: 'Our Services in Wetzlar',
      items: [
        'Web Design & UI/UX Development',
        'Regional SEO for Central Hesse',
        'Headless CMS Solutions (Sanity)',
        'Next.js Web Development & Migration',
        'Performance Optimization (Core Web Vitals)',
        'E-Commerce Solutions for Local Businesses',
      ],
    },
    references: {
      title: 'Trust from the Region',
      items: [
        {
          name: 'Batherm',
          description:
            'Professional web presence for the heating and sanitary specialist from the region. Modern presentation of services with optimized local discoverability.',
        },
        {
          name: 'MS Schlüsseldienst Wetzlar',
          description:
            'Local SEO strategy and performant website for the locksmith service in Wetzlar. Result: Top ranking for "Schlüsseldienst Wetzlar" in Google search.',
        },
        {
          name: 'Lindener Ratsstuben',
          description:
            'Digital business card for traditional gastronomy. Responsive web design with online reservation and optimized Google My Business integration.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Do we meet in person?',
          a: 'Yes, for businesses in the Wetzlar, Gießen and Herborn area, I prefer an initial personal meeting. After that, we work hybrid – on-site and remote.',
        },
        {
          q: 'How much does a website cost in Wetzlar?',
          a: 'As a solo agency, I offer excellent value. Small Next.js projects start at €5,000, complex web apps are individually quoted.',
        },
        {
          q: 'How long does a website project take?',
          a: 'A typical project takes 4-8 weeks. From initial consultation to go-live, I personally guide you through every step.',
        },
        {
          q: 'Do you also offer SEO for the Wetzlar area?',
          a: 'Yes, regional search engine optimization is one of my core focuses. I help you appear at the top for local searches like "[industry] Wetzlar".',
        },
        {
          q: 'Do you also work with companies outside of Wetzlar?',
          a: 'Of course. Besides Wetzlar, I serve clients in Gießen, Herborn, Dillenburg, Limburg and the entire Lahn-Dill district as well as throughout Hesse.',
        },
        {
          q: 'Why a solo agency instead of a large firm?',
          a: "With me, you always talk to the developer directly – no middleman, no misunderstandings. You get enterprise quality at fair prices because I don't have the overhead costs of a large agency.",
        },
      ],
    },
    cta: {
      title: 'Ready for Your New Website?',
      description:
        "Let's discuss your project over a coffee in Wetzlar. Free initial consultation, no obligations.",
      button: 'Schedule Now',
    },
  },
};

export default async function WetzlarLocationPage({
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
    name: 'Coday Web',
    image: 'https://codayweb.de/images/brand/coday-logo-footer.webp',
    '@id': 'https://codayweb.de/standorte/wetzlar',
    url: 'https://codayweb.de/standorte/wetzlar',
    telephone: '+4917641195301',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wetzlarer Str.',
      addressLocality: 'Wetzlar',
      postalCode: '35578',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.555,
      longitude: 8.5049,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Wetzlar',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Lahn-Dill-Kreis',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Mittelhessen',
      },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: ['https://www.linkedin.com/company/codayweb'],
    priceRange: '€€',
    knowsAbout: ['Next.js', 'Web Design', 'SEO', 'Headless CMS', 'Sanity'],
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.08),transparent_60%)]" />
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

      {/* Why Local Section */}
      <section className="py-[var(--space-section)] px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.whyLocal.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.whyLocal.items.map((item, i) => (
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

      {/* References Section */}
      <section className="py-[var(--space-section)] px-4 bg-black">
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
                <p className="text-gray-400 leading-relaxed">{ref.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[var(--space-section)] px-4 bg-neutral-950">
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
