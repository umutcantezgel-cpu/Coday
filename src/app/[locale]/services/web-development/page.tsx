import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDevelopmentClient } from '@/features/services/ui/WebDevelopmentClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Development Services',
      description: 'Custom React & Next.js web applications. High performance and modern architecture by Coday.',
      path: '/en/services/web-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webentwicklung Services',
    description: 'Maßgeschneiderte React & Next.js Webanwendungen. High-Performance und moderne Architektur von Coday.',
    path: '/de/services/web-development',
    type: 'money',
  });
}

export default async function WebDevelopmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WebDevelopmentClient />;
}
