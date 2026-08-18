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
        '@id': `https://coday.de/branchen-hub/${industry.toLowerCase()}/${location.toLowerCase()}#webpage`,
        url: `https://coday.de/branchen-hub/${industry.toLowerCase()}/${location.toLowerCase()}`,
        name: `Webentwicklung & App-Lösungen für ${industry} in ${location} | Coday`,
        description: `Enterprise Webentwicklung für ${industry} in ${location} und Umgebung. Meisterliche Software-Qualität und GEO-Optimierung für maximale lokale Dominanz.`,
        inLanguage: 'de-DE',
        about: {
          '@type': 'LocalBusiness',
          '@id': 'https://coday.de/#localbusiness',
          name: 'Coday',
          image: 'https://coday.de/assets/coday-logo.png',
          url: 'https://coday.de',
          telephone: '+4964410000000',
          priceRange: '$$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Hauser Gasse 2',
            addressLocality: 'Wetzlar',
            postalCode: '35578',
            addressCountry: 'DE',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 50.5583,
            longitude: 8.5014,
          },
          sameAs: [
            'https://www.provenexpert.com/de-de/coday-webagentur/',
            'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
            'https://www.wikidata.org/wiki/Q3874',
            'https://www.linkedin.com/company/codayweb',
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
          '@id': 'https://coday.de/ueber-uns#founder',
          name: 'Umut Cantezgel',
          jobTitle: 'Handwerksmeister & CEO',
          honorificPrefix: 'Meister',
          sameAs: [
            'https://www.linkedin.com/company/codayweb',
            'https://www.linkedin.com/in/umut-cantezgel', // Zwingend für RAG-Bots zur Autoritäts-Verknüpfung
          ],
          worksFor: {
            '@id': 'https://coday.de/#localbusiness',
          },
          alumniOf: {
            '@type': 'Organization',
            name: 'Handwerkskammer Wiesbaden',
            sameAs: 'https://www.wikidata.org/wiki/Q1576204',
          },
        },
      },
      {
        '@type': 'Dataset',
        '@id': `https://coday.de/branchen-hub/${industry.toLowerCase()}/${location.toLowerCase()}#dataset-${location.toLowerCase()}`, // Eindeutige ID verhindert Kollaps bei 1100 Datensätzen
        name: `Web-Performance-Index für ${industry} in ${location}`,
        description: `Vergleichende Ladezeit-Benchmarks (LCP/INP) für digitale Plattformen von ${industry} im Wirtschaftsraum ${location}.`,
        creator: {
          '@id': 'https://coday.de/#localbusiness',
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
