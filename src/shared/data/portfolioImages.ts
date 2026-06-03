/**
 * Portfolio project images mapping.
 * Maps project slugs to their corresponding mockup paths and alt-texts.
 */
export const portfolioImages: Record<string, { src: string; alt: string }> = {
  'saas-redesign': {
    src: '/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.webp',
    alt: 'SaaS Dashboard UI Redesign',
  },
  'luxury-brand': {
    src: '/images/hero/business-meeting-besprechung-team-konferenz.webp',
    alt: 'Luxury Brand 3D Web Experience',
  },
  'corporate-portal': {
    src: '/images/hero/geschaeftsfrau-smartphone-karte-location-pin-ihr-lokales-unternehmen-handwerker-kmu.webp',
    alt: 'Corporate Intranet Portal Interface',
  },
};

export const portfolioFallback = {
  src: '/images/portfolio/batherm-illustration.webp',
  alt: 'Website Mockup Fallback',
};
