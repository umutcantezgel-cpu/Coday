/**
 * Industry-specific hero images mapping.
 * Maps industry slugs to their corresponding illustration paths and SEO alt-texts.
 */
export const industryHeroImages: Record<string, { src: string; alt: string }> = {
    'handwerk-bau': {
        src: '/images/industries/handwerker-hero.jpeg',
        alt: 'Handwerker in Arbeitskleidung mit professionellem Werkzeug im Einsatz'
    },
    'immobilien-makler': {
        src: '/images/industries/immobilien-hero.jpeg',
        alt: 'Architekt plant modernes Gebäude am CAD-System mit 3D-Modell'
    },
    'aerzte-gesundheit': {
        src: '/images/industries/aerzte-hero.jpeg',
        alt: 'Apothekerin im weißen Kittel berät Kunden am Bildschirm mit Medikamentenregalen'
    },
    'gastronomie-hotellerie': {
        src: '/images/industries/gastronomie-hero.jpeg',
        alt: 'Gastronom begrüßt herzlich Gäste am Restauranteingang mit Menütafel'
    },
    'ecommerce-retail': {
        src: '/images/industries/lokales-geschaeft-inhaber-schaufenster-laden.jpeg',
        alt: 'Lokaler Geschäftsinhaber vor seinem Schaufenster freut sich auf Kunden'
    },
    'anwaelte-kanzleien': {
        src: '/images/industries/anwaelte-hero.jpeg',
        alt: 'Professionelle Kanzlei-Beratung mit Dokumenten und Analysen'
    },
    'unternehmensberatung': {
        src: '/images/industries/finanzberatung-gespraech-planung-investition.jpeg',
        alt: 'Unternehmensberater im Kundengespräch mit Investitionsplanung'
    },
    'startups-tech': {
        src: '/images/industries/it-techniker.jpeg',
        alt: 'IT-Experte erklärt Netzwerk-Infrastruktur und Server-Lösungen'
    }
};

/**
 * Fallback image for industries without specific illustration.
 */
export const industryFallbackImage = {
    src: '/images/industries/altstadt-lokale-geschaefte-standort-regional-suche.jpeg',
    alt: 'Altstadt mit lokalen Geschäften und digitalem Standort-Pin'
};

/**
 * Gallery images for each industry.
 * Used to display a grid of relevant professions/activities within the industry.
 */
export const industryGalleryImages: Record<string, { src: string; alt: string }[]> = {
    'handwerk-bau': [
        { src: '/images/industries/dachdecker.jpeg', alt: 'Dachdecker bei der Arbeit auf einem Hausdach mit Tablet' },
        { src: '/images/industries/elektriker.jpeg', alt: 'Elektriker prüft Sicherungskasten mit modernem Messgerät' },
        { src: '/images/industries/maler.jpeg', alt: 'Maler streicht Wand in frischer Farbe' },
        { src: '/images/industries/tischler.jpeg', alt: 'Tischler bearbeitet Holz in der Werkstatt' },
        { src: '/images/industries/klimatechniker.jpeg', alt: 'Klimatechniker wartet Klimaanlage auf dem Dach' },
        { src: '/images/industries/gaertner.jpeg', alt: 'Gärtner pflegt Außenanlage eines Einfamilienhauses' },
        { src: '/images/industries/landschaftsgaertner.jpeg', alt: 'Landschaftsgärtner bei der Grünpflege' },
        { src: '/images/industries/pooltechniker.jpeg', alt: 'Pooltechniker prüft Wasserqualität' },
        { src: '/images/industries/kaminkehrer.jpeg', alt: 'Schornsteinfeger bei der Arbeit' }, // Fallback if exists? Removed from script, check path validity. Removed for safety.
        { src: '/images/industries/kfz.jpeg', alt: 'KFZ-Mechaniker in moderner Werkstatt mit Diagnose-Computer' },
        { src: '/images/industries/waschmaschine.jpeg', alt: 'Techniker repariert Haushaltsgerät vor Ort' }
    ],
    'ecommerce-retail': [
        { src: '/images/industries/baecker.jpeg', alt: 'Bäcker präsentiert frische Backwaren vor dem Laden' },
        { src: '/images/industries/florist-laden.jpeg', alt: 'Blick in einen modernen Blumenladen' },
        { src: '/images/industries/florist-arbeit.jpeg', alt: 'Floristin bindet einen frischen Blumenstrauß' },
        { src: '/images/industries/buchhandlung-raum.jpeg', alt: 'Gemütliche Buchhandlung mit Leseecke' },
        { src: '/images/industries/buchhandlung-kunde.jpeg', alt: 'Kunde stöbert in Büchern' },
        { src: '/images/industries/geschenk-verkaeuferin.jpeg', alt: 'Freundliche Verkäuferin in einer Geschenkboutique' },
        { src: '/images/industries/geschenk-laden.jpeg', alt: 'Sortiment einer stilvollen Boutique' },
        { src: '/images/industries/einzelhandel-general.jpeg', alt: 'Beratung im Einzelhandel' },
        // Adding generic local services here as they fit "Local Business" vibe
        { src: '/images/industries/friseur.jpeg', alt: 'Friseur bedient Kundin im modernen Salon' },
        { src: '/images/industries/hundesalon.jpeg', alt: 'Professionelle Tierpflege im Hundesalon' }
    ],
    'aerzte-gesundheit': [
        { src: '/images/industries/apotheke-tablet.jpeg', alt: 'Beratung in der Apotheke mit Tablet' },
        { src: '/images/industries/apotheke-kittel.jpeg', alt: 'Apothekerin erklärt Medikation' },
        // Add more health if available? currently only 2 specific ones.
    ],
    'gastronomie-hotellerie': [
        { src: '/images/industries/gastronom-schuerze-willkommen-restaurant-eingang-menuetafel-terrasse-gaeste.jpeg', alt: 'Einladender Eingangsbereich eines Restaurants' },
        { src: '/images/industries/baecker.jpeg', alt: 'Frische Backwaren für das Frühstücksbuffet' }, // Reusing baker
    ],
    'startups-tech': [
        { src: '/images/industries/it-techniker.jpeg', alt: 'IT-Infrastruktur und Server-Wartung' },
        { src: '/images/industries/it-beratung.jpeg', alt: 'Beratung zu Software und Hardware' },
    ],
    'unternehmensberatung': [
        { src: '/images/industries/buchhalterin.jpeg', alt: 'Detaillierte Finanzanalyse am Computer' },
        { src: '/images/industries/steuerberaterin.jpeg', alt: 'Steuerberatung und Aktenführung' },
    ],
    // Dienstleistungen (Service) / Miscellaneous
    'dienstleistung-service': [
        { src: '/images/industries/reinigung.jpeg', alt: 'Professionelle Gebäudereinigung' },
        { src: '/images/industries/fotograf.jpeg', alt: 'Fotograf im Studio-Setting' },
        { src: '/images/industries/fotostudio.jpeg', alt: 'Equipment in einem Fotostudio' },
        { src: '/images/industries/tanzstudio.jpeg', alt: 'Training im Tanzstudio' },
        { src: '/images/industries/tanzschule.jpeg', alt: 'Tanzkurs in Aktion' },
    ]
};
