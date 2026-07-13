'use client';
import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import {
  ChatCircle,
  ShareNetwork,
  ShieldCheck,
  Alien,
  List,
  X,
} from '@phosphor-icons/react/dist/ssr';
import { useChatStore } from '@/widgets/chatbot/lib/chatStore';
import { useCookieStore } from '@/shared/lib/cookieStore';
import { VelocityVoidOverlay } from '@/widgets/velocity-void/VelocityVoidOverlay';

export const FloatingMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);

  const { toggleChat } = useChatStore();
  const { openSettings } = useCookieStore();

  const handleAction = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  const menuItems = [
    {
      id: 'chat',
      icon: <ChatCircle className="w-6 h-6" weight="fill" />,
      label: 'AI Chat',
      bg: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600',
      color: 'text-white',
      action: toggleChat,
    },
    {
      id: 'security',
      icon: <ShieldCheck className="w-6 h-6" weight="fill" />,
      label: 'Cookies',
      bg: 'bg-white border border-gray-200',
      color: 'text-primary',
      action: openSettings,
    },
    {
      id: 'social',
      icon: <ShareNetwork className="w-6 h-6" weight="fill" />,
      label: 'Instagram',
      bg: 'bg-white border border-gray-200',
      color: 'text-gray-800',
      action: () => {
        window.open('https://www.instagram.com/codayweb/', '_blank');
      },
    },
    {
      id: 'game',
      icon: <Alien className="w-6 h-6" weight="duotone" />,
      label: 'Velocity Void',
      bg: 'bg-black border border-white/20',
      color: 'text-white',
      action: () => setIsGameActive(true),
    },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-4 z-[9999] md:hidden flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <div className="flex flex-col gap-3 mb-2 pointer-events-auto items-end">
              {menuItems.map((item, i) => (
                <m.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleAction(item.action)}
                  className={`flex items-center gap-3 ${item.bg} ${item.color} px-4 py-3 rounded-full shadow-lg`}
                >
                  <span className="font-semibold text-sm">{item.label}</span>
                  {item.icon}
                </m.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="w-14 h-14 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center pointer-events-auto"
        >
          {isOpen ? <X className="w-7 h-7" /> : <List className="w-7 h-7" />}
        </button>
      </div>

      <VelocityVoidOverlay isActive={isGameActive} onClose={() => setIsGameActive(false)} />
    </>
  );
};
