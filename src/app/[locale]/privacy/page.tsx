'use client';

import { useCookieStore } from '@/shared/lib/cookieStore';

export default function PrivacyPage() {
  const { preferences, openSettings, rejectAll } = useCookieStore();

  let _locale = 'de' as string;
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 prose dark:prose-invert">
      \n{' '}
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
      <h1>Datenschutzerklärung</h1>
      <p>
        Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der
        EU-Datenschutzgrundverordnung (DSGVO), ist: Codayweb.de
      </p>
      <h2>Ihre Datenschutzrechte</h2>
      <p>
        Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit
        folgende Rechte ausüben:
      </p>
      <ul>
        <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung</li>
        <li>Berichtigung unrichtiger personenbezogener Daten</li>
        <li>Löschung Ihrer bei uns gespeicherten Daten</li>
      </ul>
      <hr className="my-12" />
      <h2 id="cookies">Cookie-Einstellungen & Details</h2>
      <p>
        Wir nutzen auf unserer Website Cookies und ähnliche Technologien. Hier können Sie jederzeit
        Ihre getroffene Auswahl einsehen und widerrufen.
      </p>
      <div className="bg-zinc-100 dark:bg-zinc-800/50 p-6 rounded-xl my-6">
        <h3 className="mt-0">Ihre aktuelle Auswahl:</h3>
        <ul className="list-none pl-0">
          <li>✅ Notwendig (Immer aktiv)</li>
          <li>{preferences?.analytics ? '✅' : '❌'} Statistiken</li>
          <li>{preferences?.functional ? '✅' : '❌'} Funktional (Sentry)</li>
          <li>{preferences?.marketing ? '✅' : '❌'} Marketing (Cal.com)</li>
        </ul>

        <div className="flex gap-4 mt-6">
          <button
            onClick={openSettings}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
          >
            Banner erneut öffnen
          </button>
          <button
            onClick={rejectAll}
            className="border border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Alle nicht-notwendigen ablehnen
          </button>
        </div>
      </div>
      <h3>Liste der gesetzten Cookies und Technologien</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 font-semibold">Name / Technologie</th>
              <th className="py-3 px-4 font-semibold">Anbieter</th>
              <th className="py-3 px-4 font-semibold">Zweck</th>
              <th className="py-3 px-4 font-semibold">Kategorie</th>
              <th className="py-3 px-4 font-semibold">Speicherdauer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4 font-mono">coday_gdpr_consent</td>
              <td className="py-3 px-4">Codayweb (Eigener Host)</td>
              <td className="py-3 px-4">
                Speichert Ihre Consent-Einstellungen aus dem Cookie-Banner.
              </td>
              <td className="py-3 px-4">Notwendig</td>
              <td className="py-3 px-4">1 Jahr</td>
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4 font-mono">coday_session_id</td>
              <td className="py-3 px-4">Codayweb (Eigener Host)</td>
              <td className="py-3 px-4">Anonyme Session-ID für serverseitiges Consent-Logging.</td>
              <td className="py-3 px-4">Notwendig</td>
              <td className="py-3 px-4">1 Jahr</td>
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4">Sentry</td>
              <td className="py-3 px-4">Sentry.io</td>
              <td className="py-3 px-4">
                Erfasst Fehlerprotokolle (Error Tracking) ohne PII, um die Stabilität der App zu
                gewährleisten.
              </td>
              <td className="py-3 px-4">Funktional</td>
              <td className="py-3 px-4">Session</td>
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4">Vercel Analytics</td>
              <td className="py-3 px-4">Vercel Inc.</td>
              <td className="py-3 px-4">
                Erfasst anonymisierte Zugriffsstatistiken. Arbeitet komplett ohne Cookies
                (Privacy-by-Design).
              </td>
              <td className="py-3 px-4">Notwendig / Keine Cookies</td>
              <td className="py-3 px-4">-</td>
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4">Cal.com</td>
              <td className="py-3 px-4">Cal.com Inc.</td>
              <td className="py-3 px-4">
                Ermöglicht die direkte Terminbuchung auf unserer Website.
              </td>
              <td className="py-3 px-4">Marketing</td>
              <td className="py-3 px-4">Session / Third-Party</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
