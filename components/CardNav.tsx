import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';
import './CardNav.css';

interface NavLink {
    label: string;
    href: string;
    ariaLabel?: string;
}

interface NavItem {
    label: string;
    bgColor: string;
    textColor: string;
    links: NavLink[];
}

interface CardNavProps {
    items: NavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
}

const COLLAPSED_HEIGHT = 60;
const EXPANDED_HEIGHT_DESKTOP = 280;

const CardNav: React.FC<CardNavProps> = ({
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor = '#1e293b',
    buttonBgColor = '#1A9A9A',
    buttonTextColor = '#fff'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const location = useLocation();

    // Calculate expanded height based on viewport and content
    const getExpandedHeight = useCallback(() => {
        if (typeof window === 'undefined') return EXPANDED_HEIGHT_DESKTOP;

        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // For mobile, calculate based on actual content or use viewport
            const viewportHeight = window.innerHeight;
            return Math.min(viewportHeight - 100, 500); // Cap at 500px or viewport - 100
        }
        return EXPANDED_HEIGHT_DESKTOP;
    }, []);

    // Create GSAP timeline
    const createTimeline = useCallback(() => {
        const navEl = navRef.current;
        const cards = cardsRef.current.filter(Boolean);
        if (!navEl || cards.length === 0) return null;

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: getExpandedHeight(),
            duration: 0.35,
            ease: 'power2.out'
        });

        tl.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.05
        }, '-=0.2');

        return tl;
    }, [getExpandedHeight]);

    // Initialize timeline
    useLayoutEffect(() => {
        const navEl = navRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (navEl) {
            gsap.set(navEl, { height: COLLAPSED_HEIGHT, overflow: 'hidden' });
        }
        if (cards.length > 0) {
            gsap.set(cards, { y: 30, opacity: 0 });
        }

        tlRef.current = createTimeline();

        return () => {
            tlRef.current?.kill();
            tlRef.current = null;
        };
    }, [createTimeline, items]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (tlRef.current) {
                tlRef.current.kill();
            }

            const navEl = navRef.current;
            const cards = cardsRef.current.filter(Boolean);

            if (isOpen && navEl) {
                gsap.set(navEl, { height: getExpandedHeight() });
                gsap.set(cards, { y: 0, opacity: 1 });
            } else if (navEl) {
                gsap.set(navEl, { height: COLLAPSED_HEIGHT });
                gsap.set(cards, { y: 30, opacity: 0 });
            }

            tlRef.current = createTimeline();
            if (isOpen && tlRef.current) {
                tlRef.current.progress(1);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen, getExpandedHeight, createTimeline]);

    // Close menu on route change
    useEffect(() => {
        if (isOpen) {
            closeMenu();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const openMenu = useCallback(() => {
        if (tlRef.current) {
            setIsOpen(true);
            tlRef.current.play();
        }
    }, []);

    const closeMenu = useCallback(() => {
        if (tlRef.current) {
            tlRef.current.eventCallback('onReverseComplete', () => {
                setIsOpen(false);
            });
            tlRef.current.reverse();
        }
    }, []);

    const toggleMenu = useCallback(() => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }, [isOpen, openMenu, closeMenu]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
        if (e.key === 'Escape' && isOpen) {
            closeMenu();
        }
    }, [toggleMenu, isOpen, closeMenu]);

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        cardsRef.current[i] = el;
    };

    return (
        <div className={`card-nav-container ${className}`}>
            <nav
                ref={navRef}
                className={`card-nav ${isOpen ? 'open' : ''}`}
                style={{ backgroundColor: baseColor }}
                role="navigation"
                aria-label="Hauptnavigation"
            >
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${isOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        onKeyDown={handleKeyDown}
                        role="button"
                        aria-expanded={isOpen}
                        aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
                        tabIndex={0}
                        style={{ color: menuColor }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    <Link
                        to="/"
                        className="logo-container"
                        onClick={() => isOpen && closeMenu()}
                        aria-label="Zur Startseite"
                    >
                        <i className="fa-brands fa-connectdevelop logo-icon" aria-hidden="true" />
                        <span className="logo-text">Coday</span>
                    </Link>

                    <Link
                        to="/contact"
                        className="card-nav-cta-button"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                        onClick={() => isOpen && closeMenu()}
                    >
                        Schließ dich an
                    </Link>
                </div>

                <div className="card-nav-content" aria-hidden={!isOpen}>
                    {items.slice(0, 6).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => (
                                    <Link
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link"
                                        to={lnk.href}
                                        aria-label={lnk.ariaLabel || lnk.label}
                                        onClick={() => closeMenu()}
                                    >
                                        <GoArrowUpRight aria-hidden="true" />
                                        {lnk.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
