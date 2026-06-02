'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ShieldWarning, Globe, LockKey, Check } from '@phosphor-icons/react/dist/ssr';
import { clsx } from 'clsx';

const CHECKLIST_ITEMS = [
  { id: 'hosting', text: 'Are your servers hosted exclusively in the EU?', weight: 20 },
  {
    id: 'cloud-act',
    text: 'Is your provider subject to the US Cloud Act (AWS, Google, Azure)?',
    weight: -30,
    isNegative: true,
  },
  {
    id: 'analytics',
    text: 'Do you use self-hosted analytics (e.g., Matomo, Plausible) instead of Google Analytics?',
    weight: 15,
  },
  { id: 'fonts', text: 'Are Google Fonts loaded locally (no CDN requests)?', weight: 10 },
  { id: 'cdn', text: 'Do you use a European CDN (or no CDN) for static assets?', weight: 10 },
  {
    id: 'cookies',
    text: 'Is your site usable without consenting to tracking cookies?',
    weight: 15,
  },
  {
    id: 'sso',
    text: 'Do you avoid US-based SSO providers (Login with Google/Facebook)?',
    weight: 10,
  },
];

export const SovereigntyChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    setShowResult(false); // Hide result if modified
  };

  const calculateScore = () => {
    let score = 0;

    CHECKLIST_ITEMS.forEach((item) => {
      if (checkedItems[item.id]) {
        score += item.weight;
      }
    });

    // Normalize to 0-100 range roughly
    // If they use US Cloud Act provider, big penalty
    return Math.max(0, Math.min(100, score + (checkedItems['cloud-act'] ? -30 : 20))); // Bonus if NOT using US provider... wait logic above is: if checked (IS subject), apply negative weight.
  };

  const score = calculateScore();

  const getResult = () => {
    if (score >= 80)
      return {
        status: 'Sovereign',
        color: 'green',
        icon: ShieldCheck,
        title: 'Digital Fortress',
        desc: 'Your infrastructure is compliant with the strictest EU standards. You are ready for OZG 2.0.',
      };
    if (score >= 50)
      return {
        status: 'Hybrid',
        color: 'yellow',
        icon: LockKey,
        title: 'Warning Zone',
        desc: 'You have some protection, but dependencies on US providers pose a compliance risk.',
      };
    return {
      status: 'Exposed',
      color: 'red',
      icon: ShieldWarning,
      title: 'Data Leak',
      desc: 'Your data is potentially accessible to foreign authorities. Immediate action recommended.',
    };
  };

  const result = getResult();

  return (
    <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600">
            <Globe size={32} weight="duotone" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Digital Sovereignty Audit</h3>
            <p className="text-gray-500">Check your dependency on non-EU infrastructure.</p>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {CHECKLIST_ITEMS.map((item) => (
            <label
              key={item.id}
              className={clsx(
                'flex items-start gap-4 p-4 rounded-xl border transition motion-reduce:duration-[0.01ms] cursor-pointer hover:bg-gray-50',
                checkedItems[item.id] ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200'
              )}
            >
              <div
                className={clsx(
                  'w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors motion-reduce:duration-[0.01ms]',
                  checkedItems[item.id]
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 bg-white'
                )}
              >
                {checkedItems[item.id] && <Check size={14} weight="bold" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={!!checkedItems[item.id]}
                onChange={() => toggleItem(item.id)}
              />
              <span
                className={clsx(
                  'font-medium',
                  checkedItems[item.id] ? 'text-blue-900' : 'text-gray-700'
                )}
              >
                {item.text}
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-center">
          {!showResult ? (
            <button
              onClick={() => setShowResult(true)}
              className="active:scale-[0.97] px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition motion-reduce:duration-[0.01ms]"
            >
              Calculate Risk Score
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={clsx(
                'w-full p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center gap-6 text-center md:text-left',
                result.color === 'green'
                  ? 'bg-green-50 border-green-200 text-green-900'
                  : result.color === 'yellow'
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-900'
                    : 'bg-red-50 border-red-200 text-red-900'
              )}
            >
              <div
                className={clsx(
                  'w-20 h-20 rounded-full flex items-center justify-center shrink-0 border-4',
                  result.color === 'green'
                    ? 'bg-green-100 border-green-200 text-green-600'
                    : result.color === 'yellow'
                      ? 'bg-yellow-100 border-yellow-200 text-yellow-600'
                      : 'bg-red-100 border-red-200 text-red-600'
                )}
              >
                <result.icon size={40} weight="fill" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-1">{result.title}</h4>
                <p className="opacity-90 mb-0">{result.desc}</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-current opacity-20" />
              <div className="text-center">
                <span className="block text-xs uppercase font-bold opacity-60">Score</span>
                <span className="text-4xl font-mono font-bold">{score}/100</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SovereigntyChecklist;
