import React, { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

const BathermDe = lazy(() => import('../../../content/case-studies/batherm.de.mdx'));
const BathermEn = lazy(() => import('../../../content/case-studies/batherm.en.mdx'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
