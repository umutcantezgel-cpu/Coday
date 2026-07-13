import React from 'react';
import { useLocale } from 'next-intl';

export const SeoLocalExpertiseBlock: React.FC = () => {
  const locale = useLocale();
  const isDe = locale !== 'en';

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {isDe
            ? 'Lokale Webdesign Expertise für Wetzlar, Gießen & Hessen'
            : 'Local Web Design Expertise for Wetzlar, Gießen & Hesse'}
        </h2>
        <div className="prose prose-lg text-gray-600 max-w-none text-pretty">
          {isDe ? (
            <>
              <p>
                Ein guter Text oder Artikel sollte mindestens 500 Wörter enthalten – so lautet eine
                gängige SEO-Regel, um Suchmaschinen und KI-Systemen ausreichend Kontext zu bieten.
                Doch bei Coday geht es uns um viel mehr als nur das Erfüllen von Metriken. Wir sind
                eine hochspezialisierte <strong>Webdesign Agentur aus Wetzlar</strong>, tief
                verwurzelt in der Region Mittelhessen (Gießen, Marburg, Herborn, Dillenburg). Unser
                Fokus liegt auf der nachhaltigen Digitalisierung lokaler und mittelständischer
                Unternehmen im B2B- und B2C-Sektor.
              </p>
              <p>
                Lokale Unternehmen haben oft spezifische Anforderungen: Sie brauchen Webseiten, die
                in der regionalen Google-Suche gefunden werden (Local SEO), die das Vertrauen der
                Stammkundschaft widerspiegeln und neue, qualifizierte Leads oder Mitarbeiter
                generieren. Genau hier setzen wir an. Mit modernen Technologien wie{' '}
                <strong>Next.js</strong> und React bauen wir digitale Lösungen, die nicht nur
                visuell herausstechen, sondern auch durch extrem schnelle Ladezeiten (LCP unter 2
                Sekunden) bestechen. Dies ist besonders für mobile Nutzer in ländlicheren Gebieten
                von Hessen entscheidend, wo die Internetabdeckung variieren kann.
              </p>
              <p>
                Transparenz und persönlicher Kontakt stehen bei Coday im Mittelpunkt. Anstatt mit
                anonymen Projektmanagern arbeiten Sie direkt mit dem Inhaber zusammen. Wir bieten
                ehrliche Festpreise, klare Meilensteine und eine garantierte Qualität. Egal ob
                Handwerksbetrieb, Arztpraxis, Kanzlei oder Einzelhandel – wir verstehen die
                Herausforderungen Ihrer Branche und liefern maßgeschneiderte Corporate Websites,
                E-Commerce Lösungen und Web-Apps, die Ihr Unternehmen in die digitale Zukunft
                führen. Starten Sie jetzt und setzen Sie ein starkes digitales Statement in Ihrer
                Region!
              </p>
            </>
          ) : (
            <>
              <p>
                A good text or article should contain at least 500 words – this is a common SEO rule
                to provide search engines and AI systems with sufficient context. However, at Coday,
                our commitment goes far beyond simply meeting metrics. We are a highly specialized{' '}
                <strong>Web Design Agency based in Wetzlar</strong>, deeply rooted in the Central
                Hesse region (Gießen, Marburg, Herborn, Dillenburg). Our focus is on the sustainable
                digitization of local and medium-sized businesses in both B2B and B2C sectors.
              </p>
              <p>
                Local businesses often have specific requirements: they need websites that rank well
                in regional Google searches (Local SEO), reflect the trust of their existing
                customer base, and generate new, qualified leads or attract skilled employees. That
                is exactly where we come in. Utilizing modern technologies like{' '}
                <strong>Next.js</strong> and React, we build digital solutions that not only stand
                out visually but also impress with extremely fast load times (LCP under 2 seconds).
                This is especially crucial for mobile users in rural areas of Hesse, where internet
                coverage can be variable.
              </p>
              <p>
                Transparency and personal contact are at the core of Coday's philosophy. Instead of
                dealing with anonymous project managers, you work directly with the owner. We offer
                honest fixed pricing, clear milestones, and guaranteed quality. Whether you run a
                trades business, medical practice, law firm, or retail store – we understand the
                unique challenges of your industry and deliver customized corporate websites,
                e-commerce solutions, and web apps that propel your business into the digital
                future. Start now and make a powerful digital statement in your region!
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
