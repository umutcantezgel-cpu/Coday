import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface OptimizedIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: React.ElementType;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const OptimizedIcon: React.FC<OptimizedIconProps> = ({
  icon: Icon,
  label,
  className,
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center select-none',
        sizeClasses[size],
        className
      )}
      role={label ? 'img' : undefined}
      aria-label={label}
      {...props}
    >
      <Icon className="w-full h-full" />
    </span>
  );
};
