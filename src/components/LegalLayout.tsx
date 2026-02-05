import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface TocItem {
    id: string;
    label: string;
}

interface LegalLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: React.ReactNode;
    lastUpdated?: string;
    tocItems?: TocItem[];
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({
    children,
    title,
    subtitle,
    lastUpdated,
    tocItems = []
}) => {
    const [activeId, setActiveId] = useState<string>('');

    // Handle Smooth Scroll preventing Router Check
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 120; // Header height + padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveId(id);
        }
    };

    // Active Scroll Spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        tocItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [tocItems]);

    const legalLinks = [
        { label: 'AGB', href: '/legal/agb' },
        { label: 'Datenschutz', href: '/legal/datenschutz' },
        { label: 'Impressum', href: '/legal/impressum' },
    ];

    return (
        <div className="pt-12 pb-24 relative min-h-screen bg-aurora-white">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl dark:bg-primary/10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl dark:bg-blue-400/10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Sidebar */}
                    <div className="lg:col-span-3 lg:sticky lg:top-28 space-y-8">

                        {/* Rechtliches Navigation */}
                        <div className="glass-card rounded-2xl p-2 shadow-glass bg-white/80 backdrop-blur-md border border-gray-100">
                            <div className="px-4 py-4 flex items-center space-x-3 mb-2 border-b border-gray-100 dark:border-gray-700/50">
                                <div className="bg-primary text-white p-1.5 rounded-md">
                                    <span className="material-symbols-outlined text-lg">gavel</span>
                                </div>
                                <span className="font-display font-bold text-gray-900">Rechtliches</span>
                            </div>
                            <nav className="flex flex-col space-y-1">
                                {legalLinks.map((link) => (
                                    <NavLink
                                        key={link.href}
                                        to={link.href}
                                        className={({ isActive }) =>
                                            `px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 block
                      ${isActive
                                                ? 'text-primary bg-primary/5 border-l-4 border-primary shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50 hover:pl-5'
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        {/* Table of Contents */}
                        {tocItems.length > 0 && (
                            <div className="glass-card rounded-2xl p-6 shadow-glass bg-white/80 backdrop-blur-md border border-gray-100 hidden lg:block">
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="material-symbols-outlined text-gray-400">list</span>
                                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-500">Inhaltsverzeichnis</h3>
                                </div>
                                <nav>
                                    <ul className="space-y-1 relative">
                                        {/* Active Indicator Line */}
                                        <div className="absolute left-0 w-0.5 bg-gray-200 h-full rounded-full" />

                                        {tocItems.map((item) => (
                                            <li key={item.id} className="relative pl-4 group">
                                                {/* Dynamic Active Marker */}
                                                <div
                                                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-full transition-all duration-300 rounded-full
                           ${activeId === item.id ? 'bg-primary scale-y-100 opacity-100' : 'bg-transparent scale-y-0 opacity-0'}`}
                                                />
                                                <a
                                                    href={`#${item.id}`}
                                                    onClick={(e) => scrollToSection(e, item.id)}
                                                    className={`text-sm transition-all duration-200 block py-1.5 leading-snug
                            ${activeId === item.id
                                                            ? 'text-primary font-semibold translate-x-1'
                                                            : 'text-gray-500 hover:text-gray-900'}`
                                                    }
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-9">
                        <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-glass bg-white/85 backdrop-blur-md border border-gray-100 relative overflow-hidden">
                            {/* Abstract Header Visual */}
                            <div className="absolute top-0 right-0 w-full h-48 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
                            <div className="absolute -top-20 -right-20 w-96 h-96 opacity-10 pointer-events-none rotate-12">
                                <img
                                    src="/images/industries/buchhaltung-raum.webp"
                                    alt=""
                                    className="w-full h-full object-cover rounded-full blur-sm"
                                />
                            </div>

                            <div className="mb-10 text-center lg:text-left relative z-10">
                                <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4 tracking-tight">
                                    {title} {subtitle}
                                </h1>
                                {lastUpdated && (
                                    <p className="text-sm font-medium text-aurora-sapphire uppercase tracking-wide">
                                        Stand: {lastUpdated}
                                    </p>
                                )}
                            </div>

                            <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                                {children}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
