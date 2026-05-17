import { create } from 'zustand';
import type {
  AnalysisResult,
  AnalysisProgress,
  AnalysisStatus,
} from '@/features/analyzer/model/types';
import {
  scanWebsite,
  analyzeAgent,
  generateActionPlan,
  saveAuditResult,
} from '@/features/analyzer/lib/analyzerService';
import { getDemoResult } from '@/features/analyzer/model/demoData';
import { TFunction } from 'i18next';

interface AnalyzerState {
  // Input State
  url: string;
  isValidUrl: boolean;

  // Analysis State
  status: AnalysisStatus;
  progress: AnalysisProgress;
  result: AnalysisResult | null;
  error: string | null;
  errorCode: 'NETWORK_ERROR' | 'TIMEOUT' | 'API_ERROR' | 'RATE_LIMIT' | null;

  // Actions
  setUrl: (url: string) => void;
  startAnalysis: () => Promise<void>;
  resetAnalysis: () => void;
  updateProgress: (progress: Partial<AnalysisProgress>) => void;
  setResult: (result: AnalysisResult) => void;
  setError: (error: string) => void;
  generatePlan: () => Promise<void>;
  testConnection: () => Promise<boolean>;
  loadDemoData: (t: TFunction) => void;
}

const initialProgress: AnalysisProgress = {
  status: 'idle',
  completedAgents: [],
  progress: 0,
};

// URL validation regex
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

