'use client';

import React, { useMemo } from 'react';
import { usePathname } from '@/i18n/navigation';

interface SeoTextInjectorProps {
  title?: string;
  h1?: string;
}

export const SeoTextInjector: React.FC<SeoTextInjectorProps> = ({ title = '', h1 = '' }) => {
  const pathname = usePathname() || '';

  // Return specific optimized text block based on route pattern
  const seoText = useMemo(() => {
    const seed = pathname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const introSentences = [
      `Als führende Experten im Bereich ${h1 || 'digitale Lösungen'} bieten wir maßgeschneiderte Konzepte.`,
      `Willkommen bei Coday, Ihrer Agentur für herausragende digitale Erlebnisse und ${h1 || 'moderne Webentwicklung'}.`,
      `In der heutigen digitalen Welt reicht eine einfache Online-Präsenz längst nicht mehr aus, besonders bei ${h1 || 'digitalen Projekten'}.`,
      `Unsere umfassenden Dienstleistungen im Bereich ${h1 || 'Webdesign und Entwicklung'} sind darauf ausgelegt, Ihr Unternehmen voranzubringen.`,
      `Wir verstehen uns als Ihr strategischer Partner für alle Herausforderungen rund um ${h1 || 'die digitale Transformation'}.`,
    ];

    const bodySentences = [
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
    ];

    const contextSentences = [
      `${title ? `Besonders im Hinblick auf ${title}` : 'Besonders im aktuellen Marktumfeld'} ist es wichtig, sich durch Qualität abzuheben.`,
      `${title ? `Wie der Titel ${title} bereits andeutet,` : 'Wie unsere erfolgreichen Projekte zeigen,'} legen wir Wert auf Zuverlässigkeit.`,
      `${title ? `Mit dem Fokus auf ${title}` : 'Mit unserem ganzheitlichen Ansatz'} garantieren wir Ihnen messbaren Erfolg.`,
    ];

    const outroSentences = [
      `Vertrauen Sie auf unsere Erfahrung und lassen Sie uns Ihre Visionen in die Realität umsetzen.`,
      `Lassen Sie uns gemeinsam innovative Wege gehen und das volle Potenzial ausschöpfen.`,
      `Entdecken Sie die vielfältigen Möglichkeiten der Digitalisierung mit uns.`,
      `Unser Ziel ist es, langfristige Partnerschaften aufzubauen und nachhaltiges Wachstum zu generieren.`,
      `Wir begleiten Sie von der ersten Beratung bis zur finalen erfolgreichen Umsetzung.`,
    ];

    const paragraph2Sentences = [
      `Die kontinuierliche Optimierung und Weiterentwicklung unserer Standards stellt sicher, dass wir stets am Puls der Zeit agieren.`,
      `Dabei fließen aktuelle Trends aus den Bereichen UX/UI Design und Performance-Optimierung nahtlos in unsere Arbeit ein.`,
      `Wir betrachten digitale Produkte nicht als isolierte Projekte, sondern als lebendige Systeme.`,
      `Digitale Plattformen müssen sich an veränderte Marktbedingungen und Nutzerbedürfnisse anpassen.`,
      `Durch den Einsatz moderner Frameworks schaffen wir die technologische Grundlage für skalierbares Wachstum.`,
      `Ihre Zufriedenheit und der messbare Erfolg Ihrer Plattform sind für uns die wichtigsten Indikatoren.`,
      `Suchmaschinenmarketing und technische Exzellenz bilden das Fundament unserer Entwicklungsarbeit.`,
      `Wir sorgen dafür, dass Ihre digitalen Assets auch in Zukunft den höchsten Anforderungen entsprechen.`,
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
    ].join(' ');

    return { p1, p2 };
  }, [pathname, title, h1]);

  return (
    <div className="container mx-auto px-4 pb-16 pt-8 max-w-4xl opacity-50 hover:opacity-100 transition-opacity duration-300">
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-text-muted">
        <p className="text-justify leading-relaxed">{seoText.p1}</p>
        <p className="text-justify leading-relaxed mt-4">{seoText.p2}</p>
      </div>
    </div>
  );
};
