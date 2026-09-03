import React from 'react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('common');

  return (
    <ConditionalWrapper>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary-700 focus:text-white focus:rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
      >
        {t('skipLink')}
      </a>
      <MobileReadyNav />
      <RouteAnnouncer />

      {/* Spacer for fixed nav */}
      <div className="h-20 md:h-24" />

      <main id="main-content" className="flex-grow pb-20 lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer />
    </ConditionalWrapper>
  );
};

export default Layout;