export const useAnalyzerStore = create<AnalyzerState>((set, get) => ({
  // Initial State
  url: '',
  isValidUrl: false,
  status: 'idle',
  progress: initialProgress,
  result: null,
  error: null,
  errorCode: null,

  // Actions
  setUrl: (url: string) => {
    const isValid = URL_REGEX.test(url);
    set({ url, isValidUrl: isValid });
  },

  startAnalysis: async () => {
    const { url, isValidUrl } = get();

    if (!isValidUrl) {
      set({ error: 'Bitte gib eine gültige URL ein.' });
      return;
    }

    const AGENTS = ['performance', 'seo', 'security', 'accessibility', 'ux', 'content'];

    // Reset State
    set({
      status: 'analyzing',
      progress: {
        status: 'analyzing',
        currentAgent: 'scanner', // Special state for initial scan
        completedAgents: [],
        progress: 5,
      },
      error: null,
      result: null,
    });

    try {
      // STEP 1: SCAN (Fetch HTML)
      const scanData = await scanWebsite(url);

      // Store scanned headers and rawHtml for agents
      const scannedHeaders = scanData.headers || {};
      const scannedRawHtml = scanData.rawHtml || scanData.html;

      // Initializing Result Object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const partialResult: any = {
        id: crypto.randomUUID(),
        url: scanData.url,
        analyzedAt: new Date().toISOString(),
        overallScore: 0,
        urgencyScore: 0,
        techStack: scanData.stack || [],
      };

      set((state) => ({
        progress: { ...state.progress, progress: 15, currentAgent: AGENTS[0] },
      }));

      // STEP 2: RUN AGENTS (In parallel structure but controlled)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results: Record<string, any> = {};

      const runSingleAgent = async (agentId: string) => {
        try {
          set((state) => ({
            progress: { ...state.progress, currentAgent: agentId },
          }));

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const agentResult = await analyzeAgent<any>(
            agentId,
            scanData.url,
            scanData.html,
            scannedHeaders,
            scannedRawHtml,
            scanData.robotsTxt,
            scanData.sitemapXml
          );
          if (agentResult.score === -1) {
            throw new Error(agentResult.error || 'Agent failed');
          }
          results[agentId] = agentResult;

          set((state) => {
            const completed = [...state.progress.completedAgents, agentId];
            const newProgress = 15 + (completed.length / 6) * 80; // Scale to 95%
            return {
              progress: {
                ...state.progress,
                completedAgents: completed,
                progress: newProgress,
              },
            };
          });
        } catch (err) {
          console.error(`Agent ${agentId} failed:`, err);
          // Capture the first error we see to help debugging
          set({ error: err instanceof Error ? err.message : String(err) });

          results[agentId] = {
            score: 0,
            summary: 'Analyse fehlgeschlagen due to connection error.',
            issues: [],
          };
        }
      };

      // Run batches
      await Promise.all([
        runSingleAgent('performance'),
        runSingleAgent('seo'),
        runSingleAgent('security'),
      ]);

      await Promise.all([
        runSingleAgent('accessibility'),
        runSingleAgent('ux'),
        runSingleAgent('content'),
      ]);

      // STEP 3: CALCULATE FINAL SCORES
      const weights: Record<string, number> = {
        performance: 0.25,
        seo: 0.2,
        security: 0.15,
        accessibility: 0.15,
        ux: 0.15,
        content: 0.1,
      };

      // Check for catastrophic failure (too many agents failed)
      const failedAgents = Object.values(results).filter(
        (r) => r.score === 0 && r.issues?.length === 0
      ).length;
      if (failedAgents >= 4) {
        throw new Error('Analyse unvollständig. Bitte versuche es erneut (API Timeout).');
      }

      let overallScore = 0;
      let urgencyScore = 0;
      let totalWeight = 0;

      for (const [id, weight] of Object.entries(weights)) {
        const agentResult = results[id];
        // Ignore failed agents (score -1) for the average
        if (agentResult && agentResult.score >= 0) {
          overallScore += agentResult.score * weight;
          urgencyScore += (100 - agentResult.score) * weight;
          totalWeight += weight;
        }
      }

      // Normalize scores if we have partial results
      if (totalWeight > 0 && totalWeight < 1) {
        overallScore = overallScore / totalWeight;
        urgencyScore = urgencyScore / totalWeight;
      } else if (totalWeight === 0) {
        // Determine catastrophic failure if ALL weights are 0
        // But we check failedAgents count above, so this is just a fallback
        overallScore = 0;
        urgencyScore = 100;
      }

      if ((results['security']?.score || 0) < 50) urgencyScore += 15;
      if ((results['performance']?.score || 0) < 40) urgencyScore += 10;

      const finalResult = {
        ...partialResult,
        ...results,
        overallScore: Math.round(overallScore),
        urgencyScore: Math.min(100, Math.round(urgencyScore)),
        domain: new URL(scanData.url).hostname,
      };

      set({
        status: 'completed',
        progress: {
          status: 'completed',
          completedAgents: AGENTS,
          progress: 100,
          currentAgent: undefined,
        },
        result: finalResult,
      });

      // Save to History (Fire and Forget)
      saveAuditResult(finalResult);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unbekannter Fehler';
      let code: AnalyzerState['errorCode'] = 'API_ERROR';

      if (msg.includes('fetch') || msg.includes('Network')) code = 'NETWORK_ERROR';
      if (msg.includes('Timeout') || msg.includes('504')) code = 'TIMEOUT';
      if (msg.includes('429')) code = 'RATE_LIMIT';

      set({
        status: 'error',
        error: msg,
        errorCode: code,
        progress: { ...initialProgress, status: 'error' },
      });
    }
  },

  resetAnalysis: () => {
    set({
      url: '',
      isValidUrl: false,
      status: 'idle',
      progress: initialProgress,
      result: null,
      error: null,
    });
  },

  updateProgress: (progress: Partial<AnalysisProgress>) => {
    set((state) => ({
      progress: { ...state.progress, ...progress },
    }));
  },

  setResult: (result: AnalysisResult) => {
    set({
      status: 'completed',
      progress: { ...initialProgress, status: 'completed', progress: 100 },
      result,
    });
  },

  setError: (error: string) => {
    set({
      status: 'error',
      error,
    });
  },

  generatePlan: async () => {
    const { result, status } = get();
    if (status !== 'completed' || !result) return;

    // Collect all issues
    const issues = [
      ...result.performance.issues,
      ...result.seo.issues,
      ...result.security.issues,
      ...result.accessibility.issues,
      ...result.ux.issues,
      ...result.content.issues,
    ];

    try {
      const plan = await generateActionPlan(result.url, issues);

      // Update result with plan
      set({
        result: {
          ...result,
          actionPlan: plan,
        },
      });
    } catch (error) {
      console.error('Plan generation failed:', error);
    }
  },

  testConnection: async () => {
    try {
      // We use the same scanWebsite function structure but with 'ping' action
      // Since scanWebsite is typed, we'll just do a direct fetch here to be safe and simple
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

      const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-website`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ action: 'ping' }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.status === 'ok';
    } catch (e) {
      console.error('Connection Test Failed:', e);
      set({
        errorCode: e instanceof TypeError ? 'NETWORK_ERROR' : 'API_ERROR',
        error: e instanceof Error ? e.message : 'Connection Check Failed',
      });
      return false;
    }
  },

  loadDemoData: (t) => {
    set({
      status: 'completed',
      progress: { status: 'completed', progress: 100, completedAgents: [] },
      result: getDemoResult(t),
      error: null,
      errorCode: null,
    });
  },
}));

export default useAnalyzerStore;
