import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Divider component.
 */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The orientation of the divider.
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Whether the divider is purely decorative.
   * If true, it is hidden from assistive technologies.
   * @default false
   */
  decorative?: boolean;
}

/**
 * A divider component to separate content visually and semantically.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', decorative = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          'shrink-0 bg-secondary-200',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className
        )}
        {...(decorative ? { 'aria-hidden': true } : {})}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';
