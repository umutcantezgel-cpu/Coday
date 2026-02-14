import React, { useEffect, useState } from 'react';
import { Trophy, Lightning } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';

export const ReadingScore: React.FC<{ currentPostId?: number }> = ({ currentPostId }) => {
  const [readPosts, setReadPosts] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('coday_read_posts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // Mark current as read if not already
    if (currentPostId && !readPosts.includes(currentPostId)) {
      const timeout = setTimeout(() => {
        const updated = [...readPosts, currentPostId];
        localStorage.setItem('coday_read_posts', JSON.stringify(updated));
        setReadPosts(updated);
      }, 10000); // Mark read after 10 seconds

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [currentPostId, readPosts]);

  // Derived state
  const score = readPosts.length * 100;
  let level = 'Agency Starter';
  if (score >= 500) level = 'Agency Visionary';
  else if (score >= 300) level = 'Growth Hacker';
  else if (score >= 100) level = 'Digital Native';

  const nextLevel = score < 100 ? 100 : score < 300 ? 300 : score < 500 ? 500 : 1000;

  const progress = (score / nextLevel) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden group">
      {/* Glossy effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-10 translate-x-10 blur-2xl group-hover:bg-white/10 transition-colors"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Your Rank
          </span>
          <Trophy size={16} className="text-yellow-400" />
        </div>

        <h3 className="text-xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
          {level}
        </h3>

        <div className="flex items-end gap-1 mb-4">
          <span className="text-3xl font-mono font-bold">{score}</span>
          <span className="text-xs text-gray-400 mb-1">XP Points</span>
        </div>

        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
        </div>

        <div className="flex justify-between text-[10px] text-gray-400">
          <span>{readPosts.length} Articles read</span>
          <span>Next Level: {nextLevel}</span>
        </div>
      </div>

      {/* Unlock Notification (Conditional, simulated for now) */}
      <AnimatePresence>
        {currentPostId && !readPosts.includes(currentPostId) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 10 }}
            className="absolute inset-0 bg-green-500/90 flex flex-col items-center justify-center backdrop-blur-sm z-20"
          >
            <Lightning className="text-white w-8 h-8 mb-2 animate-bounce" />
            <span className="font-bold text-lg">+100 XP</span>
            <span className="text-xs">Article Completed!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
