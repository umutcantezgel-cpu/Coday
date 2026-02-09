import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DownloadSimple, ShareNetwork, Check, Envelope, CalendarBlank } from '@phosphor-icons/react';
import { useAnalyzerStore } from '../model/store';
import { ScoreCard } from './ScoreCard';
import { UrgencyMeter } from './UrgencyMeter';
import { Icon } from '@/shared/ui/Icon';
import { generatePdfReport } from '../lib/pdfGenerator';
import { EmailReportModal } from './EmailReportModal';
// import { CalendlyModal } from './CalendlyModal'; // Deprecated
import type { AgentIssue } from '../model/types';

const CATEGORY_CONFIG = [
  { key: 'performance', title: 'Performance', icon: 'speed', color: 'from-orange-500 to-red-500' },
  { key: 'seo', title: 'SEO', icon: 'search', color: 'from-green-500 to-emerald-500' },
  { key: 'security', title: 'Sicherheit', icon: 'shield', color: 'from-blue-500 to-cyan-500' },
  {
    key: 'accessibility',
    title: 'Barrierefreiheit',
    icon: 'accessibility',
    color: 'from-purple-500 to-violet-500',
  },
  { key: 'ux', title: 'UX/Design', icon: 'palette', color: 'from-pink-500 to-rose-500' },
  { key: 'content', title: 'Content', icon: 'article', color: 'from-yellow-500 to-amber-500' },
] as const;

