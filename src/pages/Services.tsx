import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Code, Palette, ArrowRight } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { LocalizedNavLink as NavLink } from '../shared/ui/LocalizedLink';
import { OptimizedImage } from '../shared/ui/OptimizedImage';
import { serviceImages } from '@/shared/data/serviceImages';
import ScrollFloat from '../shared/ui/ScrollFloat';
import { cn } from '../shared/lib/utils';
import { baseButtonStyles, buttonVariants, buttonSizes } from '../shared/ui/ButtonStyles';
// Premium UI Components
import RotatingText from '../shared/ui/RotatingText';
import { MagicBento, BentoCard } from '../shared/ui/MagicBento';
import GlareHover from '../shared/ui/GlareHover';

const Services: React.FC = () => {
  const { t } = useTranslation(['services', 'common']);

  const categories = [
    {
      icon: Code,
      title: t('categories.web_development.title'),
      description: t('categories.web_development.description'),
      link: '/services/web-development',
      color: 'bg-blue-500',
      imageKey: 'development',
      effect: 'spotlight' as const,
    },
    {
      icon: Palette,
      title: t('categories.web_design.title'),
      description: t('categories.web_design.description'),
      link: '/services/web-design',
      color: 'bg-purple-500',
      imageKey: 'webdesign',
      effect: 'glow' as const,
    },
  ];

  return (
    <div className="bg-background-light">
      {/* Header with Hero Image */}
      <section className="pt-12 pb-8 md:pt-24 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-start">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('hero.label')}
            </span>
            <ScrollFloat
              animationDuration={0.8}
              ease="back.out(1.7)"
              scrollStart="top bottom"
              scrollEnd="center center"
              stagger={0.02}
              containerClassName="!my-0 mb-4"
              textClassName="font-display font-black text-4xl sm:text-6xl text-secondary"
            >
              {t('hero.title')}
            </ScrollFloat>
            <div className="max-w-2xl">
              <RotatingText
                texts={t('hero.rotating', { returnObjects: true }) as string[]}
                rotationInterval={3500}
                staggerFrom="first"
                staggerDuration={0.025}
                mainClassName="text-xl text-slate-600 leading-relaxed"
              />
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-2"></div>
            <OptimizedImage
              src={serviceImages.hero.src}
              alt={t(serviceImages.hero.alt)}
              className="relative rounded-3xl shadow-flat-lg w-full transform -rotate-1 hover:rotate-0 transition-all duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories Grid with MagicBento */}
      <section className="pb-12 md:pb-24 px-4 sm:px-6 lg:px-8">
        <MagicBento columns={2} gap={32} className="max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <BentoCard
              key={index}
              effect={cat.effect}
              spotlightColor="rgba(20, 122, 122, 0.15)"
              glowColor="rgba(139, 92, 246, 0.3)"
              className="h-full"
            >
              <NavLink to={cat.link} className="group relative p-10 block h-full">
                {/* Decorative Background Image */}
                <div className="absolute top-0 end-0 w-64 h-64 opacity-5 transform translate-x-12 rtl:-translate-x-12 -translate-y-12 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 rounded-bl-full rtl:rounded-br-full rtl:rounded-bl-none overflow-hidden pointer-events-none">
                  {serviceImages[cat.imageKey || 'hero'] && (
                    <OptimizedImage
                      src={serviceImages[cat.imageKey || 'hero'].src}
                      alt=""
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>
                <div
                  className={`absolute top-0 end-0 w-32 h-32 ${cat.color} opacity-5 rounded-bl-full rtl:rounded-br-full rtl:rounded-bl-none group-hover:scale-110 transition-transform duration-500`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 ${cat.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <OptimizedIcon icon={cat.icon} className="text-3xl text-secondary" />
                  </div>

                  <h3 className="font-display font-bold text-3xl text-secondary mb-4 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">{cat.description}</p>

                  <div className="flex items-center text-primary font-bold tracking-wide uppercase text-sm">
                    {t('cta.more')}
                    <OptimizedIcon
                      icon={ArrowRight}
                      className="ms-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </NavLink>
            </BentoCard>
          ))}
        </MagicBento>
      </section>

      {/* CTA with GlareHover */}
      <section className="py-12 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <ScrollFloat
            animationDuration={0.8}
            ease="back.out(1.7)"
            scrollStart="top bottom"
            scrollEnd="center center"
            stagger={0.02}
            containerClassName="!my-0 mb-8"
            textClassName="font-display font-bold text-3xl text-secondary"
          >
            {t('cta.ready')}
          </ScrollFloat>
          <GlareHover glareColor="#ffffff" glareOpacity={0.4} className="inline-block rounded-xl">
            <NavLink
              to="/contact"
              className={cn(baseButtonStyles, buttonVariants.primary, buttonSizes.lg)}
            >
              {t('cta.button')}
              <OptimizedIcon icon={ArrowRight} className="ms-2 rtl:rotate-180" />
            </NavLink>
          </GlareHover>
        </div>
      </section>
    </div>
  );
};

export default Services;
