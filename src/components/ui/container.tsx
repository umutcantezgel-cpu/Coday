import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Container component.
 */
export type ContainerProps<C extends React.ElementType> = {
  /**
   * The maximum width of the container.
   * @default "lg"
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * The underlying element to render.
   * @default "div"
   */
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'size'>;

type ContainerComponent = <C extends React.ElementType = 'div'>(
  props: ContainerProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactNode;

const sizeStyles = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[96rem]',
  full: 'max-w-full',
};

/**
 * A responsive container component to bound content width.
 */
export const Container: ContainerComponent = (forwardRef as any)(
  <C extends React.ElementType = 'div'>(
    { className, size = 'lg', as, children, ...props }: ContainerProps<C>,
    ref: React.ForwardedRef<any>
  ) => {
    const Component = as || 'div';
    return (
      <Component
        ref={ref}
        className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeStyles[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
) as ContainerComponent;

(Container as any).displayName = 'Container';
