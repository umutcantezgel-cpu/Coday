import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon';

const Audit: React.FC = () => {
    return (
        <div className="bg-background-light font-sans text-text-light">
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl text-primary mb-6">
                                <Icon name="analytics" className="text-3xl" />
                            </div>
                            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                                UX & Tech <span className="text-primary">Audit.</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                                Wir prüfen Ihre bestehende Lösung auf Herz und Nieren. Performance, Usability, Code-Qualität. Ehrlich und schonungslos.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all">
                                    Audit buchen
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Audit;
