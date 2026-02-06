import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils'; // Assuming this exists, based on project norms. If not, will fix.

export const buttonVariants = {
    primary: 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl',
    secondary: 'bg-secondary text-white shadow-md hover:bg-secondary/90',
    outline: 'border-2 border-primary/20 text-primary hover:bg-primary/5',
    ghost: 'text-secondary hover:bg-gray-100',
};

export const buttonSizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-[48px] px-6 text-base',
    lg: 'h-[56px] px-8 text-lg',
    icon: 'h-[48px] w-[48px] p-0',
};

export const baseButtonStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
}) => {


    return (
        <button
            className={cn(baseButtonStyles, buttonVariants[variant], buttonSizes[size], className)}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : leftIcon ? (
                <span className="mr-2">{leftIcon}</span>
            ) : null}

            {children}

            {!isLoading && rightIcon && (
                <span className="ml-2">{rightIcon}</span>
            )}
        </button>
    );
};
