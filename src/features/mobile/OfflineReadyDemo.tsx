import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiHigh, WifiSlash, Image, CloudSlash, Info } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

const OfflineReadyDemo: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="bg-surface-dark rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-white/10">
      {/* Control Panel */}
      <div className="flex justify-between items-center mb-12 relative z-10">
        <div>
          <h3 className="font-display font-bold text-2xl text-white mb-2">
            Offline First Architecture
          </h3>
          <p className="text-gray-400 text-sm">Schalten Sie das Internet aus.</p>
        </div>

        <div
          onClick={() => setIsOnline(!isOnline)}
          className={`cursor-pointer px-4 py-2 rounded-full border flex items-center gap-2 transition-all ${isOnline ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}`}
        >
          <OptimizedIcon icon={isOnline ? WifiHigh : WifiSlash} className="text-lg" />
          <span className="font-bold text-sm uppercase tracking-wider">
            {isOnline ? 'Internet On' : 'Offline Mode'}
          </span>
        </div>
      </div>

      {/* Demo Area */}
      <div className="grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Traditional App */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 opacity-50 relative pointer-events-none">
          <span className="absolute top-4 start-4 text-xs font-bold uppercase tracking-wider text-gray-500">
            Traditional Web App
          </span>

          <div className="mt-8 flex items-center justify-center h-48 bg-black/20 rounded-xl border border-white/5">
            {isOnline ? (
              <div className="text-center">
                <OptimizedIcon icon={Image} className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">Content Loaded</p>
              </div>
            ) : (
              <div className="text-center animate-pulse">
                <OptimizedIcon icon={CloudSlash} className="text-4xl text-red-400 mb-2" />
                <p className="text-red-400 font-bold">No Internet Connection.</p>
                <p className="text-gray-500 text-xs mt-2">Dino Game starts...</p>
              </div>
            )}
          </div>
        </div>

        {/* Our PWA */}
        <div
          className={`bg-gradient-to-br from-primary/20 to-secondary rounded-2xl p-6 border transition-all ${isOnline ? 'border-primary/50 shadow-lg shadow-primary/10' : 'border-white/20 grayscale'}`}
        >
          <span className="flex items-center gap-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Coday PWA
            </span>
            {!isOnline && (
              <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full">
                Served from Cache
              </span>
            )}
          </span>

          <div className="space-y-4">
            {/* Content Cards that persist */}
            {[1, 2].map((i) => (
              <motion.div key={i} layout className="bg-white p-4 rounded-xl flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div>
                  <div className="h-4 w-32 bg-gray-800 rounded mb-2"></div>
                  <div className="h-3 w-48 bg-gray-400 rounded"></div>
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {!isOnline && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-yellow-500/20 border border-yellow-500/50 p-3 rounded-lg flex items-center gap-3 text-yellow-200 text-xs"
                >
                  <OptimizedIcon icon={Info} className="text-sm" />
                  Sie sind offline, aber die App funktioniert weiter. Daten werden synchronisiert,
                  sobald Sie wieder online sind.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineReadyDemo;
