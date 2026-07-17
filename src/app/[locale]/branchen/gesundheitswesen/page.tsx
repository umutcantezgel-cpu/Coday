import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { permanentRedirect } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Doctors & Clinics | Agency Hesse',
      description:
        'Professional practice websites for Doctors and Clinics by Agency Hesse. Attract patients through modern web design and local SEO. Inquire today!',
      path: '/en/branchen/gesundheitswesen',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Ärzte & Praxen | Healthcare Marketing',
    description:
      'Professionelle Praxis-Webseiten für Ärzte und Kliniken. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen!',
    path: '/de/branchen/gesundheitswesen',
    type: 'default',
  });
}

export default async function GesundheitswesenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/branchen/aerzte-gesundheit`);
}
