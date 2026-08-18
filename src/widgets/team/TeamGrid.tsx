import React from 'react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { clientReferences } from '@/shared/data/teamMembers';

/**
 * Compact client references grid showing satisfied customers.
 */
export const ClientReferencesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {clientReferences.map((client) => (
        <div key={client.id} className="group text-center">
          {/* Small circular avatar */}
          <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-primary/30 transition motion-reduce:duration-[0.01ms] duration-300 flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
            {client.image ? (
              <OptimizedImage
                src={client.image}
                alt={client.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{client.name.charAt(0)}</span>
            )}
          </div>
          {/* Name and company */}
          <h4 className="font-semibold text-sm text-secondary mb-0.5">{client.name}</h4>
          <p className="text-xs text-gray-500">{client.company}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientReferencesGrid;
