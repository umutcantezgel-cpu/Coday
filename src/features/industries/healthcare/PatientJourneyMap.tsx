"use client";
import React, { useState } from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { MagnifyingGlass, FileText, Clock, FirstAid } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

const PatientJourneyMap: React.FC = () => {
  const t = useTranslations('industries');
  const [step, setStep] = useState(0);

  const iconMap: Record<string, React.ElementType> = {
    search: MagnifyingGlass,
    edit_document: FileText,
    schedule: Clock,
    healing: FirstAid,
  };

  const steps = [
    {
      title: t('aerzte-gesundheit.features.patient_journey.steps.symptom.title'),
      desc: t('aerzte-gesundheit.features.patient_journey.steps.symptom.desc'),
      analog: t('aerzte-gesundheit.features.patient_journey.steps.symptom.analog'),
      digital: t('aerzte-gesundheit.features.patient_journey.steps.symptom.digital'),
      icon: 'search',
    },
    {
      title: t('aerzte-gesundheit.features.patient_journey.steps.pre_visit.title'),
      desc: t('aerzte-gesundheit.features.patient_journey.steps.pre_visit.desc'),
      analog: t('aerzte-gesundheit.features.patient_journey.steps.pre_visit.analog'),
      digital: t('aerzte-gesundheit.features.patient_journey.steps.pre_visit.digital'),
      icon: 'edit_document',
    },
    {
      title: t('aerzte-gesundheit.features.patient_journey.steps.visit.title'),
      desc: t('aerzte-gesundheit.features.patient_journey.steps.visit.desc'),
      analog: t('aerzte-gesundheit.features.patient_journey.steps.visit.analog'),
      digital: t('aerzte-gesundheit.features.patient_journey.steps.visit.digital'),
      icon: 'schedule',
    },
    {
      title: t('aerzte-gesundheit.features.patient_journey.steps.follow_up.title'),
      desc: t('aerzte-gesundheit.features.patient_journey.steps.follow_up.desc'),
      analog: t('aerzte-gesundheit.features.patient_journey.steps.follow_up.analog'),
      digital: t('aerzte-gesundheit.features.patient_journey.steps.follow_up.digital'),
      icon: 'healing',
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
      <h3 className="font-display font-bold text-2xl text-secondary mb-12 text-center">
        {t('aerzte-gesundheit.features.patient_journey.title')}
      </h3>

      <div className="grid lg:grid-cols-2 gap-12 relative">
        {/* Timeline Line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>

        {steps.map((s, idx) => (
          <React.Fragment key={idx}>
            {/* Analog Side (Left) */}
            <div
              className={`lg:text-end ${step === idx ? 'opacity-100' : 'opacity-40'} transition-opacity`}
            >
              <h4 className="font-bold text-red-500 mb-2 flex items-center justify-end gap-2">
                <span className="text-xs bg-red-100 px-2 py-1 rounded-full uppercase">
                  {t('aerzte-gesundheit.features.patient_journey.labels.analog')}
                </span>
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
              <OptimizedIcon icon={iconMap[s.icon] || MagnifyingGlass} />
            </div>

            {/* Digital Side (Right) */}
            <div className={`${step === idx ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
              <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2">
                <span className="text-xs bg-green-100 px-2 py-1 rounded-full uppercase">
                  {t('aerzte-gesundheit.features.patient_journey.labels.digital')}
                </span>
                {s.title}
              </h4>
              <p className="text-sm text-slate-500">{s.digital}</p>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 mb-4">
          {t('aerzte-gesundheit.features.patient_journey.click_hint')}
        </p>
      </div>
    </div>
  );
};

export default PatientJourneyMap;
