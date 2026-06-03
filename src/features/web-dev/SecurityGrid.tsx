import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Lock, CloudCheck, Code, Sparkle, Key } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

const SecurityGrid: React.FC = () => {
  const t = useTranslations('services');

  const securityItems = [
    {
      title: t('web_development_page.security.items.owasp.title'),
      value: t('web_development_page.security.items.owasp.value'),
      icon: Shield,
      color: '#10B981',
    },
    {
      title: t('web_development_page.security.items.ssl.title'),
      value: t('web_development_page.security.items.ssl.value'),
      icon: Lock,
      color: '#10B981',
    },
    {
      title: t('web_development_page.security.items.ddos.title'),
      value: t('web_development_page.security.items.ddos.value'),
      icon: CloudCheck,
      color: '#3B82F6',
    },
    {
      title: t('web_development_page.security.items.sql.title'),
      value: t('web_development_page.security.items.sql.value'),
      icon: Code,
      color: '#8B5CF6',
    },
    {
      title: t('web_development_page.security.items.xss.title'),
      value: t('web_development_page.security.items.xss.value'),
      icon: Sparkle,
      color: '#F59E0B',
    },
    {
      title: t('web_development_page.security.items.csrf.title'),
      value: t('web_development_page.security.items.csrf.value'),
      icon: Key,
      color: '#EC4899',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {securityItems.map((item, index) => (
        <div
          key={index}
          className="bg-surface-dark border border-white/5 rounded-xl p-4 text-center hover:bg-white/5 transition-colors motion-reduce:duration-[0.01ms] group cursor-default"
        >
          <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms]">
            <OptimizedIcon icon={item.icon} className="text-xl" style={{ color: item.color }} />
          </div>
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1 break-words hyphens-auto">{item.title}</div>
          <div className="text-white font-bold text-sm break-words hyphens-auto">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SecurityGrid;
