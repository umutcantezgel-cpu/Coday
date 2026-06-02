'use client';
import React, { useState } from 'react';
import { Palette, CursorClick } from '@phosphor-icons/react/dist/ssr';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

export const DesignPsychologyPicker: React.FC = () => {
  const t = useTranslations();

  const COLORS = [
    {
      name: t('blog:designPsychology.colors.blue.name'),
      hex: '#3B82F6',
      text: t('blog:designPsychology.colors.blue.text'),
      type: 'Corporate',
    },
    {
      name: t('blog:designPsychology.colors.red.name'),
      hex: '#EF4444',
      text: t('blog:designPsychology.colors.red.text'),
      type: 'Sales',
    },
    {
      name: t('blog:designPsychology.colors.black.name'),
      hex: '#111827',
      text: t('blog:designPsychology.colors.black.text'),
      type: 'Luxury',
    },
    {
      name: t('blog:designPsychology.colors.green.name'),
      hex: '#10B981',
      text: t('blog:designPsychology.colors.green.text'),
      type: 'Finance',
    },
  ];

  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  return (
    <div className="my-10 bg-gray-50 rounded-3xl p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Palette className="text-purple-600" />
        {t('blog:designPsychology.title')}
      </h3>
      <p className="text-gray-600 mb-8">{t('blog:designPsychology.subtitle')}</p>

      <div className="flex flex-col md:flex-row gap-0 md:gap-8 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {/* Controls */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col gap-3">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={clsx(
                'active:scale-[0.97]',
                'flex items-center justify-between p-3 rounded-xl transition motion-reduce:duration-[0.01ms] border',
                selectedColor!.name === color.name
                  ? 'bg-white border-gray-300 shadow-md transform scale-105'
                  : 'bg-transparent border-transparent hover:bg-gray-100'
              )}
            >
              <span className="flex items-center gap-3 font-medium text-gray-700">
                <span
                  className="w-6 h-6 rounded-full shadow-inner border border-black/5"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </span>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div
          className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] relative transition-colors motion-reduce:duration-[0.01ms] duration-700"
          style={{ backgroundColor: `${selectedColor!.hex}10` }}
        >
          {' '}
          // 10% opacity bg
          <button
            className="active:scale-[0.97] px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl shadow-current transition motion-reduce:duration-[0.01ms] duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3"
            style={{
              backgroundColor: selectedColor!.hex,
              boxShadow: `0 20px 25px -5px ${selectedColor!.hex}66`,
            }}
          >
            {t('blog:designPsychology.buyNow')}
            <CursorClick size={20} />
          </button>
          <div className="mt-12 text-center max-w-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
              {t('blog:designPsychology.perception')}
            </span>
            <p className="text-lg font-medium text-gray-800 transition motion-reduce:duration-[0.01ms] duration-300 w-full animate-in fade-in slide-in-from-bottom-4 motion-reduce:animate-none">
              "{selectedColor!.text}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
