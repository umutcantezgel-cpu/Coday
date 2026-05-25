import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { industriesData } from '@/shared/data/industries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, industry: string, location: string }> }): Promise<Metadata> {
  const { locale, industry, location } = await params;
  
  const industryData = industriesData[industry];
  if (!industryData) return notFound();
  
  const formattedIndustry = industry.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const title = locale === 'en' 
    ? `${formattedIndustry} Web Design ${location !== 'allgemein' ? `in ${location.charAt(0).toUpperCase() + location.slice(1)}` : ''}`
    : `${formattedIndustry} Webdesign ${location !== 'allgemein' ? `in ${location.charAt(0).toUpperCase() + location.slice(1)}` : ''}`;
    
  return generatePageMetadata({
    title,
    description: locale === 'en' ? `Digital solutions for ${formattedIndustry}.` : `Digitale Lösungen für ${formattedIndustry}.`,
    path: `/${locale}/branchen/${industry}/${location}`,
    type: 'money',
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ locale: string, industry: string, location: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <IndustryDetailClient />;
}
