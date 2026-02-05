import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as Link } from 'react-router-dom';
import { navItems, NAV_CTA } from './config';
import { gsap } from 'gsap';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { ChevronDown, X } from 'lucide-react';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation('common');
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const lastFocusableRef = useRef<HTMLAnchorElement>(null);

    // Accordion state - which section is open
    const [expandedSection, setExpandedSection] = useState<number | null>(null);

    // Animation effects
    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (!container || !content) return;

        if (isOpen) {
            // Lock body scroll
            document.body.style.overflow = 'hidden';

            gsap.set(container, { display: 'block' });
            gsap.to(container, { opacity: 1, duration: 0.3 });

            gsap.fromTo(content,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
            );

            // Focus first element for accessibility
            setTimeout(() => firstFocusableRef.current?.focus(), 100);

        } else {
            // Unlock body scroll
            document.body.style.overflow = '';
            setExpandedSection(null);

            gsap.to(container, {
                opacity: 0, duration: 0.3, onComplete: () => {
                    gsap.set(container, { display: 'none' });
                }
            });
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Focus trap
    const handleTabKey = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        const first = firstFocusableRef.current;
        const last = lastFocusableRef.current;

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
        }
    }, []);

    // Touch / Swipe Logic with live drag
    const touchStart = useRef<number>(0);
    const currentDrag = useRef<number>(0);
    const minSwipeDistance = 80;

    const onTouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.targetTouches[0].clientY;
        currentDrag.current = 0;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!contentRef.current) return;
        const currentY = e.targetTouches[0].clientY;
        const delta = currentY - touchStart.current;

        // Only allow dragging down
        if (delta > 0) {
            currentDrag.current = delta;
            gsap.set(contentRef.current, { y: Math.min(delta * 0.5, 100) });
        }
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current || !contentRef.current) return;
        const touchEnd = e.changedTouches[0].clientY;
        const distance = touchEnd - touchStart.current;

        if (distance > minSwipeDistance) {
            // Swiped Down -> Close with momentum
            gsap.to(contentRef.current, {
                y: 300, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: onClose
            });
        } else {
            // Snap back
            gsap.to(contentRef.current, { y: 0, duration: 0.3, ease: "elastic.out(1, 0.5)" });
        }
        touchStart.current = 0;
    };

    // Toggle accordion section
    const toggleSection = (index: number) => {
        setExpandedSection(prev => prev === index ? null : index);
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9998] hidden"
            onKeyDown={handleTabKey}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Content Sheet */}
            <div
                ref={contentRef}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
                className="absolute top-[100px] left-4 right-4 max-h-[calc(100vh-140px)] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Header with drag handle and close */}
                <div
                    className="sticky top-0 z-10 bg-white pt-4 pb-2 px-6 border-b border-gray-100"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('buttons.menu')}</span>
                        <div className="flex items-center gap-2">
                            <LanguageSwitcher />
                            <button
                                ref={firstFocusableRef}
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-6 pb-32">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item, idx) => (
                            <div key={idx} className="border-b border-gray-100 last:border-0">
                                {/* Direct link (no dropdown) */}
                                {item.href && !item.links ? (
                                    <Link
                                        to={item.href}
                                        onClick={onClose}
                                        className="flex items-center justify-between py-4 text-lg font-bold text-gray-900 hover:text-primary transition-colors"
                                    >
                                        {item.labelKey ? t(item.labelKey) : item.label}
                                    </Link>
                                ) : (
                                    <>
                                        {/* Accordion Header */}
                                        <button
                                            onClick={() => toggleSection(idx)}
                                            className="w-full flex items-center justify-between py-4 text-lg font-bold text-gray-900"
                                            aria-expanded={expandedSection === idx}
                                        >
                                            {item.labelKey ? t(item.labelKey) : item.label}
                                            <ChevronDown
                                                size={20}
                                                className={`text-gray-400 transition-transform duration-300 ${expandedSection === idx ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Accordion Content */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-out ${expandedSection === idx ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
                                        >
                                            <div className="grid gap-2 pl-2">
                                                {item.links?.map((link, linkIdx) => (
                                                    <Link
                                                        key={linkIdx}
                                                        to={link.href}
                                                        onClick={onClose}
                                                        ref={(el) => { if (el) linksRef.current[idx * 10 + linkIdx] = el; }}
                                                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/10 text-gray-800 font-medium transition-colors group"
                                                    >
                                                        {link.icon && (
                                                            <div className="p-2 rounded-lg bg-white shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                                <link.icon size={18} />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <span className="font-bold">{link.labelKey ? t(link.labelKey) : link.label}</span>
                                                            {(link.descriptionKey || link.description) && (
                                                                <p className="text-xs text-gray-500 mt-0.5">{link.descriptionKey ? t(link.descriptionKey) : link.description}</p>
                                                            )}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fixed Bottom CTA */}
                <div className="sticky bottom-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
                    <Link
                        ref={lastFocusableRef}
                        to={NAV_CTA.href}
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-primary/90 transition-all active:scale-98"
                    >
                        {NAV_CTA.icon && <NAV_CTA.icon size={20} />}
                        {t('buttons.start')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

