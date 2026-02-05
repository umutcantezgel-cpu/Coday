import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Zap, BarChart2, Briefcase, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BottomNavProps {
    onOpenMenu: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenMenu }) => {
    const { t } = useTranslation('common');
    const location = useLocation();

    // Active check helper
    const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    const navItems = [
        {
            label: 'Home',
            icon: Home,
            href: '/',
        },
        {
            label: 'Services', // "Angebot"
            icon: Zap,
            href: '/services',
        },
        {
            label: 'Analyse', // Highlight
            icon: BarChart2,
            href: '/analyzer',
            isPrimary: true,
        },
        {
            label: 'Projekte', // "Work"
            icon: Briefcase,
            href: '/work',
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 pb-safe z-[9990] lg:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-around items-center h-[64px] px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive: active }) => `
                            flex flex-col items-center justify-center w-full h-full space-y-1
                            bg-transparent border-0 cursor-pointer
                            ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}
                            ${item.isPrimary ? '-mt-6' : ''}
                        `}
                    >
                        {item.isPrimary ? (
                            <div className="w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white transform transition-transform active:scale-95">
                                <item.icon size={24} strokeWidth={2.5} />
                            </div>
                        ) : (
                            <>
                                <item.icon size={24} strokeWidth={isActive(item.href) ? 2.5 : 2} className="transition-all transform active:scale-75 duration-200" />
                                <span className="text-[10px] font-medium leading-none">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}

                {/* Menu Trigger */}
                <button
                    onClick={onOpenMenu}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400 hover:text-gray-600 bg-transparent border-0"
                    aria-label="Menu"
                >
                    <Menu size={24} strokeWidth={2} />
                    <span className="text-[10px] font-medium leading-none">Menü</span>
                </button>
            </div>
            {/* Safe Area Spacer for iOS Home Indicator */}
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    );
};
