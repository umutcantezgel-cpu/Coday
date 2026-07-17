import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { ORG_ID, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Agency Wetzlar | Premium Websites & Local SEO',
      description:
        'Your web design agency in Wetzlar. Premium websites & local SEO for businesses along the Lahn. Fixed prices, fast speeds & top rankings. Inquire now!',
      path: '/en/webdesign-agentur-wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Agentur Wetzlar | Premium Websites & Local SEO',
    description:
      'Ihre Webdesign Agentur in Wetzlar. Premium Websites & lokales SEO für Wetzlarer Unternehmen an der Lahn. Festpreise & messbare Resultate. Jetzt anfragen!',
    path: '/de/webdesign-agentur-wetzlar',
    type: 'money',
  });
}

const content = {
  de: {
    hero: {
      title: 'Ihre',
      titleHighlight: 'Webdesign Agentur',
      titleSuffix: 'in Wetzlar',
      description:
        'Wir entwickeln professionelle Websites für Wetzlarer Unternehmen. Von der historischen Altstadt bis zum Gewerbepark Spilburg: Schnell, verkaufsstark und mit maximaler lokaler SEO-Sichtbarkeit an der Lahn. Festpreise ab 2.000 Euro.',
      cta: 'Projekt starten',
    },
    whyUs: {
      title: 'Warum Coday als Wetzlarer Webagentur wählen',
      items: [
        {
          title: 'Lokale Sichtbarkeit an der Lahn',
          text: 'Eine schöne Website bringt nichts ohne Besucher. Wir sorgen dafür, dass Ihr Unternehmen im gesamten Lahn-Dill-Kreis bei Google gefunden wird – egal ob traditionelles Handwerk oder Optik-Zulieferer.',
        },
        {
          title: 'Modernste Technik',
          text: 'Wir nutzen Next.js und React für maximale Ladegeschwindigkeit. Ihre Website lädt in unter einer Sekunde und erreicht perfekte Core Web Vitals Werte – ein enormer SEO-Vorteil.',
        },
        {
          title: 'Persönlich vor Ort',
          text: 'Als Webagentur mit Fokus auf Wetzlar arbeiten Sie direkt mit dem Entwickler. Ob Meeting in Wetzlar oder digital: Keine Wartezeiten, kein Vertrieb dazwischen. Persönliche Betreuung.',
        },
      ],
    },
    relaunch: {
      title: 'Website Relaunch vom Profi',
      description:
        'Ihre bestehende Website ist langsam, veraltet oder bringt keine Anfragen aus der Region Wetzlar? Ein professioneller Website Relaunch bringt Ihr Unternehmen wieder nach vorne. Wir analysieren Ihre aktuelle Seite, übernehmen alle Inhalte und entwickeln eine moderne, schnelle Website, die bei Google sichtbar ist.',
      items: [
        'Komplette Analyse Ihrer bestehenden Website',
        'Übernahme und Optimierung aller Inhalte',
        'Modernes Design mit klarer Nutzerführung',
        'Technische Optimierung für lokales Wetzlar SEO',
        'Umstellung auf schnelle Servertechnologie',
        'Betreuung nach dem Launch inklusive',
      ],
    },
    services: {
      title: 'Webdesign und Webentwicklung Services',
      items: [
        'Professionelles Webdesign und UI/UX',
        'Individuelle Webentwicklung mit Next.js',
        'Website Relaunch und Migration',
        'Headless CMS Integration mit Sanity',
        'Lokale Suchmaschinenoptimierung (Local SEO)',
        'Performance Optimierung und Core Web Vitals',
        'Responsive Design für alle Endgeräte',
        'Wartung und technischer Support',
      ],
    },
    results: {
      title: 'Echte Ergebnisse für Unternehmen aus Wetzlar',
      description:
        'Unsere Kunden in Wetzlar und Umgebung erhalten nach dem Website Relaunch deutlich mehr Anfragen über Google. Das bestätigen unter anderem Batherm Sanitär und Heizung, der Schlüsseldienst Wetzlar und die Lindener Ratsstuben. Durchschnittlich steigt die lokale Sichtbarkeit um über 200 Prozent innerhalb der ersten drei Monate.',
    },
    faq: {
      title: 'Häufige Fragen zu Webdesign in Wetzlar',
      items: [
        {
          q: 'Was kostet eine professionelle Website in Wetzlar?',
          a: 'Unsere Webdesign Pakete starten ab 2.000 Euro zum Festpreis. Im Preis enthalten sind Design, Entwicklung, SEO Grundoptimierung und die Einrichtung Ihres Content Management Systems. Keine versteckten Kosten.',
        },
        {
          q: 'Wie lange dauert die Erstellung einer Website?',
          a: 'Eine professionelle Website ist in der Regel innerhalb von drei Wochen fertig und online. Bei umfangreicheren Projekten mit vielen Unterseiten planen wir vier bis sechs Wochen ein.',
        },
        {
          q: 'Bieten Sie auch Website Relaunch an?',
          a: 'Ja, der Website Relaunch ist einer unserer häufigsten Aufträge. Wir übernehmen Ihre bestehende Website, migrieren alle Inhalte und entwickeln eine moderne, schnelle Lösung mit deutlich besserer Sichtbarkeit in Wetzlar und Umgebung.',
        },
        {
          q: 'Arbeiten Sie nur für Kunden direkt in Wetzlar?',
          a: 'Unser Fokus liegt stark auf Wetzlar, Gießen, Herborn und dem Lahn-Dill-Kreis (inklusive Gewerbegebieten wie der Spilburg oder dem Hörnsheimer Eck). Wir betreuen jedoch auch Kunden in ganz Deutschland.',
        },
        {
          q: 'Warum keine WordPress Website?',
          a: 'WordPress Websites sind oft langsam, sicherheitsanfällig und benötigen ständige Plugin Updates. Wir entwickeln individuelle Websites mit Next.js, die deutlich schneller laden und Google extrem positiv bewertet.',
        },
        {
          q: 'Gehört mir der Code meiner Website?',
          a: 'Ja, zu 100 Prozent. Der gesamte Quellcode gehört Ihnen. Kein Vendor Lock-In, keine Abhängigkeit von Baukästen. Sie können Ihre Website jederzeit umziehen.',
        },
        {
          q: 'Wie verbessern Sie die lokale Google Sichtbarkeit in Wetzlar?',
          a: 'Wir nutzen zielgerichtetes Local SEO. Dazu gehören perfekte Ladezeiten, Wetzlar-spezifische strukturierte Daten (LocalBusiness Schema), lokale Keyword-Strategien und eine optimierte Seitenstruktur.',
        },
        {
          q: 'Bieten Sie auch Betreuung nach dem Launch?',
          a: 'Ja, nach dem Launch erhalten Sie 30 Tage kostenlosen Support. Danach bieten wir optionale Wartungspakete an, die technische Updates, Inhaltspflege und Performance Monitoring umfassen.',
        },
      ],
    },
    cta: {
      title: 'Lassen Sie uns über Ihr Webprojekt sprechen.',
      description: 'Buchen Sie ein kostenloses Erstgespräch direkt in Wetzlar oder per Videocall.',
      button: 'Beratungstermin sichern',
    },
  },
  en: {
    hero: {
      title: 'Your',
      titleHighlight: 'Web Design Agency',
      titleSuffix: 'in Wetzlar',
      description:
        'We build professional websites for businesses in Wetzlar. From the historic Old Town to the Spilburg commercial park: Fast, high-converting, and perfectly optimized for local SEO along the Lahn. Fixed prices from 2,000 Euros.',
      cta: 'Start Project',
    },
    whyUs: {
      title: 'Why Choose Coday as Your Wetzlar Web Agency',
      items: [
        {
          title: 'Local Visibility',
          text: 'A beautiful website is useless without visitors. We ensure your business is found on Google throughout Wetzlar, Giessen, and the Lahn-Dill district.',
        },
        {
          title: 'Cutting Edge Technology',
          text: 'We use Next.js and React for maximum loading speed. Your website loads in under one second with perfect Core Web Vitals scores – a huge SEO advantage.',
        },
        {
          title: 'Personal and Direct',
          text: 'As a local Wetzlar web agency, you work directly with the developer. Whether meeting in Wetzlar or digitally: No wait times, no middlemen. Personal support.',
        },
      ],
    },
    relaunch: {
      title: 'Professional Website Relaunch',
      description:
        'Is your current website slow, outdated, or not generating inquiries from the Wetzlar region? A professional website relaunch brings your business back to the forefront. We analyze your current site, migrate all content, and develop a modern, fast website that ranks on Google.',
      items: [
        'Complete analysis of your existing website',
        'Migration and optimization of all content',
        'Modern design with clear user guidance',
        'Technical search engine optimization for local Wetzlar SEO',
        'Migration to fast server technology',
        'Post launch support included',
      ],
    },
    services: {
      title: 'Web Design and Development Services',
      items: [
        'Professional web design and UI/UX',
        'Custom web development with Next.js',
        'Website relaunch and migration',
        'Headless CMS integration with Sanity',
        'Local search engine optimization (Local SEO)',
        'Performance optimization and Core Web Vitals',
        'Responsive design for all devices',
        'Maintenance and technical support',
      ],
    },
    results: {
      title: 'Real Results for Businesses from Wetzlar',
      description:
        'Our clients in Wetzlar and the surrounding area receive significantly more inquiries through Google after their website relaunch. This is confirmed by Batherm Heating, Schlüsseldienst Wetzlar, and Lindener Ratsstuben. On average, local visibility increases by over 200 percent within the first three months.',
    },
    faq: {
      title: 'Frequently Asked Questions About Web Design in Wetzlar',
      items: [
        {
          q: 'How much does a professional website in Wetzlar cost?',
          a: 'Our web design packages start from 2,000 Euros at a fixed price. The price includes design, development, basic SEO optimization, and content management system setup. No hidden costs.',
        },
        {
          q: 'How long does it take to build a website?',
          a: 'A professional website is typically ready and online within three weeks. For larger projects with many pages, we plan four to six weeks.',
        },
        {
          q: 'Do you offer website relaunches?',
          a: 'Yes, website relaunch is one of our most frequent projects. We take over your existing website, migrate all content, and develop a modern, fast solution with significantly better visibility in Wetzlar and the surrounding area.',
        },
        {
          q: 'Do you only work with clients directly in Wetzlar?',
          a: 'Our focus is heavily on Wetzlar, Giessen, Herborn, and the Lahn-Dill district (including commercial areas like Spilburg). However, we also serve clients across Germany.',
        },
        {
          q: 'Why not a WordPress website?',
          a: 'WordPress websites are often slow, vulnerable, and require constant plugin updates. We build custom websites with Next.js that load much faster and are extremely favored by Google.',
        },
        {
          q: 'Do I own the code of my website?',
          a: 'Yes, 100 percent. The entire source code belongs to you. No vendor lock-in, no dependency on website builders. You can move your website at any time.',
        },
        {
          q: 'How do you improve my local Google visibility in Wetzlar?',
          a: 'We use targeted Local SEO. This includes perfect loading times, Wetzlar-specific structured data (LocalBusiness Schema), local keyword strategies, and an optimized page structure.',
        },
        {
          q: 'Do you offer support after launch?',
          a: 'Yes, after launch you receive 30 days of free support. After that, we offer optional maintenance packages that include technical updates, content management, and performance monitoring.',
        },
      ],
    },
    cta: {
      title: 'Let us talk about your web project.',
      description: 'Book a free initial consultation directly in Wetzlar or via video call.',
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

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.codayweb.de/webdesign-agentur-wetzlar#localbusiness',
    name: 'Coday Webdesign Wetzlar',
    url: `${BASE_URL}/${locale}/webdesign-agentur-wetzlar`,
    logo: `${BASE_URL}/icon.png`,
    image: `${BASE_URL}/og-image.jpg`,
    description: t.hero.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wetzlar',
      postalCode: '35578',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.5670',
      longitude: '8.5049',
    },
    areaServed: [
      { '@type': 'City', name: 'Wetzlar' },
      { '@type': 'City', name: 'Gießen' },
      { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
      { '@type': 'AdministrativeArea', name: 'Mittelhessen' },
    ],
    priceRange: '€€€',
    telephone: '+4917631310115',
    email: 'hello@codayweb.de',
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.codayweb.de/webdesign-agentur-wetzlar#service',
    name: 'Premium Webdesign & Webentwicklung',
    provider: {
      '@id': 'https://www.codayweb.de/webdesign-agentur-wetzlar#localbusiness',
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

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en' ? 'Web Design Agency Wetzlar | Coday' : 'Webdesign Agentur Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your web design agency in Wetzlar. Premium websites with Next.js for businesses in Central Hesse. Fixed prices, full code ownership. Inquire now.'
      : 'Ihre Webdesign Agentur in Wetzlar. Professionelle Websites und Website Relaunch für Unternehmen in Mittelhessen. Festpreise, voller Code gehört Ihnen.';
  return (
    <>
      <div className="flex-1 w-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessJsonLd, serviceJsonLd, faqJsonLd]),
          }}
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
                  className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary-500/30 transition-colors motion-reduce:duration-[0.01ms]"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Website Relaunch Section */}
        <section className="py-[var(--space-section)] px-4 bg-neutral-950">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">{t.relaunch.title}</h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-3xl">
              {t.relaunch.description}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {t.relaunch.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 text-gray-300 bg-white/5 p-5 rounded-xl border border-white/5"
                >
                  <span className="text-primary-500 text-xl flex-shrink-0 mt-0.5">&#10003;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-[var(--space-section)] px-4 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{t.results.title}</h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {t.results.description}
            </p>
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
                  <span className="text-primary-500 text-xl flex-shrink-0">&#10003;</span>
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
