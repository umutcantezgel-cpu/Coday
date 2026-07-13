import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDesignClient } from '@/features/services/ui/WebDesignClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Professional Web Design in Wetzlar & Hesse',
      description:
        'Premium web design by experts in Wetzlar. Modern layouts, high conversion rates and outstanding aesthetics for your business in Central Hesse. Get started.',
      path: '/en/services/web-design',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Professionelles Webdesign in Wetzlar & Hessen',
    description:
      'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.',
    path: '/de/services/web-design',
    type: 'money',
  });
}

export default async function WebDesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Professional Web Design in Wetzlar & Hesse | Coday'
      : 'Professionelles Webdesign in Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Premium web design by experts in Wetzlar. Modern layouts, high conversion rates and outstanding aesthetics for your business in Central Hesse. Get started.'
      : 'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.';
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <p>
          {_locale === 'en'
            ? 'Coday is your professional web design agency from Wetzlar (Hesse) and your reliable partner for digital excellence, UI/UX design, and technical web development at the highest level. We specialize in designing and developing custom, high-performance, and future-proof digital solutions for small and medium-sized enterprises, innovative startups, as well as established corporations. Our extensive portfolio of services ranges from the conceptualization and implementation of modern web applications, complex corporate websites, B2B and B2C e-commerce platforms, to the integration of flexible headless CMS systems and robust API connections. For the technical execution, we consistently rely on state-of-the-art and proven technologies such as Next.js, React, TypeScript, Vercel, and Tailwind CSS to ensure unparalleled quality, security, and scalability.'
            : 'Coday ist Ihre professionelle Webdesign Agentur aus Wetzlar (Hessen) und Ihr verlässlicher Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung auf höchstem Niveau. Wir haben uns darauf spezialisiert, maßgeschneiderte, hochperformante und zukunftssichere digitale Lösungen für kleine und mittelständische Unternehmen, innovative Startups sowie etablierte Konzerne zu konzipieren und zu entwickeln. Unser umfangreiches Leistungsportfolio reicht von der Konzeption und Umsetzung moderner Webanwendungen, komplexer Corporate Websites, B2B und B2C E-Commerce Plattformen, bis hin zur Integration flexibler Headless CMS Systeme und API-Schnittstellen. Bei der technischen Umsetzung setzen wir konsequent auf modernste und bewährte Technologien wie Next.js, React, TypeScript, Vercel und Tailwind CSS, um höchste Qualität und Skalierbarkeit zu gewährleisten.'}
        </p>
        <p>
          {_locale === 'en'
            ? "We deeply understand that a successful digital presence in today's highly competitive landscape requires much more than just an appealing visual design. It must function as a powerful sales channel, build lasting customer trust, and deliver measurable business results. For this reason, we place an extremely strong focus on comprehensive search engine optimization (SEO), lightning-fast loading times (Performance & Core Web Vitals), strict digital accessibility (Accessibility Standards), and an outstanding, user-centric user experience (UX) in every single project we undertake."
            : 'Wir verstehen tiefgründig, dass eine erfolgreiche digitale Präsenz in der heutigen Zeit weit mehr als nur ein ansprechendes visuelles Design benötigt. Sie muss als starker Vertriebskanal fungieren, Vertrauen aufbauen und messbare geschäftliche Ergebnisse liefern. Aus diesem Grund legen wir bei jedem Projekt einen extrem starken Fokus auf ganzheitliche Suchmaschinenoptimierung (SEO), blitzschnelle Ladezeiten (Performance & Core Web Vitals), strikte Barrierefreiheit (Accessibility Standards) sowie eine herausragende, nutzerzentrierte User Experience (UX).'}
        </p>
        <p>
          {_locale === 'en'
            ? 'Our highly experienced web developers and designers will guide you as your dedicated digital partners throughout the entire project lifecycle: starting with initial strategic consulting, through detailed prototyping and wireframing, all the way to a seamless launch, ongoing hosting, and long-term technical maintenance. Thanks to our data-driven approach and our extensive expertise across various industries – including automotive, construction, hospitality, real estate, healthcare, professional services, and consulting – we create digital brand experiences that sustainably inspire your demanding target audience and measurably increase your conversion rates. Coday stands for transparent communication, premium code quality, and genuine partnership. Let us drive your digital transformation forward together, digitize your business processes, and successfully translate your entrepreneurial vision into the digital age.'
            : 'Unsere erfahrenen Webentwickler und Designer begleiten Sie als digitale Partner durch den gesamten Prozess: angefangen bei der initialen Strategieberatung, über detailliertes Prototyping und Wireframing, bis hin zum nahtlosen Launch, fortlaufendem Hosting und langfristiger technischer Wartung. Dank unseres datengetriebenen Ansatzes und unserer weitreichenden Expertise in diversen Branchen – darunter Automobil, Handwerk, Gastronomie, Immobilien, Gesundheitswesen, Dienstleistung und Unternehmensberatung – kreieren wir digitale Markenerlebnisse, die Ihre anspruchsvolle Zielgruppe nachhaltig begeistern und Ihre Konversionsraten messbar steigern. Coday steht für transparente Kommunikation, erstklassige Code-Qualität und echte Partnerschaft. Lassen Sie uns gemeinsam Ihre digitale Transformation vorantreiben, Prozesse digitalisieren und Ihre unternehmerische Vision erfolgreich ins digitale Zeitalter übersetzen.'}
        </p>
      </div>
      <script
        id="schema-web-design"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Professionelles Webdesign in Wetzlar & Hessen',
                description:
                  'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.',
                url: `${BASE_URL}/de/services/web-design`,
              }),
            ],
          }),
        }}
      />
      <WebDesignClient />
    </>
  );
}
