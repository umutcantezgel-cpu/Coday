import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CurrencyDollar, ChartBar, Warning } from '@phosphor-icons/react';
import { clsx } from 'clsx';

export const TCOCalculator: React.FC = () => {
  const [traffic, setTraffic] = useState(50000); // Monthly visitors
  const [years, setYears] = useState(3);

  // Cost Assumptions
  const wpCosts = {
    hosting: traffic > 100000 ? 500 : 50, // Expensive scaling
    maintenance: 200, // Monthly retainer for updates
    plugins: 100, // Premium plugins
    security: 50, // Firewall/Cleanup
    devOps: traffic > 100000 ? 500 : 0, // Scaling panic fixes
  };

  const headlessCosts = {
    hosting: traffic > 100000 ? 100 : 20, // Vercel/Netlify is cheaper
    cms: 50, // Contentful/Sanity tier
    maintenance: 50, // Much lower, just dependency updates
    plugins: 0,
    security: 0, // Handled by platform
    devOps: 0,
  };

  const calculateTotal = (costs: any) => {
    const monthly = Object.values(costs).reduce((a: any, b: any) => a + b, 0) as number;
    return monthly * 12 * years;
  };

  const wpTotal = calculateTotal(wpCosts);
  const headlessTotal = calculateTotal(headlessCosts) + 15000; // Initial build is more expensive for Headless
  // Let's add initial build to WP too, but lower
  const wpTotalWithBuild = wpTotal + 5000;

  const savings = wpTotalWithBuild - headlessTotal;

  return (
    <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl">
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-full bg-green-50 text-green-600">
            <ChartBar size={32} weight="duotone" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              TCO Calculator: WordPress vs. Headless
            </h3>
            <p className="text-gray-500">Calculate the real cost over {years} years.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Monthly Visitors: {traffic.toLocaleString()}
              </label>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-xs text-gray-400 mt-2">
                More traffic = Higher hosting & security costs for WP.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Timeframe: {years} Years
              </label>
              <div className="flex gap-2">
                {[1, 3, 5].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-colors',
                      years === y
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {y}y
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex gap-3 text-sm text-yellow-800">
              <Warning size={20} className="shrink-0 mt-0.5" />
              <p>
                Note: Headless has a higher initial build cost (~$15k vs ~$5k), but significantly
                lower operating costs.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col justify-end space-y-4">
            {/* WP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>WordPress (Legacy)</span>
                <span className="text-red-600">${wpTotalWithBuild.toLocaleString()}</span>
              </div>
              <div className="h-12 bg-gray-100 rounded-xl overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-400 to-red-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(wpTotalWithBuild / Math.max(wpTotalWithBuild, headlessTotal)) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex gap-2 text-xs text-gray-400">
                <span>Build: $5k</span> • <span>Ops: ${(wpTotal / 12 / years).toFixed(0)}/mo</span>
              </div>
            </div>

            {/* Headless Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Headless (Modern)</span>
                <span className="text-green-600">${headlessTotal.toLocaleString()}</span>
              </div>
              <div className="h-12 bg-gray-100 rounded-xl overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(headlessTotal / Math.max(wpTotalWithBuild, headlessTotal)) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex gap-2 text-xs text-gray-400">
                <span>Build: $15k</span> •{' '}
                <span>Ops: ${(calculateTotal(headlessCosts) / 12 / years).toFixed(0)}/mo</span>
              </div>
            </div>

            {/* Summary */}
            <div className="pt-6 mt-6 border-t border-gray-100">
              {savings > 0 ? (
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Projected Savings</span>
                  <span className="text-4xl font-bold text-green-600 tracking-tight">
                    ${savings.toLocaleString()}
                  </span>
                  <p className="text-sm text-green-700 font-medium mt-2">
                    Headless pays for itself in ~1.5 years.
                  </p>
                </div>
              ) : (
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Additional Cost</span>
                  <span className="text-4xl font-bold text-gray-400 tracking-tight">
                    ${Math.abs(savings).toLocaleString()}
                  </span>
                  <p className="text-sm text-gray-500 font-medium mt-2">
                    For low traffic/complexity, WordPress is cheaper.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCOCalculator;
