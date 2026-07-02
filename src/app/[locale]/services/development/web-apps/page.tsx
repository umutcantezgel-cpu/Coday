import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebAppsClient } from '@/features/services/ui/WebAppsClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web App Development Wetzlar | Portals & Tools',
      description:
        'Custom web app development and portals by Coday in Wetzlar. Tailored solutions for businesses in Central Hesse. Start your project with us today.',
      path: '/en/services/development/web-apps',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Web-App Entwicklung Wetzlar | Portale & Tools',
    description:
      'Individuelle Web-App Entwicklung und Portale von Coday in Wetzlar. Maßgeschneiderte Lösungen für Unternehmen in Mittelhessen. Jetzt Projekt starten.',
    path: '/de/services/development/web-apps',
    type: 'money',
  });
}

export default async function WebAppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WebAppsClient />;
}
