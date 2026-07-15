import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { getOrganizationSchema, getProcessSchema } from '@/lib/schema';
import ClientComponent from '@/features/process/ui/ProcessClient';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Web Design Process | How We Work in Wetzlar',
      description:
        'From first meeting to launch. Learn how Coday in Wetzlar delivers your web project. Personal, structured and always at the agreed fixed price point.',
      path: '/en/process',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Unser Webdesign Prozess | So arbeiten wir in Wetzlar',
    description:
      'Vom Erstgespräch bis zum Launch. Erfahren Sie wie Coday in Wetzlar Ihr Webprojekt umsetzt. Persönlich, strukturiert und immer zum vereinbarten Festpreis.',
    path: '/de/process',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Our Web Design Process | How We Work in Wetzlar | Coday'
      : 'Unser Webdesign Prozess | So arbeiten wir in Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'From first meeting to launch. Learn how Coday in Wetzlar delivers your web project. Personal, structured and always at the agreed fixed price point.'
      : 'Vom Erstgespräch bis zum Launch. Erfahren Sie wie Coday in Wetzlar Ihr Webprojekt umsetzt. Persönlich, strukturiert und immer zum vereinbarten Festpreis.';
  return (
    <>
      <script
        id="schema-process"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [getOrganizationSchema(_locale), getProcessSchema(_locale)],
          }),
        }}
      />
      <SeoHead
        title="Coday | process"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
      <SeoContentBlock />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {params.locale === 'en'
            ? 'Our Structured Web Design Process'
            : 'Unser strukturierter Webdesign-Prozess'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {params.locale === 'en'
              ? "At Coday, our web design process in Wetzlar follows a carefully structured five-step methodology that transforms your business requirements into a high-performance digital presence. Every successful website begins with Discovery — a thorough, in-depth exploration of your business, your market, your competitors, and your target audience. During this initial phase, we conduct detailed interviews to understand your brand identity, your business objectives, and the specific goals you want your website to achieve. We analyze your existing digital presence, review your competitors' websites, and identify the opportunities and gaps in your market segment. This is not a superficial questionnaire; it is a comprehensive strategic assessment that typically involves multiple conversations, document reviews, and market research sessions. The Discovery phase is where we establish the foundation for every decision that follows, ensuring that your website is not just visually impressive but strategically aligned with your business goals. For businesses in Wetzlar and across Central Hesse, this localized understanding of the regional market dynamics is particularly valuable — we know the business landscape, the customer expectations, and the competitive environment that shapes digital success in this region."
              : 'Bei Coday folgt unser Webdesign-Prozess in Wetzlar einer sorgfältig strukturierten Fünf-Phasen-Methodik, die Ihre geschäftlichen Anforderungen in eine leistungsstarke digitale Präsenz transformiert. Jede erfolgreiche Website beginnt mit der Discovery-Phase — einer gründlichen, tiefgehenden Exploration Ihres Unternehmens, Ihres Marktes, Ihrer Wettbewerber und Ihrer Zielgruppe. In dieser initialen Phase führen wir detaillierte Interviews, um Ihre Markenidentität, Ihre Geschäftsziele und die spezifischen Ziele zu verstehen, die Ihre Website erreichen soll. Wir analysieren Ihre bestehende digitale Präsenz, überprüfen die Websites Ihrer Wettbewerber und identifizieren die Chancen und Lücken in Ihrem Marktsegment. Das ist kein oberflächlicher Fragebogen, sondern eine umfassende strategische Bewertung, die typischerweise mehrere Gespräche, Dokumentenprüfungen und Marktforschungssitzungen umfasst. Die Discovery-Phase ist der Ort, an dem wir das Fundament für jede nachfolgende Entscheidung legen und sicherstellen, dass Ihre Website nicht nur visuell beeindruckend, sondern strategisch auf Ihre Geschäftsziele ausgerichtet ist. Für Unternehmen in Wetzlar und in ganz Mittelhessen ist dieses lokalisierte Verständnis der regionalen Marktdynamik besonders wertvoll — wir kennen die Geschäftslandschaft, die Kundenerwartungen und das Wettbewerbsumfeld, das den digitalen Erfolg in dieser Region prägt.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'The second and third phases of our web design process — Strategy and Design — build directly upon the insights gathered during Discovery. In the Strategy phase, we translate your business objectives into a concrete digital roadmap. This includes defining the information architecture of your website, mapping out user journeys for your key customer segments, establishing conversion funnels, planning content hierarchy, and setting measurable success criteria that we will evaluate after launch. We create detailed wireframes that define the structural layout of every page, ensuring that navigation is intuitive, calls to action are strategically placed, and the overall user experience guides visitors naturally toward your desired outcomes — whether that is requesting a quote, booking a consultation, or making a purchase. The Strategy phase also includes a comprehensive SEO keyword plan tailored to your industry and geographic focus, ensuring that your website is built from the ground up to rank effectively in search engine results for the terms that matter most to your business. In the Design phase, our creative process brings the strategic framework to life with a visual identity that authentically represents your brand. We develop custom design concepts — never templates — that combine modern aesthetics with functional clarity. Every color choice, typography decision, spacing value, and interactive element is deliberate and purposeful. We present design mockups for your review and incorporate your feedback through structured revision cycles until the visual direction perfectly captures your brand personality and meets your expectations.'
              : 'Die zweite und dritte Phase unseres Webdesign-Prozesses — Strategie und Design — bauen direkt auf den in der Discovery-Phase gewonnenen Erkenntnissen auf. In der Strategiephase übersetzen wir Ihre Geschäftsziele in eine konkrete digitale Roadmap. Dazu gehören die Definition der Informationsarchitektur Ihrer Website, das Mapping von User Journeys für Ihre wichtigsten Kundensegmente, die Etablierung von Conversion-Funnels, die Planung der Inhaltshierarchie und die Festlegung messbarer Erfolgskriterien, die wir nach dem Launch evaluieren. Wir erstellen detaillierte Wireframes, die das strukturelle Layout jeder Seite definieren und sicherstellen, dass die Navigation intuitiv ist, Handlungsaufforderungen strategisch platziert sind und die gesamte Benutzererfahrung Besucher auf natürliche Weise zu Ihren gewünschten Ergebnissen führt — sei es eine Angebotsanfrage, die Buchung einer Beratung oder ein Kauf. Die Strategiephase umfasst auch einen umfassenden SEO-Keyword-Plan, der auf Ihre Branche und Ihren geografischen Fokus zugeschnitten ist und sicherstellt, dass Ihre Website von Grund auf so aufgebaut ist, dass sie in den Suchergebnissen für die Begriffe effektiv rankt, die für Ihr Geschäft am wichtigsten sind. In der Designphase erweckt unser kreativer Prozess das strategische Gerüst mit einer visuellen Identität zum Leben, die Ihre Marke authentisch repräsentiert. Wir entwickeln individuelle Designkonzepte — niemals Templates — die moderne Ästhetik mit funktionaler Klarheit verbinden. Jede Farbwahl, jede Typografie-Entscheidung, jeder Abstandswert und jedes interaktive Element ist bewusst und zielgerichtet. Wir präsentieren Designentwürfe zur Prüfung und integrieren Ihr Feedback durch strukturierte Revisionszyklen, bis die visuelle Richtung Ihre Markenpersönlichkeit perfekt einfängt und Ihren Erwartungen entspricht.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'The Development phase is where technical excellence takes center stage in our web design process. At Coday in Wetzlar, we build every website using modern, production-grade technologies — primarily Next.js with React and TypeScript — that deliver exceptional performance, security, and maintainability. Our development methodology is not about assembling pre-built components from a page builder; it is about engineering a custom digital product that meets exacting quality standards. During development, we implement fully responsive layouts that render perfectly across all screen sizes and devices, from compact smartphones to ultra-wide desktop monitors. We optimize every asset for speed: images are served in next-generation formats like WebP and AVIF with responsive sizing, JavaScript bundles are minimized and code-split for efficient loading, and critical rendering paths are optimized to achieve sub-two-second Largest Contentful Paint times on mobile networks. Security is engineered into the architecture from the start with Content Security Policy headers, strict input validation, secure authentication flows, and protection against common web vulnerabilities. We integrate headless CMS platforms like Sanity to provide you with an intuitive, user-friendly content management experience that requires no technical knowledge to operate. Throughout the development phase, your project is deployed to a private staging environment where you can review progress in real time, test functionality across devices, and provide feedback before anything goes live.'
              : 'Die Entwicklungsphase ist der Moment, in dem technische Exzellenz in unserem Webdesign-Prozess in den Vordergrund rückt. Bei Coday in Wetzlar erstellen wir jede Website mit modernen, produktionsreifen Technologien — in erster Linie Next.js mit React und TypeScript — die außergewöhnliche Performance, Sicherheit und Wartbarkeit bieten. Unsere Entwicklungsmethodik besteht nicht darin, vorgefertigte Komponenten aus einem Baukasten zusammenzusetzen, sondern ein maßgeschneidertes digitales Produkt zu entwickeln, das höchsten Qualitätsstandards entspricht. Während der Entwicklung implementieren wir vollständig responsive Layouts, die auf allen Bildschirmgrößen und Geräten perfekt dargestellt werden, von kompakten Smartphones bis hin zu Ultra-Wide-Desktop-Monitoren. Wir optimieren jedes Asset für Geschwindigkeit: Bilder werden in Formaten der nächsten Generation wie WebP und AVIF mit responsiver Größenanpassung ausgeliefert, JavaScript-Bundles werden minimiert und per Code-Splitting für effizientes Laden aufgeteilt, und kritische Rendering-Pfade werden optimiert, um Largest-Contentful-Paint-Zeiten von unter zwei Sekunden auf mobilen Netzwerken zu erreichen. Sicherheit wird von Anfang an in die Architektur integriert — mit Content-Security-Policy-Headern, strikter Eingabevalidierung, sicheren Authentifizierungsabläufen und Schutz gegen gängige Web-Schwachstellen. Wir integrieren Headless-CMS-Plattformen wie Sanity, um Ihnen ein intuitives, benutzerfreundliches Content-Management-Erlebnis zu bieten, das keine technischen Kenntnisse erfordert. Während der gesamten Entwicklungsphase wird Ihr Projekt in einer privaten Staging-Umgebung bereitgestellt, in der Sie den Fortschritt in Echtzeit verfolgen, Funktionalität auf verschiedenen Geräten testen und Feedback geben können, bevor irgendetwas live geht.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'The final phase of our web design process is Launch — the moment your new website goes live and begins working for your business. But at Coday, launch day is not the end of our involvement; it is the beginning of our ongoing commitment to your digital success. Before deployment, we conduct a rigorous pre-launch checklist that covers performance verification against our Lighthouse 90+ guarantee, cross-browser compatibility testing, mobile responsiveness validation, security audits, SEO configuration checks including meta tags, structured data, XML sitemaps, and robots.txt, as well as accessibility compliance review. Only when every item on this checklist passes do we proceed with the production deployment. We handle the complete technical deployment process, including DNS configuration, SSL certificate setup, CDN optimization, and server-side rendering configuration, so you can focus entirely on your business. After launch, our post-launch support ensures that your website continues to perform flawlessly. We provide rapid response bug fixes, proactive security monitoring, regular performance re-audits, and content update assistance during the support period. For businesses in Wetzlar and across Hesse that require ongoing digital growth, we also offer long-term maintenance and optimization packages that include new feature development, conversion rate optimization, Core Web Vitals monitoring, and strategic SEO consulting. Our web design process is designed to be transparent, predictable, and results-driven from start to finish — delivered at a fixed price with no surprises. This structured approach is why businesses throughout Wetzlar and Central Hesse choose Coday as their trusted web design partner.'
              : 'Die letzte Phase unseres Webdesign-Prozesses ist der Launch — der Moment, in dem Ihre neue Website live geht und beginnt, für Ihr Unternehmen zu arbeiten. Doch bei Coday ist der Launch-Tag nicht das Ende unseres Engagements; er ist der Beginn unserer fortlaufenden Verpflichtung für Ihren digitalen Erfolg. Vor dem Deployment führen wir eine strenge Pre-Launch-Checkliste durch, die Performance-Verifizierung gegen unsere Lighthouse-90+-Garantie, Cross-Browser-Kompatibilitätstests, Mobile-Responsiveness-Validierung, Sicherheitsaudits, SEO-Konfigurationsprüfungen einschließlich Meta-Tags, strukturierter Daten, XML-Sitemaps und robots.txt sowie die Überprüfung der Barrierefreiheits-Konformität umfasst. Erst wenn jeder Punkt dieser Checkliste bestanden ist, fahren wir mit dem Produktions-Deployment fort. Wir übernehmen den gesamten technischen Deployment-Prozess, einschließlich DNS-Konfiguration, SSL-Zertifikat-Einrichtung, CDN-Optimierung und Server-Side-Rendering-Konfiguration, damit Sie sich vollständig auf Ihr Geschäft konzentrieren können. Nach dem Launch sorgt unser Post-Launch-Support dafür, dass Ihre Website weiterhin einwandfrei funktioniert. Wir bieten schnelle Fehlerbehebungen, proaktive Sicherheitsüberwachung, regelmäßige Performance-Re-Audits und Unterstützung bei Inhaltsaktualisierungen während der Support-Phase. Für Unternehmen in Wetzlar und in ganz Hessen, die kontinuierliches digitales Wachstum benötigen, bieten wir auch langfristige Wartungs- und Optimierungspakete an, die neue Feature-Entwicklung, Conversion-Rate-Optimierung, Core-Web-Vitals-Monitoring und strategische SEO-Beratung umfassen. Unser Webdesign-Prozess ist so gestaltet, dass er von Anfang bis Ende transparent, vorhersehbar und ergebnisorientiert ist — geliefert zum Festpreis ohne Überraschungen. Dieser strukturierte Ansatz ist der Grund, warum Unternehmen in ganz Wetzlar und Mittelhessen Coday als ihren vertrauenswürdigen Webdesign-Partner wählen.'}
          </p>
        </div>
      </section>
    </>
  );
}
