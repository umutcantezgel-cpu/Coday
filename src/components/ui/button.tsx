import React, { forwardRef } from 'react';
import { CircleNotch, CheckCircle, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

export const baseButtonStyles =
  'relative inline-flex items-center justify-center rounded-xl font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-[transform,filter,background-color,border-color,opacity,color] duration-200 ease-out motion-reduce:transition-none active:scale-[0.97] touch-manipulation isolate';

export const buttonVariants: Record<string, string> = {
  primary:
    'bg-primary-700 text-white shadow-sm border border-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary-800 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md',
  secondary:
    'bg-secondary-800 text-white shadow-sm border border-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-secondary-900 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md',
  outline:
    'bg-transparent border-2 border-primary-700 text-primary-700 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary-50',
  ghost:
    'bg-transparent border-transparent text-secondary-600 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-secondary-100 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary-600',
};

export const buttonSizes: Record<string, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-[48px] px-6 text-base',
  lg: 'h-[56px] px-8 text-lg',
  icon: 'h-[48px] w-[48px] p-0',
  xl: 'h-[64px] px-10 text-xl',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'xl';
  state?: 'idle' | 'loading' | 'success' | 'error';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      state = 'idle',
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const effectiveState = isLoading ? 'loading' : state;
    const isOverlayVisible = effectiveState !== 'idle';

    return (
      <button
        ref={ref}
        className={cn(baseButtonStyles, buttonVariants[variant], buttonSizes[size], className)}
        disabled={disabled || effectiveState === 'loading'}
        {...props}
      >
        <span
          className={cn(
            'flex items-center justify-center gap-2 transition-[opacity,filter,transform] duration-200 ease-out motion-reduce:transition-none',
            isOverlayVisible ? 'opacity-0 blur-[2px] scale-95' : 'opacity-100 blur-0 scale-100'
          )}
        >
          {leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
        </span>

        <span
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[opacity,filter,transform] duration-200 ease-out motion-reduce:transition-none',
            effectiveState === 'loading'
              ? 'opacity-100 blur-0 scale-100'
              : 'opacity-0 blur-[2px] scale-95 pointer-events-none'
          )}
          aria-hidden={effectiveState !== 'loading'}
        >
          <CircleNotch className="h-5 w-5 animate-spin motion-reduce:animate-none" />
        </span>

        <span
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[opacity,filter,transform] duration-200 ease-out motion-reduce:transition-none text-green-500',
            effectiveState === 'success'
              ? 'opacity-100 blur-0 scale-100'
              : 'opacity-0 blur-[2px] scale-95 pointer-events-none'
          )}
          aria-hidden={effectiveState !== 'success'}
        >
          <CheckCircle weight="bold" className="h-5 w-5" />
        </span>

        <span
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[opacity,filter,transform] duration-200 ease-out motion-reduce:transition-none text-red-500',
            effectiveState === 'error'
              ? 'opacity-100 blur-0 scale-100'
              : 'opacity-0 blur-[2px] scale-95 pointer-events-none'
          )}
          aria-hidden={effectiveState !== 'error'}
        >
          <WarningCircle weight="bold" className="h-5 w-5" />
        </span>
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
