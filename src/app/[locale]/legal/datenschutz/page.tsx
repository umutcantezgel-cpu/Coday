import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Privacy Policy | Web Design Agency Wetzlar Hesse',
      description:
        'Privacy policy of Coday, your web design agency in Wetzlar. GDPR-compliant data processing and your rights. Full transparency and data security.',
      path: '/en/legal/datenschutz',
      type: 'legal',
    });
  }
  return generatePageMetadata({
    title: 'Datenschutzerklärung | Webdesign Agentur Wetzlar',
    description:
      'Datenschutzerklärung von Coday, Ihrer Webdesign Agentur in Wetzlar. DSGVO-konforme Datenverarbeitung und Ihre Rechte. Transparenz und Sicherheit.',
    path: '/de/legal/datenschutz',
    type: 'legal',
  });
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Privacy Policy | Web Design Agency Wetzlar Hesse | Coday'
      : 'Datenschutzerklärung | Webdesign Agentur Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Privacy policy of Coday, your web design agency in Wetzlar. GDPR-compliant data processing and your rights. Full transparency and data security.'
      : 'Datenschutzerklärung von Coday, Ihrer Webdesign Agentur in Wetzlar. DSGVO-konforme Datenverarbeitung und Ihre Rechte. Transparenz und Sicherheit.';
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
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8 text-secondary-900">
          {isEn ? 'Privacy Policy' : 'Datenschutzerklärung'}
        </h1>
        <section className="py-[var(--space-section)] space-y-6 text-secondary-800">
          <h2 className="text-xl font-semibold text-secondary-900">
            {isEn ? '1. Data Controller' : '1. Verantwortlicher'}
          </h2>
          <p>
            Umutcan Emre Tezgel
            <br />
            Coday · Einzelunternehmen
            <br />
            Lessingstraße 4, 35578 Wetzlar
            <br />
            E-Mail: umut@codayweb.de
          </p>

          <h2 className="text-xl font-semibold text-secondary-900">
            {isEn ? '2. Your Rights under GDPR' : '2. Ihre Rechte nach DSGVO'}
          </h2>
          <p>
            {isEn
              ? 'You have the right to access, rectification, erasure, restriction of processing, data portability, and objection (Art. 15-21 GDPR).'
              : 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15-21 DSGVO).'}
          </p>

          <h2 className="text-xl font-semibold text-secondary-900">
            {isEn ? '3. Hosting' : '3. Hosting'}
          </h2>
          <p>
            {isEn
              ? 'This website is hosted on Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel processes server logs (IP address, browser, timestamp) to ensure operation.'
              : 'Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Vercel verarbeitet Server-Logdaten (IP-Adresse, Browser, Zeitstempel) zur Sicherstellung des Betriebs.'}
          </p>

          <h2 className="text-xl font-semibold text-secondary-900">
            {isEn ? '4. ProvenExpert Review Seal' : '4. ProvenExpert Bewertungssiegel'}
          </h2>
          <p>
            {isEn
              ? 'We use the ProvenExpert review seal (Expert Systems AG, Quedlinburger Str. 1, 10589 Berlin). The integrated seal loads a static image from images.provenexpert.com. In this process, your IP address is transmitted to ProvenExpert. Legal basis: Art. 6 (1) lit. f GDPR (legitimate interest in displaying customer reviews). Further information: https://www.provenexpert.com/en-us/privacy-policy/'
              : 'Wir nutzen das Bewertungssiegel von ProvenExpert (Expert Systems AG, Quedlinburger Str. 1, 10589 Berlin). Das eingebundene Siegel lädt ein statisches Bild von images.provenexpert.com. Dabei wird Ihre IP-Adresse an ProvenExpert übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Darstellung von Kundenbewertungen). Weitere Informationen: https://www.provenexpert.com/de-de/datenschutzerklaerung/'}
          </p>

          <p className="text-sm text-secondary-600 mt-12">
            {isEn ? 'Last updated: May 2026' : 'Stand: Mai 2026'}
          </p>
        </section>
      </div>
    </>
  );
}
