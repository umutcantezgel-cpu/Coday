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
    ? 'Strobi Mii World — Interactive AI Avatar & 3D Playfield | Coday'
    : 'Strobi Mii World — Interaktiver KI-Avatar & 3D-Spielfeld | Coday';

  const description = isEn
    ? 'Experience Strobi as a living, physical Mii AI avatar: Pet, toss, scale to Titan Boss mode, chat, and play 60 FPS minigames.'
    : 'Erleben Sie Strobi als lebendigen Mii-Avatar: Kraulen, werfen, vergrößern, Minispiele spielen und in Echtzeit chatten.';

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
      // This route hand-rolls its metadata rather than going through
      // generatePageMetadata, which is why it was the only page on the site
      // shipping no og:image.
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
    ? 'Strobi Mii World — Interactive AI Avatar & 3D Playfield | Coday'
    : 'Strobi Mii World — Interaktiver KI-Avatar & 3D-Spielfeld | Coday';
  const pageDescription = isEn
    ? 'Experience Strobi as a living, physical Mii AI avatar: Pet, toss, scale to Titan Boss mode, chat, and play 60 FPS minigames.'
    : 'Erleben Sie Strobi als lebendigen Mii-Avatar: Kraulen, werfen, vergrößern, Minispiele spielen und in Echtzeit chatten.';

  // Was the only JSON-LD-emitting route without a BreadcrumbList — an island in
  // the graph. The WebApplication now also declares isPartOf the WebSite.
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
      <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
        <StrobiWorldClient />
      </Suspense>
    </>
  );
}
