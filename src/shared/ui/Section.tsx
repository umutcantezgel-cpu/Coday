import React from 'react';
import { cn } from '@/shared/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string; // id is MANDATORY for semantic identification
  children: React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

/**
 * Semantic Section Wrapper (ZERO-BREAKAGE Task 3.1)
 * Enforces `id` for anchor linking and semantic ARIA labeling.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      children,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    // Fallback: If no aria-label or labelledby is provided, we can use the id as a fallback label
    // Though it's better if the consumer provides a proper label or links to an h2.
    const hasAriaLabel = ariaLabel || ariaLabelledBy;

    return (
      <section
        ref={ref}
        id={id}
        className={cn('relative w-full', className)}
        aria-label={ariaLabel || (!hasAriaLabel ? id.replace(/-/g, ' ') : undefined)}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
