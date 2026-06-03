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
  /**
   * Explicit width to prevent Cumulative Layout Shift (CLS).
   */
  width?: number | string;
  /**
   * Explicit height to prevent Cumulative Layout Shift (CLS).
   */
  height?: number | string;
}

/**
 * A Skeleton component used as a placeholder while content is loading.
 * It uses a hardware-accelerated CSS transform shimmer effect to prevent layout shifts.
 *
 * @param {SkeletonProps} props - The properties for the Skeleton component.
 * @returns {JSX.Element} The rendered Skeleton component.
 */
export function Skeleton({ className, 'aria-label': ariaLabel, width, height, style, ...props }: SkeletonProps) {
  // Enforce explicit dimensions to reserve space for dynamic content and prevent Cumulative Layout Shift (CLS).
  const hasHeightClass = className?.match(/\bh-\d+\b|\bmin-h-\d+\b|\bh-full\b|\bh-screen\b/);
  const hasWidthClass = className?.match(/\bw-\d+\b|\bmin-w-\d+\b|\bw-full\b|\bw-screen\b/);
  
  const explicitStyle: React.CSSProperties = { ...style };
  
  if (width !== undefined) explicitStyle.width = width;
  if (height !== undefined) explicitStyle.height = height;
  
  if (!explicitStyle.minHeight && !height && !hasHeightClass) {
    explicitStyle.minHeight = '1.5rem';
  }
  if (!explicitStyle.minWidth && !width && !hasWidthClass && !explicitStyle.width) {
    explicitStyle.minWidth = '1.5rem';
  }

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={ariaLabel || 'Loading'}
      className={cn(
        'relative overflow-hidden rounded-xl border border-subtle bg-surface-elevated',
        'after:absolute after:inset-0',
        'after:translate-x-[-100%]',
        'after:animate-[shimmer_1.5s_infinite_linear] after:motion-reduce:animate-none',
        'after:bg-gradient-to-r after:from-transparent after:via-white/20 dark:after:via-white/10 after:to-transparent',
        className
      )}
      style={explicitStyle}
      {...props}
    />
  );
}
