'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChatCircle,
  ShareNetwork,
  Phone,
  X,
  LinkedinLogo,
  InstagramLogo,
  TwitterLogo,
  FacebookLogo,
} from '@phosphor-icons/react/dist/ssr';
import { useChatStore } from '@/widgets/chatbot/lib/chatStore';

export const FloatingActionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const { toggleChat } = useChatStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (showSocials) setShowSocials(false);
  };

  const handleChatClick = () => {
    toggleChat();
    setIsOpen(false);
  };

  const handleSocialClick = () => {
    setShowSocials(!showSocials);
  };

  return (
    <nav
      id="fab-container"
      aria-label="Schnellzugriff"
      className="floating-action-menu fixed bottom-6 right-6 z-max flex flex-col items-end gap-4"
    >
      {/* Social Media Sub-Menu */}
      <AnimatePresence>
        {showSocials && isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-full right-16 mb-2 bg-white rounded-2xl shadow-xl p-3 flex flex-col gap-3 border border-gray-100"
          >
            <a
              href="/contact"
              className="p-2 hover:bg-gray-50 rounded-xl text-info transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-3 w-32"
              aria-label="Besuchen Sie uns auf LinkedIn"
            >
              <LinkedinLogo className="w-5 h-5" />
              <span className="text-sm font-bold text-gray-700">LinkedIn</span>
            </a>
            <a
              href="/contact"
              className="p-2 hover:bg-gray-50 rounded-xl text-error transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-3 w-32"
              aria-label="Besuchen Sie uns auf Instagram"
            >
              <InstagramLogo className="w-5 h-5" />
              <span className="text-sm font-bold text-gray-700">Instagram</span>
            </a>
            <a
              href="/contact"
              className="p-2 hover:bg-gray-50 rounded-xl text-info transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-3 w-32"
              aria-label="Besuchen Sie uns auf Twitter"
            >
              <TwitterLogo className="w-5 h-5" />
              <span className="text-sm font-bold text-gray-700">Twitter</span>
            </a>
            <a
              href="/contact"
              className="p-2 hover:bg-gray-50 rounded-xl text-info transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-3 w-32"
              aria-label="Besuchen Sie uns auf Facebook"
            >
              <FacebookLogo className="w-5 h-5" />
              <span className="text-sm font-bold text-gray-700">Facebook</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 items-end"
          >
            {/* Social Media Button */}
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={handleSocialClick}
              aria-expanded={showSocials}
              aria-haspopup="true"
              className="bg-white text-gray-800 p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition motion-reduce:duration-[0.01ms] flex items-center gap-3 group relative"
              aria-label="Social Media anzeigen"
            >
              <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] whitespace-nowrap">
                Social Media
              </span>
              <ShareNetwork className="w-6 h-6" />
            </motion.button>

            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/4917641195301"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.05 }}
              className="bg-success text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition motion-reduce:duration-[0.01ms] flex items-center gap-3 group relative"
              aria-label="WhatsApp öffnen"
            >
              <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] whitespace-nowrap">
                WhatsApp
              </span>
              <Phone className="w-6 h-6" />
            </motion.a>

            {/* AI Assistant Button */}
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              onClick={handleChatClick}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition motion-reduce:duration-[0.01ms] flex items-center gap-3 group relative"
              aria-label="AI Assistant öffnen"
            >
              <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] whitespace-nowrap">
                AI Assistant
              </span>
              <ChatCircle className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition motion-reduce:duration-[0.01ms] duration-300 z-max
                    ${
                      isOpen
                        ? 'bg-gray-900 text-white rotate-180'
                        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:scale-110'
                    }`}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Schnellzugriff-Menü schließen' : 'Schnellzugriff-Menü öffnen'}
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <div className="relative">
            <ChatCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping motion-reduce:animate-none" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </div>
        )}
      </motion.button>
    </nav>
  );
};
