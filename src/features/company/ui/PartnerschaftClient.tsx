'use client';

import React from 'react';
import { m } from 'motion/react';
import { useLocale } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ArrowRight, Users, Handshake, TrendUp, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { SeoHead } from '@/shared/ui/SeoHead';
import { Link as NavLink } from '@/i18n/navigation';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';

const Partnerschaft: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <div className="min-h-dvh bg-background-light">
      <SeoHead
        title={isEn ? 'Partner & Referral Program | Coday' : 'Partner & Referral Programm | Coday'}
        description={
          isEn
            ? 'Become a Coday partner. Recommend us and secure 10% commission or expand your portfolio as an agency.'
            : 'Werden Sie Coday Partner. Empfehlen Sie uns weiter und sichern Sie sich 10% Provision oder erweitern Sie als Agentur Ihr Portfolio.'
        }
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Partnerschaft', url: 'https://www.codayweb.de/partnerschaft' },
        ]}
      />

      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] -z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs />

          <div className="text-center max-w-3xl mx-auto mt-8">
            <m.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block"
            >
              Coday Partner Network
            </m.h1>

            <m.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6"
            >
              {isEn ? 'Growing Together.' : 'Gemeinsam wachsen.'} <br />
              <GradientText
                colors={['#1A9A9A', '#D69E2E', '#1A9A9A']}
                animationSpeed={8}
                showBorder={false}
              >
                {isEn ? 'Sharing Success.' : 'Erfolge teilen.'}
              </GradientText>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10"
            >
              {isEn
                ? 'Recommend first-class web development to your network and benefit from our transparent commission model.'
                : 'Empfehlen Sie erstklassige Web-Entwicklung an Ihr Netzwerk und profitieren Sie von unserem transparenten Provisionsmodell.'}
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <NavLink
                href="/contact"
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition motion-reduce:duration-[0.01ms] duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center justify-center gap-2"
              >
                {isEn ? 'Become a Partner' : 'Partner werden'}{' '}
                <OptimizedIcon icon={ArrowRight} aria-hidden="true" />
              </NavLink>
            </m.div>
          </div>
        </div>
      </div>

      {/* Two Programs Section */}
      <section className="py-20 bg-white" aria-labelledby="partner-programs-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="partner-programs-heading" className="sr-only">
            {isEn ? 'Partnership Programs' : 'Partnerschafts-Programme'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            {/* Referral / Alumni */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-8 sm:p-12"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <OptimizedIcon icon={Users} className="text-3xl text-primary" />
              </div>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
                {isEn ? 'Clients & Alumni' : 'Kunden & Alumni'}
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                {isEn
                  ? 'Already a Coday client and impressed by our work? Refer us and we will return the favor.'
                  : 'Sie sind bereits Coday-Kunde und von unserer Arbeit überzeugt? Empfehlen Sie uns weiter und wir revanchieren uns.'}
              </p>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8 shadow-sm">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                  {isEn ? 'Your Reward' : 'Ihre Prämie'}
                </div>
                <div className="font-display font-black text-4xl text-primary">
                  10%{' '}
                  <span className="text-xl text-gray-900 font-normal">
                    {isEn ? 'Commission' : 'Provision'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {isEn
                    ? 'On the first project volume of the referred client.'
                    : 'Auf das erste Projektvolumen des vermittelten Kunden.'}
                </div>
              </div>

              <ul className="space-y-4">
                {(isEn
                  ? [
                      'Transparent payout after project completion',
                      'Invitation to the Coday Inner Circle',
                      'Quarterly networking events for alumni',
                      'Personal onboarding for your referral',
                    ]
                  : [
                      'Transparente Auszahlung nach Projektabschluss',
                      'Einladung in den Coday Inner Circle',
                      'Quarterly Networking-Events für Alumni',
                      'Persönliches Onboarding Ihres Kontakts',
                    ]
                ).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="text-primary mt-1 text-lg flex-shrink-0"
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </m.div>

            {/* Agency Partners */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/5">
                  <OptimizedIcon icon={Handshake} className="text-3xl text-white" />
                </div>
                <h2 className="font-display font-bold text-3xl text-white mb-4">
                  {isEn ? 'Agencies & Freelancers' : 'Agenturen & Freelancer'}
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  {isEn
                    ? 'For SEO, design, or marketing agencies without their own dev team. We implement your visions with technical precision.'
                    : 'Für SEO-, Design- oder Marketing-Agenturen ohne eigenes Dev-Team. Wir setzen Ihre Visionen technisch makellos um.'}
                </p>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8">
                  <div className="text-sm text-gray-400 uppercase tracking-wider mb-1 font-semibold">
                    {isEn ? 'Partnership Models' : 'Partnerschafts-Modelle'}
                  </div>
                  <div className="font-display font-black text-3xl text-white mb-2">
                    Revenue Share{' '}
                    <span className="text-accent text-xl">{isEn ? 'or' : 'oder'}</span> White-Label
                  </div>
                  <div className="text-sm text-gray-400">
                    {isEn
                      ? '15% commission for open referrals or discreet delivery under your brand.'
                      : '15% Provision bei offener Vermittlung oder diskrete Umsetzung unter Ihrer Brand.'}
                  </div>
                </div>

                <ul className="space-y-4">
                  {(isEn
                    ? [
                        'Prioritized delivery for partner projects',
                        'Dedicated contacts & Slack Connect',
                        'Access to high-end tech stack (Next.js, Sanity)',
                        'Joint co-marketing & case studies',
                      ]
                    : [
                        'Priorisierte Umsetzung für Partner-Projekte',
                        'Feste Ansprechpartner & Slack-Connect',
                        'Zugriff auf High-End Tech-Stack (Next.js, Sanity)',
                        'Gemeinsames Co-Marketing & Case Studies',
                      ]
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-accent mt-1 text-lg flex-shrink-0"
                      />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-6">
              {isEn ? 'Ready for a Partnership?' : 'Bereit für eine Partnerschaft?'}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              {isEn
                ? 'Let us find out in a short call how we can grow together.'
                : 'Lassen Sie uns in einem kurzen Call herausfinden, wie wir gemeinsam wachsen können.'}
            </p>
            <NavLink
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition motion-reduce:duration-[0.01ms] duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {isEn ? 'Schedule a Partner Call' : 'Partner-Gespräch vereinbaren'}{' '}
              <OptimizedIcon icon={TrendUp} aria-hidden="true" />
            </NavLink>
          </m.div>
        </div>
      </section>
    </div>
  );
};

export default Partnerschaft;
