import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Grid component.
 */
export type GridProps<C extends React.ElementType> = {
  /**
   * Number of columns in the grid.
   * @default 1
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Gap between grid items.
   * @default "md"
   */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * The underlying element to render.
   * @default "div"
   */
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'cols' | 'gap'>;

type GridComponent = <C extends React.ElementType = 'div'>(
  props: GridProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactNode;

const colsStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

const gapStyles = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

/**
 * A generic grid layout component.
 */
export const Grid: GridComponent = (forwardRef as any)(
  <C extends React.ElementType = 'div'>(
    { className, cols = 1, gap = 'md', as, children, ...props }: GridProps<C>,
    ref: React.ForwardedRef<any>
  ) => {
    const Component = as || 'div';
    return (
      <Component
        ref={ref}
        className={cn('grid', colsStyles[cols], gapStyles[gap], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
) as GridComponent;

(Grid as any).displayName = 'Grid';
