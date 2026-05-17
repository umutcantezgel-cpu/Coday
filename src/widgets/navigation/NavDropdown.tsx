import React, { useState, useRef, useId } from 'react';
import { NavLink } from 'react-router-dom';
import { CaretDown } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface NavDropdownProps {
  title: string;
  items: DropdownItem[];
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuId = useId();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        className={`flex items-center space-x-1 text-sm font-medium transition-colors py-2
          ${isOpen ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <CaretDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      <div
        id={menuId}
        role="menu"
        aria-label={title}
        className={`absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 transition-all duration-200 origin-top
          ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-50/50 overflow-hidden p-2 ring-1 ring-black/5">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              role="menuitem"
              className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-slate-50 hover:text-gray-900'}
              `}
              onClick={() => setIsOpen(false)}
            >
              {item.icon && (
                <OptimizedIcon
                  icon={item.icon}
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
