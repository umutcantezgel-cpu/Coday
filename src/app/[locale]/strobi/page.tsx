import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { StrobiWorldClient } from '@/features/strobi-world';
import { generateAlternates } from '@/lib/metadata';
import {
  BASE_URL,
  getWebApplicationSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
} from '@/lib/schema';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  const title = isEn
    ? 'Strobi Mii World | AI Avatar & 3D · Coday'
    : 'Strobi Mii World | KI-Avatar & 3D · Coday';

  const description = isEn
    ? 'Experience Strobi as an interactive AI avatar: pet, toss, play 60 FPS minigames and chat in real-time. Built by Coday.'
    : 'Strobi als lebendigen KI-Avatar erleben: Kraulen, werfen, Minispiele spielen und in Echtzeit chatten. Entwickelt von Coday.';

  return {
    title,
    description,
    alternates: generateAlternates(`/${locale}/strobi`),
    openGraph: {
      title,
      description,
      url: `https://www.codayweb.de/${locale}/strobi`,
      siteName: 'Coday',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.codayweb.de/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Coday Webdesign Agentur Wetzlar',
        },
      ],
    },
  };
}

export default async function StrobiWorldPage({ params }: PageProps) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const pageUrl = `${BASE_URL}/${locale}/strobi`;
  const pageTitle = isEn
    ? 'Strobi Mii World | AI Avatar & 3D · Coday'
    : 'Strobi Mii World | KI-Avatar & 3D · Coday';
  const pageDescription = isEn
    ? 'Experience Strobi as an interactive AI avatar: pet, toss, play 60 FPS minigames and chat in real-time. Built by Coday.'
    : 'Strobi als lebendigen KI-Avatar erleben: Kraulen, werfen, Minispiele spielen und in Echtzeit chatten. Entwickelt von Coday.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getBreadcrumbSchema(
        [
          { name: isEn ? 'Home' : 'Startseite', url: `/${locale}` },
          { name: 'Strobi Mii World', url: `/${locale}/strobi` },
        ],
        pageUrl
      ),
      getWebPageSchema({
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        locale,
        mainEntityId: `${pageUrl}#webapp`,
      }),
      getWebApplicationSchema(
        {
          name: 'Strobi Mii World',
          description: isEn
            ? 'Interactive AI avatar with 60 FPS vector physics, minigames and real-time chat, built with Next.js by Coday.'
            : 'Interaktiver KI-Avatar mit 60-FPS-Vektorphysik, Minispielen und Echtzeit-Chat, entwickelt mit Next.js von Coday.',
          url: pageUrl,
          applicationCategory: 'EntertainmentApplication',
        },
        locale
      ),
    ],
  };

  return (
    <>
      <script
        id="schema-strobi"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="min-h-[40vh] bg-background-light py-12 px-4 max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
              Strobi Mii World
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {isEn
                ? 'Interactive AI avatar with vector physics and real-time animation.'
                : 'Interaktiver KI-Avatar mit Vektorphysik und Echtzeit-Animation.'}
            </p>
          </div>
        }
      >
        <StrobiWorldClient />
      </Suspense>

      {/* SSR-Rendered Semantic Content Section for Crawlers & Accessibility */}
      <section className="bg-white border-t border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10 text-slate-700">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4">
              {isEn
                ? 'High-Performance 3D & AI Web Engineering'
                : 'High-Performance 3D- & KI-Webentwicklung in der Praxis'}
            </h2>
            <p className="leading-relaxed text-base">
              {isEn
                ? 'Strobi Mii World demonstrates how modern browser technologies can be leveraged for interactive user engagement without sacrificing Core Web Vitals. Combining Next.js 15, native HTML5 Canvas physics, and zero-latency Web Audio API synthesis, Strobi runs at a consistent 60 frames per second on mobile and desktop devices alike.'
                : 'Strobi Mii World demonstriert, wie moderne Webtechnologien für immersive Nutzererlebnisse eingesetzt werden können, ohne die Core Web Vitals zu belasten. Durch die Kombination aus Next.js 15, nativer HTML5-Canvas-Vektorphysik und echtzeitbasierter Web-Audio-Synthese läuft Strobi mit konstanten 60 Bildern pro Sekunde – sowohl auf mobilen Endgeräten als auch auf High-End-Desktop-Systemen.'}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
              {isEn
                ? 'Gamification & User Engagement for Modern Brands'
                : 'Gamification & Nutzerbindung für moderne Marken'}
            </h3>
            <p className="leading-relaxed text-base">
              {isEn
                ? 'Interactive 3D avatars and playful micro-interactions significantly increase time-on-site and user recall. Rather than relying on heavy third-party 3D frameworks that bloat JavaScript bundles by several megabytes, Coday engineers custom lightweight rendering pipelines that deliver instantaneous interactivity.'
                : 'Interaktive Avatare und spielerische Mikro-Interaktionen steigern die Verweildauer auf der Website nachweislich und verankern Marken nachhaltig im Gedächtnis der Besucher. Statt auf schwere 3D-Frameworks von Drittanbietern zu setzen, die JavaScript-Bundles um mehrere Megabyte aufblähen, entwickelt Coday maßgeschneiderte, extrem schlanke Rendering-Pipelines für blitzschnelle Ladezeiten.'}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
              {isEn
                ? 'Sub-Second Loading & Strict Privacy Standards'
                : 'Ladezeiten unter 0,3s & Strikter Datenschutz'}
            </h3>
            <p className="leading-relaxed text-base">
              {isEn
                ? 'All audio synthesis and physics calculations occur directly within the client browser. No user tracking cookies, external font requests, or third-party tracking scripts are executed, guaranteeing 100% GDPR (DSGVO) compliance alongside sub-0.3s initial response times.'
                : 'Sämtliche Audio-Synthesen und physikalischen Berechnungen erfolgen lokal direkt im Browser des Nutzers. Es werden keinerlei Tracking-Cookies gesetzt, keine externen Schriftarten nachgeladen und keine Drittanbieter-Skripte ausgeführt. Das garantiert absolute DSGVO-Konformität bei Ladezeiten von unter 0,3 Sekunden.'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
