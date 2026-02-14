import React from 'react';
import { motion } from 'motion/react';
import { staggerContainer, fadeUpVariants, STAGGER, TRANSITION } from '@/shared/lib/motion';
import { useTranslation } from 'react-i18next';
import { LocalizedLink } from '@/shared/ui/LocalizedLink';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { SeoHead } from '@/shared/ui/SeoHead';
import {
  Gavel,
  Shield,
  Buildings,
  List,
  Clock,
  ArrowRight,
  SealCheck,
  Eye,
  ArrowsClockwise,
  EnvelopeSimple,
} from '@phosphor-icons/react';

interface LegalCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: 'primary' | 'blue' | 'green' | 'purple';
  sections: number;
  readTime: string;
}

const LegalCard: React.FC<LegalCardProps> = ({
  title,
  description,
  href,
  icon: IconComp,
  color,
  sections,
  readTime,
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20 hover:border-primary/40',
    blue: 'bg-blue-100 text-blue-600 border-blue-200 hover:border-blue-400',
    green: 'bg-green-100 text-green-600 border-green-200 hover:border-green-400',
    purple: 'bg-purple-100 text-purple-600 border-purple-200 hover:border-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <LocalizedLink
        to={href}
        className={`block bg-white rounded-2xl border-2 ${colorClasses[color]} p-8 hover:shadow-xl transition-all`}
      >
        <div className="flex items-start gap-5">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[color].split(' ').slice(0, 2).join(' ')}`}
          >
            <OptimizedIcon icon={IconComp} className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-xl text-secondary mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <OptimizedIcon icon={List} className="w-4 h-4" />
                {sections} Abschnitte
              </span>
              <span className="flex items-center gap-1">
                <OptimizedIcon icon={Clock} className="w-4 h-4" />
                {readTime} Lesezeit
              </span>
            </div>
          </div>
          <OptimizedIcon icon={ArrowRight} className="w-5 h-5 text-gray-400" />
        </div>
      </LocalizedLink>
    </motion.div>
  );
};

const LegalHub: React.FC = () => {
  const { t } = useTranslation('legal');

  const legalDocuments: LegalCardProps[] = [
    {
      title: t('hub.agb.title', { defaultValue: 'Allgemeine Geschäftsbedingungen' }),
      description: t('hub.agb.description', {
        defaultValue:
          'Unsere Vertragsbedingungen für Webdesign, Entwicklung und digitale Dienstleistungen – transparent und fair.',
      }),
      href: '/legal/agb',
      icon: Gavel,
      color: 'primary',
      sections: 15,
      readTime: '12 Min',
    },
    {
      title: t('hub.privacy.title', { defaultValue: 'Datenschutzerklärung' }),
      description: t('hub.privacy.description', {
        defaultValue:
          'Wie wir mit Ihren Daten umgehen – DSGVO-konform, transparent und mit Fokus auf Ihre Rechte.',
      }),
      href: '/legal/datenschutz',
      icon: Shield,
      color: 'blue',
      sections: 14,
      readTime: '15 Min',
    },
    {
      title: t('hub.impressum.title', { defaultValue: 'Impressum' }),
      description: t('hub.impressum.description', {
        defaultValue:
          'Alle Angaben zum Anbieter dieser Website nach § 5 DDG – wer wir sind und wie Sie uns erreichen.',
      }),
      href: '/legal/impressum',
      icon: Buildings,
      color: 'green',
      sections: 8,
      readTime: '5 Min',
    },
  ];

  return (
    <>
      <SeoHead
        title={t('hub.seo.title', { defaultValue: 'Rechtliches - Coday Webdesign' })}
        description={t('hub.seo.description', {
          defaultValue:
            'AGB, Datenschutzerklärung und Impressum – alle rechtlichen Dokumente transparent und verständlich aufbereitet.',
        })}
        noIndex={false}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <OptimizedIcon icon={SealCheck} className="w-4 h-4" />
                {t('hub.badge', { defaultValue: 'DSGVO-konform & transparent' })}
              </div>
              <h1 className="font-display font-black text-4xl md:text-5xl text-secondary mb-4">
                {t('hub.title', { defaultValue: 'Rechtliches' })}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('hub.subtitle', {
                  defaultValue:
                    'Alle rechtlichen Dokumente an einem Ort – verständlich aufbereitet und mit allem, was Sie wissen sollten.',
                })}
              </p>
            </motion.div>

            {/* Legal Cards */}
            <motion.div
              className="space-y-6"
              variants={staggerContainer(STAGGER.slow)}
              initial="hidden"
              animate="visible"
            >
              {legalDocuments.map((doc) => (
                <motion.div key={doc.href} variants={fadeUpVariants} transition={TRANSITION.reveal}>
                  <LegalCard {...doc} />
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid md:grid-cols-3 gap-4"
            >
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <OptimizedIcon icon={SealCheck} className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">
                  {t('hub.features.gdpr.title', { defaultValue: 'DSGVO-konform' })}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('hub.features.gdpr.desc', { defaultValue: 'Alle Prozesse nach EU-Recht' })}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <OptimizedIcon icon={Eye} className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">
                  {t('hub.features.transparent.title', { defaultValue: 'Transparent' })}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('hub.features.transparent.desc', {
                    defaultValue: 'Klare, verständliche Sprache',
                  })}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <OptimizedIcon
                  icon={ArrowsClockwise}
                  className="w-8 h-8 text-purple-500 mx-auto mb-2"
                />
                <h4 className="font-bold text-gray-900 mb-1">
                  {t('hub.features.updated.title', { defaultValue: 'Aktuell' })}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('hub.features.updated.desc', { defaultValue: 'Regelmäßig aktualisiert' })}
                </p>
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 text-center"
            >
              <h3 className="font-display font-bold text-xl text-secondary mb-2">
                {t('hub.cta.title', {
                  defaultValue: 'Haben Sie Fragen zu unseren Rechtsdokumenten?',
                })}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('hub.cta.description', {
                  defaultValue: 'Wir helfen Ihnen gerne bei Unklarheiten oder speziellen Anfragen.',
                })}
              </p>
              <LocalizedLink
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                <OptimizedIcon icon={EnvelopeSimple} className="w-5 h-5" />
                {t('hub.cta.button', { defaultValue: 'Kontakt aufnehmen' })}
              </LocalizedLink>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LegalHub;
