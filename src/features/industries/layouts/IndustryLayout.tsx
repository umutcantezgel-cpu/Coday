import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon';
import ScrollFloat from '../../../shared/ui/ScrollFloat';
import ScrollReveal from '../../../shared/ui/ScrollReveal';
import { OptimizedImage } from '../../../shared/ui/OptimizedImage';

export interface IndustryLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroVideo?: string; // Optional video background
  painPoints: Array<{ title: string; description: string; icon?: React.ReactNode }>;
  solutions: Array<{ title: string; description: string }>;
  stats?: Array<{ value: string; label: string }>;
  children?: React.ReactNode; // For specific features like Sliders
}

const ParallaxHero = ({
  image,
  video,
  title,
  subtitle,
}: {
  image: string;
  video?: string;
  title: string;
  subtitle: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <OptimizedImage src={image} alt={title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-black/20 z-10" />
      </motion.div>

      <div className="container mx-auto px-4 z-20 text-center relative">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          containerClassName="!my-0 mb-6"
          textClassName="font-display font-black text-6xl md:text-8xl text-white tracking-tight"
        >
          {title}
        </ScrollFloat>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={false}
            baseRotation={3}
            blurStrength={4}
            containerClassName="!my-0"
            textClassName="!text-xl md:!text-2xl text-white/90 font-light leading-relaxed"
          >
            {subtitle}
          </ScrollReveal>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </div>
  );
};

export const IndustryLayout: React.FC<IndustryLayoutProps> = ({
  title,
  subtitle,
  heroImage,
  heroVideo,
  painPoints,
  solutions,
  children,
}) => {
  return (
    <div className="bg-background-light min-h-screen text-foreground">
      <nav className="fixed top-0 w-full z-50 p-6 mix-blend-difference text-white">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Icon name="arrow_left" size="md" />
          <span className="font-medium">Back</span>
        </Link>
      </nav>

      <ParallaxHero image={heroImage} video={heroVideo} title={title} subtitle={subtitle} />

      {/* Pain Points Section */}
      <section className="py-24 bg-surface-light relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-black transition-colors shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-4">{point.title}</h3>
                <p className="text-white/70">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Interactive Module (Slider etc) */}
      {children && <section className="py-24 overflow-hidden">{children}</section>}

      {/* Solutions/Features */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">
            Die {title} Lösung
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {solutions.map((sol, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="check" className="text-xl" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">{sol.title}</h4>
                  <p className="text-white/60 leading-relaxed">{sol.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8">
            Dominate Your Market.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 bg-white text-primary px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform"
          >
            Strategiegespräch buchen <Icon name="arrow_right" />
          </Link>
        </div>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      </section>
    </div>
  );
};
