import React, { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

const BathermDe = lazy(() => import('@/shared/content/case-studies/batherm.de.mdx'));
const BathermEn = lazy(() => import('@/shared/content/case-studies/batherm.en.mdx'));

import { Skeleton } from '@/shared/ui/Skeleton';

const PageLoader = () => (
  <div className="min-h-dvh p-8 max-w-4xl mx-auto space-y-8">
    <Skeleton className="h-12 w-3/4" />
    <Skeleton className="h-96 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-4 w-4/6" />
  </div>
);

const BathermWrapper: React.FC = () => {
  const { i18n } = useTranslation();
  const Component = i18n.language === 'de' ? BathermDe : BathermEn;

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

export default BathermWrapper;
