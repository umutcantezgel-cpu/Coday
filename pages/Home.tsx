import React from 'react';
import { NavLink } from 'react-router-dom';
import { OptimizedImage } from '../shared/ui/OptimizedImage';
import AgencyComparisonTable from '../components/AgencyComparisonTable';
import ClickSpark from '../components/shared/ui/ClickSpark';
import GradientText from '../components/shared/ui/GradientText';
import CountUp from '../components/shared/ui/CountUp';
import Carousel from '../components/shared/ui/Carousel';
import BlurText from '../components/shared/ui/BlurText';
import { MdConstruction, MdApartment, MdShoppingCart, MdLightbulb, MdHealthAndSafety } from 'react-icons/md';
import ClientReferencesGrid from '../components/features/TeamGrid';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-60 overflow-hidden bg-background-light">
        {/* Organic Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none animate-float"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="bg-white/80 backdrop-blur-md border border-white/50 text-secondary text-sm font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
              <span className="bg-primary text-white rounded-full p-0.5"><span className="material-symbols-outlined text-[14px]">rocket_launch</span></span>
              Grand Opening Special: 25% Rabatt
            </span>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-8 text-secondary uppercase drop-shadow-sm">
            Wir bauen ihre<br className="hidden md:block" />
            <GradientText
              colors={['#1A9A9A', '#2D3748', '#1A9A9A']}
              animationSpeed={8}
              showBorder={false}
              className="inline-block"
            >
              Digitale Dominanz.
            </GradientText>
          </h1>
          <p className="text-xl sm:text-2xl font-light text-slate-700 max-w-3xl mx-auto leading-relaxed mb-12">
            Schluss mit ineffizienten Agenturen. Wir liefern Software & Design, das Märkte erobert.
            <span className="block mt-4 font-bold text-secondary">Schnell. Skalierbar. Professionell.</span>
          </p>
          <ClickSpark sparkColor="#1A9A9A" sparkSize={12} sparkRadius={30} sparkCount={8} duration={500}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-lg bg-primary hover:bg-opacity-90 transition-all shadow-flat hover:shadow-flat-lg uppercase tracking-wide">
                Projekt starten
                <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </NavLink>
              <NavLink to="/work" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-secondary bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-all shadow-flat hover:shadow-sm uppercase tracking-wide">
                Referenzen
              </NavLink>
            </div>
          </ClickSpark>
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
                <div className="text-xs font-bold uppercase tracking-widest text-primary">Ø Ladezeit</div>
              </div>
              <div className="px-4 text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                  <CountUp from={0} to={100} duration={1.5} className="" />%
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">Code-Eigentum</div>
              </div>
              <div className="px-4 text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                  <CountUp from={0} to={24} duration={1.5} className="" />h
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">Support</div>
              </div>
              <div className="px-4 text-center border-r-0">
                <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">ROI</div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">Fokussiert</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <AgencyComparisonTable />

      {/* Philosophy Section */}
      <section className="py-24 bg-surface-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display font-black text-3xl lg:text-5xl mb-8 leading-tight text-secondary">
                <BlurText
                  text="Traditionelle Agenturen"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="block"
                />
                <span className="text-primary">Sind Geschichte.</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Sie bezahlen für Overhead, Meetings und ineffiziente Prozesse. Das alte Agenturmodell funktioniert nicht mehr für moderne KMUs.
                </p>
                <p>
                  <strong className="text-secondary font-bold">Coday ist der neue Standard.</strong> Wir kombinieren strategisches Design mit High-End Engineering. Keine Baukästen, keine Ausreden. Nur Ergebnisse, die Ihr Unternehmen voranbringen.
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-secondary mb-12 uppercase tracking-tight">
            <BlurText
              text="Wir digitalisieren"
              delay={80}
              animateBy="words"
              direction="bottom"
              className="inline"
            />{' '}
            <span className="text-primary">Ihre Branche.</span>
          </h2>

          <div className="flex justify-center items-center">
            <Carousel
              baseWidth={350}
              autoplay={true}
              autoplayDelay={4000}
              loop={true}
              pauseOnHover={true}
              items={[
                {
                  id: 1,
                  title: 'Handwerk & Bau',
                  description: 'Digitale Mitarbeitergewinnung und Projekt-Showcases, die überzeugen.',
                  icon: <MdConstruction size={24} />
                },
                {
                  id: 2,
                  title: 'Immobilien',
                  description: 'Hochwertige Exposé-Präsentationen und Lead-Generierung für Makler.',
                  icon: <MdApartment size={24} />
                },
                {
                  id: 3,
                  title: 'E-Commerce',
                  description: 'Conversion-starke Shopsysteme, die Besucher zu Käufern machen.',
                  icon: <MdShoppingCart size={24} />
                },
                {
                  id: 4,
                  title: 'Consulting',
                  description: 'Positionierung als Experte durch erstklassiges Personal Branding.',
                  icon: <MdLightbulb size={24} />
                },
                {
                  id: 5,
                  title: 'Gesundheitswesen',
                  description: 'Vertrauenswürdige Webauftritte für Praxen und Kliniken.',
                  icon: <MdHealthAndSafety size={24} />
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Client References Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-primary font-bold tracking-wider uppercase text-xs mb-2 block">Referenzen</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-secondary">
              Vertrauen von <span className="text-primary">über 50+ Unternehmen</span>
            </h2>
          </div>
          <ClientReferencesGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-surface-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute top-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>
              <OptimizedImage
                src="/images/marketing/drei-kunden-daumen-hoch-5-sterne-sprechblasen-bewertungen-zufrieden.jpeg"
                alt="Zufriedene Partner"
                className="relative rounded-3xl shadow-flat-lg w-full bg-white p-2"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display font-black text-3xl lg:text-5xl mb-8 text-secondary leading-tight">
                <BlurText
                  text="Partner, die"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="block"
                />
                <span className="text-primary">Uns Vertrauen.</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 font-light">
                Vom lokalen Handwerksbetrieb bis zum Industrieunternehmen. Wir liefern Qualität, auf die Sie bauen können.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-surface-dark border-2 border-white flex items-center justify-center text-xs font-bold text-secondary shadow-sm">
                      K
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-secondary">
                  5.0 Sterne Bewertung<br />
                  <span className="text-primary font-normal">Exzellenz als Standard.</span>
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
