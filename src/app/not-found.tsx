

import React from 'react';
import { WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function GlobalNotFound() {
  return (
    <html lang="de" className={`${inter.variable}`}>
      <body className="bg-secondary text-white antialiased">
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <div className="max-w-md w-full flex flex-col items-center">
            <div className="w-20 h-20 bg-bg-secondary rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-border-default">
              <WarningCircle className="w-10 h-10 text-primary-500" weight="duotone" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-sm">404</h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Seite nicht gefunden</h2>
            <p className="text-text-secondary mb-10 leading-relaxed max-w-sm mx-auto">
              Die gesuchte Seite existiert nicht oder wurde verschoben.
            </p>
            <a 
              href="/de" 
              className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-primary-700 text-white shadow-md hover:bg-primary-800 min-h-[48px] px-8"
            >
              Zur Startseite
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
