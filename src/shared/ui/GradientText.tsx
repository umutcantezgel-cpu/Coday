import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
}

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  animationSpeed = 8,
  showBorder = false,
  direction: _direction = 'horizontal',
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')}, ${colors[0]})`,
    backgroundSize: '200% auto',
  };

  return (
    <div
      className={cn(
        'relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium overflow-hidden transition-shadow duration-500',
        showBorder ? 'py-1 px-2' : '',
        className
      )}
    >
      {showBorder && (
        <div
          className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem] animate-gradient-xy"
          style={{
            ...gradientStyle,
            animationDuration: `${animationSpeed}s`,
          }}
        >
          <div
            className="absolute bg-background-light rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-clip-text animate-gradient-xy pb-1"
        style={{
          ...gradientStyle,
          animationDuration: `${animationSpeed}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
