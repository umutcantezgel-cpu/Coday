import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as Link, useLocation } from 'react-router-dom';
import { navItems } from './config';
import { gsap } from 'gsap';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { LanguageSeo } from '../LanguageSeo';

export const DesktopNav: React.FC = () => {
    const { t } = useTranslation('common');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Handle Hover Pill
    useEffect(() => {
        if (!navRef.current || !pillRef.current) return;

        if (hoveredIndex !== null) {
            const navItems = navRef.current.querySelectorAll('.nav-item-trigger');
            const target = navItems[hoveredIndex] as HTMLElement;

            if (target) {
                gsap.to(pillRef.current, {
                    width: target.offsetWidth,
                    x: target.offsetLeft,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        } else {
            gsap.to(pillRef.current, {
                opacity: 0,
                duration: 0.2
            });
        }
    }, [hoveredIndex]);

    return (
        <nav className="hidden lg:flex items-center gap-1 relative" ref={navRef}>
            <LanguageSeo />
            <LanguageSwitcher />

            {/* Floating Pill Background */}
            <div
                ref={pillRef}
                className="absolute top-0 bottom-0 bg-gray-100 rounded-full -z-10 pointer-events-none opacity-0"
                style={{ height: '100%' }}
            />

            {navItems.map((item, index) => (
                <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => {
                        setHoveredIndex(index);
                        setActiveDropdown(index);
                    }}
                    onMouseLeave={() => {
                        setHoveredIndex(null);
                        setActiveDropdown(null);
                    }}
                >
                    <button
                        className={`nav-item-trigger px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-colors ${hoveredIndex === index ? 'text-gray-900' : 'text-gray-600'
                            }`}
                        aria-expanded={activeDropdown === index}
                    >
                        {item.labelKey ? t(item.labelKey) : item.label}
                    </button>

                    {/* Mega Menu / Dropdown */}
                    <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 w-80 origin-top transition-all duration-200 ${activeDropdown === index
                            ? 'opacity-100 scale-100 translate-y-0 visible'
                            : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                            }`}
                    >
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-aurora-lg border border-white/40 overflow-hidden p-3">
                            {item.links?.map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.href}
                                    className="group/link block px-4 py-3 rounded-xl hover:bg-white/50 hover:shadow-sm transition-all duration-200"
                                >
                                    <div className="text-sm font-bold text-gray-900 group-hover/link:text-primary transition-colors flex items-center justify-between">
                                        {link.labelKey ? t(link.labelKey) : link.label}
                                        <span className="opacity-0 group-hover/link:opacity-100 transform translate-x-[-4px] group-hover/link:translate-x-0 transition-all duration-200 text-primary">
                                            <i className="fa-solid fa-arrow-right text-xs"></i>
                                        </span>
                                    </div>
                                    {(link.descriptionKey || link.description) && (
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                            {link.descriptionKey ? t(link.descriptionKey) : link.description}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </nav>
    );
};
