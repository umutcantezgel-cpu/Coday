'use client';

import React, { ReactNode, RefObject, useState, useEffect } from 'react';
import { m, Variants, useReducedMotion } from 'motion/react';

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>; // Kept for API compat, though Framer uses context usually
  containerClassName?: string;
  textClassName?: string; // Additional classes for the text container
  animationDuration?: number;
  ease?: string; // GSAP ease string (ignored in FM implementation or mapped)
  scrollStart?: string; // GSAP scroll start (ignored)
  scrollEnd?: string; // GSAP scroll end (ignored)
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  stagger = 0.03,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: '120%',
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%',
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      scaleX: 1,
      transition: {
        duration: animationDuration,
        ease: 'easeOut', // or custom bezier
      },
    },
  };

  const splitText = (typeof children === 'string' ? children : '').split('').map((char, index) => (
    <m.span className="inline-block word transform-gpu" key={index} variants={itemVariants}>
      {char === ' ' ? '\u00A0' : char}
    </m.span>
  ));

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <m.h2
      key={isMounted ? 'mounted' : 'ssr'}
      className={`my-5 overflow-hidden ${containerClassName}`}
      initial={isMounted && !prefersReducedMotion ? 'hidden' : false}
      animate={isMounted && !prefersReducedMotion ? undefined : 'visible'}
      whileInView={isMounted && !prefersReducedMotion ? 'visible' : undefined}
      viewport={{ once: true, margin: '-10%' }}
      variants={prefersReducedMotion ? undefined : containerVariants}
    >
      <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>
        {prefersReducedMotion ? children : splitText}
      </span>
    </m.h2>
  );
};

export default ScrollFloat;
