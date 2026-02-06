import React, { useMemo, ReactNode, RefObject } from 'react';
import { motion, Variants } from 'framer-motion';

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
    stagger = 0.03
}) => {
    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split('').map((char, index) => (
            <motion.span
                className="inline-block word"
                key={index}
                variants={itemVariants}
            >
                {char === ' ' ? '\u00A0' : char}
            </motion.span>
        ));
    }, [children]);

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
                delayChildren: 0.1
            }
        }
    };

    return (
        <motion.h2
            className={`my-5 overflow-hidden ${containerClassName}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
        >
            <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>
                {splitText}
            </span>
        </motion.h2>
    );
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: "120%",
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
    },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        scaleX: 1,
        transition: {
            duration: 1,
            ease: "easeOut" // or custom bezier
        }
    }
};

export default ScrollFloat;
