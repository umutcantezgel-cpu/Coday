import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ConsultingClient } from '@/features/services/ui/ConsultingClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Digital Consulting & Web Strategy | Wetzlar',
      description:
        'Strategic digital consulting by Coday in Wetzlar. We guide businesses in Central Hesse through their digital transformation. Book your appointment.',
      path: '/en/services/consulting',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Digitale Beratung & Webstrategie | Wetzlar',
    description:
      'Strategische Digitalberatung von Coday in Wetzlar. Wir begleiten Unternehmen in Mittelhessen bei der digitalen Transformation. Jetzt Termin buchen.',
    path: '/de/services/consulting',
    type: 'money',
  });
}

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ConsultingClient />;
}
