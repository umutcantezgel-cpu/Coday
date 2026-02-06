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

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    className,
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    id,
    wrapperClassName,
    ...props
}, ref) => {
    const inputId = id || React.useId();

    return (
        <div className={cn("w-full space-y-2", wrapperClassName)}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-semibold text-secondary ml-1"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {leftIcon}
                    </div>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        // Base styles
                        "w-full bg-white rounded-xl border border-gray-200 text-secondary placeholder:text-gray-400",
                        // Mobile Optimization: 16px font to prevent zoom, 48px height
                        "text-base h-[48px] px-4",
                        // Transitions
                        "transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10",
                        // Icon adjustments
                        leftIcon && "pl-11",
                        rightIcon && "pr-11",
                        // Error state
                        error && "border-red-300 focus:border-red-500 focus:ring-red-100",
                        className
                    )}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {rightIcon}
                    </div>
                )}
            </div>

            {error ? (
                <p className="text-sm text-red-500 ml-1 flex items-center gap-1">
                    {error}
                </p>
            ) : helperText ? (
                <p className="text-sm text-gray-500 ml-1">{helperText}</p>
            ) : null}
        </div>
    );
});

Input.displayName = 'Input';
