import React from 'react';
import { Icon } from '@/shared/ui/Icon';

export interface UrgencyMeterProps {
    score: number;
}

export const UrgencyMeter: React.FC<UrgencyMeterProps> = ({ score }) => {
    return (
        <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
            <Icon name="alert-triangle" className="mx-auto mb-2 text-yellow-500" />
            <p className="text-gray-500 text-sm">Urgency Component Unavailable (Score: {score})</p>
        </div>
    );
};

export default UrgencyMeter;
