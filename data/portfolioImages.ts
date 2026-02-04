/**
 * Portfolio project images mapping.
 * Maps project slugs to their corresponding mockup paths and alt-texts.
 */
export const portfolioImages: Record<string, { src: string; alt: string }> = {
    'fintech-platform': {
        src: '/images/portfolio/mockup-website-anwaltskanzlei-kompetenzen-unternehmensrecht-familienrecht-team.jpeg',
        alt: 'FinTech Platform Dashboard Mockup'
    },
    'fashion-commerce': {
        src: '/images/portfolio/mockup-website-restaurant-speisekarte-vorspeisen-hauptgerichte-desserts-responsive.jpeg',
        alt: 'Fashion Commerce Storefront Mockup'
    },
    'saas-redesign': {
        src: '/images/portfolio/mockup-website-fitnessstudio-kursplan-yoga-preise-einzelstunde-abo-responsive.jpeg',
        alt: 'SaaS Dashboard UI Redesign'
    },
    'luxury-brand': {
        src: '/images/portfolio/mockup-website-fotograf-portfolio-hochzeit-portrait-business-event-galerie.jpeg',
        alt: 'Luxury Brand 3D Web Experience'
    },
    'corporate-portal': {
        src: '/images/portfolio/mockup-website-immobilienagentur-real-estate-listings-preise-berlin.jpeg',
        alt: 'Corporate Intranet Portal Interface'
    }
};

export const portfolioFallback = {
    src: '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive.jpeg',
    alt: 'Website Mockup Fallback'
};
