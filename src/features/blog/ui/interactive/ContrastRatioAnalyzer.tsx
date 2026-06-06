'use client';
import React, { useState } from 'react';
import { m } from 'motion/react';
import { Eyeglasses, CheckCircle, XCircle, Info, Shuffle } from '@phosphor-icons/react/dist/ssr';
import { clsx } from 'clsx';

// Helper to calculate relative luminance
const getLuminance = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result && result[1] && result[2] && result[3]
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
};

const getContrastRatio = (color1: string, color2: string) => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
};

export const ContrastRatioAnalyzer: React.FC = () => {
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#111827'); // Gray-900

  const ratio = parseFloat(getContrastRatio(textColor, bgColor).toFixed(2));

  const randomize = () => {
    const randomHex = () =>
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    setTextColor(randomHex());
    setBgColor(randomHex());
  };

  const getStatus = (ratio: number) => {
    if (ratio >= 7) return { label: 'AAA (Excellent)', color: 'text-green-500', icon: CheckCircle };
    if (ratio >= 4.5) return { label: 'AA (Good)', color: 'text-green-400', icon: CheckCircle };
    if (ratio >= 3) return { label: 'AA Large (Okay)', color: 'text-yellow-500', icon: Info };
    return { label: 'Fail (Unreadable)', color: 'text-red-500', icon: XCircle };
  };

  const status = getStatus(ratio);

  return (
    <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl">
      <div className="p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white mb-6">
            <Eyeglasses size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">Accessibility Tool</span>
          </div>
          <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Dark Mode Contrast Checker
          </h3>
          <p className="text-gray-500">
            Does your design pass the WCAG test? Dark mode requires careful balancing of saturation
            and contrast.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Controls */}
          <div className="space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                Text Color
              </label>
              <div className="flex gap-4">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 p-3 rounded-xl border border-gray-200 font-mono focus:ring-2 outline-none uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                Background Color
              </label>
              <div className="flex gap-4">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 p-3 rounded-xl border border-gray-200 font-mono focus:ring-2 outline-none uppercase"
                />
              </div>
            </div>

            <button
              onClick={randomize}
              className="active:scale-[0.97] w-full py-3 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors motion-reduce:duration-[0.01ms] font-medium text-gray-600"
            >
              <Shuffle size={18} /> Randomize
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <m.div
              className="p-10 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center min-h-[200px]"
              style={{ backgroundColor: bgColor, color: textColor }}
              layout
            >
              <h4 className="text-2xl font-bold mb-2">Hello World</h4>
              <p className="opacity-80">This is how your text looks.</p>
            </m.div>

            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <span className="block text-xs font-bold uppercase text-gray-400 mb-1">
                  Contrast Ratio
                </span>
                <span className="text-4xl font-mono font-bold text-gray-900">{ratio}:1</span>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold uppercase text-gray-400 mb-1">
                  WCAG Status
                </span>
                <div className={clsx('flex items-center gap-2 font-bold', status.color)}>
                  <status.icon size={20} weight="fill" />
                  {status.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastRatioAnalyzer;
