import React, { useState } from 'react';

const PatientJourneyMap: React.FC = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Symptom & Google",
            desc: "Patient googelt 'Hautarzt München' am Wochenende.",
            analog: "Findet veraltete Website ohne Öffnungszeiten. Ruft Montag an (besetzt).",
            digital: "Findet top-optimierte Seite. Bucht Termin direkt online für Dienstag.",
            icon: "search"
        },
        {
            title: "Vor dem Termin",
            desc: "Die Datenerfassung (Anamnese).",
            analog: "Patient kommt 15min früher, füllt Papierbogen aus (unleserlich).",
            digital: "Erhält SMS mit Link. Füllt Anamnese bequem zuhause am Handy aus.",
            icon: "edit_document"
        },
        {
            title: "Der Besuch",
            desc: "Empfang und Wartezeit.",
            analog: "Wartezeit, da Daten übertragen werden müssen. Stress am Empfang.",
            digital: "Daten sind schon im System. Arzt hat alles gelesen. 0min Wartezeit.",
            icon: "schedule"
        },
        {
            title: "Nachsorge",
            desc: "Rezepte und Feedback.",
            analog: "Patient ruft für Folgerezept an. Niemand geht ran.",
            digital: "Rezept per App bestellt. Automatische 'Gute Besserung' Mail mit Feedback-Link.",
            icon: "healing"
        }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
            <h3 className="font-display font-bold text-2xl text-secondary mb-12 text-center">Die digitale Patientenreise</h3>

            <div className="grid lg:grid-cols-2 gap-12 relative">
                {/* Timeline Line */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>

                {steps.map((s, idx) => (
                    <React.Fragment key={idx}>
                        {/* Analog Side (Left) */}
                        <div className={`lg:text-right ${step === idx ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                            <h4 className="font-bold text-red-500 mb-2 flex items-center justify-end gap-2">
                                <span className="text-xs bg-red-100 px-2 py-1 rounded-full uppercase">Analog</span>
                                {s.title}
                            </h4>
                            <p className="text-sm text-slate-500">{s.analog}</p>
                        </div>

                        {/* Center Icon */}
                        <div
                            className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center border-4 border-white z-10 cursor-pointer transition-all ${step === idx ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-gray-100 text-gray-400'}`}
                            style={{ top: `${idx * 25}%` }}
                            onClick={() => setStep(idx)}
                        >
                            <span className="material-symbols-outlined">{s.icon}</span>
                        </div>

                        {/* Digital Side (Right) */}
                        <div className={`${step === idx ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                            <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2">
                                <span className="text-xs bg-green-100 px-2 py-1 rounded-full uppercase">Digital</span>
                                {s.title}
                            </h4>
                            <p className="text-sm text-slate-500">{s.digital}</p>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-xs text-slate-400 mb-4">
                    Klicken Sie auf die Schritte, um Details zu sehen.
                </p>
            </div>
        </div>
    );
};

export default PatientJourneyMap;
