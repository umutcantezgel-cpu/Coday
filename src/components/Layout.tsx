import React, { useState, Suspense, lazy } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavBar } from './shared/navigation';
import { ChatWidget } from '../widgets/chatbot';
import { WhatsAppButton } from '../widgets/whatsapp';
import { CookieConsentBanner, CookieSettingsModal } from '../widgets/cookie';
import { Icon } from './shared/ui/Icon';

const Footer = lazy(() => import('./layout/Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

import { Helmet } from 'react-helmet-async';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return <>{children}</>;

  return (
    <div className="font-sans text-text-light bg-background-light min-h-screen flex flex-col">
      <Helmet>
        <title>Coday | Der Agentur-Killer</title>
        <meta name="description" content="Wir beenden Ineffizienz. High-End Webentwicklung & Design für Agenturen und Unternehmen." />
        <meta name="theme-color" content="#5227FF" />
        <link rel="canonical" href={`https://coday.de${location.pathname}`} />
      </Helmet>
      {/* World Class Navigation */}
      <NavBar />

      {/* Spacer for fixed nav */}
      <div className="h-24" />

      <main className="flex-grow pb-20 lg:pb-0">
        {children}
      </main>

      <Suspense fallback={<div className="h-24 bg-secondary" />}>
        <Footer />
      </Suspense>

      {/* AI Chatbot Widget */}
      <ChatWidget />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Cookie Consent */}
      <CookieConsentBanner />
      <CookieSettingsModal />
    </div>
  );
};

// Helper Components for Mobile Menu
const MobileLink = ({ to, label, onClick }: { to: string, label: string, onClick: () => void }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `block text-2xl font-bold ${isActive ? 'text-primary' : 'text-gray-800'}`}
    onClick={onClick}
  >
    {label}
  </NavLink>
);

const MobileSection = ({ title, items, onItemClick }: { title: string, items: any[], onItemClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>


      <button
        className="flex items-center justify-between w-full text-lg font-bold text-gray-400 mb-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <Icon
          name="expand_more"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`space-y-4 pl-4 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        {items.map((item, i) => (
          <NavLink
            key={i}
            to={item.href}
            className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg active:bg-gray-50 bg-transparent"
            onClick={onItemClick}
          >
            <Icon name={item.icon || 'circle'} className="text-gray-400" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}