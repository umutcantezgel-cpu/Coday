import React from 'react';

const events = [
    { title: 'Agency Scaling Summit', date: '15. Okt 2026', time: '14:00 - 18:00', type: 'Virtual', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87' },
    { title: 'Design Systems Workshop', date: '22. Okt 2026', time: '10:00 - 12:00', type: 'Workshop', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766' },
    { title: 'Founder Networking', date: '01. Nov 2026', time: '19:00', type: 'Exklusiv', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b' },
];

const Events: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-gray-900">
                            Upcoming <span className="text-gradient-vivid">Events</span>
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            Lerne von Experten, vernetze dich mit Gleichgesinnten und bringe dein Business auf das nächste Level.
                        </p>
                    </div>
                    <button className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center">
                        <span className="material-symbols-outlined mr-2">add</span> Event einreichen
                    </button>
                </div>

                <div className="space-y-8">
                    {events.map((event) => (
                        <div key={event.title} className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-aurora-lg transition-all grid md:grid-cols-3">
                            <div className="h-64 md:h-auto overflow-hidden relative">
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-wider text-gray-900 z-10">
                                    {event.type}
                                </div>
                                <img src={`${event.image}?auto=format&fit=crop&w=600&q=80`} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="p-8 md:col-span-2 flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    <span className="text-aurora-sapphire flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span> {event.date}</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {event.time}</span>
                                </div>
                                <h3 className="font-display font-bold text-3xl mb-4 text-gray-900 group-hover:text-aurora-sapphire transition-colors">{event.title}</h3>
                                <p className="text-slate-500 mb-8 max-w-xl">
                                    Ein exklusives Event für Mitglieder der Agency Domination Community. Deep Dives, Q&A Sessions und Networking.
                                </p>
                                <button className="self-start px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:border-aurora-sapphire hover:text-aurora-sapphire hover:bg-blue-50 transition-all">
                                    Jetzt anmelden
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
