'use client';
'use client';
import React, { ReactNode, useEffect, useRef } from 'react';

// Custom hook to apply magnetic effect via vanilla DOM manipulation
function useMagnetic<T extends HTMLElement>(strength: number = 0.2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let x = 0;
    let y = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);

      x = middleX * strength;
      y = middleY * strength;
      updateTransform();
    };

    const onMouseLeave = () => {
      x = 0;
      y = 0;
      updateTransform();
    };

    const updateTransform = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (element) {
          element.style.transform = `translate(${x}px, ${y}px)`;
          element.style.transition =
            x === 0 && y === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out';
        }
      });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
      if (element) {
        element.style.transform = '';
      }
    };
  }, [strength]);

  return ref;
}

interface MagneticProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: React.ElementType;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.2,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const ref = useMagnetic<HTMLElement>(strength);

  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
};
