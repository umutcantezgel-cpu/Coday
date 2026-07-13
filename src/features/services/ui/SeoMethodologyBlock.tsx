import React from 'react';
import { useLocale } from 'next-intl';

export const SeoMethodologyBlock: React.FC = () => {
  const locale = useLocale();
  const isDe = locale !== 'en';

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {isDe ? 'Coday Qualitätsanspruch & Methodik' : 'Coday Quality Standard & Methodology'}
        </h2>
        <div className="prose prose-lg text-gray-600 max-w-none text-pretty">
          {isDe ? (
            <>
              <p>
                Ein guter Text oder Artikel sollte mindestens 500 Wörter enthalten, doch für
                digitale Exzellenz braucht es weitaus mehr als nur Worte. Als Ihre erfahrene{' '}
                <strong>Webdesign Agentur aus Wetzlar</strong> setzen wir auf höchste technische und
                gestalterische Standards. Bei jeder Service-Leistung, von der App-Entwicklung bis
                hin zur umfassenden SEO-Optimierung, liegt unser Fokus auf messbarer Performance und
                nachhaltiger Code-Architektur.
              </p>
              <p>
                Unsere Arbeitsweise zeichnet sich durch den Einsatz zukunftsweisender Technologien
                wie <strong>Next.js</strong>, React und modernen Headless-Systemen aus. Das bedeutet
                für Ihr Projekt: Blitzschnelle Ladezeiten (LCP unter 2.0 Sekunden), maximale
                Sicherheit durch vom Backend entkoppelte Frontends und eine perfekte Skalierbarkeit
                für kommende Unternehmensanforderungen. Transparenz ist uns extrem wichtig. Daher
                arbeiten wir bei Coday stets mit klaren Festpreisen ohne versteckte
                Agentur-Aufschläge, fest definierten Timings und direkten Kommunikationswegen, da
                Sie ausschließlich mit dem Inhaber persönlich zusammenarbeiten.
              </p>
              <p>
                Wir entwickeln nicht einfach nur Webseiten – wir konzipieren strategische
                Touchpoints, die Vertrauen bei Ihrer Zielgruppe aufbauen und messbar Leads
                generieren. Egal ob Sie ein lokales Handwerksunternehmen in Hessen führen, ein
                digitales Startup gründen oder komplexe E-Commerce Lösungen benötigen: Unser
                Qualitätsanspruch ist es, internationale Top-Tier Standards auch in lokalen und
                mittelständischen Märkten zu etablieren. Jeder Code-Block ist maßgeschneidert, jedes
                Design ist ein Unikat und jede Schnittstelle ist auf höchste Skalierbarkeit
                ausgelegt.
              </p>
            </>
          ) : (
            <>
              <p>
                A good text or article should contain at least 500 words, but true digital
                excellence demands much more than just words. As your experienced{' '}
                <strong>Web Design Agency</strong>, we adhere to the highest technical and creative
                standards. In every service we provide, from web application development to
                comprehensive SEO optimization, our focus remains firmly on measurable performance
                and sustainable code architecture.
              </p>
              <p>
                Our methodology relies on forward-thinking technologies such as{' '}
                <strong>Next.js</strong>, React, and modern headless systems. For your project, this
                guarantees lightning-fast load times (LCP under 2.0 seconds), maximum security
                through decoupled frontends, and seamless scalability to handle future business
                requirements. Transparency is extremely important to us. At Coday, we always operate
                with clear fixed pricing, no hidden agency fees, strictly defined timelines, and
                direct lines of communication, since you will be working exclusively with the owner.
              </p>
              <p>
                We do not just build websites – we design strategic touchpoints that build trust
                with your target audience and measurably generate leads. Whether you manage a local
                business, are launching a digital startup, or need complex e-commerce solutions, our
                quality standard is to establish international top-tier benchmarks in your specific
                market. Every block of code is handcrafted, every design is entirely unique, and
                every API is engineered for absolute reliability.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
