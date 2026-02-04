import React from 'react';

const members = [
    { name: 'Sarah Mayer', role: 'Agency Owner', company: 'Mayer Digital', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { name: 'Thomas Weber', role: 'Developer', company: 'WebTech', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
    { name: 'Julia K.', role: 'Designer', company: 'Creative Studio', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
    { name: 'Michael B.', role: 'SEO Expert', company: 'SearchPro', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
    { name: 'Laura Schmidt', role: 'Marketing', company: 'Growth Labs', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
    { name: 'David Frank', role: 'Founder', company: 'StartUp Inc', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
];

const Members: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-block py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider mb-6 border border-purple-100">
                        Community
                    </div>
                    <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-gray-900">
                        Unsere <span className="text-gradient-vivid">Mitglieder</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Vernetze dich mit den Besten der Branche. Gemeinsam wachsen wir schneller.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member) => (
                        <div key={member.name} className="group relative bg-white/50 backdrop-blur-md border border-gray-100 rounded-2xl p-6 flex items-center hover:bg-white hover:shadow-aurora transition-all">
                            <div className="relative">
                                <img src={`${member.image}?auto=format&fit=crop&w=150&q=80`} alt={member.name} className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform" />
                                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="ml-6">
                                <h3 className="font-display font-bold text-lg text-gray-900">{member.name}</h3>
                                <div className="text-sm font-medium text-purple-600 mb-1">{member.role}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">{member.company}</div>
                            </div>
                            <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-50 hover:text-purple-600">
                                <span className="material-symbols-outlined">chat</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Members;
