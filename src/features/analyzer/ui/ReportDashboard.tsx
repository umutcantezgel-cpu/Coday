'use client';
import React, { useState } from 'react';
import { m } from 'motion/react';
import {
  DownloadSimple,
  ShareNetwork,
  Check,
  Envelope,
  CalendarBlank,
  Lightning,
  MagnifyingGlass,
  Shield,
  Wheelchair,
  Palette,
  FileText,
  CloudSlash,
  Warning,
  Lightbulb,
} from '@phosphor-icons/react/dist/ssr';
import { useAnalyzerStore } from '@/features/analyzer/model/store';
import { ScoreCard } from '@/features/analyzer/ui/ScoreCard';
import { UrgencyMeter } from '@/features/analyzer/ui/UrgencyMeter';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { generatePdfReport } from '@/features/analyzer/lib/pdfGenerator';
import { EmailReportModal } from '@/features/analyzer/ui/EmailReportModal';
import type { AgentIssue } from '@/features/analyzer/model/types';
import { useTranslations } from 'next-intl';
import { useRtl } from '@/shared/hooks/useRtl';

export const ReportDashboard: React.FC = () => {
  const { result, resetAnalysis } = useAnalyzerStore();
  const [, setSelectedCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const t = useTranslations('analyzer');
  const { isRtl } = useRtl();

  const CATEGORY_CONFIG = [
    {
      key: 'performance',
      title: t('agents.performance'),
      icon: Lightning,
      color: 'from-orange-500 to-red-500',
    },
    {
      key: 'seo',
      title: t('agents.seo'),
      icon: MagnifyingGlass,
      color: 'from-green-500 to-emerald-500',
    },
    {
      key: 'security',
      title: t('agents.security'),
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'accessibility',
      title: t('agents.accessibility'),
      icon: Wheelchair,
      color: 'from-purple-500 to-violet-500',
    },
    { key: 'ux', title: t('agents.ux'), icon: Palette, color: 'from-pink-500 to-rose-500' },
    {
      key: 'content',
      title: t('agents.content'),
      icon: FileText,
      color: 'from-yellow-500 to-amber-500',
    },
  ] as const;

  if (!result) return null;

  const handleDownloadPdf = () => {
    if (!result) return;
    generatePdfReport(result, t);
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
          <OptimizedIcon icon={CloudSlash} className="text-red-500 text-5xl" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard.analysis_failed')}</h2>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {useAnalyzerStore.getState().errorCode === 'TIMEOUT'
            ? t('dashboard.error_timeout')
            : useAnalyzerStore.getState().errorCode === 'NETWORK_ERROR'
              ? t('dashboard.error_network')
              : t('dashboard.error_agents')}
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
                alert(t('dashboard.server_alive'));
                resetAnalysis();
              } else {
                alert(t('dashboard.server_dead'));
              }
            }}
            className="active:scale-[0.97] px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors motion-reduce:duration-[0.01ms]"
          >
            {t('dashboard.button_test_server')}
          </button>
          <button
            onClick={resetAnalysis}
            className="active:scale-[0.97] px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors motion-reduce:duration-[0.01ms] shadow-lg"
          >
            {t('dashboard.button_retry')}
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={() => useAnalyzerStore.getState().loadDemoData(t)}
            className="active:scale-[0.97] text-sm text-gray-400 hover:text-gray-600 underline transition-colors motion-reduce:duration-[0.01ms]"
          >
            {t('dashboard.button_demo')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
          {t('dashboard.analysis_complete')}
        </span>
        <h2 className="font-display font-black text-4xl md:text-6xl text-secondary mb-4">
          {t('dashboard.your_audit')}
        </h2>
        <p className="text-xl text-gray-500 mb-2">{result.domain}</p>
        <p className="text-sm text-gray-400 mb-6">
          {t('dashboard.analyzed_on', {
            date: new Date(result.analyzedAt).toLocaleDateString('de-DE'),
          })}{' '}
          • {result.duration}ms
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
        {Object.values(result).some(
          (val: unknown) => typeof val === 'object' && (val as { score?: number })?.score === -1
        ) && (
          <div className="max-w-xl mx-auto mb-8 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3 text-left">
            <OptimizedIcon icon={Warning} className="text-orange-500" aria-hidden="true" />
            <div className="text-sm text-orange-800">
              <strong>{t('dashboard.partial_failure')}</strong>{' '}
              {t('dashboard.partial_failure_desc')}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={handleDownloadPdf}
            className="active:scale-[0.97] flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition motion-reduce:duration-[0.01ms] shadow-sm"
          >
            <DownloadSimple className="w-4 h-4" />
            <span>{t('dashboard.button_pdf')}</span>
          </button>
          <button
            onClick={handleShare}
            className="active:scale-[0.97] flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition motion-reduce:duration-[0.01ms] shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-600">{t('dashboard.button_copied')}</span>
              </>
            ) : (
              <>
                <ShareNetwork className="w-4 h-4" />
                <span>{t('dashboard.button_share')}</span>
              </>
            )}
          </button>
          <button
            onClick={() => setShowEmailModal(true)}
            className="active:scale-[0.97] flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition motion-reduce:duration-[0.01ms] shadow-sm"
          >
            <Envelope className="w-4 h-4" />
            <span>{t('dashboard.button_email')}</span>
          </button>
        </div>
      </m.div>

      {/* Main Score & Urgency */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Overall Score */}
        <m.div
          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center"
        >
          <h3 className="text-lg font-bold text-gray-600 uppercase tracking-wider mb-6">
            {t('dashboard.overall_score')}
          </h3>

          {/* Big Score */}
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className={`
              inline-flex items-center justify-center w-40 h-40 rounded-full mb-6
              ${
                result.overallScore >= 80
                  ? 'bg-gradient-to-br from-green-400 to-green-600'
                  : result.overallScore >= 50
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                    : 'bg-gradient-to-br from-red-400 to-red-600'
              }
              shadow-2xl
            `}
          >
            <span className="text-6xl font-black text-white">{result.overallScore}</span>
          </m.div>

          <p className="text-gray-500">
            {result.overallScore >= 80
              ? t('dashboard.score_good')
              : result.overallScore >= 50
                ? t('dashboard.score_ok')
                : t('dashboard.score_bad')}
          </p>
        </m.div>

        {/* Urgency Meter */}
        <m.div
          initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <UrgencyMeter score={result.urgencyScore} />
        </m.div>
      </div>

      {/* Category Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('dashboard.detail_analysis')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_CONFIG.map((cat, index) => {
            const data = result[cat.key as keyof typeof result];
            const score = data && typeof data === 'object' && 'score' in data ? data.score : 0;
            const summary =
              data && typeof data === 'object' && 'summary' in data ? data.summary : '';

            return (
              <m.div
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
              </m.div>
            );
          })}
        </div>
      </div>

      {/* Issues List */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('dashboard.found_issues')} ({allIssues.length})
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

              const severityKey =
                severity === 'kritisch'
                  ? 'critical'
                  : severity === 'hoch'
                    ? 'high'
                    : severity === 'mittel'
                      ? 'medium'
                      : 'low';

              return (
                <span
                  key={severity}
                  className={`px-3 py-1 rounded-full text-sm font-bold ${colors[severity as keyof typeof colors]}`}
                >
                  {count} {t(`severity.${severityKey}`, { defaultValue: severity })}
                </span>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {allIssues.slice(0, 10).map((issue, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow motion-reduce:duration-[0.01ms]"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`
                      w-3 h-3 rounded-full mt-2 flex-shrink-0
                      ${
                        issue.severity === 'kritisch'
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
                    <OptimizedIcon icon={Lightbulb} className="text-base" aria-hidden="true" />
                    <span>{issue.fix}</span>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {allIssues.length > 10 && (
          <p className="text-center text-gray-500 mt-6">
            {t('dashboard.more_issues', { count: allIssues.length - 10 })}
          </p>
        )}
      </div>

      {/* Action Plan Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.action_plan')}</h2>
          {!result.actionPlan && (
            <button
              onClick={() => useAnalyzerStore.getState().generatePlan()}
              className="active:scale-[0.97] text-sm font-bold text-primary hover:text-blue-700 transition-colors motion-reduce:duration-[0.01ms]"
            >
              {t('dashboard.generate_plan')}
            </button>
          )}
        </div>

        {result.actionPlan ? (
          <div className="grid gap-4">
            {result.actionPlan.map((step) => (
              <m.div
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
              </m.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">{t('dashboard.plan_placeholder')}</p>
            <button
              onClick={() => useAnalyzerStore.getState().generatePlan()}
              className="active:scale-[0.97] bg-primary text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition motion-reduce:duration-[0.01ms]"
            >
              {t('dashboard.generate_ai_plan')}
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dashboard.cta_title')}</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">{t('dashboard.cta_desc')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.open('/booking', '_blank')}
            className="active:scale-[0.97] flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors motion-reduce:duration-[0.01ms] shadow-lg"
          >
            <CalendarBlank className="w-5 h-5" />
            <span>{t('dashboard.button_book')}</span>
          </button>

          <button
            onClick={resetAnalysis}
            className="active:scale-[0.97] px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors motion-reduce:duration-[0.01ms] border border-white/30"
          >
            {t('dashboard.button_new_analysis')}
          </button>
        </div>
      </m.div>

      {/* Modals */}
      <EmailReportModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        result={result}
      />
    </div>
  );
};

export default ReportDashboard;
