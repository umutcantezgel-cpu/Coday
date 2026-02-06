import React from 'react';

const ReservationFlowDemo: React.FC = () => {
    return (
        <div className="py-12">
            <h3 className="font-display font-bold text-2xl text-secondary mb-12 text-center">Die perfekte Guest-Journey</h3>

            <div className="relative flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-8 md:gap-4">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>

                {[
                    { icon: 'travel_explore', title: 'Entdeckung', desc: 'Gast sucht "Italiener" auf Google Maps', color: 'bg-blue-100 text-blue-600' },
                    { icon: 'calendar_clock', title: 'Buchung', desc: 'Direkt über "Tisch reservieren" Button', color: 'bg-primary/20 text-primary' },
                    { icon: 'sms', title: 'Erinnerung', desc: 'Autom. SMS 2h vor Termin', color: 'bg-purple-100 text-purple-600' },
                    { icon: 'reviews', title: 'Loyalty', desc: 'Nach dem Essen: "Wie war es?" Mail', color: 'bg-green-100 text-green-600' }
                ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full md:w-64 relative z-10 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${step.color}`}>
                            <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                        </div>
                        <h4 className="font-bold text-lg text-secondary mb-2">{step.title}</h4>
                        <p className="text-sm text-slate-500">{step.desc}</p>

                        {/* Step Number Badge */}
                        <div className="absolute top-4 right-4 text-xs font-bold text-gray-300">0{idx + 1}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationFlowDemo;
