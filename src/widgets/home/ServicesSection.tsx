import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import BlurText from '@/shared/ui/BlurText';
import { MagicBento, BentoCard } from '@/shared/ui/MagicBento';
import dynamic from 'next/dynamic';
import { FadeInUp } from '@/shared/ui/MotionWrappers';
import { Code, Palette, RocketLaunch, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const ServicesSection: React.FC = () => {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  const services = [
    {
      id: 'web_dev',
      icon: Code,
      color: 'bg-blue-500',
      link: '/services/web-development',
      effect: 'spotlight' as const,
    },
    {
      id: 'web_design',
      icon: Palette,
      color: 'bg-purple-500',
      link: '/services/web-design',
      effect: 'glow' as const,
    },
    {
      id: 'growth',
      icon: RocketLaunch,
      color: 'bg-emerald-500',
      link: '/services/seo',
      effect: 'spotlight' as const,
    },
  ];

  return (
    <section className="py-[var(--space-section)] bg-background-light relative overflow-hidden">
      <div className="absolute top-0 end-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 start-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center lg:text-start mb-20 max-w-3xl">
          <FadeInUp
            duration={0.5}
            className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-5 inline-block"
          >
            {t('services.label', { defaultValue: 'Unsere Leistungen' })}
          </FadeInUp>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-secondary mb-8 leading-[1.1]">
            <BlurText
              text={t('services.title_prefix', { defaultValue: 'Wir bieten' })}
              delay={80}
              animateBy="words"
              className="inline"
            />{' '}
            <span className="text-primary block sm:inline mt-2 sm:mt-0">
              {t('services.title_suffix', { defaultValue: 'Premium Services.' })}
            </span>
          </h2>
        </div>

        <MagicBento columns={3} gap={32} className="mx-auto">
          {services.map((service, index) => (
            <FadeInUp key={service.id} delay={index * 0.15} duration={0.6} className="h-full">
              <BentoCard
                effect={service.effect}
                spotlightColor="rgba(20, 122, 122, 0.15)"
                glowColor="rgba(139, 92, 246, 0.3)"
                className="h-full border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/20 transition motion-reduce:duration-[0.01ms] duration-500 ease-out bg-white rounded-2xl md:aspect-[1/1.618]"
              >
                <div className="group relative p-6 md:p-8 flex flex-col h-full">
                  <div
                    className={`absolute top-0 end-0 w-32 h-32 ${service.color} opacity-[0.03] rounded-bl-[100px] rtl:rounded-br-[100px] rtl:rounded-bl-none transition-transform motion-reduce:duration-[0.01ms] duration-700 ease-out group-hover:scale-[1.3] group-hover:opacity-[0.06]`}
                  ></div>

                  <div className="relative z-10 flex-grow">
                    <div
                      className={`w-14 h-14 ${service.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 transition motion-reduce:duration-[0.01ms] duration-500 group-hover:scale-110 group-hover:bg-opacity-20 group-hover:-rotate-3 shadow-sm`}
                    >
                      <OptimizedIcon
                        icon={service.icon}
                        weight="duotone"
                        className={`text-3xl ${service.color.replace('bg-', 'text-')}`}
                      />
                    </div>

                    <p
                      className="font-display font-bold text-xl md:text-2xl text-secondary mb-3 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms] duration-300 break-words hyphens-auto"
                      lang="de"
                    >
                      <Link
                        href={service.link}
                        className="before:absolute before:inset-0 before:z-30 hover:underline"
                      >
                        {t(`services.items.${service.id}.title`, { defaultValue: service.id })}
                      </Link>
                    </p>
                    <p className="text-base text-slate-600 mb-8 leading-[1.618] relative z-40">
                      {t(`services.items.${service.id}.description`, {
                        defaultValue: 'Beschreibung',
                      })}
                    </p>
                  </div>

                  <div className="flex items-center text-primary font-bold tracking-wide uppercase text-sm mt-auto transition motion-reduce:duration-[0.01ms] duration-300 group-hover:tracking-wider relative z-40">
                    {tCommon('actions.read_more')}
                    <OptimizedIcon
                      icon={ArrowRight}
                      weight="bold"
                      className="ms-3 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform motion-reduce:duration-[0.01ms] duration-300 ease-out"
                    />
                  </div>
                </div>
              </BentoCard>
            </FadeInUp>
          ))}
        </MagicBento>
      </div>
    </section>
  );
};
