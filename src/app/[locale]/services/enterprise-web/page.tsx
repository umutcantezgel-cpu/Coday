import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EnterpriseWebClient } from '@/features/services/ui/EnterpriseWebClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Enterprise Web Development Wetzlar | Scalable',
      description:
        'Scalable and secure enterprise web solutions by Coday in Wetzlar. Portals, intranets and complex web applications for businesses in Hesse. Inquire.',
      path: '/en/services/enterprise-web',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Enterprise Webentwicklung Wetzlar | Skalierbar',
    description:
      'Skalierbare und sichere Enterprise Web-Lösungen von Coday in Wetzlar. Portale, Intranets und Webanwendungen für Unternehmen in Hessen. Jetzt anfragen.',
    path: '/de/services/enterprise-web',
    type: 'money',
  });
}

export default async function EnterpriseWebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EnterpriseWebClient />;
}
