import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ConsultingClient } from '@/features/services/ui/ConsultingClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Digital Consulting',
      description: 'Strategic digital consulting to accelerate your business growth by Coday.',
      path: '/en/services/consulting',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Digital Consulting',
    description: 'Strategische Digitalberatung zur Beschleunigung Ihres Geschäftswachstums von Coday.',
    path: '/de/services/consulting',
    type: 'money',
  });
}

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ConsultingClient />;
}
