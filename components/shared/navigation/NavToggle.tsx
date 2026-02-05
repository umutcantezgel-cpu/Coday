import React from 'react';

interface NavToggleProps {
    isOpen: boolean;
    toggle: () => void;
    color?: string;
}

export const NavToggle: React.FC<NavToggleProps> = ({ isOpen, toggle, color = 'currentColor' }) => {
    return (
        <button
            onClick={toggle}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-black/5 active:bg-black/10 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ color }}
        >
            <div className="relative w-6 h-4">
                <span
                    className={`absolute left-0 w-full h-0.5 bg-current rounded-full transform transition-all duration-300 ease-out origin-center ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                        }`}
                />
                <span
                    className={`absolute left-0 w-full h-0.5 bg-current rounded-full transform transition-all duration-300 ease-out origin-center ${isOpen ? 'opacity-0 scale-x-0' : 'top-1/2 -translate-y-1/2 opacity-100'
                        }`}
                />
                <span
                    className={`absolute left-0 w-full h-0.5 bg-current rounded-full transform transition-all duration-300 ease-out origin-center ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                        }`}
                />
            </div>
        </button>
    );
};
