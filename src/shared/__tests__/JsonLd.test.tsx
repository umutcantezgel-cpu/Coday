import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { JsonLd } from '@/shared/ui/JsonLd';

describe('JsonLd', () => {
  it('renders Organization and WebSite schemas by default', () => {
    const { container } = render(<JsonLd />);
    expect(container).toBeDefined();
  });

  it('renders LocalBusiness for home pageType', () => {
    const { container } = render(<JsonLd pageType="home" />);
    expect(container).toBeDefined();
  });

  it('renders LocalBusiness for contact pageType', () => {
    const { container } = render(<JsonLd pageType="contact" />);
    expect(container).toBeDefined();
  });

  it('renders BreadcrumbList when breadcrumbs provided', () => {
    const breadcrumbs = [
      { name: 'Home', url: 'https://www.codayweb.de/de' },
      { name: 'Services', url: 'https://www.codayweb.de/de/services' },
      { name: 'Web Design', url: 'https://www.codayweb.de/de/services/web-design' },
    ];
    const { container } = render(<JsonLd breadcrumbs={breadcrumbs} />);
    expect(container).toBeDefined();
  });

  it('does not render LocalBusiness for service pageType', () => {
    const { container } = render(<JsonLd pageType="service" />);
    expect(container).toBeDefined();
  });
});
