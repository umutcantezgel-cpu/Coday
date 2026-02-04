import { useState, useEffect, useRef, useCallback } from 'react';

export const useNavState = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const lastScrollY = useRef(0);

    // Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const threshold = 50;
            const isScrollingDown = currentScrollY > lastScrollY.current;
            const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

            // Determine if scrolled significantly from top
            setIsScrolled(currentScrollY > 20);

            // Smart Visibility
            if (scrollDelta > 10) {
                if (isScrollingDown && currentScrollY > threshold && !isMobileOpen) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileOpen]);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMobileOpen) {
                setIsMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileOpen]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileOpen(false);
    }, []);

    return {
        isVisible,
        isScrolled,
        isMobileOpen,
        toggleMobileMenu,
        closeMobileMenu
    };
};
