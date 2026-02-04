import React from 'react';
import { NavLink } from 'react-router-dom';
import { OptimizedImage } from '../shared/ui/OptimizedImage';
import { serviceImages } from '../data/serviceImages';
import BlurText from '../components/shared/ui/BlurText';
import GradientText from '../components/shared/ui/GradientText';

const Services: React.FC = () => {
  const categories = [
    {
      icon: "code",
      title: "Web Development",
      description: "Next.js, React & TypeScript. Wir bauen hochperformante Web-Applikationen, die skalieren.",
      link: "/services/web-development",
      color: "bg-blue-500",
      imageKey: "development"
    },
    {
      icon: "palette",
      title: "Web Design",
      description: "Award-winning UX/UI Design. Ästhetik, die Ihre Marke unvergesslich macht und konvertiert.",
      link: "/services/web-design",
      color: "bg-purple-500",
      imageKey: "webdesign"
    }
  ];

  return (
    <div className="bg-background-light">
      {/* Header with Hero Image */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Expertise</span>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-gray-900 mb-6">
              <BlurText
                text="Unsere"
                delay={100}
                animateBy="words"
                direction="top"
                className="block"
              />
              <GradientText
                colors={['#1A9A9A', '#2D3748', '#1A9A9A']}
                animationSpeed={8}
                showBorder={false}
                className="inline-block"
              >
                Service Pillars.
              </GradientText>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Wir bieten spezialisierte Lösungen in vier Kernbereichen, um Ihr Unternehmen digital an die Spitze zu bringen.
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-2"></div>
            <OptimizedImage
              src={serviceImages.hero.src}
              alt={serviceImages.hero.alt}
              className="relative rounded-3xl shadow-2xl w-full transform -rotate-1 hover:rotate-0 transition-all duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {categories.map((cat, index) => (
            <NavLink
              key={index}
              to={cat.link}
              className="group relative bg-white rounded-3xl p-10 shadow-aurora border border-gray-100 overflow-hidden hover:shadow-aurora-lg transition-all duration-300 transform hover:-translate-y-1 block h-full"
            >
              {/* Decorative Background Image */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 transform translate-x-12 -translate-y-12 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 rounded-bl-full overflow-hidden pointer-events-none">
                {serviceImages[cat.imageKey || 'hero'] && (
                  <OptimizedImage
                    src={serviceImages[cat.imageKey || 'hero'].src}
                    alt=""
                    className="w-full h-full object-cover mix-blend-multiply"

                  />
                )}
              </div>
              <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} opacity-5 rounded-bl-full group-hover:scale-110 transition-transform duration-500`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 ${cat.color} bg-opacity-10 rounded-2xl flex items-center justify-center text-${cat.color.replace('bg-', '')} mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-symbols-outlined text-3xl text-gray-900">{cat.icon}</span>
                </div>

                <h3 className="font-display font-bold text-3xl text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex items-center text-primary font-bold tracking-wide uppercase text-sm">
                  Mehr erfahren
                  <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <BlurText
            text="Bereit für den nächsten Schritt?"
            delay={80}
            animateBy="words"
            direction="bottom"
            className="font-display font-bold text-3xl text-gray-900 mb-8 justify-center"
          />
          <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Projekt anfragen
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Services;
