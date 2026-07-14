import React, { forwardRef } from 'react';
import type { IconProps as PhosphorIconProps } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

/**
 * Props for the Icon component.
 *
 * @example
 * // Decorative icon (hidden from screen readers)
 * <Icon icon={CheckCircle} />
 *
 * @example
 * // Meaningful icon with accessibility label
 * <Icon icon={MagnifyingGlass} aria-label="Search" />
 *
 * @example
 * // Styled icon with custom size and color
 * <Icon icon={WarningCircle} className="h-6 w-6 text-red-500" weight="fill" />
 */
export interface IconProps extends Omit<PhosphorIconProps, 'icon'> {
  /** The Phosphor Icon component to render */
  icon: React.ElementType<PhosphorIconProps>;
  /** Accessible label for screen readers. If omitted, the icon is hidden from screen readers. */
  'aria-label'?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn('h-5 w-5 shrink-0', className)}
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        {...props}
      />
    );
  }
);
Icon.displayName = 'Icon';

export { Icon };
