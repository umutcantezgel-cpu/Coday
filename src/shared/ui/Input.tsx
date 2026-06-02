import React from 'react';
import { cn } from '@/shared/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, leftIcon, rightIcon, id, wrapperClassName, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={cn('w-full space-y-2', wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-secondary ms-1">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              // Base styles
              'w-full bg-white rounded-xl border border-gray-200 text-secondary placeholder:text-gray-400',
              // Mobile Optimization: 16px font to prevent zoom, 48px height
              'text-base h-[48px] px-4',
              // Transitions
              'transition motion-reduce:duration-[0.01ms] duration-200 focus:border-primary focus:ring-4 focus:ring-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              // Icon adjustments
              leftIcon && 'ps-11',
              rightIcon && 'pe-11',
              // Error state
              error && 'border-red-300 focus:border-red-500 focus:ring-red-100',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p
            id={errorId}
            className="text-sm text-red-500 ms-1 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-sm text-gray-500 ms-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
