import React from 'react';
import { motion } from 'motion/react';

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'CMS' | 'Tools' | 'Deployment' | string;
  logoUrl?: string;
  iconNode?: React.ReactNode;
}

interface TechStackShowcaseProps {
  technologies: TechItem[];
  title?: string;
  subtitle?: string;
}

export const TechStackShowcase: React.FC<TechStackShowcaseProps> = ({
  technologies,
  title,
  subtitle,
}) => {
  // Removed unused translation hook

  // Group technologies by category
  const groupedTech = technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category]!.push(tech);
      return acc;
    },
    {} as Record<string, TechItem[]>
  );

  return (
    <section className="py-[var(--space-section)] bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {subtitle && (
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="font-display font-black text-3xl sm:text-5xl text-secondary mb-6 leading-tight">
              {title}
            </h2>
          )}
        </div>

        <div className="grid gap-12 md:gap-16">
          {Object.entries(groupedTech).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold text-secondary mb-8 text-center md:text-left border-b border-gray-200 pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {items.map((tech, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition motion-reduce:duration-[0.01ms] duration-300 hover:-translate-y-1"
                  >
                    <div className="h-16 w-16 mb-4 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition motion-reduce:duration-[0.01ms] duration-500">
                      {tech.logoUrl ? (
                        <img
                          src={tech.logoUrl}
                          alt=""
                          aria-hidden="true"
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="flex items-center justify-center w-full h-full"
                        >
                          {tech.iconNode}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
