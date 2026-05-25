import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { UxAuditClient } from '@/features/services/ui/UxAuditClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'UX Audit',
    description: 'Professional UX Auditing Services.',
    path: `/${locale}/services/design/ux-audit`,
    type: 'money',
  });
}

export default async function UxAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <UxAuditClient />;
}
