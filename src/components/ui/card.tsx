import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Card component.
 */
export type CardProps<C extends React.ElementType> = {
  /**
   * The underlying element to render.
   * @default "div"
   */
  as?: C;
  /**
   * Whether the card is interactive.
   * Enables focus, hover styles, and keyboard accessibility.
   * @default false
   */
  interactive?: boolean;
  /**
   * The padding applied to the card.
   * @default "md"
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'interactive' | 'padding'>;

type CardComponent = <C extends React.ElementType = 'div'>(
  props: CardProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactNode;

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * A flexible, generic card component that can render as any HTML element.
 */
export const Card: CardComponent = (forwardRef as any)(
  <C extends React.ElementType = 'div'>(
    {
      className,
      interactive = false,
      padding = 'md',
      as,
      children,
      onKeyDown,
      onClick,
      ...props
    }: CardProps<C>,
    ref: React.ForwardedRef<any>
  ) => {
    const Component = as || 'div';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (onKeyDown) {
        onKeyDown(e as any);
      }
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.key === ' ') {
          e.preventDefault(); // prevent page scroll
        }
        if (onClick) {
          onClick(e as any);
        }
      }
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-xl border border-secondary-200 bg-white shadow-sm',
          paddingStyles[padding],
          interactive &&
            'cursor-pointer transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms] active:scale-[0.97] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-11 min-w-11',
          className
        )}
        {...(interactive && !props.tabIndex ? { tabIndex: 0 } : {})}
        onKeyDown={interactive ? handleKeyDown : onKeyDown}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    );
  }
) as CardComponent;

(Card as any).displayName = 'Card';
