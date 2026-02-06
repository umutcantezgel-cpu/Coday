import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    className?: string; // Wrapper class
    ease?: string; // Deprecated, kept for compat
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
    baseColor = '#fff',
    menuColor = '#1e293b',
    buttonBgColor = '#1A9A9A',
    buttonTextColor = '#fff'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
        if (e.key === 'Escape' && isOpen) {
            setIsOpen(false);
        }
    };

    // Animation Variants
    const containerVariants = {
        closed: {
            height: COLLAPSED_HEIGHT,
            transition: { duration: 0.35, ease: "easeInOut" as const, staggerDirection: -1, when: "afterChildren" }
        },
        open: {
            height: 'auto', // Allow dynamic height
            transition: { duration: 0.35, ease: "easeInOut" as const, staggerChildren: 0.05, when: "beforeChildren" }
        }
    };

    const cardVariants = {
        closed: { y: 30, opacity: 0, transition: { duration: 0.2 } },
        open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" as const } }
    };

    return (
        <div className={`card-nav-container ${className}`}>
            <motion.nav
                className={`card-nav ${isOpen ? 'open' : ''} overflow-hidden`}
                style={{ backgroundColor: baseColor }}
                role="navigation"
                aria-label="Hauptnavigation"
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={containerVariants}
            >
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
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
                        onClick={() => isOpen && setIsOpen(false)}
                        aria-label="Zur Startseite"
                    >
                        <i className="fa-brands fa-connectdevelop logo-icon" aria-hidden="true" />
                        <span className="logo-text">Coday</span>
                    </Link>

                    <Link
                        to="/contact"
                        className="card-nav-cta-button"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                        onClick={() => isOpen && setIsOpen(false)}
                    >
                        Schließ dich an
                    </Link>
                </div>

                <motion.div className="card-nav-content" aria-hidden={!isOpen}>
                    {items.slice(0, 6).map((item, idx) => (
                        <motion.div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                            variants={cardVariants}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => (
                                    <Link
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link"
                                        to={lnk.href}
                                        aria-label={lnk.ariaLabel || lnk.label}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <GoArrowUpRight aria-hidden="true" />
                                        {lnk.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.nav>
        </div>
    );
};

export default CardNav;
