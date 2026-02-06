import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CountUp from '../shared/ui/CountUp';
import { Icon } from '../shared/ui/Icon';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const [score, setScore] = useState(0);
  return (
    <div className="font-sans antialiased text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark transition-colors duration-300 min-h-screen relative">
      <div className="fixed top-0 left-0 w-full h-96 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-purple-200/40 via-blue-100/40 to-indigo-100/40 rounded-full blur-[100px]"></div>
      </div>

      <header className="sticky top-0 z-50 bg-surface-light/80 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="text-primary text-3xl">
                <i className="fa-brands fa-connectdevelop"></i>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">Coday</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">{t('header.nav.overview')}</a>
              <a href="#" className="text-sm font-medium text-primary">{t('header.nav.speed')}</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">{t('header.nav.seo')}</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">{t('header.nav.analytics')}</a>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                {t('header.live')}
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Icon name="notifications" className="text-gray-500" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden border border-white shadow-sm">
                <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPUHzfvwK5NkBlj1-ORjNkivAs8gd3Eb5EXyvQ6jKBCOu5Zj1lSAyjtZpK36cGGEzVT107RyubOOVxST6NFVpoaUxgUIv3NYIhiKR0v1m1ACXU8lGGjdSRxBEaIqOmcwDOaDiEAuwN8yDJS2jDICKR0_ELXuaEqZBZZyNlrBEWlGEsCf114awQTeSi_Z86-zatCZzwz5A6AvU5VP4ipjs0d_Nr6sVAznFAquU4ii3w0j5zD6YJeA6jESorC7E8fsh8iYeioleoZvs" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 relative">
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-vivid">{t('hero.title')}</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('hero.desc')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-16">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" fill="none" r="54" stroke="#E2E8F0" strokeWidth="8"></circle>
              <circle cx="60" cy="60" fill="none" r="54" stroke="url(#gradient-ocean-stroke)" strokeDasharray="339.292" strokeDashoffset="10" strokeLinecap="round" strokeWidth="8"></circle>
              <defs>
                <linearGradient id="gradient-ocean-stroke" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#0EA5E9"></stop>
                  <stop offset="100%" stopColor="#2563EB"></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display font-bold text-5xl text-gray-900"><CountUp from={0} to={97} duration={2} /><span className="text-2xl text-gray-400 font-normal">/100</span></span>
              <span className="text-sm font-medium text-emerald-600 mt-1 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">
                <Icon name="trending_up" className="text-sm mr-1" /> {t('score.ranking')}
              </span>
            </div>
          </div>
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('score.title')}</h2>
            <p className="text-gray-600 mb-6">{t('score.desc')}</p>
            <button className="bg-gradient-ocean text-white font-medium px-6 py-2.5 rounded-lg shadow-aurora hover:shadow-aurora-lg transition-all hover:-translate-y-0.5 text-sm">
              {t('score.button')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card rounded-2xl p-6 shadow-glass hover:shadow-lg transition-all duration-300 border-t-4 border-t-emerald-400">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{t('metrics.lcp')}</h3>
                <div className="text-3xl font-bold text-gray-900 mt-1"><CountUp from={0} to={0.8} duration={1.5} />s</div>
              </div>
              <div className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
                <Icon name="speed" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded flex items-center">
                <Icon name="check_circle" className="text-xs mr-1" /> {t('metrics.good')}
              </span>
              <span className="text-xs text-gray-400">{t('metrics.target')}: &lt; 2.5s</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 shadow-glass hover:shadow-lg transition-all duration-300 border-t-4 border-t-emerald-400">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{t('metrics.fid')}</h3>
                <div className="text-3xl font-bold text-gray-900 mt-1"><CountUp from={0} to={23} duration={1.5} />ms</div>
              </div>
              <div className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
                <Icon name="touch_app" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded flex items-center">
                <Icon name="check_circle" className="text-xs mr-1" /> {t('metrics.good')}
              </span>
              <span className="text-xs text-gray-400">{t('metrics.target')}: &lt; 100ms</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 shadow-glass hover:shadow-lg transition-all duration-300 border-t-4 border-t-emerald-400">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{t('metrics.cls')}</h3>
                <div className="text-3xl font-bold text-gray-900 mt-1"><CountUp from={0} to={0.02} duration={1.5} /></div>
              </div>
              <div className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
                <Icon name="layers" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded flex items-center">
                <Icon name="check_circle" className="text-xs mr-1" /> {t('metrics.good')}
              </span>
              <span className="text-xs text-gray-400">{t('metrics.target')}: &lt; 0.1</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 shadow-glass overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t('comparison.title')}</h3>
              <p className="text-sm text-gray-500">{t('comparison.subtitle')}</p>
            </div>
            <span className="text-sapphire font-bold text-sm bg-blue-50 px-3 py-1 rounded-full mt-2 sm:mt-0">
              <i className="fa-solid fa-bolt mr-2"></i>{t('comparison.badge')}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-4 pt-2 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">{t('comparison.headers.metric')}</th>
                  <th className="pb-4 pt-2 px-6 text-sm font-bold text-gray-900 bg-gradient-to-b from-blue-50/50 to-transparent rounded-t-xl border-t border-x border-blue-100">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-sapphire"></span>
                      <span>{t('comparison.headers.us')}</span>
                    </div>
                  </th>
                  <th className="pb-4 pt-2 px-4 text-sm font-semibold text-gray-500">{t('comparison.headers.standard')}</th>
                  <th className="pb-4 pt-2 px-4 text-sm font-semibold text-gray-500">{t('comparison.headers.wix')}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100 last:border-0">
                  <td className="py-4 px-4 font-medium text-gray-700">{t('comparison.rows.tti')}</td>
                  <td className="py-4 px-6 font-bold text-sapphire bg-blue-50/30 border-x border-blue-100">0.9s</td>
                  <td className="py-4 px-4 text-gray-600">3.2s</td>
                  <td className="py-4 px-4 text-gray-600">4.5s</td>
                </tr>
                <tr className="border-b border-gray-100 last:border-0">
                  <td className="py-4 px-4 font-medium text-gray-700">{t('comparison.rows.mobile')}</td>
                  <td className="py-4 px-6 font-bold text-sapphire bg-blue-50/30 border-x border-blue-100">96/100</td>
                  <td className="py-4 px-4 text-gray-600">54/100</td>
                  <td className="py-4 px-4 text-gray-600">42/100</td>
                </tr>
                <tr className="border-b border-gray-100 last:border-0">
                  <td className="py-4 px-4 font-medium text-gray-700">{t('comparison.rows.tbt')}</td>
                  <td className="py-4 px-6 font-bold text-sapphire bg-blue-50/30 border-x border-blue-100">40ms</td>
                  <td className="py-4 px-4 text-gray-600">450ms</td>
                  <td className="py-4 px-4 text-gray-600">800ms+</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-gray-700">{t('comparison.rows.seo')}</td>
                  <td className="py-4 px-6 font-bold text-sapphire bg-blue-50/30 rounded-b-xl border-b border-x border-blue-100">{t('comparison.rows.seo_value')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.seo_days')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.seo_weeks')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('cta.title')}</h3>
            <p className="text-gray-500 mb-6 max-w-sm">{t('cta.desc')}</p>
            <a href="#" className="bg-gradient-ocean text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              {t('cta.button')}
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="text-primary text-xl">
              <i className="fa-brands fa-connectdevelop"></i>
            </div>
            <span className="font-display font-bold text-base tracking-tight text-gray-900 dark:text-white">Coday</span>
          </div>
          <div className="text-sm text-gray-500">
            {t('footer.copyright')}
          </div>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-primary transition-colors"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="hover:text-primary transition-colors"><i className="fa-brands fa-twitter"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
