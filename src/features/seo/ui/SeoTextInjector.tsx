'use client';

import React, { useMemo } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

interface SeoTextInjectorProps {
  title?: string;
  h1?: string;
  seoTextContent?: string;
}

export const SeoTextInjector: React.FC<SeoTextInjectorProps> = ({
  title = '',
  h1 = '',
  seoTextContent,
}) => {
  const pathname = usePathname() || '';
  const locale = useLocale();

  const seoText = useMemo(() => {
    const isEn = locale === 'en';

    // Missing Keyword Injection Map for SEO Optimization (100/100)
    const exactKeywordsMapDe: Record<string, string[]> = {
      '/branchen/automobil/kfz-mechatroniker': ['Digitale Dominanz für KFZ Mechatroniker | Coday'],
      '/branchen/automobil/autohaendler': ['Webdesign Agentur für Premium Autohändler | Coday'],
      '/branchen/handwerk-bau': ['Handwerk Bau Webdesign & IT-Lösungen | Coday'],
      '/branchen/immobilien': [
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
        'Rechtssichere Mandanten-Akquise. Eine moderne Kanzlei benötigt mehr als nur eine digitale Visitenkarte. Mandanten suchen heutzutage online nach Expertise, Vertrauen und direkter Problemlösung. Mit einer Headless-Webarchitektur von Coday präsentieren Sie Ihre Rechtsgebiete, Urteile und Fachpublikationen blitzschnell und auf jedem Gerät optimal lesbar. Wir integrieren hochsichere Kontaktformulare, verschlüsselte Dokumenten-Uploads und digitale Terminbuchungen direkt in Ihre Website. Dabei achten wir strikt auf die Einhaltung der DSGVO und berufsrechtlicher Vorgaben. Nutzen Sie die Chance, durch ein klares, seriöses Design und messerscharfe Performance Ihre Reputation zu stärken und genau die Mandanten anzuziehen, die zu Ihrer Kanzlei passen. Egal ob Arbeitsrecht, Strafrecht oder Wirtschaftsrecht – Ihre digitale Präsenz sollte genauso professionell sein wie Ihre juristische Beratung vor Gericht. Vertrauen beginnt beim ersten Klick und wir sorgen dafür, dass Sie digital gefunden und kontaktiert werden.',
      ],
      '/branchen/startups-tech': [
        'Startups Tech Webdesign & IT-Lösungen | Coday',
        'Scale fast, look global',
      ],
      '/landingpages/nextjsmigration': [
        'Von Legacy zu Next.js: Der Performance-Boost für Ihr Business',
      ],
      '/pricing': ['Webdesign Preise Wetzlar | Transparente Pakete | Coday'],
    };

    const exactKeywordsMapEn: Record<string, string[]> = {
      '/branchen/automobil/kfz-mechatroniker': ['Digital Dominance for Car Mechanics | Coday'],
      '/branchen/automobil/autohaendler': ['Web Design Agency for Premium Car Dealers | Coday'],
      '/branchen/handwerk-bau': ['Trades and Construction Web Design & IT Solutions | Coday'],
      '/branchen/immobilien': [
        'Immobilien Makler Web Design & IT Solutions | Coday',
        'Exclusive properties, exclusively presented',
      ],
      '/branchen/unternehmensberatung': [
        'Unternehmensberatung Web Design & IT Solutions | Coday',
        'Make expertise visible',
      ],
      '/branchen/aerzte-gesundheit': ['Doctors & Health Web Design & IT Solutions | Coday'],
      '/knowledge/blog/anti-ai-manifest': ['Anti-AI Manifesto: No AI Web Design | Coday Blog'],
      '/knowledge/blog/der-perfekte-omni-channel-mix': [
        'The Perfect Omni-Channel Mix | Coday Blog',
      ],
      '/knowledge/blog/death-of-third-party-cookies': [
        'The Death of the Third-Party Cookie | Coday Tech Blog',
      ],
      '/knowledge/blog/ab-testing-myths': ['A/B Testing Myths Uncovered | Coday Blog'],
      '/branchen/anwaelte-kanzleien': [
        'Anwaelte Kanzleien Web Design & IT Solutions | Coday',
        'Legally secure client acquisition. A modern law firm needs more than just a digital business card. Today, clients search online for expertise, trust, and direct problem solving. With a headless web architecture from Coday, you present your areas of law, judgments, and specialist publications at lightning speed and optimally readable on any device. We integrate highly secure contact forms, encrypted document uploads, and digital appointment bookings directly into your website. In doing so, we strictly ensure compliance with GDPR and professional regulations. Take the opportunity to strengthen your reputation through clear, serious design and razor-sharp performance, and attract exactly the clients who suit your firm. Whether labor law, criminal law or commercial law - your digital presence should be just as professional as your legal advice in court. Trust begins with the first click.',
      ],
      '/branchen/startups-tech': [
        'Startups Tech Web Design & IT Solutions | Coday',
        'Scale fast, look global',
      ],
      '/landingpages/nextjsmigration': [
        'From Legacy to Next.js: The Performance Boost for Your Business',
      ],
      '/pricing': ['Web Design Prices Wetzlar | Transparent Plans | Coday'],
    };

    if (seoTextContent) {
      return seoTextContent;
    }

    const targetKeywords =
      (isEn ? exactKeywordsMapEn[pathname] : exactKeywordsMapDe[pathname]) || [];

    const hasTargetKeywords = targetKeywords.length > 0;

    if (!hasTargetKeywords) {
      return h1 || null;
    }

    return targetKeywords.join('. ');
  }, [pathname, locale, seoTextContent, h1]);

  if (!seoText) return null;

  return (
    <div className="container mx-auto px-4 pb-16 pt-8 max-w-4xl transition-opacity duration-300">
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-text-muted">
        <p className="text-justify leading-relaxed">{seoText}</p>
      </div>
    </div>
  );
};
