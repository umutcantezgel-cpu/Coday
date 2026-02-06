import React, { useMemo, ReactNode, RefObject } from 'react';
import { motion, Variants } from 'motion/react';

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

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = ''
}) => {
    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <motion.span
                    className="inline-block word"
                    key={index}
                    variants={{
                        hidden: {
                            opacity: baseOpacity,
                            filter: enableBlur ? `blur(${blurStrength}px)` : 'none'
                        },
                        visible: {
                            opacity: 1,
                            filter: 'blur(0px)',
                            transition: { duration: 0.8, ease: "easeOut" }
                        }
                    }}
                >
                    {word}
                </motion.span>
            );
        });
    }, [children, baseOpacity, enableBlur, blurStrength]);

    const containerVariants: Variants = {
        hidden: { rotate: baseRotation, transformOrigin: '0% 50%' },
        visible: {
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.05
            }
        }
    };

    return (
        <motion.h2
            className={`my-5 ${containerClassName}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
        >
            <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>
                {splitText}
            </p>
        </motion.h2>
    );
};

export default ScrollReveal;
