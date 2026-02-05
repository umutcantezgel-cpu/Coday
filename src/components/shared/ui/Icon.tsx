import React from 'react';
import { cn } from '@/shared/lib/utils'; // Assuming standard utils exists, or simple join

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    name: string;
    label?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Icon: React.FC<IconProps> = ({ name, label, className, size, ...props }) => {
    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-xl',
        xl: 'text-2xl',
    };

    return (
        <span
            className={cn("material-symbols-outlined select-none", size && sizeClasses[size], className)}
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={!label}
            {...props}
        >
            {name}
        </span>
    );
};
