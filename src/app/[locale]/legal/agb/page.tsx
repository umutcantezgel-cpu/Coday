import { generatePageMetadata } from '@/lib/metadata';
import { AgbClient } from '@/features/legal/ui/AgbClient';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'legal' });
  return {
    title: `${t('terms.title', { defaultValue: 'AGB' })} | Coday`,
    description: t('terms.desc', { defaultValue: 'Allgemeine Geschäftsbedingungen der Coday Webagentur.' }),
  };
}

export default function AgbPage() {
  return <AgbClient />;
}
