import React from 'react';
import { useParams } from 'react-router-dom';
import { LocalizedLink as Link } from '../../shared/ui/LocalizedLink';
import { industriesData } from '../../data/industries';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import {
  industryHeroImages,
  industryFallbackImage,
  industryGalleryImages,
} from '../../data/industryImages';
import { Building2, XCircle, CheckCircle, ArrowRight, ArrowLeft, Briefcase } from 'lucide-react';

const IndustryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? industriesData[slug] : undefined;
  const heroImage =
    slug && industryHeroImages[slug] ? industryHeroImages[slug] : industryFallbackImage;

  if (!industry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-3xl font-bold text-secondary mb-4">Branche nicht gefunden</h1>
        <Link to="/services/industries" className="text-primary hover:underline">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  // Use Building2 as the main icon since dynamic lookup requires full library
  const MainIcon = Building2;
  const SafeIcon = Briefcase;

  return (
    <div className="bg-background-light min-h-screen pt-24">
      {/* Navigation */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          to="/services/industries"
          className="inline-flex items-center text-text-slate hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Alle Branchen
        </Link>
      </div>

      {/* Hero Section - Now with Image */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              <SafeIcon size={16} />
              <span>{industry.title}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
              {industry.hero.headline}
            </h1>
            <p className="text-xl text-text-light max-w-2xl leading-relaxed mb-8">
              {industry.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-flat hover:translate-y-[-2px]"
              >
                Gespräch vereinbaren
              </Link>
              <Link
                to="/calculator"
                className="px-8 py-3 bg-white text-secondary border border-gray-200 font-bold rounded-lg hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                Preise kalkulieren
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-2"></div>
            <OptimizedImage
              src={heroImage.src}
              alt={heroImage.alt}
              className="relative rounded-3xl shadow-2xl w-full transform -rotate-1 hover:rotate-0 transition-all duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary mb-12 text-center">
            Kennen Sie diese Herausforderungen?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {industry.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="p-8 bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <XCircle size={64} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3 relative z-10">
                  {challenge.title}
                </h3>
                <p className="text-text-light relative z-10">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Unsere Lösung für {industry.title}
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              Wir entwickeln nicht nur Webseiten, sondern digitale Vertriebsmitarbeiter, die genau
              auf Ihre Branche zugeschnitten sind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {industry.solutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-flat hover:border-primary/50 transition-all"
              >
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{sol.title}</h3>
                <p className="text-text-light">{sol.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {slug && industryGalleryImages[slug] && industryGalleryImages[slug].length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">Branchen-Einblicke</h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Professionelle Visualisierung für {industry.title}.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {industryGalleryImages[slug].map((img, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 aspect-square"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <OptimizedImage
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <p className="text-sm font-medium line-clamp-2">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Features */}
      <section className="bg-secondary text-white py-20 rounded-3xl mx-4 my-10">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Spezial-Features</h2>
              <p className="text-gray-400">Exklusive Module für {industry.title}</p>
            </div>
            <Link
              to="/contact"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
            >
              Beratung anfordern <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.customFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h4 className="font-bold text-lg mb-2 text-primary">{feat.title}</h4>
                <p className="text-gray-300 text-sm">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Pollination / Related Industries */}
      <section className="py-20 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-8">Weitere Branchen entdecken</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(industriesData)
              .filter((ind) => ind.slug !== slug) // Exclude current
              .slice(0, 3) // Take first 3 for consistent layout
              .map((relIndustry) => {
                const relImage = industryHeroImages[relIndustry.slug] || industryFallbackImage;
                return (
                  <Link
                    to={`/services/industries/${relIndustry.slug}`}
                    key={relIndustry.slug}
                    className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-64"
                  >
                    <OptimizedImage
                      src={relImage.src}
                      alt={relImage.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                        {relIndustry.title}
                      </h3>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex items-center gap-2">
                        Mehr erfahren <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;
