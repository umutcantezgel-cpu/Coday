import React, { useState, useEffect } from 'react';

const WaitingRoomRoiCalculator: React.FC = () => {
    const [patientsPerDay, setPatientsPerDay] = useState(40);
    const [receptionMins, setReceptionMins] = useState(5); // Mins saved per patient by digital anamnesis
    const [hourlyRate, setHourlyRate] = useState(25); // Cost of receptionist/MFA

    // Savings per month (20 days)
    const savedHoursPerMonth = (patientsPerDay * receptionMins * 20) / 60;
    const savedMoney = savedHoursPerMonth * hourlyRate;

    return (
        <div className="bg-surface-dark rounded-3xl p-8 border border-white/10 text-white">
            <div className="text-center mb-8">
                <span className="text-primary font-bold uppercase tracking-wider text-xs block mb-1">Effizienz-Check</span>
                <h3 className="font-display font-bold text-2xl">Digitaler Empfang</h3>
            </div>

            <div className="space-y-6 mb-8">
                <div>
                    <div className="flex justify-between text-sm font-bold text-gray-300 mb-2">
                        <label>Patienten / Tag</label>
                        <span>{patientsPerDay}</span>
                    </div>
                    <input
                        type="range"
                        min="10" max="100" step="5"
                        value={patientsPerDay}
                        onChange={(e) => setPatientsPerDay(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-sm font-bold text-gray-300 mb-2">
                        <label>Zeitersparnis pro Patient (Min)</label>
                        <span>{receptionMins} min</span>
                    </div>
                    <input
                        type="range"
                        min="1" max="15" step="1"
                        value={receptionMins}
                        onChange={(e) => setReceptionMins(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">
                        (Kein Abtippen von Formularen, keine Adress-Korrekturen)
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="text-gray-400 text-xs font-bold uppercase block mb-1">Gewonnene Zeit</span>
                    <span className="text-2xl font-black text-white">{Math.round(savedHoursPerMonth)} h</span>
                    <span className="text-[10px] text-gray-500 block">/ Monat</span>
                </div>
                <div className="bg-primary/20 p-4 rounded-2xl border border-primary/30">
                    <span className="text-primary text-xs font-bold uppercase block mb-1">Ersparnis</span>
                    <span className="text-2xl font-black text-white">{Math.round(savedMoney)} €</span>
                    <span className="text-[10px] text-primary/70 block">/ Monat</span>
                </div>
            </div>

            <p className="text-xs text-gray-500 mt-6 text-center">
                Investieren Sie diese Zeit lieber in Ihre Patienten anstatt in Papierkram.
            </p>
        </div>
    );
};

export default WaitingRoomRoiCalculator;
