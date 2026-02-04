import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string; // Wrapper class
    strength?: number; // How strong the pull is (default 0.3)
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", strength = 0.3 }) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const trigger = triggerRef.current;
        const target = targetRef.current; // The button itself
        if (!trigger || !target) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = trigger.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from center
            const distanceX = (e.clientX - centerX) * strength;
            const distanceY = (e.clientY - centerY) * strength;

            // Move the target (button) towards the mouse
            gsap.to(target, {
                x: distanceX,
                y: distanceY,
                duration: 0.5,
                ease: "power3.out"
            });
        };

        const handleMouseLeave = () => {
            // Snap back to center
            gsap.to(target, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        };

        trigger.addEventListener('mousemove', handleMouseMove);
        trigger.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            trigger.removeEventListener('mousemove', handleMouseMove);
            trigger.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={triggerRef} className={`inline-block ${className}`}>
            <div ref={targetRef}>
                {children}
            </div>
        </div>
    );
};
