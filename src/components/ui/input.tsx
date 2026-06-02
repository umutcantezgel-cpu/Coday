import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

/**
 * A reusable Input component with floating label, error, and helper text support.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      wrapperClassName,
      placeholder,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // A placeholder is required for the :placeholder-shown pseudo-class to work.
    // If one isn't provided, we use a single space so it's technically there but invisible.
    const effectivePlaceholder = placeholder || ' ';

    return (
      <div
        className={cn(
          'w-full flex flex-col',
          error && 'animate-shake motion-reduce:animate-none',
          props.disabled && 'opacity-50 cursor-not-allowed',
          wrapperClassName
        )}
      >
        <div
          className={cn(
            'relative flex items-center h-14 bg-white rounded-xl border border-gray-200',
            'focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-600',
            props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50'
          )}
        >
          {leftIcon && (
            <div className="absolute left-4 text-gray-400 pointer-events-none z-10">{leftIcon}</div>
          )}

          <input
            ref={ref}
            id={inputId}
            placeholder={effectivePlaceholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'peer w-full h-full bg-transparent text-secondary outline-none px-4 text-base pt-4 pb-1 disabled:cursor-not-allowed',
              label && 'placeholder:opacity-0 focus:placeholder:opacity-100',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              className
            )}
            {...props}
          />

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-[transform,opacity] duration-150 ease-appear origin-top-left motion-reduce:transition-none',
                'peer-focus:-translate-y-[1.1rem] peer-focus:scale-[0.80] peer-focus:text-primary-600',
                'peer-[:not(:placeholder-shown)]:-translate-y-[1.1rem] peer-[:not(:placeholder-shown)]:scale-[0.80]',
                leftIcon &&
                  'left-11 peer-focus:-translate-x-7 peer-[:not(:placeholder-shown)]:-translate-x-7'
                // If it's effectively a space (no explicit placeholder), we hide placeholder text normally but here label covers it.
                // Actually placeholder text is visible if they actually pass a placeholder, which is fine,
                // but usually float-label inputs don't have placeholders, or the placeholder only appears on focus.
                // We'll just let the label float up.
              )}
            >
              {label}
            </label>
          )}

          {rightIcon && (
            <div className="absolute right-4 text-gray-400 pointer-events-none z-10">
              {rightIcon}
            </div>
          )}
        </div>

        {/* We use an absolute positioning trick or just opacity/transform to avoid layout shift for error/helper? 
            The prompt says "0 layout triggers (use ONLY transform, opacity, filter)" - which applies to animation. 
            If the error text simply renders, it might cause a layout shift.
            To avoid layout shift on error appearance, we should render it invisibly if there's no error,
            or reserve space. But usually space reservation is required.
            Let's reserve space or absolute position it. 
            Let's use a wrapper with a fixed min-height for the messages, or absolute position. */}
        <div className="relative h-6 mt-1 overflow-hidden">
          <p
            id={errorId}
            className={cn(
              'absolute top-0 left-1 text-sm text-red-500 flex items-center gap-1 transition-[transform,opacity] duration-150 ease-appear motion-reduce:transition-none',
              error ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
            )}
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
          <p
            id={helperId}
            className={cn(
              'absolute top-0 left-1 text-sm text-gray-500 transition-[transform,opacity] duration-150 ease-appear motion-reduce:transition-none',
              !error && helperText
                ? 'translate-y-0 opacity-100'
                : '-translate-y-2 opacity-0 pointer-events-none'
            )}
          >
            {helperText}
          </p>
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
