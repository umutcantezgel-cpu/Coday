import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Icon } from '../../shared/ui/Icon';

interface DropdownItem {
    label: string;
    href: string;
    icon?: string;
}

interface NavDropdownProps {
    title: string;
    items: DropdownItem[];
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150); // Small delay to prevent flickering
    };

    return (
        <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={`flex items-center space-x-1 text-sm font-medium transition-colors py-2
          ${isOpen ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
                <span>{title}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 transition-all duration-200 origin-top
          ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-50/50 overflow-hidden p-2 ring-1 ring-black/5">
                    {items.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.href}
                            className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-slate-50 hover:text-gray-900'}
              `}
                            onClick={() => setIsOpen(false)} // Close on click
                        >
                            {item.icon && (
                                <Icon
                                    name={item.icon}
                                    className={`text-[20px] ${item.href === window.location.pathname ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}
                                />
                            )}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};
