import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { CareerOverviewClient } from '@/features/career/ui/CareerOverviewClient';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Karriere bei Coday',
    description: 'Karrieremöglichkeiten bei Coday.',
    path: '/de/career',
    type: 'noindex',
  });
}

export default function CareerPage() {
  return <CareerOverviewClient />;
}
