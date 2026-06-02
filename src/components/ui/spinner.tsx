import * as React from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * Props for the Spinner component.
 */
export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The size of the spinner in pixels or tailwind units.
   * @default 24
   */
  size?: number | string;
}

/**
 * A Spinner component used to indicate a loading state.
 * Fully hardware-accelerated using `transform: rotate` and `linear` easing.
 *
 * @param {SpinnerProps} props - The properties for the Spinner component.
 * @returns {JSX.Element} The rendered Spinner component.
 */
export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="status"
        aria-label="Loading"
        className={cn('animate-[spin_1s_linear_infinite]', className)}
        {...props}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    );
  }
);

Spinner.displayName = 'Spinner';
