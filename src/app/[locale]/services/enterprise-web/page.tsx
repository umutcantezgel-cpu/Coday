import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EnterpriseWebClient } from '@/features/services/ui/EnterpriseWebClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Enterprise Web Solutions',
      description: 'Scalable and secure web solutions for large enterprises by Coday.',
      path: '/en/services/enterprise-web',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Enterprise Web-Lösungen',
    description: 'Skalierbare und sichere Web-Lösungen für Großunternehmen von Coday.',
    path: '/de/services/enterprise-web',
    type: 'money',
  });
}

export default async function EnterpriseWebPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EnterpriseWebClient />;
}
