import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { ORG_ID, BASE_URL } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import BlurText from '@/shared/ui/BlurText';
import { FadeInUp } from '@/shared/ui/MotionWrappers';
import { ScrollReveal } from '@/shared/ui/animations/ScrollReveal';
import CountUp from '@/shared/ui/CountUp';
import { TestimonialCard } from '@/shared/ui/TestimonialCard';
import Timeline from '@/shared/ui/Timeline';
import {
  MapPin,
  CheckCircle,
  ArrowRight,
  Lightning,
  Target,
  Star,
  ChartBar,
  Code,
  DeviceMobile,
  Buildings,
  ShieldCheck,
  Wrench,
  Stethoscope,
} from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Agency Wetzlar | Premium Websites',
      description:
        'Your web design agency in Wetzlar. Premium websites & local SEO for businesses along the Lahn. Fixed prices, fast speeds & top rankings. Inquire now!',
      path: '/en/webdesign-agentur-wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Agentur Wetzlar | Premium Websites',
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
        'Wir entwickeln professionelle Websites für Wetzlarer Unternehmen. Von der historischen Altstadt bis zum Gewerbepark Spilburg: Ultraschnell, verkaufsstark und mit maximaler lokaler SEO-Sichtbarkeit an der Lahn. Festpreise ab 2.000 Euro.',
      cta: 'Projekt starten',
      badge: '100% Regional an der Lahn',
    },
    stats: {
      items: [
        { value: 100, label: 'Prozent', desc: 'Regionaler Ansprechpartner in Wetzlar' },
        { value: 0.5, label: 'Sekunden', desc: 'Durchschnittliche Ladezeit (Next.js)' },
        { value: 3, label: 'Wochen', desc: 'Von Projektstart bis zum Live-Gang' },
        { value: 0, label: 'Euro', desc: 'Versteckte Kosten dank Festpreis' },
      ],
    },
    philosophy: {
      badge: 'Der Coday Unterschied',
      title: 'Warum Wetzlarer Unternehmen uns vertrauen',
      text1:
        'Viele Agenturen verkaufen Ihnen teure, langsame WordPress-Vorlagen. Wir programmieren Ihre Website als Solo-Agentur von Grund auf neu mit modernster Headless-Technologie (Next.js & React).',
      text2:
        'Das bedeutet für Sie: Ihre Website lädt blitzschnell, wird von Google geliebt und hängt die lokale Konkurrenz im Lahn-Dill-Kreis spielend ab.',
      bullet1: 'Keine anonymen Offshore-Teams',
      bullet2: 'Direkter Entwickler-Kontakt in Wetzlar',
      bullet3: 'Voller Besitz Ihres eigenen Quellcodes',
    },
    services: {
      title: 'Digitale Exzellenz für Wetzlar',
      items: [
        {
          title: 'Premium Webdesign',
          desc: 'Individuelle, konversionsstarke Designs, die Ihre Wetzlarer Zielgruppe sofort überzeugen.',
          icon: <DeviceMobile className="w-6 h-6 text-primary-500" />,
        },
        {
          title: 'Custom Webentwicklung',
          desc: 'Blitzschnelle Next.js Architekturen statt langsamer WordPress-Baukästen. Für maximale Performance.',
          icon: <Code className="w-6 h-6 text-primary-500" />,
        },
        {
          title: 'Local SEO Wetzlar',
          desc: 'Wir bringen Sie in der Google-Suche vor Ort auf Platz 1. Egal ob Optiker, Arzt oder Handwerker.',
          icon: <Target className="w-6 h-6 text-primary-500" />,
        },
        {
          title: 'Conversion Optimierung',
          desc: 'Wir machen aus Website-Besuchern echte Kundenanfragen für Ihr Unternehmen an der Lahn.',
          icon: <ChartBar className="w-6 h-6 text-primary-500" />,
        },
      ],
    },
    socialProof: {
      title: 'Erfolgreiche Partner aus der Region',
      description:
        'Diese Wetzlarer Unternehmen haben sich bereits für Coday entschieden und dominieren ihre lokale Nische.',
      testimonials: [
        {
          quote:
            'Der Relaunch unserer Website war ein voller Erfolg. Die Zusammenarbeit war unkompliziert, extrem schnell und das Ergebnis hat unsere Erwartungen übertroffen. Coday ist ein absoluter Glücksfall für Wetzlar.',
          authorName: 'Philipp W.',
          authorCompany: 'Batherm Sanitär & Heizung',
        },
        {
          quote:
            'Endlich eine Agentur, die verstanden hat, worauf es ankommt. Wir haben jetzt nicht nur eine top moderne Website, sondern werden bei Google in Wetzlar deutlich besser gefunden.',
          authorName: 'Geschäftsführung',
          authorCompany: 'MS Schlüsseldienst Wetzlar',
        },
        {
          quote:
            'Die neue Website für unsere Ratsstuben sieht grandios aus. Die Gäste loben das Design und die Reservierungen über die Seite sind spürbar gestiegen.',
          authorName: 'Inhaber',
          authorCompany: 'Lindener Ratsstuben',
        },
      ],
    },
    comparison: {
      title: 'Die richtige Wahl für Ihr Unternehmen',
      standard: 'Klassische Agenturen',
      coday: 'Coday Wetzlar',
      points: [
        { text: 'Persönlicher Ansprechpartner', standard: false, coday: true },
        { text: 'Maßgeschneiderter Quellcode', standard: false, coday: true },
        { text: 'Transparente Festpreise', standard: false, coday: true },
        { text: 'Schnelle Umsetzung (< 4 Wochen)', standard: false, coday: true },
        { text: 'Fokus auf Wetzlar & Lahn-Dill', standard: false, coday: true },
      ],
    },
    process: {
      title: 'Ihr Weg zur neuen Website',
      items: [
        {
          week: 'Woche 1',
          title: 'Kickoff & Strategie',
          description:
            'Wir analysieren Ihre Ziele, Zielgruppe und lokale Wetzlarer Konkurrenz. Auf Wunsch treffen wir uns direkt bei Ihnen vor Ort.',
        },
        {
          week: 'Woche 2',
          title: 'Design & UX',
          description:
            'Wir entwerfen ein individuelles Premium-Design, das exakt zu Ihrer Marke passt und Vertrauen ausstrahlt.',
        },
        {
          week: 'Woche 3',
          title: 'Entwicklung & SEO',
          description:
            'Programmierung in Next.js, Einbau der Inhalte und tiefgreifende On-Page Local SEO Optimierung.',
        },
        {
          week: 'Woche 4',
          title: 'Launch & Support',
          description:
            'Ihre neue Website geht live. Sie erhalten 30 Tage kostenlosen Support und volle Code-Ownership.',
        },
      ],
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
          a: 'WordPress Websites sind oft langsam, sicherheitsanfällig und benötigen ständige Plugin Updates. Wir entwickeln individuelle Websites mit Next.js, die deutlich schneller laden und von Google extrem positiv bewertet werden.',
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
      title: 'Bereit für den digitalen Vorsprung in Wetzlar?',
      description: 'Buchen Sie ein kostenloses Erstgespräch direkt vor Ort oder per Videocall.',
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
      badge: '100% Regional on the Lahn',
    },
    stats: {
      items: [
        { value: 100, label: 'Percent', desc: 'Regional partner in Wetzlar' },
        { value: 0.5, label: 'Seconds', desc: 'Average load time (Next.js)' },
        { value: 3, label: 'Weeks', desc: 'From kickoff to launch' },
        { value: 0, label: 'Euros', desc: 'Hidden costs thanks to fixed pricing' },
      ],
    },
    philosophy: {
      badge: 'The Coday Difference',
      title: 'Why Wetzlar businesses trust us',
      text1:
        'Many agencies sell you expensive, slow WordPress templates. We code your website from scratch using cutting-edge headless technology (Next.js & React).',
      text2:
        'This means for you: Your website loads incredibly fast, is loved by Google, and easily outperforms local competitors in the Lahn-Dill district.',
      bullet1: 'No anonymous offshore teams',
      bullet2: 'Direct developer contact in Wetzlar',
      bullet3: 'Full ownership of your source code',
    },
    services: {
      title: 'Digital Excellence for Wetzlar',
      items: [
        {
          title: 'Premium Web Design',
          desc: 'Custom, high-conversion designs that instantly convince your local target audience.',
          icon: <DeviceMobile className="w-6 h-6 text-primary-500" />,
        },
        {
          title: 'Custom Web Development',
          desc: 'Lightning-fast Next.js architectures instead of slow WordPress builders. For maximum performance.',
          icon: <Code className="w-6 h-6 text-primary-500" />,
        },
        {
          title: 'Local SEO Wetzlar',
          desc: 'We get you to the number 1 spot in local Google searches. Whether optician, doctor, or tradesman.',
          icon: <Target className="w-6 h-6 text-primary-500" />,
        },
        {
          title: 'Conversion Optimization',
          desc: 'We turn website visitors into real customer inquiries for your business on the Lahn.',
          icon: <ChartBar className="w-6 h-6 text-primary-500" />,
        },
      ],
    },
    socialProof: {
      title: 'Successful Local Partners',
      description:
        'These Wetzlar companies have already chosen Coday and dominate their local niche.',
      testimonials: [
        {
          quote:
            'The relaunch of our website was a complete success. The collaboration was straightforward, extremely fast, and the result exceeded our expectations.',
          authorName: 'Philipp W.',
          authorCompany: 'Batherm Sanitär & Heizung',
        },
        {
          quote:
            'Finally an agency that understands what matters. We now not only have a top modern website, but are found much better on Google in Wetzlar.',
          authorName: 'Management',
          authorCompany: 'MS Schlüsseldienst Wetzlar',
        },
        {
          quote:
            'The new website for our restaurant looks gorgeous. Guests praise the design and reservations via the site have noticeably increased.',
          authorName: 'Owner',
          authorCompany: 'Lindener Ratsstuben',
        },
      ],
    },
    comparison: {
      title: 'The Right Choice for Your Business',
      standard: 'Standard Agencies',
      coday: 'Coday Wetzlar',
      points: [
        { text: 'Personal Point of Contact', standard: false, coday: true },
        { text: 'Custom Source Code', standard: false, coday: true },
        { text: 'Transparent Fixed Prices', standard: false, coday: true },
        { text: 'Fast Implementation (< 4 weeks)', standard: false, coday: true },
        { text: 'Focus on Wetzlar & Lahn-Dill', standard: false, coday: true },
      ],
    },
    process: {
      title: 'Your Path to a New Website',
      items: [
        {
          week: 'Week 1',
          title: 'Kickoff & Strategy',
          description:
            'We analyze your goals, target audience, and local Wetzlar competition. We can meet directly at your location if desired.',
        },
        {
          week: 'Week 2',
          title: 'Design & UX',
          description:
            'We design a custom premium layout that perfectly matches your brand and radiates trust.',
        },
        {
          week: 'Week 3',
          title: 'Development & SEO',
          description:
            'Programming in Next.js, content integration, and deep on-page Local SEO optimization.',
        },
        {
          week: 'Week 4',
          title: 'Launch & Support',
          description:
            'Your new website goes live. You receive 30 days of free support and full code ownership.',
        },
      ],
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
      title: 'Ready for the digital edge in Wetzlar?',
      description: 'Book a free initial consultation directly on site or via video call.',
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

  return (
    <div className="flex-1 w-full flex flex-col bg-surface-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessJsonLd, serviceJsonLd, faqJsonLd]),
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium tracking-wide text-gray-300">
                {t.hero.badge}
              </span>
            </div>
          </FadeInUp>

          <h1 className="sr-only">
            {t.hero.title} {t.hero.titleHighlight} {t.hero.titleSuffix}
          </h1>
          <div
            aria-hidden="true"
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-8 leading-[1.1]"
          >
            <BlurText text={t.hero.title} delay={0} animateBy="words" className="inline-block" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
              <BlurText
                text={t.hero.titleHighlight}
                delay={200}
                animateBy="words"
                className="inline-block"
              />
            </span>{' '}
            <br className="hidden md:block" />
            <BlurText
              text={t.hero.titleSuffix}
              delay={400}
              animateBy="words"
              className="inline-block text-gray-400"
            />
          </div>

          <FadeInUp delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto text-lg h-14 px-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                >
                  {t.hero.cta}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg h-14 px-8 border-white/20 text-white hover:bg-white/10"
                >
                  Kontakt aufnehmen
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-12 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInUp
            delay={0.8}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-black/5 border border-gray-100"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
              {t.stats.items.map((stat, i) => (
                <div key={i} className="px-4 text-center">
                  <div className="font-display text-4xl lg:text-5xl font-bold text-secondary-900 mb-2">
                    <CountUp from={0} to={stat.value} duration={1.5} />
                    <span className="text-xl lg:text-2xl ml-1 text-primary-500">
                      {stat.label === 'Prozent' || stat.label === 'Percent' ? '%' : ''}
                    </span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-secondary-500 mt-2">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6">
                <Lightning className="w-4 h-4" /> {t.philosophy.badge}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-6 leading-tight">
                {t.philosophy.title}
              </h2>
              <p className="text-xl text-secondary-600 mb-6 leading-relaxed">
                {t.philosophy.text1}
              </p>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                {t.philosophy.text2}
              </p>
              <ul className="space-y-4">
                {[t.philosophy.bullet1, t.philosophy.bullet2, t.philosophy.bullet3].map(
                  (bullet, i) => (
                    <li key={i} className="flex items-center gap-3 text-secondary-800 font-medium">
                      <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0" />
                      {bullet}
                    </li>
                  )
                )}
              </ul>
            </ScrollReveal>
            <ScrollReveal index={1} className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-xl overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
                <div className="relative z-10 grid grid-cols-2 gap-4 p-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <Buildings className="w-10 h-10 text-primary-500 mb-4" />
                    <span className="font-bold text-secondary-900">
                      Lokale
                      <br />
                      Präsenz
                    </span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center translate-y-8">
                    <ShieldCheck className="w-10 h-10 text-primary-500 mb-4" />
                    <span className="font-bold text-secondary-900">
                      Höchste
                      <br />
                      Sicherheit
                    </span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <Lightning className="w-10 h-10 text-primary-500 mb-4" />
                    <span className="font-bold text-secondary-900">
                      Extreme
                      <br />
                      Performance
                    </span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center translate-y-8">
                    <Target className="w-10 h-10 text-primary-500 mb-4" />
                    <span className="font-bold text-secondary-900">
                      Local SEO
                      <br />
                      Wetzlar
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {t.services.title}
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Alles, was Sie für die digitale Dominanz in Wetzlar benötigen. Aus einer Hand.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {t.services.items.map((service, i) => (
              <ScrollReveal key={i} index={i}>
                <div className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                  <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 md:py-32 px-4 overflow-hidden bg-surface-light">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-6">
                {t.socialProof.title}
              </h2>
              <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
                {t.socialProof.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {t.socialProof.testimonials.map((testi, i) => (
              <ScrollReveal key={i} index={i}>
                <TestimonialCard
                  quote={testi.quote}
                  authorName={testi.authorName}
                  authorCompany={testi.authorCompany}
                  rating={5}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-6">
                {t.comparison.title}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal index={1}>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-100 p-6">
                <div className="col-span-6 font-semibold text-secondary-900">Feature</div>
                <div className="col-span-3 text-center font-semibold text-secondary-500">
                  {t.comparison.standard}
                </div>
                <div className="col-span-3 text-center font-bold text-primary-600">
                  {t.comparison.coday}
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {t.comparison.points.map((point, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 p-6 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-6 font-medium text-secondary-800">{point.text}</div>
                    <div className="col-span-3 flex justify-center text-gray-300">
                      {point.standard ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <div className="w-4 h-px bg-gray-300" />
                      )}
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {point.coday ? (
                        <CheckCircle className="w-6 h-6 text-primary-500" />
                      ) : (
                        <div className="w-4 h-px bg-gray-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-4 bg-secondary-900 text-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {t.process.title}
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Von der ersten Idee bis zum Live-Gang. Schnell, transparent und direkt in Wetzlar.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal index={1}>
            <Timeline items={t.process.items} />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-4 bg-surface-light">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-6">
                {t.faq.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {t.faq.items.map((item, i) => (
              <ScrollReveal key={i} index={i}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <p className="text-xl font-bold text-secondary-900 mb-4">{item.q}</p>
                  <p className="text-secondary-600 leading-relaxed text-lg">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-black to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight">
              {t.cta.title}
            </h2>
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">{t.cta.description}</p>
            <Link href="/booking">
              <Button
                variant="primary"
                size="lg"
                className="h-16 px-10 text-xl shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:shadow-[0_0_80px_rgba(59,130,246,0.6)] transition-shadow"
              >
                {t.cta.button} <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
