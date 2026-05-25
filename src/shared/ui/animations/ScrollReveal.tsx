"use client";
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import React, { ReactNode, RefObject, useMemo, useRef } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: RefObject<HTMLElement>; // Kept for API compat
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string; // Ignored
    wordAnimationEnd?: string; // Ignored
}

const Word = ({ 
  children, 
  progress, 
  index, 
  total, 
  enableBlur, 
  baseOpacity,
  blurStrength 
}: { 
  children: ReactNode; 
  progress: MotionValue<number>; 
  index: number; 
  total: number;
  enableBlur: boolean;
  baseOpacity: number;
  blurStrength: number;
}) => {
  // Calculate relative start/end for this word's animation
  const start = index / total;
  const end = Math.min((index + 2) / total, 1);
  
  const opacity = useTransform(progress, [start, end], [baseOpacity, 1]);
  const blurValue = useTransform(progress, [start, end], [blurStrength, 0]);
  const filter = useTransform(blurValue, (v) => enableBlur ? `blur(${v}px)` : 'none');
  
  return (
    <motion.span style={{ opacity, filter, willChange: 'opacity, filter', transform: 'translateZ(0)' }} className="inline-block word">
      {children}
    </motion.span>
  );
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = ''
}) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 95%", "start 60%"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [baseRotation, 0]);

    const content = useMemo(() => {
        if (typeof children !== 'string') return children;
        
        const words = children.split(/(\s+)/);
        const validWords = words.filter(w => !w.match(/^\s+$/));
        const totalWords = validWords.length;
        let wordIndex = 0;

        return words.map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            const currentIndex = wordIndex++;
            return (
                <Word 
                  key={index} 
                  progress={scrollYProgress} 
                  index={currentIndex} 
                  total={totalWords}
                  enableBlur={enableBlur}
                  baseOpacity={baseOpacity}
                  blurStrength={blurStrength}
                >
                  {word}
                </Word>
            );
        });
    }, [children, scrollYProgress, enableBlur, baseOpacity, blurStrength]);

    return (
        <motion.h2
            ref={containerRef}
            className={`my-5 ${containerClassName}`}
            style={{ rotate, transformOrigin: '0% 50%', transform: 'translateZ(0)', willChange: 'transform' }}
        >
            <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>
                {content}
            </p>
        </motion.h2>
    );
};

export default ScrollReveal;
