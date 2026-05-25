import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDesignClient } from '@/features/services/ui/WebDesignClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Services',
      description: 'Premium UI/UX design. High conversion rates and beautiful aesthetics by Coday.',
      path: '/en/services/web-design',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Services',
    description: 'Premium UI/UX Design. Hohe Konversionsraten und herausragende Ästhetik von Coday.',
    path: '/de/services/web-design',
    type: 'money',
  });
}

export default async function WebDesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WebDesignClient />;
}
