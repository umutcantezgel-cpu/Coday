import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { StrobiWorldClient } from '@/features/strobi-world';
import { generateAlternates } from '@/lib/metadata';

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
    },
  };
}

export default function StrobiWorldPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <StrobiWorldClient />
    </Suspense>
  );
}
