import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { PerformanceClient } from '@/features/services/ui/PerformanceClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Performance Optimization',
      description: 'Maximize your website speed. Core Web Vitals optimization by Coday.',
      path: '/en/services/performance',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Web Performance Optimierung',
    description: 'Maximieren Sie Ihre Website-Geschwindigkeit. Core Web Vitals Optimierung von Coday.',
    path: '/de/services/performance',
    type: 'money',
  });
}

export default async function PerformancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PerformanceClient />;
}
