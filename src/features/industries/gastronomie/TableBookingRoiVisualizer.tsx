import React, { useState } from 'react';

const TableBookingRoiVisualizer: React.FC = () => {
  const [coversPerDay, setCoversPerDay] = useState(60);
  const [avgCheck, setAvgCheck] = useState(45);
  const [noShowRate, setNoShowRate] = useState(15);

  // Revenue lost per month (assuming 6 days/week = 26 days)
  // Derived calculations
  const monthlyCovers = coversPerDay * 26;
  const lostCovers = Math.ceil(monthlyCovers * (noShowRate / 100));
  const lostRevenue = lostCovers * avgCheck;
  const recoveredRevenue = lostRevenue * 0.7;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-secondary p-6 text-white text-center">
        <h3 className="font-display font-bold text-xl">No-Show Kalkulator</h3>
        <p className="text-sm opacity-80">Wie viel Geld verlieren Sie durch leere Tische?</p>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="p-8 space-y-8 bg-gray-50/50">
          <div>
            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
              <label>Gäste pro Tag</label>
              <span>{coversPerDay}</span>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="10"
              value={coversPerDay}
              onChange={(e) => setCoversPerDay(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
              <label>Durchschnitts-Bon (€)</label>
              <span>{avgCheck}€</span>
            </div>
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={avgCheck}
              onChange={(e) => setAvgCheck(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
              <label>Aktuelle No-Show Rate (%)</label>
              <span>{noShowRate}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={noShowRate}
              onChange={(e) => setNoShowRate(Number(e.target.value))}
              className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <p className="text-xs text-red-500 mt-2">
              *Branchendurchschnitt liegt oft über 15% ohne Reminder.
            </p>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-center space-y-6">
          <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-red-600 text-xs font-bold uppercase block mb-1">
              Jährlicher Verlust
            </span>
            <span className="text-3xl font-black text-red-600 line-through decoration-red-400/50 decoration-2">
              {formatCurrency(lostRevenue * 12)}
            </span>
          </div>

          <div className="text-center relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-32 h-32 bg-green-500/20 rounded-full blur-2xl"></div>
            </div>
            <span className="text-green-600 text-xs font-bold uppercase block mb-1">
              Mit SMS-Erinnerung gerettet
            </span>
            <span className="text-5xl font-black text-green-600">
              {formatCurrency(recoveredRevenue * 12)}
            </span>
            <p className="text-xs text-gray-400 mt-2">Pro Jahr. Nur durch digitale Reservierung.</p>
          </div>

          <button className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-primary/90 transition-all">
            Digitale Reservierung starten
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableBookingRoiVisualizer;
