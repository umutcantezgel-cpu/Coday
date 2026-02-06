import React, { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import CardNav from '../navigation/CardNav';
import { navItems } from '../navigation/config'; // Assumption: config exists
// ChatWidget lazy loaded below
import { CookieConsentBanner, CookieSettingsModal } from '../cookie';
import { FloatingActionMenu } from '../floating-menu/FloatingActionMenu';

const Footer = lazy(() => import('./Footer'));
const ChatWidget = lazy(() => import('../chatbot').then(module => ({ default: module.ChatWidget })));

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
      <CardNav items={navItems} />

      {/* Spacer for fixed nav */}
      <div className="h-24" />

      <main className="flex-grow pb-20 lg:pb-0">
        {children}
      </main>

      <Suspense fallback={<div className="h-24 bg-secondary" />}>
        <div className="pb-24 lg:pb-0">
          <Footer />
        </div>
      </Suspense>

      {/* AI Chatbot Widget */}
      <Suspense fallback={null}>
        <ChatWidget hideTrigger={true} />
      </Suspense>

      {/* Unified Floating Menu */}
      <FloatingActionMenu />

      <CookieConsentBanner />
      <CookieSettingsModal />
    </div>
  );
};
