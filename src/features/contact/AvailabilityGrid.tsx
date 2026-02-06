import React from 'react';
import { useTranslation } from 'react-i18next';

const AvailabilityGrid: React.FC = () => {
  const { t } = useTranslation('contact');

  // We'll use the translation keys but for now the design in the json is slightly different
  // from the hardcoded text ("Current Availability" vs "Availability {{month}}").
  // Let's use generic fallback or map it closely.
  // The JSON has "title": "Verfügbarkeit {{month}}", so we might want to pass current month.

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {t('availability.title', { month: currentMonth })}
      </h3>
      <p className="text-gray-500">
        {/* We don't have a specific key for "Check back soon..." in the JSON provided earlier. 
                   The JSON has "booked", "free", "tooltip_free". 
                   I will add a generic "info" key or just use a new one. 
                   Actually, looking at the JSON, there isn't a direct match for this paragraph. 
                   I will use 'availability.desc' and add it to JSON. 
                */}
        {t('availability.desc', {
          defaultValue: 'Check back soon for updated consultation slots.',
        })}
      </p>
    </div>
  );
};

export default AvailabilityGrid;
