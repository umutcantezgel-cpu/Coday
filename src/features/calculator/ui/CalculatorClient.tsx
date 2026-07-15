'use client';

import React, { useEffect } from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CaretRight, CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from '@/i18n/navigation';

import { useCalculatorStore } from '@/features/calculator/model/store';
import { ModuleCard } from '@/features/calculator/ui/ModuleCard';
import { CalculatorSummary } from '@/features/calculator/ui/Summary';
import { modules, ModuleCategory } from '@/shared/data/modules';
import StepIndicator from '@/shared/ui/StepIndicator';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { SeoHead } from '@/shared/ui/SeoHead';
import { useBreadcrumbs } from '@/shared/hooks/useBreadcrumbs';

const Calculator: React.FC = () => {
  const t = useTranslations('calculator');
  // Note: i18n is not supported by next-intl directly in components like this.
  const selectedModuleIds = useCalculatorStore((state) => state.selectedModuleIds);
  const selectedPackageId = useCalculatorStore((state) => state.selectedPackageId);
  const toggleModule = useCalculatorStore((state) => state.toggleModule);
  const setStep = useCalculatorStore((state) => state.setStep);
  const navigate = useRouter();

  const [openCategories, setOpenCategories] = React.useState<Set<string>>(new Set(['basis']));

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Filter categories: Hide 'basis' if a package is selected
  const allCategories: ModuleCategory[] = [
    'basis',
    'commerce',
    'design',
    'function',
    'tech',
    'seo',
    'support',
  ];
  const categories = selectedPackageId ? allCategories.filter((c) => c !== 'basis') : allCategories;

  // Set step on mount
  useEffect(() => {
    setStep('calculator');
  }, [setStep]);

  const handleContinueToContact = () => {
    setStep('contact');
    navigate.push('/contact');
  };

  return (
    <div className="bg-background-light pt-24 pb-20">
      <SeoHead
        title={t('hero.title_1') + ' | Coday'}
        description={t('hero.subtitle_default')}
        breadcrumbs={useBreadcrumbs()}
        schemaData={{
          softwareApp: {
            name: 'Coday Projekt-Konfigurator',
            description:
              'Interactive web project cost calculator with modular configuration for web development projects.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { price: '0', priceCurrency: 'EUR' },
          },
        }}
      />
      {/* Step Indicator */}
      <StepIndicator currentStep="calculator" className="mb-8" />
      {/* Hero */}
      <section className="text-center px-4 mb-12 max-w-4xl mx-auto">
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
          {t('hero.label')}
        </span>
        <h1 className="block font-display font-black text-4xl sm:text-6xl text-gray-900 mb-6">
          {t('hero.title_1')} <br /> <span className="text-gradient">{t('hero.title_2')}</span>
        </h1>
        <p className="text-xl text-gray-600">
          {selectedPackageId ? t('hero.subtitle_packages') : t('hero.subtitle_default')}
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 text-left">
          {/* Main Configurator Area */}
          <div className="lg:col-span-8 space-y-4">
            {categories.map((category) => {
              const categoryModules = modules.filter((m) => m.category === category);
              if (categoryModules.length === 0) return null;

              const isOpen = openCategories.has(category);
              const selectedCount = categoryModules.filter((m) =>
                selectedModuleIds.has(m.id)
              ).length;

              return (
                <div
                  key={category}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition motion-reduce:duration-[0.01ms] duration-300"
                >
                  <button
                    onClick={() => toggleCategory(category)}
                    aria-expanded={isOpen}
                    aria-controls={`category-panel-${category}`}
                    className="active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors motion-reduce:duration-[0.01ms]"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedCount > 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {selectedCount > 0 ? (
                          selectedCount
                        ) : (
                          <OptimizedIcon icon={CaretRight} className="text-xs" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-display font-bold text-lg text-gray-900">
                          {t(`categories.${category}`)}
                        </p>
                        {selectedCount > 0 && (
                          <p className="text-xs text-primary font-medium mt-0.5">
                            {t('module_count', { count: selectedCount })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className={`transform transition-transform motion-reduce:duration-[0.01ms] duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <OptimizedIcon icon={CaretDown} />
                    </div>
                  </button>

                  <div
                    id={`category-panel-${category}`}
                    role="region"
                    aria-label={t(`categories.${category}`)}
                    className={isOpen ? 'block' : 'hidden'}
                  >
                    <div className="p-6 pt-0 border-t border-gray-50 bg-gray-50/30">
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        {categoryModules.map((module) => (
                          <ModuleCard
                            key={module.id}
                            module={module}
                            isSelected={selectedModuleIds.has(module.id)}
                            isIncluded={
                              (selectedPackageId === 'starter' &&
                                ['basis-starter'].includes(module.id)) ||
                              (selectedPackageId === 'professional' &&
                                ['basis-business'].includes(module.id)) ||
                              (selectedPackageId === 'enterprise' &&
                                ['basis-enterprise', 'commerce-headless', 'func-auth'].includes(
                                  module.id
                                ))
                            }
                            onToggle={() => toggleModule(module.id)}
                            disabled={
                              module.dependencies &&
                              !module.dependencies.every((dep) => selectedModuleIds.has(dep))
                            }
                            isRecommended={
                              module.isRecommended ||
                              (selectedPackageId === 'professional' && module.id === 'func-cms')
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28">
              <CalculatorSummary />
            </div>
          </div>
        </div>
      </div>

      {/* Continue to Contact CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 text-center border border-primary/10">
          <p className="font-display font-bold text-2xl text-gray-900 mb-2">
            {t('hero.satisfied')}
          </p>
          <p className="text-gray-600 mb-6">{t('hero.next_step')}</p>
          <button
            onClick={handleContinueToContact}
            className="active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition motion-reduce:duration-[0.01ms] duration-300 uppercase tracking-wide"
          >
            {t('hero.continue')}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <SeoContentBlock title={t('seoText.title')} text={t('seoText.content')} />
    </div>
  );
};

export default Calculator;
