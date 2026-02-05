import React from 'react';

const TrustBadgeGrid: React.FC = () => {
    const badges = [
        {
            icon: 'lock',
            title: 'DSGVO Konform',
            desc: 'Alle Daten liegen auf deutschen Servern (ISO 27001 zertifiziert).',
            color: 'text-blue-500 bg-blue-50 border-blue-100'
        },
        {
            icon: 'verified_user',
            title: 'SSL Verschlüsselt',
            desc: '256-Bit Verschlüsselung für alle Übertragungen.',
            color: 'text-green-500 bg-green-50 border-green-100'
        },
        {
            icon: 'cookie',
            title: 'Audit Sicher',
            desc: 'Automatische Löschfristen und Consent-Management.',
            color: 'text-purple-500 bg-purple-50 border-purple-100'
        },
        {
            icon: 'accessible',
            title: 'Barrierefrei',
            desc: 'BITV 2.0 Optimierung für ältere Patienten.',
            color: 'text-orange-500 bg-orange-50 border-orange-100'
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((b, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${b.color} transition-transform hover:-translate-y-1`}>
                    <span className={`material-symbols-outlined text-4xl mb-4 ${b.color.split(' ')[0]}`}>{b.icon}</span>
                    <h4 className="font-bold text-lg text-slate-900 mb-2">{b.title}</h4>
                    <p className="text-sm text-slate-600 leading-snug">{b.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default TrustBadgeGrid;
