export const buttonVariants: Record<string, string> = {
  primary: 'bg-primary-700 text-white shadow-md hover:bg-primary-800 hover:shadow-glow',
  secondary: 'bg-secondary-800 text-white shadow-md hover:bg-secondary-900',
  outline:
    'border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white shadow-sm hover:shadow-glow',
  ghost: 'text-secondary-600 hover:bg-secondary-100 hover:text-primary-600',
};

export const buttonSizes: Record<string, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-[48px] px-6 text-base',
  lg: 'h-[56px] px-8 text-lg',
  icon: 'h-[48px] w-[48px] p-0',
  xl: 'h-[64px] px-10 text-xl',
};

export const baseButtonStyles =
  'inline-flex items-center justify-center rounded-xl font-medium transition-[transform,filter,background-color,color,box-shadow,opacity] ease-[cubic-bezier(0.23,1,0.32,1)] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] hover:brightness-110 min-h-[44px] touch-manipulation isolate';
