import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Mock useTranslations to avoid i18n setup issues
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'de',
}));

import { SkipLink } from '@/shared/ui/SkipLink';

describe('SkipLink', () => {
  it('renders a skip link element with correct href', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a[href="#main-content"]');
    expect(link).not.toBeNull();
  });

  it('has German label when language is de', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.textContent).toBe('Zum Hauptinhalt springen');
  });

  it('has sr-only class for visual hiding', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link?.className).toContain('sr-only');
  });
});
