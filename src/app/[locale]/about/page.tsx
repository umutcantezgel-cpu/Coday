import { setRequestLocale } from 'next-intl/server';
import { AboutClient } from '@/features/about/ui/AboutClient';
import { SeoHead } from '@/shared/ui/SeoHead';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  return (
    <>
      <SeoHead
        title="Über Uns | Coday - Digitale Exzellenz aus Wetzlar"
        description="Erfahren Sie mehr über Coday, unsere Mission und das Team aus Wetzlar, Hessen, das hinter unseren preisgekrönten digitalen Lösungen steht."
        pageType="about"
      />
      <AboutClient />
    </>
  );
}
