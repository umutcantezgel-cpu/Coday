"use client";
import React, { Children, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic'; // kept for prop compat
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

// Helper to calculate slot positions
const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
  opacity: 1, // Ensure visibility
});

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  children,
}) => {
  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  // Store indices rather than elements to manage order
  const [order, setOrder] = useState(Array.from({ length: childArr.length }, (_, i) => i));
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (order.length < 2) return;

    const interval = setInterval(() => {
      if (pauseOnHover && isPaused) return;

      setOrder((prev) => {
        const [front, ...rest] = prev;
        return [...rest, front];
      });
    }, delay);

    return () => clearInterval(interval);
  }, [order.length, delay, pauseOnHover, isPaused]);

  return (
    <div
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full preserve-3d">
        {order.map((childIndex, i) => {
          const child = childArr[childIndex];
          const slots = makeSlot(i, cardDistance, verticalDistance, childArr.length);

          // The front card (last in visual stack typically, but here i=0 is front)
          // Wait, makeSlot(0) is front.
          // If we move front to back, it should animate out.

          return (
            <motion.div
              key={child.key || childIndex} // Key must track the content, not the position
              layoutId={`card-${childIndex}`} // layoutId helps Framer track across reorders -> actually causing constraints here maybe?
              // Just simpler animate props
              initial={false}
              animate={{
                x: slots.x,
                y: slots.y,
                z: slots.z,
                zIndex: slots.zIndex,
                skewY: skewAmount, // simplified skew
                opacity: 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 20,
              }}
              className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [backface-visibility:hidden] ${child.props.customClass ?? ''} ${child.props.className ?? ''}`.trim()}
              style={{
                width: '100%',
                height: '100%',
                marginLeft: '-50%', // Centering replacement
                marginTop: '-50%',
                ...child.props.style,
              }}
              onClick={(e) => {
                child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
                onCardClick?.(childIndex);
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Export Card for compatibility, though regular divs work too
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    className={`w-full h-full ${customClass || ''} ${rest.className || ''}`}
    {...rest}
  />
));
Card.displayName = 'Card';

export default CardSwap;
