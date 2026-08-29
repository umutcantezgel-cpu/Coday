interface SchemaProps {
  industry: string;
  industryWikiUrl?: string;
  location: string;
  locationWikiUrl?: string;
  _competitorAverageLcp: number;
}

export function generateAdvancedJsonLd({
  industry,
  industryWikiUrl,
  location,
  locationWikiUrl,
  _competitorAverageLcp,
}: SchemaProps) {
  const defaultWikiIndustry = 'https://www.wikidata.org/wiki/Q196144'; // Webdesign als fallback
  const defaultWikiLocation = 'https://www.wikidata.org/wiki/Q3874'; // Wetzlar als fallback

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://www.codayweb.de/branchen/${industry.toLowerCase()}/${location.toLowerCase()}#webpage`,
        url: `https://www.codayweb.de/branchen/${industry.toLowerCase()}/${location.toLowerCase()}`,
        name: `Webentwicklung & App-Lösungen für ${industry} in ${location} | Coday`,
        description: `Enterprise Webentwicklung für ${industry} in ${location} und Umgebung. Meisterliche Software-Qualität und GEO-Optimierung für maximale lokale Dominanz.`,
        inLanguage: 'de-DE',
        about: {
          '@type': 'LocalBusiness',
          '@id': 'https://www.codayweb.de/#local-business',
          name: 'Coday',
          image: 'https://www.codayweb.de/icon.png',
          url: 'https://www.codayweb.de',
          telephone: '+49-176-41195301',
          email: 'umut@codayweb.de',
          priceRange: '€€€',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Lessingstraße 4',
            addressLocality: 'Wetzlar',
            postalCode: '35578',
            addressRegion: 'Hessen',
            addressCountry: 'DE',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 50.5558,
            longitude: 8.5022,
          },
          sameAs: [
            'https://www.provenexpert.com/de-de/coday-webagentur/',
            'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
            'https://www.wikidata.org/wiki/Q3874',
            'https://www.linkedin.com/in/umutcan-tezgel',
          ],
        },
        mentions: [
          {
            '@type': 'Thing',
            name: location,
            sameAs: locationWikiUrl || defaultWikiLocation,
          },
          {
            '@type': 'Thing',
            name: industry,
            sameAs: industryWikiUrl || defaultWikiIndustry,
          },
        ],
        author: {
          '@type': 'Person',
          '@id': 'https://www.codayweb.de/#founder',
          name: 'Umutcan Emre Tezgel',
          jobTitle: 'Founder & Lead Developer',
          sameAs: ['https://www.linkedin.com/in/umutcan-tezgel'],
          worksFor: {
            '@id': 'https://www.codayweb.de/#organization',
          },
        },
      },
      {
        '@type': 'Dataset',
        '@id': `https://www.codayweb.de/branchen/${industry.toLowerCase()}/${location.toLowerCase()}#dataset-${location.toLowerCase()}`,
        name: `Web-Performance-Index für ${industry} in ${location}`,
        description: `Vergleichende Ladezeit-Benchmarks (LCP/INP) für digitale Plattformen von ${industry} im Wirtschaftsraum ${location}.`,
        creator: {
          '@id': 'https://www.codayweb.de/#organization',
        },
        variableMeasured: [
          {
            '@type': 'PropertyValue',
            name: 'Largest Contentful Paint (LCP)',
            description: 'Dauer bis zum Laden des Hauptinhalts in Sekunden.',
          },
        ],
        measurementTechnique: 'Real User Monitoring & Lab Data Simulation',
        temporalCoverage: '2026',
        spatialCoverage: {
          '@type': 'Place',
          name: location,
          sameAs: locationWikiUrl || defaultWikiLocation,
        },
      },
    ],
  };
}
