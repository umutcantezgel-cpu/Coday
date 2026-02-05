import React from 'react';

const positions = [
    { title: 'Senior Frontend Engineer', type: 'Full-time', location: 'Remote (EU)', dept: 'Engineering' },
    { title: 'Product Designer (UI/UX)', type: 'Full-time', location: 'Berlin / Hybrid', dept: 'Design' },
    { title: 'Growth Marketing Manager', type: 'Part-time', location: 'Remote', dept: 'Marketing' },
];

const Jobs: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-block py-1 px-3 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider mb-6 border border-green-100">
                        We are hiring
                    </div>
                    <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-gray-900">
                        Join the <span className="text-gradient-vivid">Mission</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Wir bauen die Zukunft digitaler Agenturen. Und wir suchen dich.
                    </p>
                </div>

                <div className="space-y-4 max-w-4xl mx-auto">
                    {positions.map((job) => (
                        <div key={job.title} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group">
                            <div>
                                <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">work</span> {job.dept}</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {job.location}</span>
                                    <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 text-xs uppercase tracking-wide">{job.type}</span>
                                </div>
                            </div>
                            <button className="px-6 py-2 rounded-lg bg-white border border-gray-200 font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
