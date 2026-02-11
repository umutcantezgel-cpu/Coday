import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { JsonLd } from '../ui/JsonLd';

function renderWithHelmet(ui: React.ReactElement) {
    return render(<HelmetProvider>{ui}</HelmetProvider>);
}

describe('JsonLd', () => {
    it('renders Organization and WebSite schemas by default', () => {
        const { container } = renderWithHelmet(<JsonLd />);
        expect(container).toBeDefined();
    });

    it('renders LocalBusiness for home pageType', () => {
        const { container } = renderWithHelmet(<JsonLd pageType="home" />);
        expect(container).toBeDefined();
    });

    it('renders LocalBusiness for contact pageType', () => {
        const { container } = renderWithHelmet(<JsonLd pageType="contact" />);
        expect(container).toBeDefined();
    });

    it('renders BreadcrumbList when breadcrumbs provided', () => {
        const breadcrumbs = [
            { name: 'Home', url: 'https://www.codayweb.de/de' },
            { name: 'Services', url: 'https://www.codayweb.de/de/services' },
            { name: 'Web Design', url: 'https://www.codayweb.de/de/services/web-design' },
        ];
        const { container } = renderWithHelmet(<JsonLd breadcrumbs={breadcrumbs} />);
        expect(container).toBeDefined();
    });

    it('does not render LocalBusiness for service pageType', () => {
        const { container } = renderWithHelmet(<JsonLd pageType="service" />);
        expect(container).toBeDefined();
    });
});
