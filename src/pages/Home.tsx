import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OptimizedImage } from '../shared/ui/OptimizedImage';
import AgencyComparisonTable from '../features/analyzer/ui/AgencyComparisonTable';
import GradientText from '../shared/ui/GradientText';
import CountUp from '../shared/ui/CountUp';
import BlurText from '../shared/ui/BlurText';
import ScrollFloat from '../shared/ui/ScrollFloat';
// import { MdConstruction, MdApartment, MdShoppingCart, MdLightbulb, MdHealthAndSafety } from 'react-icons/md';
// Premium UI Components
import RotatingText from '../shared/ui/RotatingText';
import SpotlightCard from '../shared/ui/SpotlightCard';
import { MagicBento, BentoCard } from '../shared/ui/MagicBento';
import LogoLoop from '../shared/ui/LogoLoop';
import type { LogoItem } from '../shared/ui/LogoLoop';
import { cn } from '../shared/lib/utils';
import { baseButtonStyles, buttonVariants, buttonSizes } from '../shared/ui/Button';
import { Icon } from '../shared/ui/Icon';



const Home: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-40 lg:pt-48 lg:pb-60 overflow-hidden bg-background-light">
        {/* Organic Background Shapes */}
        <div className="absolute top-0 end-0 -translate-y-1/4 translate-x-1/4 rtl:-translate-x-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 start-0 translate-y-1/4 -translate-x-1/4 rtl:translate-x-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none animate-float"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="bg-white/80 backdrop-blur-md border border-white/50 text-secondary text-sm font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
              <span className="bg-primary text-white rounded-full p-0.5"><Icon name="rocket_launch" className="text-[14px]" /></span>
              {t('hero.badge')}
            </span>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-8 text-secondary uppercase drop-shadow-sm">
            {t('hero.headline_prefix')}<br className="hidden md:block" />
            <GradientText
              colors={['#1A9A9A', '#2D3748', '#1A9A9A']}
              animationSpeed={8}
              showBorder={false}
              className="inline-block"
            >
              {t('hero.headline_gradient')}
            </GradientText>
          </h1>
          <div className="max-w-3xl mx-auto mb-12">
            <RotatingText
              texts={t('hero.rotating', { returnObjects: true }) as string[]}
              rotationInterval={3000}
              staggerFrom="first"
              staggerDuration={0.03}
              mainClassName="text-xl sm:text-2xl font-light text-slate-700 leading-relaxed justify-center"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <NavLink
              to="/contact"
              className={cn(baseButtonStyles, buttonVariants.primary, buttonSizes.lg, "group relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 active:shadow-sm")}
            >
              <span className="relative z-10 flex items-center">
                {t('buttons.start_project', { ns: 'common' })}
                <ArrowRight className="ms-2 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </span>
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            </NavLink>

            <NavLink
              to="/work"
              className={cn(baseButtonStyles, buttonVariants.secondary, buttonSizes.lg, "group border border-gray-200 bg-white text-secondary hover:bg-gray-50 hover:border-primary/50 shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 active:shadow-sm")}
            >
              {t('buttons.view_work', { ns: 'common' })}
            </NavLink>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-20 mb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-flat-lg border border-gray-100/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
              <div className="px-4 text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                  <CountUp from={0} to={0.5} duration={1.5} className="" />s
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">{t('stats.load_time')}</div>
              </div>
              <div className="px-4 text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                  <CountUp from={0} to={100} duration={1.5} className="" />%
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">{t('stats.ownership')}</div>
              </div>
              <div className="px-4 text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                  <CountUp from={0} to={24} duration={1.5} className="" />h
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">{t('stats.availability')}</div>
              </div>
              <div className="px-4 text-center border-r-0">
                <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">{t('stats.profit')}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">{t('stats.focused')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <AgencyComparisonTable />

      {/* Philosophy Section */}
      <section className="py-12 md:py-24 bg-surface-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display font-black text-3xl lg:text-5xl mb-8 leading-tight text-secondary">
                <BlurText
                  text={t('philosophy.traditional')}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="block"
                />
                <span className="text-primary">{t('philosophy.history')}</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  {t('philosophy.text_overhead')}
                </p>
                <p>
                  <strong className="text-secondary font-bold">{t('philosophy.standard')}</strong> {t('philosophy.text_standard')}
                </p>
              </div>
            </div>
            <div className="relative">
              {/* Organic shape backdrop */}
              <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3 scale-95"></div>
              <OptimizedImage
                src="/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.jpeg"
                alt="Vertrauensvolle Zusammenarbeit"
                className="relative rounded-[2rem] shadow-flat-lg bg-white p-2 transform -rotate-2 hover:rotate-0 transition-all duration-500 w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diversity / Carousel Section */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-secondary mb-12 uppercase tracking-tight">
            <BlurText
              text={t('industries.title_prefix')}
              delay={80}
              animateBy="words"
              direction="bottom"
              className="inline"
            />{' '}
            <span className="text-primary">{t('industries.title_suffix')}</span>
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link to="/services/industries/handwerk" className="block h-full">
              <BentoCard effect="tilt" tiltMax={12} className="p-6 text-start h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <Icon name="construction" size="lg" className="text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary mb-2">{t('industries.card_craft.title')}</h3>
                <p className="text-sm text-slate-600">{t('industries.card_craft.desc')}</p>
              </BentoCard>
            </Link>
            <Link to="/services/industries/immobilien" className="block h-full">
              <BentoCard effect="glow" glowColor="rgba(26, 154, 154, 0.3)" className="p-6 text-start h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <Icon name="apartment" size="lg" className="text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary mb-2">{t('industries.card_realestate.title')}</h3>
                <p className="text-sm text-slate-600">{t('industries.card_realestate.desc')}</p>
              </BentoCard>
            </Link>
            <Link to="/services/industries/e-commerce" className="block h-full">
              <BentoCard effect="spotlight" spotlightColor="rgba(26, 154, 154, 0.15)" className="p-6 text-start h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <Icon name="shopping_cart" size="lg" className="text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary mb-2">{t('industries.card_shop.title')}</h3>
                <p className="text-sm text-slate-600">{t('industries.card_shop.desc')}</p>
              </BentoCard>
            </Link>
            <Link to="/services/industries/dienstleistung" className="block h-full">
              <BentoCard effect="tilt" tiltMax={12} className="p-6 text-start h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <Icon name="lightbulb" size="lg" className="text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary mb-2">{t('industries.card_consulting.title')}</h3>
                <p className="text-sm text-slate-600">{t('industries.card_consulting.desc')}</p>
              </BentoCard>
            </Link>
            <Link to="/services/industries/gesundheit" className="block h-full">
              <BentoCard effect="glow" glowColor="rgba(26, 154, 154, 0.3)" className="p-6 text-start h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <Icon name="health_and_safety" size="lg" className="text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary mb-2">{t('industries.card_health.title')}</h3>
                <p className="text-sm text-slate-600">{t('industries.card_health.desc')}</p>
              </BentoCard>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-primary font-bold tracking-wider uppercase text-xs mb-2 block">{t('tech_stack.label')}</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-secondary">
              {t('tech_stack.title_prefix')} <span className="text-primary">{t('tech_stack.title_suffix')}</span>
            </h2>
          </div>
          <LogoLoop
            logos={[
              { node: <span className="font-bold text-secondary/60 text-xl">React</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Next.js</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">TypeScript</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Tailwind</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Node.js</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Supabase</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Framer Motion</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Vercel</span> },
            ]}
            speed={60}
            direction="left"
            logoHeight={32}
            gap={80}
            fadeOut={true}
            pauseOnHover={true}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 bg-surface-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute top-0 start-0 w-24 h-24 bg-accent/20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2"></div>
              <OptimizedImage
                src="/images/marketing/drei-kunden-reviews.jpeg"
                alt="Zufriedene Partner"
                className="relative rounded-3xl shadow-flat-lg w-full bg-white p-2"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display font-black text-3xl lg:text-5xl mb-8 text-secondary leading-tight">
                <BlurText
                  text={t('testimonials.title_prefix')}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="block"
                />
                <span className="text-primary">{t('testimonials.title_suffix')}</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 font-light">
                {t('testimonials.text')}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-surface-dark border-2 border-white flex items-center justify-center text-xs font-bold text-secondary shadow-sm overflow-hidden">
                      <Icon name="user" className="text-white w-6 h-6" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-secondary">
                  {t('testimonials.rating')}<br />
                  <span className="text-primary font-normal">{t('testimonials.excellence')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
