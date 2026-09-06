import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { ReviewFilter } from '@/widgets/home/ReviewFilter';
import { TestimonialsSection } from '@/widgets/home/TestimonialsSection';

const labels = {
  all: 'Alle Bewertungen (8)',
  google: 'Google Maps (4)',
  provenexpert: 'ProvenExpert (4)',
};

function renderFilter() {
  return render(
    <ReviewFilter labels={labels}>
      <div data-testid="grid" />
    </ReviewFilter>
  );
}

function getWrapper(container: HTMLElement): HTMLElement {
  const wrapper = container.querySelector<HTMLElement>('[data-review-filter]');
  if (!wrapper) throw new Error('data-review-filter wrapper not rendered');
  return wrapper;
}

describe('ReviewFilter', () => {
  it('shows all reviews by default and wraps the grid', () => {
    const { container } = renderFilter();
    const wrapper = getWrapper(container);

    expect(wrapper).toHaveAttribute('data-review-filter', 'all');
    expect(wrapper).toContainElement(screen.getByTestId('grid'));
    expect(screen.getByRole('button', { name: 'Alle Bewertungen (8)' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Google Maps (4)' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('sets data-review-filter="google" when the Google button is clicked', () => {
    const { container } = renderFilter();

    fireEvent.click(screen.getByRole('button', { name: 'Google Maps (4)' }));

    expect(getWrapper(container)).toHaveAttribute('data-review-filter', 'google');
    expect(screen.getByRole('button', { name: 'Google Maps (4)' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Alle Bewertungen (8)' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('switches to provenexpert and back to all', () => {
    const { container } = renderFilter();

    fireEvent.click(screen.getByRole('button', { name: 'ProvenExpert (4)' }));
    expect(getWrapper(container)).toHaveAttribute('data-review-filter', 'provenexpert');

    fireEvent.click(screen.getByRole('button', { name: 'Alle Bewertungen (8)' }));
    expect(getWrapper(container)).toHaveAttribute('data-review-filter', 'all');
  });
});

describe('TestimonialsSection', () => {
  it('renders all eight review cards on the server with CSS-driven filter hooks', () => {
    const { container } = render(<TestimonialsSection />);
    const wrapper = getWrapper(container);

    const googleCards = wrapper.querySelectorAll('[data-source="google"]');
    const provenExpertCards = wrapper.querySelectorAll('[data-source="provenexpert"]');
    expect(googleCards).toHaveLength(4);
    expect(provenExpertCards).toHaveLength(4);

    googleCards.forEach((card) => {
      expect(card.className).toContain('[[data-review-filter=provenexpert]_&]:hidden');
      expect(card.className).not.toContain('[[data-review-filter=google]_&]:hidden');
    });
    provenExpertCards.forEach((card) => {
      expect(card.className).toContain('[[data-review-filter=google]_&]:hidden');
      expect(card.className).not.toContain('[[data-review-filter=provenexpert]_&]:hidden');
    });

    expect(wrapper).toHaveAttribute('data-review-filter', 'all');
    fireEvent.click(screen.getByRole('button', { name: 'Google Maps (4)' }));
    expect(wrapper).toHaveAttribute('data-review-filter', 'google');
  });
});
