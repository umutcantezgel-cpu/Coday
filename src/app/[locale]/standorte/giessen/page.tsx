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
      title: 'Web Agency Gießen | Next.js, SEO & Web Design',
      description:
        'Your premium web agency for Gießen and surroundings. High-End Next.js development, Headless CMS, and Local SEO for businesses in Central Hesse.',
      path: '/en/standorte/giessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webagentur Gießen | Next.js, SEO & Webdesign',
    description:
      'Ihre Premium Webagentur für Gießen und Umgebung. High-End Next.js Webentwicklung, Headless CMS und Local SEO für Unternehmen in Mittelhessen.',
    path: '/de/standorte/giessen',
    type: 'money',
  });
}

const content = {
  de: {
    hero: {
      title: 'Ihre',
      titleHighlight: 'Webagentur',
      titleSuffix: 'für Gießen',
      description:
        'Digitale Exzellenz für die Universitätsstadt und den Landkreis. Wir entwickeln High-Performance Websites, die nicht nur gut aussehen, sondern messbar Kunden in Gießen generieren.',
      cta: 'Gespräch vereinbaren',
    },
    whyLocal: {
      title: 'Warum Coday für Unternehmen in Gießen?',
      items: [
        {
          title: 'Regionale Nähe',
          text: 'Von der Lahn bis zum Schiffenberg: Wir sind nur wenige Minuten entfernt. Persönliche Meetings vor Ort in Gießen oder Wetzlar schaffen Vertrauen und Effizienz.',
        },
        {
          title: 'SEO für Mittelhessen',
          text: 'Gießen ist ein harter Markt. Mit unserer Generative Engine Optimization (GEO) und Local SEO heben wir Sie an die Spitze der lokalen Google-Suchergebnisse.',
        },
        {
          title: 'Next.js Enterprise Architektur',
          text: 'Wir liefern die technologische Qualität globaler Startups direkt in die Region. Schluss mit langsamen WordPress-Seiten – willkommen im Headless-Zeitalter.',
        },
      ],
    },
    services: {
      title: 'Unsere Leistungen in Gießen',
      items: [
        'Corporate Webdesign & UI/UX',
        'Regionale SEO für Gießen & Wetzlar',
        'Headless CMS Lösungen (Sanity)',
        'Next.js 15 App Router Architektur',
        'KI-Integration & GEO',
        'E-Commerce & Online-Shops',
      ],
    },
    faq: {
      title: 'Häufige Fragen',
      items: [
        {
          q: 'Sitzt Ihre Webagentur direkt in Gießen?',
          a: 'Unser Hauptsitz ist in der direkten Nachbarstadt Wetzlar. Durch die unmittelbare Nähe sind wir jederzeit für persönliche Treffen in Gießen und dem gesamten Lahn-Dill-Kreis sowie Gießener Land verfügbar.',
        },
        {
          q: 'Was kostet eine moderne Website?',
          a: 'Als Solo-Agentur biete ich Premium-Qualität ohne großen Overhead. Professionelle Next.js Projekte starten bei ca. 5.000€. Komplexe Web-Apps werden individuell kalkuliert.',
        },
        {
          q: 'Bieten Sie auch Redesigns an?',
          a: 'Ja, viele Unternehmen in Gießen kontaktieren uns, weil ihre aktuelle WordPress-Seite zu langsam ist oder keine Kunden gewinnt. Wir migrieren Ihre Inhalte auf eine performante, zukunftssichere Next.js-Architektur.',
        },
      ],
    },
    cta: {
      title: 'Bereit für digitale Sichtbarkeit in Gießen?',
      description:
        'Lassen Sie uns bei einem Kaffee oder via Google Meet über Ihr Projekt sprechen. Unverbindlich und direkt.',
      button: 'Jetzt Termin vereinbaren',
    },
  },
  en: {
    hero: {
      title: 'Your',
      titleHighlight: 'Web Agency',
      titleSuffix: 'for Giessen',
      description:
        'Digital excellence for the university city and district. We develop high-performance websites that not only look good but measurably generate clients in Giessen.',
      cta: 'Schedule a Meeting',
    },
    whyLocal: {
      title: 'Why Coday for businesses in Giessen?',
      items: [
        {
          title: 'Regional Proximity',
          text: 'We are just minutes away. Personal on-site meetings in Giessen or Wetzlar build trust and efficiency.',
        },
        {
          title: 'SEO for Central Hesse',
          text: 'Giessen is a competitive market. With our Generative Engine Optimization (GEO) and Local SEO, we lift you to the top of local Google search results.',
        },
        {
          title: 'Next.js Enterprise Architecture',
          text: 'We deliver the technological quality of global startups directly to the region. Stop using slow WordPress pages – welcome to the headless era.',
        },
      ],
    },
    services: {
      title: 'Our Services in Giessen',
      items: [
        'Corporate Web Design & UI/UX',
        'Regional SEO for Giessen & Wetzlar',
        'Headless CMS Solutions (Sanity)',
        'Next.js 15 App Router Architecture',
        'AI Integration & GEO',
        'E-Commerce & Online Stores',
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Is your web agency located directly in Giessen?',
          a: 'Our headquarters are in the neighboring city of Wetzlar. Due to the close proximity, we are always available for personal meetings in Giessen and the entire region.',
        },
        {
          q: 'How much does a modern website cost?',
          a: 'As a solo agency, I offer premium quality without huge overhead. Professional Next.js projects start around €5,000. Complex web apps are quoted individually.',
        },
        {
          q: 'Do you also offer redesigns?',
          a: "Yes, many companies in Giessen contact us because their current WordPress site is too slow or doesn't convert. We migrate your content to a performant, future-proof Next.js architecture.",
        },
      ],
    },
    cta: {
      title: 'Ready for digital visibility in Giessen?',
      description: "Let's discuss your project over coffee or via Google Meet. No obligations.",
      button: 'Schedule Now',
    },
  },
};

export default async function GiessenLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = locale === 'en' ? content.en : content.de;

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebDesignCompany',
    '@id': 'https://codayweb.de/standorte/giessen#local-business',
    name: 'Coday - Webagentur für Gießen',
    parentOrganization: {
      '@id': ORG_ID,
    },
    image: 'https://codayweb.de/images/brand/coday-logo-footer.webp',
    url: 'https://codayweb.de/standorte/giessen',
    telephone: '+4917641195301',
    description: t.hero.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lessingstraße 4',
      addressLocality: 'Wetzlar',
      postalCode: '35578',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    areaServed: {
      '@type': 'City',
      name: 'Gießen',
    },
    priceRange: '€€€',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessJsonLd, faqJsonLd]) }}
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
                className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary-500/30 transition-colors"
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
