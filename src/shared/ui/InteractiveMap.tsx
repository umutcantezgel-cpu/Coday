import React from 'react';
import { Icon } from '@/shared/ui/Icon';

interface InteractiveMapProps {
  className?: string;
  height?: string;
  showInfoBox?: boolean;
}

/**
 * Interactive Map Component
 * Uses Google Maps embed for Wetzlar location
 * Custom styling to match Aurora design
 */
export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  className = '',
  height = '400px',
  showInfoBox = true,
}) => {
  // Wetzlar coordinates: 50.5563° N, 8.5046° E
  // Address: Lessingstraße 4, 35578 Wetzlar
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2548.5!2d8.5046!3d50.5563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc5e9e9e9e9e9e%3A0x0!2sLessingstra%C3%9Fe%204%2C%2035578%20Wetzlar!5e0!3m2!1sde!2sde!4v1707000000000!5m2!1sde!2sde`;

  return (
    <div className={`relative ${className}`}>
      {/* Map Container with Aurora styling */}
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50"
        style={{ height }}
      >
        {/* Google Maps Embed */}
        <iframe
          title="Coday Standort - Wetzlar"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Gradient Overlay for better integration */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/10 via-transparent to-transparent" />
      </div>

      {/* Info Box */}
      {showInfoBox && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="location_on" className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Coday Standort</h3>
              <p className="text-sm text-gray-600 mb-2">
                Lessingstraße 4<br />
                35578 Wetzlar
              </p>
              <a
                href="https://www.google.com/maps/dir//Lessingstra%C3%9Fe+4,+35578+Wetzlar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
              >
                Route planen
                <Icon name="arrow_forward" className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
