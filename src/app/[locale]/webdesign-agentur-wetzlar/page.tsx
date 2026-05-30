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
      title: 'Web Design Agency Wetzlar & Gießen | Coday',
      description:
        'Your high-end web design agency for Wetzlar, Gießen and the Lahn-Dill district. Next.js performance, local SEO dominance, and premium UX.',
      path: '/en/webdesign-agentur-wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Agentur Wetzlar & Gießen | Premium Webentwicklung',
    description:
      'Ihre High-End Webdesign Agentur für Wetzlar, Gießen und Lahn-Dill. Extreme Performance dank Next.js, lokale SEO-Dominanz und Premium UX Design.',
    path: '/de/webdesign-agentur-wetzlar',
    type: 'money',
  });
}

const content = {
  de: {
    hero: {
      title: 'Die Premium',
      titleHighlight: 'Webdesign Agentur',
      titleSuffix: 'für Wetzlar',
      description:
        'Lassen Sie den Wettbewerb in Mittelhessen hinter sich. Wir entwickeln rasend schnelle, verkaufsstarke Websites und Web-Apps für Unternehmen in Wetzlar, Gießen und dem Lahn-Dill-Kreis.',
      cta: 'Projekt starten',
    },
    whyUs: {
      title: 'Warum Coday für Ihr Webdesign?',
      items: [
        {
          title: 'Lokale SEO-Dominanz',
          text: 'Eine schöne Website bringt nichts ohne Besucher. Wir verankern Ihre Marke im Local Pack (Google Maps) für Wetzlar und Umgebung (Gießen, Marburg, Herborn).',
        },
        {
          title: 'Extreme Performance',
          text: 'Wir nutzen Next.js und React – die gleichen Technologien, die auch Netflix und TikTok verwenden. Ladezeiten unter 1 Sekunde sind unser Standard.',
        },
        {
          title: 'Aus der Region, für die Region',
          text: 'Als Wetzlarer Solo-Agentur spreche ich Ihre Sprache. Keine langen Agentur-Wartezeiten, sondern direkter Kontakt und messbare Resultate für den hessischen Mittelstand.',
        },
      ],
    },
    services: {
      title: 'Webentwicklung & Design Services',
      items: [
        'Corporate Webdesign & UI/UX',
        'Next.js 15 App Router Entwicklung',
        'Headless CMS (Sanity) Integration',
        'Local SEO für Wetzlar & Gießen',
        'E-Commerce & Online-Shops',
        'Pagespeed Optimierung (100/100 Core Web Vitals)',
      ],
    },
    faq: {
      title: 'Häufige Fragen zu Webdesign in Wetzlar',
      items: [
        {
          q: 'Arbeiten Sie als Webdesign Agentur auch für Kunden außerhalb von Wetzlar?',
          a: 'Absolut. Mein Fokus liegt auf Wetzlar, Gießen, Herborn und dem gesamten Lahn-Dill-Kreis. Durch moderne Remote-Workflows betreue ich jedoch auch Kunden in ganz Deutschland, Österreich und der Schweiz.',
        },
        {
          q: 'Wie grenzt sich Ihre Webagentur von WordPress-Agenturen ab?',
          a: 'Coday baut keine langsamen WordPress-Templates. Wir entwickeln individuelle "Headless" Architekturen mit Next.js. Das bedeutet: absolute Sicherheit, keine nervigen Plugin-Updates und Ladezeiten, die klassische CMS weit hinter sich lassen.',
        },
        {
          q: 'Bieten Sie auch Redesign für bestehende Websites an?',
          a: 'Ja! Oft übernehmen wir langsame oder schlecht konvertierende Websites, unterziehen sie einem UX-Audit und migrieren sie auf unser modernes Tech-Stack.',
        },
      ],
    },
    cta: {
      title: 'Lassen Sie uns den digitalen Markt in Mittelhessen dominieren.',
      description: 'Buchen Sie ein unverbindliches Erstgespräch in Wetzlar oder per Google Meet.',
      button: 'Beratungstermin sichern',
    },
  },
  en: {
    hero: {
      title: 'The Premium',
      titleHighlight: 'Web Design Agency',
      titleSuffix: 'for Wetzlar',
      description:
        'Leave the competition in Central Hesse behind. We develop lightning-fast, high-converting websites and web apps for businesses in Wetzlar, Giessen, and the Lahn-Dill district.',
      cta: 'Start Project',
    },
    whyUs: {
      title: 'Why Coday for your Web Design?',
      items: [
        {
          title: 'Local SEO Dominance',
          text: 'A beautiful website is useless without visitors. We anchor your brand in the Local Pack (Google Maps) for Wetzlar and the surrounding areas.',
        },
        {
          title: 'Extreme Performance',
          text: 'We use Next.js and React – the exact same technologies powering Netflix and TikTok. Load times under 1 second are our standard.',
        },
        {
          title: 'From the Region, For the Region',
          text: 'As a local Wetzlar solo agency, I speak your language. No long agency wait times, just direct contact and measurable results.',
        },
      ],
    },
    services: {
      title: 'Web Development & Design Services',
      items: [
        'Corporate Web Design & UI/UX',
        'Next.js 15 App Router Development',
        'Headless CMS (Sanity) Integration',
        'Local SEO for Wetzlar & Giessen',
        'E-Commerce & Online Stores',
        'Pagespeed Optimization (100/100 CWV)',
      ],
    },
    faq: {
      title: 'Frequently Asked Questions about Web Design in Wetzlar',
      items: [
        {
          q: 'Do you also work for clients outside of Wetzlar?',
          a: 'Absolutely. My focus is on Wetzlar, Giessen, Herborn, and the entire Lahn-Dill district. However, through modern remote workflows, I also serve clients across Germany, Austria, and Switzerland.',
        },
        {
          q: 'How does your web agency differ from WordPress agencies?',
          a: 'Coday does not build slow WordPress templates. We develop custom "headless" architectures using Next.js. This means: absolute security, no annoying plugin updates, and load times that leave traditional CMS in the dust.',
        },
        {
          q: 'Do you also offer redesigns for existing websites?',
          a: 'Yes! We often take over slow or poorly converting websites, conduct a UX audit, and migrate them to our modern tech stack.',
        },
      ],
    },
    cta: {
      title: "Let's dominate the digital market in Central Hesse.",
      description: 'Book a free, no-obligation initial consultation in Wetzlar or via Google Meet.',
      button: 'Secure Consultation',
    },
  },
};

export default async function WebdesignWetzlarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = locale === 'en' ? content.en : content.de;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://codayweb.de/webdesign-agentur-wetzlar#service',
    name: 'Premium Webdesign & Webentwicklung',
    provider: {
      '@id': ORG_ID,
    },
    areaServed: [
      { '@type': 'City', name: 'Wetzlar' },
      { '@type': 'City', name: 'Gießen' },
      { '@type': 'City', name: 'Marburg' },
      { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
    ],
    description: t.hero.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: '2000.00',
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

  return (
    <main className="flex-1 w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, faqJsonLd]) }}
      />

      {/* Hero Section */}
      <section className="py-[var(--space-section)] relative px-4 md:px-8 bg-gradient-to-br from-bg-primary to-bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_60%)]" />
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
