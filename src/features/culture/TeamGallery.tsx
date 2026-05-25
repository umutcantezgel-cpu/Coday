import React from 'react';
import { useTranslations } from 'next-intl';

interface TeamMember {
  name: string;
  role: string;
  funfact: string;
  funfact_title: string;
}

const TeamGallery: React.FC = () => {
  const t = useTranslations('careers');

  const team = t.raw('culture.team.members') as TeamMember[];

  // Fallback if translation fails or returns string (should not happen if array is present)
  const teamMembers = Array.isArray(team) ? team : [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {teamMembers.map((member, idx) => (
        <div
          key={idx}
          className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
        >
          {/* Background Image (Mock color for now) */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${idx % 2 === 0 ? 'from-gray-800 to-gray-900' : 'from-slate-700 to-slate-800'} transition-transform duration-500 group-hover:scale-110`}
          ></div>

          {/* Placeholder Avatar */}
          <div className="absolute inset-0 flex items-center justify-center opacity-50 font-black text-9xl text-white/5 uppercase select-none">
            {member.name[0]}
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>

          <div className="absolute bottom-0 left-0 p-4 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
            <h4 className="font-bold text-white text-lg leading-none mb-1">{member.name}</h4>
            <p className="text-primary text-xs font-bold uppercase tracking-wider">{member.role}</p>
          </div>

          {/* Hover Reveal: Fun Fact */}
          <div className="absolute inset-0 bg-primary/90 p-6 flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div>
              <span className="text-4xl mb-2 block">🍕</span>
              <p className="text-white font-bold text-sm">{member.funfact_title}</p>
              <p className="text-white/80 text-xs">{member.funfact}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamGallery;
