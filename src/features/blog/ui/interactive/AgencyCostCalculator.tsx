"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CurrencyDollar, Robot, User, Lightning, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export const AgencyCostCalculator: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState(150);
  const [hoursPerMonth, setHoursPerMonth] = useState(40);

  // Calculations
  const agencyCost = hourlyRate * hoursPerMonth;
  // Coday Model: Flat fee or value based. Let's assume a "Value Equivalent" cost
  // which is usually 30-50% of traditional agency cost for same output due to AI efficiency.
  // Let's say 40% of agency cost for the sake of the calculator demonstration.
  const codayCost = Math.round(agencyCost * 0.4);
  const savings = agencyCost - codayCost;

  return (
    <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-6">
            <CurrencyDollar size={16} className="text-gray-600" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
              Retainer Audit
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
            What is your "Agency Tax"?
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Calculate how much you are overpaying for manual labor that AI could automate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Controls */}
          <div className="space-y-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
            {/* Hourly Rate Slider */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-bold text-gray-700">Agency Hourly Rate</label>
                <span className="font-mono text-primary font-bold">{hourlyRate}€ / hr</span>
              </div>
              <input
                type="range"
                min="80"
                max="300"
                step="10"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>80€</span>
                <span>300€</span>
              </div>
            </div>

            {/* Hours Slider */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-bold text-gray-700">Monthly Retainer Hours</label>
                <span className="font-mono text-primary font-bold">{hoursPerMonth} hrs</span>
              </div>
              <input
                type="range"
                min="10"
                max="160"
                step="5"
                value={hoursPerMonth}
                onChange={(e) => setHoursPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>10 hrs</span>
                <span>160 hrs</span>
              </div>
            </div>

            {/* Insight Box */}
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-start gap-3">
              <Lightning size={24} className="text-yellow-500 shrink-0 mt-1" weight="fill" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-gray-900">Industry Secret:</strong> Most agencies bill you
                for 3 junior designers and 2 account managers. We use 1 senior strategist and 10 AI
                agents.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Traditional Agency Card */}
            <div className="group relative p-6 bg-white border border-red-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <User size={20} weight="fill" />
                  </div>
                  <span className="font-bold text-gray-600">Traditional Agency</span>
                </div>
                <span className="text-xs font-bold uppercase text-red-400 bg-red-50 px-2 py-1 rounded">
                  Slow
                </span>
              </div>
              <div className="text-3xl font-mono font-bold text-gray-900">
                {agencyCost.toLocaleString('de-DE')}€{' '}
                <span className="text-base font-normal text-gray-400">/ mo</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className="h-full bg-red-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Coday Hybrid Model Card */}
            <div className="group relative p-6 bg-gray-900 text-white rounded-3xl shadow-xl hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Robot size={100} />
              </div>
              <div className="flex items-center justify-between mb-2 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <Lightning size={20} weight="fill" />
                  </div>
                  <span className="font-bold text-gray-200">Coday Hybrid Model</span>
                </div>
                <span className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-1 rounded">
                  Fast
                </span>
              </div>
              <div className="text-4xl font-mono font-bold text-white relative z-10">
                {codayCost.toLocaleString('de-DE')}€{' '}
                <span className="text-base font-normal text-gray-400">/ mo</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden relative z-10">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: '40%' }} // Represents the efficiency ratio
                />
              </div>
            </div>

            {/* Savings Highlight */}
            <motion.div
              className="text-center p-6 bg-green-50 rounded-2xl border border-green-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={savings} // Re-animate on change
            >
              <p className="text-green-800 font-medium mb-1">Your Potential Annual Savings</p>
              <p className="text-4xl font-bold text-green-600">
                {(savings * 12).toLocaleString('de-DE')}€
              </p>
            </motion.div>

            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors"
            >
              Stop Burning Money <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyCostCalculator;
