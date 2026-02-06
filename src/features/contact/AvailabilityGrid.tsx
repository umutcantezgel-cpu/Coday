import React from 'react';

const AvailabilityGrid: React.FC = () => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Current Availability</h3>
            <p className="text-gray-500">Check back soon for updated consultation slots.</p>
        </div>
    );
};

export default AvailabilityGrid;
