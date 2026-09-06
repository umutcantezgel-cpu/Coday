import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { OptimizedImageWithFallback } from '@/shared/ui/OptimizedImageWithFallback';

const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

describe('OptimizedImage (server-safe variant)', () => {
  it('renders an img with the default sizes attribute when none is given', () => {
    render(<OptimizedImage src="/images/test/hero.webp" alt="Hero image" />);

    const img = screen.getByRole('img', { name: 'Hero image' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('sizes', DEFAULT_SIZES);
  });

  it('passes an explicit sizes attribute through', () => {
    render(<OptimizedImage src="/images/test/hero.webp" alt="Hero image" sizes="100vw" />);

    expect(screen.getByRole('img', { name: 'Hero image' })).toHaveAttribute('sizes', '100vw');
  });

  it('keeps the image in place after a load error (no client-side fallback)', () => {
    render(<OptimizedImage src="/images/test/missing.webp" alt="Missing image" />);

    const img = screen.getByRole('img', { name: 'Missing image' });
    fireEvent.error(img);

    expect(screen.queryByText('Image N/A')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Missing image' })).toBeInTheDocument();
  });
});

describe('OptimizedImageWithFallback (client variant)', () => {
  it('renders the img with the default sizes attribute before any error', () => {
    render(<OptimizedImageWithFallback src="/images/test/remote.webp" alt="Remote image" />);

    expect(screen.getByRole('img', { name: 'Remote image' })).toHaveAttribute(
      'sizes',
      DEFAULT_SIZES
    );
  });

  it('shows the "Image N/A" placeholder after the image fails to load', () => {
    render(<OptimizedImageWithFallback src="/images/test/missing.webp" alt="Missing image" />);

    const img = screen.getByRole('img', { name: 'Missing image' });
    fireEvent.error(img);

    expect(screen.getByText('Image N/A')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Missing image' })).not.toBeInTheDocument();
  });
});
