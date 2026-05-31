'use client';
import React, { useState, useEffect } from 'react';
import {
  ShareNetwork,
  TwitterLogo,
  LinkedinLogo,
  Copy,
  Check,
} from '@phosphor-icons/react/dist/ssr';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';

export const ShareFAB: React.FC<{ title: string; url?: string }> = ({ title, url }) => {
  const t = useTranslations('blog');
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const text = `${t('shareTitle')}: "${title}"`;
    const shareUrl = url || window.location.href;

    if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      );
    } else if (platform === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      );
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-full mb-4 right-0 flex flex-col gap-2"
          >
            <button
              onClick={() => handleShare('twitter')}
              className="active:scale-[0.97] w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform motion-reduce:duration-[0.01ms]"
              aria-label="Share on Twitter"
            >
              <TwitterLogo size={20} />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="active:scale-[0.97] w-12 h-12 bg-info text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform motion-reduce:duration-[0.01ms]"
              aria-label="Share on LinkedIn"
            >
              <LinkedinLogo size={20} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="active:scale-[0.97] w-12 h-12 bg-white text-secondary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform motion-reduce:duration-[0.01ms]"
              aria-label="Copy Link"
            >
              {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 z-50"
      >
        <ShareNetwork size={24} />
      </motion.button>
    </div>
  );
};
