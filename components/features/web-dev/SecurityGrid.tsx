import React from 'react';

const SecurityGrid: React.FC = () => {
    const securityItems = [
        { title: 'OWASP Top 10', value: 'Protected', icon: 'shield', color: '#10B981' },
        { title: 'SSL/TLS', value: 'Top Grade A+', icon: 'lock', color: '#10B981' },
        { title: 'DDoS Protection', value: 'Edge Layer', icon: 'cloud_done', color: '#3B82F6' },
        { title: 'SQL Injection', value: 'Impossible', icon: 'code_off', color: '#8B5CF6' },
        { title: 'XSS Attacks', value: 'Sanitized', icon: 'cleaning_services', color: '#F59E0B' },
        { title: 'CSRF Tokens', value: 'Auto-Handled', icon: 'key', color: '#EC4899' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {securityItems.map((item, index) => (
                <div key={index} className="bg-surface-dark border border-white/5 rounded-xl p-4 text-center hover:bg-white/5 transition-colors group cursor-default">
                    <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-xl" style={{ color: item.color }}>{item.icon}</span>
                    </div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{item.title}</div>
                    <div className="text-white font-bold text-sm">{item.value}</div>
                </div>
            ))}
        </div>
    );
};

export default SecurityGrid;
