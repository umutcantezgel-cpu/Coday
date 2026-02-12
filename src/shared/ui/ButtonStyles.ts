export const buttonVariants: Record<string, string> = {
  primary:
    'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl',
  secondary: 'bg-secondary text-white shadow-md hover:bg-secondary/90',
  outline: 'border-2 border-primary/20 text-primary hover:bg-primary/5',
  ghost: 'text-secondary hover:bg-gray-100',
};

export const buttonSizes: Record<string, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-[48px] px-6 text-base',
  lg: 'h-[56px] px-8 text-lg',
  icon: 'h-[48px] w-[48px] p-0',
  xl: 'h-[64px] px-10 text-xl',
};

export const baseButtonStyles =
  'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
