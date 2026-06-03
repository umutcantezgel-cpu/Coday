import { generatePageMetadata } from '@/lib/metadata';
import { AiHubClient } from '@/features/ai/ui/AiHubClient';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools' });
  return {
    title: `${t('analyzer.hero.badge', { defaultValue: 'Website Analyzer' })} | Coday`,
    description: t('analyzer.hero.desc', { defaultValue: 'Kostenloser Website-Check: Performance, SEO, Sicherheit und Barrierefreiheit in unter 60 Sekunden.' }),
  };
}

export default function AiHubPage() {
  return <AiHubClient />;
}
