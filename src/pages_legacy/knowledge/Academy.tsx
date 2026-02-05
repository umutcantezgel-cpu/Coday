import React from 'react';

const courses = [
    { title: 'Agency Scaling Masterclass', progress: 0, chapters: 12, duration: '6h 30m', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f' },
    { title: 'React Performance Pro', progress: 35, chapters: 8, duration: '4h 15m', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee' },
    { title: 'SEO Domination 2026', progress: 100, chapters: 5, duration: '3h', image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6' },
];

const Academy: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-block py-1 px-3 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6 border border-orange-100">
                        Education
                    </div>
                    <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-gray-900">
                        Academy <span className="text-gradient-vivid">Mastery</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Exklusives Wissen, direkt in die Praxis. Wähle deinen Lernpfad.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.title} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-aurora-lg transition-all">
                            <div className="h-48 overflow-hidden relative">
                                <img src={`${course.image}?auto=format&fit=crop&w=600&q=80`} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 opacity-90">
                                        <span className="material-symbols-outlined text-sm">article</span> {course.chapters} Kapitel
                                        <span className="w-1 h-1 bg-white rounded-full"></span>
                                        <span>{course.duration}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="font-display font-bold text-xl mb-4 text-gray-900 line-clamp-2">{course.title}</h3>

                                <div className="mb-6">
                                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        <span>Fortschritt</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-vivid rounded-full" style={{ width: `${course.progress}%` }}></div>
                                    </div>
                                </div>

                                <button className="w-full py-3 border border-gray-200 rounded-xl font-bold text-slate-600 hover:bg-gray-50 transition-all">
                                    {course.progress > 0 ? 'Weiterlernen' : 'Starten'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Academy;
