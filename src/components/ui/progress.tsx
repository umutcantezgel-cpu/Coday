import * as React from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * Props for the Progress component.
 */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The current progress value (0 to 100).
   * @default 0
   */
  value?: number;
  /**
   * The maximum progress value.
   * @default 100
   */
  max?: number;
  /**
   * Accessible label for screen readers.
   * @default 'Progress'
   */
  'aria-label'?: string;
}

/**
 * A Progress component to indicate completion status.
 * Uses `transform: scaleX` for hardware-accelerated bar fill without layout shifts.
 *
 * @param {ProgressProps} props - The properties for the Progress component.
 * @returns {JSX.Element} The rendered Progress component.
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, 'aria-label': ariaLabel, ...props }, ref) => {
    // Ensure value is bounded between 0 and max
    const safeValue = Math.min(Math.max(value, 0), max);
    const percentage = max > 0 ? safeValue / max : 0;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={safeValue}
        aria-label={ariaLabel || 'Progress'}
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full bg-primary-600 origin-left',
            'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
          )}
          style={{ transform: `scaleX(${percentage})` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';
