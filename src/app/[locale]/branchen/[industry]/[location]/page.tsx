import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { industriesData } from '@/shared/data/industries';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, industry: string, location: string }> }): Promise<Metadata> {
  const { locale, industry, location } = await params;
  
  const industryData = industriesData[industry];
  if (!industryData) return notFound();

  try {
    const fileName = `${industry}-${location}.json`;
    const filePath = path.join(process.cwd(), 'src', 'features', 'local-seo', 'model', 'content', fileName);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const content = JSON.parse(fileContents);
      return generatePageMetadata({
        title: content.meta.title,
        description: content.meta.description,
        path: `/${locale}/branchen/${industry}/${location}`,
        type: 'money',
      });
    }
  } catch (e) {
    // Ignore error, fallback
  }
  
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
  const { locale, industry, location } = await params;
  setRequestLocale(locale);

  let localContent = null;
  let cityData = null;
  try {
    const fileName = `${industry}-${location}.json`;
    const filePath = path.join(process.cwd(), 'src', 'features', 'local-seo', 'model', 'content', fileName);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      localContent = JSON.parse(fileContents);
      cityData = getCityBySlug(location);
    }
  } catch (e) {
    // Fallback to IndustryDetailClient
  }

  if (localContent) {
    return <LocalSeoTemplate content={localContent} cityData={cityData} />;
  }

  return <IndustryDetailClient />;
}
