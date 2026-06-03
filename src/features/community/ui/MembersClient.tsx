'use client';

import React from 'react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

const Members: React.FC = () => {
  const members = [
    { name: 'Sarah Meyer', role: 'CEO @ TechCorp', image: 'https://i.pravatar.cc/150?u=1' },
    { name: 'Thomas Weber', role: 'Founder @ Studio', image: 'https://i.pravatar.cc/150?u=2' },
    { name: 'Julia Wagner', role: 'Marketing Lead', image: 'https://i.pravatar.cc/150?u=3' },
    { name: 'Michael Schmidt', role: 'Developer', image: 'https://i.pravatar.cc/150?u=4' },
    { name: 'Lisa Müller', role: 'Designer', image: 'https://i.pravatar.cc/150?u=5' },
    { name: 'David Fischer', role: 'Product Owner', image: 'https://i.pravatar.cc/150?u=6' },
    { name: 'Anna Koch', role: 'SEO Manager', image: 'https://i.pravatar.cc/150?u=7' },
    { name: 'Jan Becker', role: 'Content Strategist', image: 'https://i.pravatar.cc/150?u=8' },
  ];

  return (
    <div className="bg-background-light min-h-dvh pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
            Community Mitglieder
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Vernetze dich mit den Besten der Branche.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {members.map((member, i) => (
            <li
              key={i}
              className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg focus-within:shadow-lg transition motion-reduce:duration-[0.01ms] duration-300 text-center list-none"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] rounded-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
                  <OptimizedImage
                    src={member.image}
                    alt={`Profilfoto von ${member.name}`}
                    className="w-full h-full rounded-full border-2 border-white object-cover"
                    width={150}
                    height={150}
                  />
                </div>

                <h2 className="text-lg font-bold text-gray-900">{member.name}</h2>
                <p className="text-sm text-primary font-medium mb-4">{member.role}</p>

                <button
                  aria-label={`Mit ${member.name} vernetzen`}
                  className="active:scale-[0.97] w-full py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:bg-blue-50 focus-visible:text-blue-600 transition-colors motion-reduce:duration-[0.01ms]"
                >
                  Vernetzen
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Members;
