import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Badge component.
 *
 * @example
 * // Standard usage
 * <Badge>New</Badge>
 *
 * @example
 * // Success variant
 * <Badge variant="success">Completed</Badge>
 *
 * @example
 * // Interactive usage (ensures 44x44px minimum tap target)
 * <Badge interactive onClick={() => dismiss()}>Dismiss</Badge>
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement | HTMLButtonElement> {
  /** The variant style of the badge */
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  /** If true, renders as a button with interactive states and a minimum 44x44px size for a11y tap targets */
  interactive?: boolean;
}

const badgeVariants: Record<string, string> = {
  primary: 'bg-action-primary text-content-inverse border-transparent',
  secondary: 'bg-surface-muted text-content-base border-transparent',
  outline: 'text-content-base border-border-base',
  success: 'bg-success-muted text-success-base border-transparent',
  warning: 'bg-warning-muted text-warning-base border-transparent',
  error: 'bg-danger-muted text-danger-base border-transparent',
};

const Badge = forwardRef<HTMLSpanElement | HTMLButtonElement, BadgeProps>(
  ({ className, variant = 'primary', interactive = false, ...props }, ref) => {
    const Component = interactive ? 'button' : 'span';

    return (
      <Component
        ref={ref as React.Ref<HTMLSpanElement> & React.Ref<HTMLButtonElement>}
        className={cn(
          'inline-flex items-center justify-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-[transform,filter,opacity,background-color] duration-300 ease-spring',
          badgeVariants[variant],
          interactive &&
            'cursor-pointer hover:opacity-80 active:scale-[0.97] min-h-11 min-w-11 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2',
          className
        )}
        {...(interactive ? { type: 'button' as const } : {})}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
