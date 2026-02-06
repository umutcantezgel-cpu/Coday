import React from 'react';

const ApplicationWizard: React.FC = () => {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-4">assignment</span>
                <h3 className="text-xl font-bold text-gray-900">Application Wizard</h3>
                <p className="text-gray-500 mt-2">The application form is currently undergoing maintenance.</p>
            </div>
        </div>
    );
};

export default ApplicationWizard;
