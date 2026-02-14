import React from 'react';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import BlurText from '../../../shared/ui/BlurText';
import { OptimizedImage } from '../../../shared/ui/OptimizedImage';
import { useTranslation } from 'react-i18next';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

// Parallax Image Component
const ParallaxHeroImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div style={{ y, scale, opacity }} className="relative w-full h-full">
        <OptimizedImage src={src} alt={alt} className="w-full h-full object-cover" priority />
      </motion.div>
    </div>
  );
};

interface CaseStudyLayoutProps {
  title: string;
  subtitle?: string;
  excerpt?: string;
  client: string;
  industry: string;
  services: string[];
  year: string;
  heroImage: string;
  children: React.ReactNode;
}

export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
  title,
  subtitle,
  excerpt,
  client,
  industry,
  services,
  year,
  heroImage,
  children,
}) => {
  const { t } = useTranslation('work');
  // Handle fallback
  const heroSubtitle = subtitle || excerpt || '';

  return (
    <div className="bg-background-light min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 p-6 md:p-8">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all font-medium text-sm"
        >
          <ArrowLeft size={16} />
          <span>{t('project_detail.back_to_overview')}</span>
        </Link>
      </nav>

      {/* Hero */}
      <header className="relative h-screen min-h-[800px] flex items-end pb-32 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <ParallaxHeroImage src={heroImage} alt={title} />
          <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/20 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-secondary/10 z-10 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 z-20 relative">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-md">
                {industry}
              </span>
              <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/30">
                {year}
              </span>
            </div>

            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-[0.9] tracking-tight drop-shadow-lg">
              <BlurText text={title} delay={100} animateBy="words" className="block" />
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 max-w-3xl font-light leading-relaxed drop-shadow-md">
              {heroSubtitle}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </header>

      {/* Meta Grid */}
      <section className="container mx-auto px-4 -mt-12 relative z-30 mb-24">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm uppercase font-bold text-gray-400 mb-2 tracking-wider">
              {t('project_detail.sidebar.client')}
            </h3>
            <p className="text-lg font-bold text-secondary">{client}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase font-bold text-gray-400 mb-2 tracking-wider">
              {t('project_detail.sidebar.industry')}
            </h3>
            <p className="text-lg font-bold text-secondary">{industry}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase font-bold text-gray-400 mb-2 tracking-wider">
              {t('project_detail.sidebar.services')}
            </h3>
            <ul className="text-lg font-bold text-secondary space-y-1">
              {services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase font-bold text-gray-400 mb-2 tracking-wider">
              {t('project_detail.sidebar.year')}
            </h3>
            <p className="text-lg font-bold text-secondary">{year}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 max-w-4xl prose prose-lg prose-slate prose-headings:font-display prose-headings:font-bold prose-headings:text-secondary prose-a:text-primary prose-img:rounded-2xl prose-img:shadow-flat mb-32">
        {children}
      </article>

      {/* Next Project CTA */}
      <section className="bg-secondary text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full translate-x-1/3"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display font-black text-4xl md:text-6xl mb-8">
            {t('project_detail.cta.title')}
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-glow hover:-translate-y-1 transition-all"
          >
            <span>{t('project_detail.cta.button')}</span>
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </div>
  );
};
