import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { useCalculatorStore } from '../features/calculator/model/store';
import { ModuleCard } from '../features/calculator/ui/ModuleCard';
import { CalculatorSummary } from '../features/calculator/ui/Summary';
import { modules, ModuleCategory } from '../data/modules';
import StepIndicator from '../shared/ui/StepIndicator';
import { ArrowRight } from '@phosphor-icons/react';

const Calculator: React.FC = () => {
  const { t, i18n } = useTranslation('calculator');
  const selectedModuleIds = useCalculatorStore((state) => state.selectedModuleIds);
  const selectedPackageId = useCalculatorStore((state) => state.selectedPackageId);
  const toggleModule = useCalculatorStore((state) => state.toggleModule);
  const setStep = useCalculatorStore((state) => state.setStep);
  const navigate = useNavigate();

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
    navigate(`/${i18n.language}/contact`);
  };

  return (
    <div className="bg-background-light pt-24 pb-20">
      {/* Step Indicator */}
      <StepIndicator currentStep="calculator" className="mb-8" />
      {/* Hero */}
      <section className="text-center px-4 mb-12 max-w-4xl mx-auto">
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
          {t('hero.label')}
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-gray-900 mb-6">
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
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedCount > 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {selectedCount > 0 ? (
                          selectedCount
                        ) : (
                          <Icon name="chevron_right" className="text-xs" />
                        )}
                      </div>
                      <div className="text-left">
                        <h2 className="font-display font-bold text-lg text-gray-900">
                          {t(`categories.${category}`)}
                        </h2>
                        {selectedCount > 0 && (
                          <p className="text-xs text-primary font-medium mt-0.5">
                            {t('module_count', { count: selectedCount })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className={`transform transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <Icon name="expand_more" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
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
          <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">
            {t('hero.satisfied')}
          </h3>
          <p className="text-gray-600 mb-6">{t('hero.next_step')}</p>
          <button
            onClick={handleContinueToContact}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wide"
          >
            {t('hero.continue')}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
