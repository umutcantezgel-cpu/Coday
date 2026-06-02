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
}

/**
 * A Skeleton component used as a placeholder while content is loading.
 * It uses a hardware-accelerated CSS transform shimmer effect to prevent layout shifts.
 *
 * @param {SkeletonProps} props - The properties for the Skeleton component.
 * @returns {JSX.Element} The rendered Skeleton component.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800',
        'after:absolute after:inset-0',
        'after:translate-x-[-100%]',
        'after:animate-[shimmer_1.5s_infinite_linear]',
        'after:bg-gradient-to-r after:from-transparent after:via-white/20 dark:after:via-white/10 after:to-transparent',
        className
      )}
      {...props}
    />
  );
}
