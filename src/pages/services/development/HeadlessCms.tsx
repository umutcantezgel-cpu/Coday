/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../shared/ui/Icon';
import { Button } from '../../../shared/ui/Button';
import { SeoHead } from '../../../shared/ui/SeoHead';
import { MagicBento, BentoCard } from '../../../shared/ui/MagicBento';
import GlareHover from '../../../shared/ui/GlareHover';
import LogoLoop from '../../../shared/ui/LogoLoop';
import { motion } from 'framer-motion';

const HeadlessCms: React.FC = () => {
  const { t } = useTranslation('services');

  return (
    <>
      <SeoHead
        title="Headless CMS Development | Sanity, Contentful & Strapi"
        description="Future-proof your content. We build scalable Headless CMS architectures with Next.js that give you total freedom and blazing speed."
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-background-light">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/5 text-secondary text-sm font-bold mb-8 border border-secondary/10">
              <Icon name="database" className="w-4 h-4" />
              <span>Content Infrastructure</span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary mb-8 leading-[0.9]">
              {t('headless_cms_page.hero.title_prefix')}
              <br />
              <span className="text-primary">{t('headless_cms_page.hero.title_suffix')}</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
              {t('headless_cms_page.hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary" rightIcon={<Icon name="arrow_right" />}>
                {t('headless_cms_page.hero.cta')}
              </Button>
              <Button size="lg" variant="outline">
                View Case Studies
              </Button>
            </div>
          </div>

          {/* Visual: Abstract Content Connection */}
          <div className="relative">
            <GlareHover className="rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 p-8">
              <div className="flex justify-between items-center mb-12">
                <div className="text-white font-mono text-sm opacity-50">Content Source</div>
                <div className="text-white font-mono text-sm opacity-50">Channels</div>
              </div>

              <div className="flex items-center justify-between relative">
                {/* Source Node */}
                <div className="w-24 h-24 bg-primary/20 rounded-2xl border border-primary/50 flex items-center justify-center relative z-10">
                  <Icon name="files" className="text-4xl text-primary" />
                  <div className="absolute -bottom-8 text-white font-bold text-sm">Sanity.io</div>
                </div>

                {/* Connection Lines (Animated SVG would go here, simplified for code) */}
                <div className="h-1 flex-1 bg-gradient-to-r from-primary to-blue-500 opacity-50 mx-4 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-8 bg-white/50 blur-sm"
                    animate={{ x: ['0%', '500%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>

                {/* Output Nodes */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl border border-blue-500/50 flex items-center justify-center">
                      <Icon name="globe" className="text-xl text-blue-400" />
                    </div>
                    <span className="text-white text-sm font-bold">Web</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl border border-purple-500/50 flex items-center justify-center">
                      <Icon name="device_mobile" className="text-xl text-purple-400" />
                    </div>
                    <span className="text-white text-sm font-bold">App</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl border border-green-500/50 flex items-center justify-center">
                      <Icon name="watch" className="text-xl text-green-400" />
                    </div>
                    <span className="text-white text-sm font-bold">IoT</span>
                  </div>
                </div>
              </div>
            </GlareHover>
          </div>
        </div>
      </section>

      {/* Why Headless - Bento Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-6">{t('headless_cms_page.why_headless.title')}</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">{t('headless_cms_page.why_headless.description')}</p>
          </div>

          <MagicBento className="grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <BentoCard
              className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
              title={t('headless_cms_page.why_headless.items.omnichannel.title')}
              description={t('headless_cms_page.why_headless.items.omnichannel.desc')}
            >
              <div className="absolute right-4 top-4 opacity-20">
                <Icon name="share_network" className="text-6xl text-primary" />
              </div>
            </BentoCard>
            <BentoCard
              className="md:col-span-1 md:row-span-1 bg-slate-50"
              title={t('headless_cms_page.why_headless.items.performance.title')}
              description={t('headless_cms_page.why_headless.items.performance.desc')}
            >
              <div className="absolute right-4 top-4 opacity-20">
                <Icon name="lightning" className="text-6xl text-yellow-500" />
              </div>
            </BentoCard>
            <BentoCard
              className="md:col-span-1 md:row-span-1 bg-slate-50"
              title={t('headless_cms_page.why_headless.items.security.title')}
              description={t('headless_cms_page.why_headless.items.security.desc')}
            >
              <div className="absolute right-4 top-4 opacity-20">
                <Icon name="shield_check" className="text-6xl text-green-500" />
              </div>
            </BentoCard>
            <BentoCard
              className="md:col-span-2 md:row-span-1 bg-slate-900 text-white"
              title={t('headless_cms_page.why_headless.items.dev_friendly.title')}
              description={t('headless_cms_page.why_headless.items.dev_friendly.desc')}
            >
              <div className="absolute right-4 top-4 opacity-20">
                <Icon name="code" className="text-6xl text-blue-400" />
              </div>
            </BentoCard>
          </MagicBento>
        </div>
      </section>

      {/* CMS Comparison */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">{t('headless_cms_page.cms_comparison.title')}</h2>
            <p className="text-xl text-slate-600">{t('headless_cms_page.cms_comparison.description')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sanity */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-[#F03E2F]/10 text-[#F03E2F] text-xs font-bold px-3 py-1 rounded-bl-xl">
                {t('headless_cms_page.cms_comparison.sanity.badge')}
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Sanity.io
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('headless_cms_page.cms_comparison.sanity.desc')}
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-500">
                <li className="flex gap-2 items-center"><Icon name="check" className="text-green-500 w-4 h-4" /> GROQ Query Language</li>
                <li className="flex gap-2 items-center"><Icon name="check" className="text-green-500 w-4 h-4" /> Real-time Collab</li>
                <li className="flex gap-2 items-center"><Icon name="check" className="text-green-500 w-4 h-4" /> Customizable Studio</li>
              </ul>
            </div>

            {/* Contentful */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                {t('headless_cms_page.cms_comparison.contentful.badge')}
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Contentful
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {t('headless_cms_page.cms_comparison.contentful.desc')}
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-400">
                <li className="flex gap-2 items-center"><Icon name="check" className="text-blue-400 w-4 h-4" /> Enterprise Grade SLA</li>
                <li className="flex gap-2 items-center"><Icon name="check" className="text-blue-400 w-4 h-4" /> Strict Content Models</li>
                <li className="flex gap-2 items-center"><Icon name="check" className="text-blue-400 w-4 h-4" /> Global CDN</li>
              </ul>
            </div>

            {/* Strapi */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-purple-500/10 text-purple-600 text-xs font-bold px-3 py-1 rounded-bl-xl">
                {t('headless_cms_page.cms_comparison.strapi.badge')}
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Strapi
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('headless_cms_page.cms_comparison.strapi.desc')}
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-500">
                <li className="flex gap-2 items-center"><Icon name="check" className="text-green-500 w-4 h-4" /> Self-Hosted</li>
                <li className="flex gap-2 items-center"><Icon name="check" className="text-green-500 w-4 h-4" /> REST & GraphQL</li>
                <li className="flex gap-2 items-center"><Icon name="check" className="text-green-500 w-4 h-4" /> 100% Data Control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Loop */}
      <section className="py-16 bg-white overflow-hidden">
        <LogoLoop
          logos={[
            { node: <span className="text-2xl font-bold text-slate-400">Sanity</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Contentful</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Strapi</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Storyblok</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Next.js</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Vercel</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Cloudinary</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Algolia</span> },
          ]}
          speed={30}
          direction="left"
        />
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background-light">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('headless_cms_page.faq.title')}</h2>
          <div className="space-y-6">
            {(() => {
              const faqItems = t('headless_cms_page.faq.items', { returnObjects: true });
              if (!Array.isArray(faqItems)) return null;

              return faqItems.map((item: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeadlessCms;
