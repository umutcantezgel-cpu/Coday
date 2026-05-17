import React from 'react';
import { MapPin, NavigationArrow } from '@phosphor-icons/react';
import { CityData } from '@/features/local-seo/model/cities';

export const DistanceIndicator: React.FC<{ city: CityData }> = ({ city }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
          <MapPin weight="fill" className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm text-muted">Zielregion</div>
          <div className="font-semibold text-white">
            {city.displayName}, {city.stateName}
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center gap-4 opacity-50 px-8">
        <div className="h-px bg-primary/30 flex-1" />
        <NavigationArrow weight="fill" className="w-5 h-5 text-primary rotate-90" />
        <div className="h-px bg-primary/30 flex-1" />
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm text-muted">Distanz Wetzlar HQ</div>
          <div className="font-semibold text-white">{city.distanceFromWetzlarKm} km</div>
        </div>
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <MapPin weight="fill" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
