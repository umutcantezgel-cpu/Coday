import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@/shared/ui/Icon';
import { motion, useAnimation } from 'motion/react';
import { useTranslation } from 'react-i18next';

const VirtualTourTeaser: React.FC = () => {
  const { t } = useTranslation('industries');
  // Simulating a 360 viewer with a wider panoramic image moving on drag/auto
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Auto-pan effect
  useEffect(() => {
    if (!isDragging) {
      controls.start({
        x: ['0%', '-50%', '0%'],
        transition: { repeat: Infinity, duration: 30, ease: 'linear' },
      });
    } else {
      controls.stop();
    }
  }, [isDragging, controls]);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-gray-200">
      {/* Header / UI Overlay */}
      <div className="absolute top-0 inset-x-0 p-6 z-20 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div>
          <span className="bg-primary px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
            {t('immobilien-makler.features.virtual_tour.demo_label')}
          </span>
          <h3 className="text-white font-bold text-xl drop-shadow-md mt-1">
            {t('immobilien-makler.features.virtual_tour.title')}
          </h3>
        </div>

        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 pointer-events-auto">
            <Icon name="maximize" />
          </button>
        </div>
      </div>

      {/* Simulated 360 View */}
      <div
        ref={containerRef}
        className="h-[400px] w-full bg-slate-800 cursor-grab active:cursor-grabbing relative overflow-hidden"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <motion.div
          animate={controls}
          className="absolute top-0 left-0 h-full flex"
          style={{ width: '200%' }} // Wide container
        >
          {/* Placeholder for Panoramic Image - using a gradient pattern for demo if no image */}
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                'linear-gradient(to right, #1e293b, #334155, #475569, #334155, #1e293b)',
              backgroundSize: '200% 100%',
            }}
          >
            {/* Simulated Room Elements to give depth */}
            <div className="absolute top-1/2 left-[20%] w-20 h-20 border-2 border-white/50 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group/hotspot">
              <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-full mt-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/hotspot:opacity-100 whitespace-nowrap">
                {t('immobilien-makler.features.virtual_tour.hotspots.kitchen')}
              </div>
            </div>

            <div className="absolute top-1/3 left-[60%] w-20 h-20 border-2 border-white/50 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group/hotspot">
              <div
                className="w-4 h-4 bg-white rounded-full animate-ping"
                style={{ animationDelay: '1s' }}
              ></div>
              <div className="absolute top-full mt-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/hotspot:opacity-100 whitespace-nowrap">
                {t('immobilien-makler.features.virtual_tour.hotspots.terrace')}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-white text-sm">
            <Icon name="360" />
            {t('immobilien-makler.features.virtual_tour.drag_hint')}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-white/90 backdrop-blur z-20 flex justify-between items-center border-t border-gray-100">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          <div className="w-16 h-12 bg-gray-300 rounded overflow-hidden border-2 border-primary relative cursor-pointer">
            <span className="absolute bottom-0 inset-x-0 w-full text-[8px] bg-black/50 text-white text-center">
              {t('immobilien-makler.features.virtual_tour.rooms.living')}
            </span>
          </div>
          <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden border border-transparent hover:border-gray-400 relative cursor-pointer opacity-60">
            <span className="absolute bottom-0 inset-x-0 w-full text-[8px] bg-black/50 text-white text-center">
              {t('immobilien-makler.features.virtual_tour.rooms.bath')}
            </span>
          </div>
          <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden border border-transparent hover:border-gray-400 relative cursor-pointer opacity-60">
            <span className="absolute bottom-0 inset-x-0 w-full text-[8px] bg-black/50 text-white text-center">
              {t('immobilien-makler.features.virtual_tour.rooms.kitchen')}
            </span>
          </div>
        </div>
        <button className="bg-secondary text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-secondary/90">
          {t('immobilien-makler.features.virtual_tour.cta')}
        </button>
      </div>
    </div>
  );
};

export default VirtualTourTeaser;
