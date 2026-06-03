import React from 'react';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/shared/lib/utils'; // Assuming this exists, based on project norms. If not, will fix.

import { buttonVariants, buttonSizes, baseButtonStyles } from '@/shared/ui/ButtonStyles';

// Re-export for convenience if needed, but to fix the lint error we should avoid re-exporting if possible,
// or re-export only if not also exporting a component.
// Actually, re-exporting might trigger the same error if it's considered "non-component export".
// So better to NOT re-export and force consumers to import from ButtonStyles.

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
      aria-disabled={isLoading || disabled || undefined}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <CircleNotch className="w-5 h-5 animate-spin me-2 motion-reduce:animate-none" aria-hidden="true" />
          <span className="sr-only">Lädt…</span>
        </>
      ) : leftIcon ? (
        <span className="me-2">{leftIcon}</span>
      ) : null}

      {children}

      {!isLoading && rightIcon && <span className="ms-2">{rightIcon}</span>}
    </button>
  );
};
