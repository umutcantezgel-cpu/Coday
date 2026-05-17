import React from 'react';
import { useParams } from 'react-router';
import { getCityBySlug, cities } from '@/features/local-seo/model/cities';
import { CityHero } from '@/features/local-seo/ui/CityHero';
import { DistanceIndicator } from '@/features/local-seo/ui/DistanceIndicator';
import { RegionalSectors } from '@/features/local-seo/ui/RegionalSectors';
import { NearbyCities } from '@/features/local-seo/ui/NearbyCities';
import { LocalSchemaBuilder } from '@/features/local-seo/ui/LocalSchemaBuilder';
import { SeoHead } from '@/shared/ui/SeoHead';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';

export async function loader({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);
  if (!city) {
    throw new Response('Not Found', { status: 404 });
  }
  return { city };
}

export function meta({ data }: { data: { city: ReturnType<typeof getCityBySlug> } }) {
  if (!data?.city) return [{ title: '404 - Stadt nicht gefunden' }];

  return [
    { title: `Webagentur für ${data.city.displayName} | Coday - Digitale Dominanz` },
    {
      name: 'description',
      content: `Coday transformiert Unternehmen aus ${data.city.displayName} in digitale Marktführer. Premium Webdesign, SEO & B2B-Plattformen für das Handwerk und Industrie in der Region ${data.city.proximityCluster}.`,
    },
  ];
}

export async function prerender() {
  return cities.map((c) => `/webagentur-${c.slug}`);
}

export default function CityPage() {
  const { city } = useParams();
  const cityData = getCityBySlug(city || '');

  if (!cityData) {
    return <div>Stadt nicht gefunden</div>;
  }

  return (
    <div className="bg-secondary min-h-dvh">
      <SeoHead
        title={`Webagentur für ${cityData.displayName} | Coday - Digitale Dominanz`}
        description={`Coday transformiert Unternehmen aus ${cityData.displayName} in digitale Marktführer. Premium Webdesign, SEO & B2B-Plattformen für das Handwerk und Industrie in der Region ${cityData.proximityCluster}.`}
      />
      <LocalSchemaBuilder city={cityData} />

      <CityHero city={cityData} />

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <DistanceIndicator city={cityData} />
      </div>

      <RegionalSectors city={cityData} />

      <RelevantFAQs serviceId={['general', 'seo']} />

      <NearbyCities currentSlug={cityData.slug} />

      <GlobalCTA />
    </div>
  );
}
