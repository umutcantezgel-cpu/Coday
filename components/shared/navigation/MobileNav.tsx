import React, { useEffect, useRef } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { navItems } from './config';
import { gsap } from 'gsap';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

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

            gsap.fromTo(linksRef.current.filter(Boolean),
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.2 }
            );

        } else {
            // Unlock body scroll
            document.body.style.overflow = '';

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

    // Touch / Swipe Logic
    const touchStart = useRef<number>(0);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.targetTouches[0].clientY;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        // Optional: Implement live dragging logic here (advanced)
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current) return;
        const touchEnd = e.changedTouches[0].clientY;
        const distance = touchEnd - touchStart.current;

        if (distance > minSwipeDistance) {
            // Swiped Down -> Close
            onClose();
        } else if (distance < -minSwipeDistance) {
            // Swiped Up -> Close (optional, usually drag up reveals more content, but closing on vigorous swipe up is also ok)
            // onClose(); 
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-40 hidden"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Content Sheet */}
            <div
                ref={contentRef}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
                className="absolute top-[80px] left-4 right-4 bottom-4 bg-white rounded-[2rem] shadow-2xl overflow-y-auto overflow-x-hidden p-6 touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Visual Drag Handle for Affordance */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

                <div className="flex flex-col gap-8 pb-10">
                    {navItems.map((item, idx) => (
                        <div key={idx} className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">
                                {item.label}
                            </h3>
                            <div className="grid gap-2">
                                {item.links.map((link, linkIdx) => (
                                    <Link
                                        key={linkIdx}
                                        to={link.href}
                                        onClick={onClose}
                                        ref={(el) => { if (el) linksRef.current[idx * 10 + linkIdx] = el; }}
                                        className="block p-4 rounded-xl bg-gray-50 text-gray-900 font-bold text-lg active:scale-95 transition-transform"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
