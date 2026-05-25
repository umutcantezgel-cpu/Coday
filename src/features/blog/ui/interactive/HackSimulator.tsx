"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TerminalWindow,
  Shield,
  Lock,
  LockOpen,
  HardDrives,
  Database,
  Bug,
  ArrowsClockwise,
} from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';

type SystemType = 'wordpress' | 'coday';
type LogLevel = 'info' | 'warning' | 'error' | 'success';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  level: LogLevel;
}

export const HackSimulator: React.FC = () => {
  const t = useTranslations('blog');

  const WP_LOGS = [
    { msg: 'Scanning target 192.168.1.1...', level: 'info' },
    { msg: 'Target identified: WordPress 6.4.2', level: 'success' },
    { msg: 'Checking for outdated plugins...', level: 'info' },
    { msg: 'VULNERABILITY FOUND: Slider Revolution < 6.0', level: 'success' },
    { msg: 'Initiating SQL Injection attack...', level: 'warning' },
    { msg: 'Bypassing WAF...', level: 'warning' },
    { msg: 'Database connection established', level: 'success' },
    { msg: 'Extracting admin_users table...', level: 'success' },
    { msg: 'Password hash crack initiated...', level: 'info' },
    { msg: "ACCESS GRANTED: User 'admin'", level: 'success' },
    { msg: 'Injecting mallet payload...', level: 'error' },
    { msg: 'SYSTEM COMPROMISED', level: 'error' },
  ];

  const STATIC_LOGS = [
    { msg: 'Scanning target 192.168.1.5...', level: 'info' },
    { msg: 'Target identified: Static HTTP Server', level: 'info' },
    { msg: 'Checking for outdated plugins...', level: 'info' },
    { msg: 'No plugins found.', level: 'warning' },
    { msg: 'Initiating SQL Injection attack...', level: 'warning' },
    { msg: 'ERROR: No database connection endpoint found', level: 'error' },
    { msg: 'Attempting /wp-admin login...', level: 'info' },
    { msg: 'ERROR: 404 Not Found', level: 'error' },
    { msg: 'Attempting XML-RPC exploit...', level: 'info' },
    { msg: 'ERROR: 405 Method Not Allowed', level: 'error' },
    { msg: 'Scanning for dynamic vulnerabilities...', level: 'info' },
    { msg: 'Scan complete: 0 Vulnerabilities found', level: 'warning' },
    { msg: 'ATTACK FAILED', level: 'error' },
  ];

  const [activeSystem, setActiveSystem] = useState<SystemType>('wordpress');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [attackProgress, setAttackProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const startSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setAttackProgress(0);

    const sourceLogs = activeSystem === 'wordpress' ? WP_LOGS : STATIC_LOGS;
    let index = 0;

    const interval = setInterval(() => {
      if (index >= sourceLogs.length) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }

      const log = sourceLogs[index];
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(36),
          timestamp: timeString,
          message: log!.msg,
          level: log!.level as LogLevel,
        },
      ]);

      setAttackProgress(((index + 1) / sourceLogs.length) * 100);
      index++;
    }, 800);
  };

  const getStatusColor = () => {
    if (!logs.length) return 'bg-gray-500';
    if (activeSystem === 'wordpress' && attackProgress === 100) return 'bg-red-500';
    if (activeSystem === 'coday' && attackProgress === 100) return 'bg-green-500';
    return 'bg-yellow-500';
  };

  const isCompromised = activeSystem === 'wordpress' && attackProgress === 100;
  const isSecure = activeSystem === 'coday' && attackProgress === 100;

  return (
    <div className="my-12 w-full max-w-4xl mx-auto font-mono text-sm">
      <div className="bg-bg-inverse rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="bg-border-strong p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <TerminalWindow className="text-gray-400 w-5 h-5" />
            <span className="text-gray-200 font-bold">{t('hackSimulator.title')}</span>
          </div>

          <div className="flex bg-bg-inverse p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => {
                setActiveSystem('wordpress');
                setLogs([]);
                setAttackProgress(0);
              }}
              disabled={isRunning}
              className={cn(
                'px-4 py-3 min-h-[44px] rounded-md transition-all flex items-center gap-2 font-medium text-sm',
                activeSystem === 'wordpress'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : 'text-gray-500 hover:text-gray-300',
                isRunning && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Database className="w-4 h-4" /> {t('hackSimulator.wordpress')}
            </button>
            <button
              onClick={() => {
                setActiveSystem('coday');
                setLogs([]);
                setAttackProgress(0);
              }}
              disabled={isRunning}
              className={cn(
                'px-4 py-3 min-h-[44px] rounded-md transition-all flex items-center gap-2 font-medium text-sm',
                activeSystem === 'coday'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'text-gray-500 hover:text-gray-300',
                isRunning && 'opacity-50 cursor-not-allowed'
              )}
            >
              <HardDrives className="w-4 h-4" /> {t('hackSimulator.staticStack')}
            </button>
          </div>
        </div>

        {/* Main Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-[400px]">
          {/* Logs Panel */}
          <div
            className="col-span-2 p-6 overflow-y-auto bg-bg-inverse font-mono text-xs md:text-sm border-r border-gray-800"
            ref={scrollRef}
          >
            {logs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                <Shield className="w-16 h-16 opacity-20" />
                <p>{t('hackSimulator.ready')}</p>
                <button
                  onClick={startSimulation}
                  className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Bug className="w-4 h-4" /> {t('hackSimulator.start')}
                </button>
              </div>
            )}

            <div className="space-y-2">
              {logs.map((log) => (
                <motion.div
                  key={log!.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3"
                >
                  <span className="text-gray-500 shrink-0">[{log!.timestamp}]</span>
                  <span
                    className={cn(
                      'break-all',
                      log!.level === 'info' && 'text-gray-300',
                      log!.level === 'warning' && 'text-yellow-400',
                      log!.level === 'success' && 'text-green-400',
                      log!.level === 'error' && 'text-red-500 font-bold'
                    )}
                  >
                    {activeSystem === 'coday' && log!.level === 'error'
                      ? log!.message
                      : log!.message}
                  </span>
                </motion.div>
              ))}
              {isRunning && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-green-500 inline-block align-middle"
                />
              )}
            </div>
          </div>

          {/* Visual Status Panel */}
          <div className="col-span-1 bg-bg-inverse p-6 flex flex-col items-center justify-center border-l border-gray-800 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isCompromised ? (
                <motion.div
                  key="compromised"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center z-10"
                >
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500 animate-pulse">
                    <LockOpen className="w-12 h-12 text-red-500" />
                  </div>
                  <h3 className="text-red-500 font-bold text-xl mb-2">
                    {t('hackSimulator.criticalFailure')}
                  </h3>
                  <p className="text-gray-400 text-xs">{t('hackSimulator.criticalDesc')}</p>
                </motion.div>
              ) : isSecure ? (
                <motion.div
                  key="secure"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center z-10"
                >
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500">
                    <Lock className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-green-500 font-bold text-xl mb-2">
                    {t('hackSimulator.systemSecure')}
                  </h3>
                  <p className="text-gray-400 text-xs">{t('hackSimulator.secureDesc')}</p>
                </motion.div>
              ) : (
                <motion.div key="scanning" className="text-center z-10 opacity-50">
                  <Shield className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Status: {isRunning ? t('hackSimulator.scanning') : t('hackSimulator.idle')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Matrix Background Effect */}
            {activeSystem === 'coday' && isSecure && (
              <div className="absolute inset-0 opacity-5 mix-blend-screen pointer-events-none bg-cover" style={{ backgroundImage: "url('https://media.giphy.com/media/A06UFEx8jxEwU/giphy.gif')" }} />
            )}
            {activeSystem === 'wordpress' && isCompromised && (
              <div className="absolute inset-0 bg-red-900/10 pointer-events-none mix-blend-overlay animate-pulse" />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-800 w-full">
          <motion.div
            className={cn('h-full transition-all duration-300', getStatusColor())}
            style={{ width: `${attackProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>
          {activeSystem === 'wordpress'
            ? t('hackSimulator.targetWP')
            : t('hackSimulator.targetStatic')}
        </span>
        {logs.length > 0 && (
          <button onClick={() => setLogs([])} className="hover:text-white flex items-center gap-1">
            <ArrowsClockwise className="w-3 h-3" /> {t('hackSimulator.reset')}
          </button>
        )}
      </div>
    </div>
  );
};
