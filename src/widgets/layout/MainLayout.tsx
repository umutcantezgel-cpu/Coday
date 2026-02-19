import React, { Suspense, lazy } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Lazy-load ALL non-critical layout components for performance
const MobileReadyNav = lazy(() => import('../navigation/MobileReadyNav'));
const FloatingActionMenu = lazy(() =>
  import('../floating-menu/FloatingActionMenu').then((m) => ({ default: m.FloatingActionMenu }))
);

const Footer = lazy(() => import('./Footer'));
const ChatWidget = lazy(() =>
  import('../chatbot').then((module) => ({ default: module.ChatWidget }))
);
const CookieConsentBanner = lazy(() => import('../cookie/CookieConsentBanner'));

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return <>{children || <Outlet />}</>;

  return (
    <HelmetProvider>
      <div className="font-sans text-text-light bg-background-light min-h-screen flex flex-col">
        {/* Navigation — lazy loaded, static shell placeholder prevents CLS */}
        <Suspense
          fallback={
            <nav
              className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50"
              aria-label="Navigation placeholder"
            />
          }
        >
          <MobileReadyNav />
        </Suspense>

        {/* Spacer for fixed nav */}
        <div className="h-24" />

        <main id="main-content" className="flex-grow pb-20 lg:pb-0">
          {children || <Outlet />}
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
        <Suspense fallback={null}>
          <FloatingActionMenu />
        </Suspense>

        <Suspense fallback={null}>
          <CookieConsentBanner />
        </Suspense>
      </div>
    </HelmetProvider>
  );
};

export default Layout;
