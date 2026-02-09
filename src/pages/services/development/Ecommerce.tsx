import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../shared/ui/Icon';
import { Button } from '../../../shared/ui/Button';
import { OptimizedImage } from '../../../shared/ui/OptimizedImage';
import { SeoHead } from '../../../shared/ui/SeoHead';
import CountUp from '../../../shared/ui/CountUp';
import GlareHover from '../../../shared/ui/GlareHover';
import LogoLoop from '../../../shared/ui/LogoLoop';

const Ecommerce: React.FC = () => {
  const { t } = useTranslation('services');

  return (
    <>
      <SeoHead
        title="E-Commerce Development | Shopify & Next.js Experts"
        description="High-performance online shops that convert. We build scalable e-commerce solutions with Shopify Plus, Hydrogen, and Next.js."
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden bg-background-light">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-bold mb-8 border border-primary/10">
            <Icon name="shopping_cart" className="w-4 h-4" />
            <span>E-Commerce Experts</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-8 text-secondary uppercase">
            {t('ecommerce_page.hero.title_anim')}
            <br />
            <span className="text-primary">{t('ecommerce_page.hero.title_static')}</span>
          </h1>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl sm:text-2xl font-light text-slate-600 leading-relaxed">
              {t('ecommerce_page.hero.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" variant="primary" rightIcon={<Icon name="arrow_right" />}>
              {t('ecommerce_page.hero.cta_primary')}
            </Button>
            <Button size="lg" variant="outline" rightIcon={<Icon name="storefront" />}>
              {t('ecommerce_page.hero.cta_secondary')}
            </Button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative max-w-6xl mx-auto perspective-1000">
          <GlareHover className="rounded-2xl overflow-hidden shadow-2xl transform rotate-x-12">
            <OptimizedImage
              src="/images/services/ecommerce-dashboard-mockup.webp"
              alt="E-Commerce Dashboard"
              className="w-full h-auto"
            />
          </GlareHover>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-display font-bold text-primary mb-2">
              <CountUp from={0} to={250} duration={2} className="" />%
            </div>
            <div className="text-sm uppercase tracking-widest text-slate-400">
              {t('ecommerce_page.stats.conversion_label')}
            </div>
          </div>
          <div>
            <div className="text-5xl font-display font-bold text-primary mb-2">
              <CountUp from={0} to={0.5} duration={2} className="" />s
            </div>
            <div className="text-sm uppercase tracking-widest text-slate-400">
              {t('ecommerce_page.stats.load_time_label')}
            </div>
          </div>
          <div>
            <div className="text-5xl font-display font-bold text-primary mb-2">
              <CountUp from={0} to={100} duration={2} className="" />
            </div>
            <div className="text-sm uppercase tracking-widest text-slate-400">
              {t('ecommerce_page.stats.core_vitals_label')}
            </div>
          </div>
          <div>
            <div className="text-5xl font-display font-bold text-primary mb-2">
              Top 1%
            </div>
            <div className="text-sm uppercase tracking-widest text-slate-400">
              {t('ecommerce_page.stats.tech_label')}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section (Shopify vs Custom) */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">{t('ecommerce_page.comparison.title')}</h2>
            <p className="text-xl text-slate-600">{t('ecommerce_page.comparison.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Shopify Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#95BF47]/20 rounded-2xl flex items-center justify-center mb-6">
                <Icon name="shopping_bag" className="text-3xl text-[#95BF47]" weight="fill" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('ecommerce_page.comparison.shopify.title')}</h3>
              <ul className="space-y-4 mb-8">
                {(t('ecommerce_page.comparison.shopify.features', { returnObjects: true }) as string[]).map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-green-500 mt-1" weight="fill" />
                    <span className="text-slate-600">{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-slate-50 rounded-xl text-sm font-semibold text-slate-700">
                {t('ecommerce_page.comparison.shopify.recommendation')}
              </div>
            </div>

            {/* Custom Headless Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg border border-slate-800 hover:shadow-2xl transition-shadow transform md:-translate-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <Icon name="code" className="text-3xl text-primary" weight="fill" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('ecommerce_page.comparison.custom.title')}</h3>
              <ul className="space-y-4 mb-8">
                {(t('ecommerce_page.comparison.custom.features', { returnObjects: true }) as string[]).map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-primary mt-1" weight="fill" />
                    <span className="text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-slate-800 rounded-xl text-sm font-semibold text-primary-light">
                {t('ecommerce_page.comparison.custom.recommendation')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Logo Loop */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <span className="uppercase tracking-widest text-xs font-bold text-slate-400">Powering Next-Gen Commerce</span>
        </div>
        <LogoLoop
          logos={[
            { node: <span className="text-2xl font-bold text-slate-400">Shopify Plus</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Hydrogen</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Next.js Commerce</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Sanity.io</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Stripe</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Algolia</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Klaviyo</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Recharge</span> },
          ]}
          speed={40}
        />
      </section>

      {/* ROI Calculator Section (Mockup for now, fully interactive later if needed) */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6">
            {t('ecommerce_page.roi_calculator.label')}
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {t('ecommerce_page.roi_calculator.title')}
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            {t('ecommerce_page.roi_calculator.description')}
          </p>

          {/* Simple Visual Calculator Placeholder */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 text-left">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Monthly Visitors</label>
                <div className="text-4xl font-mono font-bold text-white">50,000</div>
                <input type="range" className="w-full mt-4 accent-primary" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Conversion Rate</label>
                <div className="text-4xl font-mono font-bold text-primary">2.5%</div>
                <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <Icon name="trending_up" weight="bold" /> +0.8% with Coday
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Avg. Order Value</label>
                <div className="text-4xl font-mono font-bold text-white">€85</div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm text-slate-400 mb-1">Estimated Monthly Revenue Increase</div>
                <div className="text-5xl font-display font-bold text-green-400">+ €34,000</div>
              </div>
              <Button size="lg" variant="primary" className="w-full md:w-auto">
                Get Your Audit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background-light">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2">How long does a typical shop migration take?</h3>
              <p className="text-slate-600">For Shopify Plus migrations, we typically need 4-8 weeks depending on data complexity.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2">Do you handle ERP integrations?</h3>
              <p className="text-slate-600">Yes, we are experts in connecting SAP, Microsoft Dynamics, and Weclapp to Shopify and custom frontends.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2">What about SEO during migration?</h3>
              <p className="text-slate-600">We guarantee zero traffic loss. Our migration protocols include comprehensive redirect maps and SEO monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white text-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 uppercase">
            {t('ecommerce_page.cta_section.title')}
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            {t('ecommerce_page.cta_section.description')}
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="primary" className="px-12 py-6 text-lg">
              {t('ecommerce_page.cta_section.button')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ecommerce;
