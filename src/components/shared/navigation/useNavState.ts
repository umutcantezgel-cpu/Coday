import { useState, useEffect, useRef, useCallback } from 'react';

interface NavState {
    isVisible: boolean;
    isScrolled: boolean;
    isMobileOpen: boolean;
    glassmorphismLevel: number;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
}

export const useNavState = (): NavState => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [glassmorphismLevel, setGlassmorphismLevel] = useState(0);

    const lastScrollY = useRef(0);
    const lastTimestamp = useRef(Date.now());
    const ticking = useRef(false);

    // Enhanced Scroll Logic with velocity awareness
    useEffect(() => {
        const handleScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const currentTimestamp = Date.now();
                const timeDelta = currentTimestamp - lastTimestamp.current;
                const scrollDelta = currentScrollY - lastScrollY.current;
                const velocity = timeDelta > 0 ? Math.abs(scrollDelta) / timeDelta * 1000 : 0; // px/s

                const threshold = 150; // Only hide after 150px scroll
                const velocityThreshold = 800; // Fast scroll threshold (px/s)
                const isScrollingDown = scrollDelta > 0;

                // Determine if scrolled significantly from top
                setIsScrolled(currentScrollY > 30);

                // Calculate glassmorphism level (0 to 1)
                const maxBlurScroll = 200;
                const level = Math.min(currentScrollY / maxBlurScroll, 1);
                setGlassmorphismLevel(level);

                // Smart Visibility with velocity awareness
                if (Math.abs(scrollDelta) > 5) {
                    if (isScrollingDown && currentScrollY > threshold && !isMobileOpen) {
                        // Hide on scroll down (but only after threshold)
                        setIsVisible(false);
                    } else if (!isScrollingDown) {
                        // Show on scroll up - instant for fast scrolls
                        if (velocity > velocityThreshold || currentScrollY < threshold) {
                            setIsVisible(true);
                        } else if (Math.abs(scrollDelta) > 15) {
                            setIsVisible(true);
                        }
                    }
                }

                // Always show at top
                if (currentScrollY < 50) {
                    setIsVisible(true);
                }

                lastScrollY.current = currentScrollY;
                lastTimestamp.current = currentTimestamp;
                ticking.current = false;
            });
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
        glassmorphismLevel,
        toggleMobileMenu,
        closeMobileMenu
    };
};

