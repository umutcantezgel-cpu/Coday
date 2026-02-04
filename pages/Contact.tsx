import React, { useState } from 'react';
import { ProjectSummary } from '../features/calculator/ui/ProjectSummary';
import { BookingUpsellModal } from '../features/calculator/ui/BookingUpsellModal';
import { useCalculatorStore } from '../features/calculator/model/store';
import { useNavigate } from 'react-router-dom';
import { OptimizedImage } from '../shared/ui/OptimizedImage';
import BlurText from '../components/shared/ui/BlurText';
import { submitLead } from '../entities/lead';

const Contact: React.FC = () => {
  const [showUpsell, setShowUpsell] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const selectedModuleIds = useCalculatorStore(state => state.selectedModuleIds);
  const selectedPackageId = useCalculatorStore(state => state.selectedPackageId);
  const getTotalOneTime = useCalculatorStore(state => state.getTotalOneTime);
  const getTotalMonthly = useCalculatorStore(state => state.getTotalMonthly);
  const resetStore = useCalculatorStore(state => state.reset);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);

    const lead = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      project: formData.get('project') as string,
      source: 'contact' as const,
      // Calculator context
      selectedModuleIds: Array.from(selectedModuleIds),
      selectedPackageId,
      totalOneTimeCents: getTotalOneTime(),
      totalMonthlyCents: getTotalMonthly(),
    };

    const result = await submitLead(lead);
    setIsSubmitting(false);

    if (result.success) {
      setShowUpsell(true);
    } else {
      setSubmitError(result.error || 'Ein Fehler ist aufgetreten.');
    }
  };

  const handleUpsellClose = () => {
    setShowUpsell(false);
    navigate('/');
    resetStore();
  };

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-background-light pt-32">
      <BookingUpsellModal isOpen={showUpsell} onClose={handleUpsellClose} />
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left Content */}
          <div className="space-y-8">
            <ProjectSummary />

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-flat">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Kontakt</span>
              <h1 className="font-display font-extrabold text-5xl lg:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text="Lass uns"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="block"
                />
                <span className="text-primary">Sprechen.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Erzähl uns von deiner Vision. Wir klären, ob wir der richtige Partner für deinen Erfolg sind.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-flat border border-gray-100">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">E-Mail</p>
                    <p className="font-medium text-secondary">umut@codayweb.de</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-flat border border-gray-100">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Telefon</p>
                    <p className="font-medium text-secondary">+49 (0) 30 123 456 78</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mt-12 relative rounded-2xl overflow-hidden shadow-flat-lg h-64 group border border-gray-100">
                <OptimizedImage
                  src="/images/hero/kundenberatung-gespraech-meeting-service-professionell.jpeg"
                  alt="Professionelles Beratungsgespräch"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 bg-gradient-to-t from-secondary/80 to-transparent w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">Kapazität Verfügbar</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">Neukunden Aufnahme.</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-flat-lg border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary" htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg bg-surface-light border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-sm" placeholder="Max Mustermann" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary" htmlFor="email">E-Mail</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg bg-surface-light border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-sm" placeholder="max@firma.de" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary" htmlFor="project">Projektart</label>
                <select id="project" name="project" className="w-full px-4 py-3 rounded-lg bg-surface-light border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-sm">
                  <option>Web Development</option>
                  <option>Web Design</option>
                  <option>E-Commerce</option>
                  <option>Custom Software</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary" htmlFor="message">Nachricht</label>
                <textarea id="message" name="message" required rows={4} className="w-full px-4 py-3 rounded-lg bg-surface-light border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-sm resize-none" placeholder="Erzähl uns von deiner Vision..."></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-primary text-white font-bold rounded-xl shadow-flat hover:shadow-flat-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
                  {!isSubmitting && <span className="material-symbols-outlined text-sm">send</span>}
                </button>
                {submitError && (
                  <p className="text-red-500 text-sm text-center mt-2">{submitError}</p>
                )}
              </div>

              <p className="text-xs text-center text-gray-400">
                Mit dem Absenden akzeptierst du unsere Datenschutzbestimmungen.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section >
  );
};

export default Contact;
