import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { DesignSystemsClient } from '@/features/services/ui/DesignSystemsClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Design Systems Wetzlar | Consistent Components',
      description:
        'Consistent design systems and reusable components by Coday in Wetzlar. Scalable UI libraries for businesses in Hesse. Get in touch to get started.',
      path: '/en/services/design/design-systems',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Design Systems Wetzlar | Konsistente Komponenten',
    description:
      'Konsistente Design Systeme und wiederverwendbare Komponenten von Coday in Wetzlar. Skalierbare UI-Bibliotheken für Unternehmen in Hessen. Anfragen.',
    path: '/de/services/design/design-systems',
    type: 'money',
  });
}

export default async function DesignSystemsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DesignSystemsClient />;
}
