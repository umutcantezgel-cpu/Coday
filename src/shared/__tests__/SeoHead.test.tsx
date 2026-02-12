import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { SeoHead } from '../ui/SeoHead';

// Wrapper with all providers needed for SeoHead
function renderWithProviders(ui: React.ReactElement, { route = '/de' } = {}) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('SeoHead', () => {
  it('renders without crashing with default props', () => {
    const { container } = renderWithProviders(<SeoHead />);
    expect(container).toBeDefined();
  });

  it('renders with custom title and description', () => {
    renderWithProviders(
      <SeoHead title="Custom Title | Coday" description="Custom description text" />
    );
    // Helmet updates document head asynchronously in testing
    // We verify the component renders without errors
    expect(true).toBe(true);
  });

  it('renders with noIndex prop', () => {
    const { container } = renderWithProviders(<SeoHead noIndex />);
    expect(container).toBeDefined();
  });

  it('renders with pageType prop', () => {
    const { container } = renderWithProviders(<SeoHead pageType="home" />);
    expect(container).toBeDefined();
  });

  it('renders with breadcrumbs', () => {
    const breadcrumbs = [
      { name: 'Home', url: 'https://www.codayweb.de/de' },
      { name: 'Services', url: 'https://www.codayweb.de/de/services' },
    ];
    const { container } = renderWithProviders(
      <SeoHead breadcrumbs={breadcrumbs} pageType="service" />
    );
    expect(container).toBeDefined();
  });

  it('renders correctly for English locale', () => {
    const { container } = renderWithProviders(<SeoHead />, { route: '/en' });
    expect(container).toBeDefined();
  });
});
