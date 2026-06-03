import * as React from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * Props for the Skeleton component.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional custom class names for the skeleton.
   */
  className?: string;
  /**
   * Accessible label for screen readers.
   * @default 'Loading'
   */
  'aria-label'?: string;
}

/**
 * A Skeleton component used as a placeholder while content is loading.
 * It uses a hardware-accelerated CSS transform shimmer effect to prevent layout shifts.
 *
 * @param {SkeletonProps} props - The properties for the Skeleton component.
 * @returns {JSX.Element} The rendered Skeleton component.
 */
export function Skeleton({ className, 'aria-label': ariaLabel, style, ...props }: SkeletonProps) {
  // Enforce a minimum explicit height if none is provided in className or style
  // to reserve space for dynamic content and prevent Cumulative Layout Shift (CLS).
  const hasHeightClass = className?.match(/\bh-\d+\b|\bmin-h-\d+\b|\bh-full\b|\bh-screen\b/);
  const explicitStyle = style?.height || style?.minHeight ? style : { ...style, minHeight: '1.5rem' };

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={ariaLabel || 'Loading'}
      className={cn(
        'relative overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800',
        'after:absolute after:inset-0',
        'after:translate-x-[-100%]',
        'after:animate-[shimmer_1.5s_infinite_linear] after:motion-reduce:animate-none',
        'after:bg-gradient-to-r after:from-transparent after:via-white/20 dark:after:via-white/10 after:to-transparent',
        !hasHeightClass && !style?.height && !style?.minHeight && 'min-h-[1.5rem]',
        className
      )}
      style={explicitStyle}
      {...props}
    />
  );
}
