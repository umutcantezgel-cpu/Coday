import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Schema.org JSON-LD structured data for Coday.
 * Renders Organization, WebSite (with SearchAction), and optional LocalBusiness + BreadcrumbList.
 */

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface JsonLdProps {
    /** Current page URL (full, with lang prefix) */
    pageUrl?: string;
    /** Optional breadcrumb trail */
    breadcrumbs?: BreadcrumbItem[];
    /** Page type — used to select which schemas to include */
    pageType?: 'home' | 'service' | 'contact' | 'article' | 'default';
}

const BASE_URL = 'https://www.codayweb.de';

const ORGANIZATION_SCHEMA = {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Coday',
    url: BASE_URL,
    logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`,
    },
    sameAs: [
        'https://www.linkedin.com/company/coday',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['de', 'en'],
    },
};

const WEBSITE_SCHEMA = {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Coday',
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: ['de-DE', 'en-US'],
};

const LOCAL_BUSINESS_SCHEMA = {
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Coday',
    url: BASE_URL,
    image: `${BASE_URL}/favicon.svg`,
    priceRange: '€€',
    areaServed: {
        '@type': 'Country',
        name: 'Germany',
    },
    serviceType: [
        'Web Development',
        'Web Design',
        'SEO',
        'Digital Marketing',
        'Branding',
    ],
};

function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export const JsonLd: React.FC<JsonLdProps> = ({
    breadcrumbs,
    pageType = 'default',
}) => {
    const graph: Record<string, unknown>[] = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA];

    if (pageType === 'home' || pageType === 'contact') {
        graph.push(LOCAL_BUSINESS_SCHEMA);
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
        graph.push(buildBreadcrumbSchema(breadcrumbs));
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': graph,
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
    );
};
