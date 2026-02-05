import React, { useState, useCallback, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_ITEMS, NAV_CTA, NavItem } from '../config';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const NavigationMenu: React.FC = () => {
    const { t } = useTranslation('common');
    const [activeTab, setActiveTab] = useState<number | null>(null);
    const [hoveredTab, setHoveredTab] = useState<number | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const navRef = useRef<HTMLElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Keyboard navigation handler
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        const itemCount = NAV_ITEMS.length;

        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                setFocusedIndex(prev => (prev + 1) % itemCount);
                setHoveredTab(prev => prev !== null ? (prev + 1) % itemCount : 0);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                setFocusedIndex(prev => prev <= 0 ? itemCount - 1 : prev - 1);
                setHoveredTab(prev => prev !== null ? (prev <= 0 ? itemCount - 1 : prev - 1) : itemCount - 1);
                break;
            case 'ArrowDown':
                // Open dropdown for current item
                if (focusedIndex >= 0 && NAV_ITEMS[focusedIndex]?.links) {
                    setHoveredTab(focusedIndex);
                }
                break;
            case 'Escape':
                setHoveredTab(null);
                setFocusedIndex(-1);
                break;
            case 'Tab':
                // Let natural tab behavior work
                setHoveredTab(null);
                break;
        }
    }, [focusedIndex]);

    // Focus management
    const handleItemFocus = (index: number) => {
        setFocusedIndex(index);
        setHoveredTab(index);
    };

    return (
        <div className="flex items-center gap-3">
            <nav
                ref={navRef}
                className="flex items-center gap-1 p-1 bg-white/50 backdrop-blur-md rounded-full border border-white/20 shadow-sm"
                onMouseLeave={() => setHoveredTab(null)}
                onKeyDown={handleKeyDown}
                role="menubar"
                aria-label="Main Navigation"
            >

                {NAV_ITEMS.map((item, index) => (
                    <div
                        key={index}
                        ref={el => itemRefs.current[index] = el}
                        className="relative group"
                        onMouseEnter={() => setHoveredTab(index)}
                        role="none"
                    >
                        {/* Top Level Link */}
                        <div className="relative px-4 py-2 z-10 cursor-pointer">
                            <NavLink
                                to={item.href || '#'}
                                className={({ isActive }) =>
                                    `relative z-20 flex items-center gap-1 text-sm font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full ${isActive || hoveredTab === index ? 'text-primary' : 'text-slate-600'
                                    }`
                                }
                                onClick={(e) => !item.href && e.preventDefault()}
                                onFocus={() => handleItemFocus(index)}
                                role="menuitem"
                                aria-haspopup={item.links ? "menu" : undefined}
                                aria-expanded={item.links ? hoveredTab === index : undefined}
                            >
                                {item.labelKey ? t(item.labelKey) : item.label}
                                {item.links && (
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${hoveredTab === index ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                )}
                            </NavLink>

                            {/* Liquid Pill Background */}
                            {hoveredTab === index && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white shadow-lg rounded-full z-10 border border-gray-100"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </div>

                        {/* Mega Dropdown */}
                        <AnimatePresence>
                            {hoveredTab === index && item.links && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-screen max-w-sm md:max-w-2xl lg:max-w-4xl px-4"
                                    role="menu"
                                    aria-label={`${item.labelKey ? t(item.labelKey) : item.label} submenu`}
                                >
                                    <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                        <div className={`grid gap-4 ${item.columns === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                                            {item.links.map((link, i) => (
                                                <NavLink
                                                    key={i}
                                                    to={link.href}
                                                    className="group/link flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                                                    role="menuitem"
                                                >
                                                    {link.icon && (
                                                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover/link:bg-primary group-hover/link:text-white transition-all shadow-sm">
                                                            <link.icon size={20} aria-hidden="true" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 group-hover/link:text-primary transition-colors">
                                                            {link.labelKey ? t(link.labelKey) : link.label}
                                                        </h4>
                                                        {(link.descriptionKey || link.description) && (
                                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                                                {link.descriptionKey ? t(link.descriptionKey) : link.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </NavLink>
                                            ))}
                                        </div>

                                        {(item.descriptionKey || item.description) && (
                                            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                                <p className="text-sm text-gray-400 italic">
                                                    "{item.descriptionKey ? t(item.descriptionKey) : item.description}"
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>

            {/* CTA Button */}
            <Link
                to={NAV_CTA.href}
                className="px-5 py-2.5 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
            >
                {NAV_CTA.label}
            </Link>
        </div>
    );
};

