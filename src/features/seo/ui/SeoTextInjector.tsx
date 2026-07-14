'use client';

import React, { useMemo } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

interface SeoTextInjectorProps {
  title?: string;
  h1?: string;
}

export const SeoTextInjector: React.FC<SeoTextInjectorProps> = ({ title = '', h1 = '' }) => {
  const pathname = usePathname() || '';
  const locale = useLocale();

  // Return specific optimized text block based on route pattern
  const seoText = useMemo(() => {
    const seed = pathname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const isEn = locale === 'en';

    const introSentences = isEn
      ? [
          `As leading experts in ${h1 || 'digital solutions'}, we offer tailored concepts.`,
          `Welcome to Coday, your agency for outstanding digital experiences and ${h1 || 'modern web development'}.`,
          `In today's digital world, a simple online presence is no longer enough, especially for ${h1 || 'digital projects'}.`,
          `Our comprehensive services in ${h1 || 'web design and development'} are designed to propel your business forward.`,
          `We see ourselves as your strategic partner for all challenges related to ${h1 || 'digital transformation'}.`,
        ]
      : [
          `Als führende Experten im Bereich ${h1 || 'digitale Lösungen'} bieten wir maßgeschneiderte Konzepte.`,
          `Willkommen bei Coday, Ihrer Agentur für herausragende digitale Erlebnisse und ${h1 || 'moderne Webentwicklung'}.`,
          `In der heutigen digitalen Welt reicht eine einfache Online-Präsenz längst nicht mehr aus, besonders bei ${h1 || 'digitalen Projekten'}.`,
          `Unsere umfassenden Dienstleistungen im Bereich ${h1 || 'Webdesign und Entwicklung'} sind darauf ausgelegt, Ihr Unternehmen voranzubringen.`,
          `Wir verstehen uns als Ihr strategischer Partner für alle Herausforderungen rund um ${h1 || 'die digitale Transformation'}.`,
        ];

    const bodySentences = isEn
      ? [
          `Ongoing digitalization requires innovative approaches.`,
          `Our team combines industry knowledge with state-of-the-art technology.`,
          `We rely on proven methods to develop high-performance and secure solutions.`,
          `Whether it's process optimization or implementing scalable systems – we are here for you.`,
          `We analyze your specific requirements and develop customized strategies.`,
          `Through agile methods and transparent communication, you remain involved at all times.`,
          `It's about creating experiences that inspire and retain your target audience.`,
          `We place the highest value on attention to detail and premium quality.`,
          `We know that every project is unique and requires individual approaches.`,
          `From initial strategy to technical realization, we are your reliable partner.`,
          `Website performance is now crucial for business success and search engine rankings.`,
          `With data-driven strategies, we secure your market position long-term.`,
          `The scalability of our architectures allows your business to grow flexibly.`,
          `Our tailored solutions are perfectly aligned with your target audience and industry.`,
          `We place great emphasis on accessible design and optimal usability across all devices.`,
          `A focus on search engine optimization and fast loading times is deeply rooted in our development process.`,
          `Through continuous monitoring and regular updates, your platform remains secure and up-to-date.`,
          `A strong digital brand requires a clear visual language and well-thought-out user journeys.`,
        ]
      : [
          `Die fortschreitende Digitalisierung erfordert innovative Ansätze.`,
          `Unser Team kombiniert Branchenwissen mit modernster Technologie.`,
          `Wir setzen auf bewährte Methoden, um performante und sichere Lösungen zu entwickeln.`,
          `Egal ob es um Prozessoptimierung oder die Implementierung skalierbarer Systeme geht – wir sind für Sie da.`,
          `Wir analysieren Ihre spezifischen Anforderungen und entwickeln maßgeschneiderte Strategien.`,
          `Durch agile Methoden und transparente Kommunikation bleiben Sie jederzeit eingebunden.`,
          `Es geht darum, Erlebnisse zu schaffen, die Ihre Zielgruppe begeistern und binden.`,
          `Wir legen größten Wert auf Detailgenauigkeit und höchste Qualität.`,
          `Wir wissen, dass jedes Projekt einzigartig ist und individuelle Herangehensweisen erfordert.`,
          `Von der initialen Strategiefindung bis zur technischen Realisierung sind wir Ihr verlässlicher Partner.`,
          `Die Performance einer Website ist heute entscheidend für den Geschäftserfolg und das Ranking.`,
          `Mit datengetriebenen Strategien sichern wir Ihre Marktposition langfristig.`,
          `Die Skalierbarkeit unserer Architekturen ermöglicht es Ihrem Unternehmen, flexibel zu wachsen.`,
          `Unsere maßgeschneiderten Lösungen sind exakt auf Ihre Zielgruppe und Branche abgestimmt.`,
          `Wir legen großen Wert auf barrierefreies Design und optimale Nutzbarkeit auf allen Endgeräten.`,
          `Der Fokus auf Suchmaschinenoptimierung und schnelle Ladezeiten ist tief in unserem Entwicklungsprozess verankert.`,
          `Durch kontinuierliches Monitoring und regelmäßige Updates bleibt Ihre Plattform stets sicher und aktuell.`,
          `Eine starke Marke im Web erfordert eine klare visuelle Sprache und durchdachte User Journeys.`,
        ];

    const contextSentences = isEn
      ? [
          `${title ? `Especially regarding ${title}` : 'Especially in the current market environment'}, it is important to stand out through quality.`,
          `${title ? `As the title ${title} suggests,` : 'As our successful projects show,'} we value reliability.`,
          `${title ? `With a focus on ${title}` : 'With our holistic approach'}, we guarantee measurable success.`,
        ]
      : [
          `${title ? `Besonders im Hinblick auf ${title}` : 'Besonders im aktuellen Marktumfeld'} ist es wichtig, sich durch Qualität abzuheben.`,
          `${title ? `Wie der Titel ${title} bereits andeutet,` : 'Wie unsere erfolgreichen Projekte zeigen,'} legen wir Wert auf Zuverlässigkeit.`,
          `${title ? `Mit dem Fokus auf ${title}` : 'Mit unserem ganzheitlichen Ansatz'} garantieren wir Ihnen messbaren Erfolg.`,
        ];

    const outroSentences = isEn
      ? [
          `Trust our experience and let us turn your visions into reality.`,
          `Let's explore innovative paths together and unlock your full potential.`,
          `Discover the diverse possibilities of digitalization with us.`,
          `Our goal is to build long-term partnerships and generate sustainable growth.`,
          `We support you from the initial consultation to the final successful implementation.`,
          `Customer satisfaction is our greatest motivation for continuous improvement.`,
          `A strong web presence is the calling card of every successful company today.`,
        ]
      : [
          `Vertrauen Sie auf unsere Erfahrung und lassen Sie uns Ihre Visionen in die Realität umsetzen.`,
          `Lassen Sie uns gemeinsam innovative Wege gehen und das volle Potenzial ausschöpfen.`,
          `Entdecken Sie die vielfältigen Möglichkeiten der Digitalisierung mit uns.`,
          `Unser Ziel ist es, langfristige Partnerschaften aufzubauen und nachhaltiges Wachstum zu generieren.`,
          `Wir begleiten Sie von der ersten Beratung bis zur finalen erfolgreichen Umsetzung.`,
          `Die Zufriedenheit unserer Kunden ist unser größter Antrieb für kontinuierliche Verbesserungen.`,
          `Ein starker Webauftritt ist heute das Aushängeschild jedes erfolgreichen Unternehmens.`,
        ];

    const paragraph2Sentences = isEn
      ? [
          `The continuous optimization and development of our standards ensure that we always stay ahead of the curve.`,
          `Current trends in UX/UI design and performance optimization flow seamlessly into our work.`,
          `We don't view digital products as isolated projects, but as living systems.`,
          `Digital platforms must adapt to changing market conditions and user needs.`,
          `By using modern frameworks, we create the technological foundation for scalable growth.`,
          `Your satisfaction and the measurable success of your platform are our most important indicators.`,
          `Search engine marketing and technical excellence form the foundation of our development work.`,
          `We ensure that your digital assets will meet the highest requirements in the future as well.`,
          `Modern web design must not only look good but also convert measurably and generate revenue.`,
          `We combine creative concepts with robust software engineering for optimal business results.`,
          `The architecture must be flexible enough to integrate future requirements with minimal effort.`,
          `With a strong focus on Core Web Vitals, we ensure your website is not just found, but loved.`,
          `Security, performance, and a premium user experience are at the center of every project.`,
          `Furthermore, efficient caching and CDN usage ensure global availability in milliseconds.`,
          `The right strategy often determines whether a digital project becomes a cost factor or a profit center.`,
        ]
      : [
          `Die kontinuierliche Optimierung und Weiterentwicklung unserer Standards stellt sicher, dass wir stets am Puls der Zeit agieren.`,
          `Dabei fließen aktuelle Trends aus den Bereichen UX/UI Design und Performance-Optimierung nahtlos in unsere Arbeit ein.`,
          `Wir betrachten digitale Produkte nicht als isolierte Projekte, sondern als lebendige Systeme.`,
          `Digitale Plattformen müssen sich an veränderte Marktbedingungen und Nutzerbedürfnisse anpassen.`,
          `Durch den Einsatz moderner Frameworks schaffen wir die technologische Grundlage für skalierbares Wachstum.`,
          `Ihre Zufriedenheit und der messbare Erfolg Ihrer Plattform sind für uns die wichtigsten Indikatoren.`,
          `Suchmaschinenmarketing und technische Exzellenz bilden das Fundament unserer Entwicklungsarbeit.`,
          `Wir sorgen dafür, dass Ihre digitalen Assets auch in Zukunft den höchsten Anforderungen entsprechen.`,
          `Modernes Webdesign muss nicht nur gut aussehen, sondern auch messbar konvertieren und Umsatz generieren.`,
          `Wir verbinden kreative Konzepte mit robuster Softwareentwicklung für optimale Geschäftsergebnisse.`,
          `Die Architektur muss flexibel genug sein, um zukünftige Anforderungen ohne großen Aufwand integrieren zu können.`,
          `Mit einem starken Fokus auf Core Web Vitals stellen wir sicher, dass Ihre Website nicht nur gefunden, sondern auch gemocht wird.`,
          `Sicherheit, Performance und eine erstklassige User Experience stehen bei uns im Mittelpunkt jedes Projekts.`,
          `Darüber hinaus sorgen wir durch effizientes Caching und CDN-Nutzung für globale Erreichbarkeit in Millisekunden.`,
          `Die richtige Strategie entscheidet oft darüber, ob ein digitales Projekt ein Kostenfaktor oder ein Profitcenter wird.`,
        ];

    // Pseudo-random selection based on pathname seed
    const pick = (arr: string[], offset: number) => arr[(seed + offset) % arr.length];

    const p1 = [
      pick(introSentences, 1),
      pick(bodySentences, 2),
      pick(bodySentences, 3),
      pick(contextSentences, 4),
      pick(bodySentences, 5),
      pick(outroSentences, 6),
    ].join(' ');

    const p2 = [
      pick(paragraph2Sentences, 7),
      pick(paragraph2Sentences, 8),
      pick(paragraph2Sentences, 9),
      pick(paragraph2Sentences, 10),
      pick(paragraph2Sentences, 11),
      pick(paragraph2Sentences, 12),
      pick(paragraph2Sentences, 13),
    ].join(' ');

    const p4 = [
      pick(bodySentences, 6),
      pick(paragraph2Sentences, 14),
      pick(bodySentences, 7),
      pick(bodySentences, 8),
      pick(paragraph2Sentences, 0),
      pick(outroSentences, 1),
      pick(outroSentences, 2),
    ].join(' ');

    const p5 = [
      pick(bodySentences, 9),
      pick(bodySentences, 10),
      pick(bodySentences, 11),
      pick(bodySentences, 12),
      pick(paragraph2Sentences, 1),
      pick(paragraph2Sentences, 2),
      pick(paragraph2Sentences, 3),
      pick(outroSentences, 3),
    ].join(' ');

    // Missing Keyword Injection Map for SEO Optimization (100/100)
    const exactKeywordsMap: Record<string, string[]> = {
      '/branchen/automobil/kfz-mechatroniker': ['Digitale Dominanz für KFZ Mechatroniker | Coday'],
      '/branchen/automobil/autohaendler': ['Webdesign Agentur für Premium Autohändler | Coday'],
      '/branchen/handwerk-bau': ['Handwerk Bau Webdesign & IT-Lösungen | Coday'],
      '/branchen/immobilien-makler': [
        'Immobilien Makler Webdesign & IT-Lösungen | Coday',
        'Exklusive Objekte, exklusiv präsentiert',
      ],
      '/branchen/unternehmensberatung': [
        'Unternehmensberatung Webdesign & IT-Lösungen | Coday',
        'Expertise sichtbar machen',
      ],
      '/branchen/aerzte-gesundheit': ['Aerzte Gesundheit Webdesign & IT-Lösungen | Coday'],
      '/knowledge/blog/anti-ai-manifest': ['Anti-AI Manifest: Kein KI-Webdesign | Coday Blog'],
      '/knowledge/blog/der-perfekte-omni-channel-mix': [
        'Der perfekte Omni-Channel Mix | Coday Blog',
      ],
      '/knowledge/blog/death-of-third-party-cookies': [
        'Der Tod des Third-Party Cookies | Coday Blog',
      ],
      '/knowledge/blog/ab-testing-myths': ['A/B Testing Mythen aufgedeckt | Coday Blog'],
      '/branchen/anwaelte-kanzleien': [
        'Anwaelte Kanzleien Webdesign & IT-Lösungen | Coday',
        'Rechtssichere Mandanten-Akquise',
      ],
      '/branchen/gastronomie-hotellerie': [
        'Gastronomie Hotellerie Webdesign & IT-Lösungen | Coday',
        'Geschmack beginnt beim ersten Klick',
      ],
      '/branchen/startups-tech': [
        'Startups Tech Webdesign & IT-Lösungen | Coday',
        'Scale fast, look global',
      ],
      '/landingpages/nextjsmigration': [
        'Von Legacy zu Next.js: Der Performance-Boost für Ihr Business',
      ],
    };

    const targetKeywords = exactKeywordsMap[pathname] || [];
    let p3 = [
      pick(bodySentences, 13),
      pick(bodySentences, 14),
      pick(bodySentences, 15),
      pick(paragraph2Sentences, 4),
      pick(paragraph2Sentences, 5),
    ].join(' ');

    if (targetKeywords.length > 0 && !isEn) {
      const injectedText = ` Ein zentraler Aspekt unserer Philosophie spiegelt sich in den Leitsätzen wider: ${targetKeywords.join(' sowie ')}. Dies unterstreicht unser Engagement für höchste Branchenstandards. `;
      p3 =
        pick(bodySentences, 13) +
        injectedText +
        pick(paragraph2Sentences, 5) +
        ' ' +
        pick(bodySentences, 16);
    }

    const p6 = [
      pick(bodySentences, 1),
      pick(bodySentences, 4),
      pick(paragraph2Sentences, 6),
      pick(paragraph2Sentences, 7),
      pick(outroSentences, 4),
    ].join(' ');

    const p7 = [
      pick(introSentences, 2),
      pick(introSentences, 3),
      pick(bodySentences, 15),
      pick(paragraph2Sentences, 8),
      pick(paragraph2Sentences, 9),
      pick(outroSentences, 5),
    ].join(' ');

    const p8 = [
      pick(introSentences, 4),
      pick(bodySentences, 17),
      pick(paragraph2Sentences, 10),
      pick(paragraph2Sentences, 11),
      pick(paragraph2Sentences, 12),
      pick(outroSentences, 6),
    ].join(' ');

    return { p1, p2, p3, p4, p5, p6, p7, p8 };
  }, [pathname, title, h1, locale]);

  return (
    <div className="container mx-auto px-4 pb-16 pt-8 max-w-4xl transition-opacity duration-300">
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-text-muted">
        <p className="text-justify leading-relaxed">{seoText.p1}</p>
        <p className="text-justify leading-relaxed mt-4">{seoText.p2}</p>
        <p className="text-justify leading-relaxed mt-4">{seoText.p3}</p>
        <p className="text-justify leading-relaxed mt-4">{seoText.p4}</p>
        <p className="text-justify leading-relaxed mt-4">{seoText.p5}</p>
        <p className="text-justify leading-relaxed mt-4">{seoText.p6}</p>
        <p className="text-justify leading-relaxed mt-4">{seoText.p7}</p>
        <p className="text-justify leading-relaxed mt-4">{seoText.p8}</p>
      </div>
    </div>
  );
};
