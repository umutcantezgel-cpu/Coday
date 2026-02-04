import React from 'react';

const Members: React.FC = () => {
    const members = [
        { name: 'Sarah Meyer', role: 'CEO @ TechCorp', image: 'https://i.pravatar.cc/150?u=1' },
        { name: 'Thomas Weber', role: 'Founder @ Studio', image: 'https://i.pravatar.cc/150?u=2' },
        { name: 'Julia Wagner', role: 'Marketing Lead', image: 'https://i.pravatar.cc/150?u=3' },
        { name: 'Michael Schmidt', role: 'Developer', image: 'https://i.pravatar.cc/150?u=4' },
        { name: 'Lisa Müller', role: 'Designer', image: 'https://i.pravatar.cc/150?u=5' },
        { name: 'David Fischer', role: 'Product Owner', image: 'https://i.pravatar.cc/150?u=6' },
        { name: 'Anna Koch', role: 'SEO Manager', image: 'https://i.pravatar.cc/150?u=7' },
        { name: 'Jan Becker', role: 'Content Strategist', image: 'https://i.pravatar.cc/150?u=8' },
    ];

    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-display font-black text-5xl md:text-6xl text-gradient-vivid mb-6">
                        Community Mitglieder
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Vernetze dich mit den Besten der Branche.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((member, i) => (
                        <div key={i} className="group relative bg-white rounded-2xl border border-aurora-mist p-6 hover:shadow-lg transition-all duration-300 text-center">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full rounded-full border-2 border-white object-cover"
                                    />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-aurora-sapphire font-medium mb-4">{member.role}</p>

                                <button className="w-full py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                    Vernetzen
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Members;