export const ReportDashboard: React.FC = () => {
  const { result, resetAnalysis } = useAnalyzerStore();
  const [, setSelectedCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  // const [showCalendlyModal, setShowCalendlyModal] = useState(false);

  if (!result) return null;

  const handleDownloadPdf = () => {
    generatePdfReport(result);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?audit=${result.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Website-Audit: ${result.domain}`,
          text: `Gesamtscore: ${result.overallScore}/100 - Schau dir den vollständigen Report an!`,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get all issues sorted by severity
  const allIssues: (AgentIssue & { category: string })[] = CATEGORY_CONFIG.flatMap((cat) => {
    const data = result[cat.key as keyof typeof result];
    if (data && typeof data === 'object' && 'issues' in data) {
      return (data.issues as AgentIssue[]).map((issue) => ({ ...issue, category: cat.title }));
    }
    return [];
  }).sort((a, b) => {
    const severityOrder = { kritisch: 0, hoch: 1, mittel: 2, niedrig: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  // Safeguard: If Score is 0 and Issues are 0, it's a ghost report (failed analysis).
  if (result.overallScore === 0 && allIssues.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="cloud_off" className="text-red-500 text-5xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analyse fehlgeschlagen</h2>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {useAnalyzerStore.getState().errorCode === 'TIMEOUT'
            ? 'Die Analyse hat zu lange gedauert. Die Website antwortet langsam.'
            : useAnalyzerStore.getState().errorCode === 'NETWORK_ERROR'
              ? 'Verbindung fehlgeschlagen. Bitte prüfe deine Internetverbindung.'
              : 'Unsere KI-Agenten konnten die Website nicht erreichen. Das passiert manchmal bei Firewalls oder Timeouts.'}
        </p>

        {/* Technical Error Detail */}
        {useAnalyzerStore.getState().error && (
          <div className="mb-8 p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-mono text-red-600 max-w-md mx-auto overflow-auto text-left">
            <strong>Code:</strong> {useAnalyzerStore.getState().errorCode || 'UNKNOWN'}
            <br />
            <strong>Error:</strong> {useAnalyzerStore.getState().error}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={async () => {
              const isAlive = await useAnalyzerStore.getState().testConnection();
              if (isAlive) {
                alert('Server ist erreichbar! Versuche es erneut.');
                resetAnalysis();
              } else {
                alert('Server antwortet nicht. Bitte Deployment prüfen.');
              }
            }}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Server testen 📡
          </button>
          <button
            onClick={resetAnalysis}
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
          >
            Erneut versuchen
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={() => useAnalyzerStore.getState().loadDemoData()}
            className="text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Demo-Daten laden (Vorschau)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
          Analyse abgeschlossen
        </span>
        <h1 className="font-display font-black text-4xl md:text-6xl text-secondary mb-4">
          Dein Website-Audit
        </h1>
        <p className="text-xl text-gray-500 mb-2">{result.domain}</p>
        <p className="text-sm text-gray-400 mb-6">
          Analysiert am {new Date(result.analyzedAt).toLocaleDateString('de-DE')} •{' '}
          {result.duration}ms
        </p>

        {/* Tech Stack Badges */}
        {result.techStack && result.techStack.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {result.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Partial Failure Warning */}
        {Object.values(result).some((val: unknown) => typeof val === 'object' && (val as { score?: number })?.score === -1) && (
          <div className="max-w-xl mx-auto mb-8 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3 text-left">
            <Icon name="warning" className="text-orange-500" />
            <div className="text-sm text-orange-800">
              <strong>Teilweise fehlgeschlagen:</strong> Einige Agenten konnten die Website nicht
              analysieren (siehe unten). Der Gesamtscore basiert auf den verfügbaren Daten.
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <DownloadSimple className="w-4 h-4" />
            <span>PDF Export</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-600">Kopiert!</span>
              </>
            ) : (
              <>
                <ShareNetwork className="w-4 h-4" />
                <span>Teilen</span>
              </>
            )}
          </button>
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <Envelope className="w-4 h-4" />
            <span>E-Mail</span>
          </button>
        </div>
      </motion.div>

      {/* Main Score & Urgency */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center"
        >
          <h3 className="text-lg font-bold text-gray-600 uppercase tracking-wider mb-6">
            Gesamtbewertung
          </h3>

          {/* Big Score */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className={`
              inline-flex items-center justify-center w-40 h-40 rounded-full mb-6
              ${result.overallScore >= 80
                ? 'bg-gradient-to-br from-green-400 to-green-600'
                : result.overallScore >= 50
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                  : 'bg-gradient-to-br from-red-400 to-red-600'
              }
              shadow-2xl
            `}
          >
            <span className="text-6xl font-black text-white">{result.overallScore}</span>
          </motion.div>

          <p className="text-gray-500">
            {result.overallScore >= 80
              ? 'Gut! Deine Website ist solide aufgestellt.'
              : result.overallScore >= 50
                ? 'Verbesserungspotenzial vorhanden.'
                : 'Dringender Handlungsbedarf!'}
          </p>
        </motion.div>

        {/* Urgency Meter */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <UrgencyMeter score={result.urgencyScore} />
        </motion.div>
      </div>

      {/* Category Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Detailauswertung</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_CONFIG.map((cat, index) => {
            const data = result[cat.key as keyof typeof result];
            const score = data && typeof data === 'object' && 'score' in data ? data.score : 0;
            const summary =
              data && typeof data === 'object' && 'summary' in data ? data.summary : '';

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ScoreCard
                  title={cat.title}
                  score={score as number}
                  icon={cat.icon}
                  color={cat.color}
                  summary={summary as string}
                  onClick={() => setSelectedCategory(cat.key)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Issues List */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Gefundene Probleme ({allIssues.length})
          </h2>
          <div className="flex gap-2">
            {['kritisch', 'hoch', 'mittel', 'niedrig'].map((severity) => {
              const count = allIssues.filter((i) => i.severity === severity).length;
              if (count === 0) return null;

              const colors = {
                kritisch: 'bg-red-100 text-red-700',
                hoch: 'bg-orange-100 text-orange-700',
                mittel: 'bg-yellow-100 text-yellow-700',
                niedrig: 'bg-gray-100 text-gray-700',
              };

              return (
                <span
                  key={severity}
                  className={`px-3 py-1 rounded-full text-sm font-bold ${colors[severity as keyof typeof colors]}`}
                >
                  {count} {severity}
                </span>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {allIssues.slice(0, 10).map((issue, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`
                  w-3 h-3 rounded-full mt-2 flex-shrink-0
                  ${issue.severity === 'kritisch'
                      ? 'bg-red-500'
                      : issue.severity === 'hoch'
                        ? 'bg-orange-500'
                        : issue.severity === 'mittel'
                          ? 'bg-yellow-500'
                          : 'bg-gray-400'
                    }
                `}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-gray-900">{issue.title}</h4>
                    <span className="text-xs text-gray-400 px-2 py-1 bg-gray-50 rounded">
                      {issue.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{issue.description}</p>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Icon name="lightbulb" className="text-base" />
                    <span>{issue.fix}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {allIssues.length > 10 && (
          <p className="text-center text-gray-500 mt-6">
            +{allIssues.length - 10} weitere Probleme gefunden
          </p>
        )}
      </div>

      {/* Action Plan Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dein Maßnahmenplan</h2>
          {!result.actionPlan && (
            <button
              onClick={() => useAnalyzerStore.getState().generatePlan()}
              className="text-sm font-bold text-primary hover:text-blue-700 transition-colors"
            >
              Plan jetzt generieren
            </button>
          )}
        </div>

        {result.actionPlan ? (
          <div className="grid gap-4">
            {result.actionPlan.map((step) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{step.title}</h3>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase font-bold">
                        {step.role}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded text-white uppercase font-bold
                                                ${step.impact === 'hoch' ? 'bg-green-500' : 'bg-blue-400'}`}
                      >
                        Impact: {step.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">
              Erstelle einen konkreten Schritt-für-Schritt Plan basierend auf deinen Ergebnissen.
            </p>
            <button
              onClick={() => useAnalyzerStore.getState().generatePlan()}
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition-all"
            >
              KI-Plan generieren ✨
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Bereit, deine Website zu optimieren?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Unsere Experten helfen dir, alle gefundenen Probleme zu beheben. Kostenlose Erstberatung,
          keine versteckten Kosten.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.open('/booking', '_blank')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            <CalendarBlank className="w-5 h-5" />
            <span>Beratung buchen</span>
          </button>
          <button
            onClick={resetAnalysis}
            className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/30"
          >
            Neue Analyse starten
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <EmailReportModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        result={result}
      />
      {/* <CalendlyModal isOpen={showCalendlyModal} onClose={() => setShowCalendlyModal(false)} /> */}
    </div>
  );
};

export default ReportDashboard;
