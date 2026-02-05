import React from 'react';
import { NavigationMenu } from './desktop/NavigationMenu';
import { MobileNav } from './MobileNav';
import { NavToggle } from './NavToggle';
import { useNavState } from './useNavState';
import { MagneticButton } from '../ui/MagneticButton';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../LanguageSwitcher';

export const NavBar: React.FC = () => {
    const { isVisible, isScrolled, isMobileOpen, toggleMobileMenu, closeMobileMenu } = useNavState();

    return (
        <>
            {/* Floating Nav Container */}
            <header
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-7xl transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'
                    }`}
            >
                <div
                    className={`relative flex items-center justify-between px-4 py-3 rounded-full transition-all duration-300 ${isScrolled || isMobileOpen
                        ? 'bg-white/80 backdrop-blur-xl shadow-aurora-lg border border-white/20'
                        : 'bg-transparent'
                        }`}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 px-2 z-50">
                        <img
                            src="/images/brand/coday-wordmark.svg"
                            alt="Coday"
                            className="h-16 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <NavigationMenu />
                    </div>

                    {/* Actions & Mobile Toggle */}
                    <div className="flex items-center gap-2 z-50">
                        {/* Language Switcher */}
                        <div className="hidden sm:block">
                            <LanguageSwitcher />
                        </div>

                        <div className="lg:hidden">
                            <NavToggle
                                isOpen={isMobileOpen}
                                toggle={toggleMobileMenu}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <MobileNav
                isOpen={isMobileOpen}
                onClose={closeMobileMenu}
            />
        </>
    );
};
