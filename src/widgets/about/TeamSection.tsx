import React from 'react';
import { motion } from 'motion/react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';

const teamMembers = [
  {
    id: 'umut-tezgel',
    name: 'Umut Tezgel',
    role: 'Founder & Creative Director',
    image: '/images/team/umut-founder.png',
    bio: 'Visionärer Gründer mit Leidenschaft für handgeschriebene, High-End Digital Experiences. Vereint strategisches Denken mit kreativem Anspruch.',
    linkedin: 'https://linkedin.com',
    email: 'mailto:umut@coday.de',
  },
  {
    id: 'max-weber',
    name: 'Max Weber',
    role: 'Lead Engineer',
    image: '/images/team/max-engineer.png',
    bio: 'Experte für moderne Web-Technologien und performante Architekturen. Jede Zeile Code wird mit höchstem Qualitätsanspruch geschrieben.',
    linkedin: 'https://linkedin.com',
    email: 'mailto:max@coday.de',
  },
  {
    id: 'sarah-klein',
    name: 'Sarah Klein',
    role: 'Design Director',
    image: '/images/team/sarah-designer.png',
    bio: 'Preisgekrönte Designerin mit Fokus auf Conversion-getriebene Ästhetik. Verwandelt Markenidentitäten in unvergessliche digitale Erlebnisse.',
    linkedin: 'https://linkedin.com',
    email: 'mailto:sarah@coday.de',
  },
];

/* ═══ ANIMATION PRESETS ═══ */
const EASE_OUT: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.6, ease: EASE_OUT },
};

export const TeamSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary text-white relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-4xl max-h-4xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.svg')]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
            {...fadeUp}
          >
            Das Team
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-white"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            Die Köpfe hinter{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Coday
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            Wir sind eine Gruppe von Experten, die sich der Erschaffung digitaler Meisterwerke
            verschrieben haben. Keine Kompromisse, nur Exzellenz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 ease-out"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: EASE_OUT,
              }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              {/* Glow on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Image Container */}
              <div className="aspect-[4/5] relative overflow-hidden bg-secondary-900">
                <OptimizedImage
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Social Links on Hover */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary transition-colors text-white"
                  >
                    <LinkedinLogo size={18} weight="fill" />
                  </a>
                  <a
                    href={member.email}
                    className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary transition-colors text-white"
                  >
                    <EnvelopeSimple size={18} weight="fill" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="text-xl font-display font-bold mb-1 text-white">{member.name}</h3>
                <p className="text-sm text-primary font-semibold tracking-wide uppercase mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Structured Data: Organization & Persons */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Coday',
            url: 'https://coday.de',
            employee: teamMembers.map((member) => ({
              '@type': 'Person',
              name: member.name,
              jobTitle: member.role,
              description: member.bio,
              image: `https://coday.de${member.image}`,
              sameAs: member.linkedin !== 'https://linkedin.com' ? [member.linkedin] : undefined,
            })),
          }),
        }}
      />
    </section>
  );
};
