import { useState, useEffect, useRef } from 'react';

export const useNavScrolling = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const threshold = 50;

            // Determine if scrolled significantly from top (glass effect trigger)
            setIsScrolled(currentScrollY > 20);

            // Logic for hiding/showing based on direction
            // Allow a buffer (threshold) before confirming action
            if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
                if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
                    // Scrolling DOWN
                    setIsVisible(false);
                } else {
                    // Scrolling UP or at top
                    setIsVisible(true);
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { isVisible, isScrolled };
};
