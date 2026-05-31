import React from 'react';

import MobileReadyNav from '@/widgets/navigation/MobileReadyNav';
import dynamic from 'next/dynamic';
const Footer = dynamic(() => import('@/widgets/layout/Footer').then((mod) => mod.Footer), {
  ssr: true,
});
import { RouteAnnouncer } from '@/shared/ui/RouteAnnouncer';
import { ConditionalWrapper } from './ConditionalWrapper';
import { PageTransition } from '@/widgets/layout/PageTransition';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ConditionalWrapper>
      <MobileReadyNav />
      <RouteAnnouncer />

      {/* Spacer for fixed nav */}
      <div className="h-24" />

      <main role="main" id="main-content" className="flex-grow pb-20 lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>

      <div className="pb-24 lg:pb-0">
        <Footer />
      </div>
    </ConditionalWrapper>
  );
};

export default Layout;
