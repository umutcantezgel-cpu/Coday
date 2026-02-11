/**
 * Portfolio project images mapping.
 * Maps project slugs to their corresponding mockup paths and alt-texts.
 */
export const portfolioImages: Record<string, { src: string; alt: string }> = {


    'saas-redesign': {
        src: '/images/portfolio/mockup-website-fitnessstudio-kursplan-yoga-preise-einzelstunde-abo-responsive.webp',
        alt: 'SaaS Dashboard UI Redesign'
    },
    'luxury-brand': {
        src: '/images/portfolio/mockup-website-fotograf-portfolio-hochzeit-portrait-business-event-galerie.webp',
        alt: 'Luxury Brand 3D Web Experience'
    },
    'corporate-portal': {
        src: '/images/portfolio/mockup-website-immobilienagentur-real-estate-listings-preise-berlin.webp',
        alt: 'Corporate Intranet Portal Interface'
    }
};

export const portfolioFallback = {
    src: '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive.webp',
    alt: 'Website Mockup Fallback'
};
