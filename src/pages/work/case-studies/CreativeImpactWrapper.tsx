import React, { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

const CreativeImpactDe = lazy(() => import('../../../content/case-studies/creative-impact.de.mdx'));
const CreativeImpactEn = lazy(() => import('../../../content/case-studies/creative-impact.en.mdx'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CreativeImpactWrapper: React.FC = () => {
  const { i18n } = useTranslation();
  const Component = i18n.language === 'de' ? CreativeImpactDe : CreativeImpactEn;

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

export default CreativeImpactWrapper;
